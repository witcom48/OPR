import { DatePipe } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, MegaMenuItem, MenuItem, MessageService } from 'primeng/api';
import { AppConfig } from 'src/app/config/config';
import { InitialCurrent } from 'src/app/config/initial_current';
import { cls_MTReqdocumentModel } from 'src/app/models/self/cls_MTReqdocument';
import { cls_TRTimeonsiteModel } from 'src/app/models/self/cls_TRTimeonsite';
import { LocationModel } from 'src/app/models/system/policy/location';
import { ReasonsModel } from 'src/app/models/system/policy/reasons';
import { TimeonsiteServices } from 'src/app/services/self/timeonsite';
import { LocationService } from 'src/app/services/system/policy/location.service';
import { ReasonsService } from 'src/app/services/system/policy/reasons.service';
declare var reqonsite: any;
@Component({
  selector: 'app-self-recordtime',
  templateUrl: './self-recordtime.component.html',
  styleUrls: ['./self-recordtime.component.scss']
})
export class SelfRecordtimeComponent implements OnInit {
  @ViewChild('fileUploader') fileUploader: ElementRef | any = null;
  langs: any = reqonsite;
  selectlang: string = "EN";
  reasonedis: string = "reason_name_en"
  locatiodis: string = "location_name_en"
  displayManage: boolean = false;
  edit_data: boolean = false;
  position: string = "right";
  manage_title: string = "Manage"
  items: MenuItem[] = [];
  items_attfile: MenuItem[] = [];

  constructor(
    private timeonsiteService: TimeonsiteServices,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private reasonService: ReasonsService,
    private locationService: LocationService,
    private datePipe: DatePipe,
    private router: Router,
  ) { }
  fileToUpload: File | any = null;
  Uploadfile: boolean = false;
  reason_list: ReasonsModel[] = [];
  reasonselected: ReasonsModel = new ReasonsModel();
  location_list: LocationModel[] = [];
  locationselected: LocationModel = new LocationModel();
  trtimonsite_list: cls_TRTimeonsiteModel[] = [];
  selectedtrtimeonsite: cls_TRTimeonsiteModel = new cls_TRTimeonsiteModel();
  selectedreqdoc: cls_MTReqdocumentModel = new cls_MTReqdocumentModel();
  public initial_current: InitialCurrent = new InitialCurrent();
  doGetInitialCurrent() {
    this.initial_current = JSON.parse(localStorage.getItem(AppConfig.SESSIONInitial) || '{}');
    if (!this.initial_current.Token) {
      this.router.navigateByUrl('');
    }
    this.selectlang = this.initial_current.Language;
    if (this.initial_current.Language == "TH") {
      this.reasonedis = "reason_name_th";
      this.locatiodis = "location_name_th"

    }
  }
  ngOnInit(): void {
    this.doGetInitialCurrent();
    this.doLoadMenu();
    this.doLoadReason();
    this.doLoadLocation()
    this.doLoadTimeonsite();
  }
  doLoadReason() {
    this.reason_list = [];
    let data = new ReasonsModel()
    data.reason_group = "ONS"
    this.reasonService.reason_get(data).then(async (res) => {
      this.reason_list = await res;
    });
  }
  doLoadLocation() {
    this.location_list = [];
    let data = new LocationModel()
    this.locationService.location_get(data).then(async (res) => {
      this.location_list = await res;
    });
  }
  doLoadTimeonsite() {
    this.trtimonsite_list = [];
    var tmp = new cls_TRTimeonsiteModel();
    tmp.timeonsite_workdate = new Date(`${this.initial_current.PR_Year}-01-01`)
    tmp.timeonstie_todate = new Date(`${this.initial_current.PR_Year}-12-31`)
    this.timeonsiteService.timeonsite_get(tmp).then(async (res) => {
      res.forEach((elm: any) => {
        elm.timeonsite_workdate = new Date(elm.timeonsite_workdate)
      });
      this.trtimonsite_list = await res
    });
  }
  async doRecordTimeonsite(data: cls_TRTimeonsiteModel[]) {
    await this.timeonsiteService.timeonsite_record(data).then((res) => {
      if (res.success) {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: res.message });
        this.doLoadTimeonsite();
      }
      else {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: res.message });
      }

    });
    this.closeManage()
  }
  async doDeleteTimeonsite(data: cls_TRTimeonsiteModel) {
    await this.timeonsiteService.timeonsite_delete(data).then((res) => {
      if (res.success) {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: res.message });
        this.doLoadTimeonsite();
      }
      else {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: res.message });
      }

    });
    this.closeManage()
  }
  async doGetfileTimeonsite(file_path: string, type: string) {
    this.timeonsiteService.get_file(file_path).then((res) => {
      var url = window.URL.createObjectURL(new Blob([new Uint8Array(res)], { type: type }));
      window.open(url);
      this.selectedreqdoc = new cls_MTReqdocumentModel();
    })
  }
  doUploadFile() {
    const filename = "ONSITE_DOC" + this.datePipe.transform(new Date(), 'yyyyMMddHHmmss');
    const filetype = this.fileToUpload.name.split(".")[1];
    this.timeonsiteService.file_import(this.fileToUpload, filename, filetype).then((res) => {
      console.log(res)
      if (res.success) {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: res.message });
        this.selectedtrtimeonsite.reqdoc_data = this.selectedtrtimeonsite.reqdoc_data.concat({
          company_code: this.selectedtrtimeonsite.company_code || this.initial_current.CompCode,
          document_id: 0,
          job_id: this.selectedtrtimeonsite.timeonsite_id.toString(),
          job_type: 'ONS',
          document_name: filename + "." + filetype,
          document_type: this.fileToUpload.type,
          document_path: res.message,
          created_by: this.initial_current.Username,
          created_date: new Date().toISOString()
        })
        this.Uploadfile = false;
      }
      else {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: res.message });
      }
      this.fileToUpload = null;
    });
  }
  doLoadMenu() {

    this.items = [

      {
        label: this.langs.get('new')[this.selectlang],
        icon: 'pi pi-fw pi-plus',
        command: (event) => {
          this.selectedtrtimeonsite = new cls_TRTimeonsiteModel();
          this.reasonselected = this.reason_list[0]
          this.locationselected = this.location_list[0]
          this.selectedtrtimeonsite.reason_code = this.reason_list[0].reason_code
          this.selectedtrtimeonsite.location_code = this.location_list[0].location_code
          this.showManage()
        }

      },
      // {
      //   label: 'Edit',
      //   icon: 'pi pi-fw pi-pencil',
      //   command: (event) => {
      //     console.log('Edit')
      //   }
      // },
      // {
      //   label: 'Delete',
      //   icon: 'pi pi-fw pi-trash',
      // }

      // ,
      {
        label: this.langs.get('import')[this.selectlang],
        icon: 'pi pi-fw pi-file-import',
      }
      ,
      {
        label: this.langs.get('export')[this.selectlang],
        icon: 'pi pi-fw pi-file-export',
      }

    ];

    this.items_attfile = [

      {
        label: this.langs.get('new')[this.selectlang],
        icon: 'pi pi-fw pi-plus',
        command: (event) => {
          this.Uploadfile = true;
        }
      },
      // {
      //   label: 'เพิ่มไฟล์แนบ',
      //   icon: 'pi pi-fw pi-plus',
      //   command: (event) => {
      //     console.log('Edit')
      //   }
      // },
      // {
      //   label: 'ลบ',
      //   icon: 'pi pi-fw pi-trash',
      // }


    ];

  }
  Uploadfiledoc() {
    if (this.fileToUpload) {
      this.confirmationService.confirm({
        message: this.langs.get('confirm_upload')[this.selectlang] + this.fileToUpload.name,
        header: this.langs.get('import')[this.selectlang],
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
          this.Uploadfile = false;
          this.doUploadFile();
          this.fileUploader.nativeElement.value = null;
        },
        reject: () => {
          this.Uploadfile = false;
        }
      });
    } else {
      this.messageService.add({ severity: 'warn', summary: 'File', detail: "Please choose a file." });
    }
  }
  DeleteFile(data: cls_MTReqdocumentModel) {
    this.confirmationService.confirm({
      message: this.langs.get('confirm_delete')[this.selectlang] + data.document_name,
      header: this.langs.get('delete')[this.selectlang],
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        if (data.document_id) {
          this.timeonsiteService.delete_file(data).then((res) => {
            if (res.success) {
              this.messageService.add({ severity: 'success', summary: 'Success', detail: res.message });
            } else {
              this.messageService.add({ severity: 'error', summary: 'Error', detail: res.message });
            }
          })
        } else {
          this.selectedtrtimeonsite.reqdoc_data = this.selectedtrtimeonsite.reqdoc_data.filter((item) => {
            return item !== data;
          });
        }
        this.timeonsiteService.deletefilepath_file(data.document_path).then((res) => {
          if (res.success) {
            this.messageService.add({ severity: 'success', summary: 'Success', detail: res.message });
            this.selectedtrtimeonsite.reqdoc_data = this.selectedtrtimeonsite.reqdoc_data.filter((item) => {
              return item !== data;
            });
          } else {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: res.message });
          }
        })
      },
      reject: () => {

      }
    });
  }
  handleFileInputholidaylist(file: FileList) {
    this.fileToUpload = file.item(0);
  }
  onRowSelectfile(event: Event) {
    this.doGetfileTimeonsite(this.selectedreqdoc.document_path, this.selectedreqdoc.document_type)
  }
  onRowSelect(event: Event) {
    this.location_list.forEach((obj: LocationModel) => {
      if (obj.location_code == this.selectedtrtimeonsite.location_code) {
        this.locationselected = obj;
      }
    })
    this.reason_list.forEach((obj: ReasonsModel) => {
      if (obj.reason_code == this.selectedtrtimeonsite.reason_code) {
        this.reasonselected = obj;
      }
    })
    this.edit_data = true;
    this.displayManage = true
  }
  showManage() {
    this.displayManage = true
    this.edit_data = false;

  }

  closeManage() {
    this.selectedtrtimeonsite = new cls_TRTimeonsiteModel();
    this.displayManage = false

  }
  selectotlocation() {
    this.selectedtrtimeonsite.location_code = this.locationselected.location_code;
  }
  selectotreason() {
    this.selectedtrtimeonsite.reason_code = this.reasonselected.reason_code;
  }
  Save() {
    if (this.selectedtrtimeonsite.timeonsite_doc === "") {
      this.selectedtrtimeonsite.timeonsite_doc = "ONSITE_" + this.datePipe.transform(new Date(), 'yyyyMMddHHmmss');
    }
    // console.log(this.selectedtrtimeonsite)
    this.doRecordTimeonsite([this.selectedtrtimeonsite])
  }
  Delete() {
    this.doDeleteTimeonsite(this.selectedtrtimeonsite)
  }
  getFullStatus(code: string) {
    let status = ""
    switch (code) {
      case "W":
        status = this.langs.get('wait')[this.selectlang];
        break;
      case "F":
        status = this.langs.get('finish')[this.selectlang];
        break;
      case "C":
        status = this.langs.get('reject')[this.selectlang];
    }
    return status;
  }
}

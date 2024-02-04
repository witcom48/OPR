import { DatePipe } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, MegaMenuItem, MenuItem, MessageService } from 'primeng/api';
import { AppConfig } from 'src/app/config/config';
import { InitialCurrent } from 'src/app/config/initial_current';
import { AccountModel } from 'src/app/models/self/account';
import { cls_MTReqdocumentModel } from 'src/app/models/self/cls_MTReqdocument';
import { cls_TRTimeonsiteModel } from 'src/app/models/self/cls_TRTimeonsite';
import { TRAccountModel } from 'src/app/models/self/traccount';
import { SysLocationModel } from 'src/app/models/system/policy/location';
import { ReasonsModel } from 'src/app/models/system/policy/reasons';
import { AccountServices } from 'src/app/services/self/account.service';
import { TimeonsiteServices } from 'src/app/services/self/timeonsite';
import { LocationService } from 'src/app/services/system/policy/location.service';
import { ReasonsService } from 'src/app/services/system/policy/reasons.service';
declare var reqonsite: any;
interface Status { name: string, code: number }
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
  namedis: string = "worker_detail_en"
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
    private accountServie: AccountServices,
    private datePipe: DatePipe,
    private router: Router,
  ) { }
  mainMenuItems: MenuItem[] = [];
  homeIcon: any = { icon: 'pi pi-home', routerLink: '/' };
  fileToUpload: File | any = null;
  Uploadfile: boolean = false;
  reason_list: ReasonsModel[] = [];
  reasonselected: ReasonsModel = new ReasonsModel();
  location_list: SysLocationModel[] = [];
  locationselected: SysLocationModel = new SysLocationModel();
  trtimonsite_list: cls_TRTimeonsiteModel[] = [];
  selectedtrtimeonsite: cls_TRTimeonsiteModel = new cls_TRTimeonsiteModel();
  selectedreqdoc: cls_MTReqdocumentModel = new cls_MTReqdocumentModel();
  account_list: TRAccountModel[] = [];
  account_list_source: TRAccountModel[] = [];
  account_list_dest: TRAccountModel[] = [];
  selectedAccount: TRAccountModel = new TRAccountModel();
  start_date: Date = new Date();
  end_date: Date = new Date();
  status_list: Status[] = [{ name: this.langs.get('wait')[this.selectlang], code: 0 }, { name: this.langs.get('finish')[this.selectlang], code: 3 }, { name: this.langs.get('reject')[this.selectlang], code: 4 }];
  status_select: Status = { name: this.langs.get('wait')[this.selectlang], code: 0 }
  public initial_current: InitialCurrent = new InitialCurrent();
  doGetInitialCurrent() {
    this.initial_current = JSON.parse(localStorage.getItem(AppConfig.SESSIONInitial) || '{}');
    if (!this.initial_current.Token) {
      this.router.navigateByUrl('login');
    }
    this.start_date = new Date(`${this.initial_current.PR_Year}-01-01`);
    this.end_date = new Date(`${this.initial_current.PR_Year}-12-31`);
    this.selectlang = this.initial_current.Language;
    if (this.initial_current.Language == "TH") {
      this.reasonedis = "reason_name_th";
      this.locatiodis = "location_name_th"
      this.namedis = "worker_detail_th"
    }
    if (this.initial_current.Usertype == "GRP") {
      this.doLoadAccount();
    } else {
      this.doLoadTimeonsite();
    }
    this.status_list = [{ name: this.langs.get('wait')[this.selectlang], code: 0 }, { name: this.langs.get('finish')[this.selectlang], code: 3 }, { name: this.langs.get('reject')[this.selectlang], code: 4 }, { name: this.selectlang == "EN" ? "All" : "ทั้งหมด", code: 1 }];
  }
  ngOnInit(): void {
    this.doGetInitialCurrent();
    this.doLoadMenu();
    this.doLoadReason();
    this.doLoadLocation()
  }
  Search() {
    this.doLoadTimeonsite();
  }
  doLoadAccount() {
    var tmp = new AccountModel();
    tmp.account_user = this.initial_current.Username;
    tmp.account_type = this.initial_current.Usertype;
    this.accountServie.account_get(tmp).then(async (res) => {
      res[0].worker_data.forEach((obj: TRAccountModel) => {
        obj.worker_detail_en = obj.worker_code + " : " + obj.worker_detail_en;
        obj.worker_detail_th = obj.worker_code + " : " + obj.worker_detail_th;
      });
      this.account_list = await res[0].worker_data;
      this.selectedAccount = res[0].worker_data[0];
      this.doLoadTimeonsite();
    });
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
    let data = new SysLocationModel()
    this.locationService.location_get(data).then(async (res) => {
      this.location_list = await res;
    });
  }
  doLoadTimeonsite() {
    this.trtimonsite_list = [];
    var tmp = new cls_TRTimeonsiteModel();
    tmp.timeonsite_workdate = this.start_date;
    tmp.timeonstie_todate = this.end_date;
    tmp.status = this.status_select.code;
    tmp.worker_code = this.selectedAccount.worker_code;
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
      // console.log(res)
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
    this.mainMenuItems = [{ label: this.langs.get('employee')[this.selectlang], routerLink: '/self/employee' },
    { label: this.langs.get('title_onsite')[this.selectlang], routerLink: '/self/req_record', styleClass: 'activelike' }]
    this.items = [

      {
        label: this.langs.get('new')[this.selectlang],
        icon: 'pi pi-fw pi-plus',
        command: (event) => {
          this.account_list_source = [];
          this.account_list_dest = [];
          this.selectedtrtimeonsite = new cls_TRTimeonsiteModel();
          this.reasonselected = this.reason_list[0]
          this.locationselected = this.location_list[0]
          this.selectedtrtimeonsite.reason_code = this.reason_list[0].reason_code
          this.selectedtrtimeonsite.location_code = this.location_list[0].location_code
          if (this.initial_current.Usertype == "GRP") {
            this.account_list.forEach((obj: TRAccountModel) => {
              this.account_list_source.push(obj)
            })
          }
          this.showManage()
        }

      },
      // {
      //   label: 'Edit',
      //   icon: 'pi pi-fw pi-pencil',
      //   command: (event) => {
      //     // console.log('Edit')
      //   }
      // },
      // {
      //   label: 'Delete',
      //   icon: 'pi pi-fw pi-trash',
      // }

      // ,
      // {
      //   label: this.langs.get('import')[this.selectlang],
      //   icon: 'pi pi-fw pi-file-import',
      // }
      // ,
      // {
      //   label: this.langs.get('export')[this.selectlang],
      //   icon: 'pi pi-fw pi-file-export',
      // }

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
      //     // console.log('Edit')
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
    this.location_list.forEach((obj: SysLocationModel) => {
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
    this.confirmationService.confirm({
      message: this.langs.get('confirm_doc')[this.selectlang],
      header: this.langs.get('title_onsite')[this.selectlang],
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        if (this.initial_current.Usertype == "GRP" && !this.edit_data) {
          let data_doc: cls_TRTimeonsiteModel[] = []
          this.account_list_dest.forEach((obj: TRAccountModel, index) => {
            var tmp: cls_TRTimeonsiteModel = new cls_TRTimeonsiteModel();
            tmp.timeonsite_id = this.selectedtrtimeonsite.timeonsite_id;
            tmp.timeonsite_doc = "ONSITE_" + (Number(this.datePipe.transform(new Date(), 'yyyyMMddHHmmss')) + index);
            tmp.timeonsite_workdate = this.selectedtrtimeonsite.timeonsite_workdate;
            tmp.timeonstie_todate = this.selectedtrtimeonsite.timeonstie_todate;
            tmp.timeonsite_in = this.selectedtrtimeonsite.timeonsite_in;
            tmp.timeonsite_out = this.selectedtrtimeonsite.timeonsite_out;
            tmp.location_code = this.selectedtrtimeonsite.location_code;
            tmp.reason_code = this.selectedtrtimeonsite.reason_code;
            tmp.timeonsite_note = this.selectedtrtimeonsite.timeonsite_note;
            tmp.reqdoc_data = this.selectedtrtimeonsite.reqdoc_data;
            tmp.worker_code = obj.worker_code;
            data_doc.push(tmp)
          })
          this.doRecordTimeonsite(data_doc)
        } else {
          if (this.selectedtrtimeonsite.timeonsite_doc === "") {
            this.selectedtrtimeonsite.timeonsite_doc = "ONSITE_" + this.datePipe.transform(new Date(), 'yyyyMMddHHmmss');
          }
          // // console.log(this.selectedtrtimeonsite)
          this.doRecordTimeonsite([this.selectedtrtimeonsite])
        }
      },
      reject: () => {
      }
    });
  }
  Delete() {
    this.confirmationService.confirm({
      message: this.langs.get('confirm_delete_doc')[this.selectlang] + this.selectedtrtimeonsite.timeonsite_doc,
      header: this.langs.get('title_onsite')[this.selectlang],
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.doDeleteTimeonsite(this.selectedtrtimeonsite)
      },
      reject: () => {
      }
    });
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

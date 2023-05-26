import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, MegaMenuItem, MenuItem, MessageService } from 'primeng/api';
import { AppConfig } from 'src/app/config/config';
import { InitialCurrent } from 'src/app/config/initial_current';
import { ShiftModels } from 'src/app/models/attendance/shift';
import { cls_MTReqdocumentModel } from 'src/app/models/self/cls_MTReqdocument';
import { cls_TRTimeshiftModel } from 'src/app/models/self/cls_TRTimeshift';
import { ReasonsModel } from 'src/app/models/system/policy/reasons';
import { ShiftServices } from 'src/app/services/attendance/shift.service';
import { TimecardService } from 'src/app/services/attendance/timecards.service';
import { TimeShiftServices } from 'src/app/services/self/timeshift.service';
import { ReasonsService } from 'src/app/services/system/policy/reasons.service';
declare var reqshift: any;
@Component({
  selector: 'app-self-changeshift',
  templateUrl: './self-changeshift.component.html',
  styleUrls: ['./self-changeshift.component.scss']
})
export class SelfChangeshiftComponent implements OnInit {
  langs: any = reqshift;
  selectlang: string = "EN";
  displayManage: boolean = false;
  Uploadfile: boolean = false;
  edit_data: boolean = false;
  position: string = "right";
  reasonedis: string = "reason_name_en"
  shfitdis: string = "shift_name_en"
  items: MenuItem[] = [];
  items_attfile: MenuItem[] = [];
  constructor(
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private datePipe: DatePipe,
    private reasonService: ReasonsService,
    private shiftService: ShiftServices,
    private timeshiftService: TimeShiftServices,
    private timecardService: TimecardService,
    private router: Router,
  ) { }
  reason_list: ReasonsModel[] = [];
  reasonselected: ReasonsModel = new ReasonsModel();
  shift_new_list: ShiftModels[] = [];
  shift_newselected: ShiftModels = new ShiftModels();
  fileToUpload: File | any = null;
  trtimeshfit_list: cls_TRTimeshiftModel[] = [];
  selectedtrtimeshfit: cls_TRTimeshiftModel = new cls_TRTimeshiftModel();
  selectedreqdoc: cls_MTReqdocumentModel = new cls_MTReqdocumentModel();
  public initial_current: InitialCurrent = new InitialCurrent();
  doGetInitialCurrent() {
    this.initial_current = JSON.parse(localStorage.getItem(AppConfig.SESSIONInitial) || '{}');
    if (!this.initial_current.Token) {
      this.router.navigateByUrl('');
    }
    this.selectlang = this.initial_current.Language;
    if (this.initial_current.Language == "TH") {
      this.reasonedis = "reason_name_th"
      this.shfitdis = "shift_name_th"
    }
  }
  ngOnInit(): void {
    this.doGetInitialCurrent();
    this.doLoadMenu();
    this.doLoadTimeshift();
    this.doLoadReason();
    this.doLoadShfit();
  }
  doLoadTimeshift() {
    this.trtimeshfit_list = [];
    var tmp = new cls_TRTimeshiftModel();
    tmp.timeshift_workdate = new Date(`${this.initial_current.PR_Year}-01-01`)
    tmp.timeshift_todate = new Date(`${this.initial_current.PR_Year}-12-31`)
    this.timeshiftService.timeshift_get(tmp).then(async (res) => {
      res.forEach((elm: any) => {
        elm.timeshift_workdate = new Date(elm.timeshift_workdate)
      });
      this.trtimeshfit_list = await res
    });

  }
  doLoadReason() {
    this.reason_list = [];
    let data = new ReasonsModel()
    data.reason_group = "SHT"
    this.reasonService.reason_get(data).then(async (res) => {
      this.reason_list = await res;
    });
  }
  doLoadShfit() {
    this.reason_list = [];
    let data = new ShiftModels()
    this.shiftService.shift_get(data).then(async (res) => {
      this.shift_new_list = await res;
    });
  }
  doLoadShfitOld() {
    this.timecardService.timecard_get(this.initial_current.CompCode, "", this.initial_current.Username, this.selectedtrtimeshfit.timeshift_workdate, this.selectedtrtimeshfit.timeshift_workdate).then(async (res) => {
      this.shift_new_list.forEach((obj: ShiftModels) => {
        if (obj.shift_code == res[0].shift_code) {
          this.selectedtrtimeshfit.shift_old_en = obj.shift_name_en
          this.selectedtrtimeshfit.shift_old_th = obj.shift_name_th
          this.selectedtrtimeshfit.timeshift_old = obj.shift_code
        }
      })
    });
  }
  async doRecordTimeshift(data: cls_TRTimeshiftModel[]) {
    await this.timeshiftService.timeshift_record(data).then((res) => {
      if (res.success) {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: res.message });
        this.doLoadTimeshift();
      }
      else {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: res.message });
      }

    });
    this.leavetype = "F"
    this.closeManage()
  }
  doUploadFile() {
    const filename = "SHIFT_DOC" + this.datePipe.transform(new Date(), 'yyyyMMddHHmmss');
    const filetype = this.fileToUpload.name.split(".")[1];
    this.timeshiftService.file_import(this.fileToUpload, filename, filetype).then((res) => {
      console.log(res)
      if (res.success) {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: res.message });
        this.selectedtrtimeshfit.reqdoc_data = this.selectedtrtimeshfit.reqdoc_data.concat({
          company_code: this.selectedtrtimeshfit.company_code || this.initial_current.CompCode,
          document_id: 0,
          job_id: this.selectedtrtimeshfit.timeshift_id.toString(),
          job_type: 'SHT',
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
  async doGetfileTimeleave(file_path: string, type: string) {
    this.timeshiftService.get_file(file_path).then((res) => {
      var url = window.URL.createObjectURL(new Blob([new Uint8Array(res)], { type: type }));
      window.open(url);
      this.selectedreqdoc = new cls_MTReqdocumentModel();
    })
  }
  async doDeleteTimeshfit(data: cls_TRTimeshiftModel) {
    await this.timeshiftService.timeshft_delete(data).then((res) => {
      if (res.success) {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: res.message });
        this.doLoadTimeshift();
      }
      else {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: res.message });
      }

    });
    this.closeManage()
  }
  doLoadMenu() {

    this.items = [

      {
        label: this.langs.get('new')[this.selectlang],
        icon: 'pi pi-fw pi-plus',
        command: (event) => {
          this.selectedtrtimeshfit = new cls_TRTimeshiftModel();
          this.shift_newselected = this.shift_new_list[0]
          this.reasonselected = this.reason_list[0]
          this.selectedtrtimeshfit.timeshift_new = this.shift_new_list[0].shift_code
          this.selectedtrtimeshfit.reason_code = this.reason_list[0].reason_code
          this.doLoadShfitOld();
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
  DeleteFile(data: cls_MTReqdocumentModel) {
    this.confirmationService.confirm({
      message: this.langs.get('confirm_delete')[this.selectlang] + data.document_name,
      header: this.langs.get('delete')[this.selectlang],
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        console.log(data)
        if (data.document_id) {
          this.timeshiftService.delete_file(data).then((res) => {
            if (res.success) {
              this.messageService.add({ severity: 'success', summary: 'Success', detail: res.message });
            } else {
              this.messageService.add({ severity: 'error', summary: 'Error', detail: res.message });
            }
          })
        } else {
          this.selectedtrtimeshfit.reqdoc_data = this.selectedtrtimeshfit.reqdoc_data.filter((item) => {
            return item !== data;
          });
        }
        this.timeshiftService.deletefilepath_file(data.document_path).then((res) => {
          if (res.success) {
            this.messageService.add({ severity: 'success', summary: 'Success', detail: res.message });
            this.selectedtrtimeshfit.reqdoc_data = this.selectedtrtimeshfit.reqdoc_data.filter((item) => {
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
  Uploadfiledoc() {
    if (this.fileToUpload) {
      this.confirmationService.confirm({
        message: this.langs.get('confirm_upload')[this.selectlang] + this.fileToUpload.name,
        header: this.langs.get('import')[this.selectlang],
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
          this.Uploadfile = false;
          this.doUploadFile();
        },
        reject: () => {
          this.Uploadfile = false;
        }
      });
    } else {
      this.messageService.add({ severity: 'warn', summary: 'File', detail: "Please choose a file." });
    }
  }
  handleFileInputholidaylist(file: FileList) {
    this.fileToUpload = file.item(0);
  }
  selectshfitnew() {
    this.selectedtrtimeshfit.timeshift_new = this.shift_newselected.shift_code;

  }
  selectShfitreason() {
    this.selectedtrtimeshfit.reason_code = this.reasonselected.reason_code;
  }
  onRowSelectfile(event: Event) {
    this.doGetfileTimeleave(this.selectedreqdoc.document_path, this.selectedreqdoc.document_type)
  }
  onRowSelect(event: Event) {
    this.shift_new_list.forEach((obj: ShiftModels) => {
      if (obj.shift_code == this.selectedtrtimeshfit.timeshift_new) {
        this.shift_newselected = obj;
      }
    })
    this.reason_list.forEach((obj: ReasonsModel) => {
      if (obj.reason_code == this.selectedtrtimeshfit.reason_code) {
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
    this.selectedtrtimeshfit = new cls_TRTimeshiftModel();
    this.displayManage = false

  }

  date_from = new Date();
  date_to = new Date();

  date_half = new Date();
  time_half: string = "00:00"

  leavetype: string = "F";

  onchangeType() {

  }
  Save() {
    if (this.selectedtrtimeshfit.timeshift_doc === "") {
      this.selectedtrtimeshfit.timeshift_doc = "SHIFT_" + this.datePipe.transform(new Date(), 'yyyyMMddHHmmss');
    }
    // console.log(this.selectedtrtimeshfit)
    this.doRecordTimeshift([this.selectedtrtimeshfit])
  }
  Delete() {
    this.doDeleteTimeshfit(this.selectedtrtimeshfit)
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

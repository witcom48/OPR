import { DatePipe } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, MenuItem, MessageService } from 'primeng/api';
import { AppConfig } from 'src/app/config/config';
import { InitialCurrent } from 'src/app/config/initial_current';
import { DaytypeModels } from 'src/app/models/attendance/daytype';
import { AccountModel } from 'src/app/models/self/account';
import { cls_MTReqdocumentModel } from 'src/app/models/self/cls_MTReqdocument';
import { cls_TRTimedaytypeModel } from 'src/app/models/self/cls_TRTimedaytype';
import { TRAccountModel } from 'src/app/models/self/traccount';
import { ReasonsModel } from 'src/app/models/system/policy/reasons';
import { TimecardService } from 'src/app/services/attendance/timecards.service';
import { AccountServices } from 'src/app/services/self/account.service';
import { TimeDaytypeServices } from 'src/app/services/self/timedaytype.service';
import { ReasonsService } from 'src/app/services/system/policy/reasons.service';
declare var reqdaytype: any;
interface Status { name: string, code: number }
@Component({
  selector: 'app-self-daytype',
  templateUrl: './self-daytype.component.html',
  styleUrls: ['./self-daytype.component.scss']
})
export class SelfDaytypeComponent implements OnInit {
  @ViewChild('fileUploader') fileUploader: ElementRef | any = null;
  langs: any = reqdaytype;
  selectlang: string = "EN";
  reasonedis: string = "reason_name_en"
  daytypeedis: string = "daytype_name_en"
  position: string = "right";
  displayManage: boolean = false;
  edit_data: boolean = false;
  constructor(
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private datePipe: DatePipe,
    private reasonService: ReasonsService,
    private timedaytypeService: TimeDaytypeServices,
    private timecardService: TimecardService,
    private accountServie: AccountServices,
    private router: Router,
  ) { }
  mainMenuItems: MenuItem[] = [];
  homeIcon: any = { icon: 'pi pi-home', routerLink: '/' };
  fileToUpload: File | any = null;
  Uploadfile: boolean = false;
  daytype_list: DaytypeModels[] = [];
  daytype_newselected: DaytypeModels = new DaytypeModels();
  items: MenuItem[] = [];
  items_attfile: MenuItem[] = [];
  namedis: string = "worker_detail_en"
  reason_list: ReasonsModel[] = [];
  reasonselected: ReasonsModel = new ReasonsModel();
  timedaytype_list: cls_TRTimedaytypeModel[] = [];
  selectedtimedaytype: cls_TRTimedaytypeModel = new cls_TRTimedaytypeModel();
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
      this.reasonedis = "reason_name_th"
      this.daytypeedis = "daytype_name_th"
      this.namedis = "worker_detail_th"
    }
    if (this.initial_current.Usertype == "GRP") {
      this.doLoadAccount();
    } else {
      this.doLoadTimedaytype();
    }
  }
  ngOnInit(): void {
    this.doGetInitialCurrent();
    this.doLoadMenu();
    this.doLoadReason();
    this.doLoadPolDaytype();
  }
  Search() {
    this.doLoadTimedaytype();
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
      this.doLoadTimedaytype();
    });
  }
  doLoadTimedaytype() {
    this.timedaytype_list = [];
    var tmp = new cls_TRTimedaytypeModel();
    tmp.timedaytype_workdate = this.start_date;
    tmp.timedaytype_todate = this.end_date;
    tmp.status = this.status_select.code;
    tmp.worker_code = this.selectedAccount.worker_code;
    this.timedaytypeService.timedaytype_get(tmp).then(async (res) => {
      res.forEach((elm: any) => {
        elm.timedaytype_workdate = new Date(elm.timedaytype_workdate)
      });
      this.timedaytype_list = await res
    });

  }
  doLoadPolDaytype() {
    this.daytype_list = []
    this.timecardService.daytype_get().then(async (res) => {
      // console.log(res)
      this.daytype_list = await res;
    });
  }
  doLoadReason() {
    this.reason_list = [];
    let data = new ReasonsModel()
    data.reason_group = "DAT"
    this.reasonService.reason_get(data).then(async (res) => {
      this.reason_list = await res;
    });
  }
  async doRecordTimedaytype(data: cls_TRTimedaytypeModel[]) {
    await this.timedaytypeService.timedaytype_record(data).then((res) => {
      if (res.success) {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: res.message });
        this.doLoadTimedaytype();
      }
      else {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: res.message });
      }

    });
    this.closeManage()
  }
  async doDeleteTimedaytype(data: cls_TRTimedaytypeModel) {
    await this.timedaytypeService.timedaytype_delete(data).then((res) => {
      if (res.success) {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: res.message });
        this.doLoadTimedaytype();
      }
      else {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: res.message });
      }

    });
    this.closeManage()
  }
  doLoadDaytypeOld() {
    this.timecardService.timecard_get(this.initial_current.CompCode, "", this.initial_current.Username, this.selectedtimedaytype.timedaytype_workdate, this.selectedtimedaytype.timedaytype_todate).then(async (res) => {
      // console.log(res[0])
      this.selectedtimedaytype.timedaytype_old = res[0].timecard_daytype;
      // this.daytype_list.forEach((obj: DaytypeModels) => {
      //   if (obj.daytype_code == res[0].daytype_code) {
      //     this.selectedtrtimeshfit.shift_old_en = obj.shift_name_en
      //     this.selectedtrtimeshfit.shift_old_th = obj.shift_name_th
      //     this.selectedtrtimeshfit.timeshift_old = obj.shift_code
      //   }
      // })
    });
  }
  async doGetfileTimeleave(file_path: string, type: string) {
    this.timedaytypeService.get_file(file_path).then((res) => {
      var url = window.URL.createObjectURL(new Blob([new Uint8Array(res)], { type: type }));
      window.open(url);
      this.selectedreqdoc = new cls_MTReqdocumentModel();
    })
  }
  doUploadFile() {
    const filename = "DAYTYPE_DOC" + this.datePipe.transform(new Date(), 'yyyyMMddHHmmss');
    const filetype = this.fileToUpload.name.split(".")[1];
    this.timedaytypeService.file_import(this.fileToUpload, filename, filetype).then((res) => {
      // console.log(res)
      if (res.success) {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: res.message });
        this.selectedtimedaytype.reqdoc_data = this.selectedtimedaytype.reqdoc_data.concat({
          company_code: this.selectedtimedaytype.company_code || this.initial_current.CompCode,
          document_id: 0,
          job_id: this.selectedtimedaytype.timedaytype_id.toString(),
          job_type: 'DAT',
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
  showManage() {
    this.displayManage = true
    this.edit_data = false;
  }
  closeManage() {
    this.selectedtimedaytype = new cls_TRTimedaytypeModel();
    this.displayManage = false

  }
  doLoadMenu() {
    this.mainMenuItems = [{ label: this.langs.get('employee')[this.selectlang], routerLink: '/self/employee' },
    { label: this.langs.get('title_daytype')[this.selectlang], routerLink: '/self/req_daytype', styleClass: 'activelike' }]
    this.items = [

      {
        label: this.langs.get('new')[this.selectlang],
        icon: 'pi pi-fw pi-plus',
        command: (event) => {
          this.account_list_source = [];
          this.account_list_dest = [];
          this.selectedtimedaytype = new cls_TRTimedaytypeModel();
          this.doLoadDaytypeOld();
          this.reasonselected = this.reason_list[0]
          // this.locationselected = this.location_list[0]
          this.daytype_newselected = this.daytype_list[0]
          this.selectedtimedaytype.timedaytype_new = this.daytype_list[0].daytype_code
          this.selectedtimedaytype.reason_code = this.reason_list[0].reason_code
          // this.selectedtrtimeot.location_code = this.location_list[0].location_code
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
          this.fileUploader.nativeElement.value = null;
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
  selectdaytypenew() {
    // console.log(this.daytype_newselected.daytype_code)
    this.selectedtimedaytype.timedaytype_new = this.daytype_newselected.daytype_code
  }
  selectDaytypereason() {
    this.selectedtimedaytype.reason_code = this.reasonselected.reason_code;
  }
  DeleteFile(data: cls_MTReqdocumentModel) {
    this.confirmationService.confirm({
      message: this.langs.get('confirm_delete')[this.selectlang] + data.document_name,
      header: this.langs.get('delete')[this.selectlang],
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        // console.log(data)
        if (data.document_id) {
          this.timedaytypeService.delete_file(data).then((res) => {
            if (res.success) {
              this.messageService.add({ severity: 'success', summary: 'Success', detail: res.message });
            } else {
              this.messageService.add({ severity: 'error', summary: 'Error', detail: res.message });
            }
          })
        } else {
          this.selectedtimedaytype.reqdoc_data = this.selectedtimedaytype.reqdoc_data.filter((item) => {
            return item !== data;
          });
        }
        this.timedaytypeService.deletefilepath_file(data.document_path).then((res) => {
          if (res.success) {
            this.messageService.add({ severity: 'success', summary: 'Success', detail: res.message });
            this.selectedtimedaytype.reqdoc_data = this.selectedtimedaytype.reqdoc_data.filter((item) => {
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
    this.doGetfileTimeleave(this.selectedreqdoc.document_path, this.selectedreqdoc.document_type)
  }
  onRowSelect(event: Event) {
    this.daytype_list.forEach((obj: DaytypeModels) => {
      if (obj.daytype_code == this.selectedtimedaytype.timedaytype_new) {
        this.daytype_newselected = obj;
      }
    })
    this.reason_list.forEach((obj: ReasonsModel) => {
      if (obj.reason_code == this.selectedtimedaytype.reason_code) {
        this.reasonselected = obj;
      }
    })
    this.edit_data = true;
    this.displayManage = true
  }
  Delete() {
    this.confirmationService.confirm({
      message: this.langs.get('confirm_delete_doc')[this.selectlang],
      header: this.langs.get('title_daytype')[this.selectlang],
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.doDeleteTimedaytype(this.selectedtimedaytype)
      },
      reject: () => {
      }
    });
  }
  Save() {
    this.confirmationService.confirm({
      message: this.langs.get('confirm_doc')[this.selectlang],
      header: this.langs.get('title_daytype')[this.selectlang],
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        if (this.initial_current.Usertype == "GRP" && !this.edit_data) {
          let data_doc: cls_TRTimedaytypeModel[] = []
          this.account_list_dest.forEach((obj: TRAccountModel, index) => {
            var tmp: cls_TRTimedaytypeModel = new cls_TRTimedaytypeModel();
            tmp.timedaytype_id = this.selectedtimedaytype.timedaytype_id;
            tmp.timedaytype_doc = "DAYTYPE_" + (Number(this.datePipe.transform(new Date(), 'yyyyMMddHHmmss')) + index);
            tmp.timedaytype_workdate = this.selectedtimedaytype.timedaytype_workdate;
            tmp.timedaytype_todate = this.selectedtimedaytype.timedaytype_todate;
            tmp.timedaytype_new = this.selectedtimedaytype.timedaytype_new;
            tmp.reason_code = this.selectedtimedaytype.reason_code;
            tmp.timedaytype_note = this.selectedtimedaytype.timedaytype_note;
            tmp.reqdoc_data = this.selectedtimedaytype.reqdoc_data;
            tmp.worker_code = obj.worker_code;
            data_doc.push(tmp)
          })
          this.doRecordTimedaytype(data_doc)
        } else {
          if (this.selectedtimedaytype.timedaytype_doc === "") {
            this.selectedtimedaytype.timedaytype_doc = "DAYTYPE_" + this.datePipe.transform(new Date(), 'yyyyMMddHHmmss');
          }
          // // console.log(this.selectedtimedaytype)
          this.doRecordTimedaytype([this.selectedtimedaytype])
        }
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
  getFullDay(day: string) {
    let dayfull = ""
    switch (day) {
      case "N":
        dayfull = this.langs.get('normalday')[this.selectlang];
        break;
      case "O":
        dayfull = this.langs.get('offday')[this.selectlang];
        break;
      case "H":
        dayfull = this.langs.get('holiday')[this.selectlang];
        break;
      case "C":
        dayfull = this.langs.get('companyday')[this.selectlang];
        break;
      case "L":
        dayfull = this.langs.get('leaveday')[this.selectlang];
        break;
      case "A":
        dayfull = this.langs.get('absentday')[this.selectlang];
    }
    return dayfull;
  }
}



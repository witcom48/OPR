import { DatePipe } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, MegaMenuItem, MenuItem, MessageService } from 'primeng/api';
import { AppConfig } from 'src/app/config/config';
import { InitialCurrent } from 'src/app/config/initial_current';
import { ShiftModels } from 'src/app/models/attendance/shift';
import { AccountModel } from 'src/app/models/self/account';
import { cls_MTReqdocumentModel } from 'src/app/models/self/cls_MTReqdocument';
import { cls_TRTimeotModel } from 'src/app/models/self/cls_TRTimeot';
import { TRAccountModel } from 'src/app/models/self/traccount';
import { SysLocationModel } from 'src/app/models/system/policy/location';
import { ReasonsModel } from 'src/app/models/system/policy/reasons';
import { ShiftServices } from 'src/app/services/attendance/shift.service';
import { TimecardService } from 'src/app/services/attendance/timecards.service';
import { AccountServices } from 'src/app/services/self/account.service';
import { ApproveServices } from 'src/app/services/self/approve.service';
import { TimeleaveServices } from 'src/app/services/self/timeleave.service';
import { TimeotServices } from 'src/app/services/self/timeot.service';
import { LocationService } from 'src/app/services/system/policy/location.service';
import { ReasonsService } from 'src/app/services/system/policy/reasons.service';
import * as XLSX from 'xlsx';
declare var reqot: any;
interface Status { name: string, code: number }
@Component({
  selector: 'app-self-overtime',
  templateUrl: './self-overtime.component.html',
  styleUrls: ['./self-overtime.component.scss']
})
export class SelfOvertimeComponent implements OnInit {
  @ViewChild('fileUploader') fileUploader: ElementRef | any = null;
  langs: any = reqot;
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
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private datePipe: DatePipe,
    private timeotService: TimeotServices,
    private reasonService: ReasonsService,
    private locationService: LocationService,
    private accountServie: AccountServices,
    private approveservice: ApproveServices,
    private timleaveServices: TimeleaveServices,
    private router: Router,
    private shiftService: ShiftServices,
    private timecardService: TimecardService,
  ) { }
  timein: string = "";
  timeout: string = "";
  indayleve: boolean = false;
  itemsapprove: MenuItem[] = [];
  mainMenuItems: MenuItem[] = [];
  homeIcon: any = { icon: 'pi pi-home', routerLink: '/' };
  fileToUpload: File | any = null;
  Uploadfile: boolean = false;
  reason_list: ReasonsModel[] = [];
  reasonselected: ReasonsModel = new ReasonsModel();
  location_list: SysLocationModel[] = [];
  locationselected: SysLocationModel = new SysLocationModel();
  trtimeot_list: cls_TRTimeotModel[] = [];
  selectedtrtimeot: cls_TRTimeotModel = new cls_TRTimeotModel();
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
      this.doLoadTimeot();
    }
    this.status_list = [{ name: this.langs.get('wait')[this.selectlang], code: 0 }, { name: this.langs.get('finish')[this.selectlang], code: 3 }, { name: this.langs.get('reject')[this.selectlang], code: 4 }, { name: this.selectlang == "EN" ? "All" : "ทั้งหมด", code: 1 }];
  }
  ngOnInit(): void {
    this.doGetInitialCurrent();
    this.doLoadMenu();
    this.doLoadReason();
    this.doLoadLocation();
  }
  timeshift_old: string = "";
  otbreakall: boolean = false;
  checktimeintimeout() {
    if (this.timein) {
      var date1 = new Date(0, 0, 0, Number(this.timein.split(":")[0]), Number(this.timein.split(":")[1]), 0)
      var date11 = new Date(0, 0, 0, Number(this.shift_new_list[0].shift_ch3.split(":")[0]), Number(this.shift_new_list[0].shift_ch3.split(":")[1]), 0)
      console.log('timein', this.get2digits(date1.getHours()), this.get2digits(date1.getMinutes()));
      console.log('timeshiftin', this.get2digits(date11.getHours()), this.get2digits(date11.getMinutes()));
      if (date1 < date11) {
        var datedata = this.subtractHoursAndMinutes(date11, date1.getHours(), date1.getMinutes());
        console.log(datedata.getHours(), datedata.getMinutes())
        this.selectedtrtimeot.timeot_beforemin_hrs = this.get2digits(datedata.getHours()) + ":" + this.get2digits(datedata.getMinutes());
      } else {
        this.selectedtrtimeot.timeot_beforemin_hrs = "00:00"
      }
    }
    if (this.timeout) {
      var date2 = new Date(0, 0, 0, Number(this.timeout.split(":")[0]), Number(this.timeout.split(":")[1]), 0)
      var date22 = new Date(0, 0, 0, Number(this.shift_new_list[0].shift_ch4.split(":")[0]), Number(this.shift_new_list[0].shift_ch4.split(":")[1]), 0)
      console.log(date2)
      console.log(date22)
      console.log('timeout', this.get2digits(date2.getHours()), this.get2digits(date2.getMinutes()));
      console.log('timeshiftout', this.get2digits(date22.getHours()), this.get2digits(date22.getMinutes()));

      if (date2 > date22) {

        var datedata2 = this.subtractHoursAndMinutes(date2, date22.getHours(), this.otbreakall ? date22.getMinutes() : date22.getMinutes() + 30);
        console.log(datedata2.getHours(), datedata2.getMinutes())
        this.selectedtrtimeot.timeot_aftermin_hrs = this.get2digits(datedata2.getHours()) + ":" + this.get2digits(datedata2.getMinutes());
      } else {
        this.selectedtrtimeot.timeot_aftermin_hrs = "00:00"
      }
    }
  }

  subtractHoursAndMinutes(date: Date, hours: number, minutes: number) {
    // Clone the date to avoid modifying the original
    var result = new Date(date);

    // Subtract hours and minutes
    result.setHours(result.getHours() - hours);
    result.setMinutes(result.getMinutes() - minutes);

    return result;
  }


  get2digits(currentHours: number) {
    return ("0" + currentHours).slice(-2)
  }

  shift_new_list: ShiftModels[] = [];
  doLoadShfit() {
    this.shift_new_list = [];
    let data = new ShiftModels()
    this.timecardService.timecard_get(this.initial_current.CompCode, "", this.initial_current.Username, this.selectedtrtimeot.timeot_workdate, this.selectedtrtimeot.timeot_workdate).then(async (res) => {
      res.forEach(async (obj: ShiftModels) => {
        this.timeshift_old = obj.shift_code
        data.shift_code = obj.shift_code;
        await this.shiftService.shift_get(data).then(async (res) => {
          this.shift_new_list = await res;
          console.log(this.shift_new_list);
        });
      })
    });
  }


  doLoadStatusApprove(doc: string) {
    // this.itemsapprove = [];
    let datas: { label: any; styleClass?: string; }[] = [];
    this.approveservice.getDocApproveStatus("", this.initial_current.Username, 'OT', doc).then(async (res) => {
      for (let i = 0; i < res.data.length; i++) {
        console.log(res.data[i].name_th)
        if (res.doccount >= i + 1) {
          datas.push(
            {
              label: this.selectlang == "TH" ? res.data[i].name_th : res.data[i].name_en,
              styleClass: 'activelike'
            },
          )
        } else {
          datas.push(
            {
              label: this.selectlang == "TH" ? res.data[i].name_th : res.data[i].name_en,
            },
          )
        }
      }
      this.itemsapprove = datas;
    });
  }
  Search() {
    this.doLoadTimeot();
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
      this.doLoadTimeot();
    });
  }
  doLoadTimeot() {
    this.trtimeot_list = [];
    var tmp = new cls_TRTimeotModel();
    tmp.timeot_workdate = this.start_date;
    tmp.timeot_todate = this.end_date;
    tmp.status = this.status_select.code;
    tmp.worker_code = this.selectedAccount.worker_code;
    this.timeotService.timeot_get(tmp).then(async (res) => {
      res.forEach((elm: any) => {
        elm.timeot_workdate = new Date(elm.timeot_workdate)
        elm.timeot_workdate_show = this.datePipe.transform(elm.timeot_workdate, 'dd/MM/yyyy')
        elm.reason_name_show = this.selectlang == 'TH' ? elm.reason_name_th : elm.reason_name_en;
        elm.status_show = this.getFullStatus(elm.status);
        elm.modified_date_show = this.datePipe.transform(elm.modified_date, 'dd/MM/yyyy')
      });
      this.trtimeot_list = await res
    });
  }

  doLoadReason() {
    this.reason_list = [];
    let data = new ReasonsModel()
    data.reason_group = "OT"
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
  async doRecordTimeot(data: cls_TRTimeotModel[]) {
    await this.timeotService.timeot_record(data).then((res) => {
      if (res.success) {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: res.message });
        this.doLoadTimeot();
      }
      else {
        if (res.result == "3") {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: this.selectlang == 'TH' ? 'มีวันลาซ้ำที่เคยขอไปแล้ว' : 'There are repeat days of leave that have already been requested.' });
        } else {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: res.message });
        }
      }

    });
    this.closeManage()
  }
  async doDeleteTimeot(data: cls_TRTimeotModel) {
    await this.timeotService.timeot_delete(data).then((res) => {
      if (res.success) {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: res.message });
        this.doLoadTimeot();
      }
      else {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: res.message });
      }

    });
    this.closeManage()
  }
  async doGetfileTimeot(file_path: string, type: string) {
    this.timeotService.get_file(file_path).then((res) => {
      var url = window.URL.createObjectURL(new Blob([new Uint8Array(res)], { type: type }));
      window.open(url);
      this.selectedreqdoc = new cls_MTReqdocumentModel();
    })
  }
  doUploadFile() {
    const filename = "OT_DOC" + this.datePipe.transform(new Date(), 'yyyyMMddHHmmss');
    const filetype = this.fileToUpload.name.split(".")[1];
    this.timeotService.file_import(this.fileToUpload, filename, filetype).then((res) => {
      // console.log(res)
      if (res.success) {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: res.message });
        this.selectedtrtimeot.reqdoc_data = this.selectedtrtimeot.reqdoc_data.concat({
          company_code: this.selectedtrtimeot.company_code || this.initial_current.CompCode,
          document_id: 0,
          job_id: this.selectedtrtimeot.timeot_id.toString(),
          job_type: 'OT',
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
    { label: this.langs.get('title_ot')[this.selectlang], routerLink: '/self/req_overtime', styleClass: 'activelike' }]
    this.items = [

      {
        label: this.langs.get('new')[this.selectlang],
        icon: 'pi pi-fw pi-plus',
        command: (event) => {
          this.doLoadStatusApprove("");
          this.account_list_source = [];
          this.account_list_dest = [];
          this.selectedtrtimeot = new cls_TRTimeotModel();
          this.reasonselected = this.reason_list[0]
          this.locationselected = this.location_list[0]
          this.selectedtrtimeot.reason_code = this.reason_list[0].reason_code
          this.selectedtrtimeot.location_code = this.location_list[0].location_code
          if (this.initial_current.Usertype == "GRP") {
            this.account_list.forEach((obj: TRAccountModel) => {
              this.account_list_source.push(obj)
            })
          }
          this.doLoadShfit();
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
      {
        label: this.langs.get('export')[this.selectlang],
        icon: 'pi pi-fw pi-file-export',
        command: (event) => {
          this.exportAsExcel();
        }
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
          this.timeotService.delete_file(data).then((res) => {
            if (res.success) {
              this.messageService.add({ severity: 'success', summary: 'Success', detail: res.message });
            } else {
              this.messageService.add({ severity: 'error', summary: 'Error', detail: res.message });
            }
          })
        } else {
          this.selectedtrtimeot.reqdoc_data = this.selectedtrtimeot.reqdoc_data.filter((item) => {
            return item !== data;
          });
        }
        this.timeotService.deletefilepath_file(data.document_path).then((res) => {
          if (res.success) {
            this.messageService.add({ severity: 'success', summary: 'Success', detail: res.message });
            this.selectedtrtimeot.reqdoc_data = this.selectedtrtimeot.reqdoc_data.filter((item) => {
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
    this.doGetfileTimeot(this.selectedreqdoc.document_path, this.selectedreqdoc.document_type)
  }
  onRowSelect(event: Event) {
    this.timein = this.selectedtrtimeot.time_in
    this.timeout = this.selectedtrtimeot.time_out
    this.otbreakall = this.selectedtrtimeot.allow_break;
    this.doLoadStatusApprove(this.selectedtrtimeot.timeot_doc);
    this.location_list.forEach((obj: SysLocationModel) => {
      if (obj.location_code == this.selectedtrtimeot.location_code) {
        this.locationselected = obj;
      }
    })
    this.reason_list.forEach((obj: ReasonsModel) => {
      if (obj.reason_code == this.selectedtrtimeot.reason_code) {
        this.reasonselected = obj;
      }
    })
    this.doLoadShfit();
    this.edit_data = true;
    this.displayManage = true
  }
  showManage() {
    this.displayManage = true
    this.edit_data = false;

  }
  selectotlocation() {
    this.selectedtrtimeot.location_code = this.locationselected.location_code;
  }
  selectotreason() {
    this.selectedtrtimeot.reason_code = this.reasonselected.reason_code;
  }

  closeManage() {
    this.selectedtrtimeot = new cls_TRTimeotModel();
    this.displayManage = false
    this.timein = "";
    this.timeout = "";
    this.otbreakall = false;

  }

  date_from = new Date();
  date_to = new Date();

  date_half = new Date();
  time_half: string = "00:00"

  onchangeType() {

  }
  getMin(time: string) {
    if (time) {
      var date1 = new Date(0, 0, 0, Number(time.split(":")[0]), Number(time.split(":")[1]), 0)
      var hours_minutes = date1.getHours() * 60 + date1.getMinutes();
      return hours_minutes;
    } else {
      return 0
    }
  }
  Save() {
    this.confirmationService.confirm({
      message: this.langs.get('confirm_doc')[this.selectlang],
      header: this.langs.get('title_ot')[this.selectlang],
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.selectedtrtimeot.time_in = this.timein
        this.selectedtrtimeot.time_out = this.timeout
        this.selectedtrtimeot.allow_break = this.otbreakall;
        this.selectedtrtimeot.timeot_beforemin = this.getMin(this.selectedtrtimeot.timeot_beforemin_hrs)
        this.selectedtrtimeot.timeot_normalmin = this.getMin(this.selectedtrtimeot.timeot_normalmin_hrs)
        this.selectedtrtimeot.timeot_breakmin = this.getMin(this.selectedtrtimeot.timeot_break_hrs)
        this.selectedtrtimeot.timeot_aftermin = this.getMin(this.selectedtrtimeot.timeot_aftermin_hrs)
        if (this.initial_current.Usertype == "GRP" && !this.edit_data) {
          let data_doc: cls_TRTimeotModel[] = []
          this.account_list_dest.forEach((obj: TRAccountModel, index) => {
            var tmp: cls_TRTimeotModel = new cls_TRTimeotModel();
            tmp.timeot_id = this.selectedtrtimeot.timeot_id;
            tmp.timeot_doc = "OT_" + (Number(this.datePipe.transform(new Date(), 'yyyyMMddHHmmss')) + index);
            tmp.timeot_workdate = this.selectedtrtimeot.timeot_workdate;
            tmp.timeot_todate = this.selectedtrtimeot.timeot_todate;
            tmp.timeot_beforemin = this.selectedtrtimeot.timeot_beforemin;
            tmp.timeot_normalmin = this.selectedtrtimeot.timeot_normalmin;
            tmp.timeot_breakmin = this.selectedtrtimeot.timeot_breakmin;
            tmp.timeot_aftermin = this.selectedtrtimeot.timeot_aftermin;
            tmp.reason_code = this.selectedtrtimeot.reason_code;
            tmp.location_code = this.selectedtrtimeot.location_code;
            tmp.timeot_note = this.selectedtrtimeot.timeot_note;
            tmp.worker_code = obj.worker_code;
            tmp.company_code = obj.company_code;
            tmp.reqdoc_data = this.selectedtrtimeot.reqdoc_data;
            tmp.depart_so = this.selectedtrtimeot.depart_so;
            tmp.time_in = this.timein;
            tmp.time_out = this.timeout;
            tmp.allow_break = this.otbreakall;
            data_doc.push(tmp);
          })
          this.doRecordTimeot(data_doc);
        } else {
          if (this.selectedtrtimeot.timeot_doc === "") {
            this.selectedtrtimeot.timeot_doc = "OT_" + this.datePipe.transform(new Date(), 'yyyyMMddHHmmss');
          }
          // // console.log(this.selectedtrtimeot)
          this.doRecordTimeot([this.selectedtrtimeot])
        }
      },
      reject: () => {
      }
    })
  }
  Delete() {
    this.confirmationService.confirm({
      message: this.langs.get('confirm_delete_doc')[this.selectlang] + this.selectedtrtimeot.timeot_doc,
      header: this.langs.get('title_ot')[this.selectlang],
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.doDeleteTimeot(this.selectedtrtimeot)
      },
      reject: () => {
      }
    });
  }
  getFullStatus(code: number) {
    let status = ""
    switch (code) {
      case 0:
        status = this.langs.get('wait')[this.selectlang];
        break;
      case 3:
        status = this.langs.get('finish')[this.selectlang];
        break;
      case 4:
        status = this.langs.get('reject')[this.selectlang];
    }
    return status;
  }


  doLoadchecldayinleave() {
    console.log(this.selectedtrtimeot.timeot_workdate)
    this.timleaveServices.getdayinleave(this.selectedtrtimeot.timeot_workdate).then((res) => {
      console.log(res);
      this.indayleve = res.indayleave;
    })
  }

  @ViewChild('TABLE') table: ElementRef | any = null;
  exportAsExcel() {
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(this.table.nativeElement);//converts a DOM TABLE element to a worksheet
    for (var i in ws) {
      if (i.startsWith("!") || i.charAt(1) !== "1") {
        continue;
      }
      var n = 0;
      for (var j in ws) {
        if (j.startsWith(i.charAt(0)) && j.charAt(1) !== "1" && ws[i].v !== "") {
          ws[j].v = ws[j].v.replace(ws[i].v, "")
        } else {
          n += 1;
        }

      }
    }
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    XLSX.writeFile(wb, 'Leave_Acc_' + this.initial_current.Username + '.xlsx');

  }

}

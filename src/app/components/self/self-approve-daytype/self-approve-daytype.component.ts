import { DatePipe } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, MenuItem, MessageService } from 'primeng/api';
import { AppConfig } from 'src/app/config/config';
import { InitialCurrent } from 'src/app/config/initial_current';
import { DaytypeModels } from 'src/app/models/attendance/daytype';
import { ApproveModel } from 'src/app/models/self/approve';
import { ApproveTotalModel } from 'src/app/models/self/approveTotal';
import { cls_MTReqdocumentModel } from 'src/app/models/self/cls_MTReqdocument';
import { cls_TRTimedaytypeModel } from 'src/app/models/self/cls_TRTimedaytype';
import { ReasonsModel } from 'src/app/models/system/policy/reasons';
import { TimecardService } from 'src/app/services/attendance/timecards.service';
import { ApproveServices } from 'src/app/services/self/approve.service';
import { TimeDaytypeServices } from 'src/app/services/self/timedaytype.service';
import { ReasonsService } from 'src/app/services/system/policy/reasons.service';
declare var reqdaytype: any;
interface Status { name: string, code: number }
@Component({
  selector: 'app-self-approve-daytype',
  templateUrl: './self-approve-daytype.component.html',
  styleUrls: ['./self-approve-daytype.component.scss']
})
export class SelfApproveDaytypeComponent implements OnInit {
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
    private approveService: ApproveServices,
    private timecardService: TimecardService,
    private router: Router,
  ) { }
  fileToUpload: File | any = null;
  Uploadfile: boolean = false;
  daytype_list: DaytypeModels[] = [];
  daytype_newselected: DaytypeModels = new DaytypeModels();
  items: MenuItem[] = [];
  items_attfile: MenuItem[] = [];
  reason_list: ReasonsModel[] = [];
  reasonselected: ReasonsModel = new ReasonsModel();
  timedaytype_list: cls_TRTimedaytypeModel[] = [];
  selectedtimedaytype: cls_TRTimedaytypeModel = new cls_TRTimedaytypeModel();
  selectedtimedaytypeall: cls_TRTimedaytypeModel[] = [];
  selectedreqdoc: cls_MTReqdocumentModel = new cls_MTReqdocumentModel();
  approveTotal: ApproveTotalModel[] = [];
  start_date: Date = new Date();
  end_date: Date = new Date();
  status_list: Status[] = [{ name: this.langs.get('wait')[this.selectlang], code: 0 }, { name: this.langs.get('finish')[this.selectlang], code: 3 }, { name: this.langs.get('reject')[this.selectlang], code: 4 }];
  status_select: Status = { name: this.langs.get('wait')[this.selectlang], code: 0 }
  status_doc: boolean = false
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
    }
  }
  ngOnInit(): void {
    this.doGetInitialCurrent();
    this.doLoadMenu();
    this.doLoadTimedaytype();
    this.doLoadReason();
    this.doLoadPolDaytype();
  }
  Search() {
    if (this.status_select.code) {
      this.status_doc = true;
    } else {
      this.status_doc = false;
    }
    this.doLoadTimedaytype();
  }
  doLoadTimedaytype() {
    this.timedaytype_list = [];
    this.selectedtimedaytypeall = [];
    var tmp = new ApproveModel();
    tmp.job_type = "DAT"
    tmp.fromdate = this.start_date;
    tmp.todate = this.end_date;
    tmp.status = this.status_select.code;
    this.approveService.approve_get(tmp).then(async (res) => {
      res.data.forEach((elm: any) => {
        elm.timedaytype_workdate = new Date(elm.timedaytype_workdate)
      });
      this.timedaytype_list = await res.data;
      this.approveTotal = await res.total;
    });
  }
  doLoadPolDaytype() {
    this.daytype_list = []
    this.timecardService.daytype_get().then(async (res) => {
      console.log(res)
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
  doLoadDaytypeOld() {
    this.timecardService.timecard_get(this.initial_current.CompCode, "", this.initial_current.Username, this.selectedtimedaytype.timedaytype_workdate, this.selectedtimedaytype.timedaytype_todate).then(async (res) => {
      console.log(res[0])
      this.selectedtimedaytype.timedaytype_old = res[0].timecard_daytype;
    });
  }
  async doGetfileTimeleave(file_path: string, type: string) {
    this.timedaytypeService.get_file(file_path).then((res) => {
      var url = window.URL.createObjectURL(new Blob([new Uint8Array(res)], { type: type }));
      window.open(url);
      this.selectedreqdoc = new cls_MTReqdocumentModel();
    })
  }
  showManage() {
    this.displayManage = true
    this.edit_data = false;
  }
  closeManage() {
    this.selectedtimedaytype = new cls_TRTimedaytypeModel();
    this.displayManage = false

  }
  async doApproveJob(data: ApproveModel) {
    data.job_type = "DAT";
    data.lang = this.selectlang;
    await this.approveService.approveJob(data).then((res) => {
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
  doLoadMenu() {

    this.items = [

      {
        label: this.langs.get('new')[this.selectlang],
        icon: 'pi pi-fw pi-plus',
        command: (event) => {
          this.selectedtimedaytype = new cls_TRTimedaytypeModel();
          this.doLoadDaytypeOld();
          this.reasonselected = this.reason_list[0]
          // this.locationselected = this.location_list[0]
          this.daytype_newselected = this.daytype_list[0]
          this.selectedtimedaytype.timedaytype_new = this.daytype_list[0].daytype_code
          this.selectedtimedaytype.reason_code = this.reason_list[0].reason_code
          // this.selectedtrtimeot.location_code = this.location_list[0].location_code
          this.showManage()
        }

      },
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
    ];

  }
  selectdaytypenew() {
    console.log(this.daytype_newselected.daytype_code)
    this.selectedtimedaytype.timedaytype_new = this.daytype_newselected.daytype_code
  }
  selectDaytypereason() {
    this.selectedtimedaytype.reason_code = this.reasonselected.reason_code;
  }
  onRowSelectfile(event: Event) {
    this.doGetfileTimeleave(this.selectedreqdoc.document_path, this.selectedreqdoc.document_type)
  }
  onRowSelect(event: Event) {
  }
  Save(data: cls_TRTimedaytypeModel) {
    if (!this.selectedtimedaytypeall.length && !this.status_doc) {
      this.confirmationService.confirm({
        message: this.langs.get('conapprove')[this.selectlang],
        header: this.langs.get('condoc')[this.selectlang],
        icon: 'pi pi-check',
        accept: () => {
          let tmp = new ApproveModel();
          tmp.job_id = [data.jobtable_id];
          tmp.approve_status = "A";
          tmp.company_code = data.company_code;
          this.doApproveJob(tmp)
        },
        reject: () => {

        }
      });
    }

  }
  Delete(data: cls_TRTimedaytypeModel) {
    if (!this.selectedtimedaytypeall.length && !this.status_doc) {
      this.confirmationService.confirm({
        message: this.langs.get('connotapprove')[this.selectlang],
        header: this.langs.get('connotdoc')[this.selectlang],
        icon: 'pi pi-times',
        accept: () => {
          let tmp = new ApproveModel();
          tmp.job_id = [data.jobtable_id];
          tmp.approve_status = "C";
          tmp.company_code = data.company_code;
          this.doApproveJob(tmp)
        },
        reject: () => {

        }
      });
    }
  }
  Saveall() {
    if (this.selectedtimedaytypeall.length && !this.status_doc) {
      this.confirmationService.confirm({
        message: this.langs.get('conapprove')[this.selectlang],
        header: this.langs.get('condoc')[this.selectlang],
        icon: 'pi pi-check',
        accept: () => {
          let tmp = new ApproveModel();
          this.selectedtimedaytypeall.forEach((data: cls_TRTimedaytypeModel) => {
            tmp.job_id.push(data.jobtable_id)
            tmp.approve_status = "A";
            tmp.company_code = data.company_code;
          })
          console.log(tmp)
          this.doApproveJob(tmp)
        },
        reject: () => {

        }
      });
    }
  }
  Deleteall() {
    if (this.selectedtimedaytypeall.length && !this.status_doc) {
      this.confirmationService.confirm({
        message: this.langs.get('connotapprove')[this.selectlang],
        header: this.langs.get('connotdoc')[this.selectlang],
        icon: 'pi pi-times',
        accept: () => {
          let tmp = new ApproveModel();
          this.selectedtimedaytypeall.forEach((data: cls_TRTimedaytypeModel) => {
            tmp.job_id.push(data.jobtable_id)
            tmp.approve_status = "C";
            tmp.company_code = data.company_code;
          })
          console.log(tmp)
          this.doApproveJob(tmp)
        },
        reject: () => {

        }
      });
    }
  }
  viwe(data: cls_TRTimedaytypeModel) {
    this.selectedtimedaytype = data;
    this.daytype_list.forEach((obj: DaytypeModels) => {
      if (obj.daytype_code == data.timedaytype_new) {
        this.daytype_newselected = obj;
      }
    })
    this.reason_list.forEach((obj: ReasonsModel) => {
      if (obj.reason_code == data.reason_code) {
        this.reasonselected = obj;
      }
    })
    this.edit_data = true;
    this.displayManage = true
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

import { DatePipe } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, MegaMenuItem, MenuItem, MessageService } from 'primeng/api';
import { AppConfig } from 'src/app/config/config';
import { InitialCurrent } from 'src/app/config/initial_current';
import { ShiftModels } from 'src/app/models/attendance/shift';
import { ApproveModel } from 'src/app/models/self/approve';
import { ApproveTotalModel } from 'src/app/models/self/approveTotal';
import { cls_MTReqdocumentModel } from 'src/app/models/self/cls_MTReqdocument';
import { cls_TRTimeshiftModel } from 'src/app/models/self/cls_TRTimeshift';
import { ReasonsModel } from 'src/app/models/system/policy/reasons';
import { ShiftServices } from 'src/app/services/attendance/shift.service';
import { TimecardService } from 'src/app/services/attendance/timecards.service';
import { ApproveServices } from 'src/app/services/self/approve.service';
import { TimeShiftServices } from 'src/app/services/self/timeshift.service';
import { ReasonsService } from 'src/app/services/system/policy/reasons.service';
declare var reqshift: any;
interface Status { name: string, code: number }
@Component({
  selector: 'app-self-approve-shift',
  templateUrl: './self-approve-shift.component.html',
  styleUrls: ['./self-approve-shift.component.scss']
})
export class SelfApproveShiftComponent implements OnInit {

  @ViewChild('fileUploader') fileUploader: ElementRef | any = null;
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
    private approveService: ApproveServices,
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
  selectedtrtimeshfitall: cls_TRTimeshiftModel[] = [];
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
  Search() {
    if (this.status_select.code) {
      this.status_doc = true;
    } else {
      this.status_doc = false;
    }
    this.doLoadTimeshift();
  }
  doLoadTimeshift() {
    this.trtimeshfit_list = [];
    var tmp = new ApproveModel();
    tmp.job_type = "SHT"
    tmp.fromdate = this.start_date;
    tmp.todate = this.end_date;
    tmp.status = this.status_select.code;
    this.approveService.approve_get(tmp).then(async (res) => {
      res.data.forEach((elm: any) => {
        elm.timeshift_workdate = new Date(elm.timeshift_workdate)
      });
      this.trtimeshfit_list = await res.data
      this.approveTotal = await res.total;
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
  async doGetfileTimeleave(file_path: string, type: string) {
    this.timeshiftService.get_file(file_path).then((res) => {
      var url = window.URL.createObjectURL(new Blob([new Uint8Array(res)], { type: type }));
      window.open(url);
      this.selectedreqdoc = new cls_MTReqdocumentModel();
    })
  }
  async doApproveJob(data: ApproveModel) {
    data.job_type = "SHT";
    data.lang = this.selectlang;
    await this.approveService.approveJob(data).then((res) => {
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
  Save(data: cls_TRTimeshiftModel) {
    if (!this.selectedtrtimeshfitall.length && !this.status_doc) {
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
  Delete(data: cls_TRTimeshiftModel) {
    if (!this.selectedtrtimeshfitall.length && !this.status_doc) {
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
    if (this.selectedtrtimeshfitall.length && !this.status_doc) {
      this.confirmationService.confirm({
        message: this.langs.get('conapprove')[this.selectlang],
        header: this.langs.get('condoc')[this.selectlang],
        icon: 'pi pi-check',
        accept: () => {
          let tmp = new ApproveModel();
          this.selectedtrtimeshfitall.forEach((data: cls_TRTimeshiftModel) => {
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
    if (this.selectedtrtimeshfitall.length && !this.status_doc) {
      this.confirmationService.confirm({
        message: this.langs.get('connotapprove')[this.selectlang],
        header: this.langs.get('connotdoc')[this.selectlang],
        icon: 'pi pi-times',
        accept: () => {
          let tmp = new ApproveModel();
          this.selectedtrtimeshfitall.forEach((data: cls_TRTimeshiftModel) => {
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

  viwe(data: cls_TRTimeshiftModel) {
    this.selectedtrtimeshfit = data;
    this.shift_new_list.forEach((obj: ShiftModels) => {
      if (obj.shift_code == data.timeshift_new) {
        this.shift_newselected = obj;
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

}

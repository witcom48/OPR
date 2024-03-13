import { DatePipe } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { timeStamp } from 'console';
import { tmpdir } from 'os';
import { ConfirmationService, MegaMenuItem, MenuItem, MessageService } from 'primeng/api';
import { AppConfig } from 'src/app/config/config';
import { InitialCurrent } from 'src/app/config/initial_current';
import { cls_TRleave } from 'src/app/models/attendance/cls_TRleave';
import { ApproveModel } from 'src/app/models/self/approve';
import { ApproveTotalModel } from 'src/app/models/self/approveTotal';
import { cls_MTReqdocumentModel } from 'src/app/models/self/cls_MTReqdocument';
import { cls_TRTimeleaveModel } from 'src/app/models/self/cls_TRTimeleave';
import { ReasonsModel } from 'src/app/models/system/policy/reasons';
import { TRLeaveaccServices } from 'src/app/services/attendance/trleaveacc.service';
import { ApproveServices } from 'src/app/services/self/approve.service';
import { TimeleaveServices } from 'src/app/services/self/timeleave.service';
import { ReasonsService } from 'src/app/services/system/policy/reasons.service';
import * as XLSX from 'xlsx';
declare var reqleave: any;
interface Status { name: string, code: number }
@Component({
  selector: 'app-self-approve-leave',
  templateUrl: './self-approve-leave.component.html',
  styleUrls: ['./self-approve-leave.component.scss']
})
export class SelfApproveLeaveComponent implements OnInit {

  @ViewChild('fileUploader') fileUploader: ElementRef | any = null;
  langs: any = reqleave;
  selectlang: string = "EN";
  leavetypedis: string = "leave_name_en"
  reasonedis: string = "reason_name_en"
  day: number = 0;
  hour: number = 0;
  time_half: string = "00:00"
  leavetype: string = "F";
  constructor(private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private datePipe: DatePipe,
    private trleaveaccService: TRLeaveaccServices,
    private approveService: ApproveServices,
    private timeleaveService: TimeleaveServices,
    private reasonService: ReasonsService,
    private router: Router,
  ) { }
  displayrejecttype: boolean = false;
  reject_note: string = '';
  mainMenuItems: MenuItem[] = [];
  homeIcon: any = { icon: 'pi pi-home', routerLink: '/' };
  edit_data: boolean = false
  displayManage: boolean = false;
  Uploadfile: boolean = false;
  fileToUpload: File | any = null;
  position: string = "right";
  items: MenuItem[] = [];
  items_attfile: MenuItem[] = [];
  selectedleave_type: cls_TRleave = new cls_TRleave();
  leaveacc_list: cls_TRleave[] = [];
  selectedLeaveacc: cls_TRleave = new cls_TRleave();
  reason_list: ReasonsModel[] = [];
  reasonselected: ReasonsModel = new ReasonsModel();
  trtimeleave_list: cls_TRTimeleaveModel[] = [];
  selectedtrtimeleave: cls_TRTimeleaveModel = new cls_TRTimeleaveModel();
  selectedtrtimeleaveall: cls_TRTimeleaveModel[] = [];
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
      this.leavetypedis = "leave_name_th"
      this.reasonedis = "reason_name_th"
    }
    this.status_list = [{ name: this.langs.get('wait')[this.selectlang], code: 0 }, { name: this.langs.get('finish')[this.selectlang], code: 3 }, { name: this.langs.get('reject')[this.selectlang], code: 4 }, { name: this.selectlang == "EN" ? "All" : "ทั้งหมด", code: 1 }];

  }
  ngOnInit(): void {
    // console.log(this.datePipe.transform(new Date(0, 0, 0, 3, 0), 'HH:mm'))
    this.doGetInitialCurrent()
    this.doLoadMenu();
    this.doLoadTimeleave();
    this.doLoadReason();
  }
  Search() {
    if (this.status_select.code) {
      this.status_doc = true;
    } else {
      this.status_doc = false;
    }
    this.doLoadTimeleave();
  }
  doLoadTimeleave() {
    this.trtimeleave_list = [];
    let statuss = [4, 3, 0]
    if (this.status_select.code == 1) {
      statuss.forEach(async (e: number) => {
        var tmp = new ApproveModel();
        tmp.job_type = "LEA"
        tmp.fromdate = this.start_date;
        tmp.todate = this.end_date;
        tmp.status = e;
        await this.approveService.approve_get(tmp).then(async (res) => {
          await res.data.forEach((elm: any) => {
            elm.timeleave_fromdate = new Date(elm.timeleave_fromdate)
            elm.timeleave_todate = new Date(elm.timeleave_todate)
            elm.modified_date_show = this.datePipe.transform(elm.modified_date, 'dd/MM/yyyy')
            elm.timeleave_fromdate_show = this.datePipe.transform(elm.timeleave_fromdate, 'dd/MM/yyyy')
            elm.timeleave_todate_show = this.datePipe.transform(elm.timeleave_todate, 'dd/MM/yyyy')
            elm.timeleave_type_show = this.getFulltyupeLeave(elm.timeleave_type)
            elm.name_show = this.selectlang == 'TH' ? elm.worker_detail_th : elm.worker_detail_en
            elm.leave_type_show = this.selectlang == 'TH' ? elm.leave_detail_th : elm.leave_detail_en
            elm.reson_show = this.selectlang == 'TH' ? elm.reason_th : elm.reason_en
            elm.timeleave_status_show = this.getFullStatus(elm.status_job)
            this.trtimeleave_list.push(elm)
          });
          this.approveTotal = await res.total;
        });
      })
    } else {
      var tmp = new ApproveModel();
      tmp.job_type = "LEA"
      tmp.fromdate = this.start_date;
      tmp.todate = this.end_date;
      tmp.status = this.status_select.code;
      this.approveService.approve_get(tmp).then(async (res) => {
        res.data.forEach((elm: any) => {
          elm.timeleave_fromdate = new Date(elm.timeleave_fromdate)
          elm.timeleave_todate = new Date(elm.timeleave_todate)
          elm.modified_date_show = this.datePipe.transform(elm.modified_date, 'dd/MM/yyyy')
          elm.timeleave_fromdate_show = this.datePipe.transform(elm.timeleave_fromdate, 'dd/MM/yyyy')
          elm.timeleave_todate_show = this.datePipe.transform(elm.timeleave_todate, 'dd/MM/yyyy')
          elm.timeleave_type_show = this.getFulltyupeLeave(elm.timeleave_type)
          elm.name_show = this.selectlang == 'TH' ? elm.worker_detail_th : elm.worker_detail_en
          elm.leave_type_show = this.selectlang == 'TH' ? elm.leave_detail_th : elm.leave_detail_en
          elm.reson_show = this.selectlang == 'TH' ? elm.reason_th : elm.reason_en
          elm.timeleave_status_show = this.getFullStatus(elm.status_job)
        });
        this.trtimeleave_list = await res.data;
        this.approveTotal = await res.total;
      });
    }
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
  doLoadLeaveacc(userid: string) {
    this.leaveacc_list = [];
    var tmp = new cls_TRleave();
    tmp.worker_code = userid;
    this.trleaveaccService.leaveacc_get(tmp).then(async (res) => {
      res.forEach((obj: cls_TRleave) => {
        if (obj.leave_code == this.selectedtrtimeleave.leave_code) {
          this.leaveacc_list.push(obj);
          this.selectedleave_type = obj;
          this.selectLeaveType()
        }
      })
    });
  }
  doLoadLeaveactualday() {
    let data = new cls_TRTimeleaveModel()
    data.worker_code = this.selectedtrtimeleave.worker_code;
    data.timeleave_fromdate = this.selectedtrtimeleave.timeleave_fromdate
    data.timeleave_todate = this.selectedtrtimeleave.timeleave_todate
    this.timeleaveService.timeleaveactualday_get(data).then(async (res) => {
      this.selectedtrtimeleave.timeleave_actualday = await res;
    });
  }
  doLoadReason() {
    this.reason_list = [];
    let data = new ReasonsModel()
    data.reason_group = "LEAVE"
    this.reasonService.reason_get(data).then(async (res) => {
      this.reason_list = await res;
      this.initial_current.loading = false;
    });
  }
  async doGetfileTimeleave(file_path: string, type: string) {
    this.timeleaveService.get_file(file_path).then((res) => {
      var url = window.URL.createObjectURL(new Blob([new Uint8Array(res)], { type: type }));
      window.open(url);
      this.selectedreqdoc = new cls_MTReqdocumentModel();
    })
  }
  async doApproveJob(data: ApproveModel) {
    this.initial_current.loading = true;
    data.job_type = "LEA";
    data.lang = this.selectlang;
    data.reject_note = this.reject_note;
    await this.approveService.approveJob(data).then((res) => {
      if (res.result) {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: res.message });
        this.doLoadTimeleave();
      }
      else {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: res.message });
      }
      this.initial_current.loading = false;
    });
    this.leavetype = "F"
    this.closeManage()
  }
  doLoadMenu() {
    this.mainMenuItems = [{ label: this.langs.get('approve')[this.selectlang], routerLink: '/self/approve' },
    { label: this.langs.get('title_leave')[this.selectlang], routerLink: '/self/approve_leave', styleClass: 'activelike' }]
    this.items = [
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
        label: this.langs.get('export')[this.selectlang],
        icon: 'pi pi-fw pi-file-export',
        command: (event) => {
          this.exportAsExcelMain();
        }
      }
    ];

  }
  @ViewChild('TABLE') table: ElementRef | any = null;
  @ViewChild('TABLEMAIN') tablemain: ElementRef | any = null;
  exportAsExcelMain() {
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(this.tablemain.nativeElement);//converts a DOM TABLE element to a worksheet
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

    XLSX.writeFile(wb, 'ApproveLeave_' + this.initial_current.Username + '.xlsx');

  }
  showManage() {
    this.displayManage = true
    this.edit_data = false;

  }
  ChangeType() {
    if (this.leavetype === "H") {
      this.selectedtrtimeleave.timeleave_type = "H1"
    } else {
      this.selectedtrtimeleave.timeleave_type = "F"
    }
  }
  closeManage() {
    this.selectedtrtimeleave = new cls_TRTimeleaveModel();
    this.displayManage = false
    this.edit_data = false;
    this.selectedtrtimeleaveall = []
  }

  selectLeavereason() {
    this.selectedtrtimeleave.reason_code = this.reasonselected.reason_code;
  }
  selectLeaveType() {
    this.selectedtrtimeleave.leave_code = this.selectedleave_type.leave_code;
    this.day = Math.floor(this.selectedleave_type.empleaveacc_remain)
    this.hour = (this.selectedleave_type.empleaveacc_remain - Math.floor(this.selectedleave_type.empleaveacc_remain)) * 8;
    this.displayManage = true;
    this.edit_data = true;
  }
  onRowSelect(event: Event) {
  }
  onRowSelectfile(event: Event) {
    this.doGetfileTimeleave(this.selectedreqdoc.document_path, this.selectedreqdoc.document_type)
  }
  getDay(data: any) {
    return Math.floor(data) + " " + this.langs.get('day')[this.selectlang] + " " + (data - Math.floor(data)) * 8 + " " + this.langs.get('hour')[this.selectlang]
  }
  getFulltyupeLeave(code: string) {
    let day = ""
    switch (code) {
      case "F":
        day = this.langs.get('full_day')[this.selectlang]
        break;
      case "H1":
        day = `${this.langs.get('half_day')[this.selectlang]} (${this.langs.get('morning')[this.selectlang]})`
        break;
      case "H2":
        day = `${this.langs.get('half_day')[this.selectlang]} (${this.langs.get('afternoon')[this.selectlang]})`
    }
    return day;
  }

  Save(data: cls_TRTimeleaveModel) {
    if (!this.selectedtrtimeleaveall.length && !this.status_doc) {
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
  closedispaly() {
    this.displayrejecttype = false;
  }
  datareject: cls_TRTimeleaveModel = new cls_TRTimeleaveModel;
  submitreject() {
    this.displayrejecttype = false;
    console.log(!this.selectedtrtimeleaveall.length)
    this.confirmationService.confirm({
      message: this.langs.get('connotapprove')[this.selectlang],
      header: this.langs.get('connotdoc')[this.selectlang],
      icon: 'pi pi-times',
      accept: () => {
        let tmp = new ApproveModel();
        tmp.approve_status = "C";
        if (this.selectedtrtimeleaveall.length > 0) {
          this.selectedtrtimeleaveall.forEach((data: cls_TRTimeleaveModel) => {
            tmp.job_id.push(data.jobtable_id)
            tmp.company_code = data.company_code;
          })
        } else {
          tmp.job_id = [this.datareject.jobtable_id];
          tmp.company_code = this.datareject.company_code;
        }
        console.log('dddddddd')
        console.log(tmp);
        this.doApproveJob(tmp)
      },
      reject: () => {

      }
    });
  }
  Delete(data: cls_TRTimeleaveModel) {
    this.reject_note = '';
    this.datareject = new cls_TRTimeleaveModel;
    this.datareject = data;
    this.displayrejecttype = true;
  }
  Saveall() {
    if (this.selectedtrtimeleaveall.length) {
      this.confirmationService.confirm({
        message: this.langs.get('conapprove')[this.selectlang],
        header: this.langs.get('condoc')[this.selectlang],
        icon: 'pi pi-check',
        accept: () => {
          let tmp = new ApproveModel();
          this.selectedtrtimeleaveall.forEach((data: cls_TRTimeleaveModel) => {
            tmp.job_id.push(data.jobtable_id)
            tmp.approve_status = "A";
            tmp.company_code = data.company_code;
          })
          // console.log(tmp)
          this.doApproveJob(tmp)
        },
        reject: () => {

        }
      });
    }
  }
  Deleteall() {
    this.reject_note = '';
    this.displayrejecttype = true;
    // if (this.selectedtrtimeleaveall.length && !this.status_doc) {
    //   this.confirmationService.confirm({
    //     message: this.langs.get('connotapprove')[this.selectlang],
    //     header: this.langs.get('connotdoc')[this.selectlang],
    //     icon: 'pi pi-times',
    //     accept: () => {
    //       let tmp = new ApproveModel();
    //       this.selectedtrtimeleaveall.forEach((data: cls_TRTimeleaveModel) => {
    //         tmp.job_id.push(data.jobtable_id)
    //         tmp.approve_status = "C";
    //         tmp.company_code = data.company_code;
    //       })
    //       // console.log(tmp)
    //       this.doApproveJob(tmp)
    //     },
    //     reject: () => {

    //     }
    //   });
    // }
  }
  viwe(data: cls_TRTimeleaveModel) {
    this.selectedtrtimeleave = data;
    this.doLoadLeaveacc(this.selectedtrtimeleave.worker_code);
    this.time_half = this.datePipe.transform(new Date(0, 0, 0, Math.floor(this.selectedtrtimeleave.timeleave_min / 60), Math.floor(this.selectedtrtimeleave.timeleave_min % 60)), 'HH:mm') || "00:00"
    this.reason_list.forEach((obj: ReasonsModel) => {
      if (obj.reason_code == this.selectedtrtimeleave.reason_code) {
        this.reasonselected = obj;
      }
    })
    if (this.selectedtrtimeleave.timeleave_type === "F") {
      this.leavetype = "F"
    } else {
      this.leavetype = "H"
    }
  }
}

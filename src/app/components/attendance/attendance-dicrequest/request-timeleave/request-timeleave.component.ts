import { DatePipe } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { timeStamp } from 'console';
import { ConfirmationService, MegaMenuItem, MenuItem, MessageService } from 'primeng/api';
import { SearchEmpComponent } from 'src/app/components/usercontrol/search-emp/search-emp.component';
import { AppConfig } from 'src/app/config/config';
import { InitialCurrent } from 'src/app/config/initial_current';
import { ATTTimeleaveModel } from 'src/app/models/attendance/atttimeleave';
import { cls_TRleave } from 'src/app/models/attendance/cls_TRleave';
import { EmployeeModel } from 'src/app/models/employee/employee';
import { AccountModel } from 'src/app/models/self/account';
import { cls_MTReqdocumentModel } from 'src/app/models/self/cls_MTReqdocument';
import { cls_TRTimeleaveModel } from 'src/app/models/self/cls_TRTimeleave';
import { TRAccountModel } from 'src/app/models/self/traccount';
import { ReasonsModel } from 'src/app/models/system/policy/reasons';
import { FillterEmpModel } from 'src/app/models/usercontrol/filteremp';
import { AtttimeleaveService } from 'src/app/services/attendance/atttimeleave.service';
import { TRLeaveaccServices } from 'src/app/services/attendance/trleaveacc.service';
import { EmployeeService } from 'src/app/services/emp/worker.service';
import { AccountServices } from 'src/app/services/self/account.service';
import { TimeleaveServices } from 'src/app/services/self/timeleave.service';
import { ReasonsService } from 'src/app/services/system/policy/reasons.service';
declare var reqleave: any;
interface Status { name: string, code: number }
@Component({
  selector: 'app-request-timeleave',
  templateUrl: './request-timeleave.component.html',
  styleUrls: ['./request-timeleave.component.scss']
})
export class RequestTimeleaveComponent implements OnInit {

  @ViewChild('fileUploader') fileUploader: ElementRef | any = null;
  langs: any = reqleave;
  selectlang: string = "EN";
  leavetypedis: string = "leave_name_en"
  reasonedis: string = "reason_name_en"
  namedis: string = "worker_detail_en"
  day: number = 0;
  hour: number = 0;
  time_half: string = "00:00"
  leavetype: string = "F";
  leave_code: string = "";

  @ViewChild(SearchEmpComponent) selectEmp: any;



  constructor(private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private datePipe: DatePipe,
    private trleaveaccService: TRLeaveaccServices,
    private atttimeleaveService: AtttimeleaveService,
    private timeleaveService: TimeleaveServices,

    private reasonService: ReasonsService,
    private accountServie: AccountServices,
    private router: Router,
    private employeeService: EmployeeService,

  ) {
    this.initializeDefaultValues();

  }
  private initializeDefaultValues(): void {
    this.leave_code = '';

  }

  title_btn_select: { [key: string]: string } = { EN: "Select", TH: "เลือก" }
  title_btn_close: { [key: string]: string } = { EN: "Close", TH: "ปิด" }
  title_modified_by: { [key: string]: string } = { EN: "Edit by", TH: "ผู้ทำรายการ" }
  title_modified_date: { [key: string]: string } = { EN: "Edit date", TH: "วันที่ทำรายการ" }
  title_page_from: { [key: string]: string } = { EN: "Showing", TH: "แสดง" }
  title_page_to: { [key: string]: string } = { EN: "to", TH: "ถึง" }
  title_page_total: { [key: string]: string } = { EN: "of", TH: "จาก" }
  title_page_record: { [key: string]: string } = { EN: "entries", TH: "รายการ" }

  title_new: { [key: string]: string } = { EN: "New", TH: "เพิ่ม" }
  title_edit: { [key: string]: string } = { EN: "Edit", TH: "แก้ไข" }
  title_delete: { [key: string]: string } = { EN: "Delete", TH: "ลบ" }
  title_export: { [key: string]: string } = { EN: "Export", TH: "ส่งออกไฟล์" }
  title_save: { [key: string]: string } = { EN: "Save", TH: "บันทึก" }
  title_close: { [key: string]: string } = { EN: "Close", TH: "ปิด" }
  title_cancel: { [key: string]: string } = { EN: "Cancel", TH: "ยกเลิก" }
  title_search: { [key: string]: string } = { EN: "Search", TH: "ค้นหา" }
  title_confirm: { [key: string]: string } = { EN: "Are you sure?", TH: "ยืนยันการทำรายการ" }
  title_confirm_record: { [key: string]: string } = { EN: "Confirm to record", TH: "คุณต้องการบันทึกการทำรายการ" }
  title_confirm_delete: { [key: string]: string } = { EN: "Confirm to delete", TH: "คุณต้องการลบรายการ" }
  title_confirm_yes: { [key: string]: string } = { EN: "Yes", TH: "ใช่" }
  title_confirm_no: { [key: string]: string } = { EN: "No", TH: "ยกเลิก" }
  title_confirm_cancel: { [key: string]: string } = { EN: "You have cancelled", TH: "คุณยกเลิกการทำรายการ" }


  title_code: { [key: string]: string } = { EN: "Code", TH: "รหัส" }
  title_fromdate: { [key: string]: string } = { EN: "From", TH: "จากวันที่" }
  title_todate: { [key: string]: string } = { EN: "To", TH: "ถึงวันที่" }

  title_page: { [key: string]: string } = { EN: "Dic Request", TH: "Dic Request" }
  title_requestOvertime: { [key: string]: string } = { EN: "Request Overtime", TH: "ขอทำล่วงเวลา" };
  title_date: { [key: string]: string } = { EN: "Date", TH: "วันที่" }
  title_ot_doc: { [key: string]: string } = { EN: "OT Doc", TH: "เลขที่เอกสาร" }
  title_no: { [key: string]: string } = { EN: "No.", TH: "ลำดับ" }
  title_Before: { [key: string]: string } = { EN: "Before", TH: "ก่อนเข้างาน " }
  title_Normal: { [key: string]: string } = { EN: "Normal", TH: "เวลาปกติ" }
  title_Break: { [key: string]: string } = { EN: "OBreak", TH: "เวลาพักเบรก" }
  title_After: { [key: string]: string } = { EN: "OAfter", TH: "หลังเลิกงาน" }
  title_Location: { [key: string]: string } = { EN: "Location", TH: "สถานที่" }
  title_reason: { [key: string]: string } = { EN: "Reason", TH: "เหตุผลการทำล่วงเวลา" }
  title_detail: { [key: string]: string } = { EN: "Detail", TH: "รายละเอียด" }
 
  title_Incholiday: { [key: string]: string } = { EN: "Incholiday", TH: "นับรวมวันหยุด" }
  title_Deduct: { [key: string]: string } = { EN: "Deduct", TH: "หักเงิน" }


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

  trtimeleave_list: ATTTimeleaveModel[] = [];
  selectedtrtimeleave: ATTTimeleaveModel = new ATTTimeleaveModel();

  selectedreqdoc: cls_MTReqdocumentModel = new cls_MTReqdocumentModel();
  account_list: TRAccountModel[] = [];
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
      this.leavetypedis = "leave_name_th"
      this.reasonedis = "reason_name_th"
      this.namedis = "worker_detail_th"
    }
    if (this.initial_current.Usertype == "GRP") {
      this.doLoadAccount();
    } else {
      this.doLoadTimeleave();
      this.doLoadLeaveacc();
    }
  }
  ngOnInit(): void {
    // console.log(this.datePipe.transform(new Date(0, 0, 0, 3, 0), 'HH:mm'))
    this.doGetInitialCurrent()
    this.doLoadMenu();
    this.doLoadReason();
    setTimeout(() => {
      this.doLoadEmployee()

    }, 300);

  }


  //
  workerDetail: EmployeeModel = new EmployeeModel();
  worker_list: EmployeeModel[] = [];
  worker_index: number = 0;
  worker_code: string = "";
  worker_name: string = "";
  fillterIncludeResign: boolean = false;

  doLoadEmployee() {
    var fillter: FillterEmpModel = new FillterEmpModel;

    fillter.worker_resignstatus = this.fillterIncludeResign;
    if (this.fillterSearchemp) {
      fillter.searchemp = this.selectedSearchemp;
    } else {
      fillter.searchemp = "";
    }
    this.employeeService.worker_getbyfillter(fillter).then(async (res) => {
      this.worker_list = res;
      setTimeout(() => {

        this.worker_index = 0;
        this.doSetDetailWorker();

      }, 500);
    });
  }
  //-- Emp master
  selectedSearchemp: string = "";
  fillterSearchemp: boolean = false;
  doChangeSearchemp(event: any) {
    if (this.fillterSearchemp) {
      this.doLoadEmployee();
      this.doSetDetailWorker();
    }
  }

  doNextWorker() {
    if (this.worker_index < this.worker_list.length - 1) {
      this.worker_index++;
      this.doSetDetailWorker();
      this.doLoadEmployee();

    }
  }

  doBackWorker() {
    if (this.worker_index > 0) {
      this.worker_index--;
      this.doSetDetailWorker();
      this.doLoadEmployee();

    }
  }

  doSetDetailWorker() {
    this.workerDetail = this.worker_list[this.worker_index];
    this.worker_code = this.workerDetail.worker_code;
    if (this.initial_current.Language === 'EN') {
      this.worker_name =
        this.workerDetail.worker_fname_en + ' ' + this.workerDetail.worker_lname_en;
    } else {
      this.worker_name =
        this.workerDetail.worker_fname_th + ' ' + this.workerDetail.worker_lname_th;
    }
    this.doLoadTimeleave();

  }

  close_searchemp() {
    this.searchEmp = false
  }

  searchEmp: boolean = false;
  open_searchemp() {
    this.searchEmp = true
  }
  // Search() {
  //   this.doLoadTimeot();
  // }
  select_emp() {

    let select = this.selectEmp.selectedEmployee.worker_code
    if (select != "") {
      this.doGetIndexWorker(select)
      this.searchEmp = false
    }

  }

  doGetIndexWorker(worker_code: string) {
    for (let i = 0; i < this.worker_list.length; i++) {
      if (this.worker_list[i].worker_code == worker_code) {
        this.worker_index = i;
        break;
      }
    }

    this.doSetDetailWorker();

  }
  //
  Search() {
    this.doLoadTimeleave();
    if (this.initial_current.Usertype == "GRP") {
      this.doLoadLeaveacc();
    }
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
      this.workerDetail = res[0].worker_data[0];
      this.doLoadTimeleave();
      this.doLoadLeaveacc();
    });
  }
  doLoadTimeleave() {
    this.trtimeleave_list = [];
    var tmp = new ATTTimeleaveModel();
    tmp.timeleave_fromdate = this.start_date;
    tmp.timeleave_todate = this.end_date;
    tmp.company_code = this.initial_current.CompCode;
    tmp.worker_code = this.workerDetail.worker_code || this.initial_current.Username;
    tmp.status = this.status_select.code;
    this.atttimeleaveService.atttimeleave_get(tmp).then(async (res) => {
      if (res) {
        res.forEach((elm: any) => {
          elm.timeleave_fromdate = new Date(elm.timeleave_fromdate)
          elm.timeleave_todate = new Date(elm.timeleave_todate)
        });
      }
      this.trtimeleave_list = await res
    });

  }
  doLoadLeaveacc() {
    this.leaveacc_list = [];
    var tmp = new cls_TRleave();
    tmp.worker_code = this.workerDetail.worker_code;
    this.trleaveaccService.leaveacc_get(tmp).then(async (res) => {
      this.leaveacc_list = await res
      console.log(this.leaveacc_list, 'ลา')
    });
  }



  doLoadLeaveactualday() {
    let data = new ATTTimeleaveModel()
    data.worker_code = this.workerDetail.worker_code;
    data.timeleave_fromdate = this.selectedtrtimeleave.timeleave_fromdate
    data.timeleave_todate = this.selectedtrtimeleave.timeleave_todate
    this.atttimeleaveService.timeleaveactualday_get(data).then(async (res) => {
      this.selectedtrtimeleave.timeleave_actualday = await res;
    });
  }
  doLoadReason() {
    this.reason_list = [];
    let data = new ReasonsModel()
    data.reason_group = "LEAVE"
    this.reasonService.reason_get(data).then(async (res) => {
      this.reason_list = await res;
      console.log(this.reason_list, 'reason_list')

    });
  }
  async doRecordTimeleave(data: ATTTimeleaveModel) {

    data.company_code = this.initial_current.CompCode;
    data.worker_code = this.workerDetail.worker_code;
    data.empleaveacc_remain = this.calculateRemain();


    await this.atttimeleaveService.atttimeleave_record(data).then((res) => {
      if (res.success) {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: res.message });
        this.doLoadTimeleave();
        this.doLoadLeaveacc();
      }
      else {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: res.message });
      }

    });
    this.leavetype = "F"
    this.closeManage()
  }
  async doDeleteTimeleave(data: ATTTimeleaveModel) {
    await this.atttimeleaveService.atttimeleave_delete(data).then((res) => {
      if (res.success) {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: res.message });
        this.doLoadTimeleave();
        this.doLoadLeaveacc();
      }
      else {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: res.message });
      }

    });
    this.closeManage()
  }

  doLoadMenu() {
    this.mainMenuItems = [{ label: this.langs.get('employee')[this.selectlang], routerLink: '/self/employee' },
    { label: this.langs.get('title_leave')[this.selectlang], routerLink: '/self/req_leave', styleClass: 'activelike' }]
    this.items = [

      {
        label: this.langs.get('new')[this.selectlang],
        icon: 'pi pi-fw pi-plus',
        command: (event) => {
          this.initializeLeaveForm();
          this.showManage();
        }

      },


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


  initializeLeaveForm() {
    this.leavetype = "F";
    this.selectedtrtimeleave = new ATTTimeleaveModel();
    this.selectedleave_type = this.leaveacc_list[0];
    this.reasonselected = this.reason_list[0];
    this.selectedtrtimeleave.leave_code = this.leaveacc_list[0].leave_code;
    this.selectedtrtimeleave.reason_code = this.reason_list[0].reason_code;
    this.time_half = "00:00";
    this.selectLeaveType();
    this.doLoadLeaveactualday();

    if (this.initial_current.Usertype == "GRP") {
      this.selectedtrtimeleave.worker_code = this.workerDetail.worker_code;
    }
  }
  //   EMPLEAVEACC_REMAIN = (EMPLEAVEACC_BF + EMPLEAVEACC_ANNUAL) - EMPLEAVEACC_USED
  calculateRemain(): number {
    const bf = +this.selectedtrtimeleave.empleaveacc_bf || 0; //ยอดยกมา
    const annual = +this.selectedtrtimeleave.empleaveacc_annual || 0; //ยอดวันลาประจำปี
    const used = +this.selectedtrtimeleave.empleaveacc_used || 0; //ยอดวันลาที่ใช้ไป
    return (bf + annual) - used;
  }
  handleFileInputholidaylist(file: FileList) {
    this.fileToUpload = file.item(0);
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
    this.selectedtrtimeleave = new ATTTimeleaveModel();
    this.displayManage = false
    this.edit_data = false;
  }

  selectLeavereason() {
    this.selectedtrtimeleave.reason_code = this.reasonselected.reason_code;
  }

  selectLeaveType() {
    if (this.selectedleave_type && this.selectedleave_type.empleaveacc_remain != null) {
      this.selectedtrtimeleave.leave_code = this.selectedleave_type.leave_code;
      this.day = Math.floor(this.selectedleave_type.empleaveacc_remain);
      this.hour = (this.selectedleave_type.empleaveacc_remain - Math.floor(this.selectedleave_type.empleaveacc_remain)) * 8;
    } else { }
  }

  onRowSelect(event: Event) {
    this.time_half = this.datePipe.transform(new Date(0, 0, 0, Math.floor(this.selectedtrtimeleave.timeleave_min / 60), Math.floor(this.selectedtrtimeleave.timeleave_min % 60)), 'HH:mm') || "00:00"
    this.leaveacc_list.forEach((obj: cls_TRleave) => {
      if (obj.leave_code == this.selectedtrtimeleave.leave_code) {
        this.selectedleave_type = obj;
      }
    })
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
    this.selectLeaveType()
    this.displayManage = true;
    this.edit_data = true;
  }
  onRowSelectfile(event: Event) {
    // this.doGetfileTimeleave(this.selectedreqdoc.document_path, this.selectedreqdoc.document_type)
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
        day = `${this.langs.get('full_day')[this.selectlang]} (${this.langs.get('morning')[this.selectlang]})`
        break;
      case "H2":
        day = `${this.langs.get('full_day')[this.selectlang]} (${this.langs.get('afternoon')[this.selectlang]})`
    }
    return day;
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
  Save() {
    this.confirmationService.confirm({
      message: this.langs.get('confirm_doc')[this.selectlang],
      header: this.langs.get('title_leave')[this.selectlang],
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        if (this.selectedtrtimeleave.timeleave_doc.trim().length == 0) {
          this.selectedtrtimeleave.timeleave_doc = "LEAVE_" + this.datePipe.transform(new Date(), 'yyyyMMddHHmmss');
        }
        if (this.selectedtrtimeleave.timeleave_type != "F") {
          this.selectedtrtimeleave.timeleave_todate = this.selectedtrtimeleave.timeleave_fromdate;
          var date1 = new Date(0, 0, 0, Number(this.time_half.split(":")[0]), Number(this.time_half.split(":")[1]), 0)
          var hours_minutes = date1.getHours() * 60 + date1.getMinutes();
          this.selectedtrtimeleave.timeleave_min = hours_minutes;
 
        } else {
          this.selectedtrtimeleave.timeleave_min = (this.selectedtrtimeleave.timeleave_actualday * 480)
        }
        this.doRecordTimeleave(this.selectedtrtimeleave)
      },
      reject: () => {
      }
    });
  }
  Delete() {
    this.confirmationService.confirm({
      message: this.langs.get('confirm_delete_doc')[this.selectlang] + this.selectedtrtimeleave.timeleave_doc,
      header: this.langs.get('title_leave')[this.selectlang],
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.doDeleteTimeleave(this.selectedtrtimeleave)
      },
      reject: () => {
      }
    });
  }


}

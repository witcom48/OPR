import { DatePipe } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, MegaMenuItem, MenuItem, MessageService } from 'primeng/api';
import { SearchEmpComponent } from 'src/app/components/usercontrol/search-emp/search-emp.component';
import { AppConfig } from 'src/app/config/config';
import { InitialCurrent } from 'src/app/config/initial_current';
import { ATTReqdocumentModel } from 'src/app/models/attendance/attreqdocument';
import { ATTTimeleaveModel } from 'src/app/models/attendance/atttimeleave';
import { cls_TRleave } from 'src/app/models/attendance/cls_TRleave';
import { EmployeeModel } from 'src/app/models/employee/employee';
import { TRAccountModel } from 'src/app/models/self/traccount';
import { ReasonsModel } from 'src/app/models/system/policy/reasons';
import { AccessdataModel } from 'src/app/models/system/security/accessdata';
import { FillterEmpModel } from 'src/app/models/usercontrol/filteremp';
import { AtttimeleaveService } from 'src/app/services/attendance/atttimeleave.service';
import { TRLeaveaccServices } from 'src/app/services/attendance/trleaveacc.service';
import { EmployeeService } from 'src/app/services/emp/worker.service';
import { PeriodsServices } from 'src/app/services/payroll/periods.service';
import { AccountServices } from 'src/app/services/self/account.service';
import { ReasonsService } from 'src/app/services/system/policy/reasons.service';
declare var reqleave: any;
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-request-timeleave',
  templateUrl: './request-timeleave.component.html',
  styleUrls: ['./request-timeleave.component.scss']
})
export class RequestTimeleaveComponent implements OnInit {
  @ViewChild('TABLE') table: ElementRef | any = null;
  @ViewChild('fileUploader') fileUploader: ElementRef | any = null;
  langs: any = reqleave;
  @ViewChild(SearchEmpComponent) selectEmp: any;
  selectlang: string = "EN";
  leavetypedis: string = "leave_name_en"
  reasonedis: string = "reason_name_en"
  namedis: string = "worker_detail_en"
  day: number = 0;
  hour: number = 0;
  time_half: string = "00:00"
  leavetype: string = "F";
  constructor(private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private datePipe: DatePipe,
    private trleaveaccService: TRLeaveaccServices,
    private reasonService: ReasonsService,
    private accountServie: AccountServices,
    private router: Router,
    private employeeService: EmployeeService,
    private periodsService: PeriodsServices,
    private atttimeleaveService: AtttimeleaveService,
  ) { }
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
  selectedreqdoc: ATTReqdocumentModel = new ATTReqdocumentModel();
  account_list: TRAccountModel[] = [];
  selectedAccount: TRAccountModel = new TRAccountModel();
  start_date: Date = new Date();
  end_date: Date = new Date();

  public initial_current: InitialCurrent = new InitialCurrent();

  accessData: AccessdataModel = new AccessdataModel();
  initialData2: InitialCurrent = new InitialCurrent();
  doGetInitialCurrent() {
    this.initial_current = JSON.parse(localStorage.getItem(AppConfig.SESSIONInitial) || '{}');
    if (!this.initial_current.Token) {
      this.router.navigateByUrl('login');
    }
    this.accessData = this.initialData2.dotGetPolmenu('ATT');

    this.start_date = new Date(`${this.initial_current.PR_Year}-01-01`);
    this.end_date = new Date(`${this.initial_current.PR_Year}-12-31`);
    this.selectlang = this.initial_current.Language;
    if (this.initial_current.Language == "TH") {
      this.leavetypedis = "leave_name_th"
      this.reasonedis = "reason_name_th"
      this.namedis = "worker_detail_th"
    }
    if (this.initial_current.Usertype == "GRP") {
    } else {
      this.doLoadTimeleave();
      this.doLoadLeaveacc();
    }
  }

  ngOnInit(): void {
    this.doGetInitialCurrent()
    this.doLoadMenu();
    this.doLoadReason();
    this.Periodclosed()
    setTimeout(() => {
      this.doLoadEmployee()
      this.doLoadTimeleave()
    }, 300);
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

  title_page: { [key: string]: string } = { EN: "Dic Request", TH: "ใบคำร้อง" }
  title_requestOvertime: { [key: string]: string } = { EN: "Request Overtime", TH: "ขอทำล่วงเวลา" };
  title_date: { [key: string]: string } = { EN: "Date", TH: "วันที่" }
  title_ot_doc: { [key: string]: string } = { EN: "OT Doc", TH: "เลขที่เอกสาร" }
  title_no: { [key: string]: string } = { EN: "No.", TH: "ลำดับ" }
  title_Before: { [key: string]: string } = { EN: "Before", TH: "ก่อนเข้างาน " }
  title_Normal: { [key: string]: string } = { EN: "Normal", TH: "เวลาปกติ" }
  title_Break: { [key: string]: string } = { EN: "OBreak", TH: "เวลาพักเบรก" }
  title_After: { [key: string]: string } = { EN: "OAfter", TH: "หลังเลิกงาน" }
  title_Location: { [key: string]: string } = { EN: "Location", TH: "สถานที่" }
  title_reason: { [key: string]: string } = { EN: "Reason", TH: "สาเหตุการลา" }
  title_detail: { [key: string]: string } = { EN: "Detail", TH: "รายละเอียด" }

  title_Incholiday: { [key: string]: string } = { EN: "Incholiday", TH: "นับรวมวันหยุด" }
  title_Deduct: { [key: string]: string } = { EN: "Deduct", TH: "หักเงิน" }
  title_requestleave: { [key: string]: string } = { EN: "Request leave", TH: "ขอลางาน" };
  title_full_day: { [key: string]: string } = { EN: "Full day", TH: "เต็มวัน" };
  title_half_day: { [key: string]: string } = { EN: "Half day", TH: "ครึ่งวัน" };
  title_actualday: { [key: string]: string } = { EN: "Actualday", TH: "จำนวนวันลา" };
  title_day: { [key: string]: string } = { EN: "Day", TH: "วัน" };
  title_morning: { [key: string]: string } = { EN: "Morning", TH: "เช้า" };
  title_afternoon: { [key: string]: string } = { EN: "Afternoon", TH: "บ่าย" };
  title_leavetype: { [key: string]: string } = { EN: "Leave Type", TH: "ประเภทการลา" };
  title_leave: { [key: string]: string } = { EN: "Leave", TH: "รูปแบบการลา" };

  title_remain: { [key: string]: string } = { EN: "Remain", TH: "คงเหลือ" };
  title_hour: { [key: string]: string } = { EN: "hour", TH: "ชม" };
  title_leave_annual: { [key: string]: string } = { EN: "Leave Annual", TH: "วันลาต่อปี" };
  title_leave_used: { [key: string]: string } = { EN: "Leave Used", TH: "วันลาใช้ไป" };
  title_leave_remain: { [key: string]: string } = { EN: "Leave Remain", TH: "วันลาคงเหลือ" };
  title_cumulative_leave: { [key: string]: string } = { EN: "Cumulative leave", TH: "วันลาสะสม" };
  Search() {
    this.doLoadTimeleave();
    if (this.initial_current.Usertype == "GRP") {
      this.doLoadLeaveacc();
      this.doLoadTimeleave();
    }
  }

  async doLoadTimeleave() {
    this.trtimeleave_list = [];

    const tmp = new ATTTimeleaveModel();
    tmp.timeleave_fromdate = this.start_date;
    tmp.timeleave_todate = this.end_date;
    tmp.company_code = this.initial_current.CompCode;
    tmp.worker_code = this.workerDetail.worker_code;

    try {
      const res = await this.atttimeleaveService.atttimeleave_get(tmp);

      if (res) {

        res.forEach((elm: any) => {
          elm.timeleave_fromdate = new Date(elm.timeleave_fromdate);
          elm.timeleave_todate = new Date(elm.timeleave_todate);
        });
      }

      this.trtimeleave_list = res || [];
    } catch (error) {
    }
  }


  doLoadLeaveacc() {
    this.leaveacc_list = [];
    var tmp = new cls_TRleave();
    tmp.worker_code = this.workerDetail.worker_code;
    this.trleaveaccService.leaveacc_get(tmp).then(async (res) => {
      this.leaveacc_list = await res
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
    });
  }
  async doRecordTimeleave(data: ATTTimeleaveModel[]) {
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
  doUploadFile() {
    const filename = "LEAVE_DOC" + this.datePipe.transform(new Date(), 'yyyyMMddHHmmss');
    const filetype = this.fileToUpload.name.split(".")[1];
    this.atttimeleaveService.file_import(this.fileToUpload, filename, filetype).then((res) => {
      if (res.success) {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: res.message });
        this.selectedtrtimeleave.reqdoc_data = this.selectedtrtimeleave.reqdoc_data.concat({
          company_code: this.selectedtrtimeleave.company_code || this.initial_current.CompCode,
          document_id: 0,
          job_id: this.selectedtrtimeleave.timeleave_id.toString(),
          job_type: 'LEA',
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
    this.atttimeleaveService.get_file(file_path).then((res) => {
      var url = window.URL.createObjectURL(new Blob([new Uint8Array(res)], { type: type }));
      window.open(url);
      this.selectedreqdoc = new ATTReqdocumentModel();
    })
  }
  doLoadMenu() {
    this.mainMenuItems = [{ label: this.title_page[this.initial_current.Language], routerLink: '/attendance/dicrequest' },
    { label: this.title_requestleave[this.initial_current.Language], routerLink: '/recordtime/requestot', styleClass: 'activelike' }]
    this.items = [

      {
        label: this.langs.get('new')[this.selectlang],
        icon: 'pi pi-fw pi-plus',
        command: (event) => {
          this.initializeLeaveForm();
          this.showManage();
        }

      },
      {
        label: this.title_export[this.initial_current.Language],
        icon: 'pi pi-fw pi-file-export',
        command: (event) => {
          this.exportAsExcel()
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
      this.workerDetail.worker_code = this.workerDetail.worker_code;
    }
  }
  //   EMPLEAVEACC_REMAIN = (EMPLEAVEACC_BF + EMPLEAVEACC_ANNUAL) - EMPLEAVEACC_USED
  // calculateRemain(): number {
  //   const bf = +this.selectedtrtimeleave.empleaveacc_bf || 0; //ยอดยกมา
  //   const annual = +this.selectedtrtimeleave.empleaveacc_annual || 0; //ยอดวันลาประจำปี
  //   const used = +this.selectedtrtimeleave.empleaveacc_used || 0; //ยอดวันลาที่ใช้ไป
  //   return (bf + annual) - used;
  // }

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

    }
  }

  doBackWorker() {
    if (this.worker_index > 0) {
      this.worker_index--;
      this.doSetDetailWorker();

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


  DeleteFile(data: ATTReqdocumentModel) {
    this.confirmationService.confirm({
      message: this.langs.get('confirm_delete')[this.selectlang] + data.document_name,
      header: this.langs.get('delete')[this.selectlang],
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        if (data.document_id) {
          this.atttimeleaveService.delete_file(data).then((res) => {
            if (res.success) {
              this.messageService.add({ severity: 'success', summary: 'Success', detail: res.message });
            } else {
              this.messageService.add({ severity: 'error', summary: 'Error', detail: res.message });
            }
          })
        } else {
          this.selectedtrtimeleave.reqdoc_data = this.selectedtrtimeleave.reqdoc_data.filter((item) => {
            return item !== data;
          });
        }
        this.atttimeleaveService.deletefilepath_file(data.document_path).then((res) => {
          if (res.success) {
            this.messageService.add({ severity: 'success', summary: 'Success', detail: res.message });
            this.selectedtrtimeleave.reqdoc_data = this.selectedtrtimeleave.reqdoc_data.filter((item) => {
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
    this.selectedtrtimeleave.leave_code = this.selectedleave_type.leave_code;
    this.day = Math.floor(this.selectedleave_type.empleaveacc_remain)
    this.hour = (this.selectedleave_type.empleaveacc_remain - Math.floor(this.selectedleave_type.empleaveacc_remain)) * 8
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
        if (this.selectedtrtimeleave.timeleave_doc === "") {
          this.selectedtrtimeleave.worker_code = this.workerDetail.worker_code;

          this.selectedtrtimeleave.timeleave_doc = "LEAVE_" + this.datePipe.transform(new Date(), 'yyyyMMddHHmmss');
        }
        if (this.selectedtrtimeleave.timeleave_type != "F") {
          this.selectedtrtimeleave.worker_code = this.workerDetail.worker_code;

          this.selectedtrtimeleave.timeleave_todate = this.selectedtrtimeleave.timeleave_fromdate;
          var date1 = new Date(0, 0, 0, Number(this.time_half.split(":")[0]), Number(this.time_half.split(":")[1]), 0)
          var hours_minutes = date1.getHours() * 60 + date1.getMinutes();
          this.selectedtrtimeleave.timeleave_min = hours_minutes;

        } else {
          this.selectedtrtimeleave.timeleave_min = (this.selectedtrtimeleave.timeleave_actualday * 480)
        }
        this.doRecordTimeleave([this.selectedtrtimeleave])
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
  //
  confirmDelete(data: ATTTimeleaveModel) {
    this.confirmationService.confirm({
      message: this.title_confirm_delete[this.initial_current.Language],
      header: this.title_confirm[this.initial_current.Language],
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.doDeleteTimeleave(data)
      },
      reject: () => {
      },
      key: "myDialog"
    });

  }
  //   //
  //เช็คชข้อมูลเมื่อมีการปิดงวด
  hasTruePeriodCloseta: boolean = false;
  async Periodclosed() {
    try {
      const res = await this.periodsService.period_get2(this.initial_current.CompCode, "PAY", this.initial_current.EmpType, this.initial_current.PR_Year, this.initial_current.TA_FromDate, this.initial_current.TA_ToDate);
      if (res && res.length > 0) {
        for (const element of res) {
          element.period_from = new Date(element.period_from);
          element.period_to = new Date(element.period_to);
          element.period_payment = new Date(element.period_payment);
        }
        this.hasTruePeriodCloseta = res.some((item: { period_closepr: boolean }) => item.period_closepr === true);
        if (this.hasTruePeriodCloseta) {
          this.confirmationService.confirm({
            message: this.initial_current.Language === 'TH' ? 'ข้อมูลที่ทำรายการอยู่ในงวดที่ปิดแล้ว' : 'Period is closed permission set to read-only !!!',
            header: this.initial_current.Language === 'TH' ? 'คำเตือน' : 'Warning',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
            },
            rejectVisible: false,
          });
        }
      }
    } catch { }
  }
  exportAsExcel() {
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(this.table.nativeElement);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    XLSX.writeFile(wb, 'Export_Timeleave.xlsx');

  }
}

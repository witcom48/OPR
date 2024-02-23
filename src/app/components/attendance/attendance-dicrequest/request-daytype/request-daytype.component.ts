import { DatePipe } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, MenuItem, MessageService } from 'primeng/api';
import { SearchEmpComponent } from 'src/app/components/usercontrol/search-emp/search-emp.component';
import { AppConfig } from 'src/app/config/config';
import { InitialCurrent } from 'src/app/config/initial_current';
import { TRATTTimeDaytypeModel } from 'src/app/models/attendance/TRATTTimeDaytype';
import { ATTReqdocumentModel } from 'src/app/models/attendance/attreqdocument';
import { DaytypeModels } from 'src/app/models/attendance/daytype';
import { EmployeeModel } from 'src/app/models/employee/employee';
import { AccountModel } from 'src/app/models/self/account';
import { TRAccountModel } from 'src/app/models/self/traccount';
import { SysLocationModel } from 'src/app/models/system/policy/location';
import { ReasonsModel } from 'src/app/models/system/policy/reasons';
import { AccessdataModel } from 'src/app/models/system/security/accessdata';
import { FillterEmpModel } from 'src/app/models/usercontrol/filteremp';
import { AtttimeDaytypeService } from 'src/app/services/attendance/atttimedaytype.service';
import { TimecardService } from 'src/app/services/attendance/timecards.service';
import { EmployeeService } from 'src/app/services/emp/worker.service';
import { PeriodsServices } from 'src/app/services/payroll/periods.service';
import { AccountServices } from 'src/app/services/self/account.service';
import { LocationService } from 'src/app/services/system/policy/location.service';
import { ReasonsService } from 'src/app/services/system/policy/reasons.service';
declare var reqdaytype: any;
import * as XLSX from 'xlsx';
@Component({
  selector: 'app-request-daytype',
  templateUrl: './request-daytype.component.html',
  styleUrls: ['./request-daytype.component.scss']
})
export class RequestDaytypeComponent implements OnInit {
  @ViewChild('fileUploader') fileUploader: ElementRef | any = null;
  @ViewChild('TABLE') table: ElementRef | any = null;
  langs: any = reqdaytype;
  selectlang: string = "EN";
  itemslike: MenuItem[] = [];
  home: any;
  @ViewChild(SearchEmpComponent) selectEmp: any;
  reasonedis: string = "reason_name_en"
  locatiodis: string = "location_name_en"
  namedis: string = "worker_detail_en"
  daytypeedis: string = "daytype_name_en"
  displayManage: boolean = false;
  edit_data: boolean = false;
  position: string = "right";
  manage_title: string = "Manage"
  items: MenuItem[] = [];
  items_attfile: MenuItem[] = [];

  constructor(
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private accountServie: AccountServices,
    private router: Router,
    private employeeService: EmployeeService,
    private periodsService: PeriodsServices,
    private locationService: LocationService,
    private reasonService: ReasonsService,
    private atttimedaytypeService: AtttimeDaytypeService,
    private datePipe: DatePipe,
    private timecardService: TimecardService,
  ) { }

  mainMenuItems: MenuItem[] = [];
  homeIcon: any = { icon: 'pi pi-home', routerLink: '/' };
  fileToUpload: File | any = null;
  Uploadfile: boolean = false;
  daytype_list: DaytypeModels[] = [];
  daytype_newselected: DaytypeModels = new DaytypeModels();
  reason_list: ReasonsModel[] = [];
  reasonselected: ReasonsModel = new ReasonsModel();
  timedaytype_list: TRATTTimeDaytypeModel[] = [];
  selectedtimedaytype: TRATTTimeDaytypeModel = new TRATTTimeDaytypeModel();
  selectedreqdoc: ATTReqdocumentModel = new ATTReqdocumentModel();
  account_list: TRAccountModel[] = [];
  account_list_source: TRAccountModel[] = [];
  account_list_dest: TRAccountModel[] = [];
  selectedAccount: TRAccountModel = new TRAccountModel();
  workerDetail: EmployeeModel = new EmployeeModel();
  worker_list: EmployeeModel[] = [];
  worker_index: number = 0;
  worker_code: string = "";
  worker_name: string = "";
  fillterIncludeResign: boolean = false;
  start_date: Date = new Date();
  end_date: Date = new Date();

  accessData: AccessdataModel = new AccessdataModel();
  initialData2: InitialCurrent = new InitialCurrent();
  public initial_current: InitialCurrent = new InitialCurrent();
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
      this.reasonedis = "reason_name_th";
      this.locatiodis = "location_name_th"
      this.namedis = "worker_detail_th"
      this.daytypeedis = "daytype_name_th"

    }
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
  title_requestDaytype: { [key: string]: string } = { EN: "Request Change Daytype", TH: "ขอเปลี่ยนประเภทวันทำงาน" };

  title_no: { [key: string]: string } = { EN: "No", TH: "ลำดับ" }
  title_day_doc: { [key: string]: string } = { EN: "Daytype Doc", TH: "รหัสเอกสาร" }
  title_date: { [key: string]: string } = { EN: "Date", TH: "วันที่" }
  title_day_old: { [key: string]: string } = { EN: "Daytype Old", TH: "ประเภทวันเดิม" }
  title_day_new: { [key: string]: string } = { EN: "Daytype New", TH: "ประเภทวันใหม่" }
  title_reason: { [key: string]: string } = { EN: "Reason", TH: "เหตุผลการเปลี่ยนกะ" }
  title_note: { [key: string]: string } = { EN: "Note", TH: "เพิ่มเติม" }

  title_file_name: { [key: string]: string } = { EN: "File Name", TH: "ชื่อไฟล์" }

  title_upload: { [key: string]: string } = { EN: "Upload", TH: "อัพโหลด" }

  ngOnInit(): void {
    this.doGetInitialCurrent();
    this.doLoadMenu();
    this.doLoadReason();
    this.doLoadPolDaytype();
    setTimeout(() => {
      this.doLoadEmployee()

    }, 300);
  }



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
    this.doLoadTimedaytype();

  }
  close_searchemp() {
    this.searchEmp = false
  }

  searchEmp: boolean = false;
  open_searchemp() {
    this.searchEmp = true
  }
  Search() {
    this.doLoadTimedaytype();
  }
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
  isConfirmationDialogVisible: boolean = false;

  doLoadMenu() {

    this.mainMenuItems = [{ label: this.title_page[this.initial_current.Language], routerLink: '/attendance/dicrequest' },
    { label: this.title_requestDaytype[this.initial_current.Language], routerLink: '/dicrequest/requestdaytype', styleClass: 'activelike' }]

    this.items = [

      {
        label: this.title_new[this.initial_current.Language],
        icon: 'pi pi-fw pi-plus',
        command: (event) => {
          this.account_list_source = [];
          this.account_list_dest = [];
          this.selectedtimedaytype = new TRATTTimeDaytypeModel();
          this.doLoadDaytypeOld();
          this.reasonselected = this.reason_list[0]
          this.daytype_newselected = this.daytype_list[0]
          this.selectedtimedaytype.timedaytype_new = this.daytype_list[0].daytype_code
          this.selectedtimedaytype.reason_code = this.reason_list[0].reason_code
          this.showManage()
        }

      },
    ];

    this.items_attfile = [

      {
        label: this.title_new[this.initial_current.Language],
        icon: 'pi pi-fw pi-plus',
        command: (event) => {
          this.Uploadfile = true;
        }
      },
    ];


  }

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

  doLoadTimedaytype() {
    this.timedaytype_list = [];
    var tmp = new TRATTTimeDaytypeModel();
    tmp.timedaytype_workdate = this.start_date;
    tmp.timedaytype_todate = this.end_date;
    tmp.worker_code = this.selectedAccount.worker_code;
    this.atttimedaytypeService.atttimeshift_get(tmp).then(async (res) => {
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
  async doRecordTimedaytype(data: TRATTTimeDaytypeModel[]) {
    await this.atttimedaytypeService.atttimeshift_record(data).then((res) => {
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
  async doDeleteTimedaytype(data: TRATTTimeDaytypeModel) {
    await this.atttimedaytypeService.atttimeshift_delete(data).then((res) => {
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
      this.selectedtimedaytype.timedaytype_old = res[0].timecard_daytype;
    });
  }
  async doGetfileTimeleave(file_path: string, type: string) {
    this.atttimedaytypeService.get_file(file_path).then((res) => {
      var url = window.URL.createObjectURL(new Blob([new Uint8Array(res)], { type: type }));
      window.open(url);
      this.selectedreqdoc = new ATTReqdocumentModel();
    })
  }
  doUploadFile() {
    const filename = "DAYTYPE_DOC" + this.datePipe.transform(new Date(), 'yyyyMMddHHmmss');
    const filetype = this.fileToUpload.name.split(".")[1];
    this.atttimedaytypeService.file_import(this.fileToUpload, filename, filetype).then((res) => {
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
    this.selectedtimedaytype = new TRATTTimeDaytypeModel();
    this.displayManage = false

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
  DeleteFile(data: ATTReqdocumentModel) {
    this.confirmationService.confirm({
      message: this.title_confirm_delete[this.initial_current.Language] + data.document_name,
      header: this.title_delete[this.initial_current.Language],
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        // console.log(data)
        if (data.document_id) {
          this.atttimedaytypeService.delete_file(data).then((res) => {
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
        this.atttimedaytypeService.deletefilepath_file(data.document_path).then((res) => {
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
      message: this.title_delete[this.initial_current.Language] + this.selectedtimedaytype.timedaytype_doc,
      header: this.title_requestDaytype[this.initial_current.Language],
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
      message: this.title_confirm_record[this.initial_current.Language],
      header: this.title_day_doc[this.initial_current.Language],
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        if (this.selectedtimedaytype.timedaytype_doc === "") {
          this.selectedtimedaytype.timedaytype_doc = "DAYTYPE_" + this.datePipe.transform(new Date(), 'yyyyMMddHHmmss');
        }
        // // console.log(this.selectedtimedaytype)
        this.doRecordTimedaytype([this.selectedtimedaytype])

      },
      reject: () => {
      }
    });
  }

  exportAsExcel() {
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(this.table.nativeElement);//converts a DOM TABLE element to a worksheet
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    XLSX.writeFile(wb, 'Export_Timeot.xlsx');

  }

  normalday: { [key: string]: string } = { EN: "Normal Day", TH: "วันปกติ" }
  offday: { [key: string]: string } = { EN: "Off Day", TH: "วันหยุด" }
  holiday: { [key: string]: string } = { EN: "Holiday", TH: "วันหยุดประเพณี" }
  companyday: { [key: string]: string } = { EN: "Company Day", TH: "วันหยุดบริษัท" }
  leaveday: { [key: string]: string } = { EN: "Leave Day", TH: "วันลา" }
  absentday: { [key: string]: string } = { EN: "Absent Day", TH: "ขาดงาน" }

  getFullDay(day: string) {
    let dayfull = ""
    switch (day) {
      case "N":
        dayfull = this.normalday[this.initial_current.Language];
        break;
      case "O":
        dayfull = this.offday[this.initial_current.Language];
        break;
      case "H":
        dayfull = this.holiday[this.initial_current.Language];
        break;
      case "C":
        dayfull = this.companyday[this.initial_current.Language];
        break;
      case "L":
        dayfull = this.leaveday[this.initial_current.Language];
        break;
      case "A":
        dayfull = this.absentday[this.initial_current.Language];
    }
    return dayfull;
  }
}

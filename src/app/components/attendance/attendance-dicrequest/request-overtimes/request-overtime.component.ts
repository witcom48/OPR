import { DatePipe } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, MenuItem, MessageService } from 'primeng/api';
import { SearchEmpComponent } from 'src/app/components/usercontrol/search-emp/search-emp.component';
import { AppConfig } from 'src/app/config/config';
import { InitialCurrent } from 'src/app/config/initial_current';
import { TRATTTimeotModel } from 'src/app/models/attendance/TRATTTimeotModel';
import { ATTReqdocumentModel } from 'src/app/models/attendance/attreqdocument';
import { EmployeeModel } from 'src/app/models/employee/employee';
import { TRAccountModel } from 'src/app/models/self/traccount';
import { SysLocationModel } from 'src/app/models/system/policy/location';
import { ReasonsModel } from 'src/app/models/system/policy/reasons';
import { AccessdataModel } from 'src/app/models/system/security/accessdata';
import { FillterEmpModel } from 'src/app/models/usercontrol/filteremp';
import { AtttimeotService } from 'src/app/services/attendance/atttimeot.service';
import { EmployeeService } from 'src/app/services/emp/worker.service';
import { PeriodsServices } from 'src/app/services/payroll/periods.service';
import { LocationService } from 'src/app/services/system/policy/location.service';
import { ReasonsService } from 'src/app/services/system/policy/reasons.service';
import * as XLSX from 'xlsx';
declare var attot: any;
@Component({
  selector: 'app-request-overtime',
  templateUrl: './request-overtime.component.html',
  styleUrls: ['./request-overtime.component.scss']
})
export class RequestOvertimeComponent implements OnInit {
  @ViewChild(SearchEmpComponent) selectEmp: any;
  @ViewChild('fileUploader') fileUploader: ElementRef | any = null;
  @ViewChild('TABLE') table: ElementRef | any = null;
  langs: any = attot;
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
    private reasonService: ReasonsService,
    private locationService: LocationService,
    private router: Router,
    private atttimeotService: AtttimeotService,
    private employeeService: EmployeeService,
    private periodsService: PeriodsServices,
  ) { }
  mainMenuItems: MenuItem[] = [];
  homeIcon: any = { icon: 'pi pi-home', routerLink: '/' };
  fileToUpload: File | any = null;
  Uploadfile: boolean = false;
  reason_list: ReasonsModel[] = [];
  reasonselected: ReasonsModel = new ReasonsModel();
  location_list: SysLocationModel[] = [];
  locationselected: SysLocationModel = new SysLocationModel();
  trtimeot_list: TRATTTimeotModel[] = [];
  selectedtrtimeot: TRATTTimeotModel = new TRATTTimeotModel();
  selectedreqdoc: ATTReqdocumentModel = new ATTReqdocumentModel();

  selectedAccount: TRAccountModel = new TRAccountModel();
  start_date: Date = new Date();
  end_date: Date = new Date();
  initialData2: InitialCurrent = new InitialCurrent();
  accessData: AccessdataModel = new AccessdataModel();
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

    }
    if (this.initial_current.Usertype == "GRP") {
    } else {
      this.doLoadTimeot();
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
  title_reason: { [key: string]: string } = { EN: "Reason", TH: "เหตุผลการทำล่วงเวลา" }
  title_detail: { [key: string]: string } = { EN: "Detail", TH: "รายละเอียด" }


  ngOnInit(): void {
    this.doGetInitialCurrent();
    this.doLoadMenu();
    this.doLoadReason();
    this.doLoadLocation();
    this.Periodclosed()

    setTimeout(() => {
      this.doLoadEmployee()
      this.doLoadTimeot()
    }, 300);
  }
  Search() {
    this.doLoadTimeot();
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
    this.doLoadTimeot();

  }

  close_searchemp() {
    this.searchEmp = false
  }

  searchEmp: boolean = false;
  open_searchemp() {
    this.searchEmp = true
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
  //

  doLoadTimeot() {
    this.trtimeot_list = [];
    var tmp = new TRATTTimeotModel();
    tmp.timeot_workdate = this.start_date;
    tmp.timeot_worktodate = this.end_date;
    tmp.worker_code = this.workerDetail.worker_code;
    this.atttimeotService.atttimeot_get(tmp).then(async (res) => {
      res.forEach((elm: any) => {
        elm.timeot_workdate = new Date(elm.timeot_workdate)
        elm.timeot_worktodate = new Date(elm.timeot_worktodate)

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
  async doRecordTimeot(data: TRATTTimeotModel[]) {
    await this.atttimeotService.atttimeot_record(data).then((res) => {
      if (res.success) {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: res.message });
        this.doLoadTimeot();
        console.log(res.success, 'ttrtttttt')

      }
      else {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: res.message });
      }

    });
    this.closeManage()
  }
  async doDeleteTimeot(data: TRATTTimeotModel) {
    await this.atttimeotService.atttimeot_delete(data).then((res) => {
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


  //
  confirmDelete(data: TRATTTimeotModel) {
    this.confirmationService.confirm({
      message: this.title_confirm_delete[this.initial_current.Language],
      header: this.title_confirm[this.initial_current.Language],
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.doDeleteTimeot(data);
      },
      reject: () => {
      },
      key: "myDialog"
    });
  }
  //
  async doGetfileTimeot(file_path: string, type: string) {
    this.atttimeotService.get_file(file_path).then((res) => {
      var url = window.URL.createObjectURL(new Blob([new Uint8Array(res)], { type: type }));
      window.open(url);
      this.selectedreqdoc = new ATTReqdocumentModel();
    })
  }
  doUploadFile() {
    const filename = "OT_DOC" + this.datePipe.transform(new Date(), 'yyyyMMddHHmmss');
    const filetype = this.fileToUpload.name.split(".")[1];
    this.atttimeotService.file_import(this.fileToUpload, filename, filetype).then((res) => {
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
    this.mainMenuItems = [{ label: this.title_page[this.initial_current.Language], routerLink: '/attendance/dicrequest' },
    { label: this.title_requestOvertime[this.initial_current.Language], routerLink: '/dicrequest/requestot', styleClass: 'activelike' }]
    this.items = [

      {
        label: this.langs.get('new')[this.selectlang],
        icon: 'pi pi-fw pi-plus',
        command: (event) => {
          this.selectedtrtimeot = new TRATTTimeotModel();
          this.reasonselected = this.reason_list[0]
          this.locationselected = this.location_list[0]
          this.selectedtrtimeot.reason_code = this.reason_list[0].reason_code
          this.selectedtrtimeot.location_code = this.location_list[0].location_code
          if (this.initial_current.Usertype == "GRP") {
          }
          this.showManage()
        }

      },


      {
        label: this.title_export[this.initial_current.Language],
        icon: 'pi pi-fw pi-file-export',
        command: (event) => {
          this.exportAsExcel()
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
  DeleteFile(data: ATTReqdocumentModel) {
    this.confirmationService.confirm({
      message: this.langs.get('confirm_delete')[this.selectlang] + data.document_name,
      header: this.langs.get('delete')[this.selectlang],
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        if (data.document_id) {
          this.atttimeotService.delete_file(data).then((res) => {
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
        this.atttimeotService.deletefilepath_file(data.document_path).then((res) => {
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
    this.selectedtrtimeot = new TRATTTimeotModel();
    this.displayManage = false

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
        this.selectedtrtimeot.timeot_beforemin = this.getMin(this.selectedtrtimeot.timeot_beforemin_hrs)
        this.selectedtrtimeot.timeot_normalmin = this.getMin(this.selectedtrtimeot.timeot_normalmin_hrs)
        this.selectedtrtimeot.timeot_break = this.getMin(this.selectedtrtimeot.timeot_breakmin_hrs)
        this.selectedtrtimeot.timeot_aftermin = this.getMin(this.selectedtrtimeot.timeot_aftermin_hrs)
        if (this.initial_current.Usertype == "GRP" && !this.edit_data) {
          let data_doc: TRATTTimeotModel[] = []
          var tmp: TRATTTimeotModel = new TRATTTimeotModel();

          tmp.company_code = this.initial_current.CompCode;
          tmp.worker_code = this.workerDetail.worker_code;
          tmp.timeot_id = this.selectedtrtimeot.timeot_id;
          tmp.timeot_doc = "OT_" + (Number(this.datePipe.transform(new Date(), 'yyyyMMddHHmmss')));
          tmp.timeot_workdate = this.selectedtrtimeot.timeot_workdate;
          tmp.timeot_worktodate = this.selectedtrtimeot.timeot_worktodate;
          tmp.timeot_beforemin = this.selectedtrtimeot.timeot_beforemin;
          tmp.timeot_normalmin = this.selectedtrtimeot.timeot_normalmin;
          tmp.timeot_break = this.selectedtrtimeot.timeot_break;
          tmp.timeot_aftermin = this.selectedtrtimeot.timeot_aftermin;
          tmp.timeot_note = this.selectedtrtimeot.timeot_note;
          tmp.location_code = this.selectedtrtimeot.location_code;
          tmp.reason_code = this.selectedtrtimeot.reason_code;
          tmp.reqdoc_data = this.selectedtrtimeot.reqdoc_data;
          tmp.modified_by = this.initial_current.Username,
            data_doc.push(tmp);

          this.doRecordTimeot(data_doc);
        } else {
          if (this.selectedtrtimeot.timeot_doc === "") {
            this.selectedtrtimeot.timeot_doc = "OT_" + this.datePipe.transform(new Date(), 'yyyyMMddHHmmss');
          }
          let data_doc2: TRATTTimeotModel[] = []
          var data: TRATTTimeotModel = new TRATTTimeotModel();
          data.company_code = this.initial_current.CompCode;
          data.worker_code = this.workerDetail.worker_code;
          data.timeot_id = this.selectedtrtimeot.timeot_id;
          data.timeot_doc = "OT_" + (Number(this.datePipe.transform(new Date(), 'yyyyMMddHHmmss')));
          data.timeot_workdate = this.selectedtrtimeot.timeot_workdate;
          data.timeot_worktodate = this.selectedtrtimeot.timeot_worktodate;
          data.timeot_beforemin = this.selectedtrtimeot.timeot_beforemin;
          data.timeot_normalmin = this.selectedtrtimeot.timeot_normalmin;
          data.timeot_break = this.selectedtrtimeot.timeot_break;
          data.timeot_aftermin = this.selectedtrtimeot.timeot_aftermin;
          data.timeot_note = this.selectedtrtimeot.timeot_note;
          data.location_code = this.selectedtrtimeot.location_code;
          data.reason_code = this.selectedtrtimeot.reason_code;
          data.reqdoc_data = this.selectedtrtimeot.reqdoc_data;
          data.modified_by = this.initial_current.Username,

            data_doc2.push(data);
          this.doRecordTimeot(data_doc2)
          console.log(data_doc2, 'itew')

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
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(this.table.nativeElement);//converts a DOM TABLE element to a worksheet
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    XLSX.writeFile(wb, 'Export_Timeot.xlsx');

  }
}

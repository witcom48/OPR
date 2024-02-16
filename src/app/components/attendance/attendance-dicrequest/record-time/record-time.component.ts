import { DatePipe } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService,  MenuItem, MessageService } from 'primeng/api';
import { SearchEmpComponent } from 'src/app/components/usercontrol/search-emp/search-emp.component';
import { AppConfig } from 'src/app/config/config';
import { InitialCurrent } from 'src/app/config/initial_current';
import { ATTReqdocumentModel } from 'src/app/models/attendance/attreqdocument';
import { TimeonsiteModel } from 'src/app/models/attendance/timeonsite';
import { EmployeeModel } from 'src/app/models/employee/employee';
import { TRAccountModel } from 'src/app/models/self/traccount';
import { SysLocationModel } from 'src/app/models/system/policy/location';
import { ReasonsModel } from 'src/app/models/system/policy/reasons';
import { AccessdataModel } from 'src/app/models/system/security/accessdata';
import { FillterEmpModel } from 'src/app/models/usercontrol/filteremp';
import { AttimeonsiteService } from 'src/app/services/attendance/attimeonsite.service';
import { EmployeeService } from 'src/app/services/emp/worker.service';
import { PeriodsServices } from 'src/app/services/payroll/periods.service';
 import { LocationService } from 'src/app/services/system/policy/location.service';
import { ReasonsService } from 'src/app/services/system/policy/reasons.service';
declare var reqonsite: any;
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-record-time',
  templateUrl: './record-time.component.html',
  styleUrls: ['./record-time.component.scss']
})
export class RecordTimeComponent implements OnInit {
  @ViewChild('fileUploader') fileUploader: ElementRef | any = null;
  @ViewChild(SearchEmpComponent) selectEmp: any;
  @ViewChild('TABLE') table: ElementRef | any = null;
  langs: any = reqonsite;
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
    private attimeonsiteService: AttimeonsiteService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private reasonService: ReasonsService,
    private locationService: LocationService,
     private datePipe: DatePipe,
    private router: Router,
    private periodsService: PeriodsServices,
    private employeeService: EmployeeService,


  ) { }
  mainMenuItems: MenuItem[] = [];
  homeIcon: any = { icon: 'pi pi-home', routerLink: '/' };
  fileToUpload: File | any = null;
  Uploadfile: boolean = false;
  reason_list: ReasonsModel[] = [];
  reasonselected: ReasonsModel = new ReasonsModel();
  location_list: SysLocationModel[] = [];
  locationselected: SysLocationModel = new SysLocationModel();
  trtimonsite_list: TimeonsiteModel[] = [];
  selectedtrtimeonsite: TimeonsiteModel = new TimeonsiteModel();
  selectedreqdoc: ATTReqdocumentModel = new ATTReqdocumentModel();
  account_list: TRAccountModel[] = [];
  account_list_source: TRAccountModel[] = [];
  account_list_dest: TRAccountModel[] = [];
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
      this.reasonedis = "reason_name_th";
      this.locatiodis = "location_name_th"
      this.namedis = "worker_detail_th"
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
  title_record_time: { [key: string]: string } = { EN: "Record time", TH: "บันทึกการลงเวลา" };
  title_date: { [key: string]: string } = { EN: "Date", TH: "วันที่" }
  title_ot_doc: { [key: string]: string } = { EN: "OT Doc", TH: "เลขที่เอกสาร" }
  title_no: { [key: string]: string } = { EN: "No.", TH: "ลำดับ" }
  title_Before: { [key: string]: string } = { EN: "Before", TH: "ก่อนเข้างาน " }
  title_Normal: { [key: string]: string } = { EN: "Normal", TH: "เวลาปกติ" }
  title_Break: { [key: string]: string } = { EN: "OBreak", TH: "เวลาพักเบรก" }
  title_After: { [key: string]: string } = { EN: "OAfter", TH: "หลังเลิกงาน" }
  title_Location: { [key: string]: string } = { EN: "Location", TH: "สถานที่ปฎิบัติงาน" }
  title_reason: { [key: string]: string } = { EN: "Reason", TH: "เหตุผลการทำล่วงเวลา" }
  title_detail: { [key: string]: string } = { EN: "Detail", TH: "รายละเอียด" }
  title_time_in: { [key: string]: string } = { EN: "Time in", TH: "เข้างาน" }
  title_time_out: { [key: string]: string } = { EN: "Time out", TH: "ออกงาน" }
  file_name: { [key: string]: string } = { EN: "File Name", TH: "ชื่อไฟล์" }
  confirm_upload: { [key: string]: string } = { EN: "Confirm Upload file", TH: "ยืนยันนำเข้าไฟล์" }
  confirm_delete: { [key: string]: string } = { EN: "Confirm delete", TH: "ยืนยันการลบรายการ" }
  confirm_deletefile: { [key: string]: string } = { EN: "Confirm Delete file", TH: "ยืนยันลบไฟล์" }
  confirm_delete_doc: { [key: string]: string } = { EN: "Confirm Delete Doc", TH: "ยืนยันลบเอกสาร" }
  confirm_doc: { [key: string]: string } = { EN: "Confirm record ChangeShift doc", TH: "ยืนยันบันทึกเอกสารเปลียนกะการทำงาน" }

  title_import: { [key: string]: string } = { EN: "import", TH: "นำเข้า" }



  ngOnInit(): void {
    this.doGetInitialCurrent();
    this.doLoadMenu();
    this.doLoadReason();
    this.doLoadLocation()
    this.Periodclosed()

    setTimeout(() => {
      this.doLoadEmployee()
      this.doLoadTimeonsite()
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
    this.doLoadTimeonsite();

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
    this.doLoadTimeonsite();
  }

  doLoadReason() {
    this.reason_list = [];
    let data = new ReasonsModel()
    data.reason_group = "ONS"
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
  doLoadTimeonsite() {
    this.trtimonsite_list = [];
    var tmp = new TimeonsiteModel();
    tmp.timeonsite_workdate = this.start_date;
    tmp.worker_code = this.workerDetail.worker_code;
    this.attimeonsiteService.ATTtimeonsite_get(tmp).then(async (res) => {
      res.forEach((elm: any) => {
        elm.timeonsite_workdate = new Date(elm.timeonsite_workdate)
      });
      this.trtimonsite_list = await res
    });
  }
  async doRecordTimeonsite(data: TimeonsiteModel[]) {
    await this.attimeonsiteService.ATTtimeonsite_record(data).then((res) => {
      if (res.success) {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: res.message });
        this.doLoadTimeonsite();
      }
      else {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: res.message });
      }

    });
    this.closeManage()
  }
  async doDeleteTimeonsite(data: TimeonsiteModel) {
    await this.attimeonsiteService.ATTtimeonsite_delete(data).then((res) => {
      if (res.success) {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: res.message });
        this.doLoadTimeonsite();
      }
      else {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: res.message });
      }

    });
    this.closeManage()
  }
  async doGetfileTimeonsite(file_path: string, type: string) {
    this.attimeonsiteService.get_file(file_path).then((res) => {
      var url = window.URL.createObjectURL(new Blob([new Uint8Array(res)], { type: type }));
      window.open(url);
      this.selectedreqdoc = new ATTReqdocumentModel();
      console.log(this.selectedreqdoc, ' this.selectedreqdoc ')
    })
  }
  doUploadFile() {
    const filename = "ONSITE_DOC" + this.datePipe.transform(new Date(), 'yyyyMMddHHmmss');
    const filetype = this.fileToUpload.name.split(".")[1];
    this.attimeonsiteService.file_import(this.fileToUpload, filename, filetype).then((res) => {
      if (res.success) {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: res.message });
        this.selectedtrtimeonsite.reqdoc_data = this.selectedtrtimeonsite.reqdoc_data.concat({
          company_code: this.selectedtrtimeonsite.company_code || this.initial_current.CompCode,
          document_id: 0,
          job_id: this.selectedtrtimeonsite.timeonsite_id.toString(),
          job_type: 'ONS',
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
    { label: this.title_record_time[this.initial_current.Language], routerLink: '/recordtime/requestot', styleClass: 'activelike' }]
    this.items = [
      {
        label: this.langs.get('new')[this.selectlang],
        icon: 'pi pi-fw pi-plus',
        command: (event) => {
          this.account_list_source = [];
          this.account_list_dest = [];
          this.selectedtrtimeonsite = new TimeonsiteModel();
          this.reasonselected = this.reason_list[0]
          this.locationselected = this.location_list[0]
          this.selectedtrtimeonsite.reason_code = this.reason_list[0].reason_code
          this.selectedtrtimeonsite.location_code = this.location_list[0].location_code
          if (this.initial_current.Usertype == "GRP") {
            this.account_list.forEach((obj: TRAccountModel) => {
              this.account_list_source.push(obj)
            })
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
          this.attimeonsiteService.delete_file(data).then((res) => {
            if (res.success) {
              this.messageService.add({ severity: 'success', summary: 'Success', detail: res.message });
            } else {
              this.messageService.add({ severity: 'error', summary: 'Error', detail: res.message });
            }
          })
        } else {
          this.selectedtrtimeonsite.reqdoc_data = this.selectedtrtimeonsite.reqdoc_data.filter((item) => {
            return item !== data;
          });
        }
        this.attimeonsiteService.deletefilepath_file(data.document_path).then((res) => {
          if (res.success) {
            this.messageService.add({ severity: 'success', summary: 'Success', detail: res.message });
            this.selectedtrtimeonsite.reqdoc_data = this.selectedtrtimeonsite.reqdoc_data.filter((item) => {
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
    this.doGetfileTimeonsite(this.selectedreqdoc.document_path, this.selectedreqdoc.document_type)
  }
  onRowSelect(event: Event) {
    this.location_list.forEach((obj: SysLocationModel) => {
      if (obj.location_code == this.selectedtrtimeonsite.location_code) {
        this.locationselected = obj;
      }
    })
    this.reason_list.forEach((obj: ReasonsModel) => {
      if (obj.reason_code == this.selectedtrtimeonsite.reason_code) {
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
    this.selectedtrtimeonsite = new TimeonsiteModel();
    this.displayManage = false

  }
  selectotlocation() {
    this.selectedtrtimeonsite.location_code = this.locationselected.location_code;
  }
  selectotreason() {
    this.selectedtrtimeonsite.reason_code = this.reasonselected.reason_code;
  }

  Save() {
    this.confirmationService.confirm({
      message: this.langs.get('confirm_doc')[this.selectlang],
      header: this.langs.get('title_onsite')[this.selectlang],
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        if (this.initial_current.Usertype === "GRP" && !this.edit_data) {
          let data_doc: TimeonsiteModel[] = [];

          let tmp: TimeonsiteModel = new TimeonsiteModel();
          tmp.timeonsite_id = this.selectedtrtimeonsite.timeonsite_id;
          tmp.timeonsite_doc = "ONSITE_" + (Number(this.datePipe.transform(new Date(), 'yyyyMMddHHmmss')));
          tmp.worker_code = this.workerDetail.worker_code;
          tmp.timeonsite_workdate = this.start_date;
          tmp.timeonsite_in = this.selectedtrtimeonsite.timeonsite_in;
          tmp.timeonsite_out = this.selectedtrtimeonsite.timeonsite_out;
          tmp.location_code = this.selectedtrtimeonsite.location_code;
          tmp.reason_code = this.selectedtrtimeonsite.reason_code;
          tmp.timeonsite_note = this.selectedtrtimeonsite.timeonsite_note;
          tmp.reqdoc_data = this.selectedtrtimeonsite.reqdoc_data;
          // tmp.timeonsite_doc = this.selectedtrtimeonsite.timeonsite_doc;
          tmp.modified_by = this.initial_current.CompCode;

          data_doc.push(tmp);

          this.doRecordTimeonsite(data_doc);
        } else {
          if (this.selectedtrtimeonsite.timeonsite_doc === "") {
            this.selectedtrtimeonsite.timeonsite_doc = "ONSITE_" + this.datePipe.transform(new Date(), 'yyyyMMddHHmmss');
          }
          let data_doc2: TimeonsiteModel[] = [];

          let data: TimeonsiteModel = new TimeonsiteModel();

          data.worker_code = this.workerDetail.worker_code;
          data.timeonsite_workdate = this.start_date;
          data.company_code = this.initial_current.CompCode;
          data.timeonsite_id = this.selectedtrtimeonsite.timeonsite_id;
          data.timeonsite_doc = "ONSITE_" + (Number(this.datePipe.transform(new Date(), 'yyyyMMddHHmmss')));

          data.worker_code = this.workerDetail.worker_code;
          // data.timeonsite_doc = this.selectedtrtimeonsite.timeonsite_doc;
          data.timeonsite_workdate = this.start_date;
          data.timeonsite_in = this.selectedtrtimeonsite.timeonsite_in;
          data.timeonsite_out = this.selectedtrtimeonsite.timeonsite_out;
          data.location_code = this.selectedtrtimeonsite.location_code;
          data.reason_code = this.selectedtrtimeonsite.reason_code;
          data.timeonsite_note = this.selectedtrtimeonsite.timeonsite_note;
          data.reqdoc_data = this.selectedtrtimeonsite.reqdoc_data;

          data.modified_by = this.initial_current.CompCode;
          data_doc2.push(data);
          this.doRecordTimeonsite(data_doc2);

        }
      },
      reject: () => {
      }
    });
  }

  Delete() {
    this.confirmationService.confirm({
      message: this.langs.get('confirm_delete_doc')[this.selectlang] + this.selectedtrtimeonsite.timeonsite_doc,
      header: this.langs.get('title_onsite')[this.selectlang],
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.doDeleteTimeonsite(this.selectedtrtimeonsite)
      },
      reject: () => {
      }
    });
  }

  //
  confirmDelete(data: TimeonsiteModel) {
    this.confirmationService.confirm({
      message: this.title_confirm_delete[this.initial_current.Language],
      header: this.title_confirm[this.initial_current.Language],
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.doDeleteTimeonsite(data);
      },
      reject: () => {
      },
      key: "myDialog"
    });
  }
  //

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
  //
  exportAsExcel() {
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(this.table.nativeElement);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    XLSX.writeFile(wb, 'Export_Timeonsite.xlsx');

  }
}

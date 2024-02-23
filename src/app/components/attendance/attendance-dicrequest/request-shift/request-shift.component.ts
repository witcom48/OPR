import { DatePipe } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, MenuItem, MessageService } from 'primeng/api';
import { SearchEmpComponent } from 'src/app/components/usercontrol/search-emp/search-emp.component';
import { AppConfig } from 'src/app/config/config';
import { InitialCurrent } from 'src/app/config/initial_current';
import { TRATTTimeShiftModel } from 'src/app/models/attendance/TRATTTimeShift';
import { ATTReqdocumentModel } from 'src/app/models/attendance/attreqdocument';
import { ShiftModels } from 'src/app/models/attendance/shift';
import { EmployeeModel } from 'src/app/models/employee/employee';
import { AccountModel } from 'src/app/models/self/account';
import { TRAccountModel } from 'src/app/models/self/traccount';
import { SysLocationModel } from 'src/app/models/system/policy/location';
import { ReasonsModel } from 'src/app/models/system/policy/reasons';
import { AccessdataModel } from 'src/app/models/system/security/accessdata';
import { FillterEmpModel } from 'src/app/models/usercontrol/filteremp';
import { AtttimeShiftService } from 'src/app/services/attendance/atttimeshift.service';
import { ShiftServices } from 'src/app/services/attendance/shift.service';
import { TimecardService } from 'src/app/services/attendance/timecards.service';
import { EmployeeService } from 'src/app/services/emp/worker.service';
import { PeriodsServices } from 'src/app/services/payroll/periods.service';
import { AccountServices } from 'src/app/services/self/account.service';
import { LocationService } from 'src/app/services/system/policy/location.service';
import { ReasonsService } from 'src/app/services/system/policy/reasons.service';
declare var reqshift: any;
import * as XLSX from 'xlsx';
@Component({
  selector: 'app-request-shift',
  templateUrl: './request-shift.component.html',
  styleUrls: ['./request-shift.component.scss']
})
export class RequestShiftComponent implements OnInit {
  @ViewChild('fileUploader') fileUploader: ElementRef | any = null;
  @ViewChild('TABLE') table: ElementRef | any = null;
  langs: any = reqshift;
  selectlang: string = "EN";
  itemslike: MenuItem[] = [];
  home: any;
  @ViewChild(SearchEmpComponent) selectEmp: any;
  reasonedis: string = "reason_name_en"
  locatiodis: string = "location_name_en"
  namedis: string = "worker_detail_en"
  displayManage: boolean = false;
  edit_data: boolean = false;
  position: string = "right";
  manage_title: string = "Manage"
  shfitdis: string = "shift_name_en"
  items: MenuItem[] = [];
  items_attfile: MenuItem[] = [];

  constructor(
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private accountServie: AccountServices,
    private router: Router,
    private datePipe: DatePipe,
    private employeeService: EmployeeService,
    private periodsService: PeriodsServices,
    private locationService: LocationService,
    private reasonService: ReasonsService,
    private atttimeshiftService: AtttimeShiftService,
    private timecardService: TimecardService,
    private shiftService: ShiftServices,
  ) { }

  mainMenuItems: MenuItem[] = [];
  homeIcon: any = { icon: 'pi pi-home', routerLink: '/' };
  fileToUpload: File | any = null;
  Uploadfile: boolean = false;
  reason_list: ReasonsModel[] = [];
  reasonselected: ReasonsModel = new ReasonsModel();
  location_list: SysLocationModel[] = [];
  locationselected: SysLocationModel = new SysLocationModel();
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
  title_requestShift: { [key: string]: string } = { EN: "Request Change Shift", TH: "ขอเปลี่ยนกะการทำงาน" };

  title_no: { [key: string]: string } = { EN: "No", TH: "ลำดับ" }
  title_shift_doc: { [key: string]: string } = { EN: "Shift Doc", TH: "รหัสเอกสาร" }
  title_date: { [key: string]: string } = { EN: "Date", TH: "วันที่" }
  title_shift_old: { [key: string]: string } = { EN: "Shift Old", TH: "กะการทำงานเดิม" }
  title_shift_new: { [key: string]: string } = { EN: "Shift New", TH: "กะการทำงานใหม่" }
  title_reason: { [key: string]: string } = { EN: "Reason", TH: "เหตุผลการเปลี่ยนกะ" }
  title_note: { [key: string]: string } = { EN: "Note", TH: "เพิ่มเติม" }

  title_file_name: { [key: string]: string } = { EN: "File Name", TH: "ชื่อไฟล์" }

  ngOnInit(): void {
    this.doGetInitialCurrent();
    this.doLoadMenu();
    this.doLoadReason();
    this.doLoadLocation();
    this.doLoadShfit();

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
      // this.doLoadEmployee();
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
    this.doLoadTimeshift();
  }
  close_searchemp() {
    this.searchEmp = false
  }

  searchEmp: boolean = false;
  open_searchemp() {
    this.searchEmp = true
  }
  Search() {
    this.doLoadTimeshift();
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
      this.doLoadTimeshift();
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
  isConfirmationDialogVisible: boolean = false;

  doLoadShfit() {
    this.reason_list = [];
    let data = new ShiftModels()
    this.shiftService.shift_get(data).then(async (res) => {
      this.shift_new_list = await res;
    });
  }

  doLoadMenu() {

    this.mainMenuItems = [{ label: this.title_page[this.initial_current.Language], routerLink: '/attendance/dicrequest' },
    { label: this.title_requestShift[this.initial_current.Language], routerLink: '/dicrequest/requestshift', styleClass: 'activelike' }]

    this.items = [

      {
        label: this.title_new[this.initial_current.Language],
        icon: 'pi pi-fw pi-plus',
        command: (event) => {
          this.account_list_source = [];
          this.account_list_dest = [];
          this.selectedtrtimeshfit = new TRATTTimeShiftModel();
          this.shift_newselected = this.shift_new_list[0]
          this.reasonselected = this.reason_list[0]
          this.selectedtrtimeshfit.timeshift_new = this.shift_new_list[0].shift_code
          this.selectedtrtimeshfit.reason_code = this.reason_list[0].reason_code
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

  trtimeshfit_list: TRATTTimeShiftModel[] = [];
  selectedtrtimeshfit: TRATTTimeShiftModel = new TRATTTimeShiftModel();
  selectedreqdoc: ATTReqdocumentModel = new ATTReqdocumentModel();
  doLoadTimeshift() {
    this.trtimeshfit_list = [];
    var tmp = new TRATTTimeShiftModel();
    tmp.timeshift_workdate = this.start_date;
    tmp.timeshift_todate = this.end_date;
    tmp.worker_code = this.selectedAccount.worker_code;
    this.atttimeshiftService.atttimeshift_get(tmp).then(async (res) => {
      res.forEach((elm: any) => {
        elm.timeshift_workdate = new Date(elm.timeshift_workdate)
      });
      this.trtimeshfit_list = await res
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

  shift_new_list: ShiftModels[] = [];
  shift_newselected: ShiftModels = new ShiftModels();
  onRowSelect(event: Event) {
    this.shift_new_list.forEach((obj: ShiftModels) => {
      if (obj.shift_code == this.selectedtrtimeshfit.timeshift_new) {
        this.shift_newselected = obj;
      }
    })
    this.reason_list.forEach((obj: ReasonsModel) => {
      if (obj.reason_code == this.selectedtrtimeshfit.reason_code) {
        this.reasonselected = obj;
      }
    })
    this.edit_data = true;
    this.displayManage = true
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
  onRowSelectfile(event: Event) {
    this.doGetfileTimeleave(this.selectedreqdoc.document_path, this.selectedreqdoc.document_type)
  }
  selectshfitnew() {
    this.selectedtrtimeshfit.timeshift_new = this.shift_newselected.shift_code;

  }
  selectShfitreason() {
    this.selectedtrtimeshfit.reason_code = this.reasonselected.reason_code;
  }

  showManage() {
    this.displayManage = true
    this.edit_data = false;
  }

  closeManage() {
    this.selectedtrtimeshfit = new TRATTTimeShiftModel();
    this.displayManage = false

  }

  exportAsExcel() {
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(this.table.nativeElement);//converts a DOM TABLE element to a worksheet
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    XLSX.writeFile(wb, 'Export_Timeot.xlsx');

  }

  doUploadFile() {
    const filename = "SHIFT_DOC" + this.datePipe.transform(new Date(), 'yyyyMMddHHmmss');
    const filetype = this.fileToUpload.name.split(".")[1];
    this.atttimeshiftService.file_import(this.fileToUpload, filename, filetype).then((res) => {
      // console.log(res)
      if (res.success) {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: res.message });
        this.selectedtrtimeshfit.reqdoc_data = this.selectedtrtimeshfit.reqdoc_data.concat({
          company_code: this.selectedtrtimeshfit.company_code || this.initial_current.CompCode,
          document_id: 0,
          job_id: this.selectedtrtimeshfit.timeshift_id.toString(),
          job_type: 'SHT',
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
    this.atttimeshiftService.get_file(file_path).then((res) => {
      var url = window.URL.createObjectURL(new Blob([new Uint8Array(res)], { type: type }));
      window.open(url);
      this.selectedreqdoc = new ATTReqdocumentModel();
    })
  }
  DeleteFile(data: ATTReqdocumentModel) {
    this.confirmationService.confirm({
      message: this.title_confirm_delete[this.initial_current.Language] + data.document_name,
      header: this.title_delete[this.initial_current.Language],
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        if (data.document_id) {
          this.atttimeshiftService.delete_file(data).then((res) => {
            if (res.success) {
              this.messageService.add({ severity: 'success', summary: 'Success', detail: res.message });
            } else {
              this.messageService.add({ severity: 'error', summary: 'Error', detail: res.message });
            }
          })
        } else {
          this.selectedtrtimeshfit.reqdoc_data = this.selectedtrtimeshfit.reqdoc_data.filter((item) => {
            return item !== data;
          });
        }
        this.atttimeshiftService.deletefilepath_file(data.document_path).then((res) => {
          if (res.success) {
            this.messageService.add({ severity: 'success', summary: 'Success', detail: res.message });
            this.selectedtrtimeshfit.reqdoc_data = this.selectedtrtimeshfit.reqdoc_data.filter((item) => {
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
  async doRecordTimeShift(data: TRATTTimeShiftModel[]) {
    console.log(data)
    await this.atttimeshiftService.atttimeshift_record(data).then((res) => {
      if (res.success) {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: res.message });
        this.doLoadTimeshift();
      }
      else {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: res.message });
      }

    });
    this.closeManage()
  }
  async doDeleteTimeshfit(data: TRATTTimeShiftModel) {
    await this.atttimeshiftService.atttimeshift_delete(data).then((res) => {
      if (res.success) {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: res.message });
        this.doLoadTimeshift();
      }
      else {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: res.message });
      }

    });
    this.closeManage()
  }

  Save() {
    this.confirmationService.confirm({
      message: this.title_confirm_record[this.initial_current.Language],
      header: this.title_shift_doc[this.initial_current.Language],
      icon: 'pi pi-exclamation-triangle',
      accept: () => {

        if (this.selectedtrtimeshfit.timeshift_doc === "") {
          this.selectedtrtimeshfit.timeshift_doc = "SHIFT_" + this.datePipe.transform(new Date(), 'yyyyMMddHHmmss');
        }
        let data_doc2: TRATTTimeShiftModel[] = []
        var data: TRATTTimeShiftModel = new TRATTTimeShiftModel();
        data.company_code = this.initial_current.CompCode;
        data.worker_code = this.workerDetail.worker_code;
        data.timeshift_id = this.selectedtrtimeshfit.timeshift_id;
        data.timeshift_doc = "SHIFT_" + (Number(this.datePipe.transform(new Date(), 'yyyyMMddHHmmss')));
        data.timeshift_workdate = this.selectedtrtimeshfit.timeshift_workdate;
        data.timeshift_todate = this.selectedtrtimeshfit.timeshift_todate;
        data.timeshift_new = this.selectedtrtimeshfit.timeshift_new;
        data.reason_code = this.selectedtrtimeshfit.reason_code;
        data.timeshift_note = this.selectedtrtimeshfit.timeshift_note;
        data.reason_code = this.selectedtrtimeshfit.reason_code;
        data.reqdoc_data = this.selectedtrtimeshfit.reqdoc_data;
        data.modified_by = this.initial_current.Username,

        data_doc2.push(data);
        this.doRecordTimeShift(data_doc2)

      },
      reject: () => {
      }
    });
  }
  Delete() {
    this.confirmationService.confirm({
      message: this.title_delete[this.initial_current.Language] + this.selectedtrtimeshfit.timeshift_doc,
      header: this.title_requestShift[this.initial_current.Language],
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.doDeleteTimeshfit(this.selectedtrtimeshfit)
      },
      reject: () => {
      }
    });
  }
}

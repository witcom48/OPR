import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ConfirmationService, MenuItem, MessageService } from 'primeng/api';
import { SelectEmpComponent } from '../../usercontrol/select-emp/select-emp.component';
import { TaskComponent } from '../../usercontrol/task/task.component';
import { TaskService } from 'src/app/services/task.service';
import { Router } from '@angular/router';
import { InitialCurrent } from 'src/app/config/initial_current';
import { AccessdataModel } from 'src/app/models/system/security/accessdata';
import { AppConfig } from 'src/app/config/config';
import { PaysuspendModel } from 'src/app/models/employee/paysuspend';
import { ReasonsModel } from 'src/app/models/system/policy/reasons';
import { ReasonsService } from 'src/app/services/system/policy/reasons.service';
import { PaysuspendService } from 'src/app/services/emp/worker_paysuspend.service';
import { FillterEmpModel } from 'src/app/models/usercontrol/filteremp';
import { EmployeeModel } from 'src/app/models/employee/employee';
import { EmployeeService } from 'src/app/services/emp/worker.service';
import { SearchEmpComponent } from '../../usercontrol/search-emp/search-emp.component';
import { PeriodsModels } from 'src/app/models/payroll/periods';
import { DatePipe } from '@angular/common';
import { PeriodsServices } from 'src/app/services/payroll/periods.service';

interface Policy {
  name: string,
  code: string
}
interface Result {
  worker: string,
  policy: string,
  modified_by: string,
  modified_date: string,
}

@Component({
  selector: 'app-employee-paysuspend',
  templateUrl: './employee-paysuspend.component.html',
  styleUrls: ['./employee-paysuspend.component.scss']
})
export class EmployeePaysuspendComponent implements OnInit {

  home: any;
  itemslike: MenuItem[] = [];
  @ViewChild(SelectEmpComponent) selectEmp: any;
  @ViewChild(TaskComponent) taskView: any;
  @ViewChild(SearchEmpComponent) searchEmp_popup: any;

  //
  title_process: { [key: string]: string } = { EN: "Process", TH: "การทำงาน" };
  title_result: { [key: string]: string } = { EN: "Result", TH: "ผลลัพธ์" };
  title_btnprocess: { [key: string]: string } = { EN: "Process", TH: "ดำเนินการ" };
  title_select: { [key: string]: string } = { EN: "Please Select Employee", TH: "กรุณาเลือกพนักงาน" };
  //
  title_code: { [key: string]: string } = { EN: "Code", TH: "รหัส" };
  title_no: { [key: string]: string } = { EN: "No", TH: "เลขที่" };
  title_worker: { [key: string]: string } = { EN: "Worker", TH: "พนักงาน" };
  title_modified_by: { [key: string]: string } = { EN: "Edit by", TH: "ผู้ทำรายการ" };
  title_modified_date: { [key: string]: string } = { EN: "Edit date", TH: "วันที่ทำรายการ" };
  title_name: { [key: string]: string } = { EN: "Name", TH: "ชื่อ-นามสกุล" };
  title_period: { [key: string]: string } = { EN: "Period", TH: "งวด" };

  //
  title_type: { [key: string]: string } = { EN: "Type", TH: "ประเภท" };
  title_suspend: { [key: string]: string } = { EN: "Suspend", TH: "ระงับโอน" };
  title_notcal: { [key: string]: string } = { EN: "Not Calulate", TH: "ไม่คิดเงินเดือน" };
  title_note: { [key: string]: string } = { EN: "Note", TH: "รายละเอียด" };
  title_status: { [key: string]: string } = { EN: "Status", TH: "สถานะ" };
  title_payY: { [key: string]: string } = { EN: "Paid", TH: "จ่ายแล้ว" };
  title_payN: { [key: string]: string } = { EN: "Not Paid", TH: "ยังไม่จ่าย" };
  title_reason: { [key: string]: string } = { EN: "Reason", TH: "เหตุผล" };

  //
  title_confirm: { [key: string]: string } = { EN: "Are you sure?", TH: "ยืนยันการทำรายการ" };
  title_confirm_record: { [key: string]: string } = { EN: "Confirm to record", TH: "คุณต้องการบันทึกการทำรายการ" }
  title_confirm_delete: { [key: string]: string } = { EN: "Confirm to delete", TH: "คุณต้องการลบรายการ" }
  title_confirm_yes: { [key: string]: string } = { EN: "Yes", TH: "ใช่" }
  title_confirm_no: { [key: string]: string } = { EN: "No", TH: "ยกเลิก" }
  title_confirm_cancel: { [key: string]: string } = { EN: "You have cancelled", TH: "คุณยกเลิกการทำรายการ" }

  title_paysus: { [key: string]: string } = { EN: "Paysuspend", TH: "ระงับการจ่าย" }
  title_policy: { [key: string]: string } = { EN: "Policy", TH: "กำหนด" }
  title_employee: { [key: string]: string } = { EN: " Employee ", TH: "พนักงาน" }
  title_search: { [key: string]: string } = { EN: "  Search keyword ", TH: "ค้นหา" }
  title_showing: { [key: string]: string } = { EN: "  Showing ", TH: "แสดง" }

  title_to: { [key: string]: string } = { EN: "  to ", TH: "ถึง" }
  title_of: { [key: string]: string } = { EN: "  of ", TH: "จาก" }
  title_entries: { [key: string]: string } = { EN: "  entries ", TH: "รายการ" }

  title_btn_select: { [key: string]: string } = { EN: "Select", TH: "เลือก" }
  title_btn_close: { [key: string]: string } = { EN: "Close", TH: "ปิด" }

  title_view: { [key: string]: string } = { EN: "View", TH: "แสดงผล" };
  title_byemp: { [key: string]: string } = { EN: "View by employee", TH: "แสดงตามพนักงาน" };
  title_byperiod: { [key: string]: string } = { EN: "View by period", TH: "แสดงตามงวดการจ่าย" };
  title_resign: { [key: string]: string } = { EN: "Include Resign", TH: "รวมพนักงานลาออก" }
  //
  title_paydate: { [key: string]: string } = { EN: "Paydate", TH: "วันที่จ่าย" }

  @Input() policy_list: Policy[] = []
  @Input() title: string = "";
  loading: boolean = false;
  index: number = 0;
  indexfilter : number = 0;
  result_list: Result[] = [];
  edit_data: boolean = false;
  new_data: boolean = false;

  constructor(
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private taskService: TaskService,
    private router: Router,
    private datePipe: DatePipe,
    private reasonsService: ReasonsService,
    private paysuspendService: PaysuspendService,
    private employeeService: EmployeeService,
    private periodsService: PeriodsServices,
  ) { }

  ngOnInit(): void {
    this.doGetInitialCurrent();
    this.doLoadReason();

    this.itemslike = [{ label: this.title_employee[this.initial_current.Language], routerLink: '/employee' },
    { label: this.title_paysus[this.initial_current.Language], styleClass: 'activelike' }];
    this.home = { icon: 'pi pi-home', routerLink: '/' };
  }

  initialData2: InitialCurrent = new InitialCurrent();
  accessData: AccessdataModel = new AccessdataModel();
  public initial_current: InitialCurrent = new InitialCurrent();
  doGetInitialCurrent() {
    this.initial_current = JSON.parse(localStorage.getItem(AppConfig.SESSIONInitial) || '{}');
    if (!this.initial_current) {
      this.router.navigateByUrl('');
    }
    this.accessData = this.initialData2.dotGetPolmenu('EMP');

  }

  //drop
  reason_list: ReasonsModel[] = [];
  reasons: ReasonsModel = new ReasonsModel()
  doLoadReason() {
    this.reason_list = [];
    var tmp = new ReasonsModel();
    tmp.reason_group = 'PAYS';
    this.reasonsService.reason_get(tmp).then(async (res) => {
      this.reason_list = await res;
    });
  }

  selectedPaysuspend: PaysuspendModel = new PaysuspendModel();
  PaysuspendList: PaysuspendModel[] = [];

  // process
  process() {
    this.result_list = [];
    if (this.selectEmp.employee_dest.length > 0) {
      this.Setpaysuspend()
    } else {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: this.title_select[this.initial_current.Language] });
    }
  }

  doGetdatafillter(code: string, date: string | null) {
    this.paysuspendService.getpaysuspend(this.initial_current.CompCode, code, date).then(async (res) => {
      await res.forEach((element: PaysuspendModel) => {
        element.payitem_date = new Date(element.payitem_date)
      })
      this.PaysuspendList = await res;
    })
  }
  
  onRowSelectPaysuspend() {}

  async Setpaysuspend() {
    var data = new PaysuspendModel();
    data.payitem_date = this.initial_current.PR_PayDate;
    data.paysuspend_type = this.selectedPaysuspend.paysuspend_type;
    data.paysuspend_note = this.selectedPaysuspend.paysuspend_note;
    data.paysuspend_payment = this.selectedPaysuspend.paysuspend_payment;
    data.reason_code = this.selectedPaysuspend.reason_code;

    data.company_code = this.initial_current.CompCode;
    data.modified_by = this.initial_current.Username;
    data.emp_data = this.selectEmp.employee_dest;

    this.loading = true;
    // console.log(data)
    await this.paysuspendService.SetPaysuspend_record(data).then((res) => {
      if (res.success) {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: res.message });
        this.edit_data = false;
        this.new_data;
      } else {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: res.message });
      }
      this.loading = false;
    })
  }

  onLoadEmp() {
    Promise.all([this.doLoadEmployee()])
      .then(() => {
        setTimeout(() => {
          this.worker_index = 0;
          this.doSetDetailWorker();

        }, 1000);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  workerDetail: EmployeeModel = new EmployeeModel();
  worker_list: EmployeeModel[] = [];
  worker_index: number = 0;
  worker_code: string = '';
  worker_name: string = '';
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
    this.doGetdatafillter(this.worker_code,'')
  }
  position: string = "right";
  searchEmp: boolean = false;
  open_searchemp() {
    this.searchEmp = true
  }
  close_searchemp() {
    this.searchEmp = false
  }
  select_emp() {

    let select = this.searchEmp_popup.selectedEmployee.worker_code
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


  //by period
  periods_list: PeriodsModels[] = [];
  periods_select: PeriodsModels = new PeriodsModels();
  doPeriod() {
    this.periods_list = [];
    var tmp = new PeriodsModels();
    tmp.year_code = this.initial_current.PR_Year;
    tmp.company_code = this.initial_current.CompCode;
    tmp.emptype_code = this.initial_current.EmpType;
    this.periodsService.period_get(tmp).then(async (res) => {
      res.forEach((obj: PeriodsModels) => {
        obj.period_name_en = obj.period_no + " : " + this.datePipe.transform(obj.period_payment, 'dd MMM yyyy') + "(" + this.datePipe.transform(obj.period_from, 'dd MMM yyyy') + " - " + this.datePipe.transform(obj.period_to, 'dd MMM yyyy') + ")";
        obj.period_name_th = obj.period_no + " - " + this.datePipe.transform(obj.period_payment, 'dd MMM yyyy', "", 'th-TH') + "(" + this.datePipe.transform(obj.period_from, 'dd MMM yyyy', "", 'th-TH') + " - " + this.datePipe.transform(obj.period_to, 'dd MMM yyyy', "", 'th-TH') + ")"
      });
      this.periods_list = await res;
      this.periods_select = await res[0];

      this.doGetdatafillter('', this.datePipe.transform(this.periods_select.period_payment,'yyyy-MM-ddTHH:mm:ss'));
    });
  }
  selectperiod() {
    this.doGetdatafillter('', this.datePipe.transform(this.periods_select.period_payment,'yyyy-MM-ddTHH:mm:ss'));
   }


   tabperiod : boolean = false;
  function(e: any) {
    var page = e.index;
    this.index = page;
    if (page == 1) {
      setTimeout(() => {
        this.new_data = true;
        this.doPeriod();
      }, 300);
    } else {
      this.new_data = false;
    }

  }

  doGetreason(reason: string): any {
    for (let i = 0; i < this.reason_list.length; i++) {
      if (this.reason_list[i].reason_code == reason) {
        if (this.initial_current.Language == "TH") {
          return this.reason_list[i].reason_name_th;
        }
        else {
          return this.reason_list[i].reason_name_en;
        }
      }
    }
  }

  doGettype(type: string): any {
    if (type = 'S') {
      if (this.initial_current.Language == "TH") { return 'ระงับโอน'; } else { return 'Suspend'; }
    } else {
      if (this.initial_current.Language == "TH") { return 'ไม่คิดเงินเดือน'; } else { return 'Not Calulate'; }
    }
  }

  doGetstatus(status: string): any {
    if (status = 'Y') {
      if (this.initial_current.Language == "TH") { return 'จ่ายแล้ว'; } else { return 'Paid'; }
    } else {
      if (this.initial_current.Language == "TH") { return 'ยังไม่จ่าย'; } else { return 'Not Paid'; }
    }
  }


  functionfilter(e: any) {
    var page = e.index;
    this.indexfilter = page;
    if (page == 1) {
      setTimeout(() => {
        this.onLoadEmp();
      }, 300);
    } else {
      setTimeout(() => {
        this.doPeriod();
      }, 300);
    }

  }
}

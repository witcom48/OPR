import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, MenuItem, MessageService } from 'primeng/api';
import { SelectEmpComponent } from 'src/app/components/usercontrol/select-emp/select-emp.component';
import { TaskComponent } from 'src/app/components/usercontrol/task/task.component';
import { AppConfig } from 'src/app/config/config';
import { InitialCurrent } from 'src/app/config/initial_current';
import { EmpSalaryModel } from 'src/app/models/employee/manage/salary';
import { SetSalaryModel } from 'src/app/models/employee/policy/batch/setsalary';
import { AccessdataModel } from 'src/app/models/system/security/accessdata';
import { SetEmpDetailService } from 'src/app/services/emp/policy/setemp_detail.service';
import { TaskService } from 'src/app/services/task.service';

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
  selector: 'app-empsetsalary',
  templateUrl: './empsetsalary.component.html',
  styleUrls: ['./empsetsalary.component.scss']
})
export class EmpsetsalaryComponent implements OnInit {
  home: any;
  itemslike: MenuItem[] = [];
  @ViewChild(SelectEmpComponent) selectEmp: any;
  @ViewChild(TaskComponent) taskView: any;

  //
  title_process: { [key: string]: string } = { EN: "Process", TH: "การทำงาน" };
  title_result: { [key: string]: string } = { EN: "Result", TH: "ผลลัพธ์" };
  title_btnprocess: { [key: string]: string } = { EN: "Process", TH: "ดำเนินการ" };
  title_select: { [key: string]: string } = { EN: "Please Select Employee", TH: "กรุณาเลือกพนักงาน" };
  title_incbath: { [key: string]: string } = { EN: "Increment(Bath)", TH: "อัตราปรับ(บาท)" };
  title_incper: { [key: string]: string } = { EN: "Increment(%)", TH: "อัตราปรับ(%)" };
  title_quality: { [key: string]: string } = { EN: "Quality", TH: "จำนวน" };
  title_amount: { [key: string]: string } = { EN: "Amount", TH: "จำนวนเงิน" };
  title_date: { [key: string]: string } = { EN: "Date", TH: "วันที่มีผล" };
  title_reason: { [key: string]: string } = { EN: "Reason", TH: "เหตุผล" };
  title_code: { [key: string]: string } = { EN: "Code", TH: "รหัส" };
  title_no: { [key: string]: string } = { EN: "No", TH: "เลขที่" };
  title_worker: { [key: string]: string } = { EN: "Worker", TH: "พนักงาน" };
  title_modified_by: { [key: string]: string } = { EN: "Edit by", TH: "ผู้ทำรายการ" };
  title_modified_date: { [key: string]: string } = { EN: "Edit date", TH: "วันที่ทำรายการ" };
  //
  title_confirm: { [key: string]: string } = { EN: "Are you sure?", TH: "ยืนยันการทำรายการ" };
  title_confirm_record: { [key: string]: string } = { EN: "Confirm to record", TH: "คุณต้องการบันทึกการทำรายการ" }
  title_confirm_delete: { [key: string]: string } = { EN: "Confirm to delete", TH: "คุณต้องการลบรายการ" }
  title_confirm_yes: { [key: string]: string } = { EN: "Yes", TH: "ใช่" }
  title_confirm_no: { [key: string]: string } = { EN: "No", TH: "ยกเลิก" }
  title_confirm_cancel: { [key: string]: string } = { EN: "You have cancelled", TH: "คุณยกเลิกการทำรายการ" }

  title_salary: { [key: string]: string } = { EN: "Adjust Salary", TH: "ปรับเงินเดือน" }
  title_policy: { [key: string]: string } = { EN: "Policy", TH: "กำหนด" }
  title_employee : { [key: string]: string } = { EN: " Employee ", TH: "พนักงาน" }
  title_search : { [key: string]: string } = { EN: "  Search keyword ", TH: "ค้นหา" }
  title_showing : { [key: string]: string } = { EN: "  Showing ", TH: "แสดง" }

  title_to : { [key: string]: string } = { EN: "  to ", TH: "ถึง" }
  title_of : { [key: string]: string } = { EN: "  of ", TH: "จาก" }
  title_entries : { [key: string]: string } = { EN: "  entries ", TH: "รายการ" }

  title_submit: string = "Submit";
  title_cancel: string = "Cancel";

  @Input() policy_list: Policy[] = []
  @Input() title: string = "";
  loading: boolean = false;
  index: number = 0;
  result_list: Result[] = [];
  edit_data: boolean = false;

  constructor(
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private taskService: TaskService,
    private router: Router,
    private setempdetailService: SetEmpDetailService,
  ) { }

  new_data: boolean = false;

  ngOnInit(): void {
    this.doGetInitialCurrent();

    this.itemslike = [{ label: this.title_employee[this.initial_current.Language], routerLink: '/employee/policy' },
    { label: this.title_salary[this.initial_current.Language], styleClass: 'activelike' }];
    this.home = { icon: 'pi pi-home', routerLink: '/' };
  }

  initialData2: InitialCurrent = new InitialCurrent();
  accessData: AccessdataModel = new AccessdataModel();
  public initial_current: InitialCurrent = new InitialCurrent();
  doGetInitialCurrent() {
    this.initial_current = JSON.parse(localStorage.getItem(AppConfig.SESSIONInitial) || '{}');
    if (!this.initial_current) {
      this.router.navigateByUrl('login');
    }
    this.accessData = this.initialData2.dotGetPolmenu('EMP');

  }


  selectedEmpSalary: EmpSalaryModel = new EmpSalaryModel();
  empsalaryList: EmpSalaryModel[] = [];

  setsalaryList: SetSalaryModel[] = [];
  doLoadsalaryList() {
    this.setsalaryList = [];
    var tmp = new SetSalaryModel();
    tmp.empsalary_amount = this.selectedEmpSalary.empsalary_amount;
    tmp.empsalary_date = this.selectedEmpSalary.empsalary_date;
    this.setempdetailService.SetSalary_get(tmp).then(async (res) => {
      this.setsalaryList = await res;
    });
  }

  process() {
    this.result_list = [];
    if (this.selectEmp.employee_dest.length > 0) {
      this.Setbatchsalary();
    }else{
      this.messageService.add({ severity: 'error', summary: 'Error', detail: this.title_select[this.initial_current.Language] });
    }
  }

  async Setbatchsalary() {
    var data = new SetSalaryModel();
    data.empsalary_amount = this.selectedEmpSalary.empsalary_amount;
    data.empsalary_incamount = this.selectedEmpSalary.empsalary_incamount;
    data.empsalary_incpercent = this.selectedEmpSalary.empsalary_incpercent;
    data.empsalary_date = this.selectedEmpSalary.empsalary_date;
    data.empsalary_reason = this.selectedEmpSalary.empsalary_reason;
    data.company_code = this.initial_current.CompCode
    data.modified_by = this.initial_current.Username
    data.emp_data = this.selectEmp.employee_dest;
    this.loading = true;
    // console.log(data)
    await this.setempdetailService.SetSalary_record(data).then((res) => {
      if (res.success) {
        // console.log(res.message)
        this.messageService.add({ severity: 'success', summary: 'Success', detail: res.message });
        this.doLoadsalaryList();
        this.edit_data = false;
        this.new_data;
      }
      else {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: res.message });
      }
      this.loading = false;
    });
  }


  function(e: any) {
    var page = e.index;
    this.index = page;
    if (page == 1) {
      setTimeout(() => {
        this.new_data = true;
      }, 300);
    } else {
      this.new_data = false;
    }
  }

}

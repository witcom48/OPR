import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Table } from 'primeng/table';
import { ConfirmationService, ConfirmEventType, MenuItem, MessageService } from 'primeng/api';
import { PrjectEmpdailyModel } from '../../../models/project/project_empdaily';
import { Router } from '@angular/router';
import { AppConfig } from '../../../config/config';
import { InitialCurrent } from '../../../config/initial_current';

import { SelectEmpComponent } from '../../../components/usercontrol/select-emp/select-emp.component';
import { TaskComponent } from '../../../components/usercontrol/task/task.component';

import { TaskModel } from '../../../models/task';
import { TaskDetailModel } from '../../../models/task_detail';
import { TaskWhoseModel } from '../../../models/task_whose';
import { TaskService } from '../../../services/task.service'
import { PeriodsServices } from 'src/app/services/payroll/periods.service';

@Component({
  selector: 'app-payroll-caltax',
  templateUrl: './payroll-caltax.component.html',
  styleUrls: ['./payroll-caltax.component.scss']
})
export class PayrollCaltaxComponent implements OnInit {

  @ViewChild(SelectEmpComponent) selectEmp: any;
  @ViewChild(TaskComponent) taskView: any;
  home: any;
  itemslike: MenuItem[] = [];
  title_confirm: { [key: string]: string } = { EN: "Are you sure?", TH: "ยืนยันการทำรายการ" }
  title_confirm_record: { [key: string]: string } = { EN: "Confirm to record", TH: "คุณต้องการบันทึกการทำรายการ" }
  title_confirm_delete: { [key: string]: string } = { EN: "Confirm to delete", TH: "คุณต้องการลบรายการ" }
  title_confirm_yes: { [key: string]: string } = { EN: "Yes", TH: "ใช่" }
  title_confirm_no: { [key: string]: string } = { EN: "No", TH: "ยกเลิก" }
  title_confirm_cancel: { [key: string]: string } = { EN: "You have cancelled", TH: "คุณยกเลิกการทำรายการ" }

  title_CalculateTax: { [key: string]: string } = { EN: "Calculate Tax", TH: "คำนวณภาษี" }

  title_submit: { [key: string]: string } = { EN: "Submit", TH: "คุณยกเลิกการทำรายการ" }
  title_cancel: { [key: string]: string } = { EN: "Cancel", TH: "คุณยกเลิกการทำรายการ" }
  labSalary: { [key: string]: string } = { EN: "Salary", TH: "เงินเดือน" }
  labLeave: { [key: string]: string } = { EN: "Leave", TH: "ลางาน" }
  labAbsent: { [key: string]: string } = { EN: "Absent", TH: "ขาดงาน" }
  labLate: { [key: string]: string } = { EN: "Late", TH: "สาย" }
  labOvertime: { [key: string]: string } = { EN: "Overtime", TH: "ล่วงเวลา" }
  labDiligence: { [key: string]: string } = { EN: "Diligence", TH: "เบี้ยขยัน" }
  labAllowance: { [key: string]: string } = { EN: "Allowance", TH: "เงินค่าเวลา" }
  title_process: { [key: string]: string } = { EN: "Process", TH: "กระบวนการ" };
  title_result: { [key: string]: string } = { EN: "Result", TH: "ผลลัพธ์" };
  title_btnprocess: { [key: string]: string } = { EN: "Process", TH: "ดำเนินการ" };

  constructor(private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private taskService: TaskService,
    private router: Router,
    private periodsService : PeriodsServices
  ) { }

  ngOnInit(): void {

    this.doLoadLanguage()
    this.doGetInitialCurrent()
    this.Periodclosed()

    this.itemslike = [{ label: this.title_CalculateTax[this.initial_current.Language], styleClass: 'activelike' }];

    this.home = { icon: 'pi pi-home', routerLink: '/' };
    setTimeout(() => {
      this.doLoadTask()
    }, 200);
  }

  public initial_current: InitialCurrent = new InitialCurrent();
  doGetInitialCurrent() {
    this.initial_current = JSON.parse(localStorage.getItem(AppConfig.SESSIONInitial) || '{}');
    if (!this.initial_current) {
      this.router.navigateByUrl('login');
    }
  }

  doLoadLanguage() {
    if (this.initial_current.Language == "TH") {

    }
  }

  public task: TaskModel = new TaskModel();
  public taskDetail: TaskDetailModel = new TaskDetailModel();
  public taskWhoseList: TaskWhoseModel[] = [];
  isConfirmationDialogVisible: boolean = false;

  process() {

    if (!this.hasTruePeriodCloseta) {
      this.isConfirmationDialogVisible = true;
    let process = "";

    if (this.selectEmp.employee_dest.length == 0) {
      let message = "Please selected employee";

      if (this.initial_current.Language == "TH") {
        message = "กรุณาเลือกพนักงานด้วยค่ะ";
      }

      this.messageService.add({ severity: 'warn', summary: 'Cancelled', detail: message });
      return;
    }


    //-- Step 1 Task master
    this.task.company_code = this.initial_current.CompCode;
    this.task.project_code = "";
    this.task.task_type = "CAL_TAX";
    this.task.task_status = "W";

    //-- Step 2 Task detail

    let dateString = '2023-01-28T00:00:00'
    // var FromDate = new Date(dateString);

    // dateString = '2023-01-11T00:00:00'
    // var ToDate = new Date(dateString);


    this.taskDetail.taskdetail_process = process;
    this.taskDetail.taskdetail_fromdate = this.initial_current.TA_FromDate;
    this.taskDetail.taskdetail_todate = this.initial_current.TA_ToDate;
    this.taskDetail.taskdetail_paydate = this.initial_current.PR_PayDate;
    // this.taskDetail.taskdetail_paydate = FromDate;

    //-- Step 3 Task whose
    this.taskWhoseList = [];


    this.confirmationService.confirm({
      message: this.title_confirm_record[this.initial_current.Language],
      header: this.title_confirm[this.initial_current.Language],
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        //// console.log(this.selectEmp.employee_dest.length)

        this.taskService.task_record(this.task, this.taskDetail, this.selectEmp.employee_dest).then((res) => {
          let result = JSON.parse(res);
          if (result.success) {

            this.doLoadTask()

            this.messageService.add({ severity: 'success', summary: 'Success', detail: "Record Success.." });

          }
          else {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: "Record Not Success.." });
          }
        })

      },
      reject: () => {
        this.messageService.add({ severity: 'warn', summary: 'Cancelled', detail: this.title_confirm_cancel[this.initial_current.Language] });
      },
      key: "myDialog"
    });
  }}

  doLoadTask() {
    this.taskView.taskType = "CAL_TAX";
    this.taskView.doLoadTask();
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
}

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
  selector: 'app-attendance-process',
  templateUrl: './attendance-process.component.html',
  styleUrls: ['./attendance-process.component.scss']
})

export class AttendanceProcessComponent implements OnInit {

  itemslike: MenuItem[] = [];
  home: any;
  @ViewChild(SelectEmpComponent) selectEmp: any;
  @ViewChild(TaskComponent) taskView: any;



  title_processingtime: { [key: string]: string } = { EN: "Processing Time", TH: "ประมวณผลเวลา" };
  title_process: { [key: string]: string } = { EN: "Process", TH: "การทำงาน" };
  title_proces: { [key: string]: string } = { EN: "Process", TH: "ดำเนินการ" };
  title_result: { [key: string]: string } = { EN: "Result", TH: "ผลลัพธ์" };

  title_fromdate: { [key: string]: string } = { EN: "From", TH: "จากวันที่" };
  title_todate: { [key: string]: string } = { EN: "To", TH: "ถึงวันที่" };

  title_confirm: string = "Are you sure?";
  title_confirm_record: string = "Confirm to process";
  title_confirm_delete: string = "Confirm to delete";
  title_confirm_yes: string = "Yes";
  title_confirm_no: string = "No";

  title_confirm_cancel: string = "You have cancelled";

  title_submit: string = "Submit";
  title_cancel: string = "Cancel";

  @Input() policy_list: Policy[] = []
  @Input() title: string = "";
  index: number = 0;

  constructor(private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private taskService: TaskService,
    private router: Router,
    private periodsService: PeriodsServices,

  ) { }


  timesheet_list: PrjectEmpdailyModel[] = [];
  timesheet_dest: PrjectEmpdailyModel[] = [];
  result_list: Result[] = [];
  selectedDate: PrjectEmpdailyModel = new PrjectEmpdailyModel;
  policyselect!: Policy;
  new_data: boolean = false;
  @ViewChild('dt2') table: Table | undefined;
  ngOnInit(): void {

    this.doGetInitialCurrent()
    this.Periodclosed()

    this.selectedFromDate = new Date(this.initial_current.TA_FromDate)
    this.selectedToDate = new Date(this.initial_current.TA_ToDate)

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
    this.itemslike = [{ label: this.title_processingtime[this.initial_current.Language], styleClass: 'activelike' },];
    this.home = { icon: 'pi pi-home', routerLink: '/' };
  }


  public task: TaskModel = new TaskModel();
  public taskDetail: TaskDetailModel = new TaskDetailModel();
  public taskWhoseList: TaskWhoseModel[] = [];

  public fillauto: boolean = false;

  selectedFromDate: Date = new Date()
  selectedToDate: Date = new Date()
  isConfirmationDialogVisible: boolean = false;


  process() {

    //-- Step 1 Task master
    this.task.company_code = this.initial_current.CompCode;
    this.task.project_code = "";
    this.task.task_type = "SUM_TIME";
    this.task.task_status = "W";

    //-- Step 2 Task detail
    //-- Step 2 Task detail
    let process = "TIME";

    if (this.fillauto) {
      process = process + "|AUTO";
    }
    else {
      process = process + "|COMPARE";
    }

    let dateString = '2023-01-10T00:00:00'
    // var FromDate = new Date(dateString);

    dateString = '2023-01-11T00:00:00'
    // var ToDate = new Date(dateString);


    this.taskDetail.taskdetail_process = process;
    this.taskDetail.taskdetail_fromdate = this.selectedFromDate;
    this.taskDetail.taskdetail_todate = this.selectedToDate;
    this.taskDetail.taskdetail_paydate = this.initial_current.PR_PayDate;

    //-- Step 3 Task whose
    this.taskWhoseList = [];

    if (!this.hasTruePeriodCloseta) {
      this.isConfirmationDialogVisible = true;
      this.confirmationService.confirm({
        message: this.title_confirm_record,
        header: this.title_confirm,
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
          this.messageService.add({ severity: 'warn', summary: 'Cancelled', detail: this.title_confirm_cancel });
        },
        key: "myDialog"
      });
    }
  }

  doLoadTask() {
    this.taskView.taskType = "SUM_TIME";
    this.taskView.doLoadTask();
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

  doChaneDate() {
    if (this.selectedFromDate > this.selectedToDate) {
      this.selectedToDate = new Date(this.selectedFromDate)
    }
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
        this.hasTruePeriodCloseta = res.some((item: { period_closeta: boolean }) => item.period_closeta === true);
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
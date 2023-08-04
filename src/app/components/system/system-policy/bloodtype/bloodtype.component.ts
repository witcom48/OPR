import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Table } from 'primeng/table';
import { ConfirmationService, ConfirmEventType, MenuItem, MessageService } from 'primeng/api';
import { PrjectEmpdailyModel } from '../../../../models/project/project_empdaily';
import { Router } from '@angular/router';
import { AppConfig } from '../../../../config/config';
import { InitialCurrent } from '../.././../../config/initial_current';
import { ChartDataset, ChartOptions, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';

import { ChartModule } from 'primeng/chart';
import { SelectEmpComponent } from '../../../../components/usercontrol/select-emp/select-emp.component';
import { TaskComponent } from '../../../../components/usercontrol/task/task.component';

import { TaskModel } from '../../../../models/task';
import { TaskDetailModel } from '../../../../models/task_detail';
import { TaskWhoseModel } from '../../../../models/task_whose';
import { TaskService } from '../../../../services/task.service'
import { EmployeeService } from 'src/app/services/emp/worker.service';
import { EmployeeModel } from 'src/app/models/employee/employee';


import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

 @Component({
  selector: 'app-bloodtype',
  templateUrl: './bloodtype.component.html',
  styleUrls: ['./bloodtype.component.scss']
})
export class BloodtypeComponent implements OnInit {
  @ViewChild(SelectEmpComponent) selectEmp: any;
  @ViewChild(TaskComponent) taskCom: any;
  @ViewChild(TaskComponent) taskView!: TaskComponent;
  public barChartLabels: string[] = [];
  public barChartDataLate: ChartDataset[] = [];
  public barChartType = 'bar';

  public barChartOptions: ChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
  };

  taskType!: string;

  items: MenuItem[] = [];
  toolbar_menu: MenuItem[] = [];

  chartOptions: any;
  data_emptype: any;  
  data_status: any;
  data_stay: any;

  data_project: any;

  basicData: any;
  basicOptions: any;

  home: any;
  itemslike: MenuItem[] = [];
  title_confirm: { [key: string]: string } = {
    EN: 'Are you sure?',
    TH: 'ยืนยันการทำรายการ',
  };
  title_confirm_record: { [key: string]: string } = {
    EN: 'Confirm to record',
    TH: 'คุณต้องการบันทึกการทำรายการ',
  };
  title_confirm_cancel: { [key: string]: string } = {
    EN: 'You have cancelled',
    TH: 'คุณยกเลิกการทำรายการ',
  };
  title_CalculateTax: { [key: string]: string } = {
    EN: 'Calculate Tax',
    TH: 'คำนวณภาษี',
  };
   constructor(
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private taskService: TaskService,
    private router: Router,
    private employeeService: EmployeeService,
   ) { }

  ngOnInit(): void {
    this.doLoadWorkerList();  

    this.doLoadLanguage();
    this.doGetInitialCurrent();
    // this.doLoadEmployee();

    setTimeout(() => {
      this.doLoadTask();
    }, 100);

  }
   public initial_current: InitialCurrent = new InitialCurrent();
  employee_list: EmployeeModel[] = [];
  selectedemployee: EmployeeModel = new EmployeeModel();

  @ViewChild(BaseChartDirective)
   chart!: BaseChartDirective;


   labManpower: string | undefined;


  public doughnutChartLabels = ['Current', 'New', 'Resign'];
  public doughnutChartData = [0, 0, 0];
  public doughnutChartType = 'doughnut';
  public barChartData: any[] = [{
    data: [1, 1, 1],
    label: 'this is an example'
  }];
///
  public doughnutChartOptions: ChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
  };

  // workerCurrent: number = 0;
  // doLoadEmployee() {
  //   this.employeeService.worker_get(this.initial_current.CompCode, '').then(async (res) => {
  //     await res.forEach((element: EmployeeModel) => {
  //       element.worker_hiredate = new Date(element.worker_hiredate);
  //     });
  //     this.employee_list = await res;
  //     this.workerCurrent = this.employee_list.length;
  //    });
  // }

  doGetInitialCurrent() {
    this.initial_current = JSON.parse(localStorage.getItem('SESSIONInitial') || '{}');
    if (!this.initial_current) {
      this.router.navigateByUrl('login');
    }
  }

  doLoadLanguage() {
    if (this.initial_current.Language === 'TH') {
     }
  }

  public workerList: EmployeeModel[] | undefined;
  public task: TaskModel = new TaskModel();
  public taskDetail: TaskDetailModel = new TaskDetailModel();
  public taskWhoseList: TaskWhoseModel[] = [];
  // console.log(this.barChartLabels )

  doLoadWorkerList() {
    var temp_fromdate = new Date(this.initial_current.PR_FromDate);
    var temp_todate = new Date(this.initial_current.PR_ToDate);
  
    this.taskWhoseList = [];
    this.employeeService.worker_get(this.initial_current.CompCode, '').then((async: any) => {
      let resultJSON = async;
      if (resultJSON.result == '1') {
        this.workerList = resultJSON.data;
        this.barChartDataLate = [];
        this.barChartLabels = [];
  
        let workerCurrent: number = 0;
        let workerNew: number = 0;
        let workerResign: number = 0;
  
        for (let i = 0; i < resultJSON.data.length; i++) {
          console.log(i);
          this.barChartDataLate.push(resultJSON.data[i].worker_code);
  
          if (this.getLanguage() == 'EN') {
            this.barChartLabels.push(resultJSON.data[i].item_name_en);
          } else {
            this.barChartLabels.push(resultJSON.data[i].item_name_th);
          }
  
          let dateStart = new Date(resultJSON.data[i].worker_hiredate);
          let dateResign = new Date(resultJSON.data[i].worker_resigndate);
  
          if (resultJSON.data[i].worker_resignstatus == false && dateStart.getTime() < temp_fromdate.getTime()) {
            console.log('current');
            workerCurrent++;
          }
  
          if (resultJSON.data[i].worker_resignstatus == false && dateStart.getTime() > temp_fromdate.getTime()) {
            workerNew++;
          }
  
          if (resultJSON.data[i].worker_resignstatus == true && (dateResign.getTime() >= temp_fromdate.getTime() && dateResign.getTime() <= temp_todate.getTime())) {
            workerResign++;
          }
        }
  
        this.barChartData = [
          { data: [workerCurrent, workerNew, workerResign], label: 'Worker Count' },
        ];
  
        if (this.chart) {
          this.chart.update();
        }
      }
    });
  }
  
  

  doLoadTask(): void {
    if (this.taskView) {
      this.taskView.taskType = 'CAL_TAX';
      this.taskView.doLoadTask();
    }
  }

  getLanguage(): string {
    return 'EN';
  }
}



//   @ViewChild(TaskComponent) taskCom: any;

//    constructor(
//     private employeeService: EmployeeService,
//     private typeService: EmptypeService,
//     private router: Router,
//     private messageService: MessageService,
//     private confirmationService: ConfirmationService,
//     private datePipe: DatePipe
//   ) { }

//   // barChartData: any[] = [];
//   // basicOptions: any;

//   public doughnutChartLabels = ['Current', 'New', 'Resign'];
//   public doughnutChartData = [0, 0, 0];
//   public doughnutChartType = 'doughnut';

//   public barChartData: any[] = [{
//     data: [1, 1, 1],
//     label: 'this is an example'
//   }];

//   employee_list: EmployeeModel[] = [];
//   selectedemployee: EmployeeModel = new EmployeeModel();
//   workerDetail: EmployeeModel = new EmployeeModel();
//   worker_list: EmployeeModel[] = [];

//   basicData: any;


//   ngOnInit(): void {
//     this.doGetInitialCurrent()
//     this.doLoadEmployee();
//     this.doLoadChart()
//     this.doLoadLanguage()
//     setTimeout(() => {

//     }, 500);
//   }

//   public initial_current: InitialCurrent = new InitialCurrent();
//   doGetInitialCurrent() {
//     this.initial_current = JSON.parse(localStorage.getItem(AppConfig.SESSIONInitial) || '{}');
//     if (!this.initial_current) {
//       this.router.navigateByUrl('login');
//     }
//   }

//   title_emp: { [key: string]: string } = { EN: "Employee", TH: "พนักงาน" };
//   title_policy: { [key: string]: string } = { EN: "Policy", TH: "นโยบาย" };
//   title_emptype: { [key: string]: string } = { EN: "Employee Type", TH: "ประเภทพนักงาน" };
//   title_doughnutChartLabels = ['Current', 'New', 'Resign'];

//   doLoadLanguage() {
//     if (this.initial_current.Language == "TH") {

//       this.title_doughnutChartLabels = ['พนักงานปัจจุบัน', 'พนักงานใหม่', 'พนักงานลาออก'];


//     }
//   }

//    @ViewChild('TABLE') table: ElementRef | any = null;


//   workerCurrent: number = 0;


//   async doLoadEmployee() {
//     try {
//       const res = await this.employeeService.worker_get(this.initial_current.CompCode, "");
//       this.employee_list = res.map((element: EmployeeModel) => {
//         element.worker_hiredate = new Date(element.worker_hiredate);
//         return element;
//       });
//       this.workerCurrent = this.employee_list.length;
//       this.barChartData = [
//         {
//           name: 'Worker Current',
//           value: this.workerCurrent,
//         },
//       ];
//     } catch (error) {
//       console.error(error);
//     }
//   }


  // doLoadChart() {


  //   this.basicData = {
  //     labels: ['แฟชั่นฯ', 'พรอมมานาด', 'รามคำแหง', 'ฺBig C', 'Lotus มีนบุรี', 'PEA', 'SCB รัชโยธิน'],
  //     datasets: [
  //       {
  //         label: 'กำลังพล',
  //         backgroundColor: '#42A5F5',
  //         data: [65, 59, 80, 50, 80, 100, 60]
  //       },
  //       {
  //         label: 'ปัจจุบัน',
  //         backgroundColor: '#FF6384',
  //         data: [28, 48, 40, 47, 78, 80, 57]
  //       }
  //     ]
  //   };

  // }

//   public barChartOptions = {
//     scaleShowVerticalLines: false,
//     responsive: true
//   };

//   exportAsExcel() {
//     const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(this.table.nativeElement);//converts a DOM TABLE element to a worksheet
//     const wb: XLSX.WorkBook = XLSX.utils.book_new();
//     XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

//     XLSX.writeFile(wb, 'Export_emptype.xlsx');

//   }

// }

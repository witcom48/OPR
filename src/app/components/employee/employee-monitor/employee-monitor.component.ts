import { Component, Input, OnInit, ViewChild } from '@angular/core';

import { ConfirmationService, MegaMenuItem, MenuItem, MessageService } from 'primeng/api';
import { InitialCurrent } from '.././../../config/initial_current';
import { ChartData, ChartDataset, ChartOptions, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { TaskService } from '../../../services/task.service'
import { EmployeeService } from 'src/app/services/emp/worker.service';
import { EmployeeModel } from 'src/app/models/employee/employee';
import { Router } from '@angular/router';
import { LocationService } from 'src/app/services/system/policy/location.service';
import { SysLocationModel } from 'src/app/models/system/policy/location';
import { LocationModel } from 'src/app/models/employee/policy/location';
import { EmpLocationModel } from 'src/app/models/employee/manage/emplocation';
import { EmptypeModel } from 'src/app/models/employee/policy/emptype';
import { AppConfig } from 'src/app/config/config';
import { Subscription } from 'rxjs/internal/Subscription';
import { AccessdataModel } from 'src/app/models/system/security/accessdata';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-employee-monitor',
  templateUrl: './employee-monitor.component.html',
  styleUrls: ['./employee-monitor.component.scss']
})
export class EmployeeMonitorComponent implements OnInit {
  @ViewChild(BaseChartDirective) chart!: BaseChartDirective;
  home: any;
  itemslike: MenuItem[] = [];
  items: MenuItem[] = [];
  toolbar_menu: MenuItem[] = [];

  chartOptions: any;
  data_emptype: any;
  data_status: any;
  data_stay: any;

  data_project: any;

  basicData: any;
  basicOptions: any;

  // subscription: Subscription;
  config: AppConfig | undefined;

  public workerList: EmployeeModel[] = [];

  public locationList: EmpLocationModel[] = [];
  public syslocationList: SysLocationModel[] = [];
  getLanguage(): string {
    return this.initial_current.Language;
  }
  constructor(
    private router: Router,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private datePipe: DatePipe,

    private employeeService: EmployeeService,
    private locationService: LocationService,
  ) { }


  public initial_current: InitialCurrent = new InitialCurrent();
  initialData2: InitialCurrent = new InitialCurrent();
  accessData: AccessdataModel = new AccessdataModel();
  doGetInitialCurrent() {
    this.initial_current = JSON.parse(localStorage.getItem(AppConfig.SESSIONInitial) || '{}');
    if (!this.initial_current) {
      this.router.navigateByUrl('login');
    }
    this.accessData = this.initialData2.dotGetPolmenu('EMP');
  }

  title_employee: { [key: string]: string } = { EN: " Employee ", TH: "พนักงาน" }
  title_monitor: { [key: string]: string } = { EN: " Monitor ", TH: "กระดานแสดงผล" }

  title_showing : { [key: string]: string } = { EN: "  Showing ", TH: "แสดง" }
  title_to : { [key: string]: string } = { EN: "  to ", TH: "ถึง" }
  title_of : { [key: string]: string } = { EN: "  of ", TH: "จาก" }
  title_entries : { [key: string]: string } = { EN: "  entries ", TH: "รายการ" }
  title_search_keyword: { [key: string]: string } = { EN: "  Search keyword ", TH: "ค้นหา" }

  ngOnInit(): void {
    this.doGetInitialCurrent();
    this.itemslike = [{ label: this.title_employee[this.initial_current.Language], routerLink: '/employee/policy' },
    { label: this.title_monitor[this.initial_current.Language], styleClass: 'activelike' }];
    this.home = { icon: 'pi pi-home', routerLink: '/' };
   

    this.doLoadMenu()
    setTimeout(() => {
      this.doLoadChart();
      this.doLoadChart2();
      this.doLoadChart3();
      this.doLoadChart4();
      this.doLoadChart5();
    }, 500);


  }


  ////////กำลังพล ปัจจุบัน
  doughnut1: ChartData = {
    labels: ['กำลังพล', 'ปัจจุบัน'],
    datasets: [
      {
        data: [0, 0],
        label: 'Worker Count',
        backgroundColor: ['#FF6384', '#36A2EB']
      }
    ]
  };

  doughnutChartOptions1: ChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
  };
  doLoadChart() {
    const temp_fromdate = new Date(this.initial_current.PR_FromDate);
    const temp_todate = new Date(this.initial_current.PR_ToDate);
    this.employeeService.worker_get(this.initial_current.CompCode, '').then(async (res) => {
      this.workerList = await res;

      let personnel: number = 0;
      let currentWorkers: number = 0;

      for (let i = 0; i < this.workerList.length; i++) {
        const hireDate = new Date(this.workerList[i].worker_hiredate);

        const resignDate = new Date(this.workerList[i].worker_resigndate);

        if (this.workerList[i].worker_resignstatus == false && hireDate.getTime() < temp_fromdate.getTime()) {
          personnel++;

          if (hireDate.getTime() <= temp_fromdate.getTime() && hireDate.getTime() <= temp_todate.getTime()) {
            currentWorkers++;
          }
        }
      }
      this.doughnut1.labels = ['กำลังพล (' + personnel + ' คน)', 'ปัจจุบัน (' + currentWorkers + ' คน)'];
      this.doughnut1.datasets[0].data = [personnel, currentWorkers];
      this.updateChart();
    });
  }
  updateChart() {
    if (this.chart && this.chart.chart && this.chart.chart.config) {
      this.chart.chart.update();
    }
    console.log(this.doughnut2,'กำลังพล')

  }



  ////พนักงานทั้งหมดและลาออก

  doughnut2: ChartData = {
    labels: ['เข้าใหม่', 'ลาออก'],
    datasets: [
      {
        data: [0, 0],
        label: 'Worker Count',
        backgroundColor: ['#FF6384', '#36A2EB']
      }
    ]
  };

  doughnutChartOptions2: ChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
  };

  doLoadChart2() {
    const temp_fromdate = new Date(this.initial_current.PR_FromDate);
    const temp_todate = new Date(this.initial_current.PR_ToDate);

    this.employeeService.worker_get(this.initial_current.CompCode, '').then(async (res) => {
      this.workerList = await res;
      let newWorkers: number = 0;
      let resignedWorkers: number = 0;

      for (let i = 0; i < this.workerList.length; i++) {
        const hireDate = new Date(this.workerList[i].worker_hiredate);
        const resignDate = new Date(this.workerList[i].worker_resigndate);
        if (this.workerList[i].worker_resignstatus == false && hireDate.getTime() < temp_fromdate.getTime()) {
          newWorkers++;
        }
        if (this.workerList[i].worker_resignstatus == true && (resignDate.getTime() >= temp_fromdate.getTime())) {
          // if (this.workerList[i].worker_resignstatus == true && (resignDate.getTime() >= temp_fromdate.getTime() && resignDate.getTime() <= temp_todate.getTime())) {
          resignedWorkers++;

        }
      }

      this.doughnut2.labels = ['เข้าใหม่ (' + newWorkers + ' คน)', 'ลาออก (' + resignedWorkers + ' คน)'];
      this.doughnut2.datasets[0].data = [newWorkers, resignedWorkers];

      this.updateChart2();
    });
    console.log(this.doughnut2,'เข้าใหม่ ลาออก')
  }

  updateChart2() {
    if (this.chart && this.chart.chart && this.chart.chart.config) {
      this.chart.chart.update();
    }
  }



  ///  พนักงานประจำ และชั่วคราว 

  doughnut3: ChartData = {
    labels: ['พนักงานประจำ', 'พนักงานชั่วคราว'],
    datasets: [
      {
        data: [0, 0],
        label: 'Worker Count',
        backgroundColor: ['#FF6384', '#36A2EB']
      }
    ]
  };

  doughnutChartOptions3: ChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
  };

  doLoadChart3() {
    const temp_fromdate = new Date(this.initial_current.PR_FromDate);
    const temp_todate = new Date(this.initial_current.PR_ToDate);

    this.employeeService.worker_get(this.initial_current.CompCode, '').then(async (res) => {
      this.workerList = await res;

      let regularWorkers: number = 0; // จำนวนพนักงานประจำ
      let temporaryWorkers: number = 0; // จำนวนพนักงานชั่วคราว

      for (let i = 0; i < this.workerList.length; i++) {
        const hireDate = new Date(this.workerList[i].worker_hiredate);
        const resignDate = new Date(this.workerList[i].worker_resigndate);

        if (this.workerList[i].worker_status === "F" && hireDate.getTime() <= temp_fromdate.getTime()) {
          regularWorkers++;

          if (this.workerList[i].worker_status === "T" && (resignDate.getTime() >= temp_fromdate.getTime())) {
            // if (this.workerList[i].worker_resignstatus === true &&hireDate.getTime() >= temp_fromdate.getTime() && hireDate.getTime() <= temp_todate.getTime()) {

            temporaryWorkers++;

          }
        }
      }

      this.doughnut3.labels = ['พนักงานประจำ (' + regularWorkers + ' คน)', 'พนักงานชั่วคราว (' + temporaryWorkers + ' คน)'
      ];
      this.doughnut3.datasets[0].data = [regularWorkers, temporaryWorkers];
      this.updateChart3();
    });
  }

  updateChart3() {
    if (this.chart && this.chart.chart && this.chart.chart.config) {
      this.chart.chart.update();
    }
  }


  /// สถานที่ทำงาน
  barChartData4: ChartData = {
    labels: [],
    datasets: [
      {
        data: [0, 0, 0, 0, 0, 0, 0],
        label: 'กำลังพล',
        backgroundColor: ['#FF6384']
      },
      {
        data: [0, 0, 0, 0, 0, 0, 0],
        label: 'ปัจจุบัน',
        backgroundColor: ['#36A2EB']
      }
    ]
  };

  barChartOptions4: ChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true
      }
    }
  };

  async doLoadChart4() {
    const temp_fromdate = new Date(this.initial_current.PR_FromDate);
    const temp_todate = new Date(this.initial_current.PR_ToDate);

    try {
      const res = await this.employeeService.locationlist_get(this.initial_current.CompCode, '');
      this.locationList = res;

      let personnelOnDuty = 0;
      let currentWorkers = 0;

      for (let i = 0; i < this.locationList.length; i++) {
        // const hireDate = new Date(this.locationList[i].emplocation_startdate);
        // const resignDate = new Date(this.locationList[i].emplocation_enddate);

        const hireDate = new Date(this.workerList[i].worker_hiredate);
        const resignDate = new Date(this.workerList[i].worker_resigndate);

        if (this.locationList[i].worker_code) {
          personnelOnDuty++;
          // console.log(personnelOnDuty, 'กำลังพล');


          if (this.locationList[i].worker_code && resignDate.getTime() >= temp_fromdate.getTime()) {
            currentWorkers++;
            // console.log(currentWorkers, 'จำนวนพนักงานปัจจุบัน');

          }
        }
      }

      const locationLabels = this.locationList.map(location => `${location.location_name_th} (${location.worker_code} คน)`);

      this.barChartData4.labels = locationLabels;
      this.barChartData4.datasets[0].data = Array(locationLabels.length).fill(personnelOnDuty);
      this.barChartData4.datasets[1].data = Array(locationLabels.length).fill(currentWorkers);


      this.updateChart4();
    } catch (error) {
      console.error(error);
    }
  }

  updateChart4() {
    if (this.chart && this.chart.chart && this.chart.chart.config) {
      this.chart.chart.update();

    }
  }





  ////
  ///  พนักงานรายวัน เดือน
  doughnut5: ChartData = {
    labels: ['พนักงานรายวัน', 'พนักงานรายเดือน'],
    datasets: [
      {
        data: [0, 0],
        label: 'จำนวนพนักงาน',
        backgroundColor: ['#FF6384', '#36A2EB']
      }
    ]
  };

  doughnutChartOptions5: ChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
  };
  public emptypeList: EmptypeModel[] = [];

  worker_type: any;
  worker_code: any;
  doLoadChart5() {
    const temp_fromdate = new Date(this.initial_current.PR_FromDate);
    const temp_todate = new Date(this.initial_current.PR_ToDate);

    this.employeeService.typelist_get(this.initial_current.CompCode, '').then(async (res) => {
      this.emptypeList = await res;
      let regularWorkerst: number = 0; // จำนวนพนักงานรายวัน
      let temporaryWorkers: number = 0; // จำนวนพนักงานรายเดือน

      for (let i = 0; i < this.emptypeList.length; i++) {
        const hireDate = new Date(this.workerList[i].worker_hiredate);
        if (this.workerList[i].worker_type === 'M' || this.emptypeList[i].type_code === 'M' && hireDate.getTime() < temp_fromdate.getTime()) {
          regularWorkerst++;

        }

        if (this.workerList[i].worker_type === 'D' || this.emptypeList[i].type_code === 'D') {
          temporaryWorkers++;
        }
      }

      this.doughnut5.labels = ['พนักงานรายวัน (' + regularWorkerst + ' คน)', 'พนักงานรายเดือน (' + temporaryWorkers + ' คน)'];
      this.doughnut5.datasets[0].data = [regularWorkerst, temporaryWorkers];

      this.updateChart5();
    });
  }

  updateChart5() {
    if (this.chart && this.chart.chart && this.chart.chart.config) {
      this.chart.chart.update();
    }
  }

  doLoadMenu() {
    this.toolbar_menu = [
      {
        label: 'Save',
        icon: 'pi pi-fw pi-save',

      },
      {
        label: 'Export',
        icon: 'pi pi-fw pi-file-export',
        command: (event) => {
        }
      },
    ];


    this.items = [

      {
        label: 'New',
        icon: 'pi pi-fw pi-plus',

      },
      {
        label: 'Edit',
        icon: 'pi pi-fw pi-pencil',
        command: (event) => {
        }
      },
      {
        label: 'Delete',
        icon: 'pi pi-fw pi-trash',
      }

      ,
      {
        label: 'Import',
        icon: 'pi pi-fw pi-file-import',
      }
      ,
      {
        label: 'Export',
        icon: 'pi pi-fw pi-file-export',
      }

    ];

  }

  selectData(event: Event) {
    //event.dataset = Selected dataset
    //event.element = Selected element
    //event.element._datasetIndex = Index of the dataset in data
    //event.element._index = Index of the data in dataset
  }

}

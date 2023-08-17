import { Component, Input, OnInit, ViewChild } from '@angular/core';

import { MegaMenuItem, MenuItem } from 'primeng/api';
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

@Component({
  selector: 'app-employee-monitor',
  templateUrl: './employee-monitor.component.html',
  styleUrls: ['./employee-monitor.component.scss']
})
export class EmployeeMonitorComponent implements OnInit {
  @ViewChild(BaseChartDirective) chart!: BaseChartDirective;

  items: MenuItem[] = [];
  toolbar_menu: MenuItem[] = [];

  chartOptions: any;
  data_emptype: any;
  data_status: any;
  data_stay: any;

  data_project: any;

  basicData: any;
  basicOptions: any;

  //subscription: Subscription;
  //config: AppConfig;

  public initial_current: InitialCurrent = new InitialCurrent();
  public workerList: EmployeeModel[] = [];

  public locationList: EmpLocationModel[] = [];
  public syslocationList: SysLocationModel[] = [];

  constructor(
    private employeeService: EmployeeService,
    private locationService: LocationService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.doLoadMenu()
    this.doLoadChart()
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
      // console.log(this.workerList);

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
  }



  ////พนักงานทั้งหมดและลาออก

  doughnut2: ChartData = {
    labels: ['เข้าใหม่', 'ลาออก'],
    datasets: [
      {
        data: [0, 0],
        label: 'Worker Count',
        backgroundColor: ['#FF6384', '#FFCE56']
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



        if (this.workerList[i].worker_resignstatus == false && hireDate.getTime() > temp_fromdate.getTime()) {
          newWorkers++;
        }



        if (this.workerList[i].worker_resignstatus == true && (resignDate.getTime() >= temp_fromdate.getTime() && resignDate.getTime() <= temp_todate.getTime())) {
          resignedWorkers++;
        }

      }

      this.doughnut2.labels = ['เข้าใหม่ (' + newWorkers + ' คน)', 'ลาออก (' + resignedWorkers + ' คน)'];
      this.doughnut2.datasets[0].data = [newWorkers, resignedWorkers];
      // console.log(resignedWorkers);

      this.updateChart2();
    });
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

        if (this.workerList[i].worker_resignstatus === false && hireDate.getTime() < temp_fromdate.getTime()) {
          regularWorkers++;

          if (hireDate.getTime() >= temp_fromdate.getTime() && hireDate.getTime() <= temp_todate.getTime()) {
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
      this.syslocationList = res;
      console.log(res, 'location');

      let personnelOnDuty: number = 0;
      let currentWorkers: number = 0;

      for (let i = 0; i < this.syslocationList.length; i++) {
        const hireDate = new Date(this.workerList[i].worker_hiredate);
        if (this.workerList[i].worker_code) {
          personnelOnDuty++;
          // .location_data[i].worker_cod

        // if (this.workerList[i].worker_code ) {
        //   personnelOnDuty++;
          console.log(this.workerList[i].worker_code,personnelOnDuty)

          if (hireDate.getTime() >= temp_fromdate.getTime() && hireDate.getTime() <= temp_todate.getTime()) {
            currentWorkers++;
          }
        }
      }


      const locationLabels = this.syslocationList.map(location => `${location.location_name_th}(${personnelOnDuty} คน)`);
      this.barChartData4.labels = locationLabels;
      this.barChartData4.datasets[0].data = Array(locationLabels.length).fill(personnelOnDuty);
      this.barChartData4.datasets[1].data = Array(locationLabels.length).fill(currentWorkers);
      console.log(this.barChartData4, 'te')
      this.updateChart4();
    } catch (error) {
    }
  }

  updateChart4() {
    if (this.chart && this.chart.chart && this.chart.chart.config) {
      this.chart.chart.update();
      console.log(this.chart.chart.update, '43');

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
  worker_type: any;
  doLoadChart5() {
    const temp_fromdate = new Date(this.initial_current.PR_FromDate);
    const temp_todate = new Date(this.initial_current.PR_ToDate);

    this.employeeService.typelist_get(this.initial_current.CompCode, '').then(async (res) => {
      this.workerList = await res;
      // console.log(this.workerList);

      let regularWorkers: number = 0; // จำนวนพนักงานรายวัน
      let temporaryWorkers: number = 0; // จำนวนพนักงานรายเดือน

      for (let i = 0; i < this.workerList.length; i++) {
        const hireDate = new Date(this.workerList[i].worker_hiredate);

        if (this.workerList[i].worker_type === 'M' || this.workerList[i].worker_type === 'D') {
          regularWorkers++;
        }

        if (this.workerList[i].worker_type === 'D' && hireDate >= temp_fromdate && hireDate <= temp_todate) {
          temporaryWorkers++;
        }
      }

      this.doughnut5.labels = ['พนักงานรายวัน (' + regularWorkers + ' คน)', 'พนักงานรายเดือน (' + temporaryWorkers + ' คน)'];
      this.doughnut5.datasets[0].data = [regularWorkers, temporaryWorkers];
      // console.log(this.doughnut5, '5');

      this.updateChart5();
    });
  }

  updateChart5() {
    if (this.chart && this.chart.chart && this.chart.chart.config) {
      this.chart.chart.update();
    }
  }


  // doLoadChart(){
  //   this.data_emptype = {
  //     labels: ['รายเดือน [500]','รายวัน [800]'],
  //     datasets: [
  //         {
  //             data: [500, 800],
  //             backgroundColor: [
  //                 "#FF6384",
  //                 "#36A2EB"
  //             ],
  //             hoverBackgroundColor: [
  //                 "#FF6384",
  //                 "#36A2EB"
  //             ]
  //         }
  //     ]
  //   };

  //   this.data_status = {
  //     labels: ['ประจำ [1,000]','ชั่วคราว [300]'],
  //     datasets: [
  //         {
  //             data: [1000, 300],
  //             backgroundColor: [
  //                 "#FF6384",
  //                 "#36A2EB"
  //             ],
  //             hoverBackgroundColor: [
  //                 "#FF6384",
  //                 "#36A2EB"
  //             ]
  //         }
  //     ]
  //   };

  //   this.data_stay = {
  //     labels: ['เข้าใหม่ [50]','ลาออก [20]'],
  //     datasets: [
  //         {
  //             data: [50, 20],
  //             backgroundColor: [
  //                 "#FF6384",
  //                 "#36A2EB"
  //             ],
  //             hoverBackgroundColor: [
  //                 "#FF6384",
  //                 "#36A2EB"
  //             ]
  //         }
  //     ]
  //   };

  //   this.data_project = {
  //     labels: ['กำลังพล [300]','ปัจจุบัน [250]'],
  //     datasets: [
  //         {
  //             data: [50, 20],
  //             backgroundColor: [
  //                 "#FF6384",
  //                 "#36A2EB"
  //             ],
  //             hoverBackgroundColor: [
  //                 "#FF6384",
  //                 "#36A2EB"
  //             ]
  //         }
  //     ]
  //   };

  //   this.basicData = {
  //     labels: ['แฟชั่นฯ', 'พรอมมานาด', 'รามคำแหง', 'ฺBig C', 'Lotus มีนบุรี', 'PEA', 'SCB รัชโยธิน'],
  //     datasets: [
  //         {
  //             label: 'กำลังพล',
  //             backgroundColor: '#42A5F5',
  //             data: [0, 0, 0, 0, 0, 0, 0]
  //         },
  //         {
  //             label: 'ปัจจุบัน',
  //             backgroundColor: '#FF6384',
  //             data: [0, 0, 0, 0, 0, 0, 0]
  //         }
  //     ]
  //   };

  // }

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
          // console.log('Edit')
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
          // console.log('Edit')
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

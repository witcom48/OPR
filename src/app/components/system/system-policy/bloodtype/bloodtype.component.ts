import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Table } from 'primeng/table';
import { ConfirmationService, ConfirmEventType, MenuItem, MessageService } from 'primeng/api';
import { PrjectEmpdailyModel } from '../../../../models/project/project_empdaily';
import { Router } from '@angular/router';
import { AppConfig } from '../../../../config/config';
import { InitialCurrent } from '../.././../../config/initial_current';
import { ChartData, ChartDataset, ChartOptions, ChartType } from 'chart.js';
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
  @ViewChild(BaseChartDirective) chart!: BaseChartDirective;



  public initial_current: InitialCurrent = new InitialCurrent();
  public workerList: EmployeeModel[] = [];
  constructor(
    private employeeService: EmployeeService,
    private router: Router
  ) { }

  ngOnInit(): void {
    setTimeout(() => {
      this.doLoadChart();
      this.doLoadChart2();
      this.doLoadChart3();
      this.doLoadChart4();
    }, 1500);

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





  // doLoadChart() {
  //   this.employeeService.worker_get(this.initial_current.CompCode, '').then(async (res) => {
  //     this.workerList = await res;
  //     console.log(this.workerList);

  //     let currentWorkers: number = 0;
  //     let resignedWorkers: number = 0;

  //     const today = new Date();

  //     for (let i = 0; i < this.workerList.length; i++) {
  //       const hireDate = new Date(this.workerList[i].worker_id);
  //       const differenceInDays = Math.floor(
  //         (today.getTime() - hireDate.getTime()) / (1000 * 3600 * 24)
  //       );

  //       if (differenceInDays <= 30) {
  //         currentWorkers++;
  //       } else {
  //         resignedWorkers++;
  //       }
  //     }

  //     this.barChartData.datasets[0].data = [currentWorkers, resignedWorkers];
  //     console.log(this.barChartData);

  //     this.updateChart();
  //   });
  // }

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
      console.log(resignedWorkers);

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

      this.doughnut3.labels = [
        'พนักงานประจำ (' + regularWorkers + ' คน)', 'พนักงานชั่วคราว (' + temporaryWorkers + ' คน)'
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


  ///   พนักงานประจำ และชั่วคราว

  barChartData4: ChartData = {
    labels: ['แฟชั่นฯ', 'พรอมมานาด', 'รามคำแหง', 'ฺBig C', 'Lotus มีนบุรี', 'PEA', 'SCB รัชโยธิน'],//ต้องใส่เป็นสถานที่ทำงาน
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

  doLoadChart4() {
    const temp_fromdate = new Date(this.initial_current.PR_FromDate);
    const temp_todate = new Date(this.initial_current.PR_ToDate);

    this.employeeService.worker_get(this.initial_current.CompCode, '').then(async (res) => {
      this.workerList = await res;

      let personnelOnDuty: number = 0; // จำนวนพนักงานกำลังพล
      let currentWorkers: number = 0; // จำนวนพนักงานปัจจุบัน

      for (let i = 0; i < this.workerList.length; i++) {
        const hireDate = new Date(this.workerList[i].worker_hiredate);
        const resignDate = new Date(this.workerList[i].worker_resigndate);

        if (this.workerList[i].worker_resignstatus === false && hireDate.getTime() < temp_fromdate.getTime()) {
          personnelOnDuty++;

          if (hireDate.getTime() >= temp_fromdate.getTime() && hireDate.getTime() <= temp_todate.getTime()) {
            currentWorkers++;
          }
        }
      }

      this.barChartData4.labels = ['แฟชั่นฯ', 'พรอมมานาด', 'รามคำแหง', 'ฺBig C', 'Lotus มีนบุรี', 'PEA', 'SCB รัชโยธิน'];
      this.barChartData4.datasets[0].data = [personnelOnDuty, currentWorkers];
      console.log(this.barChartData4, 't');
      this.updateChart4();
    });
  }

  updateChart4() {
    if (this.chart && this.chart.chart && this.chart.chart.config) {
      this.chart.chart.update();
    }
  }

}  
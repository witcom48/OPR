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
import { PositionModel } from 'src/app/models/employee/policy/position';
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
  public PositionList: PositionModel[] = [];

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

  title_showing: { [key: string]: string } = { EN: "  Showing ", TH: "แสดง" }
  title_to: { [key: string]: string } = { EN: "  to ", TH: "ถึง" }
  title_of: { [key: string]: string } = { EN: "  of ", TH: "จาก" }
  title_entries: { [key: string]: string } = { EN: "  entries ", TH: "รายการ" }
  title_search_keyword: { [key: string]: string } = { EN: "  Search keyword ", TH: "ค้นหา" }

  title_analytics: { [key: string]: string } = { EN: "Analytics", TH: "Analytics" }
  title_workers: { [key: string]: string } = { EN: "Workers", TH: "Workers" }
  title_POSITION: { [key: string]: string } = { EN: "POSITION", TH: "ตำแหน่งงาน" }
  title_GENDER: { [key: string]: string } = { EN: "GENDER", TH: "เพศ" }
  title_EMPLOYEE: { [key: string]: string } = { EN: "EMPLOYEE AGE", TH: "อายุพนักงาน" }
  title_Experience: { [key: string]: string } = { EN: "Work Experience", TH: "อายุงาน" }

  title_Male: { [key: string]: string } = { EN: "Male", TH: "ชาย" }
  title_Female: { [key: string]: string } = { EN: "Female", TH: "หญิง" }
  title_Person: { [key: string]: string } = { EN: "Person", TH: "คน" }
  title_year: { [key: string]: string } = { EN: "year", TH: "ปี" }
  title_morethan: { [key: string]: string } = { EN: "More than 16", TH: "มากกว่า 16" }


  selectedEmployee: EmployeeModel = new EmployeeModel();

  ngOnInit(): void {
    this.doGetInitialCurrent();
    this.itemslike = [{ label: this.title_monitor[this.initial_current.Language], styleClass: 'activelike' }];
    this.home = { icon: 'pi pi-home', routerLink: '/' };

    this.doLoadMenu()

    this.doLoadChart();
    this.doLoadChart2();
    this.doLoadChart3();
    this.doLoadChart4();
    this.doLoadChart5();
    this.doLoadChart6();
    this.doLoadChart7();
    this.doLoadChart8();
    this.doLoadChart9();

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
    this.employeeService.worker_get(this.initial_current.CompCode, this.selectedEmployee.worker_code).then(async (res) => {
      this.workerList = await res;

      let personnel: number = 0;
      let currentWorkers: number = 0;

      for (let i = 0; i < this.workerList.length; i++) {
        const hireDate = new Date(this.workerList[i].worker_hiredate);

        const resignDate = new Date(this.workerList[i].worker_resigndate);

        if (this.workerList[i].worker_code) {
          personnel++;
        }
        if (this.workerList[i].worker_resignstatus === false && (resignDate.getTime() <= temp_todate.getTime())) {
          currentWorkers++;
        }
      }
      // for (let i = 0; i < this.workerList.length; i++) {
      //   const hireDate = new Date(this.workerList[i].worker_hiredate);
      //   const resignDate = new Date(this.workerList[i].worker_resigndate);
      //   if (this.workerList[i].worker_code || this.workerList[i].worker_resignstatus == true && hireDate.getTime() >= temp_fromdate.getTime() && hireDate.getTime() <= temp_todate.getTime()) {
      //     // if (this.workerList[i].worker_resignstatus === false && hireDate.getTime() >= temp_fromdate.getTime() && hireDate.getTime() <= temp_todate.getTime()) {
      //     personnel++;
      //   }
      //   if (this.workerList[i].worker_resignstatus == false && (hireDate.getTime() <= temp_todate.getTime())) {
      //     // if (this.workerList[i].worker_resignstatus == true && (resignDate.getTime() >= temp_fromdate.getTime() && resignDate.getTime() <= temp_todate.getTime())) {
      //     currentWorkers++;
      //   }
      //   // if (this.workerList[i].worker_code || this.workerList[i].worker_resignstatus == false && hireDate.getTime() >= temp_fromdate.getTime() && hireDate.getTime() <= temp_todate.getTime()) {
      //   // // if (this.workerList[i].worker_code) {
      //   //   personnel++;
      //   //   if (resignDate.getTime() <= temp_fromdate.getTime() && resignDate.getTime() >= temp_todate.getTime()) {
      //   //     currentWorkers++;
      //   // }
      //   // }
      // }
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
    var tmp = new EmployeeModel();
    tmp.worker_code = this.selectedEmployee.worker_code

    this.employeeService.worker_get(this.initial_current.CompCode, "").then(async (res) => {
      this.workerList = await res;
      let newWorkers: number = 0;
      let resignedWorkers: number = 0;

      for (let i = 0; i < this.workerList.length; i++) {
        const hireDate = new Date(this.workerList[i].worker_hiredate);
        const resignDate = new Date(this.workerList[i].worker_resigndate);

        // if (this.workerList[i].worker_resignstatus == false && hireDate.getTime() >= temp_fromdate.getTime() && hireDate.getTime() <= temp_todate.getTime()) {
        //   newWorkers++;1
        // }

        if (this.workerList[i].worker_resignstatus == false && hireDate.getTime() >= temp_fromdate.getTime() && hireDate.getTime() <= temp_todate.getTime()) {

          // if (this.workerList[i].worker_resignstatus === false && hireDate.getTime() >= temp_fromdate.getTime() && hireDate.getTime() <= temp_todate.getTime()) {
          newWorkers++;
        }

        if (this.workerList[i].worker_resignstatus == true && hireDate.getTime() >= temp_fromdate.getTime() && hireDate.getTime() <= temp_todate.getTime()) {
          // if (this.workerList[i].worker_resignstatus == true && (resignDate.getTime() >= temp_fromdate.getTime() && resignDate.getTime() <= temp_todate.getTime())) {
          resignedWorkers++;
        }
      }
      // if (this.workerList[i].worker_resignstatus == false && hireDate.getTime() < temp_fromdate.getTime()) {
      //   newWorkers++;
      // }
      // if (this.workerList[i].worker_resignstatus == true && (resignDate.getTime() >= temp_fromdate.getTime())) {
      //   resignedWorkers++;
      // }
      this.doughnut2.labels = ['เข้าใหม่ (' + newWorkers + ' คน)', 'ลาออก (' + resignedWorkers + ' คน)'];
      this.doughnut2.datasets[0].data = [newWorkers, resignedWorkers];

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

    this.employeeService.worker_get(this.initial_current.CompCode, this.selectedEmployee.worker_code).then(async (res) => {
      this.workerList = await res;

      let regularEmp: number = 0; // จำนวนพนักงานประจำ
      let temporaryEmp: number = 0; // จำนวนพนักงานชั่วคราว

      for (let i = 0; i < this.workerList.length; i++) {
        const hireDate = new Date(this.workerList[i].worker_hiredate);
        const resignDate = new Date(this.workerList[i].worker_resigndate);

        if (this.workerList[i].worker_status === "F" && hireDate.getTime() >= temp_fromdate.getTime() && hireDate.getTime() <= temp_todate.getTime()) {
          regularEmp++;
        }
        if (this.workerList[i].worker_status === "T" && hireDate.getTime() >= temp_fromdate.getTime() && resignDate.getTime() <= temp_todate.getTime()) {
          // if (this.workerList[i].worker_resignstatus == true && (resignDate.getTime() >= temp_fromdate.getTime() && resignDate.getTime() <= temp_todate.getTime())) {
          temporaryEmp++;
          // if (this.workerList[i].worker_status === "T"  && (resignDate.getTime() <= temp_todate.getTime())) {


        }



      }

      this.doughnut3.labels = ['พนักงานประจำ (' + regularEmp + ' คน)', 'พนักงานชั่วคราว (' + temporaryEmp + ' คน)'
      ];
      this.doughnut3.datasets[0].data = [regularEmp, temporaryEmp];
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
      const res = await this.employeeService.locationlist_get(this.initial_current.CompCode, "");
      this.locationList = res;

      let personnelOnDuty: number = 0;
      let currentWorkers: number = 0;

      for (let i = 0; i < this.locationList.length; i++) {
        const hireDate = new Date(this.locationList[i].emplocation_startdate);
        const resignDate = new Date(this.locationList[i].emplocation_enddate);
        // const hireDate = new Date(this.workerList[i].worker_hiredate);
        // const resignDate = new Date(this.workerList[i].worker_resigndate);
        if (this.locationList[i].worker_code) {
          personnelOnDuty++;
        }
        // if (this.locationList[i].worker_resignstatus === "0" && hireDate.getTime() >= temp_fromdate.getTime() && hireDate.getTime() <= temp_todate.getTime()) {


        if (
          this.locationList[i].worker_code || (this.workerList[i].worker_resignstatus === false && resignDate.getTime() >= temp_fromdate.getTime() && resignDate.getTime() <= temp_todate.getTime())
        ) {
          currentWorkers++;
        }



      }

      const locationLabels = this.locationList.map(location => `${location.location_name_th} (${location.worker_code} คน)`);

      this.barChartData4.labels = locationLabels;
      this.barChartData4.datasets[0].data = Array(locationLabels.length).fill(personnelOnDuty);
      this.barChartData4.datasets[1].data = Array(locationLabels.length).fill(currentWorkers);
      this.updateChart4();
    } catch (error) {
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

  doLoadChart5() {
    const temp_fromdate = new Date(this.initial_current.PR_FromDate);
    const temp_todate = new Date(this.initial_current.PR_ToDate);

    this.employeeService.worker_get(this.initial_current.CompCode, this.selectedEmployee.worker_code).then(async (res) => {
      this.workerList = await res;

      let regularWorkerst: number = 0; // จำนวนพนักงานรายวัน
      let temporaryWorkers: number = 0; // จำนวนพนักงานรายเดือน



      for (let i = 0; i < this.workerList.length; i++) {
        const hireDate = new Date(this.workerList[i].worker_hiredate);
        const resignDate = new Date(this.workerList[i].worker_resigndate);

        if (this.workerList[i].worker_type === "D" && hireDate.getTime() >= temp_fromdate.getTime() && hireDate.getTime() <= temp_todate.getTime()) {
          regularWorkerst++;
        }
        if (this.workerList[i].worker_type === "M" && hireDate.getTime() >= temp_fromdate.getTime() && hireDate.getTime() <= temp_todate.getTime()) {
          // if (this.workerList[i].worker_resignstatus == true && (resignDate.getTime() >= temp_fromdate.getTime() && resignDate.getTime() <= temp_todate.getTime())) {
          temporaryWorkers++;

        }



      }

      this.doughnut5.labels = ['พนักงานรายวัน (' + regularWorkerst + ' คน)', 'พนักงานรายเดือน (' + temporaryWorkers + ' คน)'
      ];
      this.doughnut5.datasets[0].data = [regularWorkerst, temporaryWorkers];
      // this.updateChart5();
    });
  }
  //

  ////
  /// เพศ
  doughnut6: ChartData = {
    labels: [this.title_Male[this.initial_current.Language], this.title_Female[this.initial_current.Language]],
    datasets: [
      {
        data: [0, 0],
        label: 'เพศ',
      }
    ]
  };

  doughnutChartOptions6: ChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
  };

  doLoadChart6() {
    const temp_fromdate = new Date(this.initial_current.PR_FromDate);
    const temp_todate = new Date(this.initial_current.PR_ToDate);

    this.employeeService.getDashGenderList_get(this.initial_current.CompCode, this.selectedEmployee.worker_code).then(async (res) => {
      this.workerList = await res;

      let regularWorkers: number = 0; // จำนวนพนักงานชาย
      let temporaryWorkers: number = 0; // จำนวนพนักงานหญิง

      for (let i = 0; i < this.workerList.length; i++) {
        const hireDate = new Date(this.workerList[i].worker_hiredate);

        if (this.workerList[i].worker_gender === "M") {
          regularWorkers++;
        }

        if (this.workerList[i].worker_gender === "F") {
          temporaryWorkers++;
        }
      }
      const getRandomSoftColor = () => {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
          color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
      };

      const numberOfColorsNeeded = 10;
      const initialColors = ['#FF6384', '#36A2EB'];
      const randomSoftColors = initialColors.concat(
        Array.from({ length: numberOfColorsNeeded - initialColors.length }, getRandomSoftColor)
      );

      this.doughnut6.datasets[0].backgroundColor = randomSoftColors;

      this.doughnut6.labels = [this.title_Male[this.initial_current.Language] + ' ' + '(' + regularWorkers + ')' + ' ' + this.title_Person[this.initial_current.Language], this.title_Female[this.initial_current.Language] + ' ' + '(' + temporaryWorkers + ')' + ' ' + this.title_Person[this.initial_current.Language]];
      this.doughnut6.datasets[0].data = [regularWorkers, temporaryWorkers].filter(count => count > 0);
      this.updateChart6();
    });
  }

  updateChart6() {
    if (this.chart && this.chart.chart && this.chart.chart.config) {
      this.chart.chart.update();
    }
  }

  //
  /// อายุพนักงาน
  
  doughnut7: ChartData = {
    
    labels: ['18-30', '31-40', '41-55'],
    datasets: [
      {
        data: [0, 0],
        label: 'อายุพนักงาน',
      }
    ]
  };

  doughnutChartOptions7: ChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
  };

  doLoadChart7() {
    const temp_fromdate = new Date(this.initial_current.PR_FromDate);
    const temp_todate = new Date(this.initial_current.PR_ToDate);

    this.employeeService.getDashEmpWorkAgeList_get(this.initial_current.CompCode, this.selectedEmployee.worker_code).then(async (res) => {
      this.workerList = await res;

      let age18_30: number = 0; // อายุ 18-30
      let age31_40: number = 0; // อายุ 31-40
      let age41_55: number = 0; // อายุ 41-55

      for (let i = 0; i < this.workerList.length; i++) {
        const workerAgeCode = parseInt(this.workerList[i].age_code, 10);

        if (!isNaN(workerAgeCode)) {
          if (workerAgeCode >= 18 && workerAgeCode <= 30) {
            age18_30++;
          } else if (workerAgeCode >= 31 && workerAgeCode <= 40) {
            age31_40++;
          } else if (workerAgeCode >= 41 && workerAgeCode <= 55) {
            age41_55++;
          }
        }
      }

      const labelsWithData = [];
      if (age18_30 > 0) {
        labelsWithData.push('18-30' + ' ' + this.title_year[this.initial_current.Language] + ' ' + '(' + age18_30 + ')' + ' ' + this.title_Person[this.initial_current.Language]);
      }
      if (age31_40 > 0) {
        labelsWithData.push('31-40 ' + ' ' + this.title_year[this.initial_current.Language] + ' ' + '(' + age31_40 + ')' + ' ' + this.title_Person[this.initial_current.Language]);
      }
      if (age41_55 > 0) {
        labelsWithData.push('41-55' + ' ' + this.title_year[this.initial_current.Language] + ' ' + '(' + age41_55 + ')' + ' ' + this.title_Person[this.initial_current.Language]);
      }
      const getRandomSoftColor = () => {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
          color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
      };

      const numberOfColorsNeeded = 10; // จำนวนสีที่ต้องการสุ่ม
      const initialColors = ['#FF6384', '#36A2EB']; // สีเริ่มต้น
      const randomSoftColors = initialColors.concat(
        Array.from({ length: numberOfColorsNeeded - initialColors.length }, getRandomSoftColor)
      );

      this.doughnut7.datasets[0].backgroundColor = randomSoftColors;

      this.doughnut7.labels = labelsWithData;
      this.doughnut7.datasets[0].data = [age18_30, age31_40, age41_55].filter(count => count > 0);
      this.updateChart7();
    });
  }

  updateChart7() {
    if (this.chart && this.chart.chart && this.chart.chart.config) {
      this.chart.chart.update();
    }
  }
  //

  /// อายุงาน
  doughnut8: ChartData = {
    labels: ['0-2', '3-5', '6-10', '11-15', '16'],
    datasets: [
      {
        data: [0, 0, 0, 0, 0, 0],
        label: 'อายุงาน',
      }
    ]
  };

  doughnutChartOptions8: ChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
  };

  doLoadChart8() {
    this.employeeService.getDashWorkAgeList_get(this.initial_current.CompCode, this.selectedEmployee.worker_code).then(async (res) => {
      this.workerList = await res;

      let age0_2: number = 0; // อายุ 0-2
      let age3_5: number = 0; // อายุ 3-5
      let age6_10: number = 0; // อายุ 6-10
      let age11_15: number = 0; // อายุ 11-15
      let age16: number = 0; // อายุ 16

      for (let i = 0; i < this.workerList.length; i++) {
        const workerAge = parseInt(this.workerList[i].work_age, 10);

        if (!isNaN(workerAge)) {
          if (workerAge >= 0 && workerAge <= 2) {
            age0_2++;
          } else if (workerAge >= 3 && workerAge <= 5) {
            age3_5++;
          } else if (workerAge >= 6 && workerAge <= 10) {
            age6_10++;
          } else if (workerAge >= 11 && workerAge <= 15) {
            age11_15++;
          } else if (workerAge >= 16) {
            age16++;
          }
        }
      }
      
      const labelsWithData = [];
      if (age0_2 > 0) {
        labelsWithData.push('0-2 ' + ' ' + this.title_year[this.initial_current.Language] + ' ' + '(' + age0_2 + ')' + ' ' + this.title_Person[this.initial_current.Language]);
      }
      if (age3_5 > 0) {
        labelsWithData.push('3-5 ' + ' ' + this.title_year[this.initial_current.Language] + ' ' + '(' + age3_5 + ')' + ' ' + this.title_Person[this.initial_current.Language]);
      }
      if (age6_10 > 0) {
        labelsWithData.push('6-10 ' + ' ' + this.title_year[this.initial_current.Language] + ' ' + '(' + age6_10 + ')' + ' ' + this.title_Person[this.initial_current.Language]);
      }
      if (age11_15 > 0) {
        labelsWithData.push('11-15 ' + ' ' + this.title_year[this.initial_current.Language] + ' ' + '(' + age11_15 + ')' + ' ' + this.title_Person[this.initial_current.Language]);
      }
      if (age16 > 0) {
        labelsWithData.push(this.title_morethan[this.initial_current.Language] + ' ' + this.title_year[this.initial_current.Language] + ' ' + '(' + age16 + ')' + ' ' + this.title_Person[this.initial_current.Language]);
      }
      const getRandomSoftColor = () => {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
          color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
      };

      const numberOfColorsNeeded = 10;
      const initialColors = ['#FF6384', '#36A2EB'];
      const randomSoftColors = initialColors.concat(
        Array.from({ length: numberOfColorsNeeded - initialColors.length }, getRandomSoftColor)
      );

      this.doughnut8.datasets[0].backgroundColor = randomSoftColors;

      this.doughnut8.labels = labelsWithData;
      this.doughnut8.datasets[0].data = [age0_2, age3_5, age6_10, age11_15, age16].filter(count => count > 0);

       this.updateChart8();
    });
  }


  updateChart8() {
    if (this.chart && this.chart.chart && this.chart.chart.config) {
      this.chart.chart.update();
    }
  }

  //

  /// ตำแหน่งงาน

  doughnut9: ChartData = {
    labels: [],
    datasets: [
      {
        data: [],
        label: 'ตำแหน่งงาน',
      }
    ]
  };

  doughnutChartOptions9: ChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
  };


  doLoadChart9() {
    this.employeeService.getDashPositionList(this.initial_current.CompCode, this.selectedEmployee.worker_code).then(async (res) => {
      this.workerList = await res;
      console.log(res, 'res')
      let regularWorkers: number = 0;

      const positionData: { [key: string]: number } = {};

      for (let i = 0; i < this.workerList.length; i++) {
        const positionName = this.workerList[i].position_name;
        if (!positionData[positionName]) {
          positionData[positionName] = 1;
        } else {
          positionData[positionName]++;
        }
      }
      const getRandomSoftColor = () => {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
          color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
      };

      const numberOfColorsNeeded = 10; // จำนวนสีที่ต้องการสุ่ม
      const initialColors = ['#FF6384', '#36A2EB']; // สีเริ่มต้น
      const randomSoftColors = initialColors.concat(
        Array.from({ length: numberOfColorsNeeded - initialColors.length }, getRandomSoftColor)
      );

      this.doughnut9.datasets[0].backgroundColor = randomSoftColors;


      const labels = Object.keys(positionData).filter((label) => positionData[label] > 0);
      const data = labels.map((label) => positionData[label]);
      this.doughnut9.labels = labels.map((label) => `${label} (${positionData[label]} ` + this.title_Person[this.initial_current.Language] + ')');
      this.doughnut9.datasets[0].data = data;
      this.updateChart9();

    });
  }

  updateChart9() {
    if (this.chart && this.chart.chart && this.chart.chart.config) {
      this.chart.chart.update();
    }
  }

  //
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

import { DatePipe } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router,NavigationExtras } from '@angular/router';
import { ConfirmationService, MenuItem, MessageService, MegaMenuItem, ConfirmEventType, } from 'primeng/api';
import { Table } from 'primeng/table';
import { AppConfig } from '../../../../config/config';
import { InitialCurrent } from '../../../../config/initial_current';
 import { EmptypeService } from '../../../../services/emp/policy/emptype.service';
import * as XLSX from 'xlsx';
import { TaskComponent } from 'src/app/components/usercontrol/task/task.component';
import { EmployeeService } from 'src/app/services/emp/worker.service';
import { EmployeeModel } from 'src/app/models/employee/employee';
@Component({
  selector: 'app-bloodtype',
  templateUrl: './bloodtype.component.html',
  styleUrls: ['./bloodtype.component.scss']
})
export class BloodtypeComponent implements OnInit {
 
  constructor(
    private employeeService: EmployeeService,
    private typeService: EmptypeService,
    private router:Router,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private datePipe: DatePipe
  ) { }

  barChartData: any[] = [];
  basicOptions: any;

  employee_list: EmployeeModel[] = [];
  selectedemployee: EmployeeModel = new EmployeeModel();
  workerDetail: EmployeeModel = new EmployeeModel();
  worker_list: EmployeeModel[] = [];

 

  ngOnInit(): void {
    this.doGetInitialCurrent()
    this.doLoadEmployee();

    this.doLoadLanguage()
    setTimeout(() => {
 
    }, 500);
  }

  public initial_current:InitialCurrent = new InitialCurrent();  
  doGetInitialCurrent(){    
    this.initial_current = JSON.parse(localStorage.getItem(AppConfig.SESSIONInitial) || '{}');
    if (!this.initial_current) {
      this.router.navigateByUrl('login');
    }       
  }
 
  title_emp: { [key: string]: string } = { EN: "Employee", TH: "พนักงาน" };
  title_policy: { [key: string]: string } = { EN: "Policy", TH: "นโยบาย" };
  title_emptype: { [key: string]: string } = { EN: "Employee Type", TH: "ประเภทพนักงาน" };

  doLoadLanguage(){
    if(this.initial_current.Language == "TH"){
      
      
    }
  }
  
  @ViewChild(TaskComponent) taskCom: { taskType: string; doLoadTask: () => void; } | undefined;
  @ViewChild('TABLE') table: ElementRef | any = null;


  workerCurrent: number = 0;


  async doLoadEmployee() {
    try {
      const res = await this.employeeService.worker_get(this.initial_current.CompCode, "");
      this.employee_list = res.map((element: EmployeeModel) => {
        element.worker_hiredate = new Date(element.worker_hiredate);
        return element;
      });
      this.workerCurrent = this.employee_list.length;
      this.barChartData = [
        {
          name: 'Worker Current',
          value: this.workerCurrent,
        },
      ];
    } catch (error) {
      console.error(error);
    }
  }





  exportAsExcel()
  {
    const ws: XLSX.WorkSheet=XLSX.utils.table_to_sheet(this.table.nativeElement);//converts a DOM TABLE element to a worksheet
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    XLSX.writeFile(wb, 'Export_emptype.xlsx');

  }

}

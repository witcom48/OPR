import { Component, OnInit } from '@angular/core';

import { MegaMenuItem,MenuItem } from 'primeng/api';

import { PrjectMonitorModel } from '../../../models/project/project_monitor'
import { ProjectTypeModel } from '../../../models/project/project_type';
import { ProjectBusinessModel } from '../../../models/project/project_business';
import { PrjectEmpdailyModel } from '../../../models/project/project_empdaily';
import { PrjectEmpModel } from '../../../models/project/project_emp';

@Component({
  selector: 'app-project-monitor',
  templateUrl: './project-monitor.component.html',
  styleUrls: ['./project-monitor.component.scss']
})
export class ProjectMonitorComponent implements OnInit {

  items: MenuItem[] = [];
  toolbar_menu: MenuItem[] = [];

  project_monitor: PrjectMonitorModel[] = [];
  ptype_list: ProjectTypeModel[] = [];
  pbusiness_list: ProjectBusinessModel[] = [];

  edit_workflow: boolean = false;

  constructor() { }

  ngOnInit(): void {
    this.doLoadSimple()
    this.doLoadProjectMonitor()
    this.doLoadProjectType()
    this.doLoadProjectBusiness()
    this.calculateTotal()
    this.doLoadEmp()
    this.doLoadEmpCost()
  }

  doLoadSimple(){
    this.toolbar_menu = [
      {
        label:'Save',
        icon:'pi pi-fw pi-save',
        
      },
      {
          label:'Export',
          icon:'pi pi-fw pi-file-export',
          command: (event) => {
            console.log('Edit')
        }        
      },    
    ];

 
    this.items = [
   
      {
        label:'New',
        icon:'pi pi-fw pi-plus',
        
      },
      {
          label:'Edit',
          icon:'pi pi-fw pi-pencil',
          command: (event) => {
            console.log('Edit')
        }        
      },    
      {
          label:'Delete',
          icon:'pi pi-fw pi-trash',          
      }
     
      ,    
      {
          label:'Import',
          icon:'pi pi-fw pi-file-import',          
      }
      ,    
      {
          label:'Export',
          icon:'pi pi-fw pi-file-export',          
      }
      
    ];

  }

  selectedProjectMonitor: PrjectMonitorModel = new PrjectMonitorModel;
  doLoadProjectMonitor(){
    var tmp = new PrjectMonitorModel();

    tmp.project_id = "SHT001";
    tmp.project_code = "100008.00";
    tmp.project_name_th = "บริษัทควอลิตี้";
    tmp.project_name_en = "Quarity";

    tmp.project_type = "ประจำ";
    tmp.project_business = "ห้างฯ";
   
    tmp.project_manpower = 4;
    tmp.project_working = 2;
    tmp.project_leave = 1;
    tmp.project_absent = 1;
  
    tmp.project_cost = 3500;
    tmp.project_pay = 3000;

    tmp.root = true;

    this.project_monitor.push(tmp);


    tmp = new PrjectMonitorModel();

    tmp.project_id = "SHT00ถ";
    tmp.project_code = "100008.00";
    tmp.project_name_th = "บริษัทควอลิตี้";
    tmp.project_name_en = "Quarity";

    tmp.project_type = "พนักงานทำความสะอาด";
    tmp.project_business = "70001.1";
   
    tmp.project_manpower = 3;
    tmp.project_working = 2;
    tmp.project_leave = 1;
    tmp.project_absent = 0;
  
    tmp.project_cost = 3000;
    tmp.project_pay = 2500;

    this.project_monitor.push(tmp);

    tmp = new PrjectMonitorModel();

    tmp.project_id = "SHT007";
    tmp.project_code = "100008.00";
    tmp.project_name_th = "บริษัทควอลิตี้";
    tmp.project_name_en = "Quarity";

    tmp.project_type = "พนักงานห้องนํ้า";
    tmp.project_business = "70013";
   
    tmp.project_manpower = 1;
    tmp.project_working = 1;
    tmp.project_leave = 0;
    tmp.project_absent = 0;
  
    tmp.project_cost = 500;
    tmp.project_pay = 500;

    this.project_monitor.push(tmp);



    tmp = new PrjectMonitorModel();

    tmp.project_id = "SHT002";
    tmp.project_code = "100009.00";
    tmp.project_name_th = "แฟชั่นฯ";
    tmp.project_name_en = "Fasion";    
    tmp.project_type = "ประจำ";
    tmp.project_business = "ห้างฯ";
   
    tmp.project_manpower = 20;
    tmp.project_working = 18;
    tmp.project_leave = 0;
    tmp.project_absent = 2;
  
    tmp.project_cost = 24000;
    tmp.project_pay = 22000;

    tmp.root = true;

    this.project_monitor.push(tmp);
    
  }

  onRowSelectProject(event: Event) {
    this.edit_workflow= true;
  }

  doLoadProjectType(){
    var tmp = new ProjectTypeModel();

    tmp.ptype_code = "SHT001";
    tmp.ptype_name_th = "ประจำ";
    tmp.ptype_name_en = "Regular";
    
    tmp.modified_by = "hropr";

    this.ptype_list.push(tmp);

    tmp = new ProjectTypeModel();

    tmp.ptype_code = "SHT002";
    tmp.ptype_name_th = "ชั่วคราว";
    tmp.ptype_name_en = "Temporary";
    
    tmp.modified_by = "hropr";

    this.ptype_list.push(tmp);

    

  }

  doLoadProjectBusiness(){
    var tmp = new ProjectBusinessModel();

    tmp.pbusiness_code = "BUS001";
    tmp.pbusiness_name_th = "ห้างฯ";
    tmp.pbusiness_name_en = "Store";
    
    tmp.modified_by = "hropr";

    this.pbusiness_list.push(tmp);

    tmp = new ProjectBusinessModel();

    tmp.pbusiness_code = "BUS002";
    tmp.pbusiness_name_th = "มหาวิทยาลัย";
    tmp.pbusiness_name_en = "University";
    
    tmp.modified_by = "hropr";

    this.pbusiness_list.push(tmp);

    

  }


  total_emp: number = 0;
  total_working: number = 0;
  total_leave: number = 0;
  total_absent: number = 0;
  total_cost: number = 0;
  total_payment: number = 0;



  calculateTotal() {

    this.total_emp = 0;
    this.total_working = 0;
    this.total_leave = 0;
    this.total_absent = 0;
    this.total_cost = 0;
    this.total_payment = 0;
    

    for (let project of this.project_monitor) {
      if (project.root) {
        this.total_emp += project.project_manpower;
        this.total_working += project.project_working;
        this.total_leave += project.project_leave;

        this.total_cost += project.project_cost;
        this.total_payment += project.project_pay;
      }
    } 

    this.total_absent = this.total_working - this.total_leave;

  }

  timesheet_list: PrjectEmpdailyModel[] = [];
  selectedDate: PrjectEmpdailyModel = new PrjectEmpdailyModel;
  doLoadEmp(){
    var tmp = new PrjectEmpdailyModel();

    tmp.daily_id = "00001";
    tmp.ppos_code = "70001";
    tmp.ppos_name_th = "พนักงานทำความสะอาด";

    tmp.emp_code = "220108001";
    tmp.emp_name = "ศรัณย์ ศรีห่วง";
    tmp.emp_position = "พนักงานประจำ";   
    
    tmp.timecard_shift = "DAY001";   
    tmp.timecard_shiftin = "08:00";   
    tmp.timecard_shiftout = "19:00";   
    tmp.timecard_daytype = "N";   
    tmp.timecard_in = "07:56";   
    tmp.timecard_out = "19:15"; 
    
    tmp.timecard_working = "09:00"; 
    tmp.timecard_late = "-"; 
    tmp.timecard_overtime = "-"; 
  
    this.timesheet_list.push(tmp);

    
  }

  project_emps: PrjectEmpModel[] = [];
  selectedEmp: PrjectEmpModel = new PrjectEmpModel;
  doLoadEmpCost(){
    var tmp = new PrjectEmpModel();

    tmp.ppos_code = "70001";
    tmp.ppos_name_th = "พนักงานทำความสะอาด";

    tmp.emp_code = "220108001";
    tmp.emp_name = "ศรัณย์ ศรีห่วง";
    tmp.emp_position = "พนักงานประจำ";    
    tmp.pcost_allw1 = 10000.00;
    tmp.pcost_allw2 = 67.50;
    tmp.pcost_allw3 = 1;
    tmp.pcost_allw4 = 1;
    tmp.pcost_allw5 = 1;   

    tmp.approve_status = true;
    this.project_emps.push(tmp);

    tmp = new PrjectEmpModel();

    tmp.ppos_code = "70001";
    tmp.ppos_name_th = "พนักงานทำความสะอาด";

    tmp.emp_code = "220108002";
    tmp.emp_name = "อำพล ลำพูน";
    tmp.emp_position = "พนักงานชั่วคราว";    
    tmp.pcost_allw1 = 9000.00;
    tmp.pcost_allw2 = 50.00;
    tmp.pcost_allw3 = 1;
    tmp.pcost_allw4 = 1;
    tmp.pcost_allw5 = 1; 
        
    this.project_emps.push(tmp);
  }
  

}

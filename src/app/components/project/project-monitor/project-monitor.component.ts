import { Component, OnInit, ViewChild} from '@angular/core';
import { MegaMenuItem,MenuItem } from 'primeng/api';
import { ActivatedRoute, NavigationExtras } from '@angular/router';
import { Router } from '@angular/router';

import {ConfirmationService, ConfirmEventType, MessageService} from 'primeng/api';
import * as XLSX from 'xlsx';
import { DatePipe } from '@angular/common';


import { AppConfig } from '../../../config/config';
import { InitialCurrent } from '../../../config/initial_current';
import { RadiovalueModel } from '../../../models/project/radio_value';

import { ProbusinessModel, ProtypeModel, ProslipModel, ProuniformModel } from '../../../models/project/policy/pro_genaral';

import { ProjectService } from '../../../services/project/project.service';
import { ProgenaralService } from '../../../services/project/pro_genaral.service';

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

  selectedDate_fillter :Date = new Date()

  edit_workflow: boolean = false;

  constructor(
    private router:Router, 
    private route: ActivatedRoute,    
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private datePipe: DatePipe,      
    private projectService: ProjectService,      
    private progenaralService:ProgenaralService
  ) {    
   }

  public initial_current:InitialCurrent = new InitialCurrent();  
  doGetInitialCurrent(){    
    this.initial_current = JSON.parse(localStorage.getItem(AppConfig.SESSIONInitial) || '{}');
    if (!this.initial_current) {
      this.router.navigateByUrl('');
    }       
  }

  doLoadLanguage(){
    if(this.initial_current.Language == "TH"){
      
    }     

  }

  ngOnInit(): void {
    this.doLoadLanguage()
    this.doGetInitialCurrent()
    this.doLoadMenu()
    this.doLoadProjectType()
    this.doLoadProjectBusiness()

    let dateString = '2023-01-10T00:00:00'
    this.selectedDate_fillter = new Date(dateString);


    setTimeout(() => {
      this.doLoadProjectMonitor()
    }, 300);


    this.doLoadEmp()
    this.doLoadEmpCost()
  }

  doLoadMenu(){
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
    this.projectService.project_monitor(this.initial_current.CompCode, this.selectedDate_fillter).then((res) => {    
      console.log(res)
      this.project_monitor = res;  
    });

    setTimeout(() => {
      this.calculateTotal()
    }, 500);
    
  }

  onRowSelectProject(event: Event) {
    this.edit_workflow= true;
  }


  probusiness_list: RadiovalueModel[] = []; 
  doLoadProjectBusiness(){   
    var tmp = new RadiovalueModel();
    this.probusiness_list = []   

    this.progenaralService.probusiness_get().then((res) => {          
      var list: ProbusinessModel[] = [];     
      list = res;          
      if(list.length > 0){
        for (let i = 0; i < list.length; i++) {  
          var tmp = new RadiovalueModel();  
          tmp.value = list[i].probusiness_id;      
          if(this.initial_current.Language == "EN"){        
            tmp.text = list[i].probusiness_name_en;        
          }
          else{
            tmp.text = list[i].probusiness_name_th;      
          }
          this.probusiness_list.push(tmp);                         
        }      
      }
    });
  }


  protype_list: RadiovalueModel[] = [];  
  doLoadProjectType(){   
    var tmp = new RadiovalueModel();
    this.protype_list = []   

    this.progenaralService.protype_get().then((res) => {          
      var list: ProtypeModel[] = [];     
      list = res;          
      if(list.length > 0){
        for (let i = 0; i < list.length; i++) {  
          var tmp = new RadiovalueModel();  
          tmp.value = list[i].protype_id;      
          if(this.initial_current.Language == "EN"){        
            tmp.text = list[i].protype_name_en;        
          }
          else{
            tmp.text = list[i].protype_name_th;      
          }
          this.protype_list.push(tmp);                         
        }      
      }
    });
  }




  total_emp: number = 0;
  total_working: number = 0;
  total_leave: number = 0;
  total_absent: number = 0;
  total_cost: number = 0;
  total_payment: number = 0;

  total_project: number = 0;


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

        this.total_project += 1
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
    tmp.pcost_allw1 = 350.00;
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
    tmp.pcost_allw1 = 500.00;
    tmp.pcost_allw2 = 50.00;
    tmp.pcost_allw3 = 1;
    tmp.pcost_allw4 = 1;
    tmp.pcost_allw5 = 1; 
        
    this.project_emps.push(tmp);
  }
  

}

import { Component, OnInit } from '@angular/core';
import { MegaMenuItem,MenuItem } from 'primeng/api';

import { PrjectEmpdailyModel } from '../../../models/project/project_empdaily';
import { PrjectJobtypeModel } from '../../../models/project/project_jobtype';

@Component({
  selector: 'app-project-timesheet',
  templateUrl: './project-timesheet.component.html',
  styleUrls: ['./project-timesheet.component.scss']
})
export class ProjectTimesheetComponent implements OnInit {

  items: MenuItem[] = [];
  toolbar_menu: MenuItem[] = [];

  timesheet_list: PrjectEmpdailyModel[] = [];
  jobtype_list: PrjectJobtypeModel[] = [];
  edit_daily: boolean = false;

  constructor() { }

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

  ngOnInit(): void {
    this.doLoadSimple()
    this.doLoadEmp()
    this.doLoadJobType()
  }

  selectedDate: PrjectEmpdailyModel = new PrjectEmpdailyModel;
  doLoadEmp(){
    var tmp = new PrjectEmpdailyModel();

    tmp.daily_id = "00001";
    tmp.daily_job = "งานประจำ";
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

    tmp = new PrjectEmpdailyModel();

    tmp.daily_id = "00002";
    tmp.daily_job = "งานประจำ";
    tmp.ppos_code = "70001";
    tmp.ppos_name_th = "พนักงานทำความสะอาด";

    tmp.emp_code = "220108002";
    tmp.emp_name = "มานะ อดทน";
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

  onRowSelectDaily(event: Event) {
    this.edit_daily= true;
  
  }

  selectedJobtype: PrjectJobtypeModel = new PrjectJobtypeModel;
  doLoadJobType(){
    var tmp = new PrjectJobtypeModel();

    tmp.pjobtype_code = "A";
    tmp.pjobtype_name_th = "งานประจำ";
    tmp.pjobtype_name_en = "งานประจำ";
    this.jobtype_list.push(tmp);

    tmp = new PrjectJobtypeModel();

    tmp.pjobtype_code = "B";
    tmp.pjobtype_name_th = "งานเคลีย์";
    tmp.pjobtype_name_en = "งานเคลีย์";
      
    this.jobtype_list.push(tmp);
  }

}


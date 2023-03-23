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

import { ProjectModel } from '../../../models/project/project';
import { ProjectService } from '../../../services/project/project.service';

import { TimecardsModel } from '../../../models/attendance/timecards';
import { TimecardService } from 'src/app/services/attendance/timecards.service';

import { ShiftModels } from 'src/app/models/attendance/shift';
import { ShiftServices } from 'src/app/services/attendance/shift.service';

import { DaytypeModels } from 'src/app/models/attendance/daytype';

import { PrjectEmpdailyModel } from '../../../models/project/project_empdaily';
import { PrjectJobtypeModel } from '../../../models/project/project_jobtype';

import { SearchEmpComponent } from '../../../components/usercontrol/search-emp/search-emp.component';


@Component({
  selector: 'app-project-timesheet',
  templateUrl: './project-timesheet.component.html',
  styleUrls: ['./project-timesheet.component.scss']
})
export class ProjectTimesheetComponent implements OnInit {

  @ViewChild(SearchEmpComponent) selectEmp: any;

  menu_timecard: MenuItem[] = [];
  toolbar_menu: MenuItem[] = [];

  timesheet_list: PrjectEmpdailyModel[] = [];
  jobtype_list: PrjectJobtypeModel[] = [];
  edit_daily: boolean = false;

  manage_title: string = "Time sheet"
  displayManage: boolean = false;
  searchEmp: boolean = false;
  position: string = "right";

  title_confirm:string = "Are you sure?";
  title_confirm_record:string = "Confirm to record";
  title_confirm_delete:string = "Confirm to delete";
  title_confirm_yes:string = "Yes";
  title_confirm_no:string = "No";

  title_confirm_cancel:string = "You have cancelled";

  title_submit:string = "Submit";
  title_cancel:string = "Cancel";


  constructor(
    private router:Router, 
    private route: ActivatedRoute,    
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private datePipe: DatePipe,   
    private shiftServices: ShiftServices,
    private projectService: ProjectService,  
    private timecardService: TimecardService,
  ) {    
   }

  
  ngOnInit(): void {
    this.doLoadLanguage()
    this.doGetInitialCurrent()
    this.doLoadMenu()

    setTimeout(() => {
      this.doLoadProject()
      this.doLoadPolShift()
      this.doLoadPolDaytype()
    }, 300);

    let dateString = '2023-01-10T00:00:00'
    this.selectedDate_fillter = new Date(dateString);

    setTimeout(() => {

      if(this.project_list_cbb.length > 0)
      {
        this.selectedProject_fillter = this.project_list_cbb[0]

        this.doLoadTimecard()
      }

    }, 800);

  }

  doLoadLanguage(){
    if(this.initial_current.Language == "TH"){
      this.title_confirm = "ยืนยันการทำรายการ";
      this.title_confirm_record = "คุณต้องการบันทึกการทำรายการ";
      this.title_confirm_delete = "คุณต้องการลบรายการ";

      this.title_confirm_yes = "ใช่";
      this.title_confirm_no = "ยกเลิก";
      this.title_confirm_cancel = "คุณยกเลิกการทำรายการ";
      
      this.title_submit = "ตกลง";
      this.title_cancel = "ปิด"; 
    }     

  }

  public initial_current:InitialCurrent = new InitialCurrent();  
  doGetInitialCurrent(){    
    this.initial_current = JSON.parse(localStorage.getItem(AppConfig.SESSIONInitial) || '{}');
    if (!this.initial_current) {
      this.router.navigateByUrl('');
    }       
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
            this.displayManage = true
        }        
      },    
    ];

 
    this.menu_timecard = [
   
      {
        label:'Add',
        icon:'pi pi-fw pi-plus',
        command: (event) => {
          this.searchEmp = true
      }   
        
      },
      {
          label:'Edit',
          icon:'pi pi-fw pi-pencil',
          command: (event) => {
            this.displayManage = true
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

  project_list_cbb: RadiovalueModel[] = [];
  selectedProject_fillter: RadiovalueModel = new RadiovalueModel;
  selectedDate_fillter :Date = new Date()
  doLoadProject(){   
    this.project_list_cbb = []   
    this.projectService.project_get(this.initial_current.CompCode, "").then((res) => {          
      var list: ProjectModel[] = [];     
      list = res;          
      if(list.length > 0){

        for (let i = 0; i < list.length; i++) {  
          var tmp = new RadiovalueModel();  
          tmp.value = list[i].project_code;      
          if(this.initial_current.Language == "EN"){        
            tmp.text = list[i].project_name_en;        
          }
          else{
            tmp.text = list[i].project_name_th;      
          }
          this.project_list_cbb.push(tmp);                         
        }  
                        
        
      }
    });
  }


  timecard_list: TimecardsModel[] = [];
  selectedTimecard: TimecardsModel = new TimecardsModel();
  edit_timecard: boolean = false;

  timein: string | null | undefined
  timeout: string | null | undefined

  doLoadTimecard(){

    
    this.timecardService.timecard_get(this.initial_current.CompCode, this.selectedProject_fillter.value, "", this.selectedDate_fillter, this.selectedDate_fillter).then((res) =>{
      this.timecard_list = res;   
    });
  }

  emp_name:string = "" 
  onRowSelectTimecard(event: Event) {
    if(this.initial_current.Language == "EN"){
      this.emp_name = this.selectedTimecard.worker_name_en
    }
    else{
      this.emp_name = this.selectedTimecard.worker_name_th
    }

    this.doLoadSelectedDaytype(this.selectedTimecard.timecard_daytype)
    this.doLoadSelectedShift(this.selectedTimecard.shift_code)

    this.timein = this.datePipe.transform(this.selectedTimecard.timecard_in, 'HH:mm')
    this.timeout = this.datePipe.transform(this.selectedTimecard.timecard_out, 'HH:mm')

  }

  pad(num:number, size:number): string {
    let s = num+"";
    while (s.length < size) s = "0" + s;
    return s;
  }

  doConvertHHMM(time_min:number) : string {    
    var hrs = Math.floor(time_min / 60);
    var min = time_min - (hrs * 60);
    return this.pad(hrs, 2) + ":" + this.pad(min, 2);
  }

  doGetMinute(HHmm:string) : number {    

    var splitted = HHmm.split(":", 2); 

    var result = Number(splitted[0]) * 60;
    result += Number(splitted[1]);        

    return result;
  }

  doFillter(){
    this.doLoadTimecard()
  }

  close_manage(){
    this.displayManage = false
  }


  shift_list: RadiovalueModel[] = [];
  selectedShift: RadiovalueModel = new RadiovalueModel;
  doLoadPolShift(){   
    var tmp = new ShiftModels();
    this.shift_list = []   
    this.shiftServices.shift_get(tmp).then((res) => {          
      var list: ShiftModels[] = [];     
      list = res;          
      if(list.length > 0){
        for (let i = 0; i < list.length; i++) {  
          var tmp = new RadiovalueModel();  
          tmp.value = list[i].shift_code;      
          if(this.initial_current.Language == "EN"){        
            tmp.text = list[i].shift_name_en;        
          }
          else{
            tmp.text = list[i].shift_name_th;      
          }
          this.shift_list.push(tmp);                         
        }      
      }
    });
  }
  doLoadSelectedShift(value:string){
    for (let i = 0; i < this.shift_list.length; i++) {   
      if(this.shift_list[i].value==value ){
        this.selectedShift = this.shift_list[i];
        break;         
      }                      
    }
  }

  daytype_list: RadiovalueModel[] = [];
  selectedDaytype: RadiovalueModel = new RadiovalueModel;
  doLoadPolDaytype(){   
   
    this.daytype_list = []   
    this.timecardService.daytype_get().then((res) => {          
      var list: DaytypeModels[] = [];     
      list = res;          
      if(list.length > 0){
        for (let i = 0; i < list.length; i++) {  
          var tmp = new RadiovalueModel();  
          tmp.value = list[i].daytype_code;      
          if(this.initial_current.Language == "EN"){        
            tmp.text = list[i].daytype_name_en;        
          }
          else{
            tmp.text = list[i].daytype_name_th;      
          }
          this.daytype_list.push(tmp);                         
        }      
      }
    });
  }
  doLoadSelectedDaytype(value:string){
    for (let i = 0; i < this.daytype_list.length; i++) {   
      if(this.daytype_list[i].value==value ){
        this.selectedDaytype = this.daytype_list[i];
        break;         
      }                      
    }
  }

  timesheet_summit(){
    this.confirmationService.confirm({
      message: this.title_confirm_record,
      header: this.title_confirm,
      icon: 'pi pi-exclamation-triangle',
      accept: () => {

        this.selectedTimecard.company_code = this.initial_current.CompCode     

        this.selectedTimecard.project_code = this.selectedProject_fillter.value
        this.selectedTimecard.timecard_color = "1"
        this.selectedTimecard.timecard_daytype = this.selectedDaytype.value
        this.selectedTimecard.shift_code = this.selectedShift.value

        this.selectedTimecard.timecard_workdate = new Date(this.selectedDate_fillter)
        this.selectedTimecard.timecard_in = this.timein
        this.selectedTimecard.timecard_out = this.timeout
        
        this.timecardService.timesheet_record(this.selectedTimecard).then((res) => {       
          let result = JSON.parse(res);  
          if(result.success){  
            this.messageService.add({severity:'success', summary: 'Success', detail: "Record Success.."});

            this.displayManage = false                        
          }
          else{  
            this.messageService.add({severity:'error', summary: 'Error', detail: "Record Not Success.."});   
          }  
        })


         
      },
      reject: () => {
        this.messageService.add({severity:'warn', summary:'Cancelled', detail:this.title_confirm_cancel});
      }
    });
  }


  select_emp(){
    console.log(this.selectEmp.selectedEmployee.worker_code)

    this.selectedTimecard.company_code = this.selectEmp.selectedEmployee.company_code
    this.selectedTimecard.worker_code = this.selectEmp.selectedEmployee.worker_code
    this.selectedTimecard.timecard_workdate = this.selectedDate_fillter

    if(this.initial_current.Language == "EN"){
      this.emp_name = this.selectEmp.selectedEmployee.worker_fname_en + " " + this.selectEmp.selectedEmployee.worker_lname_en
    }
    else{
      this.emp_name = this.selectEmp.selectedEmployee.worker_fname_th + " " + this.selectEmp.selectedEmployee.worker_lname_th
    }

    this.searchEmp = false
    this.displayManage = true

  }

  close_searchemp(){
    this.searchEmp = false
  }





}


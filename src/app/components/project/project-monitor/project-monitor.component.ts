import { Component, OnInit, ViewChild, ElementRef} from '@angular/core';
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
import { TimecardsModel } from '../../../models/attendance/timecards';
import { TimecardService } from 'src/app/services/attendance/timecards.service';
import { ProjectDetailService } from '../../../services/project/project_detail.service';
import { ProjobmainModel } from '../../../models/project/project_jobmain';
import { JobMonitorModel } from '../../../models/project/job_monitor'
import { ProareaModel } from 'src/app/models/project/project_proarea';
import { ProgroupModel } from 'src/app/models/project/project_group';

@Component({
  selector: 'app-project-monitor',
  templateUrl: './project-monitor.component.html',
  styleUrls: ['./project-monitor.component.scss']
})
export class ProjectMonitorComponent implements OnInit {

  @ViewChild('scrollMe')
  private myScrollContainer!: ElementRef;
  home: any;
  itemslike: MenuItem[] = [];
  items: MenuItem[] = [];
  toolbar_menu: MenuItem[] = [];
  menu_timecard: MenuItem[] = [];

  manage_title: string = "Time sheet"
  displayManage: boolean = false;
  searchEmp: boolean = false;
  position: string = "right";

  

  selectedType_fillter :string = ""
  selectedBusiness_fillter :string = ""
//
  selectedProarea_fillter :string = ""
  selectedProgroup_fillter :string = ""
//


  business_fillter :boolean = false
  type_fillter :boolean = false
//
  proarea_fillter :boolean = false
  progroup_fillter :boolean = false
//

  selectedDate_fillter :Date = new Date()
  selectedToDate_fillter :Date = new Date()

  // edit_workflow: boolean = false;

  title_modified_by: {[key: string]: string} = {  EN: "Edit by",  TH: "ผู้ทำรายการ"}
  title_modified_date: {[key: string]: string} = {  EN: "Edit date",  TH: "วันที่ทำรายการ"}
  title_page_from: {[key: string]: string} = {  EN: "Showing",  TH: "แสดง"}
  title_page_to: {[key: string]: string} = {  EN: "to",  TH: "ถึง"}
  title_page_total: {[key: string]: string} = {  EN: "of",  TH: "จาก"}
  title_page_record: {[key: string]: string} = {  EN: "entries",  TH: "รายการ"}

  title_date: {[key: string]: string} = {  EN: "Date",  TH: "วันที่"}
  title_project_probusiness: {[key: string]: string} = {  EN: "Business",  TH: "ประเภทธุรกิจ"}
  title_project_protype: {[key: string]: string} = {  EN: "Type",  TH: "ประเภทงาน"}
  //
  title_project_proarea: {[key: string]: string} = {  EN: "Area",  TH: "พื้นที่"}
  title_project_progroup: {[key: string]: string} = {  EN: "Group",  TH: "กลุ่ม"}

  //

  title_project_code: {[key: string]: string} = {  EN: "Code",  TH: "รหัสโครงการ"}
  title_project_name: {[key: string]: string} = {  EN: "Description",  TH: "โครงการ"}
  title_emp_total: {[key: string]: string} = {  EN: "Manpower",  TH: "อัตรากำลัง"}
  title_working: {[key: string]: string} = {  EN: "Working",  TH: "มาทำงาน"}
  title_leave: {[key: string]: string} = {  EN: "Leave",  TH: "ลางาน"}
  title_absent: {[key: string]: string} = {  EN: "Absent",  TH: "ขาดงาน"}
  title_cost: {[key: string]: string} = {  EN: "Cost",  TH: "ต้นทุน"}
  title_actual: {[key: string]: string} = {  EN: "Actual",  TH: "ยอดจริง"}

  title_project_total: {[key: string]: string} = {  EN: "Project",  TH: "จำนวนโครงการ"}
  title_cost_total: {[key: string]: string} = {  EN: "Cost",  TH: "จำนวนต้นทุน"}
  title_actual_total: {[key: string]: string} = {  EN: "Payment",  TH: "ยอดชำระ"}

  title_job_code: {[key: string]: string} = {  EN: "Job code",  TH: "รหัสงาน"}
  title_job_name: {[key: string]: string} = {  EN: "Job name",  TH: "ชื่องาน"}

  title_total: {[key: string]: string} = {  EN: "Total",  TH: "รวม"}

  title_jobcode: {[key: string]: string} = {  EN: "Job",  TH: "งาน"}
  title_jobname: {[key: string]: string} = {  EN: "Description",  TH: "รายละเอียด"}
  title_empcode: {[key: string]: string} = {  EN: "Emp. code",  TH: "รหัสพนักงาน"}
  title_empname: {[key: string]: string} = {  EN: "Emp. name",  TH: "ชื่อ-นามสกุล"}
  title_shift: {[key: string]: string} = {  EN: "Shift",  TH: "กะการทำงาน"}
  title_daytype: {[key: string]: string} = {  EN: "Daytype",  TH: "ประเภทวัน"}
  title_timein: {[key: string]: string} = {  EN: "In",  TH: "เวลาเข้า"}
  title_timeout: {[key: string]: string} = {  EN: "Out",  TH: "เวลาออก"}
  title_working_before: {[key: string]: string} = {  EN: "OT in",  TH: "โอทีก่อนเข้างาน"}  
  title_working_after: {[key: string]: string} = {  EN: "OT out",  TH: "โอทีหลังเลิกงาน"}
  title_working_late: {[key: string]: string} = {  EN: "Late",  TH: "สาย"}
  title_working_leave: {[key: string]: string} = {  EN: "Leave",  TH: "ลางาน"}

  title_staff_regular: {[key: string]: string} = {  EN: "Regular",  TH: "พนักงานประจำ"}
  title_staff_temp: {[key: string]: string} = {  EN: "Temporary",  TH: "พนักงานชั่วคราว"}
  title_staff_resign: {[key: string]: string} = {  EN: "Resign",  TH: "พนักงานลาออก"}

  title_staff_total: {[key: string]: string} = {  EN: "Total",  TH: "รวม"}
  title_staff_diff: {[key: string]: string} = {  EN: "Diff.",  TH: "ส่วนต่าง"}
  title_project: { [key: string]: string } = { EN: "Project", TH: "โครงการ" };
  title_monitor: { [key: string]: string } = { EN: "Monitor", TH: "กระดานแสดงผล" };
  title_search : { [key: string]: string } = { EN: "  Search keyword ", TH: "ค้นหา" }
  title_jobdetail: {[key: string]: string} = {  EN: "Job detail",  TH: "รายละเอียดงาน"}

   show_fillter: boolean = false;

  constructor(
    private router:Router, 
    private route: ActivatedRoute,    
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private datePipe: DatePipe,      
    private projectService: ProjectService,      
    private progenaralService:ProgenaralService,
    private timecardService: TimecardService,
    private projectDetailService:ProjectDetailService

  ) {    
   }

  public initial_current:InitialCurrent = new InitialCurrent();  
  doGetInitialCurrent(){    
    this.initial_current = JSON.parse(localStorage.getItem(AppConfig.SESSIONInitial) || '{}');
    if (!this.initial_current) {
      this.router.navigateByUrl('login');
    }       
  }  

  doLoadLanguage(){
    if(this.initial_current.Language == "TH"){
      
    }     

  }

  doLoadTimesheet(project: string){
    //this.displayManage = true

    //// console.log(project)

    this.selectedProject(project)

    setTimeout(() => {
      //this.doLoadTimecard()
      //this.scrollToBottom()
      // this.manage_title = "Job detail"
      this.doLoadJobMonitor()
      this.displayManage = true

    }, 300);
    
  }

  scrollToBottom(): void {
      try {
          this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
      } catch(err) { }                 
  }

  ngOnInit(): void {
    this.doLoadLanguage()
    this.doGetInitialCurrent()
    this.doLoadMenu()
    this.doLoadProjectType()
    this.doLoadProjectBusiness()

    //
    this.doLoadProareaType()
    this.doLoadProgroupType()
    //
    //this.doLoadPolJobmain()

    //let dateString = '2023-01-10T00:00:00'
    //this.selectedDate_fillter = new Date(dateString);
    setTimeout(() => {
      this.doLoadProjectMonitor()
    }, 300);


  }

  doLoadMenu(){
    this.itemslike = [{ label: this.title_monitor[this.initial_current.Language], styleClass: 'activelike' }];
    this.home = { icon: 'pi pi-home', routerLink: '/' };


    this.toolbar_menu = [
      {
        label:'Save',
        icon:'pi pi-fw pi-save',
        
      },
      {
          label:'Export',
          icon:'pi pi-fw pi-file-export',
          command: (event) => {
            // console.log('Edit')
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
            // console.log('Edit')
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

  doShowFillter(){
    if(this.show_fillter){
      this.show_fillter = false
    }
    else{
      this.show_fillter = true
    }
  }

  doFillter(){
    this.doLoadProjectMonitor()
  }

  project_monitor: PrjectMonitorModel[] = [];
  selectedProjectMonitor: PrjectMonitorModel = new PrjectMonitorModel;
  doLoadProjectMonitor(){
    
    var probusiness = ""
    var protype = ""
    //
    var proarea = ""
    var progroup = ""
    //
    if(this.business_fillter){
      probusiness = this.selectedBusiness_fillter;
    }

    if(this.type_fillter){
      protype = this.selectedType_fillter;
    }
    //
    if(this.proarea_fillter){
      proarea = this.selectedProarea_fillter;
    }
    //
    if(this.progroup_fillter){
      progroup = this.selectedProgroup_fillter;   
       
    }
    

    this.projectService.project_monitor(this.initial_current.CompCode, this.selectedDate_fillter, protype, probusiness,proarea,progroup).then(async (res) => {
      this.project_monitor = await res;
      setTimeout(() => {
        this.calculateTotal()
      }, 500);
    }); 
  }

  selectedProject(code:string){
    for (let i = 0; i < this.project_monitor.length; i++) {
      if(this.project_monitor[i].project_code==code ){
        this.selectedProjectMonitor = this.project_monitor[i];
        break;
      }
    }
  }

  // onRowSelectProject(event: Event) {
  //   this.edit_workflow= true;
  // }

  probusiness_list: ProbusinessModel[] = []; 
  doLoadProjectBusiness(){       
    this.probusiness_list = []  
    var tmp = new ProbusinessModel();
 
    this.progenaralService.probusiness_get(tmp).then(async (res) => {
      this.probusiness_list = await res;      
    }); 
  }

  protype_list: ProtypeModel[] = [];  
  doLoadProjectType(){      
    this.protype_list = []  
    var tmp = new ProtypeModel();

    this.progenaralService.protype_get(tmp).then(async (res) => {
      this.protype_list = await res;      
    });     
  }
  //
  proarea_list: ProareaModel[] = [];  
  doLoadProareaType(){      
    this.proarea_list = [] 
    var tmp = new ProareaModel();
  
    this.progenaralService.proarea_get(tmp).then(async (res) => {
      this.proarea_list = await res;      
    });     
  }
   
  progroup_list: ProgroupModel[] = [];  
  doLoadProgroupType(){      
    this.progroup_list = []   
    var tmp = new ProgroupModel();

    this.progenaralService.progroup_get(tmp).then(async (res) => {
      this.progroup_list = await res;      
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

  timecard_list: TimecardsModel[] = [];
  selectedTimecard: TimecardsModel = new TimecardsModel();
  edit_timecard: boolean = false;

  timein: string | null | undefined
  timeout: string | null | undefined

  doLoadTimecard(){    
    this.timecardService.timecard_get(this.initial_current.CompCode, this.selectedProjectMonitor.project_code, "", this.selectedDate_fillter, this.selectedDate_fillter).then(async (res) => {
      this.timecard_list = await res;
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

  
  jobmain_list: ProjobmainModel[] = [];
  selectedJobmain: RadiovalueModel = new RadiovalueModel;
  doLoadPolJobmain(){      
    this.jobmain_list = []   
    this.projectDetailService.projobmain_get("","", "").then(async (res) => {
      this.jobmain_list = await res;
    });   
  }
  doGetPolJobmainDetail(code:string) : string {
    for (let i = 0; i < this.jobmain_list.length; i++) {
      if(this.jobmain_list[i].projobmain_code==code ){
        return this.initial_current.Language=="TH" ? this.jobmain_list[i].projobmain_name_th : this.jobmain_list[i].projobmain_name_en
      }
    }
    return ""      
  }

  //-- Job monitor
  job_monitor: JobMonitorModel[] = [];
  selectedJobMonitor: JobMonitorModel = new JobMonitorModel;
  doLoadJobMonitor(){        
    this.projectService.job_monitor(this.initial_current.CompCode, this.selectedProjectMonitor.project_code, this.selectedDate_fillter, this.selectedToDate_fillter).then(async (res) => {
      this.job_monitor = await res;
      setTimeout(() => {
        
        
      }, 500);
    }); 
  }

  onRowSelectJobMonitor(event: Event){

  }


}

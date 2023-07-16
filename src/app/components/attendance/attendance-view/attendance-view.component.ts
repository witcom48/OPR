import { Component, OnInit, ViewChild, ElementRef} from '@angular/core';
import { MegaMenuItem,MenuItem } from 'primeng/api';
import {ConfirmationService, ConfirmEventType, MessageService} from 'primeng/api';

import { ActivatedRoute, NavigationExtras } from '@angular/router';
import { Router } from '@angular/router';

import { AppConfig } from '../../../config/config';
import { InitialCurrent } from '../../../config/initial_current';

import { RadiovalueModel } from '../../../models/project/radio_value';
import { EmployeeModel } from '../../../models/employee/employee';
import { EmployeeService } from 'src/app/services/emp/worker.service';

import { TimecardsModel } from '../../../models/attendance/timecards';
import { TimecardService } from 'src/app/services/attendance/timecards.service';

import { DaytypeModels } from 'src/app/models/attendance/daytype';

import { ShiftModels } from 'src/app/models/attendance/shift';
import { ShiftServices } from 'src/app/services/attendance/shift.service';

import { SearchEmpComponent } from '../../usercontrol/search-emp/search-emp.component';


@Component({
  selector: 'app-attendance-view',
  templateUrl: './attendance-view.component.html',
  styleUrls: ['./attendance-view.component.scss']
})
export class AttendanceViewComponent implements OnInit {

  @ViewChild(SearchEmpComponent) selectEmp: any;

  title_page: {[key: string]: string} = {  EN: "Time Information",  TH: "ข้อมูลเวลา"}
  title_new: {[key: string]: string} = {  EN: "New",  TH: "เพิ่ม"}
  title_edit: {[key: string]: string} = {  EN: "Edit",  TH: "แก้ไข"}
  title_delete: {[key: string]: string} = {  EN: "Delete",  TH: "ลบ"}
  title_btn_save: {[key: string]: string} = {  EN: "Save",  TH: "บันทึก"}
  title_btn_cancel: {[key: string]: string} = {  EN: "Cancel",  TH: "ยกเลิก"}
  title_btn_close: {[key: string]: string} = {  EN: "Close",  TH: "ปิด"}
  title_btn_select: {[key: string]: string} = {  EN: "Select",  TH: "เลือก"}
  title_modified_by: {[key: string]: string} = {  EN: "Edit by",  TH: "ผู้ทำรายการ"}
  title_modified_date: {[key: string]: string} = {  EN: "Edit date",  TH: "วันที่ทำรายการ"}
  title_search: {[key: string]: string} = {  EN: "Search",  TH: "ค้นหา"}

  //
  title_confirm: {[key: string]: string} = {  EN: "Are you sure?",  TH: "ยืนยันการทำรายการ"}
  title_confirm_record: {[key: string]: string} = {  EN: "Confirm to record",  TH: "คุณต้องการบันทึกการทำรายการ"}
  title_confirm_delete: {[key: string]: string} = {  EN: "Confirm to delete",  TH: "คุณต้องการลบรายการ"}
  title_confirm_yes: {[key: string]: string} = {  EN: "Yes",  TH: "ใช่"}
  title_confirm_no: {[key: string]: string} = {  EN: "No",  TH: "ยกเลิก"}
  title_confirm_cancel: {[key: string]: string} = {  EN: "You have cancelled",  TH: "คุณยกเลิกการทำรายการ"}
  //
  title_page_from: {[key: string]: string} = {  EN: "Showing",  TH: "แสดง"}
  title_page_to: {[key: string]: string} = {  EN: "to",  TH: "ถึง"}
  title_page_total: {[key: string]: string} = {  EN: "of",  TH: "จาก"}
  title_page_record: {[key: string]: string} = {  EN: "entries",  TH: "รายการ"}

  //
  title_import: {[key: string]: string} = {  EN: "Import",  TH: "นำเข้า"}
  title_export: {[key: string]: string} = {  EN: "Export",  TH: "โอนออก"}
  title_save: {[key: string]: string} = {  EN: "Save",  TH: "บันทึก"}
  title_close: {[key: string]: string} = {  EN: "Close",  TH: "ปิด"}
  title_cancel: {[key: string]: string} = {  EN: "Cancel",  TH: "ยกเลิก"}
  title_more: {[key: string]: string} = {  EN: "More",  TH: "เพิ่มเติม"}
  title_code: {[key: string]: string} = {  EN: "Code",  TH: "รหัส"}
  title_name_th: {[key: string]: string} = {  EN: "Name (Thai)",  TH: "ชื่อไทย"}
  title_name_en: {[key: string]: string} = {  EN: "Name (Eng.)",  TH: "ชื่ออังกฤษ"}


  title_date: {[key: string]: string} = {  EN: "Date",  TH: "วันที่"}
  title_project: {[key: string]: string} = {  EN: "Project",  TH: "โครงการ"}
  title_job: {[key: string]: string} = {  EN: "Job",  TH: "งาน"}
  title_shift: {[key: string]: string} = {  EN: "Shift",  TH: "กะการทำงาน"}
  title_daytype: {[key: string]: string} = {  EN: "Daytype",  TH: "ประเภทวัน"}
  title_normalin: {[key: string]: string} = {  EN: "IN",  TH: "เวลาเข้า"}
  title_normalout: {[key: string]: string} = {  EN: "OUT",  TH: "เวลาออก"}
  
  title_in: {[key: string]: string} = {  EN: "In",  TH: "เข้างาน"}
  title_out: {[key: string]: string} = {  EN: "Out",  TH: "ออกงาน"}
  title_work: {[key: string]: string} = {  EN: "Work",  TH: "เวลาทำงาน"}

  title_break: {[key: string]: string} = {  EN: "Break",  TH: "พักเบรค"}

  title_beforeot: {[key: string]: string} = {  EN: "OT In.",  TH: "โอทีก่อนเข้างาน"}
  title_afterot: {[key: string]: string} = {  EN: "OT Out.",  TH: "โอทีหลังเลิกงาน"}
  title_late: {[key: string]: string} = {  EN: "Late",  TH: "สาย"}
  title_leave: {[key: string]: string} = {  EN: "Leave",  TH: "ลางาน"}
  title_approve: {[key: string]: string} = {  EN: "Approve",  TH: "อนุมัติ"}

  title_lock: {[key: string]: string} = {  EN: "Lock",  TH: "ล็อค"}
  title_deduct: {[key: string]: string} = {  EN: "Deduct",  TH: "หักเงิน"}
  title_document: {[key: string]: string} = {  EN: "Document",  TH: "เอกสาร"}
    

  style_input_real:string = "[style]=\"{'width':'80px'}\\";
 

  menu_timecard: MenuItem[] = [];

  constructor(private employeeService: EmployeeService,
    private timecardService: TimecardService,
    private router:Router, 
    private route: ActivatedRoute,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private shiftServices: ShiftServices

    ) { }

  ngOnInit(): void {

    this.doGetInitialCurrent()
    this.doLoadMenu()
    this.doLoadLanguage()

    setTimeout(() => {
      this.doLoadEmployee()
      this.doLoadPolDaytype()
      this.doLoadPolShift()
    }, 100);


    

    setTimeout(() => {
      
      this.worker_index = 0;
      this.doSetDetailWorker();

    }, 1000);

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

  doLoadMenu(){
    this.menu_timecard = [   
      {
          label:this.title_edit[this.initial_current.Language],
          icon:'pi pi-fw pi-pencil',
          command: (event) => {           
            this.showManage()       
        }        
      } 
     
      
    ];
  }

  displayManage: boolean = false;
  position: string = "right";
  manage_title: string = "ข้อมูลเวลา"
  showManage() {    
    this.displayManage = true;

  }

  workerDetail:EmployeeModel = new EmployeeModel();
  worker_list: EmployeeModel[] = [];
  worker_index:number = 0;
  worker_code:string = "";
  worker_name:string = "";
  doLoadEmployee(){
    this.employeeService.worker_get(this.initial_current.CompCode, "").then((res) =>{
      this.worker_list = res;   
    });
  }

  doNextWorker(){
    if(this.worker_index < this.worker_list.length - 1){
      this.worker_index++;
      this.doSetDetailWorker();
    }
  }

  doBackWorker(){
    if(this.worker_index > 0){
      this.worker_index--;
      this.doSetDetailWorker();
    }
  }

  doSetDetailWorker(){
    this.workerDetail = this.worker_list[this.worker_index];
    this.worker_code = this.workerDetail.worker_code;
    if(this.initial_current.Language == "EN"){
      this.worker_name = this.workerDetail.worker_fname_en + " " + this.workerDetail.worker_lname_en;
    }
    else{
      this.worker_name = this.workerDetail.worker_fname_th + " " + this.workerDetail.worker_lname_th;
    }

    setTimeout(() => {            
      this.doLoadTimecard();
    }, 200);
  }

  timecard_list: TimecardsModel[] = [];
  selectedTimecard: TimecardsModel = new TimecardsModel();
  edit_timecard: boolean = false;
  doLoadTimecard(){

    let dateString = '2023-06-01T00:00:00'
    // var FromDate = new Date(dateString);

    dateString = '2023-06-30T00:00:00'
    // var ToDate = new Date(dateString);

    this.timecardService.timecard_get(this.initial_current.CompCode, "", this.worker_code, this.initial_current.PR_FromDate, this.initial_current.PR_ToDate).then((res) =>{
      this.timecard_list = res;   
    });
  }

  date_work = new Date();
  date_ch1 = new Date();
  date_ch2 = new Date();
  date_ch3 = new Date();
  date_ch4 = new Date();
  date_ch5 = new Date();
  date_ch6 = new Date();
  date_ch7 = new Date();
  date_ch8 = new Date();
  date_ch9 = new Date();
  date_ch10 = new Date();

  before : string = "00:00";
  before_app : string = "00:00";
  work1 : string = "00:00";
  work1_app : string = "00:00";
  work2 : string = "00:00";
  work2_app : string = "00:00";
  break : string = "00:00";
  break_app : string = "00:00";
  after : string = "00:00";
  after_app : string = "00:00";

  late : string = "00:00";
  late_app : string = "00:00";

  leave : string = "00:00";
  leave_app : string = "00:00";

  onRowSelectTimecard(event: Event) {
    this.edit_timecard = true
    this.date_work = new Date(this.selectedTimecard.timecard_workdate)
    this.date_ch1 = new Date(this.selectedTimecard.timecard_ch1)
    this.date_ch2 = new Date(this.selectedTimecard.timecard_ch2)
    this.date_ch3 = new Date(this.selectedTimecard.timecard_ch3)
    this.date_ch4 = new Date(this.selectedTimecard.timecard_ch4)
    this.date_ch5 = new Date(this.selectedTimecard.timecard_ch5)
    this.date_ch6 = new Date(this.selectedTimecard.timecard_ch6)
    this.date_ch7 = new Date(this.selectedTimecard.timecard_ch7)
    this.date_ch8 = new Date(this.selectedTimecard.timecard_ch8)
    this.date_ch9 = new Date(this.selectedTimecard.timecard_ch9)
    this.date_ch10 = new Date(this.selectedTimecard.timecard_ch10)      

    this.before = this.doConvertHHMM(this.selectedTimecard.timecard_before_min)
    this.before_app = this.doConvertHHMM(this.selectedTimecard.timecard_before_min_app)

    this.work1 = this.doConvertHHMM(this.selectedTimecard.timecard_work1_min)
    this.work1_app = this.doConvertHHMM(this.selectedTimecard.timecard_work1_min_app)

    this.work2 = this.doConvertHHMM(this.selectedTimecard.timecard_work2_min)
    this.work2_app = this.doConvertHHMM(this.selectedTimecard.timecard_work2_min_app)

    this.break = this.doConvertHHMM(this.selectedTimecard.timecard_break_min)
    this.break_app = this.doConvertHHMM(this.selectedTimecard.timecard_break_min_app)
    
    this.after = this.doConvertHHMM(this.selectedTimecard.timecard_after_min)
    this.after_app = this.doConvertHHMM(this.selectedTimecard.timecard_after_min_app)
  }

  onChangeWork1(){
    console.log(this.work1)
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


  timecard_summit(){
    this.confirmationService.confirm({
      message: this.title_confirm_record[this.initial_current.Language],
      header: this.title_confirm[this.initial_current.Language],
      icon: 'pi pi-exclamation-triangle',
      accept: () => {

        this.selectedTimecard.timecard_color = "1"

        this.selectedTimecard.timecard_ch1 = new Date(this.date_ch1)
        this.selectedTimecard.timecard_ch2 = new Date(this.date_ch2)
        this.selectedTimecard.timecard_ch3 = new Date(this.date_ch3)
        this.selectedTimecard.timecard_ch4 = new Date(this.date_ch4)
        this.selectedTimecard.timecard_ch5 = new Date(this.date_ch5)
        this.selectedTimecard.timecard_ch6 = new Date(this.date_ch6)
        this.selectedTimecard.timecard_ch7 = new Date(this.date_ch7)
        this.selectedTimecard.timecard_ch8 = new Date(this.date_ch8)
        this.selectedTimecard.timecard_ch9 = new Date(this.date_ch9)
        this.selectedTimecard.timecard_ch10 = new Date(this.date_ch10)
       
        this.selectedTimecard.timecard_before_min = this.doGetMinute(this.before)
        this.selectedTimecard.timecard_before_min_app = this.doGetMinute(this.before_app)
        this.selectedTimecard.timecard_work1_min = this.doGetMinute(this.work1)
        this.selectedTimecard.timecard_work1_min_app = this.doGetMinute(this.work1_app)
        this.selectedTimecard.timecard_work2_min = this.doGetMinute(this.work2)
        this.selectedTimecard.timecard_work2_min_app = this.doGetMinute(this.work2_app)
        this.selectedTimecard.timecard_break_min = this.doGetMinute(this.break)
        this.selectedTimecard.timecard_break_min_app = this.doGetMinute(this.break_app)
        this.selectedTimecard.timecard_after_min = this.doGetMinute(this.after)
        this.selectedTimecard.timecard_after_min_app = this.doGetMinute(this.after_app)

        this.timecardService.timecard_record(this.selectedTimecard).then((res) => {       
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
        this.messageService.add({severity:'warn', summary:'Cancelled', detail:this.title_confirm_cancel[this.initial_current.Language]});
      }
      ,
        key: "myDialog"
    });
  }

  timecard_cancel(){
    this.displayManage = false
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

  searchEmp: boolean = false;
  open_searchemp(){
    this.searchEmp = true
  }

  close_searchemp(){
    this.searchEmp = false
  }

  select_emp(){
    
    let select = this.selectEmp.selectedEmployee.worker_code
    if(select != ""){
      this.doGetIndexWorker(select)
      this.searchEmp = false      
    }

  }

  doGetIndexWorker(worker_code:string){
    for (let i = 0; i < this.worker_list.length; i++) {
      if(this.worker_list[i].worker_code==worker_code ){
        this.worker_index = i;
        break;
      }
    }

    this.doSetDetailWorker();

  }

}

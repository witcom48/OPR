import { Component, OnInit, ViewChild, ElementRef} from '@angular/core';
import { MegaMenuItem,MenuItem } from 'primeng/api';
import {ConfirmationService, ConfirmEventType, MessageService} from 'primeng/api';

import { ActivatedRoute, NavigationExtras } from '@angular/router';
import { Router } from '@angular/router';

import * as XLSX from 'xlsx';

import { AppConfig } from '../../../config/config';
import { InitialCurrent } from '../../../config/initial_current';

import { RadiovalueModel } from '../../../models/project/radio_value';
import { EmployeeModel } from '../../../models/employee/employee';
import { EmployeeService } from 'src/app/services/emp/worker.service';

import { WagedayModel } from '../../../models/attendance/wageday';
import { WagedayService } from 'src/app/services/attendance/wageday.service';
import { SearchEmpComponent } from '../../usercontrol/search-emp/search-emp.component';


@Component({
  selector: 'app-attendance-summary',
  templateUrl: './attendance-summary.component.html',
  styleUrls: ['./attendance-summary.component.scss']
})
export class AttendanceSummaryComponent implements OnInit {
  itemslike: MenuItem[] = [];
  home: any;
  @ViewChild(SearchEmpComponent) selectEmp: any;

  title_page: {[key: string]: string} = {  EN: "Summary",  TH: "ข้อมูลเวลา"}
  title_new: {[key: string]: string} = {  EN: "New",  TH: "เพิ่ม"}
  title_edit: {[key: string]: string} = {  EN: "Edit",  TH: "แก้ไข"}
  title_delete: {[key: string]: string} = {  EN: "Delete",  TH: "ลบ"}
  title_btn_save: {[key: string]: string} = {  EN: "Save",  TH: "บันทึก"}
  title_btn_select: {[key: string]: string} = {  EN: "Select",  TH: "เลือก"}
  title_btn_cancel: {[key: string]: string} = {  EN: "Cancel",  TH: "ยกเลิก"}
  title_btn_close: {[key: string]: string} = {  EN: "Close",  TH: "ปิด"}
  title_modified_by: {[key: string]: string} = {  EN: "Edit by",  TH: "ผู้ทำรายการ"}
  title_modified_date: {[key: string]: string} = {  EN: "Edit date",  TH: "วันที่ทำรายการ"}
  title_search: {[key: string]: string} = {  EN: "Search",  TH: "ค้นหา"}
  title_export: {[key: string]: string} = {  EN: "Export",  TH: "ส่งออกไฟล์"}
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
  title_empid: {[key: string]: string} = {  EN: "EmpID",  TH: "รหัสพนักงาน"}
  title_empname: {[key: string]: string} = {  EN: "Name",  TH: "ชื่อ-นามสกุล"}

  title_time: {[key: string]: string} = {  EN: "Hrs.",  TH: "ชั่วโมง"}
  title_date: {[key: string]: string} = {  EN: "Date",  TH: "วันที่"}
  title_wage: {[key: string]: string} = {  EN: "Wage",  TH: "ค่าแรง"}
  title_wageday_before: {[key: string]: string} = {  EN: "Before working",  TH: "โอทีก่อนเข้างาน"}
  title_wageday_normal: {[key: string]: string} = {  EN: "Normal",  TH: "เวลาทำงานปกติ"}
  title_wageday_break: {[key: string]: string} = {  EN: "Break",  TH: "พักเบรค"}
  title_wageday_after: {[key: string]: string} = {  EN: "After working",  TH: "โอทีหลังเลิกงาน"}
  title_late: {[key: string]: string} = {  EN: "Late",  TH: "หักสาย"}
  title_leave: {[key: string]: string} = {  EN: "Leave",  TH: "หักลางาน"}
  title_absent: {[key: string]: string} = {  EN: "Absent",  TH: "หักขาดงาน"}
  title_allowance: {[key: string]: string} = {  EN: "Shift Allowance",  TH: "เงินค่าเวลา"}    

  title_byemp: {[key: string]: string} = {  EN: "By Employee",  TH: "ตามพนักงาน"}    
  title_bydate: {[key: string]: string} = {  EN: "By Date",  TH: "ตามวันที่"}    

  title_summary: {[key: string]: string} = {  EN: "Summary",  TH: "ตรวจสอบการคำนวณ"}    
  title_from: {[key: string]: string} = {  EN: "From",  TH: "จากวันที่"}    
  title_to: {[key: string]: string} = {  EN: "To",  TH: "ถึงวันที่"}    

  
  

  style_input_real:string = "[style]=\"{'width':'80px'}\\";
 
  constructor(private employeeService: EmployeeService,
    private wagedayService: WagedayService,
    private router:Router, 
    private route: ActivatedRoute,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    
    ) { }

  ngOnInit(): void {

    this.doGetInitialCurrent()
    this.doLoadMenu()
    this.doLoadLanguage()

    setTimeout(() => {
      this.doLoadEmployee()          
      //this.selectedFromdate = this.initial_current.PR_FromDate
      //this.selectedTodate = this.initial_current.PR_ToDate
      
    }, 100);

    setTimeout(() => {
      
      this.worker_index = 0;
      this.doSetDetailWorker();
      this.doLoadDataByDate()

    }, 1000);

  }

  public initial_current:InitialCurrent = new InitialCurrent();  
  doGetInitialCurrent(){    
    this.initial_current = JSON.parse(localStorage.getItem(AppConfig.SESSIONInitial) || '{}');
    if (!this.initial_current) {
      this.router.navigateByUrl('login');
    }    
    this.itemslike = [{ label: this.title_summary[this.initial_current.Language], styleClass: 'activelike' },];
    this.home = { icon: 'pi pi-home', routerLink: '/' };   
  }

  doLoadLanguage(){
    if(this.initial_current.Language == "TH"){    

    }
  }

  menu_byemp: MenuItem[] = [];
  menu_bydate: MenuItem[] = [];

  doLoadMenu(){
    this.menu_byemp = [   
      {
        label:this.title_export[this.initial_current.Language],
        icon:'pi pi-fw pi-file-export',
          command: (event) => {           
            this.exportAsExcel()
        }        
      } 
      
    ];

    this.menu_bydate = [   
      {
        label:this.title_export[this.initial_current.Language],
        icon:'pi pi-fw pi-file-export',
          command: (event) => {           
            this.exportAsExcel_date()
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
      this.doLoadWageday();
    }, 200);
  }

  wageday_list: WagedayModel[] = [];
  selectedWageday: WagedayModel = new WagedayModel();
  edit_timecard: boolean = false;
  doLoadWageday(){
    this.wagedayService.wageday_get(this.initial_current.CompCode, "", this.worker_code, this.initial_current.PR_FromDate, this.initial_current.PR_ToDate).then((res) =>{
      this.wageday_list = res;   
    });
  }

  onRowSelected(event: Event) {
    this.edit_timecard = true    
  }

  onChangeWork1(){
   
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

  selectedFromdate :Date = new Date()
  selectedTodate :Date = new Date()

  wageday2_list: WagedayModel[] = [];
  selectedWageday2: WagedayModel = new WagedayModel();
  doLoadDataByDate(){
    this.wagedayService.wageday_get(this.initial_current.CompCode, "", "", this.selectedFromdate, this.selectedTodate).then((res) =>{
      this.wageday2_list = res;   
    });
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


  @ViewChild('TABLE') table: ElementRef | any = null;
  @ViewChild('TABLE2') table2: ElementRef | any = null;

  exportAsExcel()
  {
    const ws: XLSX.WorkSheet=XLSX.utils.table_to_sheet(this.table.nativeElement);//converts a DOM TABLE element to a worksheet
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    XLSX.writeFile(wb, 'wage_by_employee_' + this.worker_code + '.xlsx');

  }

  exportAsExcel_date()
  {
    const ws: XLSX.WorkSheet=XLSX.utils.table_to_sheet(this.table2.nativeElement);//converts a DOM TABLE element to a worksheet
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    XLSX.writeFile(wb, 'wage_by_date.xlsx');

  }

}

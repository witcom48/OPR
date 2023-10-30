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

import { PaytranModel } from '../../../models/payroll/paytran';
import { PaytranService } from 'src/app/services/payroll/paytran.service';
import { SearchEmpComponent } from '../../usercontrol/search-emp/search-emp.component';

@Component({
  selector: 'app-payroll-summary',
  templateUrl: './payroll-summary.component.html',
  styleUrls: ['./payroll-summary.component.scss']
})
export class PayrollSummaryComponent implements OnInit {

  @ViewChild(SearchEmpComponent) selectEmp: any;
  home: any;
  itemslike: MenuItem[] = [];
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


  title_salary: {[key: string]: string} = {  EN: "Salary",  TH: "เงินเดือน"}
  title_overtime: {[key: string]: string} = {  EN: "Overtime",  TH: "ล่วงเวลา"}
  title_diligence: {[key: string]: string} = {  EN: "Deligence",  TH: "เบี้ยขยัน"}

  title_late: {[key: string]: string} = {  EN: "Late",  TH: "สาย"}
  title_leave: {[key: string]: string} = {  EN: "Leave",  TH: "ลางาน"}
  title_absent: {[key: string]: string} = {  EN: "Absent",  TH: "ขาดงาน"}

  
  title_date: {[key: string]: string} = {  EN: "Date",  TH: "วันที่"}  
  title_other: {[key: string]: string} = {  EN: "Other",  TH: "อื่นๆ"}
  title_sso: {[key: string]: string} = {  EN: "SSO",  TH: "ประกันสังคม"}
  title_tax: {[key: string]: string} = {  EN: "Tax",  TH: "ภาษี"}
  title_pf: {[key: string]: string} = {  EN: "PF.",  TH: "กองทุนฯ"}
  title_emp: {[key: string]: string} = {  EN: "Emp.",  TH: "สะสม"}
  title_com: {[key: string]: string} = {  EN: "Com.",  TH: "สมทบ"}
  title_income: {[key: string]: string} = {  EN: "Income",  TH: "เงินได้"}
  title_deduct: {[key: string]: string} = {  EN: "Deduct",  TH: "เงินหัก"}
  title_notax: {[key: string]: string} = {  EN: "No tax",  TH: "ไม่คำนวณภาษี"}

  title_bank: {[key: string]: string} = {  EN: "Bank",  TH: "โอนธนาคาร"}
  title_cash: {[key: string]: string} = {  EN: "Cash",  TH: "เงินสด"}
   
  title_totalincome: {[key: string]: string} = {  EN: "Total Income",  TH: "รวมเงินได้"}
  title_totaldeduct: {[key: string]: string} = {  EN: "Total Deduct",  TH: "รวมเงินหัก"}
  title_totaltax: {[key: string]: string} = {  EN: "Total Tax",  TH: "รวมภาษี"}

  title_netpay: {[key: string]: string} = {  EN: "Netpay",  TH: "เงินได้สุทธิ"}

  title_summary: {[key: string]: string} = {  EN: "Summary",  TH: "สรุปรายการรวม"}  
  title_payroll: {[key: string]: string} = {  EN: "Payroll",  TH: "ระบบบริหารเงินเดือน"}  

  

  style_input_real:string = "[style]=\"{'width':'80px'}\\";
 
  constructor(private employeeService: EmployeeService,
    private paytranService: PaytranService,
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
    }, 100);

    setTimeout(() => {      
      this.worker_index = 0;
      this.doSetDetailWorker();   
    }, 1000);
    this.itemslike = [{ label: this.title_summary[this.initial_current.Language], styleClass: 'activelike' }];
    this.home = { icon: 'pi pi-home', routerLink: '/' };
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

  menu_byemp: MenuItem[] = [];

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
      this.doLoadPaytran();
    }, 200);
  }

  paytran_list: PaytranModel[] = [];
  selectedPaytran: PaytranModel = new PaytranModel();
  edit_paytran: boolean = false;
  doLoadPaytran(){
    this.paytranService.paytran_get(this.initial_current.CompCode, "", this.worker_code, this.initial_current.PR_PayDate, this.initial_current.PR_PayDate).then((res) =>{
      this.paytran_list = res;   
    });
  }

  onRowSelected(event: Event) {
    this.edit_paytran = true    
  }

  onChangeWork1(){
   
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
  
  exportAsExcel()
  {
    const ws: XLSX.WorkSheet=XLSX.utils.table_to_sheet(this.table.nativeElement);//converts a DOM TABLE element to a worksheet
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    XLSX.writeFile(wb, 'paytran.xlsx');

  }
  

}

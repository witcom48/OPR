import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, MenuItem, MessageService } from 'primeng/api';
import { AppConfig } from 'src/app/config/config';
import { InitialCurrent } from 'src/app/config/initial_current';
import { EmployeeModel } from 'src/app/models/employee/employee';
import { TRSysApproveModel } from 'src/app/models/system/security/sys_approve';
import { ApplyworkService } from 'src/app/services/recruitment/applywork.service';
import { SysApproveServices } from 'src/app/services/system/security/sysapprove.service';

@Component({
  selector: 'app-recruitment-approve',
  templateUrl: './recruitment-approve.component.html',
  styleUrls: ['./recruitment-approve.component.scss']
})
export class RecruitmentApproveComponent implements OnInit {

  menu_apply: MenuItem[] = [];

  title_modified_by: {[key: string]: string} = {  EN: "Edit by",  TH: "ผู้ทำรายการ"}
  title_modified_date: {[key: string]: string} = {  EN: "Edit date",  TH: "วันที่ทำรายการ"}
  title_page_from: {[key: string]: string} = {  EN: "Showing",  TH: "แสดง"}
  title_page_to: {[key: string]: string} = {  EN: "to",  TH: "ถึง"}
  title_page_total: {[key: string]: string} = {  EN: "of",  TH: "จาก"}
  title_page_record: {[key: string]: string} = {  EN: "entries",  TH: "รายการ"}

  title_new: {[key: string]: string} = {  EN: "New",  TH: "เพิ่ม"}
  title_edit: {[key: string]: string} = {  EN: "Edit",  TH: "แก้ไข"}
  title_delete: {[key: string]: string} = {  EN: "Delete",  TH: "ลบ"}
  title_import: {[key: string]: string} = {  EN: "Import",  TH: "นำเข้า"}
  title_export: {[key: string]: string} = {  EN: "Export",  TH: "โอนออก"}
  title_save: {[key: string]: string} = {  EN: "Save",  TH: "บันทึก"}
  title_close: {[key: string]: string} = {  EN: "Close",  TH: "ปิด"}
  title_cancel: {[key: string]: string} = {  EN: "Cancel",  TH: "ยกเลิก"}
  title_more: {[key: string]: string} = {  EN: "More",  TH: "เพิ่มเติม"}
  title_search: {[key: string]: string} = {  EN: "Search",  TH: "ค้นหา"}
  title_upload: {[key: string]: string} = {  EN: "Upload",  TH: "อัพโหลด"}

  title_view: {[key: string]: string} = {  EN: "View",  TH: "เรียกดู"}
  title_approve: {[key: string]: string} = {  EN: "Approve",  TH: "อนุมัติ"}
  title_notapprove: {[key: string]: string} = {  EN: "Not approve",  TH: "ไม่อนุมัติ"}
  title_view_approve: {[key: string]: string} = {  EN: "Approve",  TH: "ผู้อนุมัติ"}

  
  title_confirm: {[key: string]: string} = {  EN: "Are you sure?",  TH: "ยืนยันการทำรายการ"}
  title_confirm_record: {[key: string]: string} = {  EN: "Confirm to record",  TH: "คุณต้องการบันทึกการทำรายการ"}
  title_confirm_delete: {[key: string]: string} = {  EN: "Confirm to delete",  TH: "คุณต้องการลบรายการ"}
  title_confirm_yes: {[key: string]: string} = {  EN: "Yes",  TH: "ใช่"}
  title_confirm_no: {[key: string]: string} = {  EN: "No",  TH: "ยกเลิก"}
  title_confirm_cancel: {[key: string]: string} = {  EN: "You have cancelled",  TH: "คุณยกเลิกการทำรายการ"}

  title_page: {[key: string]: string} = {  EN: "Project management",  TH: "ข้อมูลโครงการ"}

  title_code: {[key: string]: string} = {  EN: "Code",  TH: "รหัส"}
  title_name_th: {[key: string]: string} = {  EN: "Name (Thai)",  TH: "ชื่อไทย"}
  title_name_en: {[key: string]: string} = {  EN: "Name (Eng.)",  TH: "ชื่ออังกฤษ"}
  title_name: {[key: string]: string} = {  EN: "Name",  TH: "ชื่อ-นามสกุล"}
  title_hiredate: {[key: string]: string} = {  EN: "Date",  TH: "วันที่พร้อมเริ่มงาน"}
  title_projectcode: {[key: string]: string} = {  EN: "Code",  TH: "รหัสโครงการ"}
  title_projectname: {[key: string]: string} = {  EN: "Name",  TH: "ชื่อโครงการ"}
  title_protype: {[key: string]: string} = {  EN: "Type",  TH: "ประเภทงาน"}
  title_probusiness: {[key: string]: string} = {  EN: "Business",  TH: "ประเภทธุรกิจ"}
  title_fromdate: {[key: string]: string} = {  EN: "From",  TH: "จากวันที่"}
  title_todate: {[key: string]: string} = {  EN: "To",  TH: "ถึงวันที่"}
  title_manpower: {[key: string]: string} = {  EN: "Manpower",  TH: "จำนวนพนักงาน"}
  title_cost: {[key: string]: string} = {  EN: "Cost",  TH: "ต้นทุน"}
  title_status: {[key: string]: string} = {  EN: "Status",  TH: "สถานะ"}

  title_manage: {[key: string]: string} = {  EN: "Manage",  TH: "จัดการข้อมูล"}

  title_total_project: {[key: string]: string} = {  EN: "New Project",  TH: "โครงการใหม่"}
  title_total_transfer: {[key: string]: string} = {  EN: "Transfer Emp.",  TH: "โอนย้าย"}
  title_total_apply: {[key: string]: string} = {  EN: "Apply Work",  TH: "ผู้สมัคร"}

  title_username: {[key: string]: string} = {  EN: "Username",  TH: "ผู้อนุมัติ"}
  title_approve_date: {[key: string]: string} = {  EN: "Approve date",  TH: "วันที่อนุมัติ"}

  title_popup_approve: {[key: string]: string} = {  EN: "Approve",  TH: "อนุมัติ"}

  total_apply:number = 0

  constructor(
    private router:Router,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private datePipe: DatePipe,
    private sysApproveServices:SysApproveServices,
    private applyworkService: ApplyworkService,
  ) { }

  ngOnInit(): void {
    this.doLoadMenu()
    this.doGetInitialCurrent()

    setTimeout(() => {
      this.doLoadApply()  
    }, 300);
  }

  doLoadMenu(){
       
    this.menu_apply = [   
      {
        label:this.title_approve[this.initial_current.Language],
        icon:'pi pi-fw pi-check',
        command: (event) => {

          if(this.selectedApply.worker_code != ""){
            this.approveNote = ""
            this.approve_apply("W")
          }
          //this.showManage()
        }     
      }
      ,
      {
        label:this.title_notapprove[this.initial_current.Language],
        icon:'pi pi-fw pi-times',
        command: (event) => {
          
          if(this.selectedApply.worker_code != ""){
            this.approveNote = ""
            this.openNotapprove()
          }
      
        }     
      }
      
        
    ];
  }


  public initial_current:InitialCurrent = new InitialCurrent();  
  doGetInitialCurrent(){    
    this.initial_current = JSON.parse(localStorage.getItem(AppConfig.SESSIONInitial) || '{}');
    if (!this.initial_current) {
      this.router.navigateByUrl('login');
    }       
  }
  apply_list: EmployeeModel[] = [];
  selectedApply: EmployeeModel = new EmployeeModel;
  doLoadApply(){
    var tmp = new EmployeeModel();
    tmp.company_code = this.initial_current.CompCode
    tmp.worker_code = ""
    tmp.status = "S"
    this.applyworkService.reqworker_get(tmp).then(async(res)=>{
      await res.forEach((element:EmployeeModel)=>{
        element.worker_hiredate = new Date(element.worker_hiredate)
      })
      this.apply_list = await res;
      this.total_apply = this.apply_list.length;
    })
  }

  displayManage: boolean = false;
  position: string = "right";
  showManage() {
    this.displayManage = true
  }

  close_manage(){
    this.displayManage = false
  }
  approve_apply(status:string) {
    this.displayApproveNote = false
    this.confirmationService.confirm({
      message: this.title_confirm_record[this.initial_current.Language],
      header: this.title_confirm[this.initial_current.Language],
      icon: 'pi pi-exclamation-triangle',
      accept: () => {

      },
      reject: () => {
        this.messageService.add({severity:'warn', summary:'Cancelled', detail:this.title_confirm_cancel[this.initial_current.Language]});
      }
  });
  }



  displayApprove: boolean = false;
  
  showApprove() {
    this.displayApprove = true

  }

  closeApprove() {
    this.displayApprove = false

  }
  approve_list: TRSysApproveModel[] = [];
  selectedApprove: TRSysApproveModel = new TRSysApproveModel;
  doLoadApprove(subject_code:string, workflow_type:string){    

    var tmp = new TRSysApproveModel()
    tmp.approve_code = subject_code
    tmp.workflow_type = workflow_type

    this.sysApproveServices.approve_get(tmp).then(async (res) => {      
      this.approve_list = await res;        

      this.title_popup_approve = {  EN: "View approve :" + subject_code,  TH: "ผู้อนุมัติ :" + subject_code }
      this.showApprove()
    });
  }
  
  displayApproveNote: boolean = false;
  approveNote:string = ""
  openNotapprove(){    
    this.displayApproveNote = true    
  }

  confirm_notapprove(){    
    this.approve_apply("C")
  }

}

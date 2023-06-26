import { Component, Input, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MegaMenuItem,MenuItem } from 'primeng/api';

import { ActivatedRoute, NavigationExtras } from '@angular/router';
import { Router } from '@angular/router';
import { ConfirmationService, ConfirmEventType, MessageService } from 'primeng/api';

import { AppConfig } from '../../../config/config';
import { InitialCurrent } from '../../../config/initial_current';

import { RadiovalueModel } from '../../../models/project/radio_value';
import { DatePipe } from '@angular/common';

import { TimeinputformatModel } from '../../../models/attendance/timeinputformat';
import { TimeinputformatService } from 'src/app/services/attendance/timeinputformat.service';


import { TaskComponent } from '../../../components/usercontrol/task/task.component';

import { TaskModel } from '../../../models/task';
import { TaskDetailModel } from '../../../models/task_detail';
import { TaskWhoseModel } from '../../../models/task_whose';
import { TaskService } from '../../../services/task.service'

import { EmployeeModel } from '../../../models/employee/employee';

@Component({
  selector: 'app-attendance-import',
  templateUrl: './attendance-import.component.html',
  styleUrls: ['./attendance-import.component.scss']
})
export class AttendanceImportComponent implements OnInit {

  @ViewChild('importFile') importFile:any  
  @ViewChild(TaskComponent) taskView: any;


  title_confirm: {[key: string]: string} = {  EN: "Are you sure?",  TH: "ยืนยันการทำรายการ"}
  title_confirm_record: {[key: string]: string} = {  EN: "Confirm to record",  TH: "คุณต้องการบันทึกการทำรายการ"}
  title_confirm_delete: {[key: string]: string} = {  EN: "Confirm to delete",  TH: "คุณต้องการลบรายการ"}
  title_confirm_yes: {[key: string]: string} = {  EN: "Yes",  TH: "ใช่"}
  title_confirm_no: {[key: string]: string} = {  EN: "No",  TH: "ยกเลิก"}
  title_confirm_cancel: {[key: string]: string} = {  EN: "You have cancelled",  TH: "คุณยกเลิกการทำรายการ"}

  title_btn_save: {[key: string]: string} = {  EN: "Save",  TH: "บันทึก"}
  title_btn_cancel: {[key: string]: string} = {  EN: "Cancel",  TH: "ยกเลิก"}
  title_btn_close: {[key: string]: string} = {  EN: "Close",  TH: "ปิด"}
  title_modified_by: {[key: string]: string} = {  EN: "Edit by",  TH: "ผู้ทำรายการ"}
  title_modified_date: {[key: string]: string} = {  EN: "Edit date",  TH: "วันที่ทำรายการ"}

  labTitle: {[key: string]: string} = {  EN: "Setup format import time",  TH: "ตั้งค่ารูปแบบไฟล์นำเข้าเวลา"}
  labChooseFile: {[key: string]: string} = {  EN: "Choose File",  TH: "เลือกไฟล์"}
  labFormat: {[key: string]: string} = {  EN: "Format date",  TH: "รูปแบบวันที่"}
  labCard: {[key: string]: string} = {  EN: "Card no.",  TH: "รหัสบัตร"}
  labDate: {[key: string]: string} = {  EN: "Date",  TH: "วันที่"}
  labHours: {[key: string]: string} = {  EN: "Hours",  TH: "ชั่วโมง"}
  labMinute: {[key: string]: string} = {  EN: "Minute",  TH: "นาที"}
  labFunction: {[key: string]: string} = {  EN: "Function",  TH: "สถานะเข้า-ออก"}
  labMachine: {[key: string]: string} = {  EN: "Machine",  TH: "หมายเลขเครื่อง"}
  labStart: {[key: string]: string} = {  EN: "Start",  TH: "เริ่ม"}
  labLenght: {[key: string]: string} = {  EN: "Lenght",  TH: "ความยาว"}
  labExample: {[key: string]: string} = {  EN: "Example",  TH: "ตัวอย่าง"}


  public examInput:string = "";
  public examCard:string = "";
  public examDate:string = "";
  public examHours:string = "";
  public examMinute:string = "";
  public examFunction:string = "";
  public examMachine:string = "";

  constructor(private timeinputformatService: TimeinputformatService,    
    private router:Router, 
    private datePipe: DatePipe,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private route: ActivatedRoute,
    private taskService: TaskService,
    ) { }

  ngOnInit(): void {
    this.doGetInitialCurrent()    
    this.doLoadLanguage()

    setTimeout(() => {
      this.doLoadTimeformat()
      this.doLoadTask()
    }, 200);
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


  dateformatList: any[] = [
    {code: 'dd/MM/yyyy', text: 'dd/MM/yyyy'},
    {code: 'ddMMyyyy', text: 'ddMMyyyy'},
    {code: 'ddMMyy', text: 'ddMMyy'},
    {code: 'dd-MM-yyyy', text: 'dd-MM-yyyy'},
    {code: 'dd-MM-yy', text: 'dd-MM-yy'},
    {code: 'yyyyMMdd', text: 'yyyyMMdd'},
    {code: 'yyyy-MM-dd', text: 'yyyy-MM-dd'}
 ];

  timeformat_list: TimeinputformatModel[] = [];
  formatDetail: TimeinputformatModel = new TimeinputformatModel;
  doLoadTimeformat(){
    this.timeinputformatService.timeinputformat_get(this.initial_current.CompCode).then((res) =>{
      this.timeformat_list = res;   
      if(this.timeformat_list.length > 0){
        this.formatDetail = this.timeformat_list[0]

        setTimeout(() => {
          this.doLoadExam()
        }, 200);

        
      }
    });
  }

  fileToUpload: File | any = null;
  handleFileInput(file: FileList) {
    this.fileToUpload=file.item(0);

    let filename = this.datePipe.transform(new Date(), 'yyyyMMddHHmm');
    let filetype = "txt";

    if(filename == null){
      filename = "tmp"
    }
    

    this.timeinputformatService.doReadSimpleTimeinput(this.fileToUpload, filename, filetype).then((res) =>{       
      console.log(res)
      let result = JSON.parse(res);  
      if(result.success){
        this.examInput = result.data;

        this.doLoadExam();
      }
      else{
        this.messageService.add({severity:'error', summary: 'Error', detail: result.message});
      }  


    });

  }

  doLoadExam(){

    if(this.examInput.trim().length == 0){
      return;
    }
    else{


      this.examCard = this.examInput.substr(this.formatDetail.card_start, this.formatDetail.card_lenght);
      this.examDate = this.examInput.substr(this.formatDetail.date_start, this.formatDetail.date_lenght);  
      this.examHours = this.examInput.substr(this.formatDetail.hours_start, this.formatDetail.hours_lenght);    
      this.examMinute = this.examInput.substr(this.formatDetail.minute_start, this.formatDetail.minute_lenght);    
      this.examFunction = this.examInput.substr(this.formatDetail.function_start, this.formatDetail.function_lenght);  
      this.examMachine = this.examInput.substr(this.formatDetail.machine_start, this.formatDetail.machine_lenght); 

    }

  }

  onChangeFormatCard(val: any){
    //console.log(val);
    this.examCard = this.examInput.substr(this.formatDetail.card_start, this.formatDetail.card_lenght);    
  }

  onChangeFormatDate(event: any){
    //console.log(event.target.value);
    this.examDate = this.examInput.substr(this.formatDetail.date_start, this.formatDetail.date_lenght);    
  }

  onChangeFormatHours(event: any){
    //console.log(event.target.value);
    this.examHours = this.examInput.substr(this.formatDetail.hours_start, this.formatDetail.hours_lenght);    
  }

  onChangeFormatMinute(event: any){
    //console.log(event.target.value);
    this.examMinute = this.examInput.substr(this.formatDetail.minute_start, this.formatDetail.minute_lenght);    
  }

  onChangeFormatFunction(event: any){
    //console.log(event.target.value);
    this.examFunction = this.examInput.substr(this.formatDetail.function_start, this.formatDetail.function_lenght);    
  }

  onChangeFormatMachine(event: any){
    //console.log(event.target.value);
    this.examMachine = this.examInput.substr(this.formatDetail.machine_start, this.formatDetail.machine_lenght);    
  }

  summit(){
    this.confirmRecord()
  }

  confirmRecord() {
    this.confirmationService.confirm({
        message: this.title_confirm_record[this.initial_current.Language],
        header: this.title_confirm[this.initial_current.Language],
        icon: 'pi pi-exclamation-triangle',
        accept: () => {

          this.formatDetail.company_code = this.initial_current.CompCode

          this.timeinputformatService.timeinputformat_record(this.formatDetail).then((res) => {       
            let result = JSON.parse(res);  
            if(result.success){  
              
              this.messageService.add({severity:'success', summary: 'Success', detail: "Record Success.."});
              
              setTimeout(() => {                      
                this.doLoadTimeformat()                
              }, 200);

            }
            else{  
              this.messageService.add({severity:'error', summary: 'Error', detail: "Record Not Success.."});   
            }  
          })
        },
        reject: () => {
          this.messageService.add({severity:'warn', summary:'Cancelled', detail:this.title_confirm_cancel[this.initial_current.Language]});
        },
        key: "myDialog"
    });
  }

  //-- Import
  fileToImport: File | any = null;
  handleFileImport(file: FileList) {
    this.fileToImport=file.item(0);
  }


  private task:TaskModel = new TaskModel();
  private taskDetail:TaskDetailModel = new TaskDetailModel();
  private taskWhoseList:TaskWhoseModel[]=[];
  private employee_dest: EmployeeModel[] = [];
  import() {

    if(this.fileToImport==null){
      return
    }
 

    this.confirmationService.confirm({
      message: this.title_confirm_record[this.initial_current.Language],
      header: this.title_confirm[this.initial_current.Language],
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        
        
        let filename = this.datePipe.transform(new Date(), 'yyyyMMddHHmm');
        let filetype = "txt";

        if(filename == null){
          filename = "tmp"
        }
        

        //-- Step 1 Import File
        this.timeinputformatService.uploadTimeScan(this.fileToImport, filename, filetype).then((res) =>{       
          console.log(res)
          let result = JSON.parse(res);  
          if(result.success){
            
            //-- Step 2 Record Task
            //-- Task master
            this.task.company_code = this.initial_current.CompCode;
            this.task.project_code = "";
            this.task.task_type = "IMP_TIME";
            this.task.task_status = "W";

            //-- Task detail  
            let process = "TIME";
            this.taskDetail.taskdetail_process = filename + "." + filetype;
            this.taskDetail.taskdetail_fromdate = this.initial_current.TA_FromDate;
            this.taskDetail.taskdetail_todate = this.initial_current.TA_ToDate;
            this.taskDetail.taskdetail_paydate = this.initial_current.PR_PayDate;

            this.taskService.task_record(this.task, this.taskDetail, this.employee_dest).then((res) => {       
              let result = JSON.parse(res);  
              if(result.success){  
    
                this.doLoadTask()
                this.fileToImport = null
                this.importFile.nativeElement.value = null
                this.messageService.add({severity:'success', summary: 'Success', detail: "Import Success.."});
                            
              }
              else{  
                this.messageService.add({severity:'error', summary: 'Error', detail: "Import Not Success.."});   
              }  
            })


          }
          else{
            this.messageService.add({severity:'error', summary: 'Error', detail: result.message});
          }  


        });
         
      },
      reject: () => {
        this.messageService.add({severity:'warn', summary:'Cancelled', detail:this.title_confirm_cancel[this.initial_current.Language]});
      }
    });
  }

  doLoadTask(){
    this.taskView.taskType = "IMP_TIME";
    this.taskView.doLoadTask();
  }

}

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

  public labNew:string = "New";
  public labBack:string = "Back";
  public labSave:string = "Save";
  
  public labModyfiedBy:string = "Modyfied by";
  public labModyfiedDate:string = "Modyfied date";

  public labTitle:string = "Setup format import time";
  public labChooseFile:string = "Choose File";
  public labFormat:string = "Format date";
  public labCard:string = "Card no.";
  public labDate:string = "Date";
  public labHours:string = "Hours";
  public labMinute:string = "Minute";
  public labFunction:string = "Function";
  public labMachine:string = "Machine";
  public labStart:string = "Start";
  public labLenght:string = "Lenght";

  title_confirm:string = "Are you sure?";
  title_confirm_record:string = "Confirm to record";
  title_confirm_delete:string = "Confirm to delete";
  title_confirm_yes:string = "Yes";
  title_confirm_no:string = "No";

  title_confirm_cancel:string = "You have cancelled";

  title_submit:string = "Submit";
  title_cancel:string = "Cancel";

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
      this.labTitle = "ตั้งค่ารูปแบบไฟล์นำเข้าเวลา";

      this.labChooseFile = "เลือกไฟล์";

      this.labNew = "เพิ่ม";
      this.labBack = "ย้อนกลับ";
      this.labSave = "บันทึก";

      this.labFormat = "รูปแบบวันที่";
      this.labCard = "รหัสบัตร";
      this.labDate = "วันที่";
      this.labHours = "ชั่วโมง";
      this.labMinute = "นาที";
      this.labFunction = "สถานะเข้า-ออก";
      this.labMachine = "หมายเลขเครื่อง";
      this.labStart = "เริ่ม";
      this.labLenght = "ความยาว";
      
      this.labModyfiedBy = "ผู้ทำรายการ";
      this.labModyfiedDate = "วันที่ทำรายการ";

      this.title_confirm = "ยืนยันการทำรายการ";
      this.title_confirm_record = "คุณต้องการบันทึกการทำรายการ";
      this.title_confirm_delete = "คุณต้องการลบรายการ";

      this.title_confirm_yes = "ใช่";
      this.title_confirm_no = "ยกเลิก";
      this.title_confirm_cancel = "คุณยกเลิกการทำรายการ";
    }
  }


  dateformatList: RadiovalueModel[] = [
    {value: 'dd/MM/yyyy', text: 'dd/MM/yyyy', text_th:'', text_en:''},
    {value: 'ddMMyyyy', text: 'ddMMyyyy', text_th:'', text_en:''},
    {value: 'ddMMyy', text: 'ddMMyy', text_th:'', text_en:''},
    {value: 'dd-MM-yyyy', text: 'dd-MM-yyyy', text_th:'', text_en:''},
    {value: 'dd-MM-yy', text: 'dd-MM-yy', text_th:'', text_en:''},
    {value: 'yyyy-MM-dd', text: 'yyyy-MM-dd', text_th:'', text_en:''}
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
        message: this.title_confirm_record,
        header: this.title_confirm,
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
          this.messageService.add({severity:'warn', summary:'Cancelled', detail:this.title_confirm_cancel});
        }
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
      message: this.title_confirm_record,
      header: this.title_confirm,
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
        this.messageService.add({severity:'warn', summary:'Cancelled', detail:this.title_confirm_cancel});
      }
    });
  }

  doLoadTask(){
    this.taskView.taskType = "IMP_TIME";
    this.taskView.doLoadTask();
  }

}

import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Table } from 'primeng/table';
import {
    ConfirmationService,
    ConfirmEventType,
    MessageService,
} from 'primeng/api';
import { PrjectEmpdailyModel } from '../../../../models/project/project_empdaily';
import { Router } from '@angular/router';
import { AppConfig } from '../../../../config/config';
import { InitialCurrent } from '../../../../config/initial_current';

import { SelectEmpComponent } from '../../../../components/usercontrol/select-emp/select-emp.component';
import { TaskComponent } from '../../../../components/usercontrol/task/task.component';

import { TaskModel } from '../../../../models/task';
import { TaskDetailModel } from '../../../../models/task_detail';
import { TaskWhoseModel } from '../../../../models/task_whose';
import { TaskService } from '../../../../services/task.service';
import * as xlsx from 'xlsx';
import { BankService } from 'src/app/services/system/policy/bank.service';
import { BankModel } from 'src/app/models/system/policy/bank';

interface Policy {
    name: string;
    code: string;
}
interface Result {
    worker: string;
    policy: string;
    modified_by: string;
    modified_date: string;
}
@Component({
    selector: 'app-transfer-sso',
    templateUrl: './transfer-sso.component.html',
    styleUrls: ['./transfer-sso.component.scss'],
})
export class TransferSsoComponent implements OnInit {
    [x: string]: any;
    @ViewChild(SelectEmpComponent) selectEmp: any;
    @ViewChild(TaskComponent) taskView: any;

    title_confirm: string = 'Are you sure?';
    title_confirm_record: string = 'Confirm to process';
    title_confirm_delete: string = 'Confirm to delete';
    title_confirm_yes: string = 'Yes';
    title_confirm_no: string = 'No';

    title_confirm_cancel: string = 'You have cancelled';

    title_submit: string = 'Submit';
    title_cancel: string = 'Cancel';

    @Input() policy_list: Policy[] = [];
    @Input() title: string = '';
    index: number = 0;

    constructor(
        private messageService: MessageService,
        private confirmationService: ConfirmationService,
        private taskService: TaskService,
        private router: Router,

        ///Service
        private bankService: BankService
    ) {}

    timesheet_list: PrjectEmpdailyModel[] = [];
    timesheet_dest: PrjectEmpdailyModel[] = [];
    result_list: Result[] = [];
    selectedDate: PrjectEmpdailyModel = new PrjectEmpdailyModel();
    policyselect!: Policy;
    new_data: boolean = false;
    @ViewChild('dt2') table: Table | undefined;
    ngOnInit(): void {
        this.doGetInitialCurrent();


        //dropdown
        this.doLoadBank();

        setTimeout(() => {
            this.selectedBank = '002';
        }, 1000);

        setTimeout(() => {
            // this.doLoadTask()
        }, 200);
    }

    public selectedBank: string = '';

    public initial_current: InitialCurrent = new InitialCurrent();
    doGetInitialCurrent() {
        this.initial_current = JSON.parse(
            localStorage.getItem(AppConfig.SESSIONInitial) || '{}'
        );
        if (!this.initial_current) {
            this.router.navigateByUrl('');
        }
    }

    //get  data dropdown bank
    bank_list: BankModel[] = [];
    doLoadBank() {
        var tmp = new BankModel();
        this.bankService.bank_get().then((res) => {
            this.bank_list = res;
        });
    }

    public task: TaskModel = new TaskModel();
    public taskDetail: TaskDetailModel = new TaskDetailModel();
    public taskWhoseList: TaskWhoseModel[] = [];

    public fillauto: boolean = false;

    process() {
        console.log(this.selectedBank);
    
        if (this.selectEmp.employee_dest.length == 0) {
            let message = "Please select an employee";
        
            this.doPrintMessage(message, "1");
            return;
        }
        let dialogRef = alert("Your message goes here");
        // let dialogRef = this.dialog.open(AppConfig, {
        //     disableClose: false
        //   });
        // dialogRef.result.then((result) => {
        //     if (result) {
    
        // Step 1: Task master
        this.task.company_code = this.initial_current.CompCode;
        this.task.task_type = 'TRN_SSO';
        this.task.task_status = 'W';
    
        // Step 2: Task detail
        let process = this.selectedBank;
        process += this.fillauto ? '|AUTO' : '|COMPARE';
    
        let fromDate = new Date('2023-01-10T00:00:00');
        let toDate = new Date('2023-01-11T00:00:00');
    
        this.taskDetail.taskdetail_process = 'SSO';
        this.taskDetail.taskdetail_process = process;
        this.taskDetail.taskdetail_fromdate = fromDate;
        this.taskDetail.taskdetail_todate = toDate;
        this.taskDetail.taskdetail_paydate = this.initial_current.PR_PayDate;
    
        // Step 3: Task whose
        this.taskWhoseList = [];
    
   
 
    
        this.confirmationService.confirm({
            message: this.title_confirm_record,
            header: this.title_confirm,
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                // this.list_paytran = 1;
            
                this.taskService
                    .task_record(this.task, this.taskDetail, this.selectEmp.employee_dest)
                    .then((res) => {
                        let result = JSON.parse(res);
            
                        if (result.success) {
                            // Show success message
                            this.messageService.add({
                                severity: 'success',
                                summary: 'Success',
                                detail: 'Record Success..',
                            });
            
                            console.log("test result_link");
                            console.log(result.result_link);
            
                            let link = result.result_link;
            
                            if (link !== '') {
                                // Download the file
                                console.log("test downloadFile");
                                this.downloadFile(link);
                            }
                        } else {
                            this.messageService.add({
                                severity: 'error',
                                summary: 'Error',
                                detail: 'Record Not Success..',
                            });
                            this.doPrintMessage(result.result_text, "2");
                        }
                    });
            },
            
            reject: () => {
                this.messageService.add({
                    severity: 'warn',
                    summary: 'Cancelled',
                    detail: this.title_confirm_cancel,
                });
            },
        });
    
 
    }
    
    downloadFile(link: RequestInfo | URL) {
        fetch(link)
            .then((response) => response.blob())
            .then((blob) => {

                const url = URL.createObjectURL(blob);

                // สร้างลิงก์สำหรับดาวน์โหลด
                const downloadLink = document.createElement('a');
                downloadLink.href = url;
                downloadLink.download = link+'.txt'; 

             
                document.body.appendChild(downloadLink);
                downloadLink.click();


                document.body.removeChild(downloadLink);

                 
                URL.revokeObjectURL(url);
            })
            .catch((error) => {
                console.error(error);
            });
    }
 


    doLoadTask(){
      this.taskView.taskType = "TRN_SSO";
      this.taskView.doLoadTask();
    }

    public effdate: Date = new Date();

    updateEffdate() {
        this.effdate = new Date();
    }

    function(e: any) {
        var page = e.index;
        this.index = page;
        if (page == 1) {
            setTimeout(() => {
                this.new_data = true;
            }, 300);
        } else {
            this.new_data = false;
        }
    }

    doPrintMessage(message:string, status:string){
        const dialogRef = this['dialog'].open(this.messageService, {
          width: '500px',
          data: {message: message
          }
        });
      }
    }

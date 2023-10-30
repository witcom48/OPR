import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Table } from 'primeng/table';
import {
    ConfirmationService,
    ConfirmEventType,
    MenuItem,
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
  home: any;
  itemslike: MenuItem[] = [];
    [x: string]: any;
    @ViewChild(SelectEmpComponent) selectEmp: any;
    @ViewChild(TaskComponent) taskView: any;
    title_select: { [key: string]: string } = { EN: "Please Select Employee", TH: "กรุณาเลือกพนักงาน" };
    title_bank: { [key: string]: string } = { EN: "Bank", TH: "ธนาคาร" };
    title_transfer : { [key: string]: string } = { EN: "Transfer Data", TH: "โอนย้ายข้อมูล" };
    title_transferdatal: {[key: string]: string} = {  EN: " Transfer Data",  TH: "โอนย้ายข้อมูล"}  
    title_transfersso: {[key: string]: string} = {  EN: " Transfer Sso",  TH: "ประกันสังคม"}  

    
    title_date: { [key: string]: string } = { EN: "Date", TH: "วันที่มีผล" };
    title_process: { [key: string]: string } = { EN: "Process", TH: "การทำงาน" };
    title_result: { [key: string]: string } = { EN: "Result", TH: "ผลลัพธ์" };
    title_btnprocess: { [key: string]: string } = { EN: "Process", TH: "ดำเนินการ" };
   
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
    dialog: any;
    constructor(
        private messageService: MessageService,
        private confirmationService: ConfirmationService,
        private taskService: TaskService,
        private router: Router,

        ///Service
        private bankService: BankService
    ) { }

    timesheet_list: PrjectEmpdailyModel[] = [];
    timesheet_dest: PrjectEmpdailyModel[] = [];
    result_list: Result[] = [];
    selectedDate: PrjectEmpdailyModel = new PrjectEmpdailyModel();
    policyselect!: Policy;
    new_data: boolean = false;
    @ViewChild('dt2') table: Table | undefined;
    ngOnInit(): void {
        this.doGetInitialCurrent();


       

        setTimeout(() => {
            this.doLoadTask()
        }, 200);

        this.itemslike = [{ label: this.title_transferdatal[this.initial_current.Language], routerLink: '/payroll/transfer' },
        { label: this.title_transfersso[this.initial_current.Language], styleClass: 'activelike' }];
        this.home = { icon: 'pi pi-home', routerLink: '/' };
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
    public task: TaskModel = new TaskModel();
    public taskDetail: TaskDetailModel = new TaskDetailModel();
    public taskWhoseList: TaskWhoseModel[] = [];

    public fillauto: boolean = false;

    process(): void {
 
        if (this.selectEmp.employee_dest.length === 0) {
    
          if (this.selectEmp.employee_dest.length > 0 ) {
           }else{
            this.messageService.add({ severity: 'error', summary: 'Error', detail: this.title_select[this.initial_current.Language] });
          }
          return;
        }
    
        // Step 1: Task master
        this.task.company_code = this.initial_current.CompCode;
        this.task.task_type = 'TRN_SSO';
        this.task.task_status = 'W';
    
        // Step 2: Task detail
    
        let fromDate = this.effdate;
        let toDate = this.effdate;
    
        this.taskDetail.taskdetail_process = 'SSO';
        // this.taskDetail.taskdetail_process = process;
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
            this.taskService.task_record(this.task, this.taskDetail, this.selectEmp.employee_dest)
              .then((res) => {
                let result = JSON.parse(res);
    
                if (result.success) {
                  // Show success message
                  this.messageService.add({
                    severity: 'success',
                    summary: 'Success',
                    detail: 'Record Success..',
                  });
    
                  console.log(this.selectEmp.employee_dest,'selectEmp');
                //   console.log(result.result_link);
    
                  let link = result.result_link;
    
                  if (link !== "") {
                    console.log(this.initial_current + '/File/' + link + "/");
                    console.log(link.split("\\").pop());
    
                    this.taskService.get_file(link).then((res) => {
                      const blob: Blob = new Blob([new Uint8Array(res)], { type: 'application/vnd.ms-excel' });
                      const fileName: string = link.split("\\").pop();
                      const objectUrl: string = URL.createObjectURL(blob);
                      const a: HTMLAnchorElement = document.createElement('a') as HTMLAnchorElement;
    
                      a.href = objectUrl;
                      a.download = fileName;
                      document.body.appendChild(a);
                      a.click();
    
                      document.body.removeChild(a);
                      URL.revokeObjectURL(objectUrl);
                    });
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
          key: "myDialog"
        });
      }



    // process() {
    //     // console.log(this.selectedBank);

    //     if (this.selectEmp.employee_dest.length === 0) {
    //         let message = "Please select an employee";

    //         this.doPrintMessage(message, "1");
    //         return;
    //     }


    //     // Step 1: Task master
    //     this.task.company_code = this.initial_current.CompCode;
    //     this.task.task_type = 'TRN_SSO';
    //     this.task.task_status = 'W';

    //     // Step 2: Task detail
    //     let process = this.selectedBank;
    //     process += this.fillauto ? '|AUTO' : '|COMPARE';

    //     let fromDate = new Date(this.initial_current.PR_PayDate);
    //     let toDate = new Date(this.initial_current.PR_PayDate);

    //     this.taskDetail.taskdetail_process = 'SSO';
    //     // this.taskDetail.taskdetail_process = process;
    //     this.taskDetail.taskdetail_fromdate = fromDate;
    //     this.taskDetail.taskdetail_todate = toDate;
    //     this.taskDetail.taskdetail_paydate = this.initial_current.PR_PayDate;
    //     // Step 3: Task whose
    //     this.taskWhoseList = [];
    //     this.confirmationService.confirm({
    //         message: this.title_confirm_record,
    //         header: this.title_confirm,
    //         icon: 'pi pi-exclamation-triangle',
    //         accept: () => {
    //             this.taskService.task_record(this.task, this.taskDetail, this.selectEmp.employee_dest).then((res) => {
    //                 let result = JSON.parse(res);
    //                 if (result.success) {
    //                     // Show success message
    //                     this.messageService.add({
    //                         severity: 'success',
    //                         summary: 'Success',
    //                         detail: 'Record Success..',
    //                     });
    //                     let link = result.result_link;
    //                     if (link !== "") {
    //                         this.taskService.get_file(link).then((res) => {
    //                             const blob: Blob = new Blob([new Uint8Array(res)], { type: 'application/vnd.ms-excel' });
    //                             const fileName: string = link.split("\\").pop();
    //                             const objectUrl: string = URL.createObjectURL(blob);
    //                             const a: HTMLAnchorElement = document.createElement('a') as HTMLAnchorElement;

    //                             a.href = objectUrl;
    //                             a.download = fileName;
    //                             document.body.appendChild(a);
    //                             a.click();

    //                             document.body.removeChild(a);
    //                             URL.revokeObjectURL(objectUrl);

    //                         })

    //                     }
    //                 } else {
    //                     this.messageService.add({
    //                         severity: 'error',
    //                         summary: 'Error',
    //                         detail: 'Record Not Success..',
    //                     });
    //                     this.doPrintMessage(result.result_text, "2");
    //                 }
    //             });
    //         },

    //         reject: () => {
    //             this.messageService.add({
    //                 severity: 'warn',
    //                 summary: 'Cancelled',
    //                 detail: this.title_confirm_cancel,
    //             });
    //         },
    //         key: "myDialog"

    //     });


    // }

    doLoadTask() {
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

    doPrintMessage(message: string, status: string) {
        const dialogRef = this.dialog.open(this.messageService, {
          width: '500px',
          data: {
            message: message
          }
        });
      }

    // doPrintMessage(message: string, status: string) {
    //     const dialogRef = this['dialog'].open(this.messageService, {
    //         width: '500px',
    //         data: {
    //             message: message
    //         }
    //     });
    // }
}

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
import { CombankModel } from 'src/app/models/system/combank';
import { CompanyDetailService } from 'src/app/services/system/company_detail.service';

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
  selector: 'app-transfer-provident',
  templateUrl: './transfer-provident.component.html',
  styleUrls: ['./transfer-provident.component.scss']
})
export class TransferProvidentComponent implements OnInit {

  home: any;
  itemslike: MenuItem[] = [];
  [x: string]: any;
  @ViewChild(SelectEmpComponent) selectEmp: any;
  @ViewChild(TaskComponent) taskView: any;
  title_select: { [key: string]: string } = { EN: "Please Select Employee", TH: "กรุณาเลือกพนักงาน" };
  title_bank: { [key: string]: string } = { EN: "Bank", TH: "ธนาคาร" };
  title_transfer: { [key: string]: string } = { EN: "Transfer Data", TH: "โอนย้ายข้อมูล" };
  title_transferdatal: { [key: string]: string } = { EN: " Transfer Data", TH: "โอนย้ายข้อมูล" }
  title_transfersso: { [key: string]: string } = { EN: " Transfer Sso", TH: "กองทุนสำรองเลี้ยงชีพ" }


  title_date: { [key: string]: string } = { EN: "Date", TH: "วันที่มีผล" };
  title_process: { [key: string]: string } = { EN: "Process", TH: "การทำงาน" };
  title_result: { [key: string]: string } = { EN: "Result", TH: "ผลลัพธ์" };
  title_btnprocess: { [key: string]: string } = { EN: "Process", TH: "ดำเนินการ" };
  title_fundCode: { [key: string]: string } = { EN: "FUND_CODE", TH: "รหัสกองทุน" };
  title_company: { [key: string]: string } = { EN: "COMP_CODE", TH: "รหัสบริษัท" };



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

    private companyDetailService: CompanyDetailService,

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


    this.doLoadCombankList();


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


  public PatternCode: string = "";
  public CompanyCode: string = "";
  public PFCode: string = "";



  combankList: CombankModel[] = [];
  selectedCombank: CombankModel = new CombankModel();
  doLoadCombankList() {
    var tmp = new CombankModel();
    tmp.combank_bankcode = this.selectedCombank.combank_bankcode;

      this.companyDetailService.getcompany_bank(this.initial_current.CompCode, '', tmp)
        .then((res) => {
          this.combankList = res;
          if (this.combankList.length > 0) {
            this.selectedCombank = this.combankList[0];

            // this.selectedCombank.combank_bankcode;
          } else {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'เลือกธนาคาร' });
          }
        });
    
}


  process(): void {

    if (this.selectEmp.employee_dest.length === 0) {

      if (this.selectEmp.employee_dest.length > 0) {
      } else {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: this.title_select[this.initial_current.Language] });
      }
      return;
    }

    if (!this.CompanyCode) {
      this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'กรุณากรอก COMP_CODE'
      });
      return;
  }

  if (!this.PFCode) {
      this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'กรุณากรอก FUND_CODE'
      });
      return;
  }

    // Step 1: Task master
    this.task.company_code = this.initial_current.CompCode;
    this.task.task_type = 'TRN_PF';
    this.task.task_status = 'W';

    // Step 2: Task detail
    let process =this.selectedCombank.combank_bankcode;  

    let fromDate = this.effdate;
    let toDate = this.effdate;
    
    this.taskDetail.taskdetail_process = "PF" + "|" + this.CompanyCode + "|" + this.PFCode + "|" + this.PatternCode;
    this.taskDetail.taskdetail_process = this.selectedCombank.combank_bankcode;

    this.taskDetail.taskdetail_fromdate = fromDate;
    this.taskDetail.taskdetail_todate = toDate;
    this.taskDetail.taskdetail_paydate = this.initial_current.PR_PayDate;
    this.taskDetail.taskdetail_process = process;

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


              let link = result.result_link;

              if (link !== "") {


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




  doLoadTask() {
    this.taskView.taskType = "TRN_PF";
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

}

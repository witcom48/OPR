import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, NavigationExtras } from '@angular/router';
import { Table } from 'primeng/table';
import { MegaMenuItem, MenuItem } from 'primeng/api';
import { Router } from '@angular/router';

import { DatePipe } from '@angular/common';
import { ConfirmationService, ConfirmEventType, MessageService } from 'primeng/api';
import * as XLSX from 'xlsx';

import { AppConfig } from '../../../config/config';
import { InitialCurrent } from '../../../config/initial_current';

import { ProgenaralService } from '../../../services/project/pro_genaral.service';

import { AccountModel } from '../../../models/self/account';
import { AccountServices } from 'src/app/services/self/account.service';
import { SysworkflowServices } from 'src/app/services/system/security/sysworkflow.service';
import { TRWorkflowModel } from 'src/app/models/system/security/workflow';
import { AccessdataModel } from 'src/app/models/system/security/accessdata';


@Component({
  selector: 'app-polapprove',
  templateUrl: './polapprove.component.html',
  styleUrls: ['./polapprove.component.scss']
})
export class PolapproveComponent implements OnInit {

  constructor(
    private messageService: MessageService,
    private router: Router,
    private accountService: AccountServices,
    private sysworkflowService: SysworkflowServices,
  ) { }
  statusload: boolean = false;
  Workflow_list: TRWorkflowModel[] = [];
  Workflow: TRWorkflowModel[] = [];
  accountList: AccountModel[] = [];
  availableAccountnew: AccountModel[] = [];
  selectedAccountnew: AccountModel[] = [];
  availableAccounttran: AccountModel[] = [];
  selectedAccounttran: AccountModel[] = [];
  availableAccountcost: AccountModel[] = [];
  selectedAccountcost: AccountModel[] = [];
  availableAccountapply: AccountModel[] = [];
  selectedAccountapply: AccountModel[] = [];
  availableAccountpay: AccountModel[] = [];
  selectedAccountpay: AccountModel[] = [];

  public initial_current: InitialCurrent = new InitialCurrent();
  initialData2: InitialCurrent = new InitialCurrent();
  accessData: AccessdataModel = new AccessdataModel();
  doGetInitialCurrent() {
    this.initial_current = JSON.parse(localStorage.getItem(AppConfig.SESSIONInitial) || '{}');
    if (!this.initial_current) {
      this.router.navigateByUrl('login');
    }
    this.accessData = this.initialData2.dotGetPolmenu('SYS');
    // console.log(this.accessData);
    // console.log(this.accessData.accessdata_new)
  }
  ngOnInit(): void {
    this.doGetInitialCurrent();
    this.loadAccounts();
  }

  // Loads the list of accounts
  loadAccounts(): void {
    this.accountList = [];
    const tmp = new AccountModel();
    tmp.account_type = 'ADM';
    this.accountService.account_get(tmp).then(async (res) => {
      this.accountList = await res;
      this.loadWorkflows();
    });
  }

  // Loads the list of workflows
  loadWorkflows(): void {
    this.statusload = false;
    this.Workflow_list = [];
    this.initializeAccountLists();

    const tmp = new TRWorkflowModel();
    this.sysworkflowService.workflow_get(tmp).then(async (res: TRWorkflowModel[]) => {
      this.Workflow_list = await res;
      this.updateAccountLists();
      this.statusload = true;
    });
  }

  private initializeAccountLists(): void {
    this.availableAccountnew = [];
    this.selectedAccountnew = [];
    this.availableAccounttran = [];
    this.selectedAccounttran = [];
    this.availableAccountcost = [];
    this.selectedAccountcost = [];
    this.availableAccountapply = [];
    this.selectedAccountapply = [];
    this.availableAccountpay = [];
    this.selectedAccountpay = [];
  }

  private updateAccountLists(): void {
    this.accountList.forEach((account: AccountModel) => {
      this.updateAccountList(account, 'PRO_NEW', this.selectedAccountnew, this.availableAccountnew);
      this.updateAccountList(account, 'PRO_TRN', this.selectedAccounttran, this.availableAccounttran);
      this.updateAccountList(account, 'PRO_COS', this.selectedAccountcost, this.availableAccountcost);
      this.updateAccountList(account, 'REQ_APY', this.selectedAccountapply, this.availableAccountapply);
      this.updateAccountList(account, 'PAY_PYM', this.selectedAccountpay, this.availableAccountpay);
    });
  }

  private updateAccountList(account: AccountModel, workflowType: string, selectedList: AccountModel[], availableList: AccountModel[]): void {
    if (this.hasAccessMenu(this.Workflow_list, account.account_user, workflowType)) {
      selectedList.push(account);
    } else {
      availableList.push(account);
    }
  }

  private hasAccessMenu(workflowlist: TRWorkflowModel[], account: string, workflow_type: string): boolean {
    return workflowlist.some(item => item.account_user === account && item.workflow_type === workflow_type);
  }

  async recordWorkflow(data: TRWorkflowModel[]): Promise<void> {

    const res = await this.sysworkflowService.workflow_record(data);
    if (res.success) {
      this.messageService.add({ severity: 'success', summary: 'Success', detail: res.message });
      this.loadWorkflows();
    } else {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: res.message });
    }
  }

  private addWorkflow(account: AccountModel, workflowType: string) {
    const tem = new TRWorkflowModel();
    tem.workflow_type = workflowType;
    tem.company_code = this.initial_current.CompCode;
    tem.account_user = account.account_user;
    this.Workflow.push(tem);
  }

  save() {
    this.Workflow = [];
    this.selectedAccountnew.forEach((account) => {
      this.addWorkflow(account, 'PRO_NEW');
    });

    this.selectedAccounttran.forEach((account) => {
      this.addWorkflow(account, 'PRO_TRN');
    });

    this.selectedAccountcost.forEach((account) => {
      this.addWorkflow(account, 'PRO_COS');
    });

    this.selectedAccountapply.forEach((account) => {
      this.addWorkflow(account, 'REQ_APY');
    });

    this.selectedAccountpay.forEach((account) => {
      this.addWorkflow(account, 'PAY_PYM');
    });
    // console.log(this.Workflow);
    this.recordWorkflow(this.Workflow);
  }
}


import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';

import { DatePipe } from '@angular/common';
import { ConfirmationService, ConfirmEventType, MenuItem, MessageService } from 'primeng/api';
import { AppConfig } from '../../../config/config';
import { InitialCurrent } from '../../../config/initial_current';
import { WorkflowModel } from '../../../models/self/workflow';
import { WorkflowServices } from 'src/app/services/self/workflow.service';
declare var workflow: any;
interface Type {
  name: string,
  code: string
}
@Component({
  selector: 'app-self-workflow',
  templateUrl: './self-workflow.component.html',
  styleUrls: ['./self-workflow.component.scss']
})
export class SelfWorkflowComponent implements OnInit {
  langs: any = workflow;
  selectlang: string = "EN";
  constructor(private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private datePipe: DatePipe,
    private workflowService: WorkflowServices,
    private router: Router,
  ) { }
  TypeList: Type[] = [{ name: "Leave", code: "LEAVE" }, { name: "Shift", code: "SHIFT" }];
  selectedtype: any;
  items_menu: MenuItem[] = [];
  new_data: boolean = false
  edit_data: boolean = false
  workflow_manage: boolean = false;
  workflow_list: WorkflowModel[] = [];
  selectedWorkflow: WorkflowModel = new WorkflowModel();
  public initial_current: InitialCurrent = new InitialCurrent();
  doGetInitialCurrent() {
    this.initial_current = JSON.parse(localStorage.getItem(AppConfig.SESSIONInitial) || '{}');
    if (!this.initial_current.Token) {
      this.router.navigateByUrl('');
    }
    this.selectlang = this.initial_current.Language;
  }
  ngOnInit(): void {
    this.doGetInitialCurrent()
    this.doLoadMenu()
    this.doLoadWorkflow()
  }
  doLoadWorkflow() {
    this.workflow_list = [];
    var tmp = new WorkflowModel();
    this.workflowService.workflow_get(tmp).then(async (res) => {
      this.workflow_list = await res;
    });
  }
  async doRecordWorkflow(data: WorkflowModel) {
    let totalapp = 0;
    if (data.step1) {
      totalapp += 1
    }
    if (data.step2) {
      totalapp += 1
    }
    if (data.step3) {
      totalapp += 1
    }
    if (data.step4) {
      totalapp += 1
    }
    if (data.step5) {
      totalapp += 1
    }
    data.totalapprove = totalapp;
    await this.workflowService.workflow_record(data).then((res) => {
      if (res.success) {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: res.message });
        this.doLoadWorkflow()
      }
      else {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: res.message });
      }

    });
    this.new_data = false;
    this.edit_data = false;
  }
  async doDeleteWorkflow(data: WorkflowModel) {
    await this.workflowService.workflow_delete(data).then((res) => {
      if (res.success) {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: res.message });
        this.doLoadWorkflow()
      }
      else {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: res.message });
      }

    });
    this.new_data = false;
    this.edit_data = false;
  }

  doLoadMenu() {

    this.items_menu = [
      {
        label: this.langs.get('new')[this.selectlang],
        icon: 'pi pi-fw pi-plus',
        command: (event) => {
          this.selectedWorkflow = new WorkflowModel();
          this.new_data = true;
          this.edit_data = false;
          this.selectedtype = this.TypeList[0]
        }
      }
      ,
      {
        label: this.langs.get('import')[this.selectlang],
        icon: 'pi pi-fw pi-file-import',
        command: (event) => {

        }
      }
      ,
      {
        label: this.langs.get('export')[this.selectlang],
        icon: 'pi pi-fw pi-file-export',
        command: (event) => {

        }
      }
    ];
  }
  selectType() {
    this.selectedWorkflow.workflow_type = this.selectedtype.code;
  }
  onRowSelect(event: Event) {
    this.new_data = true
    this.edit_data = true;
    this.selectedtype = this.TypeList.find(({ code }) => code === this.selectedWorkflow.workflow_type);
  }
  close() {
    this.new_data = false
    this.edit_data = false
    this.selectedWorkflow = new WorkflowModel()
  }
  Delete() {
    this.doDeleteWorkflow(this.selectedWorkflow)
  }
  Save() {
    console.log(this.selectedWorkflow)
    this.doRecordWorkflow(this.selectedWorkflow)
  }

}

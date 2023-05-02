
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';

import { DatePipe } from '@angular/common';
import { ConfirmationService, ConfirmEventType, MenuItem, MessageService } from 'primeng/api';
import { AppConfig } from '../../../config/config';
import { InitialCurrent } from '../../../config/initial_current';
import { WorkflowModel } from '../../../models/self/workflow';
import { PositionModel } from '../../../models/employee/policy/position';
import { WorkflowServices } from 'src/app/services/self/workflow.service';
import { PositionService } from 'src/app/services/emp/policy/position.service';
import { LineapproveModel } from 'src/app/models/self/lineapprove';
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
    private positionService: PositionService,
    private router: Router,
  ) { }
  TypeList: Type[] = [];
  selectedtype: any;
  items_menu: MenuItem[] = [];
  new_data: boolean = false
  edit_data: boolean = false
  position_level_list: any[] = [];
  position_level_source: any[] = [];
  position_level_target: any[] = [];
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
    this.TypeList = [
      { code: 'LEA', name: this.langs.get('leavereq')[this.selectlang] },
      { code: 'OT', name: this.langs.get('otreq')[this.selectlang] },
      { code: 'DAT', name: this.langs.get('daytypereq')[this.selectlang] },
      { code: 'SHT', name: this.langs.get('shiftreq')[this.selectlang] },
      { code: 'ONS', name: this.langs.get('onsitereq')[this.selectlang] },
    ];
    this.doGetInitialCurrent()
    this.doLoadMenu()
    this.doLoadWorkflow()
    this.doLoadPositionlevel()
  }
  doLoadWorkflow() {
    this.workflow_list = [];
    var tmp = new WorkflowModel();
    this.workflowService.workflow_get(tmp).then(async (res) => {
      this.workflow_list = await res;
    });
  }

  doLoadPositionlevel() {
    this.position_level_source = [];
    this.positionService.position_get().then(async (res) => {
      this.position_level_list = await res;
    });

    // this.position_level_source = [];
    // var tmp = new WorkflowModel();
    // this.workflowService.workflow_getposition_level(tmp).then(async (res) => {
    //   this.position_level_source = await res;
    // });
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
    data.workflow_type = this.selectedtype.code;
    console.log(data)
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

  teset(event: any) {
    console.log(event)
    var data = event.items;
    event.items = []
    var arr = this.position_level_source.filter((obj: PositionModel) => {
      if (obj.position_level === data.slice(-1)[0].position_level) {
        this.position_level_target.push(obj)
      }
      return obj.position_level !== data.slice(-1)[0].position_level
    })

    this.position_level_source = arr;
  }
  teset2(event: any) {
    var data = event.items;
    event.items = []
    console.log(event)
    var arr = this.position_level_target.filter((obj: PositionModel) => {
      if (obj.position_level === data.slice(-1)[0].position_level) {
        this.position_level_source.push(obj)
      }
      return obj.position_level !== data.slice(-1)[0].position_level
    })

    this.position_level_target = arr;
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
          this.position_level_source = this.position_level_list;
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
    console.log(this.selectedtype)
    this.selectedWorkflow.workflow_type = this.selectedtype.code;
  }
  onRowSelect(event: Event) {
    this.position_level_target = []
    this.position_level_source = []
    this.new_data = true
    this.edit_data = true;
    this.selectedtype = this.TypeList.find(({ code }) => code === this.selectedWorkflow.workflow_type);
    this.selectedWorkflow.lineapprove_data.filter((obj: LineapproveModel) => {
      this.position_level_list.filter((elm: PositionModel) => {
        if (+obj.position_level === elm.position_level) {
          this.position_level_target.push(elm)
        }
      })
    })
    this.position_level_list.filter((elm: PositionModel) => {
      if (!this.position_level_target.includes(elm)) {
        this.position_level_source.push(elm)
      }
    })
  }
  typename(codemodel: string) {
    return this.TypeList.find(({ code }) => code === codemodel)?.name;
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
    this.selectedWorkflow.lineapprove_data = []
    const unique = [...new Set(this.position_level_target.map(item => item.position_level))];
    unique.forEach((obj) => {
      this.selectedWorkflow.lineapprove_data.push({
        company_code: this.initial_current.CompCode,
        workflow_type: this.selectedWorkflow.workflow_type,
        workflow_code: this.selectedWorkflow.workflow_code,
        position_level: obj,
        flag: false
      })
    })
    this.doRecordWorkflow(this.selectedWorkflow)
  }

}

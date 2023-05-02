
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

import { LineapproveModel } from '../../../models/self/lineapprove';

import { RadiovalueModel } from '../../../models/project/radio_value';
import { WorkflowServices } from 'src/app/services/self/workflow.service';
declare var lineapprove: any;

@Component({
  selector: 'app-self-lineapprove',
  templateUrl: './self-lineapprove.component.html',
  styleUrls: ['./self-lineapprove.component.scss']
})
export class SelfLineapproveComponent implements OnInit {
  langs: any = lineapprove;
  selectlang: string = "EN";
  constructor(private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private datePipe: DatePipe,
    private workflowService: WorkflowServices,
    private router: Router,
  ) { }
  items_menu: MenuItem[] = [];
  new_data: boolean = false;
  edit_data: boolean = false;
  account_manage: boolean = false;
  lineapprove_list: LineapproveModel[] = [];
  selectedLineapprove: LineapproveModel = new LineapproveModel();
  public initial_current: InitialCurrent = new InitialCurrent();
  doGetInitialCurrent() {
    this.initial_current = JSON.parse(localStorage.getItem(AppConfig.SESSIONInitial) || '{}');
    if (!this.initial_current) {
      this.router.navigateByUrl('');
    }
  }

  ngOnInit(): void {
    this.doGetInitialCurrent()
    this.doLoadMenu()
  }
  doLoadMenu() {

    this.items_menu = [
      {
        label: this.langs.get('new')[this.selectlang],
        icon: 'pi pi-fw pi-plus',
        command: (event) => {
          this.selectedLineapprove = new LineapproveModel();
          this.new_data = true;
          this.edit_data = false;
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
  doLoadAccount() {

  }
  onRowSelectAccount(event: Event) {

  }
}

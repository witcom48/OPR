
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

import { RadiovalueModel } from '../../../models/project/radio_value';

import { PositionModel } from '../../../models/employee/policy/position';
import { PositionService } from '../../../services/emp/policy/position.service';

import { LevelService } from 'src/app/services/system/policy/level.service';
import { LevelModel } from 'src/app/models/system/policy/level';

import { CompanyModel } from 'src/app/models/system/company';
import { CompanyService } from 'src/app/services/system/company.service';

import { ProjectModel } from '../../../models/project/project';
import { ProjectService } from '../../../services/project/project.service';

import { PartModel } from '../../../models/employee/policy/part';
import { PartService } from '../../../services/emp/policy/part.service';
import { AccessdataModel } from 'src/app/models/system/security/accessdata';

@Component({
  selector: 'app-sec-account',
  templateUrl: './sec-account.component.html',
  styleUrls: ['./sec-account.component.scss']
})
export class SecAccountComponent implements OnInit {
  // Type: string = "'GRP','APR','Emp'"
  Type: string = ""
  itemslike: MenuItem[] = [{ label: 'Security system', routerLink: '/system/security' }, { label: 'Account', routerLink: '/sec/account', styleClass: 'activelike' }];
  home: any = { icon: 'pi pi-home', routerLink: '/' }
  items_menu: MenuItem[] = [];
  title_page: string = "Geanral";
  title_new: string = "New";
  title_edit: string = "Edit";
  title_delete: string = "Delete";
  title_import: string = "Import";
  title_export: string = "Export";
  title_save: string = "Save";
  title_code: string = "Code";
  title_user: string = "Username";
  title_pass: string = "Password";
  title_type: string = "Type";

  title_modified_by: string = "Edit by";
  title_modified_date: string = "Edit date";
  title_search: string = "Search";
  title_upload: string = "Upload";

  title_page_from: string = "Showing";
  title_page_to: string = "to";
  title_page_total: string = "of";
  title_page_record: string = "entries";

  constructor(private genaralService: ProgenaralService,
    private router: Router,
    private route: ActivatedRoute,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private datePipe: DatePipe,
    private positionService: PositionService,
    private partService: PartService,
    private companyService: CompanyService,
    private projectService: ProjectService
  ) { }

  ngOnInit(): void {
    this.doGetInitialCurrent()
    this.doLoadMenu()

    setTimeout(() => {
      this.doLoadProject()
      this.doLoadPosition()
      this.doLoadCompany()
      this.doLoadDep()

    }, 500);
  }

  public initial_current: InitialCurrent = new InitialCurrent();
  initialData2: InitialCurrent = new InitialCurrent();
  accessData: AccessdataModel = new AccessdataModel();
  doGetInitialCurrent() {
    this.initial_current = JSON.parse(localStorage.getItem(AppConfig.SESSIONInitial) || '{}');
    if (!this.initial_current) {
      this.router.navigateByUrl('login');
    }
    this.accessData = this.initialData2.dotGetPolmenu('SYS');
    console.log(this.accessData);
    console.log(this.accessData.accessdata_new)
  }

  doLoadMenu() {

    this.items_menu = [
      {
        label: this.title_new,
        icon: 'pi pi-fw pi-plus',
        command: (event) => {
        if(this.accessData.accessdata_new){
          this.account_manage = true
          this.displayManage = true
        }else{
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Permistion' });
        }
        }
      }
      ,
      {
        label: this.title_import,
        icon: 'pi pi-fw pi-file-import',
        command: (event) => {

        }
      }
      ,
      {
        label: this.title_export,
        icon: 'pi pi-fw pi-file-export',
        command: (event) => {

        }
      }
    ];
  }

  edit_data: boolean = false;
  account_manage: boolean = false;
  account_list: AccountModel[] = [];
  selectedAccount: AccountModel = new AccountModel();
  doLoadAccount() {

  }
  onRowSelectAccount(event: Event) {

  }

  displayManage: boolean = false;
  position: string = "right";
  manage_title: string = "Manage"
  showManage() {
    this.displayManage = true;

  }

  company_list: CompanyModel[] = [];
  company_list_dest: CompanyModel[] = [];
  doLoadCompany() {
    this.companyService.company_get("").then((res) => {
      this.company_list = res;
    });
  }

  project_list: ProjectModel[] = [];
  project_list_dest: ProjectModel[] = [];
  doLoadProject() {
    this.projectService.project_get("", "").then((res) => {
      this.project_list = res;
    });
  }

  position_list: PositionModel[] = [];
  position_list_dest: PositionModel[] = [];
  doLoadPosition() {
    this.positionService.position_get().then((res) => {
      this.position_list = res;
    });
  }

  dep_list: PartModel[] = [];

  dep1_list: PartModel[] = [];
  dep1_list_dest: PartModel[] = [];

  dep2_list: PartModel[] = [];
  dep2_list_dest: PartModel[] = [];

  dep3_list: PartModel[] = [];
  dep3_list_dest: PartModel[] = [];

  dep4_list: PartModel[] = [];
  dep4_list_dest: PartModel[] = [];

  dep5_list: PartModel[] = [];
  dep5_list_dest: PartModel[] = [];

  async doLoadDep() {
    var tmp = new LevelModel();
    await this.partService.dep_get(tmp).then((res) => {
      this.dep_list = res;
    });

    setTimeout(() => {
      this.doGetLevel1()
    }, 500);
  }

  doGetLevel1() {

    this.dep1_list = [];
    this.dep2_list = [];
    this.dep3_list = [];
    this.dep4_list = [];
    this.dep5_list = [];

    this.dep1_list_dest = [];
    this.dep2_list_dest = [];
    this.dep3_list_dest = [];
    this.dep4_list_dest = [];
    this.dep5_list_dest = [];

    for (let i = 0; i < this.dep_list.length; i++) {
      if (this.dep_list[i].dep_level == "01") {
        this.dep1_list.push(this.dep_list[i]);
      }

    }
  }




  doGetLevel2() {
    this.dep2_list = [];
    this.dep2_list_dest = [];
    for (let i = 0; i < this.dep1_list_dest.length; i++) {

      var dep = this.dep1_list_dest[i].dep_code;

      for (let j = 0; j < this.dep_list.length; j++) {
        if (this.dep_list[j].dep_level == "02" && this.dep_list[j].dep_parent == dep) {
          this.dep2_list.push(this.dep_list[j]);
        }

      }
    }
  }








}

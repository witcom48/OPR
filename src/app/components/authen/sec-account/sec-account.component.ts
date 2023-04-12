
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, NavigationExtras } from '@angular/router';
import { Table } from 'primeng/table';
import { MegaMenuItem,MenuItem } from 'primeng/api';
import { Router } from '@angular/router';

import { DatePipe } from '@angular/common';
import {ConfirmationService, ConfirmEventType, MessageService} from 'primeng/api';
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

@Component({
  selector: 'app-sec-account',
  templateUrl: './sec-account.component.html',
  styleUrls: ['./sec-account.component.scss']
})
export class SecAccountComponent implements OnInit {

  items_menu: MenuItem[] = [];
  title_page:string = "Geanral";
  title_new:string = "New";
  title_edit:string = "Edit";
  title_delete:string = "Delete";
  title_import:string = "Import";
  title_export:string = "Export";
  title_save:string = "Save";
  title_code:string = "Code";
  title_user:string = "Username";
  title_pass:string = "Password";
  title_type:string = "Type";

  title_modified_by:string = "Edit by";
  title_modified_date:string = "Edit date";
  title_search:string = "Search";
  title_upload:string = "Upload";

  title_page_from:string = "Showing";
  title_page_to:string = "to";
  title_page_total:string = "of";
  title_page_record:string = "entries";

  constructor(private genaralService: ProgenaralService,    
    private router:Router, 
    private route: ActivatedRoute,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private datePipe: DatePipe,
    private positionService: PositionService,
    private levelService: LevelService,
    ) { }

  ngOnInit(): void {
    this.doGetInitialCurrent()
    this.doLoadMenu()

    setTimeout(() => {     
      this.doLoadPosition()
    }, 500);
  }

  public initial_current:InitialCurrent = new InitialCurrent();  
  doGetInitialCurrent(){    
    this.initial_current = JSON.parse(localStorage.getItem(AppConfig.SESSIONInitial) || '{}');
    if (!this.initial_current) {
      this.router.navigateByUrl('');
    }       
  }

  doLoadMenu(){
       
    this.items_menu = [   
      {
        label:this.title_new,
        icon:'pi pi-fw pi-plus',
        command: (event) => {
          this.account_manage = true
          this.displayManage = true
        }     
      }
      ,    
      {
          label:this.title_import,
          icon:'pi pi-fw pi-file-import',       
          command: (event) => {
                       
          }        
      }
      ,    
      {
          label:this.title_export,
          icon:'pi pi-fw pi-file-export',  
          command: (event) => {
                       
          }                
      }      
    ];
  }

  edit_data: boolean = false;
  account_manage: boolean = false;
  account_list: AccountModel[] = [];
  selectedAccount: AccountModel = new AccountModel();
  doLoadAccount(){

  }
  onRowSelectAccount(event: Event) {
    
  }

  displayManage: boolean = false;
  position: string = "right";
  manage_title: string = "Manage"
  showManage() {    
    this.displayManage = true;

  }

  position_list : PositionModel[] = [];
  position_list_dest : PositionModel[] = [];
  selectedPosition : PositionModel = new PositionModel();
  doLoadPosition(){
    this.positionService.position_get().then((res) => {
     this.position_list = res;     
    });
  }

  dep1_list : PositionModel[] = [];
  dep1_list_dest : PositionModel[] = [];
  selectedDep1 : PositionModel = new PositionModel();

  dep2_list : PositionModel[] = [];
  dep2_list_dest : PositionModel[] = [];
  selectedDep2 : PositionModel = new PositionModel();

  dep3_list : PositionModel[] = [];
  dep3_list_dest : PositionModel[] = [];
  selectedDep3 : PositionModel = new PositionModel();
  



}

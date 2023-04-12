  
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
  import { ProbusinessModel, ProtypeModel, ProslipModel, ProuniformModel } from '../../../models/project/policy/pro_genaral';
  import { ProgenaralService } from '../../../services/project/pro_genaral.service';

  import { WorkflowModel } from '../../../models/self/workflow';

  import { RadiovalueModel } from '../../../models/project/radio_value';

@Component({
  selector: 'app-self-workflow',
  templateUrl: './self-workflow.component.html',
  styleUrls: ['./self-workflow.component.scss']
})
export class SelfWorkflowComponent implements OnInit {

  items_menu: MenuItem[] = [];
  title_page:string = "Geanral";
  title_new:string = "New";
  title_edit:string = "Edit";
  title_delete:string = "Delete";
  title_import:string = "Import";
  title_export:string = "Export";
  title_save:string = "Save";
  title_code:string = "Code";
  title_name_th:string = "Name (Thai)";
  title_name_en:string = "Name (Eng.)";
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
    private datePipe: DatePipe
    ) { }

  ngOnInit(): void {
    this.doGetInitialCurrent()
    this.doLoadMenu()
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
          this.workflow_manage = true
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
  workflow_manage: boolean = false;
  workflow_list: WorkflowModel[] = [];
  selectedWorkflow: WorkflowModel = new WorkflowModel();
  doLoadWorkflow(){

  }
  onRowSelectWorkflow(event: Event) {
    
  }

}

import { Component, OnInit } from '@angular/core';
import { MegaMenuItem,MenuItem } from 'primeng/api';

import { ProjectWorkflowModel } from '../../../models/project/project_workflow'

@Component({
  selector: 'app-project-workflow',
  templateUrl: './project-workflow.component.html',
  styleUrls: ['./project-workflow.component.scss']
})
export class ProjectWorkflowComponent implements OnInit {

  items: MenuItem[] = [];
  toolbar_menu: MenuItem[] = [];

  project_workflow: ProjectWorkflowModel[] = [];

  edit_workflow: boolean = false;

  constructor() { }

  ngOnInit(): void {

    this.doLoadSimple()
    this.doLoadProjectWorkflow()

  }

  doLoadSimple(){
    this.toolbar_menu = [
      {
        label:'Save',
        icon:'pi pi-fw pi-save',
        
      },
      {
          label:'Export',
          icon:'pi pi-fw pi-file-export',
          command: (event) => {
            console.log('Edit')
        }        
      },    
    ];

 
    this.items = [
   
      {
        label:'New',
        icon:'pi pi-fw pi-plus',
        
      },
      {
          label:'Edit',
          icon:'pi pi-fw pi-pencil',
          command: (event) => {
            console.log('Edit')
        }        
      },    
      {
          label:'Delete',
          icon:'pi pi-fw pi-trash',          
      }
     
      ,    
      {
          label:'Import',
          icon:'pi pi-fw pi-file-import',          
      }
      ,    
      {
          label:'Export',
          icon:'pi pi-fw pi-file-export',          
      }
      
    ];

  }

  selectedProjectWorkflow: ProjectWorkflowModel = new ProjectWorkflowModel;
  doLoadProjectWorkflow(){
    var tmp = new ProjectWorkflowModel();

    tmp.pworkflow_code = "W0001";
    tmp.pworkflow_type = "project_flow";
    tmp.pworkflow_step = 1;
    tmp.pworkflow_level = "1";
    tmp.pworkflow_empid = "1000034";
    tmp.pworkflow_empname = "นายบัณฑิต ยิ่งเจริญ";
    tmp.pworkflow_emppos = "หัวหน้างาน";
    tmp.pworkflow_note = "";    
    tmp.modified_by = "hropr";
    this.project_workflow.push(tmp);

    tmp = new ProjectWorkflowModel();

    tmp.pworkflow_code = "W0002";
    tmp.pworkflow_type = "project_flow";
    tmp.pworkflow_step = 2;
    tmp.pworkflow_level = "1";
    tmp.pworkflow_empid = "1000012";
    tmp.pworkflow_empname = "นายมานพ จิตอาสา";
    tmp.pworkflow_emppos = "พนักงานประกันคุณภาพ";

    tmp.pworkflow_note = "";    
    tmp.modified_by = "hropr";
    this.project_workflow.push(tmp);

    tmp = new ProjectWorkflowModel();

    tmp.pworkflow_code = "W0003";
    tmp.pworkflow_type = "project_flow";
    tmp.pworkflow_step = 3;
    tmp.pworkflow_level = "2";
    tmp.pworkflow_empid = "1000061";
    tmp.pworkflow_empname = "นายอำนาจ เพิ่มพูน";
    tmp.pworkflow_emppos = "ผู้บริหาร";
    tmp.pworkflow_note = "";    
    tmp.modified_by = "hropr";
    this.project_workflow.push(tmp);

    tmp = new ProjectWorkflowModel();

    tmp.pworkflow_code = "W0004";
    tmp.pworkflow_type = "project_flow";
    tmp.pworkflow_step = 3;
    tmp.pworkflow_level = "2";
    tmp.pworkflow_empid = "1000088";
    tmp.pworkflow_empname = "นายศรัณย์ ศรีห่วง";
    tmp.pworkflow_emppos = "โปรแกรมเมอร์";
    tmp.pworkflow_note = "อนุมัติแทน นายอำนาจ เพิ่มพูน";    
    tmp.modified_by = "hropr";
    this.project_workflow.push(tmp);
  }

  onRowSelectProject(event: Event) {
    this.edit_workflow= true;
  }

}

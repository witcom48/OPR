import { Component, OnInit, ViewChild } from '@angular/core';
import { NavigationExtras } from '@angular/router';
import { Table } from 'primeng/table';
import { MegaMenuItem,MenuItem } from 'primeng/api';
import { Router } from '@angular/router';


import { PrjectModel } from '../../../models/project/project';
import { ProjectTypeModel } from '../../../models/project/project_type';
import { ProjectBusinessModel } from '../../../models/project/project_business';

import { ProjectService } from '../../../services/project/project.service';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss']
})
export class ProjectListComponent implements OnInit {

  loading: boolean = true;
  project_list: PrjectModel[] = [];
  ptype_list: ProjectTypeModel[] = [];
  pbusiness_list: ProjectBusinessModel[] = [];
  statuses: any[] = [];

  toolbar_menu: MenuItem[] = [];
  items: MenuItem[] = [];
  edit_project: boolean = false;
  


  constructor(private projectService: ProjectService, private router:Router) { }

  ngOnInit(): void {

    this.doLoadSimple();
    this.doLoadProjectType();
    this.doLoadProjectBusiness();
    this.doLoadProject();

    //this.projectService.project_get('').then((project) => {
    //  this.project = project;
    //  this.loading = false;
    //});

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

  clear(table: Table) {
    table.clear();
  }

  selectProject(){

    console.log(this.selectedProject.project_code)

    let navigationExtras: NavigationExtras = {
      queryParams: {
          "project": this.selectedProject.project_code
      }
    };

    this.router.navigate(["project/manage"],  navigationExtras);
  }

  onRowSelectProject(event: Event) {
    this.edit_project= true;
  }

  selectedProject: PrjectModel = new PrjectModel;
  doLoadProject(){
    var tmp = new PrjectModel();

    tmp.project_id = "SHT001";
    tmp.project_code = "100008.00";
    tmp.project_name_th = "บริษัทควอลิตี้";
    tmp.project_name_en = "Quarity";
    tmp.project_name_short = "ควอลิตี้";
    tmp.project_type = "ประจำ";
    tmp.project_business = "ห้างฯ";
    tmp.project_emp = 2;
    tmp.project_cost = 400000;
    tmp.approve_by = "hropr";
    tmp.modified_by = "hropr";

    tmp.project_status = "อนุมัติ [3/3]";

    this.project_list.push(tmp);

    tmp = new PrjectModel();

    tmp.project_id = "SHT002";
    tmp.project_code = "100009.00";
    tmp.project_name_th = "แฟชั่นฯ";
    tmp.project_name_en = "Fasion";
    tmp.project_name_short = "Fasion";
    tmp.project_type = "ประจำ";
    tmp.project_business = "ห้างฯ";
    tmp.project_emp = 2;
    tmp.project_cost = 5400000;
    tmp.approve_by = "hropr";
    tmp.modified_by = "hropr";

    tmp.project_status = "อนุมัติ [3/3]";

    this.project_list.push(tmp);
    

  }

  doLoadProjectType(){
    var tmp = new ProjectTypeModel();

    tmp.ptype_code = "SHT001";
    tmp.ptype_name_th = "ประจำ";
    tmp.ptype_name_en = "Regular";
    
    tmp.modified_by = "hropr";

    this.ptype_list.push(tmp);

    tmp = new ProjectTypeModel();

    tmp.ptype_code = "SHT002";
    tmp.ptype_name_th = "ชั่วคราว";
    tmp.ptype_name_en = "Temporary";
    
    tmp.modified_by = "hropr";

    this.ptype_list.push(tmp);

    

  }

  doLoadProjectBusiness(){
    var tmp = new ProjectBusinessModel();

    tmp.pbusiness_code = "BUS001";
    tmp.pbusiness_name_th = "ห้างฯ";
    tmp.pbusiness_name_en = "Store";
    
    tmp.modified_by = "hropr";

    this.pbusiness_list.push(tmp);

    tmp = new ProjectBusinessModel();

    tmp.pbusiness_code = "BUS002";
    tmp.pbusiness_name_th = "มหาวิทยาลัย";
    tmp.pbusiness_name_en = "University";
    
    tmp.modified_by = "hropr";

    this.pbusiness_list.push(tmp);

    

  }

  

}

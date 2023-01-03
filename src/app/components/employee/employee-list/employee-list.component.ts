import { Component, OnInit, ViewChild } from '@angular/core';
import { NavigationExtras } from '@angular/router';
import { Table } from 'primeng/table';
import { MegaMenuItem,MenuItem } from 'primeng/api';
import { Router } from '@angular/router';


import { EmployeeModel } from '../../../models/employee/employee';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss']
})
export class EmployeeListComponent implements OnInit {


  employee_list: EmployeeModel[] = [];
  toolbar_menu: MenuItem[] = [];
  items: MenuItem[] = [];
  edit_employee: boolean = false;

  constructor(private router:Router) { }

  ngOnInit(): void {

    this.doLoadSimple()
    this.doLoadEmployee()

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

  selectedEmployee: EmployeeModel = new EmployeeModel;
  doLoadEmployee(){
    var tmp = new EmployeeModel();

    tmp.employee_id = "1";
    tmp.employee_code = "2022120001";
    tmp.employee_card = "2022120001";
    tmp.employee_initial = "นาย";
    tmp.employee_fnamename_th = "ศรัณย์";
    tmp.employee_lnamename_th = "ศรีห่วง";
    tmp.employee_type = "ประจำ";
    tmp.employee_position = "พนักงานทำความสะอาด";
    tmp.employee_startdate = new Date(2022, 0, 1);

    tmp.approve_by = "hropr";
    tmp.modified_by = "hropr";

    tmp.employee_status = "อนุมัติ [3/3]";

    this.employee_list.push(tmp);

    
    tmp = new EmployeeModel();

    tmp.employee_id = "1";
    tmp.employee_code = "2022120002";
    tmp.employee_card = "2022120002";
    tmp.employee_initial = "นาย";
    tmp.employee_fnamename_th = "สะอาด";
    tmp.employee_lnamename_th = "สุขสมบูรณ์";
    tmp.employee_type = "ประจำ";
    tmp.employee_position = "พนักงานทำความสะอาด";
    tmp.employee_startdate = new Date(2022, 3, 1);

    tmp.approve_by = "hropr";
    tmp.modified_by = "hropr";

    tmp.employee_status = "อนุมัติ [3/3]";

    this.employee_list.push(tmp);

    tmp = new EmployeeModel();

    
    

  }

  onRowSelectEmployee(event: Event) {
    this.edit_employee= true;
  }

  selectEmployee(){

    console.log(this.selectedEmployee.employee_code)

    let navigationExtras: NavigationExtras = {
      queryParams: {
          "project": this.selectedEmployee.employee_code
      }
    };

    this.router.navigate(["employee/manage"],  navigationExtras);
  }


}

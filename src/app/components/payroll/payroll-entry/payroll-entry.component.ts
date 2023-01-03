import { Component, OnInit } from '@angular/core';
import { MegaMenuItem,MenuItem } from 'primeng/api';

@Component({
  selector: 'app-payroll-entry',
  templateUrl: './payroll-entry.component.html',
  styleUrls: ['./payroll-entry.component.scss']
})
export class PayrollEntryComponent implements OnInit {

  toolbar_menu: MenuItem[] = [];
  items: MenuItem[] = [];
  items_tab: MenuItem[] = [];

  constructor() { }

  ngOnInit(): void {

    this.doLoadSimple()
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
      }
      ,
      {
          label:'Import',
          icon:'pi pi-fw pi-file-import',
          command: (event) => {
            console.log('Edit')
        }        
      }    
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
      }      
      ,    
      {
          label:'Add copy',
          icon:'pi pi-fw pi-copy',          
      }
      ,
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

}

import { Component, OnInit } from '@angular/core';
import { MegaMenuItem,MenuItem } from 'primeng/api';

@Component({
  selector: 'app-self-recordtime',
  templateUrl: './self-recordtime.component.html',
  styleUrls: ['./self-recordtime.component.scss']
})
export class SelfRecordtimeComponent implements OnInit {

  items: MenuItem[] = [];
  items_attfile: MenuItem[] = [];

  constructor() { }

  ngOnInit(): void {

    this.doLoadMenu()
  }

  doLoadMenu(){
     
    this.items = [
   
      {
        label:'New',
        icon:'pi pi-fw pi-plus',
        command: (event) => {
          this.showManage()
        }   
        
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

    this.items_attfile = [
   
      {
        label:'เรียกดู',
        icon:'pi pi-fw pi-search'
        
      },
      {
        label:'เพิ่มไฟล์แนบ',
        icon:'pi pi-fw pi-plus',
          command: (event) => {
            console.log('Edit')
        }        
      },    
      {
          label:'ลบ',
          icon:'pi pi-fw pi-trash',          
      }
     
      
    ];

  }

  displayManage: boolean = false;
  position: string = "right";
  manage_title: string = "Manage"
  showManage() {    
    this.displayManage = true

  }

  closeManage() {    
    this.displayManage = false

  }

  date_from = new Date();
  date_to = new Date();

  date_half = new Date();
  time_half:string="00:00"

  leavetype: string = "F";

  onchangeType(){

  }

}

import { Component, OnInit } from '@angular/core';

import { MegaMenuItem,MenuItem } from 'primeng/api';

@Component({
  selector: 'app-employee-monitor',
  templateUrl: './employee-monitor.component.html',
  styleUrls: ['./employee-monitor.component.scss']
})
export class EmployeeMonitorComponent implements OnInit {

  items: MenuItem[] = [];
  toolbar_menu: MenuItem[] = [];

  chartOptions: any;
  data_emptype: any;  
  data_status: any;
  data_stay: any;

  data_project: any;

  basicData: any;
  basicOptions: any;

  //subscription: Subscription;
  //config: AppConfig;

  constructor() { }

  ngOnInit(): void {
    this.doLoadMenu()
    this.doLoadChart()
  }

  doLoadChart(){
    this.data_emptype = {
      labels: ['รายเดือน [500]','รายวัน [800]'],
      datasets: [
          {
              data: [500, 800],
              backgroundColor: [
                  "#FF6384",
                  "#36A2EB"
              ],
              hoverBackgroundColor: [
                  "#FF6384",
                  "#36A2EB"
              ]
          }
      ]
    };

    this.data_status = {
      labels: ['ประจำ [1,000]','ชั่วคราว [300]'],
      datasets: [
          {
              data: [1000, 300],
              backgroundColor: [
                  "#FF6384",
                  "#36A2EB"
              ],
              hoverBackgroundColor: [
                  "#FF6384",
                  "#36A2EB"
              ]
          }
      ]
    };

    this.data_stay = {
      labels: ['เข้าใหม่ [50]','ลาออก [20]'],
      datasets: [
          {
              data: [50, 20],
              backgroundColor: [
                  "#FF6384",
                  "#36A2EB"
              ],
              hoverBackgroundColor: [
                  "#FF6384",
                  "#36A2EB"
              ]
          }
      ]
    };

    this.data_project = {
      labels: ['กำลังพล [300]','ปัจจุบัน [250]'],
      datasets: [
          {
              data: [50, 20],
              backgroundColor: [
                  "#FF6384",
                  "#36A2EB"
              ],
              hoverBackgroundColor: [
                  "#FF6384",
                  "#36A2EB"
              ]
          }
      ]
    };

    this.basicData = {
      labels: ['แฟชั่นฯ', 'พรอมมานาด', 'รามคำแหง', 'ฺBig C', 'Lotus มีนบุรี', 'PEA', 'SCB รัชโยธิน'],
      datasets: [
          {
              label: 'กำลังพล',
              backgroundColor: '#42A5F5',
              data: [65, 59, 80, 50, 80, 100, 60]
          },
          {
              label: 'ปัจจุบัน',
              backgroundColor: '#FF6384',
              data: [28, 48, 40, 47, 78, 80, 57]
          }
      ]
    };

  }

  doLoadMenu(){
    this.toolbar_menu = [
      {
        label:'Save',
        icon:'pi pi-fw pi-save',
        
      },
      {
          label:'Export',
          icon:'pi pi-fw pi-file-export',
          command: (event) => {
            // console.log('Edit')
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
            // console.log('Edit')
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

  selectData(event: Event) {
    //event.dataset = Selected dataset
    //event.element = Selected element
    //event.element._datasetIndex = Index of the dataset in data
    //event.element._index = Index of the data in dataset
  }

}

import { Component, OnInit } from '@angular/core';
import { MegaMenuItem,MenuItem } from 'primeng/api';
import { CostModel } from '../../../../models/project/cost';

@Component({
  selector: 'app-cost-setup',
  templateUrl: './cost-setup.component.html',
  styleUrls: ['./cost-setup.component.scss']
})
export class CostSetupComponent implements OnInit {

  toolbar_menu: MenuItem[] = [];
  items: MenuItem[] = [];
  pol_cost: CostModel[] = [];

  constructor() { }

  ngOnInit(): void {
    this.doLoadSimple()
    this.doLoadPolCost()
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

  selectedPolCost: CostModel = new CostModel;
  doLoadPolCost(){
    var tmp = new CostModel();

    tmp.cost_code = "BC001";
    tmp.cost_name_th = "ค่าแรง";
    tmp.cost_name_en = "Wage";
    tmp.cost_type = "รายเดือน";
    tmp.cost_allwcode = "SA001-เงินเดือน";    
    tmp.modified_by = "hropr";
   
    this.pol_cost.push(tmp);

    tmp = new CostModel();

    tmp.cost_code = "BC002";
    tmp.cost_name_th = "ค่าล่วงเวลา";
    tmp.cost_name_en = "Overtime";
    tmp.cost_type = "รายวัน";
    tmp.cost_allwcode = "OT001-ล่วงเวลา";   
    
    tmp.cost_auto = true;
    
    tmp.modified_by = "hropr";
   
    this.pol_cost.push(tmp);

    tmp = new CostModel();

    tmp.cost_code = "BC003";
    tmp.cost_name_th = "ค่าตำแหน่ง";
    tmp.cost_name_en = "Position";
    tmp.cost_type = "รายเดือน";
    tmp.cost_allwcode = "IN001-ค่าตำแหน่ง";    
    tmp.modified_by = "hropr";
   
    this.pol_cost.push(tmp);

    tmp = new CostModel();

    tmp.cost_code = "BC004";
    tmp.cost_name_th = "ค่ากะ";
    tmp.cost_name_en = "Shift";
    tmp.cost_type = "รายวัน";
    tmp.cost_allwcode = "IN002-Shift";    
    tmp.modified_by = "hropr";
   
    this.pol_cost.push(tmp);

    tmp = new CostModel();

    tmp.cost_code = "BC005";
    tmp.cost_name_th = "เบี้ยขยัน";
    tmp.cost_name_en = "Diligence";
    tmp.cost_type = "รายเดือน";
    tmp.cost_allwcode = "IN003-Diligence";    
    tmp.modified_by = "hropr";
   
    this.pol_cost.push(tmp);

  }

  edit_pcost: boolean = false;
  onRowSelectPCost(event: Event) {
    this.edit_pcost= true;
   
  }

}

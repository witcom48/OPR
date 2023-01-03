import { Component, OnInit } from '@angular/core';
import { MegaMenuItem,MenuItem } from 'primeng/api';

import { ProjectShiftModel } from '../../../models/project/project_shift';
import { PrjectCostModel } from '../../../models/project/project_cost';
import { PrjectEmpModel } from '../../../models/project/project_emp';
import { ProjectPolicyModel } from '../../../models/project/project_policy';
import { CostModel } from '../../../models/project/cost';

import { PrjectPositionModel } from '../../../models/project/project_position';

import { PrjectClearModel } from '../../../models/project/project_clear';
import { PrjectJobtypeModel } from '../../../models/project/project_jobtype';

import { PrjectContractModel } from '../../../models/project/project_contract';

@Component({
  selector: 'app-project-manage',
  templateUrl: './project-manage.component.html',
  styleUrls: ['./project-manage.component.scss']
})
export class ProjectManageComponent implements OnInit {


  toolbar_menu: MenuItem[] = [];
  items: MenuItem[] = [];
  items_tab: MenuItem[] = [];
  items_cost: MenuItem[] = [];
  checked1: boolean = false;

  days: string[] =["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];


  pol_cost: CostModel[] = [];
  project_shifts: ProjectShiftModel[] = [];
  project_costs: PrjectCostModel[] = [];
  project_pols: ProjectPolicyModel[] = [];
  project_emps: PrjectEmpModel[] = [];
  jobtype_list: PrjectJobtypeModel[] = [];

  project_contracts_a: PrjectContractModel[] = [];
  project_contracts_b: PrjectContractModel[] = [];

  project_positions: PrjectPositionModel[] = [];
  //project_days: string[][] =[""]["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];


  project_clears: PrjectClearModel[] = [];

  project_costs_total:number = 42500.00;
  project_costs_emp:number = 8;

  edit_ppos: boolean = false;
  edit_ppol: boolean = false;
  edit_pcost: boolean = false;

  constructor() {

    //this.isRowSelectable = this.isRowSelectable.bind(this);

   }

   //isRowSelectable(event) {
   //   return !this.isOutOfStock(event.data);
  //}

  ngOnInit(): void {

    this.doLoadSimple();   
    this.doLoadShift();   
    this.doLoadCost();   
    this.doLoadPolicy();
    this.doLoadPolCost()
    this.doLoadEmp();
    this.doLoadPClear();

    this.doLoadProjectPosition();
    this.doLoadJobType();

    this.doLoadContract();

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

 
    this.items_cost = [
      {label: 'พรอมานาด(หัวหน้างาน)', icon: 'pi pi-fw pi-angle-right'},
      {label: 'พรอมานาด(พนักงานทำความสะอาด)', icon: 'pi pi-fw pi-angle-right'},
     
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

  selectedShift: ProjectShiftModel = new ProjectShiftModel;

  doLoadShift(){
    var tmp = new ProjectShiftModel();

    tmp.shift_code = "SHT001";
    tmp.shift_name_en = "กะเช้า 08:00-17:00";
    tmp.shift_name_th = "กะเช้า 08:00-17:00";
    tmp.normal_day = 22;
    tmp.off_day = 13;
    tmp.normal_hrs = 10;
    tmp.overtime_hrs = 2;

    this.project_shifts.push(tmp);
    
    tmp = new ProjectShiftModel();
    tmp.shift_code = "SHT002";
    tmp.shift_name_en = "กะเช้า 09:00-18:00";
    tmp.shift_name_th = "กะเช้า 09:00-18:00";
    tmp.normal_day = 22;
    tmp.off_day = 13;
    tmp.normal_hrs = 10;
    tmp.overtime_hrs = 2;

    this.project_shifts.push(tmp);

  }

  selectedCost: PrjectCostModel = new PrjectCostModel;
  doLoadCost(){
    var tmp = new PrjectCostModel();

    tmp.pcost_id = "1";
    

    tmp.pcost_code = "BC001";
    tmp.cost_name_th = "ค่าแรง";
    tmp.cost_name_en = "Wage";
    
    tmp.pcost_amount = 10800.00;
    tmp.pcost_type = "Month";
    tmp.pcost_version = "1.0";
    tmp.pcost_allwcode = "SA001";
    tmp.pcost_status = "อนุมัติ";
    tmp.approve_by = "hropr";

    this.project_costs.push(tmp);

    tmp = new PrjectCostModel();

    tmp.pcost_id = "2";
   
    tmp.pcost_code = "BC002";
    tmp.cost_name_th = "ค่าล่วงเวลา";
    tmp.cost_name_en = "Overtime";

    tmp.pcost_amount = 67.50;
    tmp.pcost_type = "Day";
    tmp.pcost_version = "1.0";
    tmp.pcost_allwcode = "OT001";

    tmp.cost_auto = true;

    tmp.pcost_status = "อนุมัติ";
    tmp.approve_by = "hropr";

    this.project_costs.push(tmp);
   

  }

  selectedEmp: PrjectEmpModel = new PrjectEmpModel;
  doLoadEmp(){
    var tmp = new PrjectEmpModel();

    tmp.ppos_code = "70001.1";
    tmp.ppos_name_th = "พนักงานทำความสะอาด";

    tmp.emp_code = "220108001";
    tmp.emp_name = "ศรัณย์ ศรีห่วง";
    tmp.emp_position = "พนักงานประจำ";    
    tmp.pcost_allw1 = 10000.00;
    tmp.pcost_allw2 = 67.50;
    tmp.pcost_allw3 = 1;
    tmp.pcost_allw4 = 1;
    tmp.pcost_allw5 = 1;   

    tmp.approve_status = true;
    this.project_emps.push(tmp);

    tmp = new PrjectEmpModel();

    tmp.ppos_code = "70001.1";
    tmp.ppos_name_th = "พนักงานทำความสะอาด";

    tmp.emp_code = "220108002";
    tmp.emp_name = "อำพล ลำพูน";
    tmp.emp_position = "พนักงานชั่วคราว";    
    tmp.pcost_allw1 = 9000.00;
    tmp.pcost_allw2 = 50.00;
    tmp.pcost_allw3 = 1;
    tmp.pcost_allw4 = 1;
    tmp.pcost_allw5 = 1; 
        
    this.project_emps.push(tmp);
  }

  selectedPosition: PrjectPositionModel = new PrjectPositionModel;
  doLoadProjectPosition(){
    var tmp = new PrjectPositionModel();
    tmp.pos_code = "70001.1";
    tmp.pos_name_th = "พนักงานทำความสะอาด";
    tmp.pos_name_en = "พนักงานทำความสะอาด";
    tmp.pos_type = "งานประจำ";
    
    tmp.pos_emp = 3;
    tmp.shift_code = "SHT001-07:00-18:00";

    tmp.shift_n = "";

    tmp.shift_working = 26;
    tmp.shift_hrs = 8;
    tmp.shift_overtime = 2;
    tmp.pol_allw_code = "A001-Std";
    tmp.pol_slip_code = "S001-Slip";
    tmp.pol_uniform_code = "U001-Uniform";
    tmp.allow1 = 10800.00;
    tmp.allow2 = 50;  
    tmp.allow_emp = tmp.allow1 + tmp.allow2;
    tmp.allow_total = tmp.allow_emp * tmp.pos_emp;

    this.project_positions.push(tmp);

    tmp = new PrjectPositionModel();
    tmp.pos_code = "70001.2";
    tmp.pos_name_th = "พนักงานทำความสะอาด";
    tmp.pos_name_en = "พนักงานทำความสะอาด";
    tmp.pos_type = "งานประจำ";
    
    tmp.pos_emp = 3;
    tmp.shift_code = "SHT001-07:00-18:00";

    tmp.shift_n = "";

    tmp.shift_working = 4;
    tmp.shift_hrs = 8;
    tmp.shift_overtime = 3;
    tmp.pol_allw_code = "A001-Std";
    tmp.pol_slip_code = "S001-Slip";
    tmp.pol_uniform_code = "U001-Uniform";
    tmp.allow1 = 8000.00;
    tmp.allow2 = 30;  
    tmp.allow_emp = tmp.allow1 + tmp.allow2;
    tmp.allow_total = tmp.allow_emp * tmp.pos_emp;

    this.project_positions.push(tmp);

    tmp = new PrjectPositionModel();
    tmp.pos_code = "70013";
    tmp.pos_name_th = "พนักงานห้องนํ้า";
    tmp.pos_name_en = "พนักงานห้องนํ้า";
    tmp.pos_type = "งานประจำ";
    
    tmp.pos_emp = 1;
    tmp.shift_code = "SHT001-07:00-19:00";

    tmp.shift_n = "";

    tmp.shift_working = 26;
    tmp.shift_hrs = 8;
    tmp.shift_overtime = 2;
    tmp.pol_allw_code = "A001-Std";
    tmp.pol_slip_code = "S001-Slip";
    tmp.pol_uniform_code = "U001-Uniform";
    tmp.allow1 = 10500.00;
    tmp.allow2 = 40;  
    tmp.allow_emp = tmp.allow1 + tmp.allow2;
    tmp.allow_total = tmp.allow_emp * tmp.pos_emp;  
    this.project_positions.push(tmp);
    
  }

  selectedPolicy: ProjectPolicyModel = new ProjectPolicyModel;
  doLoadPolicy(){
    var tmp = new ProjectPolicyModel();

    tmp.ppol_code = "A001";
    tmp.ppol_name_th = "พรอมมานาด 1";
    tmp.ppol_name_en = "Promenade";
    tmp.ppol_ot = "OTM-ทั่วไป";
    tmp.ppol_allw = "ALLW-ทั่วไป"; 
    tmp.ppol_dg = "DG-ทั่วไป";
    tmp.ppol_leave = "LV-ทั่วไป";
    tmp.ppol_late = "NLT-ไม่คิดสาย";

    tmp.modified_by = "hropr";
   
    this.project_pols.push(tmp);
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

  onRowSelectPPol(event: Event) {
    this.edit_ppol= true;
    this.edit_ppos= false;
    this.edit_pcost= false;
  }
  onRowSelectPPos(event: Event) {
    this.edit_ppos= true;
    this.edit_ppol= false;
    this.edit_pcost= false;
  }

  onRowSelectPCost(event: Event) {
    this.edit_pcost= true;
    this.edit_ppol= false;
    this.edit_ppos= false;
  }

  selectedClear: PrjectClearModel = new PrjectClearModel;
  doLoadPClear(){
    var tmp = new PrjectClearModel();

    tmp.pclear_code = "C-001";
    tmp.pclear_name_th = "ทำความสะอาดลานจอดรถ";
    tmp.pclear_name_en = "ทำความสะอาดลานจอดรถ";

    tmp.pclear_start = new Date(2022, 0, 1);
    tmp.pclear_end = new Date(2022, 11, 31);
    tmp.pclear_times = 10;
    tmp.pclear_wage = 500; 
    tmp.pclear_overtime = 200;
    tmp.pclear_other = 0;

    tmp.allow_emp = tmp.pclear_wage + tmp.pclear_overtime + tmp.pclear_other;
    tmp.allow_total = tmp.allow_emp * tmp.pclear_times;

    tmp.modified_by = "hropr";
   
    this.project_clears.push(tmp);

    tmp = new PrjectClearModel();

    tmp.pclear_code = "C-002";
    tmp.pclear_name_th = "ทำความสะอาดกระจก";
    tmp.pclear_name_en = "ทำความสะอาดกระจก";

    tmp.pclear_start = new Date(2022, 0, 1);
    tmp.pclear_end = new Date(2022, 11, 31);
    tmp.pclear_times = 2;
    tmp.pclear_wage = 1000; 
    tmp.pclear_overtime = 0;
    tmp.pclear_other = 0;

    tmp.allow_emp = tmp.pclear_wage + tmp.pclear_overtime + tmp.pclear_other;
    tmp.allow_total = tmp.allow_emp * tmp.pclear_times;

    tmp.modified_by = "hropr";
   
    this.project_clears.push(tmp);
  }

  selectedJobtype: PrjectJobtypeModel = new PrjectJobtypeModel;
  doLoadJobType(){
    var tmp = new PrjectJobtypeModel();

    tmp.pjobtype_code = "A";
    tmp.pjobtype_name_th = "งานประจำ";
    tmp.pjobtype_name_en = "งานประจำ";
    this.jobtype_list.push(tmp);

    tmp = new PrjectJobtypeModel();

    tmp.pjobtype_code = "B";
    tmp.pjobtype_name_th = "งานจร";
    tmp.pjobtype_name_en = "งานจร";
      
    this.jobtype_list.push(tmp);
  }

  selectedContract: PrjectContractModel = new PrjectContractModel;
  doLoadContract(){
    var tmp = new PrjectContractModel();

    tmp.pos_code = "A001";
    tmp.pcontract_doc = "PROM-22143";
    tmp.pcontract_date = new Date(2022, 0, 1);
    tmp.pcontract_emp = 3;
    tmp.pcontract_amount = 32550; 
        
    tmp.pcontract_start = new Date(2022, 0, 1);
    tmp.pcontract_end = new Date(2022, 11, 31);

    tmp.modified_by = "hropr";
   
    this.project_contracts_a.push(tmp);
  }



}

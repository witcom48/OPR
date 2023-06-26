import { EmployeeModel } from "../employee/employee";

export class EmpattitemModel {
    constructor() {
           
    }
  
    company_code : string = "";
    
    worker_code: string = "";
    item_sa: string = "";
    item_ot: string = "";
    item_aw: string = "";
    item_dg: string = "";
    item_lv: string = "";
    item_ab: string = "";
    item_lt: string = "";

    emp_data: EmployeeModel[] = [];
  
    modified_by: string = "";
    modified_date: string = "";
   
    index: number = 1;    
    
  }
  
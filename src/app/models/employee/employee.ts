export class EmployeeModel {
    constructor() {
     
    }
    
    employee_id: string = "";
    employee_code: string = "";
    employee_card: string = "";
    employee_initial: string = "";
    employee_fnamename_th: string = "";
    employee_lnamename_th: string = "";
    employee_fnamename_en: string = "";
    employee_lnamename_en: string = "";
    employee_type: string = "";
    employee_position: string = "";
    employee_startdate: Date = new Date();
       
    employee_status: string = "";

    approve_by: string = "";
    approve_date: Date = new Date();

    modified_by: string = "";
    modified_date: Date = new Date();

    index: number = 0;
    select: boolean = false;    
  }
  
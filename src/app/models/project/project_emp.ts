export class PrjectEmpModel {
    constructor() {
             
    }   


    ppos_code: string = "";
    ppos_name_th: string = "";

    emp_code: string = "";
    emp_name: string = "";
    emp_position: string = "";
    emp_startdate: Date = new Date();
    emp_enddate: Date = new Date();
    pcost_allw1: number = 0;
    pcost_allw2: number = 0;
    pcost_allw3: number = 0;
    pcost_allw4: number = 0;
    pcost_allw5: number = 0;
    pcost_allw6: number = 0;
    pcost_allw7: number = 0;


    approve_status: boolean = false;    

    approve_date: Date = new Date();

    modified_by: string = "";
    modified_date: string = "";
    index: number = 0;
    select: boolean = false;    
  }
  
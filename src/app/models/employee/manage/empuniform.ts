export class EmpUniformModel {
    constructor() {
    }
    company_code: string = "";
    worker_code: string = "";
    empuniform_id:string = "";
    empuniform_code: string = "";
    empuniform_qauntity: string = "";
    empuniform_amount: string = "";
    empuniform_issuedate!: Date;
    empuniform_note: string="";
  
    modified_by: string= "";
    modified_date: string= ""; 
  
    index: number = 0;
    select: boolean = false;

    project_code:string = "";
    projob_code:string = "";
    proequipmenttype_code:string = "";
    empuniform_by:string="";
    empuniform_payperiod:string = "";
    empuniform_payamount:string = "";
    empuniform_period!: Date;
  }
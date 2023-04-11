export class EmpSupplyModel {
    constructor() {
    }
    company_code: string = "";
    worker_code: string = "";
    empsupply_id:string = "";
    empsupply_code: string = "";
    empsupply_qauntity: string = "";
    empsupply_issuedate!: Date;
    empsupply_note: string="";
    empsupply_returndate!: Date;
    empsupply_returnstatus: boolean = false;
  
    modified_by: string= "";
    modified_date: string= ""; 
  
    index: number = 0;
    select: boolean = false;
  }
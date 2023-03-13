export class EmpBranchModel {
    constructor() {
    }
    company_code: string = "";
    worker_code: string = "";
    empbranch_id: string = "1";
    branch_code: string = "00000";
    empbranch_startdate!: Date;
    empbranch_enddate!: Date;
    empbranch_note:string= "";
  
    modified_by: string= "";
    modified_date: string= ""; 
  
    index: number = 0;
    select: boolean = false;
  }
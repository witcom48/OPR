export class ProjobcostModel {
    constructor() {
             
    }
       
    projobcost_id: string = "1";
    projobcost_code: string = "";
   
    projobcost_amount: number = 0;    
    projobcost_fromdate: Date = new Date();
    projobcost_todate: Date = new Date();
    projobcost_version: string = "";
    projobcost_status: string = "";
    projob_code: string = "";
    project_code: string = "";
   
    modified_by: string = "";
    modified_date: Date = new Date();
    index: number = 0;
    select: boolean = false;    
   

  }
  
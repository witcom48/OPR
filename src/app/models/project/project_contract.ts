export class ProcontractModel {
    constructor() {
             
    }
       
    procontract_id: string = "1";
    procontract_ref: string = "";
    procontract_date: Date = new Date();
    procontract_amount: number = 0;   
    procontract_fromdate: Date = new Date();
    procontract_todate: Date = new Date();
    procontract_customer: string = "";
    procontract_bidder: string = "";
    project_code: string = "";   
    modified_by: string = "";
    modified_date: Date = new Date();
    index: number = 0;
    select: boolean = false;    
   

  }
  
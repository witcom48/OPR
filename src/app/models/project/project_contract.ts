export class PrjectContractModel {
    constructor() {
             
    }
       
    pos_code: string = "";
    pcontract_doc: string = "";
    pcontract_date: Date = new Date();
    pcontract_emp: number = 0;
    pcontract_amount: number = 0;

    pcontract_start: Date = new Date();
    pcontract_end: Date = new Date();
   
    modified_by: string = "";
    modified_date: Date = new Date();
    index: number = 0;
    select: boolean = false;    
   

  }
  
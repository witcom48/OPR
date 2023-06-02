export class ProjobversionModel {
    constructor() {
     
    }
       
    projobversion_id: string = "1";
    transaction_id: string = "";
    version: string = "1.0";
    fromdate: Date = new Date();
    todate: Date = new Date();
    
    transaction_data: string = "";
    transaction_old: string = "";

    refso: string = "";
    custno: string = "";
    refappcostid: string = "";
    currency: string = "";
   
    project_code: string = "";

    modified_by: string = "";
    modified_date: string = "";
    index: number = 0;

  }
  
export class ProequipmentReqModel {
    constructor() {
     
    }
       
    proequipmentreq_id: string = "1";
    prouniform_code: string = "";    
    proequipmentreq_date: Date = new Date();
    proequipmentreq_qty: number = 0;
    proequipmentreq_note: string = "";

    proequipmentreq_by: string = "";

    proequipmenttype_code: string = "";

    projob_code: string = "";
    project_code: string = "";
    
    modified_by: string = "";
    modified_date: Date = new Date();
   
  }
  

  export class ProequipmentTypeModel {
    constructor() {}
       
    proequipmenttype_id: string = "1";
    proequipmenttype_code: string = "";    
    proequipmenttype_name_th: string = "";
    proequipmenttype_name_en: string = "";
    modified_by: string = "";
    modified_date: string = "";
    index: number = 0;
   
  }

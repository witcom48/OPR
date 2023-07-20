export class PartModel {
    constructor() {
     
    }
    
    dep_id: string = "0";
    dep_code: string = "";
    dep_name_th: string = "";
    dep_name_en: string = "";  
    dep_parent: string = ""; 
    dep_level: string = ""; 
    parent_level:string = "";
    company_code: string = "";
    notused : boolean = false;
    modified_by: string = "";
    modified_date: string = "";
    index: number = 0;
    select: boolean = false;  
  }
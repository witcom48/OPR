export class PrjectCostModel {
    constructor() {
             
    }

    cost_name_th: string = "";
    cost_name_en: string = "";
    
    pcost_id: string = "";
    pcost_code: string = "";
    pcost_amount: number = 0;
    pcost_type: string = "";
    pcost_start: Date = new Date();
    pcost_end: Date = new Date();
    pcost_allwcode: string = "";
    pcost_version: string = "";
    project_code: string = "";

    pcost_status: string = "";
    cost_auto: boolean = false;    
    approve_by: string = "";
    approve_date: string = "";


    modified_by: string = "";
    modified_date: string = "";
    index: number = 0;
    select: boolean = false;    
  }
  
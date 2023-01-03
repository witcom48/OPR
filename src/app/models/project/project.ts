export class PrjectModel {
    constructor() {
     
    }
    
    project_id: string = "";
    project_code: string = "";
    project_name_th: string = "";
    project_name_en: string = "";
    project_name_short: string = "";
    project_type: string = "";
    project_business: string = "";

    project_emp: number = 0;
    project_cost: number = 0;

    project_start: Date = new Date();
    project_end: Date = new Date();

    project_status: string = "";
    
    approve_by: string = "";
    approve_date: Date = new Date();

    modified_by: string = "";
    modified_date: Date = new Date();

    index: number = 0;
    select: boolean = false;    
  }
  
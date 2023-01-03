export class PrjectClearModel {
    constructor() {
             
    }
       
    pclear_code: string = "";
    pclear_name_th: string = "";
    pclear_name_en: string = "";

    pclear_times: number = 0;
    pclear_used: number = 0;

    pclear_start: Date = new Date();
    pclear_end: Date = new Date();

    pclear_wage: number = 0;
    pclear_overtime: number = 0;
    pclear_other: number = 0;

    allow_emp: number = 0;
    allow_total: number = 0;

    modified_by: string = "";
    modified_date: Date = new Date();
    index: number = 0;
    select: boolean = false;    
   

  }
  
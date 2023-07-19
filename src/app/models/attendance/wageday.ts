export class WagedayModel {
    constructor() {
    }
    
    company_code: string = "";
    worker_code: string = "";
    
    project_code: string = "";
    projob_code: string = "";
    
    wageday_date: Date = new Date();

    wageday_wage: number = 0;

    wageday_before_rate: number = 0;
    wageday_normal_rate: number = 0;
    wageday_break_rate: number = 0;
    wageday_after_rate: number = 0;

    wageday_before_min: number = 0;
    wageday_normal_min: number = 0;
    wageday_break_min: number = 0;
    wageday_after_min: number = 0;

    wageday_before_amount: number = 0;
    wageday_normal_amount: number = 0;
    wageday_break_amount: number = 0;
    wageday_after_amount: number = 0;

    ot1_min: number = 0;
    ot15_min: number = 0;
    ot2_min: number = 0;
    ot3_min: number = 0;

    ot1_amount: number = 0;
    ot15_amount: number = 0;
    ot2_amount: number = 0;
    ot3_amount: number = 0;

    late_min: number = 0;
    late_amount: number = 0;

    leave_min: number = 0;
    leave_amount: number = 0;

    absent_min: number = 0;
    absent_amount: number = 0;

    allowance_amount: number = 0;
  
    modified_by: string = "";
    modified_date: string = "";
    flag: boolean = false;   

    index: number = 0;
    
    worker_detail: string = "";    
  }
  
export class PrjectEmpdailyModel {
    constructor() {
             
    }   

    daily_id: string = "";
    daily_job: string = "";

    ppos_code: string = "";
    ppos_name_th: string = "";

    emp_code: string = "";
    emp_name: string = "";
    emp_position: string = "";

    timecard_date: Date = new Date();
    timecard_shift: string = "";

    timecard_shiftin: string = "";
    timecard_shiftout: string = "";

    timecard_daytype: string = "N";

    timecard_in: string = "";
    timecard_out: string = "";

    timecard_working: string = "";
    timecard_late: string = "";
    timecard_overtime: string = "";


    modified_by: string = "";
    modified_date: string = "";
    index: number = 0;
    select: boolean = false;    
  }
  
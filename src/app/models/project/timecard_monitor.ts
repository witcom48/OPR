export class TimecardMonitorModel {
    constructor() {
     
    }
    
    worker_code: string = "";
    
    project_code: string = "";
    projob_code: string = "";
    
    shift_code: string = "";
    timecard_workdate: Date = new Date();

    timecard_daytype: string = "";
    timecard_color: string = "";

    timecard_ch1: Date = new Date();
    timecard_ch2: Date = new Date();
    timecard_ch3: Date = new Date();
    timecard_ch4: Date = new Date();
    timecard_ch5: Date = new Date();
    timecard_ch6: Date = new Date();
    timecard_ch7: Date = new Date();
    timecard_ch8: Date = new Date();
    timecard_ch9: Date = new Date();
    timecard_ch10: Date = new Date();    

    timecard_before_min: number =0;
    timecard_work1_min: number =0;
    timecard_work2_min: number =0;
    timecard_break_min: number =0;
    timecard_after_min: number =0;
    timecard_late_min: number =0;

    timecard_before_min_app: number =0;
    timecard_work1_min_app: number =0;
    timecard_work2_min_app: number =0;
    timecard_break_min_app: number =0;
    timecard_after_min_app: number =0;
    timecard_late_min_app: number =0;

    timecard_lock: boolean = false;
    timecard_deduct: boolean = false;

    modified_by: string = "";
    modified_date: string = "";
    flag: boolean = false;   

    index: number = 0;

    select: boolean = false;

    timecard_in: string | null | undefined
    timecard_out: string | null | undefined
    work_hrs: string = "";
    ot_hrs: string = "";
    late_hrs: string = "";

    worker_name_th: string = "";
    worker_name_en: string = "";

    //-- wage
    wageday_wage: number =0;
    wageday_before_amount: number =0;
    wageday_normal_amount: number =0;
    wageday_break_amount: number =0;
    wageday_after_amount: number =0;
    ot1_amount: number =0;
    ot15_amount: number =0;
    ot2_amount: number =0;
    ot3_amount: number =0;
    late_amount: number =0;
    leave_amount: number =0;
    absent_amount: number =0;
    allowance_amount: number =0;
    
  }
  
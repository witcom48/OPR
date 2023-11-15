import { EmployeeModel } from "../employee/employee";

export class TimecardsModel {
    constructor() {
    }
    
    company_code: string = "";
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

    //-- Display
    row: number = 0;
    col: number = 0;
    timecard_in: string = "";
    timecard_out: string = "";
    work_hrs: string = "";
    ot_hrs: string = "";
    late_hrs: string = "";

    worker_name_th: string = "";
    worker_name_en: string = "";
    
    emp_data: EmployeeModel [] = [];

    
  }
  
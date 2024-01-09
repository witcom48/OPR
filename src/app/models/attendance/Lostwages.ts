import { EmployeeModel } from "../employee/employee";

export class LostwagesModel {
    checked: any;
    constructor() {
    }
    version: string = "1.0";

    company_code: string = "";
    worker_code: string = "";

    project_code: string = "";
    projob_code: string = "";
    // 
    lostwages_status: string = "";
    //
    lostwages_type: string = "";

    //
    lostwages_salary: string = "";
    lostwages_diligence: string = "";
    lostwages_travelexpenses: string = "";
    lostwages_other: string = "";

    //
    lostwages_initial: string = "";
    lostwages_cardno: string = "";
    lostwages_gender: string = "";
    lostwages_fname_th: string = "";
    lostwages_laname_th: string = "";
    //

    shift_code: string = "";
    lostwages_workdate: Date = new Date();

    lostwages_daytype: string = "";
    lostwages_color: string = "";

    lostwages_ch1: Date = new Date();
    lostwages_ch2: Date = new Date();
    lostwages_ch3: Date = new Date();
    lostwages_ch4: Date = new Date();
    lostwages_ch5: Date = new Date();
    lostwages_ch6: Date = new Date();
    lostwages_ch7: Date = new Date();
    lostwages_ch8: Date = new Date();
    lostwages_ch9: Date = new Date();
    lostwages_ch10: Date = new Date();

    lostwages_before_min: number = 0;
    lostwages_work1_min: number = 0;
    lostwages_work2_min: number = 0;
    lostwages_break_min: number = 0;
    lostwages_after_min: number = 0;
    lostwages_late_min: number = 0;

    lostwages_before_min_app: number = 0;
    lostwages_work1_min_app: number = 0;
    lostwages_work2_min_app: number = 0;
    lostwages_break_min_app: number = 0;
    lostwages_after_min_app: number = 0;
    lostwages_late_min_app: number = 0;

    lostwages_lock: boolean = false;
    lostwages_deduct: boolean = false;

    modified_by: string = "";
    modified_date: string = "";
    flag: boolean = false;

    index: number = 0;

    select: boolean = false;

    //-- Display
    row: number = 0;
    col: number = 0;
    lostwages_in: string = "";
    lostwages_out: string = "";
    work_hrs: string = "";
    ot_hrs: string = "";
    late_hrs: string = "";

    worker_name_th: string = "";
    worker_name_en: string = "";
    worker_cardno: string = "";
    emp_data: EmployeeModel [] = [];


}

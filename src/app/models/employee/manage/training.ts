export class EmpTrainingModel {
    constructor() {
    }
    company_code: string = "";
    worker_code: string = "";
    emptraining_no: string= "0";
    emptraining_start!: Date;
    emptraining_finish!: Date;
    emptraining_status: string= "Y";
    emptraining_hours: string= "";
    emptraining_cost: string= "";
    emptraining_note: string= "";

    emptraining_count: string= "";

    institute_code: string= "";
    institute_other: string= "";
    course_code: string= "";
    course_other: string= "";

    modified_by: string= "";
    modified_date: string= "";

    index: number = 0;
    select: boolean = false;

    //show only
    worker_detail_th : string = "";
    worker_detail_en : string = "";
  }

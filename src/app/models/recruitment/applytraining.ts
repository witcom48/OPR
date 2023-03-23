export class ReqTrainingModel {
    constructor() {
    }
    company_code: string = "";
    applywork_code: string = "";
    reqtraining_no: string= "";
    reqtraining_start!: Date;
    reqtraining_finish!: Date;
    reqtraining_status: string= "";
    reqtraining_hours: string= "";
    reqtraining_cost: string= "";
    reqtraining_note: string= "";
    institute_code: string= "";
    institute_other: string= "";
    course_code: string= "";
    course_other: string= "";

    modified_by: string= "";
    modified_date: string= "";

    index: number = 0;
    select: boolean = false;
  }

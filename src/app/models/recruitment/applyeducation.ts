export class ReqEducationModel {
    constructor() {
    }
    company_code: string = "";
    applywork_code: string = "";
    reqeducation_no: string= ""
    reqeducation_gpa: string= "";
    reqeducation_start!: Date;
    reqeducation_finish!: Date;
    institute_code: string= "";
    faculty_code: string= "";
    major_code: string= "";
    qualification_code: string= "";

    modified_by: string= "";
    modified_date: string= "";

    index: number = 0;
    select: boolean = false;
  }

export class EmpEducationModel {
    constructor() {
    }
    company_code: string = "";
    worker_code: string = "";
    empeducation_no: string= ""
    empeducation_gpa: string= "";  
    empeducation_start!: Date;
    empeducation_finish!: Date;
    institute_code: string= "";
    faculty_code: string= "";
    major_code: string= "";
    qualification_code: string= "";
  
    modified_by: string= "";
    modified_date: string= ""; 
  
    index: number = 0;
    select: boolean = false;
  }
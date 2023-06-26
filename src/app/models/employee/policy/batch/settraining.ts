import { EmployeeModel } from "../../employee";

export class SetTrainingModel {
    constructor() {

    }
    company_code: string = "";
    
    emptraining_no: string= "";
    emptraining_start!: Date;
    emptraining_finish!: Date;
    emptraining_status: string= "";
    emptraining_hours: string= "";
    emptraining_cost: string= "";
    emptraining_note: string= "";
    institute_code: string= "";
    institute_other: string= "";
    course_code: string= "";
    course_other: string= "";
    
    emp_data: EmployeeModel[] = [];
    modified_by: string = "";
    modified_date!: Date;
    flag: boolean = false;
}
import { EmployeeModel } from "../../employee";

export class SetAssessmentModel {
    constructor() {

    }
    company_code: string = "";
    empassessment_id: string= "1";
    empassessment_location: string= "";
    empassessment_topic: string= "";
    empassessment_fromdate!: Date;
    empassessment_todate!: Date;
    empassessment_count: string= "";
    empassessment_result: string= "";
    
    emp_data: EmployeeModel[] = [];
    modified_by: string = "";
    modified_date!: Date;
    flag: boolean = false;
}
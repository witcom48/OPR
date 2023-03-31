import { EmployeeModel } from "../../employee";

export class SetLocationModel {
    constructor() {

    }
    company_code: string = "";
    location_code: string = "";
    emplocation_startdate!: Date;
    emplocation_enddate!: Date;
    emplocation_note:string= "";
    
    emp_data: EmployeeModel[] = [];
    modified_by: string = "";
    modified_date!: Date;
    flag: boolean = false;
}
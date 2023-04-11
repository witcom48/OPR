import { EmployeeModel } from "../../employee";

export class SetProvidentModel {
    constructor() {

    }
    company_code: string = "";
    provident_code: string= "";
    empprovident_card: string= "";
    empprovident_entry!: Date;
    empprovident_start!: Date;
    empprovident_end!: Date;
    emp_data: EmployeeModel[] = [];
    modified_by: string = "";
    modified_date!: Date;
    flag: boolean = false;
}
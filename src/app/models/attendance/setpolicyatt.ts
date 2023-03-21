import { EmployeeModel } from "../employee/employee";

export class SetPolicyAttModels {
    constructor() {

    }
    company_code: string = ""
    pol_code: string = ""
    pol_type: string = ""
    pol_note: string = ""
    emp_data: EmployeeModel[] = [];
    modified_by: string = ""
    modified_date!: Date;
    flag: boolean = false;
}

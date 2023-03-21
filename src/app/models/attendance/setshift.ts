import { EmployeeModel } from "../employee/employee";

export class SetShiftModels {
    constructor() {

    }
    company_code: string = ""
    planshift_code: string = ""
    year_code: string = ""
    transaction_data: EmployeeModel[] = [];
    modified_by: string = ""
    modified_date!: Date;
    flag: boolean = false;
}

import { EmployeeModel } from "../../employee";

export class SetGroupModel {
    constructor() {

    }
    company_code: string = "";
    empgroup_code: string = "";
    empgroup_date!: Date;
    emp_data: EmployeeModel[] = [];
    modified_by: string = "";
    modified_date!: Date;
    flag: boolean = false;
}
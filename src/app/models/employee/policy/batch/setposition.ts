import { EmployeeModel } from "../../employee";

export class SetPositionModel {
    constructor() {

    }
    company_code: string = "";
    empposition_position: string = "";
    empposition_reason: string = "";
    empposition_date!: Date;
    emp_data: EmployeeModel[] = [];
    modified_by: string = "";
    modified_date!: Date;
    flag: boolean = false;
}
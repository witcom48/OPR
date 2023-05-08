import { EmployeeModel } from "../../employee";

export class SetSalaryModel {
    constructor() {

    }
    company_code: string = "";
    empsalary_amount: number = 0 ;
    empsalary_date!: Date;
    empsalary_reason: string= "22";
    empsalary_incamount: number = 0;
    empsalary_incpercent: number = 0;
    emp_data: EmployeeModel[] = [];
    modified_by: string = "";
    modified_date!: Date;
    flag: boolean = false;
}
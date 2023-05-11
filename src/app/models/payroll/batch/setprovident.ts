import { EmployeeModel } from "../../employee/employee";
import { ProvidentModel } from "../provident";

export class SetProvidentModel {
    constructor() {

    }
    company_code: string = "";
    worker_code: string= "";
    paypolprovident_code: string= "";
    worker_detail: string= "";

    provident_data: ProvidentModel[] = [];
    emp_data: EmployeeModel [] = [];


    modified_by: string = "";
    modified_date!: Date;
    flag: boolean = false;
    index: number = 0 ;

}

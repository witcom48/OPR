import { EmployeeModel } from "../../employee/employee";
import { ReducesModel } from "../../system/policy/reduces";

export class SetReduceModel { 
    constructor() {

    }
    company_code: string = "";
    worker_code: string= "";
    paybatchreduce_code: string= "";
    worker_detail: string= "";

    reduces_data: ReducesModel[] = [];
    emp_data: EmployeeModel [] = [];


    modified_by: string = "";
    modified_date!: Date;
    flag: boolean = false;
    index: number = 0 ;

}

import { EmployeeModel } from "../../employee/employee";
import { BonusModel } from "../bonus";

export class SetBonusModel {
    constructor() {

    }
    company_code: string = "";
    worker_code: string = "";
    paypolbonus_code: string = "";
    worker_detail: string= "";
    worker_name: string= "";

    bonus_data: BonusModel[] = [];
    emp_data: EmployeeModel [] = [];

    modified_by: string = "";
    modified_date!: Date;
    flag: boolean = false;
    index: number = 0 ;

}

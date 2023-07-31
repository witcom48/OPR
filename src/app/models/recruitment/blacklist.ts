import { EmployeeModel } from "../employee/employee";

export class BlacklistModel {
    constructor() {

    }

    company_code: string = '';
    worker_code: string = '';
    reason_code: string='';
    blacklist_note:string='';

    modified_by: string = '';
    modified_date: string = '';

    emp_data: EmployeeModel[] = [];

}
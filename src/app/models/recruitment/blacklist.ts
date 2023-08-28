import { EmployeeModel } from "../employee/employee";

export class BlacklistModel {
    constructor() {

    }

    company_code: string = '';
    blacklist_id:string='1';
    card_no:string='';
    worker_code: string = '';
    blacklist_fname_th:string ='';
    blacklist_lname_th:string ='';
    blacklist_fname_en:string ='';
    blacklist_lname_en:string ='';
    reason_code: string='';
    blacklist_note:string='';

    modified_by: string = '';
    modified_date: string = '';

    emp_data: EmployeeModel[] = [];

}
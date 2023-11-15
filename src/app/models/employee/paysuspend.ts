import { EmployeeModel } from "./employee";

export class PaysuspendModel {
    constructor() {

    }
    company_code: string = "";
    worker_code: string = "";
    item_code: string = "";

    paysuspend_id: string = "";
    payitem_date!: Date;
    paysuspend_note: string = "";
    paysuspend_type: string = "";
    paysuspend_payment: string = "";
    reason_code: string = "";

    emp_data: EmployeeModel[] = [];
    modified_by: string = "";
    modified_date!: Date;
    flag: boolean = false;
}
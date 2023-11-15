export class EmployeeresignModel {
    constructor() {}

    company_code: string = "";
    worker_code: string = "";

    empresign_id: string = "";
    card_no:string = "";
    empresign_date!: Date;
    reason_code: string = "";

    modified_by: string = "";
    modified_date!: Date;
    flag: boolean = false;
}
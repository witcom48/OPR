export class EmpGroupModel {
    constructor() {
    }
    company_code: string= "";
    worker_code: string= "";
    empgroup_id: string= "0";
    empgroup_code: string= "";
    empgroup_date!: Date;

    modified_by: string= "";
    modified_date: string= "";


    index: number = 0;
    select: boolean = false;
}
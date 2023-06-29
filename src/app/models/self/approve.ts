export class ApproveModel {
    constructor() {

    }
    company_code: string = "";
    job_type: string = "";
    approve_status: string = "";
    job_id: string[] = [];
    lang: string = "";
    status: number = 0;
    fromdate: Date = new Date();
    todate: Date = new Date();
}
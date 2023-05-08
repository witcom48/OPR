export class ReqCriminalModel {
    constructor() {
    }
    company_code: string= "";
    applywork_code: string= "";
    reqcriminal_id: string= "1";
    reqcriminal_location: string= "";
    reqcriminal_fromdate!: Date;
    reqcriminal_todate!: Date;
    reqcriminal_count: string= "";
    reqcriminal_result: string= "";


    modified_by: string= "";
    modified_date: string= "";


    index: number = 0;
    select: boolean = false;
}

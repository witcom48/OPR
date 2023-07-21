export class EmpCriminalModel {
    constructor() {
    }
    company_code: string= "";
    worker_code: string= "";
    empcriminal_id: string= "0";
    empcriminal_location: string= "";
    empcriminal_fromdate!: Date;
    empcriminal_todate!: Date;
    empcriminal_count: string= "";
    empcriminal_result: string= "Y";


    modified_by: string= "";
    modified_date: string= "";


    index: number = 0;
    select: boolean = false;
}

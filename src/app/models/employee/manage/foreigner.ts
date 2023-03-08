export class EmpForeignerModel {
    constructor() {
    }
    company_code: string= "";
    worker_code: string= "";
    foreigner_id: string= "1";
    passport_no: string= "";
    passport_issue: string= "";
    passport_expire: string= "";
    visa_no: string= "";
    visa_issue: string= "";
    visa_expire: string= "";
    workpermit_no: string= "";
    workpermit_by: string= "";
    workpermit_issue: string= "";
    workpermit_expire: string= "";
    entry_date: string= "";
    certificate_no: string= "";
    certificate_expire: string= "";
    otherdoc_no: string= "";
    otherdoc_expire: string= "";

    modified_by: string= "";
    modified_date: string= "";


    index: number = 0;
    select: boolean = false;
}
export class EmpForeignerModel {
    constructor() {
    }
    company_code: string= "";
    worker_code: string= "";
    foreigner_id: string= "0";
    passport_no: string= "";
    passport_issue!: Date;
    passport_expire!: Date;
    visa_no: string= "";
    visa_issue!: Date;
    visa_expire!: Date;
    workpermit_no: string= "";
    workpermit_by: string= "";
    workpermit_issue!: Date;
    workpermit_expire!: Date;
    entry_date!: Date;
    certificate_no: string= "";
    certificate_expire!: Date;
    otherdoc_no: string= "";
    otherdoc_expire!: Date;

    modified_by: string= "";
    modified_date: string= "";


    index: number = 0;
    select: boolean = false;
}

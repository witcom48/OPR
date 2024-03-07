export class ReportjobModel {
    constructor() {
             
    }
    reportjob_id: string = "1";
    reportjob_ref: string = "";
    reportjob_type: string = "";
    reportjob_status: string = "";
    reportjob_language: string = "EN";
    reportjob_fromdate: Date = new Date();
    reportjob_todate: Date = new Date();
    reportjob_paydate: Date = new Date();
    company_code: string = "";
    modified_by: string = "";
    index: number = 0;
    reportjob_section: string = "";
  }
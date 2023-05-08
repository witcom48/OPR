export class ReqAssessmentModel {
    constructor() {
    }
    company_code: string= "";
    applywork_code: string= "";
    reqassessment_id: string= "1";
    reqassessment_location: string= "";
    reqassessment_topic: string= "";
    reqassessment_fromdate!: Date;
    reqassessment_todate!: Date;
    reqassessment_count: string= "";
    reqassessment_result: string= "";

    modified_by: string= "";
    modified_date: string= "";


    index: number = 0;
    select: boolean = false;
}

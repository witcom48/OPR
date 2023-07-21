export class EmpAssessmentModel {
    constructor() {
    }
    company_code: string= "";
    worker_code: string= "";
    empassessment_id: string= "0";
    empassessment_location: string= "";
    empassessment_topic: string= "";
    empassessment_fromdate!: Date;
    empassessment_todate!: Date;
    empassessment_count: string= "";
    empassessment_result: string= "Y";

    modified_by: string= "";
    modified_date: string= "";


    index: number = 0;
    select: boolean = false;
}

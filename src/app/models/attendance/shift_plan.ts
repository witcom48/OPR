import { PlanscheduleModels } from "./planschedule";

export class ShiftplanModels {
    constructor() {

    }

    company_code: string = "";
    planshift_id: string = "";
    planshift_code: string = "";
    planshift_name_th: string = "";
    planshift_name_en: string = "";
    created_by: string = "";
    created_date: string = "";
    modified_by: string = "";
    modified_date: string = "";
    flag: boolean = false;
    planschedule:PlanscheduleModels[] = []
}

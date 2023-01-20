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
    modied_by: string = "";
    modied_date: string = "";
    flag: string = "";
    planschedule:PlanscheduleModels[] = []
}

import { LeaveModels } from "./leave";

export class LeaveplanModels {
    constructor() {

    }

    company_code: string = "";
    planleave_id: string = "";
    planleave_code: string = "";
    planleave_name_th: string = "";
    planleave_name_en: string = "";
    created_by: string = "";
    created_date: string = "";
    modied_by: string = "";
    modied_date: string = "";
    flag: string = "";
    leavelists: LeaveModels[] = []
}

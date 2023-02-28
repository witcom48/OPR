import { LeaveModels } from "./leave";
// import { LeaveplanlistModels } from "./leave_plan_list";

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
    modified_by: string = "";
    modified_date: string = "";
    flag:boolean = false;
    leavelists: LeaveModels[] = []
}

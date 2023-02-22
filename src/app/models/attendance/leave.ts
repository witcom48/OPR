import { LeaveworkageModels } from "./leave_workage";

export class LeaveModels {
    constructor() {

    }

    company_code: string = "";
    leave_id: string = "";
    leave_code: string = "";
    leave_name_th: string = "";
    leave_name_en: string = "";
    leave_day_peryear: string = "";
    leave_day_acc: string = "";
    leave_day_accexpire: Date = new Date();
    leave_incholiday: boolean = false;
    leave_passpro: boolean = false;
    leave_deduct: boolean = false;
    leave_caldiligence: boolean = false;
    leave_agework: boolean = false;
    leave_ahead: string = "";
    leave_min_hrs: string = "00:00";
    leave_max_day: string = "";
    created_by: string = "";
    created_date: string = "";
    modified_by: string = "";
    modified_date: string = "";
    flag: boolean = false;
    leave_workage: LeaveworkageModels[] = []
}

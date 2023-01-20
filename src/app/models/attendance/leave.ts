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
    leave_incholiday: string = "";
    leave_passpro: string = "";
    leave_deduct: string = "";
    leave_caldiligence: string = "";
    leave_agework: string = "";
    leave_ahead: string = "";
    leave_min_hrs: string = "00:00";
    leave_max_day: string = "";
    created_by: string = "";
    created_date: string = "";
    modied_by: string = "";
    modied_date: string = "";
    flag: string = "";
    leave_workage: LeaveworkageModels[] = []
}

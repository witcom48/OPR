import { OvertimerateModels } from "./overtime_rate";

export class OvertimeModels {
    constructor() {

    }

    company_code: string = "";
    rateot_id: string = "";
    rateot_code: string = "";
    rateot_name_th: string = "";
    rateot_name_en: string = "";
    created_by: string = "";
    created_date: string = "";
    modified_by: string = "";
    modified_date: string = "";
    flag: string = "";
    rate: OvertimerateModels[] = [];
}

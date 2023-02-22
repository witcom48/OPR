import { DiligencestepModels } from "./diligence_step";

export class DiligenceModels {
    constructor() {

    }

    company_code: string = "";
    diligence_id: string = "";
    diligence_code: string = "";
    diligence_name_th: string = "";
    diligence_name_en: string = "";
    diligence_punchcard: string = "";
    diligence_punchcard_times: string = "";
    diligence_punchcard_timespermonth: string = "";
    diligence_late: string = "";
    diligence_late_times: string = "";
    diligence_late_acc: string = "";
    diligence_late_timespermonth: string = "";
    diligence_ba: string = "";
    diligence_before_min: string = "";
    diligence_after_min: string = "";
    diligence_passpro: string = "";
    diligence_wrongcondition: string = "";
    diligence_somperiod: string = "";
    diligence_somperiod_first: string = ""
    created_by: string = "";
    created_date: string = "";
    modified_by: string = "";
    modified_date: string = "";
    flag: string = "";
    step:DiligencestepModels[] = [];
}

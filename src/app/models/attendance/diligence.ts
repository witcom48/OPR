import { DiligencestepModels } from "./diligence_step";

export class DiligenceModels {
    constructor() {

    }

    company_code: string = "";
    diligence_id: string = "";
    diligence_code: string = "";
    diligence_name_th: string = "";
    diligence_name_en: string = "";

    diligence_punchcard: boolean = false;
    diligence_punchcard_times: Number = 0;
    diligence_punchcard_timespermonth: Number = 0;

    diligence_late: boolean = false;
    diligence_late_times: Number = 0;
    diligence_late_timespermonth: Number = 0;
    diligence_late_acc: Number = 0;

    diligence_ba: boolean = false;
    diligence_before_min: Number = 0;
    diligence_after_min: Number = 0;

    diligence_passpro: boolean = false;
    diligence_wrongcondition: string = "";
    diligence_someperiod: boolean = false;
    diligence_someperiod_first: string = "N";

    created_by: string = "";
    created_date: string = "";
    modified_by: string = "";
    modified_date: string = "";
    flag: boolean = false;
    steppay_data: DiligencestepModels[] = [];
}

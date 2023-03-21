import { cls_TRTimeallw } from "./cls_TRTimeallw";

export class cls_MTPlantimeallw {
    constructor() {

    }

    company_code: string = "";
    plantimeallw_id: string = "";
    plantimeallw_code: string = "";
    plantimeallw_name_th: string = "";
    plantimeallw_name_en: string = "";
    plantimeallw_passpro: boolean = false;
    plantimeallw_lastperiod: boolean = false;
    modified_by: string = "";
    flag: boolean = false;
    timeallw_data: cls_TRTimeallw[] = [];
}

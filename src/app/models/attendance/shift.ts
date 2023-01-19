import { ShiftallowanceModels } from "./shiftallowance";
import { ShiftbreakModels } from "./shiftbreak";

export class ShiftModels {
    constructor() {

    }

    company_code: string = "";
    shift_id: string = "";
    shift_code: string = "";
    shift_name_th: string = "";
    shift_name_en: string = "";
    shift_ch1: string = "00:00";
    shift_ch2: string = "00:00";
    shift_ch3: string = "00:00";
    shift_ch4: string = "00:00";
    shift_ch5: string = "00:00";
    shift_ch6: string = "00:00";
    shift_ch7: string = "00:00";
    shift_ch8: string = "00:00";
    shift_ch9: string = "00:00";
    shift_ch10: string = "00:00";
    shift_ch3_from: string = "00:00";
    shift_ch3_to: string = "00:00";
    shift_ch4_from: string = "00:00";
    shift_ch4_to: string = "00:00";
    shift_ch7_from: string = "00:00";
    shift_ch7_to: string = "00:00";
    shift_ch8_from: string = "00:00";
    shift_ch8_to: string = "00:00";
    shift_otin_min: string = "";
    shift_otout_min: string = "";
    shift_otin_max: string = "";
    shift_otout_max: string = "";
    created_by: string = "";
    created_date: string = "";
    modied_by: string = "";
    modied_date: string = "";
    flag: string = "";
    shift_flexiblebreak: boolean = false;
    shift_break: ShiftbreakModels[] = [];
    shift_allowance: ShiftallowanceModels[] = [];
}

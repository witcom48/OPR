import { Holiday_listModels } from "./holiday_list";

export class HolidayModels {
    constructor() {

    }

    company_code: string = "";
    planholiday_id: string = "";
    planholiday_code: string = "";
    planholiday_name_th: string = "";
    planholiday_name_en: string = "";
    year_code: string = "";
    holiday_list: Holiday_listModels[] = [];
    created_by: string = "";
    created_date: string = "";
    modified_by: string = "";
    modified_date: string = "";
    flag: boolean = false;
}

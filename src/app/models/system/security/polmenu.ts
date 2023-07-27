import { AccessdataModel } from "./accessdata";

export class PolmenuModel {
    constructor() {
    }
    polmenu_id: number = 0;
    polmenu_code: string = "";
    polmenu_name_th: string = "";
    polmenu_name_en: string = "";
    modified_by: string = "";
    modified_date: string = "";
    flag: boolean = false;
    accessdata_data: AccessdataModel[] = [];
}

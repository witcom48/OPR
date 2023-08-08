import { AccessmenuModel } from "./accessmenu";

export class AccessdataModel {
    constructor() {
    }
    company_code: string = "";
    polmenu_code: string = "";
    accessdata_module: string = "";
    accessdata_new: boolean = false;
    accessdata_edit: boolean = false;
    accessdata_delete: boolean = false;
    accessdata_salary: boolean = false;
    accessmenu_data: AccessmenuModel[] = [];
}

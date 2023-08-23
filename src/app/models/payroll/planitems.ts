import { ItemsModel } from "./items";

export class PlanitemsModels {
    constructor() {

    }

    company_code: string = "";
    planitems_id: string = "";
    planitems_code: string = "";
    planitems_name_th: string = "";
    planitems_name_en: string = "";
    created_by: string = "";
    created_date: string = "";
    modified_by: string = "";
    modified_date: string = "";
    flag:boolean = false;
    itemslists: ItemsModel[] = []
}

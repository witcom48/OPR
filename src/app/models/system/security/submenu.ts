import { ItemMenuModel } from "./itemmenu";

export class SubMenuModel {
    constructor() {
    }
    mainmenu_code: string = "";
    submenu_code: string = "";
    submenu_detail_th: string = "";
    submenu_detail_en: string = "";
    submenu_order: number = 0;
    itemmenu_data:ItemMenuModel[] = [];
}

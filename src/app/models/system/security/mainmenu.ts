import { SubMenuModel } from "./submenu";

export class MainMenuModel {
    constructor() {
    }
    mainmenu_code: string = "";
    mainmenu_detail_th: string = "";
    mainmenu_detail_en: string = "";
    mainmenu_order: number = 0;
    submenu_data:SubMenuModel[] = [];
}
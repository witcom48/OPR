import { LateconditionModels } from "./late_condition";

export class LateModels {
    constructor() {

    }

    company_code: string = "";
    late_id: string = "";
    late_code: string = "";
    late_name_th: string = "";
    late_name_en: string = "";
    created_by: string = "";
    created_date: string = "";
    modified_by: string = "";
    modified_date: string = "";
    flag: boolean = false;
    condition: LateconditionModels[] = [];
}

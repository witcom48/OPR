 
import { ReducesModel } from "../system/policy/reduces";

export class PlanreduceModels {
    constructor() {

    }

    company_code: string = "";
    planreduce_id: string = "";
    planreduce_code: string = "";
    planreduce_name_th: string = "";
    planreduce_name_en: string = "";
    created_by: string = "";
    created_date: string = "";
    modified_by: string = "";
    modified_date: string = "";
    flag:boolean = false;
    reducelists: ReducesModel[] = []
}

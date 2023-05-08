import { ProvidentWorkageModel } from "./provident_workage";

export class ProvidentModel {
    constructor() {}
    company_code: string= "";
    provident_id: string= "1";
    provident_code: string = "";
    provident_name_th: string= "";
    provident_name_en: string= "";


    modified_by: string = "";
    modified_date: string = "";
    index: number = 0;
    select: boolean = false;
    flag: boolean = false;

    providentWorkage_data: ProvidentWorkageModel[] = [];

  }

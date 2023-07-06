import { EmployeeModel } from "../employee/employee";
import { SetProvidentModel } from "./batch/setprovident";
import { ProvidentWorkageModel } from "./provident_workage";

export class ProvidentModel {

    constructor() {}
    company_code: string= "";
    provident_id: string= "0";
    provident_code: string = "";
    provident_name_th: string= "";
    provident_name_en: string= "";

    worker_code: string= "";

    modified_by: string = "";
    modified_date: string = "";
    index: number = 0;
    select: boolean = false;
    flag: boolean = false;

    emp_data: EmployeeModel [] = [];
    providentWorkage_data: ProvidentWorkageModel[] = [];
    setprovident_data: SetProvidentModel[] = [];

    paypolprovident_code: string = "";
    worker_detail: string= "";

  }

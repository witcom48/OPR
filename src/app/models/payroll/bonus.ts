import { EmployeeModel } from "../employee/employee";
import { SetBonusModel } from "./batch/setbonus";
import { BonusrateModel } from "./bonusrate";

export class BonusModel {
    constructor() {}
    company_code: string= "";
    worker_code: string = "";

    bonus_id: string = "1";
    bonus_code: string= "";
    bonus_name_th: string= "";
    bonus_name_en: string= "";
    item_code: string= "";


    modified_by: string = "";
    modified_date: string = "";
    index: number = 0;
    select: boolean = false;
    flag: boolean = false;



    emp_data: EmployeeModel [] = [];

    setbonus_data: SetBonusModel[] = [];
    bonus_data: BonusrateModel[] = [];


    paypolbonus_code: string= "";
    worker_detail: string= "";

  }

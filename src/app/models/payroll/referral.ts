import { EmployeeModel } from "../employee/employee";
import { ReferralrateModel } from "./referralrate";

export class ReferralModel {
    constructor() {}

    company_code: string= "";
    worker_code: string = "";

    referral_id: string = "1";
    referral_code: string= "";
    referral_name_th: string= "";
    referral_name_en: string= "";
    item_code: string= "";
    notused: boolean = false;
    modified_by: string = "";
    modified_date: string = "";
    index: number = 0;
    select: boolean = false;
    flag: boolean = false;

    emp_data: EmployeeModel [] = [];

    referral_data: ReferralrateModel[] = [];
    worker_detail: string= "";
}
import { EmployeeModel } from "../employee/employee";
import { ItemsModel } from "./items";

export class PaytranAccModel {
    constructor() { }

    company_code: string = "";
    worker_code: string = "1";


    item_data: ItemsModel[] = [];
    emp_data: EmployeeModel[] = [];

    year_code: string = "";

    paytran_ssoemp: number = 0;
    paytran_ssocom: number = 0;

    paytran_pfemp: number = 0;
    paytran_pfcom: number = 0;

    paytran_income_401: number = 0;
    paytran_tax_401: number = 0;

    paytran_income_4013: number = 0;
    paytran_tax_4013: number = 0;

    paytran_income_4012: number = 0;
    paytran_tax_4012: number = 0;

    paytran_income_402I: number = 0;
    paytran_tax_402I: number = 0;

    paytran_income_402O: number = 0;
    paytran_tax_402O: number = 0;

    modified_by: string = "";
    modified_date: string = "";
    index: number = 0;
    select: boolean = false;
    flag: boolean = false;




}

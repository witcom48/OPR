import { EmployeeModel } from "../../employee";

export class SetBenefitsModel {
    constructor() {

    }
    company_code: string = "";
    item_code: string= "";

    empbenefit_id: string= "";
    empbenefit_amount: number= 0;
    empbenefit_startdate!: Date;
    empbenefit_enddate!: Date;
    empbenefit_reason: string= "";
    empbenefit_note: string= "";

    empbenefit_paytype: string= "";
    empbenefit_break: boolean = false;
    empbenefit_breakreason: string= "";

    empbenefit_conditionpay: string= "";
    empbenefit_payfirst: string= "";
    
    empbenefit_capitalamount: number= 0;
    empbenefit_period: number= 0;
    empbenefit_perperiod: number= 0;
    
    emp_data: EmployeeModel[] = [];
    modified_by: string = "";
    modified_date!: Date;
    flag: boolean = false;
}
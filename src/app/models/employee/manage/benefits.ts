export class EmpBenefitsModel {
    constructor() {
    }
    company_code: string = "";
    worker_code: string = "";
    empbenefit_id: string= "0";
    empbenefit_amount: string= "";
    empbenefit_startdate!: Date;
    empbenefit_enddate!: Date;
    empbenefit_reason: string= "";
    empbenefit_note: string= "";

    empbenefit_paytype: string= "";
    empbenefit_break: boolean = false;
    empbenefit_breakreason: string= "";

    empbenefit_conditionpay: string= "";
    empbenefit_payfirst: string= "";

    item_code: string= "";

    modified_by: string= "";
    modified_date: string= "";

    index: number = 0;
    select: boolean = false;
  }

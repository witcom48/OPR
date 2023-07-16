
export class PaytranModel {
    constructor() {}
  
    company_code: string = "";
    worker_code: string = "1";
  
    paytran_date: Date = new Date();

    paytran_ssoemp: number = 0;
    paytran_ssocom: number = 0;
    paytran_ssorateemp: number = 0;
    paytran_ssoratecom: number = 0;

    paytran_pfemp: number = 0;
    paytran_pfcom: number = 0;

    paytran_income_401: number = 0;
    paytran_deduct_401: number = 0;
    paytran_tax_401: number = 0;

    paytran_income_4012: number = 0;
    paytran_deduct_4012: number = 0;
    paytran_tax_4012: number = 0;

    paytran_income_4013: number = 0;
    paytran_deduct_4013: number = 0;
    paytran_tax_4013: number = 0;

    paytran_income_402I: number = 0;
    paytran_deduct_402I: number = 0;
    paytran_tax_402I: number = 0;

    paytran_income_402O: number = 0;
    paytran_deduct_402O: number = 0;
    paytran_tax_402O: number = 0;

    paytran_income_notax: number = 0;
    paytran_deduct_notax: number = 0;

    paytran_income_total: number = 0;
    paytran_deduct_total: number = 0;

    paytran_netpay_b: number = 0;
    paytran_netpay_c: number = 0;

    modified_by: string = "";
    modified_date: string = "";
    index: number = 0;
    select: boolean = false;
    flag: boolean = false;

    worker_detail: string = "";

    paytran_salary: number = 0;
    paytran_overtime: number = 0;
    paytran_diligence: number = 0;

    paytran_absent: number = 0;
    paytran_late: number = 0;
    paytran_leave: number = 0;

 
  }
  
export class PeriodsModels {
    constructor() {

    }

    company_code: string = "";
    period_id: string = "";
    period_type: string = "";
    emptype_code: string = "";
    year_code: string = "";
    period_no: string="";
    period_name_th: string="";
    period_name_en: string = "";
    period_from!: Date;
    period_to!: Date;
    period_payment!: Date;
    period_dayonperiod: string = "";
    created_by: string = "";
    created_date: string = "";
    modified_by: string = "";
    modified_date!: Date;
    flag: boolean = false;
    period_closeta: boolean = false;
    period_closepr: boolean = false;

}

export class CompanyModel {
    constructor() {}
    company_id: string = '1';
    company_code: string = '';
    company_initials: string = '';
    company_name_th: string = '';
    company_name_en: string = '';

    sso_tax_no: string = '';
    citizen_no: string = '';
    provident_fund_no: string = '';

    hrs_perday: string = '';
    sso_com_rate: string = '';
    sso_emp_rate: string = '';

    sso_security_no: string = '';
    sso_branch_no: string = '';

    sso_min_wage: string = '';
    sso_max_wage: string = '';
    sso_min_age: string = '';
    sso_max_age: string = '';

    modified_by: string = '';
    modified_date: string = '';
    index: number = 0;
    select: boolean = false;
    username: string = '';
}

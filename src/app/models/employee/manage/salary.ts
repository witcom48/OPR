export class EmpSalaryModel {
    constructor() {
    }
    company_code: string = "";
    worker_code: string = "";
    empsalary_id: string= "";
    empsalary_amount: string= "";
    empsalary_date!: Date;
    empsalary_reason: string= "";

    empsalary_incamount: string= "";
    empsalary_incpercent: string= "";

    modified_by: string= "";
    modified_date: string= "";

    index: number = 0;
    select: boolean = false;
  }

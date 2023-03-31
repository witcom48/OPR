export class EmpSalaryModel {
    constructor() {
    }
    company_code: string = "";
    worker_code: string = "";
    empsalary_id: string= "";
    empsalary_amount: number = 0;
    empsalary_date!: Date;
    empsalary_reason: string= "";

    empsalary_incamount: number = 0;
    empsalary_incpercent: number = 0;

    modified_by: string= "";
    modified_date: string= "";

    index: number = 0;
    select: boolean = false;
  }

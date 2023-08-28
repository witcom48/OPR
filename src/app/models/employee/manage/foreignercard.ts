export class EmpForeignercardModel {
    constructor() {
    }
    company_code: string = "";
    worker_code: string = "";
    foreignercard_id: string= "0";
    foreignercard_code: string= "";
    foreignercard_type: string= "";
    foreignercard_issue!: Date;
    foreignercard_expire!: Date;

    modified_by: string= "";
    modified_date: string= "";

    index: number = 0;
    select: boolean = false;
  }

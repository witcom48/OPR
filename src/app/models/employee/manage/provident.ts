export class EmpProvidentModel {
  constructor() {
  }
  company_code: string = "";
  worker_code: string = "";
  empprovident_id: string = "0";
  provident_code: string = "";
  empprovident_card: string = "";
  empprovident_entry!: Date;
  empprovident_start!: Date;
  empprovident_end!: Date;

  modified_by: string = "";
  modified_date: string = "";

  index: number = 0;
  select: boolean = false;

  rate_emp: number = 0;
  rate_com: number = 0;
  empprovident_type: string = "";
  empprovident_age: string = "";
}

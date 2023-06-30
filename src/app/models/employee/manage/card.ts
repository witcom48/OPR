export class EmpcardModel {
    constructor() {
    }
    company_code: string = "";
    worker_code: string = "";
    card_id: string= "0";
    card_code: string= "";
    card_type: string= "";
    card_issue!: Date;
    card_expire!: Date;

    modified_by: string= "";
    modified_date: string= "";

    index: number = 0;
    select: boolean = false;
  }

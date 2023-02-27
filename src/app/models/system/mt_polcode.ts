export class MTPolcodeModel {
    constructor() {
      this.company_code = "";
      this.polcode_id = 1;
      this.polcode_type = "";
    }

    company_code: string;
    polcode_id: number;
    polcode_type: string;

    modified_by: string = "";
    modified_date: string = "";
    flag: boolean = false;

    index: number = 0;
  }

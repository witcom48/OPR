export class EmpSuggestModel {
    constructor() {
    }
    company_code: string = "";
    worker_code: string = "";
    empsuggest_id: string= "";
    empsuggest_code: string= "";
    empsuggest_date!: Date;
    empsuggest_note: string="";
  
    modified_by: string= "";
    modified_date: string= ""; 
  
    index: number = 0;
    select: boolean = false;
  }
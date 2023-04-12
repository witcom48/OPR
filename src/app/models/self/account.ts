export class AccountModel {
    constructor() {
             
    }
    company_code: string = "";
    account_id: string = "";
    account_user: string = "";
    account_pass: string = "";
    account_type: string = "";
    account_level: number = 0;
    
    account_email: string = "";
    account_email_alert: boolean = false;  
    
    account_line: string = "";
    account_line_alert: boolean = false;  
   

    modified_by: string = "";
    modified_date: string = "";
    index: number = 0;
    select: boolean = false;    
  }
  
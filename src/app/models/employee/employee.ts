export class EmployeeModel {
    constructor() {
     
    }
    company_code: string = "";
    worker_id: string = "1";
    worker_code: string = "";
    worker_card: string = "";
    worker_initial: string = "";
    worker_fname_th: string = "";    
    worker_lname_th: string = "";    
    worker_fname_en: string = "";    
    worker_lname_en: string = ""; 
    worker_type: string = "";    
    worker_gender: string = "";

    worker_position: string = "";

    worker_birthdate: string = "";    
    worker_hiredate: string = "";  
    religion_code: string = "";    
    blood_code: string = "";    
    worker_height: number = 0;    
    worker_weight: number = 0;    
       
    worker_status: string = "";

    worker_resigndate: string = "";
    worker_resignstatus : boolean = false;
    worker_resignreason : string = "" ;
    worker_probationdate: string = "";
    worker_probationenddate: string = "";
    worker_probationday : number = 0;
    hrs_perday : number = 0;
    worker_taxmethod : string = "";

    approve_by: string = "";
    approve_date: string = "";

    modified_by: string = "";
    modified_date: string = "";

    self_admin: boolean = false;

    index: number = 0;
    select: boolean = false;

    username: string = "";
  }
  
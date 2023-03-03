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


    worker_birthdate!: Date ;    
    worker_hiredate!: Date;  
    religion_code: string = "";    
    blood_code: string = "";    
    worker_height: number = 0;    
    worker_weight: number = 0;    
       
    worker_status: string = "";

    worker_resigndate!: Date;
    worker_resignstatus : boolean = false;
    worker_resignreason : string = "" ;
    worker_probationdate!: Date;
    worker_probationenddate!: Date;
    worker_probationday : number = 0;
    hrs_perday : number = 8;
    worker_taxmethod : string = "";

    approve_by: string = "";
    approve_date: string = "";

    modified_by: string = "";
    modified_date: string = "";

    self_admin: boolean = false;

    index: number = 0;
    select: boolean = false;

    username: string = "";

    position_name_th: string = "";
    position_name_en: string = "";
  }
  
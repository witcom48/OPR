export class FillterEmpModel {
    constructor() {
    }
    company_code : string = "";
    worker_id : string  = "";
    worker_code : string = "";
    worker_card : string = "";  
    worker_initial : string = ""; 
    worker_fname_th : string = "";
    worker_lname_th : string= "";
    worker_fname_en : string= "";
    worker_lname_en : string= "";
    worker_emptype : string= "";
    worker_gender : string= "";
    worker_empstatus: string = "";
    worker_blackliststatus: boolean = false;
    // worker_blackliststatus: string = "";

    searchemp :string = "";
    worker_blacklistreason: string = "";
    worker_resignstatus : boolean = false;

    level_code : string= "";  
    dep_code : string= "";  
    position_code : string= "";  
    group_code : string= "";  

    location_code : string= "";  
    date_fill !: Date;

    status_code:string = "";

    project_code:string = "";
}
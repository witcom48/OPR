export class TaskModel {
    constructor() {
            
    }
    
    company_code: string = "";
    project_code: string = "";
    task_id: string = "1";
    task_type: string = "";
    task_status: string = "";
    task_start: string = "";
    task_end: string = "";
    task_note: string = "";
    
    modified_by: string = "";
    modified_date: string = "";
    flag: boolean = false;   
    index: number = 1;    

    //--  Show only
    task_detail: string = "";
    
  }
  
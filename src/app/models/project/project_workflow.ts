export class ProjectWorkflowModel {
    constructor() {
     
    }
       
    pworkflow_code: string = ""; 
    pworkflow_type: string = "";
    pworkflow_step: number = 1;
    pworkflow_level: string = "";
    pworkflow_empid: string = "";
    pworkflow_empname: string = "";
    pworkflow_emppos: string = "";
    pworkflow_note: string = "";

    modified_by: string = "";
    modified_date: Date = new Date();
    index: number = 0;
    select: boolean = false;    
   
  }
  

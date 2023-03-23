export class WorkflowModel {
    constructor() {
             
    }
    
    company_code: string = "";
    workflow_id: string = "";
    workflow_code: string = "";
    workflow_name_th: string = "";
    workflow_name_en: string = "";
    workflow_type: string = "";
    
    workflow_step1: number = 0;
    workflow_step2: number = 0;
    workflow_step3: number = 0;
    workflow_step4: number = 0;
    workflow_step5: number = 0;

    modified_by: string = "";
    modified_date: string = "";
    index: number = 0;
    select: boolean = false;    
  }
  
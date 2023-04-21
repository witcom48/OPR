export class WorkflowModel {
  constructor() {

  }

  company_code: string = "";
  workflow_id: string = "";
  workflow_code: string = "";
  workflow_name_th: string = "";
  workflow_name_en: string = "";
  workflow_type: string = "";

  step1: number = 0;
  step2: number = 0;
  step3: number = 0;
  step4: number = 0;
  step5: number = 0;
  totalapprove: number = 0;

  modified_by: string = "";
  modified_date: string = "";
  index: number = 0;
  select: boolean = false;
  flag: boolean = false;
}

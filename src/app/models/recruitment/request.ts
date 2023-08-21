export class RequestModel {
  constructor() {

  }
  company_code: string = "";

  request_id: string = "1";
  request_code: string = "";
  request_date!: Date;
  request_startdate!: Date;
  request_enddate!: Date;
  request_position: string = "";
  request_project: string = "";
  request_employee_type: string = "";
  request_quantity: string = "";
  request_urgency: string = "";
  request_note: string = "";


  request_wage_rate: string = "";
  request_overtime: string = "";
  request_another: string = "";

  request_accepted: string ="0";
  request_status: number = 0;

  // created_by: string = "";
  // created_date: string = "";

  modified_by: string = "";
  modified_date: string = "";
  index: number = 0;
  select: boolean = false;

  position_name_th: string = "";
  position_name_en: string = "";
  project_name_th: string = "";
  project_name_en: string = "";
}

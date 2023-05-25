import { cls_MTReqdocumentModel } from "./cls_MTReqdocument";

export class cls_TRTimeleaveModel {
  constructor() {

  }
  company_code: string = "";
  timeleave_id: number = 0;
  worker_code: string = "";
  leave_code: string = "";
  worker_detail_th: string = "";
  worker_detail_en: string = "";
  leave_detail_th: string = "";
  leave_detail_en: string = "";
  timeleave_doc: string = "";
  timeleave_fromdate: Date = new Date();
  timeleave_todate: Date = new Date();
  timeleave_type: string = "F";
  timeleave_min: number = 0;
  timeleave_actualday: number = 1;
  timeleave_incholiday: boolean = false;
  timeleave_deduct: boolean = false;
  timeleave_note: string = "";
  reason_code: string = "";
  reason_th: string = "";
  reason_en: string = "";
  status: number = 0;
  status_job: string = "";

  modified_by: string = "";
  modified_date: string = "";
  flag: boolean = false;

  project_code: string = ""
  reqdoc_data: cls_MTReqdocumentModel[] = []


}
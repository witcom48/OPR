import { ApplyMTDocattModel } from "../recruitment/applyMTDocatt";

export class EmployeeModel {
  employee_code: any;
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


  worker_birthdate!: Date;
  worker_hiredate!: Date;
  religion_code: string = "";
  blood_code: string = "";
  worker_height: number = 0;
  worker_weight: number = 0;

  worker_status: string = "";

  worker_resigndate!: Date;
  worker_resignstatus: boolean = false;
  worker_resignreason: string = "";

  worker_blackliststatus: boolean = false;
  worker_blacklistreason: string = "";
  worker_blacklistnote: string = "";

  worker_probationdate!: Date;
  worker_probationenddate!: Date;
  worker_probationday: number = 0;
  hrs_perday: number = 8;
  worker_taxmethod: string = "";

  approve_by: string = "";
  approve_date: string = "";

  //
  worker_tel: string = "";
  worker_email: string = "";
  worker_line: string = "";
  worker_facebook: string = "";

  worker_military:string = "";

  modified_by: string = "";
  modified_date: string = "";

  self_admin: boolean = false;

  index: number = 0;
  select: boolean = false;

  username: string = "";

  position_name_th: string = "";
  position_name_en: string = "";

  selected_Import: string = "";
  selected_Attachfile:string = "";
  location_code: boolean = false;

  // recruiment
  reqdocatt_data: ApplyMTDocattModel[] = []
  worker_age: number = 0;
  nationality_code: string = "";
  checkblacklist: Boolean = false
  checkhistory: Boolean = false
  counthistory: number = 0;
  checkcertificate: Boolean = false
  status: number = 0;

  worker_cardno: string = "";
  worker_cardnoissuedate!: Date;
  worker_cardnoexpiredate!: Date;

  worker_socialno: string = "";
  worker_socialnoissuedate!: Date;
  worker_socialnoexpiredate!: Date;
  worker_socialsentdate!: Date;
  worker_socialnotsent: Boolean = false

}

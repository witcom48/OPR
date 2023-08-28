import { SysLocationModel } from "../../system/policy/location";

export class EmpLocationModel {
    location_name_th: any;
    constructor() {
    }
    company_code: string = "";
    worker_code: string = "";
    emplocation_id:string = "1";
    location_code: string = "";
    emplocation_startdate!: Date;
    emplocation_enddate!: Date;
    emplocation_note:string= "";
  
    modified_by: string= "";
    modified_date: string= ""; 
  
    index: number = 0;
    select: boolean = false;
    syslocation_data: SysLocationModel[] = []

   
  }
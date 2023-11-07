import { ProjectMTDocattModel } from "./project_docatt";

export class ProjectModel {
    constructor() {
     
    }
    
    project_id: string = "0";
    project_code: string = "";
    project_name_th: string = "";
    project_name_en: string = "";
    project_name_sub: string = "";
    project_codecentral: string = "";
    project_protype: string = "";

    project_proarea: string = "";
    project_progroup: string = "";




    project_probusiness: string = "";
    project_roundtime: string = "";
    project_roundmoney: string = "";
    project_proholiday: string = "";
    
    project_status: string = "";
    approve_status: string = "";

    company_code: string = "";
    
    project_emp: number = 0;
    project_cost: number = 0;

    project_start: Date = new Date();
    project_end: Date = new Date();

    modified_by: string = "";
    modified_date: Date = new Date();

    index: number = 0;
    select: boolean = false;    

    prodocatt_data: ProjectMTDocattModel[] = []

    project_business: string = "";
    project_type: string = "";
    project_name_short: string = "";
    approve_by: string = "";
  }
  
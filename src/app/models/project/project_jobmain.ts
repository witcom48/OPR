export class ProjobmainModel {
    constructor() {
     
    }
    projobemp_emp: string = "";

    projobmain_id: string = "1";
    projobmain_code: string = "";
    projobmain_name_th: string = "";
    projobmain_name_en: string = "";

    projobmain_jobtype: string = "";
    projobmain_fromdate: Date = new Date();
    projobmain_todate: Date = new Date();
    projobmain_type: string = "";
    
    projobmain_timepol: string = "";
    projobmain_slip: string = "";
    projobmain_uniform: string = "";

    project_code: string = "";

    version: string = "";
    procontract_type: string = "";

    modified_by: string = "";
    modified_date: string = "";
    index: number = 0;

    //-- display
    allow1: number = 0;
    allow2: number = 0;
    allow3: number = 0;
    allow4: number = 0;
    allow5: number = 0;
    allow6: number = 0;
    allow7: number = 0;
    allow8: number = 0;
    allow9: number = 0;
    allow10: number = 0;
    allow_emp: number = 0;
    allow_total: number = 0;

    emp_total: number = 0;
   
  }
  
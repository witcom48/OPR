

export class CostcompareModel {
    constructor() {
     
    }
    
    project_id: string = "";
    project_code: string = "";
    project_name_th: string = "";
    project_name_en: string = "";  

    project_type: string = "";
    project_business: string = "";
    project_proarea: string = "";
    project_progroup: string = "";

    version: string = "";
    fromdate: Date = new Date();
    todate: Date = new Date();

    projobmain_id: string = "";
    projobmain_code: string = "";
    projobmain_name_th: string = "";
    projobmain_name_en: string = "";
    projobmain_type: string = "";

    projobmain_manpower: number = 0;
    projobmain_cost: number = 0;


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

    index: number = 0;
    select: boolean = false;    
  }
  
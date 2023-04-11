
import { ProjobmainMonitorModel } from '../project/projobmain_monitor';

export class PrjectMonitorModel {
    constructor() {
     
    }
    
    project_id: string = "";
    project_code: string = "";
    project_name_th: string = "";
    project_name_en: string = "";  

    project_type: string = "";
    project_business: string = "";

    project_manpower: number = 0;
    project_working: number = 0;
    project_leave: number = 0;
    project_absent: number = 0;

    projobmain_data:ProjobmainMonitorModel = new ProjobmainMonitorModel();

    root: boolean = false;   


    project_cost: number = 0;
    project_pay: number = 0;

    index: number = 0;
    select: boolean = false;    
  }
  
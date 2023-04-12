
import { TimecardMonitorModel } from '../project/timecard_monitor';

export class JobMonitorModel {
    constructor() {
     
    }
    
    projobmain_id: string = "";
    projobmain_code: string = "";
    projobmain_name_th: string = "";
    projobmain_name_en: string = "";  
    projobmain_type: string = "";
    projobmain_manpower: number = 0;
    projobmain_working: number = 0;
    projobmain_leave: number = 0;
    projobmain_absent: number = 0;
    projobmain_cost: number = 0;
    projobmain_pay: number = 0;

    timecard_data:TimecardMonitorModel = new TimecardMonitorModel();

  }
  
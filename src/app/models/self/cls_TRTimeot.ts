import { cls_MTReqdocumentModel } from "./cls_MTReqdocument";

export class cls_TRTimeotModel {
    constructor() {

    }
    company_code: string = "";
    worker_code: string = "";
    timeot_id: number = 0;
    timeot_doc: string = "";
    timeot_workdate: Date = new Date();
    timeot_todate: Date = new Date();
    timeot_beforemin: number = 0;
    timeot_normalmin: number = 0;
    timeot_breakmin: number = 0;
    timeot_aftermin: number = 0;
    timeot_beforemin_hrs: string = "00:00";
    timeot_normalmin_hrs: string = "00:00";
    timeot_break_hrs: string = "00:00";
    timeot_aftermin_hrs: string = "00:00";
    timeot_note: string = "";
    location_code: string = "";
    reason_code: string = "";
    status: number = 0;
    status_job: string = "";
    modified_by: string = "";
    modified_date: string = "";
    flag: boolean = false;

    worker_detail_th: string = "";
    worker_detail_en: string = "";
    reason_name_th: string = "";
    reason_name_en: string = "";
    location_name_th: string = "";
    location_name_en: string = "";
    reqdoc_data: cls_MTReqdocumentModel[] = []

}
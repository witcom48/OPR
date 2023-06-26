import { cls_MTReqdocumentModel } from "./cls_MTReqdocument";

export class cls_TRTimeonsiteModel {
    constructor() {

    }
    company_code: string = "";
    worker_code: string = "";
    timeonsite_id: number = 0;
    timeonsite_doc: string = "";
    timeonsite_workdate: Date = new Date();
    timeonstie_todate: Date = new Date();
    timeonsite_in: string = "00:00";
    timeonsite_out: string = "00:00";
    timeonsite_note: string = "";
    reason_code: string = "";
    location_code: string = "";
    status: number = 0;
    status_job: string = "";
    modified_by: string = "";
    modified_date: string = "";
    flag: boolean = false;

    worker_detail_th: string = "";
    worker_detail_en: string = "";
    reason_name_en: string = "";
    reason_name_th: string = "";
    location_name_en: string = "";
    location_name_th: string = "";
    reqdoc_data: cls_MTReqdocumentModel[] = []

}
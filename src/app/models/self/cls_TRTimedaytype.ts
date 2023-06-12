import { cls_MTReqdocumentModel } from "./cls_MTReqdocument";

export class cls_TRTimedaytypeModel {
    constructor() {

    }
    company_code: string = "";
    worker_code: string = "";
    timedaytype_id: number = 0;
    timedaytype_doc: string = "";
    timedaytype_workdate: Date = new Date();
    timedaytype_todate: Date = new Date();
    timedaytype_old: string = "";
    timedaytype_new: string = "";
    timedaytype_note: string = "";
    reason_code: string = "";
    status: number = 0;
    status_job: string = "";
    modified_by: string = "";
    modified_date: string = "";
    flag: boolean = false;

    worker_detail_th: string = "";
    worker_detail_en: string = "";
    reason_name_en: string = "";
    reason_name_th: string = "";
    reqdoc_data: cls_MTReqdocumentModel[] = []

}
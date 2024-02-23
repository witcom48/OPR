import { cls_MTReqdocumentModel } from "../self/cls_MTReqdocument";

export class TRATTTimeDaytypeModel {
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
    jobtable_id:string = "";
    modified_by: string = "";
    modified_date: string = "";
    flag: boolean = false;

    worker_detail_th: string = "";
    worker_detail_en: string = "";
    reason_name_en: string = "";
    reason_name_th: string = "";
    reqdoc_data: cls_MTReqdocumentModel[] = []

}
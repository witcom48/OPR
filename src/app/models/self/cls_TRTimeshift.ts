import { cls_MTReqdocumentModel } from "./cls_MTReqdocument";

export class cls_TRTimeshiftModel {
    constructor() {

    }
    company_code: string = "";
    worker_code: string = "";
    timeshift_id: number = 0;
    timeshift_doc: string = "";
    timeshift_workdate: Date = new Date();
    timeshift_todate: Date = new Date();
    timeshift_old: string = "";
    timeshift_new: string = "";
    timeshift_note: string = "";
    reason_code: string = "";
    status: number = 0;
    status_job: string = "";
    jobtable_id:string="";
    modified_by: string = "";
    modified_date: string = "";
    flag: boolean = false;

    worker_detail_th: string = "";
    worker_detail_en: string = "";
    reason_detail_th: string = "";
    reason_detail_en: string = "";
    shift_old_th: string = "";
    shift_old_en: string = "";
    shift_new_th: string = "";
    shift_new_en: string = "";
    reqdoc_data: cls_MTReqdocumentModel[] = []

}
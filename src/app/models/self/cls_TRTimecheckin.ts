import { cls_MTReqdocumentModel } from "./cls_MTReqdocument";

export class cls_TRTimecheckinModel {
    constructor() {

    }
    company_code: string = "";
    worker_code: string = "";
    timecheckin_id: number = 0;
    timecheckin_doc: string = "";
    timecheckin_workdate: Date = new Date();
    timecheckin_todate: Date = new Date();
    timecheckin_time: string = "";
    timecheckin_type: string = "";
    timecheckin_lat: number = 0;
    timecheckin_long: number = 0;
    timecheckin_note: string = "";
    location_code: string = "";
    status: number = 0;
    status_job: string = "";
    jobtable_id:string="";
    modified_by: string = "";
    modified_date: string = "";
    flag: boolean = false;

    worker_detail_th: string = "";
    worker_detail_en: string = "";
    location_name_en: string = "";
    location_name_th: string = "";
    reqdoc_data: cls_MTReqdocumentModel[] = []

}
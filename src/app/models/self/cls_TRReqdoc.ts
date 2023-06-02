import { cls_TRReqdocattModel } from "./cls_TRReqdocatt";
import { cls_TRReqempinfoModel } from "./cls_TRReqempinfo";

export class cls_TRReqdocModel {
    constructor() {

    }
    company_code: string = "";
    worker_code: string = "";
    reqdoc_id: number = 0;
    reqdoc_doc: string = "";
    reqdoc_date: Date = new Date();
    reqdoc_date_to: Date = new Date();
    reqdoc_note: string = "";
    status: number = 0;
    modified_by: string = "";
    modified_date: string = "";
    flag: boolean = false;
    reqempinfo_data: cls_TRReqempinfoModel[] = [];
    reqdocatt_data: cls_TRReqdocattModel[] = [];

    status_job: string = "";
    worker_detail_th: string = "";
    worker_detail_en: string = "";
}
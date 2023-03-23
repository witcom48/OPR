export class ApplyworkModel {

    constructor() {

    }
    company_code: string = '';
    applywork_id: string = '1';
    applywork_code: string = '';
    applywork_initial: string = '';
    applywork_fname_th: string = '';
    applywork_lname_th: string = '';
    applywork_fname_en: string = '';
    applywork_lname_en: string = '';

    applywork_birthdate!: Date;
    applywork_startdate!: Date;

    province_code: string = '';
    // province_code คือศาสนา
    bloodtype_code: string = '';
    applywork_height: number = 0;
    applywork_weight: number = 0;

    modified_by: string = '';
    modified_date: string = '';
    index: number = 0;
    select: boolean = false;


}

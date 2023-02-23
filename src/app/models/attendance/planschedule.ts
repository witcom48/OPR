export class PlanscheduleModels {
    constructor() {

    }
    company_code: string = "";
    planshift_code: string = "";
    planschedule_fromdate!: Date;
    planschedule_todate!: Date;
    shift_code: string = "";
    planschedule_sun_off: string = "";
    planschedule_mon_off: string = "";
    planschedule_tue_off: string = "";
    planschedule_web_off: string = "";
    planschedule_thu_off: string = "";
    planschedule_fri_off: string = "";
    planschedule_sta_off: string = "";
    created_by: string = "";
    created_date: string = "";
    modified_by: string = "";
    modified_date: string = "";
    flag: boolean = false;
}

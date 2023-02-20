export class PlanscheduleModels {
    constructor() {

    }
    company_code: string = "";
    planshift_code: string = "";
    planschedule_fromdate!: Date;
    planschedule_todate!: Date;
    shift_code: string = "";
    planschedule_sun_off: boolean = false;
    planschedule_mon_off: boolean = false;
    planschedule_tue_off: boolean = false;
    planschedule_wed_off: boolean = false;
    planschedule_thu_off: boolean = false;
    planschedule_fri_off: boolean = false;
    planschedule_sat_off: boolean = false;
    // created_by: string = "";
    // created_date: string = "";
    modified_by: string = "";
    // modified_date: string = "";
    flag: boolean = false;
}

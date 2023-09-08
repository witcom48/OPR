export class EmpExperienceModel {
    constructor() {
    }
    company_code: string= "";
    worker_code: string= "";
    experience_id: string= "0";
    company_name: string= "";
    position: string= "";
    salary:number = 0;
    startdate!: Date;
    enddate!: Date;

    modified_by: string= "";
    modified_date: string= "";


    index: number = 0;
    select: boolean = false;
}
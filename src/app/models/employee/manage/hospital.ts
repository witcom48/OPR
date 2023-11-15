export class EmpHospitalModel {
    constructor() {
    }
    company_code: string= "";
    worker_code: string= "";
    emphospital_id: string= "0";
    emphospital_code: string= "";
    emphospital_date!: Date;

    emphospital_order: string= "";
    emphospital_activate: boolean = false;


    modified_by: string= "";
    modified_date: string= "";


    index: number = 0;
    select: boolean = false;
}

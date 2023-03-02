export class EmpFamilyModel {
    constructor() {
    }
    company_code: string= "";
    worker_code: string= "";
    family_id: string= "1";
    family_code: string= "";
    family_type: string= "";
    family_fname_th: string= "";
    family_lname_th: string= "";
    family_fname_en: string= "";
    family_lname_en: string= "";
    family_birthdate!: Date;

    modified_by: string= "";
    modified_date: string= "";


    index: number = 0;
    select: boolean = false;
}
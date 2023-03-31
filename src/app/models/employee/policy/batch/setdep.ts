import { EmployeeModel } from "../../employee";

export class SetDepModel {
    constructor() {

    }
    company_code: string = "";
    empdep_date!: Date;
    empdep_level01: string ="";
    empdep_level02: string ="";
    empdep_level03: string ="";
    empdep_level04: string ="";
    empdep_level05: string ="";
    empdep_level06: string ="";
    empdep_level07: string ="";
    empdep_level08: string ="";
    empdep_level09: string ="";
    empdep_level10: string ="";

    empdep_reason: string ="";
    
    emp_data: EmployeeModel[] = [];
    modified_by: string = "";
    modified_date!: Date;
    flag: boolean = false;
}
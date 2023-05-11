import { EmployeeModel } from "../../employee/employee";
import { ItemsModel } from "../items";

export class SetItemModel {
    constructor() {

    }
    company_code: string = "";
    worker_code: string= "";
    paypolitem_code: string= "";
    worker_detail: string= "";

    items_data: ItemsModel[] = [];
    emp_data: EmployeeModel [] = [];


    modified_by: string = "";
    modified_date!: Date;
    flag: boolean = false;
    index: number = 0 ;

}

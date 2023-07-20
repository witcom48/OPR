import { EmployeeModel } from "../employee/employee";
import { ItemsModel } from "./items";

export class PayitemModel {
    constructor() {}
  
    company_code: string = "";
    worker_code: string = "1";
    item_code: string = "";
    payitem_date!: Date ;
    payitem_amount: string = "";
    payitem_quantity: string = "";
    payitem_paytype: string = "";
    payitem_note: string = "";
    item_detail: string = "";
    item_type: string = "";
    worker_detail: string = "";
    modified_by: string = "";
    modified_date: string = "";
    index: number = 0;
    select: boolean = false;
    flag: boolean = false;

    item_data: ItemsModel[] = [];
    emp_data: EmployeeModel [] = [];

 
  }
  
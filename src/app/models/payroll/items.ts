import { EmployeeModel } from "../employee/employee";
import { SetItemModel } from "./batch/setitem";

export class ItemsModel {
    

    constructor() {}
    company_code: string= "";
    item_id: string = "1";
    item_code: string= "";
    item_name_th: string= "";
    item_name_en: string= "";

    item_type: string = "";
    item_regular: string= "";
    item_caltax: string= "";
    item_calpf: string= "";
    item_calot: string= "";
    item_calsso: string= "";
    item_allowance: string= "";
    item_contax: string= "";
    item_section: string= "";
    item_rate: number = 0.00 ;
    item_account: string= "";

    modified_by: string = "";
    modified_date: string = "";
    index: number = 0 ;
    select: boolean = false;


    emp_data: EmployeeModel [] = [];
    setitesm_data: SetItemModel[] = [];

    worker_code: string= "";
    paypolitem_code: string= "";
    worker_detail: string= "";
  }


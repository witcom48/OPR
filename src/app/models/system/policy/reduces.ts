import { EmployeeModel } from "../../employee/employee";

export class ReducesModel {
    



      reduce_id: string = "0";
      reduce_code: string = "";
      reduce_name_th: string = "";
      reduce_name_en: string = "";

      reduce_amount: string = "0";
      reduce_amount_max: string = "0";
      reduce_percent:string = "0";
      reduce_percent_max: string = "0";

      created_by: string = "";
      modified_by: string = "";
      index: number = 0;
      select: boolean = false;

      emp_data: EmployeeModel [] = [];
      worker_code: string= "";
      paypolitem_code: string= "";
      worker_detail: string= "";
    }

import { AccountDepModel } from "./accountdep";
import { AccountPosModel } from "./accountpos";
import { TRAccountModel } from "./traccount";

export class AccountModel {
  constructor() {

  }
  company_code: string = "";
  account_user: string = "";
  account_pwd: string = "";
  account_type: string = "";
  account_level: number = 1;
  account_email: string = "";
  account_email_alert: boolean = false;

  account_line: string = "";
  account_line_alert: boolean = false;

  modified_by: string = "";
  modified_date: string = "";
  flag: boolean = false;
  position_data: AccountPosModel[] = [];
  dep_data: AccountDepModel[] = [];
  worker_data: TRAccountModel[] = [];
}

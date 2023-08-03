import { AccessdataModel } from "../models/system/security/accessdata";
import { PolmenuModel } from "../models/system/security/polmenu";

export class InitialCurrent {
  constructor() {

  }

  CompCode: string = "OPR";
  EmpType: string = "M";

  Language: string = "EN";
  Username: string = "Emp01";
  Usertype: string = "EMP";
  LastLogin: Date = new Date();

  TA_FromDate: Date = new Date();
  TA_ToDate: Date = new Date();
  TA_Enable: boolean = true;

  PR_FromDate: Date = new Date();
  PR_ToDate: Date = new Date();
  PR_PayDate: Date = new Date();
  PR_Year: string = new Date().getFullYear().toString();
  PR_Period: string = "01";
  PR_Enable: boolean = true;

  Token: string = "";

  PolMenu: PolmenuModel = new PolmenuModel();
  PolMenu_Code: string = ""

  public doGetJSONInitialCurrent(): string {
    var item_data: string = "";
    item_data = item_data + "{";
    item_data = item_data + "\"CompCode\":\"" + this.CompCode + "\"";
    item_data = item_data + ",\"EmpType\":\"" + this.EmpType + "\"";
    item_data = item_data + ",\"Language\":\"" + this.Language + "\"";
    item_data = item_data + ",\"Username\":\"" + this.Username + "\"";
    item_data = item_data + ",\"Usertype\":\"" + this.Usertype + "\"";
    item_data = item_data + ",\"LastLogin\":\"" + this.LastLogin + "\"";

    item_data = item_data + ",\"Token\":\"" + this.Token + "\"";

    item_data = item_data + ",\"TA_FromDate\":\"" + this.TA_FromDate + "\"";
    item_data = item_data + ",\"TA_ToDate\":\"" + this.TA_ToDate + "\"";
    item_data = item_data + ",\"TA_Enable\":\"" + this.TA_Enable + "\"";

    item_data = item_data + ",\"PR_FromDate\":\"" + this.PR_FromDate + "\"";
    item_data = item_data + ",\"PR_ToDate\":\"" + this.PR_ToDate + "\"";
    item_data = item_data + ",\"PR_PayDate\":\"" + this.PR_PayDate + "\"";
    item_data = item_data + ",\"PR_Year\":\"" + this.PR_Year + "\"";
    item_data = item_data + ",\"PR_Period\":\"" + this.PR_Period + "\"";
    item_data = item_data + ",\"PR_Period\":\"" + this.PR_Period + "\"";
    item_data = item_data + ",\"PolMenu_Code\":\"" + this.PolMenu_Code + "\"";
    item_data = item_data + ",\"PolMenu\":\"" + this.PolMenu + "\"";

    item_data = item_data + "}";

    return item_data;
  }

  dotGetPolmenu(polmenu: any, models: string):any {
    var model = new AccessdataModel();
    polmenu[0].accessdata_data.find((data: AccessdataModel) => {
      if (data.accessdata_module == models) {
        model = data;
      }
    })
    return model;
  }
}

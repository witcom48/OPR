import { PolmenuModel } from "../models/system/security/polmenu";

export class AppConfig {
  constructor() {

  }
  UrlApi: string = "http://localhost:32208"
  //  UrlApi: string = "https://83.118.28.242:8803"
  // UrlApi: string = "http://161.82.218.95:8803"
  // UrlApi: string = "https://hrfocusess.com:8806"

  WebReporting:string = "http://161.82.218.95:8807/GenarateReport.aspx?token=";
  // WebReporting: string = "https://83.118.28.242:8807/GenarateReport.aspx?token=";
  // WebReporting:string = "http://localhost:5454/GenarateReport.aspx?token="


  ApiMainModule: string = this.UrlApi + "/ServiceSys.svc/ServiceSys";
  ApiSystemModule: string = this.UrlApi + "/ServiceSys.svc/ServiceSys";
  ApiAttendanceModule: string = this.UrlApi + "/ServiceSys.svc/ServiceSys";
  ApiRecruitmentModule: string = this.UrlApi + "/ServiceSys.svc/ServiceSys";
  ApiEmployeeModule: string = this.UrlApi + "/ServiceSys.svc/ServiceSys";
  ApiProjectModule: string = this.UrlApi + "/ServiceSys.svc/ServiceSys";
  ApiSelfServicesModule: string = this.UrlApi + "/ServiceSys.svc/ServiceSys";
  ApiPayrollModule: string = this.UrlApi + "/ServiceSys.svc/ServiceSys";


  static SESSIONInitial: string = "SESSIONInitial";
  static PolMenu: PolmenuModel = new PolmenuModel();

}

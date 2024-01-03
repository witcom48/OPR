import { PolmenuModel } from "../models/system/security/polmenu";

export class AppConfig {
  constructor() {

  }

   UrlApi: string = "http://localhost:32208"
  //UrlApi: string = "http://161.82.218.95:8806"
  // UrlApi: string = "https://hrfocusess.com:8806"


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

import { PolmenuModel } from "../models/system/security/polmenu";

export class AppConfig {
  constructor() {

  }

   UrlApi: string = "http://localhost:32208"
  //UrlApi: string = "http://161.82.218.95:8806"
  // UrlApi: string = "https://hrfocusess.com:8806"


  ApiMainModule: string = this.UrlApi + "/BpcOpr.svc/BpcOpr";
  ApiSystemModule: string = this.UrlApi + "/Module_System/ModuleSystem.svc/System";
  ApiAttendanceModule: string = this.UrlApi + "/Module_Attendance/ModuleAttendance.svc/Attendance";
  ApiRecruitmentModule: string = this.UrlApi + "/Module_Recruitment/ModuleRecruitment.svc/Recruitment";
  ApiEmployeeModule: string = this.UrlApi + "/Module_Employee/ModuleEmployee.svc/Employee";
  ApiProjectModule: string = this.UrlApi + "/Module_Project/ModuleProject.svc/Project";
  ApiSelfServicesModule: string = this.UrlApi + "/Module_SelfServices/ModuleSelfServices.svc/SelfServices";
  ApiPayrollModule: string = this.UrlApi + "/Module_Payroll/ModulePayroll.svc/Payroll";


  static SESSIONInitial: string = "SESSIONInitial";
  static PolMenu: PolmenuModel = new PolmenuModel();

}

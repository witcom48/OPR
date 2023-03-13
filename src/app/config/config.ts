export class AppConfig {
  constructor() {

  }
  UrlApi: string = "http://localhost:32208"

  ApiMainModule: string = this.UrlApi + "/BpcOpr.svc/BpcOpr";
  ApiSystemModule: string = this.UrlApi + "/Module_System/ModuleSystem.svc/System";
  ApiAttendanceModule: string = this.UrlApi + "/Module_Attendance/ModuleAttendance.svc/Attendance";
  ApiEmployeeModule: string = this.UrlApi + "/Module_Employee/ModuleEmployee.svc/Employee";
  ApiProjectModule: string = this.UrlApi + "/Module_Project/ModuleProject.svc/Project";


  static SESSIONInitial: string = "SESSIONInitial";

}

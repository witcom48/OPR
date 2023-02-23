
export class AppConfig {
    constructor() {
     
    }

    UrlApi:string = "http://localhost:32207"

    ApiMainModule: string = "http://localhost:32207/BpcOpr.svc/BpcOpr";    
    ApiSystemModule: string = "http://localhost:32207/Module_System/ModuleSystem.svc/System";    
    ApiProjectModule: string = "http://localhost:32207/Module_Project/ModuleProject.svc/Project";    
    ApiEmployeeModule : string = this.UrlApi+"/Module_Employee/ModuleEmployee.svc/Employee";
    ApiAttendanceModule: string = this.UrlApi+"/Module_Attendance/ModuleAttendance.svc/Attendance";


    static SESSIONInitial: string = "SESSIONInitial";

  }
  
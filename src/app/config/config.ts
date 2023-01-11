
export class AppConfig {
    constructor() {
     
    }
    UrlApi:string = "http://localhost:32207"

    ApiMainModule: string = this.UrlApi+"/BpcOpr.svc/BpcOpr";    
    ApiSystemModule: string = this.UrlApi+"/Module_System/ModuleSystem.svc/System";    
    ApiAttendanceModule: string = this.UrlApi+"/Module_Attendance/ModuleAttendance.svc/Attendance";    

    
    static SESSIONInitial: string = "SESSIONInitial";

  }
  
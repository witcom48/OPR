
export class AppConfig {
    constructor() {
     
    }

    ApiMainModule: string = "http://localhost:32207/BpcOpr.svc/BpcOpr";    
    ApiSystemModule: string = "http://localhost:32207/Module_System/ModuleSystem.svc/System"; 
    ApiEmployeeModule: string = "http://localhost:32207/Module_Employee/ModuleEmployee.svc/Employee";   

    
    static SESSIONInitial: string = "SESSIONInitial";

  }
  
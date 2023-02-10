
export class AppConfig {
    constructor() {
     
    }

    ApiMainModule: string = "http://localhost:32207/BpcOpr.svc/BpcOpr";    
    ApiSystemModule: string = "http://localhost:32207/Module_System/ModuleSystem.svc/System";    
    ApiProjectModule: string = "http://localhost:32207/Module_Project/ModuleProject.svc/Project";    

    
    static SESSIONInitial: string = "SESSIONInitial";

  }
  
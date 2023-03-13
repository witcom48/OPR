export class TaskDetailModel {
    constructor() {
      this.task_id = "1";    
      this.taskdetail_process = "1";      
      this.taskdetail_fromdate = new Date(); 
      this.taskdetail_todate = new Date(); 
      this.taskdetail_paydate = new Date();            
    }
    
    task_id: string;
    taskdetail_process: string;
    taskdetail_fromdate: Date;
    taskdetail_todate: Date;
    taskdetail_paydate: Date;
    
  }
  
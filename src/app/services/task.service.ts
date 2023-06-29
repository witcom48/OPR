import { Injectable } from '@angular/core';
import { AppConfig } from '../config/config';
import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { Router } from '@angular/router';
import { InitialCurrent } from '../config/initial_current';

import { TaskModel } from '../models/task';
import { TaskDetailModel } from '../models/task_detail';
import { TaskWhoseModel } from '../models/task_whose';
import { DatePipe } from '@angular/common';
import { EmployeeModel } from '../models/employee/employee';

@Injectable({
  providedIn: 'root'
})
export class TaskService {


  public config:AppConfig = new AppConfig();
  
  public initial_current:InitialCurrent = new InitialCurrent();  

  httpHeaders = new HttpHeaders({});
  options = {
    headers: this.httpHeaders
  };

  basicRequest = { 
    device_name:'',
    ip:'',
    username:''
  };

  constructor(private http:HttpClient, private router: Router, private datePipe: DatePipe) { 
    this.doGetInitialCurrent();
  }

  doGetInitialCurrent(){    
    this.initial_current = JSON.parse(localStorage.getItem(AppConfig.SESSIONInitial) || '{}');
    if (this.initial_current) {
      this.httpHeaders = new HttpHeaders({
        'Content-Type': 'application/json; charset=utf-8',
        'Accept': 'application/json',
        'Cache-Control': 'no-cache',
        'Authorization': this.initial_current.Token
      });

      this.options = {
        headers: this.httpHeaders
      };

      this.basicRequest = { 
        device_name:'',
        ip:"localhost",
        username:this.initial_current.Username
      };

    }   
    else{
      this.router.navigateByUrl('login');
    } 
  }

  getList(com_code:string, task_type:string, task_status:string){  
   
    var filter = { 
      device_name:'',
      ip:"localhost",
      username:this.initial_current.Username,
      company:com_code,
      language:"",
      project_code:"",
      type:task_type,
      status:task_status,
    };    

    return this.http.post<any>(this.config.ApiProjectModule + '/task_list', filter, this.options).toPromise()   
    .then((res) => {
      let message = JSON.parse(res);      
      return message.data;
    });


  }

  getTaskDetail(task_id:string){  
 
    var filter = { 
      id:task_id,     
      username:this.initial_current.Username,      
    };    

    return this.http.post<any>(this.config.ApiProjectModule + '/task_detail', filter, this.options).toPromise()   
    .then((res) => {
      let message = JSON.parse(res);      
      return message.data;
    });

  }

  getTaskWhose(task_id:string){  
    var filter = { 
      id:task_id,     
      username:this.initial_current.Username,      
    };    

    return this.http.post<any>(this.config.ApiProjectModule + '/task_whose', filter, this.options).toPromise()   
    .then((res) => {
      let message = JSON.parse(res);      
      return message.data;
    });
  }


  public task_record(task:TaskModel, task_detail:TaskDetailModel, workerList:EmployeeModel[]) {   
    
    var detail_data:string = "[";

    if(task_detail != null){
      detail_data = detail_data + "{";
      detail_data = detail_data + "\"task_id\":\"" + task.task_id + "\"";
      detail_data = detail_data + ",\"taskdetail_process\":\"" + task_detail.taskdetail_process + "\"";
      detail_data = detail_data + ",\"taskdetail_fromdate\":\"" + this.datePipe.transform(task_detail.taskdetail_fromdate, 'yyyy-MM-dd') + "\"";   
      detail_data = detail_data + ",\"taskdetail_todate\":\"" + this.datePipe.transform(task_detail.taskdetail_todate, 'yyyy-MM-dd') + "\"";   
      detail_data = detail_data + ",\"taskdetail_paydate\":\"" + this.datePipe.transform(task_detail.taskdetail_paydate, 'yyyy-MM-dd') + "\"";   
      detail_data = detail_data + "}";
    }

    detail_data = detail_data + "]";

    var whose_data:string = "[";

    for (let i = 0; i < workerList.length; i++) {         
      whose_data = whose_data + "{";
      whose_data = whose_data + "\"task_id\":\"" + task.task_id + "\"";
      whose_data = whose_data + ",\"worker_code\":\"" + workerList[i].worker_code + "\"";   
      whose_data = whose_data + "}" + ",";
    }

    if(whose_data.length > 2) 
    {
      whose_data = whose_data.substr(0, whose_data.length - 1);
    }

    whose_data = whose_data + "]";
    

    var specificData = { 
      company_code:task.company_code,
      project_code:task.project_code,
      task_id:task.task_id,
      task_type:task.task_type,
      task_status:task.task_status,
      
      detail_data:detail_data,
      whose_data:whose_data,

      modified_by:this.initial_current.Username,
    };
    
    return this.http.post<any>(this.config.ApiProjectModule + '/task', specificData, this.options).toPromise()   
    .then((res) => {      
      return res;
    });
  }  

  public get_file(file_path: string) {
    var para = "file_path=" + file_path;
    return this.http.post<any>(this.config.ApiSelfServicesModule + '/doGetMTReqdoc?' + para, this.options).toPromise()
        .then((res) => {
            return res;
        });
}

  public task_delete(task:TaskModel) {    
    const data = {
      task_id:task.task_id,      
      modified_by: this.initial_current.Username
    };    

    return this.http.post<any>(this.config.ApiProjectModule + '/task_del', data, this.options).toPromise()   
    .then((res) => {      
      return res;
    });
  }  




}

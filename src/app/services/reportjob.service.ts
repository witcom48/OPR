import { Injectable } from '@angular/core';
import { AppConfig } from '../config/config';
import { InitialCurrent } from '../config/initial_current';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { ReportjobModel } from '../models/reportjob';
import { ReportjobwhoseModel } from '../models/repostjobwhose';

@Injectable({
    providedIn: 'root'
})

export class ReportjobService {

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

  getList(com_code:string){  
   
    var filter = { 
      device_name:'',
      ip:"localhost",
      username:this.initial_current.Username,
      company:com_code,
      language:"",
      project_code:"",
    };    

    return this.http.post<any>(this.config.ApiProjectModule + '/report_list', filter, this.options).toPromise()   
    .then((res) => {
      let message = JSON.parse(res);      
      return message.data;
    });
  }

  getReportWhose(task_id:string){  
    var filter = { 
      id:task_id,     
      username:this.initial_current.Username,      
    };    

    return this.http.post<any>(this.config.ApiProjectModule + '/report_whose', filter, this.options).toPromise()   
    .then((res) => {
      let message = JSON.parse(res);      
      return message.data;
    });
  }

  public report_record(reportDetail:ReportjobModel, whoseList:ReportjobwhoseModel[]) {   
    
    var whose_data:string = "[";

    for (let i = 0; i < whoseList.length; i++) {   
      whose_data = whose_data + "{";     
      whose_data = whose_data + "\"worker_code\":\"" + (whoseList[i].worker_code) + "\"";        
      whose_data = whose_data + ",\"reportjob_id\":\"" + "1" + "\"";                    
      whose_data = whose_data + "}" + ",";
    }
    if(whose_data.length > 2) 
    {
      whose_data = whose_data.substr(0, whose_data.length - 1);
    }
    whose_data = whose_data + "]";

    var specificData = { 
        reportjob_id:reportDetail.reportjob_id,
        reportjob_ref:reportDetail.reportjob_ref,
        reportjob_type:reportDetail.reportjob_type,
        reportjob_status:reportDetail.reportjob_status,    
        reportjob_language:reportDetail.reportjob_language,    
        reportjob_fromdate:this.datePipe.transform(reportDetail.reportjob_fromdate, 'yyyy-MM-dd HH:mm:ss'),
        reportjob_todate:this.datePipe.transform(reportDetail.reportjob_todate, 'yyyy-MM-dd HH:mm:ss'),
        reportjob_paydate:this.datePipe.transform(reportDetail.reportjob_paydate, 'yyyy-MM-dd HH:mm:ss'),
        company_code:reportDetail.company_code,
        reportjob_section:reportDetail.reportjob_section,
        reportjob_note:reportDetail.reportjob_note,
        
        reportjob_whose:whose_data,
  
        modified_by:this.initial_current.Username
      };

    
    return this.http.post<any>(this.config.ApiProjectModule + '/report', specificData, this.options).toPromise()   
    .then((res) => {      
      return res;
    });
  }  
  
  public report_delete(reportDetail:ReportjobModel) {    
    const data = {
        reportjob_id:reportDetail.reportjob_id,
        company_code:reportDetail.company_code,
        modified_by: this.initial_current.Username
    };    

    return this.http.post<any>(this.config.ApiProjectModule + '/report_del', data, this.options).toPromise()   
    .then((res) => {      
      return res;
    });
  }  

}
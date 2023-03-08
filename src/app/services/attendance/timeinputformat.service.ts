import { Injectable } from '@angular/core';
import { AppConfig } from '../../config/config';
import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';

import { InitialCurrent } from '../../config/initial_current';
import { TimeinputformatModel } from '../../models/attendance/timeinputformat';

@Injectable({
  providedIn: 'root'
})
export class TimeinputformatService {

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
     
  public timeinputformat_get(company:string){     
    
    var filter = { 
      device_name:'',
      ip:"localhost",
      username:this.initial_current.Username,
      company:company,
      language:this.initial_current.Language,      
    };
    

    return this.http.post<any>(this.config.ApiProjectModule + '/timeformat_list', filter, this.options).toPromise()   
    .then((res) => {
      let message = JSON.parse(res);
      console.log(res)
      return message.data;
    });
  }
 
  public timeinputformat_record(model:TimeinputformatModel) {   

    var data = { 
      company_code:model.company_code,
      date_format:model.date_format,

      card_start:model.card_start,
      card_lenght:model.card_lenght,

      date_start:model.date_start,
      date_lenght:model.date_lenght,

      hours_start:model.hours_start,
      hours_lenght:model.hours_lenght,

      minute_start:model.minute_start,
      minute_lenght:model.minute_lenght,

      function_start:model.function_start,
      function_lenght:model.function_lenght,

      machine_start:model.machine_start,
      machine_lenght:model.machine_lenght,

      modified_by:this.initial_current.Username
    };

    return this.http.post<any>(this.config.ApiProjectModule + '/timeformat', data, this.options).toPromise()   
    .then((res) => {      
      return res;
    });
  }  

  uploadTimeScan(file: File, file_name:string, file_type:string){

    const formData = new FormData();
    formData.append('file', file);
    
    var para = "fileName=" + file_name + "." + file_type;
    para += "&token=" + this.initial_current.Token;
    para += "&by=" + this.initial_current.Username;

    return this.http.post<any>(this.config.ApiProjectModule + '/doUploadTimeInput?' + para, formData).toPromise()   
    .then((res) => {      
      return res;
    });
    
  }

  doReadSimpleTimeinput(file: File, file_name:string, file_type:string){

    const formData = new FormData();
    formData.append('file', file);    

    var para = "fileName=" + file_name + "." + file_type;
    para += "&token=" + this.initial_current.Token;
    para += "&by=" + this.initial_current.Username;

    return this.http.post<any>(this.config.ApiProjectModule + '/doReadSimpleTimeInput?' + para, formData).toPromise()   
    .then((res) => {      
      return res;
    });
    
  }

}

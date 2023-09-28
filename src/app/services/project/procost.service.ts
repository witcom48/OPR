import { Injectable } from '@angular/core';
import { AppConfig } from '../../config/config';
import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { Router } from '@angular/router';

import { InitialCurrent } from '../../config/initial_current';
import { ProcostModel } from '../../models/project/policy/procost';


@Injectable({
  providedIn: 'root'
})
export class ProcostService {

  public config:AppConfig = new AppConfig();  
  public initial_current:InitialCurrent = new InitialCurrent();  

  httpHeaders = new HttpHeaders({});
  options = {
    headers: this.httpHeaders
  };

  basicRequest = { 
    device_name:'',
    ip:'',
    username:'',
    company:'',
  };

  constructor(private http:HttpClient, private router: Router) { 
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
        username:this.initial_current.Username,
        company:this.initial_current.CompCode,
      };

    }   
    else{
      this.router.navigateByUrl('login');
    } 
  }
   
  public procost_get(model:ProcostModel) {
    let data = {
       device_name: "phone",
       ip: "127.0.0.1",
       username: this.initial_current.Username,
       company_code: model.company_code || this.initial_current.CompCode,
       procost_id: model.procost_id,
       procost_code: model.procost_code
   }
   return this.http.post<any>(this.config.ApiProjectModule + '/procost_list', data, this.options).toPromise()
       .then((res) => {
           let message = JSON.parse(res);
           return message.data;
       });
}

  // public procost_get(company:string){      
  //       return this.http.post<any>(this.config.ApiProjectModule + '/procost_list', this.basicRequest, this.options).toPromise()   
  //   .then((res) => {
  //     let message = JSON.parse(res);
  //     //// console.log(res)
  //     return message.data;
  //   });
  // }
 
  public procost_record(model:ProcostModel) {   
    const data = {
      procost_id: model.procost_id,
      procost_code: model.procost_code,
      procost_name_th: model.procost_name_th,
      procost_name_en: model.procost_name_en,    
      
      procost_type: model.procost_type,    
      procost_auto: model.procost_auto,    
      procost_itemcode: model.procost_itemcode,    
      company_code: model.company_code || this.initial_current.CompCode,

      modified_by: this.initial_current.Username
    };    

    //// console.log(this.config.ApiProjectModule)

    return this.http.post<any>(this.config.ApiProjectModule + '/procost', data, this.options).toPromise()   
    .then((res) => {      
      return res;
    });
  }  

  public procost_delete(model:ProcostModel) {    
    const data = {
      procost_id: model.procost_id,
      procost_code: model.procost_code,       
      modified_by: this.initial_current.Username
    };    

    return this.http.post<any>(this.config.ApiProjectModule + '/procost_del', data, this.options).toPromise()   
    .then((res) => {      
      return res;
    });
  }  


  public procost_import(file: File, file_name:string, file_type:string){
    const formData = new FormData();
    formData.append('file', file);    
    var para = "fileName=" + file_name + "." + file_type;
    para += "&token=" + this.initial_current.Token;
    para += "&by=" + this.initial_current.Username;
    para += "&com=" + this.initial_current.CompCode;

    return this.http.post<any>(this.config.ApiProjectModule + '/doUploadMTProcost?' + para, formData).toPromise()   
    .then((res) => {      
      return res;
    });
  }



}

import { Injectable } from '@angular/core';

import { AppConfig } from '../../../config/config';
import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { Router } from '@angular/router';

import { InitialCurrent } from '../../../config/initial_current';
import { PartModel } from 'src/app/models/employee/policy/part';


@Injectable({
  providedIn: 'root'
})
export class PartService {

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
        username:this.initial_current.Username
      };
    }   
    else{
      this.router.navigateByUrl('login');
    } 
  }

  public dep_get(){      
    console.log('DEP001..');
    return this.http.post<any>(this.config.ApiEmployeeModule + '/dep_list', this.basicRequest, this.options).toPromise()   
    .then((res) => {
      let message = JSON.parse(res);
      console.log(res)
      return message.data;
    });
  }

  public dep_record(model:PartModel) {
    console.log('DEP002..');
    const data = {
      dep_id: model.dep_id,
      dep_code: model.dep_code,
      dep_name_th: model.dep_name_th,
      dep_name_en: model.dep_name_en,
      dep_parent: " ",
      dep_level: model.dep_level,
      company_code: this.initial_current.CompCode,
      modified_by: this.initial_current.Username
    };    

    return this.http.post<any>(this.config.ApiEmployeeModule + '/dep', data, this.options).toPromise()   
    .then((res) => {
      return res;
    });
  }

  public dep_delete(model:PartModel) {
    console.log('DEP003..');
    const data = {
      dep_id: model.dep_id,
      dep_code: model.dep_code,       
      modified_by: this.initial_current.Username
    };    
    return this.http.post<any>(this.config.ApiEmployeeModule + '/dep_del', data, this.options).toPromise()   
    .then((res) => {      
      return res;
    });
  }

  public dep_import(file: File, file_name:string, file_type:string){

    const formData = new FormData();
    formData.append('file', file);
    
      var para = "fileName=" + file_name + "." + file_type;
      para += "&token=" + this.initial_current.Token;
      para += "&by=" + this.initial_current.Username;

    return this.http.post<any>(this.config.ApiEmployeeModule + '/doUploadDep?' + para, formData).toPromise()   
    .then((res) => {      
      return res;
    });
  }
}

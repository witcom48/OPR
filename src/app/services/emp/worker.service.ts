import { Injectable } from '@angular/core';
import { PrjectModel } from '../../models/project/project';
import { AppConfig } from '../../config/config';
import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { Router } from '@angular/router';

import { InitialCurrent } from '../../config/initial_current';
import { EmployeeModel } from 'src/app/models/employee/employee';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  public config:AppConfig = new AppConfig();
  
  private model:PrjectModel = new PrjectModel();
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

  public worker_get(company:string, code:string){      
    console.log('WKR001..');
           
    var filter = { 
      device_name:'',
      ip:"localhost",
      username:this.initial_current.Username,
      company_code:company,
      language:"",
      worker_code:code
    };

    return this.http.post<any>(this.config.ApiEmployeeModule + '/worker_list', filter, this.options).toPromise()   
    .then((res) => {
      let message = JSON.parse(res);
      console.log(res)
      return message.data;
    });
  }

  public worker_recordall(model:EmployeeModel) {
    console.log('WKR002..');
    const data = {
      company_code: this.initial_current.CompCode,
      worker_id: model.worker_id,
      worker_code: model.worker_code,
      worker_card: model.worker_code,
      worker_initial: model.worker_initial,
      worker_fname_th: model.worker_fname_th,
      worker_lname_th: model.worker_lname_th,
      worker_fname_en: model.worker_fname_en,
      worker_lname_en: model.worker_lname_en,
      worker_type: model.worker_type,
      worker_gender: model.worker_gender,
      worker_birthdate: model.worker_birthdate,
      worker_hiredate: model.worker_hiredate,
      worker_status: model.worker_status,
      religion_code: model.religion_code,
      blood_code: model.blood_code,
      worker_height: model.worker_height,
      worker_weight: model.worker_weight,
      worker_resigndate: model.worker_resigndate,
      worker_resignstatus: model.worker_resignstatus,
      worker_resignreason: model.worker_resignreason,
      worker_probationdate: model.worker_probationdate,
      worker_probationenddate: model.worker_probationenddate,
      worker_probationday: model.worker_probationday,
      hrs_perday: model.hrs_perday,
      worker_taxmethod: model.worker_taxmethod,
      modified_by: this.initial_current.Username
    };    

    return this.http.post<any>(this.config.ApiEmployeeModule + '/worker', data, this.options).toPromise()   
    .then((res) => {
      return res;
    });
  }

  public worker_delete(model:EmployeeModel) {
    console.log('WKR003..');
    const data = {
      worker_id: model.worker_id,
      worker_code: model.worker_code,       
      modified_by: this.initial_current.Username
    };    

    return this.http.post<any>(this.config.ApiEmployeeModule + '/worker_del', data, this.options).toPromise()   
    .then((res) => {      
      return res;
    });
  } 

  public worker_import(file: File, file_name:string, file_type:string){

    const formData = new FormData();
    formData.append('file', file);
    
      var para = "fileName=" + file_name + "." + file_type;
      para += "&token=" + this.initial_current.Token;
      para += "&by=" + this.initial_current.Username;

    return this.http.post<any>(this.config.ApiEmployeeModule + '/doUploadWorker?' + para, formData).toPromise()   
    .then((res) => {      
      return res;
    });
  }

  
}

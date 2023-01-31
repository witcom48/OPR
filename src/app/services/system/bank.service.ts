import { Injectable } from '@angular/core';
import { PrjectModel } from '../../models/project/project';
import { AppConfig } from '../../config/config';
import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { Router } from '@angular/router';

import { InitialCurrent } from '../../config/initial_current';
import { BankModel } from '../../models/system/bank';

@Injectable({
  providedIn: 'root'
})
export class BankService {

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
     
  public bank_get(){      
    console.log('SYS001..');  
    return this.http.post<any>(this.config.ApiSystemModule + '/bank_list', this.basicRequest, this.options).toPromise()   
    .then((res) => {
      let message = JSON.parse(res);
      console.log(res)
      return message.data;
    });
  }
 
  public bank_record(model:BankModel) {
    console.log('SYS002..');
    const data = {
      bank_id: model.bank_id,
      bank_code: model.bank_code,
      bank_name_th: model.bank_name_th,
      bank_name_en: model.bank_name_en,     
      modified_by: this.initial_current.Username
    };    

    return this.http.post<any>(this.config.ApiSystemModule + '/bank', data, this.options).toPromise()   
    .then((res) => {
      
      //console.log(res)
      return res;
    });
  }  

  public bank_delete(model:BankModel) {
    console.log('SYS002..');
    const data = {
      bank_id: model.bank_id,
      bank_code: model.bank_code,       
      modified_by: this.initial_current.Username
    };    

    return this.http.post<any>(this.config.ApiSystemModule + '/bank_del', data, this.options).toPromise()   
    .then((res) => {      
      return res;
    });
  }  


  public bank_import(file: File, file_name:string, file_type:string){

    const formData = new FormData();
    formData.append('file', file);
    
      var para = "fileName=" + file_name + "." + file_type;
      para += "&token=" + this.initial_current.Token;
      para += "&by=" + this.initial_current.Username;

    return this.http.post<any>(this.config.ApiSystemModule + '/doUploadBank?' + para, formData).toPromise()   
    .then((res) => {      
      return res;
    });

    
  }




}

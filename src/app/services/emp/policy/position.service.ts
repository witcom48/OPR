import { Injectable } from '@angular/core';
import { AppConfig } from '../../../config/config';
import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { Router } from '@angular/router';

import { InitialCurrent } from '../../../config/initial_current';
import { PositionModel } from 'src/app/models/employee/policy/position';

@Injectable({
  providedIn: 'root'
})
export class PositionService {

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

  public position_get(){
    // console.log('PST001..');

    return this.http.post<any>(this.config.ApiEmployeeModule + '/position_list', this.basicRequest, this.options).toPromise()
    .then((res) => {
      let message = JSON.parse(res);
      // console.log(res)
      return message.data;
    });
  }

  public position_record(model:PositionModel) {
    // console.log('PST002..');
    const data = {
      position_id: model.position_id,
      position_code: model.position_code,
      position_name_th: model.position_name_th,
      position_name_en: model.position_name_en,
      company_code: this.initial_current.CompCode,
      modified_by: this.initial_current.Username
    };

    return this.http.post<any>(this.config.ApiEmployeeModule + '/position', data, this.options).toPromise()
    .then((res) => {
      return res;
    });
  }

  public position_delete(model:PositionModel) {
    // console.log('LCT003..');
    const data = {
        position_id: model.position_id,
        position_code: model.position_code,
        modified_by: this.initial_current.Username
    };

    return this.http.post<any>(this.config.ApiEmployeeModule + '/position_del', data, this.options).toPromise()
    .then((res) => {
      return res;
    });
  }

  public position_import(file: File, file_name:string, file_type:string){

    const formData = new FormData();
    formData.append('file', file);

      var para = "fileName=" + file_name + "." + file_type;
      para += "&token=" + this.initial_current.Token;
      para += "&by=" + this.initial_current.Username;

    return this.http.post<any>(this.config.ApiEmployeeModule + '/doUploadPosition?' + para, formData).toPromise()
    .then((res) => {
      return res;
    });


  }

}

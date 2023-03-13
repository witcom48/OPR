import { Injectable } from '@angular/core';
import { AppConfig } from '../../../config/config';
import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { Router } from '@angular/router';

import { InitialCurrent } from '../../../config/initial_current';
import { LocationModel } from 'src/app/models/employee/policy/location';


@Injectable({
  providedIn: 'root'
})
export class LocationService {

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

  public location_get(){
    console.log('LCT001..');

    return this.http.post<any>(this.config.ApiEmployeeModule + '/location_list', this.basicRequest, this.options).toPromise()
    .then((res) => {
      let message = JSON.parse(res);
      console.log(res)
      return message.data;
    });
  }

  public location_record(model:LocationModel) {
    console.log('LCT002..');
    const data = {
      location_id: model.location_id,
      location_code: model.location_code,
      location_name_th: model.location_name_th,
      location_name_en: model.location_name_en,
      location_detail: model.location_detail,
      modified_by: this.initial_current.Username
    };

    return this.http.post<any>(this.config.ApiEmployeeModule + '/location', data, this.options).toPromise()
    .then((res) => {
      return res;
    });
  }

  public location_delete(model:LocationModel) {
    console.log('LCT003..');
    const data = {
      location_id: model.location_id,
      location_code: model.location_code,
      modified_by: this.initial_current.Username
    };

    return this.http.post<any>(this.config.ApiEmployeeModule + '/location_del', data, this.options).toPromise()
    .then((res) => {
      return res;
    });
  }

  public location_import(file: File, file_name:string, file_type:string){

    const formData = new FormData();
    formData.append('file', file);

      var para = "fileName=" + file_name + "." + file_type;
      para += "&token=" + this.initial_current.Token;
      para += "&by=" + this.initial_current.Username;

    return this.http.post<any>(this.config.ApiEmployeeModule + '/doUploadLocation?' + para, formData).toPromise()
    .then((res) => {
      return res;
    });


  }

}

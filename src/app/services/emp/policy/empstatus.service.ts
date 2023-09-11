import { Injectable } from '@angular/core';
import { ProjectModel } from '../../../models/project/project';

import { AppConfig } from '../../../config/config';
import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { Router } from '@angular/router';

import { InitialCurrent } from '../../../config/initial_current';
import { EmpstatusModel } from 'src/app/models/employee/policy/empstatus';


@Injectable({
  providedIn: 'root'
})
export class EmpstatusService {

  public config:AppConfig = new AppConfig();

  private model:ProjectModel = new ProjectModel();

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

  public status_get(){
    // console.log('STT001..');

    var filter = {
      device_name: '',
      ip: "localhost",
      username: this.initial_current.Username,
      company_code: this.initial_current.CompCode,
      language: ""
    };

    return this.http.post<any>(this.config.ApiEmployeeModule + '/status_list', filter, this.options).toPromise()
    .then((res) => {
      let message = JSON.parse(res);
      // console.log(res)
      return message.data;
    });
  }

  public status_record(model:EmpstatusModel) {
    // console.log('STT002..');
    const data = {
        status_id: model.status_id,
        status_code: model.status_code,
        status_name_th: model.status_name_th,
        status_name_en: model.status_name_en,
        company_code : model.company_code || this.initial_current.CompCode,
        modified_by: this.initial_current.Username
    };

    return this.http.post<any>(this.config.ApiEmployeeModule + '/status', data, this.options).toPromise()
    .then((res) => {
      return res;
    });
  }

  public status_delete(model:EmpstatusModel) {
    // console.log('STT003..');
    const data = {
        status_id: model.status_id,
        status_code: model.status_code,
        company_code: model.company_code || this.initial_current.CompCode,
        modified_by: this.initial_current.Username
    };

    return this.http.post<any>(this.config.ApiEmployeeModule + '/status_del', data, this.options).toPromise()
    .then((res) => {
      return res;
    });
  }

  public status_import(file: File, file_name:string, file_type:string){

    const formData = new FormData();
    formData.append('file', file);

      var para = "fileName=" + file_name + "." + file_type;
      para += "&token=" + this.initial_current.Token;
      para += "&by=" + this.initial_current.Username;

    return this.http.post<any>(this.config.ApiEmployeeModule + '/doUploadStatus?' + para, formData).toPromise()
    .then((res) => {
      return res;
    });


  }

}

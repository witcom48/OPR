import { Injectable } from '@angular/core';
import { AppConfig } from '../../../config/config';
import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { Router } from '@angular/router';

import { InitialCurrent } from '../../../config/initial_current';
import { GroupModel } from 'src/app/models/employee/policy/group';

@Injectable({
  providedIn: 'root'
})
export class GroupService {

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

  public group_get(){
    console.log('GRP001..');

    return this.http.post<any>(this.config.ApiEmployeeModule + '/group_list', this.basicRequest, this.options).toPromise()
    .then((res) => {
      let message = JSON.parse(res);
      console.log(res)
      return message.data;
    });
  }

  public group_record(model:GroupModel) {
    console.log('GRP002..');
    const data = {
        group_id: model.group_id,
        group_code: model.group_code,
        group_name_th: model.group_name_th,
        group_name_en: model.group_name_en,
        company_code: this.initial_current.CompCode,
        modified_by: this.initial_current.Username
    };

    return this.http.post<any>(this.config.ApiEmployeeModule + '/group', data, this.options).toPromise()
    .then((res) => {
      return res;
    });
  }

  public group_delete(model:GroupModel) {
    console.log('GRP003..');
    const data = {
        group_id: model.group_id,
        group_code: model.group_code,
        modified_by: this.initial_current.Username
    };

    return this.http.post<any>(this.config.ApiEmployeeModule + '/group_del', data, this.options).toPromise()
    .then((res) => {
      return res;
    });
  }

  public group_import(file: File, file_name:string, file_type:string){

    const formData = new FormData();
    formData.append('file', file);

      var para = "fileName=" + file_name + "." + file_type;
      para += "&token=" + this.initial_current.Token;
      para += "&by=" + this.initial_current.Username;

    return this.http.post<any>(this.config.ApiEmployeeModule + '/doUploadGroup?' + para, formData).toPromise()
    .then((res) => {
      return res;
    });


  }

}

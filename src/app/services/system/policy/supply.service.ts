import { Injectable } from '@angular/core';
import { ProjectModel } from '../../../models/project/project';
import { AppConfig } from '../../../config/config';
import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { Router } from '@angular/router';

import { InitialCurrent } from '../../../config/initial_current';
import { SupplyModel } from 'src/app/models/system/policy/supply';

@Injectable({
  providedIn: 'root'
})
export class SupplyService {

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

  public supply_get(){
    return this.http.post<any>(this.config.ApiSystemModule + '/supply_list', this.basicRequest, this.options).toPromise()
    .then((res) => {
      let message = JSON.parse(res);
      console.log(res)
      return message.data;
    });
  }

  public supply_record(model:SupplyModel) {
    const data = {
      supply_id: model.supply_id,
      supply_code: model.supply_code,
      supply_name_th: model.supply_name_th,
      supply_name_en: model.supply_name_en,
      modified_by: this.initial_current.Username
    };

    return this.http.post<any>(this.config.ApiSystemModule + '/supply', data, this.options).toPromise()
    .then((res) => {
      return res;
    });
  }

  public supply_delete(model:SupplyModel) {
    const data = {
        supply_id: model.supply_id,
        supply_code: model.supply_code,
        modified_by: this.initial_current.Username
    };

    return this.http.post<any>(this.config.ApiSystemModule + '/supply_del', data, this.options).toPromise()
    .then((res) => {
      return res;
    });
  }


  public supply_import(file: File, file_name:string, file_type:string){

    const formData = new FormData();
    formData.append('file', file);

      var para = "fileName=" + file_name + "." + file_type;
      para += "&token=" + this.initial_current.Token;
      para += "&by=" + this.initial_current.Username;

    return this.http.post<any>(this.config.ApiSystemModule + '/doUploadSupply?' + para, formData).toPromise()
    .then((res) => {
      return res;
    });
  }

}

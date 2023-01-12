import { Injectable } from '@angular/core';
import { PrjectModel } from '../../models/project/project';
import { AppConfig } from '../../config/config';
import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { Router } from '@angular/router';
import { InitialCurrent } from '../../config/initial_current';
import { ResonsModel } from 'src/app/models/system/reasons';
@Injectable({
  providedIn: 'root'
})
export class ReasonsService {

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

  public reason_get(){
    console.log('RES001..');

    return this.http.post<any>(this.config.ApiSystemModule + '/reason_list', this.basicRequest, this.options).toPromise()
    .then((res) => {
      let message = JSON.parse(res);
      console.log(res)
      return message.data;
    });
  }

  public reason_record(model:ResonsModel) {
    console.log('RES002..');
    const data = {
      reason_id: model.reason_id,
      reason_code: model.reason_code,
      reason_name_th: model.reason_name_th,
      reason_name_en: model.reason_name_en,
      reason_group: model.reason_group,
      created_by: this.initial_current.Username,
      modified_by: this.initial_current.Username
    };

    return this.http.post<any>(this.config.ApiSystemModule + '/reason', data, this.options).toPromise()
    .then((res) => {

      console.log(res)
      return res;
    });
  }

  public reason_delete(model:ResonsModel) {
    console.log('RES002..');
    const data = {
        reason_id: model.reason_id,
        reason_code: model.reason_code,
        modified_by: this.initial_current.Username
    };

    return this.http.post<any>(this.config.ApiSystemModule + '/reason_del', data, this.options).toPromise()
    .then((res) => {
      return res;
    });
  }


  public reason_import(file: File, file_name:string, file_type:string){

    const formData = new FormData();
    formData.append('file', file);

      var para = "fileName=" + file_name + "." + file_type;
      para += "&token=" + this.initial_current.Token;
      para += "&by=" + this.initial_current.Username;

    return this.http.post<any>(this.config.ApiSystemModule + '/doUploadReason?' + para, formData).toPromise()
    .then((res) => {
      return res;
    });


  }




}

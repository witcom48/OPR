import { Injectable } from '@angular/core';
import { ProjectModel } from '../../../models/project/project';
import { AppConfig } from '../../../config/config';
import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { Router } from '@angular/router';

import { InitialCurrent } from '../../../config/initial_current';
import { ProvinceModel } from 'src/app/models/system/policy/province';

@Injectable({
  providedIn: 'root'
})
export class ProvinceService {

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
  //   public province_get(model:ProvinceModel) {
  //     let data = {
  //        device_name: "phone",
  //        ip: "127.0.0.1",
  //        username: this.initial_current.Username,
  //        company_code:  this.initial_current.CompCode,
  //        province_id: model.province_id,
  //        province_code: model.province_code
  //    }
  //    return this.http.post<any>(this.config.ApiSystemModule + '/province_list', data, this.options).toPromise()
  //        .then((res) => {
  //            let message = JSON.parse(res);
  //            return message.data;
  //        });
  // }
    public province_get(){
      // console.log('PRV001..');

      return this.http.post<any>(this.config.ApiSystemModule + '/province_list', this.basicRequest, this.options).toPromise()
      .then((res) => {
        let message = JSON.parse(res);
        // console.log(res)
        return message.data;
      });
    }

    public province_record(model:ProvinceModel) {
      // console.log('PRV002..');
      const data = {
        company_code: model.company_code || this.initial_current.CompCode,

        province_id: model.province_id,
        province_code: model.province_code,
        province_name_th: model.province_name_th,
        province_name_en: model.province_name_en,
        modified_by: this.initial_current.Username
      };

      return this.http.post<any>(this.config.ApiSystemModule + '/province', data, this.options).toPromise()
      .then((res) => {

        //// console.log(res)
        return res;
      });
    }

    public province_delete(model:ProvinceModel) {
      // console.log('PRV002..');
      const data = {
        company_code: model.company_code || this.initial_current.CompCode,

        province_id: model.province_id,
        province_code: model.province_code,
        modified_by: this.initial_current.Username
      };

      return this.http.post<any>(this.config.ApiSystemModule + '/province_del', data, this.options).toPromise()
      .then((res) => {
        return res;
      });
    }


    public province_import(file: File, file_name:string, file_type:string){

      const formData = new FormData();
      formData.append('file', file);

        var para = "fileName=" + file_name + "." + file_type;
        para += "&token=" + this.initial_current.Token;
        para += "&by=" + this.initial_current.Username;

      return this.http.post<any>(this.config.ApiSystemModule + '/doUploadProvince?' + para, formData).toPromise()
      .then((res) => {
        return res;
      });


    }




  }

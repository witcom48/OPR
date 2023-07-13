import { Injectable } from '@angular/core';
import { ProjectModel } from '../../../models/project/project';
import { AppConfig } from '../../../config/config';
import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { Router } from '@angular/router';

import { InitialCurrent } from '../../../config/initial_current';
import { EthnicityModel } from '../../../models/system/policy/ethnicity';

@Injectable({
  providedIn: 'root'
})
export class EthnicityService {

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

    public ethnicity_get(){
      // console.log('ENT001..');

      return this.http.post<any>(this.config.ApiSystemModule + '/ethnicity_list', this.basicRequest, this.options).toPromise()
      .then((res) => {
        let message = JSON.parse(res);
        // console.log(res)
        return message.data;
      });
    }

    public ethnicity_record(model:EthnicityModel) {
      // console.log('ENT002..');
      const data = {
        ethnicity_id: model.ethnicity_id,
        ethnicity_code: model.ethnicity_code,
        ethnicity_name_th: model.ethnicity_name_th,
        ethnicity_name_en: model.ethnicity_name_en,
        modified_by: this.initial_current.Username
      };

      return this.http.post<any>(this.config.ApiSystemModule + '/ethnicity', data, this.options).toPromise()
      .then((res) => {

        //// console.log(res)
        return res;
      });
    }

    public ethnicity_delete(model:EthnicityModel) {
      // console.log('ENT002..');
      const data = {
        ethnicity_id: model.ethnicity_id,
        ethnicity_code: model.ethnicity_code,
        modified_by: this.initial_current.Username
      };

      return this.http.post<any>(this.config.ApiSystemModule + '/ethnicity_del', data, this.options).toPromise()
      .then((res) => {
        return res;
      });
    }


    public ethnicity_import(file: File, file_name:string, file_type:string){

      const formData = new FormData();
      formData.append('file', file);

        var para = "fileName=" + file_name + "." + file_type;
        para += "&token=" + this.initial_current.Token;
        para += "&by=" + this.initial_current.Username;

      return this.http.post<any>(this.config.ApiSystemModule + '/doUploadEthnicity?' + para, formData).toPromise()
      .then((res) => {
        return res;
      });


    }




  }

import { Injectable } from '@angular/core';
import { ProjectModel } from '../../../models/project/project';
import { AppConfig } from '../../../config/config';
import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { Router } from '@angular/router';
import { InitialCurrent } from '../../../config/initial_current';

import { ReducesModel } from 'src/app/models/system/policy/reduces';
@Injectable({
  providedIn: 'root'
})
export class ReduceService {


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

    public reduce_get(){
      // console.log('RED001..');

      return this.http.post<any>(this.config.ApiSystemModule + '/reduce_list', this.basicRequest, this.options).toPromise()
      .then((res) => {
        let message = JSON.parse(res);
        // console.log(res)
        return message.data;
      });
    }

    public reduce_record(model:ReducesModel) {
      // console.log('RED002..');
      const data = {
        reduce_id:model.reduce_id,
        reduce_code:model.reduce_code,
        reduce_name_th:model.reduce_name_th,
        reduce_name_en:model.reduce_name_en,

        reduce_amount:model.reduce_amount,
        reduce_percent:model.reduce_percent,
        reduce_percent_max:model.reduce_percent_max,

        created_by: this.initial_current.Username,
        modified_by: this.initial_current.Username
      };

      return this.http.post<any>(this.config.ApiSystemModule + '/reduce', data, this.options).toPromise()
      .then((res) => {

        // console.log(res)
        return res;
      });
    }

    public reduce_delete(model:ReducesModel) {
      // console.log('RED002..');
      const data = {
        reduce_id: model.reduce_id,
        reduce_code: model.reduce_code,

            modified_by: this.initial_current.Username
      };

      return this.http.post<any>(this.config.ApiSystemModule + '/reduce_del', data, this.options).toPromise()
      .then((res) => {
        return res;
      });
    }


    public reduce_import(file: File, file_name:string, file_type:string){

      const formData = new FormData();
      formData.append('file', file);

        var para = "fileName=" + file_name + "." + file_type;
        para += "&token=" + this.initial_current.Token;
        para += "&by=" + this.initial_current.Username;

      return this.http.post<any>(this.config.ApiSystemModule + '/doUploadreduce?' + para, formData).toPromise()
      .then((res) => {
        return res;
      });


    }




  }

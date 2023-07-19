import { Injectable } from '@angular/core';
import { ProjectModel } from '../../../models/project/project';
import { AppConfig } from '../../../config/config';
import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { Router } from '@angular/router';
import { InitialCurrent } from '../../../config/initial_current';
import { LevelModel } from 'src/app/models/system/policy/level';
@Injectable({
  providedIn: 'root'
})
export class LevelService {

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

    public level_get(){
      // console.log('LVL001..');

      return this.http.post<any>(this.config.ApiSystemModule + '/level_list', this.basicRequest, this.options).toPromise()
      .then((res) => {
        let message = JSON.parse(res);
        // console.log(res)
        return message.data;
      });
    }

    public level_record(model:LevelModel) {
      // console.log('LVL002..');
      const data = {
        level_id: model.level_id,
        level_code: model.level_code,
        level_name_th: model.level_name_th,
        level_name_en: model.level_name_en,
        company_code: model.company_code,

        created_by: this.initial_current.Username,
        modified_by: this.initial_current.Username
      };

      return this.http.post<any>(this.config.ApiSystemModule + '/level', data, this.options).toPromise()
      .then((res) => {

        // console.log(res)
        return res;
      });
    }

    public level_delete(model:LevelModel) {
      // console.log('LVL002..');
      const data = {
            level_id: model.level_id,
            level_code: model.level_code,
            company_code: model.company_code,
            modified_by: this.initial_current.Username
      };

      return this.http.post<any>(this.config.ApiSystemModule + '/level_del', data, this.options).toPromise()
      .then((res) => {
        return res;
      });
    }


    public level_import(file: File, file_name:string, file_type:string){

      const formData = new FormData();
      formData.append('file', file);

        var para = "fileName=" + file_name + "." + file_type;
        para += "&token=" + this.initial_current.Token;
        para += "&by=" + this.initial_current.Username;

      return this.http.post<any>(this.config.ApiSystemModule + '/doUploadLevel?' + para, formData).toPromise()
      .then((res) => {
        return res;
      });


    }




  }

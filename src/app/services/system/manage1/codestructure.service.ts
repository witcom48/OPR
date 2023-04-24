import { Injectable } from '@angular/core';
import { ProjectModel } from '../../../models/project/project';
import { AppConfig } from '../../../config/config';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { InitialCurrent } from '../../../config/initial_current';
import { CodestructureModel } from 'src/app/models/system/policy/codestructure';
@Injectable({
  providedIn: 'root'
})
export class CodestructureService {

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

    public codestructure_get(){
      console.log('CODE001..');

      return this.http.post<any>(this.config.ApiSystemModule + '/codestructure_list', this.basicRequest, this.options).toPromise()
      .then((res) => {
        let message = JSON.parse(res);
        console.log(res)
        return message.data;
      });
    }

    public codestructure_record(model:CodestructureModel) {
      console.log('CODE002..');
      const data = {
        codestructure_code: model.codestructure_code,
        codestructure_name_th: model.codestructure_name_th,
        codestructure_name_en: model.codestructure_name_en,
        modified_by: this.initial_current.Username
      };

      return this.http.post<any>(this.config.ApiSystemModule + '/codestructure', data, this.options).toPromise()
      .then((res) => {

        console.log(res)
        return res;
      });
    }

    public codestructure_delete(model:CodestructureModel) {
      console.log('CODE003..');
      const data = {
        codestructure_code: model.codestructure_code,
        modified_by: this.initial_current.Username
      };

      return this.http.post<any>(this.config.ApiSystemModule + '/codestructure_del', data, this.options).toPromise()
      .then((res) => {
        return res;
      });
    }


    public codestructure_import(file: File, file_name:string, file_type:string){

      const formData = new FormData();
      formData.append('file', file);

        var para = "fileName=" + file_name + "." + file_type;
        para += "&token=" + this.initial_current.Token;
        para += "&by=" + this.initial_current.Username;

      return this.http.post<any>(this.config.ApiSystemModule + '/doUploadCodestructure?' + para, formData).toPromise()
      .then((res) => {
        return res;
      });


    }

}
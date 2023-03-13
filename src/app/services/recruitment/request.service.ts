import { Injectable } from '@angular/core';
import { ProjectModel } from '../../models/project/project';
import { AppConfig } from '../../config/config';
import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { Router } from '@angular/router';
import { InitialCurrent } from '../../config/initial_current';
import { RequestModel } from 'src/app/models/recruitment/request';

@Injectable({
  providedIn: 'root'
})
export class RequestService {



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

    public request_get(){
      console.log('REQ001..');

      return this.http.post<any>(this.config.ApiSystemModule + '/request_list', this.basicRequest, this.options).toPromise()
      .then((res) => {
        let message = JSON.parse(res);
        console.log(res)
        return message.data;
      });
    }

    public request_record(model:RequestModel) {
      console.log('REQ002..');
      const data = {
        request_id: model.request_id,
        request_code: model.request_code,
        request_date: model.request_date,
        request_agency: model.request_agency,
        request_work: model.request_work,
        request_job_type: model.request_job_type,
        request_employee_type: model.request_employee_type,
        request_quantity: model.request_quantity,
        request_urgency: model.request_urgency,
        request_wage_rate: model.request_wage_rate,
        request_overtime: model.request_overtime,
        request_another: model.request_another,

        created_by: this.initial_current.Username,
        modified_by: this.initial_current.Username,
      };

      return this.http.post<any>(this.config.ApiSystemModule + '/request', data, this.options).toPromise()
      .then((res) => {

        console.log(res)
        return res;
      });
    }

    public request_delete(model:RequestModel) {
      console.log('REQ002..');
      const data = {
        request_id: model.request_id,
        request_code: model.request_code,
        created_by: this.initial_current.Username,
        modified_by: this.initial_current.Username
      };

      return this.http.post<any>(this.config.ApiSystemModule + '/request_del', data, this.options).toPromise()
      .then((res) => {
        return res;
      });
    }


    public request_import(file: File, file_name:string, file_type:string){

      const formData = new FormData();
      formData.append('file', file);

        var para = "fileName=" + file_name + "." + file_type;
        para += "&token=" + this.initial_current.Token;
        para += "&by=" + this.initial_current.Username;

      return this.http.post<any>(this.config.ApiSystemModule + '/doUploadMTRequest?' + para, formData).toPromise()
      .then((res) => {
        return res;
      });


    }




  }

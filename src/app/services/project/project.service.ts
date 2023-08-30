import { Injectable } from '@angular/core';
import { AppConfig } from '../../config/config';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

import { DatePipe } from '@angular/common';
import { InitialCurrent } from '../../config/initial_current';
import { ProjectModel } from '../../models/project/project';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  public config: AppConfig = new AppConfig();

  public initial_current: InitialCurrent = new InitialCurrent();

  httpHeaders = new HttpHeaders({});
  options = {
    headers: this.httpHeaders
  };

  basicRequest = {
    device_name: '',
    ip: '',
    username: ''
  };

  constructor(private http: HttpClient, private router: Router, private datePipe: DatePipe) {
    this.doGetInitialCurrent();
  }


  doGetInitialCurrent() {
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
        device_name: '',
        ip: "localhost",
        username: this.initial_current.Username
      };

    }
    else {
      this.router.navigateByUrl('login');
    }
  }

  public project_get(company: string, project: string) {

    var filter = {
      device_name: '',
      ip: "localhost",
      username: this.initial_current.Username,
      company: company,
      language: "",
      project_code: project,
      project_name_th: "",
      project_name_en: "",
      project_name_sub: "",
      project_codecentral: "",
      project_protype: "",      
      project_proarea: "",
      project_progroup: "",
      project_probusiness: "",
      status:""
    };

    return this.http.post<any>(this.config.ApiProjectModule + '/project_list', filter, this.options).toPromise()
      .then((res) => {
        let message = JSON.parse(res);      
        return message.data;
      });
  }

  public project_get_withstatus(company: string, project: string, status: string) {

    var filter = {
      device_name: '',
      ip: "localhost",
      username: this.initial_current.Username,
      company: company,
      language: "",
      project_code: project,
      project_name_th: "",
      project_name_en: "",
      project_name_sub: "",
      project_codecentral: "",
      project_protype: "",      
      project_proarea: "",
      project_progroup: "",
      project_probusiness: "",
      status:status
    };

    return this.http.post<any>(this.config.ApiProjectModule + '/project_list', filter, this.options).toPromise()
      .then((res) => {
        let message = JSON.parse(res);      
        return message.data;
      });
  }

  public project_record(model: ProjectModel) {
    const data = {
      project_id: model.project_id,
      project_code: model.project_code,
      project_name_th: model.project_name_th,
      project_name_en: model.project_name_en,

      project_name_sub: model.project_name_sub,
      project_codecentral: model.project_codecentral,
      project_protype: model.project_protype,

      project_proarea: model.project_proarea,
      project_progroup: model.project_progroup,

      project_probusiness: model.project_probusiness,
      project_roundtime: model.project_roundtime,
      project_roundmoney: model.project_roundmoney,
      project_proholiday: model.project_proholiday,


      project_status: model.project_status,
      company_code: model.company_code,

      modified_by: this.initial_current.Username
    };

    // console.log(this.config.ApiProjectModule)

    return this.http.post<any>(this.config.ApiProjectModule + '/project', data, this.options).toPromise()
      .then((res) => {
        return res;
      });
  }

  public project_delete(model: ProjectModel) {
    const data = {
      project_id: model.project_id,
      project_code: model.project_code,
      modified_by: this.initial_current.Username
    };

    return this.http.post<any>(this.config.ApiProjectModule + '/project_del', data, this.options).toPromise()
      .then((res) => {
        return res;
      });
  }


  public project_import(file: File, file_name: string, file_type: string) {
    const formData = new FormData();
    formData.append('file', file);
    var para = "fileName=" + file_name + "." + file_type;
    para += "&token=" + this.initial_current.Token;
    para += "&by=" + this.initial_current.Username;

    return this.http.post<any>(this.config.ApiProjectModule + '/doUploadMTProject?' + para, formData).toPromise()
      .then((res) => {
        return res;
      });
  }

  public project_monitor(company: string, workdate: Date, protype: string, probusiness: string, proarea: string, progroup: string) {

    var filter = {
      device_name: '',
      ip: "localhost",
      username: this.initial_current.Username,
      company: company,
      language: "",
      project_code: "",
      project_name_th: "",
      project_name_en: "",
      project_name_sub: "",
      project_codecentral: "",
      project_protype: protype,

      project_proarea: proarea,
      project_progroup: progroup,

      project_probusiness: probusiness,

      fromdate: this.datePipe.transform(workdate, 'yyyy-MM-dd'),
      todate: this.datePipe.transform(workdate, 'yyyy-MM-dd'),
    };


    return this.http.post<any>(this.config.ApiProjectModule + '/project_monitor', filter, this.options).toPromise()
      .then((res) => {
        let message = JSON.parse(res);
        //// console.log(res)
        return message.data;
      });
  }

  public job_monitor(company: string, project: string, workdate: Date) {

    var filter = {
      device_name: '',
      ip: "localhost",
      username: this.initial_current.Username,
      company: company,
      language: "",
      project_code: project,
      project_name_th: "",
      project_name_en: "",
      project_name_sub: "",
      project_codecentral: "",
      project_protype: "",

      project_proarea: "",
      project_progroup: "",

      project_probusiness: "",
      
      fromdate: this.datePipe.transform(workdate, 'yyyy-MM-dd'),
      todate: this.datePipe.transform(workdate, 'yyyy-MM-dd'),
    };


    return this.http.post<any>(this.config.ApiProjectModule + '/job_monitor', filter, this.options).toPromise()
      .then((res) => {
        let message = JSON.parse(res);
        //// console.log(res)
        return message.data;
      });
  }

  public cost_compare(company: string, workdate: Date, protype: string, probusiness: string, proarea: string, progroup: string) {

    var filter = {
      device_name: '',
      ip: "localhost",
      username: this.initial_current.Username,
      company: company,
      language: "",
      project_code: "",
      project_name_th: "",
      project_name_en: "",
      project_name_sub: "",
      project_codecentral: "",
      project_protype: protype,

      project_proarea: proarea,
      project_progroup: progroup,

      project_probusiness: probusiness,

      fromdate: this.datePipe.transform(workdate, 'yyyy-MM-dd'),
      todate: this.datePipe.transform(workdate, 'yyyy-MM-dd'),
    };


    return this.http.post<any>(this.config.ApiProjectModule + '/cost_compare', filter, this.options).toPromise()
      .then((res) => {
        let message = JSON.parse(res);
        //// console.log(res)
        return message.data;
      });
  }



}

import { Injectable } from '@angular/core';
import { AppConfig } from '../../config/config';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { InitialCurrent } from '../../config/initial_current';
import { PlanreduceModels } from 'src/app/models/payroll/planreduce';
import { ReducesModel } from 'src/app/models/system/policy/reduces';

@Injectable({
  providedIn: 'root'
})
export class PlanreduceService {

  public config: AppConfig = new AppConfig();
  public initial_current: InitialCurrent = new InitialCurrent();

  httpHeaders = new HttpHeaders({});
  options = {
    headers: this.httpHeaders
  };

  constructor(private http: HttpClient, private router: Router) {
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
    }
    else {
      this.router.navigateByUrl('login');
    }
  }

  public planreduce_get(Planreduce: PlanreduceModels) {
     let data = {
      device_name: "phone",
      ip: "127.0.0.1",
      username: this.initial_current.Username,
      company_code: Planreduce.company_code || this.initial_current.CompCode,
      planreduce_id: Planreduce.planreduce_id,
      planreduce_code: Planreduce.planreduce_code
    }
    return this.http.post<any>(this.config.ApiPayrollModule + '/planreduce_list', data, this.options).toPromise()
      .then((res) => {
        let message = JSON.parse(res);
        return message.data;
      });
  }

  public planreduce_record(Planreduce: PlanreduceModels) {
     let reducelists: any = []
    Planreduce.reducelists.forEach((res: ReducesModel) => {
      let ss = {
        company_code: Planreduce.company_code || this.initial_current.CompCode,
        planreduce_code: Planreduce.planreduce_code,
        reduce_code: res.reduce_code
      }
      reducelists.push(ss)
    })
    let data = {
      device_nam: "phone",
      i: "127.0.0.1",
      username: this.initial_current.Username,
      company_code: Planreduce.company_code || this.initial_current.CompCode,
      planreduce_id: Planreduce.planreduce_id,
      planreduce_code: Planreduce.planreduce_code,
      planreduce_name_th: Planreduce.planreduce_name_th,
      planreduce_name_en: Planreduce.planreduce_name_en,
      modified_by: this.initial_current.Username,
      flag: false,
      reducelists: reducelists
    }
    return this.http.post<any>(this.config.ApiPayrollModule + '/planreduce', data, this.options).toPromise()
      .then((res) => {
         let message = JSON.parse(res);
        return message;
      });
  }
  public planreduce_delete(Planreduce: PlanreduceModels) {
    console.log(this.planreduce_delete);
    let data = {
      device_name: "phone",
      ip: "127.0.0.1",
      username: this.initial_current.Username,
      company_code: Planreduce.company_code || this.initial_current.CompCode,
      planreduce_id: Planreduce.planreduce_id,
      planreduce_code: Planreduce.planreduce_code
    }
    return this.http.post<any>(this.config.ApiPayrollModule + '/planreduce_del', data, this.options).toPromise()
      .then((res) => {
         let message = JSON.parse(res);
        return message;
      });
  }


  public planreduce_import(file: File, file_name: string, file_type: string) {
     const formData = new FormData();
    formData.append('file', file);

    var para = "fileName=" + file_name + "." + file_type;
    para += "&token=" + this.initial_current.Token;
    para += "&by=" + this.initial_current.Username;
    para += "&com=" + this.initial_current.CompCode;

    return this.http.post<any>(this.config.ApiPayrollModule + '/doUploadMTPlanreduce?' + para, formData).toPromise()
      .then((res) => {
        let message = JSON.parse(res);
        return message;
      });
  }

}

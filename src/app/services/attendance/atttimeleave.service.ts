import { Injectable } from '@angular/core';
import { AppConfig } from '../../config/config';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

import { InitialCurrent } from '../../config/initial_current';
import { DatePipe } from '@angular/common';
 import { ATTTimeleaveModel } from 'src/app/models/attendance/atttimeleave';


@Injectable({
  providedIn: 'root'
})
export class AtttimeleaveService {

  public config: AppConfig = new AppConfig();
  public initial_current: InitialCurrent = new InitialCurrent();

  httpHeaders = new HttpHeaders({});
  options = {
    headers: this.httpHeaders
  };

  constructor(private http: HttpClient, private router: Router, private datePipe: DatePipe,) {
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

// 
public timeleaveactualday_get(timeleave: ATTTimeleaveModel) {
  // console.log('ATT001..');
  let data = {
      device_name: "phone",
      ip: "127.0.0.1",
      username: this.initial_current.Username,
      company_code: timeleave.company_code || this.initial_current.CompCode,
      worker_code: timeleave.worker_code || this.initial_current.Username,
      project_code: timeleave.project_code,
      timeleave_fromdate: timeleave.timeleave_fromdate,
      timeleave_todate: timeleave.timeleave_todate
  }
  return this.http.post<any>(this.config.ApiAttendanceModule + '/TReave_actualday', data, this.options).toPromise()
      .then((res) => {
          let message = JSON.parse(res);
          return message.data;
      });
}

// 
  public atttimeleave_get(timeleave: ATTTimeleaveModel) {
    let data = {
      device_name: "phone",
      ip: "127.0.0.1",
      username: this.initial_current.Username,
      language: this.initial_current.Language,

      company_code: timeleave.company_code || this.initial_current.CompCode,
      worker_code: timeleave.worker_code,

      timeleave_id: timeleave.timeleave_id,
      timeleave_fromdate: this.datePipe.transform(timeleave.timeleave_fromdate, 'yyy-MM-dd') || this.datePipe.transform(this.initial_current.PR_FromDate, 'yyy-MM-dd'),
      timeleave_todate: this.datePipe.transform(timeleave.timeleave_todate, 'yyy-MM-dd') || this.datePipe.transform(this.initial_current.PR_ToDate, 'yyy-MM-dd'),
    }
    return this.http.post<any>(this.config.ApiAttendanceModule + '/atttimeleave_list', data, this.options).toPromise()
      .then((res) => {
        let message = JSON.parse(res);
        return message.data;
      });
  }




  public atttimeleave_record(timeleave: ATTTimeleaveModel) {
    let data = {
      device_name: '',
      ip: '',
      username: this.initial_current.Username,
      company_code: timeleave.company_code || this.initial_current.CompCode,
      worker_code: timeleave.worker_code || this.initial_current.Username,
      timeleave_id: timeleave.timeleave_id,
      timeleave_doc: timeleave.timeleave_doc,
      timeleave_fromdate: this.datePipe.transform(timeleave.timeleave_fromdate, 'yyyy-MM-dd HH:mm:ss'),
      timeleave_todate: this.datePipe.transform(timeleave.timeleave_todate, 'yyyy-MM-dd HH:mm:ss'),
      timeleave_type: timeleave.timeleave_type,
      timeleave_min: timeleave.timeleave_min,
      timeleave_actualday: timeleave.timeleave_actualday,
      timeleave_incholiday: timeleave.timeleave_incholiday,
      timeleave_deduct: timeleave.timeleave_deduct,
      timeleave_note: timeleave.timeleave_note,
      leave_code: timeleave.leave_code,
      reason_code: timeleave.reason_code,
      modified_by: this.initial_current.Username

    };

    return this.http
      .post<any>(this.config.ApiAttendanceModule + '/atttimeleave', data, this.options)
      .toPromise()
      .then((res) => {
        let message = JSON.parse(res);
        return message;
      })
      .catch((error) => {
        throw error;
      });
  }

  public atttimeleave_delete(timeleave: ATTTimeleaveModel) {
    let data = {
      device_name: "phone",
      ip: "127.0.0.1",
      username: this.initial_current.Username,
      company_code: timeleave.company_code || this.initial_current.CompCode,
      timeleave_id: timeleave.timeleave_id,
    }
    return this.http.post<any>(this.config.ApiAttendanceModule + '/atttimeleave_del', data, this.options).toPromise()
      .then((res) => {
        // console.log(res)
        let message = JSON.parse(res);
        return message;
      });
  }
}

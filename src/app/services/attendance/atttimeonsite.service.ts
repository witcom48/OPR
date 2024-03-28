import { Injectable } from '@angular/core';
import { AppConfig } from '../../config/config';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

import { InitialCurrent } from '../../config/initial_current';
import { DatePipe } from '@angular/common';
import { TimeonsiteModel } from 'src/app/models/attendance/timeonsite';

@Injectable({
  providedIn: 'root'
})
export class ATTTimeonsiteService {
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


  public ATTtimeonsite_get(timeonstie: TimeonsiteModel) {
    let data = {
      device_name: "phone",
      ip: "127.0.0.1",
      username: this.initial_current.Username,
      company_code: timeonstie.company_code || this.initial_current.CompCode,
      timeonsite_id: timeonstie.timeonsite_id,
      worker_code: timeonstie.worker_code || this.initial_current.Username,
      location_code: timeonstie.location_code,
      timeonsite_workdate: this.datePipe.transform(timeonstie.timeonsite_workdate, 'MM/dd/yyyy') || this.datePipe.transform(this.initial_current.PR_FromDate, 'yyy-MM-dd'),
      // timeonstie_todate: this.datePipe.transform(timeonstie.timeonstie_todate, 'MM/dd/yyyy') || this.datePipe.transform(this.initial_current.PR_ToDate, 'yyy-MM-dd'),
    }
    return this.http.post<any>(this.config.ApiAttendanceModule + '/ATTTimeonsite_list', data, this.options).toPromise()
      .then((res) => {
        let message = JSON.parse(res);
        return message.data;
      });
  }

  public ATTtimeonsite_record(timeonsites: TimeonsiteModel[]) {
    var onsite_datas: any = []
    timeonsites.forEach((timeonsite: TimeonsiteModel) => {
      let datas = {
        company_code: timeonsite.company_code || this.initial_current.CompCode,
        worker_code: timeonsite.worker_code || this.initial_current.Username,
        timeonsite_id: timeonsite.timeonsite_id,
        timeonsite_doc: timeonsite.timeonsite_doc,
        timeonsite_workdate: this.datePipe.transform(timeonsite.timeonsite_workdate, 'yyy-MM-dd'),
        timeonsite_in: timeonsite.timeonsite_in,
        timeonsite_out: timeonsite.timeonsite_out,
        timeonsite_note: timeonsite.timeonsite_note,
        reason_code: timeonsite.reason_code,
        location_code: timeonsite.location_code,


      }
      onsite_datas.push(datas)
    })
    let data = {
      device_name: "phone",
      ip: "127.0.0.1",
      username: this.initial_current.Username,
      company_code: timeonsites[0].company_code || this.initial_current.CompCode,
      timeonsite_data: JSON.stringify(onsite_datas)
    }
    return this.http.post<any>(this.config.ApiAttendanceModule + '/ATTTimeonsite', data, this.options).toPromise()
      .then((res) => {
        let message = JSON.parse(res);
        return message;
      });
  }
  public ATTtimeonsite_delete(timeonsites: TimeonsiteModel) {
    let data = {
      device_name: "phone",
      ip: "127.0.0.1",
      username: this.initial_current.Username,
      company_code: timeonsites.company_code || this.initial_current.CompCode,
      timeonsite_id: timeonsites.timeonsite_id,
      worker_code: timeonsites.worker_code,
    }
    return this.http.post<any>(this.config.ApiAttendanceModule + '/ATTTimeonsite_del', data, this.options).toPromise()
      .then((res) => {
        let message = JSON.parse(res);
        return message;
      });
  }


}
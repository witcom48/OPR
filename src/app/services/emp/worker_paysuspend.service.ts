import { Injectable } from '@angular/core';
import { AppConfig } from '../../config/config';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { InitialCurrent } from 'src/app/config/initial_current';
import { DatePipe } from '@angular/common';
import { EmployeeModel } from 'src/app/models/employee/employee';
import { PaysuspendModel } from 'src/app/models/employee/paysuspend';

@Injectable({
    providedIn: 'root'
})

export class PaysuspendService {
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

    constructor(
        private http: HttpClient,
        private router: Router,
        private datePipe: DatePipe) {
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

    public getpaysuspend(company: string, code: string, date: Date) {
        var filter = {
          device_name: '',
          ip: "localhost",
          username: this.initial_current.Username,
          company_code: company,
          language: "",
          worker_code: code,
          paydate: date,
        };
    
        return this.http.post<any>(this.config.ApiEmployeeModule + '/emppaysuspendlist', filter, this.options).toPromise()
          .then((res) => {
            let message = JSON.parse(res);
            // // console.log(res)
            return message.data;
          });
      }

    public SetPaysuspend_record(Setup: PaysuspendModel) {
        let emplists: any = []
        Setup.emp_data.forEach((res: EmployeeModel) => {
          let ss = {
            worker_code: res.worker_code
          }
          emplists.push(ss)
        })
        let data = {
          device_name: "",
          ip: "127.0.0.1",
          username: this.initial_current.Username,
          company_code: Setup.company_code || this.initial_current.CompCode,
          payitem_date: this.datePipe.transform(Setup.payitem_date),
          paysuspend_type: Setup.paysuspend_type,
          paysuspend_note: Setup.paysuspend_note,
          reason_code: Setup.reason_code,
          paysuspend_payment: Setup.paysuspend_payment,
          emp_data: emplists,
          modified_by: Setup.modified_by || this.initial_current.Username,
        }
        return this.http.post<any>(this.config.ApiEmployeeModule + '/setbatchpaysuspend', data, this.options).toPromise()
          .then((res) => {
            // console.log(res)
            let message = JSON.parse(res);
            return message;
          });
      }
}
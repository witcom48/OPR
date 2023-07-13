import { Injectable } from '@angular/core';
import { AppConfig } from '../../config/config';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

import { InitialCurrent } from '../../config/initial_current';
import { DatePipe } from '@angular/common';
import { cls_TRPdpaModel } from 'src/app/models/self/cls_TRPdpa';


@Injectable({
    providedIn: 'root'
})
export class PdpaServices {

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

    public pdpa_get(pdpa: cls_TRPdpaModel) {
        let data = {
            device_name: "phone",
            ip: "127.0.0.1",
            username: this.initial_current.Username,
            company_code: pdpa.company_code || this.initial_current.CompCode,
            worker_code: pdpa.worker_code,
            status: pdpa.status
        }
        return this.http.post<any>(this.config.ApiSelfServicesModule + '/pdpa_list', data, this.options).toPromise()
            .then((res) => {
                let message = JSON.parse(res);
                return message.data;
            });
    }

    public pdpa_record(pdpa: cls_TRPdpaModel) {
        let data = {
            device_name: "phone",
            ip: "127.0.0.1",
            username: this.initial_current.Username,
            company_code: pdpa.company_code || this.initial_current.CompCode,
            worker_code: pdpa.worker_code,
            status: pdpa.status
        }
        return this.http.post<any>(this.config.ApiSelfServicesModule + '/pdpa', data, this.options).toPromise()
            .then((res) => {
                console.log(res)
                let message = JSON.parse(res);
                return message;
            });
    }
    public pdpa_delete(pdpa: cls_TRPdpaModel) {
        let data = {
            device_name: "phone",
            ip: "127.0.0.1",
            username: this.initial_current.Username,
            company_code: pdpa.company_code || this.initial_current.CompCode,
            worker_code: pdpa.worker_code
        }
        return this.http.post<any>(this.config.ApiSelfServicesModule + '/pdpa_del', data, this.options).toPromise()
            .then((res) => {
                console.log(res)
                let message = JSON.parse(res);
                return message;
            });
    }
}

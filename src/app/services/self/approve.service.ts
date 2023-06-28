import { Injectable } from '@angular/core';
import { AppConfig } from '../../config/config';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

import { InitialCurrent } from '../../config/initial_current';
import { AccountModel } from 'src/app/models/self/account';
import { ApproveModel } from 'src/app/models/self/approve';
import { DatePipe } from '@angular/common';

@Injectable({
    providedIn: 'root'
})
export class ApproveServices {

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

    public approve_get(approve: ApproveModel) {
        console.log('ATT001..');
        let data = {
            device_name: "phone",
            ip: "127.0.0.1",
            username: this.initial_current.Username,
            company_code: approve.company_code || this.initial_current.CompCode,
            job_type: approve.job_type,
            status: approve.status,
            fromdate: this.datePipe.transform(approve.fromdate, 'yyyy-MM-dd') || this.datePipe.transform(this.initial_current.PR_FromDate, 'yyy-MM-dd'),
            todate: this.datePipe.transform(approve.todate, 'yyyy-MM-dd') || this.datePipe.transform(this.initial_current.PR_ToDate, 'yyy-MM-dd'),
        }
        return this.http.post<any>(this.config.ApiSelfServicesModule + '/approve_list', data, this.options).toPromise()
            .then((res) => {
                let message = JSON.parse(res);
                return message;
            });
    }

    public approveJob(approve: ApproveModel) {
        console.log('ATT002..');
        let data = {
            device_name: "phone",
            ip: "127.0.0.1",
            username: this.initial_current.Username,
            company_code: approve.company_code || this.initial_current.CompCode,
            job_type: approve.job_type,
            approve_status: approve.approve_status,
            job_id: approve.job_id,
            lang: approve.lang || this.initial_current.Language
        }
        return this.http.post<any>(this.config.ApiSelfServicesModule + '/approve', data, this.options).toPromise()
            .then((res) => {
                console.log(res)
                let message = JSON.parse(res);
                return message;
            });
    }
}

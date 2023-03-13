import { Injectable } from '@angular/core';
import { AppConfig } from '../../config/config';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

import { InitialCurrent } from '../../config/initial_current';
import { TimePeriodModels } from 'src/app/models/attendance/timeperiod';

@Injectable({
    providedIn: 'root'
})
export class PeriodServices {

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

    public period_get(Period: TimePeriodModels) {
        console.log('ATT001..');
        let data = {
            "device_name": "phone",
            "ip": "127.0.0.1",
            "username": this.initial_current.Username,
            "company_code": Period.company_code || this.initial_current.CompCode,
            "period_id": Period.period_id,
            "period_type": Period.period_type,
            "year_code": Period.year_code,
            "emptype_code": Period.emptype_code
        }
        return this.http.post<any>(this.config.ApiAttendanceModule + '/period_list', data, this.options).toPromise()
            .then((res) => {
                let message = JSON.parse(res);
                return message.data;
            });
    }

    public period_record(Period: TimePeriodModels) {
        console.log('ATT002..');
        let data = {
            "device_name": "phone",
            "ip": "127.0.0.1",
            "username": this.initial_current.Username,
            "company_code": Period.company_code || this.initial_current.CompCode,
            "period_id": Period.period_id,
            "period_type": Period.period_type || "PAY",
            "emptype_code": Period.emptype_code,
            "year_code": Period.year_code,
            "period_no": Period.period_no,
            "period_name_th": Period.period_name_th,
            "period_name_en": Period.period_name_en,
            "period_from": Period.period_from,
            "period_to": Period.period_to,
            "period_payment": Period.period_payment,
            "period_dayonperiod": Period.period_dayonperiod,
            "modified_by": this.initial_current.Username,
            "flag": Period.flag
        }
        return this.http.post<any>(this.config.ApiAttendanceModule + '/period', data, this.options).toPromise()
            .then((res) => {
                console.log(res)
                let message = JSON.parse(res);
                return message;
            });
    }
    public period_delete(Period: TimePeriodModels) {
        console.log('ATT003..');
        let data = {
            "device_name": "phone",
            "ip": "127.0.0.1",
            "username": this.initial_current.Username,
            "company_code": Period.company_code || this.initial_current.CompCode,
            "period_id": Period.period_id
        }
        return this.http.post<any>(this.config.ApiAttendanceModule + '/period_del', data, this.options).toPromise()
            .then((res) => {
                console.log(res)
                let message = JSON.parse(res);
                return message;
            });
    }


    public period_import(file: File, file_name: string, file_type: string) {
        console.log('ATT004..');
        const formData = new FormData();
        formData.append('file', file);

        var para = "fileName=" + file_name + "." + file_type;
        para += "&token=" + this.initial_current.Token;
        para += "&by=" + this.initial_current.Username;

        return this.http.post<any>(this.config.ApiAttendanceModule + '/doUploadMTPeriod?' + para, formData).toPromise()
            .then((res) => {
                let message = JSON.parse(res);
                return message;
            });
    }

}

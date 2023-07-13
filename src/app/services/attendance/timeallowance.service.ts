import { Injectable } from '@angular/core';
import { AppConfig } from '../../config/config';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

import { InitialCurrent } from '../../config/initial_current';
import { cls_MTPlantimeallw } from 'src/app/models/attendance/cls_MTPlantimeallw';

@Injectable({
    providedIn: 'root'
})
export class TimeAllowanceServices {

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

    public timeallow_get(TimeAllow: cls_MTPlantimeallw) {
        // console.log('ATT001..');
        let data = {
            device_name: "phone",
            ip: "127.0.0.1",
            username: this.initial_current.Username,
            company_code: TimeAllow.company_code || this.initial_current.CompCode,
            plantimeallw_id: TimeAllow.plantimeallw_id,
            plantimeallw_code: TimeAllow.plantimeallw_code
        }
        return this.http.post<any>(this.config.ApiAttendanceModule + '/plantimeallw_list', data, this.options).toPromise()
            .then((res) => {
                let message = JSON.parse(res);
                return message.data;
            });
    }

    public timeallow_record(TimeAllow: cls_MTPlantimeallw) {
        // console.log('ATT002..');
        let data = {
            device_name: "phone",
            ip: "127.0.0.1",
            username: this.initial_current.Username,
            company_code: TimeAllow.company_code || this.initial_current.CompCode,
            plantimeallw_id: TimeAllow.plantimeallw_id,
            plantimeallw_code: TimeAllow.plantimeallw_code,
            plantimeallw_name_th: TimeAllow.plantimeallw_name_th,
            plantimeallw_name_en: TimeAllow.plantimeallw_name_en,
            plantimeallw_passpro: TimeAllow.plantimeallw_passpro ? "Y" : "N",
            plantimeallw_lastperiod: TimeAllow.plantimeallw_lastperiod ? "Y" : "N",
            modified_by: this.initial_current.Username,
            flag: TimeAllow.flag,
            timeallw_data: TimeAllow.timeallw_data
        }
        return this.http.post<any>(this.config.ApiAttendanceModule + '/plantimeallw', data, this.options).toPromise()
            .then((res) => {
                // console.log(res)
                let message = JSON.parse(res);
                return message;
            });
    }
    public timeallow_delete(TimeAllow: cls_MTPlantimeallw) {
        // console.log('ATT003..');
        let data = {
            device_name: "phone",
            ip: "127.0.0.1",
            username: this.initial_current.Username,
            company_code: TimeAllow.company_code || this.initial_current.CompCode,
            plantimeallw_id: TimeAllow.plantimeallw_id,
            plantimeallw_code: TimeAllow.plantimeallw_code
        }
        return this.http.post<any>(this.config.ApiAttendanceModule + '/plantimeallw_del', data, this.options).toPromise()
            .then((res) => {
                // console.log(res)
                let message = JSON.parse(res);
                return message;
            });
    }


    public timeallow_import(file: File, file_name: string, file_type: string) {
        // console.log('ATT004..');
        const formData = new FormData();
        formData.append('file', file);

        var para = "fileName=" + file_name + "." + file_type;
        para += "&token=" + this.initial_current.Token;
        para += "&by=" + this.initial_current.Username;

        return this.http.post<any>(this.config.ApiAttendanceModule + '/doUploadMTPlantimeallw?' + para, formData).toPromise()
            .then((res) => {
                let message = JSON.parse(res);
                return message;
            });
    }

}

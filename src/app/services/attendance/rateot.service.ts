import { Injectable } from '@angular/core';
import { AppConfig } from '../../config/config';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

import { InitialCurrent } from '../../config/initial_current';
import { YearPeriodModels } from 'src/app/models/attendance/yearperiod';
import { OvertimeModels } from 'src/app/models/attendance/overtime';

@Injectable({
    providedIn: 'root'
})
export class OTServices {

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

    public ot_get(OT: OvertimeModels) {
        console.log('ATT001..');
        let data = {
            device_name: "phone",
            ip: "127.0.0.1",
            username: this.initial_current.Username,
            company_code: OT.company_code || this.initial_current.CompCode,
            rateot_id: OT.rateot_id,
            rateot_code: OT.rateot_code
        }
        return this.http.post<any>(this.config.ApiAttendanceModule + '/ot_list', data, this.options).toPromise()
            .then((res) => {
                let message = JSON.parse(res);
                return message.data;
            });
    }

    public ot_record(OT: OvertimeModels) {
        console.log('ATT002..');
        let data = {
            device_name: "phone",
            ip: "127.0.0.1",
            username: this.initial_current.Username,
            company_code: OT.company_code || this.initial_current.CompCode,
            rateot_id: OT.rateot_id,
            rateot_code: OT.rateot_code,
            rateot_name_th: OT.rateot_name_th,
            rateot_name_en: OT.rateot_name_en,
            modified_by: this.initial_current.Username,
            flag: OT.flag,
            rateot_data: OT.rateot_data
        }
        return this.http.post<any>(this.config.ApiAttendanceModule + '/ot', data, this.options).toPromise()
            .then((res) => {
                console.log(res)
                let message = JSON.parse(res);
                return message;
            });
    }
    public ot_delete(OT: OvertimeModels) {
        console.log('ATT003..');
        let data = {
            device_name: "phone",
            ip: "127.0.0.1",
            username: this.initial_current.Username,
            company_code: OT.company_code || this.initial_current.CompCode,
            rateot_id: OT.rateot_id,
            rateot_code: OT.rateot_code
        }
        return this.http.post<any>(this.config.ApiAttendanceModule + '/ot_del', data, this.options).toPromise()
            .then((res) => {
                console.log(res)
                let message = JSON.parse(res);
                return message;
            });
    }


    public ot_import(file: File, file_name: string, file_type: string) {
        console.log('ATT004..');
        const formData = new FormData();
        formData.append('file', file);

        var para = "fileName=" + file_name + "." + file_type;
        para += "&token=" + this.initial_current.Token;
        para += "&by=" + this.initial_current.Username;

        return this.http.post<any>(this.config.ApiAttendanceModule + '/doUploadMTRateot?' + para, formData).toPromise()
            .then((res) => {
                let message = JSON.parse(res);
                return message;
            });
    }

}

import { Injectable } from '@angular/core';
import { AppConfig } from '../../config/config';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

import { InitialCurrent } from '../../config/initial_current';
import { YearPeriodModels } from 'src/app/models/attendance/yearperiod';
import { HolidayModels } from 'src/app/models/attendance/holiday';

@Injectable({
    providedIn: 'root'
})
export class PlanholidayServices {

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

    public planholiday_get(Planholiday: HolidayModels) {
        console.log('ATT001..');
        let data = {
            device_name: "Desktop",
            ip: "127.0.0.1",
            username: this.initial_current.Username,
            company_code: Planholiday.company_code || this.initial_current.CompCode,
            planholiday_id: Planholiday.planholiday_id,
            planholiday_code: Planholiday.planholiday_code,
            year_code: Planholiday.year_code
        }
        return this.http.post<any>(this.config.ApiAttendanceModule + '/planholiday_list', data, this.options).toPromise()
            .then((res) => {
                let message = JSON.parse(res);
                return message.data;
            });
    }

    public planholiday_record(Planholiday: HolidayModels) {
        console.log('ATT002..');
        let data = {
            device_name: "phone",
            ip: "127.0.0.1",
            username: this.initial_current.Username,
            company_code: Planholiday.company_code || this.initial_current.CompCode,
            planholiday_id: Planholiday.planholiday_id,
            planholiday_code: Planholiday.planholiday_code,
            planholiday_name_th: Planholiday.planholiday_name_th,
            planholiday_name_en: Planholiday.planholiday_name_en,
            year_code: Planholiday.year_code,
            holiday_list: Planholiday.holiday_list,
            modified_by: this.initial_current.Username,
            flag: Planholiday.flag
        }
        console.log(data)
        return this.http.post<any>(this.config.ApiAttendanceModule + '/planholiday', data, this.options).toPromise()
            .then((res) => {
                console.log(res)
                let message = JSON.parse(res);
                return message;
            });
    }
    public planholiday_delete(Planholiday: HolidayModels) {
        console.log('ATT003..');
        let data = {
            device_name: "Desktop",
            ip: "127.0.0.1",
            username: this.initial_current.Username,
            company_code: Planholiday.company_code || this.initial_current.CompCode,
            planholiday_id: Planholiday.planholiday_id,
            planholiday_code:Planholiday.planholiday_code,
            year_code:Planholiday.year_code
        }
        return this.http.post<any>(this.config.ApiAttendanceModule + '/planholiday_del', data, this.options).toPromise()
            .then((res) => {
                console.log(res)
                let message = JSON.parse(res);
                return message;
            });
    }


    public planholiday_import(file: File, file_name: string, file_type: string) {
        console.log('ATT004..');
        const formData = new FormData();
        formData.append('file', file);

        var para = "fileName=" + file_name + "." + file_type;
        para += "&token=" + this.initial_current.Token;
        para += "&by=" + this.initial_current.Username;

        return this.http.post<any>(this.config.ApiAttendanceModule + '/doUploadMTPlanholiday?' + para, formData).toPromise()
            .then((res) => {
                let message = JSON.parse(res);
                return message;
            });
    }

}

import { Injectable } from '@angular/core';
import { AppConfig } from '../../config/config';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { InitialCurrent } from '../../config/initial_current';
import { LeaveModels } from 'src/app/models/attendance/leave';

@Injectable({
    providedIn: 'root'
})
export class LeaveServices {

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

    public leave_get(Leave: LeaveModels) {
        console.log('ATT001..');
        let data = {
            device_name: "phone",
            ip: "127.0.0.1",
            username: this.initial_current.Username,
            company_code: Leave.company_code || this.initial_current.CompCode,
            leave_id: Leave.leave_id,
            leave_code: Leave.leave_code
        }
        return this.http.post<any>(this.config.ApiAttendanceModule + '/leave_list', data, this.options).toPromise()
            .then((res) => {
                let message = JSON.parse(res);
                return message.data;
            });
    }

    public leave_record(Leave: LeaveModels) {
        console.log('ATT002..');
        let data = {
            device_name: "phone",
            ip: "127.0.0.1",
            username: this.initial_current.Username,
            company_code: Leave.company_code || this.initial_current.CompCode,
            leave_id: Leave.leave_id,
            leave_code: Leave.leave_code,
            leave_name_th: Leave.leave_name_th,
            leave_name_en: Leave.leave_name_en,
            leave_day_peryear: Leave.leave_day_peryear,
            leave_day_acc: Leave.leave_day_acc,
            leave_day_accexpire: Leave.leave_day_accexpire,
            leave_incholiday: Leave.leave_incholiday ? "Y" : "N",
            leave_passpro: Leave.leave_passpro ? "Y" : "N",
            leave_deduct: Leave.leave_deduct ? "Y" : "N",
            leave_caldiligence: Leave.leave_caldiligence ? "Y" : "N",
            leave_agework: Leave.leave_agework ? "Y" : "N",
            leave_ahead: Leave.leave_ahead,
            leave_min_hrs: Leave.leave_min_hrs,
            leave_max_day: Leave.leave_max_day,
            modified_by: this.initial_current.Username,
            flag: Leave.flag,
            leave_workage: Leave.leave_workage
        }
        return this.http.post<any>(this.config.ApiAttendanceModule + '/leave', data, this.options).toPromise()
            .then((res) => {
                console.log(res)
                let message = JSON.parse(res);
                return message;
            });
    }
    public leave_delete(Leave: LeaveModels) {
        console.log('ATT003..');
        let data = {
            device_name: "phone",
            ip: "127.0.0.1",
            username: this.initial_current.Username,
            company_code: Leave.company_code || this.initial_current.CompCode,
            leave_id: Leave.leave_id,
            leave_code: Leave.leave_code,
        }
        return this.http.post<any>(this.config.ApiAttendanceModule + '/leave_del', data, this.options).toPromise()
            .then((res) => {
                console.log(res)
                let message = JSON.parse(res);
                return message;
            });
    }


    public leave_import(file: File, file_name: string, file_type: string) {
        console.log('ATT004..');
        const formData = new FormData();
        formData.append('file', file);

        var para = "fileName=" + file_name + "." + file_type;
        para += "&token=" + this.initial_current.Token;
        para += "&by=" + this.initial_current.Username;

        return this.http.post<any>(this.config.ApiAttendanceModule + '/doUploadMTLeave?' + para, formData).toPromise()
            .then((res) => {
                let message = JSON.parse(res);
                return message;
            });
    }

}

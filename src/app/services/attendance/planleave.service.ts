import { Injectable } from '@angular/core';
import { AppConfig } from '../../config/config';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

import { InitialCurrent } from '../../config/initial_current';
import { LeaveplanModels } from 'src/app/models/attendance/leave_plan';
import { LeaveModels } from 'src/app/models/attendance/leave';

@Injectable({
    providedIn: 'root'
})
export class PlanleaveServices {

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

    public planleave_get(Leaveplane: LeaveplanModels) {
        console.log('ATT001..');
        let data = {
            device_name: "phone",
            ip: "127.0.0.1",
            username: this.initial_current.Username,
            company_code: Leaveplane.company_code || this.initial_current.CompCode,
            planleave_id: Leaveplane.planleave_id,
            planleave_code: Leaveplane.planleave_code
        }
        return this.http.post<any>(this.config.ApiAttendanceModule + '/planleave_list', data, this.options).toPromise()
            .then((res) => {
                let message = JSON.parse(res);
                return message.data;
            });
    }

    public planleave_record(Leaveplane: LeaveplanModels) {
        console.log('ATT002..');
        let leavelists: any = []
        Leaveplane.leavelists.forEach((res: LeaveModels) => {
            let ss = {
                company_code: Leaveplane.company_code || this.initial_current.CompCode,
                planleave_code: Leaveplane.planleave_code,
                leave_code: res.leave_code
            }
            leavelists.push(ss)
        })
        let data = {
            device_nam: "phone",
            i: "127.0.0.1",
            username: this.initial_current.Username,
            company_code: Leaveplane.company_code || this.initial_current.CompCode,
            planleave_id: Leaveplane.planleave_id,
            planleave_code: Leaveplane.planleave_code,
            planleave_name_th: Leaveplane.planleave_name_th,
            planleave_name_en: Leaveplane.planleave_name_en,
            modified_by: this.initial_current.Username,
            flag: false,
            leavelists: leavelists
        }
        return this.http.post<any>(this.config.ApiAttendanceModule + '/planleave', data, this.options).toPromise()
            .then((res) => {
                console.log(res)
                let message = JSON.parse(res);
                return message;
            });
    }
    public planleave_delete(Leaveplane: LeaveplanModels) {
        console.log('ATT003..');
        let data = {
            device_name: "phone",
            ip: "127.0.0.1",
            username: this.initial_current.Username,
            company_code: Leaveplane.company_code || this.initial_current.CompCode,
            planleave_id: Leaveplane.planleave_id,
            planleave_code: Leaveplane.planleave_code
        }
        return this.http.post<any>(this.config.ApiAttendanceModule + '/planleave_del', data, this.options).toPromise()
            .then((res) => {
                console.log(res)
                let message = JSON.parse(res);
                return message;
            });
    }


    public planleave_import(file: File, file_name: string, file_type: string) {
        console.log('ATT004..');
        const formData = new FormData();
        formData.append('file', file);

        var para = "fileName=" + file_name + "." + file_type;
        para += "&token=" + this.initial_current.Token;
        para += "&by=" + this.initial_current.Username;

        return this.http.post<any>(this.config.ApiAttendanceModule + '/doUploadplanleave?' + para, formData).toPromise()
            .then((res) => {
                let message = JSON.parse(res);
                return message;
            });
    }

}
import { Injectable } from '@angular/core';
import { AppConfig } from '../../config/config';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { InitialCurrent } from '../../config/initial_current';
import { LeaveModels } from 'src/app/models/attendance/leave';
import { cls_TRleave } from 'src/app/models/attendance/cls_TRleave';

@Injectable({
    providedIn: 'root'
})
export class TRLeaveaccServices {

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

    public leaveacc_get(Leave: cls_TRleave) {
        let data = {
            device_name: "phone",
            ip: "127.0.0.1",
            username: this.initial_current.Username,
            company_code: Leave.company_code || this.initial_current.CompCode,
            worker_code: Leave.worker_code || this.initial_current.Username,
            year_code: Leave.year_code || this.initial_current.PR_Year,
        }
        return this.http.post<any>(this.config.ApiAttendanceModule + '/leaveacc_list', data, this.options).toPromise()
            .then((res) => {
                let message = JSON.parse(res);
                return message.data;
            });
    }
}

import { Injectable } from '@angular/core';
import { AppConfig } from '../../config/config';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

import { InitialCurrent } from '../../config/initial_current';

import { cls_TRTimeleaveModel } from 'src/app/models/self/cls_TRTimeleave';
import { cls_TRTimeotModel } from 'src/app/models/self/cls_TRTimeot';
import { cls_TRTimeonsiteModel } from 'src/app/models/self/cls_TRTimeonsite';
import { cls_TRTimedaytypeModel } from 'src/app/models/self/cls_TRTimedaytype';
import { cls_TRTimeshiftModel } from 'src/app/models/self/cls_TRTimeshift';

import { DatePipe } from '@angular/common';


@Injectable({
    providedIn: 'root'
})
export class DocApproveServices {

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

    public timeleave_get(timeleave: cls_TRTimeleaveModel) {
        // console.log('ATT001..');
        let data = {
            device_name: "phone",
            ip: "127.0.0.1",
            username: this.initial_current.Username,
            company_code: timeleave.company_code || this.initial_current.CompCode,
            timeleave_id: timeleave.timeleave_id,
            worker_code: timeleave.worker_code || this.initial_current.Username,
            timeleave_fromdate: this.datePipe.transform(timeleave.timeleave_fromdate, 'yyy-MM-dd') || this.datePipe.transform(this.initial_current.PR_FromDate, 'yyy-MM-dd'),
            timeleave_todate: this.datePipe.transform(timeleave.timeleave_todate, 'yyy-MM-dd') || this.datePipe.transform(this.initial_current.PR_ToDate, 'yyy-MM-dd'),
            status: timeleave.status
        }
        return this.http.post<any>(this.config.ApiAttendanceModule + '/leaveappr_list', data, this.options).toPromise()
            .then((res) => {
                let message = JSON.parse(res);
                return message.data;
            });
    }

    public timeot_get(timeot: cls_TRTimeotModel) {
        // console.log('ATT001..');
        let data = {
            device_name: "phone",
            ip: "127.0.0.1",
            username: this.initial_current.Username,
            company_code: timeot.company_code || this.initial_current.CompCode,
            timeot_id: timeot.timeot_id,
            worker_code: timeot.worker_code || this.initial_current.Username,
            timeot_workdate: this.datePipe.transform(timeot.timeot_workdate, 'yyy-MM-dd') || this.datePipe.transform(this.initial_current.PR_FromDate, 'yyy-MM-dd'),
            timeot_todate: this.datePipe.transform(timeot.timeot_todate, 'yyy-MM-dd') || this.datePipe.transform(this.initial_current.PR_ToDate, 'yyy-MM-dd'),
            status: timeot.status
        }
        return this.http.post<any>(this.config.ApiAttendanceModule + '/otappr_list', data, this.options).toPromise()
            .then((res) => {
                let message = JSON.parse(res);
                return message.data;
            });
    }

    public timeonsite_get(timeonstie: cls_TRTimeonsiteModel) {
        // console.log('ATT001..');
        let data = {
            device_name: "phone",
            ip: "127.0.0.1",
            username: this.initial_current.Username,
            company_code: timeonstie.company_code || this.initial_current.CompCode,
            timeonsite_id: timeonstie.timeonsite_id,
            worker_code: timeonstie.worker_code || this.initial_current.Username,
            location_code: timeonstie.location_code,
            timeonsite_workdate: this.datePipe.transform(timeonstie.timeonsite_workdate, 'MM/dd/yyyy') || this.datePipe.transform(this.initial_current.PR_FromDate, 'yyy-MM-dd'),
            timeonstie_todate: this.datePipe.transform(timeonstie.timeonstie_todate, 'MM/dd/yyyy') || this.datePipe.transform(this.initial_current.PR_ToDate, 'yyy-MM-dd'),
            status: timeonstie.status
        }
        return this.http.post<any>(this.config.ApiAttendanceModule + '/onsiteappr_list', data, this.options).toPromise()
            .then((res) => {
                let message = JSON.parse(res);
                return message.data;
            });
    }

    public timedaytype_get(timesdaytype: cls_TRTimedaytypeModel) {
        // console.log('Self011..');
        let data = {
            device_name: "phone",
            ip: "127.0.0.1",
            username: this.initial_current.Username,
            company_code: timesdaytype.company_code || this.initial_current.CompCode,
            timedaytype_id: timesdaytype.timedaytype_id,
            worker_code: timesdaytype.worker_code || this.initial_current.Username,
            timedaytype_workdate: this.datePipe.transform(timesdaytype.timedaytype_workdate, 'MM/dd/yyyy') || this.datePipe.transform(this.initial_current.PR_FromDate, 'yyy-MM-dd'),
            timedaytype_todate: this.datePipe.transform(timesdaytype.timedaytype_todate, 'MM/dd/yyyy') || this.datePipe.transform(this.initial_current.PR_FromDate, 'yyy-MM-dd'),
            status: timesdaytype.status
        }
        return this.http.post<any>(this.config.ApiAttendanceModule + '/daytypeappr_list', data, this.options).toPromise()
            .then((res) => {
                let message = JSON.parse(res);
                return message.data;
            });
    }

    public timeshift_get(timeshfit: cls_TRTimeshiftModel) {
        // console.log('ATT001..');
        let data = {
            device_name: "phone",
            ip: "127.0.0.1",
            username: this.initial_current.Username,
            company_code: timeshfit.company_code || this.initial_current.CompCode,
            timeshift_id: timeshfit.timeshift_id,
            worker_code: timeshfit.worker_code || this.initial_current.Username,
            timeshift_fromdate: this.datePipe.transform(timeshfit.timeshift_workdate, 'yyy-MM-dd') || this.datePipe.transform(this.initial_current.PR_FromDate, 'yyy-MM-dd'),
            timeshift_todate: this.datePipe.transform(timeshfit.timeshift_todate, 'yyy-MM-dd') || this.datePipe.transform(this.initial_current.PR_ToDate, 'yyy-MM-dd'),
            status: timeshfit.status
        }
        return this.http.post<any>(this.config.ApiAttendanceModule + '/shiftappr_list', data, this.options).toPromise()
            .then((res) => {
                let message = JSON.parse(res);
                return message.data;
            });
    }

}

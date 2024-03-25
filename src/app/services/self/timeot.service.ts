import { Injectable } from '@angular/core';
import { AppConfig } from '../../config/config';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

import { InitialCurrent } from '../../config/initial_current';
import { DatePipe } from '@angular/common';
import { cls_MTReqdocumentModel } from 'src/app/models/self/cls_MTReqdocument';
import { cls_TRTimeotModel } from 'src/app/models/self/cls_TRTimeot';

@Injectable({
    providedIn: 'root'
})
export class TimeotServices {

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
        return this.http.post<any>(this.config.ApiSelfServicesModule + '/timeot_list', data, this.options).toPromise()
            .then((res) => {
                let message = JSON.parse(res);
                return message.data;
            });
    }

    public timeot_record(timeots: cls_TRTimeotModel[]) {
        // console.log('ATT002..');
        var ot_datas: any = []
        timeots.forEach((timeot: cls_TRTimeotModel) => {
            let datas = {
                company_code: timeot.company_code || this.initial_current.CompCode,
                worker_code: timeot.worker_code || this.initial_current.Username,
                timeot_id: timeot.timeot_id,
                timeot_doc: timeot.timeot_doc,
                timeot_workdate: this.datePipe.transform(timeot.timeot_workdate, 'yyy-MM-dd'),
                timeot_beforemin: timeot.timeot_beforemin,
                timeot_normalmin: timeot.timeot_normalmin,
                timeot_breakmin: timeot.timeot_breakmin,
                timeot_aftermin: timeot.timeot_aftermin,
                timeot_note: timeot.timeot_note,
                location_code: timeot.location_code,
                reason_code: timeot.reason_code,
                status: timeot.status,
                flag: timeot.flag,
                reqdoc_data: timeot.reqdoc_data,
                depart_so: timeot.depart_so,
                time_in: timeot.time_in,
                time_out: timeot.time_out,
                allow_break: timeot.allow_break,

            }
            ot_datas.push(datas)
        })
        let data = {
            device_name: "phone",
            ip: "127.0.0.1",
            username: this.initial_current.Username,
            company_code: timeots[0].company_code || this.initial_current.CompCode,
            ot_data: JSON.stringify(ot_datas)
        }
        return this.http.post<any>(this.config.ApiSelfServicesModule + '/timeot', data, this.options).toPromise()
            .then((res) => {
                // console.log(res)
                let message = JSON.parse(res);
                return message;
            });
    }
    public timeot_delete(timeots: cls_TRTimeotModel) {
        // console.log('ATT003..');
        let data = {
            device_name: "phone",
            ip: "127.0.0.1",
            username: this.initial_current.Username,
            company_code: timeots.company_code || this.initial_current.CompCode,
            timeot_id: timeots.timeot_id,
        }
        return this.http.post<any>(this.config.ApiSelfServicesModule + '/timeot_del', data, this.options).toPromise()
            .then((res) => {
                // console.log(res)
                let message = JSON.parse(res);
                return message;
            });
    }
    public file_import(file: File, file_name: string, file_type: string) {
        // console.log('ATT004..');
        const formData = new FormData();
        formData.append('file', file);

        var para = "fileName=" + file_name + "." + file_type;
        para += "&token=" + this.initial_current.Token;
        para += "&by=" + this.initial_current.Username;

        return this.http.post<any>(this.config.ApiSelfServicesModule + '/doUploadMTReqdoc?' + para, formData).toPromise()
            .then((res) => {
                let message = JSON.parse(res);
                return message;
            });
    }

    public get_file(file_path: string) {
        // console.log('ATT004..');
        var para = "file_path=" + file_path;
        return this.http.post<any>(this.config.ApiSelfServicesModule + '/doGetMTReqdoc?' + para, this.options).toPromise()
            .then((res) => {
                return res;
            });
    }
    public deletefilepath_file(file_path: string) {
        // console.log('ATT004..');
        var para = "file_path=" + file_path;
        return this.http.post<any>(this.config.ApiSelfServicesModule + '/doDeleteMTReqdoc?' + para, this.options).toPromise()
            .then((res) => {
                return JSON.parse(res);
            });
    }
    public delete_file(file: cls_MTReqdocumentModel) {
        // console.log('ATT001..');
        let data = {
            device_name: "phone",
            ip: "127.0.0.1",
            username: this.initial_current.Username,
            company_code: file.company_code || this.initial_current.CompCode,
            jobtable_id: file.document_id,
            job_id: file.job_id,
            job_type: file.job_type
        }
        return this.http.post<any>(this.config.ApiSelfServicesModule + '/reqdocument_del', data, this.options).toPromise()
            .then((res) => {
                let message = JSON.parse(res);
                return message;
            });
    }
}

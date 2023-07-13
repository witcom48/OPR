import { Injectable } from '@angular/core';
import { AppConfig } from '../../config/config';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

import { InitialCurrent } from '../../config/initial_current';
import { DatePipe } from '@angular/common';
import { cls_MTReqdocumentModel } from 'src/app/models/self/cls_MTReqdocument';
import { cls_TRTimedaytypeModel } from 'src/app/models/self/cls_TRTimedaytype';

@Injectable({
    providedIn: 'root'
})
export class TimeDaytypeServices {

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
        return this.http.post<any>(this.config.ApiSelfServicesModule + '/timedaytype_list', data, this.options).toPromise()
            .then((res) => {
                let message = JSON.parse(res);
                return message.data;
            });
    }

    public timedaytype_record(timedaytypes: cls_TRTimedaytypeModel[]) {
        // console.log('Self011..');
        var daytype_datas: any = []
        timedaytypes.forEach((timesdaytype: cls_TRTimedaytypeModel) => {
            let datas = {
                company_code: timesdaytype.company_code || this.initial_current.CompCode,
                worker_code: timesdaytype.worker_code || this.initial_current.Username,
                timedaytype_id: timesdaytype.timedaytype_id,
                timedaytype_doc: timesdaytype.timedaytype_doc,
                timedaytype_workdate: this.datePipe.transform(timesdaytype.timedaytype_workdate, 'yyy-MM-dd'),
                timedaytype_old: timesdaytype.timedaytype_old,
                timedaytype_new: timesdaytype.timedaytype_new,
                timedaytype_note: timesdaytype.timedaytype_note,
                reason_code: timesdaytype.reason_code,
                status: timesdaytype.status,
                flag: timesdaytype.flag,
                reqdoc_data: timesdaytype.reqdoc_data,

            }
            daytype_datas.push(datas)
        })
        let data = {
            device_name: "phone",
            ip: "127.0.0.1",
            username: this.initial_current.Username,
            company_code: timedaytypes[0].company_code || this.initial_current.CompCode,
            timedaytype_data: JSON.stringify(daytype_datas)
        }
        return this.http.post<any>(this.config.ApiSelfServicesModule + '/timedaytype', data, this.options).toPromise()
            .then((res) => {
                // console.log(res)
                let message = JSON.parse(res);
                return message;
            });
    }
    public timedaytype_delete(timedaytype: cls_TRTimedaytypeModel) {
        // console.log('ATT003..');
        let data = {
            device_name: "phone",
            ip: "127.0.0.1",
            username: this.initial_current.Username,
            company_code: timedaytype.company_code || this.initial_current.CompCode,
            worker_code: timedaytype.worker_code || this.initial_current.Username,
            timedaytype_id: timedaytype.timedaytype_id,
        }
        return this.http.post<any>(this.config.ApiSelfServicesModule + '/timedaytype_del', data, this.options).toPromise()
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
        // console.log('Self011..');
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

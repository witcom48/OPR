import { Injectable } from '@angular/core';
import { AppConfig } from '../../config/config';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

import { InitialCurrent } from '../../config/initial_current';
import { DatePipe } from '@angular/common';
import { cls_MTReqdocumentModel } from 'src/app/models/self/cls_MTReqdocument';
import { cls_TRTimecheckinModel } from 'src/app/models/self/cls_TRTimecheckin';

@Injectable({
    providedIn: 'root'
})
export class TimecheckinServices {

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

    public timecheckin_get(timecheckin: cls_TRTimecheckinModel) {
        console.log('ATT001..');
        let data = {
            device_name: "phone",
            ip: "127.0.0.1",
            username: this.initial_current.Username,
            company_code: timecheckin.company_code || this.initial_current.CompCode,
            timecheckin_id: timecheckin.timecheckin_id,
            worker_code: timecheckin.worker_code || this.initial_current.Username,
            timecheckin_time: timecheckin.timecheckin_time,
            timecheckin_type: timecheckin.timecheckin_type,
            location_code: timecheckin.location_code,
            timecheckin_workdate: this.datePipe.transform(timecheckin.timecheckin_workdate, 'MM/dd/yyyy') || this.datePipe.transform(this.initial_current.PR_FromDate, 'yyy-MM-dd'),
            timecheckin_todate: this.datePipe.transform(timecheckin.timecheckin_todate, 'MM/dd/yyyy') || this.datePipe.transform(this.initial_current.PR_ToDate, 'yyy-MM-dd'),
            status: timecheckin.status
        }
        return this.http.post<any>(this.config.ApiSelfServicesModule + '/timecheckin_list', data, this.options).toPromise()
            .then((res) => {
                let message = JSON.parse(res);
                return message.data;
            });
    }

    public timecheckin_record(timecheckins: cls_TRTimecheckinModel[]) {
        console.log('ATT002..');
        var checkin_datas: any = []
        timecheckins.forEach((timecheckins: cls_TRTimecheckinModel) => {
            let datas = {
                company_code: timecheckins.company_code || this.initial_current.CompCode,
                worker_code: timecheckins.worker_code || this.initial_current.Username,
                timecheckin_id: timecheckins.timecheckin_id,
                timecheckin_doc: timecheckins.timecheckin_doc,
                timecheckin_workdate: this.datePipe.transform(timecheckins.timecheckin_workdate, 'yyy-MM-dd'),
                timecheckin_time: timecheckins.timecheckin_time,
                timecheckin_type: timecheckins.timecheckin_type,
                timecheckin_lat: timecheckins.timecheckin_lat,
                timecheckin_long: timecheckins.timecheckin_long,
                timecheckin_note: timecheckins.timecheckin_note,
                location_code: timecheckins.location_code,
                status: timecheckins.status,
                flag: timecheckins.flag,
                reqdoc_data: timecheckins.reqdoc_data,

            }
            checkin_datas.push(datas)
        })
        let data = {
            device_name: "phone",
            ip: "127.0.0.1",
            username: this.initial_current.Username,
            company_code: timecheckins[0].company_code || this.initial_current.CompCode,
            timecheckin_data: JSON.stringify(checkin_datas)
        }
        return this.http.post<any>(this.config.ApiSelfServicesModule + '/timecheckin', data, this.options).toPromise()
            .then((res) => {
                console.log(res)
                let message = JSON.parse(res);
                return message;
            });
    }
    public timecheckin_delete(timecheckin: cls_TRTimecheckinModel) {
        console.log('ATT003..');
        let data = {
            device_name: "phone",
            ip: "127.0.0.1",
            username: this.initial_current.Username,
            company_code: timecheckin.company_code || this.initial_current.CompCode,
            timecheckin_id: timecheckin.timecheckin_id,
            timecheckin_time: timecheckin.timecheckin_time,
            timecheckin_type: timecheckin.timecheckin_type,
            timecheckin_workdate: timecheckin.timecheckin_workdate,
            worker_code: timecheckin.worker_code,
        }
        return this.http.post<any>(this.config.ApiSelfServicesModule + '/timecheckin_del', data, this.options).toPromise()
            .then((res) => {
                console.log(res)
                let message = JSON.parse(res);
                return message;
            });
    }
    public file_import(file: File, file_name: string, file_type: string) {
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
        var para = "file_path=" + file_path;
        return this.http.post<any>(this.config.ApiSelfServicesModule + '/doGetMTReqdoc?' + para, this.options).toPromise()
            .then((res) => {
                return res;
            });
    }
    public deletefilepath_file(file_path: string) {
        var para = "file_path=" + file_path;
        return this.http.post<any>(this.config.ApiSelfServicesModule + '/doDeleteMTReqdoc?' + para, this.options).toPromise()
            .then((res) => {
                return JSON.parse(res);
            });
    }
    public delete_file(file: cls_MTReqdocumentModel) {
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

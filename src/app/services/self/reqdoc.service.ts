import { Injectable } from '@angular/core';
import { AppConfig } from '../../config/config';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

import { InitialCurrent } from '../../config/initial_current';
import { DatePipe } from '@angular/common';
import { cls_TRReqdocModel } from 'src/app/models/self/cls_TRReqdoc';
import { cls_TRReqdocattModel } from 'src/app/models/self/cls_TRReqdocatt';
// import { cls_MTReqdocumentModel } from 'src/app/models/self/cls_MTReqdocument';
// import { cls_TRTimecheckinModel } from 'src/app/models/self/cls_TRTimecheckin';

@Injectable({
    providedIn: 'root'
})
export class ReqdocServices {

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

    public reqdoc_get(reqdoc: cls_TRReqdocModel) {
        console.log('ATT001..');
        let data = {
            device_name: "phone",
            ip: "127.0.0.1",
            username: this.initial_current.Username,
            company_code: reqdoc.company_code || this.initial_current.CompCode,
            reqdoc_id: reqdoc.reqdoc_id,
            worker_code: reqdoc.worker_code || this.initial_current.Username,
            reqdoc_date: this.datePipe.transform(reqdoc.reqdoc_date, 'MM/dd/yyyy') || this.datePipe.transform(this.initial_current.PR_FromDate, 'MM/dd/yyyy'),
            reqdoc_date_to: this.datePipe.transform(reqdoc.reqdoc_date_to, 'MM/dd/yyyy') || this.datePipe.transform(this.initial_current.PR_ToDate, 'MM/dd/yyyy'),
            status: reqdoc.status
        }
        return this.http.post<any>(this.config.ApiSelfServicesModule + '/reqdoc_list', data, this.options).toPromise()
            .then((res) => {
                let message = JSON.parse(res);
                return message.data;
            });
    }

    public reqdoc_record(reqdoc: cls_TRReqdocModel) {
        console.log('ATT002..');
        let data = {
            device_name: "phone",
            ip: "127.0.0.1",
            username: this.initial_current.Username,
            company_code: reqdoc.company_code || this.initial_current.CompCode,
            reqdoc_id: reqdoc.reqdoc_id,
            worker_code: reqdoc.worker_code || this.initial_current.Username,
            reqdoc_doc: reqdoc.reqdoc_doc,
            reqdoc_date: this.datePipe.transform(reqdoc.reqdoc_date, 'yyy-MM-dd'),
            reqdoc_note: reqdoc.reqdoc_note,
            status: reqdoc.status,
            reqempinfo_data: reqdoc.reqempinfo_data,
            reqdocatt_data: reqdoc.reqdocatt_data
        }
        return this.http.post<any>(this.config.ApiSelfServicesModule + '/reqdoc', data, this.options).toPromise()
            .then((res) => {
                console.log(res)
                let message = JSON.parse(res);
                return message;
            });
    }
    public reqdoc_delete(reqdoc: cls_TRReqdocModel) {
        console.log('ATT003..');
        let data = {
            device_name: "phone",
            ip: "127.0.0.1",
            username: this.initial_current.Username,
            company_code: reqdoc.company_code || this.initial_current.CompCode,
            reqdoc_id: reqdoc.reqdoc_id
        }
        return this.http.post<any>(this.config.ApiSelfServicesModule + '/reqdoc_del', data, this.options).toPromise()
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
    public delete_file(file: cls_TRReqdocattModel) {
        let data = {
            device_name: "phone",
            ip: "127.0.0.1",
            username: this.initial_current.Username,
            reqdoc_id: file.reqdoc_id,
            reqdoc_att_no: file.reqdoc_att_no
        }
        return this.http.post<any>(this.config.ApiSelfServicesModule + '/docatt_del', data, this.options).toPromise()
            .then((res) => {
                let message = JSON.parse(res);
                return message;
            });
    }
}

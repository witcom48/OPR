import { Injectable } from '@angular/core';
import { AppConfig } from '../../config/config';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

import { InitialCurrent } from '../../config/initial_current';
import { DatePipe } from '@angular/common';
import { cls_MTReqdocumentModel } from 'src/app/models/self/cls_MTReqdocument';
import { cls_TRTimeonsiteModel } from 'src/app/models/self/cls_TRTimeonsite';

@Injectable({
    providedIn: 'root'
})
export class TimeonsiteServices {

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

    public timeonsite_get(timeonstie: cls_TRTimeonsiteModel) {
        console.log('ATT001..');
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
        return this.http.post<any>(this.config.ApiSelfServicesModule + '/timeonsite_list', data, this.options).toPromise()
            .then((res) => {
                let message = JSON.parse(res);
                return message.data;
            });
    }

    public timeonsite_record(timeonsites: cls_TRTimeonsiteModel[]) {
        console.log('ATT002..');
        var onsite_datas: any = []
        timeonsites.forEach((timeonsite: cls_TRTimeonsiteModel) => {
            let datas = {
                company_code: timeonsite.company_code || this.initial_current.CompCode,
                worker_code: timeonsite.worker_code || this.initial_current.Username,
                timeonsite_id: timeonsite.timeonsite_id,
                timeonsite_doc: timeonsite.timeonsite_doc,
                timeonsite_workdate: this.datePipe.transform(timeonsite.timeonsite_workdate, 'yyy-MM-dd'),
                timeonsite_in: timeonsite.timeonsite_in,
                timeonsite_out: timeonsite.timeonsite_out,
                timeonsite_note: timeonsite.timeonsite_note,
                reason_code: timeonsite.reason_code,
                location_code: timeonsite.location_code,
                status: timeonsite.status,
                flag: timeonsite.flag,
                reqdoc_data: timeonsite.reqdoc_data,

            }
            onsite_datas.push(datas)
        })
        let data = {
            device_name: "phone",
            ip: "127.0.0.1",
            username: this.initial_current.Username,
            company_code: timeonsites[0].company_code || this.initial_current.CompCode,
            timeonsite_data: JSON.stringify(onsite_datas)
        }
        return this.http.post<any>(this.config.ApiSelfServicesModule + '/timeonsite', data, this.options).toPromise()
            .then((res) => {
                console.log(res)
                let message = JSON.parse(res);
                return message;
            });
    }
    public timeonsite_delete(timeonsites: cls_TRTimeonsiteModel) {
        console.log('ATT003..');
        let data = {
            device_name: "phone",
            ip: "127.0.0.1",
            username: this.initial_current.Username,
            company_code: timeonsites.company_code || this.initial_current.CompCode,
            timeonsite_id: timeonsites.timeonsite_id,
            worker_code: timeonsites.worker_code,
        }
        return this.http.post<any>(this.config.ApiSelfServicesModule + '/timeonsite_del', data, this.options).toPromise()
            .then((res) => {
                console.log(res)
                let message = JSON.parse(res);
                return message;
            });
    }
    public file_import(file: File, file_name: string, file_type: string) {
        console.log('ATT004..');
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
        console.log('ATT004..');
        var para = "file_path=" + file_path;
        return this.http.post<any>(this.config.ApiSelfServicesModule + '/doGetMTReqdoc?' + para, this.options).toPromise()
            .then((res) => {
                return res;
            });
    }
    public deletefilepath_file(file_path: string) {
        console.log('ATT004..');
        var para = "file_path=" + file_path;
        return this.http.post<any>(this.config.ApiSelfServicesModule + '/doDeleteMTReqdoc?' + para, this.options).toPromise()
            .then((res) => {
                return JSON.parse(res);
            });
    }
    public delete_file(file: cls_MTReqdocumentModel) {
        console.log('ATT001..');
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

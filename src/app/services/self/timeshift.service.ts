import { Injectable } from '@angular/core';
import { AppConfig } from '../../config/config';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

import { InitialCurrent } from '../../config/initial_current';
import { DatePipe } from '@angular/common';
import { cls_MTReqdocumentModel } from 'src/app/models/self/cls_MTReqdocument';
import { cls_TRTimeshiftModel } from 'src/app/models/self/cls_TRTimeshift';

@Injectable({
    providedIn: 'root'
})
export class TimeShiftServices {

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

    public timeshift_get(timeshfit: cls_TRTimeshiftModel) {
        console.log('ATT001..');
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
        return this.http.post<any>(this.config.ApiSelfServicesModule + '/timeshift_list', data, this.options).toPromise()
            .then((res) => {
                let message = JSON.parse(res);
                return message.data;
            });
    }

    public timeshift_record(timeshfits: cls_TRTimeshiftModel[]) {
        console.log('ATT002..');
        var shfit_datas: any = []
        timeshfits.forEach((timeshfit: cls_TRTimeshiftModel) => {
            let datas = {
                company_code: timeshfit.company_code || this.initial_current.CompCode,
                worker_code: timeshfit.worker_code || this.initial_current.Username,
                timeshift_id: timeshfit.timeshift_id,
                timeshift_doc: timeshfit.timeshift_doc,
                timeshift_workdate: this.datePipe.transform(timeshfit.timeshift_workdate, 'yyy-MM-dd'),
                timeshift_old: timeshfit.timeshift_old,
                timeshift_new: timeshfit.timeshift_new,
                timeshift_note: timeshfit.timeshift_note,
                reason_code: timeshfit.reason_code,
                status: timeshfit.status,
                flag: timeshfit.flag,
                reqdoc_data: timeshfit.reqdoc_data,

            }
            shfit_datas.push(datas)
        })
        let data = {
            device_name: "phone",
            ip: "127.0.0.1",
            username: this.initial_current.Username,
            company_code: timeshfits[0].company_code || this.initial_current.CompCode,
            timeshift_data: JSON.stringify(shfit_datas)
        }
        return this.http.post<any>(this.config.ApiSelfServicesModule + '/timeshift', data, this.options).toPromise()
            .then((res) => {
                console.log(res)
                let message = JSON.parse(res);
                return message;
            });
    }
    public timeshft_delete(timeshift: cls_TRTimeshiftModel) {
        console.log('ATT003..');
        let data = {
            device_name: "phone",
            ip: "127.0.0.1",
            username: this.initial_current.Username,
            company_code: timeshift.company_code || this.initial_current.CompCode,
            timeshift_id: timeshift.timeshift_id,
        }
        return this.http.post<any>(this.config.ApiSelfServicesModule + '/timeshift_del', data, this.options).toPromise()
            .then((res) => {
                console.log(res)
                let message = JSON.parse(res);
                return message;
            });
    }
    // public timeleaveactualday_get(timeleave: cls_TRTimeleaveModel) {
    //     console.log('ATT001..');
    //     let data = {
    //         device_name: "phone",
    //         ip: "127.0.0.1",
    //         username: this.initial_current.Username,
    //         company_code: timeleave.company_code || this.initial_current.CompCode,
    //         worker_code: timeleave.worker_code || this.initial_current.Username,
    //         project_code: timeleave.project_code,
    //         timeleave_fromdate: timeleave.timeleave_fromdate,
    //         timeleave_todate: timeleave.timeleave_todate
    //     }
    //     return this.http.post<any>(this.config.ApiSelfServicesModule + '/timeleave_actualday', data, this.options).toPromise()
    //         .then((res) => {
    //             let message = JSON.parse(res);
    //             return message.data;
    //         });
    // }

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
                return message.data;
            });
    }
}

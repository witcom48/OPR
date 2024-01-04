import { Injectable } from '@angular/core';
import { AppConfig } from '../../config/config';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

import { InitialCurrent } from '../../config/initial_current';
import { MTAreaModel } from 'src/app/models/self/MTArea';
import { cls_TRTimeleaveModel } from 'src/app/models/self/cls_TRTimeleave';
import { DatePipe } from '@angular/common';
import { Observable, filter, takeWhile } from 'rxjs';
import { cls_MTReqdocumentModel } from 'src/app/models/self/cls_MTReqdocument';

@Injectable({
    providedIn: 'root'
})
export class TimeleaveServices {

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
        return this.http.post<any>(this.config.ApiSelfServicesModule + '/timeleave_list', data, this.options).toPromise()
            .then((res) => {
                let message = JSON.parse(res);
                return message.data;
            });
    }

    public timeleave_record(timeleaves: cls_TRTimeleaveModel[]) {
        // console.log('ATT002..');
        var leave_datas: any = []
        timeleaves.forEach((timeleave: cls_TRTimeleaveModel) => {
            let datas = {
                company_code: timeleave.company_code || this.initial_current.CompCode,
                worker_code: timeleave.worker_code || this.initial_current.Username,
                timeleave_id: timeleave.timeleave_id,
                timeleave_doc: timeleave.timeleave_doc,
                timeleave_fromdate: this.datePipe.transform(timeleave.timeleave_fromdate, 'yyy-MM-dd'),
                timeleave_todate: this.datePipe.transform(timeleave.timeleave_todate, 'yyy-MM-dd'),
                timeleave_type: timeleave.timeleave_type,
                timeleave_min: timeleave.timeleave_min,
                timeleave_actualday: timeleave.timeleave_actualday,
                timeleave_incholiday: timeleave.timeleave_incholiday,
                timeleave_deduct: timeleave.timeleave_deduct,
                timeleave_note: timeleave.timeleave_note,
                leave_code: timeleave.leave_code,
                reason_code: timeleave.reason_code,
                status: timeleave.status,
                flag: timeleave.flag,
                reqdoc_data: timeleave.reqdoc_data,

            }
            leave_datas.push(datas)
        })
        // console.log(leave_datas)
        let data = {
            device_name: "phone",
            ip: "127.0.0.1",
            username: this.initial_current.Username,
            company_code: timeleaves[0].company_code || this.initial_current.CompCode,
            leave_data: JSON.stringify(leave_datas)
        }
        return this.http.post<any>(this.config.ApiSelfServicesModule + '/timeleave', data, this.options).toPromise()
            .then((res) => {
                // console.log(res)
                let message = JSON.parse(res);
                return message;
            });
    }
    public timeleave_delete(timeleave: cls_TRTimeleaveModel) {
        // console.log('ATT003..');
        let data = {
            device_name: "phone",
            ip: "127.0.0.1",
            username: this.initial_current.Username,
            company_code: timeleave.company_code || this.initial_current.CompCode,
            timeleave_id: timeleave.timeleave_id,
        }
        return this.http.post<any>(this.config.ApiSelfServicesModule + '/timeleave_del', data, this.options).toPromise()
            .then((res) => {
                // console.log(res)
                let message = JSON.parse(res);
                return message;
            });
    }
    public timeleaveactualday_get(timeleave: cls_TRTimeleaveModel) {
        // console.log('ATT001..');

        let data = {
            device_name: "phone",
            ip: "127.0.0.1",
            username: this.initial_current.Username,
            company_code: timeleave.company_code || this.initial_current.CompCode,
            worker_code: timeleave.worker_code || this.initial_current.Username,
            project_code: timeleave.project_code,
            timeleave_fromdate: timeleave.timeleave_fromdate,
            timeleave_todate: timeleave.timeleave_todate
        }
        return this.http.get<any>(this.config.ApiSelfServicesModule + '/doGetLeaveActualDay?com=' + this.initial_current.CompCode + '&emp=' + this.initial_current.Username + '&fromdate=' + this.datePipe.transform(timeleave.timeleave_fromdate, 'yyy-MM-dd') + '&todate=' + this.datePipe.transform(timeleave.timeleave_todate, 'yyy-MM-dd')).toPromise()
            .then((res) => {
                let message = JSON.parse(res);
                return message.data;
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

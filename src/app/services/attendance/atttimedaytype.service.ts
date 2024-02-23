import { Injectable } from '@angular/core';
import { AppConfig } from '../../config/config';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

import { InitialCurrent } from '../../config/initial_current';
import { DatePipe } from '@angular/common';
import { TRATTTimeDaytypeModel } from 'src/app/models/attendance/TRATTTimeDaytype';
import { ATTdocumentModel } from 'src/app/models/attendance/attdocument';

@Injectable({
    providedIn: 'root'
})

export class AtttimeDaytypeService {
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

    public atttimeshift_get(timesdaytype: TRATTTimeDaytypeModel) {
        let data = {
            device_name: "phone",
            ip: "127.0.0.1",
            username: this.initial_current.Username,
            language: this.initial_current.Language,

            company_code: timesdaytype.company_code || this.initial_current.CompCode,
            timedaytype_id: timesdaytype.timedaytype_id,
            worker_code: timesdaytype.worker_code || this.initial_current.Username,
            timedaytype_workdate: this.datePipe.transform(timesdaytype.timedaytype_workdate, 'MM/dd/yyyy') || this.datePipe.transform(this.initial_current.PR_FromDate, 'yyy-MM-dd'),
            timedaytype_todate: this.datePipe.transform(timesdaytype.timedaytype_todate, 'MM/dd/yyyy') || this.datePipe.transform(this.initial_current.PR_FromDate, 'yyy-MM-dd'),
        }
        return this.http.post<any>(this.config.ApiAttendanceModule + '/atttimedaytype_list', data, this.options).toPromise()
            .then((res) => {
                let message = JSON.parse(res);
                return message.data;
            });
    }

    public atttimeshift_record(timesdaytype: TRATTTimeDaytypeModel[]) {
        var daytype_datas: any = []
        timesdaytype.forEach((timedaytype: TRATTTimeDaytypeModel) => {
            let datas = {
                device_name: '',
                ip: '',
                username: this.initial_current.Username,
                company_code: timedaytype.company_code || this.initial_current.CompCode,
                worker_code: timedaytype.worker_code || this.initial_current.Username,
                timedaytype_id: timedaytype.timedaytype_id,
                timedaytype_doc: timedaytype.timedaytype_doc,
                timedaytype_workdate: this.datePipe.transform(timedaytype.timedaytype_workdate, 'yyy-MM-dd'),
                timedaytype_old: timedaytype.timedaytype_old,
                timedaytype_new: timedaytype.timedaytype_new,
                timedaytype_note: timedaytype.timedaytype_note,
                reason_code: timedaytype.reason_code,
                flag: timedaytype.flag,
                reqdoc_data: timedaytype.reqdoc_data,
                modified_by: this.initial_current.Username

            };
            daytype_datas.push(datas)
        })

        let data = {
            device_name: "phone",
            ip: "127.0.0.1",
            username: this.initial_current.Username,
            company_code: timesdaytype[0].company_code || this.initial_current.CompCode,
            timedaytype_data: JSON.stringify(daytype_datas)
          }


        return this.http
            .post<any>(this.config.ApiAttendanceModule + '/atttimedaytype', data, this.options)
            .toPromise()
            .then((res) => {
                let message = JSON.parse(res);
                return message;
            })
            .catch((error) => {
                throw error;
            });
    }

    public atttimeshift_delete(timesdaytype: TRATTTimeDaytypeModel) {
        let data = {
            device_name: "phone",
            ip: "127.0.0.1",
            username: this.initial_current.Username,
            company_code: timesdaytype.company_code || this.initial_current.CompCode,
            timedaytype_id: timesdaytype.timedaytype_id,
        }
        return this.http.post<any>(this.config.ApiAttendanceModule + '/atttimedaytype_del', data, this.options).toPromise()
            .then((res) => {
                // console.log(res)
                let message = JSON.parse(res);
                return message;
            });
    }

    ////////////////File/////////////////
    public file_import(file: File, file_name: string, file_type: string) {
        const formData = new FormData();
        formData.append('file', file);

        var para = "fileName=" + file_name + "." + file_type;
        para += "&token=" + this.initial_current.Token;
        para += "&by=" + this.initial_current.Username;

        return this.http.post<any>(this.config.ApiAttendanceModule + '/doUploadMTATTReqdoc?' + para, formData).toPromise()
            .then((res) => {
                let message = JSON.parse(res);
                return message;
            });
    }

    public get_file(file_path: string) {
        var para = "file_path=" + file_path;
        return this.http.post<any>(this.config.ApiAttendanceModule + '/doGetMTATTReqdoc?' + para, this.options).toPromise()
            .then((res) => {
                return res;
            });
    }
    public deletefilepath_file(file_path: string) {
        var para = "file_path=" + file_path;
        return this.http.post<any>(this.config.ApiAttendanceModule + '/doDeleteMTATTReqdoc?' + para, this.options).toPromise()
            .then((res) => {
                return JSON.parse(res);
            });
    }
    public delete_file(file: ATTdocumentModel) {
        let data = {
            device_name: "phone",
            ip: "127.0.0.1",
            username: this.initial_current.Username,
            company_code: file.company_code || this.initial_current.CompCode,
            jobtable_id: file.document_id,
            job_id: file.job_id,
            job_type: file.job_type
        }
        return this.http.post<any>(this.config.ApiAttendanceModule + '/attdocument_del', data, this.options).toPromise()
            .then((res) => {
                let message = JSON.parse(res);
                return message;
            });
    }
}
import { Injectable } from '@angular/core';
import { AppConfig } from '../../config/config';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

import { InitialCurrent } from '../../config/initial_current';
import { DatePipe } from '@angular/common';
import { TRATTTimeShiftModel } from 'src/app/models/attendance/TRATTTimeShift';
import { ATTdocumentModel } from 'src/app/models/attendance/attdocument';

@Injectable({
    providedIn: 'root'
})

export class AtttimeShiftService {
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

    public atttimeshift_get(timeshift: TRATTTimeShiftModel) {
        let data = {
            device_name: "phone",
            ip: "127.0.0.1",
            username: this.initial_current.Username,
            language: this.initial_current.Language,

            company_code: timeshift.company_code || this.initial_current.CompCode,
            timeshift_id: timeshift.timeshift_id,
            worker_code: timeshift.worker_code || this.initial_current.Username,
            timeshift_fromdate: this.datePipe.transform(timeshift.timeshift_workdate, 'yyy-MM-dd') || this.datePipe.transform(this.initial_current.PR_FromDate, 'yyy-MM-dd'),
            timeshift_todate: this.datePipe.transform(timeshift.timeshift_todate, 'yyy-MM-dd') || this.datePipe.transform(this.initial_current.PR_ToDate, 'yyy-MM-dd'),
        }
        return this.http.post<any>(this.config.ApiAttendanceModule + '/atttimeshift_list', data, this.options).toPromise()
            .then((res) => {
                let message = JSON.parse(res);
                return message.data;
            });
    }

    public atttimeshift_record(timesshifts: TRATTTimeShiftModel[]) {
        var shift_datas: any = []
        timesshifts.forEach((timeshift: TRATTTimeShiftModel) => {
            let datas = {
                device_name: '',
                ip: '',
                username: this.initial_current.Username,
                company_code: timeshift.company_code || this.initial_current.CompCode,
                worker_code: timeshift.worker_code || this.initial_current.Username,
                timeshift_id: timeshift.timeshift_id,
                timeshift_doc: timeshift.timeshift_doc,
                timeshift_workdate: this.datePipe.transform(timeshift.timeshift_workdate, 'yyy-MM-dd'),
                timeshift_old: timeshift.timeshift_old,
                timeshift_new: timeshift.timeshift_new,
                timeshift_note: timeshift.timeshift_note,
                reason_code: timeshift.reason_code,
                flag: timeshift.flag,
                reqdoc_data: timeshift.reqdoc_data,
                modified_by: this.initial_current.Username
    
            };
            shift_datas.push(datas)
        })
        let data = {
            device_name: "phone",
            ip: "127.0.0.1",
            username: this.initial_current.Username,
            company_code: timesshifts[0].company_code || this.initial_current.CompCode,
            timeshift_data: JSON.stringify(shift_datas)
          }

        return this.http
            .post<any>(this.config.ApiAttendanceModule + '/atttimeshift', data, this.options)
            .toPromise()
            .then((res) => {
                let message = JSON.parse(res);
                return message;
            })
            .catch((error) => {
                throw error;
            });
    }

    public atttimeshift_delete(timeshift: TRATTTimeShiftModel) {
        // console.log('ATT003..');
        let data = {
            device_name: "phone",
            ip: "127.0.0.1",
            username: this.initial_current.Username,
            company_code: timeshift.company_code || this.initial_current.CompCode,
            timeshift_id: timeshift.timeshift_id,
        }
        return this.http.post<any>(this.config.ApiAttendanceModule + '/atttimeshift_del', data, this.options).toPromise()
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
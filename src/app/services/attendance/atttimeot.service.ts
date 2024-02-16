import { Injectable } from '@angular/core';
import { AppConfig } from '../../config/config';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

import { InitialCurrent } from '../../config/initial_current';
import { DatePipe } from '@angular/common';
import { TRATTTimeotModel } from 'src/app/models/attendance/TRATTTimeotModel';
import { ATTdocumentModel } from 'src/app/models/attendance/attdocument';


@Injectable({
    providedIn: 'root'
})
export class AtttimeotService {

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


    public atttimeot_get(timeot: TRATTTimeotModel) {
        let data = {
            device_name: "phone",
            ip: "127.0.0.1",
            username: this.initial_current.Username,
            language: this.initial_current.Language,

            company_code: timeot.company_code || this.initial_current.CompCode,
            worker_code: timeot.worker_code,

            timeot_id: timeot.timeot_id,
            timeot_workdate: this.datePipe.transform(timeot.timeot_workdate, 'yyy-MM-dd') || this.datePipe.transform(this.initial_current.PR_FromDate, 'yyy-MM-dd'),
            timeot_worktodate: this.datePipe.transform(timeot.timeot_todate, 'yyy-MM-dd') || this.datePipe.transform(this.initial_current.PR_ToDate, 'yyy-MM-dd'),

            modified_by: timeot.modified_by,
        }
        return this.http.post<any>(this.config.ApiAttendanceModule + '/atttimeot_list', data, this.options).toPromise()
            .then((res) => {
                let message = JSON.parse(res);
                return message.data;
            });
    }


    public atttimeot_record(timeot: TRATTTimeotModel[]) {
         var ot_datas: any = []
         timeot.forEach((timeot: TRATTTimeotModel) => {
            let datas = {
                username: this.initial_current.Username,
                 company_code: timeot.company_code || this.initial_current.CompCode,
                worker_code: timeot.worker_code  ,
                timeot_id: timeot.timeot_id,
                timeot_doc: timeot.timeot_doc,
                timeot_workdate: this.datePipe.transform(timeot.timeot_workdate, 'yyyy-MM-dd HH:mm:ss'),
                timeot_worktodate: this.datePipe.transform(timeot.timeot_worktodate, 'yyyy-MM-dd HH:mm:ss'),
    
                timeot_beforemin: timeot.timeot_beforemin,
                timeot_normalmin: timeot.timeot_normalmin,
                timeot_break: timeot.timeot_break,
                timeot_aftermin: timeot.timeot_aftermin,
                timeot_note: timeot.timeot_note,
                location_code: timeot.location_code,
                reason_code: timeot.reason_code,
                flag: timeot.flag,
                reqdoc_data: timeot.reqdoc_data,
                modified_by: this.initial_current.Username

            }
            ot_datas.push(datas)
        })
        let data = {
            device_name: "phone",
            ip: "127.0.0.1",
            username: this.initial_current.Username,
            company_code: timeot[0].company_code || this.initial_current.CompCode,
            ot_data: JSON.stringify(ot_datas)
        }
        return this.http.post<any>(this.config.ApiAttendanceModule + '/atttimeot', data, this.options).toPromise()
            .then((res) => {
                // console.log(res)
                let message = JSON.parse(res);
                return message;
            });
    }

    // public atttimeot_record(timeot: TRATTTimeotModel) {
    //     let data = {
    //         device_name: '',
    //         ip: '',
            // username: this.initial_current.Username,
            // company_code: timeot.company_code || this.initial_current.CompCode,
            // worker_code: timeot.worker_code || this.initial_current.Username,
            // timeot_id: timeot.timeot_id,
            // timeot_doc: timeot.timeot_doc,
            // timeot_workdate: this.datePipe.transform(timeot.timeot_workdate, 'yyy-MM-dd'),
            // timeot_worktodate: this.datePipe.transform(timeot.timeot_worktodate, 'yyy-MM-dd'),

            // timeot_beforemin: timeot.timeot_beforemin,
            // timeot_normalmin: timeot.timeot_normalmin,
            // timeot_break: timeot.timeot_break,
            // timeot_aftermin: timeot.timeot_aftermin,
            // timeot_note: timeot.timeot_note,
            // location_code: timeot.location_code,
            // reason_code: timeot.reason_code,
            // status: timeot.status,
            // flag: timeot.flag,
            // reqdoc_data: timeot.reqdoc_data,
            // modified_by: this.initial_current.Username

    //     };

    //     return this.http
    //         .post<any>(this.config.ApiAttendanceModule + '/atttimeot', data, this.options)
    //         .toPromise()
    //         .then((res) => {
    //             let message = JSON.parse(res);
    //             return message;
    //         })
    //         .catch((error) => {
    //             throw error;
    //         });
    // }

    public atttimeot_delete(timeots: TRATTTimeotModel) {
        let data = {
            device_name: "phone",
            ip: "127.0.0.1",
            username: this.initial_current.Username,
            company_code: timeots.company_code || this.initial_current.CompCode,
            timeot_id: timeots.timeot_id,
        }
        return this.http.post<any>(this.config.ApiAttendanceModule + '/atttimeot_del', data, this.options).toPromise()
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
    
        return this.http.post<any>(this.config.ApiAttendanceModule + '/doUploadMTATTReqdoc?' + para, formData).toPromise()
          .then((res) => {
            let message = JSON.parse(res);
            return message;
          });
      }
    
      public get_file(file_path: string) {
        // console.log('ATT004..');
        var para = "file_path=" + file_path;
        return this.http.post<any>(this.config.ApiAttendanceModule + '/doGetMTATTReqdoc?' + para, this.options).toPromise()
          .then((res) => {
            return res;
          });
      }
      public deletefilepath_file(file_path: string) {
        // console.log('ATT004..');
        var para = "file_path=" + file_path;
        return this.http.post<any>(this.config.ApiAttendanceModule + '/doDeleteMTATTReqdoc?' + para, this.options).toPromise()
          .then((res) => {
            return JSON.parse(res);
          });
      }
      public delete_file(file: ATTdocumentModel) {
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
        return this.http.post<any>(this.config.ApiAttendanceModule + '/attdocument_del', data, this.options).toPromise()
          .then((res) => {
            let message = JSON.parse(res);
            return message;
          });
      }
    }
import { Injectable } from '@angular/core';
import { AppConfig } from '../../config/config';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

import { InitialCurrent } from '../../config/initial_current';
import { DatePipe } from '@angular/common';
import { TRATTTimeotModel } from 'src/app/models/attendance/TRATTTimeotModel';


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
        // console.log('ATT001..');
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
        }
        return this.http.post<any>(this.config.ApiAttendanceModule + '/atttimeot_list', data, this.options).toPromise()
            .then((res) => {
                let message = JSON.parse(res);
                return message.data;
            });
    }

    //

    // public atttimeot_record(timeots: TRATTTimeotModel[]) {
    //     // console.log('ATT002..');
    //     var ot_datas: any = []
    //     timeots.forEach((timeot: TRATTTimeotModel) => {
    //         let datas = {
    //             company_code: timeot.company_code || this.initial_current.CompCode,
    //             worker_code: timeot.worker_code || this.initial_current.Username,
    //             timeot_id: timeot.timeot_id,
    //             timeot_doc: timeot.timeot_doc,
    //             timeot_workdate: this.datePipe.transform(timeot.timeot_workdate, 'yyy-MM-dd'),
    //             timeot_worktodate: this.datePipe.transform(timeot.timeot_worktodate, 'yyy-MM-dd'),
    //             timeot_beforemin: timeot.timeot_beforemin,
    //             timeot_normalmin: timeot.timeot_normalmin,
    //             timeot_breakmin: timeot.timeot_breakmin,
    //             timeot_aftermin: timeot.timeot_aftermin,
    //             timeot_note: timeot.timeot_note,
    //             location_code: timeot.location_code,
    //             reason_code: timeot.reason_code,
    //             status: timeot.status,
    //             flag: timeot.flag,
    //             reqdoc_data: timeot.reqdoc_data,

    //         }
    //         ot_datas.push(datas)
    //     })
    //     let data = {
    //         device_name: "phone",
    //         ip: "127.0.0.1",
    //         username: this.initial_current.Username,
    //         company_code: timeots[0].company_code || this.initial_current.CompCode,
    //         ot_data: JSON.stringify(ot_datas)
    //     }
    //     return this.http.post<any>(this.config.ApiAttendanceModule + '/atttimeot', data, this.options).toPromise()
    //         .then((res) => {
    //             // console.log(res)
    //             let message = JSON.parse(res);
    //             return message;
    //         });
    // }



    public atttimeot_record(timeot: TRATTTimeotModel) {
        // console.log('TRIT002..');
        let data = {
            device_name: '',
            ip: '',
            username: this.initial_current.Username,
            company_code: timeot.company_code || this.initial_current.CompCode,
            worker_code: timeot.worker_code || this.initial_current.Username,
            timeot_id: timeot.timeot_id,
            timeot_doc: timeot.timeot_doc,
            timeot_workdate: this.datePipe.transform(timeot.timeot_workdate, 'yyy-MM-dd'),
            timeot_worktodate: this.datePipe.transform(timeot.timeot_worktodate, 'yyy-MM-dd'),
 
            timeot_beforemin: timeot.timeot_beforemin,
            timeot_normalmin: timeot.timeot_normalmin,
            timeot_break: timeot.timeot_break,
            timeot_aftermin: timeot.timeot_aftermin,
            timeot_note: timeot.timeot_note,
            location_code: timeot.location_code,
            reason_code: timeot.reason_code,
            status: timeot.status,
            flag: timeot.flag,
            reqdoc_data: timeot.reqdoc_data,
            modified_by: this.initial_current.Username

        };

        return this.http
            .post<any>(this.config.ApiAttendanceModule + '/atttimeot', data, this.options)
            .toPromise()
            .then((res) => {
                // console.log(res);
                let message = JSON.parse(res);
                return message;
            })
            .catch((error) => {
                // console.log('An error occurred while recording payitem:', error);
                throw error;
            });
    }
    //
    // public atttimeot_record(timeots: TRATTTimeotModel) {
    //     // console.log('ATT002..');
    //     var ot_datas: any = []
    //     timeots.forEach((timeot: TRATTTimeotModel) => {
    //         let datas = {
    //             company_code: timeot.company_code || this.initial_current.CompCode,
    //             worker_code: timeot.worker_code || this.initial_current.Username,
    //             timeot_id: timeot.timeot_id,
    //             timeot_doc: timeot.timeot_doc,
    //             timeot_workdate: this.datePipe.transform(timeot.timeot_workdate, 'yyy-MM-dd'),
    //             timeot_beforemin: timeot.timeot_beforemin,
    //             timeot_normalmin: timeot.timeot_normalmin,
    //             timeot_breakmin: timeot.timeot_breakmin,
    //             timeot_aftermin: timeot.timeot_aftermin,
    //             timeot_note: timeot.timeot_note,
    //             location_code: timeot.location_code,
    //             reason_code: timeot.reason_code,
    //             status: timeot.status,
    //             flag: timeot.flag,
    //             reqdoc_data: timeot.reqdoc_data,

    //         }
    //         ot_datas.push(datas)
    //     })
    //     let data = {
    //         device_name: "phone",
    //         ip: "127.0.0.1",
    //         username: this.initial_current.Username,
    //         company_code: timeots[0].company_code || this.initial_current.CompCode,
    //         ot_data: JSON.stringify(ot_datas)
    //     }
    //     return this.http.post<any>(this.config.ApiAttendanceModule + '/atttimeot', data, this.options).toPromise()
    //         .then((res) => {
    //             // console.log(res)
    //             let message = JSON.parse(res);
    //             return message;
    //         });
    // }
    public atttimeot_delete(timeots: TRATTTimeotModel) {
        // console.log('ATT003..');
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
}

import { Injectable } from '@angular/core';
import { AppConfig } from '../../config/config';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

import { InitialCurrent } from '../../config/initial_current';
import { DiligenceModels } from 'src/app/models/attendance/diligence';

@Injectable({
    providedIn: 'root'
})
export class DiligenceServices {

    public config: AppConfig = new AppConfig();
    public initial_current: InitialCurrent = new InitialCurrent();

    httpHeaders = new HttpHeaders({});
    options = {
        headers: this.httpHeaders
    };

    constructor(private http: HttpClient, private router: Router) {
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

    public diligence_get(Diligence: DiligenceModels) {
        // console.log('ATT001..');
        let data = {
            device_name: "phone",
            ip: "127.0.0.1",
            username: this.initial_current.Username,
            company_code: Diligence.company_code || this.initial_current.CompCode,
            diligence_id: Diligence.diligence_id,
            diligence_code: Diligence.diligence_code
        }
        return this.http.post<any>(this.config.ApiAttendanceModule + '/diligence_list', data, this.options).toPromise()
            .then((res) => {
                let message = JSON.parse(res);
                return message.data;
            });
    }

    public diligence_record(Diligence: DiligenceModels) {
        // console.log('ATT002..');
        let data = {
            device_name: "phone",
            ip: "127.0.0.1",
            username: this.initial_current.Username,
            company_code: Diligence.company_code || this.initial_current.CompCode,
            diligence_id: Diligence.diligence_id,
            diligence_code: Diligence.diligence_code,
            diligence_name_th: Diligence.diligence_name_th,
            diligence_name_en: Diligence.diligence_name_en,
            diligence_punchcard: Diligence.diligence_punchcard ? "Y" : "N",
            diligence_punchcard_times: Diligence.diligence_punchcard ? Diligence.diligence_punchcard_times : 0,
            diligence_punchcard_timespermonth: Diligence.diligence_punchcard ? Diligence.diligence_punchcard_timespermonth : 0,
            diligence_late: Diligence.diligence_late ? "Y" : "N",
            diligence_late_acc: Diligence.diligence_late ? Diligence.diligence_late_acc : 0,
            diligence_late_times: Diligence.diligence_late ? Diligence.diligence_late_times : 0,
            diligence_late_timespermonth: Diligence.diligence_late ? Diligence.diligence_late_timespermonth : 0,
            diligence_ba: Diligence.diligence_ba ? "Y" : "N",
            diligence_before_min: Diligence.diligence_ba ? Diligence.diligence_before_min : 0,
            diligence_after_min: Diligence.diligence_ba ? Diligence.diligence_after_min : 0,
            diligence_passpro: Diligence.diligence_passpro ? "Y" : "N",
            diligence_wrongcondition: Diligence.diligence_wrongcondition,
            diligence_someperiod: Diligence.diligence_someperiod ? "Y" : "N",
            diligence_someperiod_first: Diligence.diligence_someperiod_first,
            modified_by: this.initial_current.Username,
            flag: Diligence.flag,
            steppay_data: Diligence.steppay_data
        }
        // console.log(data)
        return this.http.post<any>(this.config.ApiAttendanceModule + '/diligence', data, this.options).toPromise()
            .then((res) => {
                // console.log(res)
                let message = JSON.parse(res);
                return message;
            });
    }
    public diligence_delete(Diligence: DiligenceModels) {
        // console.log('ATT003..');
        let data = {
            device_name: "phone",
            ip: "127.0.0.1",
            username: this.initial_current.Username,
            company_code: Diligence.company_code || this.initial_current.CompCode,
            diligence_id: Diligence.diligence_id,
            diligence_code: Diligence.diligence_code
        }
        return this.http.post<any>(this.config.ApiAttendanceModule + '/diligence_del', data, this.options).toPromise()
            .then((res) => {
                // console.log(res)
                let message = JSON.parse(res);
                return message;
            });
    }


    public diligence_import(file: File, file_name: string, file_type: string) {
        // console.log('ATT004..');
        const formData = new FormData();
        formData.append('file', file);

        var para = "fileName=" + file_name + "." + file_type;
        para += "&token=" + this.initial_current.Token;
        para += "&by=" + this.initial_current.Username;
        para += "&com=" + this.initial_current.CompCode;

        return this.http.post<any>(this.config.ApiAttendanceModule + '/doUploadMTDiligence?' + para, formData).toPromise()
            .then((res) => {
                let message = JSON.parse(res);
                return message;
            });
    }

}

import { Injectable } from '@angular/core';
import { AppConfig } from '../../../config/config';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

import { InitialCurrent } from '../../../config/initial_current';
import { ReasonsModel } from 'src/app/models/system/policy/reasons';
// import { ResonsModel } from 'src/app/models/system/reasons';


@Injectable({
  providedIn: 'root'
})
export class ReasonsService {

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

    public reason_get(model: ReasonsModel) {
        // console.log('ATT001..');
        let data = {
            "device_name": "phone",
            "ip": "127.0.0.1",
            "username": this.initial_current.Username,
            "company_code": model.company_code || this.initial_current.CompCode,
            "reason_id": model.reason_id,
            "reason_code": model.reason_code,
            "reason_group": model.reason_group

        }
        return this.http.post<any>(this.config.ApiSystemModule + '/reason_list', data, this.options).toPromise()
            .then((res) => {
                let message = JSON.parse(res);
                return message.data;
            });
    }

    public reason_record(Reason: ReasonsModel) {
        // console.log('ATT002..');
        let data = {
            "device_name": "phone",
            "ip": "127.0.0.1",
            "username": this.initial_current.Username,
            "company_code": Reason.company_code || this.initial_current.CompCode,
            "reason_id": Reason.reason_id,
            "reason_code": Reason.reason_code,
            "reason_group": Reason.reason_group,
            "reason_name_th": Reason.reason_name_th,
            "reason_name_en": Reason.reason_name_en,
            "modified_by": this.initial_current.Username,
            "flag": Reason.flag

        }
        return this.http.post<any>(this.config.ApiSystemModule + '/reason', data, this.options).toPromise()
            .then((res) => {
                // console.log(res)
                let message = JSON.parse(res);
                return message;
            });
    }
    public reason_delete(Reason: ReasonsModel) {
        // console.log('ATT003..');
        let data = {
            "device_name": "phone",
            "ip": "127.0.0.1",
            "username": this.initial_current.Username,
            "company_code": Reason.company_code || this.initial_current.CompCode,
            "reason_id": Reason.reason_id
        }
        return this.http.post<any>(this.config.ApiSystemModule + '/reason_del', data, this.options).toPromise()
            .then((res) => {
                // console.log(res)
                let message = JSON.parse(res);
                return message;
            });
    }


    public reason_import(file: File, file_name: string, file_type: string) {
        // console.log('ATT004..');
        const formData = new FormData();
        formData.append('file', file);

        var para = "fileName=" + file_name + "." + file_type;
        para += "&token=" + this.initial_current.Token;
        para += "&by=" + this.initial_current.Username;
        para += "&com=" + this.initial_current.CompCode;
        return this.http.post<any>(this.config.ApiSystemModule + '/doUploadMTReason?' + para, formData).toPromise()
            .then((res) => {
                let message = JSON.parse(res);
                return message;
            });
    }

}

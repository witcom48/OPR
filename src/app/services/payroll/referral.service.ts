import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AppConfig } from 'src/app/config/config';
import { InitialCurrent } from 'src/app/config/initial_current';
import { ReferralModel } from 'src/app/models/payroll/referral';

@Injectable({
    providedIn: 'root',
})

export class ReferralService {

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

    public referral_get(model: ReferralModel) {
        let data = {
            device_name: "",
            ip: "",
            username: this.initial_current.Username,
            company_code: model.company_code || this.initial_current.CompCode,
            referral_id: model.referral_id,
            referral_code: model.referral_code,
        }
        return this.http.post<any>(this.config.ApiPayrollModule + '/referral_list', data, this.options).toPromise()
            .then((res) => {
                let message = JSON.parse(res);
                return message.data;
            });
    }

    public referral_record(model: ReferralModel) {
        let data = {
            device_name: "",
            ip: "",
            username: this.initial_current.Username,
            company_code: model.company_code || this.initial_current.CompCode,
            referral_id: model.referral_id,
            referral_code: model.referral_code,
            referral_name_th: model.referral_name_th,
            referral_name_en: model.referral_name_en,
            item_code: model.item_code,
            notused: model.notused,

            modified_by: this.initial_current.Username,
            flag: model.flag,
            referral_data: model.referral_data
        }
        return this.http.post<any>(this.config.ApiPayrollModule + '/referral', data, this.options).toPromise()
            .then((res) => {
                let message = JSON.parse(res);
                return message;
            });
    }

    public referral_delete(model: ReferralModel) {
        let data = {
            device_name: "",
            ip: "",
            username: this.initial_current.Username,
            company_code: model.company_code || this.initial_current.CompCode,
            referral_id: model.referral_id,
            referral_code: model.referral_code

        }
        return this.http.post<any>(this.config.ApiPayrollModule + '/referral_del', data, this.options).toPromise()
            .then((res) => {
                let message = JSON.parse(res);
                return message;
            });
    }

    public referral_import(file: File, file_name: string, file_type: string) {
        const formData = new FormData();
        formData.append('file', file);

        var para = "fileName=" + file_name + "." + file_type;
        para += "&token=" + this.initial_current.Token;
        para += "&by=" + this.initial_current.Username;
        para += "&com=" + this.initial_current.CompCode;

        return this.http.post<any>(this.config.ApiPayrollModule + '/doUploadReferral?' + para, formData).toPromise()
            .then((res) => {
                let message = JSON.parse(res);
                return message;
            });
    }
}
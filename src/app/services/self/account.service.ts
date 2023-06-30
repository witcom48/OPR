import { Injectable } from '@angular/core';
import { AppConfig } from '../../config/config';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

import { InitialCurrent } from '../../config/initial_current';
import { AccountModel } from 'src/app/models/self/account';

@Injectable({
    providedIn: 'root'
})
export class AccountServices {

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

    public account_get(account: AccountModel) {
        console.log('ATT001..');
        let data = {
            device_name: "phone",
            ip: "127.0.0.1",
            username: this.initial_current.Username,
            company_code: account.company_code || this.initial_current.CompCode,
            account_id:account.account_id,
            account_user: account.account_user,
            account_type: account.account_type
        }
        return this.http.post<any>(this.config.ApiSelfServicesModule + '/account_list', data, this.options).toPromise()
            .then((res) => {
                let message = JSON.parse(res);
                return message.data;
            });
    }

    public account_record(account: AccountModel) {
        console.log('ATT002..');
        let data = {
            device_name: "phone",
            ip: "127.0.0.1",
            username: this.initial_current.Username,
            company_code: account.company_code || this.initial_current.CompCode,
            account_id:account.account_id,
            account_user: account.account_user,
            account_pwd: account.account_pwd,
            account_type: account.account_type,
            account_level: account.account_level,
            account_email: account.account_email,
            account_email_alert: account.account_email_alert,
            account_line: account.account_line,
            account_line_alert: account.account_line_alert,
            flag: account.flag,
            positonn_data: account.position_data,
            dep_data: account.dep_data,
            worker_data:account.worker_data
        }
        return this.http.post<any>(this.config.ApiSelfServicesModule + '/account', data, this.options).toPromise()
            .then((res) => {
                console.log(res)
                let message = JSON.parse(res);
                return message;
            });
    }
    public account_delete(account: AccountModel) {
        console.log('ATT003..');
        let data = {
            device_name: "phone",
            ip: "127.0.0.1",
            username: this.initial_current.Username,
            company_code: account.company_code || this.initial_current.CompCode,
            account_id:account.account_id,
            account_user: account.account_user,
            account_type: account.account_type

        }
        return this.http.post<any>(this.config.ApiSelfServicesModule + '/account_del', data, this.options).toPromise()
            .then((res) => {
                console.log(res)
                let message = JSON.parse(res);
                return message;
            });
    }
}

import { Injectable } from '@angular/core';
import { AppConfig } from '../../config/config';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

import { InitialCurrent } from '../../config/initial_current';
import { AccountModuleModel } from 'src/app/models/self/accountmodule';

@Injectable({
    providedIn: 'root'
})
export class AccountModuleServices {

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

    public accountmodule_get(accountmodule: AccountModuleModel) {
        // console.log('ATT001..');
        let data = {
            device_name: "phone",
            ip: "127.0.0.1",
            username: this.initial_current.Username,
            company_code: accountmodule.company_code || this.initial_current.CompCode,
            account_user: accountmodule.account_user || this.initial_current.Username,
            account_type: accountmodule.account_type,
            module_code: accountmodule.module_code
        }
        return this.http.post<any>(this.config.ApiSelfServicesModule + '/accountmodule_list', data, this.options).toPromise()
            .then((res) => {
                let message = JSON.parse(res);
                return message.data;
            });
    }

    public accountmodule_record(accountmodule: AccountModuleModel) {
        // console.log('ATT002..');
        let data = {
            device_name: "phone",
            ip: "127.0.0.1",
            username: this.initial_current.Username,
            company_code: accountmodule.company_code || this.initial_current.CompCode,
            account_user: accountmodule.account_user || this.initial_current.Username,
            account_type: accountmodule.account_type,
            module_code: accountmodule.module_code
        }
        return this.http.post<any>(this.config.ApiSelfServicesModule + '/accountmodule', data, this.options).toPromise()
            .then((res) => {
                // console.log(res)
                let message = JSON.parse(res);
                return message;
            });
    }
    public accountmodule_delete(accountmodule: AccountModuleModel) {
        // console.log('ATT003..');
        let data = {
            device_name: "phone",
            ip: "127.0.0.1",
            username: this.initial_current.Username,
            company_code: accountmodule.company_code || this.initial_current.CompCode,
            account_user: accountmodule.account_user || this.initial_current.Username,
            account_type: accountmodule.account_type,
            module_code: accountmodule.module_code
        }
        return this.http.post<any>(this.config.ApiSelfServicesModule + '/accountmodule_del', data, this.options).toPromise()
            .then((res) => {
                // console.log(res)
                let message = JSON.parse(res);
                return message;
            });
    }
}
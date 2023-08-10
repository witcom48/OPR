import { Injectable } from '@angular/core';
import { AppConfig } from '../../../config/config';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

import { InitialCurrent } from '../../../config/initial_current';
import { TRWorkflowModel } from 'src/app/models/system/security/workflow';

@Injectable({
    providedIn: 'root'
})
export class SysworkflowServices {

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

    public workflow_get(workflow: TRWorkflowModel) {
        // console.log('ATT001..');
        let data = {
            device_name: "phone",
            ip: "127.0.0.1",
            username: this.initial_current.Username,
            company_code: this.initial_current.CompCode,
            account_user: workflow.account_user,
            workflow_type: workflow.workflow_type
        }
        return this.http.post<any>(this.config.ApiSystemModule + '/sysworkflow_list', data, this.options).toPromise()
            .then((res) => {
                let message = JSON.parse(res);
                return message.data;
            });
    }

    public workflow_record(workflow: TRWorkflowModel[]) {
        // console.log('ATT002..');
        let data = {
            device_name: "phone",
            ip: "127.0.0.1",
            username: this.initial_current.Username,
            company_code: this.initial_current.CompCode,
            workflow_data: workflow
        }
        return this.http.post<any>(this.config.ApiSystemModule + '/sysworkflow', data, this.options).toPromise()
            .then((res) => {
                // console.log(res)
                let message = JSON.parse(res);
                return message;
            });
    }
    public workflow_delete(workflow: TRWorkflowModel) {
        // console.log('ATT003..');
        let data = {
            device_name: "phone",
            ip: "127.0.0.1",
            username: this.initial_current.Username,
            company_code: this.initial_current.CompCode,
            account_user: workflow.account_user,
            workflow_type: workflow.workflow_type
        }
        return this.http.post<any>(this.config.ApiSystemModule + '/sysworkflow_del', data, this.options).toPromise()
            .then((res) => {
                // console.log(res)
                let message = JSON.parse(res);
                return message;
            });
    }
}

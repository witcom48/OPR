import { Injectable } from '@angular/core';
import { AppConfig } from '../../../config/config';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

import { InitialCurrent } from '../../../config/initial_current';
import { TRSysApproveModel } from 'src/app/models/system/security/sys_approve';

@Injectable({
    providedIn: 'root'
})
export class SysApproveServices {

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

    public approve_get(workflow: TRSysApproveModel) {
        // console.log('ATT001..');
        let data = {
            device_name: "phone",
            ip: "127.0.0.1",
            username: this.initial_current.Username,
            company_code: this.initial_current.CompCode,
            item_code: workflow.approve_code,
            type: workflow.workflow_type
        }
        return this.http.post<any>(this.config.ApiSystemModule + '/approve_list', data, this.options).toPromise()
            .then((res) => {
                let message = JSON.parse(res);
                return message.data;
            });
    }

    public approve_record(model: TRSysApproveModel) {
        
        const data = {
            company_code: model.company_code,
            approve_code: model.approve_code,
            workflow_type: model.workflow_type,
            approve_by: this.initial_current.Username,      
            approve_status: model.approve_status,
            approve_note: model.approve_note,             
          };
   

        return this.http.post<any>(this.config.ApiSystemModule + '/sysapprove', data, this.options).toPromise()
            .then((res) => {
            return res;
        });
    }
   
}

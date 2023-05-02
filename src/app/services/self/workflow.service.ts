import { Injectable } from '@angular/core';
import { AppConfig } from '../../config/config';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

import { InitialCurrent } from '../../config/initial_current';
import { WorkflowModel } from 'src/app/models/self/workflow';

@Injectable({
    providedIn: 'root'
})
export class WorkflowServices {

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

    public workflow_get(workflow: WorkflowModel) {
        console.log('ATT001..');
        let data = {
            device_name: "phone",
            ip: "127.0.0.1",
            username: this.initial_current.Username,
            company_code: workflow.company_code || this.initial_current.CompCode,
            workflow_id: workflow.workflow_id,
            workflow_code: workflow.workflow_code,
            workflow_type: workflow.workflow_type
        }
        return this.http.post<any>(this.config.ApiSelfServicesModule + '/workflow_list', data, this.options).toPromise()
            .then((res) => {
                let message = JSON.parse(res);
                return message.data;
            });
    }

    public workflow_record(workflow: WorkflowModel) {
        console.log('ATT002..');
        let data = {
            device_name: "phone",
            ip: "127.0.0.1",
            username: this.initial_current.Username,
            company_code: workflow.company_code || this.initial_current.CompCode,
            workflow_id: workflow.workflow_id,
            workflow_code: workflow.workflow_code,
            workflow_name_th: workflow.workflow_name_th,
            workflow_name_en: workflow.workflow_name_en,
            workflow_type: workflow.workflow_type,
            step1: workflow.step1,
            step2: workflow.step2,
            step3: workflow.step3,
            step4: workflow.step4,
            step5: workflow.step5,
            totalapprove: workflow.totalapprove,
            modified_by: workflow.company_code || this.initial_current.CompCode,
            flag: workflow.flag,
            lineapprove_data:workflow.lineapprove_data
        }
        return this.http.post<any>(this.config.ApiSelfServicesModule + '/workflow', data, this.options).toPromise()
            .then((res) => {
                console.log(res)
                let message = JSON.parse(res);
                return message;
            });
    }
    public workflow_delete(workflow: WorkflowModel) {
        console.log('ATT003..');
        let data = {
            device_name: "phone",
            ip: "127.0.0.1",
            username: this.initial_current.Username,
            company_code: workflow.company_code || this.initial_current.CompCode,
            workflow_id: workflow.workflow_id
        }
        return this.http.post<any>(this.config.ApiSelfServicesModule + '/workflow_del', data, this.options).toPromise()
            .then((res) => {
                console.log(res)
                let message = JSON.parse(res);
                return message;
            });
    }


    public workflow_import(file: File, file_name: string, file_type: string) {
        console.log('ATT004..');
        const formData = new FormData();
        formData.append('file', file);

        var para = "fileName=" + file_name + "." + file_type;
        para += "&token=" + this.initial_current.Token;
        para += "&by=" + this.initial_current.Username;

        return this.http.post<any>(this.config.ApiSelfServicesModule + '/doUploadMTLate?' + para, formData).toPromise()
            .then((res) => {
                let message = JSON.parse(res);
                return message;
            });
    }
    public workflow_getposition_level(workflow: WorkflowModel) {
        console.log('ATT001..');
        let data = {
            device_name: "phone",
            ip: "127.0.0.1",
            username: this.initial_current.Username,
            company_code: workflow.company_code || this.initial_current.CompCode,
        }
        return this.http.post<any>(this.config.ApiSelfServicesModule + '/positionlevel', data, this.options).toPromise()
            .then((res) => {
                let message = JSON.parse(res);
                return message.data;
            });
    }

}

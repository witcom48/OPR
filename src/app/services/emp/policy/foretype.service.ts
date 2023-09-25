import { Injectable } from '@angular/core';
import { AppConfig } from '../../../config/config';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

import { InitialCurrent } from '../../../config/initial_current';
import { ForetypeModel } from 'src/app/models/employee/policy/foretype';


@Injectable({
    providedIn: 'root'
})
export class ForetypeService {
    public config: AppConfig = new AppConfig();

    public initial_current: InitialCurrent = new InitialCurrent();

    httpHeaders = new HttpHeaders({});
    options = {
        headers: this.httpHeaders
    };

    basicRequest = {
        device_name: '',
        ip: '',
        username: ''
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

            this.basicRequest = {
                device_name: '',
                ip: "localhost",
                username: this.initial_current.Username
            };

        }
        else {
            this.router.navigateByUrl('login');
        }
    }

    public foretype_get() {
        var filter = {
            device_name: '',
            ip: "localhost",
            username: this.initial_current.Username,
            company_code: this.initial_current.CompCode,
            language: "",
        }

        return this.http.post<any>(this.config.ApiEmployeeModule + '/foretype_list', filter, this.options).toPromise()
            .then((res) => {
                let message = JSON.parse(res);
                // console.log(res)
                return message.data;
            });
    }

    public foretype_record(model: ForetypeModel) {
        // console.log('INT002..');
        const data = {
            foretype_id: model.foretype_id,
            foretype_code: model.foretype_code,
            foretype_name_th: model.foretype_name_th,
            foretype_name_en: model.foretype_name_en,
            company_code: model.company_code || this.initial_current.CompCode,
            modified_by: this.initial_current.Username
        };

        return this.http.post<any>(this.config.ApiEmployeeModule + '/foretype', data, this.options).toPromise()
            .then((res) => {
                return res;
            });
    }

    public foretype_delete(model: ForetypeModel) {
        // console.log('INT003..');
        const data = {
            foretype_id: model.foretype_id,
            foretype_code: model.foretype_code,
            company_code: model.company_code || this.initial_current.CompCode,
            modified_by: this.initial_current.Username
        };

        return this.http.post<any>(this.config.ApiEmployeeModule + '/foretype_del', data, this.options).toPromise()
            .then((res) => {
                return res;
            });
    }

    public foretype_import(file: File, file_name: string, file_type: string) {

        const formData = new FormData();
        formData.append('file', file);

        var para = "fileName=" + file_name + "." + file_type;
        para += "&token=" + this.initial_current.Token;
        para += "&by=" + this.initial_current.Username;
        para += "&com=" + this.initial_current.CompCode;

        return this.http.post<any>(this.config.ApiEmployeeModule + '/doUploadForetype?' + para, formData).toPromise()
            .then((res) => {
                return res;
            });
    }
}
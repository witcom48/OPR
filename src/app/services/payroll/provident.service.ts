import { Injectable } from '@angular/core';
import { ProjectModel } from '../../models/project/project';
import { AppConfig } from '../../config/config';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { InitialCurrent } from '../../config/initial_current';
import { ProvidentModel } from 'src/app/models/payroll/provident';
@Injectable({
  providedIn: 'root'
})
export class ProvidentService {
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

    public provident_get(model: ProvidentModel) {
        console.log('PAYP001..');
        let data = {
            device_name: "",
            ip: "",
            username: this.initial_current.Username,
            company_code: model.company_code || this.initial_current.CompCode,
            provident_id: model.provident_id,
            provident_code: model.provident_code,
            provident_name_th: model.provident_name_th,
            provident_name_en: model.provident_name_en,
            flag: model.flag,
            providentWorkage_data: model.providentWorkage_data,
            modified_by: this.initial_current.Username,


        }
        return this.http.post<any>(this.config.ApiPayrollModule + '/MTProvident_list', data, this.options).toPromise()
            .then((res) => {
                let message = JSON.parse(res);
                return message.data;
            });
    }

    public provident_record(model: ProvidentModel) {
        console.log('PAYP002..');
        let data = {
            device_name: "",
            ip: "",
            username: this.initial_current.Username,
            company_code: model.company_code || this.initial_current.CompCode,
            provident_id: model.provident_id,
            provident_code: model.provident_code,
            provident_name_th: model.provident_name_th,
            provident_name_en: model.provident_name_en,

            modified_by: this.initial_current.Username,
            flag: model.flag,
            providentWorkage_data: model.providentWorkage_data
        }
        return this.http.post<any>(this.config.ApiPayrollModule + '/MTProvident', data, this.options).toPromise()
            .then((res) => {
                console.log(res)
                let message = JSON.parse(res);
                return message;
            });
    }
    public provident_delete(model: ProvidentModel) {
        console.log('PAYP003..');
        let data = {
            device_name: "",
            ip: "",
            username: this.initial_current.Username,
            company_code: model.company_code || this.initial_current.CompCode,
            provident_id: model.provident_id,
            provident_code: model.provident_code

        }
        return this.http.post<any>(this.config.ApiPayrollModule + '/MTProvident_del', data, this.options).toPromise()
            .then((res) => {
                console.log(res)
                let message = JSON.parse(res);
                return message;
            });
    }


    public provident_import(file: File, file_name: string, file_type: string) {
        console.log('PAYP004..');
        const formData = new FormData();
        formData.append('file', file);

        var para = "fileName=" + file_name + "." + file_type;
        para += "&token=" + this.initial_current.Token;
        para += "&by=" + this.initial_current.Username;

        return this.http.post<any>(this.config.ApiPayrollModule + '/doUploadMTProvident?' + para, formData).toPromise()
            .then((res) => {
                let message = JSON.parse(res);
                return message;
            });
    }

}
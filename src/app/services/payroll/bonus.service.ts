import { Injectable } from '@angular/core';
import { AppConfig } from '../../config/config';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { InitialCurrent } from '../../config/initial_current';
import { BonusModel } from 'src/app/models/payroll/bonus';
@Injectable({
    providedIn: 'root',
})
export class BonusService {

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

    public bonus_get(model: BonusModel) {
         let data = {
            device_name: "",
            ip: "",
            username: this.initial_current.Username,
            company_code: model.company_code || this.initial_current.CompCode,
            bonus_id: model.bonus_id,
            bonus_code: model.bonus_code,
        }
        return this.http.post<any>(this.config.ApiPayrollModule + '/bonus_list', data, this.options).toPromise()
            .then((res) => {
                let message = JSON.parse(res);
                return message.data;
            });
    }

    public bonus_record(model: BonusModel) {
         let data = {
            device_name: "",
            ip: "",
            username: this.initial_current.Username,
            company_code: model.company_code || this.initial_current.CompCode,
            bonus_id: model.bonus_id,
            bonus_code: model.bonus_code,
            bonus_name_th: model.bonus_name_th,
            bonus_name_en: model.bonus_name_en,
            item_code: model.item_code,

            modified_by: this.initial_current.Username,
            flag: model.flag,
            bonus_data: model.bonus_data
        }
        return this.http.post<any>(this.config.ApiPayrollModule + '/bonus', data, this.options).toPromise()
            .then((res) => {
                 let message = JSON.parse(res);
                return message;
            });
    }
    public bonus_delete(model: BonusModel) {
         let data = {
            device_name: "",
            ip: "",
            username: this.initial_current.Username,
            company_code: model.company_code || this.initial_current.CompCode,
            bonus_id: model.bonus_id,
            bonus_code: model.bonus_code

        }
        return this.http.post<any>(this.config.ApiPayrollModule + '/bonus_del', data, this.options).toPromise()
            .then((res) => {
                 let message = JSON.parse(res);
                return message;
            });
    }


    public bonus_import(file: File, file_name: string, file_type: string) {
         const formData = new FormData();
        formData.append('file', file);

        var para = "fileName=" + file_name + "." + file_type;
        para += "&token=" + this.initial_current.Token;
        para += "&by=" + this.initial_current.Username;
        para += "&com=" + this.initial_current.CompCode;

        return this.http.post<any>(this.config.ApiPayrollModule + '/doUploadBonus?' + para, formData).toPromise()
            .then((res) => {
                let message = JSON.parse(res);
                return message;
            });
    }

}



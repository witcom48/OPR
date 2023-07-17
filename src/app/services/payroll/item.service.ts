import { Injectable } from '@angular/core';
import { ProjectModel } from '../../models/project/project';
import { AppConfig } from '../../config/config';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { InitialCurrent } from '../../config/initial_current';
import { ItemsModel } from 'src/app/models/payroll/items';
@Injectable({
    providedIn: 'root',
})
export class ItemService {
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

    public item_get(model: ItemsModel) {
        // console.log('PAYT001..');
        let data = {
            device_name: "",
            ip: "",
            
            username: this.initial_current.Username,
            company_code: model.company_code || this.initial_current.CompCode,
            item_id:model.item_id,
            item_code:model.item_code,
            item_name_th:model.item_name_th,
            item_name_en:model.item_name_en,
            item_type:model.item_type,
            item_regular:model.item_regular,
            item_caltax:model.item_caltax,
            item_calpf:model.item_calpf,
            item_calsso:model.item_calsso,
            item_calot:model.item_calot,
            item_contax:model.item_contax,
            item_section:model.item_section,
            item_rate:model.item_rate,
            item_account:model.item_account,
            modified_by: this.initial_current.Username,

        }
        return this.http.post<any>(this.config.ApiPayrollModule + '/MTItem_list', data, this.options).toPromise()
            .then((res) => {
                let message = JSON.parse(res);
                return message.data;
            });
    }

    public item_record(model: ItemsModel) {
        // console.log('PAYT002..');
        let data = {
            device_name: "",
            ip: "",
            username: this.initial_current.Username,
            company_code: model.company_code || this.initial_current.CompCode,
            item_id:model.item_id,
            item_code:model.item_code,
            item_name_th:model.item_name_th,
            item_name_en:model.item_name_en,
            item_type:model.item_type,
            item_regular:model.item_regular,

            item_caltax:model.item_caltax  ? "Y" : "N",
            item_calpf:model.item_calpf  ? "Y" : "N",
            item_calsso:model.item_calsso  ? "Y" : "N",
            item_calot:model.item_calot  ? "Y" : "N",
            item_contax:model.item_contax  ? "Y" : "N",
            item_allowance:model.item_allowance  ? "Y" : "N",

            item_section:model.item_section,
            item_rate:model.item_rate,
            item_account:model.item_account,
            modified_by: this.initial_current.Username,

        }
        return this.http.post<any>(this.config.ApiPayrollModule + '/MTItem', data, this.options).toPromise()
            .then((res) => {
                // console.log(res)
                let message = JSON.parse(res);
                return message;
            });
    }
    public item_delete(model: ItemsModel) {
        // console.log('PAYT003..');
        let data = {
            device_name: "",
            ip: "",
            username: this.initial_current.Username,
            company_code: model.company_code || this.initial_current.CompCode,
            item_id:model.item_id,
            item_code:model.item_code,
            item_name_th:model.item_name_th,
            item_name_en:model.item_name_en,
            item_type:model.item_type,
            item_regular:model.item_regular,

            item_caltax:model.item_caltax ? "Y" : "N",
            item_calpf:model.item_calpf ? "Y" : "N",
            item_calsso:model.item_calsso ? "Y" : "N",
            item_calot:model.item_calot ? "Y" : "N",
            item_contax:model.item_contax ? "Y" : "N",

            item_section:model.item_section,
            item_rate:model.item_rate,
            item_account:model.item_account,
           
            modified_by: this.initial_current.Username,
            

        }
        return this.http.post<any>(this.config.ApiPayrollModule + '/MTItem_del', data, this.options).toPromise()
            .then((res) => {
                // console.log(res)
                let message = JSON.parse(res);
                return message;
            });
    }


    public item_import(file: File, file_name: string, file_type: string) {
        // console.log('PAYT004..');
        const formData = new FormData();
        formData.append('file', file);

        var para = "fileName=" + file_name + "." + file_type;
        para += "&token=" + this.initial_current.Token;
        para += "&by=" + this.initial_current.Username;

        return this.http.post<any>(this.config.ApiPayrollModule + '/doUploadMTItem?' + para, formData).toPromise()
            .then((res) => {
                let message = JSON.parse(res);
                return message;
            });
    }

}

import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { AppConfig } from "src/app/config/config";
import { InitialCurrent } from "src/app/config/initial_current";
import { EmployeeresignModel } from "src/app/models/employee/employee_resign";

@Injectable({
    providedIn: 'root'
})

export class EmpresignService {
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

    constructor(
        private http: HttpClient,
        private router: Router) {
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

    public empresign_get(company: string, code: string, card: string) {
        var filter = {
            device_name: '',
            ip: "localhost",
            username: this.initial_current.Username,
            company_code: company,
            language: "",
            worker_code: code,
            card_no: card
        };

        return this.http.post<any>(this.config.ApiEmployeeModule + '/empresignlist', filter, this.options).toPromise()
            .then((res) => {
                let message = JSON.parse(res);
                return message.data;
            });
    }

    public empresign_record(model: EmployeeresignModel) {
        const data = {
            company_code: this.initial_current.CompCode,
            card_no: model.card_no,
            worker_code: model.worker_code,
            empresign_date: model.empresign_date,
            reason_code: model.reason_code,
            modified_by: this.initial_current.Username
        };

        return this.http.post<any>(this.config.ApiEmployeeModule + '/empresign', data, this.options).toPromise()
            .then((res) => {
                return res;
            });
    }

    public empresign_delete(model: EmployeeresignModel) {
        const data = {
            card_no:model.card_no,
            company_code: model.company_code,
            worker_code: model.worker_code,
            modified_by: this.initial_current.Username
        };

        return this.http.post<any>(this.config.ApiEmployeeModule + '/empresign_del', data, this.options).toPromise()
            .then((res) => {
                return res;
            });
    }

    public empresign_import(file: File, file_name: string, file_type: string) {

        const formData = new FormData();
        formData.append('file', file);

        var para = "fileName=" + file_name + "." + file_type;
        para += "&token=" + this.initial_current.Token;
        para += "&by=" + this.initial_current.Username;
        para += "&com=" + this.initial_current.CompCode;

        return this.http.post<any>(this.config.ApiEmployeeModule + '/doUploadEmpResign?' + para, formData).toPromise()
            .then((res) => {
                return res;
            });
    }
}
import { DatePipe } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AppConfig } from 'src/app/config/config';
import { InitialCurrent } from 'src/app/config/initial_current';
import { PaytranModel } from 'src/app/models/payroll/paytran';

@Injectable({
    providedIn: 'root'
})
export class PaytranService {
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

    constructor(private http: HttpClient,
        private router: Router,
        private datePipe: DatePipe) {
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

    public paytran_get(company: string, worker: string, fromdate: Date, todate: Date) {

        var filter = {
            device_name: '',
            ip: "localhost",
            username: this.initial_current.Username,
            company_code: this.initial_current.CompCode,
            language: this.initial_current.Language,
            worker_code: worker,
            fromdate: this.datePipe.transform(fromdate, 'yyyy-MM-dd'),
            todate: this.datePipe.transform(todate, 'yyyy-MM-dd'),

        };
        return this.http.post<any>(this.config.ApiPayrollModule + '/getpaytran', filter, this.options).toPromise()
            .then((res) => {
                let message = JSON.parse(res);
                return message.data;
            });
    }

    public paytranacc_get(company: string, worker: string, year: string, paydate: Date) {

        var filter = {
            device_name: '',
            ip: "localhost",
            username: this.initial_current.Username,
            company_code: this.initial_current.CompCode,
            language: this.initial_current.Language,
            worker_code: worker,
            year: year,
            paydate: this.datePipe.transform(paydate, 'yyyy-MM-dd'),

        };
        return this.http.post<any>(this.config.ApiPayrollModule + '/getpaytranacc', filter, this.options).toPromise()
            .then((res) => {
                let message = JSON.parse(res);
                return message.data;
            });
    }

    public paytran_record(model: PaytranModel) {
        console.log('TRPT002..');
        let data = {
            device_name: '',
            ip: '',
            username: this.initial_current.Username,
            company_code: model.company_code || this.initial_current.CompCode,
            worker_code: model.worker_code,
            paytran_date: this.datePipe.transform(model.paytran_date, 'yyyy-MM-dd'),

            paytran_ssoemp: model.paytran_ssoemp,
            paytran_ssocom: model.paytran_ssocom,
            paytran_ssorateemp: model.paytran_ssorateemp,
            paytran_ssoratecom: model.paytran_ssoratecom,

            paytran_pfemp: model.paytran_pfemp,
            paytran_pfcom: model.paytran_pfcom,

            paytran_income_401: model.paytran_income_401,
            paytran_deduct_401: model.paytran_deduct_401,
            paytran_tax_401: model.paytran_tax_401,

            paytran_income_4013: model.paytran_income_4013,
            paytran_deduct_4013: model.paytran_deduct_4013,
            paytran_tax_4013: model.paytran_tax_4013,

            paytran_income_402I: model.paytran_income_402I,
            paytran_deduct_402I: model.paytran_deduct_402I,
            paytran_tax_402I: model.paytran_tax_402I,

            paytran_income_402O: model.paytran_income_402O,
            paytran_deduct_402O: model.paytran_deduct_402O,
            paytran_tax_402O: model.paytran_tax_402O,

            paytran_income_notax: model.paytran_income_notax,
            paytran_deduct_notax: model.paytran_deduct_notax,

            paytran_income_total: model.paytran_income_total,
            paytran_deduct_total: model.paytran_deduct_total,

            paytran_netpay_b: model.paytran_netpay_b,
            paytran_netpay_c: model.paytran_netpay_c,
            modified_by: this.initial_current.Username,
            flag: model.flag,
        };

        return this.http
            .post<any>(this.config.ApiPayrollModule + '/doManageTRPaytran', data, this.options)
            .toPromise()
            .then((res) => {
                console.log(res);
                let message = JSON.parse(res);
                return message;
            })
            .catch((error) => {
                console.log('An error occurred while recording payitem:', error);
                throw error;
            });
    }

    public paytran_delete(model: PaytranModel) {
        console.log('PAYTRPT003..');
        let data = {
            device_name: "",
            ip: "",
            username: this.initial_current.Username,
            company_code: model.company_code || this.initial_current.CompCode,
            worker_code:model.worker_code,
            paytran_date:this.datePipe.transform(model.paytran_date, 'yyyy-MM-dd'),
            modified_by: this.initial_current.Username,


        }
        return this.http.post<any>(this.config.ApiPayrollModule + '/doDeleteTRPaytran', data, this.options).toPromise()
            .then((res) => {
                console.log(res)
                let message = JSON.parse(res);
                return message;
            });
    }

}
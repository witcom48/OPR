import { Injectable } from '@angular/core';
import { AppConfig } from '../../config/config';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

import { InitialCurrent } from '../../config/initial_current';
import { PeriodsModels } from 'src/app/models/payroll/periods';
import { DatePipe } from '@angular/common';

@Injectable({
    providedIn: 'root'
})
export class PeriodsServices {

    public config: AppConfig = new AppConfig();
    public initial_current: InitialCurrent = new InitialCurrent();

    httpHeaders = new HttpHeaders({});
    options = {
        headers: this.httpHeaders
    };
    constructor(private http: HttpClient, private router: Router, private datePipe: DatePipe) {

         this.doGetInitialCurrent();
    }


    doGetInitialCurrent() {
        this.initial_current = JSON.parse(localStorage.getItem(AppConfig.SESSIONInitial) || '{}');
        if (this.initial_current) {
            this.httpHeaders = new HttpHeaders({
                'Content-Type': 'application/json; charset=utf-8',
                'Accept': 'application/json',
                'Cache-Control': 'no-cache',
                'Authorization': this.initial_current.Token || ""
            });

            this.options = {
                headers: this.httpHeaders
            };
        }
        else {
            this.router.navigateByUrl('login');
        }
    }

    public period_get(Period: PeriodsModels) {
        // console.log('PAYPE001..');
        let data = {
            "device_name": "phone",
            "ip": "127.0.0.1",
            "username": this.initial_current.Username,
            "company_code": Period.company_code || this.initial_current.CompCode,
            "period_id": Period.period_id,
            "period_type": Period.period_type,
            "year_code": Period.year_code,
            "emptype_code": Period.emptype_code
        }
        return this.http.post<any>(this.config.ApiPayrollModule + '/periods_list', data, this.options).toPromise()
            .then((res) => {
                let message = JSON.parse(res);
                return message.data;
            });
    }

    // public period_get2(Period: PeriodsModels) {
    //     // console.log('PAYPE001..');
    //     let data = {
    //         "device_name": "phone",
    //         "ip": "127.0.0.1",
    //         "username": this.initial_current.Username,
    //         "company_code": Period.company_code || this.initial_current.CompCode,
    //         "period_id": Period.period_id,
    //         "period_type": Period.period_type,
    //         "year_code": Period.year_code,
    //         "emptype_code": Period.emptype_code
    //     }
    //     return this.http.post<any>(this.config.ApiPayrollModule + '/periods_list2', data, this.options).toPromise()
    //         .then((res) => {
    //             let message = JSON.parse(res);
    //             return message.data;
    //         });
    // }

    public period_get2(company: string, period_type: string, emptype_code: string, year_code: string,fromdate: Date, todate: Date){

 
            let datefrom = this.datePipe.transform(fromdate, 'yyyy-MM-dd');
            let dateto = this.datePipe.transform(todate, 'yyyy-MM-dd');


        var filter = {
            device_name: '',
            ip: "localhost",
            username: this.initial_current.Username,
            company_code: this.initial_current.CompCode,
            language: this.initial_current.Language,
            period_id: "",
            period_type: period_type,
            year_code: year_code,
            emptype_code: emptype_code,
            fromdate: datefrom,
            todate: dateto,
     
        };
        return this.http.post<any>(this.config.ApiPayrollModule + '/periods_list2', filter, this.options).toPromise()
            .then((res) => {
                let message = JSON.parse(res);
                return message.data;
            });
    }



    public period_record(Period: PeriodsModels) {
        // console.log('PAYPE002..');
        let data = {
            "device_name": "phone",
            "ip": "127.0.0.1",
            "username": this.initial_current.Username,
            "company_code": Period.company_code || this.initial_current.CompCode,
            "period_id": Period.period_id,
            "period_type": Period.period_type || "PAY",
            "emptype_code": Period.emptype_code,
            "year_code": Period.year_code,
            "period_no": Period.period_no,
            "period_name_th": Period.period_name_th,
            "period_name_en": Period.period_name_en,
            "period_from": Period.period_from,
            "period_to": Period.period_to,
            "period_payment": Period.period_payment,
            "period_dayonperiod": Period.period_dayonperiod ?  "1" : "0",
            "period_closeta": Period.period_closeta ?  "1" : "0",
            "period_closepr": Period.period_closepr ?  "1" : "0",


            "changestatus_by": this.initial_current.Username,
 
            "modified_by": this.initial_current.Username,
            "flag": Period.flag
        }
        return this.http.post<any>(this.config.ApiPayrollModule + '/periods', data, this.options).toPromise()
            .then((res) => {
                // console.log(res)
                let message = JSON.parse(res);
                return message;
            });
    }
    public period_delete(Period: PeriodsModels) {
        // console.log('PAYPE003..');
        let data = {
            "device_name": "phone",
            "ip": "127.0.0.1",
            "username": this.initial_current.Username,
            "company_code": Period.company_code || this.initial_current.CompCode,
            "period_id": Period.period_id
        }
        return this.http.post<any>(this.config.ApiPayrollModule + '/periods_del', data, this.options).toPromise()
            .then((res) => {
                // console.log(res)
                let message = JSON.parse(res);
                return message;
            });
    }


    public period_import(file: File, file_name: string, file_type: string) {
        // console.log('PAYPE004..');
        const formData = new FormData();
        formData.append('file', file);

        var para = "fileName=" + file_name + "." + file_type;
        para += "&token=" + this.initial_current.Token;
        para += "&by=" + this.initial_current.Username;
        para += "&com=" + this.initial_current.CompCode;

        return this.http.post<any>(this.config.ApiPayrollModule + '/doUploadMTPeriods?' + para, formData).toPromise()
            .then((res) => {
                let message = JSON.parse(res);
                return message;
            });
    }

}

import { DatePipe } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AppConfig } from 'src/app/config/config';
import { InitialCurrent } from 'src/app/config/initial_current';
import { EmployeeModel } from 'src/app/models/employee/employee';

import { SetBonusModel } from 'src/app/models/payroll/batch/setbonus';
import { BonusModel } from 'src/app/models/payroll/bonus';

@Injectable({
    providedIn: 'root'
})
export class SetbonusService {
    public config: AppConfig = new AppConfig();
    public initial_current: InitialCurrent = new InitialCurrent();

    httpHeaders = new HttpHeaders({});
    options = {
        headers: this.httpHeaders,
    };

    basicRequest = {
        device_name: '',
        ip: '',
        username: '',
    };

    constructor(
        private http: HttpClient,
        private router: Router,
        private datePipe: DatePipe
    ) {
        this.doGetInitialCurrent();
    }

    doGetInitialCurrent() {
        this.initial_current = JSON.parse(
            localStorage.getItem(AppConfig.SESSIONInitial) || '{}'
        );
        if (this.initial_current) {
            this.httpHeaders = new HttpHeaders({
                'Content-Type': 'application/json; charset=utf-8',
                Accept: 'application/json',
                'Cache-Control': 'no-cache',
                Authorization: this.initial_current.Token,
            });

            this.options = {
                headers: this.httpHeaders,
            };

            this.basicRequest = {
                device_name: '',
                ip: 'localhost',
                username: this.initial_current.Username,
            };
        } else {
            this.router.navigateByUrl('login');
        }
    }

    //
    public SetBonus_get(worker_code: string,  Setup: SetBonusModel) {

        let emplists: any = [];
        Setup.emp_data.forEach((res: EmployeeModel) => {
            let ss = {
                worker_code: res.worker_code,
            };
            emplists.push(ss);
 
        });
        let data = {
            device_name: '',
            ip: '127.0.0.1',
            username: this.initial_current.Username,

            company_code: Setup.company_code || this.initial_current.CompCode,
            paypolbonus_code: Setup.paypolbonus_code,
            worker_code: Setup.worker_code,
            // worker_code: code,  

            worker_detail: Setup.worker_detail,
            bonus_name: Setup.bonus_name,

            emp_data: emplists,

            modified_by: Setup.modified_by || this.initial_current.Username,
        };
        return this.http
            .post<any>(
                this.config.ApiPayrollModule + '/setbonus_list',
                data,
                this.options
            )
            .toPromise()
            .then((res) => {
                let message = JSON.parse(res);
                return message.data;
            });
    }

    public SetBonus_record(worker_code: string, Setup: SetBonusModel) {
        // console.log('PAYTRB002..');

        let emplists: any = [];
        Setup.emp_data.forEach((res: EmployeeModel) => {
            let ss = {
                worker_code: res.worker_code,
            };
            emplists.push(ss);
        });
        let data = {
            device_name: '',
            ip: '127.0.0.1',
            username: this.initial_current.Username,

            company_code: Setup.company_code || this.initial_current.CompCode,
            paypolbonus_code: Setup.paypolbonus_code,
            worker_code: Setup.worker_code,
            worker_detail: Setup.worker_detail,
            emp_data: emplists,
            bonus_data: emplists,

            modified_by: Setup.modified_by || this.initial_current.Username,
        };
        return this.http
            .post<any>(
                this.config.ApiPayrollModule + '/setpaypolbonus',
                data,
                this.options
            )
            .toPromise()
            .then((res) => {
                // console.log(res);
                let message = JSON.parse(res);
                return message;
            });
    }

    public SetBonus_delete(Setup: SetBonusModel) {
        // console.log('PAYTRB003..');
        let data = {
            device_name: '',
            ip: '127.0.0.1',
            username: this.initial_current.Username,
            company_code: Setup.company_code || this.initial_current.CompCode,
            paypolbonus_code: Setup.paypolbonus_code,
            worker_code: Setup.worker_code,
            emp_data: Setup.emp_data,
            bonus_data: Setup.bonus_data,
            modified_by: Setup.modified_by || this.initial_current.Username,

        }
        return this.http.post<any>(this.config.ApiPayrollModule + '/setbonus_del', data, this.options).toPromise()
            .then((res) => {
                // console.log(res)
                let message = JSON.parse(res);
                return message;
            });
    }


    public SetBonus_import(file: File, file_name: string, file_type: string) {
        // console.log('PAYTRB005..');
        const formData = new FormData();
        formData.append('file', file);

        var para = 'fileName=' + file_name + '.' + file_type;
        para += '&token=' + this.initial_current.Token;
        para += '&by=' + this.initial_current.Username;
        para += "&com=" + this.initial_current.CompCode;

        return this.http
            .post<any>(
                this.config.ApiPayrollModule + '/doUploadSetBonus?' + para,
                formData
            )
            .toPromise()
            .then((res) => {
                let message = JSON.parse(res);
                return message;
            });
    }
}

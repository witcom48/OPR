
import { DatePipe } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AppConfig } from 'src/app/config/config';
import { InitialCurrent } from 'src/app/config/initial_current';
import { SetItemModel } from 'src/app/models/payroll/batch/setitem';
import { SetProvidentModel } from 'src/app/models/payroll/batch/setprovident';
import { ItemsModel } from 'src/app/models/payroll/items';
import { ProvidentModel } from 'src/app/models/payroll/provident';

@Injectable({
  providedIn: 'root'
})
export class SetitemsService {

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

     //set SetItems
     public SetItems_get( Setup: SetItemModel) {
        console.log('PAYTRPI001..');

        let emplists: any = [];
        Setup.items_data.forEach((res: ItemsModel) => {
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
            paypolitem_code: Setup.paypolitem_code,
            worker_code: Setup.worker_code,
            worker_detail: Setup.worker_detail,
            emp_data: emplists,

            modified_by: Setup.modified_by || this.initial_current.Username,
        };
        return this.http
            .post<any>(
                this.config.ApiPayrollModule + '/setpolpaypolitem_list',
                data,
                this.options
            )
            .toPromise()
            .then((res) => {
                let message = JSON.parse(res);
                return message.data;
            });
    }

    public SetItems_record( Setup: SetItemModel) {
        console.log('PAYTRPI002..');
        let emplists: any = [];
        Setup.items_data.forEach((res: ItemsModel) => {
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
            worker_code: Setup.worker_code,
            paypolitem_code: Setup.paypolitem_code,
            worker_detail: Setup.worker_detail,
            emp_data: emplists,
            items_data: emplists,
            modified_by: Setup.modified_by || this.initial_current.Username,
        };
        return this.http
            .post<any>(
                this.config.ApiPayrollModule + '/setpaypolpaypolitem',
                data,
                this.options
            )
            .toPromise()
            .then((res) => {
                console.log(res);
                let message = JSON.parse(res);
                return message;
            });
    }

    public SetItems_delete(worker_code: string, Setup: SetItemModel) {
        console.log('PAYTRPI003..');

        let emplists: any = [];
        Setup.items_data.forEach((res: ItemsModel) => {
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
            paypolitem_code: Setup.paypolitem_code,
            worker_code: Setup.worker_code,
            worker_detail: Setup.worker_detail,
            emp_data: emplists,

            modified_by: Setup.modified_by || this.initial_current.Username,
        };
        return this.http
            .post<any>(
                this.config.ApiPayrollModule + '/paypolitem_del',
                data,
                this.options
            )
            .toPromise()
            .then((res) => {
                console.log(res);
                let message = JSON.parse(res);
                return message;
            });
    }

    public SetItems_import(file: File, file_name: string, file_type: string) {
        console.log('PAYTRPI004..');
        const formData = new FormData();
        formData.append('file', file);

        var para = 'fileName=' + file_name + '.' + file_type;
        para += '&token=' + this.initial_current.Token;
        para += '&by=' + this.initial_current.Username;

        return this.http
            .post<any>(
                this.config.ApiPayrollModule + '/doUploadSetPaypolitem?' + para,
                formData
            )
            .toPromise()
            .then((res) => {
                let message = JSON.parse(res);
                return message;
            });
    }
}

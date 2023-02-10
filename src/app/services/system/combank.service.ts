import { Injectable } from '@angular/core';
import { PrjectModel } from '../../models/project/project';
import { AppConfig } from '../../config/config';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { InitialCurrent } from '../../config/initial_current';
import { CompanyModel } from 'src/app/models/system/company';
import { CombankModel } from 'src/app/models/system/combank';

@Injectable({
  providedIn: 'root'
})
export class CombankService {
    comaddress_get() {
        throw new Error('Method not implemented.');
    }

    public config: AppConfig = new AppConfig();

    private model: PrjectModel = new PrjectModel();
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

    constructor(private http: HttpClient, private router: Router) {
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

    public combank_get() {
        console.log('CBK001..');

        return this.http
            .post<any>(
                this.config.ApiSystemModule + '/combank_list',
                this.basicRequest,
                this.options
            )
            .toPromise()
            .then((res) => {
                let message = JSON.parse(res);
                console.log(res);
                return message.data;
            });
    }

    public combank_record(model: CombankModel) {
        console.log('CBK002..');
        const data = {
            combank_id: model.combank_id,
            company_code: model.company_code,
            combank_bankcode: model.combank_bankcode,
            combank_bankaccount: model.combank_bankaccount,
            combank_nameaccount: model.combank_nameaccount,
            combank_bankpercent: model.combank_bankpercent,
            combank_cashpercent: model.combank_cashpercent,
            modified_by: this.initial_current.Username,
        };

        return this.http
            .post<any>(
                this.config.ApiSystemModule + '/combank',
                data,
                this.options
            )
            .toPromise()
            .then((res) => {
                //console.log(res)
                return res;
            });
    }

    public combank_delete(model: CombankModel) {
        console.log('CBK002..');
        const data = {
            combank_id: model.combank_id,
            company_code: model.company_code,
            modified_by: this.initial_current.Username,
        };

        return this.http
            .post<any>(
                this.config.ApiSystemModule + '/combank_del',
                data,
                this.options
            )
            .toPromise()
            .then((res) => {
                return res;
            });
    }

    public combank_import(file: File, file_name: string, file_type: string) {
        const formData = new FormData();
        formData.append('file', file);

        var para = 'fileName=' + file_name + '.' + file_type;
        para += '&token=' + this.initial_current.Token;
        para += '&by=' + this.initial_current.Username;

        return this.http
            .post<any>(
                this.config.ApiSystemModule + '/doUploadCombank?' + para,
                formData
            )
            .toPromise()
            .then((res) => {
                return res;
            });
    }
}

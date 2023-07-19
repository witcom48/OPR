import { Injectable } from '@angular/core';
import { ProjectModel } from '../../models/project/project';
import { AppConfig } from '../../config/config';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { InitialCurrent } from '../../config/initial_current';
import { CompanyModel } from 'src/app/models/system/company';

import { ComcardModel } from 'src/app/models/system/comcard';

@Injectable({
  providedIn: 'root'
})
export class ComcardService {
public config: AppConfig = new AppConfig();

    private model: ProjectModel = new ProjectModel();
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

    public comcard_get() {
        // console.log('CDD001..');

        return this.http
            .post<any>(
                this.config.ApiSystemModule + '/comcard_list',
                this.basicRequest,
                this.options
            )
            .toPromise()
            .then((res) => {
                let message = JSON.parse(res);
                // console.log(res);
                return message.data;
            });
    }

    public comcard_record(model: ComcardModel) {
        // console.log('CDD002..');
        const data = {
            company_code: model.company_code,
            comcard_id: model.comcard_id,
            comcard_code: model.comcard_code,
            card_type: model.card_type,
            comcard_issue: model.comcard_issue,
            comcard_expire: model.comcard_expire,
            modified_by: this.initial_current.Username,
        };

        return this.http
            .post<any>(
                this.config.ApiSystemModule + '/comcard',
                data,
                this.options
            )
            .toPromise()
            .then((res) => {
                // console.log(res)
                return res;
            });
    }

    public comcard_delete(model: ComcardModel) {
        // console.log('CDD002..');
        const data = {
            comcard_id: model.comcard_id,
            company_code: model.company_code,
            modified_by: this.initial_current.Username,
        };

        return this.http
            .post<any>(
                this.config.ApiSystemModule + '/comcard_del',
                data,
                this.options
            )
            .toPromise()
            .then((res) => {
                return res;
            });
    }

    public comcard_import(file: File, file_name: string, file_type: string) {
        const formData = new FormData();
        formData.append('file', file);

        var para = 'fileName=' + file_name + '.' + file_type;
        para += '&token=' + this.initial_current.Token;
        para += '&by=' + this.initial_current.Username;

        return this.http
            .post<any>(
                this.config.ApiSystemModule + '/doUploadComcard?' + para,
                formData
            )
            .toPromise()
            .then((res) => {
                return res;
            });
    }
}

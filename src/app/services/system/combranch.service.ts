import { Injectable } from '@angular/core';
import { ProjectModel } from '../../models/project/project';
import { AppConfig } from '../../config/config';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { InitialCurrent } from '../../config/initial_current';
import { CombranchModel } from 'src/app/models/system/branch';
@Injectable({
    providedIn: 'root',
})
export class CombranchService {
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

    public combranch_get(code: string) {
        // console.log('CBR001..');

        var filter = {
            device_name: '',
            ip: 'localhost',
            username: this.initial_current.Username,
            company_code:'' ,
            combranch_code: code,
            combranch_id: '',
            language: '',
            //   company_code:code
        };

        return this.http
        .post<any>(this.config.ApiSystemModule + '/combranch_list',filter,this.options).toPromise()
        .then((res) => {let message = JSON.parse(res);// console.log(res);
            return message.data;
        });


    }

    public combranch_record(model: CombranchModel) {
        // console.log('CBR002..');
        const data = {
            // company_code: model.company_code,
            company_code: this.initial_current.CompCode,
            combranch_id: model.combranch_id,
            sso_combranch_no: model.sso_combranch_no,
            combranch_code: model.combranch_code,
            combranch_name_th: model.combranch_name_th,
            combranch_name_en: model.combranch_name_en,
            modified_by: this.initial_current.Username,
        };

        return this.http
            .post<any>(
                this.config.ApiSystemModule + '/combranch',
                data,
                this.options
            )
            .toPromise()
            .then((res) => {
                // console.log(res)
                return res;
            });
    }

    public combranch_delete(model: CombranchModel) {
        // console.log('CBR003..');
        const data = {
            company_code: model.company_code,
            sso_combranch_no: model.sso_combranch_no,
            combranch_code: model.combranch_code,
            combranch_id: model.combranch_id,
            modified_by: this.initial_current.Username,
        };

        return this.http
            .post<any>(
                this.config.ApiSystemModule + '/combranch_del',
                data,
                this.options
            )
            .toPromise()
            .then((res) => {
                return res;
            });
    }

    public combranch_import(file: File, file_name: string, file_type: string) {
        const formData = new FormData();
        formData.append('file', file);

        var para = 'fileName=' + file_name + '.' + file_type;
        para += '&token=' + this.initial_current.Token;
        para += '&by=' + this.initial_current.Username;

        return this.http
            .post<any>(
                this.config.ApiSystemModule + '/doUploadCombranch?' + para,
                formData
            )
            .toPromise()
            .then((res) => {
                return res;
            });
    }
}

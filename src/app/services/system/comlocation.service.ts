import { Injectable } from '@angular/core';
import { ProjectModel } from '../../models/project/project';
import { AppConfig } from '../../config/config';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { InitialCurrent } from '../../config/initial_current';
import {  ComlocationModel } from 'src/app/models/system/comlocation';
@Injectable({
  providedIn: 'root'
})
export class ComlocationService {
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

    public comlocation_get(code: string) {
        console.log('COLO001..');

        var filter = {
            device_name: '',
            ip: 'localhost',
            username: this.initial_current.Username,
            company_code:'' ,
            comlocation_code: code,
            comlocation_id: '',
            language: '',
            //   company_code:code
        };

        return this.http
        .post<any>(
            this.config.ApiSystemModule + '/comlocation_list',
            filter,
            this.options
        )
        .toPromise()
        .then((res) => {
            let message = JSON.parse(res);
            console.log(res);
            return message.data;
        });


    }

    public comlocation_record(model: ComlocationModel) {
        console.log('COLO002..');
        const data = {
            company_code: model.company_code,
            comlocation_id: model.comlocation_id,
            comlocation_code: model.comlocation_code,
            comlocation_name_th: model.comlocation_name_th,
            comlocation_name_en: model.comlocation_name_en,
            modified_by: this.initial_current.Username,
        };

        return this.http
            .post<any>(
                this.config.ApiSystemModule + '/comlocation',
                data,
                this.options
            )
            .toPromise()
            .then((res) => {
                console.log(res)
                return res;
            });
    }

    public comlocation_delete(model: ComlocationModel) {
        console.log('COLO003..');
        const data = {
            company_code: model.company_code,
            comlocation_code: model.comlocation_code,
            comlocation_id: model.comlocation_id,
            modified_by: this.initial_current.Username,
        };

        return this.http
            .post<any>(
                this.config.ApiSystemModule + '/comlocation_del',
                data,
                this.options
            )
            .toPromise()
            .then((res) => {
                return res;
            });
    }

    public comlocation_import(file: File, file_name: string, file_type: string) {
        const formData = new FormData();
        formData.append('file', file);

        var para = 'fileName=' + file_name + '.' + file_type;
        para += '&token=' + this.initial_current.Token;
        para += '&by=' + this.initial_current.Username;

        return this.http
            .post<any>(
                this.config.ApiSystemModule + '/doUploadcomlocation?' + para,
                formData
            )
            .toPromise()
            .then((res) => {
                return res;
            });
    }
}

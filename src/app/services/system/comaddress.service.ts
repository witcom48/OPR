import { Injectable } from '@angular/core';
import { ProjectModel } from '../../models/project/project';
import { AppConfig } from '../../config/config';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { InitialCurrent } from '../../config/initial_current';
import { AddresstypeModel } from 'src/app/models/system/policy/addresstype';
import { ComaddressModel } from 'src/app/models/system/comaddress';

@Injectable({
    providedIn: 'root',
})
export class ComaddressService {
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

    public comaddress_get() {
        console.log('CCAD001..');

        return this.http
            .post<any>(
                this.config.ApiSystemModule + '/comaddress_list',
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

    public comaddress_record(model: ComaddressModel) {
        console.log('CCAD002..');
        const data = {
            company_code: model.company_code,
            combranch_code: model.combranch_code,
            comaddress_type: model.comaddress_type,

            comaddressth_no: model.comaddressth_no,
            comaddressth_moo: model.comaddressth_moo,
            comaddressth_soi: model.comaddressth_soi,
            comaddressth_road: model.comaddressth_road,
            comaddressth_tambon: model.comaddressth_tambon,
            comaddressth_amphur: model.comaddressth_amphur,
            provinceth_code: model.provinceth_code,

            comaddressen_no: model.comaddressen_no,
            comaddressen_moo: model.comaddressen_moo,
            comaddressen_soi: model.comaddressen_soi,
            comaddressen_road: model.comaddressen_road,
            comaddressen_tambon: model.comaddressen_tambon,
            comaddressen_amphur: model.comaddressen_amphur,
            comaddress_zipcode: model.comaddress_zipcode,
            provinceen_code: model.provinceen_code,

            comaddress_tel: model.comaddress_tel,
            comaddress_email: model.comaddress_email,
            comaddress_line: model.comaddress_line,
            comaddress_facebook: model.comaddress_facebook,
            


            modified_by: this.initial_current.Username,
        };

        return this.http
            .post<any>(
                this.config.ApiSystemModule + '/comaddress',
                data,
                this.options
            )
            .toPromise()
            .then((res) => {
                //console.log(res)
                return res;
            });
    }

    public comaddress_delete(model: ComaddressModel) {
        console.log('CCAD003..');
        const data = {
            company_code:model.company_code,
            combranch_code:model.combranch_code,
            comaddress_type:model.comaddress_type,
            modified_by: this.initial_current.Username,
        };

        return this.http
            .post<any>(
                this.config.ApiSystemModule + '/comaddress_del',
                data,
                this.options
            )
            .toPromise()
            .then((res) => {
                return res;
            });
    }

    public comaddress_import(file: File, file_name: string, file_type: string) {
        const formData = new FormData();
        formData.append('file', file);

        var para = 'fileName=' + file_name + '.' + file_type;
        para += '&token=' + this.initial_current.Token;
        para += '&by=' + this.initial_current.Username;

        return this.http
            .post<any>(
                this.config.ApiSystemModule + '/doUploadComaddress?' + para,
                formData
            )
            .toPromise()
            .then((res) => {
                return res;
            });
    }
}



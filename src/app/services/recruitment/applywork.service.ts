import { Injectable } from '@angular/core';
import { ProjectModel } from '../../models/project/project';
import { AppConfig } from '../../config/config';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

import { InitialCurrent } from '../../config/initial_current';
import { ApplyworkModel } from 'src/app/models/recruitment/applywork';
import { EmployeeModel } from 'src/app/models/employee/employee';
@Injectable({
    providedIn: 'root',
})
export class ApplyworkService {
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

    public applywork_get(company: string, code: string) {
        console.log('APW001..');

        var filter = {
            device_name: '',
            ip: 'localhost',
            username: this.initial_current.Username,
            company_code: company,
            language: '',
            applywork_code: code,
        };

        return this.http
            .post<any>(
                this.config.ApiRecruitmentModule + '/applywork_list',
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

    public applywork_recordall(model: ApplyworkModel) {
        console.log('APW002..');
        const data = {
            company_code: this.initial_current.CompCode,
            applywork_id: model.applywork_id,
            applywork_code: model.applywork_code,
            applywork_initial: model.applywork_initial,
            applywork_fname_th: model.applywork_fname_th,
            applywork_lname_th: model.applywork_lname_th,
            applywork_fname_en: model.applywork_fname_en,
            applywork_lname_en: model.applywork_lname_en,
            applywork_birthdate: model.applywork_birthdate,
            applywork_startdate: model.applywork_startdate,
            province_code: model.province_code,
            bloodtype_code: model.bloodtype_code,
            applywork_height: model.applywork_height,
            applywork_weight: model.applywork_weight,

            modified_by: this.initial_current.Username,
        };

        return this.http
            .post<any>(
                this.config.ApiRecruitmentModule + '/applywork',
                data,
                this.options
            )
            .toPromise()
            .then((res) => {
                return res;
            });
    }

    public applywork_delete(model: ApplyworkModel) {
        console.log('APW003..');
        const data = {
            applywork_id: model.applywork_id,
            applywork_code: model.applywork_code,
            company_code : this.initial_current.CompCode,
            modified_by: this.initial_current.Username
        };

        return this.http
            .post<any>(
                this.config.ApiRecruitmentModule + '/applywork_del',
                data,
                this.options
            )
            .toPromise()
            .then((res) => {
                return res;
            });
    }

    public applywork_import(file: File, file_name: string, file_type: string) {
        const formData = new FormData();
        formData.append('file', file);

        var para = 'fileName=' + file_name + '.' + file_type;
        para += '&token=' + this.initial_current.Token;
        para += '&by=' + this.initial_current.Username;

        return this.http
            .post<any>(
                this.config.ApiRecruitmentModule + '/doUploadApplywork?' + para,
                formData
            )
            .toPromise()
            .then((res) => {
                return res;
            });
    }

    public reqworker_get(company: string, code: string) {
        var filter = {
            device_name: '',
            ip: "localhost",
            username: this.initial_current.Username,
            company_code: company,
            language: "",
            worker_code: code
        };

        return this.http.post<any>(this.config.ApiRecruitmentModule + '/reqworker_list', filter, this.options).toPromise()
            .then((res) => {
                let message = JSON.parse(res);
                // console.log(res)
                return message.data;
            });
    }

    public reqworker_record(model: EmployeeModel) {
        const data = {
            company_code: this.initial_current.CompCode,
            worker_id: model.worker_id,
            worker_code: model.worker_code,
            worker_card: model.worker_code,
            worker_initial: model.worker_initial,
            worker_fname_th: model.worker_fname_th,
            worker_lname_th: model.worker_lname_th,
            worker_fname_en: model.worker_fname_en,
            worker_lname_en: model.worker_lname_en,
            worker_type: model.worker_type,
            worker_gender: model.worker_gender,
            worker_birthdate: model.worker_birthdate,
            worker_hiredate: model.worker_hiredate,
            worker_status: model.worker_status,
            religion_code: model.religion_code,
            blood_code: model.blood_code,
            worker_height: model.worker_height,
            worker_weight: model.worker_weight,
            modified_by: this.initial_current.Username
        };
        return this.http.post<any>(this.config.ApiRecruitmentModule + '/reqworker', data, this.options).toPromise()
            .then((res) => {
                return res;
            });
    }
    public reqworker_delete(model: EmployeeModel) {
        const data = {
            worker_id: model.worker_id,
            worker_code: model.worker_code,
            modified_by: this.initial_current.Username
        };

        return this.http.post<any>(this.config.ApiRecruitmentModule + '/reqworker_del', data, this.options).toPromise()
            .then((res) => {
                return res;
            });
    }

    public reqworker_import(file: File, file_name: string, file_type: string) {

        const formData = new FormData();
        formData.append('file', file);

        var para = "fileName=" + file_name + "." + file_type;
        para += "&token=" + this.initial_current.Token;
        para += "&by=" + this.initial_current.Username;

        return this.http.post<any>(this.config.ApiRecruitmentModule + '/doUploadReqworker?' + para, formData).toPromise()
            .then((res) => {
                return res;
            });
    }
}

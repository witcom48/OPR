import { Injectable } from '@angular/core';
import { ProjectModel } from '../../models/project/project';
import { AppConfig } from '../../config/config';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

import { InitialCurrent } from '../../config/initial_current';
import { DatePipe } from '@angular/common';
import { ApplyworkModel } from 'src/app/models/recruitment/applywork';
import { EmployeeModel } from 'src/app/models/employee/employee';
import { ApplyMTDocattModel } from 'src/app/models/recruitment/applyMTDocatt';
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

    constructor(private http: HttpClient, private router: Router, private datePipe: DatePipe,) {
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

    // public applywork_get(company: string, code: string) {
    //     // console.log('APW001..');

    //     var filter = {
    //         device_name: '',
    //         ip: 'localhost',
    //         username: this.initial_current.Username,
    //         company_code: company,
    //         language: '',
    //         applywork_code: code,
    //     };

    //     return this.http
    //         .post<any>(
    //             this.config.ApiRecruitmentModule + '/applywork_list',
    //             filter,
    //             this.options
    //         )
    //         .toPromise()
    //         .then((res) => {
    //             let message = JSON.parse(res);
    //             // console.log(res);
    //             return message.data;
    //         });
    // }

    // public applywork_recordall(model: ApplyworkModel) {
    //     // console.log('APW002..');
    //     var reqworker_data: any =[]
    //     model.forEach((reqdata: ApplyworkModel) =>{

    //     })
    //     const data = {
    //         company_code: this.initial_current.CompCode,
    //         applywork_id: model.applywork_id,
    //         applywork_code: model.applywork_code,
    //         applywork_initial: model.applywork_initial,
    //         applywork_fname_th: model.applywork_fname_th,
    //         applywork_lname_th: model.applywork_lname_th,
    //         applywork_fname_en: model.applywork_fname_en,
    //         applywork_lname_en: model.applywork_lname_en,
    //         applywork_birthdate: model.applywork_birthdate,
    //         applywork_startdate: model.applywork_startdate,
    //         province_code: model.province_code,
    //         bloodtype_code: model.bloodtype_code,
    //         applywork_height: model.applywork_height,
    //         applywork_weight: model.applywork_weight,

    //         modified_by: this.initial_current.Username,
    //     };

    //     return this.http
    //         .post<any>(
    //             this.config.ApiRecruitmentModule + '/applywork',
    //             data,
    //             this.options
    //         )
    //         .toPromise()
    //         .then((res) => {
    //             return res;
    //         });
    // }

    // public applywork_delete(model: ApplyworkModel) {
    //     // console.log('APW003..');
    //     const data = {
    //         applywork_id: model.applywork_id,
    //         applywork_code: model.applywork_code,
    //         company_code: this.initial_current.CompCode,
    //         modified_by: this.initial_current.Username
    //     };

    //     return this.http
    //         .post<any>(
    //             this.config.ApiRecruitmentModule + '/applywork_del',
    //             data,
    //             this.options
    //         )
    //         .toPromise()
    //         .then((res) => {
    //             return res;
    //         });
    // }

    // public applywork_import(file: File, file_name: string, file_type: string) {
    //     const formData = new FormData();
    //     formData.append('file', file);

    //     var para = 'fileName=' + file_name + '.' + file_type;
    //     para += '&token=' + this.initial_current.Token;
    //     para += '&by=' + this.initial_current.Username;

    //     return this.http
    //         .post<any>(
    //             this.config.ApiRecruitmentModule + '/doUploadApplywork?' + para,
    //             formData
    //         )
    //         .toPromise()
    //         .then((res) => {
    //             return res;
    //         });
    // }

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
                // // console.log(res)
                return message.data;
            });
    }

    public reqworker_record(reqworkers: EmployeeModel[]) {
        var reqworker_data: any = []
        reqworkers.forEach((reqworker: EmployeeModel) => {
            let datas = {
                company_code: reqworker.company_code || this.initial_current.CompCode,
                worker_id: reqworker.worker_id,
                worker_code: reqworker.worker_code,
                worker_card: reqworker.worker_code,
                worker_initial: reqworker.worker_initial,
                worker_fname_th: reqworker.worker_fname_th,
                worker_lname_th: reqworker.worker_lname_th,
                worker_fname_en: reqworker.worker_fname_en,
                worker_lname_en: reqworker.worker_lname_en,
                worker_type: reqworker.worker_type,
                worker_gender: reqworker.worker_gender,
                worker_birthdate: this.datePipe.transform(reqworker.worker_birthdate, 'yyy-MM-dd'),
                worker_hiredate: this.datePipe.transform(reqworker.worker_hiredate, 'yyy-MM-dd'),
                worker_status: reqworker.worker_status,
                religion_code: reqworker.religion_code,
                blood_code: reqworker.blood_code,
                worker_height: reqworker.worker_height,
                worker_weight: reqworker.worker_weight,
                worker_age: reqworker.worker_age,

                worker_tel: reqworker.worker_tel,
                worker_email: reqworker.worker_email,
                worker_line: reqworker.worker_line,
                worker_facebook: reqworker.worker_facebook,
                worker_military: reqworker.worker_military,
                nationality_code: reqworker.nationality_code,
                modified_by: this.initial_current.Username,
                reqdocatt_data: reqworker.reqdocatt_data,
            }
            reqworker_data.push(datas)
        })
        const data = {
            device_name: "",
            ip: "127.0.0.1",
            username: this.initial_current.Username,
            company_code: reqworkers[0].company_code || this.initial_current.CompCode,
            reqworker_data: JSON.stringify(reqworker_data)
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

    //image
    public doGetReqImages(com_code: string, worker_code: string) {
        var filter = {
            device_name: '',
            ip: "localhost",
            username: this.initial_current.Username,
            company_code: com_code,
            language: "",
            worker_code: worker_code
        };
        return this.http.post<any>(this.config.ApiRecruitmentModule + '/reqimages', filter, this.options).toPromise()
            .then((res) => {
                return res;
            });
    }

    uploadReqImages(file: File, com: string, worker: string) {

        const formData = new FormData();
        formData.append('file', file);

        var para = "ref_to=" + com + "." + worker + "." + this.initial_current.Username;

        return this.http.post<any>(this.config.ApiRecruitmentModule + '/doUploadReqImages?' + para, formData).toPromise()
            .then((res) => {
                return res;
            });

    }

    //attach file
    public file_attach(file: File, file_name: string, file_type: string) {
        const formData = new FormData();
        formData.append('file', file);

        var para = "fileName=" + file_name + "." + file_type;
        para += "&token=" + this.initial_current.Token;
        para += "&by=" + this.initial_current.Username;

        return this.http.post<any>(this.config.ApiRecruitmentModule + '/doUploadMTDocatt?' + para, formData).toPromise()
            .then((res) => {
                let message = JSON.parse(res);
                return message;
            });
    }

    public get_file(file_path: string) {
        var para = "file_path=" + file_path;
        return this.http.post<any>(this.config.ApiRecruitmentModule + '/doGetMTDocatt?' + para, this.options).toPromise()
            .then((res) => {
                return res;
            });
    }
    public deletefilepath_file(file_path: string) {
        var para = "file_path=" + file_path;
        return this.http.post<any>(this.config.ApiRecruitmentModule + '/doDeleteMTDocatt?' + para, this.options).toPromise()
            .then((res) => {
                return JSON.parse(res);
            });
    }
    public delete_file(file: ApplyMTDocattModel) {
        let data = {
            device_name: "phone",
            ip: "127.0.0.1",
            username: this.initial_current.Username,
            company_code: file.company_code || this.initial_current.CompCode,
            jobtable_id: file.document_id,
            job_id: file.job_id,
        }
        return this.http.post<any>(this.config.ApiRecruitmentModule + '/docatt_del', data, this.options).toPromise()
            .then((res) => {
                let message = JSON.parse(res);
                return message;
            });
    }

    public getreq_filelist(model: ApplyMTDocattModel) {
        var filter = {
            device_name: '',
            ip: "localhost",
            username: this.initial_current.Username,
            company_code: model.company_code,
            language: "",
            worker_code: model.worker_code,
            job_type: model.job_type,
        }

        return this.http.post<any>(this.config.ApiRecruitmentModule+ '/reqsuggestlist', filter, this.options).toPromise()
        .then((res)=>{
            let message = JSON.parse(res);
            return message.data;
        })
    }

    public record_reqfile(worker_code: string, list: ApplyMTDocattModel[]) {
        var item_data: string = "[";
        for (let i = 0; i < list.length; i++) {
            item_data = item_data + "{";
            item_data = item_data + "\"document_id\":\"" + list[i].document_id + "\"";
            item_data = item_data + ",\"job_type\":\"" + list[i].job_type + "\"";
            item_data = item_data + ",\"document_name\":\"" + list[i].document_name + "\"";
            item_data = item_data + ",\"document_type\":\"" + list[i].document_type + "\"";
            item_data = item_data + ",\"document_path\":\"" + list[i].document_path + "\"";
            item_data = item_data + ",\"company_code\":\"" + this.initial_current.CompCode + "\"";
            item_data = item_data + ",\"worker_code\":\"" + worker_code + "\"";
            item_data = item_data + "}" + ",";
        }
        if (item_data.length > 2) {
            item_data = item_data.substr(0, item_data.length - 1);
        }
        item_data = item_data + "]";

        var specificData = {
            transaction_data: item_data,
            worker_code: worker_code,
            company_code: this.initial_current.CompCode,
            modified_by: this.initial_current.Username
        };
        console.log(item_data)
        return this.http.post<any>(this.config.ApiRecruitmentModule + '/docatt', specificData, this.options).toPromise()
            .then((res) => {
                return res;
            });
    }

}

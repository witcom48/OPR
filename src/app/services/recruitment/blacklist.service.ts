import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { AppConfig } from "src/app/config/config";
import { InitialCurrent } from "src/app/config/initial_current";
import { EmployeeModel } from "src/app/models/employee/employee";
import { BlacklistModel } from "src/app/models/recruitment/blacklist";

@Injectable({
    providedIn: 'root'
})
export class BlacklistService {

    public config: AppConfig = new AppConfig();

    public initial_current: InitialCurrent = new InitialCurrent();

    httpHeaders = new HttpHeaders({});
    options = {
        headers: this.httpHeaders
    };

    basicRequest = {
        device_name: '',
        ip: '',
        username: ''
    };

    constructor(
        private http: HttpClient,
        private router: Router) {
        this.doGetInitialCurrent();
    }

    doGetInitialCurrent() {
        this.initial_current = JSON.parse(localStorage.getItem(AppConfig.SESSIONInitial) || '{}');
        if (this.initial_current) {
            this.httpHeaders = new HttpHeaders({
                'Content-Type': 'application/json; charset=utf-8',
                'Accept': 'application/json',
                'Cache-Control': 'no-cache',
                'Authorization': this.initial_current.Token
            });

            this.options = {
                headers: this.httpHeaders
            };

            this.basicRequest = {
                device_name: '',
                ip: "localhost",
                username: this.initial_current.Username
            };

        }
        else {
            this.router.navigateByUrl('login');
        }
    }

    public blacklist_get(company:string, code:string) {
        var filter = {
            device_name:'',
            ip:"localhost",
            username:this.initial_current.Username,
            company_code:company,
            language:"",
            worker_code:code
          };

        return this.http.post<any>(this.config.ApiRecruitmentModule + '/getblacklist', filter, this.options).toPromise()
            .then((res) => {
                let message = JSON.parse(res);
                return message.data;
            });
    }

    public blacklist_record(model: BlacklistModel) {
        const data = {
            company_code: this.initial_current.CompCode,
            worker_code: model.worker_code,
            reason_code: model.reason_code,
            blacklist_note: model.blacklist_note,
            modified_by: this.initial_current.Username
        };

        return this.http.post<any>(this.config.ApiRecruitmentModule + '/blacklist', data, this.options).toPromise()
            .then((res) => {
                return res;
            });
    }
    public blacklist_delete(model: BlacklistModel) {
        const data = {
            company_code: model.company_code,
            worker_code: model.worker_code,
            modified_by: this.initial_current.Username
        };

        return this.http.post<any>(this.config.ApiRecruitmentModule + '/blacklist_del', data, this.options).toPromise()
            .then((res) => {
                return res;
            });
    }

    public blacklist_import(file: File, file_name: string, file_type: string) {

        const formData = new FormData();
        formData.append('file', file);

        var para = "fileName=" + file_name + "." + file_type;
        para += "&token=" + this.initial_current.Token;
        para += "&by=" + this.initial_current.Username;

        return this.http.post<any>(this.config.ApiRecruitmentModule + '/doUploadMTBlacklistList?' + para, formData).toPromise()
            .then((res) => {
                return res;
            });
    }

    public SetBlacklist_record(Setup: BlacklistModel) {
        let emplists: any = []
        Setup.emp_data.forEach((res: EmployeeModel) => {
          let ss = {
            worker_code: res.worker_code
          }
          emplists.push(ss)
        })
        let data = {
          device_name: "",
          ip: "127.0.0.1",
          username: this.initial_current.Username,
          company_code: Setup.company_code || this.initial_current.CompCode,
          reason_code: Setup.reason_code,
          blacklist_note: Setup.blacklist_note,
          emp_data: emplists,
          modified_by: Setup.modified_by || this.initial_current.Username,
        }
        return this.http.post<any>(this.config.ApiRecruitmentModule + '/batchblacklist', data, this.options).toPromise()
          .then((res) => {
            // console.log(res)
            let message = JSON.parse(res);
            return message;
          });
      }
}
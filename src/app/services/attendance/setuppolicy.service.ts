import { Injectable } from '@angular/core';
import { AppConfig } from '../../config/config';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

import { InitialCurrent } from '../../config/initial_current';
import { SetPolicyAttModels } from 'src/app/models/attendance/setpolicyatt';
import { EmployeeModel } from 'src/app/models/employee/employee';

@Injectable({
    providedIn: 'root'
})
export class SetPolicyAttServices {

    public config: AppConfig = new AppConfig();
    public initial_current: InitialCurrent = new InitialCurrent();

    httpHeaders = new HttpHeaders({});
    options = {
        headers: this.httpHeaders
    };

    constructor(private http: HttpClient, private router: Router) {
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
        }
        else {
            this.router.navigateByUrl('login');
        }
    }

    public SetPolicyAtt_get(Setup: SetPolicyAttModels) {
        console.log('ATT001..');
        let emplists: any = []
        Setup.emp_data.forEach((res: EmployeeModel) => {
            let ss = {
                worker_code: res.worker_code
            }
            emplists.push(ss)
        })
        let data = {
            device_name: "phone",
            ip: "127.0.0.1",
            username: this.initial_current.Username,
            company_code: Setup.company_code || this.initial_current.CompCode,
            pol_code: Setup.pol_code,
            pol_type: Setup.pol_type,
            emp_data: emplists
        }
        return this.http.post<any>(this.config.ApiAttendanceModule + '/SetPolicyAtt_list', data, this.options).toPromise()
            .then((res) => {
                let message = JSON.parse(res);
                return message.data;
            });
    }

    public SetPolicyAtt_record(Setup: SetPolicyAttModels) {
        console.log('ATT002..');
        let emplists: any = []
        Setup.emp_data.forEach((res: EmployeeModel) => {
            let ss = {
                worker_code: res.worker_code
            }
            emplists.push(ss)
        })
        let data = {
            device_name: "phone",
            ip: "127.0.0.1",
            username: this.initial_current.Username,
            company_code: Setup.company_code || this.initial_current.CompCode,
            pol_code: Setup.pol_code,
            pol_type: Setup.pol_type,
            pol_note: Setup.pol_note,
            emp_data: emplists,
            modified_by: Setup.modified_by || this.initial_current.Username,
            flag: Setup.flag
        }
        console.log(data)
        return this.http.post<any>(this.config.ApiAttendanceModule + '/SetPolicyAtt', data, this.options).toPromise()
            .then((res) => {
                console.log(res)
                let message = JSON.parse(res);
                return message;
            });
    }
    public SetPolicyAtt_delete(Setup: SetPolicyAttModels) {
        console.log('ATT003..');
        let emplists: any = []
        Setup.emp_data.forEach((res: EmployeeModel) => {
            let ss = {
                worker_code: res.worker_code
            }
            emplists.push(ss)
        })
        let data = {
            device_name: "phone",
            ip: "127.0.0.1",
            username: this.initial_current.Username,
            company_code: Setup.company_code || this.initial_current.CompCode,
            pol_code: Setup.pol_code,
            pol_type: Setup.pol_type,
            emp_data: emplists
        }
        return this.http.post<any>(this.config.ApiAttendanceModule + '/SetPolicyAtt_del', data, this.options).toPromise()
            .then((res) => {
                console.log(res)
                let message = JSON.parse(res);
                return message;
            });
    }
}

import { Injectable } from '@angular/core';
import { AppConfig } from '../../config/config';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

import { InitialCurrent } from '../../config/initial_current';
import { EmpattitemModel } from 'src/app/models/attendance/empattitem';
import { EmployeeModel } from 'src/app/models/employee/employee';

@Injectable({
    providedIn: 'root'
})
export class EmpAttItemServices {

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

    public EmpAttItem_get(Setup: EmpattitemModel) {
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
            emp_data: emplists
        }
        return this.http.post<any>(this.config.ApiAttendanceModule + '/polattpay_list', data, this.options).toPromise()
            .then((res) => {
                let message = JSON.parse(res);
                return message.data;
            });
    }

    public EmpAttItem_record(Setup: EmpattitemModel) {
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
            item_sa: Setup.item_sa,
            item_ot: Setup.item_ot,
            item_aw: Setup.item_aw,
            item_dg: Setup.item_dg,
            item_lv: Setup.item_lv,
            item_ab: Setup.item_ab,
            item_lt: Setup.item_lt,          
            emp_data: emplists,            
            modified_by: Setup.modified_by || this.initial_current.Username,            
        }
        console.log(data)
        return this.http.post<any>(this.config.ApiAttendanceModule + '/polattpays', data, this.options).toPromise()
            .then((res) => {
                console.log(res)
                let message = JSON.parse(res);
                return message;
            });
    }
    public EmpAttItem_delete(Setup: EmpattitemModel) {
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
            emp_data: emplists
        }
        return this.http.post<any>(this.config.ApiAttendanceModule + '/polattpay_del', data, this.options).toPromise()
            .then((res) => {
                console.log(res)
                let message = JSON.parse(res);
                return message;
            });
    }
}

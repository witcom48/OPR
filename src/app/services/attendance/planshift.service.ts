import { Injectable } from '@angular/core';
import { AppConfig } from '../../config/config';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

import { InitialCurrent } from '../../config/initial_current';
import { ShiftplanModels } from 'src/app/models/attendance/shift_plan';
import { PlanscheduleModels } from 'src/app/models/attendance/planschedule';

@Injectable({
    providedIn: 'root'
})
export class PlanshiftServices {

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

    public planshift_get(ShiftPlan: ShiftplanModels) {
        // console.log('ATT001..');
        let data = {
            device_name: "phone",
            ip: "127.0.0.1",
            username: this.initial_current.Username,
            company_code: ShiftPlan.company_code || this.initial_current.CompCode,
            planshift_id: ShiftPlan.planshift_id,
            planshift_code: ShiftPlan.planshift_code
        }
        return this.http.post<any>(this.config.ApiAttendanceModule + '/planshift_list', data, this.options).toPromise()
            .then((res) => {
                let message = JSON.parse(res);
                return message.data;
            });
    }

    public planshift_record(ShiftPlan: ShiftplanModels) {
        // console.log('ATT002..');
        let planschedule: any = []
        ShiftPlan.planschedule.forEach((res: PlanscheduleModels) => {
            let ss = {
                "company_code": ShiftPlan.company_code || this.initial_current.CompCode,
                "planshift_code": ShiftPlan.planshift_code,
                "planschedule_fromdate": res.planschedule_fromdate,
                "planschedule_todate": res.planschedule_todate,
                "shift_code": res.shift_code,
                "planschedule_sun_off": res.planschedule_sun_off ? "N" : "Y",
                "planschedule_mon_off": res.planschedule_mon_off ? "N" : "Y",
                "planschedule_tue_off": res.planschedule_tue_off ? "N" : "Y",
                "planschedule_wed_off": res.planschedule_wed_off ? "N" : "Y",
                "planschedule_thu_off": res.planschedule_thu_off ? "N" : "Y",
                "planschedule_fri_off": res.planschedule_fri_off ? "N" : "Y",
                "planschedule_sat_off": res.planschedule_sat_off ? "N" : "Y",
                "modified_by": "Admin",
                "flag": false
            }
            planschedule.push(ss)
        })
        let data = {
            device_name: "phone",
            ip: "127.0.0.1",
            username: this.initial_current.Username,
            company_code: ShiftPlan.company_code || this.initial_current.CompCode,
            planshift_id: ShiftPlan.planshift_id,
            planshift_code: ShiftPlan.planshift_code,
            planshift_name_th: ShiftPlan.planshift_name_th,
            planshift_name_en: ShiftPlan.planshift_name_en,
            modified_by: this.initial_current.Username,
            flag: ShiftPlan.flag,
            planschedule: planschedule
        }
        return this.http.post<any>(this.config.ApiAttendanceModule + '/planshift', data, this.options).toPromise()
            .then((res) => {
                // console.log(res)
                let message = JSON.parse(res);
                return message;
            });
    }
    public planshift_delete(ShiftPlan: ShiftplanModels) {
        // console.log('ATT003..');
        let data = {
            device_name: "phone",
            ip: "127.0.0.1",
            username: this.initial_current.Username,
            company_code: ShiftPlan.company_code || this.initial_current.CompCode,
            planshift_id: ShiftPlan.planshift_id,
            planshift_code: ShiftPlan.planshift_code,
        }
        return this.http.post<any>(this.config.ApiAttendanceModule + '/planshift_del', data, this.options).toPromise()
            .then((res) => {
                // console.log(res)
                let message = JSON.parse(res);
                return message;
            });
    }


    public planshift_import(file: File, file_name: string, file_type: string) {
        // console.log('ATT004..');
        const formData = new FormData();
        formData.append('file', file);

        var para = "fileName=" + file_name + "." + file_type;
        para += "&token=" + this.initial_current.Token;
        para += "&by=" + this.initial_current.Username;

        return this.http.post<any>(this.config.ApiAttendanceModule + '/doUploadMTPlanshift?' + para, formData).toPromise()
            .then((res) => {
                let message = JSON.parse(res);
                return message;
            });
    }

}

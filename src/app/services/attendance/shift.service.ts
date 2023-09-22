import { Injectable } from '@angular/core';
import { AppConfig } from '../../config/config';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

import { InitialCurrent } from '../../config/initial_current';
import { ShiftModels } from 'src/app/models/attendance/shift';

@Injectable({
    providedIn: 'root'
})
export class ShiftServices {

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

    public shift_get(Shift: ShiftModels) {
        // console.log('ATT001..');
        let data = {
            device_name: "phone",
            ip: "127.0.0.1",
            username: this.initial_current.Username,
            company_code: Shift.company_code || this.initial_current.CompCode,
            shift_id: Shift.shift_id,
            shift_code: Shift.shift_code,
            project: Shift.project
        }
        return this.http.post<any>(this.config.ApiAttendanceModule + '/shift_list', data, this.options).toPromise()
            .then((res) => {
                let message = JSON.parse(res);
                return message.data;
            });
    }

    public shift_record(Shift: ShiftModels) {
        // console.log('ATT002..');
        let data = {
            device_name: "phone",
            ip: "127.0.0.1",
            username: this.initial_current.Username,
            company_code: Shift.company_code || this.initial_current.CompCode,
            shift_id: Shift.shift_id,
            shift_code: Shift.shift_code,
            shift_name_th: Shift.shift_name_th,
            shift_name_en: Shift.shift_name_en,
            shift_ch1: Shift.shift_ch1 || "00:00" || "00:00",
            shift_ch2: Shift.shift_ch2 || "00:00",
            shift_ch3: Shift.shift_ch3 || "00:00",
            shift_ch4: Shift.shift_ch4 || "00:00",
            shift_ch5: Shift.shift_ch5 || "00:00",
            shift_ch6: Shift.shift_ch6 || "00:00",
            shift_ch7: Shift.shift_ch7 || "00:00",
            shift_ch8: Shift.shift_ch8 || "00:00",
            shift_ch9: Shift.shift_ch9 || "00:00",
            shift_ch10: Shift.shift_ch10 || "00:00",
            shift_ch3_from: Shift.shift_ch3_from || "00:00",
            shift_ch3_to: Shift.shift_ch3_to || "00:00",
            shift_ch4_from: Shift.shift_ch4_from || "00:00",
            shift_ch4_to: Shift.shift_ch4_to || "00:00",
            shift_ch7_from: Shift.shift_ch7_from || "00:00",
            shift_ch7_to: Shift.shift_ch7_to || "00:00",
            shift_ch8_from: Shift.shift_ch8_from || "00:00",
            shift_ch8_to: Shift.shift_ch8_to || "00:00",
            shift_otin_min: Shift.shift_otin_min,
            shift_otin_max: Shift.shift_otin_max,
            shift_otout_min: Shift.shift_otout_min,
            shift_otout_max: Shift.shift_otout_max,
            modified_by: this.initial_current.Username,
            flag: Shift.flag,
            project: Shift.project,
            shift_flexiblebreak: Shift.shift_flexiblebreak,
            shift_break: Shift.shift_break,
            shift_allowance: Shift.shift_allowance
        }
        return this.http.post<any>(this.config.ApiAttendanceModule + '/shift', data, this.options).toPromise()
            .then((res) => {
                // console.log(res)
                let message = JSON.parse(res);
                return message;
            });
    }
    public shift_delete(Shift: ShiftModels) {
        // console.log('ATT003..');
        let data = {
            device_name: "phone",
            ip: "127.0.0.1",
            username: this.initial_current.Username,
            company_code: Shift.company_code || this.initial_current.CompCode,
            shift_id: Shift.shift_id,
            shift_code: Shift.shift_code,
        }
        return this.http.post<any>(this.config.ApiAttendanceModule + '/shift_del', data, this.options).toPromise()
            .then((res) => {
                // console.log(res)
                let message = JSON.parse(res);
                return message;
            });
    }


    public shift_import(file: File, file_name: string, file_type: string) {
        // console.log('ATT004..');
        const formData = new FormData();
        formData.append('file', file);

        var para = "fileName=" + file_name + "." + file_type;
        para += "&token=" + this.initial_current.Token;
        para += "&by=" + this.initial_current.Username;
        para += "&com=" + this.initial_current.CompCode;

        return this.http.post<any>(this.config.ApiAttendanceModule + '/doUploadMTShift?' + para, formData).toPromise()
            .then((res) => {
                let message = JSON.parse(res);
                return message;
            });
    }

}

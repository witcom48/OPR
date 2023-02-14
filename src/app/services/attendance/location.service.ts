import { Injectable } from '@angular/core';
import { AppConfig } from '../../config/config';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

import { InitialCurrent } from '../../config/initial_current';
import { LocationModels } from 'src/app/models/attendance/location';

@Injectable({
    providedIn: 'root'
})
export class LocationServices {

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

    public location_get(Location: LocationModels) {
        console.log('ATT001..');
        let data = {
            device_name: "phone",
            ip: "127.0.0.1",
            username: this.initial_current.Username,
            company_code: Location.company_code || this.initial_current.CompCode,
            location_id: Location.location_id,
            location_code: Location.company_code
        }
        return this.http.post<any>(this.config.ApiAttendanceModule + '/location_list', data, this.options).toPromise()
            .then((res) => {
                let message = JSON.parse(res);
                return message.data;
            });
    }

    public location_record(Location: LocationModels) {
        console.log('ATT002..');
        let data = {
            device_name: "phone",
            ip: "127.0.0.1",
            username: this.initial_current.Username,
            company_code: Location.company_code || this.initial_current.CompCode,
            location_id: Location.location_id,
            location_code: Location.location_code,
            location_name_th: Location.location_name_th,
            location_name_en: Location.location_name_en,
            location_detail: Location.location_detail,
            location_lat: Location.location_lat,
            location_long: Location.location_long,
            modified_by: this.initial_current.Username,
            flag: Location.flag
        }
        console.log(data)
        return this.http.post<any>(this.config.ApiAttendanceModule + '/location', data, this.options).toPromise()
            .then((res) => {
                console.log(res)
                let message = JSON.parse(res);
                return message;
            });
    }
    public location_delete(Location: LocationModels) {
        console.log('ATT003..');
        let data = {
            device_name: "phone",
            ip: "127.0.0.1",
            username: this.initial_current.Username,
            company_code: Location.company_code || this.initial_current.CompCode,
            location_id: Location.location_id
        }
        return this.http.post<any>(this.config.ApiAttendanceModule + '/location_del', data, this.options).toPromise()
            .then((res) => {
                console.log(res)
                let message = JSON.parse(res);
                return message;
            });
    }


    public location_import(file: File, file_name: string, file_type: string) {
        console.log('ATT004..');
        const formData = new FormData();
        formData.append('file', file);

        var para = "fileName=" + file_name + "." + file_type;
        para += "&token=" + this.initial_current.Token;
        para += "&by=" + this.initial_current.Username;

        return this.http.post<any>(this.config.ApiAttendanceModule + '/doUploadMTLocation?' + para, formData).toPromise()
            .then((res) => {
                let message = JSON.parse(res);
                return message;
            });
    }

}

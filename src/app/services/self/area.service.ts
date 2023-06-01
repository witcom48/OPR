import { Injectable } from '@angular/core';
import { AppConfig } from '../../config/config';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

import { InitialCurrent } from '../../config/initial_current';
import { MTAreaModel } from 'src/app/models/self/MTArea';

@Injectable({
    providedIn: 'root'
})
export class AreaServices {

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

    public area_get(area: MTAreaModel) {
        console.log('ATT001..');
        let data = {
            device_name: "phone",
            ip: "127.0.0.1",
            username: this.initial_current.Username,
            company_code: area.company_code || this.initial_current.CompCode,
            area_id: area.area_id,
            location_code: area.location_code,
            project_code: area.project_code,
            worker_code:area.worker_code
        }
        return this.http.post<any>(this.config.ApiSelfServicesModule + '/area_list', data, this.options).toPromise()
            .then((res) => {
                let message = JSON.parse(res);
                return message.data;
            });
    }

    public area_record(area: MTAreaModel) {
        console.log('ATT002..');
        let data = {
            device_name: "phone",
            ip: "127.0.0.1",
            username: this.initial_current.Username,
            company_code: area.company_code || this.initial_current.CompCode,
            area_id: area.area_id,
            area_lat: area.area_lat,
            area_long: area.area_long,
            area_distance: area.area_distance,
            location_code: area.location_code,
            project_code: area.project_code,
            flag: area.flag,
            area_data: area.area_data
        }
        return this.http.post<any>(this.config.ApiSelfServicesModule + '/area', data, this.options).toPromise()
            .then((res) => {
                console.log(res)
                let message = JSON.parse(res);
                return message;
            });
    }
    public area_delete(area: MTAreaModel) {
        console.log('ATT003..');
        let data = {
            device_name: "phone",
            ip: "127.0.0.1",
            username: this.initial_current.Username,
            company_code: area.company_code || this.initial_current.CompCode,
            area_id: area.area_id,
            location_code: area.location_code
        }
        return this.http.post<any>(this.config.ApiSelfServicesModule + '/area_del', data, this.options).toPromise()
            .then((res) => {
                console.log(res)
                let message = JSON.parse(res);
                return message;
            });
    }
}

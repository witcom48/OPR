import { Injectable } from '@angular/core';
import { PrjectModel } from '../../models/project/project';
import { AppConfig } from '../../config/config';
import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { Router } from '@angular/router';
import { InitialCurrent } from '../../config/initial_current';
import { ReligionModel } from 'src/app/models/system/religion';
import { YearPeriodModels } from 'src/app/models/system/yearperiod';

@Injectable({
  providedIn: 'root'
})
export class YearService {

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

    public year_get(Year: YearPeriodModels) {
        console.log('ATT001..');
        let data = {
            device_name: "Desktop",
            ip: "127.0.0.1",
            username: this.initial_current.Username,
            company_code: Year.company_code || this.initial_current.CompCode,
            year_id: Year.year_id,
            year_code: Year.year_code,
            year_name_th: Year.year_name_th,
            year_name_en: Year.year_name_en,
            year_fromdate: Year.year_fromdate,
            year_todate: Year.year_todate,
            year_group: Year.year_group,
            modified_by: this.initial_current.Username,
            fag: false

        }
        return this.http.post<any>(this.config.ApiAttendanceModule + '/year_list', data, this.options).toPromise()
            .then((res) => {
                let message = JSON.parse(res);
                return message.data;
            });
    }

    public year_record(Year: YearPeriodModels) {
        console.log('ATT002..');
        let data = {
            device_name: "Desktop",
            ip: "127.0.0.1",
            username: this.initial_current.Username,
            company_code: Year.company_code || this.initial_current.CompCode,
            year_id: Year.year_id,
            year_code: Year.year_code,
            year_name_th: Year.year_name_th,
            year_name_en: Year.year_name_en,
            year_fromdate: Year.year_fromdate,
            year_todate: Year.year_todate,
            year_group: Year.year_group,
            modified_by: this.initial_current.Username,
            fag: false

        }
        return this.http.post<any>(this.config.ApiAttendanceModule + '/year', data, this.options).toPromise()
            .then((res) => {
                console.log(res)
                let message = JSON.parse(res);
                return message;
            });
    }
    public year_delete(Year: YearPeriodModels) {
        console.log('ATT003..');
        let data = {
            device_name: "Desktop",
            ip: "127.0.0.1",
            username: this.initial_current.Username,
            company_code: Year.company_code || this.initial_current.CompCode,
            year_id: Year.year_id,
            year_code: Year.year_code,
            year_name_th: Year.year_name_th,
            year_name_en: Year.year_name_en,
            year_fromdate: Year.year_fromdate,
            year_todate: Year.year_todate,
            year_group: Year.year_group,
            modified_by: this.initial_current.Username,
            fag: false

        }
        return this.http.post<any>(this.config.ApiAttendanceModule + '/year_del', data, this.options).toPromise()
            .then((res) => {
                console.log(res)
                let message = JSON.parse(res);
                return message;
            });
    }


    public year_import(file: File, file_name: string, file_type: string) {
        console.log('ATT004..');
        const formData = new FormData();
        formData.append('file', file);

        var para = "fileName=" + file_name + "." + file_type;
        para += "&token=" + this.initial_current.Token;
        para += "&by=" + this.initial_current.Username;

        return this.http.post<any>(this.config.ApiAttendanceModule + '/doUploadYear?' + para, formData).toPromise()
            .then((res) => {
                let message = JSON.parse(res);
                return message;
            });
    }

}

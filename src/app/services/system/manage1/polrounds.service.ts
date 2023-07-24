import { Injectable } from '@angular/core';
import { ProjectModel } from '../../../models/project/project';
import { AppConfig } from '../../../config/config';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { InitialCurrent } from '../../../config/initial_current';
import { MTPolroundsModel } from 'src/app/models/system/manage/polrounds';

@Injectable({
  providedIn: 'root'
})
export class PolroundsService {

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

    public polround_get(company_code : string) {
        // console.log('POLR001..');
        var filter = {
            device_name:'',
            ip:"localhost",
            username:this.initial_current.Username,
            language:"",
            company_code:company_code,
    
          };

        return this.http
            .post<any>(
                this.config.ApiSystemModule + '/polround_list',filter,this.options
            )
            .toPromise()
            .then((res) => {
                let message = JSON.parse(res);
                // console.log(res);
                return message.data;
            });
    }

    public polround_record(model: MTPolroundsModel) {
        // console.log('POLR002..');
        const data = {
            company_code: this.initial_current.CompCode,
            polround_pf: model.polround_pf,
            polround_sso: model.polround_sso,
            polround_tax: model.polround_tax,
            polround_wage_day: model.polround_wage_day,
            polround_wage_summary: model.polround_wage_summary,
            polround_ot_day: model.polround_ot_day,
            polround_ot_summary: model.polround_ot_summary,
            polround_absent: model.polround_absent,
            polround_late: model.polround_late,
            polround_loan: model.polround_loan,
            polround_leave: model.polround_leave,
            polround_netpay: model.polround_netpay,
            polround_timelate: model.polround_timelate,
            polround_timeleave: model.polround_timeleave,
            polround_timeot: model.polround_timeot,
            polround_timeworking: model.polround_timeworking,
            

            modified_by: this.initial_current.Username,
        };

        return this.http
            .post<any>(
                this.config.ApiSystemModule + '/polround',
                data,
                this.options
            )
            .toPromise()
            .then((res) => {
                //// console.log(res)
                return res;
            });
    }

    public polround_delete(model: MTPolroundsModel) {
        // console.log('POLR003..');
        const data = {
            company_code: this.initial_current.CompCode,
            polround_pf: model.polround_pf,
            polround_sso: model.polround_sso,
            polround_tax: model.polround_tax,
            polround_wage_day: model.polround_wage_day,
            polround_wage_summary: model.polround_wage_summary,
            polround_ot_day: model.polround_ot_day,
            polround_ot_summary: model.polround_ot_summary,
            polround_absent: model.polround_absent,
            polround_late: model.polround_late,
            polround_leave: model.polround_leave,
            polround_netpay: model.polround_netpay,
            polround_timelate: model.polround_timelate,
            polround_timeleave: model.polround_timeleave,
            polround_timeot: model.polround_timeot,
            polround_loan: model.polround_loan,

            polround_timeworking: model.polround_timeworking,
            modified_by: this.initial_current.Username,

        };

        return this.http
            .post<any>(
                this.config.ApiSystemModule + '/polround_del',
                data,
                this.options
            )
            .toPromise()
            .then((res) => {
                return res;
            });
    }

    public polround_import(file: File, file_name: string, file_type: string) {
        const formData = new FormData();
        formData.append('file', file);

        var para = 'fileName=' + file_name + '.' + file_type;
        para += '&token=' + this.initial_current.Token;
        para += '&by=' + this.initial_current.Username;

        return this.http
            .post<any>(
                this.config.ApiSystemModule + '/doUploadPolround?' + para,
                formData
            )
            .toPromise()
            .then((res) => {
                return res;
            });
    }
}

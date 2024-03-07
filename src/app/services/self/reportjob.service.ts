import { Injectable } from '@angular/core';
import { AppConfig } from '../../config/config';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

import { InitialCurrent } from '../../config/initial_current';
import { DatePipe } from '@angular/common';
import { ReportjobModel } from 'src/app/models/self/reportjob';
import { ReportjobwhoseModel } from 'src/app/models/self/reportjobwhose';

@Injectable({
    providedIn: 'root'
})
export class ReportjobService {

    public config: AppConfig = new AppConfig();
    public initial_current: InitialCurrent = new InitialCurrent();

    httpHeaders = new HttpHeaders({});
    options = {
        headers: this.httpHeaders
    };

    constructor(private http: HttpClient, private router: Router, private datePipe: DatePipe,) {
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

    //   getreportjobList(com_code:string){

    //     let parameter = "?com=" + com_code;
    //     return this.http.get(this.config.ApiSelfServicesModule + '/getSYSreportjobList' + parameter).pipe(map(res => res.json()));

    //   }

    //   getreportjobWhoseList(job_id:string){  

    //     let parameter = "?id=" + job_id;
    //     return this.http.get(this.config.ApiSelfServicesModule + '/getSYSreportjobWhoseList' + parameter).pipe(map(res => res.json()));

    //   }

    public doManage(reportDetail: ReportjobModel, whoseList: ReportjobwhoseModel[]) {

        var whose_data: string = "[";

        for (let i = 0; i < whoseList.length; i++) {
            whose_data = whose_data + "{";
            whose_data = whose_data + "\"worker_code\":\"" + (whoseList[i].worker_code) + "\"";
            whose_data = whose_data + ",\"reportjob_id\":\"" + "1" + "\"";
            whose_data = whose_data + "}" + ",";
        }

        if (whose_data.length > 2) {
            whose_data = whose_data.substr(0, whose_data.length - 1);
        }

        whose_data = whose_data + "]";

        var specificData = {
            reportjob_id: reportDetail.reportjob_id,
            reportjob_ref: reportDetail.reportjob_ref,
            reportjob_type: reportDetail.reportjob_type,
            reportjob_status: reportDetail.reportjob_status,
            reportjob_language: reportDetail.reportjob_language,
            reportjob_fromdate: this.datePipe.transform(reportDetail.reportjob_fromdate, 'yyyy-MM-dd HH:mm:ss'),
            reportjob_todate: this.datePipe.transform(reportDetail.reportjob_todate, 'yyyy-MM-dd HH:mm:ss'),
            reportjob_paydate: this.datePipe.transform(reportDetail.reportjob_paydate, 'yyyy-MM-dd HH:mm:ss'),
            company_code: reportDetail.company_code,
            reportjob_section: reportDetail.reportjob_section,

            reportjob_whose: whose_data,

            created_by: this.initial_current.Username
        };

        return this.http.post<any>(this.config.ApiSelfServicesModule + '/doManageSYSReportjob', specificData, this.options).toPromise()
            .then((res) => {
                console.log(res)
                let message = JSON.parse(res);
                return message;
            });

    }

}

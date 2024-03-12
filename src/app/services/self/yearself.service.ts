import { Injectable } from '@angular/core';
import { Http, Headers , RequestOptions,URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs';
import { map } from "rxjs/operators";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { YearPeriodModels } from 'src/app/models/system/policy/yearperiod';
import { AppConfig } from 'src/app/config/config';
import { InitialCurrent } from 'src/app/config/initial_current';

@Injectable({
  providedIn: 'root'
})
export class YearsSelfService {

  public config: AppConfig = new AppConfig();
  public initial_current: InitialCurrent = new InitialCurrent();
  constructor(private http: HttpClient) {  }

  getList(com_code: string, group_code: string): Observable<any> {
    let parameter = "?com=" + com_code + "&group=" + group_code;
    return this.http.get(this.config.ApiSystemModule + '/getMTYearList' + parameter);
  }

  doManage(yearDetail: YearPeriodModels): Observable<any> {
    var headers = new HttpHeaders({
      'Content-Type': 'application/json; charset=UTF-8'
    });
    var specificData = {
      year_id: yearDetail.year_id,
      year_code: yearDetail.year_code,
      year_name_th: yearDetail.year_name_th,
      year_name_en: yearDetail.year_name_en,
      year_fromdate: yearDetail.year_fromdate,
      year_todate: yearDetail.year_todate,
      year_group: yearDetail.year_group,
      company_code: yearDetail.company_code,
      modified_by: this.initial_current.Username
    };
    return this.http.post(this.config.ApiSystemModule + '/doManageMTYear', specificData, { headers: headers });
  }

  doDelete(yearDetail: YearPeriodModels): Observable<any> {
    var headers = new HttpHeaders({
      'Content-Type': 'application/json; charset=UTF-8'
    });
    var specificData = {
      year_id: yearDetail.year_id,
      company_code: yearDetail.company_code,
      modified_by: this.initial_current.Username
    };
    return this.http.post(this.config.ApiSystemModule + '/doDeleteMTYear', specificData, { headers: headers });
  }

}


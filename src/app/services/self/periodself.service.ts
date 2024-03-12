import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { DatePipe } from '@angular/common';
import { AppConfig } from 'src/app/config/config';
import { InitialCurrent } from 'src/app/config/initial_current';
import { PeriodsModels } from 'src/app/models/payroll/periods';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PeriodSelfService {

  public config: AppConfig = new AppConfig();
  public initial_current: InitialCurrent = new InitialCurrent();

  constructor(
    private http: HttpClient,
    private datePipe: DatePipe
  ) { }

  getList(com_code: string, period_type: string, emptype_code: string, year_code: string) : Observable<any> {
    let parameter = "?com=" + com_code + "&type=" + period_type + "&emptype=" + emptype_code + "&year=" + year_code;
    return this.http.get(this.config.ApiSystemModule + '/getMTPeriodList' + parameter);
  }

  getList2(com_code: string, period_type: string, emptype_code: string, year_code: string, date_from: Date, date_to: Date) {
    let datefrom = this.datePipe.transform(date_from, 'yyyy-MM-dd');
    let dateto = this.datePipe.transform(date_to, 'yyyy-MM-dd');
    let parameter = "?com=" + com_code + "&type=" + period_type + "&emptype=" + emptype_code + "&year=" + year_code + "&fromdate=" + datefrom + "&todate=" + dateto;
    return this.http.get(this.config.ApiSystemModule + '/getMTPeriodList2' + parameter);
  }

  doManage(model: PeriodsModels) {
    var headers = new HttpHeaders({
      'Content-Type': 'application/json; charset=UTF-8'
    });
    var specificData = {
      company_code: model.company_code,
      period_id: model.period_id,
      period_type: model.period_type,
      emptype_code: model.emptype_code,
      year_code: model.year_code,
      period_no: model.period_no,
      period_name_th: model.period_name_th,
      period_name_en: model.period_name_en,
      period_from: model.period_from,
      period_to: model.period_to,
      period_payment: model.period_payment,
      period_dayonperiod: model.period_dayonperiod,
      period_closeta: model.period_closeta,
      period_closepr: model.period_closepr,
      changestatus_by: this.initial_current.Username,
      modified_by: this.initial_current.Username
    };
    return this.http.post(this.config.ApiSystemModule + '/doManageMTPeriod', specificData, { headers: headers });
  }

  doDelete(model: PeriodsModels) {
    var headers = new HttpHeaders({
      'Content-Type': 'application/json; charset=UTF-8'
    });
    var specificData = {
      period_id: model.period_id,
      modified_by: this.initial_current.Username
    };
    return this.http.post(this.config.ApiSystemModule + '/doDeleteMTPeriod', specificData, { headers: headers });
  }
}

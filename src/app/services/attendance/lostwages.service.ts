import { Injectable } from '@angular/core';
import { AppConfig } from '../../config/config';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';

import { InitialCurrent } from '../../config/initial_current';
import { EmployeeModel } from 'src/app/models/employee/employee';
import { LostwagesModel } from 'src/app/models/attendance/Lostwages';

@Injectable({
  providedIn: 'root'
})
export class LostwagesService {

  public config: AppConfig = new AppConfig();

  public initial_current: InitialCurrent = new InitialCurrent();

  httpHeaders = new HttpHeaders({});
  options = {
    headers: this.httpHeaders
  };

  basicRequest = {
    device_name: '',
    ip: '',
    username: ''
  };

  constructor(private http: HttpClient, private router: Router, private datePipe: DatePipe) {
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

      this.basicRequest = {
        device_name: '',
        ip: "localhost",
        username: this.initial_current.Username
      };

    }
    else {
      this.router.navigateByUrl('login');
    }
  }

  //AttApprove_get_withstatus
  public AttApprove_ge_getbyfillter(model: LostwagesModel ) {

    const fillterS = {
      device_name: '',
      ip: "localhost",
      username: this.initial_current.Username,
      language: "",
      company: model.company_code,

       project_code: model.project_code,
      projob_code: model.projob_code,
      worker_code: model.worker_code,

      lostwages_status: model.lostwages_status,
      //
      lostwages_type: model.lostwages_type,

      //
      lostwages_salary: model.lostwages_salary,
      lostwages_diligence: model.lostwages_diligence,
      lostwages_travelexpenses: model.lostwages_travelexpenses,
      lostwages_other: model.lostwages_other,
      //
      lostwages_initial: model.lostwages_initial,
      lostwages_cardno: model.lostwages_cardno,
      lostwages_gender: model.lostwages_gender,
      lostwages_fname_th: model.lostwages_fname_th,
      lostwages_laname_th: model.lostwages_laname_th,

      //


      lostwages_workdate: model.lostwages_workdate,
      lostwages_daytype: model.lostwages_daytype,
      shift_code: model.shift_code,
      lostwages_color: model.lostwages_color,

      lostwages_lock: model.lostwages_lock,

      lostwages_ch1: this.datePipe.transform(model.lostwages_ch1, 'yyyy-MM-dd HH:mm:ss'),
      lostwages_ch2: this.datePipe.transform(model.lostwages_ch2, 'yyyy-MM-dd HH:mm:ss'),
      lostwages_ch3: this.datePipe.transform(model.lostwages_ch3, 'yyyy-MM-dd HH:mm:ss'),
      lostwages_ch4: this.datePipe.transform(model.lostwages_ch4, 'yyyy-MM-dd HH:mm:ss'),
      lostwages_ch5: this.datePipe.transform(model.lostwages_ch5, 'yyyy-MM-dd HH:mm:ss'),
      lostwages_ch6: this.datePipe.transform(model.lostwages_ch6, 'yyyy-MM-dd HH:mm:ss'),
      lostwages_ch7: this.datePipe.transform(model.lostwages_ch7, 'yyyy-MM-dd HH:mm:ss'),
      lostwages_ch8: this.datePipe.transform(model.lostwages_ch8, 'yyyy-MM-dd HH:mm:ss'),
      lostwages_ch9: this.datePipe.transform(model.lostwages_ch9, 'yyyy-MM-dd HH:mm:ss'),
      lostwages_ch10: this.datePipe.transform(model.lostwages_ch10, 'yyyy-MM-dd HH:mm:ss'),

      lostwages_before_min: model.lostwages_before_min,
      lostwages_work1_min: model.lostwages_work1_min,
      lostwages_work2_min: model.lostwages_work2_min,
      lostwages_break_min: model.lostwages_break_min,
      lostwages_after_min: model.lostwages_after_min,

      lostwages_before_min_app: model.lostwages_before_min_app,
      lostwages_work1_min_app: model.lostwages_work1_min_app,
      lostwages_work2_min_app: model.lostwages_work2_min_app,
      lostwages_break_min_app: model.lostwages_break_min_app,
      lostwages_after_min_app: model.lostwages_after_min_app,

      lostwages_late_min: model.lostwages_late_min,
      lostwages_late_min_app: model.lostwages_late_min_app,


      modified_by: this.initial_current.Username
 



      // company_code: fillter.company_code,

      // projobemp_id: fillter.projobemp_id,
      // projobemp_emp: fillter.projobemp_emp,
      // projobemp_fromdate: this.datePipe.transform(fillter.projobemp_fromdate),
      // projobemp_todate: this.datePipe.transform(fillter.projobemp_todate),
      // projobemp_type: fillter.projobemp_type,
      // projobemp_status: fillter.projobemp_status,
      // projob_code: fillter.projob_code,
      // project_code: fillter.project_code,

      // ///
      // project_name_th: fillter.project_name_th,
      // project_name_en: fillter.project_name_en,
      // project_name_sub: fillter.project_name_sub,
      // project_codecentral: fillter.project_codecentral,
      // project_protype: fillter.project_protype,
      // project_probusiness: fillter.project_probusiness,
      // searchemp: fillter.searchemp,

    };

    return this.http.post<any>(this.config.ApiAttendanceModule + '/Att_Approve_list',fillterS, this.options).toPromise()
    .then((res) => {
      let message = JSON.parse(res);
      //// console.log(res)
      return message.data;
      });

  }
  //
  public AttApprove_get_withstatus(company: string, project: string, worker: string, cardno: string , status: string ) {
 
    var filter = {
      device_name: '',
      ip: "localhost",
      username: this.initial_current.Username,
      company: company,
      language: this.initial_current.Language,
      project_code: project,
      worker_code: worker,
      lostwages_cardno:cardno,
      lostwages_status:status,


    
    };


    return this.http.post<any>(this.config.ApiAttendanceModule + '/Att_Approve_list', filter, this.options).toPromise()
      .then((res) => {
        let message = JSON.parse(res);
        //// console.log(res)
        return message.data;
      });
  }
  //
  // public AttApprove_get_withstatus(company: string, project: string, status: string) {


  //   var filter = {
  //     device_name: '',
  //     ip: "localhost",
  //     username: this.initial_current.Username,
  //     company: company,
  //     language: "",
  //     project_code: project,
  //     worker_code: "",
  //     lostwages_cardno: "",
  //     status: status
 
  //   };

  //   return this.http.post<any>(this.config.ApiAttendanceModule + '/Att_Approve_list', filter, this.options).toPromise()
  //     .then((res) => {
  //       let message = JSON.parse(res);
  //       return message.data;
  //     });
  // }
  //
  //
  public lostwages_get(company: string, project: string, worker: string, cardno: string, fromdate: Date, todate: Date) {

    let datefrom = this.datePipe.transform(fromdate, 'yyyy-MM-dd');
    let dateto = this.datePipe.transform(todate, 'yyyy-MM-dd');

    var filter = {
      device_name: '',
      ip: "localhost",
      username: this.initial_current.Username,
      company: company,
      language: this.initial_current.Language,
      project_code: project,
      worker_code: worker,
      lostwages_cardno:cardno,

      fromdate: datefrom,
      todate: dateto,
    };


    return this.http.post<any>(this.config.ApiAttendanceModule + '/Lostwages_list', filter, this.options).toPromise()
      .then((res) => {
        let message = JSON.parse(res);
        //// console.log(res)
        return message.data;
      });
  }

  public lostwages_record(model: LostwagesModel) {

    var data = {

      company_code: model.company_code,
      project_code: model.project_code,
      projob_code: model.projob_code,
      worker_code: model.worker_code,

      lostwages_status: model.lostwages_status,
      //
      lostwages_type: model.lostwages_type,

      //
      lostwages_salary: model.lostwages_salary,
      lostwages_diligence: model.lostwages_diligence,
      lostwages_travelexpenses: model.lostwages_travelexpenses,
      lostwages_other: model.lostwages_other,
      //
      lostwages_initial: model.lostwages_initial,
      lostwages_cardno: model.lostwages_cardno,
      lostwages_gender: model.lostwages_gender,
      lostwages_fname_th: model.lostwages_fname_th,
      lostwages_laname_th: model.lostwages_laname_th,

      //


      lostwages_workdate: model.lostwages_workdate,
      lostwages_daytype: model.lostwages_daytype,
      shift_code: model.shift_code,
      lostwages_color: model.lostwages_color,

      lostwages_lock: model.lostwages_lock,

      lostwages_ch1: this.datePipe.transform(model.lostwages_ch1, 'yyyy-MM-dd HH:mm:ss'),
      lostwages_ch2: this.datePipe.transform(model.lostwages_ch2, 'yyyy-MM-dd HH:mm:ss'),
      lostwages_ch3: this.datePipe.transform(model.lostwages_ch3, 'yyyy-MM-dd HH:mm:ss'),
      lostwages_ch4: this.datePipe.transform(model.lostwages_ch4, 'yyyy-MM-dd HH:mm:ss'),
      lostwages_ch5: this.datePipe.transform(model.lostwages_ch5, 'yyyy-MM-dd HH:mm:ss'),
      lostwages_ch6: this.datePipe.transform(model.lostwages_ch6, 'yyyy-MM-dd HH:mm:ss'),
      lostwages_ch7: this.datePipe.transform(model.lostwages_ch7, 'yyyy-MM-dd HH:mm:ss'),
      lostwages_ch8: this.datePipe.transform(model.lostwages_ch8, 'yyyy-MM-dd HH:mm:ss'),
      lostwages_ch9: this.datePipe.transform(model.lostwages_ch9, 'yyyy-MM-dd HH:mm:ss'),
      lostwages_ch10: this.datePipe.transform(model.lostwages_ch10, 'yyyy-MM-dd HH:mm:ss'),

      lostwages_before_min: model.lostwages_before_min,
      lostwages_work1_min: model.lostwages_work1_min,
      lostwages_work2_min: model.lostwages_work2_min,
      lostwages_break_min: model.lostwages_break_min,
      lostwages_after_min: model.lostwages_after_min,

      lostwages_before_min_app: model.lostwages_before_min_app,
      lostwages_work1_min_app: model.lostwages_work1_min_app,
      lostwages_work2_min_app: model.lostwages_work2_min_app,
      lostwages_break_min_app: model.lostwages_break_min_app,
      lostwages_after_min_app: model.lostwages_after_min_app,

      lostwages_late_min: model.lostwages_late_min,
      lostwages_late_min_app: model.lostwages_late_min_app,


      modified_by: this.initial_current.Username
    };

    return this.http.post<any>(this.config.ApiAttendanceModule + '/lostwages', data, this.options).toPromise()
      .then((res) => {
        return res;
      });
  }

   


  public lostwagestimesheet_record(model: LostwagesModel) {
    let emplists: any = [];
    model.emp_data.forEach((res: EmployeeModel) => {
      let ss = {
        worker_code: res.worker_code,
      };
      emplists.push(ss);
    });
    var data = {

      company_code: model.company_code,
      worker_code: model.worker_code,

      project_code: model.project_code,
      projob_code: model.projob_code,

      lostwages_status: model.lostwages_status,
      //
      lostwages_type: model.lostwages_type,

      //
      lostwages_salary: model.lostwages_salary,
      lostwages_diligence: model.lostwages_diligence,
      lostwages_travelexpenses: model.lostwages_travelexpenses,
      lostwages_other: model.lostwages_other,

      //
      lostwages_initial: model.lostwages_initial,
      lostwages_cardno: model.lostwages_cardno,
      lostwages_gender: model.lostwages_gender,
      lostwages_fname_th: model.lostwages_fname_th,
      lostwages_laname_th: model.lostwages_laname_th,

      //
      lostwages_workdate: model.lostwages_workdate,
      lostwages_daytype: model.lostwages_daytype,
      shift_code: model.shift_code,
      lostwages_color: model.lostwages_color,

      lostwages_lock: model.lostwages_lock,
      lostwages_in: model.lostwages_in,
      lostwages_out: model.lostwages_out,

      modified_by: model.modified_by || this.initial_current.Username,

      // modified_by: this.initial_current.Username,

      emp_data: emplists,

    };
    return this.http.post<any>(this.config.ApiAttendanceModule + '/timesheet1', data, this.options).toPromise()
      .then((res) => {
        return res;
      });
  }


  public daytype_get() {

    return this.http.get<any>(this.config.ApiAttendanceModule + '/daytype1_list').toPromise()
      .then((res) => {
        let message = JSON.parse(res);
        // console.log(res)
        return message.data;
      });
  }



  public lostwages_delete(company: string, project: string, worker: string, cardno: string,  model: LostwagesModel) {

    let data = {
      device_name: "phone",
      ip: "127.0.0.1",
      username: this.initial_current.Username,
      company_code: company,

      lostwages_cardno:cardno,
      language: this.initial_current.Language,
      project_code: project,
      worker_code: worker,

    }
    return this.http.post<any>(this.config.ApiAttendanceModule + '/lostwages_del', data, this.options).toPromise()
      .then((res) => {
        // console.log(res)
        let message = JSON.parse(res);
        return message;
      });
  }


}

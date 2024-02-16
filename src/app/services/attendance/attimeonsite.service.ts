import { Injectable } from '@angular/core';
import { AppConfig } from '../../config/config';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

import { InitialCurrent } from '../../config/initial_current';
import { DatePipe } from '@angular/common';
import { TimeonsiteModel } from 'src/app/models/attendance/timeonsite';
import { ATTdocumentModel } from 'src/app/models/attendance/attdocument';

@Injectable({
  providedIn: 'root'
})
export class AttimeonsiteService {
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

  public ATTtimeonsite_get(timeonstie: TimeonsiteModel) {
    // console.log('ATT001..');
    let data = {
      device_name: "phone",
      ip: "127.0.0.1",
      username: this.initial_current.Username,
      company_code: this.initial_current.CompCode,
      language: this.initial_current.Language,
      // timeonsite_id: timeonstie.timeonsite_id,
      worker_code: timeonstie.worker_code,
      location_code: timeonstie.location_code,
      timeonsite_workdate: this.datePipe.transform(timeonstie.timeonsite_workdate, 'MM/dd/yyyy'),
      // timeonstie_todate: this.datePipe.transform(timeonstie.timeonstie_todate, 'MM/dd/yyyy') || this.datePipe.transform(this.initial_current.PR_ToDate, 'yyy-MM-dd'),

      timeonsite_doc: timeonstie.timeonsite_doc,
      timeonsite_in: timeonstie.timeonsite_in,
      timeonsite_out: timeonstie.timeonsite_out,
      timeonsite_note: timeonstie.timeonsite_note,
      reason_code: timeonstie.reason_code,
      reqdoc_data: timeonstie.reqdoc_data,
      modified_by: timeonstie.modified_by,

    }
    return this.http.post<any>(this.config.ApiAttendanceModule + '/ATTTimeonsite_list', data, this.options).toPromise()
      .then((res) => {
        let message = JSON.parse(res);
        return message.data;
      });
  }



  // public ATTtimeonsite_get(timeonstie: TimeonsiteModel) {
  //   let data = {
  //     device_name: "phone",
  //     ip: "127.0.0.1",
  //     username: this.initial_current.Username,
  //     language: this.initial_current.Language,

  //     company_code: timeonstie.company_code || this.initial_current.CompCode,
  //     timeonsite_id: timeonstie.timeonsite_id,
  //     worker_code: timeonstie.worker_code || this.initial_current.Username,
  //     location_code: timeonstie.location_code,
  //     timeonsite_workdate: this.datePipe.transform(timeonstie.timeonsite_workdate, 'MM/dd/yyyy'),
  //     // timeonstie_todate: this.datePipe.transform(timeonstie.timeonstie_todate, 'MM/dd/yyyy') || this.datePipe.transform(this.initial_current.PR_ToDate, 'yyy-MM-dd'),
  //   }
  //   return this.http.post<any>(this.config.ApiAttendanceModule + '/ATTTimeonsite_list', data, this.options).toPromise()
  //     .then((res) => {
  //       let message = JSON.parse(res);
  //       return message.data;
  //     });
  // }

  public ATTtimeonsite_record(timeonsite: TimeonsiteModel[]) {
    var onsite_datas: any = []
    timeonsite.forEach((timeonsite: TimeonsiteModel) => {
      let datas = {
        username: this.initial_current.Username,

        company_code: timeonsite.company_code || this.initial_current.CompCode,
        worker_code: timeonsite.worker_code,
        timeonsite_id: timeonsite.timeonsite_id,
        timeonsite_doc: timeonsite.timeonsite_doc,
        timeonsite_workdate: this.datePipe.transform(timeonsite.timeonsite_workdate, 'yyyy-MM-dd HH:mm:ss'),

        timeonsite_in: timeonsite.timeonsite_in,
        timeonsite_out: timeonsite.timeonsite_out,
        timeonsite_note: timeonsite.timeonsite_note,
        reason_code: timeonsite.reason_code,
        location_code: timeonsite.location_code,
        flag: timeonsite.flag,
        reqdoc_data: timeonsite.reqdoc_data,
        modified_by: this.initial_current.Username
      }
      onsite_datas.push(datas)
    })
    let data = {
      device_name: "phone",
      ip: "127.0.0.1",
      username: this.initial_current.Username,
      company_code: timeonsite[0].company_code || this.initial_current.CompCode,
      timeonsite_data: JSON.stringify(onsite_datas)
    }
    return this.http.post<any>(this.config.ApiAttendanceModule + '/ATTTimeonsite', data, this.options).toPromise()
      .then((res) => {
        // console.log(res)
        let message = JSON.parse(res);
        return message;
      });
  }



  // public ATTtimeonsite_record(timeonsite: TimeonsiteModel) {
  //   let data = {
  //     device_name: '',
  //     ip: '',
  //     company_code: timeonsite.company_code || this.initial_current.CompCode,
  //     worker_code: timeonsite.worker_code || this.initial_current.Username,
  //     timeonsite_id: timeonsite.timeonsite_id,
  //     timeonsite_doc: timeonsite.timeonsite_doc,
  //     timeonsite_workdate: this.datePipe.transform(timeonsite.timeonsite_workdate, 'yyyy-MM-dd HH:mm:ss'),

  //     timeonsite_in: timeonsite.timeonsite_in,
  //     timeonsite_out: timeonsite.timeonsite_out,
  //     timeonsite_note: timeonsite.timeonsite_note,
  //     location_code: timeonsite.location_code,
  //     reason_code: timeonsite.reason_code,

  //     reqdoc_data: timeonsite.reqdoc_data,

  //     modified_by: this.initial_current.Username

  //   };

  //   return this.http
  //     .post<any>(this.config.ApiAttendanceModule + '/ATTTimeonsite', data, this.options)
  //     .toPromise()
  //     .then((res) => {
  //       let message = JSON.parse(res);
  //       return message;
  //     })
  //     .catch((error) => {
  //       throw error;
  //     });
  // }


  // public ATTtimeonsite_delete(timeonsites: TimeonsiteModel) {
  //   let data = {
  //     device_name: "phone",
  //     ip: "127.0.0.1",
  //     username: this.initial_current.Username,
  //     company_code: timeonsites.company_code || this.initial_current.CompCode,
  //     timeonsite_id: timeonsites.timeonsite_id,
  //     worker_code: timeonsites.worker_code,
  //   }
  //   return this.http.post<any>(this.config.ApiAttendanceModule + '/ATTTimeonsite_del', data, this.options).toPromise()
  //     .then((res) => {
  //       let message = JSON.parse(res);
  //       return message;
  //     });
  // }

  public ATTtimeonsite_delete(timeonsites: TimeonsiteModel) {
    // console.log('ATT003..');
    let data = {
        device_name: "phone",
        ip: "127.0.0.1",
        username: this.initial_current.Username,
        company_code: timeonsites.company_code || this.initial_current.CompCode,
        timeonsite_id: timeonsites.timeonsite_id,
        worker_code: timeonsites.worker_code,
    }
    return this.http.post<any>(this.config.ApiAttendanceModule + '/ATTTimeonsite_del', data, this.options).toPromise()
        .then((res) => {
            // console.log(res)
            let message = JSON.parse(res);
            return message;
        });
}



  public file_import(file: File, file_name: string, file_type: string) {
    // console.log('ATT004..');
    const formData = new FormData();
    formData.append('file', file);

    var para = "fileName=" + file_name + "." + file_type;
    para += "&token=" + this.initial_current.Token;
    para += "&by=" + this.initial_current.Username;

    return this.http.post<any>(this.config.ApiAttendanceModule + '/doUploadMTATTReqdoc?' + para, formData).toPromise()
      .then((res) => {
        let message = JSON.parse(res);
        return message;
      });
  }

  public get_file(file_path: string) {
    // console.log('ATT004..');
    var para = "file_path=" + file_path;
    return this.http.post<any>(this.config.ApiAttendanceModule + '/doGetMTATTReqdoc?' + para, this.options).toPromise()
      .then((res) => {
        return res;
      });
  }
  public deletefilepath_file(file_path: string) {
    // console.log('ATT004..');
    var para = "file_path=" + file_path;
    return this.http.post<any>(this.config.ApiAttendanceModule + '/doDeleteMTATTReqdoc?' + para, this.options).toPromise()
      .then((res) => {
        return JSON.parse(res);
      });
  }
  public delete_file(file: ATTdocumentModel) {
    // console.log('ATT001..');
    let data = {
      device_name: "phone",
      ip: "127.0.0.1",
      username: this.initial_current.Username,
      company_code: file.company_code || this.initial_current.CompCode,
      jobtable_id: file.document_id,
      job_id: file.job_id,
      job_type: file.job_type
    }
    return this.http.post<any>(this.config.ApiAttendanceModule + '/attdocument_del', data, this.options).toPromise()
      .then((res) => {
        let message = JSON.parse(res);
        return message;
      });
  }
}

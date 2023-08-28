
import { DatePipe } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AppConfig } from 'src/app/config/config';
import { InitialCurrent } from 'src/app/config/initial_current';
import { EmployeeModel } from 'src/app/models/employee/employee';
import { SetReduceModel } from 'src/app/models/payroll/batch/setreduce';
import { ReducesModel } from 'src/app/models/system/policy/reduces';
  
@Injectable({
  providedIn: 'root'
})
export class SetreduceService {

  public config: AppConfig = new AppConfig();
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

  constructor(
      private http: HttpClient,
      private router: Router,
      private datePipe: DatePipe
  ) {
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

   //set SetIReduce
   public SetReduce_get( Setup: SetReduceModel) {
 
      let emplists: any = [];
      Setup.emp_data.forEach((res: EmployeeModel) => {
          let ss = {
              worker_code: res.worker_code,
          };
          emplists.push(ss);
      });
      let data = {
          device_name: '',
          ip: '127.0.0.1',
          username: this.initial_current.Username,

          company_code: Setup.company_code || this.initial_current.CompCode,
          paybatchreduce_code: Setup.paybatchreduce_code,
          worker_code: Setup.worker_code,
          worker_detail: Setup.worker_detail,
          emp_data: emplists,

          modified_by: Setup.modified_by || this.initial_current.Username,
      };
      return this.http
          .post<any>(
              this.config.ApiPayrollModule + '/setpolpayPolReduce_list',
              data,
              this.options
          )
          .toPromise()
          .then((res) => {
              let message = JSON.parse(res);
              return message.data;
          });
  }

  public SetReduce_record( Setup: SetReduceModel) {
       let emplists: any = [];
      Setup.emp_data.forEach((res: EmployeeModel) => {
          let ss = {
              worker_code: res.worker_code,
          };
          emplists.push(ss);
      });
      let data = {
          device_name: '',
          ip: '127.0.0.1',
          username: this.initial_current.Username,

          company_code: Setup.company_code || this.initial_current.CompCode,
          worker_code: Setup.worker_code,
          paybatchreduce_code: Setup.paybatchreduce_code,
          worker_detail: Setup.worker_detail,
          emp_data: emplists,
          reduces_data: emplists,
          modified_by: Setup.modified_by || this.initial_current.Username,
      };
      return this.http
          .post<any>(
              this.config.ApiPayrollModule + '/setpaypolpayPolReduce',
              data,
              this.options
          )
          .toPromise()
          .then((res) => {
               let message = JSON.parse(res);
              return message;
          });
  }

  public SetReduce_delete( Setup: SetReduceModel) {
       let data = {
          device_name: '',
          ip: '127.0.0.1',
          username: this.initial_current.Username,
          company_code: Setup.company_code || this.initial_current.CompCode,
          paybatchreduce_code: Setup.paybatchreduce_code,
          worker_code: Setup.worker_code,
          worker_detail: Setup.worker_detail,
          emp_data: Setup.emp_data,

          modified_by: Setup.modified_by || this.initial_current.Username,

      }
      return this.http.post<any>(this.config.ApiPayrollModule + '/payPolReduce_del', data, this.options).toPromise()
          .then((res) => {
               let message = JSON.parse(res);
              return message;
          });
  }

  public SetReduce_import(file: File, file_name: string, file_type: string) {
       const formData = new FormData();
      formData.append('file', file);

      var para = 'fileName=' + file_name + '.' + file_type;
      para += '&token=' + this.initial_current.Token;
      para += '&by=' + this.initial_current.Username;

      return this.http
          .post<any>(
              this.config.ApiPayrollModule + '/doUploadSetPayPolReduce?' + para,
              formData
          )
          .toPromise()
          .then((res) => {
              let message = JSON.parse(res);
              return message;
          });
  }
}

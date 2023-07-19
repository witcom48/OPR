import { Injectable } from '@angular/core';
import { ProjectModel } from '../../models/project/project';
import { AppConfig } from '../../config/config';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { InitialCurrent } from '../../config/initial_current';
import { TaxrateModel } from 'src/app/models/payroll/taxrate';
@Injectable({
  providedIn: 'root'
})
export class TaxrateService {
    public config:AppConfig = new AppConfig();

    private model:ProjectModel = new ProjectModel();
    public initial_current:InitialCurrent = new InitialCurrent();

    httpHeaders = new HttpHeaders({});
    options = {
      headers: this.httpHeaders
    };

    basicRequest = {
      device_name:'',
      ip:'',
      username:''
    };

    constructor(private http:HttpClient, private router: Router) {
      this.doGetInitialCurrent();
    }


    doGetInitialCurrent(){
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
          device_name:'',
          ip:"localhost",
          username:this.initial_current.Username
        };

      }
      else{
        
        this.router.navigateByUrl('login');
      }
    }

    public taxrate_get(){
      // console.log('PAYT001..');

      return this.http.post<any>(this.config.ApiPayrollModule + '/TRTaxrate_list', this.basicRequest, this.options).toPromise()
      .then((res) => {

        let message = JSON.parse(res);
        // console.log(res)
        return message.data;
      });
    }

    public taxrate_record(model:TaxrateModel) {
      // console.log('PAYT002..');
      const data = {

        company_code: this.initial_current.CompCode,
        taxrate_id: model.taxrate_id,
        taxrate_from: model.taxrate_from,
        taxrate_to: model.taxrate_to,
        taxrate_tax: model.taxrate_tax,
        modified_by: this.initial_current.Username
      };

      return this.http.post<any>(this.config.ApiPayrollModule + '/TRTaxrate', data, this.options).toPromise()
      .then((res) => {

        // // console.log(res)
        return res;
      });
    }

    public taxrate_delete(model:TaxrateModel) {
      // console.log('PAYT003..');
      const data = {
        company_code: this.initial_current.CompCode,
        taxrate_id: model.taxrate_id,
        taxrate_from: model.taxrate_from,
        taxrate_to: model.taxrate_to,
        taxrate_tax: model.taxrate_tax,
        modified_by: this.initial_current.Username
      };

      return this.http.post<any>(this.config.ApiPayrollModule + '/TRTaxrate_del', data, this.options).toPromise()
      .then((res) => {
        return res;
      });
    }


    public taxrate_import(file: File, file_name:string, file_type:string){
      const formData = new FormData();
      formData.append('file', file);
        var para = "fileName=" + file_name + "." + file_type;
        para += "&token=" + this.initial_current.Token;
        para += "&by=" + this.initial_current.Username;

      return this.http.post<any>(this.config.ApiPayrollModule + '/doUploadTRTaxrate?' + para, formData).toPromise()
      .then((res) => {
        return res;
      });

    }
}


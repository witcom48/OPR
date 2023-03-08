import { Injectable } from '@angular/core';
import { PrjectModel } from '../../../models/project/project';
import { AppConfig } from '../../../config/config';
import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { Router } from '@angular/router';

import { InitialCurrent } from '../../../config/initial_current';
import { HospitalModel } from 'src/app/models/system/policy/hospital';

@Injectable({
  providedIn: 'root'
})
export class HospitalService {

    public config:AppConfig = new AppConfig();

    private model:PrjectModel = new PrjectModel();
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

    public hospital_get(){
      console.log('HPT001..');

      return this.http.post<any>(this.config.ApiSystemModule + '/hospital_list', this.basicRequest, this.options).toPromise()
      .then((res) => {
        let message = JSON.parse(res);
        console.log(res)
        return message.data;
      });
    }

    public hospital_record(model:HospitalModel) {
      console.log('HPT002..');
      const data = {
        hospital_id: model.hospital_id,
        hospital_code: model.hospital_code,
        hospital_name_th: model.hospital_name_th,
        hospital_name_en: model.hospital_name_en,
        modified_by: this.initial_current.Username
      };

      return this.http.post<any>(this.config.ApiSystemModule + '/hospital', data, this.options).toPromise()
      .then((res) => {

        //console.log(res)
        return res;
      });
    }

    public hospital_delete(model:HospitalModel) {
      console.log('HPT002..');
      const data = {
        hospital_id: model.hospital_id,
        hospital_code: model.hospital_code,
        modified_by: this.initial_current.Username
      };

      return this.http.post<any>(this.config.ApiSystemModule + '/hospital_del', data, this.options).toPromise()
      .then((res) => {
        return res;
      });
    }


    public hospital_import(file: File, file_name:string, file_type:string){

      const formData = new FormData();
      formData.append('file', file);

        var para = "fileName=" + file_name + "." + file_type;
        para += "&token=" + this.initial_current.Token;
        para += "&by=" + this.initial_current.Username;

      return this.http.post<any>(this.config.ApiSystemModule + '/doUploadHospital?' + para, formData).toPromise()
      .then((res) => {
        return res;
      });


    }




  }

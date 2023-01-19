import { Injectable } from '@angular/core';
import { PrjectModel } from '../../models/project/project';
import { AppConfig } from '../../config/config';
import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { Router } from '@angular/router';
import { InitialCurrent } from '../../config/initial_current';
import { ReligionModel } from 'src/app/models/system/religion';

@Injectable({
  providedIn: 'root'
})
export class ReligionService {


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

    public religion_get(){
      console.log('RLG001..');

      return this.http.post<any>(this.config.ApiSystemModule + '/religion_list', this.basicRequest, this.options).toPromise()
      .then((res) => {
        let message = JSON.parse(res);
        console.log(res)
        return message.data;
      });
    }

    public religion_record(model:ReligionModel) {
      console.log('RLG002..');
      const data = {
        religion_id: model.religion_id,
        religion_code: model.religion_code,
        religion_name_th: model.religion_name_th,
        religion_name_en: model.religion_name_en,
        modified_by: this.initial_current.Username
      };

      return this.http.post<any>(this.config.ApiSystemModule + '/religion', data, this.options).toPromise()
      .then((res) => {

        //console.log(res)
        return res;
      });
    }

    public religion_delete(model:ReligionModel) {
      console.log('RLG002..');
      const data = {
        religion_id: model.religion_id,
        religion_code: model.religion_code,
        modified_by: this.initial_current.Username
      };

      return this.http.post<any>(this.config.ApiSystemModule + '/religion_del', data, this.options).toPromise()
      .then((res) => {
        return res;
      });
    }


    public religion_import(file: File, file_name:string, file_type:string){

      const formData = new FormData();
      formData.append('file', file);

        var para = "fileName=" + file_name + "." + file_type;
        para += "&token=" + this.initial_current.Token;
        para += "&by=" + this.initial_current.Username;

      return this.http.post<any>(this.config.ApiSystemModule + '/doUploadProvince?' + para, formData).toPromise()
      .then((res) => {
        return res;
      });


    }




  }

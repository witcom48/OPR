import { Injectable } from '@angular/core';
import { AppConfig } from '../../config/config';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { InitialCurrent } from '../../config/initial_current';
 import { PlanitemsModels } from 'src/app/models/payroll/planitems';
import { ItemsModel } from 'src/app/models/payroll/items';

@Injectable({
  providedIn: 'root'
})
export class PlanitemsService {

  
  public config: AppConfig = new AppConfig();
  public initial_current: InitialCurrent = new InitialCurrent();

  httpHeaders = new HttpHeaders({});
  options = {
    headers: this.httpHeaders
  };

  constructor(private http: HttpClient, private router: Router) {
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

  public planitems_get(items: PlanitemsModels) {
     let data = {
      device_name: "phone",
      ip: "127.0.0.1",
      username: this.initial_current.Username,
      company_code: items.company_code || this.initial_current.CompCode,
      planitems_id: items.planitems_id,
      planitems_code: items.planitems_code
    }
    return this.http.post<any>(this.config.ApiPayrollModule + '/planitems_list', data, this.options).toPromise()
      .then((res) => {
        let message = JSON.parse(res);
        return message.data;
      });
  }

  public planitems_record(items: PlanitemsModels) {
     let itemslists: any = []
     items.itemslists.forEach((res: ItemsModel) => {
      let ss = {
        company_code: items.company_code || this.initial_current.CompCode,
        planitems_code: items.planitems_code,
        item_code: res.item_code
      }
      itemslists.push(ss)
    })
    let data = {
      device_nam: "phone",
      i: "127.0.0.1",
      username: this.initial_current.Username,
      company_code: items.company_code || this.initial_current.CompCode,
      planitems_id: items.planitems_id,
      planitems_code: items.planitems_code,
      planitems_name_th: items.planitems_name_th,
      planitems_name_en: items.planitems_name_en,
      modified_by: this.initial_current.Username,
      flag: false,
      itemslists: itemslists
    }
    return this.http.post<any>(this.config.ApiPayrollModule + '/planitems', data, this.options).toPromise()
      .then((res) => {
         let message = JSON.parse(res);
        return message;
      });
  }
  public planitems_delete(items: PlanitemsModels) {
    console.log(this.planitems_delete);
    let data = {
      device_name: "phone",
      ip: "127.0.0.1",
      username: this.initial_current.Username,
      company_code: items.company_code || this.initial_current.CompCode,
      planitems_id: items.planitems_id,
      planitems_code: items.planitems_code
    }
    return this.http.post<any>(this.config.ApiPayrollModule + '/planitems_del', data, this.options).toPromise()
      .then((res) => {
         let message = JSON.parse(res);
        return message;
      });
  }


  public planitems_import(file: File, file_name: string, file_type: string) {
     const formData = new FormData();
    formData.append('file', file);

    var para = "fileName=" + file_name + "." + file_type;
    para += "&token=" + this.initial_current.Token;
    para += "&by=" + this.initial_current.Username;
    para += "&com=" + this.initial_current.CompCode;

    return this.http.post<any>(this.config.ApiPayrollModule + '/doUploadMTPlanitems?' + para, formData).toPromise()
      .then((res) => {
        let message = JSON.parse(res);
        return message;
      });
  }

}

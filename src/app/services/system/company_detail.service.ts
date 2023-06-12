import { Injectable } from '@angular/core';
import { AppConfig } from '../../config/config';
import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { InitialCurrent } from '../../config/initial_current';

import { ComaddressModel } from 'src/app/models/system/comaddress';
import { ComcardModel } from 'src/app/models/system/comcard';
import { CombankModel } from 'src/app/models/system/combank';



@Injectable({
  providedIn: 'root'
})
export class CompanyDetailService {

  public config:AppConfig = new AppConfig();
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

  constructor(private http:HttpClient, private router: Router,private datePipe: DatePipe) {
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

   // Address
  public getcompany_address(company:string, code:string){

    var filter = {
      device_name:'',
      ip:"localhost",
      username:this.initial_current.Username,
      company_code:company,
    //   language:"",
      combranch_code:"00000",
      comaddress_type:code,

    };

    return this.http.post<any>(this.config.ApiSystemModule + '/comaddress_list', filter, this.options).toPromise()
    .then((res) => {
      let message = JSON.parse(res);
      console.log(res)
      return message.data;
    });
  }
  public record_comaddress(company_code :string, list:ComaddressModel[]) {

    var item_data:string = "[";
    for (let i = 0; i < list.length; i++) {
      item_data = item_data + "{";
      item_data = item_data + "\"comaddress_type\":\"" + list[i].comaddress_type + "\"";
      item_data = item_data + ",\"combranch_code\":\"" + "00000" + "\"";

      item_data = item_data + ",\"comaddressth_no\":\"" + list[i].comaddressth_no + "\"";
      item_data = item_data + ",\"comaddressth_moo\":\"" + list[i].comaddressth_moo + "\"";
      item_data = item_data + ",\"comaddressth_soi\":\"" + list[i].comaddressth_soi + "\"";
      item_data = item_data + ",\"comaddressth_road\":\"" + list[i].comaddressth_road + "\"";
      item_data = item_data + ",\"comaddressth_tambon\":\"" + list[i].comaddressth_tambon + "\"";
      item_data = item_data + ",\"comaddressth_amphur\":\"" + list[i].comaddressth_amphur + "\"";
      item_data = item_data + ",\"provinceth_code\":\"" + list[i].provinceth_code + "\"";

      item_data = item_data + ",\"comaddressen_no\":\"" + list[i].comaddressen_no + "\"";
      item_data = item_data + ",\"comaddressen_moo\":\"" + list[i].comaddressen_moo + "\"";
      item_data = item_data + ",\"comaddressen_soi\":\"" + list[i].comaddressen_soi + "\"";
      item_data = item_data + ",\"comaddressen_road\":\"" + list[i].comaddressen_road + "\"";
      item_data = item_data + ",\"comaddressen_tambon\":\"" + list[i].comaddressen_tambon + "\"";
      item_data = item_data + ",\"comaddressen_amphur\":\"" + list[i].comaddressen_amphur + "\"";
      item_data = item_data + ",\"comaddress_zipcode\":\"" + list[i].comaddress_zipcode + "\"";
      item_data = item_data + ",\"provinceen_code\":\"" + list[i].provinceen_code + "\"";

      item_data = item_data + ",\"comaddress_tel\":\"" + list[i].comaddress_tel + "\"";
      item_data = item_data + ",\"comaddress_email\":\"" + list[i].comaddress_email + "\"";
      item_data = item_data + ",\"comaddress_line\":\"" + list[i].comaddress_line + "\"";
      item_data = item_data + ",\"comaddress_facebook\":\"" + list[i].comaddress_facebook + "\"";
      item_data = item_data + ",\"company_code\":\"" + company_code + "\"";
      item_data = item_data + "}" + ",";
    }
    if(item_data.length > 2)
    {
      item_data = item_data.substr(0, item_data.length - 1);
    }
    item_data = item_data + "]";

    var specificData = {
        transaction_data:item_data,
        company_code:company_code,
        modified_by:this.initial_current.Username
    //   transaction_data:item_data,
    //   company_code:company_code,
    // //   company_code : this.initial_current.CompCode,
    //   modified_by:this.initial_current.Username
    };

    return this.http.post<any>(this.config.ApiSystemModule + '/comaddress', specificData, this.options).toPromise()
    .then((res) => {
      return res;
    });
  }

  public delete_comaddress(model:ComaddressModel){
    const data = {
    //   address_id: model.comaddress_id,
      company_code: model.company_code,
    //   company_code: this.initial_current.CompCode,
      modified_by: this.initial_current.Username
    };

    return this.http.post<any>(this.config.ApiSystemModule + '/comaddress_del', data, this.options).toPromise()
    .then((res) => {
      return res;
    });
  }
  public comaddress_import(file: File, file_name:string, file_type:string){
    const formData = new FormData();
    formData.append('file', file);

      var para = "fileName=" + file_name + "." + file_type;
      para += "&token=" + this.initial_current.Token;
      para += "&by=" + this.initial_current.Username;

    return this.http.post<any>(this.config.ApiSystemModule + '/doUploadComaddress?' + para, formData).toPromise()
    .then((res) => {
      return res;
    });
  }

  //Card
  public getcompany_card(company:string, code:string){

    var filter = {
        device_name:'',
        ip:"localhost",
        username:this.initial_current.Username,
        company_code:company,
        // language:"",
        card_type:"",
        comcard_id:"",
        combranch_code:"",
        comcard_code:"",
      };


    return this.http.post<any>(this.config.ApiSystemModule + '/comcard_list', filter, this.options).toPromise()
    .then((res) => {
      let message = JSON.parse(res);
      console.log(res)
      return message.data;
    });
  }
  public record_comcard(company_code :string, list:ComcardModel[]){
    var item_data:string = "[";
    for (let i = 0; i < list.length; i++) {
      item_data = item_data + "{";
      item_data = item_data + "\"company_code\":\"" + company_code + "\"";
      item_data = item_data + ",\"comcard_id\":\"" + list[i].comcard_id + "\"";
      item_data = item_data + ",\"comcard_code\":\"" + list[i].comcard_code + "\"";
      item_data = item_data + ",\"combranch_code\":\"" + list[i].combranch_code + "\"";
      item_data = item_data + ",\"card_type\":\"" + list[i].card_type + "\"";
      item_data = item_data + ",\"comcard_issue\":\"" + this.datePipe.transform(list[i].comcard_issue) + "\"";
      item_data = item_data + ",\"comcard_expire\":\"" + this.datePipe.transform(list[i].comcard_expire) + "\"";
      item_data = item_data + "}" + ",";
    }
    if(item_data.length > 2)
    {
      item_data = item_data.substr(0, item_data.length - 1);
    }
    item_data = item_data + "]";
    console.log(item_data);
    var specificData = {
      transaction_data:item_data,
      company_code:company_code,
    //   company_code : this.initial_current.CompCode,
      modified_by:this.initial_current.Username
    };

    return this.http.post<any>(this.config.ApiSystemModule + '/comcard', specificData, this.options).toPromise()
    .then((res) => {
      return res;
    });
  }
  public delete_comcard(model:ComcardModel){
    const data = {
      comcard_id: model.comcard_id,
      company_code: model.company_code,
    //   company_code: this.initial_current.CompCode,
      modified_by: this.initial_current.Username
    };

    return this.http.post<any>(this.config.ApiSystemModule + '/comcard_del', data, this.options).toPromise()
    .then((res) => {
      return res;
    });
  }
  public comcard_import(file: File, file_name:string, file_type:string){
    const formData = new FormData();
    formData.append('file', file);

      var para = "fileName=" + file_name + "." + file_type;
      para += "&token=" + this.initial_current.Token;
      para += "&by=" + this.initial_current.Username;

    return this.http.post<any>(this.config.ApiSystemModule + '/doUploadComcard?' + para, formData).toPromise()
    .then((res) => {
      return res;
    });
  }

  // Bank
  public getcompany_bank(company:string, code:string){

    var filter = {
      device_name:'',
      ip:"localhost",
      username:this.initial_current.Username,
    //   company_code:company,
    company_id:"",
    company_code:company,
    language:"",
    };

    return this.http.post<any>(this.config.ApiSystemModule + '/combank_list', filter, this.options).toPromise()
    .then((res) => {
      let message = JSON.parse(res);
      console.log(res)
      return message.data;
    });
  }
  public record_combank(company_code :string, list:CombankModel[]){
    var item_data:string = "[";
    for (let i = 0; i < list.length; i++) {
      item_data = item_data + "{";
      item_data = item_data + "\"company_code\":\"" + company_code + "\"";
      item_data = item_data + ",\"combank_id\":\"" + list[i].combank_id + "\"";
      item_data = item_data + ",\"combank_bankcode\":\"" + list[i].combank_bankcode + "\"";
      item_data = item_data + ",\"combank_bankaccount\":\"" + list[i].combank_bankaccount + "\"";

    //   item_data = item_data + ",\"company_code\":\"" + this.initial_current.CompCode + "\"";
    //   item_data = item_data + ",\"company_code\":\"" + company_code + "\"";
      item_data = item_data + "}" + ",";

    }
    if(item_data.length > 2)
    {
      item_data = item_data.substr(0, item_data.length - 1);
    }
    item_data = item_data + "]";

    var specificData = {
      transaction_data:item_data,
      company_code:company_code,
    //   company_code:this.initial_current.CompCode,

    //   company_code : this.initial_current.CompCode,
      modified_by:this.initial_current.Username
    };

    return this.http.post<any>(this.config.ApiSystemModule + '/combank', specificData, this.options).toPromise()
    .then((res) => {
      return res;
    });
  }
  public delete_combank(model:CombankModel){
    const data = {
        combank_id: model.combank_id,
    // company_code: model.company_code,
      modified_by: this.initial_current.Username
    };

    return this.http.post<any>(this.config.ApiSystemModule + '/combank_del', data, this.options).toPromise()
    .then((res) => {
      return res;
    });
  }
  public combank_import(file: File, file_name:string, file_type:string){
    const formData = new FormData();
    formData.append('file', file);

      var para = "fileName=" + file_name + "." + file_type;
      para += "&token=" + this.initial_current.Token;
      para += "&by=" + this.initial_current.Username;

    return this.http.post<any>(this.config.ApiSystemModule + '/doUploadComBank?' + para, formData).toPromise()
    .then((res) => {
      return res;
    });
  }
}

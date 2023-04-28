import { Injectable } from '@angular/core';
import { AppConfig } from '../../config/config';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';

import { InitialCurrent } from '../../config/initial_current';

import { EmpLocationModel } from 'src/app/models/employee/manage/emplocation';
import { EmpBranchModel } from 'src/app/models/employee/manage/empbranch';
import { EmpaddressModel } from 'src/app/models/employee/manage/address';
import { EmpcardModel } from 'src/app/models/employee/manage/card';
import { EmpbankModel } from 'src/app/models/employee/manage/bank';
import { EmpFamilyModel } from 'src/app/models/employee/manage/family';
import { EmpHospitalModel } from 'src/app/models/employee/manage/hospital';
import { EmpDepModel } from 'src/app/models/employee/manage/dep';
import { EmpPositionModel } from 'src/app/models/employee/manage/position';
import { EmpEducationModel } from 'src/app/models/employee/manage/education';
import { EmpTrainingModel } from 'src/app/models/employee/manage/training';
import { EmpSalaryModel } from 'src/app/models/employee/manage/salary';
import { EmpProvidentModel } from 'src/app/models/employee/manage/provident';
import { EmpBenefitsModel } from 'src/app/models/employee/manage/benefits';
import { EmpReduceModel } from 'src/app/models/employee/manage/reduce';
import { EmpAccumalateModel } from 'src/app/models/employee/manage/accumalate';
import { EmpAssessmentModel } from 'src/app/models/employee/manage/assessment';
import { EmpCriminalModel } from 'src/app/models/employee/manage/criminal';
import { EmpForeignerModel } from 'src/app/models/employee/manage/foreigner';
import { EmpGroupModel } from 'src/app/models/employee/manage/empgroup';
import { EmpSupplyModel } from 'src/app/models/employee/manage/empsupply';
import { EmpUniformModel } from 'src/app/models/employee/manage/empuniform';
import { EmpSuggestModel } from 'src/app/models/employee/manage/empsuggest';


@Injectable({
  providedIn: 'root'
})
export class EmpDetailService {

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

  //Emp Address

  public getworker_address(company: string, code: string) {

    var filter = {
      device_name: '',
      ip: "localhost",
      username: this.initial_current.Username,
      company_code: company,
      language: "",
      worker_code: code
    };

    return this.http.post<any>(this.config.ApiEmployeeModule + '/empaddlist', filter, this.options).toPromise()
      .then((res) => {
        let message = JSON.parse(res);
        // console.log(res)
        return message.data;
      });
  }
  public record_empaddress(worker_code: string, list: EmpaddressModel[]) {

    var item_data: string = "[";
    for (let i = 0; i < list.length; i++) {
      item_data = item_data + "{";
      item_data = item_data + "\"address_id\":\"" + list[i].address_id + "\"";
      item_data = item_data + ",\"address_type\":\"" + list[i].address_type + "\"";
      item_data = item_data + ",\"address_no\":\"" + list[i].address_no + "\"";
      item_data = item_data + ",\"address_moo\":\"" + list[i].address_moo + "\"";
      item_data = item_data + ",\"address_soi\":\"" + list[i].address_soi + "\"";
      item_data = item_data + ",\"address_road\":\"" + list[i].address_road + "\"";
      item_data = item_data + ",\"address_tambon\":\"" + list[i].address_tambon + "\"";
      item_data = item_data + ",\"address_amphur\":\"" + list[i].address_amphur + "\"";
      item_data = item_data + ",\"province_code\":\"" + list[i].province_code + "\"";
      item_data = item_data + ",\"address_zipcode\":\"" + list[i].address_zipcode + "\"";
      item_data = item_data + ",\"address_tel\":\"" + list[i].address_tel + "\"";
      item_data = item_data + ",\"address_email\":\"" + list[i].address_email + "\"";
      item_data = item_data + ",\"address_line\":\"" + list[i].address_line + "\"";
      item_data = item_data + ",\"address_facebook\":\"" + list[i].address_facebook + "\"";
      item_data = item_data + ",\"company_code\":\"" + this.initial_current.CompCode + "\"";
      item_data = item_data + ",\"worker_code\":\"" + worker_code + "\"";
      item_data = item_data + "}" + ",";
    }
    if (item_data.length > 2) {
      item_data = item_data.substr(0, item_data.length - 1);
    }
    item_data = item_data + "]";

    var specificData = {
      transaction_data: item_data,
      worker_code: worker_code,
      company_code: this.initial_current.CompCode,
      modified_by: this.initial_current.Username
    };

    return this.http.post<any>(this.config.ApiEmployeeModule + '/empaddress', specificData, this.options).toPromise()
      .then((res) => {
        return res;
      });
  }
  //   public record_empaddress(model:EmpaddressModel){
  //     const data = {
  //       company_code: model.company_code,
  //       worker_code: model.worker_code,
  //       address_id : model.address_id,
  //       address_type : model.address_type,
  //       address_no : model.address_no,
  //       address_moo : model.address_moo,
  //       address_soi : model.address_soi,
  //       address_road : model.address_road,
  //       address_tambon : model.address_tambon,
  //       address_amphur : model.address_amphur,
  //       province_code : model.province_code,
  //       address_zipcode : model.address_zipcode,
  //       address_tel : model.address_tel,
  //       address_email : model.address_email,
  //       address_line : model.address_line,
  //       address_facebook : model.address_facebook,
  //       modified_by: this.initial_current.Username
  //     };
  //     return this.http.post<any>(this.config.ApiEmployeeModule + '/empaddress', data, this.options).toPromise()
  //     .then((res) => {
  //       return res;
  //     });
  //   }
  public delete_empaddress(model: EmpaddressModel) {
    const data = {
      address_id: model.address_id,
      worker_code: model.worker_code,
      company_code: this.initial_current.CompCode,
      modified_by: this.initial_current.Username
    };

    return this.http.post<any>(this.config.ApiEmployeeModule + '/empadd_del', data, this.options).toPromise()
      .then((res) => {
        return res;
      });
  }
  public empaddress_import(file: File, file_name: string, file_type: string) {
    const formData = new FormData();
    formData.append('file', file);

    var para = "fileName=" + file_name + "." + file_type;
    para += "&token=" + this.initial_current.Token;
    para += "&by=" + this.initial_current.Username;

    return this.http.post<any>(this.config.ApiEmployeeModule + '/doUploadAddress?' + para, formData).toPromise()
      .then((res) => {
        return res;
      });
  }

  //Emp Card
  public getworker_card(company: string, code: string) {

    var filter = {
      device_name: '',
      ip: "localhost",
      username: this.initial_current.Username,
      company_code: company,
      language: "",
      worker_code: code
    };

    return this.http.post<any>(this.config.ApiEmployeeModule + '/empcardlist', filter, this.options).toPromise()
      .then((res) => {
        let message = JSON.parse(res);
        console.log(res)
        return message.data;
      });
  }
  public record_empcard(worker_code: string, list: EmpcardModel[]) {
    var item_data: string = "[";
    for (let i = 0; i < list.length; i++) {
      item_data = item_data + "{";
      item_data = item_data + "\"card_id\":\"" + list[i].card_id + "\"";
      item_data = item_data + ",\"card_code\":\"" + list[i].card_code + "\"";
      item_data = item_data + ",\"card_type\":\"" + list[i].card_type + "\"";
      item_data = item_data + ",\"card_issue\":\"" + this.datePipe.transform(list[i].card_issue) + "\"";
      item_data = item_data + ",\"card_expire\":\"" + this.datePipe.transform(list[i].card_expire) + "\"";
      item_data = item_data + ",\"company_code\":\"" + this.initial_current.CompCode + "\"";
      item_data = item_data + ",\"worker_code\":\"" + worker_code + "\"";
      item_data = item_data + "}" + ",";
    }
    if (item_data.length > 2) {
      item_data = item_data.substr(0, item_data.length - 1);
    }
    item_data = item_data + "]";
    console.log(item_data);
    var specificData = {
      transaction_data: item_data,
      worker_code: worker_code,
      company_code: this.initial_current.CompCode,
      modified_by: this.initial_current.Username
    };

    return this.http.post<any>(this.config.ApiEmployeeModule + '/empcard', specificData, this.options).toPromise()
      .then((res) => {
        return res;
      });
  }
  public delete_empcard(model: EmpcardModel) {
    const data = {
      card_id: model.card_id,
      worker_code: model.worker_code,
      company_code: this.initial_current.CompCode,
      modified_by: this.initial_current.Username
    };

    return this.http.post<any>(this.config.ApiEmployeeModule + '/empcard_del', data, this.options).toPromise()
      .then((res) => {
        return res;
      });
  }
  public empcard_import(file: File, file_name: string, file_type: string) {
    const formData = new FormData();
    formData.append('file', file);

    var para = "fileName=" + file_name + "." + file_type;
    para += "&token=" + this.initial_current.Token;
    para += "&by=" + this.initial_current.Username;

    return this.http.post<any>(this.config.ApiEmployeeModule + '/doUploadCard?' + para, formData).toPromise()
      .then((res) => {
        return res;
      });
  }

  //Emp Bank
  public getworker_bank(company: string, code: string) {

    var filter = {
      device_name: '',
      ip: "localhost",
      username: this.initial_current.Username,
      company_code: company,
      language: "",
      worker_code: code
    };

    return this.http.post<any>(this.config.ApiEmployeeModule + '/empbanklist', filter, this.options).toPromise()
      .then((res) => {
        let message = JSON.parse(res);
        // console.log(res)
        return message.data;
      });
  }
  public record_empbank(worker_code: string, list: EmpbankModel[]) {
    var item_data: string = "[";
    for (let i = 0; i < list.length; i++) {
      item_data = item_data + "{";
      item_data = item_data + "\"bank_id\":\"" + list[i].bank_id + "\"";
      item_data = item_data + ",\"bank_code\":\"" + list[i].bank_code + "\"";
      item_data = item_data + ",\"bank_account\":\"" + list[i].bank_account + "\"";
      item_data = item_data + ",\"bank_percent\":\"" + list[i].bank_percent + "\"";
      item_data = item_data + ",\"bank_cashpercent\":\"" + list[i].bank_cashpercent + "\"";
      item_data = item_data + ",\"bank_bankname\":\"" + list[i].bank_bankname + "\"";
      item_data = item_data + ",\"company_code\":\"" + this.initial_current.CompCode + "\"";
      item_data = item_data + ",\"worker_code\":\"" + worker_code + "\"";
      item_data = item_data + "}" + ",";
    }
    if (item_data.length > 2) {
      item_data = item_data.substr(0, item_data.length - 1);
    }
    item_data = item_data + "]";

    var specificData = {
      transaction_data: item_data,
      worker_code: worker_code,
      company_code: this.initial_current.CompCode,
      modified_by: this.initial_current.Username
    };

    return this.http.post<any>(this.config.ApiEmployeeModule + '/empbank', specificData, this.options).toPromise()
      .then((res) => {
        return res;
      });
  }
  public delete_empbank(model: EmpbankModel) {
    const data = {
      bank_id: model.bank_id,
      worker_code: model.worker_code,
      company_code: this.initial_current.CompCode,
      modified_by: this.initial_current.Username
    };

    return this.http.post<any>(this.config.ApiEmployeeModule + '/empbank_del', data, this.options).toPromise()
      .then((res) => {
        return res;
      });
  }
  public empbank_import(file: File, file_name: string, file_type: string) {
    const formData = new FormData();
    formData.append('file', file);

    var para = "fileName=" + file_name + "." + file_type;
    para += "&token=" + this.initial_current.Token;
    para += "&by=" + this.initial_current.Username;

    return this.http.post<any>(this.config.ApiEmployeeModule + '/doUploadBank?' + para, formData).toPromise()
      .then((res) => {
        return res;
      });
  }

  //Emp Family
  public getworker_family(company: string, code: string) {

    var filter = {
      device_name: '',
      ip: "localhost",
      username: this.initial_current.Username,
      company_code: company,
      language: "",
      worker_code: code
    };

    return this.http.post<any>(this.config.ApiEmployeeModule + '/empfamilylist', filter, this.options).toPromise()
      .then((res) => {
        let message = JSON.parse(res);
        // console.log(res)
        return message.data;
      });
  }
  public record_empfamily(worker_code: string, list: EmpFamilyModel[]) {
    var item_data: string = "[";
    for (let i = 0; i < list.length; i++) {
      item_data = item_data + "{";
      item_data = item_data + "\"family_id\":\"" + list[i].family_id + "\"";
      item_data = item_data + ",\"family_code\":\"" + list[i].family_code + "\"";
      item_data = item_data + ",\"family_type\":\"" + list[i].family_type + "\"";
      item_data = item_data + ",\"family_fname_th\":\"" + list[i].family_fname_th + "\"";
      item_data = item_data + ",\"family_lname_th\":\"" + list[i].family_lname_th + "\"";
      item_data = item_data + ",\"family_fname_en\":\"" + list[i].family_fname_en + "\"";
      item_data = item_data + ",\"family_lname_en\":\"" + list[i].family_lname_en + "\"";
      item_data = item_data + ",\"family_birthdate\":\"" + this.datePipe.transform(list[i].family_birthdate, 'yyyy-MM-dd HH:mm:ss') + "\"";
      item_data = item_data + ",\"company_code\":\"" + this.initial_current.CompCode + "\"";
      item_data = item_data + ",\"worker_code\":\"" + worker_code + "\"";
      item_data = item_data + "}" + ",";
    }
    if (item_data.length > 2) {
      item_data = item_data.substr(0, item_data.length - 1);
    }
    item_data = item_data + "]";

    var specificData = {
      transaction_data: item_data,
      worker_code: worker_code,
      company_code: this.initial_current.CompCode,
      modified_by: this.initial_current.Username
    };

    return this.http.post<any>(this.config.ApiEmployeeModule + '/empfamily', specificData, this.options).toPromise()
      .then((res) => {
        return res;
      });
  }
  public delete_empfamily(model: EmpFamilyModel) {
    const data = {
      family_id: model.family_id,
      worker_code: model.worker_code,
      company_code: this.initial_current.CompCode,
      modified_by: this.initial_current.Username
    };

    return this.http.post<any>(this.config.ApiEmployeeModule + '/empfamily_del', data, this.options).toPromise()
      .then((res) => {
        return res;
      });
  }
  public empfamily_import(file: File, file_name: string, file_type: string) {
    const formData = new FormData();
    formData.append('file', file);

    var para = "fileName=" + file_name + "." + file_type;
    para += "&token=" + this.initial_current.Token;
    para += "&by=" + this.initial_current.Username;

    return this.http.post<any>(this.config.ApiEmployeeModule + '/doUploadFamily?' + para, formData).toPromise()
      .then((res) => {
        return res;
      });
  }

  //Emp Hospital
  public getworker_hospital(company: string, code: string) {
    var filter = {
      device_name: '',
      ip: "localhost",
      username: this.initial_current.Username,
      company_code: company,
      language: "",
      worker_code: code
    };

    return this.http.post<any>(this.config.ApiEmployeeModule + '/emphospitallist', filter, this.options).toPromise()
      .then((res) => {
        let message = JSON.parse(res);
        // console.log(res)
        return message.data;
      });
  }
  public record_emphospital(worker_code: string, list: EmpHospitalModel[]) {
    var item_data: string = "[";
    for (let i = 0; i < list.length; i++) {
      item_data = item_data + "{";
      item_data = item_data + "\"emphospital_id\":\"" + list[i].emphospital_id + "\"";
      item_data = item_data + ",\"emphospital_code\":\"" + list[i].emphospital_code + "\"";
      item_data = item_data + ",\"emphospital_date\":\"" + this.datePipe.transform(list[i].emphospital_date) + "\"";
      item_data = item_data + ",\"company_code\":\"" + this.initial_current.CompCode + "\"";
      item_data = item_data + ",\"worker_code\":\"" + worker_code + "\"";
      item_data = item_data + "}" + ",";
    }
    if (item_data.length > 2) {
      item_data = item_data.substr(0, item_data.length - 1);
    }
    item_data = item_data + "]";

    var specificData = {
      transaction_data: item_data,
      worker_code: worker_code,
      company_code: this.initial_current.CompCode,
      modified_by: this.initial_current.Username
    };

    return this.http.post<any>(this.config.ApiEmployeeModule + '/emphospital', specificData, this.options).toPromise()
      .then((res) => {
        return res;
      });
  }
  public delete_emphospital(model: EmpHospitalModel) {
    const data = {
      emphospital_id: model.emphospital_id,
      worker_code: model.worker_code,
      company_code: this.initial_current.CompCode,
      modified_by: this.initial_current.Username
    };

    return this.http.post<any>(this.config.ApiEmployeeModule + '/emphospital_del', data, this.options).toPromise()
      .then((res) => {
        return res;
      });
  }
  public emphospital_import(file: File, file_name: string, file_type: string) {
    const formData = new FormData();
    formData.append('file', file);

    var para = "fileName=" + file_name + "." + file_type;
    para += "&token=" + this.initial_current.Token;
    para += "&by=" + this.initial_current.Username;

    return this.http.post<any>(this.config.ApiEmployeeModule + '/doUploadHospital?' + para, formData).toPromise()
      .then((res) => {
        return res;
      });
  }

  //Emp Foreigner
  public getworker_foreigner(company: string, code: string) {
    var filter = {
      device_name: '',
      ip: "localhost",
      username: this.initial_current.Username,
      company_code: company,
      language: "",
      worker_code: code
    };

    return this.http.post<any>(this.config.ApiEmployeeModule + '/empforeignerlist', filter, this.options).toPromise()
      .then((res) => {
        let message = JSON.parse(res);
        // console.log(res)
        return message.data;
      });
  }
  public record_empforeigner(worker_code: string, model: EmpForeignerModel) {
    const data = {
      company_code: this.initial_current.CompCode,
      worker_code: worker_code,
      foreigner_id: model.foreigner_id,
      passport_no: model.passport_no,
      passport_issue: model.passport_issue,
      passport_expire: model.passport_expire,
      visa_no: model.visa_no,
      visa_issue: model.visa_issue,
      visa_expire: model.visa_expire,
      workpermit_no: model.workpermit_no,
      workpermit_by: model.workpermit_by,
      workpermit_issue: model.workpermit_issue,
      workpermit_expire: model.workpermit_expire,
      entry_date: model.entry_date,
      certificate_no: model.certificate_no,
      certificate_expire: model.certificate_expire,
      otherdoc_no: model.otherdoc_no,
      otherdoc_expire: model.otherdoc_expire,

      modified_by: this.initial_current.Username
    };

    return this.http.post<any>(this.config.ApiEmployeeModule + '/empforeigner', data, this.options).toPromise()
      .then((res) => {
        return res;
      });
  }
  public delete_empforeigner(model: EmpForeignerModel) {
    const data = {
      foreigner_id: model.foreigner_id,
      worker_code: model.worker_code,
      company_code: this.initial_current.CompCode,
      modified_by: this.initial_current.Username
    };

    return this.http.post<any>(this.config.ApiEmployeeModule + '/empforeigner_del', data, this.options).toPromise()
      .then((res) => {
        return res;
      });
  }
  public empforeigner_import(file: File, file_name: string, file_type: string) {
    const formData = new FormData();
    formData.append('file', file);

    var para = "fileName=" + file_name + "." + file_type;
    para += "&token=" + this.initial_current.Token;
    para += "&by=" + this.initial_current.Username;

    return this.http.post<any>(this.config.ApiEmployeeModule + '/doUploadForeigner?' + para, formData).toPromise()
      .then((res) => {
        return res;
      });
  }

  //Emp Department
  public getworker_dep(company: string, code: string) {

    var filter = {
      device_name: '',
      ip: "localhost",
      username: this.initial_current.Username,
      company_code: company,
      language: "",
      worker_code: code
    };

    return this.http.post<any>(this.config.ApiEmployeeModule + '/empdeplist', filter, this.options).toPromise()
      .then((res) => {
        let message = JSON.parse(res);
        // console.log(res)
        return message.data;
      });
  }
  public record_empdep(worker_code: string, list: EmpDepModel[]) {
    var item_data: string = "[";
    for (let i = 0; i < list.length; i++) {
      item_data = item_data + "{";
      item_data = item_data + "\"empdep_id\":\"" + list[i].empdep_id + "\"";
      item_data = item_data + ",\"empdep_date\":\"" + this.datePipe.transform(list[i].empdep_date) + "\"";
      item_data = item_data + ",\"empdep_level01\":\"" + list[i].empdep_level01 + "\"";
      item_data = item_data + ",\"empdep_level02\":\"" + list[i].empdep_level02 + "\"";
      item_data = item_data + ",\"empdep_level03\":\"" + list[i].empdep_level03 + "\"";
      item_data = item_data + ",\"empdep_level04\":\"" + list[i].empdep_level04 + "\"";
      item_data = item_data + ",\"empdep_level05\":\"" + list[i].empdep_level05 + "\"";
      item_data = item_data + ",\"empdep_level06\":\"" + list[i].empdep_level06 + "\"";
      item_data = item_data + ",\"empdep_level07\":\"" + list[i].empdep_level07 + "\"";
      item_data = item_data + ",\"empdep_level08\":\"" + list[i].empdep_level08 + "\"";
      item_data = item_data + ",\"empdep_level09\":\"" + list[i].empdep_level09 + "\"";
      item_data = item_data + ",\"empdep_level10\":\"" + list[i].empdep_level10 + "\"";
      item_data = item_data + ",\"empdep_reason\":\"" + list[i].empdep_reason + "\"";
      item_data = item_data + ",\"company_code\":\"" + this.initial_current.CompCode + "\"";
      item_data = item_data + ",\"worker_code\":\"" + worker_code + "\"";
      item_data = item_data + "}" + ",";
    }
    if (item_data.length > 2) {
      item_data = item_data.substr(0, item_data.length - 1);
    }
    item_data = item_data + "]";

    var specificData = {
      transaction_data: item_data,
      worker_code: worker_code,
      company_code: this.initial_current.CompCode,
      modified_by: this.initial_current.Username
    };

    return this.http.post<any>(this.config.ApiEmployeeModule + '/empdep', specificData, this.options).toPromise()
      .then((res) => {
        return res;
      });
  }
  public delete_empdep(model: EmpDepModel) {
    const data = {
      empdep_id: model.empdep_id,
      worker_code: model.worker_code,
      company_code: this.initial_current.CompCode,
      modified_by: this.initial_current.Username
    };

    return this.http.post<any>(this.config.ApiEmployeeModule + '/empdep_del', data, this.options).toPromise()
      .then((res) => {
        return res;
      });
  }
  public empdep_import(file: File, file_name: string, file_type: string) {
    const formData = new FormData();
    formData.append('file', file);

    var para = "fileName=" + file_name + "." + file_type;
    para += "&token=" + this.initial_current.Token;
    para += "&by=" + this.initial_current.Username;

    return this.http.post<any>(this.config.ApiEmployeeModule + '/doUploadEmpDep?' + para, formData).toPromise()
      .then((res) => {
        return res;
      });
  }

  //Emp Position
  public getworker_position(company: string, code: string) {

    var filter = {
      device_name: '',
      ip: "localhost",
      username: this.initial_current.Username,
      company_code: company,
      language: "",
      worker_code: code
    };

    return this.http.post<any>(this.config.ApiEmployeeModule + '/emppositionlist', filter, this.options).toPromise()
      .then((res) => {
        let message = JSON.parse(res);
        // console.log(res)
        return message.data;
      });
  }
  public record_empposition(worker_code: string, list: EmpPositionModel[]) {
    var item_data: string = "[";
    for (let i = 0; i < list.length; i++) {
      item_data = item_data + "{";
      item_data = item_data + "\"empposition_id\":\"" + list[i].empposition_id + "\"";
      item_data = item_data + ",\"empposition_date\":\"" + this.datePipe.transform(list[i].empposition_date) + "\"";
      item_data = item_data + ",\"empposition_position\":\"" + list[i].empposition_position + "\"";
      item_data = item_data + ",\"empposition_reason\":\"" + list[i].empposition_reason + "\"";
      item_data = item_data + ",\"company_code\":\"" + this.initial_current.CompCode + "\"";
      item_data = item_data + ",\"worker_code\":\"" + worker_code + "\"";
      item_data = item_data + "}" + ",";
    }
    if (item_data.length > 2) {
      item_data = item_data.substr(0, item_data.length - 1);
    }
    item_data = item_data + "]";

    var specificData = {
      transaction_data: item_data,
      worker_code: worker_code,
      company_code: this.initial_current.CompCode,
      modified_by: this.initial_current.Username
    };

    return this.http.post<any>(this.config.ApiEmployeeModule + '/empposition', specificData, this.options).toPromise()
      .then((res) => {
        return res;
      });
  }
  public delete_empposition(model: EmpPositionModel) {
    const data = {
      empdep_id: model.empposition_id,
      worker_code: model.worker_code,
      company_code: this.initial_current.CompCode,
      modified_by: this.initial_current.Username
    };

    return this.http.post<any>(this.config.ApiEmployeeModule + '/empposition_del', data, this.options).toPromise()
      .then((res) => {
        return res;
      });
  }
  public empposition_import(file: File, file_name: string, file_type: string) {
    const formData = new FormData();
    formData.append('file', file);

    var para = "fileName=" + file_name + "." + file_type;
    para += "&token=" + this.initial_current.Token;
    para += "&by=" + this.initial_current.Username;

    return this.http.post<any>(this.config.ApiEmployeeModule + '/doUploadEmpPosition?' + para, formData).toPromise()
      .then((res) => {
        return res;
      });
  }

  //Emp Group
  public getworker_group(company: string, code: string) {

    var filter = {
      device_name: '',
      ip: "localhost",
      username: this.initial_current.Username,
      company_code: company,
      language: "",
      worker_code: code
    };

    return this.http.post<any>(this.config.ApiEmployeeModule + '/empgrouplist', filter, this.options).toPromise()
      .then((res) => {
        let message = JSON.parse(res);
        // console.log(res)
        return message.data;
      });
  }
  public record_empgroup(worker_code: string, list: EmpGroupModel[]) {
    var item_data: string = "[";
    for (let i = 0; i < list.length; i++) {
      item_data = item_data + "{";
      item_data = item_data + "\"empgroup_id\":\"" + list[i].empgroup_id + "\"";
      item_data = item_data + ",\"empgroup_code\":\"" + list[i].empgroup_code + "\"";
      item_data = item_data + ",\"empgroup_date\":\"" + this.datePipe.transform(list[i].empgroup_date) + "\"";
      item_data = item_data + ",\"company_code\":\"" + this.initial_current.CompCode + "\"";
      item_data = item_data + ",\"worker_code\":\"" + worker_code + "\"";
      item_data = item_data + "}" + ",";
    }
    if (item_data.length > 2) {
      item_data = item_data.substr(0, item_data.length - 1);
    }
    item_data = item_data + "]";

    var specificData = {
      transaction_data: item_data,
      worker_code: worker_code,
      company_code: this.initial_current.CompCode,
      modified_by: this.initial_current.Username
    };

    return this.http.post<any>(this.config.ApiEmployeeModule + '/empgroup', specificData, this.options).toPromise()
      .then((res) => {
        return res;
      });
  }
  public delete_empgroup(model: EmpGroupModel) {
    const data = {
      empgroup_id: model.empgroup_id,
      worker_code: model.worker_code,
      company_code: this.initial_current.CompCode,
      modified_by: this.initial_current.Username
    };

    return this.http.post<any>(this.config.ApiEmployeeModule + '/empgroup_del', data, this.options).toPromise()
      .then((res) => {
        return res;
      });
  }
  public empgroup_import(file: File, file_name: string, file_type: string) {
    const formData = new FormData();
    formData.append('file', file);

    var para = "fileName=" + file_name + "." + file_type;
    para += "&token=" + this.initial_current.Token;
    para += "&by=" + this.initial_current.Username;

    return this.http.post<any>(this.config.ApiEmployeeModule + '/doUploadEmpGroup?' + para, formData).toPromise()
      .then((res) => {
        return res;
      });
  }

  //Emp Education
  public getworker_education(company: string, code: string) {

    var filter = {
      device_name: '',
      ip: "localhost",
      username: this.initial_current.Username,
      company_code: company,
      language: "",
      worker_code: code
    };

    return this.http.post<any>(this.config.ApiEmployeeModule + '/empeducationlist', filter, this.options).toPromise()
      .then((res) => {
        let message = JSON.parse(res);
        // console.log(res)
        return message.data;
      });
  }
  public record_empeducation(worker_code: string, list: EmpEducationModel[]) {
    var item_data: string = "[";
    for (let i = 0; i < list.length; i++) {
      item_data = item_data + "{";
      item_data = item_data + "\"empeducation_no\":\"" + list[i].empeducation_no + "\"";
      item_data = item_data + ",\"empeducation_gpa\":\"" + list[i].empeducation_gpa + "\"";
      item_data = item_data + ",\"empeducation_start\":\"" + this.datePipe.transform(list[i].empeducation_start) + "\"";
      item_data = item_data + ",\"empeducation_finish\":\"" + this.datePipe.transform(list[i].empeducation_finish) + "\"";
      item_data = item_data + ",\"institute_code\":\"" + list[i].institute_code + "\"";
      item_data = item_data + ",\"faculty_code\":\"" + list[i].faculty_code + "\"";
      item_data = item_data + ",\"major_code\":\"" + list[i].major_code + "\"";
      item_data = item_data + ",\"qualification_code\":\"" + list[i].qualification_code + "\"";
      item_data = item_data + ",\"company_code\":\"" + this.initial_current.CompCode + "\"";
      item_data = item_data + ",\"worker_code\":\"" + worker_code + "\"";
      item_data = item_data + "}" + ",";
    }
    if (item_data.length > 2) {
      item_data = item_data.substr(0, item_data.length - 1);
    }
    item_data = item_data + "]";

    var specificData = {
      transaction_data: item_data,
      worker_code: worker_code,
      company_code: this.initial_current.CompCode,
      modified_by: this.initial_current.Username
    };

    return this.http.post<any>(this.config.ApiEmployeeModule + '/empeducation', specificData, this.options).toPromise()
      .then((res) => {
        return res;
      });
  }
  public delete_empeducation(model: EmpEducationModel) {
    const data = {
      empeducation_no: model.empeducation_no,
      worker_code: model.worker_code,
      company_code: this.initial_current.CompCode,
      modified_by: this.initial_current.Username
    };

    return this.http.post<any>(this.config.ApiEmployeeModule + '/empeducation_del', data, this.options).toPromise()
      .then((res) => {
        return res;
      });
  }
  public empeducation_import(file: File, file_name: string, file_type: string) {
    const formData = new FormData();
    formData.append('file', file);

    var para = "fileName=" + file_name + "." + file_type;
    para += "&token=" + this.initial_current.Token;
    para += "&by=" + this.initial_current.Username;

    return this.http.post<any>(this.config.ApiEmployeeModule + '/doUploadEmpEducation?' + para, formData).toPromise()
      .then((res) => {
        return res;
      });
  }

  //Emp Training
  public getworker_training(company: string, code: string) {

    var filter = {
      device_name: '',
      ip: "localhost",
      username: this.initial_current.Username,
      company_code: company,
      language: "",
      worker_code: code
    };

    return this.http.post<any>(this.config.ApiEmployeeModule + '/emptraininglist', filter, this.options).toPromise()
      .then((res) => {
        let message = JSON.parse(res);
        // console.log(res)
        return message.data;
      });
  }
  public record_emptraining(worker_code: string, list: EmpTrainingModel[]) {
    var item_data: string = "[";
    for (let i = 0; i < list.length; i++) {
      item_data = item_data + "{";
      item_data = item_data + "\"emptraining_no\":\"" + list[i].emptraining_no + "\"";
      item_data = item_data + ",\"emptraining_start\":\"" + this.datePipe.transform(list[i].emptraining_start) + "\"";
      item_data = item_data + ",\"emptraining_finish\":\"" + this.datePipe.transform(list[i].emptraining_finish) + "\"";
      item_data = item_data + ",\"emptraining_status\":\"" + list[i].emptraining_status + "\"";
      item_data = item_data + ",\"emptraining_hours\":\"" + list[i].emptraining_hours + "\"";
      item_data = item_data + ",\"emptraining_cost\":\"" + list[i].emptraining_cost + "\"";
      item_data = item_data + ",\"emptraining_note\":\"" + list[i].emptraining_note + "\"";
      item_data = item_data + ",\"institute_code\":\"" + list[i].institute_code + "\"";
      item_data = item_data + ",\"institute_other\":\"" + list[i].institute_other + "\"";
      item_data = item_data + ",\"course_code\":\"" + list[i].course_code + "\"";
      item_data = item_data + ",\"course_other\":\"" + list[i].course_other + "\"";
      item_data = item_data + ",\"company_code\":\"" + this.initial_current.CompCode + "\"";
      item_data = item_data + ",\"worker_code\":\"" + worker_code + "\"";
      item_data = item_data + "}" + ",";
    }
    if (item_data.length > 2) {
      item_data = item_data.substr(0, item_data.length - 1);
    }
    item_data = item_data + "]";

    var specificData = {
      transaction_data: item_data,
      worker_code: worker_code,
      company_code: this.initial_current.CompCode,
      modified_by: this.initial_current.Username
    };

    return this.http.post<any>(this.config.ApiEmployeeModule + '/emptraining', specificData, this.options).toPromise()
      .then((res) => {
        return res;
      });
  }
  public delete_emptraining(model: EmpTrainingModel) {
    const data = {
      emptraining_no: model.emptraining_no,
      worker_code: model.worker_code,
      company_code: this.initial_current.CompCode,
      modified_by: this.initial_current.Username
    };

    return this.http.post<any>(this.config.ApiEmployeeModule + '/emptraining_del', data, this.options).toPromise()
      .then((res) => {
        return res;
      });
  }
  public emptraining_import(file: File, file_name: string, file_type: string) {
    const formData = new FormData();
    formData.append('file', file);

    var para = "fileName=" + file_name + "." + file_type;
    para += "&token=" + this.initial_current.Token;
    para += "&by=" + this.initial_current.Username;

    return this.http.post<any>(this.config.ApiEmployeeModule + '/doUploadEmpTraining?' + para, formData).toPromise()
      .then((res) => {
        return res;
      });
  }

  //Emp Assessment
  public getworker_assessment(company: string, code: string) {

    var filter = {
      device_name: '',
      ip: "localhost",
      username: this.initial_current.Username,
      company_code: company,
      language: "",
      worker_code: code
    };

    return this.http.post<any>(this.config.ApiEmployeeModule + '/empassessmentlist', filter, this.options).toPromise()
      .then((res) => {
        let message = JSON.parse(res);
        // console.log(res)
        return message.data;
      });
  }
  public record_empassessment(worker_code: string, list: EmpAssessmentModel[]) {
    var item_data: string = "[";
    for (let i = 0; i < list.length; i++) {
      item_data = item_data + "{";
      item_data = item_data + "\"empassessment_id\":\"" + list[i].empassessment_id + "\"";
      item_data = item_data + ",\"empassessment_location\":\"" + list[i].empassessment_location + "\"";
      item_data = item_data + ",\"empassessment_topic\":\"" + list[i].empassessment_topic + "\"";
      item_data = item_data + ",\"empassessment_fromdate\":\"" + this.datePipe.transform(list[i].empassessment_fromdate) + "\"";
      item_data = item_data + ",\"empassessment_todate\":\"" + this.datePipe.transform(list[i].empassessment_todate) + "\"";
      item_data = item_data + ",\"empassessment_count\":\"" + list[i].empassessment_count + "\"";
      item_data = item_data + ",\"empassessment_result\":\"" + list[i].empassessment_result + "\"";
      item_data = item_data + ",\"company_code\":\"" + this.initial_current.CompCode + "\"";
      item_data = item_data + ",\"worker_code\":\"" + worker_code + "\"";
      item_data = item_data + "}" + ",";
    }
    if (item_data.length > 2) {
      item_data = item_data.substr(0, item_data.length - 1);
    }
    item_data = item_data + "]";

    var specificData = {
      transaction_data: item_data,
      worker_code: worker_code,
      company_code: this.initial_current.CompCode,
      modified_by: this.initial_current.Username
    };

    return this.http.post<any>(this.config.ApiEmployeeModule + '/empassessment', specificData, this.options).toPromise()
      .then((res) => {
        return res;
      });
  }
  public delete_empassessment(model: EmpAssessmentModel) {
    const data = {
      empassessment_id: model.empassessment_id,
      worker_code: model.worker_code,
      company_code: this.initial_current.CompCode,
      modified_by: this.initial_current.Username
    };

    return this.http.post<any>(this.config.ApiEmployeeModule + '/empassessment_del', data, this.options).toPromise()
      .then((res) => {
        return res;
      });
  }
  public empassessment_import(file: File, file_name: string, file_type: string) {
    const formData = new FormData();
    formData.append('file', file);

    var para = "fileName=" + file_name + "." + file_type;
    para += "&token=" + this.initial_current.Token;
    para += "&by=" + this.initial_current.Username;

    return this.http.post<any>(this.config.ApiEmployeeModule + '/doUploadEmpAssessment?' + para, formData).toPromise()
      .then((res) => {
        return res;
      });
  }

  //Emp Criminal
  public getworker_criminal(company: string, code: string) {

    var filter = {
      device_name: '',
      ip: "localhost",
      username: this.initial_current.Username,
      company_code: company,
      language: "",
      worker_code: code
    };

    return this.http.post<any>(this.config.ApiEmployeeModule + '/empcriminallist', filter, this.options).toPromise()
      .then((res) => {
        let message = JSON.parse(res);
        // console.log(res)
        return message.data;
      });
  }
  public record_empcriminal(worker_code: string, list: EmpCriminalModel[]) {
    var item_data: string = "[";
    for (let i = 0; i < list.length; i++) {
      item_data = item_data + "{";
      item_data = item_data + "\"empcriminal_id\":\"" + list[i].empcriminal_id + "\"";
      item_data = item_data + ",\"empcriminal_location\":\"" + list[i].empcriminal_location + "\"";
      item_data = item_data + ",\"empcriminal_fromdate\":\"" + this.datePipe.transform(list[i].empcriminal_fromdate) + "\"";
      item_data = item_data + ",\"empcriminal_todate\":\"" + this.datePipe.transform(list[i].empcriminal_todate) + "\"";
      item_data = item_data + ",\"empcriminal_count\":\"" + list[i].empcriminal_count + "\"";
      item_data = item_data + ",\"empcriminal_result\":\"" + list[i].empcriminal_result + "\"";
      item_data = item_data + ",\"company_code\":\"" + this.initial_current.CompCode + "\"";
      item_data = item_data + ",\"worker_code\":\"" + worker_code + "\"";
      item_data = item_data + "}" + ",";
    }
    if (item_data.length > 2) {
      item_data = item_data.substr(0, item_data.length - 1);
    }
    item_data = item_data + "]";

    var specificData = {
      transaction_data: item_data,
      worker_code: worker_code,
      company_code: this.initial_current.CompCode,
      modified_by: this.initial_current.Username
    };

    return this.http.post<any>(this.config.ApiEmployeeModule + '/empcriminal', specificData, this.options).toPromise()
      .then((res) => {
        return res;
      });
  }
  public delete_empcriminal(model: EmpCriminalModel) {
    const data = {
      empcriminal_id: model.empcriminal_id,
      worker_code: model.worker_code,
      company_code: this.initial_current.CompCode,
      modified_by: this.initial_current.Username
    };

    return this.http.post<any>(this.config.ApiEmployeeModule + '/empcriminal_del', data, this.options).toPromise()
      .then((res) => {
        return res;
      });
  }
  public empcriminal_import(file: File, file_name: string, file_type: string) {
    const formData = new FormData();
    formData.append('file', file);

    var para = "fileName=" + file_name + "." + file_type;
    para += "&token=" + this.initial_current.Token;
    para += "&by=" + this.initial_current.Username;

    return this.http.post<any>(this.config.ApiEmployeeModule + '/doUploadEmpCriminal?' + para, formData).toPromise()
      .then((res) => {
        return res;
      });
  }

  //Emp Salary
  public getworker_salary(company: string, code: string) {

    var filter = {
      device_name: '',
      ip: "localhost",
      username: this.initial_current.Username,
      company_code: company,
      language: "",
      worker_code: code
    };

    return this.http.post<any>(this.config.ApiEmployeeModule + '/empsalarylist', filter, this.options).toPromise()
      .then((res) => {
        let message = JSON.parse(res);
        // console.log(res)
        return message.data;
      });
  }
  public record_empsalary(worker_code: string, list: EmpSalaryModel[]) {
    var item_data: string = "[";
    for (let i = 0; i < list.length; i++) {
      item_data = item_data + "{";
      item_data = item_data + "\"empsalary_id\":\"" + list[i].empsalary_id + "\"";
      item_data = item_data + ",\"empsalary_amount\":\"" + list[i].empsalary_amount + "\"";
      item_data = item_data + ",\"empsalary_date\":\"" + this.datePipe.transform(list[i].empsalary_date) + "\"";
      item_data = item_data + ",\"empsalary_reason\":\"" + list[i].empsalary_reason + "\"";
      item_data = item_data + ",\"empsalary_incamount\":\"" + list[i].empsalary_incamount + "\"";
      item_data = item_data + ",\"empsalary_incpercent\":\"" + list[i].empsalary_incpercent + "\"";
      item_data = item_data + ",\"company_code\":\"" + this.initial_current.CompCode + "\"";
      item_data = item_data + ",\"worker_code\":\"" + worker_code + "\"";
      item_data = item_data + "}" + ",";
    }
    if (item_data.length > 2) {
      item_data = item_data.substr(0, item_data.length - 1);
    }
    item_data = item_data + "]";

    var specificData = {
      transaction_data: item_data,
      worker_code: worker_code,
      company_code: this.initial_current.CompCode,
      modified_by: this.initial_current.Username
    };

    return this.http.post<any>(this.config.ApiEmployeeModule + '/empsalary', specificData, this.options).toPromise()
      .then((res) => {
        return res;
      });
  }
  public delete_empsalary(model: EmpSalaryModel) {
    const data = {
      empsalary_id: model.empsalary_id,
      worker_code: model.worker_code,
      company_code: this.initial_current.CompCode,
      modified_by: this.initial_current.Username
    };

    return this.http.post<any>(this.config.ApiEmployeeModule + '/empsalary_del', data, this.options).toPromise()
      .then((res) => {
        return res;
      });
  }
  public empsalary_import(file: File, file_name: string, file_type: string) {
    const formData = new FormData();
    formData.append('file', file);

    var para = "fileName=" + file_name + "." + file_type;
    para += "&token=" + this.initial_current.Token;
    para += "&by=" + this.initial_current.Username;

    return this.http.post<any>(this.config.ApiEmployeeModule + '/doUploadEmpSalary?' + para, formData).toPromise()
      .then((res) => {
        return res;
      });
  }

  //Emp Benefit
  public getworker_benefit(company: string, code: string) {

    var filter = {
      device_name: '',
      ip: "localhost",
      username: this.initial_current.Username,
      company_code: company,
      language: "",
      worker_code: code
    };

    return this.http.post<any>(this.config.ApiEmployeeModule + '/empbenefitlist', filter, this.options).toPromise()
      .then((res) => {
        let message = JSON.parse(res);
        // console.log(res)
        return message.data;
      });
  }
  public record_empbenefit(worker_code: string, list: EmpBenefitsModel[]) {
    var item_data: string = "[";
    for (let i = 0; i < list.length; i++) {
      item_data = item_data + "{";
      item_data = item_data + "\"empbenefit_id\":\"" + list[i].empbenefit_id + "\"";
      item_data = item_data + ",\"empbenefit_amount\":\"" + list[i].empbenefit_amount + "\"";
      item_data = item_data + ",\"empbenefit_startdate\":\"" + this.datePipe.transform(list[i].empbenefit_startdate) + "\"";
      item_data = item_data + ",\"empbenefit_enddate\":\"" + this.datePipe.transform(list[i].empbenefit_enddate) + "\"";
      item_data = item_data + ",\"empbenefit_reason\":\"" + list[i].empbenefit_reason + "\"";
      item_data = item_data + ",\"empbenefit_note\":\"" + list[i].empbenefit_note + "\"";
      item_data = item_data + ",\"empbenefit_paytype\":\"" + list[i].empbenefit_paytype + "\"";
      item_data = item_data + ",\"empbenefit_break\":\"" + list[i].empbenefit_break + "\"";
      item_data = item_data + ",\"empbenefit_breakreason\":\"" + list[i].empbenefit_breakreason + "\"";
      item_data = item_data + ",\"empbenefit_conditionpay\":\"" + list[i].empbenefit_conditionpay + "\"";
      item_data = item_data + ",\"empbenefit_payfirst\":\"" + list[i].empbenefit_payfirst + "\"";
      item_data = item_data + ",\"item_code\":\"" + list[i].item_code + "\"";
      item_data = item_data + ",\"company_code\":\"" + this.initial_current.CompCode + "\"";
      item_data = item_data + ",\"worker_code\":\"" + worker_code + "\"";
      item_data = item_data + "}" + ",";
    }
    if (item_data.length > 2) {
      item_data = item_data.substr(0, item_data.length - 1);
    }
    item_data = item_data + "]";

    var specificData = {
      transaction_data: item_data,
      worker_code: worker_code,
      company_code: this.initial_current.CompCode,
      modified_by: this.initial_current.Username
    };

    return this.http.post<any>(this.config.ApiEmployeeModule + '/empbenefit', specificData, this.options).toPromise()
      .then((res) => {
        return res;
      });
  }
  public delete_empbenefit(model: EmpBenefitsModel) {
    const data = {
      empbenefit_id: model.empbenefit_id,
      worker_code: model.worker_code,
      company_code: this.initial_current.CompCode,
      modified_by: this.initial_current.Username
    };

    return this.http.post<any>(this.config.ApiEmployeeModule + '/empbenefit_del', data, this.options).toPromise()
      .then((res) => {
        return res;
      });
  }
  public empbenefit_import(file: File, file_name: string, file_type: string) {
    const formData = new FormData();
    formData.append('file', file);

    var para = "fileName=" + file_name + "." + file_type;
    para += "&token=" + this.initial_current.Token;
    para += "&by=" + this.initial_current.Username;

    return this.http.post<any>(this.config.ApiEmployeeModule + '/doUploadEmpBenefit?' + para, formData).toPromise()
      .then((res) => {
        return res;
      });
  }

  //Emp Provident
  public getworker_provident(company: string, code: string) {

    var filter = {
      device_name: '',
      ip: "localhost",
      username: this.initial_current.Username,
      company_code: company,
      language: "",
      worker_code: code
    };

    return this.http.post<any>(this.config.ApiEmployeeModule + '/empprovidentlist', filter, this.options).toPromise()
      .then((res) => {
        let message = JSON.parse(res);
        // console.log(res)
        return message.data;
      });
  }
  public record_empprovident(worker_code: string, list: EmpProvidentModel[]) {
    var item_data: string = "[";
    for (let i = 0; i < list.length; i++) {
      item_data = item_data + "{";
      item_data = item_data + "\"provident_code\":\"" + list[i].provident_code + "\"";
      item_data = item_data + ",\"empprovident_card\":\"" + list[i].empprovident_card + "\"";
      item_data = item_data + ",\"empprovident_entry\":\"" + this.datePipe.transform(list[i].empprovident_entry) + "\"";
      item_data = item_data + ",\"empprovident_start\":\"" + this.datePipe.transform(list[i].empprovident_start) + "\"";
      if (this.datePipe.transform(list[i].empprovident_end)) {
        item_data = item_data + ",\"empprovident_end\":\"" + this.datePipe.transform(list[i].empprovident_end) + "\"";
      }
      item_data = item_data + ",\"company_code\":\"" + this.initial_current.CompCode + "\"";
      item_data = item_data + ",\"worker_code\":\"" + worker_code + "\"";
      item_data = item_data + "}" + ",";
    }
    if (item_data.length > 2) {
      item_data = item_data.substr(0, item_data.length - 1);
    }
    item_data = item_data + "]";

    console.log(item_data)
    var specificData = {
      transaction_data: item_data,
      worker_code: worker_code,
      company_code: this.initial_current.CompCode,
      modified_by: this.initial_current.Username
    };

    return this.http.post<any>(this.config.ApiEmployeeModule + '/empprovident', specificData, this.options).toPromise()
      .then((res) => {
        return res;
      });
  }
  public delete_empprovident(model: EmpProvidentModel) {
    const data = {
      provident_code: model.provident_code,
      worker_code: model.worker_code,
      company_code: this.initial_current.CompCode,
      modified_by: this.initial_current.Username
    };

    return this.http.post<any>(this.config.ApiEmployeeModule + '/empprovident_del', data, this.options).toPromise()
      .then((res) => {
        return res;
      });
  }
  public empprovident_import(file: File, file_name: string, file_type: string) {
    const formData = new FormData();
    formData.append('file', file);

    var para = "fileName=" + file_name + "." + file_type;
    para += "&token=" + this.initial_current.Token;
    para += "&by=" + this.initial_current.Username;

    return this.http.post<any>(this.config.ApiEmployeeModule + '/doUploadEmpProvident?' + para, formData).toPromise()
      .then((res) => {
        return res;
      });
  }



  //Emp Reduce
  public getworker_reduce(company: string, code: string) {

    var filter = {
      device_name: '',
      ip: "localhost",
      username: this.initial_current.Username,
      company_code: company,
      language: "",
      worker_code: code
    };

    return this.http.post<any>(this.config.ApiEmployeeModule + '/empreducelist', filter, this.options).toPromise()
      .then((res) => {
        let message = JSON.parse(res);
        // console.log(res)
        return message.data;
      });
  }
  public record_empreduce(worker_code: string, list: EmpReduceModel[]) {
    var item_data: string = "[";
    for (let i = 0; i < list.length; i++) {
      item_data = item_data + "{";
      item_data = item_data + "\"empreduce_id\":\"" + list[i].empreduce_id + "\"";
      item_data = item_data + ",\"reduce_type\":\"" + list[i].reduce_type + "\"";
      item_data = item_data + ",\"empreduce_amount\":\"" + list[i].empreduce_amount + "\"";
      item_data = item_data + ",\"company_code\":\"" + this.initial_current.CompCode + "\"";
      item_data = item_data + ",\"worker_code\":\"" + worker_code + "\"";
      item_data = item_data + "}" + ",";
    }
    if (item_data.length > 2) {
      item_data = item_data.substr(0, item_data.length - 1);
    }
    item_data = item_data + "]";

    var specificData = {
      transaction_data: item_data,
      worker_code: worker_code,
      company_code: this.initial_current.CompCode,
      modified_by: this.initial_current.Username
    };

    return this.http.post<any>(this.config.ApiEmployeeModule + '/empreduce', specificData, this.options).toPromise()
      .then((res) => {
        return res;
      });
  }
  public delete_empreduce(model: EmpReduceModel) {
    const data = {
      empreduce_id: model.empreduce_id,
      worker_code: model.worker_code,
      company_code: this.initial_current.CompCode,
      modified_by: this.initial_current.Username
    };

    return this.http.post<any>(this.config.ApiEmployeeModule + '/empreduce_del', data, this.options).toPromise()
      .then((res) => {
        return res;
      });
  }
  public empreduce_import(file: File, file_name: string, file_type: string) {
    const formData = new FormData();
    formData.append('file', file);

    var para = "fileName=" + file_name + "." + file_type;
    para += "&token=" + this.initial_current.Token;
    para += "&by=" + this.initial_current.Username;

    return this.http.post<any>(this.config.ApiEmployeeModule + '/doUploadEmpReduce?' + para, formData).toPromise()
      .then((res) => {
        return res;
      });
  }

  //Emp acc
  public getworker_accumalate(company: string, code: string) {

    var filter = {
      device_name: '',
      ip: "localhost",
      username: this.initial_current.Username,
      company_code: company,
      language: "",
      worker_code: code
    };

    return this.http.post<any>(this.config.ApiEmployeeModule + '/empaccumalatelist', filter, this.options).toPromise()
      .then((res) => {
        let message = JSON.parse(res);
        // console.log(res)
        return message.data;
      });
  }
  public delete_empaccumalate(model: EmpAccumalateModel) {
    const data = {
      empreduce_id: model.paydate,
      worker_code: model.worker_code,
      company_code: this.initial_current.CompCode,
      modified_by: this.initial_current.Username
    };

    return this.http.post<any>(this.config.ApiEmployeeModule + '/empreduce_del', data, this.options).toPromise()
      .then((res) => {
        return res;
      });
  }
  public empaccumalate_import(file: File, file_name: string, file_type: string) {
    const formData = new FormData();
    formData.append('file', file);

    var para = "fileName=" + file_name + "." + file_type;
    para += "&token=" + this.initial_current.Token;
    para += "&by=" + this.initial_current.Username;

    return this.http.post<any>(this.config.ApiEmployeeModule + '/doUploadEmpReduce?' + para, formData).toPromise()
      .then((res) => {
        return res;
      });
  }

  //emp location
  public getworker_location(company: string, code: string) {

    var filter = {
      device_name: '',
      ip: "localhost",
      username: this.initial_current.Username,
      company_code: company,
      language: "",
      worker_code: code
    };

    return this.http.post<any>(this.config.ApiEmployeeModule + '/emplocationlist', filter, this.options).toPromise()
      .then((res) => {
        let message = JSON.parse(res);
        // console.log(res)
        return message.data;
      });
  }
  public record_emplocation(worker_code: string, list: EmpLocationModel[]) {
    var item_data: string = "[";
    for (let i = 0; i < list.length; i++) {
      item_data = item_data + "{";
      item_data = item_data + "\"location_code\":\"" + list[i].location_code + "\"";
      item_data = item_data + ",\"emplocation_startdate\":\"" + this.datePipe.transform(list[i].emplocation_startdate) + "\"";
      item_data = item_data + ",\"emplocation_enddate\":\"" + this.datePipe.transform(list[i].emplocation_enddate) + "\"";
      item_data = item_data + ",\"emplocation_note\":\"" + list[i].emplocation_note + "\"";
      item_data = item_data + ",\"company_code\":\"" + this.initial_current.CompCode + "\"";
      item_data = item_data + ",\"worker_code\":\"" + worker_code + "\"";
      item_data = item_data + "}" + ",";
    }
    if (item_data.length > 2) {
      item_data = item_data.substr(0, item_data.length - 1);
    }
    item_data = item_data + "]";

    var specificData = {
      transaction_data: item_data,
      worker_code: worker_code,
      company_code: this.initial_current.CompCode,
      modified_by: this.initial_current.Username
    };

    return this.http.post<any>(this.config.ApiEmployeeModule + '/emplocation', specificData, this.options).toPromise()
      .then((res) => {
        return res;
      });
  }
  public delete_emplocation(model: EmpLocationModel) {
    const data = {
      location_code: model.location_code,
      worker_code: model.worker_code,
      company_code: this.initial_current.CompCode,
      modified_by: this.initial_current.Username
    };

    return this.http.post<any>(this.config.ApiEmployeeModule + '/emplocation_del', data, this.options).toPromise()
      .then((res) => {
        return res;
      });
  }

  public emplocation_import(file: File, file_name: string, file_type: string) {
    const formData = new FormData();
    formData.append('file', file);

    var para = "fileName=" + file_name + "." + file_type;
    para += "&token=" + this.initial_current.Token;
    para += "&by=" + this.initial_current.Username;

    return this.http.post<any>(this.config.ApiEmployeeModule + '/doUploadEmpLocation?' + para, formData).toPromise()
      .then((res) => {
        return res;
      });
  }

  //emp branch
  public getworker_branch(company: string, code: string) {

    var filter = {
      device_name: '',
      ip: "localhost",
      username: this.initial_current.Username,
      company_code: company,
      language: "",
      worker_code: code
    };

    return this.http.post<any>(this.config.ApiEmployeeModule + '/empbranchlist', filter, this.options).toPromise()
      .then((res) => {
        let message = JSON.parse(res);
        // console.log(res)
        return message.data;
      });
  }
  public record_empbranch(worker_code: string, list: EmpBranchModel[]) {
    var item_data: string = "[";
    for (let i = 0; i < list.length; i++) {
      item_data = item_data + "{";
      item_data = item_data + "\"branch_code\":\"" + list[i].branch_code + "\"";
      item_data = item_data + ",\"empbranch_startdate\":\"" + this.datePipe.transform(list[i].empbranch_startdate) + "\"";
      item_data = item_data + ",\"empbranch_enddate\":\"" + this.datePipe.transform(list[i].empbranch_enddate) + "\"";
      item_data = item_data + ",\"empbranch_note\":\"" + list[i].empbranch_note + "\"";
      item_data = item_data + ",\"company_code\":\"" + this.initial_current.CompCode + "\"";
      item_data = item_data + ",\"worker_code\":\"" + worker_code + "\"";
      item_data = item_data + "}" + ",";
    }
    if (item_data.length > 2) {
      item_data = item_data.substr(0, item_data.length - 1);
    }
    item_data = item_data + "]";

    var specificData = {
      transaction_data: item_data,
      worker_code: worker_code,
      company_code: this.initial_current.CompCode,
      modified_by: this.initial_current.Username
    };

    return this.http.post<any>(this.config.ApiEmployeeModule + '/empbranch', specificData, this.options).toPromise()
      .then((res) => {
        return res;
      });
  }
  public delete_empbranch(model: EmpBranchModel) {
    const data = {
      branch_code: model.branch_code,
      worker_code: model.worker_code,
      company_code: this.initial_current.CompCode,
      modified_by: this.initial_current.Username
    };

    return this.http.post<any>(this.config.ApiEmployeeModule + '/empbranch_del', data, this.options).toPromise()
      .then((res) => {
        return res;
      });
  }

  public empbranch_import(file: File, file_name: string, file_type: string) {
    const formData = new FormData();
    formData.append('file', file);

    var para = "fileName=" + file_name + "." + file_type;
    para += "&token=" + this.initial_current.Token;
    para += "&by=" + this.initial_current.Username;

    return this.http.post<any>(this.config.ApiEmployeeModule + '/doUploadEmpBranch?' + para, formData).toPromise()
      .then((res) => {
        return res;
      });
  }

  //emp Supply
  public getworker_supply(company: string, code: string) {

    var filter = {
      device_name: '',
      ip: "localhost",
      username: this.initial_current.Username,
      company_code: company,
      language: "",
      worker_code: code
    };

    return this.http.post<any>(this.config.ApiEmployeeModule + '/empsupplylist', filter, this.options).toPromise()
      .then((res) => {
        let message = JSON.parse(res);
        // console.log(res)
        return message.data;
      });
  }
  public record_empsupply(worker_code: string, list: EmpSupplyModel[]) {
    var item_data: string = "[";
    for (let i = 0; i < list.length; i++) {
      item_data = item_data + "{";
      item_data = item_data + "\"empsupply_code\":\"" + list[i].empsupply_code + "\"";
      item_data = item_data + ",\"empsupply_qauntity\":\"" + list[i].empsupply_qauntity + "\"";
      item_data = item_data + ",\"empsupply_issuedate\":\"" + this.datePipe.transform(list[i].empsupply_issuedate) + "\"";
      item_data = item_data + ",\"empsupply_note\":\"" + list[i].empsupply_note + "\"";
      if (this.datePipe.transform(list[i].empsupply_returndate)) {
        item_data = item_data + ",\"empsupply_returndate\":\"" + this.datePipe.transform(list[i].empsupply_returndate) + "\"";
      }
      item_data = item_data + ",\"empsupply_returnstatus\":\"" + list[i].empsupply_returnstatus + "\"";
      item_data = item_data + ",\"company_code\":\"" + this.initial_current.CompCode + "\"";
      item_data = item_data + ",\"worker_code\":\"" + worker_code + "\"";
      item_data = item_data + "}" + ",";
    }
    if (item_data.length > 2) {
      item_data = item_data.substr(0, item_data.length - 1);
    }
    item_data = item_data + "]";

    var specificData = {
      transaction_data: item_data,
      worker_code: worker_code,
      company_code: this.initial_current.CompCode,
      modified_by: this.initial_current.Username
    };

    return this.http.post<any>(this.config.ApiEmployeeModule + '/empsupply', specificData, this.options).toPromise()
      .then((res) => {
        return res;
      });
  }
  public delete_empsupply(model: EmpSupplyModel) {
    const data = {
      empsupply_code: model.empsupply_code,
      worker_code: model.worker_code,
      company_code: this.initial_current.CompCode,
      modified_by: this.initial_current.Username
    };

    return this.http.post<any>(this.config.ApiEmployeeModule + '/empsupply_del', data, this.options).toPromise()
      .then((res) => {
        return res;
      });
  }

  public empsupply_import(file: File, file_name: string, file_type: string) {
    const formData = new FormData();
    formData.append('file', file);

    var para = "fileName=" + file_name + "." + file_type;
    para += "&token=" + this.initial_current.Token;
    para += "&by=" + this.initial_current.Username;

    return this.http.post<any>(this.config.ApiEmployeeModule + '/doUploadEmpSupply?' + para, formData).toPromise()
      .then((res) => {
        return res;
      });
  }

  //emp Uniform
  public getworker_uniform(company: string, code: string) {

    var filter = {
      device_name: '',
      ip: "localhost",
      username: this.initial_current.Username,
      company_code: company,
      language: "",
      worker_code: code
    };

    return this.http.post<any>(this.config.ApiEmployeeModule + '/empuniformlist', filter, this.options).toPromise()
      .then((res) => {
        let message = JSON.parse(res);
        // console.log(res)
        return message.data;
      });
  }
  public record_empuniform(worker_code: string, list: EmpUniformModel[]) {
    var item_data: string = "[";
    for (let i = 0; i < list.length; i++) {
      item_data = item_data + "{";
      item_data = item_data + "\"empuniform_code\":\"" + list[i].empuniform_code + "\"";
      item_data = item_data + ",\"empuniform_qauntity\":\"" + list[i].empuniform_qauntity + "\"";
      item_data = item_data + ",\"empuniform_amount\":\"" + list[i].empuniform_amount + "\"";
      item_data = item_data + ",\"empuniform_issuedate\":\"" + this.datePipe.transform(list[i].empuniform_issuedate) + "\"";
      item_data = item_data + ",\"empuniform_note\":\"" + list[i].empuniform_note + "\"";
      item_data = item_data + ",\"company_code\":\"" + this.initial_current.CompCode + "\"";
      item_data = item_data + ",\"worker_code\":\"" + worker_code + "\"";
      item_data = item_data + "}" + ",";
    }
    if (item_data.length > 2) {
      item_data = item_data.substr(0, item_data.length - 1);
    }
    item_data = item_data + "]";

    var specificData = {
      transaction_data: item_data,
      worker_code: worker_code,
      company_code: this.initial_current.CompCode,
      modified_by: this.initial_current.Username
    };

    return this.http.post<any>(this.config.ApiEmployeeModule + '/empuniform', specificData, this.options).toPromise()
      .then((res) => {
        return res;
      });
  }
  public delete_empuniform(model: EmpUniformModel) {
    const data = {
      empsupply_code: model.empuniform_code,
      worker_code: model.worker_code,
      company_code: this.initial_current.CompCode,
      modified_by: this.initial_current.Username
    };

    return this.http.post<any>(this.config.ApiEmployeeModule + '/empuniform_del', data, this.options).toPromise()
      .then((res) => {
        return res;
      });
  }

  public empuniform_import(file: File, file_name: string, file_type: string) {
    const formData = new FormData();
    formData.append('file', file);

    var para = "fileName=" + file_name + "." + file_type;
    para += "&token=" + this.initial_current.Token;
    para += "&by=" + this.initial_current.Username;

    return this.http.post<any>(this.config.ApiEmployeeModule + '/doUploadEmpUniform?' + para, formData).toPromise()
      .then((res) => {
        return res;
      });
  }

  //emp Suggest
  public getworker_suggest(company: string, code: string) {

    var filter = {
      device_name: '',
      ip: "localhost",
      username: this.initial_current.Username,
      company_code: company,
      language: "",
      worker_code: code
    };

    return this.http.post<any>(this.config.ApiEmployeeModule + '/empsuggestlist', filter, this.options).toPromise()
      .then((res) => {
        let message = JSON.parse(res);
        // console.log(res)
        return message.data;
      });
  }
  public record_empsuggest(worker_code: string, list: EmpSuggestModel[]) {
    var item_data: string = "[";
    for (let i = 0; i < list.length; i++) {
      item_data = item_data + "{";
      item_data = item_data + "\"empsuggest_code\":\"" + list[i].empsuggest_code + "\"";
      if (this.datePipe.transform(list[i].empsuggest_date)) {
        item_data = item_data + ",\"empsuggest_date\":\"" + this.datePipe.transform(list[i].empsuggest_date) + "\"";
      }
      
      item_data = item_data + ",\"empsuggest_note\":\"" + list[i].empsuggest_note + "\"";
      item_data = item_data + ",\"company_code\":\"" + this.initial_current.CompCode + "\"";
      item_data = item_data + ",\"worker_code\":\"" + worker_code + "\"";
      item_data = item_data + "}" + ",";
    }
    if (item_data.length > 2) {
      item_data = item_data.substr(0, item_data.length - 1);
    }
    item_data = item_data + "]";

    var specificData = {
      transaction_data: item_data,
      worker_code: worker_code,
      company_code: this.initial_current.CompCode,
      modified_by: this.initial_current.Username
    };

    return this.http.post<any>(this.config.ApiEmployeeModule + '/empsuggest', specificData, this.options).toPromise()
      .then((res) => {
        return res;
      });
  }
  public delete_empsuggest(model: EmpSuggestModel) {
    const data = {
      empsupply_code: model.empsuggest_code,
      worker_code: model.worker_code,
      company_code: this.initial_current.CompCode,
      modified_by: this.initial_current.Username
    };

    return this.http.post<any>(this.config.ApiEmployeeModule + '/empsuggest_del', data, this.options).toPromise()
      .then((res) => {
        return res;
      });
  }

  public empsuggest_import(file: File, file_name: string, file_type: string) {
    const formData = new FormData();
    formData.append('file', file);

    var para = "fileName=" + file_name + "." + file_type;
    para += "&token=" + this.initial_current.Token;
    para += "&by=" + this.initial_current.Username;

    return this.http.post<any>(this.config.ApiEmployeeModule + '/doUploadEmpSuggest?' + para, formData).toPromise()
      .then((res) => {
        return res;
      });
  }
}

import { Injectable } from '@angular/core';
import { AppConfig } from '../../config/config';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { InitialCurrent } from '../../config/initial_current';
import { ProaddressModel } from '../../models/project/project_address';
import { ProcontactModel } from '../../models/project/project_contact';
import { ProcontractModel } from '../../models/project/project_contract';
import { ProresponsibleModel } from '../../models/project/project_responsible';
import { ProtimepolModel } from '../../models/project/project_timepol';
import { ProjobmainModel } from '../../models/project/project_jobmain';

import { ProjobsubModel } from '../../models/project/project_jobsub';
import { ProjobempModel } from '../../models/project/project_jobemp';
import { ProjobworkingModel } from '../../models/project/project_jobworking';


import { ProjobcontractModel } from '../../models/project/project_jobcontract';
import { ProjobcostModel } from '../../models/project/project_jobcost';
import { ProjobmachineModel } from '../../models/project/project_jobmachine';

import { ProjobshiftModel } from '../../models/project/project_jobshift';

import { ProjobversionModel } from '../../models/project/project_jobversion';
import { ProjobpolModel } from '../../models/project/project_jobpol';
import { FillterProjectModel } from 'src/app/models/usercontrol/fillterproject';
import { ProequipmentreqModel } from 'src/app/models/project/project_proequipmenttype ';

@Injectable({
  providedIn: 'root'
})
export class ProjectDetailService {
  comaddlocation_get(project_code: string) {
    throw new Error('Method not implemented.');
  }

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

  public proaddress_get(project: string) {

    var filter = {
      device_name: '',
      ip: "localhost",
      username: this.initial_current.Username,
      company: "",
      language: "",
      project_code: project,
      project_name_th: "",
      project_name_en: "",
      project_name_sub: "",
      project_codecentral: "",
      project_protype: "",
      project_probusiness: "",
    };


    return this.http.post<any>(this.config.ApiProjectModule + '/proaddress_list', filter, this.options).toPromise()
      .then((res) => {
        let message = JSON.parse(res);
        //// console.log(res)
        return message.data;
      });
  }

  public proaddress_record(model: ProaddressModel) {
    const data = {
      proaddress_id: model.proaddress_id,
      proaddress_type: model.proaddress_type,
      proaddress_no: model.proaddress_no,
      proaddress_moo: model.proaddress_moo,
      proaddress_soi: model.proaddress_soi,
      proaddress_road: model.proaddress_road,
      proaddress_tambon: model.proaddress_tambon,
      proaddress_amphur: model.proaddress_amphur,
      proaddress_zipcode: model.proaddress_zipcode,
      proaddress_tel: model.proaddress_tel,
      proaddress_email: model.proaddress_email,
      proaddress_line: model.proaddress_line,
      proaddress_facebook: model.proaddress_facebook,
      province_code: model.province_code,
      project_code: model.project_code,

      modified_by: this.initial_current.Username
    };

    return this.http.post<any>(this.config.ApiProjectModule + '/proaddress', data, this.options).toPromise()
      .then((res) => {
        return res;
      });
  }

  public proaddress_delete(model: ProaddressModel) {
    const data = {
      proaddress_id: model.proaddress_id,
      proaddress_type: model.proaddress_type,
      project_code: model.project_code,
      modified_by: this.initial_current.Username
    };

    return this.http.post<any>(this.config.ApiProjectModule + '/proaddress_del', data, this.options).toPromise()
      .then((res) => {
        return res;
      });
  }


  public proaddress_import(file: File, file_name: string, file_type: string) {
    const formData = new FormData();
    formData.append('file', file);
    var para = "fileName=" + file_name + "." + file_type;
    para += "&token=" + this.initial_current.Token;
    para += "&by=" + this.initial_current.Username;
    para += "&com=" + this.initial_current.CompCode;

    return this.http.post<any>(this.config.ApiProjectModule + '/doUploadTRProaddress?' + para, formData).toPromise()
      .then((res) => {
        return res;
      });
  }

  //--
  public procontact_get(project: string) {

    var filter = {
      device_name: '',
      ip: "localhost",
      username: this.initial_current.Username,
      company: "",
      language: "",
      project_code: project,
      project_name_th: "",
      project_name_en: "",
      project_name_sub: "",
      project_codecentral: "",
      project_protype: "",
      project_probusiness: "",
    };


    return this.http.post<any>(this.config.ApiProjectModule + '/procontact_list', filter, this.options).toPromise()
      .then((res) => {
        let message = JSON.parse(res);
        //// console.log(res)
        return message.data;
      });
  }

  public procontact_record(project: string, list: ProcontactModel[]) {

    var item_data: string = "[";
    for (let i = 0; i < list.length; i++) {
      item_data = item_data + "{";
      item_data = item_data + "\"procontact_id\":\"" + list[i].procontact_id + "\"";
      item_data = item_data + ",\"procontact_ref\":\"" + list[i].procontact_ref + "\"";
      item_data = item_data + ",\"procontact_firstname_th\":\"" + list[i].procontact_firstname_th + "\"";
      item_data = item_data + ",\"procontact_lastname_th\":\"" + list[i].procontact_lastname_th + "\"";
      item_data = item_data + ",\"procontact_firstname_en\":\"" + list[i].procontact_firstname_en + "\"";
      item_data = item_data + ",\"procontact_lastname_en\":\"" + list[i].procontact_lastname_en + "\"";
      item_data = item_data + ",\"procontact_tel\":\"" + list[i].procontact_tel + "\"";
      item_data = item_data + ",\"procontact_email\":\"" + list[i].procontact_email + "\"";
      item_data = item_data + ",\"position_code\":\"" + list[i].position_code + "\"";
      item_data = item_data + ",\"initial_code\":\"" + list[i].initial_code + "\"";
      item_data = item_data + ",\"project_code\":\"" + project + "\"";
      item_data = item_data + "}" + ",";
    }
    if (item_data.length > 2) {
      item_data = item_data.substr(0, item_data.length - 1);
    }
    item_data = item_data + "]";

    var specificData = {
      transaction_data: item_data,
      project_code: project,
      modified_by: this.initial_current.Username
    };

    return this.http.post<any>(this.config.ApiProjectModule + '/procontacts', specificData, this.options).toPromise()
      .then((res) => {
        return res;
      });
  }

  public procontact_delete(model: ProcontactModel) {
    const data = {
      procontact_id: model.procontact_id,
      procontact_ref: model.procontact_ref,
      project_code: model.project_code,
      modified_by: this.initial_current.Username
    };

    return this.http.post<any>(this.config.ApiProjectModule + '/procontact_del', data, this.options).toPromise()
      .then((res) => {
        return res;
      });
  }

  public procontact_import(file: File, file_name: string, file_type: string) {
    const formData = new FormData();
    formData.append('file', file);
    var para = "fileName=" + file_name + "." + file_type;
    para += "&token=" + this.initial_current.Token;
    para += "&by=" + this.initial_current.Username;
    para += "&com=" + this.initial_current.CompCode;

    return this.http.post<any>(this.config.ApiProjectModule + '/doUploadTRProcontact?' + para, formData).toPromise()
      .then((res) => {
        return res;
      });
  }

  //--
  public procontract_get(project: string) {

    var filter = {
      device_name: '',
      ip: "localhost",
      username: this.initial_current.Username,
      company: "",
      language: "",
      project_code: project,
      project_name_th: "",
      project_name_en: "",
      project_name_sub: "",
      project_codecentral: "",
      project_protype: "",
      project_probusiness: "",
    };


    return this.http.post<any>(this.config.ApiProjectModule + '/procontract_list', filter, this.options).toPromise()
      .then((res) => {
        let message = JSON.parse(res);
        //// console.log(res)
        return message.data;
      });
  }

  public procontract_record(project: string, list: ProcontractModel[]) {

    var item_data: string = "[";
    for (let i = 0; i < list.length; i++) {
      item_data = item_data + "{";
      item_data = item_data + "\"procontract_id\":\"" + list[i].procontract_id + "\"";
      item_data = item_data + ",\"procontract_ref\":\"" + list[i].procontract_ref + "\"";
      item_data = item_data + ",\"procontract_date\":\"" + this.datePipe.transform(list[i].procontract_date, 'yyyy-MM-dd') + "\"";
      item_data = item_data + ",\"procontract_amount\":\"" + list[i].procontract_amount + "\"";
      item_data = item_data + ",\"procontract_fromdate\":\"" + this.datePipe.transform(list[i].procontract_fromdate, 'yyyy-MM-dd') + "\"";
      item_data = item_data + ",\"procontract_todate\":\"" + this.datePipe.transform(list[i].procontract_todate, 'yyyy-MM-dd') + "\"";
      item_data = item_data + ",\"procontract_customer\":\"" + list[i].procontract_customer + "\"";
      item_data = item_data + ",\"procontract_bidder\":\"" + list[i].procontract_bidder + "\"";
      item_data = item_data + ",\"project_code\":\"" + project + "\"";
      item_data = item_data + ",\"procontract_type\":\"" + list[i].procontract_type + "\"";


      item_data = item_data + "}" + ",";
    }
    if (item_data.length > 2) {
      item_data = item_data.substr(0, item_data.length - 1);
    }
    item_data = item_data + "]";

    var specificData = {
      transaction_data: item_data,
      project_code: project,
      modified_by: this.initial_current.Username
    };

    return this.http.post<any>(this.config.ApiProjectModule + '/procontracts', specificData, this.options).toPromise()
      .then((res) => {
        return res;
      });
  }

  public procontract_delete(model: ProcontractModel) {
    const data = {
      procontract_id: model.procontract_id,
      procontract_ref: model.procontract_ref,
      project_code: model.project_code,
      modified_by: this.initial_current.Username
    };

    return this.http.post<any>(this.config.ApiProjectModule + '/procontract_del', data, this.options).toPromise()
      .then((res) => {
        return res;
      });
  }

  public procontract_import(file: File, file_name: string, file_type: string) {
    const formData = new FormData();
    formData.append('file', file);
    var para = "fileName=" + file_name + "." + file_type;
    para += "&token=" + this.initial_current.Token;
    para += "&by=" + this.initial_current.Username;
    para += "&com=" + this.initial_current.CompCode;

    return this.http.post<any>(this.config.ApiProjectModule + '/doUploadTRProcontract?' + para, formData).toPromise()
      .then((res) => {
        return res;
      });
  }

  //--
  public proresponsible_get(project: string) {

    var filter = {
      device_name: '',
      ip: "localhost",
      username: this.initial_current.Username,
      company: "",
      language: "",
      project_code: project,
      project_name_th: "",
      project_name_en: "",
      project_name_sub: "",
      project_codecentral: "",
      project_protype: "",
      project_probusiness: "",
    };


    return this.http.post<any>(this.config.ApiProjectModule + '/proresponsible_list', filter, this.options).toPromise()
      .then((res) => {
        let message = JSON.parse(res);
        //// console.log(res)
        return message.data;
      });
  }

  public proresponsible_record(project: string, list: ProresponsibleModel[]) {

    var item_data: string = "[";
    for (let i = 0; i < list.length; i++) {
      item_data = item_data + "{";
      item_data = item_data + "\"proresponsible_id\":\"" + list[i].proresponsible_id + "\"";
      item_data = item_data + ",\"proresponsible_ref\":\"" + list[i].proresponsible_ref + "\"";
      item_data = item_data + ",\"proresponsible_emp\":\"" + list[i].proresponsible_emp + "\"";
      item_data = item_data + ",\"proresponsible_position\":\"" + list[i].proresponsible_position + "\"";
      item_data = item_data + ",\"proresponsible_area\":\"" + list[i].proresponsible_area + "\"";
      item_data = item_data + ",\"proresponsible_fromdate\":\"" + this.datePipe.transform(list[i].proresponsible_fromdate, 'yyyy-MM-dd') + "\"";
      item_data = item_data + ",\"proresponsible_todate\":\"" + this.datePipe.transform(list[i].proresponsible_todate, 'yyyy-MM-dd') + "\"";
      item_data = item_data + ",\"project_code\":\"" + project + "\"";
      item_data = item_data + "}" + ",";
    }
    if (item_data.length > 2) {
      item_data = item_data.substr(0, item_data.length - 1);
    }
    item_data = item_data + "]";

    var specificData = {
      transaction_data: item_data,
      project_code: project,
      modified_by: this.initial_current.Username
    };

    return this.http.post<any>(this.config.ApiProjectModule + '/proresponsibles', specificData, this.options).toPromise()
      .then((res) => {
        return res;
      });
  }

  public proresponsible_delete(model: ProcontractModel) {
    const data = {
      procontract_id: model.procontract_id,
      procontract_ref: model.procontract_ref,
      project_code: model.project_code,
      modified_by: this.initial_current.Username
    };

    return this.http.post<any>(this.config.ApiProjectModule + '/proresponsible_del', data, this.options).toPromise()
      .then((res) => {
        return res;
      });
  }

  public proresponsible_import(file: File, file_name: string, file_type: string) {
    const formData = new FormData();
    formData.append('file', file);
    var para = "fileName=" + file_name + "." + file_type;
    para += "&token=" + this.initial_current.Token;
    para += "&by=" + this.initial_current.Username;
    para += "&com=" + this.initial_current.CompCode;

    return this.http.post<any>(this.config.ApiProjectModule + '/doUploadTRProresponsible?' + para, formData).toPromise()
      .then((res) => {
        return res;
      });
  }

  //--
  public protimepol_get(project: string) {

    var filter = {
      device_name: '',
      ip: "localhost",
      username: this.initial_current.Username,
      company: "",
      language: "",
      project_code: project,
      project_name_th: "",
      project_name_en: "",
      project_name_sub: "",
      project_codecentral: "",
      project_protype: "",
      project_probusiness: "",
    };


    return this.http.post<any>(this.config.ApiProjectModule + '/protimepol_list', filter, this.options).toPromise()
      .then((res) => {
        let message = JSON.parse(res);
        //// console.log(res)
        return message.data;
      });
  }

  public protimepol_record(project: string, list: ProtimepolModel[]) {

    var item_data: string = "[";
    for (let i = 0; i < list.length; i++) {
      item_data = item_data + "{";
      item_data = item_data + "\"protimepol_id\":\"" + list[i].protimepol_id + "\"";
      item_data = item_data + ",\"protimepol_code\":\"" + list[i].protimepol_code + "\"";
      item_data = item_data + ",\"protimepol_name_th\":\"" + list[i].protimepol_name_th + "\"";
      item_data = item_data + ",\"protimepol_name_en\":\"" + list[i].protimepol_name_en + "\"";

      item_data = item_data + ",\"protimepol_ot\":\"" + list[i].protimepol_ot + "\"";
      item_data = item_data + ",\"protimepol_allw\":\"" + list[i].protimepol_allw + "\"";
      item_data = item_data + ",\"protimepol_dg\":\"" + list[i].protimepol_dg + "\"";
      item_data = item_data + ",\"protimepol_lv\":\"" + list[i].protimepol_lv + "\"";
      item_data = item_data + ",\"protimepol_lt\":\"" + list[i].protimepol_lt + "\"";

      item_data = item_data + ",\"project_code\":\"" + project + "\"";
      item_data = item_data + "}" + ",";
    }
    if (item_data.length > 2) {
      item_data = item_data.substr(0, item_data.length - 1);
    }
    item_data = item_data + "]";

    var specificData = {
      transaction_data: item_data,
      project_code: project,
      modified_by: this.initial_current.Username
    };

    return this.http.post<any>(this.config.ApiProjectModule + '/protimepols', specificData, this.options).toPromise()
      .then((res) => {
        return res;
      });
  }

  public protimepol_delete(model: ProtimepolModel) {
    const data = {
      protimepol_id: model.protimepol_id,
      protimepol_code: model.protimepol_code,
      project_code: model.project_code,
      modified_by: this.initial_current.Username
    };

    return this.http.post<any>(this.config.ApiProjectModule + '/protimepol_del', data, this.options).toPromise()
      .then((res) => {
        return res;
      });
  }

  public protimepol_import(file: File, file_name: string, file_type: string) {
    const formData = new FormData();
    formData.append('file', file);
    var para = "fileName=" + file_name + "." + file_type;
    para += "&token=" + this.initial_current.Token;
    para += "&by=" + this.initial_current.Username;
    para += "&com=" + this.initial_current.CompCode;

    return this.http.post<any>(this.config.ApiProjectModule + '/doUploadMTProtimepol?' + para, formData).toPromise()
      .then((res) => {
        return res;
      });
  }

  //-- Job main
  public projobmain_get(version: string, project: string, type: string,) {

    var filter = {
      device_name: '',
      ip: "localhost",
      username: this.initial_current.Username,
      company: this.initial_current.CompCode,
      language: "",
      project_code: project,
      project_name_th: "",
      project_name_en: "",
      project_name_sub: "",
      project_codecentral: "",
      project_protype: "",
      project_probusiness: "",
      version: version,
      procontract_type: type
    };


    return this.http.post<any>(this.config.ApiProjectModule + '/projobmain_list', filter, this.options).toPromise()
      .then((res) => {
        let message = JSON.parse(res);
        //// console.log(res)
        return message.data;
      });
  }

  public projobmain_record(version: string, project: string, type: string, list: ProjobmainModel[]) {

    var item_data: string = "[";
    for (let i = 0; i < list.length; i++) {
      item_data = item_data + "{";
      item_data = item_data + "\"projobmain_id\":\"" + list[i].projobmain_id + "\"";
      item_data = item_data + ",\"projobmain_code\":\"" + list[i].projobmain_code + "\"";
      item_data = item_data + ",\"projobmain_name_th\":\"" + list[i].projobmain_name_th + "\"";
      item_data = item_data + ",\"projobmain_name_en\":\"" + list[i].projobmain_name_en + "\"";
      item_data = item_data + ",\"projobmain_type\":\"" + list[i].projobmain_type + "\"";

      item_data = item_data + ",\"projobmain_timepol\":\"" + list[i].projobmain_timepol + "\"";
      item_data = item_data + ",\"projobmain_slip\":\"" + list[i].projobmain_slip + "\"";
      item_data = item_data + ",\"projobmain_uniform\":\"" + list[i].projobmain_uniform + "\"";

      item_data = item_data + ",\"project_code\":\"" + project + "\"";

      item_data = item_data + ",\"version\":\"" + version + "\"";
      item_data = item_data + ",\"procontract_type\":\"" + type + "\"";

      item_data = item_data + "}" + ",";
    }
    if (item_data.length > 2) {
      item_data = item_data.substr(0, item_data.length - 1);
    }
    item_data = item_data + "]";

    var specificData = {
      transaction_data: item_data,
      project_code: project,
      version: version,
      job_code: '',
      modified_by: this.initial_current.Username
    };

    return this.http.post<any>(this.config.ApiProjectModule + '/projobmains', specificData, this.options).toPromise()
      .then((res) => {
        return res;
      });
  }

  public projobmain_delete(version: string, project: string, type: string, model: ProjobmainModel) {
    const data = {
      projobmain_id: model.projobmain_id,
      projobmain_code: model.projobmain_code,
      project_code: project,
      version: version,
      procontract_type: type,

      modified_by: this.initial_current.Username
    };

    return this.http.post<any>(this.config.ApiProjectModule + '/projobmain_del', data, this.options).toPromise()
      .then((res) => {
        return res;
      });
  }

  public projobmain_import(file: File, file_name: string, file_type: string) {
    const formData = new FormData();
    formData.append('file', file);
    var para = "fileName=" + file_name + "." + file_type;
    para += "&token=" + this.initial_current.Token;
    para += "&by=" + this.initial_current.Username;
    para += "&com=" + this.initial_current.CompCode;

    return this.http.post<any>(this.config.ApiProjectModule + '/doUploadMTProjobmain?' + para, formData).toPromise()
      .then((res) => {
        return res;
      });
  }

  //-- Job contract
  public projobcontract_get(version: string, project: string, job: string) {

    var filter = {
      device_name: '',
      ip: "localhost",
      username: this.initial_current.Username,
      company: "",
      language: "",
      project_code: project,
      project_name_th: "",
      project_name_en: "",
      project_name_sub: "",
      project_codecentral: "",
      project_protype: "",
      project_probusiness: "",
      job_code: job,
      version: version
    };


    return this.http.post<any>(this.config.ApiProjectModule + '/projobcontract_list', filter, this.options).toPromise()
      .then((res) => {
        let message = JSON.parse(res);
        //// console.log(res)
        return message.data;
      });
  }

  public projobcontract_record(version: string, project: string, job: string, list: ProjobcontractModel[]) {

    //// console.log(job)

    var item_data: string = "[";
    for (let i = 0; i < list.length; i++) {
      item_data = item_data + "{";
      item_data = item_data + "\"projobcontract_id\":\"" + list[i].projobcontract_id + "\"";
      item_data = item_data + ",\"projobcontract_ref\":\"" + list[i].projobcontract_ref + "\"";
      item_data = item_data + ",\"projobcontract_working\":\"" + list[i].projobcontract_working + "\"";
      item_data = item_data + ",\"projobcontract_hrsperday\":\"" + list[i].projobcontract_hrsperday + "\"";
      item_data = item_data + ",\"projobcontract_hrsot\":\"" + list[i].projobcontract_hrsot + "\"";
      item_data = item_data + ",\"projob_code\":\"" + job + "\"";
      item_data = item_data + ",\"project_code\":\"" + project + "\"";
      item_data = item_data + ",\"version\":\"" + version + "\"";
      item_data = item_data + "}" + ",";
    }
    if (item_data.length > 2) {
      item_data = item_data.substr(0, item_data.length - 1);
    }
    item_data = item_data + "]";

    var specificData = {
      transaction_data: item_data,
      project_code: project,
      job_code: job,
      version: version,
      modified_by: this.initial_current.Username
    };

    return this.http.post<any>(this.config.ApiProjectModule + '/projobcontracts', specificData, this.options).toPromise()
      .then((res) => {
        return res;
      });
  }

  public projobcontract_delete(version: string, model: ProjobcontractModel) {
    const data = {
      projobcontract_id: model.projobcontract_id,
      projobcontract_ref: model.projobcontract_ref,
      projob_code: model.projob_code,
      project_code: model.project_code,
      version: version,
      modified_by: this.initial_current.Username
    };

    return this.http.post<any>(this.config.ApiProjectModule + '/projobcontract_del', data, this.options).toPromise()
      .then((res) => {
        return res;
      });
  }

  public projobcontract_import(file: File, file_name: string, file_type: string) {
    const formData = new FormData();
    formData.append('file', file);
    var para = "fileName=" + file_name + "." + file_type;
    para += "&token=" + this.initial_current.Token;
    para += "&by=" + this.initial_current.Username;
    para += "&com=" + this.initial_current.CompCode;

    return this.http.post<any>(this.config.ApiProjectModule + '/doUploadTRProjobcontract?' + para, formData).toPromise()
      .then((res) => {
        return res;
      });
  }

  //-- Job cost
  public projobcost_get(version: string, project: string, job: string) {

    var filter = {
      device_name: '',
      ip: "localhost",
      username: this.initial_current.Username,
      company_code: this.initial_current.CompCode,
      language: "",
      project_code: project,
      project_name_th: "",
      project_name_en: "",
      project_name_sub: "",
      project_codecentral: "",
      project_protype: "",
      project_probusiness: "",
      job_code: job,
      version: version
    };


    return this.http.post<any>(this.config.ApiProjectModule + '/projobcost_list', filter, this.options).toPromise()
      .then((res) => {
        let message = JSON.parse(res);
        //// console.log(res)
        return message.data;
      });
  }

  public projobcost_record(version: string, project: string, job: string, list: ProjobcostModel[]) {

    var item_data: string = "[";
    for (let i = 0; i < list.length; i++) {
      item_data = item_data + "{";
      item_data = item_data + "\"projobcost_id\":\"" + list[i].projobcost_id + "\"";
      item_data = item_data + ",\"projobcost_code\":\"" + list[i].projobcost_code + "\"";
      item_data = item_data + ",\"projobcost_amount\":\"" + list[i].projobcost_amount + "\"";


      item_data = item_data + ",\"projobcost_status\":\"" + list[i].projobcost_status + "\"";

      item_data = item_data + ",\"projob_code\":\"" + job + "\"";
      item_data = item_data + ",\"project_code\":\"" + project + "\"";
      item_data = item_data + ",\"projobcost_auto\":\"" + list[i].projobcost_auto + "\"";

      item_data = item_data + ",\"projob_code\":\"" + job + "\"";
      item_data = item_data + ",\"project_code\":\"" + project + "\"";

      item_data = item_data + ",\"version\":\"" + version + "\"";

      item_data = item_data + "}" + ",";
    }
    if (item_data.length > 2) {
      item_data = item_data.substr(0, item_data.length - 1);
    }
    item_data = item_data + "]";

    var specificData = {
      transaction_data: item_data,
      project_code: project,
      job_code: job,
      version: version,
      modified_by: this.initial_current.Username
    };

    return this.http.post<any>(this.config.ApiProjectModule + '/projobcosts', specificData, this.options).toPromise()
      .then((res) => {
        return res;
      });
  }

  public projobcost_delete(project: string, job: string, version: string, model: ProjobcostModel) {
    const data = {
      projobcost_id: model.projobcost_id,
      projobcost_code: model.projobcost_code,
      projob_code: job,
      project_code: project,
      version: version,
      modified_by: this.initial_current.Username
    };

    return this.http.post<any>(this.config.ApiProjectModule + '/projobcost_del', data, this.options).toPromise()
      .then((res) => {
        return res;
      });
  }

  public projobcost_import(file: File, file_name: string, file_type: string) {
    const formData = new FormData();
    formData.append('file', file);
    var para = "fileName=" + file_name + "." + file_type;
    para += "&token=" + this.initial_current.Token;
    para += "&by=" + this.initial_current.Username;
    para += "&com=" + this.initial_current.CompCode;

    return this.http.post<any>(this.config.ApiProjectModule + '/doUploadTRProjobcost?' + para, formData).toPromise()
      .then((res) => {
        return res;
      });
  }

  //-- Job machine
  public projobmachine_get(project: string, job: string) {

    var filter = {
      device_name: '',
      ip: "localhost",
      username: this.initial_current.Username,
      company: "",
      language: "",
      project_code: project,
      project_name_th: "",
      project_name_en: "",
      project_name_sub: "",
      project_codecentral: "",
      project_protype: "",
      project_probusiness: "",
      job_code: job,
    };


    return this.http.post<any>(this.config.ApiProjectModule + '/projobmachine_list', filter, this.options).toPromise()
      .then((res) => {
        let message = JSON.parse(res);
        //// console.log(res)
        return message.data;
      });
  }

  public projobmachine_record(project: string, job: string, list: ProjobmachineModel[]) {

    var item_data: string = "[";
    for (let i = 0; i < list.length; i++) {
      item_data = item_data + "{";
      item_data = item_data + "\"projobcost_id\":\"" + list[i].projobmachine_id + "\"";
      item_data = item_data + ",\"projobmachine_ip\":\"" + list[i].projobmachine_ip + "\"";
      item_data = item_data + ",\"projobmachine_port\":\"" + list[i].projobmachine_port + "\"";
      item_data = item_data + ",\"projobmachine_enable\":\"" + list[i].projobmachine_enable + "\"";

      item_data = item_data + ",\"projob_code\":\"" + job + "\"";
      item_data = item_data + ",\"project_code\":\"" + project + "\"";
      item_data = item_data + "}" + ",";
    }
    if (item_data.length > 2) {
      item_data = item_data.substr(0, item_data.length - 1);
    }
    item_data = item_data + "]";

    var specificData = {
      transaction_data: item_data,
      project_code: project,
      job_code: job,
      modified_by: this.initial_current.Username
    };

    return this.http.post<any>(this.config.ApiProjectModule + '/projobmachines', specificData, this.options).toPromise()
      .then((res) => {
        return res;
      });
  }

  public projobmachine_delete(model: ProjobmachineModel) {
    const data = {
      projobmachine_id: model.projobmachine_id,
       projob_code: model.projob_code,
      project_code: model.project_code,
      modified_by: this.initial_current.Username
    };

    return this.http.post<any>(this.config.ApiProjectModule + '/projobmachine_del', data, this.options).toPromise()
      .then((res) => {
        return res;
      });
  }

  public projobmachine_import(file: File, file_name: string, file_type: string) {
    const formData = new FormData();
    formData.append('file', file);
    var para = "fileName=" + file_name + "." + file_type;
    para += "&token=" + this.initial_current.Token;
    para += "&by=" + this.initial_current.Username;
    para += "&com=" + this.initial_current.CompCode;

    return this.http.post<any>(this.config.ApiProjectModule + '/doUploadTRProjobmachine?' + para, formData).toPromise()
      .then((res) => {
        return res;
      });
  }


  //-- Job sub
  public projobsub_get(version: string, project: string) {

    var filter = {
      device_name: '',
      ip: "localhost",
      username: this.initial_current.Username,
      company: this.initial_current.CompCode,
      language: "",
      project_code: project,
      project_name_th: "",
      project_name_en: "",
      project_name_sub: "",
      project_codecentral: "",
      project_protype: "",
      project_probusiness: "",
      version: version,
      procontract_type: ""
    };


    return this.http.post<any>(this.config.ApiProjectModule + '/projobsub_list', filter, this.options).toPromise()
      .then((res) => {
        let message = JSON.parse(res);
        //// console.log(res)
        return message.data;
      });
  }

  public projobsub_record(version: string, project: string, list: ProjobsubModel[]) {

    var item_data: string = "[";
    for (let i = 0; i < list.length; i++) {
      item_data = item_data + "{";
      item_data = item_data + "\"projobsub_id\":\"" + list[i].projobsub_id + "\"";
      item_data = item_data + ",\"projobsub_code\":\"" + list[i].projobsub_code + "\"";
      item_data = item_data + ",\"projobsub_name_th\":\"" + list[i].projobsub_name_th + "\"";
      item_data = item_data + ",\"projobsub_name_en\":\"" + list[i].projobsub_name_en + "\"";

      item_data = item_data + ",\"project_code\":\"" + project + "\"";
      item_data = item_data + "}" + ",";
    }
    if (item_data.length > 2) {
      item_data = item_data.substr(0, item_data.length - 1);
    }
    item_data = item_data + "]";

    var specificData = {
      transaction_data: item_data,
      project_code: project,
      version: version,
      job_code: '',
      modified_by: this.initial_current.Username
    };

    return this.http.post<any>(this.config.ApiProjectModule + '/projobsubs', specificData, this.options).toPromise()
      .then((res) => {
        return res;
      });
  }

  public projobsub_delete(version: string, model: ProjobsubModel) {
    const data = {
      projobsub_id: model.projobsub_id,
      projobsub_code: model.projobsub_code,
      project_code: model.project_code,
      version: version,
      modified_by: this.initial_current.Username
    };

    return this.http.post<any>(this.config.ApiProjectModule + '/projobsub_del', data, this.options).toPromise()
      .then((res) => {
        return res;
      });
  }

  public projobsub_import(file: File, file_name: string, file_type: string) {
    const formData = new FormData();
    formData.append('file', file);
    var para = "fileName=" + file_name + "." + file_type;
    para += "&token=" + this.initial_current.Token;
    para += "&by=" + this.initial_current.Username;
    para += "&com=" + this.initial_current.CompCode;

    return this.http.post<any>(this.config.ApiProjectModule + '/doUploadMTProjobsub?' + para, formData).toPromise()
      .then((res) => {
        return res;
      });
  }
  ///////////ทำตรงนี้

  public projobemp_getbyfillter(fillter: FillterProjectModel) {

    const fillterS = {
      device_name: '',
      ip: "localhost",
      username: this.initial_current.Username,
      language: "",

      company_code: fillter.company_code,

      projobemp_id: fillter.projobemp_id,
      projobemp_emp: fillter.projobemp_emp,
      projobemp_fromdate: this.datePipe.transform(fillter.projobemp_fromdate),
      projobemp_todate: this.datePipe.transform(fillter.projobemp_todate),
      projobemp_type: fillter.projobemp_type,
      projobemp_status: fillter.projobemp_status,
      projob_code: fillter.projob_code,
      project_code: fillter.project_code,

      ///
      project_name_th: fillter.project_name_th,
      project_name_en: fillter.project_name_en,
      project_name_sub: fillter.project_name_sub,
      project_codecentral: fillter.project_codecentral,
      project_protype: fillter.project_protype,
      project_probusiness: fillter.project_probusiness,
      searchemp: fillter.searchemp,

    };

    return this.http.post<any>(this.config.ApiProjectModule + '/projobempfillter_list', fillterS, this.options).toPromise()
      .then((res) => {
        let message = JSON.parse(res);
        return message.data;
      });

  }

  //
  public projobemp2_get(project: string,fromdate: Date, todate: Date,) {
    let datefrom = this.datePipe.transform(fromdate, 'yyyy-MM-dd');
    let dateto = this.datePipe.transform(todate, 'yyyy-MM-dd');
    var filter = {
      device_name: '',
      ip: "localhost",
      username: this.initial_current.Username,
      company: "",
      language: "",
      project_code: project,
      project_name_th: "",
      project_name_en: "",
      project_name_sub: "",
      project_codecentral: "",
      project_protype: "",
      project_probusiness: "",
      fromdate: datefrom,
      todate: dateto,
    };


    return this.http.post<any>(this.config.ApiProjectModule + '/projobemp2_list', filter, this.options).toPromise()
      .then((res) => {
        let message = JSON.parse(res);
        //// console.log(res)
        return message.data;
      });
  }

  
  //
  public projobemp3_get(project: string,fromdate: Date, todate: Date,) {
    let datefrom = this.datePipe.transform(fromdate, 'yyyy-MM-dd');
    let dateto = this.datePipe.transform(todate, 'yyyy-MM-dd');
    var filter = {
      device_name: '',
      ip: "localhost",
      username: this.initial_current.Username,
      company: "",
      language: "",
      project_code: project,
      project_name_th: "",
      project_name_en: "",
      project_name_sub: "",
      project_codecentral: "",
      project_protype: "",
      project_probusiness: "",
      fromdate: datefrom,
      todate: dateto,
    };


    return this.http.post<any>(this.config.ApiProjectModule + '/projobemp3_list', filter, this.options).toPromise()
      .then((res) => {
        let message = JSON.parse(res);
        //// console.log(res)
        return message.data;
      });
  }
  ///////////ทำตรงนี้>>>

  //-- Job emp
  public projobemp_get(project: string) {

    var filter = {
      device_name: '',
      ip: "localhost",
      username: this.initial_current.Username,
      company: "",
      language: "",
      project_code: project,
      project_name_th: "",
      project_name_en: "",
      project_name_sub: "",
      project_codecentral: "",
      project_protype: "",
      project_probusiness: "",
    };


    return this.http.post<any>(this.config.ApiProjectModule + '/projobemp_list', filter, this.options).toPromise()
      .then((res) => {
        let message = JSON.parse(res);
        //// console.log(res)
        return message.data;
      });
  }

  public projobemp_record(model: ProjobempModel) {
    const data = {
      projobemp_id: model.projobemp_id,
      projobemp_emp: model.projobemp_emp,
      projobemp_fromdate: this.datePipe.transform(model.projobemp_fromdate),
      projobemp_todate: this.datePipe.transform(model.projobemp_todate),
      projobemp_type: model.projobemp_type,
      projobemp_status: model.projobemp_status,
      projob_code: model.projob_code,
      project_code: model.project_code,

      modified_by: this.initial_current.Username
    };

    // console.log(this.config.ApiProjectModule)

    return this.http.post<any>(this.config.ApiProjectModule + '/projobemp', data, this.options).toPromise()
      .then((res) => {
        return res;
      });
  }

  public projobemp_record2(project: string, list: ProjobempModel[]) {

    var item_data: string = "[";
    for (let i = 0; i < list.length; i++) {
      item_data = item_data + "{";
      item_data = item_data + "\"projobemp_id\":\"" + list[i].projobemp_id + "\"";
      item_data = item_data + ",\"projobemp_emp\":\"" + list[i].projobemp_emp + "\"";
      item_data = item_data + ",\"projobemp_fromdate\":\"" + this.datePipe.transform(list[i].projobemp_fromdate) + "\"";
      item_data = item_data + ",\"projobemp_todate\":\"" + this.datePipe.transform(list[i].projobemp_todate) + "\"";
      item_data = item_data + ",\"projobemp_type\":\"" + list[i].projobemp_type + "\"";
      item_data = item_data + ",\"projobemp_status\":\"" + list[i].projobemp_status + "\"";

      item_data = item_data + ",\"projob_code\":\"" + list[i].projob_code + "\"";
      item_data = item_data + ",\"project_code\":\"" + project + "\"";
      item_data = item_data + "}" + ",";
    }
    if (item_data.length > 2) {
      item_data = item_data.substr(0, item_data.length - 1);
    }
    item_data = item_data + "]";

    var specificData = {
      transaction_data: item_data,
      project_code: project,
      job_code: '',
      modified_by: this.initial_current.Username
    };

    return this.http.post<any>(this.config.ApiProjectModule + '/projobemps', specificData, this.options).toPromise()
      .then((res) => {
        return res;
      });
  }

  public projobemp_delete(model: ProjobempModel) {
    const data = {
      projobemp_id: model.projobemp_id,
      projobemp_emp: model.projobemp_emp,
      projobemp_fromdate: this.datePipe.transform(model.projobemp_fromdate),
      projob_code: model.projob_code,
      project_code: model.project_code,
      modified_by: this.initial_current.Username
    };

    return this.http.post<any>(this.config.ApiProjectModule + '/projobemp_del', data, this.options).toPromise()
      .then((res) => {
        return res;
      });
  }

  public projobemp_import(file: File, file_name: string, file_type: string) {
    const formData = new FormData();
    formData.append('file', file);
    var para = "fileName=" + file_name + "." + file_type;
    para += "&token=" + this.initial_current.Token;
    para += "&by=" + this.initial_current.Username;
    para += "&com=" + this.initial_current.CompCode;

    return this.http.post<any>(this.config.ApiProjectModule + '/doUploadTRProjobemp?' + para, formData).toPromise()
      .then((res) => {
        return res;
      });
  }

  //-- Job working
  public projobworking_get(project: string, job: string) {

    var filter = {
      device_name: '',
      ip: "localhost",
      username: this.initial_current.Username,
      company: "",
      language: "",
      project_code: project,
      project_name_th: "",
      project_name_en: "",
      project_name_sub: "",
      project_codecentral: "",
      project_protype: "",
      project_probusiness: "",
      job_code: job
    };


    return this.http.post<any>(this.config.ApiProjectModule + '/projobworking_list', filter, this.options).toPromise()
      .then((res) => {
        let message = JSON.parse(res);
        //// console.log(res)
        return message.data;
      });
  }

  public projobworking_record(project: string, list: ProjobworkingModel[]) {

    var item_data: string = "[";
    for (let i = 0; i < list.length; i++) {
      item_data = item_data + "{";
      item_data = item_data + "\"projobworking_id\":\"" + list[i].projobworking_id + "\"";
      item_data = item_data + ",\"projobworking_emp\":\"" + list[i].projobworking_emp + "\"";
      item_data = item_data + ",\"projobworking_workdate\":\"" + this.datePipe.transform(list[i].projobworking_workdate) + "\"";
      item_data = item_data + ",\"projobworking_in\":\"" + this.datePipe.transform(list[i].projobworking_in) + "\"";
      item_data = item_data + ",\"projobworking_out\":\"" + this.datePipe.transform(list[i].projobworking_out) + "\"";
      item_data = item_data + ",\"projobworking_status\":\"" + list[i].projobworking_status + "\"";

      item_data = item_data + ",\"projob_code\":\"" + list[i].projob_code + "\"";
      item_data = item_data + ",\"project_code\":\"" + project + "\"";
      item_data = item_data + "}" + ",";
    }
    if (item_data.length > 2) {
      item_data = item_data.substr(0, item_data.length - 1);
    }
    item_data = item_data + "]";

    var specificData = {
      transaction_data: item_data,
      project_code: project,
      job_code: '',
      modified_by: this.initial_current.Username
    };

    return this.http.post<any>(this.config.ApiProjectModule + '/projobworkings', specificData, this.options).toPromise()
      .then((res) => {
        return res;
      });
  }

  public projobworking_delete(model: ProjobworkingModel) {
    const data = {
      projobworking_id: model.projobworking_id,
      projobworking_emp: model.projobworking_emp,
      projobworking_workdate: this.datePipe.transform(model.projobworking_workdate),
      projob_code: model.projob_code,
      project_code: model.project_code,
      modified_by: this.initial_current.Username
    };

    return this.http.post<any>(this.config.ApiProjectModule + '/projobworking_del', data, this.options).toPromise()
      .then((res) => {
        return res;
      });
  }

  public projobworking_import(file: File, file_name: string, file_type: string) {
    const formData = new FormData();
    formData.append('file', file);
    var para = "fileName=" + file_name + "." + file_type;
    para += "&token=" + this.initial_current.Token;
    para += "&by=" + this.initial_current.Username;
    para += "&com=" + this.initial_current.CompCode;

    return this.http.post<any>(this.config.ApiProjectModule + '/doUploadTRProjobworking?' + para, formData).toPromise()
      .then((res) => {
        return res;
      });
  }



  //-- Job shift
  public projobshift_get(version: string, project: string, job: string) {

    var filter = {
      device_name: '',
      ip: "localhost",
      username: this.initial_current.Username,
      company_code: this.initial_current.CompCode,
      language: "",
      project_code: project,
      project_name_th: "",
      project_name_en: "",
      project_name_sub: "",
      project_codecentral: "",
      project_protype: "",
      project_probusiness: "",
      job_code: job,
      version: version,
    };


    return this.http.post<any>(this.config.ApiProjectModule + '/projobshift_list', filter, this.options).toPromise()
      .then((res) => {
        let message = JSON.parse(res);
        //// console.log(res)
        return message.data;
      });
  }

  public projobshift_record(version: string, project: string, job: string, list: ProjobshiftModel[]) {

    var item_data: string = "[";
    for (let i = 0; i < list.length; i++) {
      item_data = item_data + "{";

      item_data = item_data + "\"projobshift_id\":\"" + list[i].projobshift_id + "\"";
      item_data = item_data + ",\"shift_code\":\"" + list[i].shift_code + "\"";
      item_data = item_data + ",\"projobshift_sun\":\"" + list[i].projobshift_sun + "\"";
      item_data = item_data + ",\"projobshift_mon\":\"" + list[i].projobshift_mon + "\"";
      item_data = item_data + ",\"projobshift_tue\":\"" + list[i].projobshift_tue + "\"";
      item_data = item_data + ",\"projobshift_wed\":\"" + list[i].projobshift_wed + "\"";
      item_data = item_data + ",\"projobshift_thu\":\"" + list[i].projobshift_thu + "\"";
      item_data = item_data + ",\"projobshift_fri\":\"" + list[i].projobshift_fri + "\"";
      item_data = item_data + ",\"projobshift_sat\":\"" + list[i].projobshift_sat + "\"";

      item_data = item_data + ",\"projobshift_emp\":\"" + list[i].projobshift_emp + "\"";
      item_data = item_data + ",\"projobshift_working\":\"" + list[i].projobshift_working + "\"";
      item_data = item_data + ",\"projobshift_hrsperday\":\"" + list[i].projobshift_hrsperday + "\"";
      item_data = item_data + ",\"projobshift_hrsot\":\"" + list[i].projobshift_hrsot + "\"";

      item_data = item_data + ",\"projob_code\":\"" + job + "\"";
      item_data = item_data + ",\"project_code\":\"" + project + "\"";
      item_data = item_data + ",\"version\":\"" + version + "\"";
      item_data = item_data + "}" + ",";
    }
    if (item_data.length > 2) {
      item_data = item_data.substr(0, item_data.length - 1);
    }
    item_data = item_data + "]";

    var specificData = {
      transaction_data: item_data,
      project_code: project,
      job_code: job,
      modified_by: this.initial_current.Username
    };

    return this.http.post<any>(this.config.ApiProjectModule + '/projobshifts', specificData, this.options).toPromise()
      .then((res) => {
        return res;
      });
  }

  public projobshift_delete(project: string, job: string, version: string, model: ProjobshiftModel) {
    const data = {
      projobshift_id: model.projobshift_id,
      shift_code: model.shift_code,
      projob_code: job,
      project_code: project,
      version: version,
      modified_by: this.initial_current.Username
    };

    return this.http.post<any>(this.config.ApiProjectModule + '/projobshift_del', data, this.options).toPromise()
      .then((res) => {
        return res;
      });
  }

  public projobshift_import(file: File, file_name: string, file_type: string) {
    const formData = new FormData();
    formData.append('file', file);
    var para = "fileName=" + file_name + "." + file_type;
    para += "&token=" + this.initial_current.Token;
    para += "&by=" + this.initial_current.Username;
    para += "&com=" + this.initial_current.CompCode;

    return this.http.post<any>(this.config.ApiProjectModule + '/doUploadTRProjobshift?' + para, formData).toPromise()
      .then((res) => {
        return res;
      });
  }

  //-- Job version
  public projobversion_get(project: string) {

    var filter = {
      device_name: '',
      ip: "localhost",
      username: this.initial_current.Username,
      company: "",
      language: "",
      project_code: project,
      project_name_th: "",
      project_name_en: "",
      project_name_sub: "",
      project_codecentral: "",
      project_protype: "",
      project_probusiness: "",
      fromdate: "",
      todate: ""
    };


    return this.http.post<any>(this.config.ApiProjectModule + '/projobversion_list', filter, this.options).toPromise()
      .then((res) => {
        let message = JSON.parse(res);
        //// console.log(res)
        return message.data;
      });
  }

  public projobversion_record(model: ProjobversionModel) {
    const data = {
      projobversion_id: model.projobversion_id,
      version: model.version,
      fromdate: this.datePipe.transform(model.fromdate),
      todate: this.datePipe.transform(model.todate),
      project_code: model.project_code,
      modified_by: this.initial_current.Username
    };

    return this.http.post<any>(this.config.ApiProjectModule + '/projobversion', data, this.options).toPromise()
      .then((res) => {
        return res;
      });
  }

  public projobversion_delete(model: ProjobversionModel) {
    const data = {
      projobversion_id: model.projobversion_id,
      version: model.version,
      project_code: model.project_code,
      modified_by: this.initial_current.Username
    };

    return this.http.post<any>(this.config.ApiProjectModule + '/projobversion_del', data, this.options).toPromise()
      .then((res) => {
        return res;
      });
  }

  //-- Job policy
  public projobpol_get(project: string, job: string) {

    var filter = {
      device_name: '',
      ip: "localhost",
      username: this.initial_current.Username,
      company: "",
      language: "",
      project_code: project,
      project_name_th: "",
      project_name_en: "",
      project_name_sub: "",
      project_codecentral: "",
      project_protype: "",
      project_probusiness: "",
      fromdate: "",
      todate: "",
      job_code: job,
    };


    return this.http.post<any>(this.config.ApiProjectModule + '/projobpol_list', filter, this.options).toPromise()
      .then((res) => {
        let message = JSON.parse(res);
        //// console.log(res)
        return message.data;
      });
  }

  public projobpol_record(project: string, job: string, list: ProjobpolModel[]) {

    var model = list[0]

    const data = {
      projobpol_id: model.projobpol_id,
      projobpol_type: model.projobpol_type,
      projobpol_timepol: model.projobpol_timepol,
      projobpol_slip: model.projobpol_slip,
      projobpol_uniform: model.projobpol_uniform,
      project_code: project,
      projobmain_code: job,
      modified_by: this.initial_current.Username
    };

    return this.http.post<any>(this.config.ApiProjectModule + '/projobpol', data, this.options).toPromise()
      .then((res) => {
        return res;
      });
  }

  public projobpol_delete(model: ProjobpolModel) {
    const data = {
      projobpol_id: model.projobpol_id,
      project_code: model.project_code,
      projobmain_code: model.projob_code,
      modified_by: this.initial_current.Username
    };

    return this.http.post<any>(this.config.ApiProjectModule + '/projobpol_del', data, this.options).toPromise()
      .then((res) => {
        return res;
      });
  }
  //--
  public proequipmentreq_get(project: string) {

    var filter = {
      device_name: '',
      ip: "localhost",
      username: this.initial_current.Username,
      company: "",
      language: "",
      prouniform_code: "",
      proequipmentreq_date: "",
      proequipmentreq_qty: "",
      proequipmentreq_note: "",
      proequipmentreq_by: "",
      proequipmenttype_code: "",
      projob_code: "",
      project_code: project,
    };


    return this.http.post<any>(this.config.ApiProjectModule + '/TRProequipmentreq_list', filter, this.options).toPromise()
      .then((res) => {
        let message = JSON.parse(res);
        //// console.log(res)
        return message.data;
      });
  }

  public proequipmentreq_record(project: string,   list: ProequipmentreqModel[]) {

    var item_data: string = "[";
    for (let i = 0; i < list.length; i++) {
      item_data = item_data + "{";
      item_data = item_data + "\"proequipmentreq_id\":\"" + list[i].proequipmentreq_id + "\"";
      item_data = item_data + ",\"prouniform_code\":\"" + list[i].prouniform_code + "\"";
 
      item_data = item_data + ",\"proequipmentreq_date\":\"" + this.datePipe.transform(list[i].proequipmentreq_date, 'yyyy-MM-dd') + "\"";
      item_data = item_data + ",\"proequipmentreq_qty\":\"" + list[i].proequipmentreq_qty + "\"";
      item_data = item_data + ",\"proequipmentreq_note\":\"" + list[i].proequipmentreq_note + "\"";
      item_data = item_data + ",\"proequipmentreq_by\":\"" + list[i].proequipmentreq_by + "\"";
      item_data = item_data + ",\"proequipmenttype_code\":\"" + list[i].proequipmenttype_code + "\"";
      item_data = item_data + ",\"project_code\":\"" + project + "\"";
      item_data = item_data + ",\"projob_code\":\""+ list[i].projob_code + "\"";


      item_data = item_data + "}" + ",";
    }
    if (item_data.length > 2) {
      item_data = item_data.substr(0, item_data.length - 1);
    }
    item_data = item_data + "]";

    var specificData = {
      transaction_data: item_data,
      project_code: project,
      // projob_code: projob,
      modified_by: this.initial_current.Username
    };

    return this.http.post<any>(this.config.ApiProjectModule + '/TRProequipmentreq', specificData, this.options).toPromise()
      .then((res) => {
        return res;
      });
  }

 
  public proequipmentreq_delete(project: string , model: ProequipmentreqModel) {
    const data = {
      proequipmentreq_id: model.proequipmentreq_id,
      prouniform_code: model.prouniform_code,
      proequipmentreq_date: this.datePipe.transform(model.proequipmentreq_date),
      proequipmentreq_qty: model.proequipmentreq_qty,
      proequipmentreq_note: model.proequipmentreq_note,
      proequipmentreq_by: model.proequipmentreq_by,
      proequipmenttype_code: model.proequipmenttype_code,
      project_code: project,
      projob_code: model.projob_code,
      modified_by: this.initial_current.Username
    };
    return this.http.post<any>(this.config.ApiProjectModule + '/TRProequipmentreqdel', data, this.options).toPromise()
      .then((res) => {
        return res;
      });
  }

  public proequipmentreq_import(file: File, file_name: string, file_type: string) {
    const formData = new FormData();
    formData.append('file', file);
    var para = "fileName=" + file_name + "." + file_type;
    para += "&token=" + this.initial_current.Token;
    para += "&by=" + this.initial_current.Username;
    para += "&com=" + this.initial_current.CompCode;

    return this.http.post<any>(this.config.ApiProjectModule + '/doUploadTRProequipmentreq?' + para, formData).toPromise()
      .then((res) => {
        return res;
      });
  }

}

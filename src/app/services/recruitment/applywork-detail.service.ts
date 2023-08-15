import { Injectable } from '@angular/core';
import { AppConfig } from '../../config/config';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { InitialCurrent } from '../../config/initial_current';
import { ReqaddressModel } from 'src/app/models/recruitment/applyaddress';
import { ReqcardModel } from 'src/app/models/recruitment/applycard';
import { ReqEducationModel } from 'src/app/models/recruitment/applyeducation';
import { ReqTrainingModel } from 'src/app/models/recruitment/applytraining';
import { ReqForeignerModel } from 'src/app/models/recruitment/applyforeigner';
import { ReqCriminalModel } from 'src/app/models/recruitment/applycriminal';
import { ReqAssessmentModel } from 'src/app/models/recruitment/appassessment';
import { EmpaddressModel } from 'src/app/models/employee/manage/address';
import { EmpcardModel } from 'src/app/models/employee/manage/card';
import { EmpEducationModel } from 'src/app/models/employee/manage/education';
import { EmpTrainingModel } from 'src/app/models/employee/manage/training';
import { EmpAssessmentModel } from 'src/app/models/employee/manage/assessment';
import { EmpCriminalModel } from 'src/app/models/employee/manage/criminal';
import { EmpForeignerModel } from 'src/app/models/employee/manage/foreigner';
import { EmpSuggestModel } from 'src/app/models/employee/manage/empsuggest';
import { ApplyMTDocattModel } from 'src/app/models/recruitment/applyMTDocatt';
import { EmpPositionModel } from 'src/app/models/employee/manage/position';
import { ReqProjectModel } from 'src/app/models/recruitment/reqproject';
import { EmpSalaryModel } from 'src/app/models/employee/manage/salary';

@Injectable({
  providedIn: 'root'
})
export class ApplyworkDetailService {

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

  //Address

  public getapplywork_reqaddress(company: string, code: string) {

    var filter = {
      device_name: '',
      ip: "localhost",
      username: this.initial_current.Username,
      company_code: company,
      language: "",
      worker_code: code
    };

    return this.http.post<any>(this.config.ApiRecruitmentModule + '/reqadd_list', filter, this.options).toPromise()
      .then((res) => {
        let message = JSON.parse(res);
        // // console.log(res)
        return message.data;
      });
  }
  public record_reqaddress(worker_code: string, list: EmpaddressModel[]) {

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

    return this.http.post<any>(this.config.ApiRecruitmentModule + '/reqaddress', specificData, this.options).toPromise()
      .then((res) => {
        return res;
      });
  }

  public delete_reqaddress(model: EmpaddressModel) {
    const data = {
      address_id: model.address_id,
      worker_code: model.worker_code,
      company_code: this.initial_current.CompCode,
      modified_by: this.initial_current.Username
    };

    return this.http.post<any>(this.config.ApiRecruitmentModule + '/reqadd_del', data, this.options).toPromise()
      .then((res) => {
        return res;
      });
  }
  public reqaddress_import(file: File, file_name: string, file_type: string) {
    const formData = new FormData();
    formData.append('file', file);

    var para = "fileName=" + file_name + "." + file_type;
    para += "&token=" + this.initial_current.Token;
    para += "&by=" + this.initial_current.Username;

    return this.http.post<any>(this.config.ApiRecruitmentModule + '/doUploadApplyAddress?' + para, formData).toPromise()
      .then((res) => {
        return res;
      });
  }

  //Card
  public getapplywork_card(company: string, code: string) {

    var filter = {
      device_name: '',
      ip: "localhost",
      username: this.initial_current.Username,
      company_code: company,
      language: "",
      worker_code: code
    };

    return this.http.post<any>(this.config.ApiRecruitmentModule + '/reqcardlist', filter, this.options).toPromise()
      .then((res) => {
        let message = JSON.parse(res);
        // console.log(res)
        return message.data;
      });
  }
  public record_reqcard(worker_code: string, list: EmpcardModel[]) {
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
    // console.log(item_data);
    var specificData = {
      transaction_data: item_data,
      worker_code: worker_code,
      company_code: this.initial_current.CompCode,
      modified_by: this.initial_current.Username
    };

    return this.http.post<any>(this.config.ApiRecruitmentModule + '/reqcard', specificData, this.options).toPromise()
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

    return this.http.post<any>(this.config.ApiRecruitmentModule + '/reqcard_del', data, this.options).toPromise()
      .then((res) => {
        return res;
      });
  }
  public reqcard_import(file: File, file_name: string, file_type: string) {
    const formData = new FormData();
    formData.append('file', file);

    var para = "fileName=" + file_name + "." + file_type;
    para += "&token=" + this.initial_current.Token;
    para += "&by=" + this.initial_current.Username;

    return this.http.post<any>(this.config.ApiRecruitmentModule + '/doUploadApplyCard?' + para, formData).toPromise()
      .then((res) => {
        return res;
      });
  }



  //Education
  public getapply_education(company: string, code: string) {

    var filter = {
      device_name: '',
      ip: "localhost",
      username: this.initial_current.Username,
      company_code: company,
      language: "",
      worker_code: code
    };

    return this.http.post<any>(this.config.ApiRecruitmentModule + '/reqeducationlist', filter, this.options).toPromise()
      .then((res) => {
        let message = JSON.parse(res);
        // // console.log(res)
        return message.data;
      });
  }
  public record_reqeducation(worker_code: string, list: EmpEducationModel[]) {
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

    return this.http.post<any>(this.config.ApiRecruitmentModule + '/reqeducation', specificData, this.options).toPromise()
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

    return this.http.post<any>(this.config.ApiRecruitmentModule + '/reqeducation_del', data, this.options).toPromise()
      .then((res) => {
        return res;
      });
  }
  public reqeducation_import(file: File, file_name: string, file_type: string) {
    const formData = new FormData();
    formData.append('file', file);

    var para = "fileName=" + file_name + "." + file_type;
    para += "&token=" + this.initial_current.Token;
    para += "&by=" + this.initial_current.Username;

    return this.http.post<any>(this.config.ApiRecruitmentModule + '/doUploadreqEducation?' + para, formData).toPromise()
      .then((res) => {
        return res;
      });
  }

  //Training
  public getapplywork_training(company: string, code: string) {

    var filter = {
      device_name: '',
      ip: "localhost",
      username: this.initial_current.Username,
      company_code: company,
      language: "",
      worker_code: code
    };

    return this.http.post<any>(this.config.ApiRecruitmentModule + '/reqtraininglist', filter, this.options).toPromise()
      .then((res) => {
        let message = JSON.parse(res);
        // // console.log(res)
        return message.data;
      });
  }
  public record_reqtraining(worker_code: string, list: EmpTrainingModel[]) {
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

    return this.http.post<any>(this.config.ApiRecruitmentModule + '/reqtraining', specificData, this.options).toPromise()
      .then((res) => {
        return res;
      });
  }
  public delete_reqtraining(model: EmpTrainingModel) {
    const data = {
      emptraining_no: model.emptraining_no,
      worker_code: model.worker_code,
      company_code: this.initial_current.CompCode,
      modified_by: this.initial_current.Username
    };

    return this.http.post<any>(this.config.ApiRecruitmentModule + '/reqtraining_del', data, this.options).toPromise()
      .then((res) => {
        return res;
      });
  }
  public reqtraining_import(file: File, file_name: string, file_type: string) {
    const formData = new FormData();
    formData.append('file', file);

    var para = "fileName=" + file_name + "." + file_type;
    para += "&token=" + this.initial_current.Token;
    para += "&by=" + this.initial_current.Username;

    return this.http.post<any>(this.config.ApiRecruitmentModule + '/doUploadreqTraining?' + para, formData).toPromise()
      .then((res) => {
        return res;
      });
  }


  //req Assessment
  public getapplywork_assessment(company: string, code: string) {

    var filter = {
      device_name: '',
      ip: "localhost",
      username: this.initial_current.Username,
      company_code: company,
      language: "",
      worker_code: code
    };

    return this.http.post<any>(this.config.ApiRecruitmentModule + '/reqassessmentlist', filter, this.options).toPromise()
      .then((res) => {
        let message = JSON.parse(res);
        // // console.log(res)
        return message.data;
      });
  }
  public record_reqassessment(worker_code: string, list: EmpAssessmentModel[]) {
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

    return this.http.post<any>(this.config.ApiRecruitmentModule + '/reqassessment', specificData, this.options).toPromise()
      .then((res) => {
        return res;
      });
  }
  public delete_reqassessment(model: EmpAssessmentModel) {
    const data = {
      empassessment_id: model.empassessment_id,
      worker_code: model.worker_code,
      company_code: this.initial_current.CompCode,
      modified_by: this.initial_current.Username
    };

    return this.http.post<any>(this.config.ApiRecruitmentModule + '/reqassessment_del', data, this.options).toPromise()
      .then((res) => {
        return res;
      });
  }
  public reqassessment_import(file: File, file_name: string, file_type: string) {
    const formData = new FormData();
    formData.append('file', file);

    var para = "fileName=" + file_name + "." + file_type;
    para += "&token=" + this.initial_current.Token;
    para += "&by=" + this.initial_current.Username;

    return this.http.post<any>(this.config.ApiRecruitmentModule + '/doUploadReqAssessment?' + para, formData).toPromise()
      .then((res) => {
        return res;
      });
  }

  //req Criminal
  public getapplywork_criminal(company: string, code: string) {

    var filter = {
      device_name: '',
      ip: "localhost",
      username: this.initial_current.Username,
      company_code: company,
      language: "",
      worker_code: code
    };

    return this.http.post<any>(this.config.ApiRecruitmentModule + '/reqcriminallist', filter, this.options).toPromise()
      .then((res) => {
        let message = JSON.parse(res);
        // // console.log(res)
        return message.data;
      });
  }
  public record_reqcriminal(worker_code: string, list: EmpCriminalModel[]) {
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

    return this.http.post<any>(this.config.ApiRecruitmentModule + '/reqcriminal', specificData, this.options).toPromise()
      .then((res) => {
        return res;
      });
  }
  public delete_reqcriminal(model: EmpCriminalModel) {
    const data = {
      empcriminal_id: model.empcriminal_id,
      worker_code: model.worker_code,
      company_code: this.initial_current.CompCode,
      modified_by: this.initial_current.Username
    };

    return this.http.post<any>(this.config.ApiRecruitmentModule + '/reqcriminal_del', data, this.options).toPromise()
      .then((res) => {
        return res;
      });
  }
  public reqcriminal_import(file: File, file_name: string, file_type: string) {
    const formData = new FormData();
    formData.append('file', file);

    var para = "fileName=" + file_name + "." + file_type;
    para += "&token=" + this.initial_current.Token;
    para += "&by=" + this.initial_current.Username;

    return this.http.post<any>(this.config.ApiRecruitmentModule + '/doUploadReqCriminal?' + para, formData).toPromise()
      .then((res) => {
        return res;
      });
  }

  //Foreigner
  public getapplywork_foreigner(company: string, code: string) {
    var filter = {
      device_name: '',
      ip: "localhost",
      username: this.initial_current.Username,
      company_code: company,
      language: "",
      worker_code: code
    };

    return this.http.post<any>(this.config.ApiRecruitmentModule + '/reqforeignerlist', filter, this.options).toPromise()
      .then((res) => {
        let message = JSON.parse(res);
        // console.log(res)
        return message.data;
      });
  }
  public record_reqforeigner(worker_code: string, model: EmpForeignerModel) {
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

    return this.http.post<any>(this.config.ApiRecruitmentModule + '/reqforeigner', data, this.options).toPromise()
      .then((res) => {
        return res;
      });
  }
  public delete_reqforeigner(model: EmpForeignerModel) {
    const data = {
      foreigner_id: model.foreigner_id,
      worker_code: model.worker_code,
      company_code: this.initial_current.CompCode,
      modified_by: this.initial_current.Username
    };

    return this.http.post<any>(this.config.ApiRecruitmentModule + '/reqforeigner_del', data, this.options).toPromise()
      .then((res) => {
        return res;
      });
  }
  public reqforeigner_import(file: File, file_name: string, file_type: string) {
    const formData = new FormData();
    formData.append('file', file);

    var para = "fileName=" + file_name + "." + file_type;
    para += "&token=" + this.initial_current.Token;
    para += "&by=" + this.initial_current.Username;

    return this.http.post<any>(this.config.ApiRecruitmentModule + '/doUploadForeigner?' + para, formData).toPromise()
      .then((res) => {
        return res;
      });
  }

  //req Suggest
  public getapplywork_suggest(company: string, code: string) {

    var filter = {
      device_name: '',
      ip: "localhost",
      username: this.initial_current.Username,
      company_code: company,
      language: "",
      worker_code: code
    };

    return this.http.post<any>(this.config.ApiRecruitmentModule + '/reqsuggestlist', filter, this.options).toPromise()
      .then((res) => {
        let message = JSON.parse(res);
        // // console.log(res)
        return message.data;
      });
  }
  public record_reqsuggest(worker_code: string, list: EmpSuggestModel[]) {
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

    return this.http.post<any>(this.config.ApiRecruitmentModule + '/reqsuggest', specificData, this.options).toPromise()
      .then((res) => {
        return res;
      });
  }
  public delete_reqsuggest(model: EmpSuggestModel) {
    const data = {
      empsuggest_id: model.empsuggest_id,
      worker_code: model.worker_code,
      company_code: this.initial_current.CompCode,
      modified_by: this.initial_current.Username
    };

    return this.http.post<any>(this.config.ApiRecruitmentModule + '/reqsuggest_del', data, this.options).toPromise()
      .then((res) => {
        return res;
      });
  }
  public reqsuggest_import(file: File, file_name: string, file_type: string) {
    const formData = new FormData();
    formData.append('file', file);

    var para = "fileName=" + file_name + "." + file_type;
    para += "&token=" + this.initial_current.Token;
    para += "&by=" + this.initial_current.Username;

    return this.http.post<any>(this.config.ApiRecruitmentModule + '/doUploadreqSuggest?' + para, formData).toPromise()
      .then((res) => {
        return res;
      });
  }

  //req position
  public getapplywork_position(company: string, code: string) {

    var filter = {
      device_name: '',
      ip: "localhost",
      username: this.initial_current.Username,
      company_code: company,
      language: "",
      worker_code: code
    };

    return this.http.post<any>(this.config.ApiRecruitmentModule + '/reqpsotionlist', filter, this.options).toPromise()
      .then((res) => {
        let message = JSON.parse(res);
        // // console.log(res)
        return message.data;
      });
  }
  public record_reqposition(worker_code: string, list: EmpPositionModel[]) {
    var item_data: string = "[";
    for (let i = 0; i < list.length; i++) {
      item_data = item_data + "{";
      item_data = item_data + "\"empposition_position\":\"" + list[i].empposition_position + "\"";
      
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

    return this.http.post<any>(this.config.ApiRecruitmentModule + '/reqposition', specificData, this.options).toPromise()
      .then((res) => {
        return res;
      });
  }
  public delete_reqposition(model: EmpPositionModel) {
    const data = {
      empposition_id: model.empposition_id,
      worker_code: model.worker_code,
      company_code: this.initial_current.CompCode,
      modified_by: this.initial_current.Username
    };

    return this.http.post<any>(this.config.ApiRecruitmentModule + '/reqposition_del', data, this.options).toPromise()
      .then((res) => {
        return res;
      });
  }
  public reqposition_import(file: File, file_name: string, file_type: string) {
    const formData = new FormData();
    formData.append('file', file);

    var para = "fileName=" + file_name + "." + file_type;
    para += "&token=" + this.initial_current.Token;
    para += "&by=" + this.initial_current.Username;

    return this.http.post<any>(this.config.ApiRecruitmentModule + '/doUploadApplyPosition?' + para, formData).toPromise()
      .then((res) => {
        return res;
      });
  }

  //req project
  public getapplywork_project(company: string, code: string) {

    var filter = {
      device_name: '',
      ip: "localhost",
      username: this.initial_current.Username,
      company_code: company,
      language: "",
      worker_code: code
    };

    return this.http.post<any>(this.config.ApiRecruitmentModule + '/reqprojectlist', filter, this.options).toPromise()
      .then((res) => {
        let message = JSON.parse(res);
        // // console.log(res)
        return message.data;
      });
  }
  public record_reqproject(worker_code: string, list: ReqProjectModel[]) {
    var item_data: string = "[";
    for (let i = 0; i < list.length; i++) {
      item_data = item_data + "{";
      item_data = item_data + "\"project_code\":\"" + list[i].project_code + "\"";
      
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

    return this.http.post<any>(this.config.ApiRecruitmentModule + '/reqproject', specificData, this.options).toPromise()
      .then((res) => {
        return res;
      });
  }
  public delete_reqproject(model: ReqProjectModel) {
    const data = {
      empproject_id: model.empproject_id,
      worker_code: model.worker_code,
      company_code: this.initial_current.CompCode,
      modified_by: this.initial_current.Username
    };

    return this.http.post<any>(this.config.ApiRecruitmentModule + '/reqproject_del', data, this.options).toPromise()
      .then((res) => {
        return res;
      });
  }
  public reqproject_import(file: File, file_name: string, file_type: string) {
    const formData = new FormData();
    formData.append('file', file);

    var para = "fileName=" + file_name + "." + file_type;
    para += "&token=" + this.initial_current.Token;
    para += "&by=" + this.initial_current.Username;

    return this.http.post<any>(this.config.ApiRecruitmentModule + '/doUploadApplyProject?' + para, formData).toPromise()
      .then((res) => {
        return res;
      });
  }

  //req salary
  public getapplywork_salary(company: string, code: string) {

    var filter = {
      device_name: '',
      ip: "localhost",
      username: this.initial_current.Username,
      company_code: company,
      language: "",
      worker_code: code
    };

    return this.http.post<any>(this.config.ApiRecruitmentModule + '/reqsalarylist', filter, this.options).toPromise()
      .then((res) => {
        let message = JSON.parse(res);
        // // console.log(res)
        return message.data;
      });
  }
  public record_reqsalary(worker_code: string, list: EmpSalaryModel[]) {
    var item_data: string = "[";
    for (let i = 0; i < list.length; i++) {
      item_data = item_data + "{";
      item_data = item_data + "\"empsalary_amount\":\"" + list[i].empsalary_amount + "\"";
      
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

    return this.http.post<any>(this.config.ApiRecruitmentModule + '/reqsalary', specificData, this.options).toPromise()
      .then((res) => {
        return res;
      });
  }
  public delete_reqsalary(model: EmpSalaryModel) {
    const data = {
      empsalary_id: model.empsalary_id,
      worker_code: model.worker_code,
      company_code: this.initial_current.CompCode,
      modified_by: this.initial_current.Username
    };

    return this.http.post<any>(this.config.ApiRecruitmentModule + '/reqsalary_del', data, this.options).toPromise()
      .then((res) => {
        return res;
      });
  }
  public reqsalary_import(file: File, file_name: string, file_type: string) {
    const formData = new FormData();
    formData.append('file', file);

    var para = "fileName=" + file_name + "." + file_type;
    para += "&token=" + this.initial_current.Token;
    para += "&by=" + this.initial_current.Username;

    return this.http.post<any>(this.config.ApiRecruitmentModule + '/doUploadApplySalary?' + para, formData).toPromise()
      .then((res) => {
        return res;
      });
  }

}

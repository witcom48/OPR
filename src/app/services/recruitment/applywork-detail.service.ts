import { Injectable } from '@angular/core';
import { AppConfig } from '../../config/config';
import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { InitialCurrent } from '../../config/initial_current';
import { ReqaddressModel } from 'src/app/models/recruitment/applyaddress';
import { ReqcardModel } from 'src/app/models/recruitment/applycard';
import { ReqEducationModel } from 'src/app/models/recruitment/applyeducation';
import { ReqTrainingModel } from 'src/app/models/recruitment/applytraining';
import { ReqForeignerModel } from 'src/app/models/recruitment/applyforeigner';
import { EmpaddressModel } from 'src/app/models/employee/manage/address';

@Injectable({
  providedIn: 'root'
})
export class ApplyworkDetailService {

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

     //Address

    public getapplywork_reqaddress(company:string, code:string){

      var filter = {
        device_name:'',
        ip:"localhost",
        username:this.initial_current.Username,
        company_code:company,
        language:"",
        worker_code:code
      };

      return this.http.post<any>(this.config.ApiRecruitmentModule + '/reqadd_list', filter, this.options).toPromise()
      .then((res) => {
        let message = JSON.parse(res);
        // console.log(res)
        return message.data;
      });
    }
    public record_reqaddress(worker_code :string, list:EmpaddressModel[]) {

      var item_data:string = "[";
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
      if(item_data.length > 2)
      {
        item_data = item_data.substr(0, item_data.length - 1);
      }
      item_data = item_data + "]";

      var specificData = {
        transaction_data:item_data,
        worker_code:worker_code,
        company_code : this.initial_current.CompCode,
        modified_by:this.initial_current.Username
      };

      return this.http.post<any>(this.config.ApiRecruitmentModule + '/reqaddress', specificData, this.options).toPromise()
      .then((res) => {
        return res;
      });
    }

    public delete_reqaddress(model:EmpaddressModel){
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
    public empaddress_import(file: File, file_name:string, file_type:string){
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
    public getapplywork_card(company:string, code:string){

      var filter = {
        device_name:'',
        ip:"localhost",
        username:this.initial_current.Username,
        company_code:company,
        language:"",
        applywork_code:code
      };

      return this.http.post<any>(this.config.ApiRecruitmentModule + '/reqcardlist', filter, this.options).toPromise()
      .then((res) => {
        let message = JSON.parse(res);
        console.log(res)
        return message.data;
      });
    }
    public record_reqcard(applywork_code :string, list:ReqcardModel[]){
      var item_data:string = "[";
      for (let i = 0; i < list.length; i++) {
        item_data = item_data + "{";
        item_data = item_data + "\"card_id\":\"" + list[i].card_id + "\"";
        item_data = item_data + ",\"card_code\":\"" + list[i].card_code + "\"";
        item_data = item_data + ",\"card_type\":\"" + list[i].card_type + "\"";
        item_data = item_data + ",\"card_issue\":\"" + this.datePipe.transform(list[i].card_issue) + "\"";
        item_data = item_data + ",\"card_expire\":\"" + this.datePipe.transform(list[i].card_expire) + "\"";
        item_data = item_data + ",\"company_code\":\"" + this.initial_current.CompCode + "\"";
        item_data = item_data + ",\"applywork_code\":\"" + applywork_code + "\"";
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
        applywork_code:applywork_code,
        company_code : this.initial_current.CompCode,
        modified_by:this.initial_current.Username
      };

      return this.http.post<any>(this.config.ApiRecruitmentModule + '/reqcard', specificData, this.options).toPromise()
      .then((res) => {
        return res;
      });
    }
    public delete_empcard(model:ReqcardModel){
      const data = {
        card_id: model.card_id,
        applywork_code: model.applywork_code,
        company_code: this.initial_current.CompCode,
        modified_by: this.initial_current.Username
      };

      return this.http.post<any>(this.config.ApiRecruitmentModule + '/reqcard_del', data, this.options).toPromise()
      .then((res) => {
        return res;
      });
    }
    public empcard_import(file: File, file_name:string, file_type:string){
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
    public getapply_education(company:string, code:string){

      var filter = {
        device_name:'',
        ip:"localhost",
        username:this.initial_current.Username,
        company_code:company,
        language:"",
        applywork_code:code
      };

      return this.http.post<any>(this.config.ApiRecruitmentModule + '/reqeducationlist', filter, this.options).toPromise()
      .then((res) => {
        let message = JSON.parse(res);
        // console.log(res)
        return message.data;
      });
    }
    public record_reqeducation(applywork_code :string, list:ReqEducationModel[]){
      var item_data:string = "[";
      for (let i = 0; i < list.length; i++) {
        item_data = item_data + "{";
        item_data = item_data + "\"reqeducation_no\":\"" + list[i].reqeducation_no + "\"";
        item_data = item_data + ",\"reqeducation_gpa\":\"" + list[i].reqeducation_gpa + "\"";
        item_data = item_data + ",\"reqeducation_start\":\"" + this.datePipe.transform(list[i].reqeducation_start)  + "\"";
        item_data = item_data + ",\"reqeducation_finish\":\"" + this.datePipe.transform(list[i].reqeducation_finish)  + "\"";
        item_data = item_data + ",\"institute_code\":\"" + list[i].institute_code + "\"";
        item_data = item_data + ",\"faculty_code\":\"" + list[i].faculty_code + "\"";
        item_data = item_data + ",\"major_code\":\"" + list[i].major_code + "\"";
        item_data = item_data + ",\"qualification_code\":\"" + list[i].qualification_code + "\"";
        item_data = item_data + ",\"company_code\":\"" + this.initial_current.CompCode + "\"";
        item_data = item_data + ",\"applywork_code\":\"" + applywork_code + "\"";
        item_data = item_data + "}" + ",";
      }
      if(item_data.length > 2)
      {
        item_data = item_data.substr(0, item_data.length - 1);
      }
      item_data = item_data + "]";

      var specificData = {
        transaction_data:item_data,
        applywork_code:applywork_code,
        company_code : this.initial_current.CompCode,
        modified_by:this.initial_current.Username
      };

      return this.http.post<any>(this.config.ApiRecruitmentModule + '/reqeducation', specificData, this.options).toPromise()
      .then((res) => {
        return res;
      });
    }
    public delete_empeducation(model:ReqEducationModel){
      const data = {
        reqeducation_no: model.reqeducation_no,
        applywork_code: model.applywork_code,
        company_code: this.initial_current.CompCode,
        modified_by: this.initial_current.Username
      };

      return this.http.post<any>(this.config.ApiRecruitmentModule + '/reqeducation_del', data, this.options).toPromise()
      .then((res) => {
        return res;
      });
    }
    public empeducation_import(file: File, file_name:string, file_type:string){
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
    public getapplywork_training(company:string, code:string){

      var filter = {
        device_name:'',
        ip:"localhost",
        username:this.initial_current.Username,
        company_code:company,
        language:"",
        applywork_code:code
      };

      return this.http.post<any>(this.config.ApiRecruitmentModule + '/reqtraininglist', filter, this.options).toPromise()
      .then((res) => {
        let message = JSON.parse(res);
        // console.log(res)
        return message.data;
      });
    }
    public record_reqtraining(applywork_code :string, list:ReqTrainingModel[]){
      var item_data:string = "[";
      for (let i = 0; i < list.length; i++) {
        item_data = item_data + "{";
        item_data = item_data + "\"reqtraining_no\":\"" + list[i].reqtraining_no + "\"";
        item_data = item_data + ",\"reqtraining_start\":\"" + this.datePipe.transform(list[i].reqtraining_start)  + "\"";
        item_data = item_data + ",\"reqtraining_finish\":\"" + this.datePipe.transform(list[i].reqtraining_finish)  + "\"";
        item_data = item_data + ",\"reqtraining_status\":\"" + list[i].reqtraining_status + "\"";
        item_data = item_data + ",\"reqtraining_hours\":\"" + list[i].reqtraining_hours + "\"";
        item_data = item_data + ",\"reqtraining_cost\":\"" + list[i].reqtraining_cost + "\"";
        item_data = item_data + ",\"reqtraining_note\":\"" + list[i].reqtraining_note + "\"";
        item_data = item_data + ",\"institute_code\":\"" + list[i].institute_code + "\"";
        item_data = item_data + ",\"institute_other\":\"" + list[i].institute_other + "\"";
        item_data = item_data + ",\"course_code\":\"" + list[i].course_code + "\"";
        item_data = item_data + ",\"course_other\":\"" + list[i].course_other + "\"";
        item_data = item_data + ",\"company_code\":\"" + this.initial_current.CompCode + "\"";
        item_data = item_data + ",\"applywork_code\":\"" + applywork_code + "\"";
        item_data = item_data + "}" + ",";
      }
      if(item_data.length > 2)
      {
        item_data = item_data.substr(0, item_data.length - 1);
      }
      item_data = item_data + "]";

      var specificData = {
        transaction_data:item_data,
        applywork_code:applywork_code,
        company_code : this.initial_current.CompCode,
        modified_by:this.initial_current.Username
      };

      return this.http.post<any>(this.config.ApiRecruitmentModule + '/reqtraining', specificData, this.options).toPromise()
      .then((res) => {
        return res;
      });
    }
    public delete_emptraining(model:ReqTrainingModel){
      const data = {
        reqtraining_no: model.reqtraining_no,
        applywork_code: model.applywork_code,
        company_code: this.initial_current.CompCode,
        modified_by: this.initial_current.Username
      };

      return this.http.post<any>(this.config.ApiRecruitmentModule + '/reqtraining_del', data, this.options).toPromise()
      .then((res) => {
        return res;
      });
    }
    public emptraining_import(file: File, file_name:string, file_type:string){
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



  //Foreigner
  public getapplywork_foreigner(company:string, code:string){
    var filter = {
      device_name:'',
      ip:"localhost",
      username:this.initial_current.Username,
      company_code:company,
      language:"",
      applywork_code:code
    };

    return this.http.post<any>(this.config.ApiRecruitmentModule + '/reqforeignerlist', filter, this.options).toPromise()
    .then((res) => {
      let message = JSON.parse(res);
      console.log(res)
      return message.data;
    });
  }
  public record_reqforeigner(applywork_code :string, model:ReqForeignerModel){
    const data = {
      company_code: this.initial_current.CompCode,
      applywork_code: applywork_code,
      foreigner_id : model.foreigner_id,
      passport_no : model.passport_no,
      passport_issue : model.passport_issue,
      passport_expire : model.passport_expire,
      visa_no : model.visa_no,
      visa_issue : model.visa_issue,
      visa_expire : model.visa_expire,
      workpermit_no : model.workpermit_no,
      workpermit_by : model.passport_issue,
      workpermit_issue : model.workpermit_issue,
      workpermit_expire : model.workpermit_expire,
      entry_date : model.entry_date,
      certificate_no : model.certificate_no,
      certificate_expire : model.certificate_expire,
      otherdoc_no : model.otherdoc_no,
      otherdoc_expire : model.otherdoc_expire,

      modified_by: this.initial_current.Username
    };

    return this.http.post<any>(this.config.ApiRecruitmentModule + '/reqforeigner', data, this.options).toPromise()
    .then((res) => {
      return res;
    });
  }
  public delete_reqforeigner(model:ReqForeignerModel){
    const data = {
      foreigner_id: model.foreigner_id,
      applywork_code: model.applywork_code,
      company_code: this.initial_current.CompCode,
      modified_by: this.initial_current.Username
    };

    return this.http.post<any>(this.config.ApiRecruitmentModule + '/reqforeigner_del', data, this.options).toPromise()
    .then((res) => {
      return res;
    });
  }
  public empforeigner_import(file: File, file_name:string, file_type:string){
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



    //location
    // public getworker_location(company:string, code:string){

    //   var filter = {
    //     device_name:'',
    //     ip:"localhost",
    //     username:this.initial_current.Username,
    //     company_code:company,
    //     language:"",
    //     applywork_code:code
    //   };

    //   return this.http.post<any>(this.config.ApiRecruitmentModule + '/emplocationlist', filter, this.options).toPromise()
    //   .then((res) => {
    //     let message = JSON.parse(res);
    //     // console.log(res)
    //     return message.data;
    //   });
    // }
    // public record_emplocation(applywork_code :string, list:EmpLocationModel[]){
    //   var item_data:string = "[";
    //   for (let i = 0; i < list.length; i++) {
    //     item_data = item_data + "{";
    //     item_data = item_data + "\"location_code\":\"" + list[i].location_code + "\"";
    //     item_data = item_data + ",\"emplocation_startdate\":\"" + this.datePipe.transform(list[i].emplocation_startdate) + "\"";
    //     item_data = item_data + ",\"emplocation_enddate\":\"" + this.datePipe.transform(list[i].emplocation_enddate) + "\"";
    //     item_data = item_data + ",\"emplocation_note\":\"" + list[i].emplocation_note + "\"";
    //     item_data = item_data + ",\"company_code\":\"" + this.initial_current.CompCode + "\"";
    //     item_data = item_data + ",\"applywork_code\":\"" + applywork_code + "\"";
    //     item_data = item_data + "}" + ",";
    //   }
    //   if(item_data.length > 2)
    //   {
    //     item_data = item_data.substr(0, item_data.length - 1);
    //   }
    //   item_data = item_data + "]";

    //   var specificData = {
    //     transaction_data:item_data,
    //     applywork_code:applywork_code,
    //     company_code : this.initial_current.CompCode,
    //     modified_by:this.initial_current.Username
    //   };

    //   return this.http.post<any>(this.config.ApiRecruitmentModule + '/emplocation', specificData, this.options).toPromise()
    //   .then((res) => {
    //     return res;
    //   });
    // }
    // public delete_emplocation(model:EmpLocationModel){
    //   const data = {
    //     location_code: model.location_code,
    //     applywork_code: model.applywork_code,
    //     company_code: this.initial_current.CompCode,
    //     modified_by: this.initial_current.Username
    //   };

    //   return this.http.post<any>(this.config.ApiRecruitmentModule + '/emplocation_del', data, this.options).toPromise()
    //   .then((res) => {
    //     return res;
    //   });
    // }

    // public emplocation_import(file: File, file_name:string, file_type:string){
    //   const formData = new FormData();
    //   formData.append('file', file);

    //     var para = "fileName=" + file_name + "." + file_type;
    //     para += "&token=" + this.initial_current.Token;
    //     para += "&by=" + this.initial_current.Username;

    //   return this.http.post<any>(this.config.ApiRecruitmentModule + '/doUploadEmpLocation?' + para, formData).toPromise()
    //   .then((res) => {
    //     return res;
    //   });
    // }


  }

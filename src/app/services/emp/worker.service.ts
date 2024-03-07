import { Injectable } from '@angular/core';
import { ProjectModel } from '../../models/project/project';
import { AppConfig } from '../../config/config';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';

import { InitialCurrent } from '../../config/initial_current';
import { EmployeeModel } from 'src/app/models/employee/employee';
import { FillterEmpModel } from 'src/app/models/usercontrol/filteremp';
import { EmpMTDocattModel } from 'src/app/models/employee/manage/empMTDocatt';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  public config: AppConfig = new AppConfig();

  private model: ProjectModel = new ProjectModel();
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

  public worker_get(company: string, code: string) {
    var filter = {
      device_name: '',
      ip: "localhost",
      username: this.initial_current.Username,
      company_code: company,
      language: "",
      worker_code: code
    };

    return this.http.get<any>(this.config.ApiEmployeeModule + '/getMTWorkerList?com='+company+'&id=&code=&fname=&lname=&level=&depcod=').toPromise()
      .then((res) => {
        let message = JSON.parse(res);
        return message.data;
      });
  }

  public worker_recordall(model: EmployeeModel) {
    const data = {
      company_code: this.initial_current.CompCode,
      worker_id: model.worker_id,
      worker_code: model.worker_code,
      worker_card: model.worker_code,
      worker_initial: model.worker_initial,
      worker_fname_th: model.worker_fname_th,
      worker_lname_th: model.worker_lname_th,
      worker_fname_en: model.worker_fname_en,
      worker_lname_en: model.worker_lname_en,
      worker_type: model.worker_type,
      worker_gender: model.worker_gender,
      worker_birthdate: model.worker_birthdate,
      worker_hiredate: model.worker_hiredate,
      worker_status: model.worker_status,
      religion_code: model.religion_code,
      blood_code: model.blood_code,
      worker_height: model.worker_height,
      worker_weight: model.worker_weight,
      worker_resigndate: model.worker_resigndate,
      worker_resignstatus: model.worker_resignstatus,
      worker_resignreason: model.worker_resignreason,


      worker_blackliststatus: model.worker_blackliststatus,
      worker_blacklistreason: model.worker_blacklistreason,
      worker_blacklistnote: model.worker_blacklistnote,

      worker_probationdate: model.worker_probationdate,
      worker_probationenddate: model.worker_probationenddate,
      worker_probationday: model.worker_probationday,
      hrs_perday: model.hrs_perday,
      worker_taxmethod: model.worker_taxmethod,
      worker_tel: model.worker_tel,
      worker_email: model.worker_email,
      worker_line: model.worker_line,
      worker_facebook: model.worker_facebook,
      worker_military: model.worker_military,

      nationality_code: model.nationality_code,

      worker_cardno: model.worker_cardno,
      worker_cardnoissuedate: model.worker_cardnoissuedate,
      worker_cardnoexpiredate: model.worker_cardnoexpiredate,

      worker_socialno: model.worker_socialno,
      worker_socialnoissuedate: model.worker_socialnoissuedate,
      worker_socialnoexpiredate: model.worker_socialnoexpiredate,
      worker_socialsentdate: model.worker_socialsentdate,
      worker_socialnotsent: model.worker_socialnotsent,

      worker_emergency_tel : model.worker_emergency_tel,
      worker_emergency_name : model.worker_emergency_name,
      worker_emergency_address : model.worker_emergency_address,

      modified_by: this.initial_current.Username
    };

    return this.http.post<any>(this.config.ApiEmployeeModule + '/worker', data, this.options).toPromise()
      .then((res) => {
        return res;
      });
  }

  public worker_delete(model: EmployeeModel) {
    // console.log('WKR003..');
    const data = {
      worker_id: model.worker_id,
      worker_code: model.worker_code,
      company_code: model.company_code || this.initial_current.CompCode,
      modified_by: this.initial_current.Username
    };

    return this.http.post<any>(this.config.ApiEmployeeModule + '/worker_del', data, this.options).toPromise()
      .then((res) => {
        return res;
      });
  }

  public worker_import(file: File, file_name: string, file_type: string) {

    const formData = new FormData();
    formData.append('file', file);

    var para = "fileName=" + file_name + "." + file_type;
    para += "&token=" + this.initial_current.Token;
    para += "&by=" + this.initial_current.Username;
    para += "&com=" + this.initial_current.CompCode;

    return this.http.post<any>(this.config.ApiEmployeeModule + '/doUploadWorker?' + para, formData).toPromise()
      .then((res) => {
        return res;
      });
  }

  //image
  public doGetImages(com_code: string, worker_code: string) {
    var filter = {
      device_name: '',
      ip: "localhost",
      username: this.initial_current.Username,
      company_code: com_code,
      language: "",
      worker_code: worker_code
    };
    return this.http.post<any>(this.config.ApiEmployeeModule + '/doGetWorkerImages', filter, this.options).toPromise()
      .then((res) => {
        return res;
      });
  }

  uploadImages(file: File, com: string, worker: string) {

    const formData = new FormData();
    formData.append('file', file);

    var para = "ref_to=" + com + "." + worker + "." + this.initial_current.Username;

    return this.http.post<any>(this.config.ApiEmployeeModule + '/doUploadWorkerImages?' + para, formData).toPromise()
      .then((res) => {
        return res;
      });

  }

  public worker_getbyfillter(fillter: FillterEmpModel) {

    const fillterS = {
      device_name: '',
      ip: "localhost",
      username: this.initial_current.Username,
      language: "",

      company_code: this.initial_current.CompCode,
      worker_id: fillter.worker_id,
      worker_code: fillter.worker_code,
      worker_card: fillter.worker_card,
      worker_initial: fillter.worker_initial,
      worker_fname_th: fillter.worker_fname_th,
      worker_lname_th: fillter.worker_lname_th,
      worker_fname_en: fillter.worker_fname_en,
      worker_lname_en: fillter.worker_lname_en,
      worker_emptype: fillter.worker_emptype,
      worker_gender: fillter.worker_gender,
      worker_empstatus: fillter.worker_empstatus,
      worker_blackliststatus: fillter.worker_blackliststatus,

      searchemp: fillter.searchemp,

      worker_resignstatus: fillter.worker_resignstatus,

      level_code: fillter.level_code,
      dep_code: fillter.dep_code,
      position_code: fillter.position_code,
      group_code: fillter.group_code,
      location_code: fillter.location_code,
      date_fill: fillter.date_fill,
      project_code: fillter.project_code,
      project_job: fillter.project_job,

      periodresign : fillter.periodresign,
      fromdate : fillter.fromdate ,
      todate : fillter.todate,

    };

    return this.http.post<any>(this.config.ApiEmployeeModule + '/getMTWorkerFillterList', fillterS, this.options).toPromise()
      .then((res) => {
        let message = JSON.parse(res);
        return message.data;
      });

  }



  ///
  // กราฟสถานที่
  public locationlist_get(company: string, code: string) {
    // console.log(company,code,"TESTTTTT")

    var filter = {
      device_name: '',
      ip: "localhost",
      username: this.initial_current.Username,
      company_code: company,
      language: "",
      worker_code: code
    };

    return this.http.post<any>(this.config.ApiEmployeeModule + '/locationlist', filter, this.options).toPromise()
      .then((res) => {
        let message = JSON.parse(res);
        // // console.log(res)
        return message.data;
      });
  }
  ///
 // กราฟเพศพนักงาน
 public getDashGenderList_get(company: string, code: string) {
  // console.log(company,code,"TESTTTTT")

  var filter = {
    device_name: '',
    ip: "localhost",
    username: this.initial_current.Username,
    company_code: company,
    language: "",
    worker_code: code
  };

  return this.http.post<any>(this.config.ApiEmployeeModule + '/dashGenderlist', filter, this.options).toPromise()
    .then((res) => {
      let message = JSON.parse(res);
      // // console.log(res)
      return message.data;
    });
}

  ///
  // กราฟอายุพนักงานgetDashEmpWorkAgeList
 public getDashEmpWorkAgeList_get(company: string, code: string) {
  var filter = {
    device_name: '',
    ip: "localhost",
    username: this.initial_current.Username,
    company_code: company,
    language: "",
    worker_code: code
  };

  return this.http.post<any>(this.config.ApiEmployeeModule + '/dashempworkagelist', filter, this.options).toPromise()
    .then((res) => {
      let message = JSON.parse(res);
      // // console.log(res)
      return message.data;
    });
}

  ///
   // กราฟอายุงาน
 public getDashWorkAgeList_get(company: string, code: string) {
  var filter = {
    device_name: '',
    ip: "localhost",
    username: this.initial_current.Username,
    company_code: company,
    language: "",
    worker_code: code
  };

  return this.http.post<any>(this.config.ApiEmployeeModule + '/dashworkagelist', filter, this.options).toPromise()
    .then((res) => {
      let message = JSON.parse(res);
       return message.data;
    });
}

  ///
// กราฟตำแหน่งงาน
public getDashPositionList(company: string, code: string) {
  // console.log(company,code,"TESTTTTT")

  var filter = {
    device_name: '',
    ip: "localhost",
    username: this.initial_current.Username,
    company_code: company,
    language: this.initial_current.Language,
    worker_code: code
  };

  return this.http.post<any>(this.config.ApiEmployeeModule + '/dashpositionlist', filter, this.options).toPromise()
    .then((res) => {
      let message = JSON.parse(res);
      // // console.log(res)
      return message.data;
    });
}

  ///

  ///type
  public typelist_get(company: string, code: string) {
    var filter = {
      device_name: '',
      ip: "localhost",
      username: this.initial_current.Username,
      company_code: company,
      language: "",
      worker_code: code
    };

    return this.http.post<any>(this.config.ApiEmployeeModule + '/typelist', filter, this.options).toPromise()
      .then((res) => {
        let message = JSON.parse(res);
        // console.log(res)
        return message.data;
      });
  }

  //attach file
  public file_attach(file: File, file_name: string, file_type: string) {
    const formData = new FormData();
    formData.append('file', file);

    var para = "fileName=" + file_name + "." + file_type;
    para += "&token=" + this.initial_current.Token;
    para += "&by=" + this.initial_current.Username;

    return this.http.post<any>(this.config.ApiEmployeeModule + '/doUploadEmpDocatt?' + para, formData).toPromise()
      .then((res) => {
        let message = JSON.parse(res);
        return message;
      });
  }

  public getemp_filelist(model: EmpMTDocattModel) {
    var filter = {
      device_name: '',
      ip: "localhost",
      username: this.initial_current.Username,
      company_code: model.company_code,
      language: "",
      worker_code: model.worker_code,
      job_type: model.job_type,
    }

    return this.http.post<any>(this.config.ApiEmployeeModule + '/empdoc_list', filter, this.options).toPromise()
      .then((res) => {
        let message = JSON.parse(res);
        return message.data;
      })
  }
  public record_empfile(worker_code: string, list: EmpMTDocattModel[], type: string) {
    var item_data: string = "[";
    for (let i = 0; i < list.length; i++) {
      item_data = item_data + "{";
      item_data = item_data + "\"document_id\":\"" + list[i].document_id + "\"";
      item_data = item_data + ",\"job_type\":\"" + list[i].job_type + "\"";
      item_data = item_data + ",\"document_name\":\"" + list[i].document_name + "\"";
      item_data = item_data + ",\"document_type\":\"" + list[i].document_type + "\"";
      item_data = item_data + ",\"document_path\":\"" + list[i].document_path.replace(/\\/g, '\\\\') + "\"";
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
      modified_by: this.initial_current.Username,
      job_type: type
    };
    return this.http.post<any>(this.config.ApiEmployeeModule + '/empdoc', specificData, this.options).toPromise()
      .then((res) => {
        return res;
      });
  }
  public get_file(file_path: string) {
    var para = "file_path=" + file_path;
    return this.http.post<any>(this.config.ApiEmployeeModule + '/doGetEmpDocatt?' + para, this.options).toPromise()
      .then((res) => {
        return res;
      });
  }
  public deletefilepath_file(file_path: string) {
    var para = "file_path=" + file_path;
    return this.http.post<any>(this.config.ApiEmployeeModule + '/doDeleteEmpDocatt?' + para, this.options).toPromise()
        .then((res) => {
            return JSON.parse(res);
        });
}
public delete_file(file: EmpMTDocattModel) {
    let data = {
        device_name: "phone",
        ip: "127.0.0.1",
        username: this.initial_current.Username,
        company_code: file.company_code || this.initial_current.CompCode,
        jobtable_id: file.document_id,
        job_id: file.job_id,
    }
    return this.http.post<any>(this.config.ApiEmployeeModule + '/empdoc_del', data, this.options).toPromise()
        .then((res) => {
            let message = JSON.parse(res);
            return message;
        });
}
}

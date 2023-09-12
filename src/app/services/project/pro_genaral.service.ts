import { Injectable } from '@angular/core';
import { AppConfig } from '../../config/config';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

import { InitialCurrent } from '../../config/initial_current';
import { ProbusinessModel, ProtypeModel, ProslipModel, ProuniformModel } from '../../models/project/policy/pro_genaral';
import { ProareaModel } from 'src/app/models/project/project_proarea';
import { ProgroupModel } from 'src/app/models/project/project_group';


@Injectable({
  providedIn: 'root'
})
export class ProgenaralService {

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

  public probusiness_get(model:ProbusinessModel) {
    let data = {
       device_name: "phone",
       ip: "127.0.0.1",
       username: this.initial_current.Username,
       company_code:  this.initial_current.CompCode,
       probusiness_id: model.probusiness_id,
       probusiness_code: model.probusiness_code
   }
   return this.http.post<any>(this.config.ApiProjectModule + '/probusiness_list', data, this.options).toPromise()
       .then((res) => {
           let message = JSON.parse(res);
           return message.data;
       });
}
  // public probusiness_get() {
  //   return this.http.post<any>(this.config.ApiProjectModule + '/probusiness_list', this.basicRequest, this.options).toPromise()
  //     .then((res) => {
  //       let message = JSON.parse(res);

  //       return message.data;
  //     });
  // }

  public probusiness_record(model: ProbusinessModel) {
    const data = {
      company_code: model.company_code || this.initial_current.CompCode,

      probusiness_id: model.probusiness_id,
      probusiness_code: model.probusiness_code,
      probusiness_name_th: model.probusiness_name_th,
      probusiness_name_en: model.probusiness_name_en,
      modified_by: this.initial_current.Username
    };

    return this.http.post<any>(this.config.ApiProjectModule + '/probusiness', data, this.options).toPromise()
      .then((res) => {
        return res;
      });
  }

  public probusiness_delete(model: ProbusinessModel) {
    const data = {
      company_code: model.company_code || this.initial_current.CompCode,

      probusiness_id: model.probusiness_id,
      probusiness_code: model.probusiness_code,
      modified_by: this.initial_current.Username
    };

    return this.http.post<any>(this.config.ApiProjectModule + '/probusiness_del', data, this.options).toPromise()
      .then((res) => {
        return res;
      });
  }


  public probusiness_import(file: File, file_name: string, file_type: string) {
    const formData = new FormData();
    formData.append('file', file);
    var para = "fileName=" + file_name + "." + file_type;
    para += "&token=" + this.initial_current.Token;
    para += "&by=" + this.initial_current.Username;

    return this.http.post<any>(this.config.ApiProjectModule + '/doUploadMTProbusiness?' + para, formData).toPromise()
      .then((res) => {
        return res;
      });
  }

  //--
  public protype_get(model:ProtypeModel) {
    let data = {
       device_name: "phone",
       ip: "127.0.0.1",
       username: this.initial_current.Username,
       company_code:  this.initial_current.CompCode,
       protype_id: model.protype_id,
       protype_code: model.protype_code
   }
   return this.http.post<any>(this.config.ApiProjectModule + '/protype_list', data, this.options).toPromise()
       .then((res) => {
           let message = JSON.parse(res);
           return message.data;
       });
}
  // public protype_get() {
  //   return this.http.post<any>(this.config.ApiProjectModule + '/protype_list', this.basicRequest, this.options).toPromise()
  //     .then((res) => {
  //       let message = JSON.parse(res);

  //       return message.data;
  //     });
  // }

  public protype_record(model: ProtypeModel) {
    const data = {
      company_code: model.company_code || this.initial_current.CompCode,

      protype_id: model.protype_id,
      protype_code: model.protype_code,
      protype_name_th: model.protype_name_th,
      protype_name_en: model.protype_name_en,
      modified_by: this.initial_current.Username
    };

    return this.http.post<any>(this.config.ApiProjectModule + '/protype', data, this.options).toPromise()
      .then((res) => {
        return res;
      });
  }

  public protype_delete(model: ProtypeModel) {
    const data = {
      company_code: model.company_code || this.initial_current.CompCode,

      protype_id: model.protype_id,
      protype_code: model.protype_code,
      modified_by: this.initial_current.Username
    };

    return this.http.post<any>(this.config.ApiProjectModule + '/protype_del', data, this.options).toPromise()
      .then((res) => {
        return res;
      });
  }


  public protype_import(file: File, file_name: string, file_type: string) {
    const formData = new FormData();
    formData.append('file', file);
    var para = "fileName=" + file_name + "." + file_type;
    para += "&token=" + this.initial_current.Token;
    para += "&by=" + this.initial_current.Username;

    return this.http.post<any>(this.config.ApiProjectModule + '/doUploadMTProtype?' + para, formData).toPromise()
      .then((res) => {
        return res;
      });
  }

  //--
  public prouniform_get(model:ProuniformModel) {
    let data = {
       device_name: "phone",
       ip: "127.0.0.1",
       username: this.initial_current.Username,
       company_code:  this.initial_current.CompCode,
       prouniform_id: model.prouniform_id,
       prouniform_code: model.prouniform_code
   }
   return this.http.post<any>(this.config.ApiProjectModule + '/prouniform_list', data, this.options).toPromise()
       .then((res) => {
           let message = JSON.parse(res);
           return message.data;
       });
}

  // public prouniform_get() {
  //   return this.http.post<any>(this.config.ApiProjectModule + '/prouniform_list', this.basicRequest, this.options).toPromise()
  //     .then((res) => {
  //       let message = JSON.parse(res);

  //       return message.data;
  //     });
  // }

  public prouniform_record(model: ProuniformModel) {
    const data = {
      company_code: model.company_code || this.initial_current.CompCode,

      prouniform_id: model.prouniform_id,
      prouniform_code: model.prouniform_code,
      prouniform_name_th: model.prouniform_name_th,
      prouniform_name_en: model.prouniform_name_en,
      modified_by: this.initial_current.Username
    };

    return this.http.post<any>(this.config.ApiProjectModule + '/prouniform', data, this.options).toPromise()
      .then((res) => {
        return res;
      });
  }

  public prouniform_delete(model: ProuniformModel) {
    const data = {
      company_code: model.company_code || this.initial_current.CompCode,

      prouniform_id: model.prouniform_id,
      prouniform_code: model.prouniform_code,
      modified_by: this.initial_current.Username
    };

    return this.http.post<any>(this.config.ApiProjectModule + '/prouniform_del', data, this.options).toPromise()
      .then((res) => {
        return res;
      });
  }


  public prouniform_import(file: File, file_name: string, file_type: string) {
    const formData = new FormData();
    formData.append('file', file);
    var para = "fileName=" + file_name + "." + file_type;
    para += "&token=" + this.initial_current.Token;
    para += "&by=" + this.initial_current.Username;

    return this.http.post<any>(this.config.ApiProjectModule + '/doUploadMTProuniform?' + para, formData).toPromise()
      .then((res) => {
        return res;
      });
  }

  //--
  public proslip_get(model:ProslipModel) {
    let data = {
       device_name: "phone",
       ip: "127.0.0.1",
       username: this.initial_current.Username,
       company_code:  this.initial_current.CompCode,
       proslip_id: model.proslip_id,
       proslip_code: model.proslip_code
   }
   return this.http.post<any>(this.config.ApiProjectModule + '/proslip_list', data, this.options).toPromise()
       .then((res) => {
           let message = JSON.parse(res);
           return message.data;
       });
}

  // public proslip_get() {
  //   return this.http.post<any>(this.config.ApiProjectModule + '/proslip_list', this.basicRequest, this.options).toPromise()
  //     .then((res) => {
  //       let message = JSON.parse(res);

  //       return message.data;
  //     });
  // }

  public proslip_record(model: ProslipModel) {
    const data = {
      company_code: model.company_code || this.initial_current.CompCode,

      proslip_id: model.proslip_id,
      proslip_code: model.proslip_code,
      proslip_name_th: model.proslip_name_th,
      proslip_name_en: model.proslip_name_en,
      modified_by: this.initial_current.Username
    };

    return this.http.post<any>(this.config.ApiProjectModule + '/proslip', data, this.options).toPromise()
      .then((res) => {
        return res;
      });
  }

  public proslip_delete(model: ProslipModel) {
    const data = {
      company_code: model.company_code || this.initial_current.CompCode,

      proslip_id: model.proslip_id,
      proslip_code: model.proslip_code,
      modified_by: this.initial_current.Username
    };

    return this.http.post<any>(this.config.ApiProjectModule + '/proslip_del', data, this.options).toPromise()
      .then((res) => {
        return res;
      });
  }


  public proslip_import(file: File, file_name: string, file_type: string) {
    const formData = new FormData();
    formData.append('file', file);
    var para = "fileName=" + file_name + "." + file_type;
    para += "&token=" + this.initial_current.Token;
    para += "&by=" + this.initial_current.Username;

    return this.http.post<any>(this.config.ApiProjectModule + '/doUploadMTProslip?' + para, formData).toPromise()
      .then((res) => {
        return res;
      });
  }

  //-- proarea
  public proarea_get(model:ProareaModel) {
    let data = {
       device_name: "phone",
       ip: "127.0.0.1",
       username: this.initial_current.Username,
       company_code:  this.initial_current.CompCode,
       proarea_id: model.proarea_id,
       proarea_code: model.proarea_code
   }
   return this.http.post<any>(this.config.ApiProjectModule + '/proarea_list', data, this.options).toPromise()
       .then((res) => {
           let message = JSON.parse(res);
           return message.data;
       });
}

  // public proarea_get() {
  //   return this.http.post<any>(this.config.ApiProjectModule + '/proarea_list', this.basicRequest, this.options).toPromise()
  //     .then((res) => {
  //       let message = JSON.parse(res);

  //       return message.data;
  //     });
  // }

  public proarea_record(model: ProareaModel) {
    const data = {
      company_code: model.company_code || this.initial_current.CompCode,

      proarea_id: model.proarea_id,
      proarea_code: model.proarea_code,
      proarea_name_th: model.proarea_name_th,
      proarea_name_en: model.proarea_name_en,
      modified_by: this.initial_current.Username
    };

    return this.http.post<any>(this.config.ApiProjectModule + '/proarea', data, this.options).toPromise()
      .then((res) => {
        return res;
      });
  }

  public proarea_delete(model: ProareaModel) {
    const data = {
      company_code: model.company_code || this.initial_current.CompCode,

      proarea_id: model.proarea_id,
      proarea_code: model.proarea_code,
      modified_by: this.initial_current.Username
    };

    return this.http.post<any>(this.config.ApiProjectModule + '/proarea_del', data, this.options).toPromise()
      .then((res) => {
        return res;
      });
  }


  public proarea_import(file: File, file_name: string, file_type: string) {
    const formData = new FormData();
    formData.append('file', file);
    var para = "fileName=" + file_name + "." + file_type;
    para += "&token=" + this.initial_current.Token;
    para += "&by=" + this.initial_current.Username;

    return this.http.post<any>(this.config.ApiProjectModule + '/doUploadMTProarea?' + para, formData).toPromise()
      .then((res) => {
        return res;
      });
  }

  //-- Group 
  public progroup_get(model:ProgroupModel) {
    let data = {
       device_name: "phone",
       ip: "127.0.0.1",
       username: this.initial_current.Username,
       company_code:  this.initial_current.CompCode,
       progroup_id: model.progroup_id,
       progroup_code: model.progroup_code
   }
   return this.http.post<any>(this.config.ApiProjectModule + '/progroup_list', data, this.options).toPromise()
       .then((res) => {
           let message = JSON.parse(res);
           return message.data;
       });
}
  // public progroup_get() {
  //   return this.http.post<any>(this.config.ApiProjectModule + '/progroup_list', this.basicRequest, this.options).toPromise()
  //     .then((res) => {
  //       let message = JSON.parse(res);

  //       return message.data;
  //     });
  // }

  public progroup_record(model: ProgroupModel) {
    const data = {
      company_code: model.company_code || this.initial_current.CompCode,

      progroup_id: model.progroup_id,
      progroup_code: model.progroup_code,
      progroup_name_th: model.progroup_name_th,
      progroup_name_en: model.progroup_name_en,
      modified_by: this.initial_current.Username
    };

    return this.http.post<any>(this.config.ApiProjectModule + '/progroup', data, this.options).toPromise()
      .then((res) => {
        return res;
      });
  }

  public progroup_delete(model: ProgroupModel) {
    const data = {
      company_code: model.company_code || this.initial_current.CompCode,

      progroup_id: model.progroup_id,
      progroup_code: model.progroup_code,
      modified_by: this.initial_current.Username
    };

    return this.http.post<any>(this.config.ApiProjectModule + '/progroup_del', data, this.options).toPromise()
      .then((res) => {
        return res;
      });
  }


  public progroup_import(file: File, file_name: string, file_type: string) {
    const formData = new FormData();
    formData.append('file', file);
    var para = "fileName=" + file_name + "." + file_type;
    para += "&token=" + this.initial_current.Token;
    para += "&by=" + this.initial_current.Username;

    return this.http.post<any>(this.config.ApiProjectModule + '/doUploadMTProgroup?' + para, formData).toPromise()
      .then((res) => {
        return res;
      });
  }


}

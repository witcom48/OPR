import { Injectable } from '@angular/core';
import { PrjectModel } from '../../models/project/project';
import { AppConfig } from '../../config/config';
import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { Router } from '@angular/router';

import { InitialCurrent } from '../../config/initial_current';
import { EmployeeModel } from 'src/app/models/employee/employee';
import { CompanyModel } from 'src/app/models/system/company';


@Injectable({
  providedIn: 'root'
})
export class CompanyService {
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

  public company_get(code:string){
    console.log('CPN001..');

    var filter = {
      device_name:'',
      ip:"localhost",
      username:this.initial_current.Username,
      company_code:code,
      language:"",
    //   company_code:code
    };

    return this.http.post<any>(this.config.ApiSystemModule + '/company_list', filter, this.options).toPromise()
    .then((res) => {
      let message = JSON.parse(res);
      console.log(res)
      return message.data;
    });
  }

  public company_recordall(model:CompanyModel) {
    console.log('CPN002..');
    const data = {
        // company_code: this.initial_current.CompCode,

        company_id: model.company_id,
        company_code: model.company_code,

        company_initials: model.company_initials,
        company_name_th: model.company_name_th,
        company_name_en: model.company_name_en,
        hrs_perday: model.hrs_perday,
        sso_com_rate: model.sso_com_rate,
        sso_emp_rate: model.sso_emp_rate,
        sso_min_wage: model.sso_min_wage,
        sso_max_wage: model.sso_max_wage,
        sso_min_age: model.sso_min_age,
        sso_max_age: model.sso_max_age,
        modified_by: this.initial_current.Username,
    };

    return this.http.post<any>(this.config.ApiSystemModule + '/company', data, this.options).toPromise()
    .then((res) => {
      return res;
    });
  }

  public company_delete(model:CompanyModel) {
    console.log('CPN003..');
    const data = {
        company_id: model.company_id,
        company_code: model.company_code,
      modified_by: this.initial_current.Username
    };

    return this.http.post<any>(this.config.ApiSystemModule + '/company_del', data, this.options).toPromise()
    .then((res) => {
      return res;
    });
  }

  public company_import(file: File, file_name:string, file_type:string){

    const formData = new FormData();
    formData.append('file', file);

      var para = "fileName=" + file_name + "." + file_type;
      para += "&token=" + this.initial_current.Token;
      para += "&by=" + this.initial_current.Username;
    return this.http.post<any>(this.config.ApiSystemModule + '/doUploadCompany?' + para, formData).toPromise()
    .then((res) => {
      return res;
    });
  }
}

// import { Injectable } from '@angular/core';
// import { PrjectModel } from '../../models/project/project';
// import { AppConfig } from '../../config/config';
// import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { Router } from '@angular/router';
// import { InitialCurrent } from '../../config/initial_current';
// import { CompanyModel } from 'src/app/models/system/company';

// @Injectable({
//   providedIn: 'root'
// })
// export class CompanyService {
//     public config: AppConfig = new AppConfig();

//     private model: PrjectModel = new PrjectModel();
//     public initial_current: InitialCurrent = new InitialCurrent();

//     httpHeaders = new HttpHeaders({});
//     options = {
//         headers: this.httpHeaders,
//     };

//     basicRequest = {
//         device_name: '',
//         ip: '',
//         username: '',
//     };

//     constructor(private http: HttpClient, private router: Router) {
//         this.doGetInitialCurrent();
//     }

//     doGetInitialCurrent() {
//         this.initial_current = JSON.parse(
//             localStorage.getItem(AppConfig.SESSIONInitial) || '{}'
//         );
//         if (this.initial_current) {
//             this.httpHeaders = new HttpHeaders({
//                 'Content-Type': 'application/json; charset=utf-8',
//                 Accept: 'application/json',
//                 'Cache-Control': 'no-cache',
//                 Authorization: this.initial_current.Token,
//             });

//             this.options = {
//                 headers: this.httpHeaders,
//             };

//             this.basicRequest = {
//                 device_name: '',
//                 ip: 'localhost',
//                 username: this.initial_current.Username,
//             };
//         } else {
//             this.router.navigateByUrl('login');
//         }
//     }

//     public company_get() {
//         console.log('CPN001..');

//         return this.http
//             .post<any>(
//                 this.config.ApiSystemModule + '/company_list',
//                 this.basicRequest,
//                 this.options
//             )
//             .toPromise()
//             .then((res) => {
//                 let message = JSON.parse(res);
//                 console.log(res);
//                 return message.data;
//             });
//     }

//     public company_record(model: CompanyModel) {
//         console.log('CPN002..');
//         const data = {
//             company_id: model.company_id,
//             company_code: model.company_code,
//             company_initials: model.company_initials,
//             company_name_th: model.company_name_th,
//             company_name_en: model.company_name_en,
//             hrs_perday: model.hrs_perday,
//             sso_com_rate: model.sso_com_rate,
//             sso_emp_rate: model.sso_emp_rate,
//             sso_min_wage: model.sso_min_wage,
//             sso_max_wage: model.sso_max_wage,
//             sso_min_age: model.sso_min_age,
//             sso_max_age: model.sso_max_age,


//             modified_by: this.initial_current.Username,
//         };

//         return this.http
//             .post<any>(
//                 this.config.ApiSystemModule + '/company',
//                 data,
//                 this.options
//             )
//             .toPromise()
//             .then((res) => {
//                 //console.log(res)
//                 return res;
//             });
//     }

//     public company_delete(model: CompanyModel) {
//         console.log('CPN002..');
//         const data = {
//             company_id: model.company_id,
//             company_code: model.company_code,
//             modified_by: this.initial_current.Username,
//         };

//         return this.http
//             .post<any>(
//                 this.config.ApiSystemModule + '/company_del',
//                 data,
//                 this.options
//             )
//             .toPromise()
//             .then((res) => {
//                 return res;
//             });
//     }

//     public company_import(file: File, file_name: string, file_type: string) {
//         const formData = new FormData();
//         formData.append('file', file);

//         var para = 'fileName=' + file_name + '.' + file_type;
//         para += '&token=' + this.initial_current.Token;
//         para += '&by=' + this.initial_current.Username;

//         return this.http
//             .post<any>(
//                 this.config.ApiSystemModule + '/doUploadCompany?' + para,
//                 formData
//             )
//             .toPromise()
//             .then((res) => {
//                 return res;
//             });
//     }
// }

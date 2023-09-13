import { Injectable } from '@angular/core';
import { ProjectModel } from '../../../models/project/project';
import { AppConfig } from '../../../config/config';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { InitialCurrent } from '../../../config/initial_current';
import { QualificationModel } from 'src/app/models/system/policy/qualification';
@Injectable({
  providedIn: 'root'
})
export class QualificationService {
    public config:AppConfig = new AppConfig();

    private model:ProjectModel = new ProjectModel();
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
    public qualification_get(model:QualificationModel) {
      let data = {
         device_name: "phone",
         ip: "127.0.0.1",
         username: this.initial_current.Username,
         company_code:  this.initial_current.CompCode,
         qualification_id: model.qualification_id,
         qualification_code: model.qualification_code
     }
     return this.http.post<any>(this.config.ApiSystemModule + '/qualification_list', data, this.options).toPromise()
         .then((res) => {
             let message = JSON.parse(res);
             return message.data;
         });
  }
    // public qualification_get(){
    //   // console.log('QUA001..');

    //   return this.http.post<any>(this.config.ApiSystemModule + '/qualification_list', this.basicRequest, this.options).toPromise()
    //   .then((res) => {
    //     let message = JSON.parse(res);
    //     // console.log(res)
    //     return message.data;
    //   });
    // }

    public qualification_record(model:QualificationModel) {
      // console.log('QUA002..');
      const data = {
        company_code: model.company_code || this.initial_current.CompCode,

        qualification_id: model.qualification_id,
        qualification_code: model.qualification_code,
        qualification_name_th: model.qualification_name_th,
        qualification_name_en: model.qualification_name_en,
        modified_by: this.initial_current.Username
      };

      return this.http.post<any>(this.config.ApiSystemModule + '/qualification', data, this.options).toPromise()
      .then((res) => {

        // console.log(res)
        return res;
      });
    }

    public qualification_delete(model:QualificationModel) {
      // console.log('QUA003..');
      const data = {
        company_code: model.company_code || this.initial_current.CompCode,

        qualification_id: model.qualification_id,
        qualification_code: model.qualification_code,
        modified_by: this.initial_current.Username
      };

      return this.http.post<any>(this.config.ApiSystemModule + '/qualification_del', data, this.options).toPromise()
      .then((res) => {
        return res;
      });
    }


    public qualification_import(file: File, file_name:string, file_type:string){

      const formData = new FormData();
      formData.append('file', file);

        var para = "fileName=" + file_name + "." + file_type;
        para += "&token=" + this.initial_current.Token;
        para += "&by=" + this.initial_current.Username;

      return this.http.post<any>(this.config.ApiSystemModule + '/doUploadQualification?' + para, formData).toPromise()
      .then((res) => {
        return res;
      });


    }




  }

//     public config: AppConfig = new AppConfig();

//     private model: ProjectModel = new ProjectModel();
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

//     public qualification_get() {
//         // console.log('QUAR001..');

//         return this.http
//             .post<any>(
//                 this.config.ApiSystemModule + '/qualification_list',
//                 this.basicRequest,
//                 this.options
//             )
//             .toPromise()
//             .then((res) => {
//                 let message = JSON.parse(res);
//                 // console.log(res);
//                 return message.data;
//             });
//     }

//     public  qualification_record(model: QualificationModel) {
//         // console.log('QUAR002..');
//         const data = {
//             qualification_id:model.qualification_id,
//       qualification_code:model.qualification_code,
//       qualification_name_th:model.qualification_name_th,
//       qualification_name_en:model.qualification_name_en,
//       company_code:model.company_code,
//             modified_by: this.initial_current.Username,
//         };

//         return this.http
//             .post<any>(
//                 this.config.ApiSystemModule + '/qualification',
//                 data,
//                 this.options
//             )
//             .toPromise()
//             .then((res) => {
//                 // console.log(res);
//                 return res;
//             });
//     }

//     public qualification_delete(model: QualificationModel) {
//         // console.log('QUAR003..');
//         const data = {
//             qualification_id: model.qualification_id,
//             company_code: model.company_code,
//             modified_by: this.initial_current.Username,
//         };

//         return this.http
//             .post<any>(
//                 this.config.ApiSystemModule + '/qualification_del',
//                 data,
//                 this.options
//             )
//             .toPromise()
//             .then((res) => {
//                 return res;
//             });
//     }

//     public qualification_import(file: File, file_name: string, file_type: string) {
//         const formData = new FormData();
//         formData.append('file', file);

//         var para = 'fileName=' + file_name + '.' + file_type;
//         para += '&token=' + this.initial_current.Token;
//         para += '&by=' + this.initial_current.Username;

//         return this.http
//             .post<any>(
//                 this.config.ApiSystemModule + '/doUploadQualification?' + para,
//                 formData
//             )
//             .toPromise()
//             .then((res) => {
//                 return res;
//             });
//     }
// }

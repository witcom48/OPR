import { Injectable } from '@angular/core';
import { ProjectModel } from '../../../models/project/project';
import { AppConfig } from '../../../config/config';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { InitialCurrent } from '../../../config/initial_current';
import { CardtypeModel } from 'src/app/models/system/policy/cardtype';
import { CourseModel } from 'src/app/models/system/policy/course';
@Injectable({
    providedIn: 'root',
})
export class CourseService {
    
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

    public course_get(){
      // console.log('COURSE001..');

      return this.http.post<any>(this.config.ApiSystemModule + '/course_list', this.basicRequest, this.options).toPromise()
      .then((res) => {
        let message = JSON.parse(res);
        // console.log(res)
        return message.data;
      });
    }

    public course_record(model:CourseModel) {
      // console.log('COURSE002..');
      const data = {
        course_id: model.course_id,
        course_code: model.course_code,
        course_name_th: model.course_name_th,
        course_name_en: model.course_name_en,
        modified_by: this.initial_current.Username
      };

      return this.http.post<any>(this.config.ApiSystemModule + '/course', data, this.options).toPromise()
      .then((res) => {

        // console.log(res)
        return res;
      });
    }

    public course_delete(model:CourseModel) {
      // console.log('COURSE00..');
      const data = {
        course_id: model.course_id,
        course_code: model.course_code,
        modified_by: this.initial_current.Username
      };

      return this.http.post<any>(this.config.ApiSystemModule + '/course_del', data, this.options).toPromise()
      .then((res) => {
        return res;
      });
    }


    public course_import(file: File, file_name:string, file_type:string){

      const formData = new FormData();
      formData.append('file', file);

        var para = "fileName=" + file_name + "." + file_type;
        para += "&token=" + this.initial_current.Token;
        para += "&by=" + this.initial_current.Username;

      return this.http.post<any>(this.config.ApiSystemModule + '/doUploadCourse?' + para, formData).toPromise()
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

//     public course_get(code: string) {
//         // console.log('COURSE001..');

//         var filter = {
//             device_name: '',
//             ip: 'localhost',
//             username: this.initial_current.Username,
//             company_code: '',
//             course_id: '',
//             course_code: code ,
//             // company_id: '',
//             // language: '',
//         };

//         return this.http
//             .post<any>(
//                 this.config.ApiSystemModule + '/course_list',
//                 filter,
//                 this.options
//             )
//             .toPromise()
//             .then((res) => {
//                 let message = JSON.parse(res);
//                 // console.log(res);
//                 return message.data;
//             });
//     }

//     public course_recordall(model: CourseModel) {
//         // console.log('COURSE002..');
//         const data = {
//             // company_code: this.initial_current.CompCode,

//             course_id: model.course_id,
//             course_code: model.course_code,
//             course_name_th: model.course_name_th,
//             course_name_en: model.course_name_en,
//             company_code: model.company_code,
//             // company_code : this.initial_current.CompCode,
//             modified_by: this.initial_current.Username,
//         };

//         return this.http
//             .post<any>(
//                 this.config.ApiSystemModule + '/course',
//                 data,
//                 this.options
//             )
//             .toPromise()
//             .then((res) => {
//                 return res;
//             });
//     }

//     public course_delete(model: CourseModel) {
//         // console.log('COURSE003..');
//         const data = {
//             course_id: model.course_id,
//             ourse_code: model.course_code,
//             company_code: model.company_code,
            
//             modified_by: this.initial_current.Username,
//         };

//         return this.http
//             .post<any>(
//                 this.config.ApiSystemModule + '/course_del',
//                 data,
//                 this.options
//             )
//             .toPromise()
//             .then((res) => {
//                 return res;
//             });
//     }

//     public course_import(file: File, file_name: string, file_type: string) {
//         const formData = new FormData();
//         formData.append('file', file);

//         var para = 'fileName=' + file_name + '.' + file_type;
//         para += '&token=' + this.initial_current.Token;
//         para += '&by=' + this.initial_current.Username;
//         return this.http
//             .post<any>(
//                 this.config.ApiSystemModule + '/doUploadCourse?' + para,
//                 formData
//             )
//             .toPromise()
//             .then((res) => {
//                 return res;
//             });
//     }
// }





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
//     // getMTCourseList
//     public course_get() {
//         // console.log('COURSE001..');

//         return this.http
//             .post<any>(
//                 this.config.ApiSystemModule + '/course_list',
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

//     public course_record(model: CourseModel) {
//         // console.log('COURSE002..');
//         const data = {
//             course_id: model.course_id,
//             course_code: model.course_code,
//             course_name_th: model.course_name_th,
//             course_name_en: model.course_name_en,
//             company_code: model.company_code,
//             // company_code : this.initial_current.CompCode,
//             modified_by: this.initial_current.Username,
//         };

//         return this.http
//             .post<any>(
//                 this.config.ApiSystemModule + '/course',
//                 data,
//                 this.options
//             )
//             .toPromise()
//             .then((res) => {
//                 // console.log(res);
//                 return res;
//             });
//     }

//     public course_delete(model: CourseModel) {
//         // console.log('COURSE003..');
//         const data = {
//             course_id: model.course_id,
//             company_code: model.company_code,
//             modified_by: this.initial_current.Username,
//         };

//         return this.http
//             .post<any>(
//                 this.config.ApiSystemModule + '/course_del',
//                 data,
//                 this.options
//             )
//             .toPromise()
//             .then((res) => {
//                 return res;
//             });
//     }

//     public course_import(file: File, file_name: string, file_type: string) {
//         const formData = new FormData();
//         formData.append('file', file);

//         var para = 'fileName=' + file_name + '.' + file_type;
//         para += '&token=' + this.initial_current.Token;
//         para += '&by=' + this.initial_current.Username;

//         return this.http
//             .post<any>(
//                 this.config.ApiSystemModule + '/doUploadCourse?' + para,
//                 formData
//             )
//             .toPromise()
//             .then((res) => {
//                 return res;
//             });
//     }
// }

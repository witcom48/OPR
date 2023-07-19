import { Injectable } from '@angular/core';
import { ProjectModel } from '../../../models/project/project';
import { AppConfig } from '../../../config/config';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { InitialCurrent } from '../../../config/initial_current';
import { CodestructureModel } from 'src/app/models/system/policy/codestructure';
import { TRPolcodeModel } from 'src/app/models/system/policy/tr_polcode';

@Injectable({
  providedIn: 'root'
})
export class CodePolcodeService {
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

    public TRPolcode_get(){
      // console.log('CBR001..');

      var filter = {
        device_name:'',
        ip:"localhost",
        username:this.initial_current.Username,
        language:"",
        polcode_id:"",

      };

      return this.http.post<any>(this.config.ApiSystemModule + '/TRPolcode_list', this.basicRequest, this.options).toPromise()
      .then((res) => {
        let message = JSON.parse(res);
        // console.log(res)
        return message.data;
      });
    }

    public TRPolcode_record(model:TRPolcodeModel) {
      // console.log('CBR002..');
      const data = {
        polcode_id: model.polcode_id,
        codestructure_code: model.codestructure_code,
        polcode_lenght: model.polcode_lenght,
        polcode_text: model.polcode_text,
        polcode_order: model.polcode_order,

        modified_by: this.initial_current.Username
      };
      return this.http.post<any>(this.config.ApiSystemModule + '/TRPolcode', data, this.options).toPromise()
      .then((res) => {

        // console.log(res)
        return res;
      });
    }

    public TRPolcode_delete(model:TRPolcodeModel) {
      // console.log('CBR003..');
      const data = {
        codestructure_code: model.codestructure_code,
        polcode_id: model.polcode_id,
        modified_by: this.initial_current.Username
      };

      return this.http.post<any>(this.config.ApiSystemModule + '/TRPolcode_del', data, this.options).toPromise()
      .then((res) => {
        return res;
      });
    }


    public TRPolcode_import(file: File, file_name:string, file_type:string){

      const formData = new FormData();
      formData.append('file', file);

        var para = "fileName=" + file_name + "." + file_type;
        para += "&token=" + this.initial_current.Token;
        para += "&by=" + this.initial_current.Username;

      return this.http.post<any>(this.config.ApiSystemModule + '/doUploadTRPolcode?' + para, formData).toPromise()
      .then((res) => {
        return res;
      });


    }

}

//     public config:AppConfig = new AppConfig();
//     public initial_current:InitialCurrent = new InitialCurrent();

//     httpHeaders = new HttpHeaders({});
//     options = {
//       headers: this.httpHeaders
//     };

//     basicRequest = {
//       device_name:'',
//       ip:'',
//       username:''
//     };

//     constructor(private http:HttpClient, private router: Router,private datePipe: DatePipe) {
//       this.doGetInitialCurrent();
//      }

//      doGetInitialCurrent(){
//       this.initial_current = JSON.parse(localStorage.getItem(AppConfig.SESSIONInitial) || '{}');
//       if (this.initial_current) {
//         this.httpHeaders = new HttpHeaders({
//           'Content-Type': 'application/json; charset=utf-8',
//           'Accept': 'application/json',
//           'Cache-Control': 'no-cache',
//           'Authorization': this.initial_current.Token
//         });

//         this.options = {
//           headers: this.httpHeaders
//         };

//         this.basicRequest = {
//           device_name:'',
//           ip:"localhost",
//           username:this.initial_current.Username
//         };

//       }
//       else{
//         this.router.navigateByUrl('login');
//       }
//     }

//     //TRPolcode
//     public getTRPolcode_TRPolcode( code:string){
//         // console.log('CBR001..');

//         var filter = {
//             device_name:'',
//             ip:"localhost",
//             username:this.initial_current.Username,
//             language:"",
//             polcode_id:"",
//           };

//       return this.http.post<any>(this.config.ApiSystemModule + '/TRPolcode_list', filter, this.options).toPromise()
//       .then((res) => {
//         let message = JSON.parse(res);
//         // console.log(res)
//         return message.data;
//       });
//     }
//     public record_TRPolcode( combranch_code :string, list:TRPolcodeModel[]){
//         // console.log('CBR002..');

//       var item_data:string = "[";
//       for (let i = 0; i < list.length; i++) {
//         item_data = item_data + "{";
//         item_data = item_data + "\"polcode_id\":\"" + list[i].polcode_id + "\"";
//         item_data = item_data + ",\"codestructure_code\":\"" + list[i].codestructure_code + "\"";
//         item_data = item_data + ",\"polcode_lenght\":\"" + list[i].polcode_lenght + "\"";
//         item_data = item_data + ",\"polcode_text\":\"" + list[i].polcode_text + "\"";
//         item_data = item_data + ",\"polcode_order\":\"" + list[i].polcode_order + "\"";
//         // item_data = item_data + ",\"company_code\":\"" + this.initial_current.CompCode + "\"";
//         item_data = item_data + "}" + ",";
//       }
//       if(item_data.length > 2)
//       {
//         item_data = item_data.substr(0, item_data.length - 1);
//       }
//       item_data = item_data + "]";
//       // console.log(item_data);

//       var specificData = {
//         transaction_data:item_data,
//         company_code:this.initial_current.CompCode,
//         // combranch_code:combranch_code,
//         modified_by:this.initial_current.Username
//       };


//       return this.http.post<any>(this.config.ApiSystemModule + '/TRPolcode', specificData, this.options).toPromise()
//       .then((res) => {
//         return res;
//       });
//     }
//     public delete_TRPolcode(model:TRPolcodeModel){
//         // console.log('CBR003..');

//       const data = {
//         polcode_id: model.polcode_id,
//         codestructure_code:model.codestructure_code,
//         modified_by: this.initial_current.Username
//       };

//       return this.http.post<any>(this.config.ApiSystemModule + '/TRPolcode_del', data, this.options).toPromise()
//       .then((res) => {
//         return res;
//       });
//     }
//     public TRPolcode_import(file: File, file_name:string, file_type:string){
//         // console.log('CBR004..');

//       const formData = new FormData();
//       formData.append('file', file);

//         var para = "fileName=" + file_name + "." + file_type;
//         para += "&token=" + this.initial_current.Token;
//         para += "&by=" + this.initial_current.Username;

//       return this.http.post<any>(this.config.ApiSystemModule + '/doUploadTRPolcode?' + para, formData).toPromise()
//       .then((res) => {
//         return res;
//       });
//     }
//   }

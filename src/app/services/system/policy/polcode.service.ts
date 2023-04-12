import { Injectable } from '@angular/core';
import { ProjectModel } from '../../../models/project/project';
import { AppConfig } from '../../../config/config';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { InitialCurrent } from '../../../config/initial_current';
import { MajorModel } from 'src/app/models/system/policy/major';
import { MTPolcodeModel } from 'src/app/models/system/mt_polcode';
import { RequestOptions } from '@angular/http';
import { TRPolcodeModel } from 'src/app/models/system/policy/tr_polcode';
@Injectable({
  providedIn: 'root'
})
export class PolcodeService {
    public config: AppConfig = new AppConfig();
    public initial_current: InitialCurrent = new InitialCurrent();

    httpHeaders = new HttpHeaders({});
    options = {
        headers: this.httpHeaders
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
        }
        else {
            this.router.navigateByUrl('login');
        }
    }

    public polcode_get(polcode: TRPolcodeModel) {
        console.log('ROUND001..');
        let data = {
            device_name: "Desktop",
            ip: "127.0.0.1",
            username: this.initial_current.Username,

            // company_code: polcode.company_code || this.initial_current.CompCode,
            polcode_id: polcode.polcode_id,
            codestructure_code: polcode.codestructure_code,

            polcode_lenght: polcode.polcode_lenght,
            polcode_text: polcode.polcode_text,
            polcode_order: polcode.polcode_order,

        
            modified_by: this.initial_current.Username,
            fag: false

        }
        return this.http.post<any>(this.config.ApiSystemModule + '/polcode_list', data, this.options).toPromise()
            .then((res) => {
                let message = JSON.parse(res);
                return message.data;
            });
    }
//   doManage(polDetail:MTPolcodeModel, polItems:TRPolcodeModel[]){

    public polcode_record(polcode: TRPolcodeModel) {
        console.log('ROUND002..');
        let data = {
            device_name: "Desktop",
            ip: "127.0.0.1",
            username: this.initial_current.Username,
            // company_code: polcode.company_code || this.initial_current.CompCode,
            polcode_id: polcode.polcode_id,
            codestructure_code: polcode.codestructure_code,
            polcode_lenght: polcode.polcode_lenght,

            polcode_text: polcode.polcode_text,
            polcode_order: polcode.polcode_order,
           
            
            modified_by: this.initial_current.Username,
            fag: false

        }
        return this.http.post<any>(this.config.ApiSystemModule + '/polcode', data, this.options).toPromise()
            .then((res) => {
                console.log(res)
                let message = JSON.parse(res);
                return message;
            });
    }
    public polcode_delete(polcode: TRPolcodeModel) {
        console.log('ROUND003..');
        let data = {
            device_name: "Desktop",
            ip: "127.0.0.1",
            username: this.initial_current.Username,
            polcode_id: polcode.polcode_id,
            codestructure_code: polcode.codestructure_code,
            polcode_lenght: polcode.polcode_lenght,
            
            polcode_text: polcode.polcode_text,
            polcode_order: polcode.polcode_order,
           
            modified_by: this.initial_current.Username,
            fag: false

        }
        return this.http.post<any>(this.config.ApiSystemModule + '/polcode_del', data, this.options).toPromise()
            .then((res) => {
                console.log(res)
                let message = JSON.parse(res);
                return message;
            });
    }


    public polcode_import(file: File, file_name: string, file_type: string) {
        console.log('ROUND004..');
        const formData = new FormData();
        formData.append('file', file);

        var para = "fileName=" + file_name + "." + file_type;
        para += "&token=" + this.initial_current.Token;
        para += "&by=" + this.initial_current.Username;

        return this.http.post<any>(this.config.ApiSystemModule + '/doUploadPolcode?' + para, formData).toPromise()
            .then((res) => {
                let message = JSON.parse(res);
                return message;
            });
    }

}

//     public config: AppConfig = new AppConfig();
//     public initial_current: InitialCurrent = new InitialCurrent();

//     httpHeaders = new HttpHeaders({});
//     options = {
//       headers: this.httpHeaders
//     };

//     basicRequest = {
//       device_name:'',
//       ip:'',
//       username:''
//     };

//     constructor(private http: HttpClient, private router: Router) {
//         this.doGetInitialCurrent();
//     }


//     doGetInitialCurrent() {
//         this.initial_current = JSON.parse(localStorage.getItem(AppConfig.SESSIONInitial) || '{}');
//         if (this.initial_current) {
//             this.httpHeaders = new HttpHeaders({
//                 'Content-Type': 'application/json; charset=utf-8',
//                 'Accept': 'application/json',
//                 'Cache-Control': 'no-cache',
//                 'Authorization': this.initial_current.Token
//             });

//             this.options = {
//                 headers: this.httpHeaders
//             };
//         }
//         else {
//             this.router.navigateByUrl('login');
//         }
//     }

    
//   getStructureList(){
  
//     //console.log('Please wait..');
//     // return this.http.get(this.config.ApiSystemModule  + '/getSYSCodestructureList').pipe(map(res => res.json()));
//     return this.http.post<any>(this.config.ApiSystemModule + '/getSYSCodestructureList', this.basicRequest, this.options).toPromise()

//   }

//   getMTPolcodeList(com_code:string, pol_type:string){
  
//     //console.log('Please wait..');

//     let parameter = "?com=" + com_code + "&type=" + pol_type;

//     console.log(this.config.ApiSystemModule + '/getMTPolcode' + parameter);

//     // return this.http.get(this.config.ApiSystemModule + '/getMTPolcode' + parameter).pipe(map(res => res.json()));
//     return this.http.post<any>(this.config.ApiSystemModule + '/province_list', this.basicRequest, this.options).toPromise()

//   }

//   getNewCode(com_code:string, pol_type:string, emptype:string){
  
//     //console.log('Please wait..');

//     let parameter = "?com=" + com_code + "&type=" + pol_type+ "&emptype=" + emptype;

//     // return this.http.get(this.config.ApiSystemModule + '/getNewCode' + parameter).pipe(map(res => res.json()));
//     return this.http.post<any>(this.config.ApiSystemModule + '/province_list', this.basicRequest, this.options).toPromise()

//   }

//   getTRPolcodeList(pol_id:string){
  
//     //console.log('Please wait..');

//     let parameter = "?id=" + pol_id;

//     // return this.http.get(this.config.ApiSystemModule + '/getTRPolcode' + parameter).pipe(map(res => res.json()));
//     return this.http.post<any>(this.config.ApiSystemModule + '/province_list', this.basicRequest, this.options).toPromise()

//   }
  
//   doManage(polDetail:MTPolcodeModel, polItems:TRPolcodeModel[]){

//     //console.log('Please wait..');
//     // headers: this.httpHeaders

//     var headers = new Headers();
//     headers.append('Content-Type', 'application/json; charset=UTF-8');
//     let options = new RequestOptions({ method:'POST'});

//     var item_data:string = "[";

//     for (let i = 0; i < polItems.length; i++) {   
      
//       item_data = item_data + "{";
//       item_data = item_data + "\"polcode_id\":\"" + polItems[i].polcode_id + "\"";
//       item_data = item_data + ",\"codestructure_code\":\"" + polItems[i].codestructure_code + "\"";
//       item_data = item_data + ",\"polcode_lenght\":\"" + polItems[i].polcode_lenght + "\"";
//       item_data = item_data + ",\"polcode_text\":\"" + polItems[i].polcode_text + "\"";
//       item_data = item_data + ",\"polcode_order\":\"" + polItems[i].polcode_order + "\"";     
//       item_data = item_data + "}" + ",";

//     }

//     if(item_data.length > 2) 
//     {
//       item_data = item_data.substr(0, item_data.length - 1);
//     }

//     item_data = item_data + "]";
        
//     var specificData = { 
//       company_code:polDetail.company_code,
//       polcode_id:polDetail.polcode_id,
//       polcode_type:polDetail.polcode_type,     
//       polcode_data:item_data,
//       modified_by: this.initial_current.Username

//     };
        
//     // return this.http.post(this.config.ApiSystemModule + '/doManagePolcode', specificData, options).pipe(map(res => res.json()));
//     return this.http.post<any>(this.config.ApiSystemModule + '/province_list', this.basicRequest, this.options).toPromise()

//   }
  
//   doDelete(polDetail:MTPolcodeModel){

//     //console.log('Please wait..');
    
//     var headers = new Headers();
//     headers.append('Content-Type', 'application/json; charset=UTF-8');
//     let options = new RequestOptions({method:'POST'});
        
//     var specificData = {       
//       polcode_id:polDetail.polcode_id,
//       modified_by: this.initial_current.Username
//     };

//     console.log(specificData);
            
//     // return this.http.post(this.config.ApiSystemModule + '/doDeleteMTPolcode', specificData, options).pipe(map(res => res.json()));
//     return this.http.post<any>(this.config.ApiSystemModule + '/province_list', this.basicRequest, this.options).toPromise()

//   }

// }




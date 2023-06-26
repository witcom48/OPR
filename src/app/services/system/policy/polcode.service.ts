import { Injectable } from '@angular/core';
import { AppConfig } from '../../../config/config';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { InitialCurrent } from '../../../config/initial_current';
import { MTPolcodeModel } from 'src/app/models/system/mt_polcode';
import { TRPolcodeModel } from 'src/app/models/system/policy/tr_polcode';
import { Observable, map } from 'rxjs';
import { DatePipe } from '@angular/common';


@Injectable({
    providedIn: 'root',
})
export class PolcodeService {
    public config: AppConfig = new AppConfig();
    public initial_current: InitialCurrent = new InitialCurrent();

    httpHeaders = new HttpHeaders({});
    options = {
        headers: this.httpHeaders,
    };

    basicRequest = {
        device_name: '',
        ip: '',
        username: '',
    };

    constructor(
        private http: HttpClient,
        private router: Router,
        private datePipe: DatePipe
    ) {
        this.doGetInitialCurrent();
    }

    doGetInitialCurrent() {
        this.initial_current = JSON.parse(
            localStorage.getItem(AppConfig.SESSIONInitial) || '{}'
        );
        if (this.initial_current) {
            this.httpHeaders = new HttpHeaders({
                'Content-Type': 'application/json; charset=utf-8',
                Accept: 'application/json',
                'Cache-Control': 'no-cache',
                Authorization: this.initial_current.Token,
            });

            this.options = {
                headers: this.httpHeaders,
            };

            this.basicRequest = {
                device_name: '',
                ip: 'localhost',
                username: this.initial_current.Username,
            };
        } else {
            this.router.navigateByUrl('login');
        }
    }

    getStructureList(): Observable<any> {
        console.log('2..');
        return this.http.get(this.config.ApiSystemModule + '/getSYSCodestructureList').pipe(map((res) => res));
    }

    getMTPolcodeList(): Observable<any> {
        // getMTPolcodeList(com_code: string, pol_type: string): Observable<any> {
        console.log('3..');
        // const parameter = '?com=' + com_code + '&type=' + pol_type;
        return this.http.get(this.config.ApiSystemModule + '/getMTPolcode').pipe(map((res) => res));
    }

    getNewCode(com_code: string, pol_type: string, emptype: string) {
        var filter = {
            device_name: '',
            ip: 'localhost',
            username: this.initial_current.Username,
            language: '',
            com: com_code,
            type: pol_type,
            emptype: emptype,
        };
        return this.http
            .post<any>(
                this.config.ApiSystemModule + '/getnewcode',
                filter,
                this.options
            )
            .toPromise()
            .then((res) => {
                return res;
            });
    }

    getTRPolcodeList(pol_id: string): Observable<any> {
        console.log('5..');

        const parameter = '?id=' + pol_id;
        return this.http.get(this.config.ApiSystemModule + '/getTRPolcode' + parameter).pipe(map((res) => res));
    }

    // MTPolcodeModel / TRPolcodeModel
    public getempid_polItems(id: string) {
        console.log('1..');

        var filter = {
            device_name: '',
            ip: 'localhost',
            username: this.initial_current.Username,
            language: '',
            polcode_id: id,
        };
        return this.http
            .post<any>(
                this.config.ApiSystemModule + '/getTRPolcode',
                filter, this.options).toPromise().then((res) => {
                    let message = JSON.parse(res);
                    console.log(res);
                    return message.data;
                });
    }



    public record_polItems(
        polDetail: MTPolcodeModel,
        polItems: TRPolcodeModel[]
    ) {
        console.log('6..');
        var item_data: string = '[';
        for (let i = 0; i < polItems.length; i++) {
            item_data = item_data + '{';
            item_data = item_data + "\"polcode_id\":\"" + polItems[i].polcode_id + "\"";
            item_data = item_data + ",\"codestructure_code\":\"" + polItems[i].codestructure_code + "\"";
            item_data = item_data + ",\"polcode_lenght\":\"" + polItems[i].polcode_lenght + "\"";
            item_data = item_data + ",\"polcode_text\":\"" + polItems[i].polcode_text + "\"";
            item_data = item_data + ",\"polcode_order\":\"" + polItems[i].polcode_order + "\"";
            item_data = item_data + "}" + ",";
        }
        if (item_data.length > 2) {
            item_data = item_data.substr(0, item_data.length - 1);
        }
        item_data = item_data + ']';
        console.log(item_data);
        var specificData = {
            company_code: polDetail.company_code,
            polcode_id: polDetail.polcode_id,
            polcode_type: polDetail.polcode_type,
            polcode_data: item_data,
            modified_by: this.initial_current.Username,
        };

        return this.http
            .post<any>(
                this.config.ApiSystemModule + '/doManagePolcode',
                specificData,
                this.options
            )
            .toPromise()
            .then((res) => {
                return res;
            });
    }
    public delete_polItems(model: MTPolcodeModel) {
        const data = {
            polcode_id: model.polcode_id,
            modified_by: this.initial_current.Username,
        };

        return this.http
            .post<any>(
                this.config.ApiSystemModule + '/doDeleteMTPolcode',
                data,
                this.options
            )
            .toPromise()
            .then((res) => {
                return res;
            });
    }
    public empid_import(file: File, file_name: string, file_type: string) {
        console.log('7..');
        const formData = new FormData();
        formData.append('file', file);
        var para = 'fileName=' + file_name + '.' + file_type;
        para += '&token=' + this.initial_current.Token;
        para += '&by=' + this.initial_current.Username;
        return this.http.post<any>(this.config.ApiSystemModule + '/doUploadComcard?' + para, formData).toPromise().then((res) => {
            return res;
        });
    }
}

//     public config: AppConfig = new AppConfig();
//     public initial_current: InitialCurrent = new InitialCurrent();
//     private model:ProjectModel = new ProjectModel();

//   constructor(private http: HttpClient) {}

//   getStructureList(): Observable<any> {

//     return this.http.get(this.config.ApiSystemModule + '/getSYSCodestructureList').pipe(map(res => res));
//   }

//   getMTPolcodeList(com_code: string, pol_type: string): Observable<any> {
//     const parameter = "?com=" + com_code + "&type=" + pol_type;
//     return this.http.get(this.config.ApiSystemModule  + '/getMTPolcode' + parameter).pipe(map(res => res));
//   }

//   getNewCode(com_code: string, pol_type: string, emptype: string): Observable<any> {
//     const parameter = "?com=" + com_code + "&type=" + pol_type + "&emptype=" + emptype;
//     return this.http.get(this.config.ApiSystemModule  + '/getNewCode' + parameter).pipe(map(res => res));
//   }

//   getTRPolcodeList(pol_id: string): Observable<any> {
//     const parameter = "?id=" + pol_id;
//     return this.http.get(this.config.ApiSystemModule + '/getTRPolcode' + parameter).pipe(map(res => res));
//   }

//   doManage(polDetail: MTPolcodeModel, polItems: TRPolcodeModel[]): Observable<any> {
//     const headers = new HttpHeaders().set('Content-Type', 'application/json; charset=UTF-8');
//     const item_data = JSON.stringify(polItems.map((item) => ({
//       polcode_id: item.polcode_id,
//       codestructure_code: item.codestructure_code,
//       polcode_lenght: item.polcode_lenght,
//       polcode_text: item.polcode_text,
//       polcode_order: item.polcode_order,
//     })));
//     const specificData = {
//       company_code: polDetail.company_code,
//       polcode_id: polDetail.polcode_id,
//       polcode_type: polDetail.polcode_type,
//       polcode_data: item_data,
//       modified_by: this.initial_current.Username,
//     };
//     return this.http.post(this.config.ApiSystemModule  + '/doManagePolcode', specificData, { headers }).pipe(map(res => res));
//   }

//   doDelete(polDetail: MTPolcodeModel): Observable<any> {
//     const headers = new HttpHeaders().set('Content-Type', 'application/json; charset=UTF-8');
//     const specificData = {
//       polcode_id: polDetail.polcode_id,
//       modified_by: this.initial_current.Username,
//     };
//     return this.http.post(this.config.ApiSystemModule + '/doDeleteMTPolcode', specificData, { headers }).pipe(map(res => res));
//   }
// }

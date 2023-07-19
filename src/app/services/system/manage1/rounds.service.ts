import { Injectable } from '@angular/core';
import { ProjectModel } from '../../../models/project/project';
import { AppConfig } from '../../../config/config';
import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { Router } from '@angular/router';
import { InitialCurrent } from '../../../config/initial_current';

import { RoundsModel } from 'src/app/models/system/manage/rounds';

@Injectable({
  providedIn: 'root'
})
export class RoundsService {
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

    public rounds_get(Rounds: RoundsModel) {
                 let data = {
                    device_name: "Desktop",
                    ip: "127.0.0.1",
                    username: this.initial_current.Username,
                    round_group: Rounds.round_group,
                    round_id: Rounds.round_id,
                    round_code: Rounds.round_code,
        
                    round_name_th: Rounds.round_name_th,
                    round_name_en: Rounds.round_name_en,

                    modified_by: this.initial_current.Username,
                    fag: false,
         
                }
                return this.http.post<any>(this.config.ApiSystemModule + '/rounds_list', data, this.options).toPromise()
                    .then((res) => {
                        let message = JSON.parse(res);
                        return message.data;
                    });
            }

     

    public rounds_record(Rounds: RoundsModel) {
        let data = {
            device_name: "Desktop",
            ip: "127.0.0.1",
            username: this.initial_current.Username,

            round_id: Rounds.round_id,
            round_group: Rounds.round_group,
            round_code: Rounds.round_code,

            round_name_th: Rounds.round_name_th,
            round_name_en: Rounds.round_name_en,
      
             modified_by: this.initial_current.Username,

             flag: Rounds.flag,
             round_data: Rounds.round_data


        }
        return this.http.post<any>(this.config.ApiSystemModule + '/rounds', data, this.options).toPromise()
            .then((res) => {
                // console.log(res)
                let message = JSON.parse(res);
                return message;
            });
    }
    public rounds_delete(Rounds: RoundsModel) {
         let data = {
            device_name: "Desktop",
            ip: "127.0.0.1",
            username: this.initial_current.Username,
            round_group: Rounds.round_group,
            round_id: Rounds.round_id,
            round_code: Rounds.round_code,
        
            round_name_th: Rounds.round_name_th,
            round_name_en: Rounds.round_name_en,
            

            modified_by: this.initial_current.Username,
            fag: false,
            round_data: Rounds.round_data,

        }
        return this.http.post<any>(this.config.ApiSystemModule + '/rounds_del', data, this.options).toPromise()
            .then((res) => {
                 let message = JSON.parse(res);
                return message;
            });
    }


    public rounds_import(file: File, file_name: string, file_type: string) {
         const formData = new FormData();
        formData.append('file', file);

        var para = "fileName=" + file_name + "." + file_type;
        para += "&token=" + this.initial_current.Token;
        para += "&by=" + this.initial_current.Username;

        return this.http.post<any>(this.config.ApiSystemModule + '/doUploadRounds?' + para, formData).toPromise()
            .then((res) => {
                let message = JSON.parse(res);
                return message;
            });
    }

}
 
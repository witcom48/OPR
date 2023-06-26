import { Injectable } from '@angular/core';

import { AppConfig } from '../../config/config';

import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class AuthenService {

  public config: AppConfig = new AppConfig();

  constructor(private http: HttpClient) { }

  httpHeaders = new HttpHeaders({
    'Content-Type': 'application/json; charset=utf-8',
    'Accept': 'application/json',
    'Cache-Control': 'no-cache',
  });

  options = {
    headers: this.httpHeaders
  };

  public getToken(com: string, user: string, pass: string) {
    console.log('ATH001..');

    var data = {
      company_code: com,
      usname: user,
      pwd: pass
    };

    return this.http.post<any>(this.config.ApiMainModule + '/doAuthen', data, this.options).toPromise()
      // .then((res) => <PrjectModel[]>res.data)
      .then((res) => {
        let message = JSON.parse(res);
        //console.log(res)
        //console.log(message.message)
        return message;
      });
  }



}

import { Injectable } from '@angular/core';

import { AppConfig } from '../../config/config';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { InitialCurrent } from 'src/app/config/initial_current';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthenService {

  public config: AppConfig = new AppConfig();

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
        'Authorization': this.initial_current.Token || ""
      });

      this.options2 = {
        headers: this.httpHeaders
      };
    }
    else {
      this.router.navigateByUrl('login');
    }
  }
  public initial_current: InitialCurrent = new InitialCurrent();
  httpHeaders = new HttpHeaders({
    'Content-Type': 'application/json; charset=utf-8',
    'Accept': 'application/json',
    'Cache-Control': 'no-cache',
  });

  options = {
    headers: this.httpHeaders
  };
  options2 = {
    headers: this.httpHeaders
  };
  public getToken(com: string, user: string, pass: string) {
    // console.log('ATH001..');

    var data = {
      company_code: com,
      usname: user,
      pwd: pass,
    };

    return this.http.post<any>(this.config.ApiMainModule + '/doAuthen', data, this.options).toPromise()
      // .then((res) => <PrjectModel[]>res.data)
      .then((res) => {
        let message = JSON.parse(res);
        //// console.log(res)
        //// console.log(message.message)
        return message;
      });
  }
  public checkToken() {
    // console.log('ATH002..');

    var data = {
      usname: this.initial_current.Username
    };

    return this.http.post<any>(this.config.ApiMainModule + '/doCheckToken', data, this.options2).toPromise()
      // .then((res) => <PrjectModel[]>res.data)
      .then((res) => {
        let message = JSON.parse(res);
        //// console.log(res)
        //// console.log(message.message)
        return message;
      });
  }


}

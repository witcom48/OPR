import { Injectable } from '@angular/core';



import { PrjectModel } from '../../models/project/project';
import { AppConfig } from '../../config/config';

import { HttpClient, HttpHeaders  } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class AuthenService {

  public config:AppConfig = new AppConfig();
  
  private model:PrjectModel = new PrjectModel();
  constructor(private http:HttpClient) { }

  httpHeaders = new HttpHeaders({
    'Content-Type': 'application/json; charset=utf-8',
    'Accept': 'application/json',
    'Cache-Control': 'no-cache',   
  });

  options = {
    headers: this.httpHeaders
  };
   
  public getToken(){      
    console.log('ATH001..');
    
    var data = { 
      usname:"admin",
      pwd:"2022*"
    };
       
    return this.http.post<any>(this.config.ApiMainModule + '/doAuthen', data, this.options).toPromise()
   // .then((res) => <PrjectModel[]>res.data)
    .then((res) => {
      let message = JSON.parse(res);
      console.log(res)
      //console.log(message.message)
      return message.message;
    });
  }
 
  

}

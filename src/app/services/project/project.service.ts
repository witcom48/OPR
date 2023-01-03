import { Injectable } from '@angular/core';

import { PrjectModel } from '../../models/project/project';
import { AppConfig } from '../../config/config';

import { HttpClient, HttpHeaders  } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  public config:AppConfig = new AppConfig();
  
  private model:PrjectModel = new PrjectModel();
  constructor(private http:HttpClient) { }



  httpHeaders = new HttpHeaders({
    'Content-Type': 'application/json; charset=utf-8',
    'Accept': 'application/json',
    'Cache-Control': 'no-cache',
    'Authorization': ""
  });

  options = {
    headers: this.httpHeaders
  };
   
  public project_get(type:string){      
    console.log('PRO001..');
    
    var data = { 
        project_type:type,
        username:"Administrator"
    };
       
    return this.http.post<any>('http://localhost:32207/BpcOpr.svc/BpcOpr/project_list', data, this.options).toPromise()
   // .then((res) => <PrjectModel[]>res.data)
    .then((res) => {
      let message = JSON.parse(res);
      console.log(res)
      return message.data;
    });
  }
 
  public project_record() {
    console.log('PRO002..');
    const data = {
      project_id: 1,
      project_code: 'AAA',
      project_name_th: 'AAA',
      project_name_en: 'AAA',
      project_name_short: 'AAA',
      project_type: 'P',
      modified_by: 'Administrator'
    };    
    return this.http.post<any>('http://localhost:32207/BpcOpr.svc/BpcOpr/project', data, this.options).subscribe(res => {     
      console.log(res);
    },
      (err) => {
        console.log(err);
      }
    );
  }  

}

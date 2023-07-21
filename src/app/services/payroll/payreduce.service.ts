import { Injectable } from '@angular/core';
import { ProjectModel } from '../../models/project/project';
import { AppConfig } from '../../config/config';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { InitialCurrent } from '../../config/initial_current';
import { DatePipe } from '@angular/common';
@Injectable({
  providedIn: 'root'
})
export class PayReduceService {

    public config:AppConfig = new AppConfig();
  
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
  
    constructor(private http:HttpClient, private router: Router, private datePipe: DatePipe) { 
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

    public payreduce_get(company:string, project:string, worker:string, paydate:Date ){     
    
        var filter = { 
          device_name:'',
          ip:"localhost",
          username:this.initial_current.Username,
          company_code:  this.initial_current.CompCode,          
          language:this.initial_current.Language,
          worker_code:worker,

          paydate:this.datePipe.transform(paydate, 'yyyy-MM-dd')

        };
        return this.http.post<any>(this.config.ApiPayrollModule + '/payreduce_list', filter, this.options).toPromise()   
        .then((res) => {
          let message = JSON.parse(res);
          return message.data;
          
        });
      }
}
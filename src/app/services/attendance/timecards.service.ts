import { Injectable } from '@angular/core';
import { AppConfig } from '../../config/config';
import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';

import { InitialCurrent } from '../../config/initial_current';
import { TimecardsModel } from '../../models/attendance/timecards';

@Injectable({
  providedIn: 'root'
})
export class TimecardService {

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
     
  public timecard_get(company:string, project:string, worker:string, fromdate:Date, todate:Date){     
    
    let datefrom = this.datePipe.transform(fromdate, 'yyyy-MM-dd');
    let dateto = this.datePipe.transform(todate, 'yyyy-MM-dd');

    var filter = { 
      device_name:'',
      ip:"localhost",
      username:this.initial_current.Username,
      company:company,
      language:this.initial_current.Language,
      project_code:project,
      worker_code:worker,
      fromdate:datefrom,
      todate:dateto,     
    };
    

    return this.http.post<any>(this.config.ApiProjectModule + '/timecard_list', filter, this.options).toPromise()   
    .then((res) => {
      let message = JSON.parse(res);
      console.log(res)
      return message.data;
    });
  }
 
  public timecard_record(model:TimecardsModel) {   

    var data = { 

      company_code:model.company_code,
      project_code:model.project_code,
      worker_code:model.worker_code,
      timecard_workdate:model.timecard_workdate,
      timecard_daytype:model.timecard_daytype,
      shift_code:model.shift_code,
      timecard_color:model.timecard_color,

      timecard_lock:model.timecard_lock,

      timecard_ch1:this.datePipe.transform(model.timecard_ch1, 'yyyy-MM-dd HH:mm:ss'),
      timecard_ch2:this.datePipe.transform(model.timecard_ch2, 'yyyy-MM-dd HH:mm:ss'),
      timecard_ch3:this.datePipe.transform(model.timecard_ch3, 'yyyy-MM-dd HH:mm:ss'),
      timecard_ch4:this.datePipe.transform(model.timecard_ch4, 'yyyy-MM-dd HH:mm:ss'),
      timecard_ch5:this.datePipe.transform(model.timecard_ch5, 'yyyy-MM-dd HH:mm:ss'),
      timecard_ch6:this.datePipe.transform(model.timecard_ch6, 'yyyy-MM-dd HH:mm:ss'),
      timecard_ch7:this.datePipe.transform(model.timecard_ch7, 'yyyy-MM-dd HH:mm:ss'),
      timecard_ch8:this.datePipe.transform(model.timecard_ch8, 'yyyy-MM-dd HH:mm:ss'),
      timecard_ch9:this.datePipe.transform(model.timecard_ch9, 'yyyy-MM-dd HH:mm:ss'),
      timecard_ch10:this.datePipe.transform(model.timecard_ch10, 'yyyy-MM-dd HH:mm:ss'),

      timecard_before_min:model.timecard_before_min,
      timecard_work1_min:model.timecard_work1_min,
      timecard_work2_min:model.timecard_work2_min,
      timecard_break_min:model.timecard_break_min,
      timecard_after_min:model.timecard_after_min,

      timecard_before_min_app:model.timecard_before_min_app,
      timecard_work1_min_app:model.timecard_work1_min_app,
      timecard_work2_min_app:model.timecard_work2_min_app,
      timecard_break_min_app:model.timecard_break_min_app,
      timecard_after_min_app:model.timecard_after_min_app,

      timecard_late_min:model.timecard_late_min,
      timecard_late_min_app:model.timecard_late_min_app,
      

      modified_by:this.initial_current.Username
    };

    console.log(this.config.ApiProjectModule)

    return this.http.post<any>(this.config.ApiProjectModule + '/timecard', data, this.options).toPromise()   
    .then((res) => {      
      return res;
    });
  }  

}

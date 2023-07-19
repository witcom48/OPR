import { Injectable } from '@angular/core';
import { ProjectModel } from '../../models/project/project';
import { AppConfig } from '../../config/config';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { InitialCurrent } from '../../config/initial_current';
import { ItemsModel } from 'src/app/models/payroll/items';
import { PayitemModel } from 'src/app/models/payroll/payitem';
import { DatePipe } from '@angular/common';
@Injectable({
  providedIn: 'root'
})
export class PayitemService {

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

    public payitem_get(company:string, project:string, worker:string, payitem:string,  item:string, paydate:Date ){     
    
        var filter = { 
          device_name:'',
          ip:"localhost",
          username:this.initial_current.Username,
          company_code:  this.initial_current.CompCode,          
          language:this.initial_current.Language,
          worker_code:worker,
          item_type: payitem,
          item_code:item, 

          payitem_date:this.datePipe.transform(paydate, 'yyyy-MM-dd')

        };
        return this.http.post<any>(this.config.ApiPayrollModule + '/TRpayitem_list', filter, this.options).toPromise()   
        .then((res) => {
          let message = JSON.parse(res);
          return message.data;
        });
      }


      public payitem_record(model: PayitemModel) {
        // console.log('TRIT002..');
        let data = {
          device_name: '',
          ip: '',
          username: this.initial_current.Username,
          company_code: model.company_code || this.initial_current.CompCode,
          worker_code: model.worker_code,
          item_code: model.item_code,
          payitem_date: model.payitem_date,
          payitem_amount: model.payitem_amount,
          payitem_quantity: model.payitem_quantity,
          payitem_paytype: model.payitem_paytype,
          payitem_note: model.payitem_note,
          modified_by: this.initial_current.Username,
          flag: model.flag,
        };
      
        return this.http
          .post<any>(this.config.ApiPayrollModule + '/TRpayitem', data, this.options)
          .toPromise()
          .then((res) => {
            // console.log(res);
            let message = JSON.parse(res);
            return message;
          })
          .catch((error) => {
            // console.log('An error occurred while recording payitem:', error);
            throw error;
          });
      }
      public setpayitems_record(worker_code: string, model: PayitemModel) {
        // console.log('TRIT002.1..');
      
        let emplists: any = [];
        model.item_data.forEach((res: ItemsModel) => {
          let ss = {
            worker_code: res.worker_code,
          };
          emplists.push(ss);
        });
      
        let data = {
          device_name: '',
          ip: '',
          username: this.initial_current.Username,
      
          company_code: model.company_code || this.initial_current.CompCode,
          worker_code: worker_code, // เพิ่ม worker_code ที่ต้องการบันทึก
          item_code: model.item_code,
          payitem_date: model.payitem_date,
          payitem_amount: model.payitem_amount,
          payitem_quantity: model.payitem_quantity,
          payitem_paytype: model.payitem_paytype,
          payitem_note: model.payitem_note,
      
          emp_data: emplists,
      
          modified_by: model.modified_by || this.initial_current.Username,
        };
      
        return this.http
          .post<any>(
            this.config.ApiPayrollModule + '/TRpayitemlist',
            data,
            this.options
          )
          .toPromise()
          .then((res) => {
            // console.log(res);
            let message = JSON.parse(res);
            return message;
          });
      }
      
    public payitem_delete(model: PayitemModel) {
        // console.log('PAYTRIT003..');
        let data = {
            device_name: "",
            ip: "",
            username: this.initial_current.Username,
            company_code: model.company_code || this.initial_current.CompCode,
            worker_code:model.worker_code,
            item_code:model.item_code,
            payitem_date:model.payitem_date,
            payitem_amount:model.payitem_amount,
            payitem_quantity:model.payitem_quantity,
            payitem_paytype:model.payitem_paytype,
            payitem_note:model.payitem_note,
            modified_by: this.initial_current.Username,


        }
        return this.http.post<any>(this.config.ApiPayrollModule + '/TRpayitem_del', data, this.options).toPromise()
            .then((res) => {
                // console.log(res)
                let message = JSON.parse(res);
                return message;
            });
    }


    public payitem_import(file: File, file_name: string, file_type: string) {
        // console.log('PAYTRIT004..');
        const formData = new FormData();
        formData.append('file', file);

        var para = "fileName=" + file_name + "." + file_type;
        para += "&token=" + this.initial_current.Token;
        para += "&by=" + this.initial_current.Username;

        return this.http.post<any>(this.config.ApiPayrollModule + '/doUploadTRpayitem?' + para, formData).toPromise()
            .then((res) => {
                let message = JSON.parse(res);
                return message;
            });
    }

    public payitems_get(){   
        return this.http.get<any>(this.config.ApiPayrollModule + '/TRpayitem_list').toPromise()   
        .then((res) => {
          let message = JSON.parse(res);
          // console.log(res)
          return message;
        });
      }
    
    
}

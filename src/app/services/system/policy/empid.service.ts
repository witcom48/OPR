import { Injectable } from '@angular/core';
import { PrjectModel } from '../../../models/project/project';
import { AppConfig } from '../../../config/config';
import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { Router } from '@angular/router';

import { InitialCurrent } from '../../../config/initial_current';
import { EmpIDModel } from 'src/app/models/system/policy/empid';
import { MTPolcodeModel } from 'src/app/models/system/mt_polcode';
import { TRPolcodeModel } from 'src/app/models/system/policy/tr_polcode';
import { map } from 'rxjs';
import { RequestOptions } from '@angular/http';

@Injectable({
  providedIn: 'root'
})
export class EmpidService {
    public config:AppConfig = new AppConfig();

    private model:PrjectModel = new PrjectModel();
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
    constructor(private http:HttpClient, private router: Router) {
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

    getStructureList(){

      //console.log('Please wait..');
      return this.http.get(this.config.ApiSystemModule  + '/getSYSCodestructureList').toPromise()

    }

    getMTPolcodeList(com_code:string, pol_type:string){

      //console.log('Please wait..');

      let parameter = "?com=" + com_code + "&type=" + pol_type;

      console.log(this.config.ApiSystemModule  + '/getMTPolcode' + parameter);

      return this.http.get(this.config.ApiSystemModule + '/getMTPolcode' + parameter).toPromise()

    }

    getNewCode(com_code:string, pol_type:string, emptype:string){

      //console.log('Please wait..');

      let parameter = "?com=" + com_code + "&type=" + pol_type+ "&emptype=" + emptype;

      return this.http.get(this.config.ApiSystemModule + '/getNewCode' + parameter).toPromise()

    }

    getTRPolcodeList(pol_id:string){

      //console.log('Please wait..');

      let parameter = "?id=" + pol_id;

      return this.http.get(this.config.ApiSystemModule + '/getTRPolcode' + parameter).toPromise()

    }

    doManage(polDetail:MTPolcodeModel, polItems:TRPolcodeModel[]){

      //console.log('Please wait..');

      var headers = new Headers();
      headers.append('Content-Type', 'application/json; charset=UTF-8');
      let options = ({headers:headers, method:'POST'});

      var item_data:string = "[";

      for (let i = 0; i < polItems.length; i++) {

        item_data = item_data + "{";
        item_data = item_data + "\"polcode_id\":\"" + polItems[i].polcode_id + "\"";
        item_data = item_data + ",\"codestructure_code\":\"" + polItems[i].codestructure_code + "\"";
        item_data = item_data + ",\"polcode_lenght\":\"" + polItems[i].polcode_lenght + "\"";
        item_data = item_data + ",\"polcode_text\":\"" + polItems[i].polcode_text + "\"";
        item_data = item_data + ",\"polcode_order\":\"" + polItems[i].polcode_order + "\"";
        item_data = item_data + "}" + ",";

      }

      if(item_data.length > 2)
      {
        item_data = item_data.substr(0, item_data.length - 1);
      }

      item_data = item_data + "]";

      var specificData = {
        company_code:polDetail.company_code,
        polcode_id:polDetail.polcode_id,
        polcode_type:polDetail.polcode_type,
        polcode_data:item_data,
        modified_by:this.initial_current.Username
      };

      return this.http.post(this.config.ApiSystemModule + '/doManagePolcode', specificData, this.options).toPromise()

    }

    doDelete(polDetail:MTPolcodeModel){

      console.log('Please wait..');

      var headers = new Headers();
      headers.append('Content-Type', 'application/json; charset=UTF-8');
      let options = ({headers:this.httpHeaders, method:'POST'});

      var specificData = {
        polcode_id:polDetail.polcode_id,
        modified_by:this.initial_current.Username
      };

      console.log(specificData);

      return this.http.post(this.config.ApiSystemModule+ '/doDeleteMTPolcode', specificData, this.options).toPromise()

    }

  }

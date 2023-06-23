import { Component, OnInit } from '@angular/core';

import { AppConfig } from '../../../config/config';
import { InitialCurrent } from '../../../config/initial_current';
import { AuthenService } from '../../../services/authen/authen.service';
import { Router } from '@angular/router';
import { CompanyService } from 'src/app/services/system/company.service';
import { CompanyModel } from 'src/app/models/system/company';
import { AccountModel } from 'src/app/models/self/account';
import { TRAccountModel } from 'src/app/models/self/traccount';
import { MessageService } from 'primeng/api';

declare var login: any;
@Component({
  selector: 'app-verify',
  templateUrl: './verify.component.html',
  styleUrls: ['./verify.component.scss']
})
export class VerifyComponent implements OnInit {
  langs: any = login;
  selectlang: string = "EN";
  constructor(
    private authenService: AuthenService,
    private router: Router,
    private companyService: CompanyService,
    private messageService: MessageService,
  ) { }

  displayManage: boolean = true;
  displaygroupManage: boolean = false;
  loading: boolean = true;
  token: string = "";
  user: string = "";
  pass: string = "";
  comdis: string = "company_name_en";
  company_list: CompanyModel[] = [];
  comselected: CompanyModel = new CompanyModel();
  account_list: AccountModel = new AccountModel();
  selectaccount: TRAccountModel = new TRAccountModel();
  initail_current: InitialCurrent = new InitialCurrent();
  ngOnInit(): void {
    this.doLoadLocation();
  }
  doLoadLocation() {
    this.company_list = [];
    this.companyService.company_get("").then(async (res) => {
      res.forEach((obj: CompanyModel) => {
        obj.company_name_en = obj.company_code + " " + obj.company_name_en
        obj.company_name_th = obj.company_code + " " + obj.company_name_th
      });
      this.company_list = await res;
      this.comselected = res[0];
    });
  }

  doLogin() {
    console.log(this.comselected.company_code)
    console.log(this.user)
    console.log(this.pass)
    this.initail_current = new InitialCurrent()
    this.authenService.getToken(this.comselected.company_code, this.user, this.pass).then((res) => {
      if (res.success) {
        this.token = res.message;
        this.loading = false;
        this.initail_current.CompCode = this.comselected.company_code;
        this.initail_current.Token = 'Bearer ' + this.token;
        this.initail_current.Language = this.selectlang;
        this.account_list = res.user_data[0];
        res.user_data.forEach((obj: AccountModel) => {
          if (obj.account_type == "Emp") {
            this.initail_current.Username = obj.worker_data[0].worker_code;
            this.initail_current.Usertype = obj.account_type;
          }
          if (obj.account_type == "APR") {
            this.initail_current.Username = obj.account_user;
            this.initail_current.Usertype = obj.account_type;
          }
          if (obj.account_type == "GRP") {
            this.initail_current.Username = obj.account_user
            this.initail_current.Usertype = obj.account_type;
            // this.initail_current.Username = obj.worker_data[0].worker_code;
            // this.initail_current.Usertype = obj.worker_data[0].account_type;
            // this.displaygroupManage = true;
            // this.displayManage = false;
          }
          if (obj.account_type == "ADM") {
            this.initail_current.Username = obj.account_user;
            this.initail_current.Usertype = obj.account_type;
          }
          localStorage.setItem(AppConfig.SESSIONInitial, this.initail_current.doGetJSONInitialCurrent());
          if (this.initail_current.Token) {
            window.location.href = "";
            // this.router.navigateByUrl('');
          }

        });
      } else {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: this.langs.get('incorrect')[this.selectlang] })
      }
    });
  }
  selectcom() {

  }
  changelang(lang: string) {
    this.selectlang = lang;
    if (lang == "TH") {
      this.comdis = "company_name_th";
    } else {
      this.comdis = "company_name_en";
    }

  }
  selectuser() {
    this.initail_current.Username = this.selectaccount.worker_code;
    this.initail_current.Usertype = this.selectaccount.account_type;
    localStorage.setItem(AppConfig.SESSIONInitial, this.initail_current.doGetJSONInitialCurrent());
    if (this.initail_current.Token) {
      window.location.href = "";
      // this.router.navigateByUrl('');
    }
  }
}

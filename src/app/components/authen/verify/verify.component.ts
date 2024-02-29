import { Component, OnInit, ViewChild } from '@angular/core';

import { AppConfig } from '../../../config/config';
import { InitialCurrent } from '../../../config/initial_current';
import { AuthenService } from '../../../services/authen/authen.service';
import { Router } from '@angular/router';
import { CompanyService } from 'src/app/services/system/company.service';
import { CompanyModel } from 'src/app/models/system/company';
import { AccountModel } from 'src/app/models/self/account';
import { TRAccountModel } from 'src/app/models/self/traccount';
import { MessageService } from 'primeng/api';
import { YearService } from 'src/app/services/system/policy/year.service';
import { YearPeriodModels } from 'src/app/models/attendance/yearperiod';
import { PeriodsServices } from 'src/app/services/payroll/periods.service';
import { PeriodsModels } from 'src/app/models/payroll/periods';
import { DatePipe } from '@angular/common';
import { PolmenuServices } from 'src/app/services/system/security/polmenu.service';
import { PolmenuModel } from 'src/app/models/system/security/polmenu';

declare var login: any;
@Component({
  selector: 'app-verify',
  templateUrl: './verify.component.html',
  styleUrls: ['./verify.component.scss']
})
export class VerifyComponent implements OnInit {
  @ViewChild("input") elm: any;
  langs: any = login;
  selectlang: string = "EN";
  constructor(
    private authenService: AuthenService,
    private router: Router,
    private companyService: CompanyService,
    private messageService: MessageService,
    private yearService: YearService,
    private PolmenuServices: PolmenuServices,
    private periodsService: PeriodsServices,
    private datePipe: DatePipe,
  ) { }

  displayManage: boolean = true;
  displayManagetype: boolean = false;
  displaygroupManage: boolean = false;
  display: boolean = false;
  loading: boolean = true;
  twofactor: string = "";
  token: string = "";
  user: string = "";
  pass: string = "";
  comdis: string = "company_name_en";
  perioddis: string = "period_name_en"
  localdis: string = "en-US";
  emp_type: string = "M"
  type_list: any[] = [{ code: 'Emp', name: 'EMP' }, { code: 'APR', name: 'APR' }];
  typeselected: any = { code: 'Emp', name: 'EMP' };
  company_list: CompanyModel[] = [];
  yearperiods_list: YearPeriodModels[] = [];
  periods_list: PeriodsModels[] = [];
  yearperiods_select: YearPeriodModels = new YearPeriodModels();
  periods_select: PeriodsModels = new PeriodsModels();
  comselected: CompanyModel = new CompanyModel();
  account_list: AccountModel = new AccountModel();
  account_lists: AccountModel[] = [];
  selectaccount: TRAccountModel = new TRAccountModel();
  initail_current: InitialCurrent = new InitialCurrent();
  submitForm() {
    console.log(this.twofactor)
    this.authenService.doVerify(this.initail_current.Username, this.twofactor).then((res) => {
      console.log(res);
      if (res.result == "1") {
        window.location.href = "";
      }
    })
  }
  ngOnInit(): void {
    this.initail_current.loading = true;
    this.doLoadLocation();
  }
  doLoadYear(com: string) {
    this.yearperiods_list = [];
    var tmp = new YearPeriodModels();
    tmp.year_group = "TAX";
    tmp.company_code = com;
    this.yearService.year_get(tmp).then(async (res) => {
      await res.forEach((element: YearPeriodModels) => {
        element.year_fromdate = new Date(element.year_fromdate)
        element.year_todate = new Date(element.year_todate)
      });
      this.yearperiods_list = await res;
      this.yearperiods_select = res[0];
      this.displaygroupManage = true;
      this.displayManage = false;
      this.doPeriod(com);
    });
  }
  doPeriod(com: string) {
    this.initail_current.loading = true;
    this.periods_list = [];
    var tmp = new PeriodsModels();
    tmp.year_code = this.yearperiods_select.year_code;
    tmp.company_code = com;
    tmp.emptype_code = this.emp_type;
    this.periodsService.period_get(tmp).then(async (res) => {
      res.forEach((obj: PeriodsModels) => {
        obj.period_name_en = obj.period_no + " : " + this.datePipe.transform(obj.period_payment, 'dd MMM yyyy') + "(" + this.datePipe.transform(obj.period_from, 'dd MMM yyyy') + " - " + this.datePipe.transform(obj.period_to, 'dd MMM yyyy') + ")";
        obj.period_name_th = obj.period_no + " - " + this.datePipe.transform(obj.period_payment, 'dd MMM yyyy', "", 'th-TH') + "(" + this.datePipe.transform(obj.period_from, 'dd MMM yyyy', "", 'th-TH') + " - " + this.datePipe.transform(obj.period_to, 'dd MMM yyyy', "", 'th-TH') + ")"
      });
      // console.log(res)
      this.periods_list = await res;
      this.periods_select = await res[0]
      this.initail_current.loading = false;
      // // console.log(this.datePipe.transform(this.periods_select.period_from, 'dd') + " - " + this.datePipe.transform(this.periods_select.period_payment, 'dd MMM yyyy', "", this.localdis) + "(" + this.datePipe.transform(this.periods_select.period_from, 'dd MMM yyyy', "", this.localdis) + " - " + this.datePipe.transform(this.periods_select.period_to, 'dd MMM yyyy', "", this.localdis) + ")")
    });
  }
  doLoadLocation() {
    this.initail_current.loading = true;
    this.company_list = [];
    this.companyService.company_get("").then(async (res) => {
      res.forEach((obj: CompanyModel) => {
        obj.company_name_en = obj.company_code + " " + obj.company_name_en
        obj.company_name_th = obj.company_code + " " + obj.company_name_th
      });
      this.company_list = await res;
      this.comselected = res[0];
      this.initail_current.loading = false;
    });
  }

  doLogin() {
    this.initail_current.loading = true;
    // console.log(this.comselected.company_code)
    // console.log(this.user)
    // console.log(this.pass)
    this.initail_current = new InitialCurrent()
    this.authenService.getToken(this.comselected.company_code, this.user, this.pass).then((res) => {
      if (res.success) {
        console.log(res);
        this.token = res.message;
        this.loading = false;
        this.initail_current.CompCode = this.comselected.company_code;
        this.initail_current.Token = 'Bearer ' + this.token;
        this.initail_current.Language = this.selectlang;
        this.account_lists = res.user_data;
        if (res.user_data.length == 1) {
          console.log('one user')
          this.account_list = res.user_data[0];
          res.user_data.forEach((obj: AccountModel) => {
            if (obj.account_type == "Emp") {
              this.initail_current.Username = obj.worker_data[0].worker_code;
              this.initail_current.Usertype = obj.account_type;
              localStorage.setItem(AppConfig.SESSIONInitial, this.initail_current.doGetJSONInitialCurrent());
              if (this.initail_current.Token) {
                this.displayManage = false;
                this.display = true;
                setTimeout(() => {
                  this.elm.nativeElement.focus();
                }, 100);

                // window.location.href = "";
                // this.router.navigateByUrl('');
              }
            }
            if (obj.account_type == "APR") {
              this.initail_current.Username = obj.account_user;
              this.initail_current.Usertype = obj.account_user == "admin" ? "ADM" : obj.account_type;
              localStorage.setItem(AppConfig.SESSIONInitial, this.initail_current.doGetJSONInitialCurrent());
              if (this.initail_current.Token) {
                this.displayManage = false;
                this.display = true;
                setTimeout(() => {
                  this.elm.nativeElement.focus();
                }, 100);
                // this.router.navigateByUrl('');
              }
            }
            if (obj.account_type == "GRP") {
              this.initail_current.Username = obj.account_user
              this.initail_current.Usertype = obj.account_type;
              // this.initail_current.Username = obj.worker_data[0].worker_code;
              // this.initail_current.Usertype = obj.worker_data[0].account_type;
              // this.displaygroupManage = true;
              // this.displayManage = false;
              localStorage.setItem(AppConfig.SESSIONInitial, this.initail_current.doGetJSONInitialCurrent());
              if (this.initail_current.Token) {
                window.location.href = "";
                // this.router.navigateByUrl('');
              }
            }
            if (obj.account_type == "ADM") {
              this.initail_current.Username = obj.account_user;
              this.initail_current.Usertype = obj.account_type;
              console.log(obj)
              this.initail_current.PolMenu_Code = obj.polmenu_code;
              this.doLoadYear(this.comselected.company_code)
            }
            // else {
            //   localStorage.setItem(AppConfig.SESSIONInitial, this.initail_current.doGetJSONInitialCurrent());
            //   if (this.initail_current.Token) {
            //     window.location.href = "";
            //     // this.router.navigateByUrl('');
            //   }
            // }
            if (obj.account_type == "SADM") {
              this.initail_current.Username = obj.account_user;
              this.initail_current.Usertype = obj.account_type;
              this.initail_current.PolMenu_Code = 'HR1';
              localStorage.setItem(AppConfig.SESSIONInitial, this.initail_current.doGetJSONInitialCurrent());
              if (this.initail_current.Token) {
                window.location.href = "";
                // this.router.navigateByUrl('');
              }
            }
            // if (this.initail_current.Token) {
            //   window.location.href = "";
            //   // this.router.navigateByUrl('');
            // }

          });
        } else {
          console.log('two user')
          this.displayManagetype = true;
          this.displayManage = false;
        }
      } else {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: this.langs.get('incorrect')[this.selectlang] })
      }
      this.initail_current.loading = false;
    });
  }

  submittype() {
    console.log(this.typeselected);
    this.displayManagetype = false;
    this.account_lists.find((obj: AccountModel) => {
      if (obj.account_type == this.typeselected.code && obj.account_type == "Emp") {
        console.log(obj)
        this.displayManagetype = false;
        this.initail_current.Username = obj.worker_data[0].worker_code;
        this.initail_current.Usertype = obj.account_type;
        localStorage.setItem(AppConfig.SESSIONInitial, this.initail_current.doGetJSONInitialCurrent());
        if (this.initail_current.Token) {
          this.displayManage = false;
          this.display = true;
          setTimeout(() => {
            this.elm.nativeElement.focus();
          }, 100);

          // window.location.href = "";
          // this.router.navigateByUrl('');
        }
        return
      }
      if (obj.account_type == this.typeselected.code && obj.account_type == "APR") {
        this.initail_current.Username = obj.account_user;
        this.initail_current.Usertype = obj.account_type;
        localStorage.setItem(AppConfig.SESSIONInitial, this.initail_current.doGetJSONInitialCurrent());
        if (this.initail_current.Token) {
          this.displayManage = false;
          this.display = true;
          setTimeout(() => {
            this.elm.nativeElement.focus();
          }, 100);
          // this.router.navigateByUrl('');
        }
        return
      }
      if (obj.account_type == "GRP") {
        this.initail_current.Username = obj.account_user
        this.initail_current.Usertype = obj.account_type;
        // this.initail_current.Username = obj.worker_data[0].worker_code;
        // this.initail_current.Usertype = obj.worker_data[0].account_type;
        // this.displaygroupManage = true;
        // this.displayManage = false;
        localStorage.setItem(AppConfig.SESSIONInitial, this.initail_current.doGetJSONInitialCurrent());
        if (this.initail_current.Token) {
          window.location.href = "";
          // this.router.navigateByUrl('');
        }
        return
      }
      if (obj.account_type == "ADM") {
        this.initail_current.Username = obj.account_user;
        this.initail_current.Usertype = obj.account_type;
        console.log(obj)
        this.initail_current.PolMenu_Code = obj.polmenu_code;
        this.doLoadYear(this.comselected.company_code)
        return
      }
      // else {
      //   localStorage.setItem(AppConfig.SESSIONInitial, this.initail_current.doGetJSONInitialCurrent());
      //   if (this.initail_current.Token) {
      //     window.location.href = "";
      //     // this.router.navigateByUrl('');
      //   }
      // }
      if (obj.account_type == "SADM") {
        this.initail_current.Username = obj.account_user;
        this.initail_current.Usertype = obj.account_type;
        this.initail_current.PolMenu_Code = 'HR1';
        localStorage.setItem(AppConfig.SESSIONInitial, this.initail_current.doGetJSONInitialCurrent());
        if (this.initail_current.Token) {
          window.location.href = "";
          // this.router.navigateByUrl('');
        }
        return
      }
      // if (this.initail_current.Token) {
      //   window.location.href = "";
      //   // this.router.navigateByUrl('');
      // }
    }
    );

  }
  selectcom() {

  }
  selectEmptype() {
    this.doPeriod(this.comselected.company_code)
  }
  selectyear() {
    // console.log(this.yearperiods_select.year_code)
    this.doPeriod(this.comselected.company_code);
  }
  selectperiod() {
    // console.log(this.periods_select.period_from)
  }
  changelang(lang: string) {
    this.selectlang = lang;
    if (lang == "TH") {
      this.comdis = "company_name_th";
      this.perioddis = "period_name_th"
      this.localdis = "th-TH";
    } else {
      this.comdis = "company_name_en";
      this.localdis = "en-US";
      this.perioddis = "period_name_en"
    }

  }
  selectuser() {
    this.initail_current.loading = true;
    this.initail_current.PR_Year = this.yearperiods_select.year_code;
    this.initail_current.PR_FromDate = new Date(this.periods_select.period_from);
    this.initail_current.PR_ToDate = new Date(this.periods_select.period_to);
    this.initail_current.PR_PayDate = new Date(this.periods_select.period_payment);
    this.initail_current.PR_Enable = this.periods_select.period_dayonperiod == "1" ? true : false;
    this.initail_current.EmpType = this.emp_type;

    this.initail_current.TA_Enable = this.periods_select.period_dayonperiod == "1" ? true : false;
    this.initail_current.TA_FromDate = new Date(this.periods_select.period_from);
    this.initail_current.TA_ToDate = new Date(this.periods_select.period_to);
    localStorage.setItem(AppConfig.SESSIONInitial, this.initail_current.doGetJSONInitialCurrent());
    this.initail_current.loading = false;
    if (this.initail_current.Token) {
      window.location.href = "";
      // this.router.navigateByUrl('');
    }
    // this.initail_current.Username = this.selectaccount.worker_code;
    // this.initail_current.Usertype = this.selectaccount.account_type;
    // localStorage.setItem(AppConfig.SESSIONInitial, this.initail_current.doGetJSONInitialCurrent());
    // if (this.initail_current.Token) {
    //   window.location.href = "";
    //   // this.router.navigateByUrl('');
    // }
  }
}

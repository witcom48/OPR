import { Component, OnInit } from '@angular/core';
import { AppConfig } from '../../../../config/config';
import { InitialCurrent } from '../../../../config/initial_current';

@Component({
  selector: 'app-sys-manage',
  templateUrl: './sys-manage.component.html',
  styleUrls: ['./sys-manage.component.scss']
})
export class SysManageComponent implements OnInit {

    router: any;

    constructor() { }
  
    ngOnInit(): void {
      this.doGetInitialCurrent();
  
      setTimeout(() => {
          this.doLoadLanguage();
      }, 500);
  }
  
  public initial_current: InitialCurrent = new InitialCurrent();
      doGetInitialCurrent() {
          this.initial_current = JSON.parse(
              localStorage.getItem(AppConfig.SESSIONInitial) || '{}'
          );
          if (!this.initial_current) {
              this.router.navigateByUrl('login');
          }
      }
      title_system_manage: string = 'System Manage';
      title_links: string = 'Links';
      title_manage: string = 'Manage';
      title_company: string = 'Company';
      title_branch : string = 'Branch';
      title_reason: string = 'Reason';
      title_structure_code: string = 'Structure Code';
      title_year_period: string = 'Year Period';
      title_rounding: string = 'Rounding';
      title_round_decimal: string = 'Round Decimal';
      title_round_time: string = 'Round Time';
      
      doLoadLanguage() {
          if (this.initial_current.Language == 'TH') {
              this.title_system_manage= 'System Manage';
              this.title_links= 'ลิงค์';
              this.title_manage= 'จัดการ';
              this.title_company= 'ข้อมูลบริษัท';
              this.title_branch= 'ข้อมูลสาขา';
              this.title_reason= 'เหตุผล';
              this.title_structure_code= 'โครงสร้างรหัสพนักงาน';
              this.title_year_period= 'งวดปี';
              this.title_rounding= 'การปัดเศษ';
              this.title_round_decimal= 'ทศนิยม';
              this.title_round_time= 'รอบเวลา';

             
   
          }
      }
  }
  
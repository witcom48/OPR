import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { AppConfig } from 'src/app/config/config';
import { AccessdataModel } from 'src/app/models/system/security/accessdata';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { ConfirmationService, MessageService, } from 'primeng/api';
import { InitialCurrent } from 'src/app/config/initial_current';

@Component({
  selector: 'app-setpol',
  templateUrl: './setpol.component.html',
  styleUrls: ['./setpol.component.scss']
})
export class SetpolComponent implements OnInit {

  itemslike: MenuItem[] = [];
  home: any;
  selectlang: string = "EN";


  title_system_payroll: { [key: string]: string } = { EN: "Policy Payroll ", TH: "นโยบาย" }
  title_Personal_Income_Tax: { [key: string]: string } = { EN: "Personal Income Tax ", TH: "กำหนดค่าภาษีเงินได้บุคคลธรรมดา" }
  title_reduces: { [key: string]: string } = { EN: "Reduces ", TH: "ค่าลดหย่อน" }
  title_taxrate: { [key: string]: string } = { EN: "Taxrate ", TH: "อัตราภาษี" }

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
    this.doGetInitialCurrent();
    this.doLoadMenu();
  }

  initialData2: InitialCurrent = new InitialCurrent();
  accessData: AccessdataModel = new AccessdataModel();
  public initial_current: InitialCurrent = new InitialCurrent();
  doGetInitialCurrent() {
    this.initial_current = JSON.parse(localStorage.getItem(AppConfig.SESSIONInitial) || '{}');
    if (!this.initial_current) {
      this.router.navigateByUrl('login');
    }
    this.accessData = this.initialData2.dotGetPolmenu('EMP');
  }

  doLoadMenu() {
    this.itemslike = [{ label: this.title_system_payroll[this.initial_current.Language], routerLink: '/payroll/policy' }, {
      label: this.title_Personal_Income_Tax[this.initial_current.Language], styleClass: 'activelike'
    }];
    this.home = { icon: 'pi pi-home', routerLink: '/' };
  }

}


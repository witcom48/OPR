import { Component, OnInit } from '@angular/core';
import {  MenuItem } from 'primeng/api';
import { AppConfig } from 'src/app/config/config';
import { InitialCurrent } from 'src/app/config/initial_current';
import { AccessdataModel } from 'src/app/models/system/security/accessdata';
@Component({
  selector: 'app-setpol',
  templateUrl: './setpol.component.html',
  styleUrls: ['./setpol.component.scss']
})
export class SetpolComponent implements OnInit {
  home: any;
  itemslike: MenuItem[] = [];
  router: any;
  constructor() { }
  public initial_current: InitialCurrent = new InitialCurrent();
    initialData2: InitialCurrent = new InitialCurrent();
    accessData: AccessdataModel = new AccessdataModel();
    doGetInitialCurrent() {
        this.initial_current = JSON.parse(
            localStorage.getItem(AppConfig.SESSIONInitial) || '{}'
        );
        if (!this.initial_current) {
            this.router.navigateByUrl('login');
        }
        this.accessData = this.initialData2.dotGetPolmenu('PAY');
    }
  title_system_payroll: { [key: string]: string } = { EN: "Policy Payroll ", TH: "นโยบาย" }
  title_page: { [key: string]: string } = { EN: "กำหนดภาษีเงินได้บุคคลธรรมดา ", TH: "กำหนดภาษีเงินได้บุคคลธรรมดา" }

  ngOnInit(): void {
    this.itemslike = [{ label: this.title_system_payroll[this.initial_current.Language], routerLink: '/payroll/policy' },
        { label: this.title_page[this.initial_current.Language], styleClass: 'activelike' }];
        this.home = { icon: 'pi pi-home', routerLink: '/' };
    }
  }

  

 

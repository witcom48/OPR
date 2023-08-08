import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { AppConfig } from 'src/app/config/config';
import { InitialCurrent } from 'src/app/config/initial_current';
import { AccessdataModel } from 'src/app/models/system/security/accessdata';
declare var reason: any;
@Component({
  selector: 'app-system-reason',
  templateUrl: './system-reason.component.html',
  styleUrls: ['./system-reason.component.scss']
})
export class SystemReasonComponent implements OnInit {
  langs: any = reason;
  itemslike: MenuItem[] = [];
  home: any;
  selectlang: string = "EN"
  constructor(
    private router: Router,
  ) { }
  public initial_current: InitialCurrent = new InitialCurrent();
    initialData2: InitialCurrent = new InitialCurrent();
    accessData: AccessdataModel = new AccessdataModel();
  doGetInitialCurrent() {
    this.initial_current = JSON.parse(localStorage.getItem(AppConfig.SESSIONInitial) || '{}');
    if (!this.initial_current.Token) {
      this.router.navigateByUrl('login');
    }
            this.accessData = this.initialData2.dotGetPolmenu('SYS');

    this.selectlang = this.initial_current.Language;
  }
  ngOnInit(): void {
    this.doGetInitialCurrent();
    this.doLoadMenu();
  }
  doLoadMenu() {
    this.itemslike = [{ label: this.langs.get('manage')[this.selectlang], routerLink: '/system/sys-manage' }, {
      label: this.langs.get('reason')[this.selectlang], styleClass: 'activelike'
    }];

    this.home = { icon: 'pi pi-home', routerLink: '/' };
  }
}

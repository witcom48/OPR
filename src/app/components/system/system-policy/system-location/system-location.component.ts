import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { AppConfig } from '../../../../config/config';
import { InitialCurrent } from '../../../../config/initial_current';
import { MenuItem } from 'primeng/api';
import { AccessdataModel } from 'src/app/models/system/security/accessdata';
declare var locationpage: any;

@Component({
  selector: 'app-system-location',
  templateUrl: './system-location.component.html',
  styleUrls: ['./system-location.component.scss']
})
export class SystemLocationComponent implements OnInit {
  itemslike: MenuItem[] = [];
  home: any;
  langs: any = locationpage;
  selectlang: string = "EN";
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
    this.itemslike = [{ label: this.langs.get('system')[this.selectlang], routerLink: '/system/general' }, {
      label: this.langs.get('location')[this.selectlang], styleClass: 'activelike'
    }];

    this.home = { icon: 'pi pi-home', routerLink: '/' };
  }
 
}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { AppConfig } from 'src/app/config/config';
import { InitialCurrent } from 'src/app/config/initial_current';
declare var yearperiod: any;
@Component({
  selector: 'app-yearperiod',
  templateUrl: './yearperiod.component.html',
  styleUrls: ['./yearperiod.component.scss']
})
export class YearperiodComponent implements OnInit {
  langs: any = yearperiod;
  selectlang: string = "EN";
  itemslike: MenuItem[] = [];
  home: any;
  constructor(
    private router: Router,
  ) { }
  public initial_current: InitialCurrent = new InitialCurrent();
  doGetInitialCurrent() {
    this.initial_current = JSON.parse(localStorage.getItem(AppConfig.SESSIONInitial) || '{}');
    if (!this.initial_current.Token) {
      this.router.navigateByUrl('login');
    }
    this.selectlang = this.initial_current.Language;
    this.itemslike = [{ label: this.langs.get('title')[this.selectlang], routerLink: '/attendance/policy' }, {
      label: this.langs.get('yearperiod')[this.selectlang], styleClass: 'activelike'
    }];

    this.home = { icon: 'pi pi-home', routerLink: '/' };
  }

  ngOnInit(): void {
    this.doGetInitialCurrent();
  }

}

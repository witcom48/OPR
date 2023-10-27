import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { AppConfig } from 'src/app/config/config';
import { InitialCurrent } from 'src/app/config/initial_current';
declare var shfit: any;

@Component({
  selector: 'app-attendance-shift',
  templateUrl: './attendance-shift.component.html',
  styleUrls: ['./attendance-shift.component.scss']
})
export class AttendanceShiftComponent implements OnInit {
  langs: any = shfit;
  selectlang: string = "EN";
  constructor(
    private router: Router,
  ) { }
  itemslike: MenuItem[] = [];
  home: any;
  public initial_current: InitialCurrent = new InitialCurrent();
  doGetInitialCurrent() {
    this.initial_current = JSON.parse(localStorage.getItem(AppConfig.SESSIONInitial) || '{}');
    if (!this.initial_current.Token) {
      this.router.navigateByUrl('login');
    }
    this.selectlang = this.initial_current.Language;
    this.itemslike = [{ label: this.langs.get('title')[this.selectlang], routerLink: '/attendance/policy' }, {
      label: this.langs.get('shfits')[this.selectlang], styleClass: 'activelike'
    }];
    this.home = { icon: 'pi pi-home', routerLink: '/' };
  }
  ngOnInit(): void {
    this.doGetInitialCurrent();
  }
}

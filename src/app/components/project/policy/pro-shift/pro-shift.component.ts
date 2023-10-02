import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { AppConfig } from 'src/app/config/config';
import { InitialCurrent } from 'src/app/config/initial_current';

@Component({
  selector: 'app-pro-shift',
  templateUrl: './pro-shift.component.html',
  styleUrls: ['./pro-shift.component.scss']
})
export class ProShiftComponent implements OnInit {
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
    this.itemslike = [{ label: 'Policy project', routerLink: '/project/policy' }, {
      label: 'Shift', styleClass: 'activelike'
    }];
    this.home = { icon: 'pi pi-home', routerLink: '/' };
  }
  ngOnInit(): void {
    this.doGetInitialCurrent();
  }
}
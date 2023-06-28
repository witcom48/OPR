
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PrimeNGConfig } from 'primeng/api';
import { AppConfig } from 'src/app/config/config';
import { InitialCurrent } from 'src/app/config/initial_current';
declare var yearperiod: any;
declare var langcalendarth: any;
declare var langcalendaren: any;

declare var reason: any;
interface Type { name: string, code: string }
@Component({
  selector: 'app-system-yearperiod',
  templateUrl: './system-yearperiod.component.html',
  styleUrls: ['./system-yearperiod.component.scss']
})
export class SystemYearperiodComponent implements OnInit {

  langs: any = yearperiod;
  selectlang: string = "EN";
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
  }
  ngOnInit(): void {
    this.doGetInitialCurrent();
  }
}

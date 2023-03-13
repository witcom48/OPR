import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
  constructor(
    private router: Router,
  ) { }
  public initial_current: InitialCurrent = new InitialCurrent();
  doGetInitialCurrent() {
    this.initial_current = JSON.parse(localStorage.getItem(AppConfig.SESSIONInitial) || '{}');
    if (!this.initial_current.Token) {
      this.router.navigateByUrl('');
    }
    this.selectlang = this.initial_current.Language;
  }

  ngOnInit(): void {
    this.doGetInitialCurrent();
  }

}

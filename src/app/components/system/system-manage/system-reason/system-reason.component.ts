import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppConfig } from 'src/app/config/config';
import { InitialCurrent } from 'src/app/config/initial_current';
declare var reason: any;
@Component({
  selector: 'app-system-reason',
  templateUrl: './system-reason.component.html',
  styleUrls: ['./system-reason.component.scss']
})
export class SystemReasonComponent implements OnInit {
  langs: any = reason;
  selectlang: string = "EN"
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

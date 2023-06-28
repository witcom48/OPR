import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppConfig } from 'src/app/config/config';
import { InitialCurrent } from 'src/app/config/initial_current';
declare var locationpage: any;
@Component({
  selector: 'app-attendance-location',
  templateUrl: './attendance-location.component.html',
  styleUrls: ['./attendance-location.component.scss']
})
export class AttendanceLocationComponent implements OnInit {
  langs: any = locationpage;
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

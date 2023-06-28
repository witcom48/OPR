import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { AppConfig } from '../../../../config/config';
import { InitialCurrent } from '../../../../config/initial_current';
declare var locationpage: any;

@Component({
  selector: 'app-system-location',
  templateUrl: './system-location.component.html',
  styleUrls: ['./system-location.component.scss']
})
export class SystemLocationComponent implements OnInit {

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

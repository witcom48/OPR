import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppConfig } from 'src/app/config/config';
import { InitialCurrent } from 'src/app/config/initial_current';

@Component({
  selector: 'app-employee-location',
  templateUrl: './employee-location.component.html',
  styleUrls: ['./employee-location.component.scss']
})
export class EmployeeLocationComponent implements OnInit {

  title_emp: { [key: string]: string } = { EN: "Employee", TH: "พนักงาน" };
  title_policy: { [key: string]: string } = { EN: "Policy", TH: "นโยบาย" };
  title_location: { [key: string]: string } = { EN: "Location", TH: "สถานที่ปฎิบัติงาน" };

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
    this.doGetInitialCurrent();
  }

  public initial_current: InitialCurrent = new InitialCurrent();
  doGetInitialCurrent() {
    this.initial_current = JSON.parse(localStorage.getItem(AppConfig.SESSIONInitial) || '{}');
    if (!this.initial_current) {
      this.router.navigateByUrl('login');
    }
  }

}

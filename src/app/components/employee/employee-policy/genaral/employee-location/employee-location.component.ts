import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { AppConfig } from 'src/app/config/config';
import { InitialCurrent } from 'src/app/config/initial_current';
import { AccessdataModel } from 'src/app/models/system/security/accessdata';

@Component({
  selector: 'app-employee-location',
  templateUrl: './employee-location.component.html',
  styleUrls: ['./employee-location.component.scss']
})
export class EmployeeLocationComponent implements OnInit {

  itemslike: MenuItem[] = [];
  home: any;

  title_emp: { [key: string]: string } = { EN: "Employee", TH: "พนักงาน" };
  title_policy: { [key: string]: string } = { EN: "Policy", TH: "นโยบาย" };
  title_location: { [key: string]: string } = { EN: "Location", TH: "สถานที่ปฎิบัติงาน" };

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
    this.doGetInitialCurrent();
    this.doLoadMenu();
  }

  initialData2: InitialCurrent = new InitialCurrent();
  accessData: AccessdataModel = new AccessdataModel();
  public initial_current: InitialCurrent = new InitialCurrent();
  doGetInitialCurrent() {
    this.initial_current = JSON.parse(localStorage.getItem(AppConfig.SESSIONInitial) || '{}');
    if (!this.initial_current) {
      this.router.navigateByUrl('login');
    }
    this.accessData = this.initialData2.dotGetPolmenu('EMP');

  }

  doLoadMenu() {
    this.itemslike = [{ label: this.title_emp[this.initial_current.Language], routerLink: '/employee/policy' }, {
      label: this.title_location[this.initial_current.Language], styleClass: 'activelike'
    }];

    this.home = { icon: 'pi pi-home', routerLink: '/' };
  }

}

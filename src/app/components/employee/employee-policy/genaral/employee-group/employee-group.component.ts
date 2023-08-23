import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { AppConfig } from 'src/app/config/config';
import { InitialCurrent } from 'src/app/config/initial_current';
import { AccessdataModel } from 'src/app/models/system/security/accessdata';

@Component({
  selector: 'app-employee-group',
  templateUrl: './employee-group.component.html',
  styleUrls: ['./employee-group.component.scss']
})
export class EmployeeGroupComponent implements OnInit {

  itemslike: MenuItem[] = [];
  home: any;
  selectlang: string = "EN";

  title_emp: { [key: string]: string } = { EN: "Employee", TH: "พนักงาน" };
  title_policy: { [key: string]: string } = { EN: "Policy", TH: "นโยบาย" };
  title_group: { [key: string]: string } = { EN: "Group", TH: "กลุ่มพนักงาน" };

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
      label: this.title_group[this.initial_current.Language], styleClass: 'activelike'
    }];

    this.home = { icon: 'pi pi-home', routerLink: '/' };
  }

}

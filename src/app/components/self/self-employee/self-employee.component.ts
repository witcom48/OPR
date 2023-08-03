import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { AppConfig } from 'src/app/config/config';
import { InitialCurrent } from 'src/app/config/initial_current';
import { AccessdataModel } from 'src/app/models/system/security/accessdata';
interface Menu {
  title: string;
  link: string;
  accessCode: string;
}
@Component({
  selector: 'app-self-employee',
  templateUrl: './self-employee.component.html',
  styleUrls: ['./self-employee.component.scss']
})
export class SelfEmployeeComponent implements OnInit {
  mainMenuItems: MenuItem[] = [{ label: 'Employee', routerLink: '/self/employee', styleClass: 'activelike' }];
  homeIcon: any = { icon: 'pi pi-home', routerLink: '/' };
  requestMenuItems: Menu[] = [];
  pdpaMenuItems: Menu[] = [];

  requestMenuList: Menu[] = [
    {
      title: 'Leave',
      link: 'req_leave',
      accessCode: 'SELF001-001'
    },
    {
      title: 'Shift',
      link: 'req_shift',
      accessCode: 'SELF001-002'
    },
    {
      title: 'Overtime',
      link: 'req_overtime',
      accessCode: 'SELF001-003'
    },
    {
      title: 'Daytype',
      link: 'req_daytype',
      accessCode: 'SELF001-004'
    },
    {
      title: 'Punchcard',
      link: 'req_record',
      accessCode: 'SELF001-005'
    },
    {
      title: 'Check IN/OUT',
      link: 'req_checkin',
      accessCode: 'SELF001-006'
    },
    {
      title: 'Req doc',
      link: 'req_reqdoc',
      accessCode: 'SELF001-007'
    },
    // ... other approval menu items ...
  ];

  pdpaMenuList: Menu[] = [
    {
      title: 'Consent',
      link: 'empconsent',
      accessCode: 'SELF001-008'
    },
    // ... other setup menu items ...
  ];

  constructor(
    private router: Router,
  ) { }

  selectedLanguage: string = 'EN';
  initialData: InitialCurrent = new InitialCurrent();
  initialData2: InitialCurrent = new InitialCurrent();
  accessData: AccessdataModel = new AccessdataModel();

  ngOnInit(): void {
    this.loadInitialData();
  }

  loadInitialData(): void {
    this.initialData = JSON.parse(localStorage.getItem(AppConfig.SESSIONInitial) || '{}');
    if (!this.initialData.Token) {
      this.router.navigateByUrl('login');
    }
    this.selectedLanguage = this.initialData.Language;
    this.setMenus();
  }

  setMenus() {
    if (this.initialData.PolMenu_Code) {
      this.accessData = this.initialData2.dotGetPolmenu(this.initialData.PolMenu, 'SELF');
      this.requestMenuItems = this.requestMenuList.filter(item => this.hasAccessMenu(item.accessCode));
      this.pdpaMenuItems = this.pdpaMenuList.filter(item => this.hasAccessMenu(item.accessCode));
    } else {
      this.pdpaMenuItems = this.pdpaMenuList;
      this.requestMenuItems = this.requestMenuList;
    }
  }

  private hasAccessMenu(accessCode: string): boolean {
    return this.accessData.accessmenu_data.some(item => item.accessmenu_code === accessCode);
  }
}

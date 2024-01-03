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
declare var selfemp: any;
@Component({
  selector: 'app-self-employee',
  templateUrl: './self-employee.component.html',
  styleUrls: ['./self-employee.component.scss']
})
export class SelfEmployeeComponent implements OnInit {
  mainMenuItems: MenuItem[] = [];
  homeIcon: any = { icon: 'pi pi-home', routerLink: '/' };
  requestMenuItems: Menu[] = [];
  pdpaMenuItems: Menu[] = [];

  requestMenuList: Menu[] = [
    {
      title: 'Leave',
      link: 'req_leave',
      accessCode: 'SELF001-001'
    },
    // {
    //   title: 'Shift',
    //   link: 'req_shift',
    //   accessCode: 'SELF001-002'
    // },
    {
      title: 'Overtime',
      link: 'req_overtime',
      accessCode: 'SELF001-003'
    },
    // {
    //   title: 'Daytype',
    //   link: 'req_daytype',
    //   accessCode: 'SELF001-004'
    // },
    {
      title: 'Punchcard',
      link: 'req_record',
      accessCode: 'SELF001-005'
    },
    // {
    //   title: 'Check IN/OUT',
    //   link: 'req_checkin',
    //   accessCode: 'SELF001-006'
    // },
    // {
    //   title: 'Req doc',
    //   link: 'req_reqdoc',
    //   accessCode: 'SELF001-007'
    // },
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
  langs: any = selfemp;
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
    this.mainMenuItems = [{ label: this.langs.get('employee')[this.selectedLanguage], routerLink: '/self/employee', styleClass: 'activelike' }];
    this.pdpaMenuList = [
      {
        title: this.langs.get('consent')[this.selectedLanguage],
        link: 'empconsent',
        accessCode: 'SELF001-008'
      },
    ]
    this.requestMenuList = [{
      title: this.langs.get('leave')[this.selectedLanguage],
      link: 'req_leave',
      accessCode: 'SELF001-001'
    },
    // {
    //   title: this.langs.get('shift')[this.selectedLanguage],
    //   link: 'req_shift',
    //   accessCode: 'SELF001-002'
    // },
    {
      title: this.langs.get('ot')[this.selectedLanguage],
      link: 'req_overtime',
      accessCode: 'SELF001-003'
    },
    // {
    //   title: this.langs.get('daytype')[this.selectedLanguage],
    //   link: 'req_daytype',
    //   accessCode: 'SELF001-004'
    // },
    {
      title: this.langs.get('punchcard')[this.selectedLanguage],
      link: 'req_record',
      accessCode: 'SELF001-005'
    },
      // {
      //   title: this.langs.get('checkin')[this.selectedLanguage],
      //   link: 'req_checkin',
      //   accessCode: 'SELF001-006'
      // },
      // {
      //   title: this.langs.get('reqdoc')[this.selectedLanguage],
      //   link: 'req_reqdoc',
      //   accessCode: 'SELF001-007'
      // },
    ]
    this.setMenus();
  }

  setMenus() {
    if (this.initialData.PolMenu_Code) {
      this.accessData = this.initialData2.dotGetPolmenu('SELF');
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

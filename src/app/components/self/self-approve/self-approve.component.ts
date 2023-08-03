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
  selector: 'app-self-approve',
  templateUrl: './self-approve.component.html',
  styleUrls: ['./self-approve.component.scss']
})
export class SelfApproveComponent implements OnInit {
  mainMenuItems: MenuItem[] = [{ label: 'Self Services', routerLink: '/self/approve', styleClass: 'activelike' }];
  homeIcon: any = { icon: 'pi pi-home', routerLink: '/' };
  approvalMenuItems: Menu[] = [];
  setupMenuItems: Menu[] = [];

  approvalMenuList: Menu[] = [
    {
      title: 'Leave',
      link: 'approve_leave',
      accessCode: 'SELF002-001'
    },
    {
      title: 'Shift',
      link: 'approve_shift',
      accessCode: 'SELF002-002'
    },
    {
      title: 'Overtime',
      link: 'approve_overtime',
      accessCode: 'SELF002-003'
    },
    {
      title: 'Daytype',
      link: 'approve_daytype',
      accessCode: 'SELF002-004'
    },
    {
      title: 'Punchcard',
      link: 'approve_record',
      accessCode: 'SELF002-005'
    },
    {
      title: 'Check IN/OUT',
      link: 'approve_checkin',
      accessCode: 'SELF002-006'
    },
    {
      title: 'Req doc',
      link: 'approve_reqdoc',
      accessCode: 'SELF002-007'
    },
    // ... other approval menu items ...
  ];

  setupMenuList: Menu[] = [
    {
      title: 'Account',
      link: 'account',
      accessCode: 'SELF002-008'
    },
    {
      title: 'Workflow',
      link: 'workflow',
      accessCode: 'SELF002-009'
    },
    {
      title: 'Area',
      link: 'area',
      accessCode: 'SELF002-010'
    },
    {
      title: 'Topic',
      link: 'topic',
      accessCode: 'SELF002-011'
    },
    {
      title: 'Consent',
      link: 'consent',
      accessCode: 'SELF002-012'
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
    this.accessData = this.initialData2.dotGetPolmenu(this.initialData.PolMenu, 'SELF');

    this.approvalMenuItems = this.approvalMenuList.filter(item => this.hasAccessMenu(item.accessCode));
    this.setupMenuItems = this.setupMenuList.filter(item => this.hasAccessMenu(item.accessCode));
  }

  private hasAccessMenu(accessCode: string): boolean {
    return this.accessData.accessmenu_data.some(item => item.accessmenu_code === accessCode);
  }
}

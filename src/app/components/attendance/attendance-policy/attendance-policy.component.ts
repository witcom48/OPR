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
  selector: 'app-attendance-policy',
  templateUrl: './attendance-policy.component.html',
  styleUrls: ['./attendance-policy.component.scss']
})
export class AttendancePolicyComponent implements OnInit {
  mainMenuItems: MenuItem[] = [{ label: 'Attendance', routerLink: '/attendance/policy', styleClass: 'activelike' }];
  homeIcon: any = { icon: 'pi pi-home', routerLink: '/' };
  genaralMenuItems: Menu[] = [];
  policyMenuItems: Menu[] = [];
  setpolicyMenuItems: Menu[] = [];

  genaralMenuList: Menu[] = [
    {
      title: 'Year Period',
      link: 'yearperiod',
      accessCode: 'ATT001-001'
    },
    {
      title: 'Reason',
      link: 'reason',
      accessCode: 'ATT001-002'
    },
    {
      title: 'Location',
      link: 'location',
      accessCode: 'ATT001-003'
    },
    // ... other approval menu items ...
  ];

  policyMenuList: Menu[] = [
    {
      title: 'Holiday',
      link: 'holiday',
      accessCode: 'ATT001-004'
    },
    {
      title: 'Shift',
      link: 'shift',
      accessCode: 'ATT001-005'
    },
    {
      title: 'Shift plan',
      link: 'shiftplan',
      accessCode: 'ATT001-006'
    },
    {
      title: 'Leave',
      link: 'leave',
      accessCode: 'ATT001-007'
    },
    {
      title: 'Leave plan',
      link: 'leaveplan',
      accessCode: 'ATT001-008'
    },
    {
      title: 'Overtime',
      link: 'overtime',
      accessCode: 'ATT001-009'
    },
    {
      title: 'Diligence',
      link: 'diligence',
      accessCode: 'ATT001-010'
    },
    {
      title: 'Late',
      link: 'late',
      accessCode: 'ATT001-011'
    },
    {
      title: 'Time Allowance',
      link: 'timeallowance',
      accessCode: 'ATT001-012'
    },
    // ... other setup menu items ...
  ];
  setpolicyMenuList: Menu[] = [
    {
      title: 'Set Policy',
      link: 'setallpolicy',
      accessCode: 'ATT001-013'
    },
    {
      title: 'Set Deduction Income code',
      link: 'setattpay',
      accessCode: 'ATT001-014'
    }
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
    this.accessData = this.initialData2.dotGetPolmenu('ATT');

    this.genaralMenuItems = this.genaralMenuList.filter(item => this.hasAccessMenu(item.accessCode));
    this.policyMenuItems = this.policyMenuList.filter(item => this.hasAccessMenu(item.accessCode));
    this.setpolicyMenuItems = this.setpolicyMenuList.filter(item => this.hasAccessMenu(item.accessCode));
  }

  private hasAccessMenu(accessCode: string): boolean {
    return this.accessData.accessmenu_data.some(item => item.accessmenu_code === accessCode);
  }

}

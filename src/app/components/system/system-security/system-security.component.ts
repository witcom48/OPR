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
  selector: 'app-system-security',
  templateUrl: './system-security.component.html',
  styleUrls: ['./system-security.component.scss']
})
export class SystemSecurityComponent implements OnInit {
  mainMenuItems: MenuItem[] = [{ label: 'Security system', routerLink: '/system/security', styleClass: 'activelike' }];
  homeIcon: any = { icon: 'pi pi-home', routerLink: '/' };
  securityMenuItems: Menu[] = [];

  securityMenuList: Menu[] = [
    {
      title: 'Menu',
      link: 'menu',
      accessCode: 'SYS003-001'
    },
    {
      title: 'Account',
      link: 'account',
      accessCode: 'SYS003-002'
    },
    {
      title: 'Workflow',
      link: 'workflow',
      accessCode: 'SYS003-003'
    },
    {
      title: 'Allow IP/Port',
      link: '',
      accessCode: 'SYS003-004'
    },
    {
      title: 'Change password',
      link: '',
      accessCode: 'SYS003-005'
    },
    // ... other approval menu items ...
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
    this.accessData = this.initialData2.dotGetPolmenu('SYS');
    this.securityMenuItems = this.securityMenuList.filter(item => this.hasAccessMenu(item.accessCode));
  }

  private hasAccessMenu(accessCode: string): boolean {
    return this.accessData.accessmenu_data.some(item => item.accessmenu_code === accessCode);
  }

}

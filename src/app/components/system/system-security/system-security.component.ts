import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, MenuItem, MessageService } from 'primeng/api';
import { AppConfig } from 'src/app/config/config';
import { InitialCurrent } from 'src/app/config/initial_current';
import { AccessdataModel } from 'src/app/models/system/security/accessdata';
import { CourseService } from 'src/app/services/system/policy/course.service';
declare var planshift: any;
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
  // mainMenuItems: MenuItem[] = [{ label: 'Security system', routerLink: '/system/security', styleClass: 'activelike' }];
  homeIcon: any = { icon: 'pi pi-home', routerLink: '/' };
  securityMenuItems: Menu[] = [];
  mainMenuItems: MenuItem[] = [];
  langs: any = planshift;

  constructor(
    private router: Router,
  ) { }
  selectedLanguage: string = 'EN';
  initialData: InitialCurrent = new InitialCurrent();
  initialData2: InitialCurrent = new InitialCurrent();
  accessData: AccessdataModel = new AccessdataModel();

  title_security: { [key: string]: string } = { EN: "Security", TH: "การรักษาความปลอดภัย" };
  title_menu: { [key: string]: string } = { EN: "Menu", TH: "บทบาทการเข้าถึง" };
  title_account: { [key: string]: string } = { EN: "Account", TH: "บัญชีผู้ใช้งาน" };
  title_allow: { [key: string]: string } = { EN: "Allow IP/Port", TH: "การเข้าถึง IP/PORT" };
  title_change: { [key: string]: string } = { EN: "Change password", TH: "เปลี่ยนรหัสผ่าน" };


  ngOnInit(): void {
    this.loadInitialData();
  }

  loadInitialData(): void {
    this.initialData = JSON.parse(localStorage.getItem(AppConfig.SESSIONInitial) || '{}');
    if (!this.initialData.Token) {
      this.router.navigateByUrl('login');
    }
    this.selectedLanguage = this.initialData.Language;

    this.securityMenuItems = [
      {
        // title: 'Menu',
        title: this.title_menu[this.initialData.Language],
        link: 'menu',
        accessCode: 'SYS003-001'

      },
      {
        // title: 'Account',
        title: this.title_account[this.initialData.Language],
        link: 'account',
        accessCode: 'SYS003-002'
      },
      {
        title: 'Workflow',
        link: 'workflow',
        accessCode: 'SYS003-003'
      },
      {
        // title: 'Allow IP/Port',
        title: this.title_allow[this.initialData.Language],
        link: '',
        accessCode: 'SYS003-004'
      },
      {
        // title: 'Change password',
        title: this.title_change[this.initialData.Language],
        link: '',
        accessCode: 'SYS003-005'
      },
    ];
    this.mainMenuItems = [{ label: this.title_security[this.initialData.Language], routerLink: '/system/security', styleClass: 'activelike' }],
      // ... other approval menu items ...
      this.setMenus();
  }

  setMenus() {
    this.accessData = this.initialData2.dotGetPolmenu('SYS');
    this.securityMenuItems = this.securityMenuItems.filter(item => this.hasAccessMenu(item.accessCode));

  }
  private hasAccessMenu(accessCode: string): boolean {
    return this.accessData.accessmenu_data.some(item => item.accessmenu_code === accessCode);
  }
}

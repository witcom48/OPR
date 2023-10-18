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
  selector: 'app-payroll-transfer',
  templateUrl: './payroll-transfer.component.html',
  styleUrls: ['./payroll-transfer.component.scss']
})
export class PayrollTransferComponent implements OnInit {
  mainMenuItems: MenuItem[] = [{ label: 'Transfer payroll', routerLink: '/payroll/transfer', styleClass: 'activelike' }];
  homeIcon: any = { icon: 'pi pi-home', routerLink: '/' };
  transferdataMenuItems: Menu[] = [];
  transferdataMenuList: Menu[] = [
    {
      title: 'Bank',
      link: 'transferbank',
      accessCode: 'PAY007-001'
    },
    {
      title: 'Tax',
      link: 'transfertax',
      accessCode: 'PAY007-002'
    },
    {
      title: 'Bonus',
      link: 'transferbonus',
      accessCode: 'PAY007-003'
    },
    {
      title: 'ประกันสังคม',
      link: 'transfersso',
      accessCode: 'PAY007-004'
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
    this.accessData = this.initialData2.dotGetPolmenu('PAY');
    this.transferdataMenuItems = this.transferdataMenuList.filter(item => this.hasAccessMenu(item.accessCode));
  }

  private hasAccessMenu(accessCode: string): boolean {
    return this.accessData.accessmenu_data.some(item => item.accessmenu_code === accessCode);
  }
}

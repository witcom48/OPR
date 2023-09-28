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
  queryParamsdata: any;
}
@Component({
  selector: 'app-project-policy',
  templateUrl: './project-policy.component.html',
  styleUrls: ['./project-policy.component.scss']
})
export class ProjectPolicyComponent implements OnInit {
  mainMenuItems: MenuItem[] = [{ label: 'Policy project', routerLink: 'project/policy', styleClass: 'activelike' }];
  homeIcon: any = { icon: 'pi pi-home', routerLink: '/' };
  genaralMenuItems: Menu[] = [];
  workflowMenuItems: Menu[] = [];

  genaralMenuList: Menu[] = [
    {
      title: 'Cost',
      link: 'pro_genaral',
      accessCode: 'PRO001-001',
      queryParamsdata: "procost"
    },
    {
      title: 'Project Type',
      link: 'pro_genaral',
      accessCode: 'PRO001-002',
      queryParamsdata: "protype"
    },
    {
      title: 'Project Business',
      link: 'pro_genaral',
      accessCode: 'PRO001-003',
      queryParamsdata: "probusiness"
    },
    {
      title: 'Uniform',
      link: 'pro_genaral',
      accessCode: 'PRO001-004',
      queryParamsdata: "prouniform"
    },
    {
      title: 'Slip form',
      link: 'pro_genaral',
      accessCode: 'PRO001-005',
      queryParamsdata: "proslip"
    },
    {
      title: 'Area',
      link: 'pro_genaral',
      accessCode: 'PRO001-006',
      queryParamsdata: "proarea"
    },
    {
      title: 'Group',
      link: 'pro_genaral',
      accessCode: 'PRO001-007',
      queryParamsdata: "progroup"
    },
    {
      title: 'Equipment Type',
      link: 'pro_genaral',
      accessCode: 'PRO001-008',
      queryParamsdata: "proequipmenttype"
    },

    // ... other approval menu items ...
  ];

  workflowMenuList: Menu[] = [
    {
      title: 'Project',
      link: 'workflow',
      accessCode: 'PRO001-009',
      queryParamsdata: ''
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
    this.accessData = this.initialData2.dotGetPolmenu('PRO');
    this.genaralMenuItems = this.genaralMenuList.filter(item => this.hasAccessMenu(item.accessCode));
    this.workflowMenuItems = this.workflowMenuList.filter(item => this.hasAccessMenu(item.accessCode));
  }

  private hasAccessMenu(accessCode: string): boolean {
    return this.accessData.accessmenu_data.some(item => item.accessmenu_code === accessCode);
  }

}

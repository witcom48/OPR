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
  selector: 'app-recruitment-policy',
  templateUrl: './recruitment-policy.component.html',
  styleUrls: ['./recruitment-policy.component.scss']
})
export class RecruitmentPolicyComponent implements OnInit {
  title_req: { [key: string]: string } = { EN: "Recruitment", TH: "Recruitment" };
  //workflow
  title_blacklist: { [key: string]: string } = { EN: "Blacklist", TH: "Blacklist" };
  title_request: { [key: string]: string } = { EN: "Request", TH: "Request" };
  title_apply: { [key: string]: string } = { EN: "Apply work", TH: "Apply work" };
  title_approve: { [key: string]: string } = { EN: "Approve List", TH: "Approve List" };

  constructor(
    private router: Router
  ) { }
  ///
  selectedLanguage: string = 'EN';
  initialData: InitialCurrent = new InitialCurrent();
  initialData2: InitialCurrent = new InitialCurrent();
  accessData: AccessdataModel = new AccessdataModel();
  mainMenuItems: MenuItem[] = [{ label: this.title_req[this.initialData.Language], routerLink: '/recruitment/policy', styleClass: 'activelike' }];
  homeIcon: any = { icon: 'pi pi-home', routerLink: '/' };
  workflowMenuItems: Menu[] = [];

  ngOnInit(): void {
    this.loadInitialData();
  }

  loadInitialData(): void {
    this.initialData = JSON.parse(localStorage.getItem(AppConfig.SESSIONInitial) || '{}');
    
    this.mainMenuItems = [{ label: this.title_req[this.initialData.Language], routerLink: '/recruitment/policy', styleClass: 'activelike' }];
  }
}

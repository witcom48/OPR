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
  home: any;
  itemslike: MenuItem[] = [];
  public initial_current:InitialCurrent = new InitialCurrent();  
  doGetInitialCurrent(){    
    this.initial_current = JSON.parse(localStorage.getItem(AppConfig.SESSIONInitial) || '{}');
    if (!this.initial_current) {
      this.router.navigateByUrl('login');
    }       
  }

  doLoadLanguage(){
    if(this.initial_current.Language == "TH"){    

    }
  }
 
  mainMenuItems: MenuItem[] = [{ label: 'Transfer payroll', routerLink: '/payroll/transfer', styleClass: 'activelike' }];
  homeIcon: any = { icon: 'pi pi-home', routerLink: '/' };
  
  transferdataMenuItems: Menu[] = [];
  transferdataMenuList: Menu[] = [];

  constructor(
    private router: Router,
  ) { }

  selectedLanguage: string = 'EN';
  initialData: InitialCurrent = new InitialCurrent();
  initialData2: InitialCurrent = new InitialCurrent();
  accessData: AccessdataModel = new AccessdataModel();




 
  ngOnInit(): void {
    this.loadInitialData();
    this.itemslike = [{ label: this.title_transferdatal[this.initialData.Language], styleClass: 'activelike' }];
    this.home = { icon: 'pi pi-home', routerLink: '/' };
    
    
  }

  loadInitialData(): void {
    this.initialData = JSON.parse(localStorage.getItem(AppConfig.SESSIONInitial) || '{}');
    if (!this.initialData.Token) {
      this.router.navigateByUrl('login');
    }

    
    this.selectedLanguage = this.initialData.Language;
    

    this.transferdataMenuList  = [
      {
        title: this.title_transferbankl[this.initialData.Language] ,
        link: 'transferbank',
        accessCode: 'PAY007-001'
      },
      {
        title: this.title_transfertax[this.initialData.Language] ,
        link: 'transfertax',
        accessCode: 'PAY007-002'
      },
      {
        title: this.title_provident_fund[this.initialData.Language] ,
         link: 'transferprovident',
        accessCode: 'PAY007-003'
      },
      {
        title: this.title_transfersso[this.initialData.Language] ,
        link: 'transfersso',
        accessCode: 'PAY007-004'
      },
      // ... other setup menu items ...
    ];
    this.setMenus();
    this.mainMenuItems = [{ label: this.title_transferdatal[this.initialData.Language], routerLink: '/employee/policy', styleClass: 'activelike' }];

  }
  title_transferdatal: {[key: string]: string} = {  EN: " Transfer Data",  TH: "โอนย้ายข้อมูล"}  
  title_transferbankl: {[key: string]: string} = {  EN: " Bank",  TH: "โอนเงิน"}  
  title_transfertax: {[key: string]: string} = {  EN: " Tax",  TH: "โอนย้ายข้อมูลภาษี"}  
  title_transferbonus: {[key: string]: string} = {  EN: "Bonus",  TH: "โอนโบนัส"}  
  title_transfersso: {[key: string]: string} = {  EN: "Sso",  TH: "ประกันสังคม"} 
  
  title_provident_fund: {[key: string]: string} = {  EN: "Provident Fund",  TH: "กองทุนสำรองเลี้ยงชีพ"}  

  
  setMenus() {
    this.accessData = this.initialData2.dotGetPolmenu('PAY');
    this.transferdataMenuItems = this.transferdataMenuList.filter(item => this.hasAccessMenu(item.accessCode));
  }

  private hasAccessMenu(accessCode: string): boolean {
    return this.accessData.accessmenu_data.some(item => item.accessmenu_code === accessCode);
  }
}

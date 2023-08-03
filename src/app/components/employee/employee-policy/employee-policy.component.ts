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
  selector: 'app-employee-policy',
  templateUrl: './employee-policy.component.html',
  styleUrls: ['./employee-policy.component.scss']
})
export class EmployeePolicyComponent implements OnInit {

  title_emp: { [key: string]: string } = { EN: "Employee", TH: "พนักงาน" };

  //general
  title_general: { [key: string]: string } = { EN: "Genaral", TH: "ทั่วไป" };
  title_location: { [key: string]: string } = { EN: "Location", TH: "สถานที่ปฎิบัติงาน" };
  title_dep: { [key: string]: string } = { EN: "Organization", TH: "กำหนดสังกัด" };
  title_position: { [key: string]: string } = { EN: "Position", TH: "ตำแหน่งงาน" };
  title_group: { [key: string]: string } = { EN: "Group", TH: "กลุ่มพนักงาน" };
  title_initial: { [key: string]: string } = { EN: "Title Name", TH: "คำนำหน้าชื่อ" };
  title_emptype: { [key: string]: string } = { EN: "Employee Type", TH: "ประเภทพนักงาน" };
  title_empstatus: { [key: string]: string } = { EN: "Employee Status", TH: "สถานะพนักงาน" };

  //set batch
  title_setbatch: { [key: string]: string } = { EN: "Set Batch", TH: "กำหนดแบบกลุ่ม" }
  title_setdetail: { [key: string]: string } = { EN: "Employee Details", TH: "ข้อมูลอื่นๆ" };
  title_setassessment: { [key: string]: string } = { EN: "Appraisal", TH: "การประเมิน" };
  title_settraining: { [key: string]: string } = { EN: "Training", TH: "ฝึกอบรม" };
  title_setsalary: { [key: string]: string } = { EN: "Adjust Salary", TH: "ปรับเงินเดือน" };
  title_setlocation: { [key: string]: string } = { EN: "Location", TH: "สถานที่ปฎิบัติงาน" };
  title_setprovident: { [key: string]: string } = { EN: "Provident Fund", TH: "กองทุนฯ" };
  title_setbenefit: { [key: string]: string } = { EN: "Benefits", TH: "สวัสดิการ" };

  constructor(
    private router: Router
  ) { }

  // public ttt: string = "TH";
  // itemslike: MenuItem[] = [];
  // home: any;

  // ngOnInit(): void {
  //   this.doGetInitialCurrent();

  //   this.itemslike = [{ label: this.title_emp[this.initial_current.Language], routerLink: '/employee/policy', styleClass: 'activelike' }];

  //   this.home = { icon: 'pi pi-home', routerLink: '/' };
  // }

  // public initial_current: InitialCurrent = new InitialCurrent();
  // doGetInitialCurrent() {
  //   this.initial_current = JSON.parse(localStorage.getItem(AppConfig.SESSIONInitial) || '{}');
  //   if (!this.initial_current) {
  //     this.router.navigateByUrl('login');
  //   }
  // }
  selectedLanguage: string = 'EN';
  initialData: InitialCurrent = new InitialCurrent();
  initialData2: InitialCurrent = new InitialCurrent();
  accessData: AccessdataModel = new AccessdataModel();
  mainMenuItems: MenuItem[] = [{ label: this.title_emp[this.initialData.Language], routerLink: '/employee/policy', styleClass: 'activelike' }];
  homeIcon: any = { icon: 'pi pi-home', routerLink: '/' };
  genaralMenuItems: Menu[] = [];
  setbatchMenuItems: Menu[] = [];
  genaralMenuList: Menu[] = [];
  setbatchMenuList: Menu[] = [];
  ngOnInit(): void {
    this.loadInitialData();
  }

  loadInitialData(): void {
    this.initialData = JSON.parse(localStorage.getItem(AppConfig.SESSIONInitial) || '{}');
    if (!this.initialData.Token) {
      this.router.navigateByUrl('login');
    }
    this.selectedLanguage = this.initialData.Language;
    this.genaralMenuList = [
      {
        title: this.title_location[this.initialData.Language],
        link: 'location',
        accessCode: 'EMP001-001'
      },
      {
        title: this.title_dep[this.initialData.Language],
        link: 'part',
        accessCode: 'EMP001-002'
      },
      {
        title: this.title_position[this.initialData.Language],
        link: 'position',
        accessCode: 'EMP001-003'
      },
      {
        title: this.title_group[this.initialData.Language],
        link: 'group',
        accessCode: 'EMP001-004'
      },
      {
        title: this.title_initial[this.initialData.Language],
        link: 'initial',
        accessCode: 'EMP001-005'
      },
      {
        title: this.title_emptype[this.initialData.Language],
        link: 'emptype',
        accessCode: 'EMP001-006'
      },
      {
        title: this.title_empstatus[this.initialData.Language],
        link: 'empstatus',
        accessCode: 'EMP001-007'
      },
      // ... other approval menu items ...
    ];
    this.setbatchMenuList = [
      {
        title: this.title_setdetail[this.initialData.Language],
        link: 'empdetail',
        accessCode: 'EMP001-008'
      },
      {
        title: this.title_setassessment[this.initialData.Language],
        link: 'empassessment',
        accessCode: 'EMP001-009'
      },
      {
        title: this.title_settraining[this.initialData.Language],
        link: 'emptraining',
        accessCode: 'EMP001-010'
      },
      {
        title: this.title_setsalary[this.initialData.Language],
        link: 'empsalary',
        accessCode: 'EMP001-011'
      },
      {
        title: this.title_setlocation[this.initialData.Language],
        link: 'emplocation',
        accessCode: 'EMP001-012'
      },
      {
        title: this.title_setprovident[this.initialData.Language],
        link: 'empprovident',
        accessCode: 'EMP001-013'
      },
      {
        title: this.title_setbenefit[this.initialData.Language],
        link: 'empbenefits',
        accessCode: 'EMP001-014'
      },
      // ... other setup menu items ...
    ];
    this.setMenus();
    this.mainMenuItems = [{ label: this.title_emp[this.initialData.Language], routerLink: '/employee/policy', styleClass: 'activelike' }];
  }

  setMenus() {
    this.accessData = this.initialData2.dotGetPolmenu('EMP');
    this.genaralMenuItems = this.genaralMenuList.filter(item => this.hasAccessMenu(item.accessCode));
    this.setbatchMenuItems = this.setbatchMenuList.filter(item => this.hasAccessMenu(item.accessCode));
  }

  private hasAccessMenu(accessCode: string): boolean {
    return this.accessData.accessmenu_data.some(item => item.accessmenu_code === accessCode);
  }

}

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
 
  genaralMenuItems: Menu[] = [];
  policyMenuItems: Menu[] = [];
  setpolicyMenuItems: Menu[] = [];

  genaralMenuList: Menu[] = []
  policyMenuList: Menu[] = []
  setpolicyMenuList: Menu[] = []
  mainMenuItems: MenuItem[] = []
  homeIcon: any = { icon: 'pi pi-home', routerLink: '/' };

  
  title_attendance: { [key: string]: string } = { EN: "Attendance", TH: "กำหนดนโยบาย" };

  title_yearperiod: { [key: string]: string } = { EN: "Year Period", TH: "ประเภทปี" };
  title_reason: { [key: string]: string } = { EN: "Reason", TH: "เหตุผลประกอบ" };
  title_location: { [key: string]: string } = { EN: "Location", TH: "สถานที่ปฏิบัติงาน" };
  title_holiday: { [key: string]: string } = { EN: "Holiday", TH: "วันหยุดประจำปี" };
  title_shift: { [key: string]: string } = { EN: "Shift", TH: "กะการทำงาน" };
  title_shiftplan: { [key: string]: string } = { EN: "Shift plan", TH: "แผนการทำงาน" };
  title_leave: { [key: string]: string } = { EN: "Leave", TH: "รูปแบบการลา" };
  title_leaveplan: { [key: string]: string } = { EN: "Leave plan", TH: "แผนการลา" };
  title_overtime: { [key: string]: string } = { EN: "Overtime", TH: "รูปแบบการทำโอที" };
  title_diligence: { [key: string]: string } = { EN: "Diligence", TH: "เงื่อนไขการให้เบี้ยขยัน" };
  title_late: { [key: string]: string } = { EN: "Late", TH: "การสาย" };
  title_timeallowance: { [key: string]: string } = { EN: "Time Allowance", TH: "เงินค่าเวลา" };
  title_setpolicy: { [key: string]: string } = { EN: "Set Policy", TH: "นโยบายเงินได้" };
  title_setdeductionincomecode: { [key: string]: string } = { EN: "Set Deduction Income code", TH: "นโยบายเงินหัก" };
  title_general: { [key: string]: string } = { EN: "Genaral", TH: "รายละเอียด" };
  title_policy: { [key: string]: string } = { EN: "Policy", TH: "นโยบาย" };
  title_set_policy: { [key: string]: string } = { EN: "Set Policy", TH: "การตั้งค่า" };


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

    this.genaralMenuList = [
      {
        title: this.title_yearperiod[this.initialData.Language],
        link: 'yearperiod',
        accessCode: 'ATT001-001'
      },
      {
        title: this.title_reason[this.initialData.Language],
        link: 'reason',
        accessCode: 'ATT001-002'
      },
      {
        title: this.title_location[this.initialData.Language],
        link: 'location',
        accessCode: 'ATT001-003'
      },
      // ... other approval menu items ...
    ];

    this.policyMenuList = [
      {
        title: this.title_holiday[this.initialData.Language],
        link: 'holiday',
        accessCode: 'ATT001-004'
      },
      {
        title: this.title_shift[this.initialData.Language],
        link: 'shift',
        accessCode: 'ATT001-005'
      },
      {
        title: this.title_shiftplan[this.initialData.Language],
        link: 'shiftplan',
        accessCode: 'ATT001-006'
      },
      {
        title: this.title_leave[this.initialData.Language],
        link: 'leave',
        accessCode: 'ATT001-007'
      },
      {
        title: this.title_leaveplan[this.initialData.Language],
        link: 'leaveplan',
        accessCode: 'ATT001-008'
      },
      {
        title: this.title_overtime[this.initialData.Language],
        link: 'overtime',
        accessCode: 'ATT001-009'
      },
      {
        title: this.title_diligence[this.initialData.Language],
        link: 'diligence',
        accessCode: 'ATT001-010'
      },
      {
        title: this.title_late[this.initialData.Language],
        link: 'late',
        accessCode: 'ATT001-011'
      },
      {
        title: this.title_timeallowance[this.initialData.Language],
        link: 'timeallowance',
        accessCode: 'ATT001-012'
      },
      // ... other setup menu items ...
    ];
    this.setpolicyMenuList  = [
      {
        title: this.title_setpolicy[this.initialData.Language],
        link: 'setallpolicy',
        accessCode: 'ATT001-013'
      },
      {
        title: this.title_setdeductionincomecode[this.initialData.Language],
        link: 'setattpay',
        accessCode: 'ATT001-014'
      }
      // ... other setup menu items ...
    ];
    this.setMenus();
   
    this.mainMenuItems = [{ label:  this.title_attendance[this.initialData.Language] , routerLink: '/attendance/policy', styleClass: 'activelike' }];

    
  }

  setMenus() {
    this.accessData = this.initialData2.dotGetPolmenu('ATT') as any;

    this.genaralMenuItems = this.genaralMenuList.filter(item => this.hasAccessMenu(item.accessCode));
    this.policyMenuItems = this.policyMenuList.filter(item => this.hasAccessMenu(item.accessCode));
    this.setpolicyMenuItems = this.setpolicyMenuList.filter(item => this.hasAccessMenu(item.accessCode));
  }

  private hasAccessMenu(accessCode: string): boolean {
    return this.accessData.accessmenu_data.some(item => item.accessmenu_code === accessCode);
  }

}

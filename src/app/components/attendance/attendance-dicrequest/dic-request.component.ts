import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { MenuItem } from "primeng/api";
import { AppConfig } from "src/app/config/config";
import { InitialCurrent } from "src/app/config/initial_current";
import { AccessdataModel } from "src/app/models/system/security/accessdata";

 
interface Menu {
  title: string;
  link: string;
  accessCode: string;
}
@Component({
  selector: 'app-dic-request',
  templateUrl: './dic-request.component.html',
  styleUrls: ['./dic-request.component.scss']
})
export class DicRequestComponent implements OnInit {

  genaralMenuItems: Menu[] = [];
  policyMenuItems: Menu[] = [];
  setpolicyMenuItems: Menu[] = [];

  genaralMenuList: Menu[] = []
  policyMenuList: Menu[] = []
  setpolicyMenuList: Menu[] = []
  mainMenuItems: MenuItem[] = []
  homeIcon: any = { icon: 'pi pi-home', routerLink: '/' };

  title_dicrequest: { [key: string]: string } = { EN: "Dicrequest", TH: "ใบคำร้อง" };
  title_attendance: { [key: string]: string } = { EN: "Dicrequest", TH: "ใบคำร้อง" };
  title_requestOvertime: { [key: string]: string } = { EN: "Request Overtime", TH: "ขอทำล่วงเวลา" };
  title_requestleave: { [key: string]: string } = { EN: "Request leave", TH: "ขอลางาน" };

  title_requestShift: { [key: string]: string } = { EN: "Request Change Shift", TH: "Request Change Shift" };
  title_requestDay: { [key: string]: string } = { EN: "Request Change Daytype", TH: "Request Change Daytype" };
  title_record_time: { [key: string]: string } = { EN: "Record time", TH: "บันทึกการลงเวลา" };

  title_checkinout: { [key: string]: string } = { EN: "Check IN/OUT", TH: "การเช็คอิน / การเช็คเอาท์" };

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
        title: this.title_requestOvertime[this.initialData.Language],
        link: 'requestot',
        accessCode: 'ATT008-001'
      },
      {
        title: this.title_requestleave[this.initialData.Language],
        link: 'timeleave',
        accessCode: 'ATT008-002'
      },
      {
        title: this.title_record_time[this.initialData.Language],
        link: 'recordtime',
        accessCode: 'ATT008-003'
      },
      {
        title: this.title_checkinout[this.initialData.Language],
        link: 'checkin-out',
        accessCode: 'ATT008-004'
      },

      {
        title: this.title_requestShift[this.initialData.Language],
        link: 'requestshift',
        accessCode: 'ATT008-005'
      },

      {
        title: this.title_requestDay[this.initialData.Language],
        link: 'requestdaytype',
        accessCode: 'ATT008-006'
      },
    ];

    this.setMenus();
   
    this.mainMenuItems = [{ label:  this.title_attendance[this.initialData.Language] , routerLink: '/attendance/dicrequest', styleClass: 'activelike' }];

   }

  setMenus() {
    this.accessData = this.initialData2.dotGetPolmenu('ATT') as any;

    this.genaralMenuItems = this.genaralMenuList.filter(item => this.hasAccessMenu(item.accessCode));
     
  }

  private hasAccessMenu(accessCode: string): boolean {
    return this.accessData.accessmenu_data.some(item => item.accessmenu_code === accessCode);
  }

}

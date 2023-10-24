import { Component, OnInit } from '@angular/core';
import { AppConfig } from '../../../config/config';
import { InitialCurrent } from '../../../config/initial_current';
import { MenuItem } from 'primeng/api';
import { AccessdataModel } from 'src/app/models/system/security/accessdata';
interface Menu {
  title: string;
  link: string;
  accessCode: string;
}
@Component({
  selector: 'app-system-policy',
  templateUrl: './system-policy.component.html',
  styleUrls: ['./system-policy.component.scss']
})
export class SystemPolicyComponent implements OnInit {
  router: any;

  constructor() { }
  itemslike: MenuItem[] = [];
  home: any;
  ngOnInit(): void {
    this.doGetInitialCurrent();
    this.doLoadLanguage();
    this.setMenus();
    this.itemslike = [{ label: this.title_genaral_system, routerLink: '/system/system', styleClass: 'activelike' }];

    this.home = { icon: 'pi pi-home', routerLink: '/' };

  }

  public initial_current: InitialCurrent = new InitialCurrent();
  initialData2: InitialCurrent = new InitialCurrent();
  accessData: AccessdataModel = new AccessdataModel();
  doGetInitialCurrent() {
    this.initial_current = JSON.parse(
      localStorage.getItem(AppConfig.SESSIONInitial) || '{}'
    );
    if (!this.initial_current) {
      this.router.navigateByUrl('login');
    }
  }
  title_Supply: string = "Supply Office";
  title_fore: string = "Foreigner Type";

  title_genaral_system: string = 'Genaral System';
  title_links: string = 'Links';
  title_genaral: string = 'Genaral';
  title_level: string = 'Employee Level';
  title_bank: string = 'Bank';
  title_card_Type: string = 'Card Type';
  title_family_Type: string = 'Family Type';
  title_address_Type: string = 'Address Type';
  title_province: string = 'Province';
  title_religion: string = 'Religion';
  title_ethnicity: string = 'Ethnicity';
  title_bloodtype: string = 'Bloodtype';
  title_hospital: string = 'Hospital';
  title_location: string = 'Location';
  title_reduce: string = 'Reduces';
  title_set_structure_code: string = 'Set Structure code';
  title_training: string = 'Training';

  title_course: string = 'Course';
  title_institute: string = 'Institute';
  title_education: string = 'Education';
  title_faculty: string = 'Faculty';

  title_major: string = 'Major';
  title_qualification: string = 'Qualification';
  genaralMenuItems: Menu[] = [];
  trainingMenuItems: Menu[] = [];
  educationMenuItems: Menu[] = [];
  genaralMenuList: Menu[] = [];
  trainingMenuList: Menu[] = [];
  educationMenuList: Menu[] = [];
  doLoadLanguage() {
    if (this.initial_current.Language == 'TH') {
      this.title_Supply = "อุปกรณ์สำนักงาน";
      this.title_fore = "ประเภทพนักงานต่างด้าว";

      this.title_genaral_system = 'ทั่วไป';
      this.title_links = 'ลิงค์';
      this.title_genaral = 'ทั่วไป';
      this.title_level = 'ระดับ';
      this.title_bank = 'ธนาคาร';
      this.title_card_Type = 'ประเภทบัตร';
      this.title_family_Type = 'ประเภทครอบครัว';
      this.title_address_Type = 'ประเภทที่อยู่';
      this.title_province = 'จังหวัด';
      this.title_religion = 'ศาสนา';
      this.title_ethnicity = 'เชื้อชาติ';
      this.title_bloodtype = 'กรุ๊ปเลือด';
      this.title_hospital = 'โรงพยาบาล';
      this.title_location = 'สถานที่ปฎิบัติงาน';
      this.title_reduce = 'ค่าลดหย่อน';
      this.title_set_structure_code = 'กำหนดรหัสโครงสร้าง';
      this.title_training = 'การฝึกอบรม';
      this.title_course = 'คอร์ส';
      this.title_institute = 'สถาบัน';
      this.title_education = 'การศึกษา';
      this.title_faculty = 'คณะ';
      this.title_major = 'วิชาเอก';
      this.title_qualification = 'คุณสมบัติ';

    }
    this.genaralMenuList = [
      {
        title: this.title_level,
        link: 'system-organization-level',
        accessCode: 'SYS002-001'
      },
      {
        title: this.title_bank,
        link: 'bank',
        accessCode: 'SYS002-002'
      },
      {
        title: this.title_card_Type,
        link: 'system-card-type',
        accessCode: 'SYS002-003'
      },
      {
        title: this.title_family_Type,
        link: 'system-family-type',
        accessCode: 'SYS002-004'
      },
      {
        title: this.title_address_Type,
        link: 'system-address-type',
        accessCode: 'SYS002-005'
      },
      {
        title: this.title_province,
        link: 'system-province',
        accessCode: 'SYS002-006'
      },
      {
        title: this.title_religion,
        link: 'system-religion',
        accessCode: 'SYS002-007'
      },
      {
        title: this.title_ethnicity,
        link: 'system-ethnicity',
        accessCode: 'SYS002-008'
      },
      {
        title: this.title_bloodtype,
        link: 'system-bloodtype',
        accessCode: 'SYS002-009'
      },
      {
        title: this.title_hospital,
        link: 'system-hospital',
        accessCode: 'SYS002-010'
      },
      {
        title: this.title_location,
        link: 'system-location',
        accessCode: 'SYS002-011'
      },
      // {
      //   title: this.title_reduce,
      //   link: 'system-reduce',
      //   accessCode: 'SYS002-012'
      // },
      {
        title: this.title_Supply,
        link: 'system-supply',
        accessCode: 'SYS002-013'
      },

      {
        title: this.title_fore,
        link: 'system-foretype',
        accessCode: 'SYS002-019'
      },

      // ... other setup menu items ...
    ];

    this.trainingMenuList = [
      {
        title: this.title_course,
        link: 'course',
        accessCode: 'SYS002-014'
      },
      {
        title: this.title_institute,
        link: 'institute',
        accessCode: 'SYS002-015'
      },

      // ... other setup menu items ...
    ]

    this.educationMenuList = [
      {
        title: this.title_faculty,
        link: 'faculty',
        accessCode: 'SYS002-016'
      },
      {
        title: this.title_major,
        link: 'major',
        accessCode: 'SYS002-017'
      },
      {
        title: this.title_qualification,
        link: 'qualification',
        accessCode: 'SYS002-018'
      },
    ]
  }
  setMenus() {
    this.accessData = this.initialData2.dotGetPolmenu('SYS');
    this.genaralMenuItems = this.genaralMenuList.filter(item => this.hasAccessMenu(item.accessCode));
    this.trainingMenuItems = this.trainingMenuList.filter(item => this.hasAccessMenu(item.accessCode));
    this.educationMenuItems = this.educationMenuList.filter(item => this.hasAccessMenu(item.accessCode));
  }

  private hasAccessMenu(accessCode: string): boolean {
    return this.accessData.accessmenu_data.some(item => item.accessmenu_code === accessCode);
  }
}

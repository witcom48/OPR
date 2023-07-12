import { Component, OnInit } from '@angular/core';
import { AppConfig } from '../../../config/config';
import { InitialCurrent } from '../../../config/initial_current';

@Component({
  selector: 'app-system-policy',
  templateUrl: './system-policy.component.html',
  styleUrls: ['./system-policy.component.scss']
})
export class SystemPolicyComponent implements OnInit {
    router: any;

  constructor() { }

  ngOnInit(): void {
    this.doGetInitialCurrent();
    this.doLoadLanguage();
    
}

public initial_current: InitialCurrent = new InitialCurrent();
    doGetInitialCurrent() {
        this.initial_current = JSON.parse(
            localStorage.getItem(AppConfig.SESSIONInitial) || '{}'
        );
        if (!this.initial_current) {
            this.router.navigateByUrl('login');
        }
    }
  title_Supply: string = "Supply Office";

    title_genaral_system: string = 'Genaral system';
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

    doLoadLanguage() {
        if (this.initial_current.Language == 'TH') {
            this.title_Supply = "อุปกรณ์สำนักงาน";

            this.title_genaral_system= 'ระบบทั่วไป';
            this.title_links= 'ลิงค์';
            this.title_genaral= 'ทั่วไป';
            this.title_level= 'ระดับ';
            this.title_bank= 'ธนาคาร';
            this.title_card_Type= 'ประเภทบัตร';
            this.title_family_Type= 'ประเภทครอบครัว';
            this.title_address_Type= 'ประเภทที่อยู่';
            this.title_province= 'จังหวัด';
            this.title_religion= 'ศาสนา';
            this.title_ethnicity= 'เชื้อชาติ';
            this.title_bloodtype= 'กรุ๊ปเลือด';
            this.title_hospital= 'โรงพยาบาล';
            this.title_location= 'สถานที่';
            this.title_reduce= 'ค่าลดหย่อน';
            this.title_set_structure_code= 'กำหนดรหัสโครงสร้าง';
            this.title_training = 'การฝึกอบรม';
            this.title_course= 'คอร์ส';
            this.title_institute= 'สถาบัน';
            this.title_education = 'การศึกษา';
            this.title_faculty= 'คณะ';
            this.title_major= 'วิชาเอก';
            this.title_qualification= 'คุณสมบัติ';

        }
    }
}

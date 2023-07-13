import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppConfig } from 'src/app/config/config';
import { InitialCurrent } from 'src/app/config/initial_current';

@Component({
  selector: 'app-employee-policy',
  templateUrl: './employee-policy.component.html',
  styleUrls: ['./employee-policy.component.scss']
})
export class EmployeePolicyComponent implements OnInit {

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

  ngOnInit(): void {
    this.doGetInitialCurrent();
  }

  public initial_current: InitialCurrent = new InitialCurrent();
  doGetInitialCurrent() {
    this.initial_current = JSON.parse(localStorage.getItem(AppConfig.SESSIONInitial) || '{}');
    if (!this.initial_current) {
      this.router.navigateByUrl('login');
    }
  }

}

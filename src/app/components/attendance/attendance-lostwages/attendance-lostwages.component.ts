import { Component, OnInit, ViewChild } from '@angular/core';
import { MegaMenuItem, MenuItem } from 'primeng/api';
import { ActivatedRoute, NavigationExtras } from '@angular/router';
import { Router } from '@angular/router';

import { ConfirmationService, ConfirmEventType, MessageService } from 'primeng/api';
import * as XLSX from 'xlsx';
import { DatePipe } from '@angular/common';


import { AppConfig } from '../../../config/config';
import { InitialCurrent } from '../../../config/initial_current';
import { RadiovalueModel } from '../../../models/project/radio_value';

import { ProjectModel } from '../../../models/project/project';
import { ProjectService } from '../../../services/project/project.service';

import { ProgenaralService } from '../../../services/project/pro_genaral.service';
import { ProjectDetailService } from '../../../services/project/project_detail.service';


import { ProjobmainModel } from '../../../models/project/project_jobmain';




import { ShiftModels } from 'src/app/models/attendance/shift';
import { ShiftServices } from 'src/app/services/attendance/shift.service';

import { DaytypeModels } from 'src/app/models/attendance/daytype';

import { PrjectEmpdailyModel } from '../../../models/project/project_empdaily';
import { PrjectJobtypeModel } from '../../../models/project/project_jobtype';

import { SearchEmpComponent } from '../../usercontrol/search-emp/search-emp.component';
import { AccessdataModel } from 'src/app/models/system/security/accessdata';
import { FillterProjectModel } from 'src/app/models/usercontrol/fillterproject';
import { SelectEmpComponent } from '../../usercontrol/select-emp/select-emp.component';
import { TaskComponent } from '../../usercontrol/task/task.component';
import { ProjobsubModel } from 'src/app/models/project/project_jobsub';
import { EmployeeModel } from 'src/app/models/employee/employee';
import { EmployeeService } from 'src/app/services/emp/worker.service';
import { LostwagesService } from 'src/app/services/attendance/lostwages.service';
import { LostwagesModel } from 'src/app/models/attendance/Lostwages';
import { EmployeeresignModel } from 'src/app/models/employee/employee_resign';
import { EmpresignService } from 'src/app/services/emp/worker_resign.service';

interface Result {
  worker: string;
  policy: string;
  modified_by: string;
  modified_date: string;
}
@Component({
  selector: 'app-attendance-lostwages',
  templateUrl: './attendance-lostwages.component.html',
  styleUrls: ['./attendance-lostwages.component.scss']
})
export class AttendanceLostwagesComponent implements OnInit {

  @ViewChild(SearchEmpComponent) selectEmp: any;
  edit_data: boolean = false;
  new_data: boolean = false;
   home: any;
  itemslike: MenuItem[] = [];
  menu_lostwages: MenuItem[] = [];
  toolbar_menu: MenuItem[] = [];

  timesheet_list: PrjectEmpdailyModel[] = [];
  jobtype_list: PrjectJobtypeModel[] = [];
  edit_daily: boolean = false;

  manage_title: string = "Time sheet"
  displayManage: boolean = false;
  searchEmp: boolean = false;
  position: string = "right";

  title_confirm: { [key: string]: string } = { EN: "Are you sure?", TH: "ยืนยันการทำรายการ" }
  title_confirm_record: { [key: string]: string } = { EN: "Confirm to record", TH: "คุณต้องการบันทึกการทำรายการ" }
  title_confirm_delete: { [key: string]: string } = { EN: "Confirm to delete", TH: "คุณต้องการลบรายการ" }
  title_confirm_yes: { [key: string]: string } = { EN: "Yes", TH: "ใช่" }
  title_confirm_no: { [key: string]: string } = { EN: "No", TH: "ยกเลิก" }
  title_confirm_cancel: { [key: string]: string } = { EN: "You have cancelled", TH: "คุณยกเลิกการทำรายการ" }

  title_page_from: { [key: string]: string } = { EN: "Showing", TH: "แสดง" }
  title_page_to: { [key: string]: string } = { EN: "to", TH: "ถึง" }
  title_page_total: { [key: string]: string } = { EN: "of", TH: "จาก" }
  title_page_record: { [key: string]: string } = { EN: "entries", TH: "รายการ" }
  //
  title_page: { [key: string]: string } = { EN: "Project Management", TH: "จัดการข้อมูลโครงการ" }
  title_new: { [key: string]: string } = { EN: "New", TH: "เพิ่ม" }
  title_edit: { [key: string]: string } = { EN: "Edit", TH: "แก้ไข" }
  title_delete: { [key: string]: string } = { EN: "Delete", TH: "ลบ" }
  title_btn_save: { [key: string]: string } = { EN: "Save", TH: "บันทึก" }
  title_btn_cancel: { [key: string]: string } = { EN: "Cancel", TH: "ยกเลิก" }
  title_btn_close: { [key: string]: string } = { EN: "Close", TH: "ปิด" }
  title_modified_by: { [key: string]: string } = { EN: "Edit by", TH: "ผู้ทำรายการ" }
  title_modified_date: { [key: string]: string } = { EN: "Edit date", TH: "วันที่ทำรายการ" }
  title_search: { [key: string]: string } = { EN: "Search", TH: "ค้นหา" }
  title_upload: { [key: string]: string } = { EN: "Upload", TH: "อัพโหลด" }

  title_date: { [key: string]: string } = { EN: "Date", TH: "วันที่" }
  title_project: { [key: string]: string } = { EN: "Project", TH: "โครงการ" }

  title_jobcode: { [key: string]: string } = { EN: "Job", TH: "งาน" }
  title_jobname: { [key: string]: string } = { EN: "Description", TH: "รายละเอียด" }
  title_empcode: { [key: string]: string } = { EN: "Emp. code", TH: "รหัสพนักงาน" }
  title_empname: { [key: string]: string } = { EN: "Emp. name", TH: "ชื่อ-นามสกุล" }
  title_shift: { [key: string]: string } = { EN: "Shift", TH: "กะการทำงาน" }
  title_daytype: { [key: string]: string } = { EN: "Daytype", TH: "ประเภทวัน" }
  title_timein: { [key: string]: string } = { EN: "In", TH: "เวลาเข้า" }
  title_timeout: { [key: string]: string } = { EN: "Out", TH: "เวลาออก" }
  title_working_before: { [key: string]: string } = { EN: "OT in", TH: "โอทีก่อนเข้างาน" }
  title_working: { [key: string]: string } = { EN: "Working", TH: "เวลาทำงาน" }
  title_working_after: { [key: string]: string } = { EN: "OT out", TH: "โอทีหลังเลิกงาน" }
  title_working_late: { [key: string]: string } = { EN: "Late", TH: "สาย" }
  title_working_leave: { [key: string]: string } = { EN: "Leave", TH: "ลางาน" }
  title_timesheet: { [key: string]: string } = { EN: "Time Sheet", TH: "ตารางเวลาทำงาน" }
  title_lostwages: { [key: string]: string } = { EN: "Lost Wages", TH: " บันทึกค่าแรงขาด" }
  title_export: { [key: string]: string } = { EN: "Export", TH: "ส่งออกไฟล์" }

  title_import: { [key: string]: string } = { EN: "Import", TH: "นำเข้า" }
  title_gender: { [key: string]: string } = { EN: "Gender", TH: "เพศ" }
  male_gender: { [key: string]: string } = { EN: "Male", TH: "ชาย" }
  female_gender: { [key: string]: string } = { EN: "Female", TH: "หญิง" }
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private datePipe: DatePipe,
    private shiftServices: ShiftServices,
    private projectService: ProjectService,
    private lostwagesService: LostwagesService,
    private projectDetailService: ProjectDetailService,
    private empresignService: EmpresignService,
    private employeeService: EmployeeService,



  ) {
  }


  ngOnInit(): void {
    this.doLoadLanguage()
    this.doGetInitialCurrent()
    this.doLoadMenu()
    // this.doLoadLostwages()
    setTimeout(() => {
      this.doLoadProject()
      this.doLoadPolShift()
      this.doLoadPolDaytype()
      this.doLoadPolJobmain()
    }, 300);

    this.doLoadEmployee()
    this.doLoadPolJobmain2()
    //let dateString = '2023-01-10T00:00:00'
    //this.selectedDate_fillter = new Date(dateString);

    setTimeout(() => {

      if (this.project_list.length > 0) {
        this.selectedProject_fillter = this.project_list[0]

        this.doLoadLostwages()

      }

    }, 800);

  }

  doLoadLanguage() {
    if (this.initial_current.Language == "TH") {

    }
  }
  public initial_current: InitialCurrent = new InitialCurrent();
  initialData2: InitialCurrent = new InitialCurrent();
  accessData: AccessdataModel = new AccessdataModel();
  doGetInitialCurrent() {
    this.initial_current = JSON.parse(localStorage.getItem(AppConfig.SESSIONInitial) || '{}');
    if (!this.initial_current) {
      this.router.navigateByUrl('login');
    }
    this.accessData = this.initialData2.dotGetPolmenu('ATT');

  }


  // public initial_current: InitialCurrent = new InitialCurrent();
  // doGetInitialCurrent() {
  //   this.initial_current = JSON.parse(localStorage.getItem(AppConfig.SESSIONInitial) || '{}');
  //   if (!this.initial_current) {
  //     this.router.navigateByUrl('login');
  //   }
  // }

  doLoadMenu() {

    this.itemslike = [{ label: this.title_lostwages[this.initial_current.Language], styleClass: 'activelike' }];
    this.home = { icon: 'pi pi-home', routerLink: '/' };


    this.toolbar_menu = [
      {
        label: this.title_btn_save[this.initial_current.Language],
        icon: 'pi pi-fw pi-save',

      },
      {
        label: this.title_export[this.initial_current.Language],
        icon: 'pi pi-fw pi-file-export',
        command: (event) => {
          this.displayManage = true
        }
      },
    ];


    this.menu_lostwages = [

      {
        label: this.title_new[this.initial_current.Language],
        icon: 'pi pi-fw pi-plus',
        command: (event) => {
          if (this.accessData.accessdata_new) {
            this.clearManage();
            this.new_lostwages = true;
            this.selectedlostwages = new LostwagesModel();
            this.selectedProjobmain = new ProjectModel();
            this.selectedJobmain = new RadiovalueModel();
            this.selectedProjobsub = new ProjobsubModel();
            this.timein = "00:00"
            this.timeout = "00:00"
             this.showManage();
          } else {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Permistion' });
          }

        }
      }
      ,
      {
        label: this.title_edit[this.initial_current.Language],
        icon: 'pi pi-fw pi-pencil',
        command: (event) => {
          this.showManage();
          this.edit_lostwages = true;


        }
      },
      {
        label: this.title_delete[this.initial_current.Language],
        icon: 'pi pi-fw pi-trash',
        command: (event) => {
          this.confirmDelete(this.selectedDataArray)

        }
      }
      // ,
      // {
      //   label: this.title_import[this.initial_current.Language],
      //   icon: 'pi pi-fw pi-file-import',
      // }
      // ,
      // {
      //   label: this.title_export[this.initial_current.Language],
      //   icon: 'pi pi-fw pi-file-export',
      // }

    ];

  }
  employee_list: EmployeeModel[] = [];
  doLoadEmployee() {
    this.employeeService.worker_get(this.initial_current.CompCode, "").then(async (res) => {
      this.employee_list = await res;
    });
  }

  project_list: ProjectModel[] = [];
  selectedProject_fillter: ProjectModel = new ProjectModel()
  selectedDate_fillter: Date = new Date()
  selectedToDate_fillter: Date = new Date()

  doLoadProject() {
    this.project_list = []
    this.projectService.project_get(this.initial_current.CompCode,  "").then(async (res) => {
      this.project_list = await res;
      console.log(res, 'resresres')

    });
  }


  lostwages_list: LostwagesModel[] = [];
  selectedlostwages: LostwagesModel = new LostwagesModel();
  edit_lostwages: boolean = false;
  new_lostwages: boolean = false;
  timein: string = "00:00"
  timeout: string = "00:00"

  doLoadLostwages() {
    this.lostwagesService.lostwages_get(this.initial_current.CompCode, "", "", "", this.selectedDate_fillter, this.selectedToDate_fillter).then(async (res) => {
      await res.forEach((element: LostwagesModel) => {
        element.lostwages_before_min_app = Number(element.lostwages_before_min_app);
        element.lostwages_work1_min_app = Number(element.lostwages_work1_min_app);
        element.lostwages_after_min_app = Number(element.lostwages_after_min_app);
        element.lostwages_late_min_app = Number(element.lostwages_late_min_app);

      });

      this.lostwages_list = await res;
 
      if (this.lostwages_list.length > 0) {
        this.selectedlostwages = this.lostwages_list[0]///
      }
    });
    // this.doLoadPolJobmain()

  }


  emp_name: string = ""
  onRowSelectLostwages(event: Event) {
    if (this.initial_current.Language == "EN") {
      this.emp_name = this.selectedlostwages.worker_name_en
    }
    else {
      this.emp_name = this.selectedlostwages.worker_name_th
    }

    var a = "qq"
    var lostwages_in = this.selectedlostwages.lostwages_in.split(" ")
    var lostwages_out = this.selectedlostwages.lostwages_out.split(" ")

    this.timein = lostwages_in[1]
    this.timeout = lostwages_out[1]

  }

  pad(num: number, size: number): string {
    let s = num + "";
    while (s.length < size) s = "0" + s;
    return s;
  }

  doConvertHHMM(time_min: number): string {
    var hrs = Math.floor(time_min / 60);
    var min = time_min - (hrs * 60);
    return this.pad(hrs, 2) + ":" + this.pad(min, 2);
  }

  doGetMinute(HHmm: string): number {

    var splitted = HHmm.split(":", 2);

    var result = Number(splitted[0]) * 60;
    result += Number(splitted[1]);

    return result;
  }

  doFillter() {
    this.doLoadLostwages()

  }

  close_manage() {
    this.displayManage = false
  }


  shift_list: ShiftModels[] = [];
  doLoadPolShift() {
    var tmp = new ShiftModels();
    tmp.project = true
    this.shiftServices.shift_get(tmp).then(async (res) => {
      this.shift_list = await res;
    });
  }
  doGetPolShiftDetail(code: string): string {
    for (let i = 0; i < this.shift_list.length; i++) {
      if (this.shift_list[i].shift_code == code) {
        return this.initial_current.Language == "TH" ? this.shift_list[i].shift_name_th : this.shift_list[i].shift_name_en
      }
    }
    return ""
  }


  daytype_list: DaytypeModels[] = [];
  doLoadPolDaytype() {
    this.daytype_list = []
    this.lostwagesService.daytype_get().then(async (res) => {
      this.daytype_list = await res;
    });
  }
  doGetPolDaytypeDetail(code: string): string {
    for (let i = 0; i < this.daytype_list.length; i++) {
      if (this.daytype_list[i].daytype_code == code) {
        return this.initial_current.Language == "TH" ? this.daytype_list[i].daytype_name_th : this.daytype_list[i].daytype_name_en
      }
    }
    return ""
  }
  version: string = "";
  jobmain_list: ProjobmainModel[] = [];

  selectedProjobmain: ProjectModel = new ProjectModel();

  selectedJobmain: RadiovalueModel = new RadiovalueModel();
  projobsub_list: ProjobsubModel[] = [];
  selectedProjobsub: ProjobsubModel = new ProjobsubModel();
  result_list: Result[] = [];
  internal_staff: string = "0";
  external_employees: string = "1";

  async doLoadPolJobmain() {
    try {
      this.jobmain_list = [];
      const allProjobmain = await this.projectDetailService.projobversiondate_get(this.selectedProject_fillter.project_code, this.selectedDate_fillter, this.selectedToDate_fillter);
      if (allProjobmain && allProjobmain.length > 0) {
        const latestProjobmain = allProjobmain.reduce((acc: ProjobmainModel, current: ProjobmainModel) => acc.version > current.version ? acc : current);
        const res = await this.projectDetailService.projobmain_get(latestProjobmain.version, this.selectedProject_fillter.project_code, "", this.selectedDate_fillter, this.selectedDate_fillter);
        this.jobmain_list = res as ProjobmainModel[];
        console.log(res, 'ttt');
      }
    } catch (error) { }
  }

  doGetPolJobmainDetail(code: string): string {
    for (let i = 0; i < this.jobmain_list.length; i++) {
      if (this.jobmain_list[i].projobmain_code === code) {
        return this.initial_current.Language === 'TH' ? this.jobmain_list[i].projobmain_name_th : this.jobmain_list[i].projobmain_name_en;
      }
    }
    return '';
  }

  jobmain_list2: ProjobmainModel[] = [];

  doLoadPolJobmain2() {
    this.jobmain_list2 = []
    this.projectDetailService.projobmain_get("", this.selectedProject_fillter.project_code, "", this.selectedDate_fillter, this.selectedDate_fillter).then(async (res) => {
      this.jobmain_list2 = await res;

    });
  }

  doGetPolJobmainDetail2(code: string): string {
    for (let i = 0; i < this.jobmain_list2.length; i++) {
      if (this.jobmain_list2[i].projobmain_code === code) {
        return this.initial_current.Language === 'TH' ? this.jobmain_list2[i].projobmain_name_th : this.jobmain_list2[i].projobmain_name_en;
      }
    }
    return '';
  }




  // jobmain_list: ProjobmainModel[] = [];
  // selectedJobmain: RadiovalueModel = new RadiovalueModel;

  // doGetPolJobmainDetail(code: string): string {
  //   for (let i = 0; i < this.jobmain_list.length; i++) {
  //     if (this.jobmain_list[i].projobmain_code == code) {
  //       return this.initial_current.Language == "TH" ? this.jobmain_list[i].projobmain_name_th : this.jobmain_list[i].projobmain_name_en
  //     }
  //   }
  //   return ""
  // }

  // searchemp

  process() {
    this.result_list = [];

    if (this.selectEmp.selectedEmployee.worker_code) {
      this.Lostwages_summit()
    } else {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: "Record Not Success.." });
    }
    console.log(this.selectEmp.selectedEmployee, 'uuuy')
  }


  Lostwages_summit() {
    this.confirmationService.confirm({
      message: this.title_confirm_record[this.initial_current.Language],
      header: this.title_confirm[this.initial_current.Language],
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        //  this.selectedlostwages.emp_data = this.selectEmp.selectedEmployee.worker_code;
        this.selectedlostwages.emp_data = [this.selectEmp.selectedEmployee];

        this.selectedlostwages.lostwages_status = this.selectedlostwages.lostwages_status;
        console.log(this.selectedlostwages.lostwages_status, 'lostwages_status')


        this.selectedlostwages.projob_code = this.selectedlostwages.projob_code;


        this.selectedlostwages.lostwages_initial = this.selectedlostwages.lostwages_initial;
        console.log(this.selectedlostwages.lostwages_initial = this.selectedlostwages.lostwages_initial, 'rrrt')
        this.selectedlostwages.lostwages_cardno = this.selectedlostwages.lostwages_cardno;
        this.selectedlostwages.lostwages_gender = this.selectedlostwages.lostwages_gender;
        this.selectedlostwages.lostwages_fname_th = this.selectedlostwages.lostwages_fname_th;
        this.selectedlostwages.lostwages_laname_th = this.selectedlostwages.lostwages_laname_th;

        this.selectedlostwages.shift_code = this.selectedlostwages.shift_code;
        this.selectedlostwages.company_code = this.initial_current.CompCode
        this.selectedlostwages.project_code = this.selectedProject_fillter.project_code
        this.selectedlostwages.lostwages_color = "1"

        this.selectedlostwages.lostwages_workdate = new Date(this.selectedDate_fillter), new Date(this.selectedToDate_fillter)
        this.selectedlostwages.lostwages_in = this.timein
        this.selectedlostwages.lostwages_out = this.timeout
        console.log(this.selectedlostwages, 'selectedlostwages')

        this.lostwagesService.lostwagestimesheet_record(this.selectedlostwages).then((res) => {
          let result = JSON.parse(res);
          console.log(res, 'hhhhhh')

          if (result.success) {
            this.messageService.add({ severity: 'success', summary: 'Success', detail: "Record Success.." });

            this.edit_data = true;
            this.displayManage = false
            this.edit_lostwages= false
            this.displayManage = false

            setTimeout(() => {
              this.doLoadLostwages()

            }, 300);

          }
          else {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: "Record Not Success.." });
          }
        })
      },
      reject: () => {
        this.messageService.add({ severity: 'warn', summary: 'Cancelled', detail: this.title_confirm_cancel[this.initial_current.Language] });
      },
      key: "myDialog"

    });
  }

  select_emp() {


    // console.log(this.selectEmp.selectedEmployee.worker_code)

    this.selectedlostwages.company_code = this.selectEmp.selectedEmployee.company_code
    this.selectedlostwages.worker_code = this.selectEmp.selectedEmployee.worker_code
    this.selectedlostwages.worker_cardno = this.selectEmp.selectedEmployee.worker_cardno
    console.log(this.selectedlostwages.worker_code, 'tttteeee')
    this.selectedlostwages.lostwages_workdate = this.selectedDate_fillter, this.selectedToDate_fillter
    this.doLoadPolShift()
    this.doLoadPolDaytype()
    // this.doLoadPolJobmain()

    if (this.initial_current.Language == "EN") {
      this.emp_name = this.selectEmp.selectedEmployee.worker_fname_en + " " + this.selectEmp.selectedEmployee.worker_lname_en
    }
    else {
      this.emp_name = this.selectEmp.selectedEmployee.worker_fname_th + " " + this.selectEmp.selectedEmployee.worker_lname_th
    }

    this.searchEmp = false
    this.displayManage = true

  }

  close_searchemp() {
    this.searchEmp = false
  }



  /////
  version_selected: string = "";

  reloadPage() {
    this.doLoadLostwages()
  }
  reloadPages() {
    this.doLoadPolJobmain()
  }
  checked: boolean = false;

  selectedDataArray: any[] = [];
  toggleSelect(data: { checked: boolean; }) {
    if (data.checked) {
      this.selectedDataArray.push(data);
      this.checked = true;
    } else {
      const index = this.selectedDataArray.indexOf(data);
      if (index > -1) {
        this.selectedDataArray.splice(index, 1);
        if (this.selectedDataArray.length === 0) {
          this.checked = false;
        }
      }
    }
    console.log(this.selectedDataArray, 'รวม')
  }

  //Delete
  confirmDelete(selectedDataArray: LostwagesModel[]) {
    this.confirmationService.confirm({
      message: this.title_confirm_record[this.initial_current.Language],
      header: this.title_confirm[this.initial_current.Language],
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.doDeleteTimesheet(selectedDataArray);
      },
      reject: () => {
        this.messageService.add({
          severity: 'warn',
          summary: 'Cancelled',
          detail: this.title_confirm_cancel[this.initial_current.Language],
        });
      },
    });
  }

  async doDeleteTimesheet(selectedDataArray: LostwagesModel[]) {
    try {
      for (const data of selectedDataArray) {
        const res = await this.lostwagesService.lostwages_delete(this.initial_current.CompCode, data.project_code, data.worker_code, data.lostwages_cardno, data);

        if (res.success) {
          this.messageService.add({ severity: 'success', summary: 'Success', detail: res.message });
        } else {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: res.message });
        }
      }

      selectedDataArray.length = 0;
      this.doLoadPolJobmain();
      this.reloadPage();
      this.displayManage = false;
    } catch (error) {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'An error occurred while deleting.' });
    }
  }

  //Delete
  // confirmDelete(selectedDataArray: LostwagesModel[]) {
  //   this.confirmationService.confirm({
  //     message: this.title_confirm_record[this.initial_current.Language],
  //     header: this.title_confirm[this.initial_current.Language],
  //     icon: 'pi pi-exclamation-triangle',
  //     accept: () => {
  //       this.doDeleteTimesheet(selectedDataArray);
  //     },
  //     reject: () => {
  //       this.messageService.add({
  //         severity: 'warn',
  //         summary: 'Cancelled',
  //         detail: this.title_confirm_cancel[this.initial_current.Language],
  //       });
  //     },
  //   });
  //   console.log(this.selectedDataArray, 'ยืนยัน')
  // }

  // async doDeleteTimesheet(selectedDataArray: LostwagesModel[]) {
  //   try {
  //     for (const data of selectedDataArray) {
  //       const res = await this.lostwagesService.lostwages_delete(
  //         this.initial_current.CompCode, this.selectedProject_fillter.project_code, this.selectedlostwages.worker_code, data
  //       );
  //       if (res.success) {
  //         this.messageService.add({ severity: 'success', summary: 'Success', detail: res.message });
  //       } else {
  //         this.messageService.add({ severity: 'error', summary: 'Error', detail: res.message });
  //       }
  //     }
  //     selectedDataArray.length = 0;
  //     this.doLoadPolJobmain();
  //     this.reloadPage();
  //     this.displayManage = false;
  //   } catch (error) {
  //     this.messageService.add({ severity: 'error', summary: 'Error', detail: 'An error occurred while deleting.' });
  //   }
  // }


  // ตัวแปรในคลาส
  jobListLoaded: boolean = false;
  jobSubListLoaded: boolean = false;

  open_searchemp() {
    this.searchEmp = true
  }

  selectJobmainType() {
    if (this.internal_staff === '0') {
      this.jobListLoaded = true; // เปลี่ยนสถานะของ jobListLoaded เมื่อเลือก 'งาน'
      this.jobSubListLoaded = false; // ปิดสถานะของ jobSubListLoaded เมื่อเลือก 'งาน'


    } else {
      // อื่น ๆ
      this.jobListLoaded = false;
      this.jobSubListLoaded = false;
    }
  }

  selectJobType() {
    if (this.external_employees === '1') {
      this.jobSubListLoaded = true; // เปลี่ยนสถานะของ jobSubListLoaded เมื่อเลือก 'งานเคลีย'
      this.jobListLoaded = false; // ปิดสถานะของ jobListLoaded เมื่อเลือก 'งานเคลีย'

    } else {
      this.jobSubListLoaded = false;
      this.jobListLoaded = false;
    }
  }

  ///
  // employee_list: EmployeeModel[] = [];
  selectedEmployee: EmployeeModel = new EmployeeModel();
  calculateEndDate() {
    if (this.selectedEmployee.worker_probationdate && this.selectedEmployee.worker_probationday) {
      const start = new Date(this.selectedEmployee.worker_probationdate);
      const end = new Date(start);
      end.setDate(start.getDate() + this.selectedEmployee.worker_probationday);
      this.selectedEmployee.worker_probationenddate = end;
    }
  }
  emp_code: string = "";
  emplists: string = "";

  //resign
  empresignList: EmployeeresignModel[] = [];
  selectedEmpresign: EmployeeresignModel = new EmployeeresignModel();
  doLoadEmpresignList() {
    this.empresignService.empresign_get(this.initial_current.CompCode, this.emp_code, this.selectedEmployee.worker_cardno).then(async (res) => {
      await res.forEach((element: EmployeeresignModel) => {
        element.empresign_date = new Date(element.empresign_date)
      })
      this.empresignList = res;
      if (this.empresignList.length > 0) {
        this.selectedEmpresign = this.empresignList[0];
      }
    })
  }
  doRecordEmpResign() {
    if (this.selectedEmployee.worker_resignstatus) {
      var tmp = new EmployeeresignModel();
      tmp.company_code = this.selectedEmployee.company_code || this.initial_current.CompCode
      tmp.worker_code = this.selectedEmployee.worker_code
      tmp.card_no = this.selectedEmployee.worker_cardno
      tmp.empresign_date = this.selectedEmployee.worker_resigndate
      tmp.reason_code = this.selectedEmployee.worker_resignreason
      this.empresignService.empresign_record(tmp).then((res) => {
        let result = JSON.parse(res);
        if (result.success) {
        }
        else {
        }
      })
    } else {
    }
  }


  doRecordEmpResign2() {
    if (this.selectedEmployee.worker_resignreason) {
      var tmp = new EmployeeresignModel();
      tmp.company_code = this.selectedEmployee.company_code || this.initial_current.CompCode
      tmp.worker_code = this.selectedEmployee.worker_code
      tmp.card_no = this.selectedEmployee.worker_cardno
      tmp.empresign_date = this.selectedEmployee.worker_resigndate
      tmp.reason_code = this.selectedEmployee.worker_resignreason
      this.empresignService.empresign_record(tmp).then((res) => {
        let result = JSON.parse(res);
        if (result.success) {
        }
        else {
        }
      })
    } else {
    }
  }

  clearManage() {
    this.new_lostwages = false; this.edit_lostwages = false;
  }

  showManage() {
    this.displayManage = true;

    if (this.initial_current.Language == 'EN') {
      if (this.new_lostwages || this.edit_lostwages) {
      } else {
        if (this.new_lostwages || this.edit_lostwages) {
        }
      }
    }
  }
  tabChange(e: { index: any }) {
    var index = e.index;
    //
    this.edit_lostwages = false;
    this.new_lostwages = false;

  }
}
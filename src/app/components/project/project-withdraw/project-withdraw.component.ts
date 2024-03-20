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



import { TimecardsModel } from '../../../models/attendance/timecards';
import { TimecardService } from 'src/app/services/attendance/timecards.service';

import { ShiftModels } from 'src/app/models/attendance/shift';
import { ShiftServices } from 'src/app/services/attendance/shift.service';

import { DaytypeModels } from 'src/app/models/attendance/daytype';

import { PrjectEmpdailyModel } from '../../../models/project/project_empdaily';
import { PrjectJobtypeModel } from '../../../models/project/project_jobtype';

import { SearchEmpComponent } from '../../../components/usercontrol/search-emp/search-emp.component';
import { AccessdataModel } from 'src/app/models/system/security/accessdata';
import { FillterProjectModel } from 'src/app/models/usercontrol/fillterproject';
import { SelectEmpComponent } from '../../usercontrol/select-emp/select-emp.component';
import { TaskComponent } from '../../usercontrol/task/task.component';
import { ProjobsubModel } from 'src/app/models/project/project_jobsub';
import { PeriodsServices } from 'src/app/services/payroll/periods.service';


import { ProcostModel } from '../../../models/project/policy/procost';
import { ProcostService } from '../../../services/project/procost.service';

import { ProjectwithdrawModel } from '../../../models/project/project_withdraw';

interface Result {
  worker: string;
  policy: string;
  modified_by: string;
  modified_date: string;
}
@Component({
  selector: 'app-project-withdraw',
  templateUrl: './project-withdraw.component.html',
  styleUrls: ['./project-withdraw.component.scss']
})
export class ProjectWithdrawComponent implements OnInit {

  // @ViewChild(SearchEmpComponent) selectEmp: any;

  @ViewChild(SelectEmpComponent) selectEmp: any;
  @ViewChild(TaskComponent) taskView: any;
  edit_data: boolean = false;
  new_data: boolean = false;
  home: any;
  itemslike: MenuItem[] = [];
  menu_timecard: MenuItem[] = [];
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
  title_todate: { [key: string]: string } = { EN: "To Date", TH: "ถึงวันที่" }

  title_date: { [key: string]: string } = { EN: "Date", TH: "วันที่" }
  title_project: { [key: string]: string } = { EN: "Project", TH: "โครงการ" }

  title_jobcode: { [key: string]: string } = { EN: "Job", TH: "งาน" }
  title_jobname: { [key: string]: string } = { EN: "Description", TH: "รายละเอียดงาน" }
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
  title_working_timesheet: { [key: string]: string } = { EN: "  Withdraw benefit", TH: "รายการเบิกสวัสดิการ" }
  title_export: { [key: string]: string } = { EN: "Export", TH: "ส่งออกไฟล์" }

  title_import: { [key: string]: string } = { EN: "Import", TH: "นำเข้า" }
  title_tab_jobclear: { [key: string]: string } = { EN: "Clear job", TH: "งานเคลียร์" }

  title_tab_normal: { [key: string]: string } = { EN: "Normal", TH: "งาน" }
  title_clearjob: { [key: string]: string } = { EN: "Description", TH: "รายละเอียดงานเคลียร์" }

  title_total: { [key: string]: string } = { EN: "Total", TH: "รวม" }

  loading:boolean = false
  edit_timecard: boolean = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private datePipe: DatePipe,
    private shiftServices: ShiftServices,
    private projectService: ProjectService,
    private timecardService: TimecardService,
    private projectDetailService: ProjectDetailService,
    private periodsService: PeriodsServices,
    private procostService: ProcostService
  ) {
  }


  async ngOnInit(): Promise<void> {
    this.doLoadLanguage()
    var tmp = await this.doGetInitialCurrent()

    if(tmp==1){
      this.doLoadMenu()
      this.Periodclosed()
      this.doLoadProject()
      this.doLoadPolShift()
      this.doLoadPolDaytype()

      this.doLoadPolCost()

      this.loading = false
    }    
    
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
    this.accessData = this.initialData2.dotGetPolmenu('PRO');

    return 1
  }

  doLoadMenu() {

    this.itemslike = [{ label: this.title_working_timesheet[this.initial_current.Language], styleClass: 'activelike' }];
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


    this.menu_timecard = [

      {
        label: this.title_new[this.initial_current.Language],
        icon: 'pi pi-fw pi-plus',
        command: (event) => {
          if (this.accessData.accessdata_new) {
            if (!this.hasTruePeriodCloseta) {
             
              this.selectedProjobmain = new ProjectModel();
              this.selectedJobmain = new RadiovalueModel();
              this.selectedProjobsub = new ProjobsubModel();
              
              this.showManage();
            } else {
              this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Permistion' });
            }

          }
        }
      }
      ,
      {
        label: this.title_edit[this.initial_current.Language],
        icon: 'pi pi-fw pi-pencil',
        command: (event) => {
          this.showManage();
          this.edit_timecard = true;
        }
      },
      {
        label: this.title_delete[this.initial_current.Language],
        icon: 'pi pi-fw pi-trash',
        command: (event) => {
          if (!this.hasTruePeriodCloseta) {
            this.confirmDelete(this.selectedDataArray)
          }
        }
      }

    ];

  }

  project_list: ProjectModel[] = [];
  selectedProject_fillter: ProjectModel = new ProjectModel()
  selectedDate_fillter: Date = new Date()
  selectedToDate_fillter: Date = new Date()

  doLoadProject() {

    this.loading = true

    this.project_list = []
    this.projectService.project_get(this.initial_current.CompCode, "").then(async (res) => {
      this.project_list = await res;

      if (this.project_list.length > 0) {
        this.selectedProject_fillter = await this.project_list[0]

        this.doLoadPolJobmain()
        this.doLoadProjobsub()

        
      }
      
    });
  }


  
  emp_name: string = ""
  

  doFillter() {
    
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
    this.timecardService.daytype_get().then(async (res) => {
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
  //ProjectModel
  version: string = "";
  jobmain_list: ProjobmainModel[] = [];

  selectedProjobmain: ProjectModel = new ProjectModel();

  selectedJobmain: RadiovalueModel = new RadiovalueModel();
  projobsub_list: ProjobsubModel[] = [];
  selectedProjobsub: ProjobsubModel = new ProjobsubModel();
  result_list: Result[] = [];
  job_type: string = "0";
  jobsub_type: string = "1";

  async doLoadPolJobmain() {
    try {
      this.jobmain_list = [];
      const allProjobmain = await this.projectDetailService.projobversiondate_get(this.selectedProject_fillter.project_code, this.selectedDate_fillter, this.selectedToDate_fillter);
      if (allProjobmain && allProjobmain.length > 0) {
        const latestProjobmain = allProjobmain.reduce((acc: ProjobmainModel, current: ProjobmainModel) => acc.version > current.version ? acc : current);
        const res = await this.projectDetailService.projobmain_get(latestProjobmain.version, this.selectedProject_fillter.project_code, "", this.selectedDate_fillter, this.selectedDate_fillter);
        this.jobmain_list = res as ProjobmainModel[];

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

  async doLoadProjobsub() {
    try {
      this.projobsub_list = [];
      const allProjobmain = await this.projectDetailService.projobversiondate_get(this.selectedProject_fillter.project_code, this.selectedDate_fillter, this.selectedToDate_fillter);
      if (allProjobmain && allProjobmain.length > 0) {
        const latestProjobmain = allProjobmain.reduce((acc: ProjobsubModel, current: ProjobsubModel) => acc.version > current.version ? acc : current);
        const res = await this.projectDetailService.projobsub_get(latestProjobmain.version, this.selectedProject_fillter.project_code);
        this.projobsub_list = res as ProjobsubModel[];
      }
    } catch { }
  }
  doGetDetail(code: string): string {
    for (let i = 0; i < this.projobsub_list.length; i++) {
      if (this.projobsub_list[i].projobsub_code == code) {
        return this.initial_current.Language == "TH" ? this.projobsub_list[i].projobsub_name_th : this.projobsub_list[i].projobsub_name_th;
      }

    }
    return "";
  }

  projobsub_list2: ProjobsubModel[] = [];

  doLoadProjobsub2() {
    this.projobsub_list2 = []
    this.projectDetailService.projobsub_get("", this.selectedProject_fillter.project_code).then(async (res) => {
      this.projobsub_list2 = await res;

    });

  }

  doGetDetail2(code: string): string {
    for (let i = 0; i < this.projobsub_list2.length; i++) {
      if (this.projobsub_list2[i].projobsub_code == code) {
        return this.initial_current.Language == "TH" ? this.projobsub_list2[i].projobsub_name_th : this.projobsub_list2[i].projobsub_name_th;
      }

    }
    return "";
  }

  // ตัวแปรในคลาส
  jobListLoaded: boolean = false;
  jobSubListLoaded: boolean = false;


  selectJobmainType() {    
    this.jobsub_type = "0"
  }

  selectJobType() {  
    this.jobsub_type = "1"
  }

  //
  process() {
    this.result_list = [];
    if (this.selectEmp.employee_dest) {
      this.timesheet();
    } else {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: "Record Not Success.." });
    }
  }

  timesheet() {

    if (!this.hasTruePeriodCloseta) {
      this.isConfirmationDialogVisible = true;
      this.confirmationService.confirm({
        message: this.title_confirm_record[this.initial_current.Language],
        header: this.title_confirm[this.initial_current.Language],
        icon: 'pi pi-exclamation-triangle',
        accept: () => {

          // var data = new TimecardsModel();
          // data.company_code = this.initial_current.CompCode;
          // data.emp_data = this.selectEmp.employee_dest;
          // data.project_code = this.selectedProject_fillter.project_code;
          
          // data.timecard_daytype = this.selectedTimecard.timecard_daytype;
          // data.shift_code = this.selectedTimecard.shift_code;

          // if(this.job_type=="0"){
          //   data.projobsub_code = ""
          //   data.projob_code = this.selectedTimecard.projob_code;
          // }
          // else{
          //   data.projob_code = ""
          //   data.projobsub_code = this.selectedTimecard.projobsub_code;
          // }

          // data.modified_by = this.initial_current.Username;

          // data.company_code = this.initial_current.CompCode         
          // data.timecard_color = "1"
          // data.timecard_workdate = new Date(this.selectedDate_fillter), new Date(this.selectedToDate_fillter)
          // data.timecard_in = this.timein
          // data.timecard_out = this.timeout

          // this.timecardService.timesheet_record(data).then(async (res) => {
          //   let result = await JSON.parse(res);
          //   if (result.success) {
          //     this.messageService.add({ severity: 'success', summary: 'Success', detail: "Record Success.." });
          //     this.edit_data = true;
          //     this.displayManage = false
          //     this.edit_timecard = false
              
          //     this.doLoadTimecard()

          //   }
          //   else {
          //     this.messageService.add({ severity: 'error', summary: 'Error', detail: "Record Not Success.." });
          //   }
          // })
        },
        reject: () => {
          this.messageService.add({ severity: 'warn', summary: 'Cancelled', detail: this.title_confirm_cancel[this.initial_current.Language] });
        },
        key: "myDialog"

      });
    }
  }

  close_searchemp() {
    this.searchEmp = false
  }

  /////
  version_selected: string = "";

  reloadPage() {
    
  }

  checked: boolean = false;

  selectedDataArray: any[] = [];
  toggleSelect(data: { checked: boolean }) {
    if (data.checked) {
      this.selectedDataArray.push(data);
      this.checked = true;
    } else {
      const index = this.selectedDataArray.findIndex(item => item === data);
      if (index > -1) {
        this.selectedDataArray.splice(index, 1);
        if (this.selectedDataArray.length === 0) {
          this.checked = false;
        }
      }
    }
  }


  isConfirmationDialogVisible: boolean = false;

  //Delete
  confirmDelete(selectedDataArray: TimecardsModel[]) {
    if (!this.hasTruePeriodCloseta) {
      this.isConfirmationDialogVisible = true;
      this.confirmationService.confirm({
        message: this.title_confirm_delete[this.initial_current.Language],
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
  }

  async doDeleteTimesheet(selectedDataArray: TimecardsModel[]) {

    if (!this.hasTruePeriodCloseta) {
      this.isConfirmationDialogVisible = true;
      try {
        for (const data of selectedDataArray) {
          const res = await this.timecardService.timesheet_delete(
            this.initial_current.CompCode, data.project_code, data.worker_code, data
          );

          if (res.success) {
            this.messageService.add({ severity: 'success', summary: 'Success', detail: res.message });
          } else {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: res.message });
          }
        }

        selectedDataArray.length = 0;
        this.doLoadPolJobmain();
        this.doLoadProjobsub()

        this.reloadPage();
        this.displayManage = false;
      } catch (error) {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'An error occurred while deleting.' });
      }
    }
  }


  showManage() {
    this.displayManage = true;

  }
  tabChange(e: { index: any }) {
    var index = e.index;
    //   

  }

  //เช็คชข้อมูลเมื่อมีการปิดงวด
  hasTruePeriodCloseta: boolean = false;
  async Periodclosed() {
    try {
      const res = await this.periodsService.period_get2(this.initial_current.CompCode, "PAY", this.initial_current.EmpType, this.initial_current.PR_Year, this.initial_current.TA_FromDate, this.initial_current.TA_ToDate);
      if (res && res.length > 0) {
        for (const element of res) {
          element.period_from = new Date(element.period_from);
          element.period_to = new Date(element.period_to);
          element.period_payment = new Date(element.period_payment);
        }
        this.hasTruePeriodCloseta = res.some((item: { period_closeta: boolean }) => item.period_closeta === true);
        if (this.hasTruePeriodCloseta) {
          this.confirmationService.confirm({
            message: this.initial_current.Language === 'TH' ? 'ข้อมูลที่ทำรายการอยู่ในงวดที่ปิดแล้ว' : 'Period is closed permission set to read-only !!!',
            header: this.initial_current.Language === 'TH' ? 'คำเตือน' : 'Warning',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
            },
            rejectVisible: false,
          });
        }
      }
    } catch { }
  }

  //-- F add 13/02/2024
  doLoadJob(){
    this.doLoadPolJobmain()
    this.doLoadProjobsub()

    this.selectJobmainType()
  }

  //--



  polcost_list: ProcostModel[] = [];
  polcost_list_cbb: RadiovalueModel[] = [];
  costs_title: string[] = [];
  doLoadPolCost() {
    var tmp = new ProcostModel();

    this.polcost_list_cbb = []
    this.procostService.procost_get(tmp).then((res) => {

      this.polcost_list = res;
      if (this.polcost_list.length > 0) {
        for (let i = 0; i < this.polcost_list.length; i++) {
          var tmp = new RadiovalueModel();
          tmp.value = this.polcost_list[i].procost_code;
          tmp.type = this.polcost_list[i].procost_type;
          if (this.initial_current.Language == "EN") {
            tmp.text = this.polcost_list[i].procost_name_en + " (" + this.polcost_list[i].procost_type + ")";
          }
          else {
            tmp.text = this.polcost_list[i].procost_name_th + " (" + this.polcost_list[i].procost_type + ")";
          }
          this.costs_title[i] = tmp.text
          this.polcost_list_cbb.push(tmp)

        }
      }
    });
  }


  withdraw_list: ProjectwithdrawModel[] = [];
  selectedWithdraw: ProjectwithdrawModel = new ProjectwithdrawModel();

}

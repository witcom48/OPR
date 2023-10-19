import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Table } from 'primeng/table';
import { ConfirmationService, ConfirmEventType, MenuItem, MessageService } from 'primeng/api';
import { PrjectEmpdailyModel } from '../../../models/project/project_empdaily';
import { Router } from '@angular/router';
import { AppConfig } from '../../../config/config';
import { InitialCurrent } from '../../../config/initial_current';

import { SelectEmpComponent } from '../../../components/usercontrol/select-emp/select-emp.component';

import { ProjectModel } from '../../../models/project/project';
import { ProjectService } from '../../../services/project/project.service';

import { ProjobmainModel } from '../../../models/project/project_jobmain';
import { ProjobversionModel } from '../../../models/project/project_jobversion';
import { ProjectDetailService } from '../../../services/project/project_detail.service';

import { ProjobempModel } from '../../../models/project/project_jobemp';
import { EmployeeModel } from 'src/app/models/employee/employee';

import { TaskComponent } from '../../../components/usercontrol/task/task.component';
import { TaskService } from '../../../services/task.service'

import { PrjectMonitorModel } from '../../../models/project/project_monitor'
import { JobMonitorModel } from '../../../models/project/job_monitor'

import { EmployeeService } from 'src/app/services/emp/worker.service';
import { FillterProjectModel } from 'src/app/models/usercontrol/fillterproject';

interface Combobox {
  name: string,
  code: string
}

interface Manpower {
  worker: string,
  item_sa: string,
  item_ot: string,
  item_dg: string,
  item_aw: string,
  item_ab: string,
  item_lt: string,
  item_lv: string,

  modied_by: string,
  modied_date: string,
}

@Component({
  selector: 'app-project-transfer',
  templateUrl: './project-transfer.component.html',
  styleUrls: ['./project-transfer.component.scss']
})
export class ProjectTransferComponent implements OnInit {
  project_code: string = "";
  @ViewChild(SelectEmpComponent) selectEmp: any;
  @ViewChild(TaskComponent) taskView: any;
  home: any;
  itemslike: MenuItem[] = [];
  title_confirm: { [key: string]: string } = { EN: "Are you sure?", TH: "ยืนยันการทำรายการ" }
  title_confirm_record: { [key: string]: string } = { EN: "Confirm to record", TH: "คุณต้องการบันทึกการทำรายการ" }
  title_confirm_delete: { [key: string]: string } = { EN: "Confirm to delete", TH: "คุณต้องการลบรายการ" }
  title_confirm_yes: { [key: string]: string } = { EN: "Yes", TH: "ใช่" }
  title_confirm_no: { [key: string]: string } = { EN: "No", TH: "ยกเลิก" }
  title_confirm_cancel: { [key: string]: string } = { EN: "You have cancelled", TH: "คุณยกเลิกการทำรายการ" }

  title_submit: { [key: string]: string } = { EN: "Submit", TH: "คุณยกเลิกการทำรายการ" }
  title_cancel: { [key: string]: string } = { EN: "Cancel", TH: "คุณยกเลิกการทำรายการ" }
  //
  title_page_from: { [key: string]: string } = { EN: "Showing", TH: "แสดง" }
  title_page_to: { [key: string]: string } = { EN: "to", TH: "ถึง" }
  title_page_total: { [key: string]: string } = { EN: "of", TH: "จาก" }
  title_page_record: { [key: string]: string } = { EN: "entries", TH: "รายการ" }
  title_modified_by: { [key: string]: string } = { EN: "Edit by", TH: "ผู้ทำรายการ" }
  title_modified_date: { [key: string]: string } = { EN: "Edit date", TH: "วันที่ทำรายการ" }

  title_staff: { [key: string]: string } = { EN: "Staff", TH: "ประจำหน่วยงาน" }
  title_staff_jobcode: { [key: string]: string } = { EN: "Job code", TH: "รหัสงาน" }
  title_staff_jobname: { [key: string]: string } = { EN: "Description", TH: "รายละเอียดงาน" }
  title_staff_empcode: { [key: string]: string } = { EN: "Emp code", TH: "รหัสพนักงาน" }
  title_staff_empname: { [key: string]: string } = { EN: "Emp name", TH: "ชื่อ-นามสกุล" }
  title_staff_empstatus: { [key: string]: string } = { EN: "Emp status", TH: "สถานะพนักงาน" }
  title_staff_fromadate: { [key: string]: string } = { EN: "Fromdate", TH: "วันที่เข้า" }
  title_staff_todate: { [key: string]: string } = { EN: "Todate", TH: "วันที่ออก" }
  title_staff_status: { [key: string]: string } = { EN: "Status", TH: "สถานะ" }
  title_staff_apprdate: { [key: string]: string } = { EN: "Approve date", TH: "วันที่อนุมัติ" }

  title_regular: { [key: string]: string } = { EN: "Regular", TH: "ประจำ" }
  title_temporary: { [key: string]: string } = { EN: "Temporary", TH: "ชั่วคราว" }

  title_project_code: { [key: string]: string } = { EN: "Code", TH: "รหัสโครงการ" }
  title_project_name: { [key: string]: string } = { EN: "Description", TH: "โครงการ" }
  title_emp_total: { [key: string]: string } = { EN: "Man power", TH: "กำลังแรงงาน" }

  title_staff_regular: { [key: string]: string } = { EN: "Regular", TH: "พนักงานประจำ" }
  title_staff_temp: { [key: string]: string } = { EN: "Temporary", TH: "พนักงานชั่วคราว" }
  title_staff_resign: { [key: string]: string } = { EN: "Resign", TH: "พนักงานลาออก" }

  title_staff_total: { [key: string]: string } = { EN: "Total", TH: "รวม" }
  title_staff_diff: { [key: string]: string } = { EN: "Diff.", TH: "ส่วนต่าง" }
  
  title_staff_transfer: { [key: string]: string } = { EN: "Transfer", TH: "โอนย้ายแรงงาน" }
  title_history: { [key: string]: string } = { EN: "History", TH: "ประวัติการโอนย้าย" }
  title_search: { [key: string]: string } = { EN: "Search", TH: "ค้นหา" }
  title_showing : { [key: string]: string } = { EN: "  Showing ", TH: "แสดง" }

  title_to : { [key: string]: string } = { EN: "  to ", TH: "ถึง" }
  title_of : { [key: string]: string } = { EN: "  of ", TH: "จาก" }
  title_entries : { [key: string]: string } = { EN: "  entries ", TH: "รายการ" }
  title_project: { [key: string]: string } = { EN: "Project", TH: "โครงการ" }
  title_job: { [key: string]: string } = { EN: "Job", TH: "งาน" }
  title_process: { [key: string]: string } = { EN: "Process", TH: "ประมวลผล" }

  
  menu_Reload: MenuItem[] = [];
  doLoadMenu() {
    this.itemslike = [{ label: this.title_staff_transfer[this.initial_current.Language], styleClass: 'activelike' }];
    this.home = { icon: 'pi pi-home', routerLink: '/' };
    this.menu_Reload = [

      {
        icon: 'pi pi-fw pi-refresh',
        command: (event) => {
          this.doLoadProjobemp()
        }
      }
    ]
  }
  

  constructor(private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private taskService: TaskService,
    private projectService: ProjectService,
    private projectDetailService: ProjectDetailService,
    private employeeService: EmployeeService,
    private router: Router
  ) { }

  ngOnInit(): void {

    this.doLoadLanguage()
    this.doGetInitialCurrent()

    setTimeout(() => {
      this.doLoadEmployee()
      this.doLoadProject()
      this.doLoadProjobmain()
      this.doLoadProjectMonitor()
    }, 200);
    setTimeout(() => {
      this.doLoadMenu()
    }, 100);
    setTimeout(() => {
      this.doLoadProjobemp()
    }, 1000);
  }

  public initial_current: InitialCurrent = new InitialCurrent();
  doGetInitialCurrent() {
    this.initial_current = JSON.parse(localStorage.getItem(AppConfig.SESSIONInitial) || '{}');
    if (!this.initial_current) {
      this.router.navigateByUrl('login');
    }
  }

  doLoadLanguage() {
    if (this.initial_current.Language == "TH") {

    }
  }

  async process() {

    let projobempModel: ProjobempModel = new ProjobempModel()

    this.confirmationService.confirm({
      message: this.title_confirm_record[this.initial_current.Language],
      header: this.title_confirm[this.initial_current.Language],
      icon: 'pi pi-exclamation-triangle',
      accept: () => {

        let record_list: ProjobempModel[] = [];



        this.selectEmp.employee_dest.forEach(async (emp: EmployeeModel) => {

          projobempModel = new ProjobempModel()
          projobempModel.project_code = this.selectedProject
          projobempModel.projob_code = this.selectedJob
          projobempModel.projobemp_status = "W"
          projobempModel.projobemp_type = this.selectedType
          projobempModel.projobemp_fromdate = this.selectedFromdate
          projobempModel.projobemp_todate = this.selectedToDate
          projobempModel.projobemp_emp = emp.worker_code
          record_list.push(projobempModel)

        })

        this.projectDetailService.projobemp_record2(this.selectedProject, record_list).then(async (res) => {
          let result = await JSON.parse(res);
          if (result.success) {
            this.messageService.add({ severity: 'success', summary: 'Success', detail: res.message });
          }
          else {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: res.message });
          }
        });






      },
      reject: () => {
        this.messageService.add({ severity: 'warn', summary: 'Cancelled', detail: this.title_confirm_cancel[this.initial_current.Language] });
      },
      key: "myDialog"
    });


  }


  selectedProject: string = ""
  selectedJob: string = ""
  selectedType: string = "R"
  selectedFromdate: Date = new Date()
  selectedToDate: Date = new Date()

  project_list: any[] = [];
  doLoadProject() {
    this.projectService.project_get(this.initial_current.CompCode, "").then(async (res) => {
      await res.forEach((element: ProjectModel) => {

        this.project_list.push(
          {
            name: this.initial_current.Language == "EN" ? element.project_name_en : element.project_name_th,
            code: element.project_code
          }
        )
      });
    });
  }

  doGetProjectDetail(code: string): string {
    for (let i = 0; i < this.project_list.length; i++) {
      if (this.project_list[i].code == code) {
        return this.project_list[i].name;
      }
    }
    return ""
  }


  async doGetLastVersion() {

    let version = ""
    this.projectDetailService.projobversion_get(this.selectedProject).then(async (res) => {
      await res.forEach((element: ProjobversionModel) => {
        version = element.version

 
      });

      await this.doLoadJob(this.selectedProject, version, '')
    });

  }

  job_list: any[] = [];
  doLoadJob(project: string, version: string, type: string) {

    this.projectDetailService.projobmain_get(version, project, type).then(async (res) => {
      await res.forEach((element: ProjobmainModel) => {

        this.job_list.push(
          {
            name: this.initial_current.Language == "EN" ? element.projobmain_name_en : element.projobmain_name_th,
            code: element.projobmain_code
          }
        )

      });
    });
  }

  //-- Project monitor
  project_monitor: PrjectMonitorModel[] = [];
  selectedProjectMonitor: PrjectMonitorModel = new PrjectMonitorModel;
  selectedDate_fillter: Date = new Date()
  selectedToDate_fillter: Date = new Date()
  doLoadProjectMonitor() {

    var probusiness = ""
    var protype = ""
    var proarea = ""
    var progroup = ""


    this.projectService.project_monitor(this.initial_current.CompCode, this.selectedDate_fillter, protype, probusiness, proarea, progroup).then(async (res) => {
      this.project_monitor = await res;
       setTimeout(() => {
        //this.calculateTotal()


      }, 500);
      this.projobemp_list = await res;
    });
  }


  //-- Employee
  employee_list: EmployeeModel[] = [];
  doLoadEmployee() {
    this.employeeService.worker_get(this.initial_current.CompCode, "").then(async (res) => {
      this.employee_list = await res;
    });
  }

  doGetEmployeeDetail(code: string): string {
    for (let i = 0; i < this.employee_list.length; i++) {
      if (this.employee_list[i].worker_code == code) {
        if (this.initial_current.Language == "TH") {
          return this.employee_list[i].worker_fname_th + ' ' + this.employee_list[i].worker_lname_th;
        }
        else {
          return this.employee_list[i].worker_fname_en + ' ' + this.employee_list[i].worker_lname_en;
        }
      }
    }
    return ""
  }

  //-- Project jobmain
  projobmain_list: ProjobmainModel[] = [];
  selectedProjobmain: ProjobmainModel = new ProjobmainModel();
  doLoadProjobmain() {
    this.projectDetailService.projobmain_get("", "", "").then(async (res) => {
      this.projobmain_list = await res;
    });
  }

  doGetProjobmainDetail(code: string): string {
    for (let i = 0; i < this.projobmain_list.length; i++) {
      if (this.projobmain_list[i].projobmain_code == code) {
        if (this.initial_current.Language == "TH") {
          return this.projobmain_list[i].projobmain_name_th;
        }
        else {
          return this.projobmain_list[i].projobmain_name_en;
        }
      }
    }
    return ""
  }

  doReload() {
    this.doLoadProject();
  }
  //// กรองวันที่FROMDATE
  doFillter() {
    this.doGetDataFillter()
  }

  doGetDataFillter() {
    const workerfillter: FillterProjectModel = new FillterProjectModel();
    workerfillter.company_code = this.initial_current.CompCode;
    workerfillter.project_code = this.project_code;
    this.projectDetailService.projobemp2_get(this.project_code, this.selectedDate_fillter, this.selectedDate_fillter).then((res) => {
      this.projobemp_list = res;
 
    });

  }
  //// กรองวันที่TODATE
  doFillter3() {
    this.doGetDataFillter3()
  }
  doGetDataFillter3() {
    const workerfillter: FillterProjectModel = new FillterProjectModel();
    workerfillter.company_code = this.initial_current.CompCode;
    workerfillter.project_code = this.project_code;
    this.projectDetailService.projobemp3_get(this.project_code, this.selectedToDate_fillter, this.selectedToDate_fillter).then((res) => {
      this.projobemp_list = res;
 
    });

  }
  //
 
  //-- Project emp
  projobemp_list: ProjobempModel[] = [];
  selectedProjobemp: ProjobempModel = new ProjobempModel();

  selectedProjobemp_name: string = ""

  doLoadProjobemp() {
    this.projectDetailService.projobemp_get("").then((res) => {
      this.projobemp_list = res;
    });
  }
  onRowSelectProjobemp(event: Event) {
    this.selectedProjobemp_name = this.selectedProjobemp.projobemp_emp + " : " + this.doGetEmployeeDetail(this.selectedProjobemp.projobemp_emp)
  }

  projobemp_type: any[] = [];
  doLoadJobemptype() {
    this.projobemp_type.push(
      {
        name: this.initial_current.Language == "EN" ? "Regular" : "ประจำ",
        code: "R"
      }
    )
    this.projobemp_type.push(
      {
        name: this.initial_current.Language == "EN" ? "Temporary" : "ชั่วคราว",
        code: "T"
      }
    )
  }

  doGetJobemptypeDetail(code: string): string {

    let result = ""
    for (let i = 0; i < this.projobemp_type.length; i++) {
      if (this.projobemp_type[i].code == code) {
        result = this.projobemp_type[i].name
        break
      }
    }
    return result
  }
  reloadPage() {
    this.doLoadProjobemp();
    console.log(this.reloadPage,'ttt')
  }
}

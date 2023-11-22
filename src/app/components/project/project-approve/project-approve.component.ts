import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { NavigationExtras } from '@angular/router';
import { Table } from 'primeng/table';
import { MegaMenuItem, MenuItem } from 'primeng/api';
import { Router } from '@angular/router';
import { ConfirmationService, ConfirmEventType, MessageService } from 'primeng/api';
import * as XLSX from 'xlsx';
import { DatePipe } from '@angular/common';

import { AppConfig } from '../../../config/config';
import { InitialCurrent } from '../../../config/initial_current';

import { ProjectModel } from '../../../models/project/project';
import { ProjectService } from '../../../services/project/project.service';

import { TRSysApproveModel } from '../../../models/system/security/sys_approve';
import { SysApproveServices } from '../../../services/system/security/sysapprove.service';
import { FillterProjectModel } from 'src/app/models/usercontrol/fillterproject';
import { ProjobempModel } from 'src/app/models/project/project_jobemp';
import { ProjectDetailService } from 'src/app/services/project/project_detail.service';
import { RadiovalueModel } from 'src/app/models/project/radio_value';
import { ProcontractModel } from 'src/app/models/project/project_contract';
import { EmployeeModel } from 'src/app/models/employee/employee';
import { EmployeeService } from 'src/app/services/emp/worker.service';

interface Combobox {
  name: string,
  code: string
}
interface Status {
  name_th: string,
  name_en: string,
  code: string
}
@Component({
  selector: 'app-project-approve',
  templateUrl: './project-approve.component.html',
  styleUrls: ['./project-approve.component.scss']
})
export class ProjectApproveComponent implements OnInit {
  status_list: Status[] = [{ name_th: 'รออนุมัติ', name_en: 'Wait', code: 'W' }, { name_th: 'อนุมัติแล้ว', name_en: 'Finish', code: 'F' }, { name_th: 'ไม่อนุมัติ', name_en: 'Reject', code: 'C' }];
  status_select: Status = { name_th: 'รออนุมัติ', name_en: 'Wait', code: 'W' }


  status2_list: Status[] = [{ name_th: 'รออนุมัติ', name_en: 'Wait', code: 'W' }, { name_th: 'อนุมัติแล้ว', name_en: 'Finish', code: 'F' }, { name_th: 'ไม่อนุมัติ', name_en: 'Reject', code: 'C' }];
  status2_select: Status = { name_th: 'รออนุมัติ', name_en: 'Wait', code: 'W' }




  items: MenuItem[] = [];
  toolbar_menu: MenuItem[] = [];
  home: any;
  itemslike: MenuItem[] = [];
  menu_project: MenuItem[] = [];
  menu_projobemp: MenuItem[] = [];

  project_code: string = "";
  projobemp_emp: string = "";
  title_modified_by: { [key: string]: string } = { EN: "Edit by", TH: "ผู้ทำรายการ" }
  title_modified_date: { [key: string]: string } = { EN: "Edit date", TH: "วันที่ทำรายการ" }
  title_page_from: { [key: string]: string } = { EN: "Showing", TH: "แสดง" }
  title_page_to: { [key: string]: string } = { EN: "to", TH: "ถึง" }
  title_page_total: { [key: string]: string } = { EN: "of", TH: "จาก" }
  title_page_record: { [key: string]: string } = { EN: "entries", TH: "รายการ" }

  title_new: { [key: string]: string } = { EN: "New", TH: "เพิ่ม" }
  title_edit: { [key: string]: string } = { EN: "Edit", TH: "แก้ไข" }
  title_delete: { [key: string]: string } = { EN: "Delete", TH: "ลบ" }
  title_import: { [key: string]: string } = { EN: "Import", TH: "นำเข้า" }
  title_export: { [key: string]: string } = { EN: "Export", TH: "โอนออก" }
  title_save: { [key: string]: string } = { EN: "Save", TH: "บันทึก" }
  title_close: { [key: string]: string } = { EN: "Close", TH: "ปิด" }
  title_cancel: { [key: string]: string } = { EN: "Cancel", TH: "ยกเลิก" }
  title_more: { [key: string]: string } = { EN: "More", TH: "เพิ่มเติม" }
  title_search: { [key: string]: string } = { EN: "Search", TH: "ค้นหา" }
  title_upload: { [key: string]: string } = { EN: "Upload", TH: "อัพโหลด" }

  title_view: { [key: string]: string } = { EN: "View", TH: "เรียกดู" }
  title_approve: { [key: string]: string } = { EN: "Approve", TH: "อนุมัติ" }
  title_notapprove: { [key: string]: string } = { EN: "Not approve", TH: "ไม่อนุมัติ" }
  title_view_approve: { [key: string]: string } = { EN: "Approve", TH: "ผู้อนุมัติ" }


  title_confirm: { [key: string]: string } = { EN: "Are you sure?", TH: "ยืนยันการทำรายการ" }
  title_confirm_record: { [key: string]: string } = { EN: "Confirm to record", TH: "คุณต้องการบันทึกการทำรายการ" }
  title_confirm_delete: { [key: string]: string } = { EN: "Confirm to delete", TH: "คุณต้องการลบรายการ" }
  title_confirm_yes: { [key: string]: string } = { EN: "Yes", TH: "ใช่" }
  title_confirm_no: { [key: string]: string } = { EN: "No", TH: "ยกเลิก" }
  title_confirm_cancel: { [key: string]: string } = { EN: "You have cancelled", TH: "คุณยกเลิกการทำรายการ" }

  title_page: { [key: string]: string } = { EN: "Project management", TH: "ข้อมูลโครงการ" }

  title_code: { [key: string]: string } = { EN: "Code", TH: "รหัส" }
  title_name_th: { [key: string]: string } = { EN: "Name (Thai)", TH: "ชื่อไทย" }
  title_name_en: { [key: string]: string } = { EN: "Name (Eng.)", TH: "ชื่ออังกฤษ" }
  title_projectcode: { [key: string]: string } = { EN: "Code", TH: "รหัสโครงการ" }
  title_projectname: { [key: string]: string } = { EN: "Name", TH: "ชื่อโครงการ" }
  title_protype: { [key: string]: string } = { EN: "Type", TH: "ประเภทงาน" }
  title_probusiness: { [key: string]: string } = { EN: "Business", TH: "ประเภทธุรกิจ" }
  title_fromdate: { [key: string]: string } = { EN: "From", TH: "จากวันที่" }
  title_todate: { [key: string]: string } = { EN: "To", TH: "ถึงวันที่" }
  title_manpower: { [key: string]: string } = { EN: "Manpower", TH: "จำนวนพนักงาน" }
  title_cost: { [key: string]: string } = { EN: "Cost", TH: "ต้นทุน" }
  title_status: { [key: string]: string } = { EN: "Status", TH: "สถานะ" }

  title_manage: { [key: string]: string } = { EN: "Manage", TH: "จัดการข้อมูล" }

  title_total_project: { [key: string]: string } = { EN: "New Project", TH: "โครงการใหม่" }
  title_total_transfer: { [key: string]: string } = { EN: "Transfer Emp.", TH: "โอนย้ายพนักงาน" }

  title_username: { [key: string]: string } = { EN: "Username", TH: "ผู้อนุมัติ" }
  title_approve_date: { [key: string]: string } = { EN: "Approve date", TH: "วันที่อนุมัติ" }

  title_popup_approve: { [key: string]: string } = { EN: "Approve", TH: "อนุมัติ" }

  title_defaultstatus: { [key: string]: string } = { EN: "Status", TH: "สถานะอนุมัติ" }
  title_wait: { [key: string]: string } = { EN: "Wait", TH: "รออนุมัติ" }
  title_approved: { [key: string]: string } = { EN: "Approved", TH: "อนุมัติแล้ว" }
  title_notApprove: { [key: string]: string } = { EN: "Not Approve", TH: "ไม่อนุมัติ" }
  title_project_progarea: { [key: string]: string } = { EN: "Area ", TH: "พื้นที่" }
  title_date: { [key: string]: string } = { EN: "Date", TH: "วันที่" }

  title_approve_list: { [key: string]: string } = { EN: "Approve List", TH: "รายการอนุมัติโครงการ" }

  title_Project: { [key: string]: string } = { EN: "Project", TH: "โครงการ" }


  title_staff_jobcode: { [key: string]: string } = { EN: "Job code", TH: "รหัสงาน" }
  title_project_code: { [key: string]: string } = { EN: "Code", TH: "รหัสโครงการ" }
  title_staff_empcode: { [key: string]: string } = { EN: "Emp code", TH: "รหัสพนักงาน" }
  title_staff_empname: { [key: string]: string } = { EN: "Emp name", TH: "ชื่อ-นามสกุล" }
  title_staff_fromadate: { [key: string]: string } = { EN: "Fromdate", TH: "จากวันที่" }
  title_staff_todate: { [key: string]: string } = { EN: "Todate", TH: "ถึงวันที่" }
  title_staff_status: { [key: string]: string } = { EN: "Status", TH: "สถานะ" }



  total_project: number = 0
  total_transfer: number = 0

  selectedDate_fillter: Date = new Date()
  selectedToDate_fillter: Date = new Date()

  constructor(private projectService: ProjectService,
    private router: Router,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private datePipe: DatePipe,
    private sysApproveServices: SysApproveServices,
    private projectDetailService: ProjectDetailService,
    private employeeService: EmployeeService,


  ) { }

  ngOnInit(): void {

    this.doGetInitialCurrent()
    this.doLoadMenu()
    this.doGetProjobempFillter()
    this.doLoadProject()

    setTimeout(() => {

      this.doLoadProjobemp()


    }, 300);
    setTimeout(() => {
      this.doLoadEmployee()
      this.doGetDataFillter();
    }, 500);
  }

  doLoadMenu() {
    this.itemslike = [{ label: this.title_approve_list[this.initial_current.Language], styleClass: 'activelike' }];
    this.home = { icon: 'pi pi-home', routerLink: '/' };
    this.menu_project = [
      {
        label: this.title_approve[this.initial_current.Language],
        icon: 'pi pi-fw pi-check',

        command: async (event) => {
          if (this.selectedProjects.length > 0) {
            this.approveNote = ""
            await this.approve_project("W")

          }
        }
      }
      ,
      {
        label: this.title_notapprove[this.initial_current.Language],
        icon: 'pi pi-fw pi-times',

        command: (event) => {

          if (this.selectedProjects.length > 0) {
            this.approveNote = ""
            this.openNotapprove()
            this.toggleSelect()
          }
        }
      }
    ];

    this.menu_projobemp = [
      {
        label: this.title_approve[this.initial_current.Language],
        icon: 'pi pi-fw pi-check',
        command: async (event) => {
          if (this.selectedProjobemp.length > 0) {
            this.approveNoteemp = ""
            await this.approve_projobemp("W")

          }


          // command: (event) => {
          //   if (this.selectedProjobemp.projobemp_emp != "") {
          //     this.approveNoteemp = ""
          //     this.approve_projobemp("W")

          //   }
        }
      }
      ,
      {
        label: this.title_notapprove[this.initial_current.Language],
        icon: 'pi pi-fw pi-times',
        command: (event) => {

          if (this.selectedProjobemp.length > 0) {
            this.approveNoteemp = ""
            this.openNotapprove()
            this.openNotapproveemp()
          }
        }

        // if (this.selectedProjobemp.projobemp_emp != "") {
        //   this.approveNoteemp = ""
        //   this.openNotapproveemp()
        // }

        // }
      }


    ];
  }

  public initial_current: InitialCurrent = new InitialCurrent();
  doGetInitialCurrent() {
    this.initial_current = JSON.parse(localStorage.getItem(AppConfig.SESSIONInitial) || '{}');
    if (!this.initial_current) {
      this.router.navigateByUrl('login');
    }
  }
  total_apply: number = 0

  project_list: ProjectModel[] = [];
  selectedProjects: ProjectModel[] = [];

  doLoadProject() {
    var tmp = new ProjectModel();
    tmp.company_code = this.initial_current.CompCode
    tmp.project_code = ""
    tmp.project_status = this.status_select.code

    this.projectService.projecttest_get(tmp).then(async (res) => {

      this.project_list = await res;
      // this.total_apply = this.project_list.length;
    })
  }
  reloadPage() {
    this.doLoadProject();
    this.doGetDataFillter();

  }
  // project_list: ProjectModel[] = [];
  // selectedProject: ProjectModel = new ProjectModel;
  // doLoadProject() {
  //    this.projectService.project_get_withstatus(this.initial_current.CompCode, "", this.status_select.code).then(async (res) => {
  //     this.project_list = await res;

  //     this.total_project = this.project_list.length;
  //     console.log(res, 'res');
  //   });
  //   console.log(this.status_select.code, 'ooooo');
  // }

  displayManage: boolean = false;
  position: string = "right";
  showManage() {
    this.displayManage = true

  }

  close_manage() {
    this.displayManage = false
  }

  async approve_project(status: string) {
    this.displayApproveNote = false
    this.confirmationService.confirm({
      message: this.title_confirm_record[this.initial_current.Language],
      header: this.title_confirm[this.initial_current.Language],
      icon: 'pi pi-exclamation-triangle',
      accept: async () => {
        this.selectedProjects.forEach(async (datas: ProjectModel) => {
          var data = new TRSysApproveModel()
          data.company_code = this.initial_current.CompCode
          data.approve_status = status
          data.workflow_type = "PRO_NEW"
          data.approve_code = datas.project_code
          data.approve_note = this.approveNote
          await this.sysApproveServices.approve_record(data).then((res) => {
            let result = JSON.parse(res);

            if (result.success) {
              this.messageService.add({ severity: 'success', summary: 'Success', detail: result.message });
              // this.doLoadProject()
              this.toggleSelect()
              this.selection
              this.doGetDataFillter()
            }
            else {
              this.messageService.add({ severity: 'error', summary: 'Error', detail: result.message });
            }
          });

        })

      },
      reject: () => {
        this.messageService.add({ severity: 'warn', summary: 'Cancelled', detail: this.title_confirm_cancel[this.initial_current.Language] });
      }

    });

  }

  // 

  // approve_project(status: string) {

  //   this.displayApproveNote = false

  //   this.confirmationService.confirm({
  //     message: this.title_confirm_record[this.initial_current.Language],
  //     header: this.title_confirm[this.initial_current.Language],
  //     icon: 'pi pi-exclamation-triangle',
  //     accept: () => {
  //       var data = new TRSysApproveModel()
  //       data.company_code = this.initial_current.CompCode
  //       data.approve_status = status
  //       data.workflow_type = "PRO_NEW"
  //       data.approve_code = this.selectedProject.project_code
  //       data.approve_note = this.approveNote

  //       this.sysApproveServices.approve_record(data).then((res) => {
  //         let result = JSON.parse(res);
  //         if (result.success) {
  //           this.messageService.add({ severity: 'success', summary: 'Success', detail: result.message });
  //           this.doLoadProject()
  //           this.toggleSelect(this.selectedProject)
  //           this.selection

  //           //this.displayManage = false
  //         }
  //         else {
  //           this.messageService.add({ severity: 'error', summary: 'Error', detail: result.message });
  //         }
  //         console.log(result,'pppppp')
  //       });

  //     },
  //     reject: () => {
  //       this.messageService.add({ severity: 'warn', summary: 'Cancelled', detail: this.title_confirm_cancel[this.initial_current.Language] });
  //     }
  //   });

  // }
  // 
  checked: boolean = false;

  buttonVisible: boolean = true;


  selectAllChecked: boolean = false;
  showButton: boolean = false;

  data = {
    checked: false
  };


  selection(data: ProjectModel) {
    if (data) {
    }
  }
  // 

  selectedDataArray: any[] = [];

  toggleSelect() {
    this.checked = !this.checked;
  }

  status_doc: boolean = false

  Search() {
    if (this.status_select.code) {
      this.status_doc = true;
    } else {
      this.status_doc = false;
    }
    this.doLoadProject();
    this.doGetDataFillter();
  }

  // 
  ///

  async doGetDataFillter() {
    const workerfillter: FillterProjectModel = new FillterProjectModel();
    workerfillter.company_code = this.initial_current.CompCode;
    workerfillter.project_status = this.status_select.code;
    this.project_list = await this.projectService.MTProject_getbyfillter(this.project_code, this.selectedDate_fillter, this.selectedToDate_fillter, workerfillter);
  }



  selectedstatus: string = "";
  doChangeSelectstatus() {
    this.doGetDataFillter();
  }


  displayApprove: boolean = false;

  showApprove() {
    this.displayApprove = true
  }

  closeApprove() {
    this.displayApprove = false

  }

  approve_list: TRSysApproveModel[] = [];
  selectedApprove: TRSysApproveModel = new TRSysApproveModel;
  doLoadApprove(subject_code: string, workflow_type: string) {

    var tmp = new TRSysApproveModel()
    tmp.approve_code = subject_code
    tmp.workflow_type = workflow_type

    this.sysApproveServices.approve_get(tmp).then(async (res) => {
      this.approve_list = await res;

      this.title_popup_approve = { EN: "View approve :" + subject_code, TH: "ผู้อนุมัติ :" + subject_code }
      this.showApprove()
    });
  }

  displayApproveNote: boolean = false;
  approveNote: string = ""
  openNotapprove() {
    this.displayApproveNote = true
  }

  confirm_notapprove() {
    this.approve_project("C")
  }
  // projobemp
  projobemp_list: ProjobempModel[] = [];
  selectedProjobemp: ProjobempModel[] = [];

  selectedProjobemps: ProjobempModel = new ProjobempModel();
  selectedProjobemp_name: string = ""
  selectedstatusProjobemps: FillterProjectModel = new FillterProjectModel();
  doLoadProjobemp() {
    this.projectDetailService.projectemp_get_withstatus("", this.project_code, "").then(async (res) => {
      this.projobemp_list = await res;
    });
  }


  Search2() {
    if (this.status2_select.code) {
      this.status_doc = true;
    } else {
      this.status_doc = false;
    }
    // this.approve_projobemp('');

    this.doLoadProjobemp();
    this.doGetProjobempFillter();
  }


  async doGetProjobempFillter() {
    const workerfillter: FillterProjectModel = new FillterProjectModel();
    const Radiovalue: RadiovalueModel = new RadiovalueModel();
    workerfillter.company_code = this.initial_current.CompCode;
    workerfillter.projobemp_status = this.selectedstatusProjobemp;
    // workerfillter.projobemp_status = this.status_select.code;

    this.projobemp_list = await this.projectDetailService.projobemp_getbyfillter(workerfillter, Radiovalue);
  }

  //-- Status สถานะ
  selectedstatusProjobemp: string = "";
  doChangeSelectstatusProjobemp() {
    this.doGetProjobempFillter();
  }

  //

  //
  approve_projobemp(status: string) {
    this.displayApproveNoteemp = false
    this.confirmationService.confirm({
      message: this.title_confirm_record[this.initial_current.Language],
      header: this.title_confirm[this.initial_current.Language],
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.selectedProjobemp.forEach(async (datas: ProjobempModel) => {
          var data = new TRSysApproveModel()
          data.company_code = this.initial_current.CompCode
          data.approve_status = status
          data.project_code = this.project_code
          data.workflow_type = "PRO_EMP"
          data.approve_code = datas.projobemp_emp
          data.approve_note = this.approveNoteemp

          await this.sysApproveServices.approve_record(data).then((res) => {
            let result = JSON.parse(res);
            if (result.success) {
              this.messageService.add({ severity: 'success', summary: 'Success', detail: result.message });
              this.doLoadProjobemp()
              this.doGetProjobempFillter()
            }
            else {
              this.messageService.add({ severity: 'error', summary: 'Error', detail: result.message });
            }
          });

        })

      },
      reject: () => {
        this.messageService.add({ severity: 'warn', summary: 'Cancelled', detail: this.title_confirm_cancel[this.initial_current.Language] });
      }

    });
  }


  displayApproveNoteemp: boolean = false;
  approveNoteemp: string = ""
  openNotapproveemp() {
    this.displayApproveNoteemp = true
  }

  confirm_notapproveemp() {
    this.approve_projobemp("C")
  }


  getFullStatus(code: string): any {
    for (let i = 0; i < this.status_list.length; i++) {
      if (this.status_list[i].code == code) {
        if (this.initial_current.Language == "TH") {
          return this.status_list[i].name_th;
        }
        else {
          return this.status_list[i].name_en;
        }
      }
    }
  }


  displayApproveemp: boolean = false;
  showApproveemp() {
    this.displayApproveemp = true
  }

  closeApproveemp() {
    this.displayApproveemp = false
  }
  doGetProjectDetail(code: string): string {
    for (let i = 0; i < this.project_list.length; i++) {
      if (this.project_list[i].project_name_th == code) {
        return this.project_list[i].project_name_th;
      }
    }
    return ""
  }
  approveemp_list: TRSysApproveModel[] = [];
  selectedApproveemp: TRSysApproveModel = new TRSysApproveModel;


  doLoadApproveemp(subject_code: string, workflow_type: string) {

    var tmp = new TRSysApproveModel()
    tmp.approve_code = subject_code
    tmp.workflow_type = workflow_type

    this.sysApproveServices.approve_get(tmp).then(async (res) => {
      this.approveemp_list = await res;

      this.title_popup_approve = { EN: "View approve :" + subject_code, TH: "ผู้อนุมัติ :" + subject_code }
      this.showApproveemp()
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
  onRowSelectProjobemp(event: Event) {
    this.selectedProjobemp_name = this.projobemp_emp + " : " + this.doGetEmployeeDetail(this.projobemp_emp)
  }
}

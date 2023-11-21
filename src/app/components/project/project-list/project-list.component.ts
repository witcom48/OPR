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
import { ProjectTypeModel } from '../../../models/project/project_type';
import { ProjectBusinessModel } from '../../../models/project/project_business';

import { ProbusinessModel, ProtypeModel, ProslipModel, ProuniformModel, ResponsibleareaModel } from '../../../models/project/policy/pro_genaral';
import { ProgenaralService } from '../../../services/project/pro_genaral.service';


import { ProjectService } from '../../../services/project/project.service';
import { AccessdataModel } from 'src/app/models/system/security/accessdata';
import { FillterProjectModel } from 'src/app/models/usercontrol/fillterproject';
import { ProcontractModel } from 'src/app/models/project/project_contract';
import { ProjectDetailService } from 'src/app/services/project/project_detail.service';
import { ProjobempModel } from 'src/app/models/project/project_jobemp';
import { ProareaModel } from 'src/app/models/project/project_proarea';
import { ProresponsibleModel } from 'src/app/models/project/project_responsible';
import { ResponsibleposModel } from 'src/app/models/project/responsiblepos';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss']
})
export class ProjectListComponent implements OnInit {
  project_code: string = "";
  projobemp_status: string = "";
  procontract_type: string = "";
  proresponsible_position: string = "";
  project_status: string = "";
  loading: boolean = true;
  project_list: ProjectModel[] = [];
  ptype_list: ProjectTypeModel[] = [];
  pbusiness_list: ProjectBusinessModel[] = [];
  statuses: any[] = [];
  home: any;
  itemslike: MenuItem[] = [];
  toolbar_menu: MenuItem[] = [];
  items: MenuItem[] = [];

  probusiness_list: ProbusinessModel[] = [];
  selectedProbusiness: ProbusinessModel = new ProbusinessModel();

  proarea_list: ProareaModel[] = [];


  protype_list: ProtypeModel[] = [];
  selectedProtype: ProtypeModel = new ProtypeModel();

  edit_data: boolean = false;
  new_data: boolean = false;

  selectedDate_fillter: Date = new Date()
  selectedToDate_fillter: Date = new Date()


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
  title_export: { [key: string]: string } = { EN: "Export", TH: "ส่งออกไฟล์" }
  title_save: { [key: string]: string } = { EN: "Save", TH: "บันทึก" }
  title_close: { [key: string]: string } = { EN: "Close", TH: "ปิด" }
  title_cancel: { [key: string]: string } = { EN: "Cancel", TH: "ยกเลิก" }
  title_more: { [key: string]: string } = { EN: "More", TH: "เพิ่มเติม" }
  title_search: { [key: string]: string } = { EN: "Search", TH: "ค้นหา" }
  title_upload: { [key: string]: string } = { EN: "Upload", TH: "อัพโหลด" }

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

  title_total_project: { [key: string]: string } = { EN: "Total project", TH: "จำนวนโครงการ" }
  title_new_project: { [key: string]: string } = { EN: "Project New", TH: "โครงการใหม่" }
  title_total_emp: { [key: string]: string } = { EN: "Total Emp.", TH: "จำนวนพนักงาน" }
  title_total_cost: { [key: string]: string } = { EN: "Cost", TH: "ต้นทุน" }

  title_manage: { [key: string]: string } = { EN: "Manage", TH: "จัดการข้อมูล" }


  title_defaultstatus: { [key: string]: string } = { EN: "Status", TH: "สถานะอนุมัติ" }
  title_wait: { [key: string]: string } = { EN: "Wait", TH: "รออนุมัติ" }
  title_approved: { [key: string]: string } = { EN: "Approved", TH: "อนุมัติแล้ว" }
  title_notApprove: { [key: string]: string } = { EN: "Not Approve", TH: "ไม่อนุมัติ" }
  title_project_progarea: { [key: string]: string } = { EN: "Area ", TH: "พื้นที่" }
  title_date: { [key: string]: string } = { EN: "Date", TH: "วันที่" }

  title_project: { [key: string]: string } = { EN: "Project", TH: "โครงการ" }
  title_fillter: { [key: string]: string } = { EN: "Fillter", TH: "ตัวกรอง" }


  title_template: { [key: string]: string } = { EN: "Template ", TH: "เทมเพลต" }

  title_responsiblearea: { [key: string]: string } = { EN: "Responsible Area", TH: "ผู้รับผิดชอบเขต" }
  title_proresponsible: { [key: string]: string } = { EN: "Proresponsible", TH: "ผู้รับผิดชอบตำแหน่ง" }


  total_project: number = 0
  new_project: number = 0
  total_emp: number = 0
  total_cost: number = 0

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
  }

  constructor(private projectService: ProjectService,
    private genaralService: ProgenaralService,
    private router: Router,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private datePipe: DatePipe,

    private projectDetailService: ProjectDetailService,

  ) { }

  ngOnInit(): void {

    this.doGetInitialCurrent()
    this.doLoadMenu()
    this.doLoadLanguage()
    this.doLoadMaster()

    setTimeout(() => {
      this.doLoadProject()
    }, 300);
    // setTimeout(() => {
    //   this.doGetDataFillter();
    // }, 300);
    //drop down
    this.doLoadProjects()
    this.doLoadResponsibleposList()
    this.doLoadresponsibleareaList()
  }

  doLoadMenu() {
    this.itemslike = [{ label: this.title_page[this.initial_current.Language], styleClass: 'activelike' }];
    this.home = { icon: 'pi pi-home', routerLink: '/' };
    this.items = [
      {
        label: this.title_new[this.initial_current.Language],
        icon: 'pi pi-fw pi-plus',
        command: (event) => {
          if (this.accessData.accessdata_new) {
            this.selectedProject = new ProjectModel();
            this.selectedProbusiness = new ProbusinessModel();
            this.selectedProtype = new ProtypeModel();
            this.selectProject();

            // this.new_data = true;
            // this.edit_data = true;
            // this.showManage()
          } else {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Permission denied' });
          }

        }
      }
      // ,
      // {
      //     label:this.title_edit[this.initial_current.Language],
      //     icon:'pi pi-fw pi-pencil',
      //     command: (event) => {

      //       if(this.selectedProject != null){
      //         this.new_data= false;
      //         this.edit_data = true
      //         this.showManage()
      //       }
      //   }
      // }
      ,
      {
        label: this.title_template[this.initial_current.Language],
        icon: 'pi-download',
        command: (event) => {
          window.open('assets/OPRFileImport/(OPR)Import Project/(OPR)Import Project.xlsx', '_blank');
        }
      }
      ,
      {
        label: this.title_import[this.initial_current.Language],
        icon: 'pi pi-fw pi-file-import',
        command: (event) => {
          this.showUpload()
          // this.showManage()
        }
      }
      ,
      {
        label: this.title_export[this.initial_current.Language],
        icon: 'pi pi-fw pi-file-export',
        command: (event) => {
          this.exportAsExcel()

        }
      }

    ];
  }

  doLoadMaster() {
    var tmp = new ProbusinessModel();

    this.genaralService.probusiness_get(tmp).then((res) => {
      this.probusiness_list = res;
    });
    var tmp2 = new ProtypeModel();
    this.genaralService.protype_get(tmp2).then((res) => {
      this.protype_list = res;
    });
    var tmp5 = new ProareaModel();
    this.genaralService.proarea_get(tmp5).then((res) => {
      this.proarea_list = res;
    });
  }

  clear(table: Table) {
    table.clear();
  }

  selectProject() {
    let navigationExtras: NavigationExtras = {
      queryParams: {
        "project": this.selectedProject.project_code
      }
    };

    this.router.navigate(["project/manage"], navigationExtras);
  }

  onRowSelectProject(event: any) {
    this.edit_data = true;
    this.new_data = true;
    this.displayManage = true
    this.doLoadSelectedProbusiness(this.selectedProject.project_probusiness);
    this.doLoadSelectedProtype(this.selectedProject.project_protype);
  }

  doLoadSelectedProbusiness(value: string) {
    for (let i = 0; i < this.probusiness_list.length; i++) {
      if (this.probusiness_list[i].probusiness_code == value) {
        this.selectedProbusiness = this.probusiness_list[i];
        break;
      }
    }
  }

  doLoadSelectedProtype(value: string) {
    for (let i = 0; i < this.protype_list.length; i++) {
      if (this.protype_list[i].protype_code == value) {
        this.selectedProtype = this.protype_list[i];
        break;
      }
    }
  }

  selectedProject: ProjectModel = new ProjectModel;
  doLoadProject() {

    this.projectService.project_get(this.initial_current.CompCode, "").then(async (res) => {
      this.project_list = await res;
      setTimeout(() => {
        this.calculateTotal()
      }, 1000);
    });

  }

  // drop down
  projects_list: ProjectModel[] = [];
  doLoadProjects() {
    this.projectService.project_get(this.initial_current.CompCode, "").then(async (res) => {
      this.projects_list =  res;
     });

  }

  selection(project: ProjectModel) {
    this.selectedProject = project

    this.new_data = false;
    this.edit_data = true
    this.showManage()

  }

  calculateTotal() {

    this.total_project = 0;
    this.total_emp = 0;
    this.new_project = 0;
    this.total_cost = 0;


    for (let project of this.project_list) {
      this.total_project++;
      this.total_emp += project.project_emp;
      this.total_cost += project.project_cost;

      if (project.approve_status == "W") {
        this.new_project++;
      }

      //if (project.project_start.getTime() >= this.initial_current.PR_FromDate.getTime()) {
      //  this.new_project++;
      //}

    }


  }
  deleteProject(project: ProjectModel) {
    this.projectService.project_delete(project).then((res) => {
      if (res.success) {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: res.message,

        });
      } else {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: res.message,
        });
      }
      reject: () => {
        this.messageService.add({ severity: 'warn', summary: 'Cancelled', detail: this.title_confirm_cancel[this.initial_current.Language] });
      }
    });
  }
  confirmRecord() {
    this.confirmationService.confirm({
      message: this.title_confirm_record[this.initial_current.Language],
      header: this.title_confirm[this.initial_current.Language],
      icon: 'pi pi-exclamation-triangle',
      accept: () => {

        this.selectedProject.company_code = this.initial_current.CompCode

        this.projectService.project_record(this.selectedProject).then((res) => {
          let result = JSON.parse(res);
          if (result.success) {
            this.messageService.add({ severity: 'success', summary: 'Success', detail: result.message });
            this.doLoadProject()

            this.new_data = false;
            this.edit_data = false;
            this.displayManage = false;
          }
          else {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: result.message });
          }
        });
      },
      reject: () => {
        this.messageService.add({ severity: 'warn', summary: 'Cancelled', detail: this.title_confirm_cancel[this.initial_current.Language] });
      }
    });
  }



  Delete_Project(project: ProjectModel) {
    this.confirmationService.confirm({
      message: this.title_confirm_delete[this.initial_current.Language],
      header: this.title_confirm[this.initial_current.Language],
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.projectService.project_delete(project).then((res) => {
          let result = JSON.parse(res);
          if (result.success) {
            this.messageService.add({ severity: 'success', summary: 'Success', detail: result.message });
            this.doLoadProject()
            this.new_data = false;
            this.edit_data = false;
            this.displayManage = false;
          }
          else {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: result.message });
          }
        });
      },
      reject: () => {
        this.messageService.add({ severity: 'warn', summary: 'Cancelled', detail: this.title_confirm_cancel[this.initial_current.Language] });
      }
    });
  }



  confirmDelete() {
    this.confirmationService.confirm({
      message: this.title_confirm_delete[this.initial_current.Language],
      header: this.title_confirm[this.initial_current.Language],
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.projectService.project_delete(this.selectedProject).then((res) => {
          let result = JSON.parse(res);
          if (result.success) {
            this.messageService.add({ severity: 'success', summary: 'Success', detail: result.message });
            this.doLoadProject()
            this.new_data = false;
            this.edit_data = false;
            this.displayManage = false;
          }
          else {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: result.message });
          }
        });
      },
      reject: () => {
        this.messageService.add({ severity: 'warn', summary: 'Cancelled', detail: this.title_confirm_cancel[this.initial_current.Language] });
      }
    });
  }

  displayUpload: boolean = false;
  showUpload() {
    this.displayUpload = true;
  }

  @ViewChild('TABLE') table: ElementRef | any = null;

  exportAsExcel() {
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(this.table.nativeElement);//converts a DOM TABLE element to a worksheet
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    XLSX.writeFile(wb, 'Export_genaral.xlsx');

  }

  fileToUpload: File | any = null;
  handleFileInput(file: FileList) {
    this.fileToUpload = file.item(0);
  }
  doUploadGenaral() {

    this.displayUpload = false;

    const filename = "Project_" + this.datePipe.transform(new Date(), 'yyyyMMddHHmm');
    const filetype = "xls";

    this.projectService.project_import(this.fileToUpload, filename, filetype).then((res) => {
      let result = JSON.parse(res);
      if (result.success) {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: result.message });
        this.doLoadProject()
      }
      else {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: result.message });
      }
    });

  }

  displayManage: boolean = false;
  position: string = "right";
  showManage() {
    this.displayManage = true

  }
  reloadPage() {
    this.doLoadProject()
  }
  close_manage() {
    this.displayManage = false
  }


  doGetStatusDetail(status: string): any {
    if (status == "W") {
      return this.initial_current.Language == "EN" ? "Wait" : "รออนุมัติ"
    }
    else if (status == "F") {
      return this.initial_current.Language == "EN" ? "Approved" : "อนุมัติแล้ว"
    }
    else if (status == "C") {
      return this.initial_current.Language == "EN" ? "Not Approve" : "ไม่อนุมัติ"
    }
  }

  getSeverity(status: string): any {
    switch (status) {
      case 'F':
        return 'success';
      case 'W':
        return 'Info';
      case 'C':
        return 'danger';
    }
  }
//รับผิดชอบพื้นที่
  Responsiblepos_List: ResponsibleposModel[] = [];
  doLoadResponsibleposList() {
    var tmp = new ResponsibleposModel();
    this.genaralService.MTResponsiblepos_get(tmp).then(async (res) => {
      this.Responsiblepos_List = await res;
    })
  }

  responsiblearea_list: ResponsibleareaModel[] = [];
  doLoadresponsibleareaList() {
    var tmp = new ResponsibleareaModel();
    this.genaralService.MTResponsiblearea_get(tmp).then(async (res) => {
      this.responsiblearea_list = await res;
    })
  }

  doFillter() {
    this.doGetDataFillter()
  }
  ///
  doGetDataFillter() {
    const workerfillter: FillterProjectModel = new FillterProjectModel();
    const workerfillters: ProresponsibleModel = new ProresponsibleModel();


    workerfillter.company_code = this.initial_current.CompCode;
    workerfillter.project_code = this.project_code;
 
    

    // สถานะ
    if (this.fillterStatus) {
      workerfillter.project_status = this.selectedstatus;
    } else {
      workerfillter.project_status = '';
    }

    // ประเภทธุรกิจ
    if (this.fillterbusiness) {
      workerfillter.project_probusiness = this.selectedbusiness;
    } else {
      workerfillter.project_probusiness = '';
    }

    // พื้นที่
    if (this.fillterproarea) {
      workerfillter.project_proarea = this.selectedproarea;
    } else {
      workerfillter.project_proarea = '';
    }
    // โครงการ
    
    if (this.fillterprojects) {
      workerfillter.searchemp = this.selectedprojects;
    } else {
      workerfillter.searchemp = '';
    }



    //
    if (this.proresponsible_fillter) {
      workerfillter.proresponsible_position = this.selectedProresponsible_fillter;
    } else {
      workerfillter.proresponsible_position = '';
    }


    if (this.responsiblearea_fillter) {
      workerfillter.proresponsible_area = this.selectedResponsiblearea_fillter;
    } else {
      workerfillter.proresponsible_area = '';
    }
    //

    this.projectService.MTProject_getbyfillter(this.selectedProject.project_code, this.selectedDate_fillter, this.selectedToDate_fillter, workerfillter).then((res) => {
      this.project_list = res;
     });
  }
  //-- Status สถานะ
  selectedstatus: string = "";
  fillterStatus: boolean = false;
  doChangeSelectstatus() {

    if (this.fillterStatus) {
      this.doGetDataFillter();
    }
  }

  fillterDate: boolean = false;
  doToggleDateFilter() {
    if (!this.fillterDate) {
      this.doGetDataFillter();
      this.selectedDate_fillter = new Date();
      this.selectedToDate_fillter = new Date();
    }
  }




  //-- ประเภทธุรกิจ
  selectedbusiness: string = "";
  fillterbusiness: boolean = false;
  doChangeSelectbusiness() {

    if (this.fillterbusiness) {
      this.doGetDataFillter();
    }
  }
  //-- พื้นที่
  selectedproarea: string = "";
  fillterproarea: boolean = false;
  doChangeSelectproarea() {

    if (this.fillterproarea) {
      this.doGetDataFillter();
    }
  }

  //-- โครงการ
  selectedprojects: string = "";
  fillterprojects: boolean = false;
  doChangeSelectprojects(event: any) {

    if (this.fillterprojects) {
      this.doGetDataFillter();
      console.log(this.fillterprojects,'ppp')
    }
  }


   //-- รับผิดชอบพื้นที่
   selectedProresponsible_fillter: string = "";
   proresponsible_fillter: boolean = false;
   doChangeSelectProresponsible() {
     if (this.proresponsible_fillter) {
       this.doGetDataFillter();
     }
   }

    //-- รับผิดชอบเขต  
    selectedResponsiblearea_fillter: string = "";
    responsiblearea_fillter: boolean = false;
    doChangeSelectResponsiblearea() {
      if (this.responsiblearea_fillter) {
        this.doGetDataFillter();
      }
    }
 

   

  //-- วันที่เริ่ม

  //-- วันที่สิ้นสุด
  selectedtodate: string = "";
  filltertodate: boolean = false;
  doChangeSelectfilltertodate() {

    if (this.filltertodate) {
      this.doGetDataFillter();
    }
  }

  //// กรองวันที่FROMDATE
  doFillter2() {
    this.doGetDataFillter2()
  }

  doGetDataFillter2() {
    const workerfillter: FillterProjectModel = new FillterProjectModel();
    workerfillter.company_code = this.initial_current.CompCode;
    workerfillter.project_code = this.project_code
    this.projectService.MTProject_getbyfillter2(this.selectedProject.project_code, this.selectedDate_fillter, this.selectedDate_fillter, workerfillter).then((res) => {
      this.project_list = res;
    });
  }

  // กรองวันที่ToDate
  doFillter3() {
    this.doGetDataFillter3()
  }

  doGetDataFillter3() {
    const workerfillter: FillterProjectModel = new FillterProjectModel();
    workerfillter.company_code = this.initial_current.CompCode;
    workerfillter.project_code = this.project_code
    this.projectService.MTProject_getbyfillter3(this.selectedProject.project_code, this.selectedToDate_fillter, this.selectedToDate_fillter, workerfillter).then((res) => {
      this.project_list = res;
    });
  }

 


}

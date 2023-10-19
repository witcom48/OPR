import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NavigationExtras } from '@angular/router';
import { Table } from 'primeng/table';
import { ConfirmationService, MegaMenuItem, MenuItem, MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import * as XLSX from 'xlsx';


import { DatePipe } from '@angular/common';
import { InitialCurrent } from 'src/app/config/initial_current';
import { AppConfig } from 'src/app/config/config';


import { EmpDetailService } from 'src/app/services/emp/worker_detail.service';
import { PositionService } from 'src/app/services/emp/policy/position.service';
import { ApplyworkService } from 'src/app/services/recruitment/applywork.service';
import { ApplyworkModel } from 'src/app/models/recruitment/applywork';
import { InitialModel } from 'src/app/models/employee/policy/initial';
import { InitialService } from 'src/app/services/emp/policy/initial.service';
import { EmployeeModel } from 'src/app/models/employee/employee';
import { ApplyworkDetailService } from 'src/app/services/recruitment/applywork-detail.service';
import { EmployeeService } from 'src/app/services/emp/worker.service';
import { PolcodeService } from 'src/app/services/system/policy/polcode.service';
import { ApplyMTDocattModel } from 'src/app/models/recruitment/applyMTDocatt';
import { EmpaddressModel } from 'src/app/models/employee/manage/address';
import { EmpForeignerModel } from 'src/app/models/employee/manage/foreigner';
import { EmpEducationModel } from 'src/app/models/employee/manage/education';
import { EmpTrainingModel } from 'src/app/models/employee/manage/training';
import { EmpAssessmentModel } from 'src/app/models/employee/manage/assessment';
import { EmpCriminalModel } from 'src/app/models/employee/manage/criminal';
import { EmpSuggestModel } from 'src/app/models/employee/manage/empsuggest';
import { EmpPositionModel } from 'src/app/models/employee/manage/position';
import { EmpSalaryModel } from 'src/app/models/employee/manage/salary';
import { EmpBenefitsModel } from 'src/app/models/employee/manage/benefits';
import { AccessdataModel } from 'src/app/models/system/security/accessdata';
import { EmpForeignercardModel } from 'src/app/models/employee/manage/foreignercard';
import { BlacklistModel } from 'src/app/models/recruitment/blacklist';
import { BlacklistService } from 'src/app/services/recruitment/blacklist.service';
import { ReasonsService } from 'src/app/services/system/policy/reasons.service';
import { ReasonModels } from 'src/app/models/attendance/reason';


interface ImportList {
  name_th: string,
  name_en: string,
  code: string
}
interface Status {
  name_th: string,
  name_en: string,
  code: string
}
interface StatusCer {
  name_th: string,
  name_en: string,
  value: string
}

@Component({
  selector: 'app-apply-list',
  templateUrl: './apply-list.component.html',
  styleUrls: ['./apply-list.component.scss']
})
export class ApplyListComponent implements OnInit {
  applywork_code: string = "";
  reqworkerList: EmployeeModel[] = [];
  selectedReqworker: EmployeeModel = new EmployeeModel();
  applywork_list: ApplyworkModel[] = [];
  selectedApplywork: ApplyworkModel = new ApplyworkModel();
  items: MenuItem[] = [];
  edit_applywork: boolean = false;
  new_applywork: boolean = false;
  ImportList: ImportList[] = [];

  status_list: Status[] = [{ name_th: 'รอดำเนินการ', name_en: 'Wait', code: 'W' }, { name_th: 'เสร็จ', name_en: 'Finish', code: 'F' }, { name_th: 'ปฏิเสธ', name_en: 'Reject', code: 'C' }, { name_th: 'ส่งอนุมัติ', name_en: 'Send Approve', code: 'S' }];
  status_select: Status = { name_th: 'รอดำเนินการ', name_en: 'Wait', code: 'W' }
  status_doc: boolean = false

  statusCer: StatusCer[] = [{ name_th: 'รอเอกสาร', name_en: 'Wait', value: 'Wait' }, { name_th: 'แนบเอกสารแล้ว', name_en: 'Attached', value: 'Attached' },]
  statusCer_select = "";
  constructor(
    private applyworkService: ApplyworkService,
    private applydetailService: ApplyworkDetailService,
    private router: Router,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private datePipe: DatePipe,

    private employeeService: EmployeeService,
    private polcodeService: PolcodeService,

    private initialService: InitialService,
    private positionService: PositionService,
    private empdetailService: EmpDetailService,
    private reqdetailService: ApplyworkDetailService,
    private blacklistService: BlacklistService,
    private reasonService: ReasonsService,
  ) {
    this.ImportList = [
      { name_th: 'ข้อมูลผู้สมัครงาน', name_en: 'Recruiment Info', code: 'REQWORKER' },
      { name_th: 'ข้อมูลที่อยู่ผู้สมัครงาน', name_en: 'Recruiment Address', code: 'REQADDRESS' },
      { name_th: 'ข้อมูลบัตรผู้สมัครงาน', name_en: 'Recruiment Cards', code: 'REQCARD' },
      { name_th: 'ข้อมูลต่างด้าวของผู้สมัครงาน', name_en: 'Recruiment Foreigner', code: 'REQFOREIGNER' },
      { name_th: 'ข้อมูลการศึกษาผู้สมัครงาน', name_en: 'Recruiment Education', code: 'REQEDUCATION' },
      { name_th: 'ข้อมูลฝึกอบรมผู้สมัครงาน', name_en: 'Recruiment Training', code: 'REQTRAINING' },
      { name_th: 'ข้อมูลการประเมินผู้สมัครงาน', name_en: 'Recruiment Assessment', code: 'REQASSESSMENT' },
      { name_th: 'ข้อมูลตรวจสอบอาชญกรรม', name_en: 'Recruiment Criminal', code: 'REQCRIMINAL' },
      { name_th: 'ข้อมูลผู้แนะนำผู้สมัครงาน', name_en: 'Recruiment Suggest', code: 'REQSUGGEST' },
    ]
  }

  ngOnInit(): void {
    this.doGetInitialCurrent();

    this.doLoadLanguage()

    this.doLoadInitialList();
    this.doLoadBlacklistList();
    this.doLoadReasonList();
    // this.doLoadEmptypeList();
    // this.doLoadEmpstatusList();

    setTimeout(() => {
      this.doLoadMenu()
      this.doLoadapplywork()
    }, 500);

  }
  initialData2: InitialCurrent = new InitialCurrent();
  accessData: AccessdataModel = new AccessdataModel();
  public initial_current: InitialCurrent = new InitialCurrent();
  doGetInitialCurrent() {
    this.initial_current = JSON.parse(localStorage.getItem(AppConfig.SESSIONInitial) || '{}');
    if (!this.initial_current) {
      this.router.navigateByUrl('login');
    }
    this.accessData = this.initialData2.dotGetPolmenu('REQ');
  }

  title_page: string = "Applywork";
  title_num_emp: string = "Applywork";
  title_new_emp: string = "New";
  title_resign_emp: string = "Resign";
  title_new: string = "New";
  title_edit: string = "Edit";
  title_delete: string = "Delete";
  title_import: string = "Import";
  title_export: string = "Export";
  title_save: string = "Save";
  title_code: string = "Emp. Code";
  title_initial: string = "Initial";
  title_emptype: string = "Type";
  title_position: string = "Position";
  title_Fname: string = "Firstname";
  title_name: string = "Name";
  title_Lname: string = "Surname";
  title_startdate: string = "Start Date";
  title_hiredate: string = "Hire date"
  title_status: string = "Status";
  title_apprdate: string = "Approve Date";
  title_modified_by: string = "Edit by";
  title_modified_date: string = "Edit date";
  title_search: string = "Search";
  title_upload: string = "Upload";

  title_page_from: string = "Showing";
  title_page_to: string = "to";
  title_page_total: string = "of";
  title_page_record: string = "entries";

  title_confirm: string = "Are you sure?";
  title_confirm_record: string = "Confirm to record";
  title_confirm_delete: string = "Confirm to delete";
  title_confirm_yes: string = "Yes";
  title_confirm_no: string = "No";

  title_confirm_cancel: string = "You have cancelled";

  title_saves: { [key: string]: string } = { EN: "Save", TH: "บันทึก" };
  title_more: { [key: string]: string } = { EN: "More", TH: "เพิ่มเติม" };
  title_deletes: { [key: string]: string } = { EN: "Delete", TH: "ลบ" };
  title_searchemp: { [key: string]: string } = { EN: "Search", TH: "ค้นหา" };

  title_apprstatus: { [key: string]: string } = { EN: "Status", TH: "สถานะ" };
  title_McerFil: { [key: string]: string } = { EN: "Blacklist", TH: "แบล็คลิสต์" };

  title_convert: { [key: string]: string } = { EN: "Convert", TH: "Convert" };
  title_requestmcer: { [key: string]: string } = { EN: "Require Medical Certificate", TH: "ใบรับรองแพทย์" };
  title_blacklist: { [key: string]: string } = { EN: "Blacklist", TH: "แบล็คลิสต์" };

  title_manage: { [key: string]: string } = { EN: "Manage", TH: "จัดการ" };
  title_link: { [key: string]: string } = { EN: "Link", TH: "ลิงก์" };
  title_template: { [key: string]: string } = { EN: "Template", TH: "เทมเพลต" };
  title_reqinfo: { [key: string]: string } = { EN: "Recruitment Info", TH: "ข้อมูลรับสมัครพนักงาน" };

  title_dropfile: { [key: string]: string } = { EN: "Drop files here", TH: "วางไฟล์ที่นี่" };
  title_or: { [key: string]: string } = { EN: "or", TH: "หรือ" };

  title_choose: { [key: string]: string } = { EN: "Choose File", TH: "เลือกไฟล์" };
  title_nofile: { [key: string]: string } = { EN: "No file chosen", TH: "ไม่มีไฟล์ที่เลือก" };

  doLoadLanguage() {
    if (this.initial_current.Language == "TH") {
      this.title_page = "ประวัติผู้สมัครงาน";
      this.title_num_emp = "จำนวนผู้สมัคร";
      this.title_new_emp = "พนักงานใหม่";
      this.title_resign_emp = "พนักงานลาออก";
      this.title_new = "เพิ่ม";
      this.title_edit = "แก้ไข";
      this.title_delete = "ลบ";
      this.title_import = "นำเข้า";
      this.title_export = "ส่งออกไฟล์";
      this.title_save = "บันทึก";
      this.title_code = "รหัสพนักงาน";
      this.title_initial = "คำนำหน้า";
      this.title_emptype = "ประเภทพนักงาน";
      this.title_position = "ตำแหน่ง";
      this.title_Fname = "ชื่อ";
      this.title_name = "ชื่อ-นามสกุล";
      this.title_startdate = "วันที่เริ่มงาน";
      this.title_hiredate = "วันที่พร้อมเริ่มงาน"
      this.title_status = "สถานะ";
      this.title_apprdate = "วันที่อนุมัติ";
      this.title_modified_by = "ผู้ทำรายการ";
      this.title_modified_date = "วันที่ทำรายการ";
      this.title_search = "ค้นหา";
      this.title_upload = "อัพโหลด";

      this.title_page_from = "แสดง";
      this.title_page_to = "ถึง";
      this.title_page_total = "จาก";
      this.title_page_record = "รายการ";

      this.title_confirm = "ยืนยันการทำรายการ";
      this.title_confirm_record = "คุณต้องการบันทึกการทำรายการ";
      this.title_confirm_delete = "คุณต้องการลบรายการ";

      this.title_confirm_yes = "ใช่";
      this.title_confirm_no = "ยกเลิก";
      this.title_confirm_cancel = "คุณยกเลิกการทำรายการ";

    }
  }

  doLoadMenu() {
    this.items = [

      {
        label: this.title_new,
        icon: 'pi pi-fw pi-plus',
        command: (event) => {
          if (this.accessData.accessdata_new) {
            this.showManage()
            // this.new_applywork = true;
            // this.edit_applywork = false;
            this.selectedReqworker = new EmployeeModel();
            this.selectComManage();
          } else {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Permistion' });
          }
        }

      },
      {
        label: this.title_template[this.initial_current.Language],
        icon: 'pi-download',
        items: [
          {
            label: this.title_reqinfo[this.initial_current.Language],
            // icon: 'pi-download',
            command: (event) => {
              window.open('assets/OPRFileImport/(OPR)Import req/(OPR)Import Recruitment.xlsx', '_blank');
            }
          }
        ]
      },
      {
        label: this.title_import,
        icon: 'pi pi-fw pi-file-import',
        command: (event) => {
          this.showUpload()

        }
      },
      {
        label: this.title_export,
        icon: 'pi pi-fw pi-file-export',
        command: (event) => {
          this.exportReqExcel()

        }
      }

    ];

  }
  //get data
  initialList: InitialModel[] = [];
  doLoadInitialList() {
    this.initialService.initial_get().then((res) => {
      this.initialList = res;
    })
  }
  blacklistList: BlacklistModel[] = [];
  doLoadBlacklistList() {
    this.blacklistService.blacklist_get(this.initial_current.CompCode, "", "").then((res) => {
      this.blacklistList = res;
    })
  }
  reasonList: ReasonModels[] = [];
  doLoadReasonList() {
    var tmp = new ReasonModels();
    tmp.reason_group = "BLACK";
    this.reasonService.reason_get(tmp).then((res) => {
      this.reasonList = res;
    })
  }
  Search() {
    if (this.status_select.code) {
      this.status_doc = true;
    } else {
      this.status_doc = false;
    }
    this.doLoadapplywork();
  }

  applyworkCurrent: number = 0;
  fillterBlacklist: boolean = false;
  doLoadapplywork() {
    this.reqworkerList = [];
    var tmp = new EmployeeModel();
    tmp.company_code = this.selectedReqworker.company_code || this.initial_current.CompCode
    tmp.worker_code = ""
    tmp.status = this.status_select.code
    tmp.blacklist = this.fillterBlacklist
    this.applyworkService.reqworker_get(tmp).then(async (res) => {
      await res.forEach((element: EmployeeModel) => {
        element.worker_hiredate = new Date(element.worker_hiredate)
        element.worker_birthdate = new Date(element.worker_birthdate)
        element.blacklist_reason = this.getBlacklistReason(element.worker_cardno)
        element.certificate = this.checkMCer(element.worker_birthdate, element.checkcertificate)
      })
      this.reqworkerList = await res;
      this.applyworkCurrent = this.reqworkerList.length;
    })
  }

  confirmRecord() {
    this.confirmationService.confirm({
      message: this.title_confirm_record,
      header: this.title_confirm,
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.doRecordApplywork()
      },
      reject: () => {
        this.messageService.add({ severity: 'warn', summary: 'Cancelled', detail: this.title_confirm_cancel });
      },
      key: "myDialog"
    });
  }

  doRecordApplywork() {
    this.applyworkService.reqworker_record([this.selectedReqworker]).then((res) => {
      let result = JSON.parse(res);

      if (result.success) {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: result.message });
        this.doLoadapplywork()
      }
      else {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: result.message });
      }

    });
  }

  confirmDelete() {
    this.confirmationService.confirm({
      message: this.title_confirm_delete,
      header: this.title_confirm,
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.doDeleteApplywork()
      },
      reject: () => {
        this.messageService.add({ severity: 'warn', summary: 'Cancelled', detail: this.title_confirm_cancel });
      }
    });
  }

  doDeleteApplywork() {
    var tmp: EmployeeModel = new EmployeeModel();
    tmp.worker_code = this.selectedReqworker.worker_code
    tmp.worker_id = this.selectedReqworker.worker_id
    this.applyworkService.reqworker_delete(tmp).then((res) => {
      let result = JSON.parse(res);
      if (result.success) {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: result.message });
        this.doLoadapplywork();
        this.edit_applywork = false;
        this.new_applywork = false;
        this.displayManage = false
      }
      else {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: result.message });
      }
    })
  }

  close() {
    this.new_applywork = false
    this.selectedReqworker = new EmployeeModel()
  }
  onRowSelectApplywork(event: Event) {
    this.edit_applywork = true;
    this.new_applywork = true;
    this.displayManage = true
    console.log(this.selectedReqworker)
  }

  fileToUpload: File | any = null;
  selectedFileName: string = '';
  handleFileInput(file: FileList) {
    this.fileToUpload = file.item(0);
    if (this.fileToUpload) {
      this.selectedFileName = this.fileToUpload.name;
    } else {
      this.selectedFileName = this.title_nofile[this.initial_current.Language];
    }
  }

  doUploadApplywork() {
    if (this.fileToUpload) {
      this.confirmationService.confirm({
        message: "Confirm Upload file : " + this.fileToUpload.name,
        header: "Import File",
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
          const filename = this.selectedReqworker.selected_Import + "_" + this.datePipe.transform(new Date(), 'yyyyMMddHHmm');
          const filetype = "xls";

          switch (this.selectedReqworker.selected_Import) {
            //import recruiment
            case 'REQWORKER':
              this.applyworkService.reqworker_import(this.fileToUpload, filename, filetype).then((res) => {
                let result = JSON.parse(res);
                if (result.success) {
                  this.messageService.add({ severity: 'success', summary: 'Success', detail: result.message });
                  this.doLoadapplywork();
                  this.edit_applywork = false;
                  this.new_applywork = false;
                }
                else {
                  this.messageService.add({ severity: 'error', summary: 'Error', detail: result.message });
                }
              });
              break;

            //import req address
            case 'REQADDRESS':
              this.applydetailService.reqaddress_import(this.fileToUpload, filename, filetype).then((res) => {
                let result = JSON.parse(res);

                if (result.success) {
                  this.messageService.add({ severity: 'success', summary: 'Success', detail: result.message });
                  this.doLoadapplywork();
                  this.edit_applywork = false;
                  this.new_applywork = false;
                }
                else {
                  this.messageService.add({ severity: 'error', summary: 'Error', detail: result.message });
                }
              });
              break;

            //import req card
            case 'REQCARD':
              this.applydetailService.reqcard_import(this.fileToUpload, filename, filetype).then((res) => {
                let result = JSON.parse(res);

                if (result.success) {
                  this.messageService.add({ severity: 'success', summary: 'Success', detail: result.message });
                  this.doLoadapplywork();
                  this.edit_applywork = false;
                  this.new_applywork = false;
                }
                else {
                  this.messageService.add({ severity: 'error', summary: 'Error', detail: result.message });
                }
              });
              break;

            //import req foreigner
            case 'REQFOREIGNER':
              this.applydetailService.reqforeigner_import(this.fileToUpload, filename, filetype).then((res) => {
                let result = JSON.parse(res);

                if (result.success) {
                  this.messageService.add({ severity: 'success', summary: 'Success', detail: result.message });
                  this.doLoadapplywork();
                  this.edit_applywork = false;
                  this.new_applywork = false;
                }
                else {
                  this.messageService.add({ severity: 'error', summary: 'Error', detail: result.message });
                }
              });
              break;

            //import req education
            case 'REQEDUCATION':
              this.applydetailService.reqeducation_import(this.fileToUpload, filename, filetype).then((res) => {
                let result = JSON.parse(res);

                if (result.success) {
                  this.messageService.add({ severity: 'success', summary: 'Success', detail: result.message });
                  this.doLoadapplywork();
                  this.edit_applywork = false;
                  this.new_applywork = false;
                }
                else {
                  this.messageService.add({ severity: 'error', summary: 'Error', detail: result.message });
                }
              });
              break;

            //import req training
            case 'REQTRAINING':
              this.applydetailService.reqtraining_import(this.fileToUpload, filename, filetype).then((res) => {
                let result = JSON.parse(res);

                if (result.success) {
                  this.messageService.add({ severity: 'success', summary: 'Success', detail: result.message });
                  this.doLoadapplywork();
                  this.edit_applywork = false;
                  this.new_applywork = false;
                }
                else {
                  this.messageService.add({ severity: 'error', summary: 'Error', detail: result.message });
                }
              });
              break;

            //import req assessment
            case 'REQASSESSMENT':
              this.applydetailService.reqassessment_import(this.fileToUpload, filename, filetype).then((res) => {
                let result = JSON.parse(res);
                if (result.success) {
                  this.messageService.add({ severity: 'success', summary: 'Success', detail: result.message });
                  this.doLoadapplywork();
                  this.edit_applywork = false;
                  this.new_applywork = false;
                }
                else {
                  this.messageService.add({ severity: 'error', summary: 'Error', detail: result.message });
                }
              });
              break;

            //import req craiminal
            case 'REQCRIMINAL':
              this.applydetailService.reqcriminal_import(this.fileToUpload, filename, filetype).then((res) => {
                let result = JSON.parse(res);
                if (result.success) {
                  this.messageService.add({ severity: 'success', summary: 'Success', detail: result.message });
                  this.doLoadapplywork();
                  this.edit_applywork = false;
                  this.new_applywork = false;
                }
                else {
                  this.messageService.add({ severity: 'error', summary: 'Error', detail: result.message });
                }
              });
              break;

            //import req suggest
            case 'REQSUGGEST':
              this.applydetailService.reqsuggest_import(this.fileToUpload, filename, filetype).then((res) => {
                let result = JSON.parse(res);
                if (result.success) {
                  this.messageService.add({ severity: 'success', summary: 'Success', detail: result.message });
                  this.doLoadapplywork();
                  this.edit_applywork = false;
                  this.new_applywork = false;
                }
                else {
                  this.messageService.add({ severity: 'error', summary: 'Error', detail: result.message });
                }
              });
              break;
          }

          this.displayUpload = false;
        },
        reject: () => {
          this.messageService.add({ severity: 'warn', summary: 'Cancelled', detail: "Not Upload" });
          this.displayUpload = false;
        }
      });
    } else {
      this.messageService.add({ severity: 'warn', summary: 'File', detail: "Please choose a file." });
    }
  }

  ///
  displayManage: boolean = false;
  position: string = "right";
  showManage() {
    this.displayManage = true
  }

  displayUpload: boolean = false;
  showUpload() {
    this.displayUpload = true;
  }

  @ViewChild('TABLE') table: ElementRef | any = null;

  // exportAsExcel()
  // {
  //   const ws: XLSX.WorkSheet=XLSX.utils.table_to_sheet(this.table.nativeElement);//converts a DOM TABLE element to a worksheet
  //   const wb: XLSX.WorkBook = XLSX.utils.book_new();
  //   XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

  //   XLSX.writeFile(wb, 'Export_applyworkinfo.xlsx');

  // }

  exportReqExcel() {
    const fileToExport = this.reqworkerList.map((items: any) => {
      return {
        "company_code": items?.company_code,
        "worker_code": items?.worker_code,
        "worker_card": items?.worker_card,
        "worker_initial": items?.worker_initial,
        "worker_fname_th": items?.worker_fname_th,
        "worker_lname_th": items?.worker_lname_th,
        "worker_fname_en": items?.worker_fname_en,
        "worker_lname_en": items?.worker_lname_en,
        "worker_type": items?.worker_type,
        "worker_gender": items?.worker_gender,
        "worker_birthdate": items?.worker_birthdate,
        "worker_hiredate": items?.worker_hiredate,
        "religion_code": items?.religion_code,
        "blood_code": items?.blood_code,
        "worker_height": items?.worker_height,
        "worker_weight": items?.worker_weight,
        "worker_status": items?.worker_status,
        "worker_probationday": items?.worker_probationday,
        "hrs_perday": items?.hrs_perday,
        "worker_tel": items?.worker_tel,
        "worker_email": items?.worker_email,
        "worker_line": items?.worker_line,
        "worker_facebook": items?.worker_facebook,
        "worker_military": items?.worker_military,
        "nationality_code": items?.nationality_code,
        "worker_cardno": items?.worker_cardno,
        "worker_cardnoissuedate": items?.worker_cardnoissuedate,
        "worker_cardnoexpiredate": items?.worker_cardnoexpiredate
      }
    });
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(fileToExport);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    XLSX.writeFile(wb, 'Export_applyworkinfo.xlsx');
  }

  selectComManage() {

    let navigationExtras: NavigationExtras = {
      queryParams: {
        "applycode": this.selectedReqworker.worker_code
      }
    };

    this.router.navigate(["recruitment/apply"], navigationExtras);
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

  getBlacklistReason(Code: string): any {
    for (let i = 0; i < this.blacklistList.length; i++) {
      if (this.blacklistList[i].card_no == Code) {
        return this.blacklistReason(this.blacklistList[i].reason_code);
      }
    }
  }
  blacklistReason(Code: string): any {
    for (let i = 0; i < this.reasonList.length; i++) {
      if (this.reasonList[i].reason_code == Code) {
        if (this.initial_current.Language == "TH") {
          return this.reasonList[i].reason_name_th;
        }
        else {
          return this.reasonList[i].reason_name_en;
        }
      }
    }
  }
  checkMCer(Birth: Date, check: Boolean): any {
    if (this.CalculateAge(Birth) >= 50) {
      if (check) {
        return "Attached";
      } else {
        return "Wait";
      }
    }
  }
  age: number = 0
  CalculateAge(birthdate: Date): number {
    if (birthdate) {
      let timeDiff = Math.abs(Date.now() - birthdate.getTime());
      this.age = Math.floor((timeDiff / (1000 * 3600 * 24)) / 365)
    }
    return this.age;
  }




  convertToEmp() {
    this.confirmationService.confirm({
      message: this.title_confirm_record,
      header: this.title_confirm,
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        if (this.CalculateAge(this.selectedReqworker.worker_birthdate) >= 50) {
          // this.messageService.add({
          //   severity: 'error',
          //   summary: 'Error',
          //   detail: "อายุเกิน 50 และ ไม่มีใบรับรองแพทย์"
          // });
          this.edit_applywork = false;
          this.new_applywork = false;
          this.displayManage = false
          this.doUpdateStatus("S")
          return
        }
        if (this.selectedReqworker.counthistory >= 3) {
          // this.messageService.add({
          //   severity: 'error',
          //   summary: 'Error',
          //   detail: "ทำงานมาเกิน2ครั้ง"
          // });
          this.edit_applywork = false;
          this.new_applywork = false;
          this.displayManage = false;
          this.doUpdateStatus("S")
          return
        }
        if (this.selectedReqworker.checkblacklist) {
          // this.messageService.add({
          //   severity: 'error',
          //   summary: 'Error',
          //   detail: "มี blacklist"
          // },);
          this.edit_applywork = false;
          this.new_applywork = false;
          this.displayManage = false;
          this.doUpdateStatus("S")
          return
        }
        this.doGetNewCode()
        this.doLoadReqaddressList()
        // this.doLoadReqForeigner()
        this.doLoadReqForeignercard()
        this.doLoadReqeducationList()
        this.doLoadReqtrainingList()
        this.doLoadReqassessmentList()
        this.doLoadReqCriminalList()
        this.doLoadReqSuggestList()
        this.doLoadReqPositionList()
        this.doLoadReqSalaryList()
        this.doLoadReqBenefitList()
        //image
        // this.doLoadImageReq()
      },
      reject: () => {
        this.messageService.add({ severity: 'warn', summary: 'Cancelled', detail: this.title_confirm_cancel });
      },
    });
  }
  doUpdateStatus(status: string) {
    var tmp = new EmployeeModel();
    tmp.worker_id = this.selectedReqworker.worker_id;
    tmp.status = status
    this.applyworkService.requpdate_status(tmp).then(async (res) => {
      let result = await JSON.parse(res);
      this.doLoadapplywork();
    })
  }

  doGetNewCode() {
    this.polcodeService.getNewCode(this.initial_current.CompCode, "EMP", this.selectedReqworker.worker_type).then(async (res) => {
      let result = await JSON.parse(res);

      if (result.success) {
        this.doRecordEmployee(result.data);
        // console.log(result.data)
      }
    });
  }

  doRecordEmployee(Code: any) {
    var tmp = new EmployeeModel();
    tmp.worker_id = "0"
    tmp.worker_code = Code
    tmp.worker_card = Code
    tmp.worker_initial = this.selectedReqworker.worker_initial
    tmp.worker_fname_th = this.selectedReqworker.worker_fname_th
    tmp.worker_lname_th = this.selectedReqworker.worker_lname_th
    tmp.worker_fname_en = this.selectedReqworker.worker_fname_en
    tmp.worker_lname_en = this.selectedReqworker.worker_lname_en
    tmp.worker_type = this.selectedReqworker.worker_type
    tmp.worker_gender = this.selectedReqworker.worker_gender
    tmp.worker_birthdate = this.selectedReqworker.worker_birthdate
    tmp.worker_hiredate = this.selectedReqworker.worker_hiredate
    tmp.worker_status = this.selectedReqworker.worker_status
    tmp.religion_code = this.selectedReqworker.religion_code
    tmp.blood_code = this.selectedReqworker.blood_code
    tmp.worker_height = this.selectedReqworker.worker_height
    tmp.worker_weight = this.selectedReqworker.worker_weight
    tmp.worker_resignstatus = false
    tmp.worker_blackliststatus = false
    tmp.worker_probationdate = this.selectedReqworker.worker_hiredate
    tmp.hrs_perday = 8
    tmp.worker_taxmethod = "1"
    tmp.worker_tel = this.selectedReqworker.worker_tel
    tmp.worker_email = this.selectedReqworker.worker_email
    tmp.worker_line = this.selectedReqworker.worker_line
    tmp.worker_facebook = this.selectedReqworker.worker_facebook
    tmp.worker_military = this.selectedReqworker.worker_military
    tmp.nationality_code = this.selectedReqworker.nationality_code
    tmp.worker_cardno = this.selectedReqworker.worker_cardno
    tmp.worker_cardnoissuedate = this.selectedReqworker.worker_cardnoissuedate
    tmp.worker_cardnoexpiredate = this.selectedReqworker.worker_cardnoexpiredate
    tmp.worker_socialno = this.selectedReqworker.worker_cardno
    tmp.worker_socialnoissuedate = this.selectedReqworker.worker_cardnoissuedate
    tmp.worker_socialnoexpiredate = this.selectedReqworker.worker_cardnoexpiredate
    tmp.worker_socialnotsent = false
    this.employeeService.worker_recordall(tmp).then((res) => {
      let result = JSON.parse(res);
      if (result.success) {
        //-- transaction
        this.record_empaddress(Code)
        // this.record_empforeigner(Code)
        this.record_empforeignercard(Code)
        this.record_empeducation(Code)
        this.record_emptraining(Code)
        this.record_empassessment(Code)
        this.record_empcriminal(Code)
        this.record_empsuggest(Code)
        this.record_empposition(Code)
        this.record_empsalary(Code)
        this.record_empbenefit(Code)
        //--image
        // this.uploadImageEmp(Code)

        //--update status
        this.doUpdateStatus("F")

        //-- alert
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: result.message,
        });

        this.edit_applywork = false;
        this.new_applywork = false;
        this.displayManage = false
        this.doLoadapplywork()
      } else {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: result.message,
        });
        this.edit_applywork = false;
        this.new_applywork = false;
        this.displayManage = false
      }
    })
  }

  //--address
  reqaddressList: EmpaddressModel[] = [];
  doLoadReqaddressList() {
    this.reqdetailService
      .getapplywork_reqaddress(
        this.initial_current.CompCode,
        this.selectedReqworker.worker_code
      )
      .then((res) => {
        this.reqaddressList = res;
      });
  }
  async record_empaddress(code: any) {
    if (this.reqaddressList.length == 0) {
      return
    }
    this.empdetailService
      .record_empaddress(
        code,
        this.reqaddressList
      )
      .then((res) => {
        let result = JSON.parse(res);
        if (result.success) {
        } else {
        }
      });
  }
  //--Foreigner
  // reqforeignerList: EmpForeignerModel[] = [];
  // selectedReqforeigner: EmpForeignerModel = new EmpForeignerModel();
  // doLoadReqForeigner() {
  //   this.reqdetailService
  //     .getapplywork_foreigner(
  //       this.initial_current.CompCode,
  //       this.selectedReqworker.worker_code
  //     )
  //     .then(async (res) => {
  //       this.reqforeignerList = await res;
  //       if (this.reqforeignerList.length > 0) {
  //         this.selectedReqforeigner = this.reqforeignerList[0];
  //       }
  //     });
  // }
  // record_empforeigner(code:any) {
  //   if (this.reqforeignerList.length == 0) {
  //     return
  //   }
  //   this.empdetailService.record_empforeigner(
  //     code,
  //     this.selectedReqforeigner
  //   );
  // }
  //--Foreigner Card
  reqforeignercardList: EmpForeignercardModel[] = [];
  selectedEmpforeignercard: EmpForeignercardModel = new EmpForeignercardModel();
  doLoadReqForeignercard() {
    this.reqdetailService
      .getapply_foreignercard(
        this.initial_current.CompCode,
        this.selectedReqworker.worker_code
      )
      .then(async (res) => {
        this.reqforeignercardList = await res;
        if (this.reqforeignercardList.length > 0) {
          this.selectedEmpforeignercard = this.reqforeignercardList[0];
        }
      });
  }
  record_empforeignercard(code: any) {
    if (this.reqforeignercardList.length == 0) {
      return
    }
    this.empdetailService.record_empforeignercard(
      code,
      this.reqforeignercardList
    );
  }
  //-- education
  reqeducationList: EmpEducationModel[] = [];
  doLoadReqeducationList() {
    this.reqdetailService
      .getapply_education(this.initial_current.CompCode, this.selectedReqworker.worker_code)
      .then(async (res) => {
        this.reqeducationList = await res;
      });
  }
  record_empeducation(code: any) {
    if (this.reqeducationList.length == 0) {
      return
    }
    this.empdetailService
      .record_empeducation(
        code,
        this.reqeducationList
      )
      .then((res) => {
        let result = JSON.parse(res);
        if (result.success) {
        } else {
        }
      });
  }
  //--training
  reqtrainingList: EmpTrainingModel[] = [];
  doLoadReqtrainingList() {
    this.reqdetailService
      .getapplywork_training(this.initial_current.CompCode, this.selectedReqworker.worker_code)
      .then(async (res) => {
        this.reqtrainingList = await res;
      });
  }
  record_emptraining(code: any) {
    if (this.reqtrainingList.length == 0) {
      return
    }
    this.empdetailService
      .record_emptraining(
        code,
        this.reqtrainingList
      )
      .then((res) => {
        let result = JSON.parse(res);
        if (result.success) {
        } else {
        }
      });
  }

  //--appraisal
  reqassessmentList: EmpAssessmentModel[] = [];
  doLoadReqassessmentList() {
    this.reqdetailService
      .getapplywork_assessment(this.initial_current.CompCode, this.selectedReqworker.worker_code)
      .then(async (res) => {
        this.reqassessmentList = await res;
      });
  }
  record_empassessment(code: any) {
    if (this.reqassessmentList.length == 0) {
      return
    }
    this.empdetailService
      .record_empassessment(
        code,
        this.reqassessmentList
      )
      .then((res) => {
        let result = JSON.parse(res);
        if (result.success) {
        } else {
        }
      });
  }

  //--criminal
  reqCriminalList: EmpCriminalModel[] = [];
  doLoadReqCriminalList() {
    this.reqdetailService
      .getapplywork_criminal(this.initial_current.CompCode, this.selectedReqworker.worker_code)
      .then(async (res) => {
        this.reqCriminalList = await res;
      });
  }
  record_empcriminal(code: any) {
    if (this.reqCriminalList.length == 0) {
      return
    }
    this.empdetailService
      .record_empcriminal(
        code,
        this.reqCriminalList
      )
      .then((res) => {
        let result = JSON.parse(res);
        if (result.success) {
        } else {
        }
      });
  }

  //--suggest
  reqsuggestList: EmpSuggestModel[] = [];
  doLoadReqSuggestList() {
    this.reqdetailService
      .getapplywork_suggest(this.initial_current.CompCode, this.selectedReqworker.worker_code)
      .then(async (res) => {
        this.reqsuggestList = await res;
      });
  }
  record_empsuggest(code: any) {
    if (this.reqsuggestList.length == 0) {
      return
    }
    this.empdetailService
      .record_empsuggest(
        code,
        this.reqsuggestList
      )
      .then((res) => {
        let result = JSON.parse(res);
        if (result.success) {
        } else {
        }
      });
  }

  //--Position
  reqPositionList: EmpPositionModel[] = [];
  doLoadReqPositionList() {
    this.reqdetailService
      .getapplywork_position(this.initial_current.CompCode, this.selectedReqworker.worker_code)
      .then(async (res) => {
        this.reqPositionList = await res;
      });
  }
  async record_empposition(code: any) {
    if (this.reqPositionList.length == 0) {
      return
    }
    await this.reqPositionList.forEach((element: EmpPositionModel) => {
      element.empposition_date = this.selectedReqworker.worker_hiredate
      element.empposition_reason = ""
    })
    this.empdetailService
      .record_empposition(
        code,
        this.reqPositionList
      )
      .then((res) => {
        let result = JSON.parse(res);
        if (result.success) {
        } else {
        }
      });
  }

  //--Salary
  reqSalaryList: EmpSalaryModel[] = [];
  doLoadReqSalaryList() {
    this.reqdetailService
      .getapplywork_salary(this.initial_current.CompCode, this.selectedReqworker.worker_code)
      .then(async (res) => {
        this.reqSalaryList = await res;
      });
  }
  record_empsalary(code: any) {
    if (this.reqSalaryList.length == 0) {
      return
    }
    this.empdetailService
      .record_empsalary(
        code,
        this.reqSalaryList
      )
      .then((res) => {
        let result = JSON.parse(res);
        if (result.success) {
        } else {
        }
      });
  }

  //--Benefit
  reqBenefitList: EmpBenefitsModel[] = [];
  doLoadReqBenefitList() {
    this.reqdetailService
      .getapplywork_benefit(this.initial_current.CompCode, this.selectedReqworker.worker_code)
      .then(async (res) => {
        this.reqBenefitList = await res;
      });
  }
  record_empbenefit(code: any) {
    if (this.reqBenefitList.length == 0) {
      return
    }
    this.empdetailService
      .record_empbenefit(
        code,
        this.reqBenefitList
      )
      .then((res) => {
        let result = JSON.parse(res);
        if (result.success) {
        } else {
        }
      });
  }

  fileToUploadEmp: File | any = null;
  doLoadImageReq() {
    this.applyworkService.doGetReqImages(this.initial_current.CompCode, this.selectedReqworker.worker_code).then((res) => {
      let resultJSON = JSON.parse(res);
      if (resultJSON.result == "1") {
        this.fileToUploadEmp = resultJSON.data;
      }
    })
  }
  uploadImageEmp(code: any) {
    this.employeeService.uploadImages(this.fileToUploadEmp, this.initial_current.CompCode, code).then((res) => {
      let resultJSON = JSON.parse(res);
    })
  }
}
import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, MenuItem, MessageService } from 'primeng/api';
import { AppConfig } from 'src/app/config/config';
import { InitialCurrent } from 'src/app/config/initial_current';
import { ReasonModels } from 'src/app/models/attendance/reason';
import { EmployeeModel } from 'src/app/models/employee/employee';
import { BlacklistModel } from 'src/app/models/recruitment/blacklist';
import { AccessdataModel } from 'src/app/models/system/security/accessdata';
import { TRSysApproveModel } from 'src/app/models/system/security/sys_approve';
import { ApplyworkService } from 'src/app/services/recruitment/applywork.service';
import { BlacklistService } from 'src/app/services/recruitment/blacklist.service';
import { ReasonsService } from 'src/app/services/system/policy/reasons.service';
import { SysApproveServices } from 'src/app/services/system/security/sysapprove.service';

interface Status {
  name_th: string,
  name_en: string,
  code: string
}

@Component({
  selector: 'app-recruitment-approve',
  templateUrl: './recruitment-approve.component.html',
  styleUrls: ['./recruitment-approve.component.scss']
})
export class RecruitmentApproveComponent implements OnInit {

  menu_apply: MenuItem[] = [];
  status_list: Status[] = [{ name_th: 'รอดำเนินการ', name_en: 'Wait', code: 'W' }, { name_th: 'เสร็จ', name_en: 'Finish', code: 'F' }, { name_th: 'ปฏิเสธ', name_en: 'Reject', code: 'C' }, { name_th: 'ส่งอนุมัติ', name_en: 'Send Approve', code: 'S' }];

  total_apply: number = 0

  constructor(
    private router: Router,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private datePipe: DatePipe,
    private sysApproveServices: SysApproveServices,
    private applyworkService: ApplyworkService,
    private blacklistService: BlacklistService,
    private reasonService: ReasonsService,
  ) { }

  ngOnInit(): void {
    this.doGetInitialCurrent();
    //
    this.doLoadBlacklistList();
    this.doLoadReasonList();
    setTimeout(() => {
      this.doLoadApply()
      this.doLoadMenu()
    }, 300);
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
    this.accessData = this.initialData2.dotGetPolmenu('REQ');
  }
  hasAccessMenu(accessCode: string): boolean {
    return this.accessData.accessmenu_data.some(item => item.accessmenu_code === accessCode);
  }

  title_page: { [key: string]: string } = { EN: "Approval list", TH: "อนุมัติผู้สมัครงาน" }

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

  title_code: { [key: string]: string } = { EN: "Code", TH: "รหัส" }
  title_name_th: { [key: string]: string } = { EN: "Name (Thai)", TH: "ชื่อไทย" }
  title_name_en: { [key: string]: string } = { EN: "Name (Eng.)", TH: "ชื่ออังกฤษ" }
  title_name: { [key: string]: string } = { EN: "Name", TH: "ชื่อ-นามสกุล" }
  title_hiredate: { [key: string]: string } = { EN: "Date", TH: "วันที่พร้อมเริ่มงาน" }
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
  title_total_transfer: { [key: string]: string } = { EN: "Transfer Emp.", TH: "โอนย้าย" }
  title_total_apply: { [key: string]: string } = { EN: "Apply Work", TH: "ผู้สมัคร" }

  title_username: { [key: string]: string } = { EN: "Username", TH: "ผู้อนุมัติ" }
  title_approve_date: { [key: string]: string } = { EN: "Approve date", TH: "วันที่อนุมัติ" }

  title_popup_approve: { [key: string]: string } = { EN: "Approve", TH: "อนุมัติ" }

  title_requestmcer: { [key: string]: string } = { EN: "Medical Certificate", TH: "ใบรับรองแพทย์" };
  title_blacklist: { [key: string]: string } = { EN: "Blacklist", TH: "เบล็คลิสต์" };


  doLoadMenu() {

    this.menu_apply = [
      {
        label: this.title_approve[this.initial_current.Language],
        icon: 'pi pi-fw pi-check',
        command: (event) => {

          if (this.selectedApply.worker_code != "") {
            this.approveNote = ""
            this.approve_apply("S")
          }
          //this.showManage()
        }
      }
      ,
      {
        label: this.title_notapprove[this.initial_current.Language],
        icon: 'pi pi-fw pi-times',
        command: (event) => {

          if (this.selectedApply.worker_code != "") {
            this.approveNote = ""
            this.openNotapprove()
          }

        }
      }


    ];
  }



  apply_list: EmployeeModel[] = [];
  selectedApply: EmployeeModel = new EmployeeModel;
  fillterBlacklist: boolean = false;
  doLoadApply() {
    var tmp = new EmployeeModel();
    tmp.company_code = this.initial_current.CompCode
    tmp.worker_code = ""
    tmp.status = "S"
    tmp.blacklist = this.fillterBlacklist
    this.applyworkService.reqworker_get(tmp).then(async (res) => {
      await res.forEach((element: EmployeeModel) => {
        element.worker_hiredate = new Date(element.worker_hiredate)
        element.worker_birthdate = new Date(element.worker_birthdate)
        element.blacklist_reason = this.getBlacklistReason(element.worker_cardno)
        element.certificate = this.checkMCer(element.worker_birthdate, element.checkcertificate)
      })
      this.apply_list = await res;
      console.log(res)
      this.total_apply = this.apply_list.length;
    })
  }

  displayManage: boolean = false;
  position: string = "right";
  showManage() {
    this.displayManage = true
  }

  close_manage() {
    this.displayManage = false
  }
  approve_apply(status: string) {
    this.displayApproveNote = false
    this.confirmationService.confirm({
      message: this.title_confirm_record[this.initial_current.Language],
      header: this.title_confirm[this.initial_current.Language],
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        var data = new TRSysApproveModel()
        data.company_code = this.initial_current.CompCode
        data.approve_status = status
        data.workflow_type = "REQ_APY"
        data.approve_code = this.selectedApply.worker_code
        data.approve_note = this.approveNote

        this.sysApproveServices.approve_record(data).then((res) => {
          let result = JSON.parse(res);
          if (result.success) {
            this.messageService.add({ severity: 'success', summary: 'Success', detail: result.message });
            this.doLoadApply()

            //this.displayManage = false
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
    this.approve_apply("C")
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
}

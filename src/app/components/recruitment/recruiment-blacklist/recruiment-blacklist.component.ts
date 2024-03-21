import { DatePipe } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, MenuItem, MessageService } from 'primeng/api';
import { AppConfig } from 'src/app/config/config';
import { InitialCurrent } from 'src/app/config/initial_current';
import { EmployeeModel } from 'src/app/models/employee/employee';
import { BlacklistModel } from 'src/app/models/recruitment/blacklist';
import { ReasonsModel } from 'src/app/models/system/policy/reasons';
import { AccessdataModel } from 'src/app/models/system/security/accessdata';
import { EmployeeService } from 'src/app/services/emp/worker.service';
import { BlacklistService } from 'src/app/services/recruitment/blacklist.service';
import { ReasonsService } from 'src/app/services/system/policy/reasons.service';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-recruiment-blacklist',
  templateUrl: './recruiment-blacklist.component.html',
  styleUrls: ['./recruiment-blacklist.component.scss']
})
export class RecruimentBlacklistComponent implements OnInit {

  items: MenuItem[] = [];
  edit_data: boolean = false;
  new_data: boolean = false;

  blacklist_list: BlacklistModel[] = [];
  selectedBlacklist: BlacklistModel = new BlacklistModel();

  constructor(
    private router: Router,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private datePipe: DatePipe,
    private blacklistService: BlacklistService,
    private reasonsService: ReasonsService,
    private employeeService: EmployeeService,
  ) { }

  ngOnInit(): void {
    this.doGetInitialCurrent();
    setTimeout(() => {
      this.doLoadMenu()

      //load dropdown
      this.doLoadBlacklist();
      this.doLoadReason();
      this.doLoadWorkerList();
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

  title_black: { [key: string]: string } = { EN: "Blacklist", TH: "แบล็คลิสต์" };
  title_new: { [key: string]: string } = { EN: "New", TH: "เพิ่ม" };
  title_edit: { [key: string]: string } = { EN: "Edit", TH: "แก้ไข" };
  title_setbatch: { [key: string]: string } = { EN: "Set Batch", TH: "เพิ่มแบบกลุ่ม" };
  title_import: { [key: string]: string } = { EN: "Import", TH: "นำเข้า" };
  title_export: { [key: string]: string } = { EN: "Export", TH: "ส่งออกไฟล์" };
  title_worker: { [key: string]: string } = { EN: "Emp. ID", TH: "รหัสพนักงาน" };
  title_name: { [key: string]: string } = { EN: "Name", TH: "ชื่อ-นามสกุล" };
  title_reason: { [key: string]: string } = { EN: "Reason", TH: "เหตุผล" };
  title_note: { [key: string]: string } = { EN: "Note", TH: "หมายเหตุ" };
  title_card: { [key: string]: string } = { EN: "Card No.", TH: "เลขบัตรประจำตัวประชาชน" };
  title_fname_th: { [key: string]: string } = { EN: "First Name(TH)", TH: "ชื่อ(ไทย)" };
  title_lname_th: { [key: string]: string } = { EN: "Last Name(TH)", TH: "นามสกุล(ไทย)" };
  title_fname_en: { [key: string]: string } = { EN: "First Name(EN)", TH: "ชื่อ(อังกฤษ)" };
  title_lname_en: { [key: string]: string } = { EN: "Last Name(TH)", TH: "นามสกุล(อังกฤษ)" };

  title_template: { [key: string]: string } = { EN: "Template", TH: "เทมเพลต" };

  title_save: { [key: string]: string } = { EN: "Save", TH: "บันทึก" };

  title_modified_by: { [key: string]: string } = { EN: "Edit by", TH: "ผู้ทำรายการ" };
  title_modified_date: { [key: string]: string } = { EN: "Edit date", TH: "วันที่ทำรายการ" };
  title_search: { [key: string]: string } = { EN: "Search", TH: "ค้นหา" };
  title_upload: { [key: string]: string } = { EN: "Upload", TH: "อัปโหลด" };

  title_page_from: { [key: string]: string } = { EN: "Showing", TH: "แสดง" };
  title_page_to: { [key: string]: string } = { EN: "to", TH: "ถึง" };
  title_page_total: { [key: string]: string } = { EN: "of", TH: "จาก" };
  title_page_record: { [key: string]: string } = { EN: "entries", TH: "รายการ" };

  title_confirm: { [key: string]: string } = { EN: "Are you sure?", TH: "ยืนยันการทำรายการ" };
  title_confirm_record: { [key: string]: string } = { EN: "Confirm to record", TH: "คุณต้องการบันทึกการทำรายการ" };
  title_confirm_delete: { [key: string]: string } = { EN: "Confirm to delete", TH: "คุณต้องการลบรายการ" };
  title_confirm_yes: { [key: string]: string } = { EN: "Yes", TH: "ใช่" };
  title_confirm_no: { [key: string]: string } = { EN: "No", TH: "ยกเลิก" };

  title_confirm_cancel: { [key: string]: string } = { EN: "You have cancelled", TH: "คุณยกเลิกการทำรายการ" };

  title_dropfile: { [key: string]: string } = { EN: "Drop files here", TH: "วางไฟล์ที่นี่" };
  title_or: { [key: string]: string } = { EN: "or", TH: "หรือ" };

  title_choose: { [key: string]: string } = { EN: "Choose File", TH: "เลือกไฟล์" };
  title_nofile: { [key: string]: string } = { EN: "No file chosen", TH: "ไม่มีไฟล์ที่เลือก" };
  
  title_no: { [key: string]: string } = { EN: "No", TH: "ลำดับ" };

  doLoadMenu() {

    this.items = [
      {
        label: this.title_new[this.initial_current.Language],
        icon: 'pi pi-fw pi-plus',
        command: (event) => {
          if (this.accessData.accessdata_new) {
            this.selectedBlacklist = new BlacklistModel();
            this.new_data = true;
            this.edit_data = false;
            this.showManage()
          } else {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Permission denied' });
          }

        }
      }
      ,
      {
        label: this.title_edit[this.initial_current.Language],
        icon: 'pi pi-fw pi-pencil',
        command: (event) => {

          if (this.selectedBlacklist != null) {
            this.new_data = false;
            this.edit_data = true
            this.showManage()
          }
        }
      }
      ,
      {
        label: this.title_template[this.initial_current.Language],
        icon: 'pi-download',
        command: (event) => {
          window.open('assets/OPRFileImport/(OPR)Import req/(OPR)Import Blacklist.xlsx', '_blank');
        }

      },
      {
        label: this.title_import[this.initial_current.Language],
        icon: 'pi pi-fw pi-file-import',
        command: (event) => {
          this.showUpload()

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
      ,
      {
        label: this.title_setbatch[this.initial_current.Language],
        icon: 'pi pi-fw pi-user-plus',
        command: (event) => {
          this.router.navigateByUrl('recruitment/blacklist/setbatch');
        }
      }
    ];
  }

  doLoadBlacklist() {
    this.blacklistService.blacklist_get(this.initial_current.CompCode, '', '').then((res) => {
      this.blacklist_list = res;
    });
  }

  //drop
  reason_list: ReasonsModel[] = [];
  reasons: ReasonsModel = new ReasonsModel()
  doLoadReason() {
    this.reason_list = [];
    var tmp = new ReasonsModel();
    tmp.reason_group = 'BLACK';
    this.reasonsService.reason_get(tmp).then(async (res) => {
      this.reason_list = await res;
    });
  }

  worker_List: EmployeeModel[] = [];
  selectedworker: EmployeeModel = new EmployeeModel();
  doLoadWorkerList() {
    var tmp = new EmployeeModel();
    this.employeeService.worker_get(this.initial_current.CompCode, "").then(async (res) => {
      this.worker_List = await res;
      if (this.worker_List.length > 0) {
        this.selectedworker = this.worker_List[0];
      }
    })
  }

  // end dropdown

  confirmRecord() {
    this.confirmationService.confirm({
      message: this.title_confirm_record[this.initial_current.Language],
      header: this.title_confirm[this.initial_current.Language],
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.doRecordBlacklist()
      },
      reject: () => {
        this.messageService.add({ severity: 'warn', summary: 'Cancelled', detail: this.title_confirm_cancel[this.initial_current.Language] });
      },
      key: "myDialog"
    });
  }

  doRecordBlacklist() {
    this.blacklistService.blacklist_record(this.selectedBlacklist).then((res) => {
      let result = JSON.parse(res);

      if (result.success) {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: result.message });
        this.doLoadBlacklist()
        this.displayManage = false
      }
      else {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: result.message });
      }

    });
  }

  confirmDelete(data: any) {
    this.confirmationService.confirm({
      message: this.title_confirm_delete[this.initial_current.Language],
      header: this.title_confirm[this.initial_current.Language],
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.doDeleteBlacklist(data)
      },
      reject: () => {
        this.messageService.add({ severity: 'warn', summary: 'Cancelled', detail: this.title_confirm_cancel[this.initial_current.Language] });
      }
    });
  }

  doDeleteBlacklist(data: any) {
    this.blacklistService.blacklist_delete(data).then((res) => {
      // console.log(res)
      let result = JSON.parse(res);

      if (result.success) {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: result.message });
        this.doLoadBlacklist();
        this.edit_data = false;
        this.new_data = false;
      }
      else {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: result.message });
      }

    });
  }

  close() {
    this.new_data = false
    this.selectedBlacklist = new BlacklistModel()
  }

  onRowSelectInitial(event: any) {
    this.edit_data = true;
    this.new_data = true;
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

  doUploadBlacklist() {
    if (this.fileToUpload) {
      this.confirmationService.confirm({
        message: "Confirm Upload file : " + this.fileToUpload.name,
        header: "Import File",
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
          const filename = "INITIAL_" + this.datePipe.transform(new Date(), 'yyyyMMddHHmm');
          const filetype = "xls";

          this.blacklistService.blacklist_import(this.fileToUpload, filename, filetype).then((res) => {
            let result = JSON.parse(res);

            if (result.success) {
              this.messageService.add({ severity: 'success', summary: 'Success', detail: result.message });
              this.doLoadBlacklist();
              this.edit_data = false;
              this.new_data = false;
            }
            else {
              this.messageService.add({ severity: 'error', summary: 'Error', detail: result.message });
            }
          });
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

  displayUpload: boolean = false;
  showUpload() {
    this.displayUpload = true;
  }

  @ViewChild('TABLE') table: ElementRef | any = null;

  exportAsExcel() {
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(this.table.nativeElement);//converts a DOM TABLE element to a worksheet
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    XLSX.writeFile(wb, 'Export_Blacklist.xlsx');

  }


  displayManage: boolean = false;
  position: string = "right";
  showManage() {
    this.displayManage = true

  }

  close_manage() {
    this.displayManage = false
  }

  changeEmp(code: string) {
    for (let i = 0; i < this.worker_List.length; i++) {
      if (this.worker_List[i].worker_code == code) {
        this.selectedBlacklist.card_no = this.worker_List[i].worker_cardno
        this.selectedBlacklist.blacklist_fname_th = this.worker_List[i].worker_fname_th
        this.selectedBlacklist.blacklist_lname_th = this.worker_List[i].worker_lname_th
        this.selectedBlacklist.blacklist_fname_en = this.worker_List[i].worker_fname_en
        this.selectedBlacklist.blacklist_lname_en = this.worker_List[i].worker_lname_en
      }
    }
  }
  clearEmp() {
    this.selectedBlacklist.card_no = "";
    this.selectedBlacklist.blacklist_fname_th = "";
    this.selectedBlacklist.blacklist_lname_th = "";
    this.selectedBlacklist.blacklist_fname_en = "";
    this.selectedBlacklist.blacklist_lname_en = "";
  }

}

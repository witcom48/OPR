import { DatePipe } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, MenuItem, MessageService } from 'primeng/api';
import { AppConfig } from 'src/app/config/config';
import { InitialCurrent } from 'src/app/config/initial_current';
import { ItemsModel } from 'src/app/models/payroll/items';
import { ReferralModel } from 'src/app/models/payroll/referral';
import { ReferralrateModel } from 'src/app/models/payroll/referralrate';
import { AccessdataModel } from 'src/app/models/system/security/accessdata';
import { ItemService } from 'src/app/services/payroll/item.service';
import { ReferralService } from 'src/app/services/payroll/referral.service';

import * as XLSX from 'xlsx';

@Component({
  selector: 'app-referral',
  templateUrl: './referral.component.html',
  styleUrls: ['./referral.component.scss']
})
export class ReferralComponent implements OnInit {

  item_list: never[] | undefined;
  constructor(
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private datePipe: DatePipe,
    private referralService: ReferralService,
    private itemService: ItemService,

    private router: Router
  ) { }
  @ViewChild('TABLE') table: ElementRef | any = null;
  new_data: boolean = false;
  edit_data: boolean = false;
  home: any;
  itemslike: MenuItem[] = [];
  fileToUpload: File | any = null;
  displayUpload: boolean = false;
  displayaddcondition: boolean = false;
  displayeditcondition: boolean = false;

  items: MenuItem[] = [];
  itemslate: MenuItem[] = [];

  referral_list: ReferralModel[] = [];
  selectedRefer: ReferralModel = new ReferralModel();

  conditions: ReferralrateModel = new ReferralrateModel();
  public initial_current: InitialCurrent = new InitialCurrent();
  initialData2: InitialCurrent = new InitialCurrent();
  accessData: AccessdataModel = new AccessdataModel();
  doGetInitialCurrent() {
    this.initial_current = JSON.parse(
      localStorage.getItem(AppConfig.SESSIONInitial) || '{}'
    );
    if (!this.initial_current.Token) {
      this.router.navigateByUrl('login');
    }
    this.accessData = this.initialData2.dotGetPolmenu('PAY');

  }

  title_file: { [key: string]: string } = { EN: "File ", TH: "ไฟล์" }
  title_template: { [key: string]: string } = { EN: "Template ", TH: "เทมเพลต" }
  title_dropfile: { [key: string]: string } = { EN: "Drop files here", TH: "วางไฟล์ที่นี่" };
  title_choose: { [key: string]: string } = { EN: "Choose File", TH: "เลือกไฟล์" };
  title_nofile: { [key: string]: string } = { EN: "No file chosen", TH: "ไม่มีไฟล์ที่เลือก" };
  title_or: { [key: string]: string } = { EN: "or", TH: "หรือ" };

  title_payroll: { [key: string]: string } = { EN: "Payroll", TH: "Payroll" };
  title_policy: { [key: string]: string } = { EN: "Set Policy", TH: "กำหนดนโยบาย" };
  title_page: { [key: string]: string } = { EN: "Referral Program", TH: "ค่าแนะนำ" };
  title_new: { [key: string]: string } = { EN: "New", TH: "เพิ่ม" };
  title_type: { [key: string]: string } = { EN: "Type", TH: "ประเภท" };
  title_regular: { [key: string]: string } = { EN: "Regular", TH: "รูปแบบ" };
  title_income: { [key: string]: string } = { EN: "Income", TH: "เงินได้" };
  title_deduct: { [key: string]: string } = { EN: "Deduct", TH: "เงินหัก" };
  title_Workage: { [key: string]: string } = { EN: "อัตรา", TH: "อัตรา" };

  title_Item: { [key: string]: string } = { EN: "Income ID", TH: "รหัสเงินได้" };
  title_Rate: { [key: string]: string } = { EN: "Rate", TH: "อัตรา (บาท)" };
  title_From: { [key: string]: string } = { EN: "From", TH: "จาก (ปี)" };
  title_no: { [key: string]: string } = { EN: "No", TH: "ลำดับ" };

  title_edit: { [key: string]: string } = { EN: "Edit", TH: "แก้ไข" };
  title_delete: { [key: string]: string } = { EN: "Delete", TH: "ลบ" };
  title_import: { [key: string]: string } = { EN: "Import", TH: "นำเข้า" };
  title_export: { [key: string]: string } = { EN: "Export", TH: "ส่งออกไฟล์" };
  title_save: { [key: string]: string } = { EN: "Save", TH: "บันทึก" };
  title_code: { [key: string]: string } = { EN: "Code", TH: "รหัส" };
  title_name_th: { [key: string]: string } = { EN: "Name (Thai)", TH: "ชื่อไทย" };
  title_name_en: { [key: string]: string } = { EN: "Name (Eng.)", TH: "ชื่ออังกฤษ" };
  title_detail_en: { [key: string]: string } = { EN: "Description(Eng)", TH: "รายละเอียด อังกฤษ" };
  title_detail_th: { [key: string]: string } = { EN: "Description(Thai)", TH: "รายละเอียด ไทย" };
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
  title_system_payroll: { [key: string]: string } = { EN: "Policy Payroll", TH: "นโยบาย" };

  title_notused: { [key: string]: string } = { EN: "Not used", TH: "ไม่ใช้งาน" };
  title_month: { [key: string]: string } = { EN: "Month", TH: "เดือนที่" };

  ngOnInit(): void {
    this.doLoadItemsList();
    this.doGetInitialCurrent();
    this.doLoadMenu();
    this.doLoadRefer();
  }
  reloadPage() {
    this.doLoadRefer();
  }

  doLoadMenu() {
    this.itemslike = [{ label: this.title_system_payroll[this.initial_current.Language], routerLink: '/payroll/policy' },
    { label: this.title_page[this.initial_current.Language], styleClass: 'activelike' }];
    this.home = { icon: 'pi pi-home', routerLink: '/' };
    this.items = [
      {
        label: this.title_new[this.initial_current.Language],
        icon: 'pi-plus',
        command: (event) => {
          if (this.accessData.accessdata_new) {
            this.showManage()
            this.selectedRefer = new ReferralModel();
            this.new_data = true;
            this.edit_data = false;
          } else {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Permistion' });
          }

        },
      },
      {
        label: this.title_template[this.initial_current.Language],
        icon: 'pi-download',
        command: (event) => {
          window.open('assets/OPRFileImport/(OPR)Import Payroll/(OPR)Import Payroll Referral.xlsx', '_blank');
        }
      }
      ,
      {
        label: this.title_import[this.initial_current.Language],
        icon: 'pi-file-import',
        command: (event) => {
          this.showUpload();
        },
      },
      {
        label: this.title_export[this.initial_current.Language],
        icon: 'pi-file-export',
        command: (event) => {
          this.exportAsExcel();
        },
      },
    ];
    this.itemslate = [
      {
        label: this.title_new[this.initial_current.Language],
        icon: 'pi-plus',
        command: (event) => {
          this.conditions = new ReferralrateModel();
          this.displayaddcondition = true;
          this.displayeditcondition = false;
        },
      },
    ];
  }

  doLoadRefer() {
    this.referral_list = [];
    var tmp = new ReferralModel();
    this.referralService.referral_get(tmp).then(async (res) => {
      this.referral_list = await res;
    });
  }

  async doRecordRefer(data: ReferralModel) {
    await this.referralService.referral_record(data).then((res) => {
      if (res.success) {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: res.message,
        });
        this.doLoadRefer();
        this.new_data = false;
        this.edit_data = false;
        this.displayManage = false;
      } else {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: res.message,
        });
      }
    });
  }

  confirmDelete(data: ReferralModel) {
    this.confirmationService.confirm({
      message: this.title_confirm_delete[this.initial_current.Language],
      header: this.title_confirm[this.initial_current.Language],
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.doDeleteRefer(data);
      },
      reject: () => {
        this.messageService.add({ severity: 'warn', summary: 'Cancelled', detail: this.title_confirm_cancel[this.initial_current.Language] });
      },
      key: "myDialog"
    });
  }
  async doDeleteRefer(data: ReferralModel) {
    await this.referralService.referral_delete(data).then((res) => {
      if (res.success) {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: res.message,
        });
        this.doLoadRefer();
        this.new_data = false;
        this.edit_data = false;
        this.displayManage = false;
      } else {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: res.message,
        });
      }
    });
  }

  //
  doUploadLate() {
    const filename =
      'LATE_' + this.datePipe.transform(new Date(), 'yyyyMMddHHmm');
    const filetype = 'xls';
    this.referralService
      .referral_import(this.fileToUpload, filename, filetype)
      .then((res) => {
        if (res.success) {
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: res.message,
          });
          this.doLoadRefer();
          this.edit_data = false;
          this.new_data = false;
        } else {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: res.message,
          });
        }
        this.fileToUpload = null;
      });
  }
  showUpload() {
    this.displayUpload = true;
  }
  Uploadfile() {
    if (this.fileToUpload) {
      this.confirmationService.confirm({
        message: 'Confirm Upload file : ' + this.fileToUpload.name,
        header: 'Import File',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
          this.displayUpload = false;
          this.doUploadLate();
        },
        key: "myDialog",
        reject: () => {
          this.displayUpload = false;
        },
      });
    } else {
      this.messageService.add({
        severity: 'warn',
        summary: 'File',
        detail: 'Please choose a file.',
      });
    }
  }
  //endupload

  close() {
    this.new_data = false;
    this.edit_data = false;
    this.selectedRefer = new ReferralModel();
    this.displayaddcondition = false;
    this.displayeditcondition = false;
    this.conditions = new ReferralrateModel();
  }
  closedispaly() {
    this.displayaddcondition = false;
    this.displayeditcondition = false;
    this.conditions = new ReferralrateModel();
  }
  Save() {
    this.confirmationService.confirm({
      message: this.title_confirm_record[this.initial_current.Language],
      header: this.title_confirm[this.initial_current.Language],
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.doRecordRefer(this.selectedRefer);
      },
      reject: () => {
        this.messageService.add({ severity: 'warn', summary: 'Cancelled', detail: this.title_confirm_cancel[this.initial_current.Language] });

      }
    });
  }
  Savelate() {
    if (!this.displayeditcondition) {
      this.selectedRefer.referral_data =
        this.selectedRefer.referral_data.concat({
          company_code: this.initial_current.CompCode,
          referral_code: this.selectedRefer.referral_code,
          referralrate_month: this.conditions.referralrate_month,
          referralrate_rate: this.conditions.referralrate_rate,
        });
    }
    this.displayaddcondition = false;
    this.displayeditcondition = false;
    this.conditions = new ReferralrateModel();
  }
  Delete() {
    this.confirmationService.confirm({
      message: this.title_confirm_delete[this.initial_current.Language],
      header: this.title_confirm[this.initial_current.Language],
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.doDeleteRefer(this.selectedRefer);
      },
      reject: () => {
        this.messageService.add({ severity: 'warn', summary: 'Cancelled', detail: this.title_confirm_cancel[this.initial_current.Language] });
      }
    });
  }
  Deleterefer() {
    this.selectedRefer.referral_data = this.selectedRefer.referral_data.filter(
        (item) => {
            return item !== this.conditions;
        }
    );
    this.displayaddcondition = false;
    this.displayeditcondition = false;
    this.conditions = new ReferralrateModel();
}

  onRowSelectList(event: any) {
    this.displayaddcondition = true;
    this.displayeditcondition = true;
  }
  onRowSelect(event: any) {
    this.new_data = true;
    this.edit_data = true;
    this.displayManage = true;
  }

  displayManage: boolean = false;
  position: string = "right";
  showManage() {
    this.displayManage = true;
  }
  selectedFileName: string = '';
  handleFileInput(file: FileList) {
    this.fileToUpload = file.item(0);
    if (this.fileToUpload) {
      this.selectedFileName = this.fileToUpload.name;
    } else {
      this.selectedFileName = this.title_nofile[this.initial_current.Language];
    }
  }


  exportAsExcel() {
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(this.table.nativeElement);//converts a DOM TABLE element to a worksheet
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    XLSX.writeFile(wb, 'Export_Referral.xlsx');

  }

  // get data dropdown
  ItemsList: ItemsModel[] = [];
  doLoadItemsList() {
    var tmp = new ItemsModel();
    this.itemService.item_get(tmp).then((res) => {
      this.ItemsList = res;
    });
  }
}

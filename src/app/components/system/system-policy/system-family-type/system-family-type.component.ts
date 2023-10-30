import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { NavigationExtras } from '@angular/router';
import { Table } from 'primeng/table';
import { MegaMenuItem, MenuItem } from 'primeng/api';
import { Router } from '@angular/router';

import { DatePipe } from '@angular/common';
import { ConfirmationService, ConfirmEventType, MessageService } from 'primeng/api';
import * as XLSX from 'xlsx';

import { AppConfig } from '../../../../config/config';
import { InitialCurrent } from '../../../../config/initial_current';
import { BankModel } from '../../../../models/system/policy/bank';
import { BankService } from '../../../../services/system/policy/bank.service';
import { FamilyModel } from 'src/app/models/system/policy/family';
import { FamilyService } from 'src/app/services/system/policy/family.service';
import { AccessdataModel } from 'src/app/models/system/security/accessdata';
@Component({
  selector: 'app-system-family-type',
  templateUrl: './system-family-type.component.html',
  styleUrls: ['./system-family-type.component.scss']
})
export class SystemFamilyTypeComponent implements OnInit {
  items: MenuItem[] = [];
  edit_data: boolean = false;
  new_data: boolean = false;
  home: any;
  itemslike: MenuItem[] = [];
  family_list: FamilyModel[] = [];
  selectedFamily: FamilyModel = new FamilyModel();

  constructor(
    private familyService: FamilyService,
    private router: Router,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private datePipe: DatePipe
  ) { }

  ngOnInit(): void {
    this.doGetInitialCurrent()
    this.doLoadLanguage()
    this.doLoadMenu()
    setTimeout(() => {


      this.doLoadFamily()
    }, 500);
  }

  public initial_current: InitialCurrent = new InitialCurrent();
  initialData2: InitialCurrent = new InitialCurrent();
  accessData: AccessdataModel = new AccessdataModel();
  doGetInitialCurrent() {
    this.initial_current = JSON.parse(localStorage.getItem(AppConfig.SESSIONInitial) || '{}');
    if (!this.initial_current) {
      this.router.navigateByUrl('login');
    }
    this.accessData = this.initialData2.dotGetPolmenu('SYS');

  }
  title_file: { [key: string]: string } = { EN: "File ", TH: "ไฟล์" }
  title_dropfile: { [key: string]: string } = { EN: "Drop files here", TH: "วางไฟล์ที่นี่" };
  title_choose: { [key: string]: string } = { EN: "Choose File", TH: "เลือกไฟล์" };
  title_nofile: { [key: string]: string } = { EN: "No file chosen", TH: "ไม่มีไฟล์ที่เลือก" };
  title_or: { [key: string]: string } = { EN: "or", TH: "หรือ" };
  title_template: { [key: string]: string } = { EN: "Template", TH: "เทมเพลต" };
  title_system: string = "System";

   title_genaral: string = "Genaral";
  title_page: string = "Family Type";
  title_new: string = "New";
  title_edit: string = "Edit";
  title_delete: string = "Delete";
  title_import: string = "Import";
  title_export: string = "Export";
  title_save: string = "Save";
  title_code: string = "Code";
  title_name_th: string = "Description(Thai)";
  title_name_en: string = "Description(Eng)";
  title_detail: string = "Detail";
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
  title_genaral_system: string = 'Genaral System';
  title_no: string = 'No';

  doLoadLanguage() {
    if (this.initial_current.Language == "TH") {
      this.title_genaral_system = 'ระบบทั่วไป';
      this.title_no = 'อันดับ';

      this.title_system = "ระบบ";
      this.title_genaral = "ทั่วไป";
      this.title_page = "ประเภทครอบครัว";
      this.title_new = "เพิ่ม";
      this.title_edit = "แก้ไข";
      this.title_delete = "ลบ";
      this.title_import = "นำเข้า";
      this.title_export = "โอนออก";
      this.title_save = "บันทึก";
      this.title_code = "รหัส";
      this.title_name_th = "รายละเอียด (ไทย)";
      this.title_name_en = "รายละเอียด (อังกฤษ)";
      this.title_detail = "รายละเอียด";
      this.title_modified_by = "ผู้ทำรายการ";
      this.title_modified_date = "วันที่ทำรายการ";
      this.title_search = "ค้นหา";
      this.title_upload = "อัปโหลด";

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
    this.itemslike = [{ label: this.title_genaral_system, routerLink: '/system/general' },
    { label: this.title_page, styleClass: 'activelike' }];
    this.home = { icon: 'pi pi-home', routerLink: '/' };
    this.items = [
      {
        label: this.title_new,
        icon: 'pi pi-fw pi-plus',
        command: (event) => {
          if (this.accessData.accessdata_new) {
            this.showManage()
            this.selectedFamily = new FamilyModel();
            this.new_data = true;
            this.edit_data = false;
          } else {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Permistion' });
          }

        }
      }
      ,
      {

        label:this.title_template[this.initial_current.Language],
        icon: 'pi-download',
        command: (event) => {
          window.open('assets/OPRFileImport/(OPR)Import System/(OPR)Import System Family.xlsx', '_blank');
        }
      }
      ,
      {
        label: this.title_import,
        icon: 'pi pi-fw pi-file-import',
        command: (event) => {
          this.showUpload()

        }
      }
      ,
      {
        label: this.title_export,
        icon: 'pi pi-fw pi-file-export',
        command: (event) => {
          this.exportAsExcel()

        }
      }
    ];
  }
  reloadPage() {
    this.doLoadFamily()
  }
  doLoadFamily() {
    this.familyService.family_get().then((res) => {
      this.family_list = res;
    });
  }

  confirmRecord() {
    this.confirmationService.confirm({
      message: this.title_confirm_record,
      header: this.title_confirm,
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.doRecordFamily()
      },
      reject: () => {
        this.messageService.add({ severity: 'warn', summary: 'Cancelled', detail: this.title_confirm_cancel });
      },
      key: "myDialog"
    });
  }

  doRecordFamily() {
    this.familyService.family_record(this.selectedFamily).then((res) => {
      // console.log(res)
      let result = JSON.parse(res);

      if (result.success) {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: result.message });
        this.doLoadFamily()
        this.edit_data = false;
        this.new_data = false;
        this.displayManage = false
      }
      else {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: result.message });
      }

    });
  }


  //
  confirmDeletes(data: any) {
    this.confirmationService.confirm({
      message: this.title_confirm_delete,
      header: this.title_confirm,
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.doDeleteFamilys(data);
      },

      reject: () => {
        this.messageService.add({
          severity: 'warn',
          summary: 'Cancelled',
          detail: this.title_confirm_cancel,
        });
      },
    });
  }

  doDeleteFamilys(data: any) {
    this.familyService.family_delete(data).then((res) => {
      let result = JSON.parse(res);
      if (result.success) {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: result.message,
        });
        this.doLoadFamily();
        this.edit_data = false;
        this.new_data = false;
        this.displayManage = false
      } else {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: result.message,
        });
      }
    });
  }
  //

  confirmDelete() {
    this.confirmationService.confirm({
      message: this.title_confirm_delete,
      header: this.title_confirm,
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.doDeleteFamily()
      },
      reject: () => {
        this.messageService.add({ severity: 'warn', summary: 'Cancelled', detail: this.title_confirm_cancel });
      },
      key: "myDialog"
    });
  }

  doDeleteFamily() {
    this.familyService.family_delete(this.selectedFamily).then((res) => {
      // console.log(res)
      let result = JSON.parse(res);

      if (result.success) {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: result.message });
        this.doLoadFamily();
        this.edit_data = false;
        this.new_data = false;
        this.displayManage = false
      }
      else {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: result.message });
      }

    });
  }

  close() {
    this.new_data = false
    this.selectedFamily = new FamilyModel()
  }
  onRowSelectFamily(event: any) {
    this.edit_data = true;
    this.new_data = true;
    this.displayManage = true
  }

  // fileToUpload: File | any = null;
  // handleFileInput(file: FileList) {
  //   this.fileToUpload = file.item(0);
  // }
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
  doUploadFamily() {

    if (this.fileToUpload) {
      this.confirmationService.confirm({
        message: "Confirm Upload file : " + this.fileToUpload.name,
        header: "Import File",
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
          const filename = "Family_" + this.datePipe.transform(new Date(), 'yyyyMMddHHmm');
          const filetype = "xls";

          this.familyService.family_import(this.fileToUpload, filename, filetype).then((res) => {
            // console.log(res)
            let result = JSON.parse(res);

            if (result.success) {
              this.messageService.add({ severity: 'success', summary: 'Success', detail: result.message });
              this.doLoadFamily();
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

  displayManage: boolean = false;
  position: string = "right";
  showManage() {
    this.displayManage = true
  }

  @ViewChild('TABLE') table: ElementRef | any = null;

  exportAsExcel() {
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(this.table.nativeElement);//converts a DOM TABLE element to a worksheet
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    XLSX.writeFile(wb, 'Export_Family.xlsx');

  }

}

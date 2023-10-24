import { DatePipe } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, MenuItem, MessageService } from 'primeng/api';
import { AppConfig } from 'src/app/config/config';
import { InitialCurrent } from 'src/app/config/initial_current';
import { ForetypeModel } from 'src/app/models/employee/policy/foretype';
import { AccessdataModel } from 'src/app/models/system/security/accessdata';
import { ForetypeService } from 'src/app/services/emp/policy/foretype.service';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-system-foretype',
  templateUrl: './system-foretype.component.html',
  styleUrls: ['./system-foretype.component.scss']
})
export class SystemForetypeComponent implements OnInit {

  items: MenuItem[] = [];
  edit_data: boolean = false;
  new_data: boolean = false;

  foretype_list: ForetypeModel[] = [];
  selectedForetype: ForetypeModel = new ForetypeModel();

  itemslike: MenuItem[] = [];
  home: any;

  title_sys: { [key: string]: string } = { EN: "System", TH: "ระบบ" };
  title_genaral: { [key: string]: string } = { EN: "Genaral System", TH: "ระบบทั่วไป" };
  title_fore: { [key: string]: string } = { EN: "Foreigner Type", TH: "ประเภทพนักงานต่างด้าว" };

  title_page: { [key: string]: string } = { EN: "Foreigner Type", TH: "ประเภทพนักงานต่างด้าว" };
  title_new: { [key: string]: string } = { EN: "New", TH: "เพิ่ม" };
  title_edit: { [key: string]: string } = { EN: "Edit", TH: "แก้ไข" };
  title_delete: { [key: string]: string } = { EN: "Delete", TH: "ลบ" };
  title_import: { [key: string]: string } = { EN: "Import", TH: "นำเข้า" };
  title_export: { [key: string]: string } = { EN: "Export", TH: "ส่งออก" };
  title_save: { [key: string]: string } = { EN: "Save", TH: "บันทึก" };
  title_code: { [key: string]: string } = { EN: "Code", TH: "รหัส" };
  title_name_th: { [key: string]: string } = { EN: "Name (thai)", TH: "ชื่อไทย" };
  title_name_en: { [key: string]: string } = { EN: "Name (Eng.)", TH: "ชื่ออังกฤษ" };
  title_detail: { [key: string]: string } = { EN: "Detail", TH: "รายละเอียด" };
  title_modified_by: { [key: string]: string } = { EN: "Edit by", TH: "ผู้ทำรายการ" };
  title_modified_date: { [key: string]: string } = { EN: "Edit date", TH: "วันที่ทำรายการ" };
  title_search: { [key: string]: string } = { EN: "Search", TH: "ค้นหา" };
  title_upload: { [key: string]: string } = { EN: "Upload", TH: "อัพโหลด" };

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

  constructor(
    private router: Router,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private datePipe: DatePipe,
    private foretypeService: ForetypeService,
  ) { }

  ngOnInit(): void {
    this.doGetInitialCurrent();
    this.doLoadMenu();
    setTimeout(() => {
      this.doLoadForetype()
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
    this.accessData = this.initialData2.dotGetPolmenu('SYS');
  }

  doLoadMenu() {
    this.itemslike = [{ label: this.title_genaral[this.initial_current.Language], routerLink: '/system/general' }, {
      label: this.title_fore[this.initial_current.Language], styleClass: 'activelike'
    }];

    this.home = { icon: 'pi pi-home', routerLink: '/' };

    this.items = [
      {
        label: this.title_new[this.initial_current.Language],
        icon: 'pi pi-fw pi-plus',
        command: (event) => {
          if (this.accessData.accessdata_new) {
            this.showManage();
            this.selectedForetype = new ForetypeModel();
            this.new_data = true;
            this.edit_data = false;
          } else {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Permission denied' });
          }
        }
      },
      {
        label: "Template",
        icon: 'pi-download',
        command: (event) => {
          window.open('assets/OPRFileImport/(OPR)Import emp/(OPR)Import Initial.xlsx', '_blank');
        }
      }
      ,
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
    ];
  }

  reloadPage() {
    this.doLoadForetype()
  }

  doLoadForetype() {
    this.foretypeService.foretype_get().then((res) => {
      this.foretype_list = res;
    });
  }

  confirmRecord() {
    this.confirmationService.confirm({
      message: this.title_confirm_record[this.initial_current.Language],
      header: this.title_confirm[this.initial_current.Language],
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.doRecordForetype()
      },
      reject: () => {
        this.messageService.add({ severity: 'warn', summary: 'Cancelled', detail: this.title_confirm_cancel[this.initial_current.Language] });
      },
      key: "myDialog"
    });
  }

  doRecordForetype() {
    this.foretypeService.foretype_record(this.selectedForetype).then((res) => {
      // console.log(res)
      let result = JSON.parse(res);

      if (result.success) {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: result.message });
        this.doLoadForetype()
        this.edit_data = false;
        this.new_data = false;
        this.displayManage = false
      }
      else {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: result.message });
      }

    });
  }

  confirmDelete() {
    this.confirmationService.confirm({
      message: this.title_confirm_delete[this.initial_current.Language],
      header: this.title_confirm[this.initial_current.Language],
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.doDeleteForetype()
      },
      reject: () => {
        this.messageService.add({ severity: 'warn', summary: 'Cancelled', detail: this.title_confirm_cancel[this.initial_current.Language] });
      }
    });
  }

  doDeleteForetype() {
    this.foretypeService.foretype_delete(this.selectedForetype).then((res) => {
      // console.log(res)
      let result = JSON.parse(res);

      if (result.success) {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: result.message });
        this.doLoadForetype();
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
    this.selectedForetype = new ForetypeModel()
  }
  onRowSelectForetype(event: any) {
    this.edit_data = true;
    this.new_data = true;
    this.displayManage = true
  }

  fileToUpload: File | any = null;
  handleFileInput(file: FileList) {
    this.fileToUpload = file.item(0);
  }

  doUploadInitial() {
    if (this.fileToUpload) {
      this.confirmationService.confirm({
        message: "Confirm Upload file : " + this.fileToUpload.name,
        header: "Import File",
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
          const filename = "FORETYPE_" + this.datePipe.transform(new Date(), 'yyyyMMddHHmm');
          const filetype = "xls";

          this.foretypeService.foretype_import(this.fileToUpload, filename, filetype).then((res) => {
            // console.log(res)
            let result = JSON.parse(res);

            if (result.success) {
              this.messageService.add({ severity: 'success', summary: 'Success', detail: result.message });
              this.doLoadForetype();
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

  //
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

  exportAsExcel() {
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(this.table.nativeElement);//converts a DOM TABLE element to a worksheet
    for (var i in ws) {
      if (i.startsWith("!") || i.charAt(1) !== "1") {
        continue;
      }
      var n = 0;
      for (var j in ws) {
        if (j.startsWith(i.charAt(0)) && j.charAt(1) !== "1" && ws[i].v !== "") {
          ws[j].v = ws[j].v.replace(ws[i].v, "")
        } else {
          n += 1;
        }

      }
    }
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    XLSX.writeFile(wb, 'Export_foreignertype.xlsx');

  }

}

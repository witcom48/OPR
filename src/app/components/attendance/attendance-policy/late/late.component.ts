import { DatePipe } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, MenuItem, MessageService } from 'primeng/api';
import { AppConfig } from 'src/app/config/config';
import { InitialCurrent } from 'src/app/config/initial_current';
import { LateModels } from 'src/app/models/attendance/late';
import { LateconditionModels } from 'src/app/models/attendance/late_condition';
import { AccessdataModel } from 'src/app/models/system/security/accessdata';
import { LateServices } from 'src/app/services/attendance/late.service';
import * as XLSX from 'xlsx';
declare var late: any;
@Component({
  selector: 'app-late',
  templateUrl: './late.component.html',
  styleUrls: ['./late.component.scss']
})
export class LateComponent implements OnInit {
  langs: any = late;
  selectlang: string = "EN";
  constructor(private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private datePipe: DatePipe,
    private lateService: LateServices,
    private router: Router,
  ) { }
  @ViewChild('importFile') importFile: any
  @ViewChild('TABLE') table: ElementRef | any = null;
  itemslike: MenuItem[] = [];
  home: any;
  new_data: boolean = false
  edit_data: boolean = false
  fileToUpload: File | any = null;
  displayUpload: boolean = false;
  displayaddcondition: boolean = false;
  displayeditcondition: boolean = false;
  items: MenuItem[] = [];
  itemslate: MenuItem[] = [];
  late_list: LateModels[] = [];
  lates: LateModels = new LateModels()
  conditions: LateconditionModels = new LateconditionModels()
  public initial_current: InitialCurrent = new InitialCurrent();
  initialData2: InitialCurrent = new InitialCurrent();
  accessData: AccessdataModel = new AccessdataModel();
  doGetInitialCurrent() {
    this.initial_current = JSON.parse(localStorage.getItem(AppConfig.SESSIONInitial) || '{}');
    if (!this.initial_current.Token) {
      this.router.navigateByUrl('login');
    }
    this.selectlang = this.initial_current.Language;
    this.accessData = this.initialData2.dotGetPolmenu('ATT');
  }
  ngOnInit(): void {
    this.initial_current.loading = true;
    this.doGetInitialCurrent();
    this.doLoadMenu();
    this.doLoadLate();
  }

  doLoadLate() {
    this.initial_current.loading = true;
    this.late_list = [];
    var tmp = new LateModels();
    this.lateService.late_get(tmp).then(async (res) => {
      this.late_list = await res;
      this.initial_current.loading = false;
    });
  }
  async doRecordLate(data: LateModels) {
    this.initial_current.loading = true;
    await this.lateService.late_record(data).then((res) => {
      // console.log(res)
      if (res.success) {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: res.message });
        this.doLoadLate()
      }
      else {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: res.message });
      }
      this.initial_current.loading = false;
    });
    this.new_data = false;
    this.edit_data = false;
  }
  async doDeleteLate(data: LateModels) {
    this.initial_current.loading = true;
    await this.lateService.late_delete(data).then((res) => {
      // console.log(res)
      if (res.success) {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: res.message });
        this.doLoadLate()
      }
      else {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: res.message });
      }
      this.initial_current.loading = false;
    });
    this.new_data = false;
    this.edit_data = false;
  }
  doUploadLate() {
    this.initial_current.loading = true;
    const filename = "LATE_" + this.datePipe.transform(new Date(), 'yyyyMMddHHmm');
    const filetype = "xls";
    this.lateService.late_import(this.fileToUpload, filename, filetype).then((res) => {
      // console.log(res)
      if (res.success) {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: res.message });
        this.doLoadLate();
        this.edit_data = false;
        this.new_data = false;
      }
      else {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: res.message });
      }
      this.fileToUpload = null;
      this.initial_current.loading = false;
    });
  }
  handleFileInput(file: FileList) {
    this.fileToUpload = file.item(0);
  }
  closedupload() {
    this.importFile.nativeElement.value = null
    this.fileToUpload = null;
  }

  doLoadMenu() {
    this.itemslike = [{ label: 'Attendance', routerLink: '/attendance/policy' }, {
      label: this.langs.get('late')[this.selectlang], styleClass: 'activelike'
    }];

    this.home = { icon: 'pi pi-home', routerLink: '/' };
    this.items = [
      {
        label: this.langs.get('new')[this.selectlang],
        icon: 'pi-plus',
        command: (event) => {
          if (this.accessData.accessdata_new) {
            this.lates = new LateModels();
            this.new_data = true;
            this.edit_data = false;
          } else {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Permission denied' });
          }
        }
      }
      ,
      {
        label: "Template",
        icon: 'pi-download',
        command: (event) => {
          window.open('assets/OPRFileImport/(OPR)Import Attendance/(OPR)Import Late.xlsx', '_blank');
        }
      }
      ,
      {
        label: this.langs.get('import')[this.selectlang],
        icon: 'pi-file-import',
        command: (event) => {
          this.showUpload()

        }
      }
      ,
      {
        label: this.langs.get('export')[this.selectlang],
        icon: 'pi-file-export',
        command: (event) => {
          this.exportAsExcel()

        }
      }
    ];
    this.itemslate = [
      {
        label: this.langs.get('new')[this.selectlang],
        icon: 'pi-plus',
        command: (event) => {
          this.conditions = new LateconditionModels();
          this.displayaddcondition = true;
          this.displayeditcondition = false;
        }
      }
    ];
  }
  showUpload() {
    this.closedupload();
    this.displayUpload = true;
  }
  Uploadfile() {
    if (this.fileToUpload) {
      this.confirmationService.confirm({
        message: this.langs.get('confirm_upload')[this.selectlang] + this.fileToUpload.name,
        header: this.langs.get('import')[this.selectlang],
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
          this.displayUpload = false;
          this.doUploadLate();
        },
        reject: () => {
          this.displayUpload = false;
        }
      });
    } else {
      this.messageService.add({ severity: 'warn', summary: 'File', detail: "Please choose a file." });
    }
  }
  close() {
    this.new_data = false
    this.edit_data = false
    this.lates = new LateModels()
    this.displayaddcondition = false;
    this.displayeditcondition = false;
    this.conditions = new LateconditionModels();
  }
  closedispaly() {
    this.displayaddcondition = false;
    this.displayeditcondition = false;
    this.conditions = new LateconditionModels();
  }
  Save() {
    // console.log(this.lates)
    this.doRecordLate(this.lates)
  }
  Savelate() {
    if (!this.displayeditcondition) {
      this.lates.late_data = this.lates.late_data.concat({
        company_code: this.initial_current.CompCode,
        late_code: this.lates.late_code,
        late_from: this.conditions.late_from,
        late_to: this.conditions.late_to,
        late_deduct_type: this.conditions.late_deduct_type,
        late_deduct_amount: this.conditions.late_deduct_amount,
      })
    }
    this.displayaddcondition = false;
    this.displayeditcondition = false;
    this.conditions = new LateconditionModels();
  }
  Delete() {
    this.confirmationService.confirm({
      message: this.langs.get('confirm_delete')[this.selectlang],
      header: this.langs.get('delete')[this.selectlang],
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.doDeleteLate(this.lates)
      },
      reject: () => {
      }
    });
  }
  Deletelate() {
    this.lates.late_data = this.lates.late_data.filter((item) => {
      return item !== this.conditions;
    });
    this.displayaddcondition = false;
    this.displayeditcondition = false;
    this.conditions = new LateconditionModels();
  }
  onRowSelectList(event: any) {
    this.displayaddcondition = true
    this.displayeditcondition = true
    // console.log(this.conditions)
  }
  onRowSelect(event: any) {
    this.new_data = true
    this.edit_data = true;
  }
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

    XLSX.writeFile(wb, 'Export_Late.xlsx');

  }
}

import { DatePipe } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, MenuItem, MessageService } from 'primeng/api';
import { AppConfig } from 'src/app/config/config';
import { InitialCurrent } from 'src/app/config/initial_current';
import { ReasonModels } from 'src/app/models/attendance/reason';
import { ReasonServices } from 'src/app/services/attendance/reason.service';
import * as XLSX from 'xlsx';
declare var reason: any;
interface Type {
  name: string,
  code: string
}
@Component({
  selector: 'app-reason',
  templateUrl: './reason.component.html',
  styleUrls: ['./reason.component.scss']
})
export class ReasonComponent implements OnInit {
  langs: any = reason;
  selectlang: string = "EN"
  constructor(private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private reasonServices: ReasonServices,
    private router: Router,
    private datePipe: DatePipe,) { }
  @ViewChild('TABLE') table: ElementRef | any = null;
  TypeList: Type[] = [];
  selectedType: Type = { code: 'EMP', name: this.langs.get('resignreq')[this.selectlang] }
  new_data: boolean = false
  edit_data: boolean = false
  fileToUpload: File | any = null;
  displayUpload: boolean = false;
  items: MenuItem[] = [];
  reason_list: ReasonModels[] = [];
  reasons: ReasonModels = new ReasonModels()

  public initial_current: InitialCurrent = new InitialCurrent();
  doGetInitialCurrent() {
    this.initial_current = JSON.parse(localStorage.getItem(AppConfig.SESSIONInitial) || '{}');
    if (!this.initial_current.Token) {
      this.router.navigateByUrl('');
    }
    this.selectlang = this.initial_current.Language;
  }
  ngOnInit(): void {
    this.doGetInitialCurrent();
    this.doLoadMenu()
    this.TypeList = [
      { code: 'EMP', name: this.langs.get('resignreq')[this.selectlang] },
      { code: 'LEAVE', name: this.langs.get('leavereq')[this.selectlang] },
      { code: 'OT', name: this.langs.get('otreq')[this.selectlang] },
      { code: 'DAT', name: this.langs.get('daytypereq')[this.selectlang] },
      { code: 'SHT', name: this.langs.get('shiftreq')[this.selectlang] },
      { code: 'ONS', name: this.langs.get('onsitereq')[this.selectlang] },
      { code: 'SAL', name: this.langs.get('salaryreq')[this.selectlang] }
    ];
    this.doLoadReason();
  }
  doLoadReason() {
    this.reason_list = [];
    var tmp = new ReasonModels();
    tmp.reason_group = this.selectedType.code;
    this.reasonServices.reason_get(tmp).then(async (res) => {
      this.reason_list = await res;
    });
  }
  async doRecordReason(data: ReasonModels) {
    data.reason_group = this.selectedType.code;
    await this.reasonServices.reason_record(data).then((res) => {
      if (res.success) {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: res.message });
        this.doLoadReason()
      }
      else {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: res.message });
      }

    });
    this.new_data = false;
    this.edit_data = false;
  }
  async doDeleteReason(data: ReasonModels) {
    await this.reasonServices.reason_delete(data).then((res) => {
      if (res.success) {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: res.message });
        this.doLoadReason()
      }
      else {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: res.message });
      }

    });
    this.new_data = false;
    this.edit_data = false;
  }
  doUploadReason() {
    const filename = "REASON_" + this.datePipe.transform(new Date(), 'yyyyMMddHHmm');
    const filetype = "xls";
    this.reasonServices.reason_import(this.fileToUpload, filename, filetype).then((res) => {
      if (res.success) {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: res.message });
        this.doLoadReason();
        this.edit_data = false;
        this.new_data = false;
      }
      else {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: res.message });
      }
      this.fileToUpload = null;
    });
  }
  doLoadMenu() {

    this.items = [
      {
        label: this.langs.get('new')[this.selectlang],
        icon: 'pi-plus',
        command: (event) => {
          this.reasons = new ReasonModels();
          this.new_data = true;
          this.edit_data = false;
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
  }
  close() {
    this.new_data = false
    this.reasons = new ReasonModels()
  }
  showUpload() {
    this.displayUpload = true;
  }
  handleFileInput(file: FileList) {
    this.fileToUpload = file.item(0);
  }

  Uploadfile() {
    if (this.fileToUpload) {
      this.confirmationService.confirm({
        message: this.langs.get('confirm_upload')[this.selectlang] + this.fileToUpload.name,
        header: this.langs.get('import')[this.selectlang],
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
          this.displayUpload = false;
          this.doUploadReason();
        },
        reject: () => {
          this.displayUpload = false;
        }
      });
    } else {
      this.messageService.add({ severity: 'warn', summary: 'File', detail: "Please choose a file." });
    }
  }
  Save() {
    this.doRecordReason(this.reasons)
  }
  Delete() {
    this.doDeleteReason(this.reasons)
  }
  selectType() {
    this.doLoadReason();
  }
  onRowSelect(event: any) {
    this.new_data = true
    this.edit_data = true;
  }
  exportAsExcel() {

    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(this.table.nativeElement);//converts a DOM TABLE element to a worksheet
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    XLSX.writeFile(wb, 'Export_Reason.xlsx');

  }

}

import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ConfirmationService, MenuItem, MessageService } from 'primeng/api';
import { YearPeriodModels } from 'src/app/models/attendance/yearperiod';
import { YearServices } from '../../../../services/attendance/year.service';
import { DatePipe } from '@angular/common';

import * as XLSX from 'xlsx';
import { InitialCurrent } from 'src/app/config/initial_current';
import { AppConfig } from 'src/app/config/config';
import { Router } from '@angular/router';
declare var yearperiod: any;
@Component({
  selector: 'app-yearperiod',
  templateUrl: './yearperiod.component.html',
  styleUrls: ['./yearperiod.component.scss']
})
export class YearperiodComponent implements OnInit {
  langs: any = yearperiod;
  selectlang: string = "EN";
  constructor(private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private yearServices: YearServices,
    private datePipe: DatePipe,
    private router: Router,) { }
  @ViewChild('TABLE') table: ElementRef | any = null;
  new_data: boolean = false
  edit_data: boolean = false
  fileToUpload: File | any = null;
  displayUpload: boolean = false;
  items: MenuItem[] = [];
  yearperiods_list: YearPeriodModels[] = [];
  yearperiods: YearPeriodModels = new YearPeriodModels()

  public initial_current: InitialCurrent = new InitialCurrent();
  doGetInitialCurrent() {
    this.initial_current = JSON.parse(localStorage.getItem(AppConfig.SESSIONInitial) || '{}');
    if (!this.initial_current) {
      this.router.navigateByUrl('');
    }
    this.selectlang = this.initial_current.Language;
  }

  ngOnInit(): void {
    this.doGetInitialCurrent();
    this.doLoadMenu()
    this.doLoadYear()
  }
  doLoadYear() {
    this.yearperiods_list = [];
    var tmp = new YearPeriodModels();
    this.yearServices.year_get(tmp).then(async (res) => {
      await res.forEach((element: YearPeriodModels) => {
        element.year_fromdate = new Date(element.year_fromdate)
        element.year_todate = new Date(element.year_todate)
      });
      this.yearperiods_list = await res;
    });
  }
  async doRecordYear(data: YearPeriodModels) {
    await this.yearServices.year_record(data).then((res) => {
      console.log(res)
      if (res.success) {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: res.message });
        this.doLoadYear()
      }
      else {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: res.message });
      }

    });
    this.new_data = false;
    this.edit_data = false;
  }
  async doDeleteYear(data: YearPeriodModels) {
    await this.yearServices.year_delete(data).then((res) => {
      console.log(res)
      if (res.success) {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: res.message });
        this.doLoadYear()
      }
      else {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: res.message });
      }

    });
    this.new_data = false;
    this.edit_data = false;
  }
  doUploadYear() {
    const filename = "YEAR_" + this.datePipe.transform(new Date(), 'yyyyMMddHHmm');
    const filetype = "xls";
    this.yearServices.year_import(this.fileToUpload, filename, filetype).then((res) => {
      console.log(res)
      if (res.success) {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: res.message });
        this.doLoadYear();
        this.edit_data = false;
        this.new_data = false;
      }
      else {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: res.message });
      }

    });
  }
  handleFileInput(file: FileList) {
    this.fileToUpload = file.item(0);
  }


  doLoadMenu() {

    this.items = [
      {
        label: this.langs.get('new')[this.selectlang],
        icon: 'pi-plus',
        command: (event) => {
          this.yearperiods = new YearPeriodModels();
          this.new_data = true;
          this.edit_data = false;
          this.selectlang = "TH"
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
  showUpload() {
    this.displayUpload = true;
  }
  Uploadfile() {
    if (this.fileToUpload) {
      this.confirmationService.confirm({
        message: "Confirm Upload file : " + this.fileToUpload.name,
        header: "Import File",
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
          console.log(this.fileToUpload)
          this.displayUpload = false;
          this.doUploadYear()
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
    this.yearperiods = new YearPeriodModels()
  }
  changeParentCount(val: string) {
    console.log(val)
  }
  Save() {
    this.doRecordYear(this.yearperiods)
    // console.log(this.yearperiods)
  }
  Delete() {
    this.doDeleteYear(this.yearperiods)
  }
  onRowSelect(event: any) {
    this.new_data = true
    this.edit_data = true;
  }
  exportAsExcel() {

    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(this.table.nativeElement);//converts a DOM TABLE element to a worksheet
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    XLSX.writeFile(wb, 'Export_YearPeriod.xlsx');

  }
}

import { DatePipe } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, MenuItem, MessageService } from 'primeng/api';
import { AppConfig } from 'src/app/config/config';
import { InitialCurrent } from 'src/app/config/initial_current';
import { ShiftModels } from 'src/app/models/attendance/shift';
import { ShiftallowanceModels } from 'src/app/models/attendance/shiftallowance';
import { ShiftbreakModels } from 'src/app/models/attendance/shiftbreak';
import { ShiftServices } from 'src/app/services/attendance/shift.service';
import * as XLSX from 'xlsx';
declare var shfit: any;
@Component({
  selector: 'app-shift',
  templateUrl: './shift.component.html',
  styleUrls: ['./shift.component.scss']
})
export class ShiftComponent implements OnInit {
  langs: any = shfit;
  selectlang: string = "EN";
  constructor(private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private shiftService: ShiftServices,
    private datePipe: DatePipe,
    private router: Router,
  ) { }
  @ViewChild('TABLE') table: ElementRef | any = null;
  new_data: boolean = false
  edit_data: boolean = false
  fileToUpload: File | any = null;
  displayUpload: boolean = false;
  displayaddbreak: boolean = false;
  displayeditbreak: boolean = false;
  displayaddallowance: boolean = false;
  displayeditallowance: boolean = false;
  items: MenuItem[] = [];
  items_break: MenuItem[] = [];
  items_allowance: MenuItem[] = [];
  shift_list: ShiftModels[] = [];
  shifts: ShiftModels = new ShiftModels()
  shifts_brack: ShiftbreakModels = new ShiftbreakModels()
  shifts_allowance: ShiftallowanceModels = new ShiftallowanceModels()
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
    this.doLoadShift();
  }
  doLoadShift() {
    this.shift_list = [];
    var tmp = new ShiftModels();
    this.shiftService.shift_get(tmp).then(async (res) => {
      this.shift_list = await res;
    });
  }
  async doRecordShift(data: ShiftModels) {
    await this.shiftService.shift_record(data).then((res) => {
      if (res.success) {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: res.message });
        this.doLoadShift();
      }
      else {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: res.message });
      }

    });
    this.new_data = false;
    this.edit_data = false;
  }
  async doDeleteShift(data: ShiftModels) {
    await this.shiftService.shift_delete(data).then((res) => {
      console.log(res)
      if (res.success) {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: res.message });
        this.doLoadShift()
      }
      else {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: res.message });
      }

    });
    this.new_data = false;
    this.edit_data = false;
  }
  doUploadShift() {
    const filename = "SHIFT_" + this.datePipe.transform(new Date(), 'yyyyMMddHHmm');
    const filetype = "xls";
    this.shiftService.shift_import(this.fileToUpload, filename, filetype).then((res) => {
      console.log(res)
      if (res.success) {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: res.message });
        this.doLoadShift();
        this.edit_data = false;
        this.new_data = false;
      }
      else {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: res.message });
      }
      this.fileToUpload = null;
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
          this.shifts = new ShiftModels();
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
    this.items_break = [
      {
        label: this.langs.get('new')[this.selectlang],
        icon: 'pi-plus',
        command: (event) => {
          this.shifts_brack = new ShiftbreakModels();
          this.displayaddbreak = true;
        }
      }
      // }
    ];
    this.items_allowance = [
      {
        label: this.langs.get('new')[this.selectlang],
        icon: 'pi-plus',
        command: (event) => {
          this.shifts_allowance = new ShiftallowanceModels();
          this.displayaddallowance = true;
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
          this.displayUpload = false;
          this.doUploadShift();
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
    this.shifts = new ShiftModels()
  }
  Save() {
    console.log(this.shifts)
    this.doRecordShift(this.shifts)
  }
  Delete() {
    this.doDeleteShift(this.shifts);
  }
  Savebreak() {
    if (!this.displayeditbreak) {
      this.shifts.shift_break = this.shifts.shift_break.concat({
        company_code: this.shifts.company_code,
        shift_code: this.shifts.shift_code,
        shiftbreak_no: this.shifts_brack.shiftbreak_no,
        shiftbreak_from: this.shifts_brack.shiftbreak_from,
        shiftbreak_to: this.shifts_brack.shiftbreak_to,
        shiftbreak_break: this.shifts_brack.shiftbreak_break
      })
    }
    this.shifts_brack = new ShiftbreakModels();
    this.displayeditbreak = false;
    this.displayaddbreak = false;

  }
  Deletebreak() {
    this.shifts.shift_break = this.shifts.shift_break.filter((item) => {
      return item !== this.shifts_brack;
    });
    this.shifts_brack = new ShiftbreakModels();
    this.displayeditbreak = false;
    this.displayaddbreak = false;
  }

  Saveallowance() {
    if (!this.displayeditallowance) {
      this.shifts.shift_allowance = this.shifts.shift_allowance.concat({
        company_code: this.shifts.company_code,
        shift_code: this.shifts.shift_code,
        shiftallowance_no: this.shifts_allowance.shiftallowance_no,
        shiftallowance_name_th: this.shifts_allowance.shiftallowance_name_th,
        shiftallowance_name_en: this.shifts_allowance.shiftallowance_name_en,
        shiftallowance_hhmm: this.shifts_allowance.shiftallowance_hhmm,
        shiftallowance_amount: this.shifts_allowance.shiftallowance_amount,
      })
    }
    this.shifts_allowance = new ShiftallowanceModels();
    this.displayeditallowance = false;
    this.displayaddallowance = false;

  }
  Deleteallowance() {
    this.shifts.shift_allowance = this.shifts.shift_allowance.filter((item) => {
      return item !== this.shifts_allowance;
    });
    this.shifts_allowance = new ShiftallowanceModels();
    this.displayeditallowance = false;
    this.displayaddallowance = false;
  }
  closedispaly() {
    this.shifts_brack = new ShiftbreakModels();
    this.shifts_allowance = new ShiftallowanceModels();
    this.displayeditallowance = false;
    this.displayeditbreak = false;
  }
  onRowSelect(event: any) {
    this.edit_data = true;
    this.new_data = true;
  }
  onRowSelectbreak(event: any) {
    this.displayeditbreak = true;
    this.displayaddbreak = true;
  }
  onRowSelectallowance(event: any) {
    this.displayeditallowance = true;
    this.displayaddallowance = true;

  }
  exportAsExcel() {
    console.log(XLSX.utils.table_to_sheet(this.table.nativeElement))
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
    console.log(wb)
    XLSX.writeFile(wb, 'Export_YearPeriod.xlsx');

  }
}

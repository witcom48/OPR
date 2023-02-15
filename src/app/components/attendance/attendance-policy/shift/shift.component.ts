import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ConfirmationService, MenuItem, MessageService } from 'primeng/api';
import { ShiftModels } from 'src/app/models/attendance/shift';
import { ShiftallowanceModels } from 'src/app/models/attendance/shiftallowance';
import { ShiftbreakModels } from 'src/app/models/attendance/shiftbreak';
import * as XLSX from 'xlsx';
@Component({
  selector: 'app-shift',
  templateUrl: './shift.component.html',
  styleUrls: ['./shift.component.scss']
})
export class ShiftComponent implements OnInit {
  @ViewChild('TABLE') table: ElementRef | any = null;
  new_data: boolean = false
  edit_data: boolean = false
  fileToUpload: File | any = null;
  displayUpload: boolean = false;
  constructor(private messageService: MessageService,
    private confirmationService: ConfirmationService,) { }
  items: MenuItem[] = [];
  items_break: MenuItem[] = [];
  items_allowance: MenuItem[] = [];
  shift_list: ShiftModels[] = [];
  shifts: ShiftModels = new ShiftModels()
  shifts_brack: ShiftbreakModels = new ShiftbreakModels()
  shifts_allowance: ShiftallowanceModels = new ShiftallowanceModels()

  ngOnInit(): void {
    this.doLoadMenu()
    this.shift_list = [{
      company_code: 'PSG',
      shift_id: '1',
      shift_code: 'Shift N1',
      shift_name_th: 'กะการทำงานเวลาปกติ 7.00-16.00น.',
      shift_name_en: 'Shift Normal 7.00-16.00',
      shift_ch1: '04:00',
      shift_ch2: '07:00',
      shift_ch3: '07:00',
      shift_ch4: '16:00',
      shift_ch5: '00:00',
      shift_ch6: '00:00',
      shift_ch7: '00:00',
      shift_ch8: '00:00',
      shift_ch9: '16:00',
      shift_ch10: '22:00',
      shift_ch3_from: '04:00',
      shift_ch3_to: '12:00',
      shift_ch4_from: '12:00',
      shift_ch4_to: '22:00',
      shift_ch7_from: '00:00',
      shift_ch7_to: '00:00',
      shift_ch8_from: '00:00',
      shift_ch8_to: '00:00',
      shift_otin_min: 3,
      shift_otin_max: 3,
      shift_otout_min: 6,
      shift_otout_max: 6,
      created_by: 'Admin',
      created_date: '2022-01-16',
      modified_by: 'admin',
      modified_date: '2022-01-17',
      flag: false,
      shift_flexiblebreak: true,
      shift_break: [{
        company_code: 'PSG',
        shift_code: 'Nhift N1',
        shiftbreak_no: 0,
        shiftbreak_from: "12:00",
        shiftbreak_to: "13:00",
        shiftbreak_break: 1
      }],
      shift_allowance: [{
        company_code: "PSG",
        shift_code: "Shift N1",
        shiftallowance_no: 0,
        shiftallowance_name_th: "ค่ากะ",
        shiftallowance_name_en: "KA",
        shiftallowance_hhmm: "04:00",
        shiftallowance_amount: 40.00
      }],
    }]
  }
  handleFileInput(file: FileList) {
    this.fileToUpload = file.item(0);
  }


  doLoadMenu() {

    this.items = [
      {
        label: "New",
        icon: 'pi-plus',
        command: (event) => {
          this.shifts = new ShiftModels();
          this.new_data = true;
          this.edit_data = false;
        }
      }
      ,
      {
        label: "Import",
        icon: 'pi-file-import',
        command: (event) => {
          this.showUpload()

        }
      }
      ,
      {
        label: "Export",
        icon: 'pi-file-export',
        command: (event) => {
          this.exportAsExcel()

        }
      }
    ];
    this.items_break = [
      {
        label: "New",
        icon: 'pi-plus',
        command: (event) => {
          this.shifts = new ShiftModels();
          this.new_data = true;
          this.edit_data = false;
        }
      }
      ,
      {
        label: "Import",
        icon: 'pi-file-import',
        command: (event) => {
          this.showUpload()

        }
      }
      ,
      {
        label: "Export",
        icon: 'pi-file-export',
        command: (event) => {
          this.exportAsExcel()

        }
      }
    ];
    this.items_allowance = [
      {
        label: "New",
        icon: 'pi-plus',
        command: (event) => {
          this.shifts = new ShiftModels();
          this.new_data = true;
          this.edit_data = false;
        }
      }
      ,
      {
        label: "Import",
        icon: 'pi-file-import',
        command: (event) => {
          this.showUpload()

        }
      }
      ,
      {
        label: "Export",
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
          this.messageService.add({ severity: 'success', summary: 'File', detail: "Upload Success" });
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
  close() {
    this.new_data = false
    this.shifts = new ShiftModels()
  }
  Save() {
    console.log(this.shifts)
  }
  onRowSelectList(event: any) {
    // this.displayaddholiday = true
    // this.displayeditholiday = true
    console.log(this.shifts_brack)
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

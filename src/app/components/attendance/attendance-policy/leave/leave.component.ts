import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ConfirmationService, MenuItem, MessageService } from 'primeng/api';
import { LeaveModels } from 'src/app/models/attendance/leave';
import { LeaveworkageModels } from 'src/app/models/attendance/leave_workage';
import * as XLSX from 'xlsx';
@Component({
  selector: 'app-leave',
  templateUrl: './leave.component.html',
  styleUrls: ['./leave.component.scss']
})
export class LeaveComponent implements OnInit {
  @ViewChild('TABLE') table: ElementRef | any = null;
  new_data: boolean = false
  edit_data: boolean = false
  fileToUpload: File | any = null;
  displayUpload: boolean = false;
  displayaddworkage: boolean = false;
  displayeditworkage: boolean = false;
  constructor(private messageService: MessageService,
    private confirmationService: ConfirmationService,) { }
  items: MenuItem[] = [];
  items_workage: MenuItem[] = [];
  leaves_list: LeaveModels[] = [];
  leaves: LeaveModels = new LeaveModels()
  workage_list: LeaveworkageModels[] = [];
  workages: LeaveworkageModels = new LeaveworkageModels()

  ngOnInit(): void {
    this.doLoadMenu()
    this.leaves_list = [
      {
        company_code: "PSG",
        leave_id: "1",
        leave_code: "LB01",
        leave_name_th: "ลากิจ(จ่าย)",
        leave_name_en: "Private Leave",
        leave_day_peryear: "3",
        leave_day_acc: "0.00",
        leave_day_accexpire: new Date("999-12-31"),
        leave_incholiday: "N",
        leave_passpro: "N",
        leave_deduct: "N",
        leave_caldiligence: "N",
        leave_agework: "N",
        leave_ahead: "7",
        leave_min_hrs: "00:00",
        leave_max_day: "0",
        created_by: 'Admin',
        created_date: '2022-01-16',
        modied_by: 'admin',
        modied_date: '2022-01-17',
        flag: "0",
        leave_workage: [{
          company_code: "PSG",
          leave_code: "LB01",
          workage_from: "1.00",
          workage_to: "99.00",
          workage_leaveday: "14.00"
        }]
      }
    ]
    this.items_workage = [
      {
        label: "New",
        icon: 'pi-plus',
        command: (event) => {
          this.workages = new LeaveworkageModels();
          this.displayaddworkage = true;
          this.displayeditworkage = false;
        }
      }
      ,
      {
        label: "Import",
        icon: 'pi-file-import',
        command: (event) => {
          // this.showUpload()

        }
      }
      ,
      {
        label: "Export",
        icon: 'pi-file-export',
        command: (event) => {
          // this.exportAsExcel()
          // this.exportAsExcelHolidaylist();

        }
      }
    ]
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
          this.leaves = new LeaveModels();
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
  Saveholiday() {
    console.log(this.workages)
    this.displayaddworkage = false;
    this.displayeditworkage = false;
    this.workages = new LeaveworkageModels();
  }
  onRowSelectList(event: any) {
    this.displayaddworkage = true
    this.displayeditworkage = true
    console.log(this.workages)
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
    this.leaves = new LeaveModels()
  }
  Save() {
    console.log(this.leaves)
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

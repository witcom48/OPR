import { DatePipe } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, MenuItem, MessageService } from 'primeng/api';
import { AppConfig } from 'src/app/config/config';
import { InitialCurrent } from 'src/app/config/initial_current';
import { LeaveModels } from 'src/app/models/attendance/leave';
import { LeaveworkageModels } from 'src/app/models/attendance/leave_workage';
import { LeaveServices } from 'src/app/services/attendance/leave.service';
import * as XLSX from 'xlsx';
declare var leave: any;
@Component({
  selector: 'app-leave',
  templateUrl: './leave.component.html',
  styleUrls: ['./leave.component.scss']
})
export class LeaveComponent implements OnInit {
  langs: any = leave;
  selectlang: string = "EN";
  constructor(private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private LeaveServices: LeaveServices,
    private datePipe: DatePipe,
    private router: Router,
  ) { }
  @ViewChild('TABLE') table: ElementRef | any = null;
  new_data: boolean = false
  edit_data: boolean = false
  fileToUpload: File | any = null;
  displayUpload: boolean = false;
  displayaddworkage: boolean = false;
  displayeditworkage: boolean = false;
  items: MenuItem[] = [];
  items_workage: MenuItem[] = [];
  leaves_list: LeaveModels[] = [];
  leaves: LeaveModels = new LeaveModels()
  workage_list: LeaveworkageModels[] = [];
  workages: LeaveworkageModels = new LeaveworkageModels()
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
    this.doLoadMenu();
    this.doLoadLeave();
  }
  doLoadLeave() {
    this.leaves_list = [];
    var tmp = new LeaveModels();
    this.LeaveServices.leave_get(tmp).then(async (res) => {
      await res.forEach((element: any) => {
        element.leave_day_accexpire = new Date(element.leave_day_accexpire)
        element.leave_incholiday = element.leave_incholiday == "Y" ? true : false;
        element.leave_passpro = element.leave_passpro == "Y" ? true : false;
        element.leave_deduct = element.leave_deduct == "Y" ? true : false;
        element.leave_caldiligence = element.leave_caldiligence == "Y" ? true : false;
        element.leave_agework = element.leave_agework == "Y" ? true : false;
      });
      this.leaves_list = await res;
    });
  }
  async doRecordLeave(data: LeaveModels) {
    await this.LeaveServices.leave_record(data).then((res) => {
      if (res.success) {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: res.message });
        this.doLoadLeave();
      }
      else {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: res.message });
      }

    });
    this.new_data = false;
    this.edit_data = false;
  }
  async doDeletedLeave(data: LeaveModels) {
    await this.LeaveServices.leave_delete(data).then((res) => {
      if (res.success) {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: res.message });
        this.doLoadLeave();
      }
      else {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: res.message });
      }

    });
    this.new_data = false;
    this.edit_data = false;
  }
  doUploadLeave() {
    const filename = "LEAVE_" + this.datePipe.transform(new Date(), 'yyyyMMddHHmm');
    const filetype = "xls";
    this.LeaveServices.leave_import(this.fileToUpload, filename, filetype).then((res) => {
      if (res.success) {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: res.message });
        this.doLoadLeave();
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
          this.leaves = new LeaveModels();
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
        label: this.langs.get('import')[this.selectlang],
        icon: 'pi-file-export',
        command: (event) => {
          this.exportAsExcel()

        }
      }
    ];

    this.items_workage = [
      {
        label: this.langs.get('new')[this.selectlang],
        icon: 'pi-plus',
        command: (event) => {
          this.workages = new LeaveworkageModels();
          this.displayaddworkage = true;
          this.displayeditworkage = false;
        }
      }
      //   ,
      //   {
      //     label: "Import",
      //     icon: 'pi-file-import',
      //     command: (event) => {
      //       // this.showUpload()

      //     }
      //   }
      //   ,
      //   {
      //     label: "Export",
      //     icon: 'pi-file-export',
      //     command: (event) => {
      //       // this.exportAsExcel()
      //       // this.exportAsExcelHolidaylist();

      //     }
      //   }
    ]
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
        message: this.langs.get('confirm_upload')[this.selectlang] + this.fileToUpload.name,
        header: this.langs.get('import')[this.selectlang],
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
    this.displayaddworkage = false;
    this.displayeditworkage = false;
    this.workages = new LeaveworkageModels();
    this.leaves = new LeaveModels()
  }
  Save() {
    // console.log(this.leaves)
    this.doRecordLeave(this.leaves)
  }
  Delete() {
    this.doDeletedLeave(this.leaves)
  }
  Saveworkages() {
    // console.log(this.workages)
    this.leaves.leave_workage = this.leaves.leave_workage.concat({
      company_code: this.initial_current.CompCode,
      leave_code: this.leaves.leave_code,
      workage_from: this.workages.workage_from,
      workage_to: this.workages.workage_to,
      workage_leaveday: this.workages.workage_leaveday,
    }
    )
    this.displayaddworkage = false;
    this.displayeditworkage = false;
    this.workages = new LeaveworkageModels();
  }
  Deleteworkages() {
    this.leaves.leave_workage = this.leaves.leave_workage.filter((item) => {
      return item !== this.workages;
    });
    this.displayaddworkage = false;
    this.displayeditworkage = false;
    this.workages = new LeaveworkageModels();
  }
  closedispaly() {
    this.displayaddworkage = false;
    this.displayeditworkage = false;
    this.workages = new LeaveworkageModels();
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

    XLSX.writeFile(wb, 'Export_YearPeriod.xlsx');

  }

}

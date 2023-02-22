import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ConfirmationService, MenuItem, MessageService } from 'primeng/api';
import { LeaveModels } from 'src/app/models/attendance/leave';
import { LeaveplanModels } from 'src/app/models/attendance/leave_plan';
import { LeaveworkageModels } from 'src/app/models/attendance/leave_workage';
import * as XLSX from 'xlsx';
@Component({
  selector: 'app-leave-plan',
  templateUrl: './leave-plan.component.html',
  styleUrls: ['./leave-plan.component.scss']
})
export class LeavePlanComponent implements OnInit {
  @ViewChild('TABLE') table: ElementRef | any = null;
  new_data: boolean = false
  edit_data: boolean = false
  fileToUpload: File | any = null;
  displayUpload: boolean = false;
  constructor(private messageService: MessageService,
    private confirmationService: ConfirmationService,) { }
  items: MenuItem[] = [];
  leaves_list: LeaveModels[] = [];
  leaveplan_list: LeaveplanModels[] = [];
  leaveplans: LeaveplanModels = new LeaveplanModels();

  ngOnInit(): void {
    this.doLoadMenu()
    this.leaveplan_list = [
      {
        company_code: "PSG",
        planleave_id: "1",
        planleave_code: "LV01",
        planleave_name_th: "นโยบายการลา",
        planleave_name_en: "Policy Leave",
        created_by: 'Admin',
        created_date: '2022-01-16',
        modied_by: 'admin',
        modied_date: '2022-01-17',
        flag: "0",
        leavelists: []
      }
    ]
  }

  handleFileInput(file: FileList) {
    this.fileToUpload = file.item(0);
  }
  getleavelist() {
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
        leave_incholiday: false,
        leave_passpro: true,
        leave_deduct: false,
        leave_caldiligence: false,
        leave_agework: false,
        leave_ahead: "7",
        leave_min_hrs: "00:00",
        leave_max_day: "0",
        created_by: 'Admin',
        created_date: '2022-01-16',
        modified_by: 'admin',
        modified_date: '2022-01-17',
        flag: false,
        leave_workage: [{
          company_code: "PSG",
          leave_code: "LB01",
          workage_from: "1.00",
          workage_to: "99.00",
          workage_leaveday: "14.00"
        }]
      }
    ]
  }

  doLoadMenu() {

    this.items = [
      {
        label: "New",
        icon: 'pi-plus',
        command: (event) => {
          this.leaveplans = new LeaveplanModels();
          this.getleavelist();
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
    this.leaveplans = new LeaveplanModels()
  }
  Save() {
    console.log(this.leaveplans)
  }
  onRowSelect(event: any) {
    this.getleavelist()
    this.leaveplan_list.includes
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

import { DatePipe } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, MenuItem, MessageService } from 'primeng/api';
import { async } from 'rxjs';
import { AppConfig } from 'src/app/config/config';
import { InitialCurrent } from 'src/app/config/initial_current';
import { LeaveModels } from 'src/app/models/attendance/leave';
import { LeaveplanModels } from 'src/app/models/attendance/leave_plan';
import { LeaveServices } from 'src/app/services/attendance/leave.service';
import { PlanleaveServices } from 'src/app/services/attendance/planleave.service';
import * as XLSX from 'xlsx';
declare var planleave: any;
@Component({
  selector: 'app-leave-plan',
  templateUrl: './leave-plan.component.html',
  styleUrls: ['./leave-plan.component.scss']
})
export class LeavePlanComponent implements OnInit {
  langs: any = planleave;
  selectlang: string = "EN";
  constructor(private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private leaveService: LeaveServices,
    private planleaveService: PlanleaveServices,
    private datePipe: DatePipe,
    private router: Router,
  ) { }
  @ViewChild('TABLE') table: ElementRef | any = null;
  new_data: boolean = false
  edit_data: boolean = false
  fileToUpload: File | any = null;
  displayUpload: boolean = false;
  items: MenuItem[] = [];
  leaves_list: LeaveModels[] = [];
  leaves_listselect: LeaveModels[] = [];
  leaveplan_list: LeaveplanModels[] = [];
  leaveplans: LeaveplanModels = new LeaveplanModels();
  public initial_current: InitialCurrent = new InitialCurrent();
  doGetInitialCurrent() {
    this.initial_current = JSON.parse(localStorage.getItem(AppConfig.SESSIONInitial) || '{}');
    if (!this.initial_current.Token) {
      this.router.navigateByUrl('login');
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
    this.leaveService.leave_get(tmp).then(async (res) => {
      this.leaves_list = await res;
      this.doLoadPlanleave();
    });
  }
  doLoadPlanleave() {
    this.leaveplan_list = [];
    var tmp = new LeaveplanModels();
    this.planleaveService.planleave_get(tmp).then(async (res) => {
      res.forEach((element: LeaveplanModels) => {
        element.leavelists.forEach(async (itme) => {
          let name = this.getnameList(itme.leave_code);
          itme.leave_name_en = `${name.en}`
          itme.leave_name_th = `${name.th}`
        })
      });
      this.leaveplan_list = await res;
    });
  }
  async doRecordPlanleave(data: LeaveplanModels) {
    await this.planleaveService.planleave_record(data).then((res) => {
      if (res.success) {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: res.message });
        this.doLoadPlanleave();
      }
      else {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: res.message });
      }

    });
    this.new_data = false;
    this.edit_data = false;
  }
  async doDeletePlanleave(data: LeaveplanModels) {
    await this.planleaveService.planleave_delete(data).then((res) => {
      if (res.success) {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: res.message });
        this.doLoadPlanleave()
      }
      else {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: res.message });
      }

    });
    this.new_data = false;
    this.edit_data = false;
  }
  doUploadPlanleave() {
    const filename = "PLANLEAVE_" + this.datePipe.transform(new Date(), 'yyyyMMddHHmm');
    const filetype = "xls";
    this.planleaveService.planleave_import(this.fileToUpload, filename, filetype).then((res) => {
      if (res.success) {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: res.message });
        this.doLoadPlanleave();
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
  getnameList(leave_codes: string) {
    let result = this.leaves_list.find((obj: LeaveModels) => {
      return obj.leave_code === leave_codes;
    })
    var res1 = result?.leave_name_th;
    var res2 = result?.leave_name_en;
    return { th: res1, en: res2 };
  }

  doLoadMenu() {

    this.items = [
      {
        label: this.langs.get('new')[this.selectlang],
        icon: 'pi-plus',
        command: (event) => {
          this.leaveplans = new LeaveplanModels();
          this.checkleavelist();
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
          // console.log(this.fileToUpload)
          this.displayUpload = false;
          this.doUploadPlanleave()
        },
        reject: () => {
          this.displayUpload = false;
        }
      });
    } else {
      this.messageService.add({ severity: 'warn', summary: 'File', detail: "Please choose a file." });
    }
  }
  checkleavelist() {
    this.leaves_listselect = []
    let code: string[] = [];
    this.leaveplans.leavelists.forEach((itme) => {
      code.push(itme.leave_code)
    })
    this.leaves_list.forEach((item) => {
      if (!code.includes(item.leave_code)) {
        this.leaves_listselect.push(item)
      }
    })
  }
  close() {
    this.new_data = false
    this.leaveplans = new LeaveplanModels()
  }
  Save() {
    // // console.log(this.leaveplans)
    this.doRecordPlanleave(this.leaveplans)
  }
  Delete() {
    // // console.log(this.leaveplans)
    this.doDeletePlanleave(this.leaveplans)
  }
  onRowSelect(event: any) {
    this.leaves_listselect = []
    this.checkleavelist();
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

    XLSX.writeFile(wb, 'Export_Planleave.xlsx');

  }

}

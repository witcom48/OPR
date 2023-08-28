import { DatePipe } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, MenuItem, MessageService } from 'primeng/api';
import { AppConfig } from 'src/app/config/config';
import { InitialCurrent } from 'src/app/config/initial_current';
import { PlanscheduleModels } from 'src/app/models/attendance/planschedule';
import { ShiftModels } from 'src/app/models/attendance/shift';
import { ShiftplanModels } from 'src/app/models/attendance/shift_plan';
import { AccessdataModel } from 'src/app/models/system/security/accessdata';
import { PlanshiftServices } from 'src/app/services/attendance/planshift.service';
import { ShiftServices } from 'src/app/services/attendance/shift.service';
import * as XLSX from 'xlsx';
declare var planshift: any;
@Component({
  selector: 'app-shift-plan',
  templateUrl: './shift-plan.component.html',
  styleUrls: ['./shift-plan.component.scss']
})
export class ShiftPlanComponent implements OnInit {
  langs: any = planshift;
  selectlang: string = "EN";
  constructor(private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private shiftService: ShiftServices,
    private planshiftService: PlanshiftServices,
    private datePipe: DatePipe,
    private router: Router,
  ) { }
  @ViewChild('TABLE') table: ElementRef | any = null;
  @ViewChild('TABLELIST') tablelist: ElementRef | any = null;
  itemslike: MenuItem[] = [];
  home: any;
  ShiftList: ShiftModels[] = [];
  selectedshift!: ShiftModels;
  new_data: boolean = false
  edit_data: boolean = false
  displayUpload: boolean = false;
  displayaddholiday: boolean = false;
  displayeditholiday: boolean = false;
  fileToUpload: File | any = null;
  items: MenuItem[] = [];
  items_holiday: MenuItem[] = [];
  shiftplan_lists: ShiftplanModels[] = [];
  shiftplan_listselect: ShiftplanModels = new ShiftplanModels();
  planschedule_list: PlanscheduleModels[] = []
  planschedule_listselect: PlanscheduleModels = new PlanscheduleModels()
  shiftplans: ShiftplanModels = new ShiftplanModels()

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
    this.doGetInitialCurrent();
    this.doLoadMenu();
    this.doLoadShift();
    this.doLoadPlanshift();
  }
  doLoadShift() {
    this.ShiftList = [];
    var tmp = new ShiftModels();
    this.shiftService.shift_get(tmp).then(async (res) => {
      this.ShiftList = await res;
    });
  }
  doLoadPlanshift() {
    this.shiftplan_lists = [];
    var tmp = new ShiftplanModels();
    this.planshiftService.planshift_get(tmp).then(async (res) => {
      await res.forEach(async (element: ShiftplanModels) => {
        await element.planschedule.forEach((elm: any) => {
          elm.planschedule_fromdate = new Date(elm.planschedule_fromdate);
          elm.planschedule_todate = new Date(elm.planschedule_todate);
          elm.planschedule_sun_off = elm.planschedule_sun_off == "N" ? true : false;
          elm.planschedule_mon_off = elm.planschedule_mon_off == "N" ? true : false;
          elm.planschedule_tue_off = elm.planschedule_tue_off == "N" ? true : false;
          elm.planschedule_wed_off = elm.planschedule_wed_off == "N" ? true : false;
          elm.planschedule_thu_off = elm.planschedule_thu_off == "N" ? true : false;
          elm.planschedule_fri_off = elm.planschedule_fri_off == "N" ? true : false;
          elm.planschedule_sat_off = elm.planschedule_sat_off == "N" ? true : false;
        });
      });
      this.shiftplan_lists = await res;
    });
  }
  async doRecorddPlanshift(data: ShiftplanModels) {
    await this.planshiftService.planshift_record(data).then((res) => {
      if (res.success) {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: res.message });
        this.doLoadPlanshift()
      }
      else {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: res.message });
      }

    });
    this.new_data = false;
    this.edit_data = false;
  }
  async doDeletedPlanshift(data: ShiftplanModels) {
    await this.planshiftService.planshift_delete(data).then((res) => {
      if (res.success) {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: res.message });
        this.doLoadPlanshift()
      }
      else {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: res.message });
      }

    });
    this.new_data = false;
    this.edit_data = false;
  }
  doUploadPlanshift() {
    const filename = "PLANSHIFT_" + this.datePipe.transform(new Date(), 'yyyyMMddHHmm');
    const filetype = "xls";
    this.planshiftService.planshift_import(this.fileToUpload, filename, filetype).then((res) => {
      if (res.success) {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: res.message });
        this.doLoadPlanshift();
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
    this.itemslike = [{ label: 'Attendance', routerLink: '/attendance/policy' }, {
      label: this.langs.get('shiftplan')[this.selectlang], styleClass: 'activelike'
    }];

    this.home = { icon: 'pi pi-home', routerLink: '/' };
    this.items = [
      {
        label: this.langs.get('new')[this.selectlang],
        icon: 'pi-plus',
        command: (event) => {
          if (this.accessData.accessdata_new) {
            this.shiftplans = new ShiftplanModels();
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
          window.open('assets/OPRFileImport/(OPR)Import Attendance/(OPR)Import Planshift.xlsx', '_blank');
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
    this.items_holiday = [
      {
        label: this.langs.get('new')[this.selectlang],
        icon: 'pi-plus',
        command: (event) => {
          this.shiftplan_listselect = new ShiftplanModels();
          this.displayaddholiday = true;
          this.displayeditholiday = false;
        }
      }
    ]
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
          this.displayUpload = false;
          this.doUploadPlanshift()
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
    this.displayaddholiday = false;
    this.displayeditholiday = false;
    this.shiftplans = new ShiftplanModels();
    this.shiftplan_listselect = new ShiftplanModels();
    this.planschedule_listselect = new PlanscheduleModels();
  }
  Save() {
    this.doRecorddPlanshift(this.shiftplans)
  }
  Delete() {
    this.confirmationService.confirm({
      message: this.langs.get('confirm_delete')[this.selectlang],
      header: this.langs.get('delete')[this.selectlang],
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.doDeletedPlanshift(this.shiftplans)
      },
      reject: () => {
        // this.close();
      }
    });
  }
  Saveplanschedule() {
    if (!this.displayeditholiday) {
      this.shiftplans.planschedule = this.shiftplans.planschedule.concat({
        company_code: this.shiftplans.company_code,
        planshift_code: this.shiftplans.planshift_code,
        planschedule_fromdate: this.planschedule_listselect.planschedule_fromdate,
        planschedule_todate: this.planschedule_listselect.planschedule_todate,
        shift_code: this.selectedshift.shift_code,
        planschedule_sun_off: this.planschedule_listselect.planschedule_sun_off,
        planschedule_mon_off: this.planschedule_listselect.planschedule_mon_off,
        planschedule_tue_off: this.planschedule_listselect.planschedule_tue_off,
        planschedule_wed_off: this.planschedule_listselect.planschedule_wed_off,
        planschedule_thu_off: this.planschedule_listselect.planschedule_thu_off,
        planschedule_fri_off: this.planschedule_listselect.planschedule_fri_off,
        planschedule_sat_off: this.planschedule_listselect.planschedule_sat_off,
        modified_by: this.initial_current.Username,
        flag: false,
      })
    }
    this.displayaddholiday = false;
    this.displayeditholiday = false;
    this.planschedule_listselect = new PlanscheduleModels();
  }

  Deleteplanschedule() {
    this.shiftplans.planschedule = this.shiftplans.planschedule.filter((item) => {
      return item !== this.planschedule_listselect;
    });
    this.displayaddholiday = false;
    this.displayeditholiday = false;
    this.planschedule_listselect = new PlanscheduleModels();
  }
  closedispaly() {
    this.displayaddholiday = false;
    this.displayeditholiday = false;
    this.planschedule_listselect = new PlanscheduleModels();
  }
  onRowSelectList(event: any) {
    this.displayaddholiday = true
    this.displayeditholiday = true
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

    XLSX.writeFile(wb, 'Export_Planshift.xlsx');

  }
}

import { DatePipe } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, MenuItem, MessageService } from 'primeng/api';
import { AppConfig } from 'src/app/config/config';
import { InitialCurrent } from 'src/app/config/initial_current';
import { OvertimeModels } from 'src/app/models/attendance/overtime';
import { OvertimerateModels } from 'src/app/models/attendance/overtime_rate';
import { AccessdataModel } from 'src/app/models/system/security/accessdata';
import { OTServices } from 'src/app/services/attendance/rateot.service';
import * as XLSX from 'xlsx';
declare var rateot: any;

interface Typeday {
  name: string,
  code: string
}
@Component({
  selector: 'app-overtime',
  templateUrl: './overtime.component.html',
  styleUrls: ['./overtime.component.scss']
})
export class OvertimeComponent implements OnInit {
  langs: any = rateot;
  selectlang: string = "EN";
  constructor(private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private OtService: OTServices,
    private datePipe: DatePipe,
    private router: Router,
  ) { }
  @ViewChild('importFile') importFile: any
  @ViewChild('TABLE') table: ElementRef | any = null;
  itemslike: MenuItem[] = [];
  home: any;
  daytype: Typeday[] = [];
  select_daytype!: Typeday;
  new_data: boolean = false
  edit_data: boolean = false
  fileToUpload: File | any = null;
  displayUpload: boolean = false;
  displayaddrate: boolean = false
  displayeditrate: boolean = false
  items: MenuItem[] = [];
  itemsrate: MenuItem[] = [];
  overtime_list: OvertimeModels[] = []
  overtimes: OvertimeModels = new OvertimeModels()
  rate: OvertimerateModels = new OvertimerateModels()
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
    this.doLoadMenu()
    this.doLoadOt();
    this.daytype = [
      {
        name: this.langs.get('offday')[this.selectlang],
        code: "O"
      },
      {
        name: this.langs.get('holiday')[this.selectlang],
        code: "H"
      },
      {
        name: this.langs.get('companyday')[this.selectlang],
        code: "C"
      },
      {
        name: this.langs.get('normalday')[this.selectlang],
        code: "N"
      },
    ]
  }
  doLoadOt() {
    this.initial_current.loading = true;
    this.overtime_list = [];
    var tmp = new OvertimeModels();
    this.OtService.ot_get(tmp).then(async (res) => {
      this.overtime_list = await res;
      this.initial_current.loading = false;
    });
  }
  async doRecordOt(data: OvertimeModels) {
    this.initial_current.loading = true;
    await this.OtService.ot_record(data).then((res) => {
      if (res.success) {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: res.message });
        this.doLoadOt()
      }
      else {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: res.message });
      }
      this.initial_current.loading = false;
    });
    this.new_data = false;
    this.edit_data = false;
  }

  async doDeleteOt(data: OvertimeModels) {
    this.initial_current.loading = true;
    await this.OtService.ot_delete(data).then((res) => {
      if (res.success) {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: res.message });
        this.doLoadOt()
      }
      else {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: res.message });
      }
      this.initial_current.loading = false;
    });
    this.new_data = false;
    this.edit_data = false;
  }
  doUploadOt() {
    this.initial_current.loading = true;
    const filename = "RATEOT_" + this.datePipe.transform(new Date(), 'yyyyMMddHHmm');
    const filetype = "xls";
    this.OtService.ot_import(this.fileToUpload, filename, filetype).then((res) => {
      if (res.success) {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: res.message });
        this.doLoadOt();
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

  selectdaytype(event: any) {
    this.rate.rateot_daytype = event.value.code;
  }
  selectedFileName: string = '';
  handleFileInput(file: FileList) {
    this.fileToUpload = file.item(0);
    if (this.fileToUpload) {
      this.selectedFileName = this.fileToUpload.name;
    } else {
      this.selectedFileName = this.langs.get('nofilechosen')[this.selectlang];
    }
   }
  closedupload() {
    this.importFile.nativeElement.value = null
    this.fileToUpload = null;
  }

  onRowSelectList(event: any) {
    this.select_daytype = { name: this.daytype.filter((e) => e.code == this.rate.rateot_daytype)[0].name, code: this.rate.rateot_daytype }
    this.displayaddrate = true
    this.displayeditrate = true
  }
  doLoadMenu() {
    this.itemslike = [{  label: this.langs.get('title')[this.selectlang], routerLink: '/attendance/policy' }, {
      label: this.langs.get('overtime')[this.selectlang], styleClass: 'activelike'
    }];

    this.home = { icon: 'pi pi-home', routerLink: '/' };
    this.items = [
      {
        label: this.langs.get('new')[this.selectlang],
        icon: 'pi-plus',
        command: (event) => {
          if (this.accessData.accessdata_new) {
            this.overtimes = new OvertimeModels();
            this.new_data = true;
            this.edit_data = false;
          } else {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Permission denied' });
          }
        }
      }
      ,
      {
        label: this.langs.get('template')[this.selectlang],
        icon: 'pi-download',
        command: (event) => {
          window.open('assets/OPRFileImport/(OPR)Import Attendance/(OPR)Import ReateOT.xlsx', '_blank');
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
    this.itemsrate = [
      {
        label: this.langs.get('new')[this.selectlang],
        icon: 'pi-plus',
        command: (event) => {
          this.rate = new OvertimerateModels();
          this.rate.rateot_daytype = this.daytype[0].code;
          this.displayaddrate = true;
          this.displayeditrate = false;
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
          this.doLoadOt()
        },
        reject: () => {
          this.displayUpload = false;
        }
      });
    } else {
      this.messageService.add({ severity: 'warn', summary: 'File', detail: "Please choose a file." });
    }
  }
  closedispaly() {
    this.displayaddrate = false;
    this.rate = new OvertimerateModels()
  }
  close() {
    this.closedispaly();
    this.new_data = false
    this.rate = new OvertimerateModels()
    this.overtimes = new OvertimeModels()
  }
  Save() {
    this.doRecordOt(this.overtimes)
  }
  Delete() {
    this.confirmationService.confirm({
      message: this.langs.get('confirm_delete')[this.selectlang],
      header: this.langs.get('delete')[this.selectlang],
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.doDeleteOt(this.overtimes)
      },
      reject: () => {
      }
    });
  }
  Saverate() {
    if (!this.displayeditrate) {
      this.overtimes.rateot_data = this.overtimes.rateot_data.concat({
        company_code: this.initial_current.CompCode,
        rateot_code: this.overtimes.rateot_code,
        rateot_daytype: this.rate.rateot_daytype,
        rateot_before: this.rate.rateot_before,
        rateot_normal: this.rate.rateot_normal,
        rateot_break: this.rate.rateot_break,
        rateot_after: this.rate.rateot_after
      })
    }
    this.displayaddrate = false;
    this.displayeditrate = false;
    this.rate = new OvertimerateModels();
  }
  Deleterate() {

    this.overtimes.rateot_data = this.overtimes.rateot_data.filter((item) => {
      return item !== this.rate;
    });
    this.displayaddrate = false;
    this.displayeditrate = false;
    this.rate = new OvertimerateModels();
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

    XLSX.writeFile(wb, 'Export_RateOt.xlsx');

  }
}

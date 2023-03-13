import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ConfirmationService, MenuItem, MessageService } from 'primeng/api';
import { TimePeriodModels } from 'src/app/models/attendance/timeperiod';
import { PeriodServices } from 'src/app/services/attendance/period.service';
import { PrimeNGConfig } from 'primeng/api';
import * as XLSX from 'xlsx';
import { InitialCurrent } from 'src/app/config/initial_current';
import { AppConfig } from 'src/app/config/config';
import { Router } from '@angular/router';
import { YearPeriodModels } from 'src/app/models/attendance/yearperiod';
import { DatePipe } from '@angular/common';
import { YearService } from 'src/app/services/system/policy/year.service';
declare var timeperiod: any;
declare var langcalendarth: any;
declare var langcalendaren: any;
interface Year {
  name: string,
  code: string
}
@Component({
  selector: 'app-timeperiod',
  templateUrl: './timeperiod.component.html',
  styleUrls: ['./timeperiod.component.scss']
})
export class TimeperiodComponent implements OnInit {
  langs: any = timeperiod;
  selectlang: string = "EN";
  constructor(private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private periodService: PeriodServices,
    private yearServices: YearService,
    private config: PrimeNGConfig,
    private router: Router,
    private datePipe: DatePipe,) { }
  @ViewChild('TABLE') table: ElementRef | any = null;
  yaerList: Year[] = [];
  selectedyear!: Year;
  emptype: string = "M"
  new_data: boolean = false
  edit_data: boolean = false
  fileToUpload: File | any = null;
  displayUpload: boolean = false;
  items: MenuItem[] = [];
  timeperiods_list: TimePeriodModels[] = [];
  timeperiods: TimePeriodModels = new TimePeriodModels()
  public initial_current: InitialCurrent = new InitialCurrent();
  doGetInitialCurrent() {
    this.initial_current = JSON.parse(localStorage.getItem(AppConfig.SESSIONInitial) || '{}');
    if (!this.initial_current.Token) {
      this.router.navigateByUrl('');
    }
    this.selectlang = this.initial_current.Language;
    if (this.initial_current.Language == "TH") {
      this.config.setTranslation(langcalendarth)
    } else {
      this.config.setTranslation(langcalendaren)
    }
  }
  ngOnInit(): void {
    this.doGetInitialCurrent();
    this.doLoadYear();
    this.doLoadMenu();
  }
  doLoadYear() {
    this.yaerList = [];
    var tmp = new YearPeriodModels();
    tmp.year_group = "TAX"
    this.yearServices.year_get(tmp).then(async (res) => {
      await res.forEach((element: YearPeriodModels) => {
        this.yaerList.push({ name: (this.selectlang == "EN" ? element.year_name_en : element.year_name_th) + " " + element.year_code, code: element.year_code })
      });
      await this.doLoadPeriod();
    });

  }
  async doLoadPeriod() {
    this.new_data = false;
    this.edit_data = false;
    this.timeperiods_list = [];
    this.timeperiods = new TimePeriodModels();
    var tmp = new TimePeriodModels();
    tmp.emptype_code = this.emptype
    if (this.selectedyear) {
      tmp.year_code = this.selectedyear.code || "";
    } else {
      tmp.year_code = this.yaerList[0].code
      this.selectedyear = this.yaerList[0]
    }
    await this.periodService.period_get(tmp).then(async (res) => {
      await res.forEach((element: TimePeriodModels) => {
        element.period_from = new Date(element.period_from)
        element.period_to = new Date(element.period_to)
        element.period_payment = new Date(element.period_payment)
      });
      this.timeperiods_list = await res;
    });
  }
  async doRecordPeriod(data: TimePeriodModels) {
    await this.periodService.period_record(data).then((res) => {
      if (res.success) {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: res.message });
        this.doLoadPeriod()
      }
      else {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: res.message });
      }

    });
    this.new_data = false;
    this.edit_data = false;
  }
  async doDeleteYear(data: TimePeriodModels) {
    await this.periodService.period_delete(data).then((res) => {
      if (res.success) {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: res.message });
        this.doLoadPeriod()
      }
      else {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: res.message });
      }

    });
    this.new_data = false;
    this.edit_data = false;
  }

  doUploadPeriod() {
    const filename = "PERIOD_" + this.datePipe.transform(new Date(), 'yyyyMMddHHmm');
    const filetype = "xls";
    this.periodService.period_import(this.fileToUpload, filename, filetype).then((res) => {
      console.log(res)
      if (res.success) {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: res.message });
        this.doLoadPeriod();
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
          this.timeperiods = new TimePeriodModels();
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
        message: this.langs.get('confirm_upload')[this.selectlang] + this.fileToUpload.name,
        header: this.langs.get('import')[this.selectlang],
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
          this.displayUpload = false;
          this.doUploadPeriod()
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
    this.timeperiods = new TimePeriodModels()
  }
  Save() {
    this.timeperiods.emptype_code = this.emptype;
    this.timeperiods.year_code = this.selectedyear.code;
    this.doRecordPeriod(this.timeperiods)
  }
  Delete() {
    this.doDeleteYear(this.timeperiods)
  }
  selectYear() {
    this.doLoadPeriod()
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

    XLSX.writeFile(wb, 'Export_Period.xlsx');

  }

}

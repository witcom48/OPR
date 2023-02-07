import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ConfirmationService, MenuItem, MessageService } from 'primeng/api';
import { TimePeriodModels } from 'src/app/models/attendance/timeperiod';
import { PeriodServices } from 'src/app/services/attendance/period.service';
import { PrimeNGConfig } from 'primeng/api';
import * as XLSX from 'xlsx';
import { InitialCurrent } from 'src/app/config/initial_current';
import { AppConfig } from 'src/app/config/config';
import { Router } from '@angular/router';
declare var timeperiod: any;
declare var langcalendarth: any;
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
    private config: PrimeNGConfig,
    private router: Router,) { }
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
    if (!this.initial_current) {
      this.router.navigateByUrl('');
    }
    this.selectlang = this.initial_current.Language;
    if (this.initial_current.Language == "TH") {
      this.config.setTranslation(langcalendarth)
    }
  }
  ngOnInit(): void {
    this.doGetInitialCurrent();
    this.doLoadMenu()
    this.yaerList = [
      { name: 'Tax Calendar 2022', code: '2022' },
      { name: 'Tax Calendar 2023', code: '2023' },
    ];
    this.doLoadPeriod()
  }

  doLoadPeriod() {
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
    }
    this.periodService.period_get(tmp).then(async (res) => {
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
      console.log(res)
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
      console.log(res)
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
    this.timeperiods = new TimePeriodModels()
  }
  Save() {
    this.timeperiods.emptype_code = this.emptype;
    this.timeperiods.year_code = this.selectedyear.code;
    console.log(this.timeperiods)
    this.doRecordPeriod(this.timeperiods)
  }
  Delete() {
    this.doDeleteYear(this.timeperiods)
  }
  selectYear() {
    console.log(this.emptype)
    console.log(this.selectedyear)
    this.doLoadPeriod()
  }
  onRowSelect(event: any) {
    this.new_data = true
    this.edit_data = true;
    console.log(this.timeperiods)
  }
  exportAsExcel() {

    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(this.table.nativeElement);//converts a DOM TABLE element to a worksheet
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    XLSX.writeFile(wb, 'Export_Period.xlsx');

  }

}

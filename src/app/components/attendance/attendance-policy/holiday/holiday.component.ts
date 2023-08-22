import { DatePipe } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, MenuItem, MessageService } from 'primeng/api';
import { AppConfig } from 'src/app/config/config';
import { InitialCurrent } from 'src/app/config/initial_current';
import { HolidayModels } from 'src/app/models/attendance/holiday';
import { Holiday_listModels } from 'src/app/models/attendance/holiday_list';
import { YearPeriodModels } from 'src/app/models/attendance/yearperiod';
import { AccessdataModel } from 'src/app/models/system/security/accessdata';
import { PlanholidayServices } from 'src/app/services/attendance/planholiday.service';
import { YearService } from 'src/app/services/system/policy/year.service';
import * as XLSX from 'xlsx';
interface Year {
  name: string,
  code: string
}
declare var planholiday: any;
@Component({
  selector: 'app-holiday',
  templateUrl: './holiday.component.html',
  styleUrls: ['./holiday.component.scss']
})
export class HolidayComponent implements OnInit {
  langs: any = planholiday;
  selectlang: string = "EN";
  constructor(private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private planholidayService: PlanholidayServices,
    private yearServices: YearService,
    private datePipe: DatePipe,
    private router: Router,
  ) { }
  @ViewChild('TABLE') table: ElementRef | any = null;
  @ViewChild('TABLELIST') tablelist: ElementRef | any = null;
  itemslike: MenuItem[] = [];
  home: any;
  yaerList: Year[] = [];
  selectedyear!: Year;
  new_data: boolean = false
  edit_data: boolean = false
  displayUpload: boolean = false;
  displayUploadholidaylist: boolean = false;
  displayaddholiday: boolean = false;
  displayeditholiday: boolean = false;
  fileToUpload: File | any = null;
  items: MenuItem[] = [];
  items_holiday: MenuItem[] = [];
  holiday_lists: HolidayModels[] = [];
  holiday_listselect: Holiday_listModels = new Holiday_listModels();
  holidays: HolidayModels = new HolidayModels()
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
    this.doLoadMenu()
    this.doLoadYear();
  }
  doLoadYear() {
    this.yaerList = [];
    var tmp = new YearPeriodModels();
    tmp.year_group = "LEAVE"
    this.yearServices.year_get(tmp).then(async (res) => {
      await res.forEach((element: YearPeriodModels) => {
        this.yaerList.push({ name: (this.selectlang == "EN" ? element.year_name_en : element.year_name_th) + " " + element.year_code, code: element.year_code })
      });
      await this.doLoadPlanholiday();
    });

  }

  doLoadPlanholiday() {
    this.holiday_lists = [];
    var tmp = new HolidayModels();
    if (this.selectedyear) {
      tmp.year_code = this.selectedyear.code || "";
    } else {
      tmp.year_code = this.yaerList[0].code
      this.selectedyear = this.yaerList[0]
    }
    this.planholidayService.planholiday_get(tmp).then(async (res) => {
      await res.forEach((element: HolidayModels) => {
        element.holiday_list.forEach((elm: Holiday_listModels) => {
          elm.holiday_date = new Date(elm.holiday_date)
          elm.holiday_payper = Number(elm.holiday_payper)
        })
      });
      this.holiday_lists = await res;
    });
  }

  async doRecordPlanholiday(data: HolidayModels) {
    data.year_code = this.selectedyear.code;
    await this.planholidayService.planholiday_record(data).then((res) => {
      if (res.success) {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: res.message });
        this.doLoadPlanholiday()
      }
      else {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: res.message });
      }

    });
    this.new_data = false;
    this.edit_data = false;
  }
  async doDeletePlanholiday(data: HolidayModels) {
    await this.planholidayService.planholiday_delete(data).then((res) => {
      if (res.success) {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: res.message });
        this.doLoadPlanholiday()
      }
      else {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: res.message });
      }

    });
    this.new_data = false;
    this.edit_data = false;
  }
  doUploadPlanholiday() {
    const filename = "PLANHOLIDAY_" + this.datePipe.transform(new Date(), 'yyyyMMddHHmm');
    const filetype = "xls";
    this.planholidayService.planholiday_import(this.fileToUpload, filename, filetype).then((res) => {
      // console.log(res)
      if (res.success) {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: res.message });
        this.doLoadPlanholiday();
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
  handleFileInputholidaylist(file: FileList) {
    this.readExcel(file.item(0))
    this.displayaddholiday = false;
    this.displayeditholiday = false;
    this.displayUploadholidaylist = false;
  }

  readExcel = async (file: any) => {
    const fileReader = await new FileReader()
    fileReader.readAsArrayBuffer(file)

    fileReader.onload = (e: any) => {
      const bufferArray = e?.target.result
      const wb = XLSX.read(bufferArray, { type: "buffer" })
      const wsname = wb.SheetNames[0]
      const ws = wb.Sheets[wsname]

      const data = XLSX.utils.sheet_to_json(ws)
      data.forEach((e: any) => {
        let date = e.holiday_date.split("/");
        this.holidays.holiday_list = this.holidays.holiday_list.concat({
          company_code: this.holidays.company_code,
          holiday_date: new Date(date[2], date[1] - 1, date[0]),
          holiday_name_th: e.holiday_name_th,
          holiday_name_en: e.holiday_name_en,
          planholiday_code: this.holidays.planholiday_code,
          holiday_daytype: e.holiday_daytype,
          holiday_payper: e.holiday_payper,
        })

      })
      this.holiday_listselect = new Holiday_listModels();
    }
  }
  doLoadMenu() {
    this.itemslike = [{ label: 'Attendance', routerLink: '/attendance/policy' }, {
      label: this.langs.get('playholiday')[this.selectlang], styleClass: 'activelike'
    }];

    this.home = { icon: 'pi pi-home', routerLink: '/' };
    this.items = [
      {
        label: this.langs.get('new')[this.selectlang],
        icon: 'pi-plus',
        command: (event) => {
          if (this.accessData.accessdata_new) {
            this.holidays = new HolidayModels();
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
          window.open('assets/OPRFileImport/(OPR)Import Attendance/(OPR)Import Planholiday.xlsx', '_blank');
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
          this.holiday_listselect = new Holiday_listModels();
          this.displayaddholiday = true;
          this.displayeditholiday = false;
        }
      }
      ,
      {
        label: this.langs.get('import')[this.selectlang],
        icon: 'pi-file-import',
        command: (event) => {
          // this.showUpload()
          this.displayUploadholidaylist = !this.displayUploadholidaylist;
          this.displayaddholiday = false;
          this.displayeditholiday = false;

        }
      }
      ,
      {
        label: this.langs.get('export')[this.selectlang],
        icon: 'pi-file-export',
        command: (event) => {
          // this.exportAsExcel()
          this.exportAsExcelHolidaylist();

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
          this.doUploadPlanholiday();
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
    this.new_data = false;
    this.displayaddholiday = false;
    this.holidays = new HolidayModels()
    this.holiday_listselect = new Holiday_listModels();
  }
  onRowSelect(event: any) {
    this.new_data = true
    this.edit_data = true;
  }
  Save() {
    this.doRecordPlanholiday(this.holidays)
    this.new_data = false;
    this.edit_data = false;
  }
  Delete() {
    this.confirmationService.confirm({
      message: this.langs.get('confirm_delete')[this.selectlang],
      header: this.langs.get('delete')[this.selectlang],
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.doDeletePlanholiday(this.holidays)
      },
      reject: () => {
        // this.close();
      }
    });
  }
  Saveholiday() {
    if (!this.displayeditholiday) {
      this.holidays.holiday_list = this.holidays.holiday_list.concat({
        company_code: this.holidays.company_code,
        holiday_date: this.holiday_listselect.holiday_date,
        holiday_name_th: this.holiday_listselect.holiday_name_th,
        holiday_name_en: this.holiday_listselect.holiday_name_en,
        planholiday_code: this.holidays.planholiday_code,
        holiday_daytype: this.holiday_listselect.holiday_daytype,
        holiday_payper: this.holiday_listselect.holiday_payper,
      })
    }
    this.holiday_listselect = new Holiday_listModels();
    this.displayaddholiday = false;
    this.displayeditholiday = false;
  }
  Deleteholiday() {
    this.holidays.holiday_list = this.holidays.holiday_list.filter((item) => {
      return item !== this.holiday_listselect;
    });
    this.holiday_listselect = new Holiday_listModels();
    this.displayaddholiday = false;
    this.displayeditholiday = false;
  }
  closedispaly() {
    this.holiday_listselect = new Holiday_listModels();
  }
  onRowSelectList(event: any) {
    this.displayaddholiday = true
    this.displayeditholiday = true
  }
  selectYear() {
    // console.log(this.selectedyear)
    this.doLoadPlanholiday();
  }
  exportAsExcel() {

    // const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(this.table.nativeElement);//converts a DOM TABLE element to a worksheet
    // for (var i in ws) {
    //   if (i.startsWith("!") || i.charAt(1) !== "1") {
    //     continue;
    //   }
    //   var n = 0;
    //   for (var j in ws) {
    //     if (j.startsWith(i.charAt(0)) && j.charAt(1) !== "1" && ws[i].v !== "") {
    //       ws[j].v = ws[j].v.replace(ws[i].v, "")
    //     } else {
    //       n += 1;
    //     }

    //   }
    // }
    // const wb: XLSX.WorkBook = XLSX.utils.book_new();
    // XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    // XLSX.writeFile(wb, 'Export_Planholiday.xlsx');

    const XLSX = require('xlsx')

    // array of objects to save in Excel
    let binary_univers = this.holiday_lists;
    let binaryWS = XLSX.utils.json_to_sheet(binary_univers);

    // Create a new Workbook
    var wb = XLSX.utils.book_new()

    // Name your sheet
    // XLSX.utils.book_append_sheet(wb, binaryWS, 'Holiday');
    XLSX.utils.book_append_sheet(wb, binaryWS, 'Holiday');
    this.holiday_lists.forEach((obj: HolidayModels) => {
      XLSX.utils.book_append_sheet(wb, XLSX.utils.json_to_sheet(obj.holiday_list), obj.planholiday_code);
      // obj.holiday_list.forEach((element: Holiday_listModels) => {

      // });
    })
    // export your excel
    XLSX.writeFile(wb, 'Export_Planholiday.xlsx');

  }
  exportAsExcelHolidaylist() {

    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(this.tablelist.nativeElement);//converts a DOM TABLE element to a worksheet
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    XLSX.writeFile(wb, 'Export_HolidayList.xlsx');

  }
}

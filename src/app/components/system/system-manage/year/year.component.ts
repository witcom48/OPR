
import { DatePipe } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, MenuItem, MessageService, PrimeNGConfig } from 'primeng/api';
import { AppConfig } from 'src/app/config/config';
import { InitialCurrent } from 'src/app/config/initial_current';
import { YearPeriodModels } from 'src/app/models/system/policy/yearperiod';
import { AccessdataModel } from 'src/app/models/system/security/accessdata';
import { YearService } from 'src/app/services/system/policy/year.service';
import * as XLSX from 'xlsx';
declare var yearperiod: any;
declare var langcalendarth: any;
declare var langcalendaren: any;

declare var reason: any;
interface Type { name: string, code: string }

@Component({
  selector: 'app-year',
  templateUrl: './year.component.html',
  styleUrls: ['./year.component.scss']

})
export class YearComponent implements OnInit {
  langs: any = yearperiod;
  selectlang: string = "EN";
  constructor(private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private yearService: YearService,
    private datePipe: DatePipe,
    private config: PrimeNGConfig,
    private router: Router,
  ) { }
  @ViewChild('TABLE') table: ElementRef | any = null;
  new_data: boolean = false
  edit_data: boolean = false
  fileToUpload: File | any = null;
  displayUpload: boolean = false;
  items: MenuItem[] = [];
  itemsOptions: MenuItem[] = [];
  yearperiods_list: YearPeriodModels[] = [];
  yearperiods: YearPeriodModels = new YearPeriodModels()

  initialData2: InitialCurrent = new InitialCurrent();
  accessData: AccessdataModel = new AccessdataModel();
  public initial_current: InitialCurrent = new InitialCurrent();
  doGetInitialCurrent() {
    this.initial_current = JSON.parse(localStorage.getItem(AppConfig.SESSIONInitial) || '{}');
    if (!this.initial_current.Token) {
      this.router.navigateByUrl('login');
    }
    this.selectlang = this.initial_current.Language;
    if (this.initial_current.Language == "TH") {
      this.config.setTranslation(langcalendarth)
    } else {
      this.config.setTranslation(langcalendaren)
    }
    this.accessData = this.initialData2.dotGetPolmenu('SYS');

  }
  title_file: { [key: string]: string } = { EN: "File ", TH: "ไฟล์" }

  ngOnInit(): void {
    this.doGetInitialCurrent();
    this.doLoadYear()
    this.doLoadMenu()
  }
  reloadPage() {
    this.doLoadYear()
  }
  year_type: string = "TAX"
  doLoadYear() {
    this.yearperiods_list = [];
    var tmp = new YearPeriodModels();
    this.yearService.year_get(tmp).then(async (res) => {
      await Promise.all(res.map(async (element: { year_fromdate: string | number | Date; year_todate: string | number | Date; }) => {
        element.year_fromdate = new Date(element.year_fromdate);
        element.year_todate = new Date(element.year_todate);
        return element;
      }));
      // console.log(this.year_type);
      this.yearperiods_list = res;
    });
  }


  async doRecordYear(data: YearPeriodModels) {
    await this.yearService.year_record(data).then((res) => {
      // console.log(res)
      if (res.success) {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: res.message });
        this.doLoadYear()
        this.edit_data = false;
        this.new_data = false;
        this.displayManage = false
      }
      else {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: res.message });
      }

    });
    // this.new_data = false;
    // this.edit_data = false;
  }
  async doDeleteYear(data: YearPeriodModels) {
    await this.yearService.year_delete(data).then((res) => {
      // console.log(res)
      if (res.success) {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: res.message });
        this.doLoadYear()
        this.edit_data = false;
        this.new_data = false;
        this.displayManage = false;
      }
      else {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: res.message });
      }

    });
    // this.new_data = false;
    // this.edit_data = false;
  }
  doUploadYear() {
    const filename = "YEAR_" + this.datePipe.transform(new Date(), 'yyyyMMddHHmm');
    const filetype = "xls";
    this.yearService.year_import(this.fileToUpload, filename, filetype).then((res) => {
      // console.log(res)
      if (res.success) {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: res.message });
        this.doLoadYear();
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
  selectYeartype() {
    this.doLoadYear();
  }

  doLoadMenu() {

    this.items = [
      {
        label: this.langs.get('new')[this.selectlang],
        icon: 'pi-plus',
        command: (event) => {
          if (this.accessData.accessdata_new) {

            this.showManage()
            this.yearperiods = new YearPeriodModels();
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
          window.open('assets/OPRFileImport/(OPR)Import System/(OPR)Import System Year.xlsx', '_blank');
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

    this.itemsOptions = [{

      items: [

        {
          label: 'แก้ไข',
          icon: 'pi pi-fw pi-pencil',
          command: (event) => {
            this.showManage()
            this.edit_data = true;


          }
        }
        , {


          label: 'ลบ',
          icon: 'pi pi-trash',
          command: () => {
            if (this.accessData.accessdata_delete) {

              !this.accessData.accessdata_delete
              this.doDeleteYear(this.yearperiods)

            } else {
              this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Permission denied' });
            }
          }
        },
        {
          label: 'คัดลอก',
          icon: 'pi-copy',
          command: () => {
            if (this.accessData.accessdata_new) {
              this.showManage()
              this.new_data = true;
              this.edit_data = false;
            } else {
              this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Permission denied' });
            }
          }
        }
      ]
    },

    ];

  }
  selectRow(data: any) {
    this.yearperiods = data;
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
          this.doUploadYear()
        },
        key: "myDialog",
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
    this.yearperiods = new YearPeriodModels()
  }
  changeParentCount(val: string) {
    // console.log(val)
  }
  Save() {
    this.doRecordYear(this.yearperiods)
    // // console.log(this.yearperiods)
  }
  Delete() {
    this.doDeleteYear(this.yearperiods)
    // console.log(this.doDeleteYear)
  }
  onRowSelect(event: any) {
    this.year_type == this.yearperiods.year_group;
    this.new_data = true;
    this.edit_data = true;
    this.displayManage = true;

  }
  displayManage: boolean = false;
  position: string = "right";
  showManage() {
    this.displayManage = true;
  }


  exportAsExcel() {
    const fileToExport = this.yearperiods_list.map((items: any) => {
      return {
        "year_code": items?.year_code,
        "year_name_th": items?.year_name_th,
        "year_name_en": items?.year_name_en,
        "year_fromdate": items?.year_fromdate,
        "year_todate": items?.year_todate,
        "year_group": items?.year_group,

      }
    });

    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(fileToExport);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    XLSX.writeFile(wb, 'Export_YearPeriod.xlsx');

  }

  // exportAsExcel() {

  //   const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(this.table.nativeElement);//converts a DOM TABLE element to a worksheet
  //   for (var i in ws) {
  //     if (i.startsWith("!") || i.charAt(1) !== "1") {
  //       continue;
  //     }
  //     var n = 0;
  //     for (var j in ws) {
  //       if (j.startsWith(i.charAt(0)) && j.charAt(1) !== "1" && ws[i].v !== "") {
  //         ws[j].v = ws[j].v.replace(ws[i].v, "")
  //       } else {
  //         n += 1;
  //       }

  //     }
  //   }
  //   const wb: XLSX.WorkBook = XLSX.utils.book_new();
  //   XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

  //   XLSX.writeFile(wb, 'Export_YearPeriod.xlsx');

  // }

}

import { DatePipe } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, MenuItem, MessageService } from 'primeng/api';
import { AppConfig } from 'src/app/config/config';
import { InitialCurrent } from 'src/app/config/initial_current';
import { cls_MTPlantimeallw } from 'src/app/models/attendance/cls_MTPlantimeallw';
import { cls_TRTimeallw } from 'src/app/models/attendance/cls_TRTimeallw';
import { TimeAllowanceServices } from 'src/app/services/attendance/timeallowance.service';
import * as XLSX from 'xlsx';
declare var timeallowpage: any;
interface Type {
  name: string,
  code: string
}
@Component({
  selector: 'app-timeallowance',
  templateUrl: './timeallowance.component.html',
  styleUrls: ['./timeallowance.component.scss']
})
export class TimeallowanceComponent implements OnInit {
  langs: any = timeallowpage;
  selectlang: string = "EN";
  constructor(private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private datePipe: DatePipe,
    private timeallow: TimeAllowanceServices,
    private router: Router,
  ) { }
  @ViewChild('TABLE') table: ElementRef | any = null;
  new_data: boolean = false
  edit_data: boolean = false
  fileToUpload: File | any = null;
  displayUpload: boolean = false;
  displayaddtrallow: boolean = false;
  displayedittrallow: boolean = false;
  items: MenuItem[] = [];
  itemslate: MenuItem[] = [];
  allowance_list: cls_MTPlantimeallw[] = [];
  allowance: cls_MTPlantimeallw = new cls_MTPlantimeallw()
  tr_timeallw: cls_TRTimeallw = new cls_TRTimeallw()
  typetrallow: Type[] = [];
  selectedtype!: Type;
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
    this.doLoadPlanAllow();
    this.typetrallow = [
      {
        code: "1",
        name: this.selectlang == "TH" ? "เข้างานก่อน" : "Work before"
      }, {
        code: "2",
        name: this.selectlang == "TH" ? "เข้างานตั้งแต่" : "Work IN since"
      }, {
        code: "3",
        name: this.selectlang == "TH" ? "ออกงานตั้งแต่" : "Work OUT since"
      }, {
        code: "4",
        name: this.selectlang == "TH" ? "ช่วงเวลา" : "Work Time"
      },
    ]
    this.selectedtype = {
      code: "1",
      name: this.selectlang == "TH" ? "เข้างานก่อน" : "Work before"
    }
  }

  doLoadPlanAllow() {
    this.allowance_list = [];
    var tmp = new cls_MTPlantimeallw();
    this.timeallow.timeallow_get(tmp).then(async (res) => {
      res.forEach((item: any) => {
        item.plantimeallw_passpro = item.plantimeallw_passpro == "Y" ? true : false
        item.plantimeallw_lastperiod = item.plantimeallw_lastperiod == "Y" ? true : false
      });
      this.allowance_list = await res;
    });
  }
  async doRecordPlanAllow(data: cls_MTPlantimeallw) {
    await this.timeallow.timeallow_record(data).then((res) => {
      // console.log(res)
      if (res.success) {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: res.message });
        this.doLoadPlanAllow()
      }
      else {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: res.message });
      }

    });
    this.new_data = false;
    this.edit_data = false;
  }
  async doDeletePlanAllow(data: cls_MTPlantimeallw) {
    await this.timeallow.timeallow_delete(data).then((res) => {
      // console.log(res)
      if (res.success) {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: res.message });
        this.doLoadPlanAllow()
      }
      else {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: res.message });
      }

    });
    this.new_data = false;
    this.edit_data = false;
  }
  doUploadLate() {
    const filename = "ALLOWANCE_" + this.datePipe.transform(new Date(), 'yyyyMMddHHmm');
    const filetype = "xls";
    this.timeallow.timeallow_import(this.fileToUpload, filename, filetype).then((res) => {
      // console.log(res)
      if (res.success) {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: res.message });
        this.doLoadPlanAllow();
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
          this.allowance = new cls_MTPlantimeallw();
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
    this.itemslate = [
      {
        label: this.langs.get('new')[this.selectlang],
        icon: 'pi-plus',
        command: (event) => {
          this.tr_timeallw = new cls_TRTimeallw();
          this.displayaddtrallow = true;
          this.displayedittrallow = false;
          this.selectedtype = {
            code: "1",
            name: this.selectlang == "TH" ? "เข้างานก่อน" : "Work before"
          }
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
          this.doUploadLate();
        },
        reject: () => {
          this.displayUpload = false;
        }
      });
    } else {
      this.messageService.add({ severity: 'warn', summary: 'File', detail: "Please choose a file." });
    }
  }
  selecteddropdown() {
    // console.log(this.selectedtype)
    this.tr_timeallw.timeallw_type = this.selectedtype.code
  }
  selectedWH() {
    this.tr_timeallw.timeallw_type = 'A'
  }
  selectedWT() {
    this.tr_timeallw.timeallw_type = '1'
    this.selectedtype = {
      code: "1",
      name: this.selectlang == "TH" ? "เข้างานก่อน" : "Work before"
    }
  }
  doPrintCondition(timeallw: cls_TRTimeallw): string {
    var temp = timeallw.timeallw_timein;
    if (timeallw.timeallw_type === "4") {
      temp = timeallw.timeallw_timein + " - " + timeallw.timeallw_timeout;
    }
    if (timeallw.timeallw_type === "1" || timeallw.timeallw_type === "2" || timeallw.timeallw_type === "3") {
      temp = `${this.typetrallow.find((item: Type) => item.code == timeallw.timeallw_type)?.name} ` + timeallw.timeallw_timein;
    }
    return temp;
  }
  close() {
    this.new_data = false
    this.edit_data = false
    this.allowance = new cls_MTPlantimeallw()
    this.displayaddtrallow = false;
    this.displayedittrallow = false;
    this.tr_timeallw = new cls_TRTimeallw();
  }
  closedispaly() {
    this.displayaddtrallow = false;
    this.displayedittrallow = false;
    this.tr_timeallw = new cls_TRTimeallw();
  }
  Save() {
    // console.log(this.allowance)
    this.doRecordPlanAllow(this.allowance)
  }
  Savelate() {
    if (!this.displayedittrallow) {
      this.allowance.timeallw_data = this.allowance.timeallw_data.concat({
        company_code: this.initial_current.CompCode,
        timeallw_no: `${this.allowance.timeallw_data.length + 1}`,
        timeallw_time: this.tr_timeallw.timeallw_time,
        timeallw_type: this.tr_timeallw.timeallw_type,
        timeallw_method: this.tr_timeallw.timeallw_method,
        timeallw_timein: this.tr_timeallw.timeallw_timein,
        timeallw_timeout: this.tr_timeallw.timeallw_timeout,
        timeallw_normalday: this.tr_timeallw.timeallw_normalday,
        timeallw_offday: this.tr_timeallw.timeallw_offday,
        timeallw_companyday: this.tr_timeallw.timeallw_companyday,
        timeallw_holiday: this.tr_timeallw.timeallw_holiday,
        timeallw_leaveday: this.tr_timeallw.timeallw_leaveday,
        plantimeallw_code: this.allowance.plantimeallw_code
      })
    }
    this.displayaddtrallow = false;
    this.displayedittrallow = false;
    this.tr_timeallw = new cls_TRTimeallw();
  }
  Delete() {
    this.doDeletePlanAllow(this.allowance)
  }
  Deletelate() {
    this.allowance.timeallw_data = this.allowance.timeallw_data.filter((item) => {
      return item !== this.tr_timeallw;
    });
    this.displayaddtrallow = false;
    this.displayedittrallow = false;
    this.tr_timeallw = new cls_TRTimeallw();
  }
  onRowSelectList(event: any) {
    this.displayaddtrallow = true
    this.displayedittrallow = true
    this.selectedtype = { code: this.tr_timeallw.timeallw_type, name: this.typetrallow.find((item: Type) => item.code == this.tr_timeallw.timeallw_type)?.name || "" }
    // console.log(this.tr_timeallw)
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

    XLSX.writeFile(wb, 'Export_Late.xlsx');

  }

}

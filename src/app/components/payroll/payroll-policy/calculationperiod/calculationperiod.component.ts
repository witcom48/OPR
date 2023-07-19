import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ConfirmationService, MenuItem, MessageService } from 'primeng/api';
import { PrimeNGConfig } from 'primeng/api';
import * as XLSX from 'xlsx';
import { InitialCurrent } from 'src/app/config/initial_current';
import { AppConfig } from 'src/app/config/config';
import { Router } from '@angular/router';
import { YearPeriodModels } from 'src/app/models/attendance/yearperiod';
import { DatePipe } from '@angular/common';
import { YearService } from 'src/app/services/system/policy/year.service';
import { PeriodsServices } from 'src/app/services/payroll/periods.service';
import { PeriodsModels } from 'src/app/models/payroll/periods';
declare var timeperiod: any;
declare var langcalendarth: any;
declare var langcalendaren: any;
interface Year {
  name: string,
  code: string
}
@Component({
  selector: 'app-calculationperiod',
  templateUrl: './calculationperiod.component.html',
  styleUrls: ['./calculationperiod.component.scss']
})
export class CalculationperiodComponent implements OnInit {
    selectlang: string = "EN";
    constructor(private messageService: MessageService,
      private confirmationService: ConfirmationService,
      private periodsService: PeriodsServices,
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

    
    periods_list: PeriodsModels[] = [];
    selectedPeriods: PeriodsModels = new PeriodsModels()

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
    }
    title_payroll: string = 'Payroll';

    title_policy: string = 'Set Policy';
    title_page: string = 'Calculation Period';
    title_new: string = 'New';
    title_type: string = 'Type';
    title_no: string = 'No';

    
    title_monthly: string = 'Monthly';
    title_daily: string = 'Daily';
    title_date: string = 'Date';
    title_payment: string = 'Payment';
    title_fromdate: string = 'Fromdate';
    title_todate: string = 'Todate';
    title_day_pay: string = 'Days on Period';
    title_Drop: string = 'Drop files here';


    

    title_edit: string = 'Edit';
    title_delete: string = 'Delete';
    title_import: string = 'Import';
    title_export: string = 'Export';
    title_save: string = 'Save';
    title_code: string = 'Code';
    title_name_th: string = 'Name (Thai)';
    title_name_en: string = 'Name (Eng.)';
    title_detail_en: string = 'Description(Eng)';
    title_detail_th: string = 'Description(Thai)';
    title_modified_by: string = 'Edit by';
    title_modified_date: string = 'Edit date';
    title_search: string = 'Search';
    title_upload: string = 'Upload';

    title_page_from: string = 'Showing';
    title_page_to: string = 'to';
    title_page_total: string = 'of';
    title_page_record: string = 'entries';

    title_confirm: string = 'Are you sure?';
    title_confirm_record: string = 'Confirm to record';
    title_confirm_delete: string = 'Confirm to delete';
    title_confirm_yes: string = 'Yes';
    title_confirm_no: string = 'No';

    title_confirm_cancel: string = 'You have cancelled';

    doLoadLanguage() {
        if (this.initial_current.Language == 'TH') {
            this.title_payroll= 'บัญชี';
            this.title_policy = 'กำหนดนโยบาย';
            this.title_page = 'กำหนดงวด';
            this.title_new = 'เพิ่ม';
            this.title_type = 'ประเภท';

            this.title_monthly = 'เดือน';
            this.title_daily = 'วัน';
            this.title_date = 'วันที่จ่าย';
            this.title_payment = 'วันที่ชำระเงิน'
            this.title_fromdate = 'จากวันที่'
            this.title_todate= 'ถึงวันที่';
            this.title_day_pay = 'จำนวนวันตามงวด';
            this.title_Drop = 'วางไฟล์ที่นี้';
            this.title_no = 'อันดับ';



            this.title_edit = 'แก้ไข';
            this.title_delete = 'ลบ';
            this.title_import = 'นำเข้า';
            this.title_export = 'โอนออก';
            this.title_save = 'บันทึก';
            this.title_code = 'รหัส';
            this.title_name_th = 'ชื่อไทย';
            this.title_name_en = 'ชื่ออังกฤษ';
            this.title_detail_en = 'รายละเอียด อังกฤษ';
            this.title_detail_th = 'รายละเอียด ไทย';
            this.title_modified_by = 'ผู้ทำรายการ';
            this.title_modified_date = 'วันที่ทำรายการ';
            this.title_search = 'ค้นหา';
            this.title_upload = 'อัพโหลด';

            this.title_page_from = 'แสดง';
            this.title_page_to = 'ถึง';
            this.title_page_total = 'จาก';
            this.title_page_record = 'รายการ';

            this.title_confirm = 'ยืนยันการทำรายการ';
            this.title_confirm_record = 'คุณต้องการบันทึกการทำรายการ';
            this.title_confirm_delete = 'คุณต้องการลบรายการ';

            this.title_confirm_yes = 'ใช่';
            this.title_confirm_no = 'ยกเลิก';
            this.title_confirm_cancel = 'คุณยกเลิกการทำรายการ';
        }
    }


    ngOnInit(): void {
      this.doGetInitialCurrent();
      this.doLoadYear();
      this.doLoadMenu();
      this.doLoadLanguage();
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
      this.periods_list = [];
      this.selectedPeriods = new PeriodsModels();
      var tmp = new PeriodsModels();
      tmp.emptype_code = this.emptype
      if (this.selectedyear) {
        tmp.year_code = this.selectedyear.code || "";
      } else {
        tmp.year_code = this.yaerList[0].code
        this.selectedyear = this.yaerList[0]
      }
      await this.periodsService.period_get(tmp).then(async (res) => {
        await res.forEach((element: PeriodsModels) => {
          element.period_from = new Date(element.period_from)
          element.period_to = new Date(element.period_to)
          element.period_payment = new Date(element.period_payment)
        });
        this.periods_list = await res;
      });
    }
    async doRecordPeriod(data: PeriodsModels) {
      await this.periodsService.period_record(data).then((res) => {
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
    async doDeleteYear(data: PeriodsModels) {
      await this.periodsService.period_delete(data).then((res) => {
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
      this.periodsService.period_import(this.fileToUpload, filename, filetype).then((res) => {
        // console.log(res)
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
        label: this.title_new,
          icon: 'pi-plus',
          command: (event) => {
            this.selectedPeriods = new PeriodsModels();
            this.new_data = true;
            this.edit_data = false;
          }
        }
        ,
        {
        label: this.title_import,
          icon: 'pi-file-import',
          command: (event) => {
            this.showUpload()
  
          }
        }
        ,
        {
        label: this.title_export,
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
             message: 'Confirm Upload file : ' + this.fileToUpload.name,
            header: 'Import File',
          icon: 'pi pi-exclamation-triangle',
          accept: () => {
            this.displayUpload = false;
            this.doUploadPeriod()
          },
          key:"myDialog",
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
      this.selectedPeriods = new PeriodsModels()
    }
    Save() {
      this.selectedPeriods.emptype_code = this.emptype;
      this.selectedPeriods.year_code = this.selectedyear.code;
      this.doRecordPeriod(this.selectedPeriods)
    }
    Delete() {
      this.doDeleteYear(this.selectedPeriods)
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
  
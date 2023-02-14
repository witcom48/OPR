import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ConfirmationService, MenuItem, MessageService } from 'primeng/api';
import { HolidayModels } from 'src/app/models/attendance/holiday';
import { Holiday_listModels } from 'src/app/models/attendance/holiday_list';
import { PlanholidayServices } from 'src/app/services/attendance/planholiday.service';
import * as XLSX from 'xlsx';
interface Year {
  name: string,
  code: string
}
@Component({
  selector: 'app-holiday',
  templateUrl: './holiday.component.html',
  styleUrls: ['./holiday.component.scss']
})
export class HolidayComponent implements OnInit {
  constructor(private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private  planholidayService:PlanholidayServices) { }
  @ViewChild('TABLE') table: ElementRef | any = null;
  @ViewChild('TABLELIST') tablelist: ElementRef | any = null;
  yaerList: Year[] = [];
  selectedyear!: Year;
  new_data: boolean = false
  edit_data: boolean = false
  displayUpload: boolean = false;
  displayaddholiday: boolean = false;
  displayeditholiday: boolean = false;
  fileToUpload: File | any = null;
  items: MenuItem[] = [];
  items_holiday: MenuItem[] = [];
  holiday_lists: HolidayModels[] = [];
  holiday_listselect: Holiday_listModels = new Holiday_listModels();
  holidays: HolidayModels = new HolidayModels()

  ngOnInit(): void {
    this.doLoadMenu()
    this.yaerList = [
      { name: '2022', code: '2022' },
      { name: '2023', code: '2023' },
    ];
    this.doLoadPlanholiday();
    // this.holiday_lists = [{
    //   company_code: 'PSG',
    //   planholiday_id: '1',
    //   planholiday_code: 'HOLD',
    //   planholiday_name_th: 'วันหยุดประจำปีรายเดือน',
    //   planholiday_name_en: 'Holiday(Monthly)',
    //   year_code: '2022',
    //   holiday_list: [{
    //     company_code: 'PSG',
    //     holiday_date: new Date(),
    //     holiday_name_th: 'วันขึ้นปีใหม่',
    //     holiday_name_en: 'New Years Day',
    //     planholiday_code: 'HOLD',
    //     holiday_daytype: 'H',
    //     holiday_payper: '100.00'

    //   }, {
    //     company_code: 'PSG',
    //     holiday_date: new Date(),
    //     holiday_name_th: 'วันขึ้นปีใหม่',
    //     holiday_name_en: 'New Years Day',
    //     planholiday_code: 'HOLD',
    //     holiday_daytype: 'C',
    //     holiday_payper: '100.00'

    //   }],
    //   created_by: 'Admin',
    //   created_date: '2022-01-16',
    //   modified_by: 'admin',
    //   modified_date: '2022-01-17',
    //   flag: false
    // }, {
    //   company_code: 'PSG',
    //   planholiday_id: '2',
    //   planholiday_code: 'HOLM',
    //   planholiday_name_th: 'วันหยุดประจำปีรายวัน',
    //   planholiday_name_en: 'Holiday(Day)',
    //   year_code: '2022',
    //   holiday_list: [],
    //   created_by: 'Admin',
    //   created_date: '2022-01-16',
    //   modified_by: 'admin',
    //   modified_date: '2022-01-17',
    //   flag: false
    // },]
  }

  doLoadPlanholiday() {
    this.holiday_lists = [];
    var tmp = new HolidayModels();
    this.planholidayService.planholiday_get(tmp).then(async (res) => {
      await res.forEach((element: HolidayModels) => {
        element.holiday_list.forEach((elm:Holiday_listModels)=>{
          elm.holiday_date = new Date(elm.holiday_date)
        })
      });
      this.holiday_lists = await res;
    });
  }

  async doRecordPlanholiday(data: HolidayModels) {
    data.year_code = "2023"
    await this.planholidayService.planholiday_record(data).then((res) => {
      console.log(res)
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
  handleFileInput(file: FileList) {
    this.fileToUpload = file.item(0);
  }


  doLoadMenu() {

    this.items = [
      {
        label: "New",
        icon: 'pi-plus',
        command: (event) => {
          this.holidays = new HolidayModels();
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
    this.items_holiday = [
      {
        label: "New",
        icon: 'pi-plus',
        command: (event) => {
          this.holiday_listselect = new Holiday_listModels();
          this.displayaddholiday = true;
          this.displayeditholiday = false;
        }
      }
      ,
      {
        label: "Import",
        icon: 'pi-file-import',
        command: (event) => {
          // this.showUpload()

        }
      }
      ,
      {
        label: "Export",
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
    this.holidays = new HolidayModels()
    this.holiday_listselect = new Holiday_listModels();
  }
  Save() {
    console.log(this.holidays)
    this.doRecordPlanholiday(this.holidays)
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
    console.log(this.holiday_lists)
  }
  selectYear() {
    console.log(this.selectedyear)
  }
  onRowSelectList(event: any) {
    this.displayaddholiday = true
    this.displayeditholiday = true
    console.log(this.holiday_listselect)
  }
  onRowSelect(event: any) {
    console.log(this.holiday_lists)
    console.log(this.holidays)
    this.new_data = true
    this.edit_data = true;
  }
  exportAsExcel() {

    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(this.table.nativeElement);//converts a DOM TABLE element to a worksheet
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    XLSX.writeFile(wb, 'Export_YearPeriod.xlsx');

  }
  exportAsExcelHolidaylist() {

    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(this.tablelist.nativeElement);//converts a DOM TABLE element to a worksheet
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    XLSX.writeFile(wb, 'Export_HolidayList.xlsx');

  }
}

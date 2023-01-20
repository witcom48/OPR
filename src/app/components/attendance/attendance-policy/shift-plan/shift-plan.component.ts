import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ConfirmationService, MenuItem, MessageService } from 'primeng/api';
import { PlanscheduleModels } from 'src/app/models/attendance/planschedule';
import { ShiftModels } from 'src/app/models/attendance/shift';
import { ShiftplanModels } from 'src/app/models/attendance/shift_plan';
import * as XLSX from 'xlsx';
@Component({
  selector: 'app-shift-plan',
  templateUrl: './shift-plan.component.html',
  styleUrls: ['./shift-plan.component.scss']
})
export class ShiftPlanComponent implements OnInit {
  @ViewChild('TABLE') table: ElementRef | any = null;
  @ViewChild('TABLELIST') tablelist: ElementRef | any = null;
  ShiftList: ShiftModels[] = [];
  selectedshift!: ShiftModels;
  new_data: boolean = false
  edit_data: boolean = false
  displayUpload: boolean = false;
  displayaddholiday: boolean = false;
  displayeditholiday: boolean = false;
  fileToUpload: File | any = null;
  constructor(private messageService: MessageService,
    private confirmationService: ConfirmationService,) { }
  items: MenuItem[] = [];
  items_holiday: MenuItem[] = [];
  shiftplan_lists: ShiftplanModels[] = [];
  shiftplan_listselect: ShiftplanModels = new ShiftplanModels();
  planschedule_list: PlanscheduleModels[] = []
  planschedule_listselect: PlanscheduleModels = new PlanscheduleModels()
  shiftplans: ShiftplanModels = new ShiftplanModels()

  ngOnInit(): void {
    this.doLoadMenu()
    this.ShiftList.push({
      company_code: 'PSG',
      shift_id: '1',
      shift_code: 'Shift N1',
      shift_name_th: 'กะการทำงานเวลาปกติ 7.00-16.00น.',
      shift_name_en: 'Shift Normal 7.00-16.00',
      shift_ch1: '04:00',
      shift_ch2: '07:00',
      shift_ch3: '07:00',
      shift_ch4: '16:00',
      shift_ch5: '00:00',
      shift_ch6: '00:00',
      shift_ch7: '00:00',
      shift_ch8: '00:00',
      shift_ch9: '16:00',
      shift_ch10: '22:00',
      shift_ch3_from: '04:00',
      shift_ch3_to: '12:00',
      shift_ch4_from: '12:00',
      shift_ch4_to: '22:00',
      shift_ch7_from: '00:00',
      shift_ch7_to: '00:00',
      shift_ch8_from: '00:00',
      shift_ch8_to: '00:00',
      shift_otin_min: '3',
      shift_otin_max: '3',
      shift_otout_min: '6',
      shift_otout_max: '6',
      created_by: 'Admin',
      created_date: '2022-01-16',
      modied_by: 'admin',
      modied_date: '2022-01-17',
      flag: "0",
      shift_flexiblebreak: true,
      shift_break: [{
        company_code: 'PSG',
        shift_code: 'Nhift N1',
        shiftbreak_no: "1",
        shiftbreak_from: "12:00",
        shiftbreak_to: "13:00",
        shiftbreak_break: '1'
      }],
      shift_allowance: [{
        company_code: "PSG",
        shift_code: "Shift N1",
        shiftallowance_no: "1",
        shiftallowance_name_th: "ค่ากะ",
        shiftallowance_name_en: "KA",
        shiftallowance_hhmm: "04:00",
        shiftallowance_amount: "40.00"
      }],
    })
    this.shiftplan_lists = [{
      company_code: "PSG",
      planshift_id: "1",
      planshift_code: "01",
      planshift_name_th: "แผนการทำงานพนักงานรายวัน",
      planshift_name_en: "Plan for pemanent Staff",
      created_by: 'Admin',
      created_date: '2022-01-16',
      modied_by: 'admin',
      modied_date: '2022-01-17',
      flag: "0",
      planschedule: [{
        company_code: "PSG",
        planshift_code: "Plan01",
        planschedule_fromdate: new Date("2022-01-19"),
        planschedule_todate: new Date("2022-01-20"),
        shift_code: "Shift N4",
        planschedule_sun_off: "Y",
        planschedule_mon_off: "",
        planschedule_tue_off: "",
        planschedule_web_off: "",
        planschedule_thu_off: "",
        planschedule_fri_off: "",
        planschedule_sta_off: "Y",
        created_by: 'Admin',
        created_date: '2022-01-16',
        modied_by: 'admin',
        modied_date: '2022-01-17',
        flag: "0",
      }]
    }]
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
          this.shiftplans = new ShiftplanModels();
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
          this.shiftplan_listselect = new ShiftplanModels();
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
    this.shiftplans = new ShiftplanModels();
    this.shiftplan_listselect = new ShiftplanModels();
    this.planschedule_listselect = new PlanscheduleModels();
  }
  Save() {
    console.log(this.shiftplans)
  }
  Saveholiday() {
    if (!this.displayeditholiday) {
      this.shiftplans.planschedule = this.shiftplans.planschedule.concat({
        company_code: "PSG",
        planshift_code: "Plan01",
        planschedule_fromdate: new Date("2022-01-19"),
        planschedule_todate: new Date("2022-01-20"),
        shift_code: "Shift N4",
        planschedule_sun_off: "Y",
        planschedule_mon_off: "",
        planschedule_tue_off: "",
        planschedule_web_off: "",
        planschedule_thu_off: "",
        planschedule_fri_off: "",
        planschedule_sta_off: "Y",
        created_by: 'Admin',
        created_date: '2022-01-16',
        modied_by: 'admin',
        modied_date: '2022-01-17',
        flag: "0",
      })
    }
    this.shiftplan_listselect = new ShiftplanModels();
    this.displayaddholiday = false;
    this.displayeditholiday = false;
    console.log(this.shiftplan_listselect)
    this.planschedule_listselect = new PlanscheduleModels();
  }
  onRowSelectList(event: any) {
    this.displayaddholiday = true
    this.displayeditholiday = true
    console.log(this.shiftplan_listselect)
  }
  onRowSelect(event: any) {
    console.log(this.shiftplan_listselect)
    console.log(this.shiftplans)
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

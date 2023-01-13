import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ConfirmationService, MenuItem, MessageService } from 'primeng/api';
import { TimePeriodModels } from 'src/app/models/attendance/timeperiod';
import * as XLSX from 'xlsx';

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
  @ViewChild('TABLE') table: ElementRef | any = null;
  yaerList: Year[] = [];
  selectedyear!: Year;
  emptype: string = "M"
  new_data: boolean = false
  edit_data: boolean = false
  fileToUpload: File | any = null;
  displayUpload: boolean = false;
  constructor(private messageService: MessageService,
    private confirmationService: ConfirmationService,) { }
  items: MenuItem[] = [];
  timeperiods_list: TimePeriodModels[] = [];
  timeperiods: TimePeriodModels = new TimePeriodModels()

  ngOnInit(): void {
    this.doLoadMenu()
    this.yaerList = [
      { name: 'Tax Calendar 2022', code: '2022' },
      { name: 'Tax Calendar 2023', code: '2023' },
    ];
    this.timeperiods_list = [{
      company_code: 'PSG',
      period_id: '100',
      period_type: 'PAY',
      emptype_code: 'D',
      year_code: '2022',
      period_no: '01',
      period_name_th: 'มกราคม',
      period_name_en: 'January',
      period_from: new Date('2022-01-01'),
      period_to: new Date('2022-01-31'),
      period_payment: new Date('2022-01-27'),
      period_dayonperiod: "1",
      created_by: "Admin",
      created_date: "2022-01-13",
      modied_by: 'admin',
      modied_date: '2022-02-14',
      flag: '0'
    }, {
      company_code: 'PSG',
      period_id: '101',
      period_type: 'PAY',
      emptype_code: 'D',
      year_code: '2022',
      period_no: '02',
      period_name_th: 'กุมภา',
      period_name_en: 'February',
      period_from: new Date('2022-01-01'),
      period_to: new Date('2022-01-31'),
      period_payment: new Date('2022-01-27'),
      period_dayonperiod: "1",
      created_by: "Admin",
      created_date: "2022-01-13",
      modied_by: 'admin',
      modied_date: '2022-02-14',
      flag: '0'
    }, {
      company_code: 'PSG',
      period_id: '102',
      period_type: 'PAY',
      emptype_code: 'D',
      year_code: '2022',
      period_no: '03',
      period_name_th: 'มกราคม',
      period_name_en: 'January',
      period_from: new Date('2022-01-01'),
      period_to: new Date('2022-01-31'),
      period_payment: new Date('2022-01-27'),
      period_dayonperiod: "1",
      created_by: "Admin",
      created_date: "2022-01-13",
      modied_by: 'admin',
      modied_date: '2022-02-14',
      flag: '0'
    }, {
      company_code: 'PSG',
      period_id: '103',
      period_type: 'PAY',
      emptype_code: 'D',
      year_code: '2022',
      period_no: '04',
      period_name_th: 'มกราคม',
      period_name_en: 'January',
      period_from: new Date('2022-01-01'),
      period_to: new Date('2022-01-31'),
      period_payment: new Date('2022-01-27'),
      period_dayonperiod: "1",
      created_by: "Admin",
      created_date: "2022-01-13",
      modied_by: 'admin',
      modied_date: '2022-02-14',
      flag: '0'
    }, {
      company_code: 'PSG',
      period_id: '104',
      period_type: 'PAY',
      emptype_code: 'D',
      year_code: '2022',
      period_no: '05',
      period_name_th: 'มกราคม',
      period_name_en: 'January',
      period_from: new Date('2022-01-01'),
      period_to: new Date('2022-01-31'),
      period_payment: new Date('2022-01-27'),
      period_dayonperiod: "1",
      created_by: "Admin",
      created_date: "2022-01-13",
      modied_by: 'admin',
      modied_date: '2022-02-14',
      flag: '0'
    }, {
      company_code: 'PSG',
      period_id: '105',
      period_type: 'PAY',
      emptype_code: 'D',
      year_code: '2022',
      period_no: '06',
      period_name_th: 'มกราคม',
      period_name_en: 'January',
      period_from: new Date('2022-01-01'),
      period_to: new Date('2022-01-31'),
      period_payment: new Date('2022-01-27'),
      period_dayonperiod: "1",
      created_by: "Admin",
      created_date: "2022-01-13",
      modied_by: 'admin',
      modied_date: '2022-02-14',
      flag: '0'
    }, {
      company_code: 'PSG',
      period_id: '106',
      period_type: 'PAY',
      emptype_code: 'D',
      year_code: '2022',
      period_no: '07',
      period_name_th: 'มกราคม',
      period_name_en: 'January',
      period_from: new Date('2022-01-01'),
      period_to: new Date('2022-01-31'),
      period_payment: new Date('2022-01-27'),
      period_dayonperiod: "1",
      created_by: "Admin",
      created_date: "2022-01-13",
      modied_by: 'admin',
      modied_date: '2022-02-14',
      flag: '0'
    }, {
      company_code: 'PSG',
      period_id: '107',
      period_type: 'PAY',
      emptype_code: 'D',
      year_code: '2022',
      period_no: '08',
      period_name_th: 'มกราคม',
      period_name_en: 'January',
      period_from: new Date('2022-01-01'),
      period_to: new Date('2022-01-31'),
      period_payment: new Date('2022-01-27'),
      period_dayonperiod: "1",
      created_by: "Admin",
      created_date: "2022-01-13",
      modied_by: 'admin',
      modied_date: '2022-02-14',
      flag: '0'
    }, {
      company_code: 'PSG',
      period_id: '108',
      period_type: 'PAY',
      emptype_code: 'D',
      year_code: '2022',
      period_no: '09',
      period_name_th: 'มกราคม',
      period_name_en: 'January',
      period_from: new Date('2022-01-01'),
      period_to: new Date('2022-01-31'),
      period_payment: new Date('2022-01-27'),
      period_dayonperiod: "1",
      created_by: "Admin",
      created_date: "2022-01-13",
      modied_by: 'admin',
      modied_date: '2022-02-14',
      flag: '0'
    }, {
      company_code: 'PSG',
      period_id: '109',
      period_type: 'PAY',
      emptype_code: 'D',
      year_code: '2022',
      period_no: '10',
      period_name_th: 'มกราคม',
      period_name_en: 'January',
      period_from: new Date('2022-01-01'),
      period_to: new Date('2022-01-31'),
      period_payment: new Date('2022-01-27'),
      period_dayonperiod: "1",
      created_by: "Admin",
      created_date: "2022-01-13",
      modied_by: 'admin',
      modied_date: '2022-02-14',
      flag: '0'
    }, {
      company_code: 'PSG',
      period_id: '110',
      period_type: 'PAY',
      emptype_code: 'D',
      year_code: '2022',
      period_no: '11',
      period_name_th: 'มกราคม',
      period_name_en: 'January',
      period_from: new Date('2022-01-01'),
      period_to: new Date('2022-01-31'),
      period_payment: new Date('2022-01-27'),
      period_dayonperiod: "1",
      created_by: "Admin",
      created_date: "2022-01-13",
      modied_by: 'admin',
      modied_date: '2022-02-14',
      flag: '0'
    }, {
      company_code: 'PSG',
      period_id: '111',
      period_type: 'PAY',
      emptype_code: 'D',
      year_code: '2022',
      period_no: '12',
      period_name_th: 'มกราคม',
      period_name_en: 'January',
      period_from: new Date('2022-01-01'),
      period_to: new Date('2022-01-31'),
      period_payment: new Date('2022-01-27'),
      period_dayonperiod: "1",
      created_by: "Admin",
      created_date: "2022-01-13",
      modied_by: 'admin',
      modied_date: '2022-02-14',
      flag: '0'
    },]
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
          this.timeperiods = new TimePeriodModels();
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
  close(){
    this.new_data=false
    this.timeperiods = new TimePeriodModels()
  }
  Save() {
    console.log(this.timeperiods)
  }
  selectYear() {
    console.log(this.emptype)
    console.log(this.selectedyear)
  }
  onRowSelect(event: any) {
    this.new_data = true
    this.edit_data = true;
  }
  exportAsExcel() {

    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(this.table.nativeElement);//converts a DOM TABLE element to a worksheet
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    XLSX.writeFile(wb, 'Export_YearPeriod.xlsx');

  }

}

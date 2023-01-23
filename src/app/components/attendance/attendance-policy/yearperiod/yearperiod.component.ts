import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ConfirmationService, MenuItem, MessageService } from 'primeng/api';
import { YearPeriodModels } from 'src/app/models/attendance/yearperiod';
import * as XLSX from 'xlsx';
@Component({
  selector: 'app-yearperiod',
  templateUrl: './yearperiod.component.html',
  styleUrls: ['./yearperiod.component.scss']
})
export class YearperiodComponent implements OnInit {
  @ViewChild('TABLE') table: ElementRef | any = null;
  new_data: boolean = false
  edit_data: boolean = false
  fileToUpload: File | any = null;
  displayUpload: boolean = false;
  constructor(private messageService: MessageService,
    private confirmationService: ConfirmationService,) { }
  items: MenuItem[] = [];
  yearperiods_list: YearPeriodModels[] = [];
  yearperiods: YearPeriodModels = new YearPeriodModels()

  ngOnInit(): void {
    this.doLoadMenu()
    this.yearperiods_list = [
      {
        company_code: "PSG",
        year_id: "1",
        year_code: "2022",
        year_name_th: "ปีภาษี",
        year_name_en: "TAX",
        year_fromdate: new Date("2022-01-01"),
        year_todate: new Date("2022-12-31"),
        year_group: "TAX",
        created_by: "Admin01",
        modied_by: "admin01",
        created_date: "2022-01-01",
        modied_date: "2022-01-02",
        flag: ""
      },
      {
        company_code: "PSG",
        year_id: "2",
        year_code: "2023",
        year_name_th: "ปีการลา",
        year_name_en: "Leave Calendar",
        year_fromdate: new Date("2022-01-01"),
        year_todate: new Date("2022-12-31"),
        year_group: "Leave",
        created_by: "Admin",
        modied_by: "admin",
        created_date: "2022-01-02",
        modied_date: "2022-01-03",
        flag: ""
      },
    ]
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
          this.yearperiods = new YearPeriodModels();
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
  close() {
    this.new_data = false
    this.yearperiods = new YearPeriodModels()
  }
  Save() {
    console.log(this.yearperiods)
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

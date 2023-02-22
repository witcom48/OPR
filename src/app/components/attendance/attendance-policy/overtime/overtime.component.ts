import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ConfirmationService, MenuItem, MessageService } from 'primeng/api';
import { OvertimeModels } from 'src/app/models/attendance/overtime';
import { OvertimerateModels } from 'src/app/models/attendance/overtime_rate';
import * as XLSX from 'xlsx';
interface Typeday {
  name: string,
  code: string
}
@Component({
  selector: 'app-overtime',
  templateUrl: './overtime.component.html',
  styleUrls: ['./overtime.component.scss']
})
export class OvertimeComponent implements OnInit {
  @ViewChild('TABLE') table: ElementRef | any = null;
  daytype: Typeday[] = [];
  select_daytype!: Typeday;
  new_data: boolean = false
  edit_data: boolean = false
  fileToUpload: File | any = null;
  displayUpload: boolean = false;
  displayaddrate: boolean = false
  displayeditrate: boolean = false
  constructor(private messageService: MessageService,
    private confirmationService: ConfirmationService,) { }
  items: MenuItem[] = [];
  itemsrate: MenuItem[] = [];
  overtime_list: OvertimeModels[] = []
  overtimes: OvertimeModels = new OvertimeModels()
  rate: OvertimerateModels = new OvertimerateModels()

  ngOnInit(): void {
    this.doLoadMenu()
    this.daytype = [
      {
        name: "Offday",
        code: "O"
      },
      {
        name: "Holiday",
        code: "H"
      },
      {
        name: "Companyday",
        code: "C"
      },
      {
        name: "Normalday",
        code: "N"
      },
    ]
    this.overtime_list = [
      {
        company_code: "PSG",
        rateot_id: "1",
        rateot_code: "OTD",
        rateot_name_th: "โอทีรายวัน",
        rateot_name_en: "OT(Daily work)",
        created_by: "Admin01",
        modified_by: "admin01",
        created_date: "2022-01-01",
        modified_date: "2022-01-02",
        flag: "",
        rate: [
          {
            company_code: "PSG",
            rateot_code: "OTD",
            rateot_daytype: "O",
            rateot_before: "3.00",
            rateot_normal: "2.00",
            rateot_break: "0.00",
            rateot_after: "3.00",
            created_by: "Admin01",
            modified_by: "admin01",
            created_date: "2022-01-01",
            modified_date: "2022-01-02",
            flag: ""
          }
        ]
      }
    ]
  }

  selectdaytype(event: any) {
    console.log(event.value.code)
    this.rate.rateot_daytype = event.value.code;
  }

  handleFileInput(file: FileList) {
    this.fileToUpload = file.item(0);
  }

  onRowSelectList(event: any) {
    console.log(this.daytype.keys)
    this.select_daytype = { name: this.daytype.filter((e) => e.code == this.rate.rateot_daytype)[0].name, code: this.rate.rateot_daytype }
    this.displayaddrate = true
    this.displayeditrate = true
    console.log(this.rate)
  }
  doLoadMenu() {

    this.items = [
      {
        label: "New",
        icon: 'pi-plus',
        command: (event) => {
          this.overtimes = new OvertimeModels();
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
    this.itemsrate = [
      {
        label: "New",
        icon: 'pi-plus',
        command: (event) => {
          this.rate = new OvertimerateModels();
          this.displayaddrate = true;
          this.displayeditrate = false;
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
  closedispaly() {
    this.rate = new OvertimerateModels()
  }
  close() {
    this.new_data = false
    this.overtimes = new OvertimeModels()
  }
  Save() {
    console.log(this.overtimes)
  }
  Saverate() {
    this.displayaddrate = false
    this.rate = new OvertimerateModels()
    console.log(this.overtimes)
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

    XLSX.writeFile(wb, 'Export_Overtime.xlsx');

  }
}

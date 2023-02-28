import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ConfirmationService, MenuItem, MessageService } from 'primeng/api';
import { DiligenceModels } from 'src/app/models/attendance/diligence';
import { DiligencestepModels } from 'src/app/models/attendance/diligence_step';
import * as XLSX from 'xlsx';
@Component({
  selector: 'app-diligence',
  templateUrl: './diligence.component.html',
  styleUrls: ['./diligence.component.scss']
})
export class DiligenceComponent implements OnInit {
  @ViewChild('TABLE') table: ElementRef | any = null;
  new_data: boolean = false
  edit_data: boolean = false
  fileToUpload: File | any = null;
  displayUpload: boolean = false;
  displayaddstep: boolean = false;
  displayeditstep: boolean = false;
  constructor(private messageService: MessageService,
    private confirmationService: ConfirmationService,) { }
  items: MenuItem[] = [];
  itemsstep: MenuItem[] = [];
  diligence_list: DiligenceModels[] = [];
  diligences: DiligenceModels = new DiligenceModels();
  diligencestep: DiligencestepModels = new DiligencestepModels()

  ngOnInit(): void {
    this.doLoadMenu()
    this.diligence_list = [
      {
        company_code: "PGS",
        diligence_id: "8",
        diligence_code: "DG",
        diligence_name_th: "เบี้ยขยัน",
        diligence_name_en: "DILIGENCE",
        diligence_punchcard: "N",
        diligence_punchcard_times: "0",
        diligence_punchcard_timespermonth: "0",
        diligence_late: "N",
        diligence_late_acc: "0",
        diligence_late_times: "0",
        diligence_late_timespermonth: "0",
        diligence_ba: "N",
        diligence_before_min: "0",
        diligence_after_min: "0",
        diligence_passpro: "N",
        diligence_wrongcondition: "1",
        diligence_somperiod: "N",
        diligence_somperiod_first: "N",
        created_by: 'Admin',
        created_date: '2022-01-16',
        modified_by: 'admin',
        modified_date: '2022-01-17',
        flag: false,
        step: [
          {
            company_code: "PSG",
            diligence_code: "DG",
            steppay_step: "1",
            steppay_type: "1",
            steppay_amount: "300.0"
          },
          {
            company_code: "PSG",
            diligence_code: "DG",
            steppay_step: "2",
            steppay_type: "2",
            steppay_amount: "400.0"
          },
          {
            company_code: "PSG",
            diligence_code: "DG",
            steppay_step: "3",
            steppay_type: "3",
            steppay_amount: "500.0"
          }
        ]
      }
    ]
    this.itemsstep = [
      {
        label: "New",
        icon: 'pi-plus',
        command: (event) => {
          this.diligencestep = new DiligencestepModels();
          this.displayaddstep = true;
          this.displayeditstep = false;
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
          // this.exportAsExcelHolidaylist();

        }
      }
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
          this.diligences = new DiligenceModels();
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
  Savestep() {
    console.log(this.diligencestep)
    this.displayaddstep = false;
    this.displayeditstep = false;
    this.diligencestep = new DiligencestepModels();
  }
  onRowSelectList(event: any) {
    this.displayaddstep = true
    this.displayeditstep = true
    console.log(this.diligencestep)
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
    this.diligencestep = new DiligencestepModels()
    this.diligences = new DiligenceModels()
  }
  Save() {
    console.log(this.diligencestep)
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

    XLSX.writeFile(wb, 'Export_YearPeriod.xlsx');

  }

}

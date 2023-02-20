import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ConfirmationService, MenuItem, MessageService } from 'primeng/api';
import { LateModels } from 'src/app/models/attendance/late';
import { LateconditionModels } from 'src/app/models/attendance/late_condition';
import * as XLSX from 'xlsx';
@Component({
  selector: 'app-late',
  templateUrl: './late.component.html',
  styleUrls: ['./late.component.scss']
})
export class LateComponent implements OnInit {
  @ViewChild('TABLE') table: ElementRef | any = null;
  new_data: boolean = false
  edit_data: boolean = false
  fileToUpload: File | any = null;
  displayUpload: boolean = false;
  displayaddcondition: boolean = false;
  displayeditcondition: boolean = false;
  constructor(private messageService: MessageService,
    private confirmationService: ConfirmationService,) { }
  items: MenuItem[] = [];
  itemslate: MenuItem[] = [];
  late_list: LateModels[] = [];
  lates: LateModels = new LateModels()
  conditions: LateconditionModels = new LateconditionModels()
  ngOnInit(): void {
    this.doLoadMenu()
    this.late_list = [
      {
        company_code: "PSG",
        late_id: "1",
        late_code: "01",
        late_name_th: "นโยยาบสาย",
        late_name_en: "Policy Late",
        created_by: "Admin01",
        modied_by: "admin01",
        created_date: "2022-01-01",
        modied_date: "2022-01-02",
        flag: "",
        condition: [
          {
            company_code: "PSG",
            late_code: "01",
            late_from: "1",
            late_to: "30",
            late_deduct_type: "3",
            late_deduct_amount: "0.00"
          }
        ]
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
          this.lates = new LateModels();
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
    this.itemslate = [
      {
        label: "New",
        icon: 'pi-plus',
        command: (event) => {
          this.conditions = new LateconditionModels();
          this.displayaddcondition = true;
          this.displayeditcondition = false;
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
    this.lates = new LateModels()
  }
  Save() {
    console.log(this.lates)
  }
  onRowSelectList(event: any) {
    this.displayaddcondition = true
    this.displayeditcondition = true
    console.log(this.conditions)
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

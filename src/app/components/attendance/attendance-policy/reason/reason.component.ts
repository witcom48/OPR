import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ConfirmationService, MenuItem, MessageService } from 'primeng/api';
import { ReasonModels } from 'src/app/models/attendance/reason';
import * as XLSX from 'xlsx';
interface Type {
  name: string,
  code: string
}
@Component({
  selector: 'app-reason',
  templateUrl: './reason.component.html',
  styleUrls: ['./reason.component.scss']
})
export class ReasonComponent implements OnInit {
  @ViewChild('TABLE') table: ElementRef | any = null;
  TypeList: Type[] = [];
  selectedType!: Type;
  new_data: boolean = false
  edit_data: boolean = false
  fileToUpload: File | any = null;
  displayUpload: boolean = false;
  constructor(private messageService: MessageService,
    private confirmationService: ConfirmationService,) { }
  items: MenuItem[] = [];
  reason_list: ReasonModels[] = [];
  reasons: ReasonModels = new ReasonModels()
  ngOnInit(): void {
    this.doLoadMenu()
    this.TypeList = [
      { name: 'Leave', code: 'Leave' },
      { name: 'OT', code: 'OT' },
    ];
    this.reason_list = [
      {
        company_code: "PSG",
        reason_id: "1",
        reason_code: "00",
        reason_name_th: "ป่วย",
        reason_name_en: "Sick",
        reason_group: "LEAVE",
        created_by: "Admin",
        created_date: "2022-01-13",
        modied_by: "admin",
        modied_date: "2022-01-14",
        flag: "0"
      }
    ]
  }
  doLoadMenu() {

    this.items = [
      {
        label: "New",
        icon: 'pi-plus',
        command: (event) => {
          this.reasons = new ReasonModels();
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
  close(){
    this.new_data=false
    this.reasons = new ReasonModels()
  }
  showUpload() {
    this.displayUpload = true;
  }
  handleFileInput(file: FileList) {
    this.fileToUpload = file.item(0);
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
  Save() {
    console.log(this.reasons)
  }
  selectType() {
    console.log(this.selectedType)
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

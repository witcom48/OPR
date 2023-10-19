import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';

import { DatePipe } from '@angular/common';
import { ConfirmationService, MenuItem, MessageService } from 'primeng/api';
import * as XLSX from 'xlsx';

import { AppConfig } from '../../../../config/config';
import { InitialCurrent } from '../../../../config/initial_current';
import { LocationService } from 'src/app/services/system/policy/location.service';
import { AccessdataModel } from 'src/app/models/system/security/accessdata';
import { SysLocationModel } from 'src/app/models/system/policy/location';
declare var locationpage: any;

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.scss']
})
export class LocationComponent implements OnInit {

  langs: any = locationpage;
  selectlang: string = "EN";
  constructor(private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private datePipe: DatePipe,
    private router: Router,
    private locationService: LocationService) { }
  @ViewChild('TABLE') table: ElementRef | any = null;
  new_data: boolean = false
  edit_data: boolean = false
  fileToUpload: File | any = null;
  displayUpload: boolean = false;
  items: MenuItem[] = [];
  location_list: SysLocationModel[] = [];
  locations: SysLocationModel = new SysLocationModel()

  public initial_current: InitialCurrent = new InitialCurrent();
  initialData2: InitialCurrent = new InitialCurrent();
  accessData: AccessdataModel = new AccessdataModel();
  doGetInitialCurrent() {
    this.initial_current = JSON.parse(localStorage.getItem(AppConfig.SESSIONInitial) || '{}');
    if (!this.initial_current.Token) {
      this.router.navigateByUrl('login');
    }
    this.accessData = this.initialData2.dotGetPolmenu('SYS');

    this.selectlang = this.initial_current.Language;
  }
  ngOnInit(): void {
    this.doGetInitialCurrent();
    this.doLoadMenu();
    this.doLoadLocation();
  }
  doLoadLocation() {
    this.location_list = [];
    var tmp = new SysLocationModel();
    this.locationService.location_get(tmp).then(async (res) => {
      this.location_list = await res;
    });
  }
  title_file: { [key: string]: string } = { EN: "Template ", TH: "ไฟล์" }

  title_template: { [key: string]: string } = { EN: "Template ", TH: "เทมเพลต" }

  async doRecordLocation(data: SysLocationModel) {
    await this.locationService.location_record(data).then((res) => {
      // console.log(res)
      if (res.success) {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: res.message });
        this.doLoadLocation()
        this.new_data = false;
        this.edit_data = false;
        this.displayManage = false

      }
      else {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: res.message });
      }

    });

  }
  confirmRecord() {
    this.confirmationService.confirm({
      message: "Confirm to record",
      header: "Confirm to delete",
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.doRecordLocation(this.locations);
      },
      reject: () => {
        this.messageService.add({ severity: 'warn', summary: 'Cancelled', detail: "You have cancelled" });
      },
      key: 'myDialog'
    });
  }

  confirmDelete(data: SysLocationModel) {
    this.confirmationService.confirm({
      message: this.langs.get('confirm_delete')[this.selectlang],
      header: this.langs.get('delete')[this.selectlang],
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.doDeleteLocation(data)
      },
      reject: () => {
        this.messageService.add({ severity: 'warn', summary: 'Cancelled', detail: this.langs.get('Cancelled')[this.selectlang] });
      },
      key: "myDialog"
    });
  }
 
  Delete() {
    this.confirmationService.confirm({
      message: this.langs.get('confirm_delete')[this.selectlang],
      header: this.langs.get('delete')[this.selectlang],
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.doDeleteLocation(this.locations)
      },
      reject: () => {
        this.messageService.add({ severity: 'warn', summary: 'Cancelled', detail: this.langs.get('Cancelled')[this.selectlang] });
      },
      key: "myDialog"
    });
  }
 
  
  
  async doDeleteLocation(data: SysLocationModel) {
    await this.locationService.location_delete(data).then((res) => {
      // console.log(res)
      if (res.success) {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: res.message });
        this.doLoadLocation()
        this.edit_data = false;
        this.new_data = false;
        this.displayManage = false;
      }
      else {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: res.message });
      }

    });
    this.new_data = false;
    this.edit_data = false;
  }
  doUploadYear() {
    const filename = "LOCATION_" + this.datePipe.transform(new Date(), 'yyyyMMddHHmm');
    const filetype = "xls";
    this.locationService.location_import(this.fileToUpload, filename, filetype).then((res) => {
      // console.log(res)
      if (res.success) {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: res.message });
        this.doLoadLocation();
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
          if (this.accessData.accessdata_new) {
            this.showManage()
            this.locations = new SysLocationModel();
            this.new_data = true;
            this.edit_data = false;
          } else {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Permistion' });
          }

        }
      }
      ,
      {
        label:this.title_template[this.initial_current.Language],
        icon: 'pi-download',
        command: (event) => {
          window.open('assets/OPRFileImport/(OPR)Import System/(OPR)Import System Location.xlsx', '_blank');
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
          this.doUploadYear()
        },
        reject: () => {
          this.displayUpload = false;
        }
      });
    } else {
      this.messageService.add({ severity: 'warn', summary: 'File', detail: "Please choose a file." });
    }
  }

  displayManage: boolean = false;
  position: string = "right";
  showManage() {
    this.displayManage = true
  }

  close() {
    this.new_data = false
    this.locations = new SysLocationModel()
  }
  reloadPage() {
    this.doLoadLocation()
  }
  Save() {
    this.doRecordLocation(this.locations)
  }
  
  onRowSelect(event: any) {
    this.new_data = true
    this.edit_data = true;
    this.displayManage = true;
  }

  exportAsExcel() {
    const fileToExport = this.location_list.map((items: any) => {
      return {
        "location_code": items?.location_code,
        "location_name_th": items?.location_name_th,
        "location_name_en": items?.location_name_en,
        "location_detail": items?.location_detail,
        "location_lat": items?.location_lat,
        "location_long": items?.location_long,
      }
    });
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(fileToExport);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    XLSX.writeFile(wb, 'Export_Location.xlsx');
  }
}

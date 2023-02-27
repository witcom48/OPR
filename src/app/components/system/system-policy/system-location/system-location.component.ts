import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { NavigationExtras } from '@angular/router';
import { Table } from 'primeng/table';
import { MegaMenuItem,MenuItem } from 'primeng/api';
import { Router } from '@angular/router';

import { DatePipe } from '@angular/common';
import {ConfirmationService, MessageService} from 'primeng/api';
import * as XLSX from 'xlsx';

import { AppConfig } from '../../../../config/config';
import { InitialCurrent } from '../../../../config/initial_current';
import { LocationModel } from 'src/app/models/system/location';
import { LocationService } from 'src/app/services/system/location.service';
declare var locationpage: any;

// import { LocationModel } from 'src/app/models/system/location';
// import { LocationService } from 'src/app/services/system/location.service';
@Component({
  selector: 'app-system-location',
  templateUrl: './system-location.component.html',
  styleUrls: ['./system-location.component.scss']
})
export class SystemLocationComponent implements OnInit {

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
    location_list: LocationModel[] = [];
    locations: LocationModel = new LocationModel()
  
    public initial_current: InitialCurrent = new InitialCurrent();
    doGetInitialCurrent() {
      this.initial_current = JSON.parse(localStorage.getItem(AppConfig.SESSIONInitial) || '{}');
      if (!this.initial_current.Token) {
        this.router.navigateByUrl('');
      }
      this.selectlang = this.initial_current.Language;
    }
    ngOnInit(): void {
      this.doGetInitialCurrent();
      this.doLoadMenu();
      this.doLoadLocation();
    }
    doLoadLocation() {
      this.location_list = [];
      var tmp = new LocationModel();
      this.locationService.location_get(tmp).then(async (res) => {
        this.location_list = await res;
      });
    }
    async doRecordLocation(data: LocationModel) {
      await this.locationService.location_record(data).then((res) => {
        console.log(res)
        if (res.success) {
          this.messageService.add({ severity: 'success', summary: 'Success', detail: res.message });
          this.doLoadLocation()
        }
        else {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: res.message });
        }
  
      });
      this.new_data = false;
      this.edit_data = false;
    }
    async doDeleteLocation(data: LocationModel) {
      await this.locationService.location_delete(data).then((res) => {
        console.log(res)
        if (res.success) {
          this.messageService.add({ severity: 'success', summary: 'Success', detail: res.message });
          this.doLoadLocation()
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
        console.log(res)
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
            this.locations = new LocationModel();
            this.new_data = true;
            this.edit_data = false;
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
    close() {
      this.new_data = false
      this.locations = new LocationModel()
    }
    Save() {
      console.log(this.locations)
      this.doRecordLocation(this.locations)
    }
    Delete() {
      this.doDeleteLocation(this.locations)
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
  
      XLSX.writeFile(wb, 'Export_Location.xlsx');
  
    }
  }
  
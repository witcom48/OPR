
import { DatePipe } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, MenuItem, MessageService, PrimeNGConfig } from 'primeng/api';
import { AppConfig } from 'src/app/config/config';
import { InitialCurrent } from 'src/app/config/initial_current';
import { RoundsModel } from 'src/app/models/system/manage/rounds';
import { RoundsService } from 'src/app/services/system/manage1/rounds.service';
import * as XLSX from 'xlsx';
declare var rounddecimal: any;
declare var langcalendarth: any;
declare var langcalendaren: any;

declare var reason: any;
interface Type { name: string, code: string }

@Component({
  selector: 'app-round',
  templateUrl: './round.component.html',
  styleUrls: ['./round.component.scss']
})
export class RoundComponent implements OnInit {

    langs: any = rounddecimal;
    selectlang: string = "EN";
    constructor(private messageService: MessageService,
      private confirmationService: ConfirmationService,

      private roundsService: RoundsService,


      private datePipe: DatePipe,
      private config: PrimeNGConfig,
      private router: Router,
    ) { }
    @ViewChild('TABLE') table: ElementRef | any = null;
    new_data: boolean = false
    edit_data: boolean = false
    fileToUpload: File | any = null;
    displayUpload: boolean = false;
    items: MenuItem[] = [];


    rounds_list: RoundsModel[] = [];
    rounds: RoundsModel = new RoundsModel()

    public initial_current: InitialCurrent = new InitialCurrent();
    doGetInitialCurrent() {
      this.initial_current = JSON.parse(localStorage.getItem(AppConfig.SESSIONInitial) || '{}');
      if (!this.initial_current.Token) {
        this.router.navigateByUrl('');
      }
      this.selectlang = this.initial_current.Language;
      if (this.initial_current.Language == "TH") {
        this.config.setTranslation(langcalendarth)
      } else {
        this.config.setTranslation(langcalendaren)
      }
    }
    ngOnInit(): void {
      this.doGetInitialCurrent();
      this.doLoadMenu()
      this.doLoadRounds()
    }
    doLoadRounds() {
      this.rounds_list = [];
      var tmp = new RoundsModel();
      tmp.rounds_group = "Currency"
      this.roundsService.rounds_get(tmp).then(async (res) => {
        this.rounds_list = await res;
        await res.forEach((element: RoundsModel)=>{
            this.rounds.rounds_group= element.rounds_group= "Currency"
        })
      });
    }
    
    async doRecordRounds(data: RoundsModel) {
      await this.roundsService.rounds_record(data).then((res) => {
        console.log(res)
        if (res.success) {
          this.messageService.add({ severity: 'success', summary: 'Success', detail: res.message });
          this.doLoadRounds()
        }
        else {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: res.message });
        }

      });
      this.new_data = false;
      this.edit_data = false;
    }
    async doDeleteRounds(data: RoundsModel) {
      await this.roundsService.rounds_delete(data).then((res) => {
        console.log(res)
        if (res.success) {
          this.messageService.add({ severity: 'success', summary: 'Success', detail: res.message });
          this.doLoadRounds()
        }
        else {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: res.message });
        }

      });
      this.new_data = false;
      this.edit_data = false;
    }
    doUploadRounds() {
      const filename = "Rounds_" + this.datePipe.transform(new Date(), 'yyyyMMddHHmm');
      const filetype = "xls";
      this.roundsService.rounds_import(this.fileToUpload, filename, filetype).then((res) => {
        console.log(res)
        if (res.success) {
          this.messageService.add({ severity: 'success', summary: 'Success', detail: res.message });
          this.doLoadRounds();
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
            this.rounds = new RoundsModel();
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
            this.doUploadRounds()
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
      this.rounds = new RoundsModel()
    }
    changeParentCount(val: string) {
      console.log(val)
    }
    Save() {
      this.doRecordRounds(this.rounds)
      console.log(this.rounds)
    }
    Delete() {
      this.doDeleteRounds(this.rounds)
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

      XLSX.writeFile(wb, 'Export_Rounds.xlsx');

    }

  }

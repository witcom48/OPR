import { DatePipe } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, MenuItem, MessageService } from 'primeng/api';
import { AppConfig } from 'src/app/config/config';
import { InitialCurrent } from 'src/app/config/initial_current';
import { DiligenceModels } from 'src/app/models/attendance/diligence';
import { DiligencestepModels } from 'src/app/models/attendance/diligence_step';
import { AccessdataModel } from 'src/app/models/system/security/accessdata';
import { DiligenceServices } from 'src/app/services/attendance/diligence.service';
import * as XLSX from 'xlsx';
declare var diligence: any;
@Component({
  selector: 'app-diligence',
  templateUrl: './diligence.component.html',
  styleUrls: ['./diligence.component.scss']
})
export class DiligenceComponent implements OnInit {
  langs: any = diligence;
  selectlang: string = "EN";
  constructor(private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private diligenceServices: DiligenceServices,
    private datePipe: DatePipe,
    private router: Router,
  ) { }
  @ViewChild('TABLE') table: ElementRef | any = null;
  itemslike: MenuItem[] = [];
  home: any;
  new_data: boolean = false
  edit_data: boolean = false
  fileToUpload: File | any = null;
  displayUpload: boolean = false;
  displayaddstep: boolean = false;
  displayeditstep: boolean = false;
  items: MenuItem[] = [];
  itemsstep: MenuItem[] = [];
  diligence_list: DiligenceModels[] = [];
  diligences: DiligenceModels = new DiligenceModels();
  diligencestep: DiligencestepModels = new DiligencestepModels()

  public initial_current: InitialCurrent = new InitialCurrent();
  initialData2: InitialCurrent = new InitialCurrent();
  accessData: AccessdataModel = new AccessdataModel();
  doGetInitialCurrent() {
    this.initial_current = JSON.parse(localStorage.getItem(AppConfig.SESSIONInitial) || '{}');
    if (!this.initial_current.Token) {
      this.router.navigateByUrl('login');
    }
    this.selectlang = this.initial_current.Language;
    this.accessData = this.initialData2.dotGetPolmenu('ATT');
  }
  ngOnInit(): void {
    this.doGetInitialCurrent();
    this.doLoadMenu();
    this.doLoadDiligence();
  }
  doLoadDiligence() {
    this.diligence_list = [];
    var tmp = new DiligenceModels();
    this.diligenceServices.diligence_get(tmp).then(async (res) => {
      await res.forEach((element: any) => {
        element.diligence_punchcard = element.diligence_punchcard == "Y" ? true : false;
        element.diligence_late = element.diligence_late == "Y" ? true : false;
        element.diligence_ba = element.diligence_ba == "Y" ? true : false;
        element.diligence_passpro = element.diligence_passpro == "Y" ? true : false;
        element.diligence_someperiod = element.diligence_someperiod == "Y" ? true : false;
      });
      this.diligence_list = await res;
    });
  }
  async doRecordDiligence(data: DiligenceModels) {
    await this.diligenceServices.diligence_record(data).then((res) => {
      // console.log(res)
      if (res.success) {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: res.message });
        this.doLoadDiligence()
      }
      else {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: res.message });
      }

    });
    this.new_data = false;
    this.edit_data = false;
  }

  async doDeleteDiligence(data: DiligenceModels) {
    await this.diligenceServices.diligence_delete(data).then((res) => {
      // console.log(res)
      if (res.success) {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: res.message });
        this.doLoadDiligence()
      }
      else {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: res.message });
      }

    });
    this.new_data = false;
    this.edit_data = false;
  }

  doUploadDiligence() {
    const filename = "DILIGENCE_" + this.datePipe.transform(new Date(), 'yyyyMMddHHmm');
    const filetype = "xls";
    this.diligenceServices.diligence_import(this.fileToUpload, filename, filetype).then((res) => {
      // console.log(res)
      if (res.success) {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: res.message });
        this.doLoadDiligence();
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
    this.itemslike = [{ label: 'Attendance', routerLink: '/attendance/policy' }, {
      label: this.langs.get('diligence')[this.selectlang], styleClass: 'activelike'
    }];

    this.home = { icon: 'pi pi-home', routerLink: '/' };
    this.items = [
      {
        label: this.langs.get('new')[this.selectlang],
        icon: 'pi-plus',
        command: (event) => {
          if (this.accessData.accessdata_new) {
            this.diligences = new DiligenceModels();
            this.new_data = true;
            this.edit_data = false;
          } else {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Permission denied' });
          }

        }
      }
      ,
      {
        label: "Template",
        icon: 'pi-download',
        command: (event) => {
          window.open('assets/OPRFileImport/(OPR)Import Attendance/(OPR)Import Diligence.xlsx', '_blank');
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
    this.itemsstep = [
      {
        label: this.langs.get('new')[this.selectlang],
        icon: 'pi-plus',
        command: (event) => {
          this.diligencestep = new DiligencestepModels();
          this.displayaddstep = true;
          this.displayeditstep = false;
        }
      }
    ]
  }

  onRowSelectList(event: any) {
    this.displayaddstep = true
    this.displayeditstep = true
    // console.log(this.diligencestep)
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
          this.doUploadDiligence();
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
    this.closedispaly();
    this.new_data = false
    this.diligencestep = new DiligencestepModels()
    this.diligences = new DiligenceModels()
  }
  Save() {
    // // console.log(this.diligencestep)
    this.doRecordDiligence(this.diligences)
  }
  Savestep() {
    if (this.diligences.steppay_data.some((item: DiligencestepModels) => item.steppay_step == this.diligencestep.steppay_step)) {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'diligences Duplicate' });
    } else {
      if (!this.displayeditstep) {
        this.diligences.steppay_data = this.diligences.steppay_data.concat({
          company_code: this.initial_current.CompCode,
          diligence_code: this.diligences.diligence_code,
          steppay_step: this.diligencestep.steppay_step,
          steppay_type: this.diligencestep.steppay_type,
          steppay_amount: this.diligencestep.steppay_amount
        })
      }
    }
    this.displayaddstep = false;
    this.displayeditstep = false;
    this.diligencestep = new DiligencestepModels();
  }
  Delete() {
    this.confirmationService.confirm({
      message: this.langs.get('confirm_delete')[this.selectlang],
      header: this.langs.get('delete')[this.selectlang],
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.doDeleteDiligence(this.diligences)
      },
      reject: () => {
      }
    });
  }
  Deletestep() {
    this.diligences.steppay_data = this.diligences.steppay_data.filter((item) => {
      return item !== this.diligencestep;
    });
    this.displayaddstep = false;
    this.displayeditstep = false;
    this.diligencestep = new DiligencestepModels();
  }
  closedispaly() {
    this.displayaddstep = false;
    this.displayeditstep = false;
    this.diligencestep = new DiligencestepModels();
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

    XLSX.writeFile(wb, 'Export_Diligence.xlsx');

  }

}

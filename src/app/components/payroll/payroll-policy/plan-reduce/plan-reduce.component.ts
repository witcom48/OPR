import { DatePipe } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, MenuItem, MessageService } from 'primeng/api';
import { async } from 'rxjs';
import { AppConfig } from 'src/app/config/config';
import { InitialCurrent } from 'src/app/config/initial_current';
import { PlanreduceModels } from 'src/app/models/payroll/planreduce';
import { ReducesModel } from 'src/app/models/system/policy/reduces';
import { AccessdataModel } from 'src/app/models/system/security/accessdata';
import { PlanreduceService } from 'src/app/services/payroll/planreduce.service';
import { ReduceService } from 'src/app/services/system/policy/reduce.service';
import * as XLSX from 'xlsx';
declare var planleave: any;
@Component({
  selector: 'app-plan-reduce',
  templateUrl: './plan-reduce.component.html',
  styleUrls: ['./plan-reduce.component.scss']
})
export class PlanReduceComponent implements OnInit {

  langs: any = planleave;
  selectlang: string = "EN";
  constructor(private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private reducesService: ReduceService,
    private planreduceService: PlanreduceService,
    private datePipe: DatePipe,
    private router: Router,
  ) { }
  @ViewChild('TABLE') table: ElementRef | any = null;
  new_data: boolean = false
  edit_data: boolean = false
  fileToUpload: File | any = null;
  displayUpload: boolean = false;
  items: MenuItem[] = [];
  reduce_list: ReducesModel[] = [];
  reduce_listselect: ReducesModel[] = [];
  reduceplan_list: PlanreduceModels[] = [];
  reduceplans: PlanreduceModels = new PlanreduceModels();
  public initial_current: InitialCurrent = new InitialCurrent();
  initialData2: InitialCurrent = new InitialCurrent();
  accessData: AccessdataModel = new AccessdataModel();
  doGetInitialCurrent() {
    this.initial_current = JSON.parse(localStorage.getItem(AppConfig.SESSIONInitial) || '{}');
    if (!this.initial_current.Token) {
      this.router.navigateByUrl('login');
    }
    this.selectlang = this.initial_current.Language;
    this.accessData = this.initialData2.dotGetPolmenu('PAY');

  }
  ngOnInit(): void {
    this.doGetInitialCurrent();
    this.doLoadMenu();
    this.doLoadPlanreduce();
  }



  doLoadPlanreduce() {
    this.reduce_list = [];
    var tmp = new ReducesModel();
    this.reducesService.reduce_get().then(async (res) => {
      this.reduce_list = await res;
      this.doLoadPlanreduc();
    });
  }
  doLoadPlanreduc() {
    this.reduceplan_list = [];
    var tmp = new PlanreduceModels();
    this.planreduceService.planreduce_get(tmp).then(async (res) => {
      res.forEach((element: PlanreduceModels) => {
        element.reducelists.forEach(async (itme) => {
          let name = this.getnameList(itme.reduce_code);
          itme.reduce_name_en = `${name.en}`
          itme.reduce_name_th = `${name.th}`
        })
      });
      this.reduceplan_list = await res;
    });
  }
  async doRecordPlanreduce(data: PlanreduceModels) {
    await this.planreduceService.planreduce_record(data).then((res) => {
      console.log(data, 'l')
      if (res.success) {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: res.message });
        this.doLoadPlanreduc();
      }
      else {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: res.message });
      }

    });
    this.new_data = false;
    this.edit_data = false;
  }
  async doDeletePlanreduce(data: PlanreduceModels) {
    await this.planreduceService.planreduce_delete(data).then((res) => {
      if (res.success) {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: res.message });
        this.doLoadPlanreduc()
      }
      else {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: res.message });
      }

    });
    this.new_data = false;
    this.edit_data = false;
  }
  doUploadPlanreduce() {
    const filename = "PLANREDUCE_" + this.datePipe.transform(new Date(), 'yyyyMMddHHmm');
    const filetype = "xls";
    this.planreduceService.planreduce_import(this.fileToUpload, filename, filetype).then((res) => {
      if (res.success) {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: res.message });
        this.doLoadPlanreduc();
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
  getnameList(reduce_codes: string) {
    let result = this.reduce_list.find((obj: ReducesModel) => {
      return obj.reduce_code === reduce_codes;
    })
    var res1 = result?.reduce_name_th;
    var res2 = result?.reduce_name_en;
    return { th: res1, en: res2 };
  }

  doLoadMenu() {

    this.items = [
      {
        label: this.langs.get('new')[this.selectlang],
        icon: 'pi-plus',
        command: (event) => {
          if (this.accessData.accessdata_new) {

            this.reduceplans = new PlanreduceModels();
            this.checkreducelist();
            this.new_data = true;
            this.edit_data = false;
          } else {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Permistion' });
          }
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
        message: "Confirm Upload file : " + this.fileToUpload.name,
        header: "Import File",
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
          // console.log(this.fileToUpload)
          this.displayUpload = false;
          this.doUploadPlanreduce()
        },
        reject: () => {
          this.displayUpload = false;
        }
      });
    } else {
      this.messageService.add({ severity: 'warn', summary: 'File', detail: "Please choose a file." });
    }
  }
  checkreducelist() {
    this.reduce_listselect = []
    let code: string[] = [];
    this.reduceplans.reducelists.forEach((itme) => {
      code.push(itme.reduce_code)
    })
    this.reduce_list.forEach((item) => {
      if (!code.includes(item.reduce_code)) {
        this.reduce_listselect.push(item)
      }
    })
  }
  close() {
    this.new_data = false
    this.reduceplans = new PlanreduceModels()
  }
  Save() {
    console.log(this.reduceplans)
    this.doRecordPlanreduce(this.reduceplans)
  }
  Delete() {
    // // console.log(this.reduceplans)
    this.doDeletePlanreduce(this.reduceplans)
  }
  onRowSelect(event: any) {
    this.reduce_listselect = []
    this.checkreducelist();
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

    XLSX.writeFile(wb, 'Export_Planreduce.xlsx');

  }

}

import { DatePipe } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, MenuItem, MessageService } from 'primeng/api';
import { async } from 'rxjs';
import { AppConfig } from 'src/app/config/config';
import { InitialCurrent } from 'src/app/config/initial_current';
import { ItemsModel } from 'src/app/models/payroll/items';
import { PlanitemsModels } from 'src/app/models/payroll/planitems';
import { AccessdataModel } from 'src/app/models/system/security/accessdata';
import { ItemService } from 'src/app/services/payroll/item.service';
import { PlanitemsService } from 'src/app/services/payroll/planitems.service';
import * as XLSX from 'xlsx';
declare var planleave: any;
@Component({
  selector: 'app-items-plan',
  templateUrl: './items-plan.component.html',
  styleUrls: ['./items-plan.component.scss']
})
export class ItemsPlanComponent implements OnInit {
  home: any;
  itemslike: MenuItem[] = [];

  langs: any = planleave;
  selectlang: string = "EN";
  constructor(private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private itemService: ItemService,
    private planitemsService: PlanitemsService,
    private datePipe: DatePipe,
    private router: Router,
  ) { }
  @ViewChild('TABLE') table: ElementRef | any = null;
  new_data: boolean = false
  edit_data: boolean = false
  fileToUpload: File | any = null;
  displayUpload: boolean = false;
  items: MenuItem[] = [];
  items_list: ItemsModel[] = [];
  items_listselect: ItemsModel[] = [];
  itemsplan_list: PlanitemsModels[] = [];
  itemsplans: PlanitemsModels = new PlanitemsModels();
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
  title_system_payroll: { [key: string]: string } = { EN: "Policy Payroll ", TH: "นโยบาย" }
  title_page: { [key: string]: string } = { EN: "Income / Deduct Plan ", TH: "นโยบายเงินได้เงินหัก" }
  title_code: { [key: string]: string } = { EN: "Code", TH: "รหัส" }
  title_no: { [key: string]: string } = { EN: "No", TH: "ลำดับ" }
  title_description: { [key: string]: string } = { EN: "Description", TH: "รายละเอียด" }
  title_detail_en: { [key: string]: string } = { EN: "Description(Eng)", TH: "รายละเอียด (อังกฤษ)" }
  title_detail_th: { [key: string]: string } = { EN: "Description(Thai)", TH: "รายละเอียด (ไทย)" }
  title_IncomeDeduct: { [key: string]: string } = { EN: "Income / Deduct ", TH: " ชนิดเงินได้ / เงินหัก" }
  title_IncomeDeduct_Plan: { [key: string]: string } = { EN: "Income / Deduct Plan", TH: "นโยบายเงินได้/เงินหัก" }
  title_modified_by: { [key: string]: string } = { EN: "Edit by", TH: "ผู้ทำรายการ" }
  title_modified_date: { [key: string]: string } = { EN: "Edit date", TH: "วันที่ทำรายการ" }
  title_delete: { [key: string]: string } = { EN: "Delete", TH: "ลบ" }
  title_save: { [key: string]: string } = { EN: "Save", TH: "บันทึก" }
  title_new: { [key: string]: string } = { EN: "New", TH: "เพิ่ม" }

  title_file: { [key: string]: string } = { EN: "File ", TH: "ไฟล์" }

  //
  title_confirm: { [key: string]: string } = { EN: "Are you sure?", TH: "ยืนยันการทำรายการ" }
  title_confirm_record: { [key: string]: string } = { EN: "Confirm to record", TH: "คุณต้องการบันทึกการทำรายการ" }
  title_confirm_delete: { [key: string]: string } = { EN: "Confirm to delete", TH: "คุณต้องการลบรายการ" }
  title_confirm_yes: { [key: string]: string } = { EN: "Yes", TH: "ใช่" }
  title_confirm_no: { [key: string]: string } = { EN: "No", TH: "ยกเลิก" }
  title_confirm_cancel: { [key: string]: string } = { EN: "You have cancelled", TH: "คุณยกเลิกการทำรายการ" }
  //
  title_template: { [key: string]: string } = { EN: "Template ", TH: "เทมเพลต" }

  ngOnInit(): void {
    this.doGetInitialCurrent();
    this.doLoadMenu();
    this.doLoaditems();


    this.itemslike = [{ label: this.title_system_payroll[this.initial_current.Language], routerLink: '/payroll/policy' },
    { label: this.title_page[this.initial_current.Language], styleClass: 'activelike' }];
    this.home = { icon: 'pi pi-home', routerLink: '/' };
  }



  doLoaditems() {
    this.items_list = [];
    var tmp = new ItemsModel();
    this.itemService.item_get(tmp).then(async (res) => {
      this.items_list = await res;
      this.doLoadPlanitems();
    });
  }
  doLoadPlanitems() {
    this.itemsplan_list = [];
    var tmp = new PlanitemsModels();
    this.planitemsService.planitems_get(tmp).then(async (res) => {
      res.forEach((element: PlanitemsModels) => {
        element.itemslists.forEach(async (itme) => {
          let name = this.getnameList(itme.item_code);
          itme.item_name_en = `${name.en}`
          itme.item_name_th = `${name.th}`
        })
      });
      this.itemsplan_list = await res;
    });
  }
  async doRecordPlanitems(data: PlanitemsModels) {
    await this.planitemsService.planitems_record(data).then((res) => {
       if (res.success) {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: res.message });
        this.doLoadPlanitems();
      }
      else {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: res.message });
      }

    });
    this.new_data = false;
    this.edit_data = false;
    this.displayManage = false;

  }
  async doDeletePlanitems(data: PlanitemsModels) {
    await this.planitemsService.planitems_delete(data).then((res) => {
      if (res.success) {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: res.message });
        this.doLoadPlanitems()
      }
      else {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: res.message });
      }

    });
    this.new_data = false;
    this.edit_data = false;
    this.displayManage = false;

  }
   
  doUploadPlanitems() {
    const filename = "PLANitems_" + this.datePipe.transform(new Date(), 'yyyyMMddHHmm');
    const filetype = "xls";
    this.planitemsService.planitems_import(this.fileToUpload, filename, filetype).then((res) => {
      if (res.success) {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: res.message });
        this.doLoadPlanitems();
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
  getnameList(items_codes: string) {
    let result = this.items_list.find((obj: ItemsModel) => {
      return obj.item_code === items_codes;
    })
    var res1 = result?.item_name_th;
    var res2 = result?.item_name_en;
    return { th: res1, en: res2 };
  }

  doLoadMenu() {

    this.items = [
      {
        label: this.langs.get('new')[this.selectlang],
        icon: 'pi-plus',
        command: (event) => {
          if (this.accessData.accessdata_new) {
            this.itemsplans = new PlanitemsModels();
            this.checkitemslist();
            this.showManage();
            this.new_data = true;
            this.edit_data = false;
          } else {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Permistion' });
          }
        }
      }
      ,
      {
        label: this.title_template[this.initial_current.Language],
        icon: 'pi-download',
        command: (event) => {
          window.open('assets/OPRFileImport/(OPR)Import Payroll/(OPR)Import Payroll Planitems.xlsx', '_blank');
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
  reloadPage() {
    this.doLoadPlanitems()
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
          this.displayUpload = false;
          this.doUploadPlanitems()
        },
        reject: () => {
          this.displayUpload = false;
        }
      });
    } else {
      this.messageService.add({ severity: 'warn', summary: 'File', detail: "Please choose a file." });
    }
  }
  checkitemslist() {
    this.items_listselect = []
    let code: string[] = [];
    this.itemsplans.itemslists.forEach((itme) => {
      code.push(itme.item_code)
    })
    this.items_list.forEach((item) => {
      if (!code.includes(item.item_code)) {
        this.items_listselect.push(item)
      }
    })
  }
  close() {
    this.new_data = false
    this.itemsplans = new PlanitemsModels()
  }
  Save() {
    this.confirmationService.confirm({
      message: this.title_confirm_record[this.initial_current.Language],
      header: this.title_confirm[this.initial_current.Language],
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.doRecordPlanitems(this.itemsplans)
      },
      reject: () => {
      }
    });
  }
  Delete() {
    this.confirmationService.confirm({
      message: this.title_confirm_delete[this.initial_current.Language],
      header: this.title_confirm[this.initial_current.Language],
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.doDeletePlanitems(this.itemsplans)
      },
      reject: () => {
      }
    });
  }
  onRowSelect(event: any) {
    this.items_listselect = []
    this.checkitemslist();
    this.new_data = true
    this.edit_data = true;
    this.displayManage = true;

  }
  displayManage: boolean = false;
  position: string = "center";
  showManage() {
    this.displayManage = true
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

    XLSX.writeFile(wb, 'Export_Planitems.xlsx');

  }

}

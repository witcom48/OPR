

import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, NavigationExtras } from '@angular/router';
import { Table } from 'primeng/table';
import { MegaMenuItem, MenuItem } from 'primeng/api';
import { Router } from '@angular/router';

import { DatePipe } from '@angular/common';
import { ConfirmationService, ConfirmEventType, MessageService } from 'primeng/api';
import * as XLSX from 'xlsx';

import { AppConfig } from '../../../../config/config';
import { InitialCurrent } from '../../../../config/initial_current';
import { ProbusinessModel, ProtypeModel, ProslipModel, ProuniformModel } from '../../../../models/project/policy/pro_genaral';
import { ProgenaralService } from '../../../../services/project/pro_genaral.service';


import { RadiovalueModel } from '../../../../models/project/radio_value';
import { ProcostModel } from '../../../../models/project/policy/procost';
import { ProcostService } from '../../../../services/project/procost.service';
import { ProareaModel } from 'src/app/models/project/project_proarea';
import { ProgroupModel } from 'src/app/models/project/project_group';
import { AccessdataModel } from 'src/app/models/system/security/accessdata';

@Component({
  selector: 'app-pro-genaral',
  templateUrl: './pro-genaral.component.html',
  styleUrls: ['./pro-genaral.component.scss']
})
export class ProGenaralComponent implements OnInit {



  items: MenuItem[] = [];
  edit_data: boolean = false;
  new_data: boolean = false;
  displaymanage: boolean = false;
  page_type: string = "";


  probusiness: boolean = false;
  probusiness_list: ProbusinessModel[] = [];
  selectedProbusiness: ProbusinessModel = new ProbusinessModel();

  protype: boolean = false;
  protype_list: ProbusinessModel[] = [];
  selectedProtype: ProtypeModel = new ProtypeModel();

  prouniform: boolean = false;
  prouniform_list: ProuniformModel[] = [];
  selectedProuniform: ProuniformModel = new ProuniformModel();

  proslip: boolean = false;
  proslip_list: ProslipModel[] = [];
  selectedProslip: ProslipModel = new ProslipModel();

  procost: boolean = false;
  procost_list: ProcostModel[] = [];
  selectedProcost: ProcostModel = new ProcostModel();

  proarea: boolean = false;
  proarea_list: ProareaModel[] = [];
  selectedProarea: ProareaModel = new ProareaModel();

  progroup: boolean = false;
  progroup_list: ProgroupModel[] = [];
  selectedProgroup: ProgroupModel = new ProgroupModel();


  procosttype_list: RadiovalueModel[] = [];
  procostitem_list: RadiovalueModel[] = [];

  constructor(private genaralService: ProgenaralService,
    private procostService: ProcostService,
    private router: Router,
    private route: ActivatedRoute,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private datePipe: DatePipe
  ) { }

  ngOnInit(): void {


    this.route.queryParams.subscribe(params => {
      this.page_type = params['type'];

      // console.log(this.page_type);
    });


    //this.page_type = this.route.snapshot.queryParamMap.get('type') !== null ? this.route.snapshot.queryParamMap.get('type') : '';

    this.doGetInitialCurrent()

    this.doLoadProcostType();
    this.doLoadProcostItem();

    setTimeout(() => {
      this.doLoadPageType();
      this.doLoadLanguage()
      this.doLoadMenu()
      this.doLoadGenaral()
    }, 500);


  }

  public initial_current: InitialCurrent = new InitialCurrent();
  initialData2: InitialCurrent = new InitialCurrent();
  accessData: AccessdataModel = new AccessdataModel();
  doGetInitialCurrent() {
    this.initial_current = JSON.parse(localStorage.getItem(AppConfig.SESSIONInitial) || '{}');
    if (!this.initial_current) {
      this.router.navigateByUrl('login');
    }
    this.accessData = this.initialData2.dotGetPolmenu('PRO');
  }

  doLoadPageType() {

    this.probusiness = false
    this.protype = false
    this.prouniform = false
    this.proslip = false
    this.procost = false
    this.proarea = false
    this.progroup = false


    switch (this.page_type) {
      case "probusiness":
        this.probusiness = true
        break;
      case "protype":
        this.protype = true
        break;
      case "prouniform":
        this.prouniform = true
        break;
      case "proslip":
        this.proslip = true
        break;
      case "procost":
        this.procost = true
        break;
      case "proarea":
        this.proarea = true
        break;
      case "progroup":
        this.progroup = true
        break;
      default:
        // 
        break;
    }

  }

  title_page: string = "Geanral";
  title_new: string = "New";
  title_edit: string = "Edit";
  title_delete: string = "Delete";
  title_import: string = "Import";
  title_export: string = "Export";
  title_save: string = "Save";
  title_code: string = "Code";
  title_name_th: string = "Name (Thai)";
  title_name_en: string = "Name (Eng.)";

  title_type: string = "Type";
  title_auto: string = "Auto";
  title_itemcode: string = "Item";

  title_modified_by: string = "Edit by";
  title_modified_date: string = "Edit date";
  title_search: string = "Search";
  title_upload: string = "Upload";

  title_page_from: string = "Showing";
  title_page_to: string = "to";
  title_page_total: string = "of";
  title_page_record: string = "entries";

  title_confirm: string = "Are you sure?";
  title_confirm_record: string = "Confirm to record";
  title_confirm_delete: string = "Confirm to delete";
  title_confirm_yes: string = "Yes";
  title_confirm_no: string = "No";

  title_confirm_cancel: string = "You have cancelled";

  doLoadLanguage() {
    if (this.initial_current.Language == "TH") {
      this.title_page = "ข้อมูลทั่วไป";
      this.title_new = "เพิ่ม";
      this.title_edit = "แก้ไข";
      this.title_delete = "ลบ";
      this.title_import = "นำเข้า";
      this.title_export = "โอนออก";
      this.title_save = "บันทึก";
      this.title_code = "รหัส";
      this.title_name_th = "ชื่อไทย";
      this.title_name_en = "ชื่ออังกฤษ";
      this.title_modified_by = "ผู้ทำรายการ";
      this.title_modified_date = "วันที่ทำรายการ";
      this.title_search = "ค้นหา";
      this.title_upload = "อัพโหลด";

      this.title_page_from = "แสดง";
      this.title_page_to = "ถึง";
      this.title_page_total = "จาก";
      this.title_page_record = "รายการ";

      this.title_confirm = "ยืนยันการทำรายการ";
      this.title_confirm_record = "คุณต้องการบันทึกการทำรายการ";
      this.title_confirm_delete = "คุณต้องการลบรายการ";

      this.title_confirm_yes = "ใช่";
      this.title_confirm_no = "ยกเลิก";
      this.title_confirm_cancel = "คุณยกเลิกการทำรายการ";

    }
  }

  doLoadMenu() {

    this.items = [
      {
        label: this.title_new,
        icon: 'pi pi-fw pi-plus',
        command: (event) => {
          if (this.accessData.accessdata_new) {
            var ref = this.probusiness_list.length + 100
            this.selectedProbusiness = new ProbusinessModel();
            this.selectedProbusiness.probusiness_id = ref.toString()

            ref = this.protype_list.length + 100
            this.selectedProtype = new ProtypeModel();
            this.selectedProtype.protype_id = ref.toString()

            ref = this.prouniform_list.length + 100
            this.selectedProuniform = new ProuniformModel();
            this.selectedProuniform.prouniform_id = ref.toString()

            ref = this.proslip_list.length + 100
            this.selectedProslip = new ProslipModel();
            this.selectedProslip.proslip_id = ref.toString()

            ref = this.procost_list.length + 100
            this.selectedProcost = new ProcostModel();
            this.selectedProcost.procost_id = ref.toString()

            ref = this.proarea_list.length + 100
            this.selectedProarea = new ProareaModel();
            this.selectedProarea.proarea_id = ref.toString()

            ref = this.progroup_list.length + 100
            this.selectedProgroup = new ProgroupModel();
            this.selectedProgroup.progroup_id = ref.toString()


            this.new_data = true;
            this.edit_data = false;
            this.displaymanage = true;
          } else {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Permission denied' });
          }
        }
      }
      ,
      {
        label: this.title_import,
        icon: 'pi pi-fw pi-file-import',
        command: (event) => {
          this.showUpload()

        }
      }
      ,
      {
        label: this.title_export,
        icon: 'pi pi-fw pi-file-export',
        command: (event) => {
          this.exportAsExcel()

        }
      }
    ];
  }

  doLoadGenaral() {

    switch (this.page_type) {
      case "probusiness":
        this.genaralService.probusiness_get().then((res) => {
          this.probusiness_list = res;
        });
        break;
      case "protype":
        this.genaralService.protype_get().then((res) => {
          this.protype_list = res;
        });
        break;
      case "prouniform":
        this.genaralService.prouniform_get().then((res) => {
          this.prouniform_list = res;
        });
        break;
      case "proslip":
        this.genaralService.proslip_get().then((res) => {
          this.proslip_list = res;
        });
        break;
      case "procost":
        this.procostService.procost_get(this.initial_current.CompCode).then((res) => {
          this.procost_list = res;
        });
        break;
      case "proarea":
        this.genaralService.proarea_get().then((res) => {
          this.proarea_list = res;
        });
        break;
      case "progroup":
        this.genaralService.progroup_get().then((res) => {
          this.progroup_list = res;
        });
        break;
      default:
        // 
        break;

    }
  }

  confirmRecord() {
    this.confirmationService.confirm({
      message: this.title_confirm_record,
      header: this.title_confirm,
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.doRecordGenaral()
      },
      reject: () => {
        this.messageService.add({ severity: 'warn', summary: 'Cancelled', detail: this.title_confirm_cancel });
      },
      key: "myDialog"

    });
  }

  confirmDelete() {
    this.confirmationService.confirm({
      message: this.title_confirm_delete,
      header: this.title_confirm,
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.doDeleteGenaral()
      },
      reject: () => {
        this.messageService.add({ severity: 'warn', summary: 'Cancelled', detail: this.title_confirm_cancel });
      },
      key: "myDialog"
    });
  }

  doRecordGenaral() {
    switch (this.page_type) {
      case "probusiness":
        this.genaralService.probusiness_record(this.selectedProbusiness).then((res) => {
          let result = JSON.parse(res);
          if (result.success) {
            this.messageService.add({ severity: 'success', summary: 'Success', detail: result.message });
            this.doLoadGenaral()
          }
          else {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: result.message });
          }
        });
        break;
      case "protype":
        this.genaralService.protype_record(this.selectedProtype).then((res) => {
          let result = JSON.parse(res);
          if (result.success) {
            this.messageService.add({ severity: 'success', summary: 'Success', detail: result.message });
            this.doLoadGenaral()
          }
          else {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: result.message });
          }
        });
        break;
      case "prouniform":
        this.genaralService.prouniform_record(this.selectedProuniform).then((res) => {
          let result = JSON.parse(res);
          if (result.success) {
            this.messageService.add({ severity: 'success', summary: 'Success', detail: result.message });
            this.doLoadGenaral()
          }
          else {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: result.message });
          }
        });
        break;
      case "proslip":
        this.genaralService.proslip_record(this.selectedProslip).then((res) => {
          let result = JSON.parse(res);
          if (result.success) {
            this.messageService.add({ severity: 'success', summary: 'Success', detail: result.message });
            this.doLoadGenaral()
          }
          else {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: result.message });
          }
        });
        break;
      case "procost":

        this.selectedProcost.company_code = this.initial_current.CompCode
        this.selectedProcost.procost_type = this.selectedProcostType.value;
        this.selectedProcost.procost_itemcode = this.selectedProcostItem.value;

        this.procostService.procost_record(this.selectedProcost).then((res) => {
          let result = JSON.parse(res);
          if (result.success) {
            this.messageService.add({ severity: 'success', summary: 'Success', detail: result.message });
            this.doLoadGenaral()
          }
          else {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: result.message });
          }
        });
        break;
      case "proarea":
        this.genaralService.proarea_record(this.selectedProarea).then((res) => {
          let result = JSON.parse(res);
          if (result.success) {
            this.messageService.add({ severity: 'success', summary: 'Success', detail: result.message });
            this.doLoadGenaral()
          }
          else {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: result.message });
          }
        });
        break;

      case "progroup":
        this.genaralService.progroup_record(this.selectedProgroup).then((res) => {
          let result = JSON.parse(res);
          if (result.success) {
            this.messageService.add({ severity: 'success', summary: 'Success', detail: result.message });
            this.doLoadGenaral()
          }
          else {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: result.message });
          }
        });
        break;

      default:
        // 
        break;
    }
    this.close();
  }

  doDeleteGenaral() {

    switch (this.page_type) {
      case "probusiness":
        this.genaralService.probusiness_delete(this.selectedProbusiness).then((res) => {
          let result = JSON.parse(res);
          if (result.success) {
            this.messageService.add({ severity: 'success', summary: 'Success', detail: result.message });
            this.doReloadData();
          }
          else {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: result.message });
          }
        });
        break;
      case "protype":
        this.genaralService.protype_delete(this.selectedProtype).then((res) => {
          let result = JSON.parse(res);
          if (result.success) {
            this.messageService.add({ severity: 'success', summary: 'Success', detail: result.message });
            this.doReloadData();
          }
          else {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: result.message });
          }
        });
        break;
      case "prouniform":
        this.genaralService.prouniform_delete(this.selectedProuniform).then((res) => {
          let result = JSON.parse(res);
          if (result.success) {
            this.messageService.add({ severity: 'success', summary: 'Success', detail: result.message });
            this.doReloadData();
          }
          else {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: result.message });
          }
        });
        break;
      case "proslip":
        this.genaralService.proslip_delete(this.selectedProslip).then((res) => {
          let result = JSON.parse(res);
          if (result.success) {
            this.messageService.add({ severity: 'success', summary: 'Success', detail: result.message });
            this.doReloadData();
          }
          else {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: result.message });
          }
        });
        break;
      case "procost":
        this.procostService.procost_delete(this.selectedProcost).then((res) => {
          let result = JSON.parse(res);
          if (result.success) {
            this.messageService.add({ severity: 'success', summary: 'Success', detail: result.message });
            this.doReloadData();
          }
          else {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: result.message });
          }
        });
        break;
      case "proarea":
        this.genaralService.proarea_delete(this.selectedProarea).then((res) => {
          let result = JSON.parse(res);
          if (result.success) {
            this.messageService.add({ severity: 'success', summary: 'Success', detail: result.message });
            this.doReloadData();
          }
          else {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: result.message });
          }
        });
        break;

      case "progroup":
        this.genaralService.progroup_delete(this.selectedProgroup).then((res) => {
          let result = JSON.parse(res);
          if (result.success) {
            this.messageService.add({ severity: 'success', summary: 'Success', detail: result.message });
            this.doReloadData();
          }
          else {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: result.message });
          }
        });
        break;
      default:
        // 
        break;
    }

  }

  doReloadData() {
    this.doLoadGenaral();
    this.edit_data = false;
    this.new_data = false;
    this.displaymanage = false;
  }

  onRowSelectProbusiness(event: Event) {
    this.edit_data = true;
    this.new_data = false;
    this.displaymanage = true;
  }

  onRowSelectProtype(event: Event) {
    this.edit_data = true;
    this.new_data = false;
    this.displaymanage = true;
  }

  onRowSelectProuniform(event: Event) {
    this.edit_data = true;
    this.new_data = false;
    this.displaymanage = true;
  }

  onRowSelectProslip(event: Event) {
    this.edit_data = true;
    this.new_data = false;
    this.displaymanage = true;
  }

  onRowSelectProarea(event: Event) {
    this.edit_data = true;
    this.new_data = false;
    this.displaymanage = true;
  }
  onRowSelectProgroup(event: Event) {
    this.edit_data = true;
    this.new_data = false;
    this.displaymanage = true;
  }

  onRowSelectProcost(event: Event) {
    this.edit_data = true;
    this.new_data = false;
    this.displaymanage = true;

    this.doLoadSelectedProcostType(this.selectedProcost.procost_type)
    this.doLoadSelectedProcostItem(this.selectedProcost.procost_itemcode)

  }


  fileToUpload: File | any = null;
  handleFileInput(file: FileList) {
    this.fileToUpload = file.item(0);
  }

  doUploadGenaral() {

    this.displayUpload = false;

    const filename = this.page_type + this.datePipe.transform(new Date(), 'yyyyMMddHHmm');
    const filetype = "xls";

    switch (this.page_type) {
      case "probusiness":
        this.genaralService.probusiness_import(this.fileToUpload, filename, filetype).then((res) => {
          let result = JSON.parse(res);
          if (result.success) {
            this.messageService.add({ severity: 'success', summary: 'Success', detail: result.message });
            this.doReloadData();
          }
          else {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: result.message });
          }
        });
        break;
      case "protype":
        this.genaralService.protype_import(this.fileToUpload, filename, filetype).then((res) => {
          let result = JSON.parse(res);
          if (result.success) {
            this.messageService.add({ severity: 'success', summary: 'Success', detail: result.message });
            this.doReloadData();
          }
          else {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: result.message });
          }
        });
        break;
      case "prouniform":
        this.genaralService.prouniform_import(this.fileToUpload, filename, filetype).then((res) => {
          let result = JSON.parse(res);
          if (result.success) {
            this.messageService.add({ severity: 'success', summary: 'Success', detail: result.message });
            this.doReloadData();
          }
          else {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: result.message });
          }
        });
        break;
      case "proslip":
        this.genaralService.proslip_import(this.fileToUpload, filename, filetype).then((res) => {
          let result = JSON.parse(res);
          if (result.success) {
            this.messageService.add({ severity: 'success', summary: 'Success', detail: result.message });
            this.doReloadData();
          }
          else {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: result.message });
          }
        });
        break;
      case "procost":
        this.procostService.procost_import(this.fileToUpload, filename, filetype).then((res) => {
          let result = JSON.parse(res);
          if (result.success) {
            this.messageService.add({ severity: 'success', summary: 'Success', detail: result.message });
            this.doReloadData();
          }
          else {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: result.message });
          }
        });
        break;
      case "proarea":
        this.genaralService.proarea_import(this.fileToUpload, filename, filetype).then((res) => {
          let result = JSON.parse(res);
          if (result.success) {
            this.messageService.add({ severity: 'success', summary: 'Success', detail: result.message });
            this.doReloadData();
          }
          else {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: result.message });
          }
        });
        break;
      case "progroup":
        this.genaralService.progroup_import(this.fileToUpload, filename, filetype).then((res) => {
          let result = JSON.parse(res);
          if (result.success) {
            this.messageService.add({ severity: 'success', summary: 'Success', detail: result.message });
            this.doReloadData();
          }
          else {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: result.message });
          }
        });
        break;
      default:
        // 
        break;

    }
  }


  displayUpload: boolean = false;
  showUpload() {
    this.displayUpload = true;
  }

  @ViewChild('TABLE') table: ElementRef | any = null;

  exportAsExcel() {
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(this.table.nativeElement);//converts a DOM TABLE element to a worksheet
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    XLSX.writeFile(wb, 'Export_genaral.xlsx');

  }


  selectedProcostType: RadiovalueModel = new RadiovalueModel;
  doLoadProcostType() {

    if (this.initial_current.Language == "EN") {
      var tmp = new RadiovalueModel();
      tmp.value = "M";
      tmp.text = "Month";
      this.procosttype_list.push(tmp);

      tmp = new RadiovalueModel();
      tmp.value = "D";
      tmp.text = "Daily";
      this.procosttype_list.push(tmp);
    }
    else {
      var tmp = new RadiovalueModel();
      tmp.value = "M";
      tmp.text = "รายเดือน";

      this.procosttype_list.push(tmp);

      tmp = new RadiovalueModel();
      tmp.value = "D";
      tmp.text = "รายวัน";
      this.procosttype_list.push(tmp);
    }
  }

  doLoadSelectedProcostType(value: string) {
    for (let i = 0; i < this.procosttype_list.length; i++) {
      if (this.procosttype_list[i].value == value) {
        this.selectedProcostType = this.procosttype_list[i];
        break;
      }
    }
  }

  selectedProcostItem: RadiovalueModel = new RadiovalueModel;
  doLoadProcostItem() {

    if (this.initial_current.Language == "EN") {
      var tmp = new RadiovalueModel();
      tmp.value = "SA001";
      tmp.text = "Salary";
      this.procostitem_list.push(tmp);

      tmp = new RadiovalueModel();
      tmp.value = "OT";
      tmp.text = "Overtime";
      this.procostitem_list.push(tmp);
    }
    else {
      var tmp = new RadiovalueModel();
      tmp.value = "SA001";
      tmp.text = "เงินเดือน";

      this.procostitem_list.push(tmp);

      tmp = new RadiovalueModel();
      tmp.value = "OT";
      tmp.text = "ล่วงเวลา";
      this.procostitem_list.push(tmp);
    }

  }
  close() {
    this.new_data = false
    this.edit_data = false
    this.displaymanage = false;
    this.selectedProbusiness = new ProbusinessModel()
    this.selectedProtype = new ProtypeModel()
    this.selectedProuniform = new ProuniformModel()
    this.selectedProslip = new ProslipModel()
    this.selectedProcost = new ProcostModel()
    this.selectedProarea = new ProareaModel()
    this.selectedProgroup = new ProgroupModel()
  }

  doLoadSelectedProcostItem(value: string) {
    for (let i = 0; i < this.procostitem_list.length; i++) {
      if (this.procostitem_list[i].value == value) {
        this.selectedProcostItem = this.procostitem_list[i];
        break;
      }
    }
  }

}

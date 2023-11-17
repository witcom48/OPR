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
import { ProequipmenttypeModel } from 'src/app/models/project/project_proequipmenttype';
import { ResponsibleposModel } from 'src/app/models/project/responsiblepos';
import { ResponsibleareaModel } from 'src/app/models/project/responsiblearea';

@Component({
  selector: 'app-pro-genaral',
  templateUrl: './pro-genaral.component.html',
  styleUrls: ['./pro-genaral.component.scss']
})
export class ProGenaralComponent implements OnInit {

  home: any;
  itemslike: MenuItem[] = [];

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
  ///
  proequipmenttype: boolean = false;
  proequipmenttype_list: ProequipmenttypeModel[] = [];
  selectedProequipmenttype: ProequipmenttypeModel = new ProequipmenttypeModel();
  ////
  progroup: boolean = false;
  progroup_list: ProgroupModel[] = [];
  selectedProgroup: ProgroupModel = new ProgroupModel();
  ///
  responsiblepos: boolean = false;
  responsiblepos_list: ResponsibleposModel[] = [];
  selectedResponsiblepos: ResponsibleposModel = new ResponsibleposModel();

  responsiblearea: boolean = false;
  responsiblearea_list: ResponsibleareaModel[] = [];
  selectedResponsiblearea: ResponsibleareaModel = new ResponsibleareaModel();
  ////

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

    });


    //this.page_type = this.route.snapshot.queryParamMap.get('type') !== null ? this.route.snapshot.queryParamMap.get('type') : '';

    this.doGetInitialCurrent()

    this.doLoadProcostType();
    this.doLoadProcostItem();

    setTimeout(() => {
      this.doLoadPageType();
      this.doLoadLanguage();
      this.doLoadMenu()
      this.doLoadGenaral()
    }, 500);
  }
  reloadPage() {
    this.doLoadGenaral()

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
    this.proequipmenttype = false

    this.responsiblepos = false
    this.responsiblearea = false



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

      case "proequipmenttype":
        this.proequipmenttype = true
        break;

      case "responsiblepos":
        this.responsiblepos = true
        break;

      case "responsiblearea":
        this.responsiblearea = true
        break;

      default:
        // 
        break;
    }

  }

  title_project: { [key: string]: string } = { EN: "Policy", TH: "การกำหนดรูปแบบ" };
  title_cost: { [key: string]: string } = { EN: "Cost", TH: "ต้นทุน" }
  title_project_protype: { [key: string]: string } = { EN: "Job Type ", TH: "ประเภทงาน" }
  title_project_probusiness: { [key: string]: string } = { EN: "Business Type", TH: "ประเภทธุรกิจ" }
  title_jobmain_poluniform: { [key: string]: string } = { EN: "Uniform", TH: "ชุดฟอร์ม" }
  title_project_proarea: { [key: string]: string } = { EN: "Area ", TH: "พื้นที่" }
  title_project_proroup: { [key: string]: string } = { EN: "Group ", TH: "กลุ่ม" }
  title_equipment_type: { [key: string]: string } = { EN: "Equipment Type", TH: "รูปแบบการเบิก" }
  title_shift: { [key: string]: string } = { EN: "Shift", TH: "กะการทำงาน" }
  title_general: { [key: string]: string } = { EN: "Genaral", TH: "ทั่วไป" };
  title_slipform: { [key: string]: string } = { EN: "Slip form", TH: "ฟอร์มสลิป" };
  title_template: { [key: string]: string } = { EN: "Template ", TH: "เทมเพลต" }
  title_project_responsiblepos: { [key: string]: string } = { EN: "Responsiblepos ", TH: "ตำแหน่ง" }
  title_project_responsiblearea: { [key: string]: string } = { EN: "Responsiblearea ", TH: "เขต" }

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
  title_system_project: string = "Project";
  doLoadLanguage() {
    if (this.initial_current.Language == "TH") {
      this.title_page = "ข้อมูลทั่วไป";
      this.title_new = "เพิ่ม";
      this.title_edit = "แก้ไข";
      this.title_delete = "ลบ";
      this.title_import = "นำเข้า";
      this.title_export = "ส่งออกไฟล์";
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

      this.title_system_project = "โครงการ";
      this.title_type = "ประเภทการจ่าย";
      this.title_itemcode = "เงินได้";
      this.title_auto = "อัตโนมัติ";

    }
  }

  doLoadMenu() {
    switch (this.page_type) {
      case "procost":
        this.itemslike = [{ label: this.title_project[this.initial_current.Language], routerLink: "/project/policy" },
        { label: this.title_cost[this.initial_current.Language], styleClass: 'activelike' }];
        this.home = { icon: 'pi pi-home', routerLink: '/' };
        break;

      case "protype":
        this.itemslike = [{ label: this.title_project[this.initial_current.Language], routerLink: "/project/policy" },
        { label: this.title_project_protype[this.initial_current.Language], styleClass: 'activelike' }];
        this.home = { icon: 'pi pi-home', routerLink: '/' };
        break;

      case "prouniform":
        this.itemslike = [{ label: this.title_project[this.initial_current.Language], routerLink: "/project/policy" },
        { label: this.title_jobmain_poluniform[this.initial_current.Language], styleClass: 'activelike' }];
        this.home = { icon: 'pi pi-home', routerLink: '/' };
        break;

      case "proslip":
        this.itemslike = [{ label: this.title_project[this.initial_current.Language], routerLink: "/project/policy" },
        { label: this.title_slipform[this.initial_current.Language], styleClass: 'activelike' }];
        this.home = { icon: 'pi pi-home', routerLink: '/' };
        break;

      case "proarea":
        this.itemslike = [{ label: this.title_project[this.initial_current.Language], routerLink: "/project/policy" },
        { label: this.title_project_proarea[this.initial_current.Language], styleClass: 'activelike' }];
        this.home = { icon: 'pi pi-home', routerLink: '/' };
        break;

      case "progroup":
        this.itemslike = [{ label: this.title_project[this.initial_current.Language], routerLink: "/project/policy" },
        { label: this.title_project_proroup[this.initial_current.Language], styleClass: 'activelike' }];
        this.home = { icon: 'pi pi-home', routerLink: '/' };
        break;

      case "proequipmenttype":
        this.itemslike = [{ label: this.title_project[this.initial_current.Language], routerLink: "/project/policy" },
        { label: this.title_equipment_type[this.initial_current.Language], styleClass: 'activelike' }];
        this.home = { icon: 'pi pi-home', routerLink: '/' };
        break;

      case "probusiness":
        this.itemslike = [{ label: this.title_project[this.initial_current.Language], routerLink: "/project/policy" },
        { label: this.title_project_probusiness[this.initial_current.Language], styleClass: 'activelike' }];
        this.home = { icon: 'pi pi-home', routerLink: '/' };
        break;

      case "responsiblepos":
        this.itemslike = [{ label: this.title_project[this.initial_current.Language], routerLink: "/project/policy" },
        { label: this.title_project_responsiblepos[this.initial_current.Language], styleClass: 'activelike' }];
        this.home = { icon: 'pi pi-home', routerLink: '/' };
        break;

      case "responsiblearea":
        this.itemslike = [{ label: this.title_project[this.initial_current.Language], routerLink: "/project/policy" },
        { label: this.title_project_responsiblearea[this.initial_current.Language], styleClass: 'activelike' }];
        this.home = { icon: 'pi pi-home', routerLink: '/' };
        break;

    }


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

            ///
            ref = this.proequipmenttype_list.length + 100
            this.selectedProequipmenttype = new ProequipmenttypeModel();
            this.selectedProequipmenttype.proequipmenttype_id = ref.toString()

            ///
            ref = this.responsiblepos_list.length + 100
            this.selectedResponsiblepos = new ResponsibleposModel();
            this.selectedResponsiblepos.responsiblepos_id = ref.toString()

            ref = this.responsiblearea_list.length + 100
            this.selectedResponsiblearea = new ResponsibleareaModel();
            this.selectedResponsiblearea.responsiblearea_id = ref.toString()

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
        label: this.title_template[this.initial_current.Language],
        icon: 'pi-download',
        command: (event) => {
          switch (this.page_type) {
            case "probusiness":
              this.probusiness = true
              var ref = this.probusiness_list.length + 100
              window.open('assets/OPRFileImport/(OPR)Import Project/(OPR)Import Project Probusiness.xlsx', '_blank');
              break;

            case "protype":
              this.protype = true
              ref = this.protype_list.length + 100
              window.open('assets/OPRFileImport/(OPR)Import Project/(OPR)Import Project Protype.xlsx', '_blank');
              break;


            case "prouniform":
              this.prouniform = true
              ref = this.prouniform_list.length + 100

              window.open('assets/OPRFileImport/(OPR)Import Project/(OPR)Import Project Prouniform.xlsx', '_blank');

              break;
            case "proslip":
              this.proslip = true
              ref = this.proslip_list.length + 100

              window.open('assets/OPRFileImport/(OPR)Import Project/(OPR)Import Project Proslip.xlsx', '_blank');

              break;
            case "procost":
              this.procost = true
              ref = this.procost_list.length + 100

              window.open('assets/OPRFileImport/(OPR)Import Project/(OPR)Import Project Procost.xlsx', '_blank');

              break;
            case "proarea":
              this.proarea = true
              ref = this.proarea_list.length + 100

              window.open('assets/OPRFileImport/(OPR)Import Project/(OPR)Import Project Proarea.xlsx', '_blank');

              break;
            case "progroup":
              this.progroup = true
              ref = this.progroup_list.length + 100

              window.open('assets/OPRFileImport/(OPR)Import Project/(OPR)Import Project Progroup.xlsx', '_blank');

              break;

            //
            case "proequipmenttype":
              this.proequipmenttype = true
              ref = this.proequipmenttype_list.length + 100

              window.open('assets/OPRFileImport/(OPR)Import Project/(OPR)Import Project Proequipmenttype.xlsx', '_blank');

              break;
            //

            case "responsiblepos":
              this.responsiblepos = true
              ref = this.responsiblepos_list.length + 100

              window.open('assets/OPRFileImport/(OPR)Import Project/(OPR)Import Project Responsiblepos.xlsx', '_blank');

              break;

            case "responsiblearea":
              this.responsiblearea = true
              ref = this.responsiblearea_list.length + 100

              window.open('assets/OPRFileImport/(OPR)Import Project/(OPR)Import Project Responsiblearea.xlsx', '_blank');

              break;



            default:
              // 
              break;
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
        var tmp = new ProbusinessModel();
        this.genaralService.probusiness_get(tmp).then((res) => {
          this.probusiness_list = res;
        });
        break;
      case "protype":
        var tmp2 = new ProtypeModel();
        this.genaralService.protype_get(tmp2).then((res) => {
          this.protype_list = res;
        });
        break;
      case "prouniform":
        var tmp3 = new ProuniformModel();
        this.genaralService.prouniform_get(tmp3).then((res) => {
          this.prouniform_list = res;
        });
        break;
      case "proslip":
        var tmp4 = new ProslipModel();

        this.genaralService.proslip_get(tmp4).then((res) => {
          this.proslip_list = res;
        });
        break;
      case "procost":
        var tmp8 = new ProcostModel();

        this.procostService.procost_get(tmp8).then((res) => {
          this.procost_list = res;
          console.log(res, 'cost')
        });
        break;
      case "proarea":
        var tmp5 = new ProareaModel();

        this.genaralService.proarea_get(tmp5).then((res) => {
          this.proarea_list = res;
        });
        break;
      case "progroup":
        var tmp6 = new ProgroupModel();

        this.genaralService.progroup_get(tmp6).then((res) => {
          this.progroup_list = res;

        });
        break;
      //
      case "proequipmenttype":
        var tmp7 = new ProequipmenttypeModel();

        this.genaralService.proequipmenttype_get(tmp7).then((res) => {
          this.proequipmenttype_list = res;

        });
        break;
      //

      case "responsiblepos":
        var tmp9 = new ResponsibleposModel();

        this.genaralService.MTResponsiblepos_get(tmp9).then((res) => {
          this.responsiblepos_list = res;

        });
        break;

      case "responsiblearea":
        var tmp10 = new ResponsibleareaModel();

        this.genaralService.MTResponsiblearea_get(tmp10).then((res) => {
          this.responsiblearea_list = res;

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

      case "proequipmenttype":
        this.genaralService.proequipmenttype_record(this.selectedProequipmenttype).then((res) => {
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

      case "responsiblepos":
        this.genaralService.MTResponsiblepos_record(this.selectedResponsiblepos).then((res) => {
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

      case "responsiblearea":
        this.genaralService.MTResponsiblearea_record(this.selectedResponsiblearea).then((res) => {
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

  // Delete
  Delete_Progroup(data: ProgroupModel) {
    this.confirmationService.confirm({
      message: this.title_confirm_delete,
      header: this.title_confirm,
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.genaralService.progroup_delete(data).then((res) => {
          let result = JSON.parse(res);
          if (result.success) {
            this.messageService.add({ severity: 'success', summary: 'Success', detail: result.message });
            this.doReloadData();
          }
          else {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: result.message });
          }
        });
      },
      reject: () => {
        this.messageService.add({ severity: 'warn', summary: 'Cancelled', detail: this.title_confirm_cancel });
      },
      key: "myDialog"
    });
  }

  Delete_protype(data: ProtypeModel) {
    this.confirmationService.confirm({
      message: this.title_confirm_delete,
      header: this.title_confirm,
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.genaralService.protype_delete(data).then((res) => {
          let result = JSON.parse(res);
          if (result.success) {
            this.messageService.add({ severity: 'success', summary: 'Success', detail: result.message });
            this.doReloadData();
          }
          else {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: result.message });
          }
        });
      },
      reject: () => {
        this.messageService.add({ severity: 'warn', summary: 'Cancelled', detail: this.title_confirm_cancel });
      },
      key: "myDialog"
    });
  }

  Delete_prouniform(data: ProuniformModel) {
    this.confirmationService.confirm({
      message: this.title_confirm_delete,
      header: this.title_confirm,
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.genaralService.prouniform_delete(data).then((res) => {
          let result = JSON.parse(res);
          if (result.success) {
            this.messageService.add({ severity: 'success', summary: 'Success', detail: result.message });
            this.doReloadData();
          }
          else {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: result.message });
          }
        });
      },
      reject: () => {
        this.messageService.add({ severity: 'warn', summary: 'Cancelled', detail: this.title_confirm_cancel });
      },
      key: "myDialog"
    });
  }

  Delete_probusiness(data: ProbusinessModel) {
    this.confirmationService.confirm({
      message: this.title_confirm_delete,
      header: this.title_confirm,
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.genaralService.probusiness_delete(data).then((res) => {
          let result = JSON.parse(res);
          if (result.success) {
            this.messageService.add({ severity: 'success', summary: 'Success', detail: result.message });
            this.doReloadData();
          }
          else {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: result.message });
          }
        });
      },
      reject: () => {
        this.messageService.add({ severity: 'warn', summary: 'Cancelled', detail: this.title_confirm_cancel });
      },
      key: "myDialog"
    });
  }
  Delete_proslip(data: ProslipModel) {
    this.confirmationService.confirm({
      message: this.title_confirm_delete,
      header: this.title_confirm,
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.genaralService.proslip_delete(data).then((res) => {
          let result = JSON.parse(res);
          if (result.success) {
            this.messageService.add({ severity: 'success', summary: 'Success', detail: result.message });
            this.doReloadData();
          }
          else {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: result.message });
          }
        });
      },
      reject: () => {
        this.messageService.add({ severity: 'warn', summary: 'Cancelled', detail: this.title_confirm_cancel });
      },
      key: "myDialog"
    });
  }
  Delete_procost(data: ProcostModel) {
    this.confirmationService.confirm({
      message: this.title_confirm_delete,
      header: this.title_confirm,
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.procostService.procost_delete(data).then((res) => {
          let result = JSON.parse(res);
          if (result.success) {
            this.messageService.add({ severity: 'success', summary: 'Success', detail: result.message });
            this.doReloadData();
          }
          else {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: result.message });
          }
        });
      },
      reject: () => {
        this.messageService.add({ severity: 'warn', summary: 'Cancelled', detail: this.title_confirm_cancel });
      },
      key: "myDialog"
    });
  }

  Delete_proarea(data: ProareaModel) {
    this.confirmationService.confirm({
      message: this.title_confirm_delete,
      header: this.title_confirm,
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.genaralService.proarea_delete(data).then((res) => {
          let result = JSON.parse(res);
          if (result.success) {
            this.messageService.add({ severity: 'success', summary: 'Success', detail: result.message });
            this.doReloadData();
          }
          else {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: result.message });
          }
        });
      },
      reject: () => {
        this.messageService.add({ severity: 'warn', summary: 'Cancelled', detail: this.title_confirm_cancel });
      },
      key: "myDialog"
    });
  }
  Delete_proequipmenttype(data: ProequipmenttypeModel) {
    this.confirmationService.confirm({
      message: this.title_confirm_delete,
      header: this.title_confirm,
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.genaralService.proequipmenttype_delete(data).then((res) => {
          let result = JSON.parse(res);
          if (result.success) {
            this.messageService.add({ severity: 'success', summary: 'Success', detail: result.message });
            this.doReloadData();
          }
          else {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: result.message });
          }
        });
      },
      reject: () => {
        this.messageService.add({ severity: 'warn', summary: 'Cancelled', detail: this.title_confirm_cancel });
      },
      key: "myDialog"
    });
  }

  Delete_MTResponsiblepos(data: ResponsibleposModel) {
    this.confirmationService.confirm({
      message: this.title_confirm_delete,
      header: this.title_confirm,
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.genaralService.MTResponsiblepos_delete(data).then((res) => {
          let result = JSON.parse(res);
          if (result.success) {
            this.messageService.add({ severity: 'success', summary: 'Success', detail: result.message });
            this.doReloadData();
          }
          else {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: result.message });
          }
        });
      },
      reject: () => {
        this.messageService.add({ severity: 'warn', summary: 'Cancelled', detail: this.title_confirm_cancel });
      },
      key: "myDialog"
    });
  }

  Delete_MTResponsiblearea(data: ResponsibleareaModel) {
    this.confirmationService.confirm({
      message: this.title_confirm_delete,
      header: this.title_confirm,
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.genaralService.MTResponsiblearea_delete(data).then((res) => {
          let result = JSON.parse(res);
          if (result.success) {
            this.messageService.add({ severity: 'success', summary: 'Success', detail: result.message });
            this.doReloadData();
          }
          else {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: result.message });
          }
        });
      },
      reject: () => {
        this.messageService.add({ severity: 'warn', summary: 'Cancelled', detail: this.title_confirm_cancel });
      },
      key: "myDialog"
    });
  }
  // ลบ

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

      //
      case "proequipmenttype":
        this.genaralService.proequipmenttype_delete(this.selectedProequipmenttype).then((res) => {
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
      //

      case "responsiblepos":
        this.genaralService.MTResponsiblepos_delete(this.selectedResponsiblepos).then((res) => {
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

      case "responsiblearea":
        this.genaralService.MTResponsiblearea_delete(this.selectedResponsiblearea).then((res) => {
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

  //
  onRowSelectProequipmenttype(event: Event) {
    this.edit_data = true;
    this.new_data = false;
    this.displaymanage = true;
  }
  //

  onRowSelectResponsiblepos(event: Event) {
    this.edit_data = true;
    this.new_data = false;
    this.displaymanage = true;
  }

  onRowSelectResponsiblearea(event: Event) {
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

      //
      case "proequipmenttype":
        this.genaralService.proequipmenttype_import(this.fileToUpload, filename, filetype).then((res) => {
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
      //

      case "responsiblepos":
        this.genaralService.MTResponsiblepos_import(this.fileToUpload, filename, filetype).then((res) => {
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

      case "responsiblearea":
        this.genaralService.MTResponsiblearea_import(this.fileToUpload, filename, filetype).then((res) => {
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
    this.selectedProequipmenttype = new ProequipmenttypeModel()
    this.selectedResponsiblepos = new ResponsibleposModel()
    this.selectedResponsiblearea = new ResponsibleareaModel()


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

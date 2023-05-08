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
import { CardtypeModel } from 'src/app/models/system/policy/cardtype';
import { CardtypeService } from 'src/app/services/system/policy/cardtype.service';
import { TRPolcodeModel } from 'src/app/models/system/policy/tr_polcode';
import { CodePolcodeService } from 'src/app/services/system/manage1/code-polcode.service';
import { CodestructureModel } from 'src/app/models/system/policy/codestructure';
import { CodestructureService } from 'src/app/services/system/manage1/codestructure.service';
@Component({
    selector: 'app-emp-id',
    templateUrl: './emp-id.component.html',
    styleUrls: ['./emp-id.component.scss'],
})
export class EmpIDComponent implements OnInit {
    items: MenuItem[] = [];
    edit_data: boolean = false;
    new_data: boolean = false;

    TRPolcode_list : TRPolcodeModel[] = [];
    selectedTRPolcode : TRPolcodeModel = new TRPolcodeModel();

    constructor(
      private codePolcodeService: CodePolcodeService,
      private codestructureService: CodestructureService,

      
      private router:Router,
      private messageService: MessageService,
      private confirmationService: ConfirmationService,
      private datePipe: DatePipe
    ) { }

    ngOnInit(): void {
      this.doGetInitialCurrent()

      setTimeout(() => {
        this.doLoadLanguage()
        this.doLoadMenu()
        this.doLoadTRPolcode()
         // Dropdown
        this.doLoadCodestructureList();
      }, 500);
    }

    public initial_current:InitialCurrent = new InitialCurrent();
    doGetInitialCurrent(){
      this.initial_current = JSON.parse(localStorage.getItem(AppConfig.SESSIONInitial) || '{}');
      if (!this.initial_current) {
        this.router.navigateByUrl('');
      }
    }

    title_page:string = "Structure code";
    title_new:string = "New";
    title_edit:string = "Edit";
    title_delete:string = "Delete";
    title_import:string = "Import";
    title_export:string = "Export";
    title_save:string = "Save";
    title_code:string = "Code";
    title_name_th:string = "Description(Thai)";
    title_name_en:string = "Description(Eng)";
    title_detail:string = "Detail";
    title_modified_by:string = "Edit by";
    title_modified_date:string = "Edit date";
    title_search:string = "Search";
    title_upload:string = "Upload";

    title_page_from:string = "Showing";
    title_page_to:string = "to";
    title_page_total:string = "of";
    title_page_record:string = "entries";

    title_confirm:string = "Are you sure?";
    title_confirm_record:string = "Confirm to record";
    title_confirm_delete:string = "Confirm to delete";
    title_confirm_yes:string = "Yes";
    title_confirm_no:string = "No";

    title_confirm_cancel:string = "You have cancelled";

    doLoadLanguage(){
      if(this.initial_current.Language == "TH"){
        this.title_page = "รูปแบบรหัส";
        this.title_new = "เพิ่ม";
        this.title_edit = "แก้ไข";
        this.title_delete = "ลบ";
        this.title_import = "นำเข้า";
        this.title_export = "โอนออก";
        this.title_save = "บันทึก";
        this.title_code = "รหัส";
        this.title_name_th = "รายละเอียด(Thai)";
        this.title_name_en = "รายละเอียด(Eng)";
        this.title_detail = "รายละเอียด";
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

    doLoadMenu(){

      this.items = [
        {
          label:this.title_new,
          icon:'pi pi-fw pi-plus',
          command: (event) => {
            this.selectedTRPolcode = new TRPolcodeModel();
            this.new_data= true;
            this.edit_data= false;
          }
        }
        ,
        {
            label:this.title_import,
            icon:'pi pi-fw pi-file-import',
            command: (event) => {
              this.showUpload()

            }
        }
        ,
        {
            label:this.title_export,
            icon:'pi pi-fw pi-file-export',
            command: (event) => {
              this.exportAsExcel()

            }
        }
      ];
    }
// get data dropdown
    codestructureList: CodestructureModel[] = [];
    doLoadCodestructureList() {
        this.codestructureService.codestructure_get().then((res) => {
            this.codestructureList = res;
        });
    }
    doLoadTRPolcode(){
      this.codePolcodeService.TRPolcode_get().then((res) => {
       this.TRPolcode_list = res;
      });
    }

    confirmRecord() {
      this.confirmationService.confirm({
          message: this.title_confirm_record,
          header: this.title_confirm,
          icon: 'pi pi-exclamation-triangle',
          accept: () => {
            this.doRecordTRPolcode()
          },
          reject: () => {
            this.messageService.add({severity:'warn', summary:'Cancelled', detail:this.title_confirm_cancel});
          }
      });
    }

    doRecordTRPolcode(){
      this.codePolcodeService.TRPolcode_record(this.selectedTRPolcode).then((res) => {
       console.log(res)
       let result = JSON.parse(res);

       if(result.success){
        this.messageService.add({severity:'success', summary: 'Success', detail: result.message});
        this.doLoadTRPolcode()
       }
       else{
        this.messageService.add({severity:'error', summary: 'Error', detail: result.message});
       }

      });
    }

    confirmDelete() {
      this.confirmationService.confirm({
          message: this.title_confirm_delete,
          header: this.title_confirm,
          icon: 'pi pi-exclamation-triangle',
          accept: () => {
            this.doDeleteTRPolcode()
          },
          reject: () => {
            this.messageService.add({severity:'warn', summary:'Cancelled', detail:this.title_confirm_cancel});
          }
      });
    }

    doDeleteTRPolcode(){
      this.codePolcodeService.TRPolcode_delete(this.selectedTRPolcode).then((res) => {
       console.log(res)
       let result = JSON.parse(res);

       if(result.success){
        this.messageService.add({severity:'success', summary: 'Success', detail: result.message});
        this.doLoadTRPolcode();
        this.edit_data= false;
        this.new_data= false;
       }
       else{
        this.messageService.add({severity:'error', summary: 'Error', detail: result.message});
       }

      });
    }

    close(){
      this.new_data=false
      this.selectedTRPolcode = new TRPolcodeModel()
    }
    onRowSelectTRPolcode(event: any) {
      this.edit_data= true;
      this.new_data= true;
    }

    fileToUpload: File | any = null;
    handleFileInput(file: FileList) {
      this.fileToUpload=file.item(0);
    }

    doUploadTRPolcode(){

      if (this.fileToUpload) {
        this.confirmationService.confirm({
          message: "Confirm Upload file : " + this.fileToUpload.name,
          header: "Import File",
          icon: 'pi pi-exclamation-triangle',
          accept: () => {
            const filename = "TRPolcode_" + this.datePipe.transform(new Date(), 'yyyyMMddHHmm');
            const filetype = "xls";

            this.codePolcodeService.TRPolcode_import(this.fileToUpload, filename, filetype).then((res) => {
              console.log(res)
              let result = JSON.parse(res);

              if (result.success) {
                this.messageService.add({ severity: 'success', summary: 'Success', detail: result.message });
                this.doLoadTRPolcode();
                this.edit_data = false;
                this.new_data = false;
              }
              else {
                this.messageService.add({ severity: 'error', summary: 'Error', detail: result.message });
              }
            });
            this.displayUpload = false;
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

    displayUpload: boolean = false;
    showUpload() {
      this.displayUpload = true;
    }

    @ViewChild('TABLE') table: ElementRef | any = null;

    exportAsExcel()
    {
      const ws: XLSX.WorkSheet=XLSX.utils.table_to_sheet(this.table.nativeElement);//converts a DOM TABLE element to a worksheet
      const wb: XLSX.WorkBook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

      XLSX.writeFile(wb, 'Export_TRPolcode.xlsx');

    }

  }
   


//     manage_title: string = '';
//     company_code: string = '';
//     polcode_id: string = '';
//     id: string = '';

//     toolbar_menu: MenuItem[] = [];
//     items: MenuItem[] = [];
//     items_tab: MenuItem[] = [];
//     //MTPolcode
//     MTPolcode_list: MTPolcodeModel[] = [];
//     selectedMTPolcode: MTPolcodeModel = new MTPolcodeModel();

//     Codestructure_list: CodestructureModel[] = [];
//     selectedCodestructure: CodestructureModel = new CodestructureModel();

//     //menu
//     menu_TRPolcode: MenuItem[] = [];
//     edit_TRPolcode: boolean = false;
//     new_TRPolcode: boolean = false;

//     displayManage: boolean = false;

//     constructor(
//         private router: Router,
//         private route: ActivatedRoute,
//         private messageService: MessageService,
//         private confirmationService: ConfirmationService,
//         private datePipe: DatePipe,
//         private empdetailService: EmpDetailService,

//         //polcodeService
//         private polcodeService: PolcodeService,
//         private codestructureService: CodestructureService,



//     ) {}

//     ngOnInit(): void {
//         this.route.queryParams.subscribe((params) => {
//             // this.company_code = params['polcodeService'];
//             console.log(this.company_code);
//         });

//         this.doGetInitialCurrent();

//         // Dropdown
//         this.doLoadCodestructureList();

//         setTimeout(() => {
//             this.doLoadMenu();
//         }, 100);

//         setTimeout(() => {
//             if (this.company_code != '') {
//                 this.doLoadMTPolcode();

//             }
//         }, 400);
//     }

//     public initial_current: InitialCurrent = new InitialCurrent();
//     doGetInitialCurrent() {
//         this.initial_current = JSON.parse(
//             localStorage.getItem(AppConfig.SESSIONInitial) || '{}'
//         );
//         if (!this.initial_current) {
//             this.router.navigateByUrl('');
//         }
//     }

//     title_page: string = 'empid';
//     title_new: string = 'New';
//     title_edit: string = 'Edit';
//     title_delete: string = 'Delete';
//     title_import: string = 'Import';
//     title_export: string = 'Export';
//     title_save: string = 'Save';
//     title_code: string = 'Code';
//     title_summit: string = 'Summit';
//     title_cancel: string = 'Cancel';
//     title_genaral: string = 'Genaral';
//     title_fname_th: string = 'First Name (Thai)';
//     title_lname_th: string = 'Last Name (Thai)';
//     title_fname_en: string = 'First Name (Eng.)';
//     title_lname_en: string = 'Last Name (Eng.)';
//     title_initial: string = 'Initial';
//     title_modified_by: string = 'Edit by';
//     title_modified_date: string = 'Edit date';
//     title_search: string = 'Search';
//     title_upload: string = 'Upload';
//     title_page_from: string = 'Showing';
//     title_page_to: string = 'to';
//     title_page_total: string = 'of';
//     title_page_record: string = 'entries';
//     title_confirm: string = 'Are you sure?';
//     title_confirm_record: string = 'Confirm to record';
//     title_confirm_delete: string = 'Confirm to delete';
//     title_confirm_yes: string = 'Yes';
//     title_confirm_no: string = 'No';
//     title_confirm_cancel: string = 'You have cancelled';

//     doLoadLanguage() {
//         if (this.initial_current.Language == 'TH') {
//             this.title_page = 'ข้อมูลสถานที่ปฎิบัติงาน';
//             this.title_new = 'เพิ่ม';
//             this.title_edit = 'แก้ไข';
//             this.title_delete = 'ลบ';
//             this.title_import = 'นำเข้า';
//             this.title_export = 'โอนออก';
//             this.title_save = 'บันทึก';
//             this.title_summit = 'บันทึก';
//             this.title_cancel = 'ยกเลิก';
//             this.title_genaral = 'ข้อมูลทั่วไป';
//             this.title_code = 'รหัสพนักงาน';
//             this.title_fname_th = 'ชื่อจริง (ไทย)';
//             this.title_lname_th = 'นามสกุล (ไทย)';
//             this.title_fname_en = 'ชื่อจริง (อังกฤษ)';
//             this.title_lname_en = 'นามสกุล (อังกฤษ)';
//             this.title_modified_by = 'ผู้ทำรายการ';
//             this.title_modified_date = 'วันที่ทำรายการ';
//             this.title_search = 'ค้นหา';
//             this.title_upload = 'อัพโหลด';
//             this.title_page_from = 'แสดง';
//             this.title_page_to = 'ถึง';
//             this.title_page_total = 'จาก';
//             this.title_page_record = 'รายการ';
//             this.title_confirm = 'ยืนยันการทำรายการ';
//             this.title_confirm_record = 'คุณต้องการบันทึกการทำรายการ';
//             this.title_confirm_delete = 'คุณต้องการลบรายการ';
//             this.title_confirm_yes = 'ใช่';
//             this.title_confirm_no = 'ยกเลิก';
//             this.title_confirm_cancel = 'คุณยกเลิกการทำรายการ';
//         }
//     }

//     doLoadMenu() {
//         //menumain
//         this.toolbar_menu = [
//             {
//                 label: 'Back',
//                 icon: 'pi-arrow-left',
//                 command: (event) => {
//                     this.router.navigateByUrl('system/sys-manage');
//                 },
//             },
//             {
//                 label: 'Save',
//                 icon: 'pi pi-fw pi-save',
//                 command: (event) => {
//                     console.log('Save');
//                     this.confirmRecord();
//                 },
//             },
//         ];

//         //menu TRPolcode
//         this.menu_TRPolcode = [
//             {
//                 label: 'New',
//                 icon: 'pi pi-fw pi-plus',
//                 command: (event) => {
//                     this.clearManage();
//                     this.new_TRPolcode = true;
//                     var ref = this.TRPolcodeList.length + 100;
//                     this.selectedTRPolcode = new TRPolcodeModel();
//                     this.selectedTRPolcode.polcode_id = ref.toString();
//                     this.showManage();
//                 },
//             },
//             {
//                 label: 'Edit',
//                 icon: 'pi pi-fw pi-pencil',
//                 command: (event) => {
//                     this.clearManage();
//                     if (this.selectedTRPolcode != null) {
//                         this.edit_TRPolcode = true;
//                         this.showManage();
//                     }
//                 },
//             },
//             {
//                 label: 'Delete',
//                 icon: 'pi pi-fw pi-trash',
//                 command: (event) => {
//                     if (this.selectedTRPolcode != null) {
//                         this.polItems_remove();
//                     }
//                 },
//             },
//             {
//                 label: 'Import',
//                 icon: 'pi pi-fw pi-file-import',
//                 command: (event) => {},
//             },
//             {
//                 label: 'Export',
//                 icon: 'pi pi-fw pi-file-export',
//                 command: (event) => {},
//             },
//         ];
//     }

//     tabChange(e: { index: any }) {
//         var index = e.index;

//         //
//         this.edit_TRPolcode = false;
//         this.new_TRPolcode = false;
//         //

//         this.displayManage = false;
//     }

//     position: string = 'right';
//     showManage() {
//         this.displayManage = true;

//         if (this.initial_current.Language == 'EN') {
//             if (this.new_TRPolcode || this.edit_TRPolcode) {
//                 this.manage_title = 'empid';
//             }
//         } else {
//             if (this.new_TRPolcode || this.edit_TRPolcode) {
//                 this.manage_title = 'รหัส';
//             }
//         }
//     }

//     doLoadMTPolcode() {
//         var MTPolcode_list: MTPolcodeModel[] = [];
//         this.polcodeService
//             .getempid_polItems(this.polcode_id)
//             .then(async (res) => {await res.getMTPolcodeList(this.initial_current.CompCode, "EMP").subscribe((response: string) => {
//                     let resultJSON = JSON.parse(response);
//                     if(resultJSON.result == "1"){
//                         this.MTPolcode_list = resultJSON.data;
//                     }
//                 });

//                 MTPolcode_list = await res;
//                 console.log(res);

//                 if (MTPolcode_list.length > 0) {
//                     this.selectedMTPolcode = MTPolcode_list[0];

//                     setTimeout(() => {
//                         this.doLoadTRPolcodeList();
//                     }, 300);
//                 }
//             });

//             setTimeout(() => {
//                 if(this.TRPolcodeList.length > 0){
//                   this.selectedTRPolcode = this.TRPolcodeList[0];

//                   this.TRPolcodeList = [];

//                   this.polcodeService.getTRPolcodeList(this.selectedTRPolcode.polcode_id.toString()).subscribe((response) =>{

//                     let resultJSON = JSON.parse(response);

//                     this.TRPolcodeList = resultJSON.data;

//                   });
//                 }
//               }, 500);
//     }
// // get data dropdown

// codestructureList: CodestructureModel[] = [];
//     doLoadCodestructureList() {
//         this.codestructureService.codestructure_get().then((res) => {
//             this.codestructureList = res;
//         });
//     }
//     // public codeStrucList:CodestructureModel[];

//     doGetStrucList(){

//       this.Codestructure_list = [];
//       this.polcodeService.getStructureList().subscribe((response) =>{

//         let resultJSON = JSON.parse(response);
//         if(resultJSON.result == "1"){
//           this.Codestructure_list = resultJSON.data;
//         }
//       });
//     }

//     //TRPolcode
//     TRPolcodeList: TRPolcodeModel[] = [];
//     selectedTRPolcode: TRPolcodeModel = new TRPolcodeModel();
//     doLoadTRPolcodeList() {
//         this.polcodeService.getempid_polItems(this.initial_current.CompCode
//                 // this.company_code
//             )
//             .then(async (res) => {
//                 await res.forEach((element: TRPolcodeModel) => {});
//                 this.TRPolcodeList = await res;
//                 if (this.TRPolcodeList.length > 0) {
//                     // if(this.codestructure_code != ""){
//                     this.selectedTRPolcode = this.TRPolcodeList[0];
//                     this.selectedTRPolcode.index = this.TRPolcodeList.length + 1;
//                     this.selectedTRPolcode.codestructure_code = res.codestructure_code;
//                     this.selectedTRPolcode.polcode_lenght = res.polcode_lenght;
//                     this.selectedTRPolcode.polcode_text = res.polcode_text;
//                     this.selectedTRPolcode.polcode_order = res.polcode_order;

//                     this.doAddStructure(this.selectedTRPolcode);

//                 }
//             });
//     }
//     //
//     doAddStructure(selectedTRPolcode:TRPolcodeModel){
//         const strucNew:TRPolcodeModel[] = [];
//         for (let i = 0; i < this.TRPolcodeList.length; i++) {
//           if(this.TRPolcodeList[i].codestructure_code!=selectedTRPolcode.codestructure_code){
//             strucNew.push(this.TRPolcodeList[i]);
//           }
//         }

//         //-- 9999 for delete
//         if(selectedTRPolcode.polcode_id != '9999'){
//           strucNew.push(selectedTRPolcode);
//         }

//         this.TRPolcodeList = [];
//         this.TRPolcodeList = strucNew;

//         this.TRPolcodeList.sort(function(a, b) {
//             return parseInt(a.polcode_id) - parseInt(b.polcode_id);
//          })
//       }

//       doNewStructure(){
//         this.selectedTRPolcode = new TRPolcodeModel();

//         // this.openAddStructure();
//       }

//     //   doEditStructure(index:number) {

//     //     this.selectedTRPolcode = null;
//     //     this.doGetDataEditStructure(index);

//     //     if(this.selectedTRPolcode != null){
//     //     //   this.openAddStructure();
//     //     }

//     //   }


//     //
//     onRowSelectPolItems(event: Event) {}
//     polItems_summit() {
//         this.polItems_addItem(this.selectedTRPolcode);
//         this.new_TRPolcode = false;
//         this.edit_TRPolcode = false;

//         this.displayManage = false;
//     }
//     polItems_remove() {
//         this.selectedTRPolcode.codestructure_code = '9999';
//         this.polItems_addItem(this.selectedTRPolcode);
//         this.new_TRPolcode = false;
//         this.edit_TRPolcode = false;
//     }
//     polItems_delete() {}
//     polItems_cancel() {
//         this.new_TRPolcode = false;
//         this.edit_TRPolcode = false;
//         this.displayManage = false;
//     }
//     polItems_addItem(model: TRPolcodeModel) {
//         const itemNew: TRPolcodeModel[] = [];
//         for (let i = 0; i < this.TRPolcodeList.length; i++) {
//             if (this.TRPolcodeList[i].polcode_id == model.polcode_id) {
//                 //-- Notting
//             } else {
//                 itemNew.push(this.TRPolcodeList[i]);
//             }
//         }
//         //-- 9999 for delete
//         if (model.polcode_id != '9999') {
//             itemNew.push(model);
//         }
//         this.TRPolcodeList = [];
//         this.TRPolcodeList = itemNew;
//         this.TRPolcodeList.sort(function (a, b) {
//             return parseInt(a.polcode_id) - parseInt(b.polcode_id);
//         });
//     }
//     record_polItems() {
//         //     if (this.TRPolcodeList.length == 0) {
//         //         return;
//         //     }
//         //     this.polcodeService
//         //         .record_polItems(
//         //             this.selectedMTPolcode,
//         //             this.TRPolcodeList
//         //         )
//         //         .then((res) => {
//         //             let result = JSON.parse(res);
//         //             if (result.success) {
//         //             } else {
//         //             }
//         //         });
//         // }
//         if (this.TRPolcodeList.length == 0) {
//             return;
//         }
//         this.selectedMTPolcode.company_code = this.initial_current.CompCode;
//         this.selectedMTPolcode.polcode_type = 'EMP';

//         this.polcodeService
//             .record_polItems(this.selectedMTPolcode, this.TRPolcodeList)
//             .then((res: string) => {
//                 let resultJSON = JSON.parse(res);

//                 if (resultJSON.result == '1') {
//                     console.log('Success');
//                     this.doLoadTRPolcodeList();
//                 } else {
//                     // this.doPrintMessage(resultJSON.result_text, "2")
//                 }
//             });
//     }

//     confirmRecord() {
//         this.confirmationService.confirm({
//             message: this.title_confirm_record,
//             header: this.title_confirm,
//             icon: 'pi pi-exclamation-triangle',
//             accept: () => {
//                 this.doRecordStructure();
//                 this.doLoadTRPolcodeList();
//             },
//             reject: () => {
//                 this.messageService.add({
//                     severity: 'warn',
//                     summary: 'Cancelled',
//                     detail: this.title_confirm_cancel,
//                 });
//             },
//         });
//     }

//     doRecordStructure() {
//         this.polcodeService.getStructureList().subscribe((response) => {
//             // console.log(res);

//             // let result = JSON.parse(res);
//             let result = JSON.parse(response);

//             if (result.success) {
//                 //-- Transaction
//                 this.record_polItems();
//                 this.doLoadMTPolcode();

//                 this.messageService.add({
//                     severity: 'success',
//                     summary: 'Success',
//                     detail: result.message,
//                 });
//                 // this.router.navigateByUrl('system/Branch');
//             } else {
//                 this.messageService.add({
//                     severity: 'error',
//                     summary: 'Error',
//                     detail: result.message,
//                 });
//             }
//         });
//     }

//     close() {
//         // this.new_combranch = false;
//         this.selectedMTPolcode = new MTPolcodeModel();
//     }

//     clearManage() {
//         this.new_TRPolcode = false;
//         this.edit_TRPolcode = false;
//     }
// }

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
@Component({
  selector: 'app-system-card-type',
  templateUrl: './system-card-type.component.html',
  styleUrls: ['./system-card-type.component.scss']
})
export class SystemCardTypeComponent implements OnInit {

    items: MenuItem[] = [];
    edit_data: boolean = false;
    new_data: boolean = false;

    cardtype_list : CardtypeModel[] = [];
    selectedCardtype : CardtypeModel = new CardtypeModel();

    constructor(
      private cardtypeService: CardtypeService,
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
        this.doLoadCardtype()
      }, 500);
    }

    public initial_current:InitialCurrent = new InitialCurrent();
    doGetInitialCurrent(){
      this.initial_current = JSON.parse(localStorage.getItem(AppConfig.SESSIONInitial) || '{}');
      if (!this.initial_current) {
        this.router.navigateByUrl('');
      }
    }

    title_page:string = "Cardtype";
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
        this.title_page = "ข้อมูลสถานะพนักงาน";
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
            this.selectedCardtype = new CardtypeModel();
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

    doLoadCardtype(){
      this.cardtypeService.cardtype_get().then((res) => {
       this.cardtype_list = res;
      });
    }

    confirmRecord() {
      this.confirmationService.confirm({
          message: this.title_confirm_record,
          header: this.title_confirm,
          icon: 'pi pi-exclamation-triangle',
          accept: () => {
            this.doRecordCardtype()
          },
          reject: () => {
            this.messageService.add({severity:'warn', summary:'Cancelled', detail:this.title_confirm_cancel});
          }
      });
    }

    doRecordCardtype(){
      this.cardtypeService.cardtype_record(this.selectedCardtype).then((res) => {
       console.log(res)
       let result = JSON.parse(res);

       if(result.success){
        this.messageService.add({severity:'success', summary: 'Success', detail: result.message});
        this.doLoadCardtype()
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
            this.doDeleteCardtype()
          },
          reject: () => {
            this.messageService.add({severity:'warn', summary:'Cancelled', detail:this.title_confirm_cancel});
          }
      });
    }

    doDeleteCardtype(){
      this.cardtypeService.cardtype_delete(this.selectedCardtype).then((res) => {
       console.log(res)
       let result = JSON.parse(res);

       if(result.success){
        this.messageService.add({severity:'success', summary: 'Success', detail: result.message});
        this.doLoadCardtype();
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
      this.selectedCardtype = new CardtypeModel()
    }
    onRowSelectCardtype(event: any) {
      this.edit_data= true;
      this.new_data= true;
    }

    fileToUpload: File | any = null;
    handleFileInput(file: FileList) {
      this.fileToUpload=file.item(0);
    }

    doUploadCardtype(){

      if (this.fileToUpload) {
        this.confirmationService.confirm({
          message: "Confirm Upload file : " + this.fileToUpload.name,
          header: "Import File",
          icon: 'pi pi-exclamation-triangle',
          accept: () => {
            const filename = "Cardtype_" + this.datePipe.transform(new Date(), 'yyyyMMddHHmm');
            const filetype = "xls";

            this.cardtypeService.cardtype_import(this.fileToUpload, filename, filetype).then((res) => {
              console.log(res)
              let result = JSON.parse(res);

              if (result.success) {
                this.messageService.add({ severity: 'success', summary: 'Success', detail: result.message });
                this.doLoadCardtype();
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

      XLSX.writeFile(wb, 'Export_cardtype.xlsx');

    }

  }
//     items: MenuItem[] = [];
//     edit_data: boolean = false;
//     new_data: boolean = false;

//     cardtype_list: CardtypeModel[] = [];
//     selectedCardtype: CardtypeModel = new CardtypeModel();

//     constructor(private cardtypeService: CardtypeService,
//       private router:Router,
//       private messageService: MessageService,
//       private confirmationService: ConfirmationService,
//       private datePipe: DatePipe
//       ) { }

//     ngOnInit(): void {

//       this.doGetInitialCurrent()

//       setTimeout(() => {
//         this.doLoadLanguage()
//         this.doLoadMenu()
//         this.doLoadCardType()
//       }, 500);


//     }

//     public initial_current:InitialCurrent = new InitialCurrent();
//     doGetInitialCurrent(){
//       this.initial_current = JSON.parse(localStorage.getItem(AppConfig.SESSIONInitial) || '{}');
//       if (!this.initial_current) {
//         this.router.navigateByUrl('');
//       }
//     }

//     title_page:string = "Cardtype";
//     title_new:string = "New";
//     title_edit:string = "Edit";
//     title_delete:string = "Delete";
//     title_import:string = "Import";
//     title_export:string = "Export";
//     title_save:string = "Save";
//     title_code:string = "Code";
//     title_name_th:string = "Name (Thai)";
//     title_name_en:string = "Name (Eng.)";
//     title_modified_by:string = "Edit by";
//     title_modified_date:string = "Edit date";
//     title_search:string = "Search";
//     title_upload:string = "Upload";

//     title_page_from:string = "Showing";
//     title_page_to:string = "to";
//     title_page_total:string = "of";
//     title_page_record:string = "entries";

//     title_confirm:string = "Are you sure?";
//     title_confirm_record:string = "Confirm to record";
//     title_confirm_delete:string = "Confirm to delete";
//     title_confirm_yes:string = "Yes";
//     title_confirm_no:string = "No";

//     title_confirm_cancel:string = "You have cancelled";

//     doLoadLanguage(){
//       if(this.initial_current.Language == "TH"){
//         this.title_page = "ประเภทบัตร";
//         this.title_new = "เพิ่ม";
//         this.title_edit = "แก้ไข";
//         this.title_delete = "ลบ";
//         this.title_import = "นำเข้า";
//         this.title_export = "โอนออก";
//         this.title_save = "บันทึก";
//         this.title_code = "รหัส";
//         this.title_name_th = "ชื่อไทย";
//         this.title_name_en = "ชื่ออังกฤษ";
//         this.title_modified_by = "ผู้ทำรายการ";
//         this.title_modified_date = "วันที่ทำรายการ";
//         this.title_search = "ค้นหา";
//         this.title_upload = "อัพโหลด";

//         this.title_page_from = "แสดง";
//         this.title_page_to = "ถึง";
//         this.title_page_total = "จาก";
//         this.title_page_record = "รายการ";

//         this.title_confirm = "ยืนยันการทำรายการ";
//         this.title_confirm_record = "คุณต้องการบันทึกการทำรายการ";
//         this.title_confirm_delete = "คุณต้องการลบรายการ";

//         this.title_confirm_yes = "ใช่";
//         this.title_confirm_no = "ยกเลิก";
//         this.title_confirm_cancel = "คุณยกเลิกการทำรายการ";

//       }
//     }

//     doLoadMenu(){

//       this.items = [
//         {
//           label:this.title_new,
//           icon:'pi pi-fw pi-plus',
//           command: (event) => {
//             this.selectedCardtype = new CardtypeModel();
//             this.new_data= true;
//             this.edit_data= false;
//           }
//         }
//         ,
//         {
//             label:this.title_import,
//             icon:'pi pi-fw pi-file-import',
//             command: (event) => {
//               this.showUpload()

//             }
//         }
//         ,
//         {
//             label:this.title_export,
//             icon:'pi pi-fw pi-file-export',
//             command: (event) => {
//               this.exportAsExcel()

//             }
//         }
//       ];
//     }

//     doLoadCardType(){
//       this.cardtypeService.cardtype_get().then((res) => {
//        this.cardtype_list = res;
//       });
//     }

//     confirmRecord() {
//       this.confirmationService.confirm({
//           message: this.title_confirm_record,
//           header: this.title_confirm,
//           icon: 'pi pi-exclamation-triangle',
//           accept: () => {
//             this.doRecordCardType()
//           },
//           reject: () => {
//             this.messageService.add({severity:'warn', summary:'Cancelled', detail:this.title_confirm_cancel});
//           }
//       });
//     }

//     doRecordCardType(){
//       this.cardtypeService.cardtype_record(this.selectedCardtype).then((res) => {
//        console.log(res)
//        let result = JSON.parse(res);

//        if(result.success){
//         this.messageService.add({severity:'success', summary: 'Success', detail: result.message});
//         this.doLoadCardType()
//        }
//        else{
//         this.messageService.add({severity:'error', summary: 'Error', detail: result.message});
//        }

//       });
//     }

//     confirmDelete() {
//       this.confirmationService.confirm({
//           message: this.title_confirm_delete,
//           header: this.title_confirm,
//           icon: 'pi pi-exclamation-triangle',
//           accept: () => {
//             this.doDeleteCardtype()
//           },
//           reject: () => {
//             this.messageService.add({severity:'warn', summary:'Cancelled', detail:this.title_confirm_cancel});
//           }
//       });
//     }

//     doDeleteCardtype(){
//       this.cardtypeService.cardtype_delete(this.selectedCardtype).then((res) => {
//        console.log(res)
//        let result = JSON.parse(res);

//        if(result.success){
//         this.messageService.add({severity:'success', summary: 'Success', detail: result.message});
//         this.doLoadCardType();
//         this.edit_data= false;
//         this.new_data= false;
//        }
//        else{
//         this.messageService.add({severity:'error', summary: 'Error', detail: result.message});
//        }

//       });
//     }

//     onRowSelectCardType(event: Event) {
//       this.edit_data= true;
//       this.new_data= false;
//     }



//     fileToUpload: File | any = null;
//     handleFileInput(file: FileList) {
//       this.fileToUpload=file.item(0);
//     }

//     doUploadCardType(){

//       this.displayUpload = false;

//       const filename = "CARDTYPE_" + this.datePipe.transform(new Date(), 'yyyyMMddHHmm');
//       const filetype = "xls";


//       this.cardtypeService.cardtype_import(this.fileToUpload, filename, filetype).then((res) => {
//        console.log(res)
//        let result = JSON.parse(res);

//        if(result.success){
//         this.messageService.add({severity:'success', summary: 'Success', detail: result.message});
//         this.doLoadCardType();
//         this.edit_data= false;
//         this.new_data= false;
//        }
//        else{
//         this.messageService.add({severity:'error', summary: 'Error', detail: result.message});
//        }

//       });
//     }


//     displayUpload: boolean = false;
//     showUpload() {
//       this.displayUpload = true;
//     }

//     @ViewChild('TABLE') table: ElementRef | any = null;

//     exportAsExcel()
//     {
//       const ws: XLSX.WorkSheet=XLSX.utils.table_to_sheet(this.table.nativeElement);//converts a DOM TABLE element to a worksheet
//       const wb: XLSX.WorkBook = XLSX.utils.book_new();
//       XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

//       XLSX.writeFile(wb, 'Export_cardtype.xlsx');

//     }

//   }

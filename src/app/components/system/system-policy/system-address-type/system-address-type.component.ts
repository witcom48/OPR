import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { NavigationExtras } from '@angular/router';
import { Table } from 'primeng/table';
import { MegaMenuItem,MenuItem } from 'primeng/api';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import {ConfirmationService, ConfirmEventType, MessageService} from 'primeng/api';
import * as XLSX from 'xlsx';
import { AppConfig } from '../../../../config/config';
import { InitialCurrent } from '../../../../config/initial_current';
import { AddresstypeModel } from 'src/app/models/system/policy/addresstype';
import { AddresstypeService } from 'src/app/services/system/policy/addresstype.service';
@Component({
  selector: 'app-system-address-type',
  templateUrl: './system-address-type.component.html',
  styleUrls: ['./system-address-type.component.scss']
})
export class SystemAddressTypeComponent implements OnInit {
    items: MenuItem[] = [];
    edit_data: boolean = false;
    new_data: boolean = false;

    addresstype_list : AddresstypeModel[] = [];
    selectedAddresstype : AddresstypeModel = new AddresstypeModel();

    constructor(
      private addresstypeService: AddresstypeService,
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
        this.doLoadAddresstype()
      }, 500);
    }

    public initial_current:InitialCurrent = new InitialCurrent();
    doGetInitialCurrent(){
      this.initial_current = JSON.parse(localStorage.getItem(AppConfig.SESSIONInitial) || '{}');
      if (!this.initial_current) {
        this.router.navigateByUrl('');
      }
    }

    title_page:string = "Addresstype";
    title_new:string = "New";
    title_edit:string = "Edit";
    title_delete:string = "Delete";
    title_import:string = "Import";
    title_export:string = "Export";
    title_save:string = "Save";
    title_code:string = "Code";
    title_name_th:string = "Name (Thai)";
    title_name_en:string = "Name (Eng.)";
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
        this.title_name_th = "ชื่อไทย";
        this.title_name_en = "ชื่ออังกฤษ";
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
            this.selectedAddresstype = new AddresstypeModel();
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

    doLoadAddresstype(){
      this.addresstypeService.addresstype_get().then((res) => {
       this.addresstype_list = res;
      });
    }

    confirmRecord() {
      this.confirmationService.confirm({
          message: this.title_confirm_record,
          header: this.title_confirm,
          icon: 'pi pi-exclamation-triangle',
          accept: () => {
            this.doRecordAddresstype()
          },
          reject: () => {
            this.messageService.add({severity:'warn', summary:'Cancelled', detail:this.title_confirm_cancel});
          }
      });
    }

    doRecordAddresstype(){
      this.addresstypeService.addresstype_record(this.selectedAddresstype).then((res) => {
       console.log(res)
       let result = JSON.parse(res);

       if(result.success){
        this.messageService.add({severity:'success', summary: 'Success', detail: result.message});
        this.doLoadAddresstype()
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
            this.doDeleteAddresstype()
          },
          reject: () => {
            this.messageService.add({severity:'warn', summary:'Cancelled', detail:this.title_confirm_cancel});
          }
      });
    }

    doDeleteAddresstype(){
      this.addresstypeService.addresstype_delete(this.selectedAddresstype).then((res) => {
       console.log(res)
       let result = JSON.parse(res);

       if(result.success){
        this.messageService.add({severity:'success', summary: 'Success', detail: result.message});
        this.doLoadAddresstype();
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
      this.selectedAddresstype = new AddresstypeModel()
    }
    onRowSelectAddresstype(event: any) {
      this.edit_data= true;
      this.new_data= true;
    }

    fileToUpload: File | any = null;
    handleFileInput(file: FileList) {
      this.fileToUpload=file.item(0);
    }

    doUploadAddresstype(){

      if (this.fileToUpload) {
        this.confirmationService.confirm({
          message: "Confirm Upload file : " + this.fileToUpload.name,
          header: "Import File",
          icon: 'pi pi-exclamation-triangle',
          accept: () => {
            const filename = "Addresstype_" + this.datePipe.transform(new Date(), 'yyyyMMddHHmm');
            const filetype = "xls";

            this.addresstypeService.addresstype_import(this.fileToUpload, filename, filetype).then((res) => {
              console.log(res)
              let result = JSON.parse(res);

              if (result.success) {
                this.messageService.add({ severity: 'success', summary: 'Success', detail: result.message });
                this.doLoadAddresstype();
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

      XLSX.writeFile(wb, 'Export_Addresstype.xlsx');

    }

  }


//     items: MenuItem[] = [];
//     edit_data: boolean = false;
//     new_data: boolean = false;

//     addresstype_list: AddresstypeModel[] = [];
//     selectedAddresstype: AddresstypeModel = new AddresstypeModel();

//     constructor(private addresstypeService:AddresstypeService,
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
//         this.doLoadAddresstype()
//       }, 500);


//     }

//     public initial_current:InitialCurrent = new InitialCurrent();
//     doGetInitialCurrent(){
//       this.initial_current = JSON.parse(localStorage.getItem(AppConfig.SESSIONInitial) || '{}');
//       if (!this.initial_current) {
//         this.router.navigateByUrl('');
//       }
//     }

//     title_page:string = "Addresstype";
//     title_new:string = "New";
//     title_edit:string = "Edit";
//     title_delete:string = "Delete";
//     title_import:string = "Import";
//     title_export:string = "Export";
//     title_save:string = "Save";
//     title_code:string = "Code";
//     title_name_th:string = "Addresstype (Thai)";
//     title_name_en:string = "Addresstype (Eng.)";
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
//         this.title_page = "ประเภทที่อยู่";
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
//             this.selectedAddresstype = new AddresstypeModel();
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

//     doLoadAddresstype(){
//       this.addresstypeService.addresstype_get().then((res) => {
//        this.addresstype_list = res;
//       });
//     }

//     confirmRecord() {
//       this.confirmationService.confirm({
//           message: this.title_confirm_record,
//           header: this.title_confirm,
//           icon: 'pi pi-exclamation-triangle',
//           accept: () => {
//             this.doRecordAddresstype()
//           },
//           reject: () => {
//             this.messageService.add({severity:'warn', summary:'Cancelled', detail:this.title_confirm_cancel});
//           }
//       });
//     }

//     doRecordAddresstype(){
//       this.addresstypeService.addresstype_record(this.selectedAddresstype).then((res) => {
//        console.log(res)
//        let result = JSON.parse(res);

//        if(result.success){
//         this.messageService.add({severity:'success', summary: 'Success', detail: result.message});
//         this.doLoadAddresstype()
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
//             this.doDeleteAddresstype()
//           },
//           reject: () => {
//             this.messageService.add({severity:'warn', summary:'Cancelled', detail:this.title_confirm_cancel});
//           }
//       });
//     }

//     doDeleteAddresstype(){
//       this.addresstypeService.addresstype_delete(this.selectedAddresstype).then((res) => {
//        console.log(res)
//        let result = JSON.parse(res);

//        if(result.success){
//         this.messageService.add({severity:'success', summary: 'Success', detail: result.message});
//         this.doLoadAddresstype();
//         this.edit_data= false;
//         this.new_data= false;
//        }
//        else{
//         this.messageService.add({severity:'error', summary: 'Error', detail: result.message});
//        }

//       });
//     }

//     onRowSelectaddresstype(event: Event) {
//       this.edit_data= true;
//       this.new_data= false;
//     }



//     fileToUpload: File | any = null;
//     handleFileInput(file: FileList) {
//       this.fileToUpload=file.item(0);
//     }

//     doUploadAddresstype(){

//       this.displayUpload = false;

//       const filename = "Addresstype_" + this.datePipe.transform(new Date(), 'yyyyMMddHHmm');
//       const filetype = "xls";


//       this.addresstypeService.addresstype_import(this.fileToUpload, filename, filetype).then((res) => {
//        console.log(res)
//        let result = JSON.parse(res);

//        if(result.success){
//         this.messageService.add({severity:'success', summary: 'Success', detail: result.message});
//         this.doLoadAddresstype();
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

//       XLSX.writeFile(wb, 'Export_addresstype.xlsx');

//     }

//   }
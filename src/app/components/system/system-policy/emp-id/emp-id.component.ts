import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { NavigationExtras } from '@angular/router';
import { Table } from 'primeng/table';
import { MegaMenuItem,MenuItem } from 'primeng/api';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import {ConfirmationService, ConfirmEventType, MessageService} from 'primeng/api';
import {DialogModule} from 'primeng/dialog';

import * as XLSX from 'xlsx';
import { AppConfig } from '../../../../config/config';
import { InitialCurrent } from '../../../../config/initial_current';
import { EmpIDModel } from 'src/app/models/system/empid';

import { EmpidService } from 'src/app/services/system/empid.service';
import { Subscription } from 'rxjs';
import { CodestructureModel } from 'src/app/models/system/codestructure';
declare var reason: any;
interface Type {name: string, code: string}
@Component({
  selector: 'app-emp-id',
  templateUrl: './emp-id.component.html',
  styleUrls: ['./emp-id.component.scss']
})
export class EmpIDComponent implements OnInit {

  //-- Label
//   title_Title = "Structure";
//   title_Code = "Code";
//   title_Detail = "Detail";
//   title_Lenght = "Lenght";
//   title_Text = "Text";
//   title_Order= "Order";
//   title_Example= "Example";
//   title_ModyfiedBy = "Modyfied by";
//   title_ModyfiedDate= "Modyfied date";

//   title_New = "New";
//   title_Back = "Back";
//   title_Link= "Link";
//   title_Export= "Export";
//   title_Save= "Save";

//   panelOpenState = false;

//   constructor(private empidService:EmpidService
//     , private dialog: DialogModule
//     , private router: Router
//     , private messageService: MessageService,

//     ) {
//       this.strucList = [];
//   }


//   private subs = new Subscription();

//   public initial : AppConfig = new AppConfig();
// //   public empid_list : EmpIDModel[];
//   public empid_list : EmpIDModel[] = [];
//   public empidDetail : EmpIDModel = new EmpIDModel();

//   public initial_current:InitialCurrent = new InitialCurrent();
//   doGetInitialCurrent(){
//     this.initial_current = JSON.parse('');
//     if (this.initial_current) {
//       this.initial_current = JSON.parse('');
//     }
//     else{
//       this.router.navigateByUrl('login');
//     }
//   }

//   getLanguage() : string {
//     return this.initial_current.Language;
//   }

//    doCheckLanguage(){
//     if(this.getLanguage() == "EN"){

//       this.title_Title = "Structure";
//       this.title_Code = "Code";
//       this.title_Detail = "Detail";
//       this.title_Lenght = "Lenght";
//       this.title_Text = "Text";
//       this.title_Order = "Order";
//       this.title_Example = "Example";
//       this.title_ModyfiedBy = "Modyfied by";
//       this.title_ModyfiedDate = "Modyfied date";

//       this.title_New = "New";
//       this.title_Back = "Back";
//       this.title_Link = "Link";
//       this.title_Export = "Export";
//       this.title_Save = "Save";
//     }
//     else{
//       this.title_Title = "รูปแบบรหัส";
//       this.title_Code = "รหัส";
//       this.title_Detail = "รายละเอียด";
//       this.title_Lenght = "ความยาว";
//       this.title_Text = "ข้อความคงที่";
//       this.title_Order = "อันดับ";
//       this.title_Example = "ตัวอย่าง";
//       this.title_ModyfiedBy = "ผู้ทำรายการ";
//       this.title_ModyfiedDate = "วันที่ทำรายการ";

//       this.title_New = "เพิ่ม";
//       this.title_Back = "ย้อนกลับ";
//       this.title_Link = "เมนู";
//       this.title_Export = "โอนออก";
//       this.title_Save = "บันทึก";
//     }
//    }

//   ngOnInit(): void {
//     this.doGetInitialCurrent();
//     this.doCheckLanguage();

//     this.empidDetail = new EmpIDModel();
//     this.codeStrucList = [];

//     this.doGetStrucList();
//     this.doLoadMTPolcode();
//   }



//   doPrintMessage(message:string, status:string){

//     const dialogRef = this.dialog.open(MessageService, {
//       width: '500px',
//       data: {message: message
//       }
//     });
//   }

//   doLoadMTPolcode(){

//     this.empid_list = [];
//     this.empidService.empid_get().then((response) => {
//     // this.empidService.empid_get(this.initial_current.CompCode, "EMP").subscribe((response) =>{
//       let resultJSON = JSON.parse(response);

//       if(resultJSON.result == "1"){
//         this.empid_list = resultJSON.data;
//       }

//     });

//     setTimeout(() => {
//       if(this.empid_list.length > 0){
//         this.empidDetail = this.empid_list[0];

//         this.strucList = [];
//         this.empidService.empid_get().then((response) => {

//         // this.empidService.empid_get(this.empidDetail.empid_id.toString()).subscribe((response) =>{

//           let resultJSON = JSON.parse(response);

//           this.strucList = resultJSON.data;

//         });
//       }
//     }, 500);


//   }

//   public codeStrucList: CodestructureModel[] = [];

//   doGetStrucList(){

//     this.codeStrucList = [];
//     this.empidService.empid_get().subscribe((response) =>{

//       let resultJSON = JSON.parse(response);
//       if(resultJSON.result == "1"){
//         this.codeStrucList = resultJSON.data;
//       }

//     });

//   }


//   doGetStrucDetail(strucCode:string) : string {
//     for (let i = 0; i < this.codeStrucList.length; i++) {
//       if(this.codeStrucList[i].codestructure_code==strucCode ){
//         if(this.getLanguage()=="TH"){
//           return this.codeStrucList[i].codestructure_name_th;
//         }
//         else{
//           return this.codeStrucList[i].codestructure_name_en;
//         }
//       }
//     }
//   }

//   doDelete(pol_id: string) {

//     let dialogRef = this.dialog.open(ConfirmationDialog, {
//       disableClose: false
//     });

//     dialogRef.afterClosed().subscribe(result => {
//       if(result) {

//         if(this.empidDetail != null){

//           this.empidService.doDelete(this.empidDetail).subscribe((response) =>{
//             let resultJSON = JSON.parse(response);
//             if(resultJSON.result=="1"){
//               console.log('Success');
//               this.doLoadMTPolcode();
//             }
//             else{
//               this.doPrintMessage(resultJSON.result_text, "2")
//             }
//           });

//         }
//       }

//        dialogRef = null;
//     });
//   }

//   doSubmit() {

//     let dialogRef = this.dialog.open(ConfirmationDialog, {
//       disableClose: false
//     });

//     dialogRef.afterClosed().subscribe(result => {
//       if(result) {
//         this.empidDetail.empid_code = this.initial_current.CompCode;
//         this.empidDetail.polcode_type = "EMP";

//         this.empidService.doManage(this.empidDetail, this.strucList).subscribe((response) =>{

//           let resultJSON = JSON.parse(response);

//           if(resultJSON.result=="1"){
//             console.log('Success');
//             this.doLoadMTPolcode();
//           }
//           else{
//             this.doPrintMessage(resultJSON.result_text, "2")
//           }

//         });
// 	    }

//        dialogRef = null;
//     });
//   }



//   //-- Add structure

//   public strucList:TRPolcodeModel[];
//   public strucAdd:TRPolcodeModel = new TRPolcodeModel();

//   openAddStructure(): void {

//     const dialogRef = this.dialog.open(AddCodestructureComponent, {
//       width: '400px',
//       data: {codestructure_code: this.strucAdd.codestructure_code, polcode_lenght: this.strucAdd.polcode_lenght, polcode_text: this.strucAdd.polcode_text, polcode_order: this.strucAdd.polcode_order}
//     });

//     dialogRef.afterClosed().subscribe(result => {

//       if(result.codestructure_code != ""){

//         this.strucAdd.index = this.strucList.length + 1;

//         this.strucAdd.codestructure_code = result.codestructure_code;
//         this.strucAdd.polcode_lenght = result.polcode_lenght;
//         this.strucAdd.polcode_text = result.polcode_text;
//         this.strucAdd.polcode_order = result.polcode_order;

//         this.doAddStructure(this.strucAdd);
//       }

//     });
//   }

//   doAddStructure(strucAdd:TRPolcodeModel){

//     const strucNew:TRPolcodeModel[] = [];
//     for (let i = 0; i < this.strucList.length; i++) {

//       if(this.strucList[i].codestructure_code!=strucAdd.codestructure_code){
//         strucNew.push(this.strucList[i]);
//       }

//     }

//     //-- 9999 for delete
//     if(strucAdd.polcode_id != 9999){
//       strucNew.push(strucAdd);
//     }

//     this.strucList = [];
//     this.strucList = strucNew;

//     this.strucList.sort(function(a, b) { return a.polcode_id - b.polcode_id; })
//   }

//   doNewStructure(){
//     this.strucAdd = new TRPolcodeModel();

//     this.openAddStructure();
//   }

//   doEditStructure(index:number) {

//     this.strucAdd = null;
//     this.doGetDataEditStructure(index);

//     if(this.strucAdd != null){
//       this.openAddStructure();
//     }

//   }

//   doGetDataEditStructure(index:number) {
//     this.strucAdd = new TRPolcodeModel();
//     for (let i = 0; i < this.strucList.length; i++) {
//       if(this.strucList[i].index==index ){
//         this.strucAdd = this.strucList[i];
//         break;
//       }
//     }
//   }

//   doDeleteStructure(index:number) {

//     let dialogRef = this.dialog.open(ConfirmationDialog, {
//       disableClose: false
//     });

//     dialogRef.afterClosed().subscribe(result => {
//       if(result) {
//         this.doGetDataEditStructure(index);

//         if(this.strucAdd != null){

//           //-- 9999 for delete
//           this.strucAdd.polcode_id = 9999;

//           this.doAddStructure(this.strucAdd);
//         }
// 	    }

//        dialogRef = null;
//     });
//   }


// }
    items: MenuItem[] = [];
    edit_data: boolean = false;
    new_data: boolean = false;

    empid_list : EmpIDModel[] = [];
    selectedEmpid : EmpIDModel = new EmpIDModel();

    constructor(
      private empidService: EmpidService,
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
        this.doLoadEmpid()
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
        this.title_page = "รูปแบบรหัส";
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
            this.selectedEmpid = new EmpIDModel();
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

    doLoadEmpid(){
      this.empidService.empid_get().then((res) => {
       this.empid_list = res;
      });
    }

    confirmRecord() {
      this.confirmationService.confirm({
          message: this.title_confirm_record,
          header: this.title_confirm,
          icon: 'pi pi-exclamation-triangle',
          accept: () => {
            this.doRecordEmpid()
          },
          reject: () => {
            this.messageService.add({severity:'warn', summary:'Cancelled', detail:this.title_confirm_cancel});
          }
      });
    }

    doRecordEmpid(){
      this.empidService.empid_record(this.selectedEmpid).then((res) => {
       console.log(res)
       let result = JSON.parse(res);

       if(result.success){
        this.messageService.add({severity:'success', summary: 'Success', detail: result.message});
        this.doLoadEmpid()
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
            this.doDeleteEmpid()
          },
          reject: () => {
            this.messageService.add({severity:'warn', summary:'Cancelled', detail:this.title_confirm_cancel});
          }
      });
    }

    doDeleteEmpid(){
      this.empidService.empid_delete(this.selectedEmpid).then((res) => {
       console.log(res)
       let result = JSON.parse(res);

       if(result.success){
        this.messageService.add({severity:'success', summary: 'Success', detail: result.message});
        this.doLoadEmpid();
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
      this.selectedEmpid = new EmpIDModel()
    }
    onRowSelectEmpid(event: any) {
      this.edit_data= true;
      this.new_data= true;
    }

    fileToUpload: File | any = null;
    handleFileInput(file: FileList) {
      this.fileToUpload=file.item(0);
    }

    doUploadEmpid(){

      if (this.fileToUpload) {
        this.confirmationService.confirm({
          message: "Confirm Upload file : " + this.fileToUpload.name,
          header: "Import File",
          icon: 'pi pi-exclamation-triangle',
          accept: () => {
            const filename = "Empid_" + this.datePipe.transform(new Date(), 'yyyyMMddHHmm');
            const filetype = "xls";

            this.empidService.empid_import(this.fileToUpload, filename, filetype).then((res) => {
              console.log(res)
              let result = JSON.parse(res);

              if (result.success) {
                this.messageService.add({ severity: 'success', summary: 'Success', detail: result.message });
                this.doLoadEmpid();
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

      XLSX.writeFile(wb, 'Export_Empid.xlsx');

    }

  }



//     doLoadMenu(){

//       this.items = [
//         {
//           label:this.title_new,
//           icon:'pi pi-fw pi-plus',
//           command: (event) => {
//             this.selectedEmpid = new EmpIDModel();
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

//     doLoadEmpid(){
//       this.empidService.empid_get().then((res) => {
//        this.empid_list = res;
//       });
//     }

//     confirmRecord() {
//       this.confirmationService.confirm({
//           message: this.title_confirm_record,
//           header: this.title_confirm,
//           icon: 'pi pi-exclamation-triangle',
//           accept: () => {
//             this.doRecordEmpid()
//           },
//           reject: () => {
//             this.messageService.add({severity:'warn', summary:'Cancelled', detail:this.title_confirm_cancel});
//           }
//       });
//     }

//     doRecordEmpid(){
//       this.empidService.empid_record(this.selectedEmpid).then((res) => {
//        console.log(res)
//        let result = JSON.parse(res);

//        if(result.success){
//         this.messageService.add({severity:'success', summary: 'Success', detail: result.message});
//         this.doLoadEmpid()
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
//             this.doDeleteEmpid()
//           },
//           reject: () => {
//             this.messageService.add({severity:'warn', summary:'Cancelled', detail:this.title_confirm_cancel});
//           }
//       });
//     }

//     doDeleteEmpid(){
//       this.empidService.empid_delete(this.selectedEmpid).then((res) => {
//        console.log(res)
//        let result = JSON.parse(res);

//        if(result.success){
//         this.messageService.add({severity:'success', summary: 'Success', detail: result.message});
//         this.doLoadEmpid();
//         this.edit_data= false;
//         this.new_data= false;
//        }
//        else{
//         this.messageService.add({severity:'error', summary: 'Error', detail: result.message});
//        }

//       });
//     }

//     onRowSelectEmpid(event: Event) {
//       this.edit_data= true;
//       this.new_data= false;
//     }



//     fileToUpload: File | any = null;
//     handleFileInput(file: FileList) {
//       this.fileToUpload=file.item(0);
//     }

//     doUploadEmpid(){

//       this.displayUpload = false;

//       const filename = "EMPID_" + this.datePipe.transform(new Date(), 'yyyyMMddHHmm');
//       const filetype = "xls";


//       this.empidService.empid_import(this.fileToUpload, filename, filetype).then((res) => {
//        console.log(res)
//        let result = JSON.parse(res);

//        if(result.success){
//         this.messageService.add({severity:'success', summary: 'Success', detail: result.message});
//         this.doLoadEmpid();
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

//       XLSX.writeFile(wb, 'Export_empid.xlsx');

//     }

//   }

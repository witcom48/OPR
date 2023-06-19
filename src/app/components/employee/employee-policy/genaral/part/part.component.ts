import { DatePipe } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router,NavigationExtras } from '@angular/router';
import { ConfirmationService, MenuItem, MessageService, MegaMenuItem, ConfirmEventType, } from 'primeng/api';
import { Table } from 'primeng/table';
import { AppConfig } from '../../../../../config/config';
import { InitialCurrent } from '../../../../../config/initial_current';
import { PartModel } from '../../../../../models/employee/policy/part';
import { PartService } from '../../../../../services/emp/policy/part.service';
import * as XLSX from 'xlsx';
import { LevelService } from 'src/app/services/system/policy/level.service';
import { LevelModel } from 'src/app/models/system/policy/level';

@Component({
  selector: 'app-part',
  templateUrl: './part.component.html',
  styleUrls: ['./part.component.scss']
})
export class PartComponent implements OnInit {

  items: MenuItem[] = [];
  edit_data: boolean = false;
  new_data: boolean = false;

  dep_list : PartModel[] = [];
  selectedDep : PartModel = new PartModel();


  constructor(
    private partService: PartService,
    private router:Router,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private datePipe: DatePipe,

    //dropdown
    private levelService : LevelService,

  ) { }

  ngOnInit(): void {
    this.doGetInitialCurrent()
    
    this.doLoadLevelList();
    this.doLoadParent();
    
    setTimeout(() => {
      this.doLoadLanguage()
      this.doLoadMenu()
      this.doLoadDep()
    }, 500);
  }

  public initial_current:InitialCurrent = new InitialCurrent();  
  doGetInitialCurrent(){    
    this.initial_current = JSON.parse(localStorage.getItem(AppConfig.SESSIONInitial) || '{}');
    if (!this.initial_current) {
      this.router.navigateByUrl('');
    }       
  }

  title_page:string = "Department";
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
  title_level:string = "Level";
  title_parent:string = "Parent";
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
      this.title_page = "ข้อมูลสังกัด";
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
      this.title_level = "ระดับ";
      this.title_parent = "ภายใต้";
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
          this.selectedDep = new PartModel();
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

  levelList: LevelModel[]=[];
  selectedLevel : LevelModel = new LevelModel();
  doLoadLevelList(){
    this.levelService.level_get().then(async(res)=>{
      this.levelList = await res;
    })
  }

  doLoadDep(){
    var tmp = this.selectedLevel
    this.partService.dep_get(tmp).then((res) => {
     this.dep_list = res;     
    });
  }

  depParentList: PartModel[]=[];
  doLoadParent(){
    // var parent = 0;
    // if(this.selectedDep.dep_parent == "01"){

    // }else{
    //   var parent = Number(this.selectedDep.dep_level) + 1;
    // }
    // var level = "0" + parent.toString();
    // this.partService.dep_get(level).then(async(res)=>{
    //   this.depParentList = await res;
    // })
  }

  confirmRecord() {
    this.confirmationService.confirm({
        message: this.title_confirm_record,
        header: this.title_confirm,
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
          this.doRecordDep(this.selectedDep)
        },
        reject: () => {
          this.messageService.add({severity:'warn', summary:'Cancelled', detail:this.title_confirm_cancel});
        },
        key:"myDialog"
    });
    console.log(this.selectedDep)
  }

  async doRecordDep(data: PartModel){
    data.dep_level = this.selectedLevel.level_code
    await this.partService.dep_record(data).then((res) => {
     console.log(res)
     let result = JSON.parse(res);

     if(result.success){
      this.messageService.add({severity:'success', summary: 'Success', detail: result.message});
      this.doLoadDep();
      this.doLoadParent();
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
          this.doDeleteDep()
        },
        reject: () => {
          this.messageService.add({severity:'warn', summary:'Cancelled', detail:this.title_confirm_cancel});
        }
    });
  }

  doDeleteDep(){
    this.partService.dep_delete(this.selectedDep).then((res) => {
     console.log(res)
     let result = JSON.parse(res);

     if(result.success){
      this.messageService.add({severity:'success', summary: 'Success', detail: result.message});
      this.doLoadDep();
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
    this.selectedDep = new PartModel()
  }
  onRowSelectDep(event: any) {
    this.edit_data= true;
    this.new_data= true;
  }
  selectlevel() {
    this.doLoadDep();
  }


  fileToUpload: File | any = null;  
  handleFileInput(file: FileList) {
    this.fileToUpload=file.item(0);
  }

  doUploadDep(){
    if (this.fileToUpload) {
      this.confirmationService.confirm({
        message: "Confirm Upload file : " + this.fileToUpload.name,
        header: "Import File",
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
          const filename = "DEP_" + this.datePipe.transform(new Date(), 'yyyyMMddHHmm');
          const filetype = "xls";

          this.partService.dep_import(this.fileToUpload, filename, filetype).then((res) => {
            console.log(res)
            let result = JSON.parse(res);

            if (result.success) {
              this.messageService.add({ severity: 'success', summary: 'Success', detail: result.message });
              this.doLoadDep();
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

    XLSX.writeFile(wb, 'Export_part.xlsx');

  }

}

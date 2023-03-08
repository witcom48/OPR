import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { NavigationExtras } from '@angular/router';
import { Table } from 'primeng/table';
import { MegaMenuItem,MenuItem } from 'primeng/api';
import { Router } from '@angular/router';
import {ConfirmationService, ConfirmEventType, MessageService} from 'primeng/api';
import * as XLSX from 'xlsx';
import { DatePipe } from '@angular/common';

import { AppConfig } from '../../../config/config';
import { InitialCurrent } from '../../../config/initial_current';
import { ProjectModel } from '../../../models/project/project';
import { ProjectTypeModel } from '../../../models/project/project_type';
import { ProjectBusinessModel } from '../../../models/project/project_business';

import { ProbusinessModel, ProtypeModel, ProslipModel, ProuniformModel } from '../../../models/project/policy/pro_genaral';
import { ProgenaralService } from '../../../services/project/pro_genaral.service';
  

import { ProjectService } from '../../../services/project/project.service';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss']
})
export class ProjectListComponent implements OnInit {

  loading: boolean = true;
  project_list: ProjectModel[] = [];
  ptype_list: ProjectTypeModel[] = [];
  pbusiness_list: ProjectBusinessModel[] = [];
  statuses: any[] = [];

  toolbar_menu: MenuItem[] = [];
  items: MenuItem[] = [];

  probusiness_list: ProbusinessModel[] = [];
  selectedProbusiness: ProbusinessModel = new ProbusinessModel();

  protype_list: ProtypeModel[] = [];
  selectedProtype: ProtypeModel = new ProtypeModel();

  edit_data: boolean = false;
  new_data: boolean = false;
 

  title_page:string = "Geanral";
  title_new:string = "New";
  title_edit:string = "Edit";
  title_delete:string = "Delete";
  title_import:string = "Import";
  title_export:string = "Export";
  title_save:string = "Save";
  title_more:string = "More";
  title_code:string = "Code";
  title_name_th:string = "Name (Thai)";
  title_name_en:string = "Name (Eng.)";

  title_projectcode:string = "Code";
  title_projectname:string = "Name";
  title_protype:string = "Type";
  title_probusiness:string = "Business";
  title_fromdate:string = "From";
  title_todate:string = "To";
  title_manpower:string = "Manpower";
  title_cost:string = "Cost";
  title_status:string = "Status";
  
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
      this.title_page = "ข้อมูลทั่วไป";
      this.title_new = "เพิ่ม";
      this.title_edit = "แก้ไข";
      this.title_delete = "ลบ";
      this.title_import = "นำเข้า";
      this.title_export = "โอนออก";
      this.title_save = "บันทึก";
      this.title_more = "เพิ่มเติม";
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

      this.title_projectcode = "โครงการ";
      this.title_projectname = "ชื่อโครงการ";
      this.title_probusiness = "ประเภทธุรกิจ";
      this.title_protype = "ประเภทงาน";
      this.title_fromdate = "จากวันที่";
      this.title_todate = "ถึงวันที่";
      this.title_manpower = "จำนวนพนักงาน";
      this.title_cost = "ต้นทุน";
      this.title_status = "สถานะ";
      
    }
  }

  public initial_current:InitialCurrent = new InitialCurrent();  
  doGetInitialCurrent(){    
    this.initial_current = JSON.parse(localStorage.getItem(AppConfig.SESSIONInitial) || '{}');
    if (!this.initial_current) {
      this.router.navigateByUrl('');
    }       
  }

  constructor(private projectService: ProjectService, 
    private genaralService: ProgenaralService, 
    private router:Router,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private datePipe: DatePipe
    ) { }

  ngOnInit(): void {

    this.doGetInitialCurrent()
    this.doLoadMenu()        
    this.doLoadLanguage()   
    this.doLoadMaster()

    setTimeout(() => {
      this.doLoadProject()  
    }, 300);

  }

  doLoadMenu(){
       
    this.items = [   
      {
        label:this.title_new,
        icon:'pi pi-fw pi-plus',
        command: (event) => {
          
          this.selectedProject = new ProjectModel();    
          this.selectedProbusiness = new ProbusinessModel();
          this.selectedProtype = new ProtypeModel();    
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

  doLoadMaster(){
    this.genaralService.probusiness_get().then((res) => {
      //console.log(res)
      this.probusiness_list = res;     
    });

    this.genaralService.protype_get().then((res) => {
      this.protype_list = res;     
    });
  }

  clear(table: Table) {
    table.clear();
  }

  selectProject(){

    console.log(this.selectedProject.project_code)

    let navigationExtras: NavigationExtras = {
      queryParams: {
          "project": this.selectedProject.project_code
      }
    };

    this.router.navigate(["project/manage"],  navigationExtras);
  }

  onRowSelectProject(event: Event) {
    this.edit_data= true;

    this.doLoadSelectedProbusiness(this.selectedProject.project_probusiness);
    this.doLoadSelectedProtype(this.selectedProject.project_protype);
  }

  doLoadSelectedProbusiness(value:string){
    for (let i = 0; i < this.probusiness_list.length; i++) {   
      if(this.probusiness_list[i].probusiness_code==value ){
        this.selectedProbusiness = this.probusiness_list[i];
        break;         
      }                      
    }
  }

  doLoadSelectedProtype(value:string){
    for (let i = 0; i < this.protype_list.length; i++) {   
      if(this.protype_list[i].protype_code==value ){
        this.selectedProtype = this.protype_list[i];
        break;         
      }                      
    }
  }

  selectedProject: ProjectModel = new ProjectModel;
  doLoadProject(){
    
    this.projectService.project_get(this.initial_current.CompCode, "").then((res) => {
      //console.log(res)
      this.project_list = res;     
    });
  }

  confirmRecord() {
    this.confirmationService.confirm({
        message: this.title_confirm_record,
        header: this.title_confirm,
        icon: 'pi pi-exclamation-triangle',
        accept: () => {

          this.selectedProject.project_probusiness = this.selectedProbusiness.probusiness_code;
          this.selectedProject.project_protype = this.selectedProtype.protype_code;

          this.projectService.project_record(this.selectedProject).then((res) => {       
            let result = JSON.parse(res);  
            if(result.success){
              this.messageService.add({severity:'success', summary: 'Success', detail: result.message});
              this.doLoadProject()
            }
            else{
              this.messageService.add({severity:'error', summary: 'Error', detail: result.message});
            }  
          });
        },
        reject: () => {
          this.messageService.add({severity:'warn', summary:'Cancelled', detail:this.title_confirm_cancel});
        }
    });
  }
      
  confirmDelete() {
    this.confirmationService.confirm({
        message: this.title_confirm_delete,
        header: this.title_confirm,
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
          this.projectService.project_delete(this.selectedProject).then((res) => {      
            let result = JSON.parse(res);  
            if(result.success){
              this.messageService.add({severity:'success', summary: 'Success', detail: result.message});
              this.doLoadProject()       
            }
            else{
              this.messageService.add({severity:'error', summary: 'Error', detail: result.message});
            }  
          });
        },
        reject: () => {
          this.messageService.add({severity:'warn', summary:'Cancelled', detail:this.title_confirm_cancel});
        }
    });
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

    XLSX.writeFile(wb, 'Export_genaral.xlsx');

  }

  fileToUpload: File | any = null;  
  handleFileInput(file: FileList) {
    this.fileToUpload=file.item(0);
  }
  doUploadGenaral(){
  
    this.displayUpload = false;

    const filename = "Project_" + this.datePipe.transform(new Date(), 'yyyyMMddHHmm');
    const filetype = "xls";  

    this.projectService.project_import(this.fileToUpload, filename, filetype).then((res) => {      
      let result = JSON.parse(res);  
      if(result.success){
        this.messageService.add({severity:'success', summary: 'Success', detail: result.message});
        this.doLoadProject()    
      }
      else{
      this.messageService.add({severity:'error', summary: 'Error', detail: result.message});
      }  
    });
       
  }

  

}

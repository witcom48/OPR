import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NavigationExtras } from '@angular/router';
import { Table } from 'primeng/table';
import { ConfirmationService, MegaMenuItem,MenuItem, MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import * as XLSX from 'xlsx';


import { DatePipe } from '@angular/common';
import { InitialCurrent } from 'src/app/config/initial_current';
import { AppConfig } from 'src/app/config/config';


import { EmpDetailService } from 'src/app/services/emp/worker_detail.service';
import { PositionService } from 'src/app/services/emp/policy/position.service';
import { ApplyworkService } from 'src/app/services/recruitment/applywork.service';
import { ApplyworkModel } from 'src/app/models/recruitment/applywork';
import { InitialModel } from 'src/app/models/employee/policy/initial';
import { InitialService } from 'src/app/services/emp/policy/initial.service';

@Component({
  selector: 'app-apply-list',
  templateUrl: './apply-list.component.html',
  styleUrls: ['./apply-list.component.scss']
})
export class ApplyListComponent implements OnInit {
    applywork_code: string = "";
  applywork_list: ApplyworkModel[] = [];
  selectedApplywork : ApplyworkModel = new ApplyworkModel();
  items: MenuItem[] = [];
  edit_applywork: boolean = false;
  new_applywork: boolean = false;

  constructor(
    private applyworkService : ApplyworkService,
    private router:Router,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private datePipe: DatePipe,


    private initialService : InitialService,
    private positionService : PositionService,
    // private emptypeService : EmptypeService,
    // private empstatusService: EmpstatusService,
    private empdetailService: EmpDetailService,
    ) { }

  ngOnInit(): void {
    this.doGetInitialCurrent();


    this.doLoadInitialList();
    // this.doLoadEmptypeList();
    // this.doLoadEmpstatusList();

    setTimeout(() => {
      this.doLoadLanguage()
      this.doLoadMenu()
      this.doLoadapplywork()
    }, 500);

  }

  public initial_current: InitialCurrent = new InitialCurrent();
  doGetInitialCurrent() {
    this.initial_current = JSON.parse(localStorage.getItem(AppConfig.SESSIONInitial) || '{}');
    if (!this.initial_current) {
      this.router.navigateByUrl('');
    }
  }

  title_page: string = "Applywork";
  title_num_emp: string = "Applywork";
  title_new_emp: string = "New";
  title_resign_emp: string = "Resign";
  title_new: string = "New";
  title_edit: string = "Edit";
  title_delete: string = "Delete";
  title_import: string = "Import";
  title_export: string = "Export";
  title_save: string = "Save";
  title_code: string = "Emp. Code";
  title_initial: string = "Initial";
  title_emptype: string = "Type";
  title_position: string = "Position";
  title_Fname: string = "Firstname";
  title_Lname: string = "Surname";
  title_startdate: string = "Start Date";
  title_status: string = "Status";
  title_apprdate: string = "Approve Date";
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
      this.title_page = "ข้อมูลพนักงาน";
      this.title_num_emp = "จำนวนพนักงาน";
      this.title_new_emp = "พนักงานใหม่";
      this.title_resign_emp = "พนักงานลาออก";
      this.title_new = "เพิ่ม";
      this.title_edit = "แก้ไข";
      this.title_delete = "ลบ";
      this.title_import = "นำเข้า";
      this.title_export = "โอนออก";
      this.title_save = "บันทึก";
      this.title_code = "รหัสพนักงาน";
      this.title_initial = "คำนำหน้า";
      this.title_emptype = "ประเภทพนักงาน";
      this.title_position = "ตำแหน่ง";
      this.title_Fname = "ชื่อ";
      this.title_Fname = "ชื่อนามสกุล";
      this.title_startdate = "วันที่เริ่มงาน";
      this.title_status = "สถานะ";
      this.title_apprdate = "วันที่อนุมัติ";
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
        label:'New',
        icon:'pi pi-fw pi-plus',
        command: (event) => {
          this.selectedApplywork = new ApplyworkModel();
          this.selectComManage();

        }

      },
      {
          label:'Import',
          icon:'pi pi-fw pi-file-import',
          command: (event) => {
            this.showUpload()

          }
      },
      {
          label:'Export',
          icon:'pi pi-fw pi-file-export',
          command: (event) => {
            this.exportAsExcel()

          }
      }

    ];

  }
  //get data
  initialList:  InitialModel[] = [];
  doLoadInitialList(){
    this.initialService.initial_get().then((res) => {
      this.initialList = res;
    })
  }



applyworkCurrent:number = 0;

  doLoadapplywork(){
    this.applyworkService.applywork_get(this.initial_current.CompCode, "").then(async (res) => {
    // this.applyworkService.applywork_get(this.initial_current.CompCode,"").then(async(res) =>{
      await res.forEach((element: ApplyworkModel) => {
        element.applywork_startdate = new Date(element.applywork_startdate)
      })
      this.applywork_list = await res;
      this.applyworkCurrent = this.applywork_list.length;
    });

    



  }

  confirmRecord() {
    this.confirmationService.confirm({
      message: this.title_confirm_record,
      header: this.title_confirm,
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.doRecordApplywork()
      },
      reject: () => {
        this.messageService.add({ severity: 'warn', summary: 'Cancelled', detail: this.title_confirm_cancel });
      }
    });
    console.log(this.selectedApplywork);
  }

  doRecordApplywork(){

    this.applyworkService.applywork_recordall(this.selectedApplywork).then((res) => {
      console.log(res)
      let result = JSON.parse(res);

      if (result.success) {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: result.message });
        this.doLoadapplywork()
      }
      else {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: result.message });
      }

    });
  }

  confirmDelete() {
    this.confirmationService.confirm({
      message: this.title_confirm_delete,
      header: this.title_confirm,
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.doDeleteApplywork()
      },
      reject: () => {
        this.messageService.add({ severity: 'warn', summary: 'Cancelled', detail: this.title_confirm_cancel });
      }
    });
  }

  doDeleteApplywork(){
    console.log(this.selectedApplywork);
  }

  close(){
    this.new_applywork=false
    this.selectedApplywork = new ApplyworkModel()
  }
  onRowSelectApplywork(event: Event) {
    this.edit_applywork= true;
    this.new_applywork = true;
  }

  fileToUpload: File | any = null;
  handleFileInput(file: FileList) {
    this.fileToUpload = file.item(0);
  }

  doUploadApplywork(){
    console.log('Upload');
    if (this.fileToUpload) {
      this.confirmationService.confirm({
        message: "Confirm Upload file : " + this.fileToUpload.name,
        header: "Import File",
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
          const filename = "Applywork_" + this.datePipe.transform(new Date(), 'yyyyMMddHHmm');
          const filetype = "xls";

          this.applyworkService.applywork_import(this.fileToUpload, filename, filetype).then((res) => {
            console.log(res)
            let result = JSON.parse(res);

            if (result.success) {
              this.messageService.add({ severity: 'success', summary: 'Success', detail: result.message });
              this.doLoadapplywork();
              this.edit_applywork = false;
              this.new_applywork = false;
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

    XLSX.writeFile(wb, 'Export_applyworkinfo.xlsx');

  }

    selectComManage(){

    console.log(this.selectedApplywork.applywork_code)

    let navigationExtras: NavigationExtras = {
      queryParams: {
          "applycode": this.selectedApplywork.applywork_code
      }
    };

    this.router.navigate(["recruitment/apply"],  navigationExtras);
  }


}

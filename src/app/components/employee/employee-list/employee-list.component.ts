import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NavigationExtras } from '@angular/router';
import { Table } from 'primeng/table';
import { ConfirmationService, MegaMenuItem,MenuItem, MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import * as XLSX from 'xlsx';


import { EmployeeModel } from '../../../models/employee/employee';
import { DatePipe } from '@angular/common';
import { InitialCurrent } from 'src/app/config/initial_current';
import { AppConfig } from 'src/app/config/config';
import { EmployeeService } from 'src/app/services/emp/worker.service';
import { InitialModel } from '../../../models/employee/policy/initial';
import { EmptypeModel } from '../../../models/employee/policy/emptype';
import { EmpstatusModel } from '../../../models/employee/policy/empstatus';

import { InitialService } from '../../../services/emp/policy/initial.service';
import { EmptypeService } from '../../../services/emp/policy/emptype.service';
import { EmpstatusService } from '../../../services/emp/policy/empstatus.service';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss']
})
export class EmployeeListComponent implements OnInit {


  employee_list: EmployeeModel[] = [];
  selectedemployee : EmployeeModel = new EmployeeModel();
  items: MenuItem[] = [];
  edit_employee: boolean = false;
  new_employee: boolean = false;

  constructor(
    private employeeService : EmployeeService,
    private router:Router,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private datePipe: DatePipe,


    private initialService : InitialService,
    private emptypeService : EmptypeService,
    private empstatusService: EmpstatusService,
    ) { }

  ngOnInit(): void {
    this.doGetInitialCurrent();


    this.doLoadInitialList();
    this.doLoadEmptypeList();
    this.doLoadEmpstatusList();

    setTimeout(() => {
      this.doLoadLanguage()
      this.doLoadMenu()
      this.doLoadEmployee()
    }, 500);

  }

  public initial_current: InitialCurrent = new InitialCurrent();
  doGetInitialCurrent() {
    this.initial_current = JSON.parse(localStorage.getItem(AppConfig.SESSIONInitial) || '{}');
    if (!this.initial_current) {
      this.router.navigateByUrl('');
    }
  }

  title_page: string = "Employee management";
  title_num_emp: string = "Employee";
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
          this.selectedemployee = new EmployeeModel();
          this.selectEmpManage();
          // this.new_employee= true;
          // this.edit_employee= false;
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
  emptypeList: EmptypeModel[] = [];
  doLoadEmptypeList(){
    this.emptypeService.type_get().then((res)=>{
      this.emptypeList = res;
    })
  }
  statusList: EmpstatusModel[] = [];
  doLoadEmpstatusList(){
    this.empstatusService.status_get().then((res)=>{
      this.statusList = res;
    })
  }

  // selectedEmployee: EmployeeModel = new EmployeeModel;
  workerCurrent:number = 0;
  doLoadEmployee(){
    this.employeeService.worker_get().then((res) =>{
      this.employee_list = res;
      this.workerCurrent = this.employee_list.length;
    });
    
    
    // var tmp = new EmployeeModel();

    // tmp.worker_id = "1";
    // tmp.worker_code = "2022120001";
    // tmp.worker_card = "2022120001";
    // tmp.worker_initial = "นาย";
    // tmp.worker_fname_th = "ศรัณย์";
    // tmp.worker_lname_th = "ศรีห่วง";
    // tmp.worker_type = "ประจำ";
    // tmp.worker_position = "พนักงานทำความสะอาด";
    // tmp.worker_hiredate = new Date(2022, 0, 1);

    // tmp.approve_by = "hropr";
    // tmp.modified_by = "hropr";

    // tmp.worker_status = "อนุมัติ [3/3]";

    // this.employee_list.push(tmp);

    
    // tmp = new EmployeeModel();

    // tmp.worker_id = "2";
    // tmp.worker_code = "2022120002";
    // tmp.worker_card = "2022120002";
    // tmp.worker_initial = "นาย";
    // tmp.worker_fname_th = "สะอาด";
    // tmp.worker_lname_th = "สุขสมบูรณ์";
    // tmp.worker_type = "ประจำ";
    // tmp.worker_position = "พนักงานทำความสะอาด";
    // tmp.worker_hiredate = new Date(2022, 3, 1);

    // tmp.approve_by = "hropr";
    // tmp.modified_by = "hropr";

    // tmp.worker_status = "อนุมัติ [3/3]";

    // this.employee_list.push(tmp);

    // tmp = new EmployeeModel();
  }

  confirmRecord() {
    this.confirmationService.confirm({
      message: this.title_confirm_record,
      header: this.title_confirm,
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.doRecordEmployee()
      },
      reject: () => {
        this.messageService.add({ severity: 'warn', summary: 'Cancelled', detail: this.title_confirm_cancel });
      }
    });
    console.log(this.selectedemployee);
  }

  doRecordEmployee(){
    
    this.employeeService.worker_record1(this.selectedemployee).then((res) => {
      console.log(res)
      let result = JSON.parse(res);

      if (result.success) {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: result.message });
        this.doLoadEmployee()
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
        this.doDeleteEmployee()
      },
      reject: () => {
        this.messageService.add({ severity: 'warn', summary: 'Cancelled', detail: this.title_confirm_cancel });
      }
    });
  }

  doDeleteEmployee(){
    console.log(this.selectedemployee);
  }

  close(){
    this.new_employee=false
    this.selectedemployee = new EmployeeModel()
  }
  onRowSelectEmployee(event: Event) {
    this.edit_employee= true;
    this.new_employee = true;
  }

  fileToUpload: File | any = null;
  handleFileInput(file: FileList) {
    this.fileToUpload = file.item(0);
  }

  doUploadEmployee(){
    console.log('Upload');
    if (this.fileToUpload) {
      this.confirmationService.confirm({
        message: "Confirm Upload file : " + this.fileToUpload.name,
        header: "Import File",
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
          const filename = "EMPLOYEE_" + this.datePipe.transform(new Date(), 'yyyyMMddHHmm');
          const filetype = "xls";

          this.employeeService.worker_import(this.fileToUpload, filename, filetype).then((res) => {
            console.log(res)
            let result = JSON.parse(res);

            if (result.success) {
              this.messageService.add({ severity: 'success', summary: 'Success', detail: result.message });
              this.doLoadEmployee();
              this.edit_employee = false;
              this.new_employee = false;
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

    XLSX.writeFile(wb, 'Export_employeeinfo.xlsx');

  }

  selectEmpManage(){

    console.log(this.selectedemployee.worker_code)

    let navigationExtras: NavigationExtras = {
      queryParams: {
          "project": this.selectedemployee.worker_code
      }
    };

    this.router.navigate(["employee/manage"],  navigationExtras);
  }


}

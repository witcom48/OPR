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
    private router:Router,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private datePipe: DatePipe
    ) { }

  ngOnInit(): void {
    this.doGetInitialCurrent()

    this.doLoadMenu()
    this.doLoadEmployee()

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
          this.new_employee= true;
          this.edit_employee= false;
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

  selectedEmployee: EmployeeModel = new EmployeeModel;
  doLoadEmployee(){
    var tmp = new EmployeeModel();

    tmp.employee_id = "1";
    tmp.employee_code = "2022120001";
    tmp.employee_card = "2022120001";
    tmp.employee_initial = "นาย";
    tmp.employee_fnamename_th = "ศรัณย์";
    tmp.employee_lnamename_th = "ศรีห่วง";
    tmp.employee_type = "ประจำ";
    tmp.employee_position = "พนักงานทำความสะอาด";
    tmp.employee_startdate = new Date(2022, 0, 1);

    tmp.approve_by = "hropr";
    tmp.modified_by = "hropr";

    tmp.employee_status = "อนุมัติ [3/3]";

    this.employee_list.push(tmp);

    
    tmp = new EmployeeModel();

    tmp.employee_id = "1";
    tmp.employee_code = "2022120002";
    tmp.employee_card = "2022120002";
    tmp.employee_initial = "นาย";
    tmp.employee_fnamename_th = "สะอาด";
    tmp.employee_lnamename_th = "สุขสมบูรณ์";
    tmp.employee_type = "ประจำ";
    tmp.employee_position = "พนักงานทำความสะอาด";
    tmp.employee_startdate = new Date(2022, 3, 1);

    tmp.approve_by = "hropr";
    tmp.modified_by = "hropr";

    tmp.employee_status = "อนุมัติ [3/3]";

    this.employee_list.push(tmp);

    tmp = new EmployeeModel();
  }
  confirmRecord() {
    console.log('Save');
  }

  confirmDelete() {
    console.log('Delete');
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

    console.log(this.selectedEmployee.employee_code)

    let navigationExtras: NavigationExtras = {
      queryParams: {
          "project": this.selectedEmployee.employee_code
      }
    };

    this.router.navigate(["employee/manage"],  navigationExtras);
  }


}

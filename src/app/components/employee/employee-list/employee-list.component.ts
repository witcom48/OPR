import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NavigationExtras } from '@angular/router';
import { Table } from 'primeng/table';
import { ConfirmationService, MegaMenuItem, MenuItem, MessageService } from 'primeng/api';
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
import { EmpPositionModel } from 'src/app/models/employee/manage/position';
import { EmpDetailService } from 'src/app/services/emp/worker_detail.service';
import { PositionService } from 'src/app/services/emp/policy/position.service';
import { PositionModel } from 'src/app/models/employee/policy/position';


interface ImportList {
  name_th: string,
  name_en: string,
  code: string
}

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss']
})
export class EmployeeListComponent implements OnInit {


  employee_list: EmployeeModel[] = [];
  selectedemployee: EmployeeModel = new EmployeeModel();

  items: MenuItem[] = [];
  edit_employee: boolean = false;
  new_employee: boolean = false;

  ImportList: ImportList[] = [];


  constructor(
    private employeeService: EmployeeService,
    private router: Router,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private datePipe: DatePipe,


    private initialService: InitialService,
    private positionService: PositionService,
    private emptypeService: EmptypeService,
    private empstatusService: EmpstatusService,
    private empdetailService: EmpDetailService,
  ) {
    this.ImportList = [
      { name_th: 'ข้อมูลพนักงาน', name_en: 'Employee info', code: 'EMPLOYEE' },
      { name_th: 'ข้อมูลที่อยู่พนักงาน', name_en: 'Employee Address', code: 'EMPADDRESS' },
      { name_th: 'ข้อมูลบัตรพนักงาน', name_en: 'Employee Cards', code: 'EMPCARD' },
      { name_th: 'ข้อมูลบัญชีธนาคาร', name_en: 'Employee Bank account', code: 'EMPBANK' },
      { name_th: 'ข้อมูลครอบครัวพนักงาน', name_en: 'Employee Family', code: 'EMPFAMILY' },
      { name_th: 'ข้อมูลโรงพยาบาล', name_en: 'Employee Hospital', code: 'EMPHOSPITAL' },
      { name_th: 'ข้อมูลพนักงานต่างด้าว', name_en: 'Employee Foreigner', code: 'EMPFOREIGNER' },
      { name_th: 'ข้อมูลสังกัดพนักงาน', name_en: 'Employee Department', code: 'EMPDEP' },
      { name_th: 'ข้อมูลตำแหน่ง', name_en: 'Employee Position', code: 'EMPPOSITION' },
      { name_th: 'ข้อมูลการศึกษา', name_en: 'Employee Education', code: 'EMPEDUCATION' },
      { name_th: 'ข้อมูลการฝึกอบรม', name_en: 'Employee Training', code: 'EMPTRAINING' },
      { name_th: 'ข้อมูลการประเมิน', name_en: 'Employee Assessment', code: 'EMPASSESSMENT' },
      { name_th: 'ข้อมูลอาชญากรรม', name_en: 'Employee Criminal', code: 'EMPCRIMINAL' },
      { name_th: 'ข้อมูลgเงินเดือนพนักงาน', name_en: 'Employee Salary', code: 'EMPSALARY' },
      { name_th: 'ข้อมูลกองทุนสำรองฯ', name_en: 'Employee Provident', code: 'EMPPROVIDENT' },
      { name_th: 'ข้อมูลสวัสดิการพนักงาน', name_en: 'Employee Benefits', code: 'EMPBENEFIT' },
      { name_th: 'ข้อมูลค่าลดหย่อนพนักงาน', name_en: 'Employee Reduce', code: 'EMPREDUCE' },
      { name_th: 'ข้อมูลสถานที่ปฏิบัติงาน', name_en: 'Employee Location', code: 'EMPLOCATION' },
      { name_th: 'ข้อมูลกลุ่มพนักงาน', name_en: 'Employee Group', code: 'EMPGROUP' },
      { name_th: 'ข้อมูลสาขาพนักงาน', name_en: 'Employee Branch', code: 'EMPBRANCH' },
      { name_th: 'ข้อมูลอุปกรณ์สำนักงาน', name_en: 'Employee Supply', code: 'EMPSUPPLY' },
      { name_th: 'ข้อมูลชุดของพนักงาน', name_en: 'Employee Uniform', code: 'EMPUNIFORM' },
      { name_th: 'ข้อมูลผู้แนะนำของพนักงาน', name_en: 'Employee Suggest', code: 'EMPSUGGEST' },
    ];

  }

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
      this.title_Lname = "นามสกุล";
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

  doLoadMenu() {
    this.items = [

      {
        label: this.title_new,
        icon: 'pi pi-fw pi-plus',
        command: (event) => {
          this.selectedemployee = new EmployeeModel();
          this.selectEmpManage();
          // this.new_employee= true;
          // this.edit_employee= false;
        }

      },
      {
        label: this.title_import,
        icon: 'pi pi-fw pi-file-import',
        command: (event) => {
          this.showUpload()

        }
      },
      {
        label: this.title_export,
        icon: 'pi pi-fw pi-file-export',
        command: (event) => {
          this.exportAsExcel()

        }
      }

    ];

  }
  //get data
  initialList: InitialModel[] = [];
  doLoadInitialList() {
    this.initialService.initial_get().then((res) => {
      this.initialList = res;
    })
  }
  emptypeList: EmptypeModel[] = [];
  doLoadEmptypeList() {
    this.emptypeService.type_get().then((res) => {
      this.emptypeList = res;
    })
  }
  statusList: EmpstatusModel[] = [];
  doLoadEmpstatusList() {
    this.empstatusService.status_get().then((res) => {
      this.statusList = res;
    })
  }

  emppositionList: EmpPositionModel[] = [];
  doLoadempposition(worker_code: string) {
    this.empdetailService.getworker_position(this.initial_current.CompCode, worker_code).then(async (res) => {
      this.emppositionList = await res;
    })
  }
  positionList: PositionModel[] = [];
  doloadposition() {
    this.positionService.position_get().then(async (res) => {
      res.forEach((element: PositionModel) => {
      })
      this.positionList = await res
    })
  }



  // selectedEmployee: EmployeeModel = new EmployeeModel;
  workerCurrent: number = 0;
  doLoadEmployee() {
    this.employeeService.worker_get(this.initial_current.CompCode, "").then(async (res) => {
      await res.forEach((element: EmployeeModel) => {
        element.worker_hiredate = new Date(element.worker_hiredate)
      })
      this.employee_list = await res;
      this.workerCurrent = this.employee_list.length;
    });
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
      },
      key: "myDialog"
    });
    console.log(this.selectedemployee);
  }

  doRecordEmployee() {

    this.employeeService.worker_recordall(this.selectedemployee).then((res) => {
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

  doDeleteEmployee() {
    console.log(this.selectedemployee);
  }

  close() {
    this.new_employee = false
    this.selectedemployee = new EmployeeModel()
  }
  onRowSelectEmployee(event: Event) {
    this.edit_employee = true;
    this.new_employee = true;
  }

  fileToUpload: File | any = null;
  handleFileInput(file: FileList) {
    this.fileToUpload = file.item(0);
  }

  doUploadAll() {
    if (this.fileToUpload) {
      this.confirmationService.confirm({
        message: "Confirm Upload file : " + this.fileToUpload.name,
        header: "Import File",
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
          const filename = this.selectedemployee.selected_Import + "_" + this.datePipe.transform(new Date(), 'yyyyMMddHHmm');
          const filetype = "xls";
          
          switch (this.selectedemployee.selected_Import) {
            //impport employee
            case 'EMPLOYEE':
              this.employeeService.worker_import(this.fileToUpload, filename, filetype).then((res) => {
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
              })
              break;
            //import emp address
            case 'EMPADDRESS':
              this.empdetailService.empaddress_import(this.fileToUpload, filename, filetype).then((res) => {
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
              })
              break;
            //import emp card
            case 'EMPCARD':
              this.empdetailService.empcard_import(this.fileToUpload, filename, filetype).then((res) => {
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
              })
              break;
            //import emp bank
            case 'EMPBANK':
              this.empdetailService.empbank_import(this.fileToUpload, filename, filetype).then((res) => {
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
              })
              break;
            // import emp family
            case 'EMPFAMILY':
              this.empdetailService.empfamily_import(this.fileToUpload, filename, filetype).then((res) => {
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
              })
              break;
            //import emp hospital
            case 'EMPHOSPITAL':
              this.empdetailService.emphospital_import(this.fileToUpload, filename, filetype).then((res) => {
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
              })
              break;
            //import emp foreigner
            case 'EMPFOREIGNER':
              this.empdetailService.empforeigner_import(this.fileToUpload, filename, filetype).then((res) => {
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
              })
              break;
            //import emp dep
            case 'EMPDEP':
              this.empdetailService.empdep_import(this.fileToUpload, filename, filetype).then((res) => {
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
              })
              break;
            //import emp position
            case 'EMPPOSITION':
              this.empdetailService.empposition_import(this.fileToUpload, filename, filetype).then((res) => {
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
              })
              break;
            // import emp education
            case 'EMPEDUCATION':
              this.empdetailService.empeducation_import(this.fileToUpload, filename, filetype).then((res) => {
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
              })
              break;
            //import emp training
            case 'EMPTRAINING':
              this.empdetailService.emptraining_import(this.fileToUpload, filename, filetype).then((res) => {
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
              })
              break;
            //import emp assessement
            case 'EMPASSESSMENT':
              this.empdetailService.empassessment_import(this.fileToUpload, filename, filetype).then((res) => {
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
              })
              break;
            //import emp criminal
            case 'EMPCRIMINAL':
              this.empdetailService.empcriminal_import(this.fileToUpload, filename, filetype).then((res) => {
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
              })
              break;
            //import emp salary
            case 'EMPSALARY':
              this.empdetailService.empsalary_import(this.fileToUpload, filename, filetype).then((res) => {
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
              })
              break;
            //import emp provident
            case 'EMPPROVIDENT':
              this.empdetailService.empprovident_import(this.fileToUpload, filename, filetype).then((res) => {
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
              })
              break;
            //import emp benefit
            case 'EMPBENEFIT':
              this.empdetailService.empbenefit_import(this.fileToUpload, filename, filetype).then((res) => {
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
              })
              break;
            //import emp reduce
            case 'EMPREDUCE':
              this.empdetailService.empreduce_import(this.fileToUpload, filename, filetype).then((res) => {
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
              })
              break;
            //import emp location
            case 'EMPLOCATION':
              this.empdetailService.emplocation_import(this.fileToUpload, filename, filetype).then((res) => {
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
              })
              break;
            //import emp group
            case 'EMPGROUP':
              this.empdetailService.empgroup_import(this.fileToUpload, filename, filetype).then((res) => {
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
              })
              break;
            //import emp branch
            case 'EMPBRANCH':
              this.empdetailService.empbranch_import(this.fileToUpload, filename, filetype).then((res) => {
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
              })
              break;
            //import emp supply
            case 'EMPSUPPLY':
              this.empdetailService.empsupply_import(this.fileToUpload, filename, filetype).then((res) => {
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
              })
              break;
            //import emp uniform
            case 'EMPUNIFORM':
              this.empdetailService.empuniform_import(this.fileToUpload, filename, filetype).then((res) => {
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
              })
              break;
            //import emp suggest
            case 'EMPSUGGEST':
              this.empdetailService.empsuggest_import(this.fileToUpload, filename, filetype).then((res) => {
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
              })
              break;
          }

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

  getnameList(position_code: string) {
    let result = this.positionList.find((obj: PositionModel) => {
      return obj.position_code === position_code;
    })
    var res1 = result?.position_name_th;
    var res2 = result?.position_name_en;
    return { th: res1, en: res2 };
  }

  @ViewChild('TABLE') table: ElementRef | any = null;

  exportAsExcel() {
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(this.table.nativeElement);//converts a DOM TABLE element to a worksheet
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    XLSX.writeFile(wb, 'Export_employeeinfo.xlsx');

  }

  selectEmpManage() {

    console.log(this.selectedemployee.worker_code)

    let navigationExtras: NavigationExtras = {
      queryParams: {
        "empcode": this.selectedemployee.worker_code
      }
    };

    this.router.navigate(["employee/manage"], navigationExtras);
  }


}

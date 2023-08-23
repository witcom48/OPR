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
import { FillterEmpModel } from 'src/app/models/usercontrol/filteremp';
import { ReasonsModel } from 'src/app/models/system/policy/reasons';
import { ReasonsService } from 'src/app/services/system/policy/reasons.service';
import { PartModel } from 'src/app/models/employee/policy/part';
import { LevelModel } from 'src/app/models/system/policy/level';
import { LevelService } from 'src/app/services/system/policy/level.service';
import { PartService } from 'src/app/services/emp/policy/part.service';
import { AccessdataModel } from 'src/app/models/system/security/accessdata';


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

  workerDetail: any;
  getLanguage(): string {
    return this.initial_current.Language;
  }
  constructor(
    private employeeService: EmployeeService,
    private reasonsService: ReasonsService,

    private router: Router,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private datePipe: DatePipe,


    private initialService: InitialService,
    private positionService: PositionService,
    private emptypeService: EmptypeService,
    private empstatusService: EmpstatusService,
    private empdetailService: EmpDetailService,
    private levelService: LevelService,
    private depService: PartService,
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
      { name_th: 'ข้อมูลการประเมิน', name_en: 'Employee Appraisal', code: 'EMPASSESSMENT' },
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

    this.doLoadLanguage()

    this.doLoadInitialList();
    this.doLoadEmptypeList();
    this.doLoadEmpstatusList();
    this.doLoadblackList();
    this.doLoadReason();
    this.doLoadMenu();
    this.doLoadlevelList();
    setTimeout(() => {
      // this.doLoadEmployee()
      this.doGetDataFillter();
    }, 500);

  }

  initialData2: InitialCurrent = new InitialCurrent();
  accessData: AccessdataModel = new AccessdataModel();
  public initial_current: InitialCurrent = new InitialCurrent();
  doGetInitialCurrent() {
    this.initial_current = JSON.parse(localStorage.getItem(AppConfig.SESSIONInitial) || '{}');
    if (!this.initial_current) {
      this.router.navigateByUrl('login');
    }
    this.accessData = this.initialData2.dotGetPolmenu('EMP');

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
  title_name: string = "Name";
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

  title_saves: { [key: string]: string } = { EN: "Save", TH: "บันทึก" };
  title_more: { [key: string]: string } = { EN: "More", TH: "เพิ่มเติม" };
  title_deletes: { [key: string]: string } = { EN: "Delete", TH: "ลบ" };
  title_searchemp: { [key: string]: string } = { EN: "Search", TH: "ค้นหา" };
  title_blacklist: { [key: string]: string } = { EN: "Blacklist", TH: "แบล็คลิสต์" };
  title_resign: { [key: string]: string } = { EN: "Include Resign", TH: "รวมพนักงานลาออก" };
  title_cardno: { [key: string]: string } = { EN: "ID Card", TH: "เลขบัตรประชาชน" };
  title_level: { [key: string]: string } = { EN: "Level", TH: "ระดับ" };

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
      this.title_export = "ส่งออกไฟล์";
      this.title_save = "บันทึก";
      this.title_code = "รหัสพนักงาน";
      this.title_initial = "คำนำหน้า";
      this.title_emptype = "ประเภทพนักงาน";
      this.title_position = "ตำแหน่ง";
      this.title_name = "ชื่อ-นามสกุล";
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
          if (this.accessData.accessdata_new) {
            this.selectedemployee = new EmployeeModel();
            this.selectEmpManage();
            // this.new_employee= true;
            // this.edit_employee= false;
          } else {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Permistion' });
          }
        }

      },
      {
        label: "Template",
        icon: 'pi-download',
        // command: (event) => {
        //   window.open('assets/OPRFileImport/(OPR)Import emp/(OPR)Import Emptype.xlsx', '_blank');
        // }
        items: [
          {
            label: "Employee info",
            // icon: 'pi-download',
            command: (event) => {
              window.open('assets/OPRFileImport/(OPR)Import emp/(OPR)Import Employee.xlsx', '_blank');
            }
          },
          {
            label: "General",
            items: [
              {
                label: "Employee Location",
                // icon: 'pi-download',
                command: (event) => {
                  window.open('assets/OPRFileImport/(OPR)Import emp/(OPR)Import Employee Location.xlsx', '_blank');
                }
              },
              {
                label: "Employee Branch",
                // icon: 'pi-download',
                command: (event) => {
                  window.open('assets/OPRFileImport/(OPR)Import emp/(OPR)Import Employee Branch.xlsx', '_blank');
                }
              },
              {
                label: "Employee Suggest",
                // icon: 'pi-download',
                command: (event) => {
                  window.open('assets/OPRFileImport/(OPR)Import emp/(OPR)Import Employee Suggest.xlsx', '_blank');
                }
              },
            ],
          },
          {
            label: "Personal",
            items: [
              {
                label: "Employee Address",
                // icon: 'pi-download',
                command: (event) => {
                  window.open('assets/OPRFileImport/(OPR)Import emp/(OPR)Import Employee Address.xlsx', '_blank');
                }
              },
              {
                label: "Employee Bank Account",
                // icon: 'pi-download',
                command: (event) => {
                  window.open('assets/OPRFileImport/(OPR)Import emp/(OPR)Import Employee Bank.xlsx', '_blank');
                }
              },
              {
                label: "Employee Family",
                // icon: 'pi-download',
                command: (event) => {
                  window.open('assets/OPRFileImport/(OPR)Import emp/(OPR)Import Employee Family.xlsx', '_blank');
                }
              },
              {
                label: "Employee Hospital",
                // icon: 'pi-download',
                command: (event) => {
                  window.open('assets/OPRFileImport/(OPR)Import emp/(OPR)Import Employee Hospital.xlsx', '_blank');
                }
              },
              {
                label: "Employee Foreigner",
                // icon: 'pi-download',
                command: (event) => {
                  window.open('assets/OPRFileImport/(OPR)Import emp/(OPR)Import Employee Foreigner.xlsx', '_blank');
                }
              },
            ],
          },
          {
            label: "Record",
            items: [
              {
                label: "Employee Department",
                // icon: 'pi-download',
                command: (event) => {
                  window.open('assets/OPRFileImport/(OPR)Import emp/(OPR)Import Employee Department.xlsx', '_blank');
                }
              },
              {
                label: "Employee Position",
                // icon: 'pi-download',
                command: (event) => {
                  window.open('assets/OPRFileImport/(OPR)Import emp/(OPR)Import Employee Position.xlsx', '_blank');
                }
              },
              {
                label: "Employee Group",
                // icon: 'pi-download',
                command: (event) => {
                  window.open('assets/OPRFileImport/(OPR)Import emp/(OPR)Import Employee Group.xlsx', '_blank');
                }
              },
              {
                label: "Employee Education",
                // icon: 'pi-download',
                command: (event) => {
                  window.open('assets/OPRFileImport/(OPR)Import emp/(OPR)Import Employee Education.xlsx', '_blank');
                }
              },
              {
                label: "Employee Supply",
                // icon: 'pi-download',
                command: (event) => {
                  window.open('assets/OPRFileImport/(OPR)Import emp/(OPR)Import Employee Supply.xlsx', '_blank');
                }
              },
              {
                label: "Employee Uniform",
                // icon: 'pi-download',
                command: (event) => {
                  window.open('assets/OPRFileImport/(OPR)Import emp/(OPR)Import Employee Uniform.xlsx', '_blank');
                }
              },
              {
                label: "Employee Training",
                // icon: 'pi-download',
                command: (event) => {
                  window.open('assets/OPRFileImport/(OPR)Import emp/(OPR)Import Employee Training.xlsx', '_blank');
                }
              },
              {
                label: "Employee Appraisal",
                // icon: 'pi-download',
                command: (event) => {
                  window.open('assets/OPRFileImport/(OPR)Import emp/(OPR)Import Employee Appraisal.xlsx', '_blank');
                }
              },
              {
                label: "Employee Criminal",
                // icon: 'pi-download',
                command: (event) => {
                  window.open('assets/OPRFileImport/(OPR)Import emp/(OPR)Import Employee Criminal.xlsx', '_blank');
                }
              },
            ],
          },
          {
            label: "Payroll",
            items: [
              {
                label: "Employee Salary",
                // icon: 'pi-download',
                command: (event) => {
                  window.open('assets/OPRFileImport/(OPR)Import emp/(OPR)Import Employee Salary.xlsx', '_blank');
                }
              },
              {
                label: "Employee Provident",
                // icon: 'pi-download',
                command: (event) => {
                  window.open('assets/OPRFileImport/(OPR)Import emp/(OPR)Import Employee Provident.xlsx', '_blank');
                }
              },
              {
                label: "Employee Benefits",
                // icon: 'pi-download',
                command: (event) => {
                  window.open('assets/OPRFileImport/(OPR)Import emp/(OPR)Import Employee Benefit.xlsx', '_blank');
                }
              },
              {
                label: "Employee Reduce",
                // icon: 'pi-download',
                command: (event) => {
                  window.open('assets/OPRFileImport/(OPR)Import emp/(OPR)Import Employee Reduce.xlsx', '_blank');
                }
              },
            ],
          },
        ]

      }
      ,
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
          // this.exportAsExcel()
          this.exportEmpExcel()
        }
      },
      // {
      //   label: 'Test Export Json',
      //   icon: 'pi pi-fw pi-file-export',
      //   command: (event) => {
      //     // this.exportjsonexcel()
      //     this.showExport();

      //   }
      // }

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
  /////
  reason_list: ReasonsModel[] = [];
  reasons: ReasonsModel = new ReasonsModel();
  blackList: EmployeeModel[] = [];


  doLoadblackList() {
    this.employeeService.worker_get(this.initial_current.CompCode, '').then((res) => {
      this.blackList = res;
    });
  }

  async doLoadReason() {
    try {
      const tmp = new ReasonsModel();
      tmp.reason_group = 'BLACK';
      const res = await this.reasonsService.reason_get(tmp);
      this.reason_list = res;
      // console.log(res, 'te');
    } catch (error) {
    }
  }

  getDetail(strucCode: string): string {
    const foundReason = this.reason_list.find(item => item.reason_code === strucCode);
    if (foundReason) {
      return this.initial_current.Language === 'TH' ? foundReason.reason_name_th : foundReason.reason_name_en;
    }
    return '';
  }

  /////
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
  levelList: LevelModel[] = [];
  doLoadlevelList() {
    var tmp = new LevelModel();
    tmp.level_code = this.selectedLevel;
    this.levelService.level_get(tmp).then(async (res) => {
      this.levelList = await res;
    })
  }
  deplevelList: PartModel[] = [];
  doLoadDeplevelList() {
    var tmp = new LevelModel();
    tmp.level_code = this.selectedLevel;
    this.depService.dep_get(tmp).then(async (res) => {
      this.deplevelList = await res;
    })
  }



  // selectedEmployee: EmployeeModel = new EmployeeModel;
  workerCurrent: number = 0;
  // doLoadEmployee() {
  //   this.employeeService.worker_get(this.initial_current.CompCode, "").then(async (res) => {
  //     await res.forEach((element: EmployeeModel) => {
  //       element.worker_birthdate = new Date(element.worker_birthdate)
  //       element.worker_hiredate = new Date(element.worker_hiredate)
  //       element.worker_resigndate = new Date(element.worker_resigndate)
  //       element.worker_probationdate = new Date(element.worker_probationdate)
  //       element.worker_probationenddate = new Date(element.worker_probationenddate)
  //     })
  //     this.employee_list = await res;
  //     this.workerCurrent = this.employee_list.length;
  //   });
  // }

  fillterIncludeResign: boolean = false;
  doGetDataFillter() {
    var fillter: FillterEmpModel = new FillterEmpModel;

    fillter.company_code = this.initial_current.CompCode;
    //fillter position
    if (this.fillterPosition) {
      fillter.position_code = this.selectedPosition;
    } else {
      fillter.position_code = "";
    }
    //fillter blackelist
    // fillter.worker_blackliststatus = this.fillterBlacklist;
    //fillter dep
    if (this.fillterLevel) {
      fillter.level_code = this.selectedLevel;
      fillter.dep_code = this.selectedDep;
    } else {
      fillter.level_code = "";
      fillter.dep_code = "";
    }
    //fillter emptype
    if (this.fillterEmptype) {
      fillter.worker_emptype = this.selectedEmptype;
    } else {
      fillter.worker_emptype = "";
    }
    //fillter empstatus
    if (this.fillterEmpstatus) {
      fillter.worker_empstatus = this.selectedEmpstatus;
    } else {
      fillter.worker_empstatus = "";
    }
    //fillter resign
    fillter.worker_resignstatus = this.fillterIncludeResign;
    //fillter employee
    fillter.searchemp = this.selectedSearchemp;

    this.employeeService.worker_getbyfillter(fillter).then(async (res) => {
      await res.forEach((element: EmployeeModel) => {
        element.worker_birthdate = new Date(element.worker_birthdate)
        element.worker_hiredate = new Date(element.worker_hiredate)
        element.worker_resigndate = new Date(element.worker_resigndate)
        element.worker_probationdate = new Date(element.worker_probationdate)
        element.worker_probationenddate = new Date(element.worker_probationenddate)
      })
      this.employee_list = await res;
      console.log(res);
      this.workerCurrent = this.employee_list.length;
    })
  }

  //-- Type master
  selectedEmptype: string = "";
  fillterEmptype: boolean = false;
  doChangeSelectEmptype() {

    if (this.fillterEmptype) {
      this.doGetDataFillter();
    }
  }

  //--   blacklist
  selectedBlacklist: string = "";
  fillterBlacklist: boolean = false;
  doChangeBlacklist() {
    if (this.fillterBlacklist) {
      this.doGetDataFillter();
    }
  }

  //-- Position master
  selectedPosition: string = "";
  fillterPosition: boolean = false;
  doChangeSelectPosition() {

    if (this.fillterPosition) {
      this.doGetDataFillter();
    }
  }
  //-- Status master
  selectedEmpstatus: string = "";
  fillterEmpstatus: boolean = false;
  doChangeSelectEmpstatus() {

    if (this.fillterEmpstatus) {
      this.doGetDataFillter();
    }
  }
  //-- Level
  selectedLevel: string = "";
  fillterLevel: boolean = false;
  doChangeSelectLevel() {
    this.doLoadDeplevelList();
  }

  //-- Dep master
  selectedDep: string = "";
  doChangeSelectDep() {

    if (this.fillterLevel) {
      this.doGetDataFillter();
    }
  }
  //-- Emp master
  selectedSearchemp: string = "";
  fillterSearchemp: boolean = false;
  doChangeSearchemp(event: any) {
    this.doGetDataFillter();
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
  }

  doRecordEmployee() {

    this.employeeService.worker_recordall(this.selectedemployee).then((res) => {
      // console.log(res)
      let result = JSON.parse(res);

      if (result.success) {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: result.message });
        this.doGetDataFillter()
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
    var tmp: EmployeeModel = new EmployeeModel();
    tmp.worker_code = this.selectedemployee.worker_code
    tmp.worker_id = this.selectedemployee.worker_id
    this.employeeService.worker_delete(tmp).then((res) => {
      let result = JSON.parse(res);

      if (result.success) {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: result.message });
        this.doGetDataFillter();
        this.edit_employee = false;
        this.new_employee = false;
        this.displayManage = false
      }
      else {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: result.message });
      }
    })
  }

  close() {
    this.new_employee = false
    this.selectedemployee = new EmployeeModel()
  }
  onRowSelectEmployee(event: Event) {
    this.edit_employee = true;
    this.new_employee = true;
    this.displayManage = true
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
                  this.doGetDataFillter();
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
                  this.doGetDataFillter();
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
                  this.doGetDataFillter();
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
                  this.doGetDataFillter();
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
                  this.doGetDataFillter();
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
                  this.doGetDataFillter();
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
                  this.doGetDataFillter();
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
                  this.doGetDataFillter();
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
                  this.doGetDataFillter();
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
                  this.doGetDataFillter();
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
                  this.doGetDataFillter();
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
                  this.doGetDataFillter();
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
                  this.doGetDataFillter();
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
                  this.doGetDataFillter();
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
                  this.doGetDataFillter();
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
                  this.doGetDataFillter();
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
                  this.doGetDataFillter();
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
                  this.doGetDataFillter();
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
                  this.doGetDataFillter();
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
                  this.doGetDataFillter();
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
                  this.doGetDataFillter();
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
                  this.doGetDataFillter();
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
                  this.doGetDataFillter();
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

  ///
  displayManage: boolean = false;
  position: string = "right";
  showManage() {
    this.displayManage = true
  }

  displayUpload: boolean = false;
  showUpload() {
    this.displayUpload = true;
  }

  displayExport: boolean = false;
  showExport() {
    this, this.displayExport = true;
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

  // exportAsExcel() {
  //   const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(this.table.nativeElement);//converts a DOM TABLE element to a worksheet
  //   for (var i in ws) {
  //     if (i.startsWith("!") || i.charAt(1) !== "1") {
  //       continue;
  //     }
  //     var n = 0;
  //     for (var j in ws) {
  //       if (j.startsWith(i.charAt(0)) && j.charAt(1) !== "1" && ws[i].v !== "") {
  //         ws[j].v = ws[j].v.replace(ws[i].v, "")
  //       } else {
  //         n += 1;
  //       }

  //     }
  //   }
  //   const wb: XLSX.WorkBook = XLSX.utils.book_new();
  //   XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

  //   XLSX.writeFile(wb, 'Export_employeeinfo.xlsx');

  // }

  exportEmpExcel() {
    const fileToExport = this.employee_list.map((items: any) => {
      return {
        "company_code": items?.company_code,
        "worker_code": items?.worker_code,
        "worker_card": items?.worker_card,
        "worker_initial": items?.worker_initial,
        "worker_fname_th": items?.worker_fname_th,
        "worker_lname_th": items?.worker_lname_th,
        "worker_fname_en": items?.worker_fname_en,
        "worker_lname_en": items?.worker_lname_en,
        "worker_type": items?.worker_type,
        "worker_gender": items?.worker_gender,
        "worker_birthdate": items?.worker_birthdate,
        "worker_hiredate": items?.worker_hiredate,
        "religion_code": items?.religion_code,
        "blood_code": items?.blood_code,
        "worker_height": items?.worker_height,
        "worker_weight": items?.worker_weight,
        "worker_status": items?.worker_status,
        "worker_resignstatus": items?.worker_resignstatus,
        "worker_resigndate": items?.worker_resigndate,
        "worker_resignreason": items?.worker_resignreason,
        "worker_probationdate": items?.worker_probationdate,
        "worker_probationenddate": items?.worker_probationenddate,
        "worker_probationday": items?.worker_probationday,
        "hrs_perday": items?.hrs_perday,
        "worker_taxmethod": items?.worker_taxmethod,
        "worker_tel": items?.worker_tel,
        "worker_email": items?.worker_email,
        "worker_line": items?.worker_line,
        "worker_facebook": items?.worker_facebook,
        "worker_military": items?.worker_military,
      }
    });
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(fileToExport);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    XLSX.writeFile(wb, 'Export_employeeinfo.xlsx');
  }

  selectEmpManage() {

    // console.log(this.selectedemployee.worker_code)

    let navigationExtras: NavigationExtras = {
      queryParams: {
        "empcode": this.selectedemployee.worker_code
      }
    };

    this.router.navigate(["employee/manage"], navigationExtras);
  }


}

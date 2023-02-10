import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, MegaMenuItem, MenuItem, MessageService } from 'primeng/api';
import { AppConfig } from '../../../config/config';
import { InitialCurrent } from '../../../config/initial_current';

//import model
import { EmployeeModel } from '../../../models/employee/employee';
import { InitialModel } from '../../../models/employee/policy/initial';
import { EmptypeModel } from '../../../models/employee/policy/emptype';
import { EmpstatusModel } from '../../../models/employee/policy/empstatus';
import { EmpaddressModel } from '../../../models/employee/manage/address';
import { EmpcardModel } from '../../../models/employee/manage/card';

//import service
import { EmployeeService } from '../../../services/emp/worker.service';
import { InitialService } from '../../../services/emp/policy/initial.service';
import { EmptypeService } from '../../../services/emp/policy/emptype.service';
import { EmpstatusService } from '../../../services/emp/policy/empstatus.service';
import { EmpbankModel } from 'src/app/models/employee/manage/bank';




interface Taxmethod {
  name_th: string,
  name_en: string,
  code: string
}


@Component({
  selector: 'app-employee-manage',
  templateUrl: './employee-manage.component.html',
  styleUrls: ['./employee-manage.component.scss']
})
export class EmployeeManageComponent implements OnInit {

  gender: any;
  toolbar_menu: MenuItem[] = [];
  items: MenuItem[] = [];
  items_tab: MenuItem[] = [];

  employee_list: EmployeeModel[] = [];
  selectedEmployee: EmployeeModel = new EmployeeModel();

  edit_employee: boolean = false;
  new_employee: boolean = false;

  resign_emp: boolean = false;

  taxM: Taxmethod[] = [];

  constructor(
    private employeeService: EmployeeService,
    private router: Router,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private datePipe: DatePipe,

    //service
    private initialService : InitialService,
    private emptypeService : EmptypeService,
    private empstatusService: EmpstatusService,
  ) { 
      this.taxM = [
        {name_th: 'พนักงานจ่ายเอง', name_en:'Employee Pay', code: '1'},
        {name_th: 'บริษัทออกให้ครั้งเดียว', name_en:'Company Pay Once', code: '2'},
        {name_th: 'บริษัทออกให้ตลอด', name_en:'Company Pay Every', code: '3'},
      ];
  }

  ngOnInit(): void {
    this.doGetInitialCurrent();


    this.doLoadInitialList();
    this.doLoadEmptypeList();
    this.doLoadEmpstatusList();


    this.doLoadEmpaddressList();
    this.doLoadEmpcardList();
    this.doLoadEmpbankList();

    setTimeout(() => {
      this.doLoadSimple();
    }, 500);

  }

  public initial_current: InitialCurrent = new InitialCurrent();
  doGetInitialCurrent() {
    this.initial_current = JSON.parse(localStorage.getItem(AppConfig.SESSIONInitial) || '{}');
    if (!this.initial_current) {
      this.router.navigateByUrl('');
    }
  }

  title_page: string = "Employee Management";
  title_new: string = "New";
  title_edit: string = "Edit";
  title_delete: string = "Delete";
  title_import: string = "Import";
  title_export: string = "Export";
  title_save: string = "Save";
  title_code: string = "Code";

  title_genaral : string = "Genaral";
  title_empid: string = "Employee ID";
  title_cardid: string = "Employee Card";
  title_fname_th: string = "First Name (Thai)";
  title_lname_th: string = "Last Name (Thai)";
  title_fname_en: string = "First Name (Eng.)";
  title_lname_en: string = "Last Name (Eng.)";
  title_initial: string = "Initial";
  title_gender: string = "Gender";
  title_type: string = "Employee Type";
  title_status: string = "Employee Status";
  title_birthdate: string = "Birth Date";
  title_startdate: string = "Start Date";
  title_hrs: string = "Hour/Day";
  title_probation: string = "Probation";
  title_probationdate: string = "Probation Date";
  title_probationenddate: string = "Probation End";
  title_resignstatus: string = "Resign Status";
  title_resigndate: string = "Resign Date";
  title_resignreason: string = "Resign Reason";

  title_personal : string = "Personal";
  title_religion: string = "Religion";
  title_blood: string = "Blood";
  title_weight: string = "Weight";
  title_height: string = "Height";
  title_address: string = "Address";
  title_card: string = "Card";
  title_bank: string = "Bank";
  title_family: string = "Family";
  title_hospital: string = "Hospital";
  title_foreigner: string = "Foreigner";

  title_record : string = "Record";
  title_department: string = "Department";
  title_position: string = "Position";
  title_training: string = "Training";
  title_education: string = "Education";
  title_assessment: string = "Assessment";
  title_criminal: string = "Criminal Record";

  title_finance : string = "Finance";
  title_taxmethod: string = "Tax Method";
  title_salary : string = "Salary";
  title_welfare : string = "Welfare";
  title_fund : string = "Provident Fund";
  title_reduce : string = "Reduces";
  title_accumulate :string = "Accumalate";

  title_tranfer: string = "Tranfer record";

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
      this.title_page = "ข้อมูลสถานที่ปฎิบัติงาน";
      this.title_new = "เพิ่ม";
      this.title_edit = "แก้ไข";
      this.title_delete = "ลบ";
      this.title_import = "นำเข้า";
      this.title_export = "โอนออก";
      this.title_save = "บันทึก";

      this.title_genaral = 'ข้อมูลทั่วไป';
      this.title_code = "รหัสพนักงาน";
      this.title_cardid = "รหัสบัตร";
      this.title_fname_th = "ชื่อจริง (ไทย)";
      this.title_lname_th = "นามสกุล (ไทย)";
      this.title_fname_en = "ชื่อจริง (อังกฤษ)";
      this.title_lname_en = "นามสกุล (อังกฤษ)";
      this.title_initial = "คำนำหน้า";
      this.title_gender = "เพศ";
      this.title_type = "ประเภทพนักงาน";
      this.title_status = 'สถานะ';
      this.title_birthdate = 'วันเกิด';
      this.title_startdate = 'วันที่เริ่มงาน';
      this.title_hrs = 'ชั่วโมงทำงาน';
      this.title_probation = 'จำนวนวันทดลองงาน';
      this.title_probationdate = 'วันที่เริ่มทดลองงาน';
      this.title_probationenddate = 'วันที่สิ้นสุดทดลองงาน';
      this.title_resignstatus = 'ลาออก';
      this.title_resigndate = 'วันที่ลาออก';
      this.title_resignreason = 'เหตุผลการลาออก';

      this.title_personal = 'ข้อมูลส่วนตัว';
      this.title_religion = 'ศาสนา';
      this.title_blood = 'กรุ๊ปเลือด';
      this.title_weight = 'นํ้าหนัก';
      this.title_height = 'ส่วนสูง';
      this.title_address = 'ที่อยู่';
      this.title_card = 'ข้อมูลบัตร';
      this.title_bank = 'ข้อมูลธนาคาร';
      this.title_family = 'ข้อมูลครอบครัว';
      this.title_hospital = 'ข้อมูลโรงพยาบาล';
      this.title_foreigner = 'ข้อมูลพนักงานต่างด้าว';

      this.title_record = 'ข้อมูลประวัติ';
      this.title_department = 'สังกัด';
      this.title_position = 'ตำแหน่ง';
      this.title_education = 'ประวัติการศึกษา';
      this.title_training = 'ประวัติการอบรม';
      this.title_assessment = 'ประวัติการประเมิน';
      this.title_criminal = 'ประวัติการตรวจสอบอาชญากรรม'

      this.title_finance = 'การเงิน';
      this.title_taxmethod = 'การคำนวนภาษี';
      this.title_salary = 'เงินเดือน/ค่าจ้าง';
      this.title_welfare = 'สวัสดิการ';
      this.title_fund = 'กองทุนสำรองเลี้ยงชีพ';
      this.title_reduce = 'ค่าลดหย่อน';
      this.title_accumulate = 'รายได้สะสม/ภาษีสะสม';

      this.title_tranfer = 'ประวัติการโอนย้ายหน่วยงาน';

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


  doLoadSimple() {
    this.toolbar_menu = [
      {
        label: 'Back',
        icon: 'pi-arrow-left',
        command: (event) => {
          this.router.navigateByUrl('employee/list');
        }
      },
      {
        label: 'Save',
        icon: 'pi pi-fw pi-save',
        command: (event) => {
          // console.log('Save')
          this.confirmRecord()
        }

      },

    ];


    this.items = [

      {
        label: 'New',
        icon: 'pi pi-fw pi-plus',

      },
      {
        label: 'Edit',
        icon: 'pi pi-fw pi-pencil',
        command: (event) => {
          console.log('Edit')
        }
      }
      ,
      {
        label: 'Delete',
        icon: 'pi pi-fw pi-trash',
      }
      ,
      {
        label: 'Import',
        icon: 'pi pi-fw pi-file-import',
      }
      ,
      {
        label: 'Export',
        icon: 'pi pi-fw pi-file-export',
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

  empaddressList: EmpaddressModel[] = [];
  doLoadEmpaddressList(){
    this.employeeService.getworker_address(this.selectedEmployee).then((res)=>{
      this.empaddressList = res;
      console.log(this.empaddressList);
    })
  }

  empcardList: EmpcardModel[] = [];
  doLoadEmpcardList(){
    this.employeeService.getworker_card(this.selectedEmployee).then((res)=>{
      this.empcardList = res;
      console.log(this.empcardList);
    })
  }

  empbankList: EmpbankModel[] = [];
  doLoadEmpbankList(){
    this.employeeService.getworker_bank(this.selectedEmployee).then((res)=>{
      this.empbankList = res;
      console.log(this.empbankList);
    })
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
    console.log(this.selectedEmployee);
  }

  doRecordEmployee(){
    
    this.employeeService.worker_recordall(this.selectedEmployee).then((res) => {
      console.log(res)
      let result = JSON.parse(res);

      if (result.success) {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: result.message });
        this.router.navigateByUrl('employee/list');
      }
      else {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: result.message });
      }

    });
  }

  close(){
    this.new_employee=false
    this.selectedEmployee = new EmployeeModel()
  }

}

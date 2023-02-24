import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
import { EmpbankModel } from '../../../models/employee/manage/bank';
import { EmpFamilyModel } from '../../../models/employee/manage/family';
import { EmpHospitalModel } from '../../../models/employee/manage/hospital';
import { EmpDepModel } from '../../../models/employee/manage/dep';
import { EmpPositionModel } from '../../../models/employee/manage/position';
import { EmpEducationModel } from '../../../models/employee/manage/education';
import { EmpTrainingModel } from '../../../models/employee/manage/training';
import { EmpSalaryModel } from '../../../models/employee/manage/salary';
import { EmpProvidentModel } from '../../../models/employee/manage/provident';
import { EmpBenefitsModel } from '../../../models/employee/manage/benefits';
import { EmpReduceModel } from '../../../models/employee/manage/reduce';
import { EmpAccumalateModel } from '../../../models/employee/manage/accumalate';

//import service
import { EmployeeService } from '../../../services/emp/worker.service';
import { InitialService } from '../../../services/emp/policy/initial.service';
import { EmptypeService } from '../../../services/emp/policy/emptype.service';
import { EmpstatusService } from '../../../services/emp/policy/empstatus.service';
import { EmpAssessmentModel } from 'src/app/models/employee/manage/assessment';
import { EmpCriminalModel } from 'src/app/models/employee/manage/criminal';
import { EmpDetailService } from 'src/app/services/emp/worker_detail.service';






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

  emp_code: string = "";
  manage_title: string = ""
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

  //menu empaddress
  menu_empaddress: MenuItem[] = [];
  edit_empaddress: boolean = false;
  new_empaddress: boolean = false;
  //menu empcard
  menu_empcard: MenuItem[] = [];
  edit_empcard: boolean = false;
  new_card: boolean = false;
  //menu empbank
  menu_empbank: MenuItem[] = [];
  edit_empbank: boolean = false;
  new_bank: boolean = false;
  //menu empfamily
  menu_empfamily: MenuItem[] = [];
  edit_empfamily: boolean = false;
  new_family: boolean = false;
  //menu emphospital
  menu_emphospital: MenuItem[] = [];
  edit_emphospital: boolean = false;
  new_hospital: boolean = false;
  //menu empforeigner
  menu_empforeigner: MenuItem[] = [];
  edit_empforeigner: boolean = false;
  new_foreigner: boolean = false;
  //menu empfamily
  menu_empdep: MenuItem[] = [];
  edit_empdep: boolean = false;
  new_dep: boolean = false;
  //menu empposition
  menu_empposition: MenuItem[] = [];
  edit_empposition: boolean = false;
  new_position: boolean = false;
  //menu empeducation
  menu_empeducation: MenuItem[] = [];
  edit_empeducation: boolean = false;
  new_education: boolean = false;
  //menu emptraining
  menu_emptraining: MenuItem[] = [];
  edit_emptraining: boolean = false;
  new_training: boolean = false;
  //menu empassessment
  menu_empassessment: MenuItem[] = [];
  edit_empassessment: boolean = false;
  new_assessment: boolean = false;
  //menu empcriminal
  menu_empcriminal: MenuItem[] = [];
  edit_empcriminal: boolean = false;
  new_criminal: boolean = false;
  //menu empsalary
  menu_empsalary: MenuItem[] = [];
  edit_empsalary: boolean = false;
  new_salary: boolean = false;
  //menu empprovident
  menu_empprovident: MenuItem[] = [];
  edit_empprovident: boolean = false;
  new_provident: boolean = false;
  //menu empbenefit
  menu_empbenefit: MenuItem[] = [];
  edit_empbenefit: boolean = false;
  new_benefit: boolean = false;
  //menu empreduce
  menu_empreduce: MenuItem[] = [];
  edit_empreduce: boolean = false;
  new_reduce: boolean = false;
  //menu empaccumalate
  menu_empaccumalate: MenuItem[] = [];
  edit_empaccumalate: boolean = false;
  new_accumalate: boolean = false;
  //menu emptranfer
  menu_emptranfer: MenuItem[] = [];
  edit_emptranfer: boolean = false;
  new_tranfer: boolean = false;


  displayManage: boolean = false;

  constructor(
    private employeeService: EmployeeService,
    private router: Router,
    private route: ActivatedRoute,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private datePipe: DatePipe,
    private empdetailService:EmpDetailService ,

    //service
    private initialService: InitialService,
    private emptypeService: EmptypeService,
    private empstatusService: EmpstatusService,
  ) {
    this.taxM = [
      { name_th: 'พนักงานจ่ายเอง', name_en: 'Employee Pay', code: '1' },
      { name_th: 'บริษัทออกให้ครั้งเดียว', name_en: 'Company Pay Once', code: '2' },
      { name_th: 'บริษัทออกให้ตลอด', name_en: 'Company Pay Every', code: '3' },
    ];
  }

  ngOnInit(): void {

    this.route.queryParams.subscribe(params => {
      this.emp_code = params['empcode'];
      console.log(this.emp_code);
    });

    this.doGetInitialCurrent();


    this.doLoadInitialList();
    this.doLoadEmptypeList();
    this.doLoadEmpstatusList();


    setTimeout(() => {
      this.doLoadMenu();
    }, 100);

    setTimeout(() => {
      if (this.emp_code != "") {
        this.doLoadEmployee()
      }

    }, 400);

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

  title_summit: string = "Summit";
  title_cancel: string = "Cancel";

  title_genaral: string = "Genaral";
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

  title_personal: string = "Personal";
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

  title_record: string = "Record";
  title_department: string = "Department";
  title_position: string = "Position";
  title_training: string = "Training";
  title_education: string = "Education";
  title_assessment: string = "Assessment";
  title_criminal: string = "Criminal Record";

  title_finance: string = "Finance";
  title_taxmethod: string = "Tax Method";
  title_salary: string = "Salary";
  title_benefit: string = "Benefit";
  title_fund: string = "Provident Fund";
  title_reduce: string = "Reduces";
  title_accumulate: string = "Accumalate";

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

      this.title_summit = "บันทึก";
      this.title_cancel = "ยกเลิก";

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
      this.title_benefit = 'สวัสดิการ';
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


  doLoadMenu() {
    //menumain
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

      },];
    //menu address
    this.menu_empaddress = [
      {
        label: 'New',
        icon: 'pi pi-fw pi-plus',
        command: (event) => {
          console.log("NEW");
          this.clearManage()
          this.new_empaddress = true
          var ref = this.empaddressList.length + 100
          this.selectedEmpAddress = new EmpaddressModel()
          this.selectedEmpAddress.address_id = ref.toString()
          this.showManage()
        }
      },
      {
        label: 'Edit',
        icon: 'pi pi-fw pi-pencil',
        command: (event) => {
          console.log("EDIT");
          this.clearManage()
          if (this.selectedEmpAddress != null) {
            this.edit_empaddress = true
            this.showManage()
          }
        }
      },
      {
        label: 'Delete',
        icon: 'pi pi-fw pi-trash',
        command: (event) => {
          console.log("DELETE");
          if(this.selectedEmpAddress != null){
            this.empaddress_remove()  
          }
        }
      },
      {
        label: 'Import',
        icon: 'pi pi-fw pi-file-import',
        command: (event) => {
          console.log("IMPORT");
        }
      },
      {
        label: 'Export',
        icon: 'pi pi-fw pi-file-export',
        command: (event) => {
          
        }
      }];
    //menu card
    this.menu_empcard = [
      {
        label: 'New',
        icon: 'pi pi-fw pi-plus',
        command: (event) => {
          console.log("NEW");
          this.clearManage()
          this.new_card = true
          var ref = this.empcardList.length + 100
          this.selectedEmpcard = new EmpcardModel()
          this.selectedEmpcard.card_id = ref.toString()
          this.showManage()
        }
      },
      {
        label: 'Edit',
        icon: 'pi pi-fw pi-pencil',
        command: (event) => {
          console.log("EDIT");
          this.clearManage()
          if (this.selectedEmpcard != null) {
            this.edit_empcard = true
            this.showManage()
          }
        }
      },
      {
        label: 'Delete',
        icon: 'pi pi-fw pi-trash',
        command: (event) => {
          console.log("DELETE");
          
        }
      },
      {
        label: 'Import',
        icon: 'pi pi-fw pi-file-import',
        command: (event) => {
          console.log("IMPORT");
        }
      },
      {
        label: 'Export',
        icon: 'pi pi-fw pi-file-export',
        command: (event) => {
          console.log("EXPORT");
        }
      }];
    //menu bank
    this.menu_empbank = [
      {
        label: 'New',
        icon: 'pi pi-fw pi-plus',
        command: (event) => {
          console.log("NEW");
          this.clearManage()
          this.new_bank = true
          var ref = this.empbankList.length + 100
          this.selectedEmpbank = new EmpbankModel()
          this.selectedEmpbank.bank_id = ref.toString()
          this.showManage()
        }
      },
      {
        label: 'Edit',
        icon: 'pi pi-fw pi-pencil',
        command: (event) => {
          console.log("EDIT");
          this.clearManage()
          if (this.selectedEmpbank != null) {
            this.edit_empbank = true
            this.showManage()
          }
        }
      },
      {
        label: 'Delete',
        icon: 'pi pi-fw pi-trash',
        command: (event) => {
          console.log("DELETE");
        }
      },
      {
        label: 'Import',
        icon: 'pi pi-fw pi-file-import',
        command: (event) => {
          console.log("IMPORT");
        }
      },
      {
        label: 'Export',
        icon: 'pi pi-fw pi-file-export',
        command: (event) => {
          console.log("EXPORT");
        }
      }];
    //menu family
    this.menu_empfamily = [
      {
        label: 'New',
        icon: 'pi pi-fw pi-plus',
        command: (event) => {
          console.log("NEW");
          this.clearManage()
          this.new_family = true
          var ref = this.empfamilyList.length + 100
          this.selectedEmpfamily = new EmpFamilyModel()
          this.selectedEmpfamily.family_id = ref.toString()
          this.showManage()
        }
      },
      {
        label: 'Edit',
        icon: 'pi pi-fw pi-pencil',
        command: (event) => {
          console.log("EDIT");
          this.clearManage()
          if (this.selectedEmpfamily != null) {
            this.edit_empfamily = true
            this.showManage()
          }
        }
      },
      {
        label: 'Delete',
        icon: 'pi pi-fw pi-trash',
        command: (event) => {
          console.log("DELETE");
        }
      },
      {
        label: 'Import',
        icon: 'pi pi-fw pi-file-import',
        command: (event) => {
          console.log("IMPORT");
        }
      },
      {
        label: 'Export',
        icon: 'pi pi-fw pi-file-export',
        command: (event) => {
          console.log("EXPORT");
        }
      }]
    //menu hospital
    this.menu_emphospital = [
      {
        label: 'New',
        icon: 'pi pi-fw pi-plus',
        command: (event) => {
          console.log("NEW");
          this.clearManage()
          this.new_hospital = true
          var ref = this.emphospitalList.length + 100
          this.selectedEmphospital = new EmpHospitalModel()
          this.selectedEmphospital.emphospital_id = ref.toString()
          this.showManage()
        }
      },
      {
        label: 'Edit',
        icon: 'pi pi-fw pi-pencil',
        command: (event) => {
          console.log("EDIT");
          this.clearManage()
          if (this.selectedEmphospital != null) {
            this.edit_emphospital = true
            this.showManage()
          }
        }
      },
      {
        label: 'Delete',
        icon: 'pi pi-fw pi-trash',
        command: (event) => {
          console.log("DELETE");
        }
      },
      {
        label: 'Import',
        icon: 'pi pi-fw pi-file-import',
        command: (event) => {
          console.log("IMPORT");
        }
      },
      {
        label: 'Export',
        icon: 'pi pi-fw pi-file-export',
        command: (event) => {
          console.log("EXPORT");
        }
      }]

    //menu Dep
    this.menu_empdep = [
      {
        label: 'New',
        icon: 'pi pi-fw pi-plus',
        command: (event) => {
          console.log("NEW");
          this.clearManage()
          this.new_dep = true
          var ref = this.empdepList.length + 100
          this.selectedEmpdep = new EmpDepModel()
          this.selectedEmpdep.empdep_id = ref.toString()
          this.showManage()
        }
      },
      {
        label: 'Edit',
        icon: 'pi pi-fw pi-pencil',
        command: (event) => {
          console.log("EDIT");
          this.clearManage()
          if (this.selectedEmpdep != null) {
            this.edit_empdep = true
            this.showManage()
          }
        }
      },
      {
        label: 'Delete',
        icon: 'pi pi-fw pi-trash',
        command: (event) => {
          console.log("DELETE");
        }
      },
      {
        label: 'Import',
        icon: 'pi pi-fw pi-file-import',
        command: (event) => {
          console.log("IMPORT");
        }
      },
      {
        label: 'Export',
        icon: 'pi pi-fw pi-file-export',
        command: (event) => {
          console.log("EXPORT");
        }
      }]
    //menu Position
    this.menu_empposition = [
      {
        label: 'New',
        icon: 'pi pi-fw pi-plus',
        command: (event) => {
          console.log("NEW");
          this.clearManage()
          this.new_position = true
          var ref = this.emppositionList.length + 100
          this.selectedEmpPosition = new EmpPositionModel()
          this.selectedEmpPosition.empposition_id = ref.toString()
          this.showManage()
        }
      },
      {
        label: 'Edit',
        icon: 'pi pi-fw pi-pencil',
        command: (event) => {
          console.log("EDIT");
          this.clearManage()
          if (this.selectedEmpPosition != null) {
            this.edit_empposition = true
            this.showManage()
          }
        }
      },
      {
        label: 'Delete',
        icon: 'pi pi-fw pi-trash',
        command: (event) => {
          console.log("DELETE");
        }
      },
      {
        label: 'Import',
        icon: 'pi pi-fw pi-file-import',
        command: (event) => {
          console.log("IMPORT");
        }
      },
      {
        label: 'Export',
        icon: 'pi pi-fw pi-file-export',
        command: (event) => {
          console.log("EXPORT");
        }
      }]
    //menu education
    this.menu_empeducation = [
      {
        label: 'New',
        icon: 'pi pi-fw pi-plus',
        command: (event) => {
          console.log("NEW");
          this.clearManage()
          this.new_education = true
          var ref = this.empeducationList.length + 100
          this.selectedEmpeducation = new EmpEducationModel()
          this.selectedEmpeducation.empeducation_no = ref.toString()
          this.showManage()
        }
      },
      {
        label: 'Edit',
        icon: 'pi pi-fw pi-pencil',
        command: (event) => {
          console.log("EDIT");
          this.clearManage()
          if (this.selectedEmpeducation != null) {
            this.edit_empeducation = true
            this.showManage()
          }
        }
      },
      {
        label: 'Delete',
        icon: 'pi pi-fw pi-trash',
        command: (event) => {
          console.log("DELETE");
        }
      },
      {
        label: 'Import',
        icon: 'pi pi-fw pi-file-import',
        command: (event) => {
          console.log("IMPORT");
        }
      },
      {
        label: 'Export',
        icon: 'pi pi-fw pi-file-export',
        command: (event) => {
          console.log("EXPORT");
        }
      }]
    //menu training
    this.menu_emptraining = [
      {
        label: 'New',
        icon: 'pi pi-fw pi-plus',
        command: (event) => {
          console.log("NEW");
          this.clearManage()
          this.new_training = true
          var ref = this.emptrainingList.length + 100
          this.selectedEmptraining = new EmpTrainingModel()
          this.selectedEmptraining.emptraining_no = ref.toString()
          this.showManage()
        }
      },
      {
        label: 'Edit',
        icon: 'pi pi-fw pi-pencil',
        command: (event) => {
          console.log("EDIT");
          this.clearManage()
          if (this.selectedEmptraining != null) {
            this.edit_emptraining = true
            this.showManage()
          }
        }
      },
      {
        label: 'Delete',
        icon: 'pi pi-fw pi-trash',
        command: (event) => {
          console.log("DELETE");
        }
      },
      {
        label: 'Import',
        icon: 'pi pi-fw pi-file-import',
        command: (event) => {
          console.log("IMPORT");
        }
      },
      {
        label: 'Export',
        icon: 'pi pi-fw pi-file-export',
        command: (event) => {
          console.log("EXPORT");
        }
      }]
    //menu assessment
    this.menu_empassessment = [
      {
        label: 'New',
        icon: 'pi pi-fw pi-plus',
        command: (event) => {
          console.log("NEW");
          this.clearManage()
          this.new_assessment = true
          var ref = this.empassessmentList.length + 100
          this.selectedEmpassessment = new EmpAssessmentModel()
          this.selectedEmpassessment.empassessment_id = ref.toString()
          this.showManage()
        }
      },
      {
        label: 'Edit',
        icon: 'pi pi-fw pi-pencil',
        command: (event) => {
          console.log("EDIT");
          this.clearManage()
          if (this.selectedEmpassessment != null) {
            this.edit_empassessment = true
            this.showManage()
          }
        }
      },
      {
        label: 'Delete',
        icon: 'pi pi-fw pi-trash',
        command: (event) => {
          console.log("DELETE");
        }
      },
      {
        label: 'Import',
        icon: 'pi pi-fw pi-file-import',
        command: (event) => {
          console.log("IMPORT");
        }
      },
      {
        label: 'Export',
        icon: 'pi pi-fw pi-file-export',
        command: (event) => {
          console.log("EXPORT");
        }
      }]
    //menu criminal
    this.menu_empcriminal = [
      {
        label: 'New',
        icon: 'pi pi-fw pi-plus',
        command: (event) => {
          console.log("NEW");
          this.clearManage()
          this.new_criminal = true
          var ref = this.empcriminalList.length + 100
          this.selectedEmpcriminal = new EmpCriminalModel()
          this.selectedEmpcriminal.empcriminal_id = ref.toString()
          this.showManage()
        }
      },
      {
        label: 'Edit',
        icon: 'pi pi-fw pi-pencil',
        command: (event) => {
          console.log("EDIT");
          this.clearManage()
          if (this.selectedEmpcriminal != null) {
            this.edit_empcriminal = true
            this.showManage()
          }
        }
      },
      {
        label: 'Delete',
        icon: 'pi pi-fw pi-trash',
        command: (event) => {
          console.log("DELETE");
        }
      },
      {
        label: 'Import',
        icon: 'pi pi-fw pi-file-import',
        command: (event) => {
          console.log("IMPORT");
        }
      },
      {
        label: 'Export',
        icon: 'pi pi-fw pi-file-export',
        command: (event) => {
          console.log("EXPORT");
        }
      }]
    //menu salary
    this.menu_empsalary = [
      {
        label: 'New',
        icon: 'pi pi-fw pi-plus',
        command: (event) => {
          console.log("NEW");
          this.clearManage()
          this.new_salary = true
          var ref = this.empsalaryList.length + 100
          this.selectedEmpsalary = new EmpSalaryModel()
          this.selectedEmpsalary.empsalary_id = ref.toString()
          this.showManage()
        }
      },
      {
        label: 'Edit',
        icon: 'pi pi-fw pi-pencil',
        command: (event) => {
          console.log("EDIT");
          this.clearManage()
          if (this.selectedEmpsalary != null) {
            this.edit_empsalary = true
            this.showManage()
          }
        }
      },
      {
        label: 'Delete',
        icon: 'pi pi-fw pi-trash',
        command: (event) => {
          console.log("DELETE");
        }
      },
      {
        label: 'Import',
        icon: 'pi pi-fw pi-file-import',
        command: (event) => {
          console.log("IMPORT");
        }
      },
      {
        label: 'Export',
        icon: 'pi pi-fw pi-file-export',
        command: (event) => {
          console.log("EXPORT");
        }
      }]
    //menu provident
    this.menu_empprovident = [
      {
        label: 'New',
        icon: 'pi pi-fw pi-plus',
        command: (event) => {
          console.log("NEW");
          this.clearManage()
          this.new_provident = true
          var ref = this.empprovidentList.length + 100
          this.selectedEmpprovident = new EmpProvidentModel()
          this.selectedEmpprovident.provident_code = ref.toString()
          this.showManage()
        }
      },
      {
        label: 'Edit',
        icon: 'pi pi-fw pi-pencil',
        command: (event) => {
          console.log("EDIT");
          this.clearManage()
          if (this.selectedEmpprovident != null) {
            this.edit_empprovident = true
            this.showManage()
          }
        }
      },
      {
        label: 'Delete',
        icon: 'pi pi-fw pi-trash',
        command: (event) => {
          console.log("DELETE");
        }
      },
      {
        label: 'Import',
        icon: 'pi pi-fw pi-file-import',
        command: (event) => {
          console.log("IMPORT");
        }
      },
      {
        label: 'Export',
        icon: 'pi pi-fw pi-file-export',
        command: (event) => {
          console.log("EXPORT");
        }
      }]
    //menu benefit
    this.menu_empbenefit = [
      {
        label: 'New',
        icon: 'pi pi-fw pi-plus',
        command: (event) => {
          console.log("NEW");
          this.clearManage()
          this.new_benefit = true
          var ref = this.empbenefitList.length + 100
          this.selectedEmpbenefit = new EmpBenefitsModel()
          this.selectedEmpbenefit.empbenefit_id = ref.toString()
          this.showManage()
        }
      },
      {
        label: 'Edit',
        icon: 'pi pi-fw pi-pencil',
        command: (event) => {
          console.log("EDIT");
          this.clearManage()
          if (this.selectedEmpbenefit != null) {
            this.edit_empbenefit = true
            this.showManage()
          }
        }
      },
      {
        label: 'Delete',
        icon: 'pi pi-fw pi-trash',
        command: (event) => {
          console.log("DELETE");
        }
      },
      {
        label: 'Import',
        icon: 'pi pi-fw pi-file-import',
        command: (event) => {
          console.log("IMPORT");
        }
      },
      {
        label: 'Export',
        icon: 'pi pi-fw pi-file-export',
        command: (event) => {
          console.log("EXPORT");
        }
      }]
    //menu reduce
    this.menu_empreduce = [
      {
        label: 'New',
        icon: 'pi pi-fw pi-plus',
        command: (event) => {
          console.log("NEW");
          this.clearManage()
          this.new_reduce = true
          var ref = this.empreduceList.length + 100
          this.selectedEmpreduce = new EmpReduceModel()
          this.selectedEmpreduce.empreduce_id = ref.toString()
          this.showManage()
        }
      },
      {
        label: 'Edit',
        icon: 'pi pi-fw pi-pencil',
        command: (event) => {
          console.log("EDIT");
          this.clearManage()
          if (this.selectedEmpreduce != null) {
            this.edit_empreduce = true
            this.showManage()
          }
        }
      },
      {
        label: 'Delete',
        icon: 'pi pi-fw pi-trash',
        command: (event) => {
          console.log("DELETE");
        }
      },
      {
        label: 'Import',
        icon: 'pi pi-fw pi-file-import',
        command: (event) => {
          console.log("IMPORT");
        }
      },
      {
        label: 'Export',
        icon: 'pi pi-fw pi-file-export',
        command: (event) => {
          console.log("EXPORT");
        }
      }]

  }

  tabChange(e: { index: any; }) {
    var index = e.index;

    this.edit_empaddress = false;
    this.new_empaddress = false;
    //    
    this.edit_empcard = false;
    this.new_card = false;
    //   
    this.edit_empbank = false;
    this.new_bank = false;
    //   
    this.edit_empfamily = false;
    this.new_family = false;
    //   
    this.edit_emphospital = false;
    this.new_hospital = false;
    //   
    this.edit_empforeigner = false;
    this.new_foreigner = false;
    //   
    this.edit_empdep = false;
    this.new_dep = false;
    //   
    this.edit_empposition = false;
    this.new_position = false;
    //   
    this.edit_empeducation = false;
    this.new_education = false;
    //   
    this.edit_emptraining = false;
    this.new_training = false;
    //   
    this.edit_empassessment = false;
    this.new_assessment = false;
    //   
    this.edit_empcriminal = false;
    this.new_criminal = false;
    //   
    this.edit_empsalary = false;
    this.new_salary = false;
    //   
    this.edit_empprovident = false;
    this.new_provident = false;
    //   
    this.edit_empbenefit = false;
    this.new_benefit = false;
    //   
    this.edit_empreduce = false;
    this.new_reduce = false;
    //   
    this.edit_empaccumalate = false;
    this.new_accumalate = false;
    //   
    this.edit_emptranfer = false;
    this.new_tranfer = false;

    this.displayManage = false

  }

  position: string = "right";
  showManage() {
    this.displayManage = true;

    if (this.initial_current.Language == "EN") {
      if (this.new_empaddress || this.edit_empaddress) {
        this.manage_title = "Address"
      }
      else if (this.new_card || this.edit_empcard) {
        this.manage_title = "Card"
      }
      else if (this.new_bank || this.edit_empbank) {
        this.manage_title = "Bank"
      }
      else if (this.new_family || this.edit_empfamily) {
        this.manage_title = "Family"
      }
      else if (this.new_hospital || this.edit_emphospital) {
        this.manage_title = "Hospital"
      }
      else if (this.new_foreigner || this.edit_empforeigner) {
        this.manage_title = "Foreigner"
      }
      else if (this.new_dep || this.edit_empdep) {
        this.manage_title = "Department"
      }
      else if (this.new_position || this.edit_empposition) {
        this.manage_title = "Position"
      }
      else if (this.new_education || this.edit_empeducation) {
        this.manage_title = "Education"
      }
      else if (this.new_training || this.edit_emptraining) {
        this.manage_title = "Training"
      }
      else if (this.new_assessment || this.edit_empassessment) {
        this.manage_title = "Assessment"
      }
      else if (this.new_criminal || this.edit_empcriminal) {
        this.manage_title = "Criminal"
      }
      else if (this.new_salary || this.edit_empsalary) {
        this.manage_title = "Salary"
      }
      else if (this.new_provident || this.edit_empprovident) {
        this.manage_title = "Provident"
      }
      else if (this.new_benefit || this.edit_empbenefit) {
        this.manage_title = "Benefit"
      }
      else if (this.new_reduce || this.edit_empreduce) {
        this.manage_title = "Reduce"
      }
      else if (this.new_accumalate || this.edit_empaccumalate) {
        this.manage_title = "Accumalate"
      }
      else if (this.new_tranfer || this.edit_emptranfer) {
        this.manage_title = "Tranfer"
      }
    } else {
      if (this.new_empaddress || this.edit_empaddress) {
        this.manage_title = "ที่อยู่"
      }
      else if (this.new_card || this.edit_empcard) {
        this.manage_title = "ข้อมูลบัตร"
      }
      else if (this.new_bank || this.edit_empbank) {
        this.manage_title = "ข้อมูลธนาคาร"
      }
      else if (this.new_family || this.edit_empfamily) {
        this.manage_title = "ข้อมูลครอบครัว"
      }
      else if (this.new_hospital || this.edit_emphospital) {
        this.manage_title = "ข้อมูลโรงพยาบาล"
      }
      else if (this.new_foreigner || this.edit_empforeigner) {
        this.manage_title = "ข้อมูลพนักงานต่างด้าว"
      }
      else if (this.new_dep || this.edit_empdep) {
        this.manage_title = "สังกัด"
      }
      else if (this.new_position || this.edit_empposition) {
        this.manage_title = "ตำแหน่ง"
      }
      else if (this.new_education || this.edit_empeducation) {
        this.manage_title = "ประวัติการศึกษา"
      }
      else if (this.new_training || this.edit_emptraining) {
        this.manage_title = "ประวัติการอบรม"
      }
      else if (this.new_assessment || this.edit_empassessment) {
        this.manage_title = "ประวัติการประเมิน"
      }
      else if (this.new_criminal || this.edit_empcriminal) {
        this.manage_title = "ประวัติการตรวจสอบอาชญากรรม"
      }
      else if (this.new_salary || this.edit_empsalary) {
        this.manage_title = "เงินเดือน/ค่าจ้าง"
      }
      else if (this.new_provident || this.edit_empprovident) {
        this.manage_title = "กองทุนสำรองเลี้ยงชีพ"
      }
      else if (this.new_benefit || this.edit_empbenefit) {
        this.manage_title = "สวัสดิการ"
      }
      else if (this.new_reduce || this.edit_empreduce) {
        this.manage_title = "ค่าลดหย่อน"
      }
      else if (this.new_accumalate || this.edit_empaccumalate) {
        this.manage_title = "รายได้สะสม/ภาษีสะสม"
      }
      else if (this.new_tranfer || this.edit_emptranfer) {
        this.manage_title = "ประวัติการโอนย้ายหน่วยงาน"
      }
    }
  }

  doLoadEmployee() {
    var employee_list: EmployeeModel[] = [];
    this.employeeService.worker_get(this.initial_current.CompCode, this.emp_code).then((res) => {

      employee_list = res;

      if (employee_list.length > 0) {
        this.selectedEmployee = employee_list[0]

        setTimeout(() => {
          this.doLoadEmpaddressList();
          this.doLoadEmpcardList();
          this.doLoadEmpbankList();
        }, 300);

      }

    });
  }

  //get data dropdown
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

  //address
  empaddressList: EmpaddressModel[] = [];
  selectedEmpAddress: EmpaddressModel = new EmpaddressModel();
  doLoadEmpaddressList() {
    this.empdetailService.getworker_address(this.initial_current.CompCode, this.emp_code).then((res) => {
      this.empaddressList = res;
      if (this.empaddressList.length > 0) {
        this.selectedEmpAddress = this.empaddressList[0];
      }
    })
  }
  onRowSelectEmpAddress(event: Event) { }
  empaddress_summit() {
    this.empaddress_addItem(this.selectedEmpAddress)
    this.new_empaddress = false
    this.edit_empaddress = false
    this.displayManage = false
  }
  empaddress_remove() {            
    this.selectedEmpAddress.address_id = "9999";
    this.empaddress_addItem(this.selectedEmpAddress)
    this.new_empaddress = false
    this.edit_empaddress = false
  }
  empaddress_delete() { }
  empaddress_cancel() {
    this.new_empaddress = false
    this.edit_empaddress = false
    this.displayManage = false
  }
  empaddress_addItem(model:EmpaddressModel){
    const itemNew:EmpaddressModel[] = [];
    for (let i = 0; i < this.empaddressList.length; i++) {     
      if(this.empaddressList[i].address_id==model.address_id ){
        //-- Notting
      }   
      else{
        itemNew.push(this.empaddressList[i]);      
      }     
    }  
    //-- 9999 for delete
    if(model.address_id != "9999"){
      itemNew.push(model);
    }          
    this.empaddressList = [];
    this.empaddressList = itemNew;
    this.empaddressList.sort(function(a, b) { return parseInt(a.address_no) - parseInt(b.address_no); })
  }
  record_empaddress(){
    if(this.empaddressList.length == 0){
      return
    }
    this.empdetailService.record_empaddress(this.selectedEmployee.worker_code, this.empaddressList).then((res) => {       
      let result = JSON.parse(res);  
      if(result.success){        
      }
      else{        
      }  
    });
  }

  //card
  empcardList: EmpcardModel[] = [];
  selectedEmpcard: EmpcardModel = new EmpcardModel();
  doLoadEmpcardList() {
    this.empdetailService.getworker_card(this.initial_current.CompCode, this.emp_code).then((res) => {
      this.empcardList = res;
      if (this.empcardList.length > 0) {
        this.selectedEmpcard = this.empcardList[0];
      }
    })
  }
  onRowSelectEmpCard(event: Event) { }
  empcard_summit() {
    this.new_card = false
    this.edit_empcard = false
    this.displayManage = false
  }
  empcard_delete() { }
  empcard_cancel() {
    this.new_card = false
    this.edit_empcard = false
    this.displayManage = false
  }
  empcard_addItem(model:EmpcardModel){
    const itemNew:EmpcardModel[] = [];
    for (let i = 0; i < this.empcardList.length; i++) {     
      if(this.empcardList[i].card_id==model.card_id ){
        //-- Notting
      }   
      else{
        itemNew.push(this.empcardList[i]);      
      }     
    }  
    //-- 9999 for delete
    if(model.card_id != "9999"){
      itemNew.push(model);
    }          
    this.empcardList = [];
    this.empcardList = itemNew;
    this.empaddressList.sort(function(a, b) { return parseInt(a.address_id) - parseInt(b.address_id); })
  }
  record_empcard(){
    if(this.empcardList.length == 0){
      return
    }
    this.empdetailService.record_empaddress(this.selectedEmployee.worker_code, this.empaddressList).then((res) => {       
      let result = JSON.parse(res);  
      if(result.success){        
      }
      else{        
      }  
    });
  }

  //bank
  empbankList: EmpbankModel[] = [];
  selectedEmpbank: EmpbankModel = new EmpbankModel();
  doLoadEmpbankList() {
    this.empdetailService.getworker_bank(this.initial_current.CompCode, this.emp_code).then((res) => {
      this.empbankList = res;
      if (this.empbankList.length > 0) {
        this.selectedEmpbank = this.empbankList[0];
      }
    })
  }
  onRowSelectEmpbank(event: Event) { }
  empbank_summit() {
    this.new_bank = false
    this.edit_empbank = false
    this.displayManage = false
  }
  empbank_delete() { }
  empbank_cancel() {
    this.new_bank = false
    this.edit_empbank = false
    this.displayManage = false
  }

  //family
  empfamilyList: EmpFamilyModel[] = [];
  selectedEmpfamily: EmpFamilyModel = new EmpFamilyModel();
  doLoadEmpfamilyList() {
    this.empdetailService.getworker_family(this.initial_current.CompCode, this.emp_code).then((res) => {
      this.empfamilyList = res;
      if (this.empfamilyList.length > 0) {
        this.selectedEmpfamily = this.empfamilyList[0];
      }
    })
  }
  onRowSelectEmpFamily(event: Event) { }
  empfamily_summit() {
    this.new_family = false
    this.edit_empfamily = false
    this.displayManage = false
  }
  empfamily_delete() { }
  empfamily_cancel() {
    this.new_family = false
    this.edit_empfamily = false
    this.displayManage = false
  }

  //hospital
  emphospitalList: EmpHospitalModel[] = [];
  selectedEmphospital: EmpHospitalModel = new EmpHospitalModel();
  doLoadEmpHospitalList() {
    // this.empdetailService.getworker_hospital(this.initial_current.CompCode, this.emp_code).then((res)=>{
    //   this.emphospitalList = res;
    //   if(this.emphospitalList.length > 0){
    //     this.selectedEmphospital = this.emphospitalList[0];
    //   }
    // })
  }
  onRowSelectEmpHospital(event: Event) { }
  emphospital_summit() {
    this.new_hospital = false
    this.edit_emphospital = false
    this.displayManage = false
  }
  emphospital_delete() { }
  emphospital_cancel() {
    this.new_hospital = false
    this.edit_emphospital = false
    this.displayManage = false
  }

  //dep
  empdepList: EmpDepModel[] = [];
  selectedEmpdep: EmpDepModel = new EmpDepModel();
  doLoadEmpDepList() {
    // this.empdetailService.getworker_dep(this.initial_current.CompCode, this.emp_code).then((res)=>{
    //   this.empdepList = res;
    //   if(this.empdepList.length > 0){
    //     this.selectedEmpdep = this.empdepList[0];
    //   }
    // })
  }
  onRowSelectEmpDep(event: Event) { }
  empdep_summit() {
    this.new_dep = false
    this.edit_empdep = false
    this.displayManage = false
  }
  empdep_delete() { }
  empdep_cancel() {
    this.new_dep = false
    this.edit_empdep = false
    this.displayManage = false
  }


  //position
  emppositionList: EmpPositionModel[] = [];
  selectedEmpPosition: EmpPositionModel = new EmpPositionModel();
  doLoadEmpPositionList() {
    // this.empdetailService.getworker_position(this.initial_current.CompCode, this.emp_code).then((res)=>{
    //   this.emppositionList = res;
    //   if(this.emppositionList.length > 0){
    //     this.selectedEmpPosition = this.emppositionList[0];
    //   }
    // })
  }
  onRowSelectEmpPosition(event: Event) { }
  empposition_summit() {
    this.new_position = false
    this.edit_empposition = false
    this.displayManage = false
  }
  empposition_delete() { }
  empposition_cancel() {
    this.new_position = false
    this.edit_empposition = false
    this.displayManage = false
  }

  //education
  empeducationList: EmpEducationModel[] = [];
  selectedEmpeducation: EmpEducationModel = new EmpEducationModel();
  doLoadEmpeducationList() {
    // this.empdetailService.getworker_education(this.initial_current.CompCode, this.emp_code).then((res)=>{
    //   this.empeducationList = res;
    //   if(this.empeducationList.length > 0){
    //     this.selectedEmpeducation = this.empeducationList[0];
    //   }
    // })
  }
  onRowSelectEmpeducation(event: Event) { }
  empeducation_summit() {
    this.new_education = false
    this.edit_empeducation = false
    this.displayManage = false
  }
  empeducation_delete() { }
  empeducation_cancel() {
    this.new_education = false
    this.edit_empeducation = false
    this.displayManage = false
  }

  //training
  emptrainingList: EmpTrainingModel[] = [];
  selectedEmptraining: EmpTrainingModel = new EmpTrainingModel();
  doLoadEmptrainingList() {
    // this.empdetailService.getworker_training(this.initial_current.CompCode, this.emp_code).then((res)=>{
    //   this.emptrainingList = res;
    //   if(this.emptrainingList.length > 0){
    //     this.selectedEmptraining = this.emptrainingList[0];
    //   }
    // })
  }
  onRowSelectEmptraining(event: Event) { }
  emptraining_summit() {
    this.new_training = false
    this.edit_emptraining = false
    this.displayManage = false
  }
  emptraining_delete() { }
  emptraining_cancel() {
    this.new_training = false
    this.edit_emptraining = false
    this.displayManage = false
  }

  //Assessment
  empassessmentList: EmpAssessmentModel[] = [];
  selectedEmpassessment: EmpAssessmentModel = new EmpAssessmentModel();
  doLoadEmpassessmentList() {
    // this.empdetailService.getworker_training(this.initial_current.CompCode, this.emp_code).then((res)=>{
    //   this.emptrainingList = res;
    //   if(this.emptrainingList.length > 0){
    //     this.selectedEmptraining = this.emptrainingList[0];
    //   }
    // })
  }
  onRowSelectEmpassessment(event: Event) { }
  empassessment_summit() {
    this.new_assessment = false
    this.edit_empassessment = false
    this.displayManage = false
  }
  empassessment_delete() { }
  empassessment_cancel() {
    this.new_assessment = false
    this.edit_empassessment = false
    this.displayManage = false
  }

  //Criminal
  empcriminalList: EmpCriminalModel[] = [];
  selectedEmpcriminal: EmpCriminalModel = new EmpCriminalModel();
  doLoadEmpcriminalList() {
    // this.empdetailService.getworker_training(this.initial_current.CompCode, this.emp_code).then((res)=>{
    //   this.emptrainingList = res;
    //   if(this.emptrainingList.length > 0){
    //     this.selectedEmptraining = this.emptrainingList[0];
    //   }
    // })
  }
  onRowSelectEmpcriminal(event: Event) { }
  empcriminal_summit() {
    this.new_criminal = false
    this.edit_empcriminal = false
    this.displayManage = false
  }
  empcriminal_delete() { }
  empcriminal_cancel() {
    this.new_criminal = false
    this.edit_empcriminal = false
    this.displayManage = false
  }

  //salary
  empsalaryList: EmpSalaryModel[] = [];
  selectedEmpsalary: EmpSalaryModel = new EmpSalaryModel();
  doLoadEmpsalaryList() {
    // this.empdetailService.getworker_salary(this.initial_current.CompCode, this.emp_code).then((res)=>{
    //   this.empsalaryList = res;
    //   if(this.empsalaryList.length > 0){
    //     this.selectedEmpsalary = this.empsalaryList[0];
    //   }
    // })
  }
  onRowSelectEmpsalary(event: Event) { }
  empsalary_summit() {
    this.new_salary = false
    this.edit_empsalary = false
    this.displayManage = false
  }
  empsalary_delete() { }
  empsalary_cancel() {
    this.new_salary = false
    this.edit_empsalary = false
    this.displayManage = false
  }

  //Provident
  empprovidentList: EmpProvidentModel[] = [];
  selectedEmpprovident: EmpProvidentModel = new EmpProvidentModel();
  doLoadEmpprovidentList() {
    // this.empdetailService.getworker_provident(this.initial_current.CompCode, this.emp_code).then((res)=>{
    //   this.empprovidentList = res;
    //   if(this.empprovidentList.length > 0){
    //     this.selectedEmpprovident = this.empprovidentList[0];
    //   }
    // })
  }
  onRowSelectEmpprovident(event: Event) { }
  empprovident_summit() {
    this.new_provident = false
    this.edit_empprovident = false
    this.displayManage = false
  }
  empprovident_delete() { }
  empprovident_cancel() {
    this.new_provident = false
    this.edit_empprovident = false
    this.displayManage = false
  }

  //benefit
  empbenefitList: EmpBenefitsModel[] = [];
  selectedEmpbenefit: EmpBenefitsModel = new EmpBenefitsModel();
  doLoadEmpbenefitList() {
    // this.empdetailService.getworker_benefit(this.initial_current.CompCode, this.emp_code).then((res)=>{
    //   this.empbenefitList = res;
    //   if(this.empbenefitList.length > 0){
    //     this.selectedEmpbenefit = this.empbenefitList[0];
    //   }
    // })
  }
  onRowSelectEmpbenefit(event: Event) { }
  empbenefit_summit() {
    this.new_benefit = false
    this.edit_empbenefit = false
    this.displayManage = false
  }
  empbenefit_delete() { }
  empbenefit_cancel() {
    this.new_benefit = false
    this.edit_empbenefit = false
    this.displayManage = false
  }

  //reduce
  empreduceList: EmpReduceModel[] = [];
  selectedEmpreduce: EmpReduceModel = new EmpReduceModel();
  doLoadEmpreduceList() {
    // this.empdetailService.getworker_reduce(this.initial_current.CompCode, this.emp_code).then((res)=>{
    //   this.empreduceList = res;
    //   if(this.empreduceList.length > 0){
    //     this.selectedEmpreduce = this.empreduceList[0];
    //   }
    // })
  }
  onRowSelectEmpreduce(event: Event) { }
  empreduce_summit() {
    this.new_reduce = false
    this.edit_empreduce = false
    this.displayManage = false
  }
  empreduce_delete() { }
  empreduce_cancel() {
    this.new_reduce = false
    this.edit_empreduce = false
    this.displayManage = false
  }

  //accumalate
  empacculamateList: EmpAccumalateModel[] = [];
  selectedEmpaccumalate: EmpAccumalateModel = new EmpAccumalateModel();
  onRowSelectEmpAcc(event: any) {
    this.edit_empaccumalate = true;
    this.new_accumalate = true;
  }
  closeAcc() {
    this.new_accumalate = false;
    this.selectedEmpaccumalate = new EmpAccumalateModel();
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

  doRecordEmployee() {

    this.employeeService.worker_recordall(this.selectedEmployee).then((res) => {
      console.log(res)
      let result = JSON.parse(res);

      if (result.success) {
         //-- Transaction
         this.record_empaddress();
        this.messageService.add({ severity: 'success', summary: 'Success', detail: result.message });
        this.router.navigateByUrl('employee/list');
      }
      else {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: result.message });
      }

    });
  }

  close() {
    this.new_employee = false;
    this.selectedEmployee = new EmployeeModel();
  }



  clearManage() {
    this.new_empaddress = false; this.edit_empaddress = false;
    this.new_card = false; this.edit_empcard = false;
    this.new_bank = false; this.edit_empbank = false;
    this.new_family = false; this.edit_empfamily = false;
    this.new_hospital = false; this.edit_emphospital = false;
    this.new_foreigner = false; this.edit_empforeigner = false;
    this.new_dep = false; this.edit_empdep = false;
    this.new_position = false; this.edit_empposition = false;
    this.new_education = false; this.edit_empeducation = false;
    this.new_training = false; this.edit_emptraining = false;
    this.new_assessment = false; this.edit_empassessment = false;
    this.new_criminal = false; this.edit_empcriminal = false;
    this.new_salary = false; this.edit_empsalary = false;
    this.new_provident = false; this.edit_empprovident = false;
    this.new_benefit = false; this.edit_empbenefit = false;
    this.new_reduce = false; this.edit_empreduce = false;
    this.new_accumalate = false; this.edit_empaccumalate = false;
    this.new_tranfer = false; this.edit_emptranfer = false;
  }

}

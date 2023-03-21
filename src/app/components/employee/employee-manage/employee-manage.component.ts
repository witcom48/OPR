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
import { PositionModel } from '../../../models/employee/policy/position';

//import service
import { EmployeeService } from '../../../services/emp/worker.service';
import { InitialService } from '../../../services/emp/policy/initial.service';
import { EmptypeService } from '../../../services/emp/policy/emptype.service';
import { EmpstatusService } from '../../../services/emp/policy/empstatus.service';
import { EmpAssessmentModel } from 'src/app/models/employee/manage/assessment';
import { EmpCriminalModel } from 'src/app/models/employee/manage/criminal';
import { EmpDetailService } from 'src/app/services/emp/worker_detail.service';
import { PositionService } from 'src/app/services/emp/policy/position.service';
import { EmpForeignerModel } from 'src/app/models/employee/manage/foreigner';
import { EmpLocationModel } from 'src/app/models/employee/manage/emplocation';
import { EmpBranchModel } from 'src/app/models/employee/manage/empbranch';







interface Taxmethod {
  name_th: string,
  name_en: string,
  code: string
}
interface ConPay {
  name_th: string,
  name_en: string,
  value: string
}
interface Ctype {
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
  conPay: ConPay[] = [];
  cardTypelist: Ctype[] = [];

  //menu emplocation
  menu_emplocation: MenuItem[] = [];
  edit_emplocation: boolean = false;
  new_emplocation: boolean = false;
  //menu empbranch
  menu_empbranch: MenuItem[] = [];
  edit_empbranch: boolean = false;
  new_empbranch: boolean = false;
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
    private empdetailService: EmpDetailService,

    //service
    private initialService: InitialService,
    private emptypeService: EmptypeService,
    private empstatusService: EmpstatusService,
    private positionService: PositionService,
  ) {
    this.taxM = [
      { name_th: 'พนักงานจ่ายเอง', name_en: 'Employee Pay', code: '1' },
      { name_th: 'บริษัทออกให้ครั้งเดียว', name_en: 'Company Pay Once', code: '2' },
      { name_th: 'บริษัทออกให้ตลอด', name_en: 'Company Pay Every', code: '3' },
    ];
    this.conPay = [
      { name_th: 'ต่องวด', name_en: 'Per Period', value: 'F' },
      { name_th: 'งวดเว้นงวด', name_en: 'Switch Period', value: 'H' },
    ]
    this.cardTypelist = [
      { name_th: 'เลขที่ประจำตัวนิติบุคคล', name_en: '	Citizen ID', code: 'CID' },
      { name_th: 'บัตรประชาชน', name_en: 'National ID', code: 'NTID' },
      { name_th: 'ประกันสังคม', name_en: 'Social', code: 'SSO' },
    ]
  }

  ngOnInit(): void {

    this.route.queryParams.subscribe(params => {
      this.emp_code = params['empcode'];
      console.log(this.emp_code);
    });

    this.doGetInitialCurrent();

    // Dropdown
    this.doLoadInitialList();
    this.doLoadEmptypeList();
    this.doLoadEmpstatusList();
    this.doLoadPositionList();


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
  male_gender: string = "Male";
  female_gender: string = "Female";
  title_emplocation: string = "Location";
  title_empbranch: string = "Branch";
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
      this.male_gender = "ชาย";
      this.female_gender = "หญิง";
      this.title_emplocation = "สถานที่ปฏิบัติงาน";
      this.title_empbranch = "สาขา";
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
    //menu location
    this.menu_emplocation = [
      {
        label: 'New',
        icon: 'pi pi-fw pi-plus',
        command: (event) => {
          this.clearManage()
          this.new_emplocation = true
          var ref = this.emplocationList.length + 100
          this.selectedEmpLocation = new EmpLocationModel()
          this.selectedEmpLocation.emplocation_id = ref.toString()
          this.showManage()
        }
      },
      {
        label: 'Edit',
        icon: 'pi pi-fw pi-pencil',
        command: (event) => {
          this.clearManage()
          if (this.selectedEmpLocation != null) {
            this.edit_emplocation = true
            this.showManage()
          }
        }
      },
      {
        label: 'Delete',
        icon: 'pi pi-fw pi-trash',
        command: (event) => {
          if (this.selectedEmpLocation != null) {
            this.emplocation_remove()
          }
        }
      },];
    //menu branch
    this.menu_empbranch = [
      {
        label: 'New',
        icon: 'pi pi-fw pi-plus',
        command: (event) => {
          this.clearManage()
          this.new_empbranch = true
          var ref = this.empbranchList.length + 100
          this.selectedEmpbranch = new EmpBranchModel()
          this.selectedEmpbranch.empbranch_id = ref.toString()
          this.showManage()
        }
      },
      {
        label: 'Edit',
        icon: 'pi pi-fw pi-pencil',
        command: (event) => {
          this.clearManage()
          if (this.selectedEmpbranch != null) {
            this.edit_empbranch = true
            this.showManage()
          }
        }
      },
      {
        label: 'Delete',
        icon: 'pi pi-fw pi-trash',
        command: (event) => {
          if (this.selectedEmpbranch != null) {
            this.empbranch_remove()
          }
        }
      },];
    //menu address
    this.menu_empaddress = [
      {
        label: 'New',
        icon: 'pi pi-fw pi-plus',
        command: (event) => {
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
          if (this.selectedEmpAddress != null) {
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
          if (this.selectedEmpcard != null) {
            this.empcard_remove()
          }
        }
      },
      {
        label: 'Import',
        icon: 'pi pi-fw pi-file-import',
        command: (event) => {
        }
      },
      {
        label: 'Export',
        icon: 'pi pi-fw pi-file-export',
        command: (event) => {
        }
      }];
    //menu bank
    this.menu_empbank = [
      {
        label: 'New',
        icon: 'pi pi-fw pi-plus',
        command: (event) => {
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
          if (this.selectedEmpbank != null) {
            this.empbank_remove()
          }
        }
      },
      {
        label: 'Import',
        icon: 'pi pi-fw pi-file-import',
        command: (event) => {
        }
      },
      {
        label: 'Export',
        icon: 'pi pi-fw pi-file-export',
        command: (event) => {
        }
      }];
    //menu family
    this.menu_empfamily = [
      {
        label: 'New',
        icon: 'pi pi-fw pi-plus',
        command: (event) => {
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
          if (this.selectedEmpfamily != null) {
            this.empfamily_remove()
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
          if (this.selectedEmphospital != null) {
            this.emphospital_remove()
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
          if (this.selectedEmpdep != null) {
            this.empdep_remove()
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
          if (this.selectedEmpPosition != null) {
            this.empposition_remove()
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
          if (this.selectedEmpeducation != null) {
            this.empeducation_remove()
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
          if (this.selectedEmptraining != null) {
            this.emptraining_remove()
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
          if (this.selectedEmpassessment != null) {
            this.empassessment_remove()
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
          if (this.selectedEmpcriminal != null) {
            this.empcriminal_remove()
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
          if (this.selectedEmpsalary != null) {
            this.empsalary_remove()
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
          this.selectedEmpprovident.empprovident_id = ref.toString()
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
          if (this.selectedEmpprovident != null) {
            this.empprovident_remove()
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
          if (this.selectedEmpbenefit != null) {
            this.empbenefit_remove()
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
          if (this.selectedEmpreduce != null) {
            this.empreduce_remove()
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
          console.log("EXPORT");
        }
      }]

  }

  tabChange(e: { index: any; }) {
    var index = e.index;
    //
    this.edit_emplocation = false;
    this.new_emplocation = false;
    //
    this.edit_empbranch = false;
    this.new_empbranch = false;
    //
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

      if (this.new_emplocation || this.edit_emplocation) {
        this.manage_title = "Location"
      }
      else if (this.new_empbranch || this.edit_empbranch) {
        this.manage_title = "Branch"
      }
      else if (this.new_empaddress || this.edit_empaddress) {
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
      if (this.new_emplocation || this.edit_emplocation) {
        this.manage_title = "สถานที่ปฏิบัติงาน"
      }
      else if (this.new_empbranch || this.edit_empbranch) {
        this.manage_title = "สาขา"
      }
      else if (this.new_empaddress || this.edit_empaddress) {
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
    this.employeeService.worker_get(this.initial_current.CompCode, this.emp_code).then(async (res) => {
      await res.forEach((element: EmployeeModel) => {
        element.worker_birthdate = new Date(element.worker_birthdate)
        element.worker_hiredate = new Date(element.worker_hiredate)
        element.worker_resigndate = new Date(element.worker_resigndate)
        element.worker_probationdate = new Date(element.worker_probationdate)
        element.worker_probationenddate = new Date(element.worker_probationenddate)
      })

      employee_list = await res;

      if (employee_list.length > 0) {
        this.selectedEmployee = employee_list[0]

        setTimeout(() => {
          this.doLoadEmplocationList();
          this.doLoadEmpbranchList();

          this.doLoadEmpaddressList();
          this.doLoadEmpcardList();
          this.doLoadEmpbankList();
          this.doLoadEmpfamilyList();
          this.doLoadEmpHospitalList();
          this.doLoadEmpForeigner();

          this.doLoadEmpDepList();
          this.doLoadEmpPositionList();
          this.doLoadEmpeducationList();
          this.doLoadEmptrainingList();
          this.doLoadEmpassessmentList();
          this.doLoadEmpcriminalList();

          this.doLoadEmpsalaryList();
          this.doLoadEmpbenefitList();
          this.doLoadEmpprovidentList();
          this.doLoadEmpreduceList();
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
  positionList: PositionModel[] = [];
  doLoadPositionList() {
    this.positionService.position_get().then((res) => {
      this.positionList = res;
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
  empaddress_addItem(model: EmpaddressModel) {
    const itemNew: EmpaddressModel[] = [];
    for (let i = 0; i < this.empaddressList.length; i++) {
      if (this.empaddressList[i].address_id == model.address_id) {
        //-- Notting
      }
      else {
        itemNew.push(this.empaddressList[i]);
      }
    }
    //-- 9999 for delete
    if (model.address_id != "9999") {
      itemNew.push(model);
    }
    this.empaddressList = [];
    this.empaddressList = itemNew;
    this.empaddressList.sort(function (a, b) { return parseInt(a.address_no) - parseInt(b.address_no); })
  }
  record_empaddress() {
    if (this.empaddressList.length == 0) {
      return
    }
    this.empdetailService.record_empaddress(this.selectedEmployee.worker_code, this.empaddressList).then((res) => {
      let result = JSON.parse(res);
      if (result.success) {
      }
      else {
      }
    });
  }

  //card
  empcardList: EmpcardModel[] = [];
  selectedEmpcard: EmpcardModel = new EmpcardModel();
  doLoadEmpcardList() {
    this.empdetailService.getworker_card(this.initial_current.CompCode, this.emp_code).then(async (res) => {
      await res.forEach((element: EmpcardModel) => {
        element.card_issue = new Date(element.card_issue)
        element.card_expire = new Date(element.card_expire)

      })
      this.empcardList = await res;

      if (this.empcardList.length > 0) {
        this.selectedEmpcard = this.empcardList[0];
      }
    })
  }
  onRowSelectEmpCard(event: Event) { }
  empcard_summit() {
    this.empcard_addItem(this.selectedEmpcard)
    this.new_card = false
    this.edit_empcard = false
    this.displayManage = false
  }
  empcard_remove() {
    this.selectedEmpcard.card_id = "9999";
    this.empcard_addItem(this.selectedEmpcard)
    this.new_card = false
    this.edit_empcard = false
  }
  empcard_delete() { }
  empcard_cancel() {
    this.new_card = false
    this.edit_empcard = false
    this.displayManage = false
  }
  empcard_addItem(model: EmpcardModel) {
    const itemNew: EmpcardModel[] = [];
    for (let i = 0; i < this.empcardList.length; i++) {
      if (this.empcardList[i].card_id == model.card_id) {
        //-- Notting
      }
      else {
        itemNew.push(this.empcardList[i]);
      }
    }
    //-- 9999 for delete
    if (model.card_id != "9999") {
      itemNew.push(model);
    }
    this.empcardList = [];
    this.empcardList = itemNew;
    this.empcardList.sort(function (a, b) { return parseInt(a.card_id) - parseInt(b.card_id); })
  }
  record_empcard() {
    if (this.empcardList.length == 0) {
      return
    }
    this.empdetailService.record_empcard(this.selectedEmployee.worker_code, this.empcardList).then((res) => {
      let result = JSON.parse(res);
      if (result.success) {
      }
      else {
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
    this.empbank_addItem(this.selectedEmpbank)
    this.new_bank = false
    this.edit_empbank = false
    this.displayManage = false
  }
  empbank_remove() {
    this.selectedEmpbank.bank_id = "9999";
    this.empbank_addItem(this.selectedEmpbank)
    this.new_bank = false
    this.edit_empbank = false
  }
  empbank_delete() { }
  empbank_cancel() {
    this.new_bank = false
    this.edit_empbank = false
    this.displayManage = false
  }
  empbank_addItem(model: EmpbankModel) {
    const itemNew: EmpbankModel[] = [];
    for (let i = 0; i < this.empbankList.length; i++) {
      if (this.empbankList[i].bank_id == model.bank_id) {
        //-- Notting
      }
      else {
        itemNew.push(this.empbankList[i]);
      }
    }
    //-- 9999 for delete
    if (model.bank_id != "9999") {
      itemNew.push(model);
    }
    this.empbankList = [];
    this.empbankList = itemNew;
    this.empbankList.sort(function (a, b) { return parseInt(a.bank_id) - parseInt(b.bank_id); })
  }
  record_empbank() {
    if (this.empbankList.length == 0) {
      return
    }
    this.empdetailService.record_empbank(this.selectedEmployee.worker_code, this.empbankList).then((res) => {
      let result = JSON.parse(res);
      if (result.success) {
      }
      else {
      }
    });
  }

  //family
  empfamilyList: EmpFamilyModel[] = [];
  selectedEmpfamily: EmpFamilyModel = new EmpFamilyModel();
  doLoadEmpfamilyList() {
    this.empdetailService.getworker_family(this.initial_current.CompCode, this.emp_code).then(async (res) => {
      await res.forEach((element: EmpFamilyModel) => {
        element.family_birthdate = new Date(element.family_birthdate)
      })
      this.empfamilyList = await res;
      if (this.empfamilyList.length > 0) {
        this.selectedEmpfamily = this.empfamilyList[0];
      }
    })
  }
  onRowSelectEmpFamily(event: Event) { }
  empfamily_summit() {
    this.empfamily_addItem(this.selectedEmpfamily)
    this.new_family = false
    this.edit_empfamily = false
    this.displayManage = false
  }
  empfamily_remove() {
    this.selectedEmpfamily.family_id = "9999";
    this.empfamily_addItem(this.selectedEmpfamily)
    this.new_bank = false
    this.edit_empbank = false
  }
  empfamily_delete() { }
  empfamily_cancel() {
    this.new_family = false
    this.edit_empfamily = false
    this.displayManage = false
  }
  empfamily_addItem(model: EmpFamilyModel) {
    const itemNew: EmpFamilyModel[] = [];
    for (let i = 0; i < this.empfamilyList.length; i++) {
      if (this.empfamilyList[i].family_id == model.family_id) {
        //-- Notting
      }
      else {
        itemNew.push(this.empfamilyList[i]);
      }
    }
    //-- 9999 for delete
    if (model.family_id != "9999") {
      itemNew.push(model);
    }
    this.empfamilyList = [];
    this.empfamilyList = itemNew;
    this.empfamilyList.sort(function (a, b) { return parseInt(a.family_id) - parseInt(b.family_id); })
  }
  record_empfamily() {
    if (this.empfamilyList.length == 0) {
      return
    }
    this.empdetailService.record_empfamily(this.selectedEmployee.worker_code, this.empfamilyList).then((res) => {
      let result = JSON.parse(res);
      if (result.success) {
      }
      else {
      }
    });
  }

  //hospital
  emphospitalList: EmpHospitalModel[] = [];
  selectedEmphospital: EmpHospitalModel = new EmpHospitalModel();
  doLoadEmpHospitalList() {
    this.empdetailService.getworker_hospital(this.initial_current.CompCode, this.emp_code).then(async (res) => {
      await res.forEach((element: EmpHospitalModel) => {
        element.emphospital_date = new Date(element.emphospital_date)
      })
      this.emphospitalList = await res;
      if (this.emphospitalList.length > 0) {
        this.selectedEmphospital = this.emphospitalList[0];
      }
    })
  }
  onRowSelectEmpHospital(event: Event) { }
  emphospital_summit() {
    this.emphospital_addItem(this.selectedEmphospital)
    this.new_hospital = false
    this.edit_emphospital = false
    this.displayManage = false
  }
  emphospital_remove() {
    this.selectedEmphospital.emphospital_id = "9999";
    this.emphospital_addItem(this.selectedEmphospital)
    this.new_hospital = false
    this.edit_emphospital = false
  }
  emphospital_delete() { }
  emphospital_cancel() {
    this.new_hospital = false
    this.edit_emphospital = false
    this.displayManage = false
  }
  emphospital_addItem(model: EmpHospitalModel) {
    const itemNew: EmpHospitalModel[] = [];
    for (let i = 0; i < this.emphospitalList.length; i++) {
      if (this.emphospitalList[i].emphospital_id == model.emphospital_id) {
        //-- Notting
      }
      else {
        itemNew.push(this.emphospitalList[i]);
      }
    }
    //-- 9999 for delete
    if (model.emphospital_id != "9999") {
      itemNew.push(model);
    }
    this.emphospitalList = [];
    this.emphospitalList = itemNew;
    this.emphospitalList.sort(function (a, b) { return parseInt(a.emphospital_id) - parseInt(b.emphospital_id); })
  }
  record_emphospital() {
    if (this.emphospitalList.length == 0) {
      return
    }
    this.empdetailService.record_emphospital(this.selectedEmployee.worker_code, this.emphospitalList).then((res) => {
      let result = JSON.parse(res);
      if (result.success) {
      }
      else {
      }
    });
  }

  empforeignerList: EmpForeignerModel[] = [];
  selectedEmpforeigner: EmpForeignerModel = new EmpForeignerModel();
  doLoadEmpForeigner() {
    this.empdetailService.getworker_foreigner(this.initial_current.CompCode, this.emp_code).then(async (res) => {
      await res.forEach((element: EmpForeignerModel) => {
        element.passport_issue = new Date(element.passport_issue)
        element.passport_expire = new Date(element.passport_expire)
        element.visa_issue = new Date(element.visa_issue)
        element.visa_expire = new Date(element.visa_expire)
        element.workpermit_issue = new Date(element.workpermit_issue)
        element.workpermit_expire = new Date(element.workpermit_expire)
        element.entry_date = new Date(element.entry_date)
        element.certificate_expire = new Date(element.certificate_expire)
        element.otherdoc_expire = new Date(element.otherdoc_expire)
      })
      this.empforeignerList = await res;
      if (this.empforeignerList.length > 0) {
        this.selectedEmpforeigner = this.empforeignerList[0];
      }
    })
  }
  record_empforeigner() {
    this.empdetailService.record_empforeigner(this.selectedEmployee.worker_code, this.selectedEmpforeigner)
  }

  //dep
  empdepList: EmpDepModel[] = [];
  selectedEmpdep: EmpDepModel = new EmpDepModel();
  doLoadEmpDepList() {
    this.empdetailService.getworker_dep(this.initial_current.CompCode, this.emp_code).then(async (res) => {
      await res.forEach((element: EmpDepModel) => {
        element.empdep_date = new Date(element.empdep_date)
      })
      this.empdepList = await res;
      if (this.empdepList.length > 0) {
        this.selectedEmpdep = this.empdepList[0];
      }
    })
  }
  onRowSelectEmpDep(event: Event) { }
  empdep_summit() {
    this.empdep_addItem(this.selectedEmpdep)
    this.new_dep = false
    this.edit_empdep = false
    this.displayManage = false
  }
  empdep_remove() {
    this.selectedEmpdep.empdep_id = "9999";
    this.empdep_addItem(this.selectedEmpdep)
    this.new_dep = false
    this.edit_empdep = false
  }
  empdep_delete() { }
  empdep_cancel() {
    this.new_dep = false
    this.edit_empdep = false
    this.displayManage = false
  }
  empdep_addItem(model: EmpDepModel) {
    const itemNew: EmpDepModel[] = [];
    for (let i = 0; i < this.empdepList.length; i++) {
      if (this.empdepList[i].empdep_id == model.empdep_id) {
        //-- Notting
      }
      else {
        itemNew.push(this.empdepList[i]);
      }
    }
    //-- 9999 for delete
    if (model.empdep_id != "9999") {
      itemNew.push(model);
    }
    this.empdepList = [];
    this.empdepList = itemNew;
    this.empdepList.sort(function (a, b) { return parseInt(a.empdep_id) - parseInt(b.empdep_id); })
  }
  record_empdep() {
    if (this.empdepList.length == 0) {
      return
    }
    this.empdetailService.record_empdep(this.selectedEmployee.worker_code, this.empdepList).then((res) => {
      let result = JSON.parse(res);
      if (result.success) {
      }
      else {
      }
    });
  }


  //emp position
  emppositionList: EmpPositionModel[] = [];
  selectedEmpPosition: EmpPositionModel = new EmpPositionModel();
  doLoadEmpPositionList() {
    this.empdetailService.getworker_position(this.initial_current.CompCode, this.emp_code).then(async (res) => {
      await res.forEach((element: EmpPositionModel) => {
        element.empposition_date = new Date(element.empposition_date)

      })
      this.emppositionList = await res;
      if (this.emppositionList.length > 0) {
        this.selectedEmpPosition = this.emppositionList[0];
      }
    })
  }

  getpositionname(code: string) {
    let result = this.positionList.find((obj: PositionModel) => {
      return obj.position_code === code
    })
    var res1 = result?.position_name_th;
    var res2 = result?.position_name_en;
    return { th: res1, en: res2 }
  }
  onRowSelectEmpPosition(event: Event) { }
  empposition_summit() {
    this.empposition_addItem(this.selectedEmpPosition)
    this.new_position = false
    this.edit_empposition = false
    this.displayManage = false
  }
  empposition_remove() {
    this.selectedEmpPosition.empposition_id = "9999";
    this.empposition_addItem(this.selectedEmpPosition)
    this.new_dep = false
    this.edit_empdep = false
  }
  empposition_delete() { }
  empposition_cancel() {
    this.new_position = false
    this.edit_empposition = false
    this.displayManage = false
  }
  empposition_addItem(model: EmpPositionModel) {
    const itemNew: EmpPositionModel[] = [];
    for (let i = 0; i < this.emppositionList.length; i++) {
      if (this.emppositionList[i].empposition_id == model.empposition_id) {
        //-- Notting
      }
      else {
        itemNew.push(this.emppositionList[i]);
      }
    }
    //-- 9999 for delete
    if (model.empposition_id != "9999") {
      itemNew.push(model);
    }
    this.emppositionList = [];
    this.emppositionList = itemNew;
    this.emppositionList.sort(function (a, b) { return parseInt(a.empposition_id) - parseInt(b.empposition_id); })
  }
  record_empposition() {
    if (this.emppositionList.length == 0) {
      return
    }
    this.empdetailService.record_empposition(this.selectedEmployee.worker_code, this.emppositionList).then((res) => {
      let result = JSON.parse(res);
      if (result.success) {
      }
      else {
      }
    });
  }

  //education
  empeducationList: EmpEducationModel[] = [];
  selectedEmpeducation: EmpEducationModel = new EmpEducationModel();
  doLoadEmpeducationList() {
    this.empdetailService.getworker_education(this.initial_current.CompCode, this.emp_code).then(async (res) => {
      await res.forEach((element: EmpEducationModel) => {
        element.empeducation_start = new Date(element.empeducation_start)
        element.empeducation_finish = new Date(element.empeducation_finish)
      })
      this.empeducationList = await res;
      if (this.empeducationList.length > 0) {
        this.selectedEmpeducation = this.empeducationList[0];
      }
    })
  }
  onRowSelectEmpeducation(event: Event) { }
  empeducation_summit() {
    this.empeducation_addItem(this.selectedEmpeducation)
    this.new_education = false
    this.edit_empeducation = false
    this.displayManage = false
  }
  empeducation_remove() {
    this.selectedEmpeducation.empeducation_no = "9999";
    this.empeducation_addItem(this.selectedEmpeducation)
    this.new_education = false
    this.edit_empeducation = false
  }
  empeducation_delete() { }
  empeducation_cancel() {
    this.new_education = false
    this.edit_empeducation = false
    this.displayManage = false
  }
  empeducation_addItem(model: EmpEducationModel) {
    const itemNew: EmpEducationModel[] = [];
    for (let i = 0; i < this.empeducationList.length; i++) {
      if (this.empeducationList[i].empeducation_no == model.empeducation_no) {
        //-- Notting
      }
      else {
        itemNew.push(this.empeducationList[i]);
      }
    }
    //-- 9999 for delete
    if (model.empeducation_no != "9999") {
      itemNew.push(model);
    }
    this.empeducationList = [];
    this.empeducationList = itemNew;
    this.empeducationList.sort(function (a, b) { return parseInt(a.empeducation_no) - parseInt(b.empeducation_no); })
  }
  record_empeducation() {
    if (this.empeducationList.length == 0) {
      return
    }
    this.empdetailService.record_empeducation(this.selectedEmployee.worker_code, this.empeducationList).then((res) => {
      let result = JSON.parse(res);
      if (result.success) {
      }
      else {
      }
    });
  }

  //training
  emptrainingList: EmpTrainingModel[] = [];
  selectedEmptraining: EmpTrainingModel = new EmpTrainingModel();
  doLoadEmptrainingList() {
    this.empdetailService.getworker_training(this.initial_current.CompCode, this.emp_code).then(async (res) => {
      await res.forEach((element: EmpTrainingModel) => {
        element.emptraining_start = new Date(element.emptraining_start)
        element.emptraining_finish = new Date(element.emptraining_finish)
      })
      this.emptrainingList = await res;
      if (this.emptrainingList.length > 0) {
        this.selectedEmptraining = this.emptrainingList[0];
      }
    })
  }
  onRowSelectEmptraining(event: Event) { }
  emptraining_summit() {
    this.emptraining_addItem(this.selectedEmptraining)
    this.new_training = false
    this.edit_emptraining = false
    this.displayManage = false
  }
  emptraining_remove() {
    this.selectedEmptraining.emptraining_no = "9999";
    this.emptraining_addItem(this.selectedEmptraining)
    this.new_education = false
    this.edit_empeducation = false
  }
  emptraining_delete() { }
  emptraining_cancel() {
    this.new_training = false
    this.edit_emptraining = false
    this.displayManage = false
  }
  emptraining_addItem(model: EmpTrainingModel) {
    const itemNew: EmpTrainingModel[] = [];
    for (let i = 0; i < this.emptrainingList.length; i++) {
      if (this.emptrainingList[i].emptraining_no == model.emptraining_no) {
        //-- Notting
      }
      else {
        itemNew.push(this.emptrainingList[i]);
      }
    }
    //-- 9999 for delete
    if (model.emptraining_no != "9999") {
      itemNew.push(model);
    }
    this.emptrainingList = [];
    this.emptrainingList = itemNew;
    this.emptrainingList.sort(function (a, b) { return parseInt(a.emptraining_no) - parseInt(b.emptraining_no); })
  }
  record_emptraining() {
    if (this.emptrainingList.length == 0) {
      return
    }
    this.empdetailService.record_emptraining(this.selectedEmployee.worker_code, this.emptrainingList).then((res) => {
      let result = JSON.parse(res);
      if (result.success) {
      }
      else {
      }
    });
  }

  //Assessment
  empassessmentList: EmpAssessmentModel[] = [];
  selectedEmpassessment: EmpAssessmentModel = new EmpAssessmentModel();
  doLoadEmpassessmentList() {
    this.empdetailService.getworker_assessment(this.initial_current.CompCode, this.emp_code).then(async (res) => {
      await res.forEach((element: EmpAssessmentModel) => {
        element.empassessment_fromdate = new Date(element.empassessment_fromdate)
        element.empassessment_todate = new Date(element.empassessment_todate)
      })
      this.empassessmentList = await res;
      if (this.empassessmentList.length > 0) {
        this.selectedEmpassessment = this.empassessmentList[0];
      }
    })
  }
  onRowSelectEmpassessment(event: Event) { }
  empassessment_summit() {
    this.empassessment_addItem(this.selectedEmpassessment)
    this.new_assessment = false
    this.edit_empassessment = false
    this.displayManage = false
  }
  empassessment_remove() {
    this.selectedEmpassessment.empassessment_id = "9999";
    this.empassessment_addItem(this.selectedEmpassessment)
    this.new_assessment = false
    this.edit_empassessment = false
  }
  empassessment_delete() { }
  empassessment_cancel() {
    this.new_assessment = false
    this.edit_empassessment = false
    this.displayManage = false
  }
  empassessment_addItem(model: EmpAssessmentModel) {
    const itemNew: EmpAssessmentModel[] = [];
    for (let i = 0; i < this.empassessmentList.length; i++) {
      if (this.empassessmentList[i].empassessment_id == model.empassessment_id) {
        //-- Notting
      }
      else {
        itemNew.push(this.empassessmentList[i]);
      }
    }
    //-- 9999 for delete
    if (model.empassessment_id != "9999") {
      itemNew.push(model);
    }
    this.empassessmentList = [];
    this.empassessmentList = itemNew;
    this.empassessmentList.sort(function (a, b) { return parseInt(a.empassessment_id) - parseInt(b.empassessment_id); })
  }
  record_empassessment() {
    if (this.empassessmentList.length == 0) {
      return
    }
    this.empdetailService.record_empassessment(this.selectedEmployee.worker_code, this.empassessmentList).then((res) => {
      let result = JSON.parse(res);
      if (result.success) {
      }
      else {
      }
    });
  }

  //Criminal
  empcriminalList: EmpCriminalModel[] = [];
  selectedEmpcriminal: EmpCriminalModel = new EmpCriminalModel();
  doLoadEmpcriminalList() {
    this.empdetailService.getworker_criminal(this.initial_current.CompCode, this.emp_code).then(async (res) => {
      await res.forEach((element: EmpCriminalModel) => {
        element.empcriminal_fromdate = new Date(element.empcriminal_fromdate)
        element.empcriminal_todate = new Date(element.empcriminal_todate)
      })
      this.empcriminalList = await res;
      if (this.empcriminalList.length > 0) {
        this.selectedEmpcriminal = this.empcriminalList[0];
      }
    })
  }
  onRowSelectEmpcriminal(event: Event) { }
  empcriminal_summit() {
    this.empcriminal_addItem(this.selectedEmpcriminal)
    this.new_criminal = false
    this.edit_empcriminal = false
    this.displayManage = false
  }
  empcriminal_remove() {
    this.selectedEmpcriminal.empcriminal_id = "9999";
    this.empcriminal_addItem(this.selectedEmpcriminal)
    this.new_criminal = false
    this.edit_empcriminal = false
  }
  empcriminal_delete() { }
  empcriminal_cancel() {
    this.new_criminal = false
    this.edit_empcriminal = false
    this.displayManage = false
  }
  empcriminal_addItem(model: EmpCriminalModel) {
    const itemNew: EmpCriminalModel[] = [];
    for (let i = 0; i < this.empcriminalList.length; i++) {
      if (this.empcriminalList[i].empcriminal_id == model.empcriminal_id) {
        //-- Notting
      }
      else {
        itemNew.push(this.empcriminalList[i]);
      }
    }
    //-- 9999 for delete
    if (model.empcriminal_id != "9999") {
      itemNew.push(model);
    }
    this.empcriminalList = [];
    this.empcriminalList = itemNew;
    this.empcriminalList.sort(function (a, b) { return parseInt(a.empcriminal_id) - parseInt(b.empcriminal_id); })
  }
  record_empcriminal() {
    if (this.empcriminalList.length == 0) {
      return
    }
    this.empdetailService.record_empcriminal(this.selectedEmployee.worker_code, this.empcriminalList).then((res) => {
      let result = JSON.parse(res);
      if (result.success) {
      }
      else {
      }
    });
  }

  //salary
  empsalaryList: EmpSalaryModel[] = [];
  selectedEmpsalary: EmpSalaryModel = new EmpSalaryModel();
  doLoadEmpsalaryList() {
    this.empdetailService.getworker_salary(this.initial_current.CompCode, this.emp_code).then(async (res) => {
      await res.forEach((element: EmpSalaryModel) => {
        element.empsalary_date = new Date(element.empsalary_date)

      })
      this.empsalaryList = await res;
      if (this.empsalaryList.length > 0) {
        this.selectedEmpsalary = this.empsalaryList[0];
      }
    })
  }
  onRowSelectEmpsalary(event: Event) { }
  empsalary_summit() {
    this.empsalary_addItem(this.selectedEmpsalary)
    this.new_salary = false
    this.edit_empsalary = false
    this.displayManage = false
  }
  empsalary_remove() {
    this.selectedEmpsalary.empsalary_id = "9999";
    this.empsalary_addItem(this.selectedEmpsalary)
    this.new_salary = false
    this.edit_empsalary = false
  }
  empsalary_delete() { }
  empsalary_cancel() {
    this.new_salary = false
    this.edit_empsalary = false
    this.displayManage = false
  }
  empsalary_addItem(model: EmpSalaryModel) {
    const itemNew: EmpSalaryModel[] = [];
    for (let i = 0; i < this.empsalaryList.length; i++) {
      if (this.empsalaryList[i].empsalary_id == model.empsalary_id) {
        //-- Notting
      }
      else {
        itemNew.push(this.empsalaryList[i]);
      }
    }
    //-- 9999 for delete
    if (model.empsalary_id != "9999") {
      itemNew.push(model);
    }
    this.empsalaryList = [];
    this.empsalaryList = itemNew;
    this.empsalaryList.sort(function (a, b) { return parseInt(a.empsalary_id) - parseInt(b.empsalary_id); })
  }
  record_empsalary() {
    if (this.empsalaryList.length == 0) {
      return
    }
    this.empdetailService.record_empsalary(this.selectedEmployee.worker_code, this.empsalaryList).then((res) => {
      let result = JSON.parse(res);
      if (result.success) {
      }
      else {
      }
    });
  }

  //Provident
  empprovidentList: EmpProvidentModel[] = [];
  selectedEmpprovident: EmpProvidentModel = new EmpProvidentModel();
  doLoadEmpprovidentList() {
    this.empdetailService.getworker_provident(this.initial_current.CompCode, this.emp_code).then(async (res) => {
      await res.forEach((element: EmpProvidentModel) => {
        element.empprovident_entry = new Date(element.empprovident_entry)
        element.empprovident_start = new Date(element.empprovident_start)
        element.empprovident_end = new Date(element.empprovident_end)
      })
      this.empprovidentList = await res;
      if (this.empprovidentList.length > 0) {
        this.selectedEmpprovident = this.empprovidentList[0];
      }
    })
  }
  onRowSelectEmpprovident(event: Event) { }
  empprovident_summit() {
    this.empprovident_addItem(this.selectedEmpprovident)
    this.new_provident = false
    this.edit_empprovident = false
    this.displayManage = false
  }
  empprovident_remove() {
    this.selectedEmpprovident.empprovident_id = "9999";
    this.empprovident_addItem(this.selectedEmpprovident)
    this.new_provident = false
    this.edit_empprovident = false
  }
  empprovident_delete() { }
  empprovident_cancel() {
    this.new_provident = false
    this.edit_empprovident = false
    this.displayManage = false
  }
  empprovident_addItem(model: EmpProvidentModel) {
    const itemNew: EmpProvidentModel[] = [];
    for (let i = 0; i < this.empprovidentList.length; i++) {
      if (this.empprovidentList[i].empprovident_id == model.empprovident_id) {
        //-- Notting
      }
      else {
        itemNew.push(this.empprovidentList[i]);
      }
    }
    //-- 9999 for delete
    if (model.empprovident_id != "9999") {
      itemNew.push(model);
    }
    this.empprovidentList = [];
    this.empprovidentList = itemNew;
    this.empprovidentList.sort(function (a, b) { return parseInt(a.empprovident_id) - parseInt(b.empprovident_id); })
  }
  record_empprovident() {
    if (this.empprovidentList.length == 0) {
      return
    }
    this.empdetailService.record_empprovident(this.selectedEmployee.worker_code, this.empprovidentList).then((res) => {
      let result = JSON.parse(res);
      if (result.success) {
      }
      else {
      }
    });
  }

  //benefit
  empbenefitList: EmpBenefitsModel[] = [];
  selectedEmpbenefit: EmpBenefitsModel = new EmpBenefitsModel();
  doLoadEmpbenefitList() {
    this.empdetailService.getworker_benefit(this.initial_current.CompCode, this.emp_code).then(async (res) => {
      await res.forEach((element: EmpBenefitsModel) => {
        element.empbenefit_startdate = new Date(element.empbenefit_startdate)
        element.empbenefit_enddate = new Date(element.empbenefit_enddate)
      })
      this.empbenefitList = await res;
      if (this.empbenefitList.length > 0) {
        this.selectedEmpbenefit = this.empbenefitList[0];
      }
    })
  }
  onRowSelectEmpbenefit(event: Event) { }
  empbenefit_summit() {
    this.empbenefit_addItem(this.selectedEmpbenefit)
    this.new_benefit = false
    this.edit_empbenefit = false
    this.displayManage = false
  }
  empbenefit_remove() {
    this.selectedEmpbenefit.empbenefit_id = "9999";
    this.empbenefit_addItem(this.selectedEmpbenefit)
    this.new_benefit = false
    this.edit_empbenefit = false
  }
  empbenefit_delete() { }
  empbenefit_cancel() {
    this.new_benefit = false
    this.edit_empbenefit = false
    this.displayManage = false
  }
  empbenefit_addItem(model: EmpBenefitsModel) {
    const itemNew: EmpBenefitsModel[] = [];
    for (let i = 0; i < this.empbenefitList.length; i++) {
      if (this.empbenefitList[i].empbenefit_id == model.empbenefit_id) {
        //-- Notting
      }
      else {
        itemNew.push(this.empbenefitList[i]);
      }
    }
    //-- 9999 for delete
    if (model.empbenefit_id != "9999") {
      itemNew.push(model);
    }
    this.empbenefitList = [];
    this.empbenefitList = itemNew;
    this.empbenefitList.sort(function (a, b) { return parseInt(a.empbenefit_id) - parseInt(b.empbenefit_id); })
  }
  record_empbenefit() {
    if (this.empbenefitList.length == 0) {
      return
    }
    this.empdetailService.record_empbenefit(this.selectedEmployee.worker_code, this.empbenefitList).then((res) => {
      let result = JSON.parse(res);
      if (result.success) {
      }
      else {
      }
    });
  }

  //reduce
  empreduceList: EmpReduceModel[] = [];
  selectedEmpreduce: EmpReduceModel = new EmpReduceModel();
  doLoadEmpreduceList() {
    this.empdetailService.getworker_reduce(this.initial_current.CompCode, this.emp_code).then(async (res) => {

      this.empreduceList = await res;
      if (this.empreduceList.length > 0) {
        this.selectedEmpreduce = this.empreduceList[0];
      }
    })
  }
  onRowSelectEmpreduce(event: Event) { }
  empreduce_summit() {
    this.empreduce_addItem(this.selectedEmpreduce)
    this.new_reduce = false
    this.edit_empreduce = false
    this.displayManage = false
  }
  empreduce_remove() {
    this.selectedEmpreduce.empreduce_id = "9999";
    this.empreduce_addItem(this.selectedEmpreduce)
    this.new_reduce = false
    this.edit_empreduce = false
  }
  empreduce_delete() { }
  empreduce_cancel() {
    this.new_reduce = false
    this.edit_empreduce = false
    this.displayManage = false
  }
  empreduce_addItem(model: EmpReduceModel) {
    const itemNew: EmpReduceModel[] = [];
    for (let i = 0; i < this.empreduceList.length; i++) {
      if (this.empreduceList[i].empreduce_id == model.empreduce_id) {
        //-- Notting
      }
      else {
        itemNew.push(this.empreduceList[i]);
      }
    }
    //-- 9999 for delete
    if (model.empreduce_id != "9999") {
      itemNew.push(model);
    }
    this.empreduceList = [];
    this.empreduceList = itemNew;
    this.empreduceList.sort(function (a, b) { return parseInt(a.empreduce_id) - parseInt(b.empreduce_id); })
  }
  record_empreduce() {
    if (this.empreduceList.length == 0) {
      return
    }
    this.empdetailService.record_empreduce(this.selectedEmployee.worker_code, this.empreduceList).then((res) => {
      let result = JSON.parse(res);
      if (result.success) {
      }
      else {
      }
    });
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
  }

  //emp location
  emplocationList: EmpLocationModel[] = [];
  selectedEmpLocation: EmpLocationModel = new EmpLocationModel();
  doLoadEmplocationList() {
    this.empdetailService.getworker_location(this.initial_current.CompCode, this.emp_code).then(async(res) => {
      await res.forEach((element: EmpLocationModel) => {
        element.emplocation_startdate = new Date(element.emplocation_startdate)
        element.emplocation_enddate = new Date(element.emplocation_enddate)
      })
      this.emplocationList = await res;
      if (this.emplocationList.length > 0) {
        this.selectedEmpLocation = this.emplocationList[0];
      }
    })
  }
  onRowSelectEmpLocation(event: Event) { }
  emplocation_summit() {
    this.emplocation_addItem(this.selectedEmpLocation)
    this.new_emplocation = false
    this.edit_emplocation = false
    this.displayManage = false
  }
  emplocation_remove() {
    this.selectedEmpLocation.emplocation_id = "9999";
    this.emplocation_addItem(this.selectedEmpLocation)
    this.new_emplocation = false
    this.edit_emplocation = false
  }
  emplocation_delete() { }
  emplocation_cancel() {
    this.new_emplocation = false
    this.edit_emplocation = false
    this.displayManage = false
  }
  emplocation_addItem(model: EmpLocationModel) {
    const itemNew: EmpLocationModel[] = [];
    for (let i = 0; i < this.emplocationList.length; i++) {
      if (this.emplocationList[i].emplocation_id == model.emplocation_id) {
        //-- Notting
      }
      else {
        itemNew.push(this.emplocationList[i]);
      }
    }
    //-- 9999 for delete
    if (model.emplocation_id != "9999") {
      itemNew.push(model);
    }
    this.emplocationList = [];
    this.emplocationList = itemNew;
    this.emplocationList.sort(function (a, b) { return parseInt(a.emplocation_id) - parseInt(b.emplocation_id); })
  }
  record_emplocation() {
    if (this.emplocationList.length == 0) {
      return
    }
    this.empdetailService.record_emplocation(this.selectedEmployee.worker_code, this.emplocationList).then((res) => {
      let result = JSON.parse(res);
      if (result.success) {
      }
      else {
      }
    });
  }

  //emp branch
  empbranchList: EmpBranchModel[] = [];
  selectedEmpbranch: EmpBranchModel = new EmpBranchModel();
  doLoadEmpbranchList() {
    this.empdetailService.getworker_branch(this.initial_current.CompCode, this.emp_code).then(async(res) => {
      await res.forEach((element: EmpBranchModel) => {
        element.empbranch_startdate = new Date(element.empbranch_startdate)
        element.empbranch_enddate = new Date(element.empbranch_enddate)
      })
      this.empbranchList = await res;
      if (this.empbranchList.length > 0) {
        this.selectedEmpbranch = this.empbranchList[0];
      }
    })
  }
  onRowSelectEmpBranch(event: Event) { }
  empbranch_summit() {
    this.empbranch_addItem(this.selectedEmpbranch)
    this.new_empbranch = false
    this.edit_empbranch = false
    this.displayManage = false
  }
  empbranch_remove() {
    this.selectedEmpbranch.empbranch_id = "9999";
    this.empbranch_addItem(this.selectedEmpbranch)
    this.new_empbranch = false
    this.edit_empbranch = false
  }
  empbranch_delete() { }
  empbranch_cancel() {
    this.new_empbranch = false
    this.edit_empbranch = false
    this.displayManage = false
  }
  empbranch_addItem(model: EmpBranchModel) {
    const itemNew: EmpBranchModel[] = [];
    for (let i = 0; i < this.empbranchList.length; i++) {
      if (this.empbranchList[i].empbranch_id == model.empbranch_id) {
        //-- Notting
      }
      else {
        itemNew.push(this.empbranchList[i]);
      }
    }
    //-- 9999 for delete
    if (model.empbranch_id != "9999") {
      itemNew.push(model);
    }
    this.empbranchList = [];
    this.empbranchList = itemNew;
    this.empbranchList.sort(function (a, b) { return parseInt(a.empbranch_id) - parseInt(b.empbranch_id); })
  }
  record_empbranch() {
    if (this.empbranchList.length == 0) {
      return
    }
    this.empdetailService.record_empbranch(this.selectedEmployee.worker_code, this.empbranchList).then((res) => {
      let result = JSON.parse(res);
      if (result.success) {
      }
      else {
      }
    });
  }

  doRecordEmployee() {

    this.employeeService.worker_recordall(this.selectedEmployee).then((res) => {
      let result = JSON.parse(res);

      if (result.success) {

        //-- Transaction
        this.record_emplocation();
        this.record_empbranch();

        this.record_empaddress();
        this.record_empcard();
        this.record_empbank();
        this.record_empfamily();
        this.record_emphospital();
        this.record_empforeigner();

        this.record_empdep();
        this.record_empposition();
        this.record_empeducation();
        this.record_emptraining();
        this.record_empassessment();
        this.record_empcriminal();

        this.record_empsalary();
        this.record_empbenefit();
        this.record_empprovident();
        this.record_empreduce();

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
    this.new_emplocation = false; this.edit_emplocation = false;
    this.new_empbranch = false; this.edit_empbranch = false;
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

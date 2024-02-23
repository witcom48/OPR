import { DatePipe } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
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
import { EmpSupplyModel } from 'src/app/models/employee/manage/empsupply';
import { EmpUniformModel } from 'src/app/models/employee/manage/empuniform';
import { InstituteModel } from 'src/app/models/system/policy/institute';
import { CourseModel } from 'src/app/models/system/policy/course';
import { FacultyModel } from 'src/app/models/system/policy/faculty';
import { MajorModel } from 'src/app/models/system/policy/major';
import { QualificationModel } from 'src/app/models/system/policy/qualification';
import { ProvinceModel } from 'src/app/models/system/policy/province';

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

//dropdown
import { LocationService } from 'src/app/services/system/policy/location.service';
import { CombranchService } from 'src/app/services/system/combranch.service';
import { CombranchModel } from 'src/app/models/system/branch';
import { BloodtypeService } from 'src/app/services/system/policy/bloodtype.service';
import { ReligionService } from 'src/app/services/system/policy/religion.service';
import { BloodtypeModel } from 'src/app/models/system/policy/bloodtype';
import { ReligionModel } from 'src/app/models/system/policy/religion';
import { AddresstypeService } from 'src/app/services/system/policy/addresstype.service';
import { AddresstypeModel } from 'src/app/models/system/policy/addresstype';
import { CardtypeService } from 'src/app/services/system/policy/cardtype.service';
import { CardtypeModel } from 'src/app/models/system/policy/cardtype';
import { BankService } from 'src/app/services/system/policy/bank.service';
import { BankModel } from 'src/app/models/system/policy/bank';
import { FamilyModel } from 'src/app/models/system/policy/family';
import { FamilyService } from 'src/app/services/system/policy/family.service';
import { HospitalService } from 'src/app/services/system/policy/hospital.service';
import { HospitalModel } from 'src/app/models/system/policy/hospital';
import { PartModel } from 'src/app/models/employee/policy/part';
import { PartService } from 'src/app/services/emp/policy/part.service';
import { EmpGroupModel } from 'src/app/models/employee/manage/empgroup';
import { GroupService } from 'src/app/services/emp/policy/group.service';
import { GroupModel } from 'src/app/models/employee/policy/group';
import { LevelModel } from 'src/app/models/system/policy/level';
import { EmpSuggestModel } from 'src/app/models/employee/manage/empsuggest';
import { InstituteService } from 'src/app/services/system/policy/institute.service';
import { FacultyService } from 'src/app/services/system/policy/faculty.service';
import { MajorService } from 'src/app/services/system/policy/major.service';
import { QualificationService } from 'src/app/services/system/policy/qualification.service';
import { CourseService } from 'src/app/services/system/policy/course.service';
import { ProvinceService } from 'src/app/services/system/policy/province.service';
import { PolcodeService } from 'src/app/services/system/policy/polcode.service';
import { DomSanitizer } from '@angular/platform-browser';
import { SupplyModel } from 'src/app/models/system/policy/supply';
import { UniformModel } from 'src/app/models/system/policy/uniform';
import { SupplyService } from 'src/app/services/system/policy/supply.service';
import { UniformService } from 'src/app/services/system/policy/uniform.service';
import { ItemsModel } from 'src/app/models/payroll/items';
import { ItemService } from 'src/app/services/payroll/item.service';
import { ReducesModel } from 'src/app/models/system/policy/reduces';
import { ReduceService } from 'src/app/services/system/policy/reduce.service';
import { ProvidentModel } from 'src/app/models/payroll/provident';
import { ProvidentService } from 'src/app/services/payroll/provident.service';
import { ProuniformModel } from 'src/app/models/project/policy/pro_genaral';
import { ProgenaralService } from 'src/app/services/project/pro_genaral.service';

import * as XLSX from 'xlsx';
import { AccessdataModel } from 'src/app/models/system/security/accessdata';
import { CodePolcodeService } from 'src/app/services/system/manage1/code-polcode.service';
import { ReasonsService } from 'src/app/services/system/policy/reasons.service';
import { ReasonsModel } from 'src/app/models/system/policy/reasons';
import { EmpForeignercardModel } from 'src/app/models/employee/manage/foreignercard';
import { SysLocationModel } from 'src/app/models/system/policy/location';
import { EthnicityModel } from 'src/app/models/system/policy/ethnicity';
import { EthnicityService } from 'src/app/services/system/policy/ethnicity.service';
import { BlacklistService } from 'src/app/services/recruitment/blacklist.service';
import { BlacklistModel } from 'src/app/models/recruitment/blacklist';
import { SetbonusService } from 'src/app/services/payroll/batch/setbonus.service';
import { SetBonusModel } from 'src/app/models/payroll/batch/setbonus';
import { EmpExperienceModel } from 'src/app/models/employee/manage/experience';
import { ProvidentWorkageModel } from 'src/app/models/payroll/provident_workage';
import { ForetypeService } from 'src/app/services/emp/policy/foretype.service';
import { ForetypeModel } from 'src/app/models/employee/policy/foretype';
import { EmpMTDocattModel } from 'src/app/models/employee/manage/empMTDocatt';
import { PaytranService } from 'src/app/services/payroll/paytran.service';
import { PaytranAccModel } from 'src/app/models/payroll/paytranacc';
import { PeriodsModels } from 'src/app/models/payroll/periods';
import { YearPeriodModels } from 'src/app/models/attendance/yearperiod';
import { YearService } from 'src/app/services/system/policy/year.service';
import { PeriodsServices } from 'src/app/services/payroll/periods.service';
import { EmployeeresignModel } from 'src/app/models/employee/employee_resign';
import { EmpresignService } from 'src/app/services/emp/worker_resign.service';
import { ReferralService } from 'src/app/services/payroll/referral.service';
import { ReferralModel } from 'src/app/models/payroll/referral';
import { ProjectModel } from 'src/app/models/project/project';
import { ProjobmainModel } from 'src/app/models/project/project_jobmain';
import { ProjectService } from 'src/app/services/project/project.service';
import { ProjectDetailService } from 'src/app/services/project/project_detail.service';
import { ProequipmentTypeModel } from 'src/app/models/project/project_equipment';
import { RadiovalueModel } from 'src/app/models/project/radio_value';
import { ProjobsubModel } from 'src/app/models/project/project_jobsub';


interface Result {
  worker: string;
  policy: string;
  modified_by: string;
  modified_date: string;
}


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
interface Milit {
  name_th: string,
  name_en: string,
  code: string
}
interface Nation {
  name_th: string,
  name_en: string,
  code: string
}
interface ForeigType {
  name_th: string,
  name_en: string,
  code: string
}
interface PFType {
  name_th: string,
  name_en: string,
  code: string
}
interface Doctype {
  name_th: string,
  name_en: string,
  code: string
}
interface Order {
  name: string,
  code: string
}


@Component({
  selector: 'app-employee-manage',
  templateUrl: './employee-manage.component.html',
  styleUrls: ['./employee-manage.component.scss']
})
export class EmployeeManageComponent implements OnInit {

  methodEdit: boolean = false;

  emp_code: string = "";
  emplists: string = "";

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
  militarystatus: Milit[] = [];
  nationality: Nation[] = [];
  foreignerType: ForeigType[] = [];
  pfType: PFType[] = [];
  docType: Doctype[] = [];

  order_list: Order[] = [{ name: '1', code: '1' }, { name: '2', code: '2' }, { name: '3', code: '3' }];

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
  //menu empforeignercard
  menu_empforeignercard: MenuItem[] = [];
  edit_empforeignercard: boolean = false;
  new_foreignercard: boolean = false;
  //menu empfamily
  menu_empdep: MenuItem[] = [];
  edit_empdep: boolean = false;
  new_dep: boolean = false;
  //menu empposition
  menu_empposition: MenuItem[] = [];
  edit_empposition: boolean = false;
  new_position: boolean = false;
  //menu empgroup
  menu_empgroup: MenuItem[] = [];
  edit_empgroup: boolean = false;
  new_group: boolean = false;
  //menu empeducation
  menu_empeducation: MenuItem[] = [];
  edit_empeducation: boolean = false;
  new_education: boolean = false;
  //menu empsupply
  menu_empsupply: MenuItem[] = [];
  edit_empsupply: boolean = false;
  new_supply: boolean = false;
  //menu empuniform
  menu_empuniform: MenuItem[] = [];
  edit_empuniform: boolean = false;
  new_uniform: boolean = false;
  //menu empsuggest
  menu_empsuggest: MenuItem[] = [];
  edit_empsuggest: boolean = false;
  new_suggest: boolean = false;
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
  //menu empresign
  menu_empresign: MenuItem[] = [];
  edit_empresign: boolean = false;
  new_resign: boolean = false;
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
  //menu empexperience
  menu_empexperience: MenuItem[] = [];
  edit_empexperience: boolean = false;
  new_experience: boolean = false;

  //menu bonus
  menu_bonus: string = "";
  //menu file doc
  menu_filedoc: MenuItem[] = [];

  displayManage: boolean = false;

  constructor(
    private codePolcodeService: CodePolcodeService,
    private employeeService: EmployeeService,
    private router: Router,
    private route: ActivatedRoute,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private datePipe: DatePipe,
    private empdetailService: EmpDetailService,
    private sanitizer: DomSanitizer,

    //service

    private reasonsService: ReasonsService,
    private initialService: InitialService,
    private emptypeService: EmptypeService,
    private empstatusService: EmpstatusService,
    private positionService: PositionService,
    private groupService: GroupService,
    private locationService: LocationService,
    private combranchService: CombranchService,
    private bloodtypeService: BloodtypeService,
    private religionService: ReligionService,
    private addresstypeService: AddresstypeService,
    private cardtypeService: CardtypeService,
    private bankService: BankService,
    private familytypeService: FamilyService,
    private hospitalService: HospitalService,
    private depService: PartService,
    private instituteService: InstituteService,
    private facultyService: FacultyService,
    private majorService: MajorService,
    private qualificationService: QualificationService,
    private courseService: CourseService,
    private provinceService: ProvinceService,
    private polcodeService: PolcodeService,
    private supplyService: SupplyService,
    private uniformService: UniformService,
    private itemService: ItemService,
    private providentService: ProvidentService,
    private reduceService: ReduceService,

    private genaralService: ProgenaralService,
    private ethnicityService: EthnicityService,
    private blacklistService: BlacklistService,
    private setbonusService: SetbonusService,
    private foretypeService: ForetypeService,
    private paytranService: PaytranService,

    private yearService: YearService,
    private periodsService: PeriodsServices,

    private empresignService: EmpresignService,
    private referralService: ReferralService,
    private projectService: ProjectService,
    private projobService: ProjectDetailService,
    private proequimenttype: ProgenaralService,
    private projectDetailService: ProjectDetailService,

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
    // this.cardTypelist = [
    //   { name_th: 'เลขที่ประจำตัวนิติบุคคล', name_en: 'Citizen ID', code: 'CID' },
    //   { name_th: 'บัตรประชาชน', name_en: 'National ID', code: 'NTID' },
    //   { name_th: 'ประกันสังคม', name_en: 'Social', code: 'SSO' },
    // ]
    this.militarystatus = [
      { name_th: 'ไม่มี', name_en: 'No', code: '0' },
      { name_th: 'หนีทหาร', name_en: 'Disappear Soldier', code: 'A' },
      { name_th: 'ได้รับการยกเว้น', name_en: 'Exempted', code: 'E' },
      { name_th: 'ยังไม่เกณฑ์ทหาร', name_en: 'Non', code: 'N' },
      { name_th: 'ผ่านการเกณฑ์ทหารแล้ว', name_en: 'Pass military service', code: 'P' },
    ]
    this.nationality = [
      { name_th: 'ไทย', name_en: 'Thai', code: 'TH' },
      { name_th: 'ไต้หวัน', name_en: 'Taiwanese', code: 'TW' },
      { name_th: 'อเมริกัน', name_en: 'USA', code: 'US' },
      { name_th: 'สิงคโปร์', name_en: 'Singaporean', code: 'SG' },
      { name_th: 'ฟิลลิปปิน', name_en: 'Filipino', code: 'PH' },
      { name_th: 'มาเลเซีย', name_en: 'Malaysia', code: 'MY' },
      { name_th: 'จีน', name_en: 'Chinese', code: 'CH' },
    ];
    this.foreignerType = [
      { name_th: 'หนังสือเดินทาง', name_en: 'Passport', code: 'PASS' },
      { name_th: 'วีซ่า', name_en: 'VISA', code: 'VISA' },
      { name_th: 'ใบอนุญาตทำงาน', name_en: 'Work Permit', code: 'WORK' },
    ]
    this.pfType = [
      { name_th: 'ตามอายุกองทุนสำรองเลี้ยงชีพ', name_en: 'By Age PF', code: 'A' },
      { name_th: 'ค่าคงที่', name_en: 'Fix Value', code: 'F' },
      { name_th: 'ตามอายุกองทุนฯ|พนักงานคงที่', name_en: 'By Age PF|Fix Value', code: 'C' },
    ]
    this.docType = [
      { name_th: 'ใบสมัคร', name_en: 'Application', code: 'APPT' },
      { name_th: 'บัตรประชาชน', name_en: 'ID Card', code: 'IDCARD' },
      { name_th: 'สำเนาทะเบียนบ้าน', name_en: 'House REGISTRATION', code: 'HOUSE' },
      { name_th: 'รูปถ่ายพนักงานที่ถือบัตรประชาชน', name_en: 'Photo with ID Card', code: 'PHOID' },
      { name_th: 'PDPA', name_en: 'PDPA', code: 'PDPA' },
      { name_th: 'ใบรับรองแพทย์', name_en: 'Medical Certificate', code: 'MECR' },
      { name_th: 'อื่นๆ', name_en: 'Other', code: 'OTHER' },
    ]
  }

  ngOnInit(): void {

    this.route.queryParams.subscribe(params => {
      this.emp_code = params['empcode'];
    });

    this.doGetInitialCurrent();

    this.doLoadLanguage();
    this.calculateInstallment();
    this.calculateTotalAmount();
    // Dropdown
    this.doLoadReason();
    this.doLoadReasonResign();
    this.doLoadReasonSalary();
    this.doLoadReasonPos();
    this.doLoadInitialList();
    this.doLoadEmptypeList();
    this.doLoadEmpstatusList();
    this.doLoadPositionList();
    this.doLoadGroupList();
    this.doLoadLocationList();
    this.doLoadCombranchList();
    this.doLoadBloodtypeList();
    this.doLoadReligionList();

    this.doLoadAddresstypeList();
    this.doLoadCardtypeList();
    this.doLoadBankList();
    this.doLoadFamilytypeList();
    this.doLoadHospitalList();
    this.doLoadDeplevel1List();
    this.doLoadDeplevel2List();
    this.doLoadDeplevel3List();
    this.doLoadDeplevel4List();

    this.doLoadinstituteList();
    this.doLoadfacultyList();
    this.doLoadmajorList();
    this.doLoadqualificationList();
    this.doLoadcourseList();

    this.doLoadprovinceList();

    this.doLoadSuggestList();

    this.doLoadSupplyList();
    this.doLoadUniformList();
    this.doLoadItemList();
    this.doLoadProvidentList();
    this.doLoadReduceList();

    this.doLoadItemsList();
    this.doLoadethnicityList();
    this.doLoadBonusList();

    this.doLoadForetypeList();

    this.doLoadProject();
    this.doLoadPolJobmain();
    this.doLoadPolJobmain2();
    this.doLoadReferralList();
    this.doLoadUniformProList();
    this.doLoadUniformJobList();
    this.doLoadUniformTypeList();

    this.doPeriod();
    setTimeout(() => {
      this.doLoadMenu();
    }, 100);

    setTimeout(() => {
      if (this.emp_code != "") {
        this.doLoadEmployee()
      } else {
        this.doGetNewCode("", "");
        this.selectedEmployee.nationality_code = "TH";
      }

    }, 400);
    setTimeout(() => {

      if (this.empuniformList.length > 0) {
        this.selectedEmpUniform = this.empuniformList[0]

      }
    }, 800);
    setTimeout(() => {
      this.doLoadResignall();
      this.doLoadEmpbankAll();
    }, 1000);

  }

  public initial_current: InitialCurrent = new InitialCurrent();
  initialData2: InitialCurrent = new InitialCurrent();
  accessData: AccessdataModel = new AccessdataModel();
  doGetInitialCurrent() {
    this.initial_current = JSON.parse(localStorage.getItem(AppConfig.SESSIONInitial) || '{}');
    if (!this.initial_current) {
      this.router.navigateByUrl('login');
    }
    this.accessData = this.initialData2.dotGetPolmenu('EMP');
  }

  title_page: string = "Employee Management";
  title_new: string = "New";
  title_edit: string = "Edit";
  title_delete: string = "Delete";
  title_import: string = "Import";
  title_export: string = "Export";
  title_save: string = "Save";
  title_back: string = "Back";
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
  title_empgroup: string = "Group";
  title_training: string = "Training";
  title_education: string = "Education";
  title_supply: string = "Office Supply";
  title_uniform: string = "Uniform";
  title_suggest: string = "Suggest";
  title_assessment: string = "Appraisal";
  title_criminal: string = "Criminal Record";
  title_resignrecord: string = "Resign Record";

  title_finance: string = "Payroll";
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

  title_locationname: string = "Location";
  title_start: string = "Start Date";
  title_end: string = "End Date";
  title_description: string = "Description";
  title_branchname: string = "Branch";
  title_suggestname: string = "Suggest";
  title_addresstype: string = "Address Type";
  title_no: string = "No";
  title_moo: string = "Moo";
  title_soi: string = "Soi";
  title_road: string = "Road";
  title_tambon: string = "Sub-district / Sub-area";
  title_amphur: string = " District / Area";
  title_province: string = "Province";
  title_zipcode: string = "Zipcode";
  title_tel: string = "Tel.";
  title_email: string = "Email";
  title_line: string = "Line";
  title_facebook: string = "Facebook";
  title_cardcode: string = "Card No.";
  title_issuedate: string = "Issue Date";
  title_expiredate: string = "Expire Date";
  title_cardtype: string = "Card Type";
  title_bankname: string = "Bank";
  title_bankname2: string = "Name";
  title_bankcode: string = "Account";
  title_bankper: string = "Bank(%)";
  title_cashper: string = "Cash(%)";
  title_familycode: string = "ID";
  title_familytype: string = "Type";
  title_hospitalname: string = "Hospital";
  title_passport: string = "Passport";
  title_entrydate: string = "Entry Date";
  title_visa: string = "VISA";
  title_workpermit: string = "Work Permit";
  title_by: string = "By";
  title_certino: string = "Certificate No";
  title_certiexpire: string = "Certificate Expire"
  title_other: string = "Other Doc.";
  title_otherexpire: string = "Other Doc. Expire";
  title_date: string = "Date";
  title_lv1: string = "Level01";
  title_lv2: string = "Level02";
  title_lv3: string = "Level03";
  title_lv4: string = "Level04";
  title_lv5: string = "Level05";
  title_lv6: string = "Level06";
  title_reason: string = "Reason";
  title_positionname: string = "Position";
  title_groupname: string = "Group";
  title_institute: string = "Institute";
  title_faculty: string = "Faculty";
  title_major: string = "Major";
  title_qualification: string = "Qualification";
  title_gpa: string = "GPA";
  title_educationstart: string = "Start Date";
  title_educationend: string = "Graduation Date";
  title_supplyissue: string = "Issue Date";
  title_withdrawal_date: string = "Withdrawal Date";

  title_supplyename: string = "Supply";
  title_amount: string = "Amount";
  title_return: string = "Return";
  title_returndate: string = "Return Date";
  title_uniformissue: string = "Issue Date";
  title_uniformname: string = "Uniform";
  title_uniformprice: string = "Amount";
  title_course: string = "Course";
  title_coursestatus: string = "Status";
  title_coursehour: string = "Hour";
  title_cost: string = "Cost";
  title_topic: string = "Topic";
  title_count: string = "Count";
  title_fromdate: string = "From Date";
  title_todate: string = "To Date";
  title_assessmentresult: string = "Result";
  title_criminalresult: string = "Result";
  title_incrementbath: string = "Increment(Bath)";
  title_incrementper: string = "Increment(%)";
  title_incomededuct: string = "Income/Deduct ID";
  title_benefittype: string = "Type";
  title_conditionpay: string = "Pay Condition";
  title_period: string = "Period";
  title_odd: string = "Odd Period";
  title_even: string = "Even Period";
  title_break: string = "Break";
  title_breakreason: string = "Reason(Break)";
  title_provident: string = "Provident";
  title_pfno: string = "Pf No.";
  title_pfentry: string = "Entry Date";
  title_pfstart: string = "Start Date";
  title_pfend: string = "End Date";
  title_reducename: string = "Reduce";
  title_pass: string = "Pass";
  title_notpass: string = "Not Pass";

  //
  title_contact: { [key: string]: string } = { EN: "Contact", TH: "ข้อมูลติดต่อ" };
  title_military: { [key: string]: string } = { EN: "Military Staus", TH: "สถานภาพทางทหาร" };
  title_cm: { [key: string]: string } = { EN: "c.m.", TH: "ซ.ม." };
  title_kg: { [key: string]: string } = { EN: "k.g.", TH: "ก.ก." };

  title_familyocc: { [key: string]: string } = { EN: "Occupation", TH: "อาชีพ" };
  title_familytel: { [key: string]: string } = { EN: "Tel.", TH: "เบอร์โทรศัพท์" };
  title_familyaddress: { [key: string]: string } = { EN: "Address", TH: "ที่อยู่" };
  title_familynameth: { [key: string]: string } = { EN: "Name(Eng.)", TH: "ชื่อ(อังกฤษ)" };
  title_familynameen: { [key: string]: string } = { EN: "Name(Thai)", TH: "ชื่อ(ไทย)" };

  //
  title_nation: { [key: string]: string } = { EN: "Nationality", TH: "สัญชาติ" };
  title_age: { [key: string]: string } = { EN: "Age", TH: "อายุ" };
  //
  title_cardno: { [key: string]: string } = { EN: "Card No.", TH: "เลขบัตรประจำตัวประชาชน" };
  title_cardissue: { [key: string]: string } = { EN: "Issue Date", TH: "วันออกบัตร" };
  title_cardexpire: { [key: string]: string } = { EN: "Expire Date", TH: "วันหมดอายุ" };

  title_socialno: { [key: string]: string } = { EN: "Social No.", TH: "เลขที่ประกันสังคม" };
  title_socialissue: { [key: string]: string } = { EN: "Issue Date", TH: "วันที่เริ่ม" };
  title_socialexpire: { [key: string]: string } = { EN: "Expire Date", TH: "วันที่สิ้นสุด" };
  title_socialsentdate: { [key: string]: string } = { EN: "Sent Date", TH: "วันที่นำส่ง" };
  title_socialnotsent: { [key: string]: string } = { EN: "Not Sent", TH: "ไม่นำส่งประกันสังคม" };

  title_foreignercode: { [key: string]: string } = { EN: "Code", TH: "เลขที่" };
  title_foreignertype: { [key: string]: string } = { EN: "Type", TH: "ประเภท" };
  title_foreignercard: { [key: string]: string } = { EN: "Card", TH: "บัตร" };
  title_foreignerhistory: { [key: string]: string } = { EN: "History", TH: "ประวัติ" };

  title_foreignercardtype: { [key: string]: string } = { EN: "Type", TH: "ประเภท" };
  title_foreignerissue: { [key: string]: string } = { EN: "Issue Date", TH: "วันทีออกบัตร" };
  title_foreignerexpire: { [key: string]: string } = { EN: "Expire Date", TH: "วันทีหมดอายุ" };
  title_foreignersso: { [key: string]: string } = { EN: "Sent SSO", TH: "นำส่งประกันสังคม" };
  title_bonus: { [key: string]: string } = { EN: "Bonus Policy", TH: "นโยบายโบนัส" };

  title_experience: { [key: string]: string } = { EN: "Experience", TH: "ประสบการณ์ทำงาน" };
  title_expcom: { [key: string]: string } = { EN: "Company", TH: "บริษัท" };
  title_expposition: { [key: string]: string } = { EN: "Position", TH: "ตำแหน่ง" };
  title_expsalary: { [key: string]: string } = { EN: "Salary", TH: "เงินเดือน" };
  title_expstart: { [key: string]: string } = { EN: "Start Date", TH: "วันที่เริ่ม" };
  title_expend: { [key: string]: string } = { EN: "End Date", TH: "วันที่สิ้นสุด" };
  title_expdes: { [key: string]: string } = { EN: "Description", TH: "เหตุผลที่เปลี่ยนงาน" };
  title_expage: { [key: string]: string } = { EN: "Workage", TH: "อายุงาน" };

  //
  title_pfcode: { [key: string]: string } = { EN: "PF Code", TH: "รหัสกองทุนฯ" };
  title_pfname: { [key: string]: string } = { EN: "PF Name", TH: "ชื่อกองทุนฯ" };
  title_pfage: { [key: string]: string } = { EN: "PF Age", TH: "อายุกองทุนฯ" };
  title_pftype: { [key: string]: string } = { EN: "PF Type", TH: "วิธีกำหนดอัตราการจ่าย" };
  title_pfemp: { [key: string]: string } = { EN: "Comp.(%)", TH: "บริษัท(%)" };
  title_pfcom: { [key: string]: string } = { EN: "Emp.(%)", TH: "พนักงาน(%)" };

  title_showing: { [key: string]: string } = { EN: "  Showing ", TH: "แสดง" }
  title_to: { [key: string]: string } = { EN: "  to ", TH: "ถึง" }
  title_of: { [key: string]: string } = { EN: "  of ", TH: "จาก" }
  title_entries: { [key: string]: string } = { EN: "  entries ", TH: "รายการ" }
  title_cards: { [key: string]: string } = { EN: "  Card ", TH: "บัตร" }
  title_search_keyword: { [key: string]: string } = { EN: "  Search keyword ", TH: "ค้นหา" }

  //
  title_capital: { [key: string]: string } = { EN: "Capital amount", TH: "เงินต้น" };
  title_capperiod: { [key: string]: string } = { EN: "Period", TH: "จำนวนงวด" };
  title_capperperiod: { [key: string]: string } = { EN: "Amount Per Period", TH: "จำนวนต่องวด" };
  //
  title_attfile: { [key: string]: string } = { EN: "Attach File", TH: "เอกสารแนบ" };
  title_uploadno: { [key: string]: string } = { EN: "No.", TH: "ลำดับที่" };
  title_filename: { [key: string]: string } = { EN: "File Name", TH: "ชื่อไฟล์" };
  title_deleteupload: { [key: string]: string } = { EN: "Delete", TH: "ลบ" };
  title_filetype: { [key: string]: string } = { EN: "Type", TH: "ประเภท" };
  title_viewfile: { [key: string]: string } = { EN: "View", TH: "ดูไฟล์" };

  title_choose: { [key: string]: string } = { EN: "Choose File", TH: "เลือกไฟล์" };
  title_nofile: { [key: string]: string } = { EN: "No file chosen", TH: "ไม่มีไฟล์ที่เลือก" };
  title_amounts: { [key: string]: string } = { EN: "Amount", TH: "จำนวนเงิน" };
  //accumalate
  title_paydate: { [key: string]: string } = { EN: "Paydate", TH: "วันที่จ่าย" };
  title_accumulatelist: { [key: string]: string } = { EN: "Accumulate", TH: "รายการสะสม" };
  title_acclist: { [key: string]: string } = { EN: "List", TH: "รายการ" };
  title_accsalary: { [key: string]: string } = { EN: "Salary", TH: "เงินเดือนสะสม" };
  title_incometax: { [key: string]: string } = { EN: "Income Inc. Tax", TH: "เงินได้คำนวณภาษี" };
  title_incomenotax: { [key: string]: string } = { EN: "Income Not Inc. Tax", TH: "เงินได้ไม่คำนวณภาษี" };
  title_deducttax: { [key: string]: string } = { EN: "Deduct Inc. Tax", TH: "เงินหักคำนวณภาษี" };
  title_deductnotax: { [key: string]: string } = { EN: "Deduct Not Inc. Tax", TH: "เงินหักไม่คำนวณภาษี" };

  title_in401: { [key: string]: string } = { EN: "40 (1)", TH: "40 (1)" };
  title_in4013: { [key: string]: string } = { EN: "40 (1) withholding 3%", TH: "40 (1) หัก ณ ที่จ่าย 3%" };
  title_in402: { [key: string]: string } = { EN: "40 (2)", TH: "40 (2)" };
  title_in4012: { [key: string]: string } = { EN: "40 (1)(2)", TH: "40 (1)(2)" };

  title_tax401: { [key: string]: string } = { EN: "Tax 40 (1)", TH: "ภาษี 40 (1)" };
  title_tax4013: { [key: string]: string } = { EN: "Tax 40 (1) withholding 3%", TH: "ภาษี 40 (1) หัก ณ ที่จ่าย 3%" };
  title_tax402: { [key: string]: string } = { EN: "Tax 40 (2)", TH: "ภาษี 40 (2)" };
  title_tax4012: { [key: string]: string } = { EN: "Tax 40 (1)(2)", TH: "ภาษี 40 (1)(2)" };

  title_AccssoEmp: { [key: string]: string } = { EN: "Accumulate SSO(Emp.)", TH: "ประกันสังคมสะสม" };
  title_AccssoCom: { [key: string]: string } = { EN: "Accumulate SSO(Com.)", TH: "ประกันสังคมสมทบ" };
  title_AccpfEmp: { [key: string]: string } = { EN: "Accumulate PF(Emp.)", TH: "กองทุนฯสะสม" };
  title_AccpfCom: { [key: string]: string } = { EN: "Accumulate PF(Com.)", TH: "กองทุนฯสมทบ" };

  title_dropfile: { [key: string]: string } = { EN: "Drop files here", TH: "วางไฟล์ที่นี่" };
  title_or: { [key: string]: string } = { EN: "or", TH: "หรือ" };

  type_D: { [key: string]: string } = { EN: "Dayly", TH: "รายวัน" };
  type_M: { [key: string]: string } = { EN: "Monthly", TH: "รายเดือน" };
  type_H: { [key: string]: string } = { EN: "Hourly", TH: "รายชั่วโมง" };

  title_order: { [key: string]: string } = { EN: "Order", TH: "ลำดับที่" };
  title_hosstatus: { [key: string]: string } = { EN: "Status", TH: "สถานะ" };
  title_activate: { [key: string]: string } = { EN: "Active", TH: "ใช้งาน" };

  title_emer_tel: { [key: string]: string } = { EN: "Emergency Tel.", TH: "เบอร์โทรศัพท์ผู้ติดต่อฉุกเฉิน" };
  title_emer_name: { [key: string]: string } = { EN: "Emergency Name", TH: "ผู้ติดต่อฉุกเฉิน" };
  title_emer_address: { [key: string]: string } = { EN: "Emergency Address", TH: "ที่อยู่ผู้ติดต่อฉุกเฉิน" };

  title_confirmresign: { [key: string]: string } = { EN: "Have resignation history want to continue?", TH: "พนักงานมีประวัติการลาออก ต้องการดำเนินการต่อหรือไม่?" };
  title_confirmbankacc: { [key: string]: string } = { EN: "Have Bank account want to continue?", TH: "มีการบันทึกเลขบัญชีธนาคารนี้แล้ว ต้องการดำเนินการต่อหรือไม่?" };

  title_referpo: { [key: string]: string } = { EN: "Policy", TH: "นโยบาย" };
  title_referdate: { [key: string]: string } = { EN: "Date", TH: "วันที่เริ่ม" };

  title_uniformtype: { [key: string]: string } = { EN: "Req. Type", TH: "รูปแบบการเบิก" };
  title_uniformamount: { [key: string]: string } = { EN: "Quantity", TH: "จำนวน" };
  title_uniformproject: { [key: string]: string } = { EN: "Project", TH: "โครงการ" };
  title_uniformjob: { [key: string]: string } = { EN: "Job", TH: "ประเภทงาน" };
  title_uniformwith: { [key: string]: string } = { EN: "Req. by", TH: "ผู้ขอเบิก" };
  title_uniformpayperiod: { [key: string]: string } = { EN: "Installment Period", TH: "ผ่อนชำระ(จำนวนงวด)" };
  title_uniformpayamount: { [key: string]: string } = { EN: "Installment Amount", TH: "ผ่อนชำระ(จำนวนเงิน)" };
  title_uniformstart: { [key: string]: string } = { EN: "First Installment", TH: "งวดที่เริ่มตัดเงิน" };
  title_total: { [key: string]: string } = { EN: "Total'", TH: "ทั้งหมด" };

  title_supplyqty: { [key: string]: string } = { EN: "Quantity'", TH: "จำนวน" };

  doLoadLanguage() {
    if (this.initial_current.Language == "TH") {
      this.title_page = "ประวัติพนักงาน";
      this.title_new = "เพิ่ม";
      this.title_edit = "แก้ไข";
      this.title_delete = "ลบ";
      this.title_import = "นำเข้า";
      this.title_export = "ส่งออกไฟล์";
      this.title_save = "บันทึก";
      this.title_back = "ย้อนกลับ";

      this.title_summit = "บันทึก";
      this.title_cancel = "ยกเลิก";

      this.title_genaral = 'ข้อมูลพนักงาน';
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
      this.title_empgroup = 'กลุ่มพนักงาน';
      this.title_education = 'ประวัติการศึกษา';
      this.title_supply = 'อุปกรณ์สำนักงาน';
      this.title_uniform = 'เครื่องแบบพนักงาน';
      this.title_suggest = 'ผู้แนะนำ';
      this.title_training = 'ประวัติการอบรม';
      this.title_assessment = 'ประวัติการประเมิน';
      this.title_criminal = 'ประวัติการตรวจสอบอาชญากรรม';
      this.title_resignrecord = 'ประวัติการลาออก';

      this.title_finance = 'ข้อมูลการเงิน';
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
      this.title_confirm_record = "คุณต้องการบันทึกการทำรายการหรือไม่?";
      this.title_confirm_delete = "คุณต้องการลบรายการ";

      this.title_confirm_yes = "ใช่";
      this.title_confirm_no = "ยกเลิก";
      this.title_confirm_cancel = "คุณยกเลิกการทำรายการ";

      this.title_locationname = "สถานที่";
      this.title_start = "วันที่เริ่ม";
      this.title_end = "วันที่สิ้นสุด";
      this.title_description = "หมายเหตุ";
      this.title_branchname = "สาขา";
      this.title_suggestname = "ชื่อผู้แนะนำ";
      this.title_addresstype = "ประเภทที่อยู่อาศัย";
      this.title_no = "เลขที่";
      this.title_moo = "หมู่";
      this.title_soi = "ซอย";
      this.title_road = "ถนน";
      this.title_tambon = "ตำบล/แขวง";
      this.title_amphur = "อำเภอ/เขต";
      this.title_province = "จังหวัด";
      this.title_zipcode = "รหัสไปรษณีย์";
      this.title_tel = "เบอร์โทรฯ";
      this.title_email = "อีเมล";
      this.title_line = "ไลน์";
      this.title_facebook = "เฟซบุ๊ค";
      this.title_cardcode = "เลขที่";
      this.title_issuedate = "วันที่ออก";
      this.title_expiredate = "วันที่หมดอายุ";
      this.title_cardtype = "ประเภทบัตร";
      this.title_bankname = "ธนาคาร";
      this.title_bankname2 = "ชื่อบัญชี";
      this.title_bankcode = "เลขที่บัญชี"
      this.title_bankper = "โอนธนาคาร(%)";
      this.title_cashper = "เงินสด(%)";
      this.title_familycode = "รหัสประจำตัว";
      this.title_familytype = "ประเภท";
      this.title_hospitalname = "โรงพยาบาล";
      this.title_passport = "หนังสือเดินทาง";
      this.title_entrydate = "วันที่เข้าประเทศ";
      this.title_workpermit = "ใบอนุญาติทำงาน";
      this.title_by = "ออกโดย";
      this.title_certino = "เลขที่เอกสารสำคัญ";
      this.title_certiexpire = "วันที่เอกสารสำคัญหมดอายุ";
      this.title_other = "เลขที่เอกสารอื่นๆ";
      this.title_otherexpire = "วันที่หมดอายุของเอกสารอื่นๆ";
      this.title_date = "วันที่";
      this.title_lv1 = "ระดับ1"
      this.title_lv2 = "ระดับ2";
      this.title_lv3 = "ระดับ3";
      this.title_lv4 = "ระดับ4";
      this.title_lv5 = "ระดับ5";
      this.title_lv6 = "ระดับ6";
      this.title_reason = "เหตุผล";
      this.title_positionname = "ตำแหน่ง";
      this.title_groupname = "กลุ่มพนักงาน";
      this.title_institute = "สถาบัน/สถาที่";
      this.title_faculty = "คณะ";
      this.title_major = "วิชาเอก";
      this.title_qualification = "วุฒิการศึกษา";
      this.title_gpa = "เกรดเฉลี่ย";
      this.title_educationstart = "วันที่เริ่ม";
      this.title_educationend = "วันที่จบ";
      this.title_supplyissue = "วันที่เบิก";
      this.title_withdrawal_date = "วันที่เบิก";
      this.title_supplyename = "ชื่ออุปกรณ์";
      this.title_amount = "เงินค่าแนะนำ";
      this.title_return = "คืนอุปกรณ์";
      this.title_returndate = "วันที่คืนอุปกรณ์";
      this.title_uniformissue = "วันที่เบิก";
      this.title_uniformname = "เครื่องแบบ";
      this.title_uniformprice = "จำนวนเงิน";
      this.title_course = "หลักสูตร";
      this.title_coursestatus = "สถานะ";
      this.title_coursehour = "จำนวนชั่วโมง";
      this.title_fromdate = "จากวันที่";
      this.title_todate = "ถึงวันที่";
      this.title_cost = "ค่าใช้จ่าย";
      this.title_topic = "หัวข้อ";
      this.title_count = "ครั้งที่";
      this.title_assessmentresult = "ผลการประเมิน";
      this.title_criminalresult = "ผลการตรวจสอบ";
      this.title_incrementbath = "อัตราปรับ(บาท)";
      this.title_incrementper = "อัตราปรับ(%)";
      this.title_incomededuct = "เงินได้/เงินหัก";
      this.title_benefittype = "ประเภท";
      this.title_conditionpay = "เงื่อนไขการจ่าย";
      this.title_period = "งวด";
      this.title_odd = "งวดแรก";
      this.title_even = "งวดที่สอง";
      this.title_break = "พักการจ่าย";
      this.title_breakreason = "เหตุผล(พักการจ่าย)";
      this.title_provident = "นโยบาย";
      this.title_pfno = "เลขที่กองทุนฯ";
      this.title_pfentry = "วันที่เข้า";
      this.title_pfstart = "วันที่เริ่ม";
      this.title_pfend = "วันที่ออก";
      this.title_reducename = "ลดหย่อน";
      this.title_pass = "ผ่าน";
      this.title_notpass = "ไม่ผ่าน";


    }
  }


  doLoadMenu() {
    //menumain
    this.toolbar_menu = [
      {
        label: this.title_back,
        icon: 'pi-arrow-left',
        command: (event) => {
          this.router.navigateByUrl('employee/list');
        }
      },
      {
        label: this.title_save,
        icon: 'pi pi-fw pi-save',
        command: (event) => {
          if (this.accessData.accessdata_edit) {
            // console.log('Save');
            this.confirmRecord();
          } else {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Permission denied' });
          }
        }

      },];
    //menu location
    this.menu_emplocation = [
      {
        label: this.title_new,
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
        label: this.title_edit,
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
        label: this.title_delete,
        icon: 'pi pi-fw pi-trash',
        command: (event) => {
          this.confirmationService.confirm({
            message: this.title_confirm_delete,
            header: this.title_confirm,
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
              if (this.selectedEmpLocation != null) {
                this.emplocation_remove()
              }
            },
            reject: () => {
              this.messageService.add({ severity: 'warn', summary: 'Cancelled', detail: this.title_confirm_cancel });
            },
            key: "myDialog"
          });

        }
      },
      {
        label: this.title_export,
        icon: 'pi pi-fw pi-file-export',
        command: (event) => {
          this.exportAsExcel(this.dtemplocation, 'EmpLocation')

        }
      }];
    //menu branch
    this.menu_empbranch = [
      {
        label: this.title_new,
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
        label: this.title_edit,
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
        label: this.title_delete,
        icon: 'pi pi-fw pi-trash',
        command: (event) => {
          this.confirmationService.confirm({
            message: this.title_confirm_delete,
            header: this.title_confirm,
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
              if (this.selectedEmpbranch != null) {
                this.empbranch_remove()
              }
            },
            reject: () => {
              this.messageService.add({ severity: 'warn', summary: 'Cancelled', detail: this.title_confirm_cancel });
            },
            key: "myDialog"
          });

        }
      },
      {
        label: this.title_export,
        icon: 'pi pi-fw pi-file-export',
        command: (event) => {
          this.exportAsExcel(this.dtempbranch, 'EmpBranch')

        }
      },];
    //menu address
    this.menu_empaddress = [
      {
        label: this.title_new,
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
        label: this.title_edit,
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
        label: this.title_delete,
        icon: 'pi pi-fw pi-trash',
        command: (event) => {
          this.confirmationService.confirm({
            message: this.title_confirm_delete,
            header: this.title_confirm,
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
              if (this.selectedEmpAddress != null) {
                this.empaddress_remove()
              }
            },
            reject: () => {
              this.messageService.add({ severity: 'warn', summary: 'Cancelled', detail: this.title_confirm_cancel });
            },
            key: "myDialog"
          });

        }
      },
      {
        label: this.title_export,
        icon: 'pi pi-fw pi-file-export',
        command: (event) => {
          this.exportAsExcel(this.dtempaddress, 'EmpAddress')

        }
      },
    ];
    //menu card
    this.menu_empcard = [
      {
        label: this.title_new,
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
        label: this.title_edit,
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
        label: this.title_delete,
        icon: 'pi pi-fw pi-trash',
        command: (event) => {
          this.confirmationService.confirm({
            message: this.title_confirm_delete,
            header: this.title_confirm,
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
              if (this.selectedEmpcard != null) {
                this.empcard_remove()
              }
            },
            reject: () => {
              this.messageService.add({ severity: 'warn', summary: 'Cancelled', detail: this.title_confirm_cancel });
            },
            key: "myDialog"
          });

        }
      },
      {
        label: this.title_export,
        icon: 'pi pi-fw pi-file-export',
        command: (event) => {
          this.exportAsExcel(this.dtempcard, 'EmpCard')

        }
      },
    ];
    //menu bank
    this.menu_empbank = [
      {
        label: this.title_new,
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
        label: this.title_edit,
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
        label: this.title_delete,
        icon: 'pi pi-fw pi-trash',
        command: (event) => {
          this.confirmationService.confirm({
            message: this.title_confirm_delete,
            header: this.title_confirm,
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
              if (this.selectedEmpbank != null) {
                this.empbank_remove()
              }
            },
            reject: () => {
              this.messageService.add({ severity: 'warn', summary: 'Cancelled', detail: this.title_confirm_cancel });
            },
            key: "myDialog"
          });

        }
      },
      {
        label: this.title_export,
        icon: 'pi pi-fw pi-file-export',
        command: (event) => {
          this.exportAsExcel(this.dtempbank, 'EmpBank')

        }
      },
    ];
    //menu family
    this.menu_empfamily = [
      {
        label: this.title_new,
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
        label: this.title_edit,
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
        label: this.title_delete,
        icon: 'pi pi-fw pi-trash',
        command: (event) => {
          this.confirmationService.confirm({
            message: this.title_confirm_delete,
            header: this.title_confirm,
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
              if (this.selectedEmpfamily != null) {
                this.empfamily_remove()
              }
            },
            reject: () => {
              this.messageService.add({ severity: 'warn', summary: 'Cancelled', detail: this.title_confirm_cancel });
            },
            key: "myDialog"
          });

        }
      },
      {
        label: this.title_export,
        icon: 'pi pi-fw pi-file-export',
        command: (event) => {
          this.exportAsExcel(this.dtempfamily, 'EmpFamily')

        }
      },
    ]
    //menu hospital
    this.menu_emphospital = [
      {
        label: this.title_new,
        icon: 'pi pi-fw pi-plus',
        command: (event) => {
          this.clearManage()
          this.new_hospital = true
          var ref = this.emphospitalList.length + 100
          this.selectedEmphospital = new EmpHospitalModel()
          this.selectedEmphospital.emphospital_id = ref.toString()
          this.showManage()
        }
      },
      {
        label: this.title_edit,
        icon: 'pi pi-fw pi-pencil',
        command: (event) => {
          this.clearManage()
          if (this.selectedEmphospital != null) {
            this.edit_emphospital = true
            this.showManage()
          }
        }
      },
      {
        label: this.title_delete,
        icon: 'pi pi-fw pi-trash',
        command: (event) => {
          this.confirmationService.confirm({
            message: this.title_confirm_delete,
            header: this.title_confirm,
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
              if (this.selectedEmphospital != null) {
                this.emphospital_remove()
              }
            },
            reject: () => {
              this.messageService.add({ severity: 'warn', summary: 'Cancelled', detail: this.title_confirm_cancel });
            },
            key: "myDialog"
          });

        }
      },
      {
        label: this.title_export,
        icon: 'pi pi-fw pi-file-export',
        command: (event) => {
          this.exportAsExcel(this.dtemphospital, 'EmpHospital')

        }
      },
    ]

    //menu Dep
    this.menu_empdep = [
      {
        label: this.title_new,
        icon: 'pi pi-fw pi-plus',
        command: (event) => {
          this.clearManage()
          this.new_dep = true
          var ref = this.empdepList.length + 100
          this.selectedEmpdep = new EmpDepModel()
          this.selectedEmpdep.empdep_id = ref.toString()
          this.showManage()
        }
      },
      {
        label: this.title_edit,
        icon: 'pi pi-fw pi-pencil',
        command: (event) => {
          this.clearManage()
          if (this.selectedEmpdep != null) {
            this.edit_empdep = true
            this.showManage()
          }
        }
      },
      {
        label: this.title_delete,
        icon: 'pi pi-fw pi-trash',
        command: (event) => {
          this.confirmationService.confirm({
            message: this.title_confirm_delete,
            header: this.title_confirm,
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
              if (this.selectedEmpdep != null) {
                this.empdep_remove()
              }
            },
            reject: () => {
              this.messageService.add({ severity: 'warn', summary: 'Cancelled', detail: this.title_confirm_cancel });
            },
            key: "myDialog"
          });

        }
      },
      {
        label: this.title_export,
        icon: 'pi pi-fw pi-file-export',
        command: (event) => {
          this.exportAsExcel(this.dtempdep, 'EmpDepartment')

        }
      },
    ]
    //menu Position
    this.menu_empposition = [
      {
        label: this.title_new,
        icon: 'pi pi-fw pi-plus',
        command: (event) => {
          this.clearManage()
          this.new_position = true
          var ref = this.emppositionList.length + 100
          this.selectedEmpPosition = new EmpPositionModel()
          this.selectedEmpPosition.empposition_id = ref.toString()
          this.showManage()
        }
      },
      {
        label: this.title_edit,
        icon: 'pi pi-fw pi-pencil',
        command: (event) => {
          this.clearManage()
          if (this.selectedEmpPosition != null) {
            this.edit_empposition = true
            this.showManage()
          }
        }
      },
      {
        label: this.title_delete,
        icon: 'pi pi-fw pi-trash',
        command: (event) => {
          this.confirmationService.confirm({
            message: this.title_confirm_delete,
            header: this.title_confirm,
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
              if (this.selectedEmpPosition != null) {
                this.empposition_remove()
              }
            },
            reject: () => {
              this.messageService.add({ severity: 'warn', summary: 'Cancelled', detail: this.title_confirm_cancel });
            },
            key: "myDialog"
          });

        }
      },
      {
        label: this.title_export,
        icon: 'pi pi-fw pi-file-export',
        command: (event) => {
          this.exportAsExcel(this.dtempposition, 'EmpPosition')

        }
      },
    ]
    //menu Group
    this.menu_empgroup = [
      {
        label: this.title_new,
        icon: 'pi pi-fw pi-plus',
        command: (event) => {
          this.clearManage()
          this.new_group = true
          var ref = this.empgroupList.length + 100
          this.selectedEmpGroup = new EmpGroupModel()
          this.selectedEmpGroup.empgroup_id = ref.toString()
          this.showManage()
        }
      },
      {
        label: this.title_edit,
        icon: 'pi pi-fw pi-pencil',
        command: (event) => {
          this.clearManage()
          if (this.selectedEmpGroup != null) {
            this.edit_empgroup = true
            this.showManage()
          }
        }
      },
      {
        label: this.title_delete,
        icon: 'pi pi-fw pi-trash',
        command: (event) => {
          this.confirmationService.confirm({
            message: this.title_confirm_delete,
            header: this.title_confirm,
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
              if (this.selectedEmpGroup != null) {
                this.empgroup_remove();
              }
            },
            reject: () => {
              this.messageService.add({ severity: 'warn', summary: 'Cancelled', detail: this.title_confirm_cancel });
            },
            key: "myDialog"
          });

        }
      },
      {
        label: this.title_export,
        icon: 'pi pi-fw pi-file-export',
        command: (event) => {
          this.exportAsExcel(this.dtempgroup, 'EmpGroup')

        }
      },
    ]
    //menu education
    this.menu_empeducation = [
      {
        label: this.title_new,
        icon: 'pi pi-fw pi-plus',
        command: (event) => {
          this.clearManage()
          this.new_education = true
          var ref = this.empeducationList.length + 100
          this.selectedEmpeducation = new EmpEducationModel()
          this.selectedEmpeducation.empeducation_no = ref.toString()
          this.showManage()
        }
      },
      {
        label: this.title_edit,
        icon: 'pi pi-fw pi-pencil',
        command: (event) => {
          this.clearManage()
          if (this.selectedEmpeducation != null) {
            this.edit_empeducation = true
            this.showManage()
          }
        }
      },
      {
        label: this.title_delete,
        icon: 'pi pi-fw pi-trash',
        command: (event) => {
          this.confirmationService.confirm({
            message: this.title_confirm_delete,
            header: this.title_confirm,
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
              if (this.selectedEmpeducation != null) {
                this.empeducation_remove()
              }
            },
            reject: () => {
              this.messageService.add({ severity: 'warn', summary: 'Cancelled', detail: this.title_confirm_cancel });
            },
            key: "myDialog"
          });

        }
      },
      {
        label: this.title_export,
        icon: 'pi pi-fw pi-file-export',
        command: (event) => {
          this.exportAsExcel(this.dtempeducation, 'EmpEducation')

        }
      },
    ]
    //menu Supply
    this.menu_empsupply = [
      {
        label: this.title_new,
        icon: 'pi pi-fw pi-plus',
        command: (event) => {
          this.clearManage()
          this.new_supply = true
          var ref = this.empsupplyList.length + 100
          this.selectedEmpSupply = new EmpSupplyModel()
          this.selectedEmpSupply.empsupply_id = ref.toString()
          this.showManage()
        }
      },
      {
        label: this.title_edit,
        icon: 'pi pi-fw pi-pencil',
        command: (event) => {
          this.clearManage()
          if (this.selectedEmpSupply != null) {
            this.edit_empsupply = true
            this.showManage()
          }
        }
      },
      {
        label: this.title_delete,
        icon: 'pi pi-fw pi-trash',
        command: (event) => {
          this.confirmationService.confirm({
            message: this.title_confirm_delete,
            header: this.title_confirm,
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
              if (this.selectedEmpSupply != null) {
                this.empsupply_remove();
              }
            },
            reject: () => {
              this.messageService.add({ severity: 'warn', summary: 'Cancelled', detail: this.title_confirm_cancel });
            },
            key: "myDialog"
          });

        }
      },
      {
        label: this.title_export,
        icon: 'pi pi-fw pi-file-export',
        command: (event) => {
          this.exportAsExcel(this.dtempsupply, 'EmpSupply')

        }
      },
    ]

    //menu Uniform
    this.menu_empuniform = [
      {
        label: this.title_new,
        icon: 'pi pi-fw pi-plus',
        command: (event) => {
          this.clearManage()
          this.new_uniform = true
          var ref = this.empuniformList.length + 100
          this.selectedEmpUniform = new EmpUniformModel()
          this.selectedEmpUniform.empuniform_id = ref.toString()
          this.showManage()
        }
      },
      {
        label: this.title_edit,
        icon: 'pi pi-fw pi-pencil',
        command: (event) => {
          this.clearManage()
          if (this.selectedEmpUniform != null) {
            this.edit_empuniform = true
            this.showManage()
          }
        }
      },
      {
        label: this.title_delete,
        icon: 'pi pi-fw pi-trash',
        command: (event) => {
          this.confirmationService.confirm({
            message: this.title_confirm_delete,
            header: this.title_confirm,
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
              if (this.selectedEmpUniform != null) {
                this.empuniform_remove();
              }
            },
            reject: () => {
              this.messageService.add({ severity: 'warn', summary: 'Cancelled', detail: this.title_confirm_cancel });
            },
            key: "myDialog"
          });

        }
      },
      {
        label: this.title_export,
        icon: 'pi pi-fw pi-file-export',
        command: (event) => {
          this.exportAsExcel(this.dtempuniform, 'EmpUniform')

        }
      },
    ]

    //menu Suggest
    this.menu_empsuggest = [
      {
        label: this.title_new,
        icon: 'pi pi-fw pi-plus',
        command: (event) => {
          this.clearManage()
          this.new_suggest = true
          var ref = this.empsuggestList.length + 100
          this.selectedEmpSuggest = new EmpSuggestModel()
          this.selectedEmpSuggest.empsuggest_id = ref.toString()
          this.selectedEmpSuggest.empsuggest_date = this.selectedEmployee.worker_hiredate;
          this.showManage()
        }
      },
      {
        label: this.title_edit,
        icon: 'pi pi-fw pi-pencil',
        command: (event) => {
          this.clearManage()
          if (this.selectedEmpSuggest != null) {
            this.edit_empsuggest = true
            this.showManage()
          }
        }
      },
      {
        label: this.title_delete,
        icon: 'pi pi-fw pi-trash',
        command: (event) => {
          this.confirmationService.confirm({
            message: this.title_confirm_delete,
            header: this.title_confirm,
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
              if (this.selectedEmpSuggest != null) {
                this.empsuggest_remove();
              }
            },
            reject: () => {
              this.messageService.add({ severity: 'warn', summary: 'Cancelled', detail: this.title_confirm_cancel });
            },
            key: "myDialog"
          });

        }
      },
      {
        label: this.title_export,
        icon: 'pi pi-fw pi-file-export',
        command: (event) => {
          this.exportAsExcel(this.dtempsuggest, 'EmpSuggest')

        }
      },
    ]

    //menu training
    this.menu_emptraining = [
      {
        label: this.title_new,
        icon: 'pi pi-fw pi-plus',
        command: (event) => {
          this.clearManage()
          this.new_training = true
          var ref = this.emptrainingList.length + 100
          this.selectedEmptraining = new EmpTrainingModel()
          this.selectedEmptraining.emptraining_no = ref.toString()
          this.showManage()
        }
      },
      {
        label: this.title_edit,
        icon: 'pi pi-fw pi-pencil',
        command: (event) => {
          this.clearManage()
          if (this.selectedEmptraining != null) {
            this.edit_emptraining = true
            this.showManage()
          }
        }
      },
      {
        label: this.title_delete,
        icon: 'pi pi-fw pi-trash',
        command: (event) => {
          this.confirmationService.confirm({
            message: this.title_confirm_delete,
            header: this.title_confirm,
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
              if (this.selectedEmptraining != null) {
                this.emptraining_remove()
              }
            },
            reject: () => {
              this.messageService.add({ severity: 'warn', summary: 'Cancelled', detail: this.title_confirm_cancel });
            },
            key: "myDialog"
          });

        }
      },
      {
        label: this.title_export,
        icon: 'pi pi-fw pi-file-export',
        command: (event) => {
          this.exportAsExcel(this.dtemptraining, 'EmpTraining')

        }
      },
    ]
    //menu assessment
    this.menu_empassessment = [
      {
        label: this.title_new,
        icon: 'pi pi-fw pi-plus',
        command: (event) => {
          this.clearManage()
          this.new_assessment = true
          var ref = this.empassessmentList.length + 100
          this.selectedEmpassessment = new EmpAssessmentModel()
          this.selectedEmpassessment.empassessment_id = ref.toString()
          this.showManage()
        }
      },
      {
        label: this.title_edit,
        icon: 'pi pi-fw pi-pencil',
        command: (event) => {
          this.clearManage()
          if (this.selectedEmpassessment != null) {
            this.edit_empassessment = true
            this.showManage()
          }
        }
      },
      {
        label: this.title_delete,
        icon: 'pi pi-fw pi-trash',
        command: (event) => {
          this.confirmationService.confirm({
            message: this.title_confirm_delete,
            header: this.title_confirm,
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
              if (this.selectedEmpassessment != null) {
                this.empassessment_remove()
              }
            },
            reject: () => {
              this.messageService.add({ severity: 'warn', summary: 'Cancelled', detail: this.title_confirm_cancel });
            },
            key: "myDialog"
          });

        }
      },
      {
        label: this.title_export,
        icon: 'pi pi-fw pi-file-export',
        command: (event) => {
          this.exportAsExcel(this.dtempappraisal, 'EmpAppraisal')

        }
      },
    ]
    //menu criminal
    this.menu_empcriminal = [
      {
        label: this.title_new,
        icon: 'pi pi-fw pi-plus',
        command: (event) => {
          this.clearManage()
          this.new_criminal = true
          var ref = this.empcriminalList.length + 100
          this.selectedEmpcriminal = new EmpCriminalModel()
          this.selectedEmpcriminal.empcriminal_id = ref.toString()
          this.showManage()
        }
      },
      {
        label: this.title_edit,
        icon: 'pi pi-fw pi-pencil',
        command: (event) => {
          this.clearManage()
          if (this.selectedEmpcriminal != null) {
            this.edit_empcriminal = true
            this.showManage()
          }
        }
      },
      {
        label: this.title_delete,
        icon: 'pi pi-fw pi-trash',
        command: (event) => {
          this.confirmationService.confirm({
            message: this.title_confirm_delete,
            header: this.title_confirm,
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
              if (this.selectedEmpcriminal != null) {
                this.empcriminal_remove()
              }
            },
            reject: () => {
              this.messageService.add({ severity: 'warn', summary: 'Cancelled', detail: this.title_confirm_cancel });
            },
            key: "myDialog"
          });

        }
      },
      {
        label: this.title_export,
        icon: 'pi pi-fw pi-file-export',
        command: (event) => {
          this.exportAsExcel(this.dtempcriminal, 'EmpCriminal')

        }
      },
    ]
    //menu salary
    this.menu_empsalary = [
      {
        label: this.title_new,
        icon: 'pi pi-fw pi-plus',
        command: (event) => {
          this.clearManage()
          this.new_salary = true
          var ref = this.empsalaryList.length + 100
          this.selectedEmpsalary = new EmpSalaryModel()
          this.selectedEmpsalary.empsalary_id = ref.toString()
          this.showManage()
        }
      },
      {
        label: this.title_edit,
        icon: 'pi pi-fw pi-pencil',
        command: (event) => {
          this.clearManage()
          if (this.selectedEmpsalary != null) {
            this.edit_empsalary = true
            this.showManage()
          }
        }
      },
      {
        label: this.title_delete,
        icon: 'pi pi-fw pi-trash',
        command: (event) => {
          this.confirmationService.confirm({
            message: this.title_confirm_delete,
            header: this.title_confirm,
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
              if (this.selectedEmpsalary != null) {
                this.empsalary_remove()
              }
            },
            reject: () => {
              this.messageService.add({ severity: 'warn', summary: 'Cancelled', detail: this.title_confirm_cancel });
            },
            key: "myDialog"
          });

        }
      },
      {
        label: this.title_export,
        icon: 'pi pi-fw pi-file-export',
        command: (event) => {
          this.exportAsExcel(this.dtempsalary, 'EmpSalary')

        }
      },
    ]
    //menu provident
    this.menu_empprovident = [
      {
        label: this.title_new,
        icon: 'pi pi-fw pi-plus',
        command: (event) => {
          this.clearManage()
          this.new_provident = true
          var ref = this.empprovidentList.length + 100
          this.selectedEmpprovident = new EmpProvidentModel()
          this.selectedEmpprovident.empprovident_id = ref.toString()
          this.showManage()
        }
      },
      {
        label: this.title_edit,
        icon: 'pi pi-fw pi-pencil',
        command: (event) => {
          this.clearManage()
          if (this.selectedEmpprovident != null) {
            this.edit_empprovident = true
            this.showManage()
          }
        }
      },
      {
        label: this.title_delete,
        icon: 'pi pi-fw pi-trash',
        command: (event) => {
          this.confirmationService.confirm({
            message: this.title_confirm_delete,
            header: this.title_confirm,
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
              if (this.selectedEmpprovident != null) {
                this.empprovident_remove()
              }
            },
            reject: () => {
              this.messageService.add({ severity: 'warn', summary: 'Cancelled', detail: this.title_confirm_cancel });
            },
            key: "myDialog"
          });

        }
      },
      {
        label: this.title_export,
        icon: 'pi pi-fw pi-file-export',
        command: (event) => {
          this.exportAsExcel(this.dtempprovident, 'EmpProvident')

        }
      },
    ]
    //menu benefit
    this.menu_empbenefit = [
      {
        label: this.title_new,
        icon: 'pi pi-fw pi-plus',
        command: (event) => {
          this.clearManage()
          this.new_benefit = true
          var ref = this.empbenefitList.length + 100
          this.selectedEmpbenefit = new EmpBenefitsModel()
          this.selectedEmpbenefit.empbenefit_id = ref.toString()
          this.showManage()
        }
      },
      {
        label: this.title_edit,
        icon: 'pi pi-fw pi-pencil',
        command: (event) => {
          this.clearManage()
          if (this.selectedEmpbenefit != null) {
            this.edit_empbenefit = true
            this.showManage()
          }
        }
      },
      {
        label: this.title_delete,
        icon: 'pi pi-fw pi-trash',
        command: (event) => {
          this.confirmationService.confirm({
            message: this.title_confirm_delete,
            header: this.title_confirm,
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
              if (this.selectedEmpbenefit != null) {
                this.empbenefit_remove()
              }
            },
            reject: () => {
              this.messageService.add({ severity: 'warn', summary: 'Cancelled', detail: this.title_confirm_cancel });
            },
            key: "myDialog"
          });

        }
      },
      {
        label: this.title_export,
        icon: 'pi pi-fw pi-file-export',
        command: (event) => {
          this.exportAsExcel(this.dtempbenefit, 'EmpBenefit')

        }
      },
    ]
    //menu reduce
    this.menu_empreduce = [
      {
        label: this.title_new,
        icon: 'pi pi-fw pi-plus',
        command: (event) => {
          this.clearManage()
          this.new_reduce = true
          var ref = this.empreduceList.length + 100
          this.selectedEmpreduce = new EmpReduceModel()
          this.selectedEmpreduce.empreduce_id = ref.toString()
          this.showManage()
        }
      },
      {
        label: this.title_edit,
        icon: 'pi pi-fw pi-pencil',
        command: (event) => {
          this.clearManage()
          if (this.selectedEmpreduce != null) {
            this.edit_empreduce = true
            this.showManage()
          }
        }
      },
      {
        label: this.title_delete,
        icon: 'pi pi-fw pi-trash',
        command: (event) => {
          this.confirmationService.confirm({
            message: this.title_confirm_delete,
            header: this.title_confirm,
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
              if (this.selectedEmpreduce != null) {
                this.empreduce_remove()
              }
            },
            reject: () => {
              this.messageService.add({ severity: 'warn', summary: 'Cancelled', detail: this.title_confirm_cancel });
            },
            key: "myDialog"
          });

        }
      },
      {
        label: this.title_export,
        icon: 'pi pi-fw pi-file-export',
        command: (event) => {
          this.exportAsExcel(this.dtempreduce, 'EmpReduce')

        }
      },
    ]

    //menu foreigner
    this.menu_empforeigner = [
      {
        label: this.title_new,
        icon: 'pi pi-fw pi-plus',
        command: (event) => {
          if (this.empforeignerList.length < 1) {
            this.clearManage()
            this.new_foreigner = true
            var ref = this.empforeignerList.length + 100
            this.selectedEmpforeigner = new EmpForeignerModel()
            this.selectedEmpforeigner.foreigner_id = ref.toString()
            this.showManage()
          }
        }
      },
      {
        label: this.title_edit,
        icon: 'pi pi-fw pi-pencil',
        command: (event) => {
          this.clearManage()
          if (this.selectedEmpforeigner != null) {
            this.edit_empforeigner = true
            this.showManage()
          }
        }
      },
      {
        label: this.title_delete,
        icon: 'pi pi-fw pi-trash',
        command: (event) => {
          this.confirmationService.confirm({
            message: this.title_confirm_delete,
            header: this.title_confirm,
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
              if (this.selectedEmpforeigner != null) {
                this.empforeigner_remove()
              }
            },
            reject: () => {
              this.messageService.add({ severity: 'warn', summary: 'Cancelled', detail: this.title_confirm_cancel });
            },
            key: "myDialog"
          });

        }
      },
      {
        label: this.title_export,
        icon: 'pi pi-fw pi-file-export',
        command: (event) => {
          this.exportAsExcel(this.dtempforeigner, 'EmpForeigner')

        }
      },
    ]

    //menu foreigner card
    this.menu_empforeignercard = [
      {
        label: this.title_new,
        icon: 'pi-plus',
        command: (event) => {
          this.new_foreignercard = true
          var ref = this.empforeignercardList.length + 100
          this.selectedEmpforeignercard.foreignercard_id = ref.toString()
          this.selectedEmpforeignercard = new EmpForeignercardModel();
          this.displayaddForeCard = true;
          this.displayeditForeCard = false;
        }
      },
      // {
      //   label: this.title_edit,
      //   icon: 'pi pi-fw pi-pencil',
      //   command: (event) => {
      //     if (this.selectedEmpforeignercard != null) {
      //       this.edit_empforeignercard = true
      //       this.displayForeCard = true
      //     }
      //   }
      // },
      // {
      //   label: this.title_delete,
      //   icon: 'pi pi-fw pi-trash',
      //   command: (event) => {
      //     this.confirmationService.confirm({
      //       message: this.title_confirm_delete,
      //       header: this.title_confirm,
      //       icon: 'pi pi-exclamation-triangle',
      //       accept: () => {
      //         if (this.selectedEmpforeignercard != null) {
      //           this.empforeignercard_remove()
      //         }
      //       },
      //       reject: () => {
      //         this.messageService.add({ severity: 'warn', summary: 'Cancelled', detail: this.title_confirm_cancel });
      //       },
      //       key: "myDialog"
      //     });

      //   }
      // },
    ]

    //menu experience
    this.menu_empexperience = [
      {
        label: this.title_new,
        icon: 'pi pi-fw pi-plus',
        command: (event) => {
          this.clearManage()
          this.new_experience = true
          var ref = this.empexperienceList.length + 100
          this.selectedEmpExperience = new EmpExperienceModel()
          this.selectedEmpExperience.experience_id = ref.toString()
          this.showManage()
        }
      },
      {
        label: this.title_edit,
        icon: 'pi pi-fw pi-pencil',
        command: (event) => {
          this.clearManage()
          if (this.selectedEmpExperience != null) {
            this.edit_empexperience = true
            this.showManage()
          }
        }
      },
      {
        label: this.title_delete,
        icon: 'pi pi-fw pi-trash',
        command: (event) => {
          this.confirmationService.confirm({
            message: this.title_confirm_delete,
            header: this.title_confirm,
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
              if (this.selectedEmpExperience != null) {
                this.empexperience_remove()
              }
            },
            reject: () => {
              this.messageService.add({ severity: 'warn', summary: 'Cancelled', detail: this.title_confirm_cancel });
            },
            key: "myDialog"
          });

        }
      },
      {
        label: this.title_export,
        icon: 'pi pi-fw pi-file-export',
        command: (event) => {
          this.exportAsExcel(this.dtempexperience, 'EmpExperience')

        }
      }];

    //menu filedoc
    this.menu_filedoc = [
      {
        label: this.title_new,
        icon: 'pi pi-fw pi-plus',
        command: (event) => {
          this.Uploadfile = true;
        }
      },
    ];

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
    this.edit_empgroup = false;
    this.new_group = false;
    //   
    this.edit_empeducation = false;
    this.new_education = false;
    //
    this.edit_empsupply = false;
    this.new_supply = false;
    //
    this.edit_empuniform = false;
    this.new_uniform = false;
    //
    this.edit_empsuggest = false;
    this.new_suggest = false;
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
    //
    this.edit_empexperience = false;
    this.new_experience = false;
    //
    this.displayManage = false

  }
  title_blacklist: { [key: string]: string } = { EN: "Blacklist", TH: "แบล็คลิสต์" };

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
      else if (this.new_group || this.edit_empgroup) {
        this.manage_title = "Group"
      }
      else if (this.new_education || this.edit_empeducation) {
        this.manage_title = "Education"
      }
      else if (this.new_supply || this.edit_empsupply) {
        this.manage_title = "Office Supply"
      }
      else if (this.new_uniform || this.edit_empuniform) {
        this.manage_title = "Uniform"
      }
      else if (this.new_suggest || this.edit_empsuggest) {
        this.manage_title = "Suggest"
      }
      else if (this.new_training || this.edit_emptraining) {
        this.manage_title = "Training"
      }
      else if (this.new_assessment || this.edit_empassessment) {
        this.manage_title = "Appraisal"
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
      } else if (this.new_experience || this.edit_empexperience) {
        this.manage_title = "Experience"
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
      else if (this.new_group || this.edit_empgroup) {
        this.manage_title = "กลุ่มพนักงาน"
      }
      else if (this.new_education || this.edit_empeducation) {
        this.manage_title = "ประวัติการศึกษา"
      }
      else if (this.new_supply || this.edit_empsupply) {
        this.manage_title = "อุปกรณ์สำนักงาน"
      }
      else if (this.new_uniform || this.edit_empuniform) {
        this.manage_title = "เครื่องแบบพนักงาน"
      }
      else if (this.new_suggest || this.edit_empsuggest) {
        this.manage_title = "ผู้แนะนำ"
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
      } else if (this.new_experience || this.edit_empexperience) {
        this.manage_title = "ประสบการณ์ทำงาน"
      }
    }
  }
  base64Image: any = '../../../../assets/images/people.png'
  transform() {
    return this.sanitizer.bypassSecurityTrustResourceUrl(this.base64Image);
  }

  doLoadImage() {
    this.employeeService.doGetImages(this.initial_current.CompCode, this.selectedEmployee.worker_code).then((res) => {
      let resultJSON = JSON.parse(res);

      if (resultJSON.result == "1") {
        this.base64Image = resultJSON.data;
      }
    });
  }
  test() {
    if (!this.selectedEmployee.index) {
      this.selectedEmployee.worker_socialno = this.selectedEmployee.worker_cardno;
    }
  }
  onSelectHiredate() {
    if (!this.selectedEmployee.worker_socialnoissuedate && !this.selectedEmployee.index) {
      this.selectedEmployee.worker_socialnoissuedate = this.selectedEmployee.worker_hiredate;
    }
  }
  doLoadEmployee() {
    var employee_list: EmployeeModel[] = [];
    this.employeeService.worker_get(this.initial_current.CompCode, this.emp_code).then(async (res) => {
      await res.forEach((element: EmployeeModel) => {
        element.worker_birthdate = new Date(element.worker_birthdate)
        element.worker_hiredate = new Date(element.worker_hiredate)
        if (element.worker_resigndate != null) {
          element.worker_resigndate = new Date(element.worker_resigndate)
        }
        element.worker_probationdate = new Date(element.worker_probationdate)
        element.worker_probationenddate = new Date(element.worker_probationenddate)
        element.worker_cardnoissuedate = new Date(element.worker_cardnoissuedate)
        element.worker_cardnoexpiredate = new Date(element.worker_cardnoexpiredate)
        element.worker_socialnoissuedate = new Date(element.worker_socialnoissuedate)
        if (element.worker_socialnoexpiredate != null) {
          element.worker_socialnoexpiredate = new Date(element.worker_socialnoexpiredate)
        }
        element.worker_socialsentdate = new Date(element.worker_socialsentdate)

      })

      employee_list = await res;
      this.methodEdit = true;

      if (employee_list.length > 0) {
        this.selectedEmployee = employee_list[0]


        setTimeout(() => {
          //
          this.doLoadImage();
          //
          this.doLoadEmplocationList();
          this.doLoadEmpbranchList();

          this.doLoadEmpaddressList();
          this.doLoadEmpcardList();
          this.doLoadEmpbankList();
          this.doLoadEmpfamilyList();
          this.doLoadEmpHospitalList();
          this.doLoadEmpForeigner();
          this.doLoadEmpForeignercardList();

          this.doLoadEmpDepList();
          this.doLoadEmpPositionList();
          this.doLoadEmpGroupList();
          this.doLoadEmpeducationList();
          this.doLoadEmpSupplyList();
          this.doLoadEmpUniformList();
          this.doLoadEmpSuggestList();
          this.doLoadEmptrainingList();
          this.doLoadEmpassessmentList();
          this.doLoadEmpcriminalList();

          this.doLoadEmpsalaryList();
          this.doLoadEmpbenefitList();
          this.doLoadEmpprovidentList();
          this.doLoadEmpreduceList();

          this.doLoadEmpExperienceList();

          this.CalculateAge();
          this.doLoadEmpprovidentList();

          this.doGetFile();

          this.doLoadEmpresignList();

          this.doLoadPaytranAcc(this.initial_current.PR_PayDate);
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
  doChangeSelectEmptype() {
    if (this.methodEdit == false) {
      if (this.empbranchList.length) {
        this.doGetNewCode(this.selectedEmployee.worker_type, this.empbranchList.slice(-1)[0].branch_code);
      } else {
        this.doGetNewCode(this.selectedEmployee.worker_type, "");
      }
    }
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
  groupList: GroupModel[] = [];
  doLoadGroupList() {
    this.groupService.group_get().then((res) => {
      this.groupList = res;
    })
  }
  locationList: SysLocationModel[] = [];
  doLoadLocationList() {
    var tmp = new SysLocationModel();
    this.locationService.location_get(tmp).then(async (res) => {
      this.locationList = await res;
    })
  }
  combranch_code: string = '';
  combranchList: CombranchModel[] = [];
  doLoadCombranchList() {
    var tmp = new CombranchModel();
    this.combranchService.combranch_get(this.combranch_code).then(async (res) => {
      this.combranchList = await res;
    })
  }
  bloodtypeList: BloodtypeModel[] = [];
  doLoadBloodtypeList() {
    var tmp = new BloodtypeModel();
    this.bloodtypeService.bloodtype_get().then(async (res) => {
      this.bloodtypeList = await res;
    })
  }
  religionList: ReligionModel[] = [];
  doLoadReligionList() {
    var tmp = new ReligionModel();
    this.religionService.religion_get().then(async (res) => {
      this.religionList = await res;
    })
  }
  addresstypeList: AddresstypeModel[] = [];
  doLoadAddresstypeList() {
    var tmp = new AddresstypeModel();
    this.addresstypeService.addresstype_get().then(async (res) => {
      this.addresstypeList = await res;
    })
  }
  cardtypeList: CardtypeModel[] = [];
  doLoadCardtypeList() {
    var tmp = new CardtypeModel();
    this.cardtypeService.cardtype_get().then(async (res) => {
      this.cardtypeList = await res;
    })
  }
  bankList: BankModel[] = [];
  doLoadBankList() {
    var tmp = new BankModel();
    this.bankService.bank_get().then(async (res) => {
      this.bankList = await res;
    })
  }
  familytypeList: FamilyModel[] = [];
  doLoadFamilytypeList() {
    var tmp = new FamilyModel();
    this.familytypeService.family_get().then(async (res) => {
      this.familytypeList = await res;
    })
  }
  hospitalList: HospitalModel[] = [];
  doLoadHospitalList() {
    var tmp = new HospitalModel();
    this.hospitalService.hospital_get().then(async (res) => {
      this.hospitalList = await res;
    })
  }
  deplevel1List: PartModel[] = [];
  doLoadDeplevel1List() {
    var tmp = new LevelModel();
    tmp.level_code = "01";
    this.depService.dep_get(tmp).then(async (res) => {
      this.deplevel1List = await res;
    })
  }
  deplevel2List: PartModel[] = [];
  doLoadDeplevel2List() {
    var tmp = new LevelModel();
    tmp.level_code = "02";
    this.depService.dep_get(tmp).then(async (res) => {
      this.deplevel2List = await res;
    })

  }
  deplevel3List: PartModel[] = [];
  doLoadDeplevel3List() {
    var tmp = new LevelModel();
    tmp.level_code = "03";
    this.depService.dep_get(tmp).then(async (res) => {
      this.deplevel3List = await res;
    })

  }
  deplevel4List: PartModel[] = [];
  doLoadDeplevel4List() {
    var tmp = new LevelModel();
    tmp.level_code = "04";
    this.depService.dep_get(tmp).then(async (res) => {
      this.deplevel3List = await res;
    })

  }
  suggest_List: EmployeeModel[] = [];
  doLoadSuggestList() {
    var tmp = new EmployeeModel();
    this.employeeService.worker_get(this.initial_current.CompCode, "").then(async (res) => {
      this.suggest_List = await res;
    })
  }
  //referral policy
  referral_List: ReferralModel[] = [];
  doLoadReferralList() {
    var tmp = new ReferralModel();
    this.referralService.referral_get(tmp).then((res) => {
      this.referral_List = res
    })
  }
  //Institite
  instituteList: InstituteModel[] = [];
  doLoadinstituteList() {
    var tmp = new InstituteModel();

    this.instituteService.institute_get().then((res) => {
      this.instituteList = res;
    });
  }
  // Course
  courseList: CourseModel[] = [];
  doLoadcourseList() {
    var tmp = new CourseModel();

    this.courseService.course_get().then((res) => {
      this.courseList = res;
    });
  }
  // Faculty
  facultyList: FacultyModel[] = [];
  doLoadfacultyList() {
    var tmp = new FacultyModel();

    this.facultyService.faculty_get(tmp).then((res) => {
      this.facultyList = res;
    });
  }
  //Major
  majorList: MajorModel[] = [];
  doLoadmajorList() {
    var tmp = new MajorModel();

    this.majorService.major_get().then((res) => {
      this.majorList = res;
    });
  }
  //Qualification
  qualificationList: QualificationModel[] = [];
  doLoadqualificationList() {
    var tmp = new QualificationModel();

    this.qualificationService.qualification_get().then((res) => {
      this.qualificationList = res;
    });
  }
  //Province
  provinceList: ProvinceModel[] = [];
  doLoadprovinceList() {
    var tmp = new ProvinceModel();

    this.provinceService.province_get().then((res) => {
      this.provinceList = res;
    })
  }
  //drop supply
  supplyList: SupplyModel[] = [];
  doLoadSupplyList() {
    var tmp = new SupplyModel();

    this.supplyService.supply_get().then((res) => {
      this.supplyList = res;
    })
  }

  //drop uniform
  uniformList: ProuniformModel[] = [];
  doLoadUniformList() {
    var tmp3 = new ProuniformModel();

    this.genaralService.prouniform_get(tmp3).then((res) => {
      this.uniformList = res;
    })
  }
  //10/01/2024
  project_list: ProjectModel[] = [];
  selectedProject_fillter: ProjectModel = new ProjectModel()
  selectedDate_fillter: Date = new Date()
  selectedToDate_fillter: Date = new Date()

  doLoadProject() {
    this.project_list = []
    this.projectService.project_get(this.initial_current.CompCode, "").then(async (res) => {
      this.project_list = await res;

    });
  }

  version: string = "";
  jobmain_list: ProjobmainModel[] = [];

  selectedProjobmain: ProjectModel = new ProjectModel();

  selectedJobmain: RadiovalueModel = new RadiovalueModel();
  projobsub_list: ProjobsubModel[] = [];
  selectedProjobsub: ProjobsubModel = new ProjobsubModel();
  result_list: Result[] = [];
  internal_staff: string = "0";
  external_employees: string = "1";

  async doLoadPolJobmain() {
    try {
      this.jobmain_list = [];
      const allProjobmain = await this.projectDetailService.projobversion_get(this.selectedEmpUniform.project_code);
      if (allProjobmain && allProjobmain.length > 0) {
        const latestProjobmain = allProjobmain.reduce((acc: ProjobmainModel, current: ProjobmainModel) => acc.version > current.version ? acc : current);
        const res = await this.projectDetailService.projobmain_get(latestProjobmain.version, this.selectedEmpUniform.project_code, "", this.initial_current.PR_FromDate, this.initial_current.PR_ToDate);
        this.jobmain_list = res as ProjobmainModel[];

      }
    } catch (error) { }
  }

  doGetPolJobmainDetail(code: string): string {
    for (let i = 0; i < this.jobmain_list.length; i++) {
      if (this.jobmain_list[i].projobmain_code === code) {
        return this.initial_current.Language === 'TH' ? this.jobmain_list[i].projobmain_name_th : this.jobmain_list[i].projobmain_name_en;
      }
    }
    return '';
  }

  jobmain_list2: ProjobmainModel[] = [];

  doLoadPolJobmain2() {
    this.jobmain_list2 = []
    this.projectDetailService.projobmain_get("", this.selectedEmpUniform.project_code, "", this.initial_current.PR_FromDate, this.initial_current.PR_ToDate).then(async (res) => {
      this.jobmain_list2 = await res;

    });
  }

  doGetPolJobmainDetail2(code: string): string {
    for (let i = 0; i < this.jobmain_list2.length; i++) {
      if (this.jobmain_list2[i].projobmain_code === code) {
        return this.initial_current.Language === 'TH' ? this.jobmain_list2[i].projobmain_name_th : this.jobmain_list2[i].projobmain_name_en;
      }
    }
    return '';
  }

  doFillter() {
    this.doLoadPolJobmain()

  }

  totalAmount: number = 0;
  numberOfInstallments: number = 0;
  installmentAmount: number = 0;

  saveInstallment(event: number) {
    this.selectedEmpUniform.empuniform_payamount = event.toString();
  }
  
  



  //
  uniformProList: ProjectModel[] = [];
  // selectedProject_fillter: ProjectModel = new ProjectModel()

  uniformJobList: ProjobmainModel[] = [];
  selectedProject: string = "";
  doLoadUniformProList() {
    this.projectService.project_get(this.initial_current.CompCode, '').then((res) => {
      this.uniformProList = res;
    })
  }
  doLoadUniformJobList() {
    this.projobService.projobmain_get('', this.selectedProject, '', this.initial_current.PR_FromDate, this.initial_current.PR_ToDate).then(async (res) => {
      this.uniformJobList = await res
    })
  }
  uniformTypeList: ProequipmentTypeModel[] = [];
  doLoadUniformTypeList() {
    var tmp = new ProequipmentTypeModel();
    this.proequimenttype.proequipmenttype_get(tmp).then((res) => {
      this.uniformTypeList = res;
    })
  }
  //drop item
  ItemList: ItemsModel[] = [];
  doLoadItemList() {
    var tmp = new ItemsModel();
    this.itemService.item_get(tmp).then((res) => {
      this.ItemList = res;
    })
  }
  //drop provident
  providentList: ProvidentModel[] = [];
  doLoadProvidentList() {
    var tmp = new ProvidentModel();
    this.providentService.provident_get(tmp).then((res) => {
      this.providentList = res;
    })
  }
  //provident workage
  providentWorkList() {

  }
  //drop reduce
  reduceList: ReducesModel[] = [];
  doLoadReduceList() {
    var tmp = new ReducesModel();
    this.reduceService.reduce_get().then((res) => {
      this.reduceList = res;
    })
  }
  //drop ethnicity
  ethnicityList: EthnicityModel[] = [];
  doLoadethnicityList() {
    var tmp = new EthnicityModel();

    this.ethnicityService.ethnicity_get().then((res) => {
      this.ethnicityList = res;
    })
  }

  //SetBonus
  SetBonus_List: SetBonusModel[] = [];
  tmp: SetBonusModel = new SetBonusModel();
  doLoadBonusList() {
    this.tmp.worker_code = this.emp_code;
    this.setbonusService.SetBonus_get('', this.tmp).then((res) => {
      this.SetBonus_List = res;
    });
  }

  //drop foretype
  foretype_List: ForetypeModel[] = [];
  doLoadForetypeList() {
    this.foretypeService.foretype_get().then((res) => {
      this.foretype_List = res;
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
  empaddress_delete() {
    var tmp: EmpaddressModel = new EmpaddressModel();
    tmp.worker_code = this.selectedEmployee.worker_code
    this.empdetailService.delete_empaddress(tmp).then((res) => {
      let result = JSON.parse(res);
    });
  }
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
      this.empaddress_delete();
    } else {
      this.empdetailService.record_empaddress(this.selectedEmployee.worker_code, this.empaddressList).then((res) => {
        let result = JSON.parse(res);
        if (result.success) {
        }
        else {
        }
      });
    }

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
  empcard_delete() {
    var tmp: EmpcardModel = new EmpcardModel();
    tmp.worker_code = this.selectedEmployee.worker_code
    this.empdetailService.delete_empcard(tmp).then((res) => {
      let result = JSON.parse(res);
    });
  }
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
      this.empcard_delete();
    } else {
      this.empdetailService.record_empcard(this.selectedEmployee.worker_code, this.empcardList).then((res) => {
        let result = JSON.parse(res);
        if (result.success) {
        }
        else {
        }
      });
    }

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
  empbank_delete() {
    var tmp: EmpbankModel = new EmpbankModel();
    tmp.worker_code = this.selectedEmployee.worker_code
    this.empdetailService.delete_empbank(tmp).then((res) => {
      let result = JSON.parse(res);
    });
  }
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
      this.empbank_delete();
    } else {
      this.empdetailService.record_empbank(this.selectedEmployee.worker_code, this.empbankList).then((res) => {
        let result = JSON.parse(res);
        if (result.success) {
        }
        else {
        }
      });
    }

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
  empfamily_delete() {
    var tmp: EmpFamilyModel = new EmpFamilyModel();
    tmp.worker_code = this.selectedEmployee.worker_code
    this.empdetailService.delete_empfamily(tmp).then((res) => {
      let result = JSON.parse(res);
    });
  }
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
      this.empfamily_delete();
    } else {
      this.empdetailService.record_empfamily(this.selectedEmployee.worker_code, this.empfamilyList).then((res) => {
        let result = JSON.parse(res);
        if (result.success) {
        }
        else {
        }
      });
    }

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
  emphospital_delete() {
    var tmp: EmpHospitalModel = new EmpHospitalModel();
    tmp.worker_code = this.selectedEmployee.worker_code
    this.empdetailService.delete_emphospital(tmp).then((res) => {
      let result = JSON.parse(res);
    });
  }
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
      this.emphospital_delete();
    } else {
      this.empdetailService.record_emphospital(this.selectedEmployee.worker_code, this.emphospitalList).then((res) => {
        let result = JSON.parse(res);
        if (result.success) {
        }
        else {
        }
      });
    }

  }

  //foreigner
  empforeignerList: EmpForeignerModel[] = [];
  selectedEmpforeigner: EmpForeignerModel = new EmpForeignerModel();
  doLoadEmpForeigner() {
    this.empdetailService.getworker_foreigner(this.initial_current.CompCode, this.emp_code).then(async (res) => {
      await res.forEach((element: EmpForeignerModel) => {
        element.entry_date = new Date(element.entry_date)
        // element.passport_issue = new Date(element.passport_issue)
        // element.passport_expire = new Date(element.passport_expire)
        // element.visa_issue = new Date(element.visa_issue)
        // element.visa_expire = new Date(element.visa_expire)
        // element.workpermit_issue = new Date(element.workpermit_issue)
        // element.workpermit_expire = new Date(element.workpermit_expire)
        // element.entry_date = new Date(element.entry_date)
        // element.certificate_expire = new Date(element.certificate_expire)
        // element.otherdoc_expire = new Date(element.otherdoc_expire)
      })
      this.empforeignerList = await res;
      if (this.empforeignerList.length > 0) {
        this.selectedEmpforeigner = this.empforeignerList[0];
      }
    })
  }
  onRowSelectEmpForeigner(event: Event) { }
  empforeigner_summit() {
    this.empforeigner_addItem(this.selectedEmpforeigner)
    this.new_foreigner = false
    this.edit_empforeigner = false
    this.displayManage = false
  }
  empforeigner_remove() {
    this.selectedEmpforeigner.foreigner_id = "9999";
    this.empforeigner_addItem(this.selectedEmpforeigner)
    this.new_foreigner = false
    this.edit_empforeigner = false
  }
  empforeigner_delete() {
    var tmp: EmpForeignerModel = new EmpForeignerModel();
    tmp.worker_code = this.selectedEmployee.worker_code
    this.empdetailService.delete_empforeigner(tmp).then((res) => {
      let result = JSON.parse(res);
    });
  }
  empforeigner_cancel() {
    this.new_foreigner = false
    this.edit_empforeigner = false
    this.displayManage = false
  }
  empforeigner_addItem(model: EmpForeignerModel) {
    const itemNew: EmpForeignerModel[] = [];
    for (let i = 0; i < this.empforeignerList.length; i++) {
      if (this.empforeignerList[i].foreigner_id == model.foreigner_id) {
        //-- Notting
      }
      else {
        itemNew.push(this.empforeignerList[i]);
      }
    }
    //-- 9999 for delete
    if (model.foreigner_id != "9999") {
      itemNew.push(model);
    }
    this.empforeignerList = [];
    this.empforeignerList = itemNew;
    this.empforeignerList.sort(function (a, b) { return parseInt(a.foreigner_id) - parseInt(b.foreigner_id); })
  }
  record_empforeigner() {
    if (this.empforeignerList.length == 0) {
    } else {
    }
    this.empdetailService.record_empforeigner(this.selectedEmployee.worker_code, this.selectedEmpforeigner)
  }
  //--foreignercard
  displayaddForeCard: boolean = false;
  displayeditForeCard: boolean = false;
  empforeignercardList: EmpForeignercardModel[] = [];
  selectedEmpforeignercard: EmpForeignercardModel = new EmpForeignercardModel();
  doLoadEmpForeignercardList() {
    this.empdetailService.getworker_foreignercard(this.initial_current.CompCode, this.emp_code).then(async (res) => {
      await res.forEach((element: EmpForeignercardModel) => {
        element.foreignercard_issue = new Date(element.foreignercard_issue)
        element.foreignercard_expire = new Date(element.foreignercard_expire)
      })
      this.empforeignercardList = await res;
      if (this.empforeignercardList.length > 0) {
        this.selectedEmpforeignercard = this.empforeignercardList[0];
      }
    })
  }
  onRowSelectEmpForeignercard(event: Event) {
    this.displayaddForeCard = false;
    this.displayeditForeCard = false;
  }
  empforeignercard_summit() {
    this.empforeignercard_addItem(this.selectedEmpforeignercard)
    this.new_foreignercard = false
    this.edit_empforeignercard = false
    this.displayaddForeCard = false
    this.displayeditForeCard = false
  }
  empforeignercard_remove() {
    this.selectedEmpforeignercard.foreignercard_id = "9999";
    this.empforeignercard_addItem(this.selectedEmpforeignercard)
    this.new_foreignercard = false
    this.edit_empforeignercard = false
  }
  empforeignercard_delete() {
    var tmp: EmpForeignercardModel = new EmpForeignercardModel();
    tmp.worker_code = this.selectedEmployee.worker_code
    this.empdetailService.delete_empforeignercard(tmp).then((res) => {
      let result = JSON.parse(res);
    });
  }
  empforeignercard_cancel() {
    this.new_foreignercard = false
    this.edit_empforeignercard = false
    this.displayaddForeCard = false
    this.displayeditForeCard = false
  }
  empforeignercard_addItem(model: EmpForeignercardModel) {
    const itemNew: EmpForeignercardModel[] = [];
    for (let i = 0; i < this.empforeignercardList.length; i++) {
      if (this.empforeignercardList[i].foreignercard_id == model.foreignercard_id) {
        //-- Notting
      }
      else {
        itemNew.push(this.empforeignercardList[i]);
      }
    }
    //-- 9999 for delete
    if (model.foreignercard_id != "9999") {
      itemNew.push(model);
    }
    this.empforeignercardList = [];
    this.empforeignercardList = itemNew;
    this.empforeignercardList.sort(function (a, b) { return parseInt(a.foreignercard_id) - parseInt(b.foreignercard_id); })
  }
  record_empforeignercard() {
    if (this.empforeignercardList.length == 0) {
      this.empforeignercard_delete();
    } else {
      this.empdetailService.record_empforeignercard(this.selectedEmployee.worker_code, this.empforeignercardList).then((res) => {
        let result = JSON.parse(res);
        if (result.success) {
        }
        else {
        }
      });
    }

  }
  Saveforecard() {
    if (!this.displayeditForeCard) {
      this.selectedEmpforeigner.foreigner_card = this.selectedEmpforeigner.foreigner_card.concat({
        company_code: this.selectedEmpforeigner.company_code,
        worker_code: this.selectedEmpforeigner.worker_code,
        foreignercard_id: "0",
        foreignercard_code: this.selectedEmpforeignercard.foreignercard_code,
        foreignercard_type: this.selectedEmpforeignercard.foreignercard_type,
        foreignercard_issue: this.selectedEmpforeignercard.foreignercard_issue,
        foreignercard_expire: this.selectedEmpforeignercard.foreignercard_expire,
        modified_by: this.initial_current.Username,
        modified_date: ""
      })
      this.selectedEmpforeignercard = new EmpForeignercardModel();
      this.displayaddForeCard = false;
      this.displayeditForeCard = false;
    }
  }
  DeleteForecard() {
    this.selectedEmpforeigner.foreigner_card = this.selectedEmpforeigner.foreigner_card.filter((item) => {
      return item !== this.selectedEmpforeignercard;
    });
    this.selectedEmpforeignercard = new EmpForeignercardModel();
    this.displayaddForeCard = false;
    this.displayeditForeCard = false;
  }
  closeforecard() {
    this.selectedEmpforeignercard = new EmpForeignercardModel();
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
  empdep_delete() {
    var tmp: EmpDepModel = new EmpDepModel();
    tmp.worker_code = this.selectedEmployee.worker_code
    this.empdetailService.delete_empdep(tmp).then((res) => {
      let result = JSON.parse(res);
    });
  }
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
      this.empdep_delete();
    } else {
      this.empdetailService.record_empdep(this.selectedEmployee.worker_code, this.empdepList).then((res) => {
        let result = JSON.parse(res);
        if (result.success) {
        }
        else {
        }
      });
    }

  }

  //drop
  reason_list: ReasonsModel[] = [];
  reasons: ReasonsModel = new ReasonsModel()
  doLoadReason() {
    this.reason_list = [];
    var tmp = new ReasonsModel();
    tmp.reason_group = 'BLACK';
    this.reasonsService.reason_get(tmp).then(async (res) => {
      this.reason_list = await res;
    });
  }
  reason_salary: ReasonsModel[] = [];
  doLoadReasonSalary() {
    this.reason_salary = [];
    var tmp = new ReasonsModel();
    tmp.reason_group = 'SAL';
    this.reasonsService.reason_get(tmp).then(async (res) => {
      this.reason_salary = await res;
    });
  }
  reason_resign: ReasonsModel[] = [];
  doLoadReasonResign() {
    this.reason_resign = [];
    var tmp = new ReasonsModel();
    tmp.reason_group = 'EMP';
    this.reasonsService.reason_get(tmp).then(async (res) => {
      this.reason_resign = await res;
    });
  }
  reason_pos: ReasonsModel[] = [];
  doLoadReasonPos() {
    this.reason_pos = [];
    var tmp = new ReasonsModel();
    tmp.reason_group = 'POS';
    this.reasonsService.reason_get(tmp).then(async (res) => {
      this.reason_pos = await res;
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
    this.new_position = false
    this.edit_empposition = false
  }
  empposition_delete() {
    var tmp: EmpPositionModel = new EmpPositionModel();
    tmp.worker_code = this.selectedEmployee.worker_code;
    tmp.empposition_id = "";
    this.empdetailService.delete_empposition(tmp).then((res) => {
      let result = JSON.parse(res);
    });
  }
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
      this.empposition_delete();
    } else {
      this.empdetailService.record_empposition(this.selectedEmployee.worker_code, this.emppositionList).then((res) => {
        let result = JSON.parse(res);
        if (result.success) {
        }
        else {
        }
      });
    }

  }

  //emp group
  empgroupList: EmpGroupModel[] = [];
  selectedEmpGroup: EmpGroupModel = new EmpGroupModel();
  doLoadEmpGroupList() {
    this.empdetailService.getworker_group(this.initial_current.CompCode, this.emp_code).then(async (res) => {
      await res.forEach((element: EmpGroupModel) => {
        element.empgroup_date = new Date(element.empgroup_date)

      })
      this.empgroupList = await res;
      if (this.empgroupList.length > 0) {
        this.selectedEmpGroup = this.empgroupList[0];
      }
    })
  }

  onRowSelectEmpGroup(event: Event) { }
  empgroup_summit() {
    this.empgroup_addItem(this.selectedEmpGroup)
    this.new_group = false
    this.edit_empgroup = false
    this.displayManage = false
  }
  empgroup_remove() {
    this.selectedEmpGroup.empgroup_id = "9999";
    this.empgroup_addItem(this.selectedEmpGroup)
    this.new_group = false
    this.edit_empgroup = false
  }
  empgroup_delete() {
    var tmp: EmpGroupModel = new EmpGroupModel();
    tmp.worker_code = this.selectedEmployee.worker_code
    this.empdetailService.delete_empgroup(tmp).then((res) => {
      let result = JSON.parse(res);
    });
  }
  empgroup_cancel() {
    this.new_group = false
    this.edit_empgroup = false
    this.displayManage = false
  }
  empgroup_addItem(model: EmpGroupModel) {
    const itemNew: EmpGroupModel[] = [];
    for (let i = 0; i < this.empgroupList.length; i++) {
      if (this.empgroupList[i].empgroup_id == model.empgroup_id) {
        //-- Notting
      }
      else {
        itemNew.push(this.empgroupList[i]);
      }
    }
    //-- 9999 for delete
    if (model.empgroup_id != "9999") {
      itemNew.push(model);
    }
    this.empgroupList = [];
    this.empgroupList = itemNew;
    this.empgroupList.sort(function (a, b) { return parseInt(a.empgroup_id) - parseInt(b.empgroup_id); })
  }
  record_empgroup() {
    if (this.empgroupList.length == 0) {
      this.empgroup_delete();
    } else {
      this.empdetailService.record_empgroup(this.selectedEmployee.worker_code, this.empgroupList).then((res) => {
        let result = JSON.parse(res);
        if (result.success) {
        }
        else {
        }
      });
    }

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
  empeducation_delete() {
    var tmp: EmpEducationModel = new EmpEducationModel();
    tmp.worker_code = this.selectedEmployee.worker_code
    this.empdetailService.delete_empeducation(tmp).then((res) => {
      let result = JSON.parse(res);
    });
  }
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
      this.empeducation_delete();
    } else {
      this.empdetailService.record_empeducation(this.selectedEmployee.worker_code, this.empeducationList).then((res) => {
        let result = JSON.parse(res);
        if (result.success) {
        }
        else {
        }
      });
    }

  }

  //emp supply
  empsupplyList: EmpSupplyModel[] = [];
  selectedEmpSupply: EmpSupplyModel = new EmpSupplyModel();
  doLoadEmpSupplyList() {
    this.empdetailService.getworker_supply(this.initial_current.CompCode, this.emp_code).then(async (res) => {
      await res.forEach((element: EmpSupplyModel) => {
        element.empsupply_issuedate = new Date(element.empsupply_issuedate)
        element.empsupply_returndate = new Date(element.empsupply_returndate)
      })
      this.empsupplyList = await res;
      if (this.empsupplyList.length > 0) {
        this.selectedEmpSupply = this.empsupplyList[0];
      }
    })
  }
  onRowSelectEmpSupply(event: Event) { }
  empsupply_summit() {
    this.empsupply_addItem(this.selectedEmpSupply)
    this.new_supply = false
    this.edit_empsupply = false
    this.displayManage = false
  }
  empsupply_remove() {
    this.selectedEmpSupply.empsupply_id = "9999";
    this.empsupply_addItem(this.selectedEmpSupply)
    this.new_supply = false
    this.edit_empsupply = false
  }
  empsupply_delete() {
    var tmp: EmpSupplyModel = new EmpSupplyModel();
    tmp.worker_code = this.selectedEmployee.worker_code
    this.empdetailService.delete_empsupply(tmp).then((res) => {
      let result = JSON.parse(res);
    });
  }
  empsupply_cancel() {
    this.new_supply = false
    this.edit_empsupply = false
    this.displayManage = false
  }
  empsupply_addItem(model: EmpSupplyModel) {
    const itemNew: EmpSupplyModel[] = [];
    for (let i = 0; i < this.empsupplyList.length; i++) {
      if (this.empsupplyList[i].empsupply_id == model.empsupply_id) {
        //-- Notting
      }
      else {
        itemNew.push(this.empsupplyList[i]);
      }
    }
    //-- 9999 for delete
    if (model.empsupply_id != "9999") {
      itemNew.push(model);
    }
    this.empsupplyList = [];
    this.empsupplyList = itemNew;
    this.empsupplyList.sort(function (a, b) { return parseInt(a.empsupply_id) - parseInt(b.empsupply_id); })
  }
  record_empsupply() {
    if (this.empsupplyList.length == 0) {
      this.empsupply_delete();
    } else {
      this.empdetailService.record_empsupply(this.selectedEmployee.worker_code, this.empsupplyList).then((res) => {
        let result = JSON.parse(res);
        if (result.success) {
        }
        else {
        }
      });
    }

  }

  //emp uniform
  empuniformList: EmpUniformModel[] = [];
  selectedEmpUniform: EmpUniformModel = new EmpUniformModel();
  doLoadEmpUniformList() {
    this.empdetailService.getworker_uniform(this.initial_current.CompCode, this.emp_code).then(async (res) => {
      await res.forEach((element: EmpUniformModel) => {
        element.empuniform_issuedate = new Date(element.empuniform_issuedate)

      })
      this.empuniformList = await res;
      if (this.empuniformList.length > 0) {
        this.selectedEmpUniform = this.empuniformList[0];
      }
    })

  }
  onRowSelectEmpUniform(event: Event) { }
  empuniform_summit() {
    // console.log(this.selectedEmpUniform)
    this.empuniform_addItem(this.selectedEmpUniform)
    this.new_uniform = false
    this.edit_empuniform = false
    this.displayManage = false
  }
  empuniform_remove() {
    this.selectedEmpUniform.empuniform_id = "9999";
    this.empuniform_addItem(this.selectedEmpUniform)
    this.new_uniform = false
    this.edit_empuniform = false
  }
  empuniform_delete() {
    var tmp: EmpUniformModel = new EmpUniformModel();
    tmp.worker_code = this.selectedEmployee.worker_code
    this.empdetailService.delete_empuniform(tmp).then((res) => {
      let result = JSON.parse(res);
    });
  }
  empuniform_cancel() {
    this.new_uniform = false
    this.edit_empuniform = false
    this.displayManage = false
  }
  empuniform_addItem(model: EmpUniformModel) {
    const itemNew: EmpUniformModel[] = [];
    for (let i = 0; i < this.empuniformList.length; i++) {
      if (this.empuniformList[i].empuniform_id == model.empuniform_id) {
        //-- Notting
      }
      else {
        itemNew.push(this.empuniformList[i]);
      }
    }
    //-- 9999 for delete
    if (model.empuniform_id != "9999") {
      itemNew.push(model);
    }
    this.empuniformList = [];
    this.empuniformList = itemNew;
    this.empuniformList.sort(function (a, b) { return parseInt(a.empuniform_id) - parseInt(b.empuniform_id); })
  }
  calculateTotalAmount() {
    const amount1 = parseFloat(this.selectedEmpUniform.empuniform_amount);
    const quantity1 = parseFloat(this.selectedEmpUniform.empuniform_qauntity);
  
    if (!isNaN(amount1) && !isNaN(quantity1)) {
      const result = amount1 * quantity1;
      this.selectedEmpUniform.empuniform_total = result.toFixed(2); 
      this.record_empuniform();
    } else {
      this.selectedEmpUniform.empuniform_total = '0.00';  
    }
  }
  calculateInstallment() {
    const amount = parseFloat(this.selectedEmpUniform.empuniform_total);
    const payPeriod = parseInt(this.selectedEmpUniform.empuniform_payperiod);
    
    if (!isNaN(amount) && !isNaN(payPeriod) && amount > 0 && payPeriod > 0) {
      this.installmentAmount = amount / payPeriod;
      this.record_empuniform();  
    } else {
      this.installmentAmount = 0;
    }
  }
  
  record_empuniform() {
    if (this.empuniformList.length == 0) {
      this.empuniform_delete();
    } else {
      this.selectedEmpUniform.empuniform_payamount = this.installmentAmount.toString();  
      this.empdetailService.record_empuniform(this.selectedEmployee.worker_code, this.empuniformList).then((res) => {
        let result = JSON.parse(res);
        if (result.success) {
        } else {
        }
      });
    }
  }
  // record_empuniform() {
  //   if (this.empuniformList.length == 0) {
  //     this.empuniform_delete();
  //   } else {
  //     this.empdetailService.record_empuniform(this.selectedEmployee.worker_code, this.empuniformList).then((res) => {
  //       let result = JSON.parse(res);
  //       if (result.success) {
  //       }
  //       else {
  //       }
  //     });
  //   }
  // }

  //emp suggest
  empsuggestList: EmpSuggestModel[] = [];
  selectedEmpSuggest: EmpSuggestModel = new EmpSuggestModel();
  doLoadEmpSuggestList() {
    this.empdetailService.getworker_suggest(this.initial_current.CompCode, this.emp_code).then(async (res) => {
      await res.forEach((element: EmpSuggestModel) => {
        element.empsuggest_date = new Date(element.empsuggest_date)
      })
      this.empsuggestList = await res;
      if (this.empsuggestList.length > 0) {
        this.selectedEmpSuggest = this.empsuggestList[0];
      }
    })
  }
  onRowSelectEmpSuggest(event: Event) { }
  empsuggest_summit() {
    this.empsuggest_addItem(this.selectedEmpSuggest)
    this.new_suggest = false
    this.edit_empsuggest = false
    this.displayManage = false
  }
  empsuggest_remove() {
    this.selectedEmpSuggest.empsuggest_id = "9999";
    this.empsuggest_addItem(this.selectedEmpSuggest)
    this.new_suggest = false
    this.edit_empsuggest = false
  }
  empsuggest_delete() {
    var tmp: EmpSuggestModel = new EmpSuggestModel();
    tmp.worker_code = this.selectedEmployee.worker_code
    this.empdetailService.delete_empsuggest(tmp).then((res) => {
      let result = JSON.parse(res);
    });
  }
  empsuggest_cancel() {
    this.new_suggest = false
    this.edit_empsuggest = false
    this.displayManage = false
  }
  empsuggest_addItem(model: EmpSuggestModel) {
    const itemNew: EmpSuggestModel[] = [];
    for (let i = 0; i < this.empsuggestList.length; i++) {
      if (this.empsuggestList[i].empsuggest_id == model.empsuggest_id) {
        //-- Notting
      }
      else {
        itemNew.push(this.empsuggestList[i]);
      }
    }
    //-- 9999 for delete
    if (model.empsuggest_id != "9999") {
      itemNew.push(model);
    }
    this.empsuggestList = [];
    this.empsuggestList = itemNew;
    this.empsuggestList.sort(function (a, b) { return parseInt(a.empsuggest_id) - parseInt(b.empsuggest_id); })
  }
  record_empsuggest() {
    if (this.empsuggestList.length == 0) {
      this.empsuggest_delete();
    } else {
      this.empdetailService.record_empsuggest(this.selectedEmployee.worker_code, this.empsuggestList).then((res) => {
        let result = JSON.parse(res);
        if (result.success) {
        }
        else {
        }
      });
    }

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
  emptraining_delete() {
    var tmp: EmpTrainingModel = new EmpTrainingModel();
    tmp.worker_code = this.selectedEmployee.worker_code
    this.empdetailService.delete_emptraining(tmp).then((res) => {
      let result = JSON.parse(res);
    });
  }
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
      this.emptraining_delete();
    } else {
      this.empdetailService.record_emptraining(this.selectedEmployee.worker_code, this.emptrainingList).then((res) => {
        let result = JSON.parse(res);
        if (result.success) {
        }
        else {
        }
      });
    }

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
  empassessment_delete() {
    var tmp: EmpAssessmentModel = new EmpAssessmentModel();
    tmp.worker_code = this.selectedEmployee.worker_code
    this.empdetailService.delete_empassessment(tmp).then((res) => {
      let result = JSON.parse(res);
    });
  }
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
      this.empassessment_delete();
    } else {
      this.empdetailService.record_empassessment(this.selectedEmployee.worker_code, this.empassessmentList).then((res) => {
        let result = JSON.parse(res);
        if (result.success) {
        }
        else {
        }
      });
    }

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
  empcriminal_delete() {
    var tmp: EmpCriminalModel = new EmpCriminalModel();
    tmp.worker_code = this.selectedEmployee.worker_code
    this.empdetailService.delete_empcriminal(tmp).then((res) => {
      let result = JSON.parse(res);
    });
  }
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
      this.empcriminal_delete();
    } else {
      this.empdetailService.record_empcriminal(this.selectedEmployee.worker_code, this.empcriminalList).then((res) => {
        let result = JSON.parse(res);
        if (result.success) {
        }
        else {
        }
      });
    }

  }

  // empresignrecord: [] = [];
  // selectedEmpresign: EmpSalaryModel = new EmpSalaryModel();
  onRowSelectEmpresign(event: Event) { }

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
  empsalary_delete() {
    var tmp: EmpSalaryModel = new EmpSalaryModel();
    tmp.worker_code = this.selectedEmployee.worker_code
    this.empdetailService.delete_empsalary(tmp).then((res) => {
      let result = JSON.parse(res);
    });
  }
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
      // console.log(this.empsalaryList)
      this.empsalary_delete();
    } else {
      this.empdetailService.record_empsalary(this.selectedEmployee.worker_code, this.empsalaryList).then((res) => {
        let result = JSON.parse(res);
        if (result.success) {
        }
        else {
        }
      });
    }

  }

  //Provident
  empprovidentList: EmpProvidentModel[] = [];
  selectedEmpprovident: EmpProvidentModel = new EmpProvidentModel();
  async doLoadEmpprovidentList() {
    const res = await this.empdetailService.getworker_provident(this.initial_current.CompCode, this.emp_code);

    const promises = res.map(async (element: EmpProvidentModel) => {
      element.empprovident_entry = new Date(element.empprovident_entry);
      element.empprovident_start = new Date(element.empprovident_start);
      element.empprovident_end = new Date(element.empprovident_end);
      element.empprovident_age = await this.CalculatePFAge(element.empprovident_start);
      return element;
    });

    const modifiedRes = await Promise.all(promises);

    this.empprovidentList = modifiedRes;
    if (this.empprovidentList.length > 0) {
      this.selectedEmpprovident = this.empprovidentList[0];
    }

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
  empprovident_delete() {
    var tmp: EmpProvidentModel = new EmpProvidentModel();
    tmp.worker_code = this.selectedEmployee.worker_code
    this.empdetailService.delete_empprovident(tmp).then((res) => {
      let result = JSON.parse(res);
    });
  }
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
        this.CalculatePFAge(this.empprovidentList[i].empprovident_start)
          .then(PfAge => {
            this.empprovidentList[i].empprovident_age = PfAge;
          })
        itemNew.push(this.empprovidentList[i]);
      }
    }
    //-- 9999 for delete
    if (model.empprovident_id != "9999") {
      this.CalculatePFAge(model.empprovident_start)
        .then(PfAge => {
          model.empprovident_age = PfAge;
        })
      itemNew.push(model);
    }
    this.empprovidentList = [];
    this.empprovidentList = itemNew;
    this.empprovidentList.sort(function (a, b) { return parseInt(a.empprovident_id) - parseInt(b.empprovident_id); })
  }
  record_empprovident() {
    if (this.empprovidentList.length == 0) {
      this.empprovident_delete();
    } else {
      this.empdetailService.record_empprovident(this.selectedEmployee.worker_code, this.empprovidentList).then((res) => {
        let result = JSON.parse(res);
        if (result.success) {
        }
        else {
        }
      });
    }

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
  onRowSelectEmpbenefit(event: Event) {
    var tmp: EmpBenefitsModel = new EmpBenefitsModel();
    tmp.worker_code = this.selectedEmployee.worker_code
    this.empdetailService.delete_empbenefit(tmp).then((res) => {
      let result = JSON.parse(res);
    });
  }
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
  empbenefit_delete() {
    var tmp: EmpBenefitsModel = new EmpBenefitsModel();
    tmp.worker_code = this.selectedEmployee.worker_code
    this.empdetailService.delete_empbenefit(tmp).then((res) => {
      let result = JSON.parse(res);
    });
  }
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
      this.empbenefit_delete();
    } else {
      this.empdetailService.record_empbenefit(this.selectedEmployee.worker_code, this.empbenefitList).then((res) => {
        let result = JSON.parse(res);
        if (result.success) {
        }
        else {
        }
      });
    }

  }
  changebenefitamount() {
    if (this.selectedEmpbenefit.empbenefit_capitalamount != 0 && this.selectedEmpbenefit.empbenefit_period != 0) {
      this.selectedEmpbenefit.empbenefit_amount = (this.selectedEmpbenefit.empbenefit_capitalamount / this.selectedEmpbenefit.empbenefit_period)
    }
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
  empreduce_delete() {
    var tmp: EmpReduceModel = new EmpReduceModel();
    tmp.worker_code = this.selectedEmployee.worker_code
    this.empdetailService.delete_empreduce(tmp).then((res) => {
      let result = JSON.parse(res);
    });
  }
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
      this.empreduce_delete()
    } else {
      this.empdetailService.record_empreduce(this.selectedEmployee.worker_code, this.empreduceList).then((res) => {
        let result = JSON.parse(res);
        if (result.success) {
        }
        else {
        }
      });
    }

  }

  //accumalate
  empacculamateList: EmpAccumalateModel[] = [];
  selectedEmpaccumalate: EmpAccumalateModel = new EmpAccumalateModel();
  onRowSelectEmpAcc(event: any) {
    this.edit_empaccumalate = true;
    this.new_accumalate = true;
  }


  //emp location
  emplocationList: EmpLocationModel[] = [];
  selectedEmpLocation: EmpLocationModel = new EmpLocationModel();
  doLoadEmplocationList() {
    this.empdetailService.getworker_location(this.initial_current.CompCode, this.emp_code).then(async (res) => {
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
  emplocation_delete() {
    var tmp: EmpLocationModel = new EmpLocationModel();
    tmp.worker_code = this.selectedEmployee.worker_code
    this.empdetailService.delete_emplocation(tmp).then((res) => {
      let result = JSON.parse(res);
    });
  }
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
      this.emplocation_delete()
    } else {
      this.empdetailService.record_emplocation(this.selectedEmployee.worker_code, this.emplocationList).then((res) => {
        let result = JSON.parse(res);
        if (result.success) {
        }
        else {
        }
      });
    }
  }

  //emp branch
  empbranchList: EmpBranchModel[] = [];
  selectedEmpbranch: EmpBranchModel = new EmpBranchModel();
  doLoadEmpbranchList() {
    this.empdetailService.getworker_branch(this.initial_current.CompCode, this.emp_code).then(async (res) => {
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
  empbranch_delete() {
    var tmp: EmpBranchModel = new EmpBranchModel();
    tmp.worker_code = this.selectedEmployee.worker_code
    this.empdetailService.delete_empbranch(tmp).then((res) => {
      let result = JSON.parse(res);
    });
  }
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
    // if (this.empbranchList.length) {
    //   this.doGetNewCode(this.selectedEmployee.worker_type, this.empbranchList.slice(-1)[0].branch_code);
    // } else {
    //   this.doGetNewCode(this.selectedEmployee.worker_type, "");
    // }
  }
  record_empbranch() {
    if (this.empbranchList.length == 0) {
      this.empbranch_delete();
    } else {
      this.empdetailService.record_empbranch(this.selectedEmployee.worker_code, this.empbranchList).then((res) => {
        let result = JSON.parse(res);
        if (result.success) {
        }
        else {
        }
      });
    }

  }

  //emp experience
  empexperienceList: EmpExperienceModel[] = [];
  selectedEmpExperience: EmpExperienceModel = new EmpExperienceModel();
  async doLoadEmpExperienceList() {
    const res = await this.empdetailService.getworker_experience(this.initial_current.CompCode, this.emp_code);

    const promises = res.map(async (element: EmpExperienceModel) => {
      element.startdate = new Date(element.startdate);
      element.enddate = new Date(element.enddate);
      element.workage = await this.calculateWorkExp(element.startdate, element.enddate)
      return element;
    })

    const modifiedRes = await Promise.all(promises);

    this.empexperienceList = modifiedRes;
    if (this.empexperienceList.length > 0) {
      this.selectedEmpExperience = this.empexperienceList[0];
    }
    // this.empdetailService.getworker_experience(this.initial_current.CompCode, this.emp_code).then(async (res) => {
    //   await res.forEach((element: EmpExperienceModel) => {
    //     element.startdate = new Date(element.startdate)
    //     element.enddate = new Date(element.enddate)
    //     element.workage = this.calculateWorkExp(element.startdate,element.enddate)
    //   })
    //   this.empexperienceList = await res;
    //   if (this.empexperienceList.length > 0) {
    //     this.selectedEmpExperience = this.empexperienceList[0];
    //   }
    // })
  }
  onRowSelectEmpExperience(event: Event) { }
  empexperience_summit() {
    this.empexperience_addItem(this.selectedEmpExperience)
    this.new_experience = false
    this.edit_empexperience = false
    this.displayManage = false
  }
  empexperience_remove() {
    this.selectedEmpExperience.experience_id = "9999";
    this.empexperience_addItem(this.selectedEmpExperience)
    this.new_experience = false
    this.edit_empexperience = false
  }
  empexperience_delete() {
    var tmp: EmpExperienceModel = new EmpExperienceModel();
    tmp.worker_code = this.selectedEmployee.worker_code;
    this.empdetailService.delete_empexperience(tmp).then((res) => {
      let result = JSON.parse(res);
    });
  }
  empexperience_cancel() {
    this.new_experience = false
    this.edit_empexperience = false
    this.displayManage = false
  }
  empexperience_addItem(model: EmpExperienceModel) {
    const itemNew: EmpExperienceModel[] = [];
    for (let i = 0; i < this.empexperienceList.length; i++) {
      if (this.empexperienceList[i].experience_id == model.experience_id) {
        //-- Notting
      }
      else {
        this.calculateWorkExp(this.empexperienceList[i].startdate, this.empexperienceList[i].enddate)
          .then(workAge => {
            this.empexperienceList[i].workage = workAge;
          })
        itemNew.push(this.empexperienceList[i]);
      }
    }
    //-- 9999 for delete
    if (model.experience_id != "9999") {
      this.calculateWorkExp(model.startdate, model.enddate)
        .then(workAge => {
          model.workage = workAge;
        })
      itemNew.push(model);
    }
    this.empexperienceList = [];
    this.empexperienceList = itemNew;
    this.empexperienceList.sort(function (a, b) { return parseInt(a.experience_id) - parseInt(b.experience_id); })
  }
  record_empexperience() {
    if (this.empexperienceList.length == 0) {
      this.empexperience_delete();
    } else {
      this.empdetailService.record_empexperience(this.selectedEmployee.worker_code, this.empexperienceList).then((res) => {
        let result = JSON.parse(res);
        if (result.success) {
        }
        else {
        }
      });
    }

  }
  async calculateWorkExp(start: Date, end: Date): Promise<string> {
    // let workage: { year: number, months: number, days: number };
    if (start && end) {
      const from = new Date(start);
      const to = new Date(end);

      let years = to.getFullYear() - from.getFullYear();
      let months = to.getMonth() - from.getMonth();
      let days = to.getDate() - from.getDate();

      if (months < 0 || (months === 0 && to.getDate() < from.getDate())) {
        years--;
        months += 12;
      }

      if (days < 0) {
        months--;
        days += this.daysInMonth(to.getMonth() - 1, to.getFullYear());
      }

      if (this.initial_current.Language == 'TH') {
        return `${years} ปี ${months} เดือน ${days} วัน `
      } else {
        return `${years} years ${months} months ${days} days `
      }
    }
    return "";
  }
  private daysInMonth(month: number, year: number): number {
    return new Date(year, month + 1, 0).getDate();
  }

  closeAcc() {
    this.new_accumalate = false;
    this.selectedEmpaccumalate = new EmpAccumalateModel();
  }

  //Confirm
  confirmRecord() {
    if (this.checkResign(this.selectedEmployee.worker_cardno) == this.selectedEmployee.worker_cardno) {
      this.confirmationService.confirm({
        message: this.title_confirmresign[this.initial_current.Language],
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
    } else if (this.empbankList[0] && this.checkbankaccount(this.empbankList[0].bank_account || "") == this.empbankList[0].bank_account) {
      this.confirmationService.confirm({
        message: this.title_confirmbankacc[this.initial_current.Language],
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
    } else {
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

  }

  doGetNewCode(emp_type: string, empbranch: string) {
    this.codePolcodeService.getNewCode("", emp_type, empbranch).then((res) => {
      this.selectedEmployee.worker_code = res;
      // let result = JSON.parse(res);

      // if (result.success) {
      //   this.selectedEmployee.worker_code = result.data;
      //   this.selectedEmployee.worker_card = result.data;
      // }
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
        // this.record_empforeignercard();

        this.record_empdep();
        this.record_empposition();
        this.record_empgroup();
        this.record_empeducation();
        this.record_empsupply();
        this.record_empuniform();



        this.record_empsuggest();
        this.record_emptraining();
        this.record_empassessment();
        this.record_empcriminal();

        this.record_empsalary();
        this.record_empbenefit();
        this.record_empprovident();
        this.record_empreduce();

        this.record_empexperience();

        //image
        this.uploadImages();

        //blacklist
        this.doRecordEmpBlacklist();
        //resign
        this.doRecordEmpResign();

        //filedoc
        this.record_filedoc();

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

  fileToUpload: File | any = null;
  handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);
  }

  selectedimageName: string = '';
  onselectFile(event: any) {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      this.selectedimageName = selectedFile.name;
    } else {
      this.selectedimageName = this.title_nofile[this.initial_current.Language];
    }

    const reader = new FileReader();
    reader.onload = (e: any) => {
      // Set image src
      this.base64Image = e.target.result;
    }
    reader.readAsDataURL(event.target.files[0])
    this.fileToUpload = event.target.files.item(0);

  }



  // onselectFile(event: any) {
  //   const reader = new FileReader();
  //   reader.onload = (e: any) => {
  //     // Set image src
  //     this.base64Image = e.target.result;
  //   }
  //   reader.readAsDataURL(event.target.files[0])
  //   // reader.readAsDataURL(event.files[0]);
  //   // // console.log(event.target.files.item(0))
  //   this.fileToUpload = event.target.files.item(0);

  // }



  uploadImages() {

    const filename = "XXX";
    const filetype = "jpg";

    this.employeeService.uploadImages(this.fileToUpload, this.initial_current.CompCode, this.selectedEmployee.worker_code).then((res) => {
      let resultJSON = JSON.parse(res);
      if (resultJSON.result == "1") {

        setTimeout(() => {
          this.doLoadImage();
        }, 500);

      }
    });

  }

  //get location name
  doGetLocationDetail(locationCode: string): any {
    for (let i = 0; i < this.locationList.length; i++) {
      if (this.locationList[i].location_code == locationCode) {
        if (this.initial_current.Language == "TH") {
          return this.locationList[i].location_name_th;
        }
        else {
          return this.locationList[i].location_name_en;
        }
      }
    }
  }
  //get branch name
  doGetBranchDetail(branchCode: string): any {
    for (let i = 0; i < this.combranchList.length; i++) {
      if (this.combranchList[i].combranch_code == branchCode) {
        if (this.initial_current.Language == "TH") {
          return this.combranchList[i].combranch_name_th;
        }
        else {
          return this.combranchList[i].combranch_name_en;
        }
      }
    }
  }
  //get address name
  doGetAddtypeDetail(AddtypeCode: string): any {
    for (let i = 0; i < this.addresstypeList.length; i++) {
      if (this.addresstypeList[i].addresstype_code == AddtypeCode) {
        if (this.initial_current.Language == "TH") {
          return this.addresstypeList[i].addresstype_name_th;
        }
        else {
          return this.addresstypeList[i].addresstype_name_en;
        }
      }
    }
  }
  //get card name
  doGetCardDetail(CardCode: string): any {
    for (let i = 0; i < this.cardtypeList.length; i++) {
      if (this.cardtypeList[i].cardtype_code == CardCode) {
        if (this.initial_current.Language == "TH") {
          return this.cardtypeList[i].cardtype_name_th;
        }
        else {
          return this.cardtypeList[i].cardtype_name_en;
        }
      }
    }
  }
  //get bank name
  doGetBankDetail(BankCode: string): any {
    for (let i = 0; i < this.bankList.length; i++) {
      if (this.bankList[i].bank_code == BankCode) {
        if (this.initial_current.Language == "TH") {
          return this.bankList[i].bank_name_th;
        }
        else {
          return this.bankList[i].bank_name_en;
        }
      }
    }
  }

  //get family name
  doGetFamilyDetail(FamtypeCode: string): any {
    for (let i = 0; i < this.familytypeList.length; i++) {
      if (this.familytypeList[i].family_code == FamtypeCode) {
        if (this.initial_current.Language == "TH") {
          return this.familytypeList[i].family_name_th;
        }
        else {
          return this.familytypeList[i].family_name_en;
        }
      }
    }
  }

  //get hopital name
  doGetHospitalDetail(HospitalCode: string): any {
    for (let i = 0; i < this.hospitalList.length; i++) {
      if (this.hospitalList[i].hospital_code == HospitalCode) {
        if (this.initial_current.Language == "TH") {
          return this.hospitalList[i].hospital_name_th;
        }
        else {
          return this.hospitalList[i].hospital_name_en;
        }
      }
    }
  }
  //get hopital status
  doGetActiveStatus(status: Boolean) {
    let statusname = ""
    if(status){
      if (this.initial_current.Language == "TH") {
        statusname = "ใช้งาน"
      }
      else {
        statusname = "Active"
      }
    }else{
      if (this.initial_current.Language == "TH") {
        statusname = "ไม่ใช้งาน"
      }
      else {
        statusname = "Inactive"
      }
    }
    return statusname;
  }
  

  //get dep1 name
  doGetDepL1Detail(depCode: string): any {
    for (let i = 0; i < this.deplevel1List.length; i++) {
      if (this.deplevel1List[i].dep_code == depCode) {
        if (this.initial_current.Language == "TH") {
          return this.deplevel1List[i].dep_name_th;
        }
        else {
          return this.deplevel1List[i].dep_name_en;
        }
      }
    }
  }
  //get dep2 name
  doGetDepL2Detail(depCode: string): any {
    for (let i = 0; i < this.deplevel2List.length; i++) {
      if (this.deplevel2List[i].dep_code == depCode) {
        if (this.initial_current.Language == "TH") {
          return this.deplevel2List[i].dep_name_th;
        }
        else {
          return this.deplevel2List[i].dep_name_en;
        }
      }
    }
  }

  //get position name
  doGetPositionDetail(PositionCode: string): any {
    for (let i = 0; i < this.positionList.length; i++) {
      if (this.positionList[i].position_code == PositionCode) {
        if (this.initial_current.Language == "TH") {
          return this.positionList[i].position_name_th;
        }
        else {
          return this.positionList[i].position_name_en;
        }
      }
    }
  }

  //get group name
  doGetGroupDetail(GroupCode: string): any {
    for (let i = 0; i < this.groupList.length; i++) {
      if (this.groupList[i].group_code == GroupCode) {
        if (this.initial_current.Language == "TH") {
          return this.groupList[i].group_name_th;
        }
        else {
          return this.groupList[i].group_name_en;
        }
      }
    }
  }
  //get Institute name
  doGetInstituteDetail(InstituteCode: string): any {
    for (let i = 0; i < this.instituteList.length; i++) {
      if (this.instituteList[i].institute_code == InstituteCode) {
        if (this.initial_current.Language == "TH") {
          return this.instituteList[i].institute_name_th;
        }
        else {
          return this.instituteList[i].institute_name_en;
        }
      }
    }
  }
  //get faculty name
  doGetFacultyDetail(FacultyCode: string): any {
    for (let i = 0; i < this.facultyList.length; i++) {
      if (this.facultyList[i].faculty_code == FacultyCode) {
        if (this.initial_current.Language == "TH") {
          return this.facultyList[i].faculty_name_th;
        }
        else {
          return this.facultyList[i].faculty_name_en;
        }
      }
    }
  }
  //get major name
  doGetMajorDetail(MajorCode: string): any {
    for (let i = 0; i < this.majorList.length; i++) {
      if (this.majorList[i].major_code == MajorCode) {
        if (this.initial_current.Language == "TH") {
          return this.majorList[i].major_name_th;
        }
        else {
          return this.majorList[i].major_name_en;
        }
      }
    }
  }
  //get qualification name
  doGetQualificationDetail(QualificationCode: string): any {
    for (let i = 0; i < this.qualificationList.length; i++) {
      if (this.qualificationList[i].qualification_code == QualificationCode) {
        if (this.initial_current.Language == "TH") {
          return this.qualificationList[i].qualification_name_th;
        }
        else {
          return this.qualificationList[i].qualification_name_en;
        }
      }
    }
  }
  //get supply name
  doGetSupplyDetail(SupplyCode: string): any {
    for (let i = 0; i < this.supplyList.length; i++) {
      if (this.supplyList[i].supply_code == SupplyCode) {
        if (this.initial_current.Language == "TH") {
          return this.supplyList[i].supply_name_th;
        }
        else {
          return this.supplyList[i].supply_name_en;
        }
      }
    }
  }

  //get unifrom name
  doGetUniformDetail(UniformCode: string): any {
    for (let i = 0; i < this.uniformList.length; i++) {
      if (this.uniformList[i].prouniform_code == UniformCode) {
        if (this.initial_current.Language == "TH") {
          return this.uniformList[i].prouniform_name_th;
        }
        else {
          return this.uniformList[i].prouniform_name_en;
        }
      }
    }
  }
  //get course name
  doGetCourseDetail(CourseCode: string): any {
    for (let i = 0; i < this.courseList.length; i++) {
      if (this.courseList[i].course_code == CourseCode) {
        if (this.initial_current.Language == "TH") {
          return this.courseList[i].course_name_th;
        }
        else {
          return this.courseList[i].course_name_en;
        }
      }
    }
  }
  //get item name
  doGetitemDetail(itemCode: string): any {
    for (let i = 0; i < this.ItemList.length; i++) {
      if (this.ItemList[i].item_code == itemCode) {
        if (this.initial_current.Language == "TH") {
          return this.ItemList[i].item_name_th;
        }
        else {
          return this.ItemList[i].item_name_en;
        }
      }
    }
  }
  //get provident name
  doGetProvidentDetail(ProvidentCode: string): any {
    for (let i = 0; i < this.providentList.length; i++) {
      if (this.providentList[i].provident_code == ProvidentCode) {
        if (this.initial_current.Language == "TH") {
          return this.providentList[i].provident_name_th;
        }
        else {
          return this.providentList[i].provident_name_en;
        }
      }
    }
  }
  ratecom: boolean = true;
  rateemp: boolean = true;
  getProvidentworkage(ProvidentCode: string) {
    if (this.selectedEmpprovident.empprovident_type == 'A') {
      for (let i = 0; i < this.providentList.length; i++) {
        if (this.providentList[i].provident_code == ProvidentCode) {
          this.providentList[i].providentWorkage_data.forEach((ele: ProvidentWorkageModel) => {
            this.selectedEmpprovident.rate_com = ele.rate_com;
            this.selectedEmpprovident.rate_emp = ele.rate_emp;
          })
        }
      }
    } else if (this.selectedEmpprovident.empprovident_type == 'C') {
      for (let i = 0; i < this.providentList.length; i++) {
        if (this.providentList[i].provident_code == ProvidentCode) {
          this.providentList[i].providentWorkage_data.forEach((ele: ProvidentWorkageModel) => {
            this.selectedEmpprovident.rate_com = ele.rate_com;
          })
        }
      }
    }
  }
  changePFType() {
    if (this.selectedEmpprovident.empprovident_type == 'A') {
      this.ratecom = true; this.rateemp = true;
    } else if (this.selectedEmpprovident.empprovident_type == 'C') {
      this.ratecom = true; this.rateemp = false;
    } else {
      this.ratecom = false; this.rateemp = false;
    }
  }
  //get reduce name
  doGetReduceDetail(ReduceCode: string): any {
    for (let i = 0; i < this.reduceList.length; i++) {
      if (this.reduceList[i].reduce_code == ReduceCode) {
        if (this.initial_current.Language == "TH") {
          return this.reduceList[i].reduce_name_th;
        }
        else {
          return this.reduceList[i].reduce_name_en;
        }
      }
    }
  }
  //get province name
  doGetProvinceDetail(ProvinceCode: string): any {
    for (let i = 0; i < this.provinceList.length; i++) {
      if (this.provinceList[i].province_code == ProvinceCode) {
        if (this.initial_current.Language == "TH") {
          return this.provinceList[i].province_name_th;
        }
        else {
          return this.provinceList[i].province_name_en;
        }
      }
    }
  }
  //get foreigner type
  doGetForeignertypeDetail(Foreignertype: string): any {
    for (let i = 0; i < this.foreignerType.length; i++) {
      if (this.foreignerType[i].code == Foreignertype) {
        if (this.initial_current.Language == "TH") {
          return this.foreignerType[i].name_th;
        }
        else {
          return this.foreignerType[i].name_en;
        }
      }
    }
  }

  //get pf type
  doGetPFtypeDetail(pftype: string): any {
    for (let i = 0; i < this.pfType.length; i++) {
      if (this.pfType[i].code == pftype) {
        if (this.initial_current.Language == "TH") {
          return this.pfType[i].name_th;
        }
        else {
          return this.pfType[i].name_en;
        }
      }
    }
  }

  //get reason 
  doGetreasonSalary(reason: string): any {
    for (let i = 0; i < this.reason_salary.length; i++) {
      if (this.reason_salary[i].reason_code == reason) {
        if (this.initial_current.Language == "TH") {
          return this.reason_salary[i].reason_name_th;
        }
        else {
          return this.reason_salary[i].reason_name_en;
        }
      }
    }
  }
  doGetreasonResign(reason: string): any {
    for (let i = 0; i < this.reason_resign.length; i++) {
      if (this.reason_resign[i].reason_code == reason) {
        if (this.initial_current.Language == "TH") {
          return this.reason_resign[i].reason_name_th;
        }
        else {
          return this.reason_resign[i].reason_name_en;
        }
      }
    }
  }
  doGetreasonPos(reason: string): any {
    for (let i = 0; i < this.reason_pos.length; i++) {
      if (this.reason_pos[i].reason_code == reason) {
        if (this.initial_current.Language == "TH") {
          return this.reason_pos[i].reason_name_th;
        }
        else {
          return this.reason_pos[i].reason_name_en;
        }
      }
    }
  }

  doGetforetype(Code: string): any {
    for (let i = 0; i < this.foretype_List.length; i++) {
      if (this.foretype_List[i].foretype_code == Code) {
        if (this.initial_current.Language == "TH") {
          return this.foretype_List[i].foretype_name_th;
        }
        else {
          return this.foretype_List[i].foretype_name_en;
        }
      }
    }
  }
  //suggest
  doGetReferPo(Code: string): any {
    for (let i = 0; i < this.referral_List.length; i++) {
      if (this.referral_List[i].referral_code == Code) {
        if (this.initial_current.Language == "TH") {
          return this.referral_List[i].referral_name_th;
        }
        else {
          return this.referral_List[i].referral_name_en;
        }
      }
    }
  }
  doGetWorkerName(Code: string): any {
    for (let i = 0; i < this.suggest_List.length; i++) {
      if (this.suggest_List[i].worker_code == Code) {
        if (this.initial_current.Language == "TH") {
          return this.suggest_List[i].worker_fname_th + " " + this.suggest_List[i].worker_lname_th;
        }
        else {
          return this.suggest_List[i].worker_fname_en + " " + this.suggest_List[i].worker_lname_en;
        }
      }
    }
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
    this.new_group = false; this.edit_empgroup = false;
    this.new_education = false; this.edit_empeducation = false;
    this.new_supply = false; this.edit_empsupply = false;
    this.new_uniform = false; this.edit_empuniform = false;
    this.new_suggest = false; this.edit_empsuggest = false;
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

  //-- Aeb add 10/07/2023
  benefit_list: any[] = [];

  doLoadItemsList() {
    var tmp = new ItemsModel();
    this.itemService.item_get(tmp).then(async (res) => {
      await res.forEach((element: ItemsModel) => {

        this.doAddOption(this.benefit_list, element)
      });
    });

  }

  doAddOption(list: any[], element: ItemsModel) {
    list.push(
      {
        name: this.initial_current.Language == "EN" ? element.item_name_en : element.item_name_th,
        code: element.item_code
      }
    )
  }

  // myURL: any
  // onURLinserted() {
  //   this.getImage(this.myURL).subscribe(data => {
  //     this.createImageFromBlob(data);
  //   }, error => {
  //     console.log("Error occured", error);
  //   });
  // }

  // getImage(imageUrl: string): Observable<File> {
  //   let headers = { responseType: ResponseContentType.Blob }
  //   return this.http
  //     .get(imageUrl)
  //     .pipe(map((res:any) => res.blob()))
  //     // .map((res: Response) => res.blob());
  // }

  // createImageFromBlob(image: Blob) {
  //   let reader = new FileReader(); //you need file reader for read blob data to base64 image data.
  //   reader.addEventListener("load", () => {
  //     this.base64Image = reader.result; // here is the result you got from reader
  //   }, false);

  //   if (image) {
  //     reader.readAsDataURL(image);
  //   }
  // }


  @ViewChild('tablelocation') dtemplocation: ElementRef | any = null;
  @ViewChild('tablebranch') dtempbranch: ElementRef | any = null;
  @ViewChild('tablesuggest') dtempsuggest: ElementRef | any = null;
  @ViewChild('tableaddress') dtempaddress: ElementRef | any = null;
  @ViewChild('tablecard') dtempcard: ElementRef | any = null;
  @ViewChild('tablebank') dtempbank: ElementRef | any = null;
  @ViewChild('tablefamily') dtempfamily: ElementRef | any = null;
  @ViewChild('tablehospital') dtemphospital: ElementRef | any = null;
  @ViewChild('tabledep') dtempdep: ElementRef | any = null;
  @ViewChild('tableposition') dtempposition: ElementRef | any = null;
  @ViewChild('tablegroup') dtempgroup: ElementRef | any = null;
  @ViewChild('tableeducation') dtempeducation: ElementRef | any = null;
  @ViewChild('tablesupply') dtempsupply: ElementRef | any = null;
  @ViewChild('tableuniform') dtempuniform: ElementRef | any = null;
  @ViewChild('tabletraining') dtemptraining: ElementRef | any = null;
  @ViewChild('tableappraisal') dtempappraisal: ElementRef | any = null;
  @ViewChild('tablecriminal') dtempcriminal: ElementRef | any = null;
  @ViewChild('tablesalary') dtempsalary: ElementRef | any = null;
  @ViewChild('tablebenefit') dtempbenefit: ElementRef | any = null;
  @ViewChild('tableprovident') dtempprovident: ElementRef | any = null;
  @ViewChild('tablereduce') dtempreduce: ElementRef | any = null;
  @ViewChild('tableforeigner') dtempforeigner: ElementRef | any = null;
  @ViewChild('tableexperience') dtempexperience: ElementRef | any = null;


  exportAsExcel(table: ElementRef, name: string) {
    // console.log(this.selectedEmpLocation)
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(table.nativeElement);//converts a DOM TABLE element to a worksheet

    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    XLSX.writeFile(wb, 'Export_' + name + '.xlsx');

  }


  hasAccessMenu(accessCode: string): boolean {
    return this.accessData.accessmenu_data.some(item => item.accessmenu_code === accessCode);
  }

  age: string = "";
  CalculateAge() {
    if (this.selectedEmployee.worker_birthdate) {
      let timeDiff = Math.abs(Date.now() - this.selectedEmployee.worker_birthdate.getTime());
      let agediff = Math.floor((timeDiff / (1000 * 3600 * 24)) / 365)
      if (this.initial_current.Language == 'TH') {
        this.age = agediff + " ปี"
      } else {
        this.age = agediff + " Year"
      }
    }
  }
  // CalculatePFAge(date: Date) {
  //   return "";
  // }

  ///ทำตรงนี้ 06/10/2023
  PFAge: string = "";
  async CalculatePFAge(date: Date): Promise<string> {
    const incrementDate = (inputDate: Date) => {
      const newDate = new Date(inputDate);
      newDate.setDate(newDate.getDate() + 1);
      return newDate;
    }

    if (this.selectedEmpprovident.empprovident_start) {
      let currentDate = new Date(this.selectedEmpprovident.empprovident_start);
      let daysCount = 0;
      while (true) {
        daysCount++;
        currentDate = incrementDate(currentDate);

        if (currentDate > new Date()) {
          return `${daysCount} day`;
        }
      }
    }

    return '';
  }


  doRecordEmpBlacklist() {
    if (this.selectedEmployee.worker_blackliststatus) {
      var tmp = new BlacklistModel();
      tmp.company_code = this.selectedEmployee.company_code || this.initial_current.CompCode
      tmp.worker_code = this.selectedEmployee.worker_code
      tmp.card_no = this.selectedEmployee.worker_cardno
      tmp.blacklist_fname_th = this.selectedEmployee.worker_fname_th
      tmp.blacklist_lname_th = this.selectedEmployee.worker_lname_th
      tmp.blacklist_fname_en = this.selectedEmployee.worker_fname_en
      tmp.blacklist_lname_en = this.selectedEmployee.worker_lname_en
      tmp.reason_code = this.selectedEmployee.worker_blacklistreason
      tmp.blacklist_note = this.selectedEmployee.worker_blacklistnote
      this.blacklistService.blacklist_record(tmp).then((res) => {
        let result = JSON.parse(res);
        if (result.success) {
        }
        else {
        }
      })
    } else {
      var tmp = new BlacklistModel();
      tmp.company_code = this.selectedEmployee.company_code || this.initial_current.CompCode
      tmp.card_no = this.selectedEmployee.worker_cardno
      tmp.worker_code = this.selectedEmployee.worker_code
      this.blacklistService.blacklist_delete(tmp).then((res) => {

      })
    }
  }

  selectedFileName: string = '';
  displayUpload: boolean = false;
  Uploadfile: boolean = false;
  fileDocToUpload: File | any = null;
  empdocatt: EmpMTDocattModel[] = [];
  selecteddocatt: EmpMTDocattModel = new EmpMTDocattModel();
  @ViewChild('fileUploader') fileUploader: ElementRef | any = null;

  handleFileDoc(file: FileList) {
    this.fileDocToUpload = file.item(0);
    if (this.fileDocToUpload) {
      this.selectedFileName = this.fileDocToUpload.name;
    } else {
      this.selectedFileName = this.title_nofile[this.initial_current.Language];
    }
  }
  doGetFile() {
    var tmp = new EmpMTDocattModel();
    tmp.company_code = this.initial_current.CompCode
    tmp.worker_code = this.selectedEmployee.worker_code
    tmp.job_type = ""
    this.employeeService.getemp_filelist(tmp).then((res) => {
      this.empdocatt = res;
    })
  }
  onRowSelectfile(event: Event) {
  }
  async doGetReqAttfile(file_path: string, type: string) {
    this.employeeService.get_file(file_path).then((res) => {
      var url = window.URL.createObjectURL(new Blob([new Uint8Array(res)], { type: type }));
      window.open(url);
      this.selecteddocatt = new EmpMTDocattModel();
    })
  }
  viewAttfile(data: EmpMTDocattModel) {
    this.doGetReqAttfile(data.document_path, data.document_type)
  }
  doGetfiletype(Code: string): any {
    for (let i = 0; i < this.docType.length; i++) {
      if (this.docType[i].code == Code) {
        if (this.initial_current.Language == "TH") {
          return this.docType[i].name_th;
        }
        else {
          return this.docType[i].name_en;
        }
      }
    }
  }
  doUploadFileAll() {
    const filename = "EMP_DOC" + this.datePipe.transform(new Date(), 'yyyyMMddHHmmss');
    const filetype = this.fileDocToUpload.name.split(".")[1];
    this.employeeService.file_attach(this.fileDocToUpload, filename, filetype).then((res) => {
      this.empdocatt = [];
      if (res.success) {
        this.empdocatt = this.empdocatt.concat({
          company_code: this.selectedEmployee.company_code || this.initial_current.CompCode,
          worker_code: this.selectedEmployee.worker_code,
          document_id: 0,
          job_type: this.selectedEmployee.selected_Doctype,
          job_id: this.selectedEmployee.worker_id.toString(),
          document_name: filename + "." + filetype,
          document_type: this.fileDocToUpload.type,
          document_path: res.message,
          created_by: this.initial_current.Username,
          created_date: new Date().toISOString()
        })
        this.Uploadfile = false;
        this.messageService.add({ severity: 'success', summary: 'Success', detail: res.message });
      } else {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: res.message });
      }
      this.fileDocToUpload = null;
    })
  }
  Uploadfiledoc() {
    if (this.fileDocToUpload) {
      this.confirmationService.confirm({
        message: this.title_confirm + this.fileDocToUpload.name,
        header: this.title_import,
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
          this.fileUploader.nativeElement.value = null;
          this.Uploadfile = false;
          this.doUploadFileAll();
        },
        reject: () => {
          this.Uploadfile = false;
        }
      });
    } else {
      this.messageService.add({ severity: 'warn', summary: 'File', detail: "Please choose a file." });
    }
  }
  DeleteFileDoc(data: EmpMTDocattModel) {
    this.confirmationService.confirm({
      message: this.title_confirm_delete + data.document_name,
      header: this.title_delete,
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        if (data.document_id) {
          this.employeeService.delete_file(data).then((res) => {
            if (res.success) {
              this.messageService.add({ severity: 'success', summary: 'Success', detail: res.message });
            } else {
              this.messageService.add({ severity: 'error', summary: 'Error', detail: res.message });
            }
          })
        } else {
          this.empdocatt = this.empdocatt.filter((item) => {
            return item !== data;
          });
        }
        this.employeeService.deletefilepath_file(data.document_path).then((res) => {
          if (res.success) {
            this.messageService.add({ severity: 'success', summary: 'Success', detail: res.message });
            this.empdocatt = this.empdocatt.filter((item) => {
              return item !== data;
            });
          } else {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: res.message });
          }
        })
      },
      reject: () => {

      }
    });
  }
  record_filedoc() {
    if (this.empdocatt.length == 0) {
      return;
    }
    this.employeeService.record_empfile(this.selectedEmployee.worker_code, this.empdocatt, this.selectedEmployee.selected_Doctype).then((res) => {
      let result = JSON.parse(res);
      if (result.success) {
      } else {
      }
    })
  }

  paytranTaxTotal: number = 0;
  paytranAccList: PaytranAccModel[] = [];
  paytranDetailAcc: PaytranAccModel = new PaytranAccModel();
  //Accumalate
  doLoadPaytranAcc(paydate: Date) {
    this.paytranTaxTotal = 0;
    this.paytranDetailAcc = new PaytranAccModel();
    this.paytranAccList = [];

    this.paytranService.paytranacc_get(this.initial_current.CompCode, this.selectedEmployee.worker_code, this.initial_current.PR_Year, paydate).then((res) => {
      this.paytranAccList = res;
    })
  }
  periods_list: PeriodsModels[] = [];
  periods_select: PeriodsModels = new PeriodsModels();
  doPeriod() {
    this.periods_list = [];
    var tmp = new PeriodsModels();
    tmp.year_code = this.initial_current.PR_Year;
    tmp.company_code = this.initial_current.CompCode;
    tmp.emptype_code = this.initial_current.EmpType;
    tmp.year_code = this.initial_current.PR_Year;
    this.periodsService.period_get(tmp).then(async (res) => {
      res.forEach((obj: PeriodsModels) => {
        obj.period_name_en = this.datePipe.transform(obj.period_payment, 'dd MMM yyyy') + "(" + this.datePipe.transform(obj.period_from, 'dd MMM yyyy') + " - " + this.datePipe.transform(obj.period_to, 'dd MMM yyyy') + ")";
        obj.period_name_th = this.datePipe.transform(obj.period_payment, 'dd MMM yyyy', "", 'th-TH') + "(" + this.datePipe.transform(obj.period_from, 'dd MMM yyyy', "", 'th-TH') + " - " + this.datePipe.transform(obj.period_to, 'dd MMM yyyy', "", 'th-TH') + ")"
      });
      this.periods_list = await res;
      this.periods_select = await res[0]
    });
  }
  selectperiod() {
    this.doLoadPaytranAcc(this.periods_select.period_payment);
  }

  calculateEndDate() {
    if (this.selectedEmployee.worker_probationdate && this.selectedEmployee.worker_probationday) {
      const start = new Date(this.selectedEmployee.worker_probationdate);
      const end = new Date(start);
      end.setDate(start.getDate() + this.selectedEmployee.worker_probationday);
      this.selectedEmployee.worker_probationenddate = end;
    }
  }

  //resign
  empresignList: EmployeeresignModel[] = [];
  selectedEmpresign: EmployeeresignModel = new EmployeeresignModel();
  doLoadEmpresignList() {
    this.empresignService.empresign_get(this.initial_current.CompCode, this.emp_code, this.selectedEmployee.worker_cardno).then(async (res) => {
      await res.forEach((element: EmployeeresignModel) => {
        element.empresign_date = new Date(element.empresign_date)
      })
      this.empresignList = res;
      if (this.empresignList.length > 0) {
        this.selectedEmpresign = this.empresignList[0];
      }
    })
  }
  doRecordEmpResign() {
    if (this.selectedEmployee.worker_resignstatus) {
      var tmp = new EmployeeresignModel();
      tmp.company_code = this.selectedEmployee.company_code || this.initial_current.CompCode
      tmp.worker_code = this.selectedEmployee.worker_code
      tmp.card_no = this.selectedEmployee.worker_cardno
      tmp.empresign_date = this.selectedEmployee.worker_resigndate
      tmp.reason_code = this.selectedEmployee.worker_resignreason
      this.empresignService.empresign_record(tmp).then((res) => {
        let result = JSON.parse(res);
        if (result.success) {
        }
        else {
        }
      })
    } else {
    }
  }


  //check resign
  empResignAll: EmployeeresignModel[] = [];
  doLoadResignall() {
    this.empresignService.empresign_get(this.initial_current.CompCode, '', '').then((res) => {
      this.empResignAll = res;
    })
  }
  checkResign(Code: string): any {
    for (let i = 0; i < this.empResignAll.length; i++) {
      if (this.empResignAll[i].card_no == Code) {
        return this.empResignAll[i].card_no;
      }
    }
  }

  //check bank
  empbankAll: EmpbankModel[] = [];
  doLoadEmpbankAll() {
    this.empdetailService.getworker_bank(this.initial_current.CompCode, '').then((res) => {
      this.empbankAll = res;
    })
  }
  checkbankaccount(Code: string | undefined): any {
    for (let i = 0; i < this.empbankAll.length; i++) {
      if (this.empbankAll[i].bank_account == Code) {
        return this.empbankAll[i].bank_account;
      }
    }
  }

  getFullstatus(status: string) {
    let statusfull = ""
    switch (status) {
      case "Y":
        if(this.initial_current.Language == "TH"){
          statusfull = 'ผ่าน'
        }else{
          statusfull = 'Pass'
        }
        break;
      case "N":
        if(this.initial_current.Language == "TH"){
          statusfull = 'ไม่ผ่าน'
        }else{
          statusfull = 'Not Pass'
        }
        break;
      
    }
    return statusfull;
  }

  getPaycondition(ConP:string): any{
    for (let i = 0; i < this.conPay.length; i++) {
      if (this.conPay[i].value == ConP) {
        if (this.initial_current.Language == "TH") {
          return this.conPay[i].name_th;
        }
        else {
          return this.conPay[i].name_en;
        }
      }
    }
  }

  getBenefitBreakName(){
    let statusname = ""
    if(status){
      if (this.initial_current.Language == "TH") {
        statusname = "พักการจ่าย"
      }
      else {
        statusname = "Active"
      }
    }else{
      if (this.initial_current.Language == "TH") {
        statusname = "ไม่พักการจ่าย"
      }
      else {
        statusname = "Inactive"
      }
    }
    return statusname;
  }
}

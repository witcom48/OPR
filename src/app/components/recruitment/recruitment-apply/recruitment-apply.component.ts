import { DatePipe } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
    ConfirmationService,
    MegaMenuItem,
    MenuItem,
    MessageService,
} from 'primeng/api';
import { AppConfig } from '../../../config/config';
import { InitialCurrent } from '../../../config/initial_current';

//import model
import { EmployeeModel } from '../../../models/employee/employee';
import { InitialModel } from '../../../models/employee/policy/initial';

import { EmpbankModel } from '../../../models/employee/manage/bank';
import { EmpFamilyModel } from '../../../models/employee/manage/family';
import { EmpHospitalModel } from '../../../models/employee/manage/hospital';
import { EmpDepModel } from '../../../models/employee/manage/dep';
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
import { PositionService } from 'src/app/services/emp/policy/position.service';
import { EmpLocationModel } from 'src/app/models/employee/manage/emplocation';
import { EmpBranchModel } from 'src/app/models/employee/manage/empbranch';
import { ApplyworkService } from 'src/app/services/recruitment/applywork.service';
import { ApplyworkDetailService } from 'src/app/services/recruitment/applywork-detail.service';
import { ApplyworkModel } from 'src/app/models/recruitment/applywork';
import { BloodtypeModel } from 'src/app/models/system/policy/bloodtype';
import { ReligionService } from 'src/app/services/system/policy/religion.service';
import { BloodtypeService } from 'src/app/services/system/policy/bloodtype.service';
import { ReqcardModel } from 'src/app/models/recruitment/applycard';
import { ReqaddressModel } from 'src/app/models/recruitment/applyaddress';
import { ReqForeignerModel } from 'src/app/models/recruitment/applyforeigner';
import { ReqEducationModel } from 'src/app/models/recruitment/applyeducation';
import { ReqTrainingModel } from 'src/app/models/recruitment/applytraining';
import { ReligionModel } from 'src/app/models/system/policy/religion';
import { CardtypeModel } from 'src/app/models/system/policy/cardtype';
import { CardtypeService } from 'src/app/services/system/policy/cardtype.service';
import { AddresstypeService } from 'src/app/services/system/policy/addresstype.service';
import { AddresstypeModel } from 'src/app/models/system/policy/addresstype';
import { ProvinceModel } from 'src/app/models/system/policy/province';
import { ProvinceService } from 'src/app/services/system/policy/province.service';
import { InstituteModel } from 'src/app/models/system/policy/institute';
import { InstituteService } from 'src/app/services/system/policy/institute.service';
import { FacultyModel } from 'src/app/models/system/policy/faculty';
import { FacultyService } from 'src/app/services/system/policy/faculty.service';
import { MajorModel } from 'src/app/models/system/policy/major';
import { MajorService } from 'src/app/services/system/policy/major.service';
import { QualificationModel } from 'src/app/models/system/policy/qualification';
import { QualificationService } from 'src/app/services/system/policy/qualification.service';
import { CourseModel } from 'src/app/models/system/policy/course';
import { CourseService } from 'src/app/services/system/policy/course.service';
import { EmpaddressModel } from 'src/app/models/employee/manage/address';
import { EmpcardModel } from 'src/app/models/employee/manage/card';
import { EmpForeignerModel } from 'src/app/models/employee/manage/foreigner';
import { EmpEducationModel } from 'src/app/models/employee/manage/education';
import { EmpTrainingModel } from 'src/app/models/employee/manage/training';
import { EmpSuggestModel } from 'src/app/models/employee/manage/empsuggest';
import { DomSanitizer } from '@angular/platform-browser';
import { ApplyMTDocattModel } from 'src/app/models/recruitment/applyMTDocatt';
import { ProjectService } from 'src/app/services/project/project.service';
import { EmpPositionModel } from 'src/app/models/employee/manage/position';
import { ReqProjectModel } from 'src/app/models/recruitment/reqproject';
import { ProjectModel } from 'src/app/models/project/project';
import { PositionModel } from 'src/app/models/employee/policy/position';
import { EmptypeModel } from 'src/app/models/employee/policy/emptype';
import { RequestService } from 'src/app/services/recruitment/request.service';
import { RequestModel } from 'src/app/models/recruitment/request';
import { EmpstatusModel } from 'src/app/models/employee/policy/empstatus';
import { ItemService } from 'src/app/services/payroll/item.service';
import { ItemsModel } from 'src/app/models/payroll/items';

interface Taxmethod {
    name_th: string;
    name_en: string;
    code: string;
}
interface ConPay {
    name_th: string;
    name_en: string;
    value: string;
}
interface Ctype {
    name_th: string;
    name_en: string;
    code: string;
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
interface AttachType {
    name_th: string,
    name_en: string,
    code: string
}

@Component({
    selector: 'app-recruitment-apply',
    templateUrl: './recruitment-apply.component.html',
    styleUrls: ['./recruitment-apply.component.scss'],
})
export class RecruitmentApplyComponent implements OnInit {
    @ViewChild('fileUploader') fileUploader: ElementRef | any = null;
    req_code: string = '';

    emp_code: string = '';
    manage_title: string = '';
    gender: any;
    toolbar_menu: MenuItem[] = [];
    items: MenuItem[] = [];
    items_tab: MenuItem[] = [];

    reqworkerList: EmployeeModel[] = [];
    selectedReqworker: EmployeeModel = new EmployeeModel();

    applywork_list: ApplyworkModel[] = [];
    selectedApplywork: ApplyworkModel = new ApplyworkModel();

    edit_applywork: boolean = false;
    new_applywork: boolean = false;

    resign_emp: boolean = false;

    taxM: Taxmethod[] = [];
    conPay: ConPay[] = [];
    cardTypelist: Ctype[] = [];

    militarystatus: Milit[] = [];

    nationality: Nation[] = [];

    attachType: AttachType[] = [];


    //menu empsuggest
    menu_reqsuggest: MenuItem[] = [];
    edit_reqsuggest: boolean = false;
    new_reqsuggest: boolean = false;
    ///////////////////////////////////menu reqaddress
    menu_reqaddress: MenuItem[] = [];
    edit_reqaddress: boolean = false;
    new_reqaddress: boolean = false;
    ///////////////////////////////////menu reqcard
    menu_reqcard: MenuItem[] = [];
    edit_reqcard: boolean = false;
    new_card: boolean = false;
    ///////////////////////////////////menu reqforeigner
    menu_reqforeigner: MenuItem[] = [];
    edit_reqforeigner: boolean = false;
    new_foreigner: boolean = false;
    /////////////////////////////////////menu reqeducation
    menu_reqeducation: MenuItem[] = [];
    edit_reqeducation: boolean = false;
    new_education: boolean = false;
    ///////////////////////////////////menu reqtraining
    menu_reqtraining: MenuItem[] = [];
    edit_reqtraining: boolean = false;
    new_training: boolean = false;
    ///////////////////////////////////menu reqassessment
    menu_reqassessment: MenuItem[] = [];
    edit_reqassessment: boolean = false;
    new_assessment: boolean = false;
    ///////////////////////////////////menu reqcriminal
    menu_reqcriminal: MenuItem[] = [];
    edit_reqcriminal: boolean = false;
    new_criminal: boolean = false;
    /////////////////
    items_attfileApp: MenuItem[] = [];
    items_attfileID: MenuItem[] = [];
    items_attfileHos: MenuItem[] = [];
    items_attfilePho: MenuItem[] = [];
    items_attfilePDPA: MenuItem[] = [];
    items_attfileMCer: MenuItem[] = [];
    items_attfileOther: MenuItem[] = [];
    ///////////////////////////////////menu reqposition
    menu_reqposition: MenuItem[] = [];
    edit_reqposition: boolean = false;
    new_position: boolean = false;
    ///////////////////////////////////menu reqproject
    menu_reqproject: MenuItem[] = [];
    edit_reqproject: boolean = false;
    new_project: boolean = false;
    ///////////////////////////////////menu reqsalary
    menu_reqsalary: MenuItem[] = [];
    edit_reqsalary: boolean = false;
    new_salary: boolean = false;
    ///////////////////////////////////menu reqbenefit
    menu_reqbenefit: MenuItem[] = [];
    edit_reqbenefit: boolean = false;
    new_benefit: boolean = false;

    displayManage: boolean = false;

    constructor(
        private applyworkService: ApplyworkService,
        private reqdetailService: ApplyworkDetailService,

        private employeeService: EmployeeService,
        private router: Router,
        private route: ActivatedRoute,
        private messageService: MessageService,
        private confirmationService: ConfirmationService,
        private datePipe: DatePipe,
        private sanitizer: DomSanitizer,

        //service
        private initialService: InitialService,
        private religionService: ReligionService,
        private bloodtypeService: BloodtypeService,
        private cardtypeService: CardtypeService,
        private provinceService: ProvinceService,
        private instituteService: InstituteService,
        private facultyService: FacultyService,
        private majorService: MajorService,
        private qualificationService: QualificationService,
        private courseService: CourseService,
        private empstatusService: EmpstatusService,

        private addresstypeService: AddresstypeService,
        private positionService: PositionService,
        private projectService: ProjectService,
        private emptypeService: EmptypeService,
        private itemService: ItemService,

        private requestService: RequestService,
    ) {
        this.taxM = [
            { name_th: 'พนักงานจ่ายเอง', name_en: 'Employee Pay', code: '1' },
            {
                name_th: 'บริษัทออกให้ครั้งเดียว',
                name_en: 'Company Pay Once',
                code: '2',
            },
            {
                name_th: 'บริษัทออกให้ตลอด',
                name_en: 'Company Pay Every',
                code: '3',
            },
        ];
        this.conPay = [
            { name_th: 'ต่องวด', name_en: 'Per Period', value: 'F' },
            { name_th: 'งวดเว้นงวด', name_en: 'Switch Period', value: 'H' },
        ];
        this.cardTypelist = [
            {
                name_th: 'เลขที่ประจำตัวนิติบุคคล',
                name_en: '	Citizen ID',
                code: 'CID',
            },
            { name_th: 'บัตรประชาชน', name_en: 'National ID', code: 'NTID' },
            { name_th: 'ประกันสังคม', name_en: 'Social', code: 'SSO' },
        ];
        this.militarystatus = [
            { name_th: 'ไม่มี', name_en: 'No', code: '0' },
            { name_th: 'หนีทหาร', name_en: 'Disappear Soldier', code: 'A' },
            { name_th: 'ได้รับการยกเว้น', name_en: 'Exempted', code: 'E' },
            { name_th: 'ยังไม่เกณฑ์ทหาร', name_en: 'Non', code: 'N' },
            { name_th: 'ผ่านการเกณฑ์ทหารแล้ว', name_en: 'Pass military service', code: 'P' },
        ];
        this.nationality = [
            { name_th: 'ไทย', name_en: 'Thai', code: 'TH' },
            { name_th: 'ไต้หวัน', name_en: 'Taiwanese', code: 'TW' },
            { name_th: 'อเมริกัน', name_en: 'USA', code: 'US' },
            { name_th: 'สิงคโปร์', name_en: 'Singaporean', code: 'SG' },
            { name_th: 'ฟิลลิปปิน', name_en: 'Filipino', code: 'PH' },
            { name_th: 'มาเลเซีย', name_en: 'Malaysia', code: 'MY' },
            { name_th: 'จีน', name_en: 'Chinese', code: 'CH' },

        ];
        this.attachType = [
            { name_th: 'ใบสมัคร', name_en: 'Application', code: 'APCT' },
            { name_th: 'บัตรประชาชน', name_en: 'ID Card', code: 'IDCD' },
            { name_th: 'สำเนาทะเบียนบ้าน', name_en: 'House REGISTRATION', code: 'HRST' },
            { name_th: 'รูปถ่ายพนักงานที่ถือบัตรประชาชน', name_en: 'Photo with ID Card', code: 'PHID' },
            { name_th: 'PDPA', name_en: 'PDPA', code: 'PDPA' },
            { name_th: 'ใบรับรองแพทย์', name_en: 'Medical Certificate', code: 'MECR' },
            { name_th: 'อื่นๆ', name_en: 'Other', code: 'OTH' },
        ]
    }

    ngOnInit(): void {
        this.route.queryParams.subscribe((params) => {
            this.req_code = params['applycode'];
            // console.log(this.req_code);
        });

        this.doGetInitialCurrent();

        this.doLoadLanguage();
        // Dropdown
        this.doLoadInitialList();
        this.doLoadReligionList();
        this.doLoadBloodtypeList();
        this.doLoadaddresstypeList();
        this.doLoadcardtypeList();
        this.doLoadprovinceList();
        this.doLoadinstituteList();
        this.doLoadfacultyList();
        this.doLoadmajorList();
        this.doLoadqualificationList();
        this.doLoadcourseList();
        this.doLoadSuggestList();

        this.doloadpositionList();
        this.doLoadprojectList();

        this.doLoadEmptypeList();
        this.doLoadEmpstatusList();
        this.doLoadItemList();

        setTimeout(() => {
            this.doLoadMenu();
        }, 100);

        setTimeout(() => {
            if (this.req_code != '') {
                this.doLoadApplywork();
            } else {
                this.createReqID();
            }
        }, 400);
    }

    public initial_current: InitialCurrent = new InitialCurrent();
    doGetInitialCurrent() {
        this.initial_current = JSON.parse(
            localStorage.getItem(AppConfig.SESSIONInitial) || '{}'
        );
        if (!this.initial_current) {
            this.router.navigateByUrl('login');
        }
    }

    title_page: string = "Recruiment Management";
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
    title_hiredate: string = "Hire Date";
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

    title_finance: string = "Finance";
    title_taxmethod: string = "Tax Method";
    title_salary: string = "Income";
    title_benefit: string = "Other Income";
    title_fund: string = "Provident Fund";
    title_reduce: string = "Reduces";
    title_accumulate: string = "Accumalate";

    title_tranfer: string = "Tranfer record";

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
    title_bankname: string = "Bank Name";
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
    title_supplyename: string = "Supply";
    title_amount: string = "Amount";
    title_return: string = "Return";
    title_returndate: string = "Return Date";
    title_uniformissue: string = "Issue Date";
    title_uniformname: string = "Uniform";
    title_uniformprice: string = "Price";
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

    title_attfile: { [key: string]: string } = { EN: "Attach File", TH: "แนบไฟล์" };
    title_uploadno: { [key: string]: string } = { EN: "No.", TH: "ลำดับที่" };
    title_filename: { [key: string]: string } = { EN: "File Name", TH: "ชื่อไฟล์" };
    title_modified_by: { [key: string]: string } = { EN: "Modified by", TH: "ผู้ทำรายการ" };
    title_modified_date: { [key: string]: string } = { EN: "Modified date", TH: "วันที่ทำรายการ" };
    title_deleteupload: { [key: string]: string } = { EN: "Delete", TH: "ลบ" };
    title_age: { [key: string]: string } = { EN: "Age", TH: "อายุ" };

    title_contact: { [key: string]: string } = { EN: "Contact", TH: "ข้อมูลติดต่อ" };
    title_military: { [key: string]: string } = { EN: "Military Staus", TH: "สถานภาพทางทหาร" };
    title_cm: { [key: string]: string } = { EN: "c.m.", TH: "ซ.ม." };
    title_kg: { [key: string]: string } = { EN: "k.g.", TH: "ก.ก." };

    title_familyocc: { [key: string]: string } = { EN: "Occupation", TH: "อาชีพ" };
    title_familytel: { [key: string]: string } = { EN: "Tel.", TH: "เบอร์โทรฯ" };
    title_familyaddress: { [key: string]: string } = { EN: "Address", TH: "ที่อยู่" };
    title_familynameth: { [key: string]: string } = { EN: "Name(Eng.)", TH: "ชื่อ(อังกฤษ)" };
    title_familynameen: { [key: string]: string } = { EN: "Name(Thai)", TH: "ชื่อ(ไทย)" };

    title_blacklist: { [key: string]: string } = { EN: "Black List", TH: "เบล็คลิสต์" };
    title_history: { [key: string]: string } = { EN: "Working History", TH: "ประวัติการทำงาน" };

    title_salarytype: { [key: string]: string } = { EN: "Type", TH: "ประเภท" };
    title_item: { [key: string]: string } = { EN: "Income", TH: "เงินได้" };
    title_filetype: { [key: string]: string } = { EN: "Type", TH: "ประเภท" };
    //
    title_project: { [key: string]: string } = { EN: "Project", TH: "โครงการ" };
    title_nation: { [key: string]: string } = { EN: "Nationality", TH: "สัญชาติ" };
    //
    title_app: { [key: string]: string } = { EN: "Application", TH: "ใบสมัคร" };
    title_idcard: { [key: string]: string } = { EN: "ID Card", TH: "บัตรประชาชน" };
    title_house: { [key: string]: string } = { EN: "House REGISTRATION", TH: "สำเนาทะเบียนบ้าน" };
    title_photo: { [key: string]: string } = { EN: "Photo with ID Card", TH: "รูปถ่ายพนักงานที่ถือบัตรประชาชน" };
    title_pdpa: { [key: string]: string } = { EN: "PDPA", TH: "PDPA" };
    title_certi: { [key: string]: string } = { EN: "Medical Certificate", TH: "ใบรับรองแพทย์" };
    title_otherfile: { [key: string]: string } = { EN: "Other", TH: "อื่นๆ" };
    //
    title_viewfile: { [key: string]: string } = { EN: "View", TH: "ดูไฟล์" };
    //
    title_cardno: { [key: string]: string } = { EN: "Card No.", TH: "เลขบัตรประจำตัวประชาชน" };
    title_cardissue: { [key: string]: string } = { EN: "Issue Date", TH: "วันออกบัตร" };
    title_cardexpire: { [key: string]: string } = { EN: "Expire Date", TH: "วันหมดอายุ" };

    doLoadLanguage() {
        if (this.initial_current.Language == 'TH') {
            this.title_page = "ข้อมูลผู้สมัคร";
            this.title_new = "เพิ่ม";
            this.title_edit = "แก้ไข";
            this.title_delete = "ลบ";
            this.title_import = "นำเข้า";
            this.title_export = "โอนออก";
            this.title_save = "บันทึก";
            this.title_back = "ย้อนกลับ";
            this.title_summit = "บันทึก";
            this.title_cancel = "ยกเลิก";

            this.title_genaral = 'ข้อมูลทั่วไป';
            this.title_code = "รหัสผู้สมัคร";
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
            this.title_hiredate = 'วันที่พร้อมเริ่มงาน';
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

            this.title_finance = 'การเงิน';
            this.title_taxmethod = 'การคำนวนภาษี';
            this.title_salary = 'รายได้';
            this.title_benefit = 'รายได้อื่นๆ';
            this.title_fund = 'กองทุนสำรองเลี้ยงชีพ';
            this.title_reduce = 'ค่าลดหย่อน';
            this.title_accumulate = 'รายได้สะสม/ภาษีสะสม';

            this.title_tranfer = 'ประวัติการโอนย้ายหน่วยงาน';

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

            this.title_locationname = "สถานที่";
            this.title_start = "วันที่เริ่ม";
            this.title_end = "วันที่สิ้นสุด";
            this.title_description = "เพิ่มเติม";
            this.title_branchname = "สาขา";
            this.title_suggestname = "ผู้แนะนำ";
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
            this.title_facebook = "เฟสบุ๊ค";
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
            this.title_institute = "สถานบัน/สถานที่";
            this.title_faculty = "คณะ";
            this.title_major = "วิชาเอก";
            this.title_qualification = "วุฒิการศึกษา";
            this.title_gpa = "เกรดเฉลี่ย";
            this.title_educationstart = "วันที่เริ่ม";
            this.title_educationend = "วันที่จบ";
            this.title_supplyissue = "วันที่เบิก";
            this.title_supplyename = "อุปกรณื";
            this.title_amount = "จำนวน";
            this.title_return = "คืนอุปกรณ์";
            this.title_returndate = "วันที่คืนอุปกรณ์";
            this.title_uniformissue = "วันที่เบิก";
            this.title_uniformname = "เครื่องแบบ";
            this.title_uniformprice = "ราคา";
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
            this.title_pfno = "รหัสกองทุนฯ";
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
                    this.router.navigateByUrl('recruitment/applylist');
                },
            },
            {
                label: this.title_save,
                icon: 'pi pi-fw pi-save',
                command: (event) => {
                    this.confirmRecord();
                },
            },
        ];
        //menu suggest
        this.menu_reqsuggest = [
            {
                label: this.title_new,
                icon: 'pi pi-fw pi-plus',
                command: (event) => {
                    this.clearManage();
                    this.new_reqsuggest = true;
                    var ref = this.reqsuggestList.length + 100;
                    this.selectedReqSuggest = new EmpSuggestModel();
                    this.selectedReqSuggest.empsuggest_id = ref.toString();
                    this.showManage();
                },
            },
            {
                label: this.title_edit,
                icon: 'pi pi-fw pi-pencil',
                command: (event) => {
                    this.clearManage();
                    if (this.selectedReqSuggest != null) {
                        this.edit_reqsuggest = true;
                        this.showManage();
                    }
                },
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
                            if (this.selectedReqSuggest != null) {
                                this.reqsuggest_remove();
                            }
                        },
                        reject: () => {
                            this.messageService.add({ severity: 'warn', summary: 'Cancelled', detail: this.title_confirm_cancel });
                        },
                        key: "myDialog"
                    });

                },
            },
        ];
        //menu address
        this.menu_reqaddress = [
            {
                label: this.title_new,
                icon: 'pi pi-fw pi-plus',
                command: (event) => {
                    this.clearManage();
                    this.new_reqaddress = true;
                    var ref = this.reqaddressList.length + 100;
                    this.selectedReqAddress = new EmpaddressModel();
                    this.selectedReqAddress.address_id = ref.toString();
                    this.showManage();
                },
            },
            {
                label: this.title_edit,
                icon: 'pi pi-fw pi-pencil',
                command: (event) => {
                    this.clearManage();
                    if (this.selectedReqAddress != null) {
                        this.edit_reqaddress = true;
                        this.showManage();
                    }
                },
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
                            if (this.selectedReqAddress != null) {
                                this.reqaddress_remove();
                            }
                        },
                        reject: () => {
                            this.messageService.add({ severity: 'warn', summary: 'Cancelled', detail: this.title_confirm_cancel });
                        },
                        key: "myDialog"
                    });

                },
            },
        ];
        //menu card
        this.menu_reqcard = [
            {
                label: this.title_new,
                icon: 'pi pi-fw pi-plus',
                command: (event) => {
                    this.clearManage();
                    this.new_card = true;
                    var ref = this.reqcardList.length + 100;
                    this.selectedReqcard = new EmpcardModel();
                    this.selectedReqcard.card_id = ref.toString();
                    this.showManage();
                },
            },
            {
                label: this.title_edit,
                icon: 'pi pi-fw pi-pencil',
                command: (event) => {
                    this.clearManage();
                    if (this.selectedReqcard != null) {
                        this.edit_reqcard = true;
                        this.showManage();
                    }
                },
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
                            if (this.selectedReqcard != null) {
                                this.reqcard_remove();
                            }
                        },
                        reject: () => {
                            this.messageService.add({ severity: 'warn', summary: 'Cancelled', detail: this.title_confirm_cancel });
                        },
                        key: "myDialog"
                    });

                },
            },
        ];
        //menu education
        this.menu_reqeducation = [
            {
                label: this.title_new,
                icon: 'pi pi-fw pi-plus',
                command: (event) => {
                    // console.log('NEW');
                    this.clearManage();
                    this.new_education = true;
                    var ref = this.reqeducationList.length + 100;
                    this.selectedReqeducation = new EmpEducationModel();
                    this.selectedReqeducation.empeducation_no = ref.toString();
                    this.showManage();
                },
            },
            {
                label: this.title_edit,
                icon: 'pi pi-fw pi-pencil',
                command: (event) => {
                    // console.log('EDIT');
                    this.clearManage();
                    if (this.selectedReqeducation != null) {
                        this.edit_reqeducation = true;
                        this.showManage();
                    }
                },
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
                            if (this.selectedReqeducation != null) {
                                this.reqeducation_remove();
                            }
                        },
                        reject: () => {
                            this.messageService.add({ severity: 'warn', summary: 'Cancelled', detail: this.title_confirm_cancel });
                        },
                        key: "myDialog"
                    });

                },
            },
        ];
        //menu training
        this.menu_reqtraining = [
            {
                label: this.title_new,
                icon: 'pi pi-fw pi-plus',
                command: (event) => {
                    // console.log('NEW');
                    this.clearManage();
                    this.new_training = true;
                    var ref = this.reqtrainingList.length + 100;
                    this.selectedReqtraining = new EmpTrainingModel();
                    this.selectedReqtraining.emptraining_no = ref.toString();
                    this.showManage();
                },
            },
            {
                label: this.title_edit,
                icon: 'pi pi-fw pi-pencil',
                command: (event) => {
                    // console.log('EDIT');
                    this.clearManage();
                    if (this.selectedReqtraining != null) {
                        this.edit_reqtraining = true;
                        this.showManage();
                    }
                },
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
                            if (this.selectedReqtraining != null) {
                                this.reqtraining_remove();
                            }
                        },
                        reject: () => {
                            this.messageService.add({ severity: 'warn', summary: 'Cancelled', detail: this.title_confirm_cancel });
                        },
                        key: "myDialog"
                    });

                },
            },
        ];

        //Assessment
        this.menu_reqassessment = [
            {
                label: this.title_new,
                icon: 'pi pi-fw pi-plus',
                command: (event) => {
                    // console.log('NEW');
                    this.clearManage();
                    this.new_assessment = true;
                    var ref = this.reqassessmentList.length + 100;
                    this.selectedReqassessment = new EmpAssessmentModel();
                    this.selectedReqassessment.empassessment_id = ref.toString();
                    this.showManage();
                },
            },
            {
                label: this.title_edit,
                icon: 'pi pi-fw pi-pencil',
                command: (event) => {
                    // console.log('EDIT');
                    this.clearManage();
                    if (this.selectedReqassessment != null) {
                        this.edit_reqassessment = true;
                        this.showManage();
                    }
                },
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
                            if (this.selectedReqassessment != null) {
                                this.reqassessment_remove();
                            }
                        },
                        reject: () => {
                            this.messageService.add({ severity: 'warn', summary: 'Cancelled', detail: this.title_confirm_cancel });
                        },
                        key: "myDialog"
                    });

                },
            },
        ];

        //Criminal
        this.menu_reqcriminal = [
            {
                label: this.title_new,
                icon: 'pi pi-fw pi-plus',
                command: (event) => {
                    // console.log('NEW');
                    this.clearManage();
                    this.new_criminal = true;
                    var ref = this.reqCriminalList.length + 100;
                    this.selectedReqCriminal = new EmpCriminalModel();
                    this.selectedReqCriminal.empcriminal_id = ref.toString();
                    this.showManage();
                },
            },
            {
                label: this.title_edit,
                icon: 'pi pi-fw pi-pencil',
                command: (event) => {
                    // console.log('EDIT');
                    this.clearManage();
                    if (this.selectedReqCriminal != null) {
                        this.edit_reqcriminal = true;
                        this.showManage();
                    }
                },
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
                            if (this.selectedReqCriminal != null) {
                                this.reqcriminal_remove();
                            }
                        },
                        reject: () => {
                            this.messageService.add({ severity: 'warn', summary: 'Cancelled', detail: this.title_confirm_cancel });
                        },
                        key: "myDialog"
                    });

                },
            },
        ];
        //Attacg App
        this.items_attfileApp = [
            {
                label: this.title_new,
                icon: 'pi pi-fw pi-plus',
                command: (event) => {
                    this.UploadfileApp = true;
                }
            },
        ];
        //Attacg id
        this.items_attfileID = [
            {
                label: this.title_new,
                icon: 'pi pi-fw pi-plus',
                command: (event) => {
                    this.UploadfileID = true;
                }
            },
        ];
        //Attacg house
        this.items_attfileHos = [
            {
                label: this.title_new,
                icon: 'pi pi-fw pi-plus',
                command: (event) => {
                    this.UploadfileHos = true;
                }
            },
        ];
        //Attacg Photo
        this.items_attfilePho = [
            {
                label: this.title_new,
                icon: 'pi pi-fw pi-plus',
                command: (event) => {
                    this.UploadfilePho = true;
                }
            },
        ];
        //Attacg PDPA
        this.items_attfilePDPA = [
            {
                label: this.title_new,
                icon: 'pi pi-fw pi-plus',
                command: (event) => {
                    this.UploadfilePDPA = true;
                }
            },
        ];
        //Attacg M Certificate
        this.items_attfileMCer = [
            {
                label: this.title_new,
                icon: 'pi pi-fw pi-plus',
                command: (event) => {
                    this.UploadfileMCer = true;
                }
            },
        ];
        //Attacg other
        this.items_attfileOther = [
            {
                label: this.title_new,
                icon: 'pi pi-fw pi-plus',
                command: (event) => {
                    this.UploadfileOther = true;
                }
            },
        ];
        //menu position
        this.menu_reqposition = [
            {
                label: this.title_new,
                icon: 'pi pi-fw pi-plus',
                command: (event) => {
                    this.clearManage();
                    this.new_position = true;
                    var ref = this.reqPositionList.length + 100;
                    this.selectedReqPosition = new EmpPositionModel();
                    this.selectedReqPosition.empposition_id = ref.toString();
                    this.showManage();
                },
            },
            {
                label: this.title_edit,
                icon: 'pi pi-fw pi-pencil',
                command: (event) => {
                    this.clearManage();
                    if (this.selectedReqPosition != null) {
                        this.edit_reqposition = true;
                        this.showManage();
                    }
                },
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
                            if (this.selectedReqPosition != null) {
                                this.reqposition_remove();
                            }
                        },
                        reject: () => {
                            this.messageService.add({ severity: 'warn', summary: 'Cancelled', detail: this.title_confirm_cancel });
                        },
                        key: "myDialog"
                    });

                },
            },
        ];

        //menu project
        this.menu_reqproject = [
            {
                label: this.title_new,
                icon: 'pi pi-fw pi-plus',
                command: (event) => {
                    this.clearManage();
                    this.new_project = true;
                    var ref = this.reqProjectList.length + 100;
                    this.selectedReqProject = new ReqProjectModel();
                    this.selectedReqProject.empproject_id = ref.toString();
                    this.showManage();
                },
            },
            {
                label: this.title_edit,
                icon: 'pi pi-fw pi-pencil',
                command: (event) => {
                    this.clearManage();
                    if (this.selectedReqProject != null) {
                        this.edit_reqproject = true;
                        this.showManage();
                    }
                },
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
                            if (this.selectedReqProject != null) {
                                this.reqproject_remove();
                            }
                        },
                        reject: () => {
                            this.messageService.add({ severity: 'warn', summary: 'Cancelled', detail: this.title_confirm_cancel });
                        },
                        key: "myDialog"
                    });

                },
            },
        ];

        //menu salary
        this.menu_reqsalary = [
            {
                label: this.title_new,
                icon: 'pi pi-fw pi-plus',
                command: (event) => {
                    this.clearManage();
                    this.new_salary = true;
                    var ref = this.reqSalaryList.length + 100;
                    this.selectedReqSalary = new EmpSalaryModel();
                    this.selectedReqSalary.empsalary_id = ref.toString();
                    this.showManage();
                },
            },
            {
                label: this.title_edit,
                icon: 'pi pi-fw pi-pencil',
                command: (event) => {
                    this.clearManage();
                    if (this.selectedReqSalary != null) {
                        this.edit_reqsalary = true;
                        this.showManage();
                    }
                },
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
                            if (this.selectedReqSalary != null) {
                                this.reqsalary_remove();
                            }
                        },
                        reject: () => {
                            this.messageService.add({ severity: 'warn', summary: 'Cancelled', detail: this.title_confirm_cancel });
                        },
                        key: "myDialog"
                    });

                },
            },
        ];

        //menu benefit
        this.menu_reqbenefit = [
            {
                label: this.title_new,
                icon: 'pi pi-fw pi-plus',
                command: (event) => {
                    this.clearManage();
                    this.new_benefit = true;
                    var ref = this.reqBenefitList.length + 100;
                    this.selectedReqBenefit = new EmpBenefitsModel();
                    this.selectedReqBenefit.empbenefit_id = ref.toString();
                    this.showManage();
                },
            },
            {
                label: this.title_edit,
                icon: 'pi pi-fw pi-pencil',
                command: (event) => {
                    this.clearManage();
                    if (this.selectedReqBenefit != null) {
                        this.edit_reqbenefit = true;
                        this.showManage();
                    }
                },
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
                            if (this.selectedReqBenefit != null) {
                                this.reqbenefit_remove();
                            }
                        },
                        reject: () => {
                            this.messageService.add({ severity: 'warn', summary: 'Cancelled', detail: this.title_confirm_cancel });
                        },
                        key: "myDialog"
                    });

                },
            },
        ];
    }

    tabChange(e: { index: any }) {
        var index = e.index;
        //
        this.edit_reqsuggest = false;
        this.new_reqsuggest = false;
        //
        this.edit_reqaddress = false;
        this.new_reqaddress = false;
        //
        this.edit_reqcard = false;
        this.new_card = false;
        //
        this.edit_reqforeigner = false;
        this.new_foreigner = false;
        //
        this.edit_reqeducation = false;
        this.new_education = false;
        //
        this.edit_reqtraining = false;
        this.new_training = false;
        //
        this.edit_reqassessment = false;
        this.new_assessment = false;
        //
        this.edit_reqcriminal = false;
        this.new_criminal = false;
        //
        this.edit_reqposition = false;
        this.new_position = false;
        //
        this.edit_reqproject = false;
        this.new_project = false;
        //
        this.edit_reqsalary = false;
        this.new_salary = false;
        //
        this.edit_reqbenefit = false;
        this.new_benefit = false;

        this.displayManage = false;
    }

    position: string = 'right';
    showManage() {
        this.displayManage = true;

        if (this.initial_current.Language == 'EN') {
            if (this.new_reqsuggest || this.edit_reqsuggest) {
                this.manage_title = 'Suggest';
            } else if (this.new_reqaddress || this.edit_reqaddress) {
                this.manage_title = 'Address';
            } else if (this.new_card || this.edit_reqcard) {
                this.manage_title = 'Card';
            } else if (this.new_foreigner || this.edit_reqforeigner) {
                this.manage_title = 'Foreigner';
            } else if (this.new_education || this.edit_reqeducation) {
                this.manage_title = 'Education';
            } else if (this.new_training || this.edit_reqtraining) {
                this.manage_title = 'Training';
            } else if (this.new_assessment || this.edit_reqassessment) {
                this.manage_title = 'Assessment';
            } else if (this.new_criminal || this.edit_reqcriminal) {
                this.manage_title = 'Criminal record';
            } else if (this.new_position || this.edit_reqposition) {
                this.manage_title = 'Position';
            } else if (this.new_project || this.edit_reqproject) {
                this.manage_title = 'Project';
            } else if (this.new_salary || this.edit_reqsalary) {
                this.manage_title = 'Income';
            }
            else if (this.new_benefit || this.edit_reqbenefit) {
                this.manage_title = 'Other Income';
            }
        } else {
            if (this.new_reqsuggest || this.edit_reqsuggest) {
                this.manage_title = 'ผู้แนะนำ';
            } else if (this.new_reqaddress || this.edit_reqaddress) {
                this.manage_title = 'ที่อยู่';
            } else if (this.new_card || this.edit_reqcard) {
                this.manage_title = 'ข้อมูลบัตร';
            } else if (this.new_foreigner || this.edit_reqforeigner) {
                this.manage_title = 'ข้อมูลพนักงานต่างด้าว';
            } else if (this.new_education || this.edit_reqeducation) {
                this.manage_title = 'ประวัติการศึกษา';
            } else if (this.new_training || this.edit_reqtraining) {
                this.manage_title = 'ประวัติการอบรม';
            } else if (this.new_assessment || this.edit_reqassessment) {
                this.manage_title = 'ประวัติการประเมิน';
            } else if (this.new_criminal || this.edit_reqcriminal) {
                this.manage_title = 'ประวัติการตรวจสอบอาชญากรรม';
            } else if (this.new_position || this.edit_reqposition) {
                this.manage_title = 'ตำแหน่ง';
            } else if (this.new_project || this.edit_reqproject) {
                this.manage_title = 'โครงการ';
            } else if (this.new_salary || this.edit_reqsalary) {
                this.manage_title = 'รายได้';
            }
            else if (this.new_benefit || this.edit_reqbenefit) {
                this.manage_title = 'รายได้อื่นๆ';
            }
        }
    }
    base64Image: any = '../../../../assets/images/people.png'
    transform() {
        return this.sanitizer.bypassSecurityTrustResourceUrl(this.base64Image);
    }

    doLoadImage() {
        this.applyworkService.doGetReqImages(this.initial_current.CompCode, this.selectedReqworker.worker_code).then((res) => {
            let resultJSON = JSON.parse(res);

            if (resultJSON.result == "1") {
                this.base64Image = resultJSON.data;
            }
        });
    }

    doLoadApplywork() {
        this.reqworkerList = [];
        var tmp = new EmployeeModel();
        tmp.company_code = this.selectedReqworker.company_code || this.initial_current.CompCode
        tmp.worker_code = this.req_code
        this.applyworkService
            .reqworker_get(tmp)
            .then(async (res) => {
                await res.forEach((element: EmployeeModel) => {
                    element.worker_birthdate = new Date(element.worker_birthdate);
                    element.worker_hiredate = new Date(element.worker_hiredate);
                    element.worker_cardnoissuedate = new Date(element.worker_cardnoissuedate);
                    element.worker_cardnoexpiredate = new Date(element.worker_cardnoexpiredate);

                });

                this.reqworkerList = await res;
                console.log(res)

                if (this.reqworkerList.length > 0) {
                    this.selectedReqworker = this.reqworkerList[0];

                    setTimeout(() => {
                        //
                        this.doLoadImage();
                        //
                        this.doLoadReqaddressList();
                        this.doLoadReqcardList();
                        this.doLoadReqForeigner();

                        this.doLoadReqeducationList();
                        this.doLoadReqtrainingList();

                        this.doLoadReqassessmentList();
                        this.doLoadReqCriminalList();

                        this.doLoadReqSuggestList();

                        this.doLoadReqPositionList();
                        this.doLoadReqProjectList();
                        this.doLoadReqSalaryList();
                        this.doLoadReqBenefitList();

                        this.CalculateAge();

                        //attach file
                        this.doGetFileApp();
                        this.doGetFileID();
                        this.doGetFileHos();
                        this.doGetFilePho();
                        this.doGetFilePDPA();
                        this.doGetFileMCer();
                        this.doGetFileOther();

                        //Check
                        // this.getBlackList()
                        // this.getHistoryList();

                    }, 300);
                }
            });
    }

    //get data dropdown
    //ผู้แนะนำ
    suggest_List: EmployeeModel[] = [];
    doLoadSuggestList() {
        var tmp = new EmployeeModel();
        this.employeeService.worker_get(this.initial_current.CompCode, "").then(async (res) => {
            this.suggest_List = await res;
        })
    }
    // คำนำหน้า
    initialList: InitialModel[] = [];
    doLoadInitialList() {
        this.initialService.initial_get().then((res) => {
            this.initialList = res;
        });
    }
    // ศาสนา
    religionList: ReligionModel[] = [];
    doLoadReligionList() {
        this.religionService.religion_get().then((res) => {
            this.religionList = res;
        });
    }
    // กรุ๊ปเลือด
    bloodtypeList: BloodtypeModel[] = [];
    doLoadBloodtypeList() {
        this.bloodtypeService.bloodtype_get().then((res) => {
            this.bloodtypeList = res;
        });
    }
    // ที่อยู่
    addresstypeList: AddresstypeModel[] = [];
    doLoadaddresstypeList() {
        this.addresstypeService.addresstype_get().then((res) => {
            this.addresstypeList = res;
        });
    }

    // บัตร
    cardtypeList: CardtypeModel[] = [];
    doLoadcardtypeList() {
        this.cardtypeService.cardtype_get().then((res) => {
            this.cardtypeList = res;
        });
    }
    // จังหวัด
    provinceList: ProvinceModel[] = [];
    doLoadprovinceList() {
        this.provinceService.province_get().then((res) => {
            this.provinceList = res;
        });
    }
    // สถานศึกษา/อบรม
    instituteList: InstituteModel[] = [];
    doLoadinstituteList() {
        this.instituteService.institute_get().then((res) => {
            this.instituteList = res;
        });
    }
    // course
    courseList: CourseModel[] = [];
    doLoadcourseList() {
        this.courseService.course_get().then((res) => {
            this.courseList = res;
        });
    }
    // Faculty
    facultyList: FacultyModel[] = [];
    doLoadfacultyList() {
        this.facultyService.faculty_get().then((res) => {
            this.facultyList = res;
        });
    }
    // Major
    majorList: MajorModel[] = [];
    doLoadmajorList() {
        this.majorService.major_get().then((res) => {
            this.majorList = res;
        });
    }
    // วุฒิการศึกษา
    qualificationList: QualificationModel[] = [];
    doLoadqualificationList() {
        this.qualificationService.qualification_get().then((res) => {
            this.qualificationList = res;
        });
    }
    //request position 
    position_list: RequestModel[] = [];
    doloadpositionList() {
        var tmp = new RequestModel();
        tmp.company_code = this.initial_current.CompCode
        this.requestService.request_getposition(tmp).then((res) => {
            this.position_list = res;
        })
    }
    //request project
    projectList: RequestModel[] = [];
    doLoadprojectList() {
        var tmp = new RequestModel();
        tmp.company_code = this.initial_current.CompCode
        this.requestService.request_getproject(tmp).then((res) => {
            this.projectList = res;
        });
    }
    //emptype
    emptypeList: EmptypeModel[] = [];
    doLoadEmptypeList() {
        this.emptypeService.type_get().then((res) => {
            this.emptypeList = res;
        })
    }
    //empstatus
    statusList: EmpstatusModel[] = [];
    doLoadEmpstatusList() {
        this.empstatusService.status_get().then((res) => {
            this.statusList = res;
        })
    }
    //item
    itemList: ItemsModel[] = [];
    doLoadItemList() {
        var tmp = new ItemsModel();
        this.itemService.item_get(tmp).then((res) => {
            this.itemList = res;
        })
    }

    //address
    reqaddressList: EmpaddressModel[] = [];
    selectedReqAddress: EmpaddressModel = new EmpaddressModel();
    doLoadReqaddressList() {
        this.reqdetailService
            .getapplywork_reqaddress(
                this.initial_current.CompCode,
                this.req_code
            )
            .then((res) => {
                this.reqaddressList = res;
                if (this.reqaddressList.length > 0) {
                    this.selectedReqAddress = this.reqaddressList[0];
                }
            });
    }
    onRowSelectReqAddress(event: Event) { }
    reqaddress_summit() {
        this.reqaddress_addItem(this.selectedReqAddress);
        this.new_reqaddress = false;
        this.edit_reqaddress = false;
        this.displayManage = false;
    }
    reqaddress_remove() {
        this.selectedReqAddress.address_id = '9999';
        this.reqaddress_addItem(this.selectedReqAddress);
        this.new_reqaddress = false;
        this.edit_reqaddress = false;
    }
    reqaddress_delete() {
        var tmp: EmpaddressModel = new EmpaddressModel();
        tmp.worker_code = this.selectedReqworker.worker_code
        this.reqdetailService.delete_reqaddress(tmp).then((res) => {
            let result = JSON.parse(res);
        });
    }
    reqaddress_cancel() {
        this.new_reqaddress = false;
        this.edit_reqaddress = false;
        this.displayManage = false;
    }
    reqaddress_addItem(model: EmpaddressModel) {
        const itemNew: EmpaddressModel[] = [];
        for (let i = 0; i < this.reqaddressList.length; i++) {
            if (
                this.reqaddressList[i].address_id == model.address_id
            ) {
                //-- Notting
            } else {
                itemNew.push(this.reqaddressList[i]);
            }
        }
        //-- 9999 for delete
        if (model.address_id != '9999') {
            itemNew.push(model);
        }
        this.reqaddressList = [];
        this.reqaddressList = itemNew;
        this.reqaddressList.sort(function (a, b) {
            return parseInt(a.address_id) - parseInt(b.address_id);
        });
    }
    record_reqaddress() {
        if (this.reqaddressList.length == 0) {
            this.reqaddress_delete();
        }
        this.reqdetailService
            .record_reqaddress(
                this.selectedReqworker.worker_code,
                this.reqaddressList
            )
            .then((res) => {
                let result = JSON.parse(res);
                if (result.success) {
                } else {
                }
            });
    }

    //card
    reqcardList: EmpcardModel[] = [];
    selectedReqcard: EmpcardModel = new EmpcardModel();
    doLoadReqcardList() {
        this.reqdetailService
            .getapplywork_card(this.initial_current.CompCode, this.req_code)
            .then(async (res) => {
                await res.forEach((element: EmpcardModel) => {
                    element.card_issue = new Date(element.card_issue);
                    element.card_expire = new Date(element.card_expire);
                });
                this.reqcardList = await res;

                if (this.reqcardList.length > 0) {
                    this.selectedReqcard = this.reqcardList[0];
                }
            });
    }
    onRowSelectReqCard(event: Event) { }
    reqcard_summit() {
        this.reqcard_addItem(this.selectedReqcard);
        this.new_card = false;
        this.edit_reqcard = false;
        this.displayManage = false;
    }
    reqcard_remove() {
        this.selectedReqcard.card_id = '9999';
        this.reqcard_addItem(this.selectedReqcard);
        this.new_card = false;
        this.edit_reqcard = false;
    }
    reqcard_delete() {
        var tmp: EmpcardModel = new EmpcardModel();
        tmp.worker_code = this.selectedReqworker.worker_code
        this.reqdetailService.delete_empcard(tmp).then((res) => {
            let result = JSON.parse(res);
        });
    }
    reqcard_cancel() {
        this.new_card = false;
        this.edit_reqcard = false;
        this.displayManage = false;
    }
    reqcard_addItem(model: EmpcardModel) {
        const itemNew: EmpcardModel[] = [];
        for (let i = 0; i < this.reqcardList.length; i++) {
            if (this.reqcardList[i].card_id == model.card_id) {
                //-- Notting
            } else {
                itemNew.push(this.reqcardList[i]);
            }
        }
        //-- 9999 for delete
        if (model.card_id != '9999') {
            itemNew.push(model);
        }
        this.reqcardList = [];
        this.reqcardList = itemNew;
        this.reqcardList.sort(function (a, b) {
            return parseInt(a.card_id) - parseInt(b.card_id);
        });
    }
    record_reqcard() {
        if (this.reqcardList.length == 0) {
            this.reqcard_delete();
        }
        this.reqdetailService
            .record_reqcard(
                this.selectedReqworker.worker_code,
                this.reqcardList
            )
            .then((res) => {
                let result = JSON.parse(res);
                if (result.success) {
                } else {
                }
            });
    }

    // reqforeigner
    reqforeignerList: EmpForeignerModel[] = [];
    selectedReqforeigner: EmpForeignerModel = new EmpForeignerModel();
    doLoadReqForeigner() {
        this.reqdetailService
            .getapplywork_foreigner(
                this.initial_current.CompCode,
                this.req_code
            )
            .then(async (res) => {
                await res.forEach((element: EmpForeignerModel) => {
                    element.passport_issue = new Date(element.passport_issue);
                    element.passport_expire = new Date(element.passport_expire);
                    element.visa_issue = new Date(element.visa_issue);
                    element.visa_expire = new Date(element.visa_expire);
                    element.workpermit_issue = new Date(
                        element.workpermit_issue
                    );
                    element.workpermit_expire = new Date(
                        element.workpermit_expire
                    );
                    element.entry_date = new Date(element.entry_date);
                    element.certificate_expire = new Date(
                        element.certificate_expire
                    );
                    element.otherdoc_expire = new Date(element.otherdoc_expire);
                });
                this.reqforeignerList = await res;
                if (this.reqforeignerList.length > 0) {
                    this.selectedReqforeigner = this.reqforeignerList[0];
                }
            });
    }
    record_reqforeigner() {
        this.reqdetailService.record_reqforeigner(
            this.selectedReqworker.worker_code,
            this.selectedReqforeigner
        );
    }

    //education
    reqeducationList: EmpEducationModel[] = [];
    selectedReqeducation: EmpEducationModel = new EmpEducationModel();
    doLoadReqeducationList() {
        this.reqdetailService
            .getapply_education(this.initial_current.CompCode, this.req_code)
            .then(async (res) => {
                await res.forEach((element: EmpEducationModel) => {
                    element.empeducation_start = new Date(
                        element.empeducation_start
                    );
                    element.empeducation_finish = new Date(
                        element.empeducation_finish
                    );
                });
                this.reqeducationList = await res;
                if (this.reqeducationList.length > 0) {
                    this.selectedReqeducation = this.reqeducationList[0];
                }
            });
    }
    onRowSelectReqeducation(event: Event) { }
    reqeducation_summit() {
        this.reqeducation_addItem(this.selectedReqeducation);
        this.new_education = false;
        this.edit_reqeducation = false;
        this.displayManage = false;
    }
    reqeducation_remove() {
        this.selectedReqeducation.empeducation_no = '9999';
        this.reqeducation_addItem(this.selectedReqeducation);
        this.new_education = false;
        this.edit_reqeducation = false;
    }
    reqeducation_delete() {
        var tmp: EmpEducationModel = new EmpEducationModel();
        tmp.worker_code = this.selectedReqworker.worker_code
        this.reqdetailService.delete_empeducation(tmp).then((res) => {
            let result = JSON.parse(res);
        });
    }
    reqeducation_cancel() {
        this.new_education = false;
        this.edit_reqeducation = false;
        this.displayManage = false;
    }
    reqeducation_addItem(model: EmpEducationModel) {
        const itemNew: EmpEducationModel[] = [];
        for (let i = 0; i < this.reqeducationList.length; i++) {
            if (
                this.reqeducationList[i].empeducation_no ==
                model.empeducation_no
            ) {
                //-- Notting
            } else {
                itemNew.push(this.reqeducationList[i]);
            }
        }
        //-- 9999 for delete
        if (model.empeducation_no != '9999') {
            itemNew.push(model);
        }
        this.reqeducationList = [];
        this.reqeducationList = itemNew;
        this.reqeducationList.sort(function (a, b) {
            return parseInt(a.empeducation_no) - parseInt(b.empeducation_no);
        });
    }
    record_reqeducation() {
        if (this.reqeducationList.length == 0) {
            this.reqeducation_delete();
        }
        this.reqdetailService
            .record_reqeducation(
                this.selectedReqworker.worker_code,
                this.reqeducationList
            )
            .then((res) => {
                let result = JSON.parse(res);
                if (result.success) {
                } else {
                }
            });
    }

    //training
    reqtrainingList: EmpTrainingModel[] = [];
    selectedReqtraining: EmpTrainingModel = new EmpTrainingModel();
    doLoadReqtrainingList() {
        this.reqdetailService
            .getapplywork_training(this.initial_current.CompCode, this.req_code)
            .then(async (res) => {
                await res.forEach((element: EmpTrainingModel) => {
                    element.emptraining_start = new Date(
                        element.emptraining_start
                    );
                    element.emptraining_finish = new Date(
                        element.emptraining_finish
                    );
                });
                this.reqtrainingList = await res;
                if (this.reqtrainingList.length > 0) {
                    this.selectedReqtraining = this.reqtrainingList[0];
                }
            });
    }
    onRowSelectReqtraining(event: Event) { }
    reqtraining_summit() {
        this.reqtraining_addItem(this.selectedReqtraining);
        this.new_training = false;
        this.edit_reqtraining = false;
        this.displayManage = false;
    }
    reqtraining_remove() {
        this.selectedReqtraining.emptraining_no = '9999';
        this.reqtraining_addItem(this.selectedReqtraining);
        this.new_education = false;
        this.edit_reqtraining = false;
    }
    reqtraining_delete() {
        var tmp: EmpTrainingModel = new EmpTrainingModel();
        tmp.worker_code = this.selectedReqworker.worker_code
        this.reqdetailService.delete_reqtraining(tmp).then((res) => {
            let result = JSON.parse(res);
        });
    }
    reqtraining_cancel() {
        this.new_training = false;
        this.edit_reqtraining = false;
        this.displayManage = false;
    }
    reqtraining_addItem(model: EmpTrainingModel) {
        const itemNew: EmpTrainingModel[] = [];
        for (let i = 0; i < this.reqtrainingList.length; i++) {
            if (
                this.reqtrainingList[i].emptraining_no == model.emptraining_no
            ) {
                //-- Notting
            } else {
                itemNew.push(this.reqtrainingList[i]);
            }
        }
        //-- 9999 for delete
        if (model.emptraining_no != '9999') {
            itemNew.push(model);
        }
        this.reqtrainingList = [];
        this.reqtrainingList = itemNew;
        this.reqtrainingList.sort(function (a, b) {
            return parseInt(a.emptraining_no) - parseInt(b.emptraining_no);
        });
    }
    record_reqtraining() {
        if (this.reqtrainingList.length == 0) {
            this.reqtraining_delete();
        }
        this.reqdetailService
            .record_reqtraining(
                this.selectedReqworker.worker_code,
                this.reqtrainingList
            )
            .then((res) => {
                let result = JSON.parse(res);
                if (result.success) {
                } else {
                }
            });
    }

    //assessment
    reqassessmentList: EmpAssessmentModel[] = [];
    selectedReqassessment: EmpAssessmentModel = new EmpAssessmentModel();
    doLoadReqassessmentList() {
        this.reqdetailService
            .getapplywork_assessment(this.initial_current.CompCode, this.req_code)
            .then(async (res) => {
                await res.forEach((element: EmpAssessmentModel) => {
                    element.empassessment_fromdate = new Date(
                        element.empassessment_fromdate
                    );
                    element.empassessment_todate = new Date(
                        element.empassessment_todate
                    );
                });
                this.reqassessmentList = await res;
                if (this.reqassessmentList.length > 0) {
                    this.selectedReqassessment = this.reqassessmentList[0];
                }
            });
    }
    onRowSelectReqassessment(event: Event) { }
    reqassessment_summit() {
        this.reqassessment_addItem(this.selectedReqassessment);
        this.new_assessment = false;
        this.edit_reqassessment = false;
        this.displayManage = false;
    }
    reqassessment_remove() {
        this.selectedReqassessment.empassessment_id = '9999';
        this.reqassessment_addItem(this.selectedReqassessment);
        this.new_assessment = false;
        this.edit_reqassessment = false;
    }
    reqassessment_delete() {
        var tmp: EmpAssessmentModel = new EmpAssessmentModel();
        tmp.worker_code = this.selectedReqworker.worker_code
        this.reqdetailService.delete_reqassessment(tmp).then((res) => {
            let result = JSON.parse(res);
        });
    }
    reqassessment_cancel() {
        this.new_assessment = false;
        this.edit_reqassessment = false;
        this.displayManage = false;
    }
    reqassessment_addItem(model: EmpAssessmentModel) {
        const itemNew: EmpAssessmentModel[] = [];
        for (let i = 0; i < this.reqassessmentList.length; i++) {
            if (
                this.reqassessmentList[i].empassessment_id == model.empassessment_id
            ) {
                //-- Notting
            } else {
                itemNew.push(this.reqassessmentList[i]);
            }
        }
        //-- 9999 for delete
        if (model.empassessment_id != '9999') {
            itemNew.push(model);
        }
        this.reqassessmentList = [];
        this.reqassessmentList = itemNew;
        this.reqassessmentList.sort(function (a, b) {
            return parseInt(a.empassessment_id) - parseInt(b.empassessment_id);
        });
    }
    record_reqassessment() {
        if (this.reqassessmentList.length == 0) {
            this.reqassessment_delete();
        }
        this.reqdetailService
            .record_reqassessment(
                this.selectedReqworker.worker_code,
                this.reqassessmentList
            )
            .then((res) => {
                let result = JSON.parse(res);
                if (result.success) {
                } else {
                }
            });
    }

    //criminal
    reqCriminalList: EmpCriminalModel[] = [];
    selectedReqCriminal: EmpCriminalModel = new EmpCriminalModel();
    doLoadReqCriminalList() {
        this.reqdetailService
            .getapplywork_criminal(this.initial_current.CompCode, this.req_code)
            .then(async (res) => {
                await res.forEach((element: EmpCriminalModel) => {
                    element.empcriminal_fromdate = new Date(
                        element.empcriminal_fromdate
                    );
                    element.empcriminal_todate = new Date(
                        element.empcriminal_todate
                    );
                });
                this.reqCriminalList = await res;
                if (this.reqCriminalList.length > 0) {
                    this.selectedReqCriminal = this.reqCriminalList[0];
                }
            });
    }
    onRowSelectReqcriminal(event: Event) { }
    reqcriminal_summit() {
        this.reqcriminal_addItem(this.selectedReqCriminal);
        this.new_criminal = false;
        this.edit_reqcriminal = false;
        this.displayManage = false;
    }
    reqcriminal_remove() {
        this.selectedReqCriminal.empcriminal_id = '9999';
        this.reqcriminal_addItem(this.selectedReqCriminal);
        this.new_criminal = false;
        this.edit_reqcriminal = false;
    }
    reqcriminal_delete() {
        var tmp: EmpCriminalModel = new EmpCriminalModel();
        tmp.worker_code = this.selectedReqworker.worker_code
        this.reqdetailService.delete_reqcriminal(tmp).then((res) => {
            let result = JSON.parse(res);
        });
    }
    reqcriminal_cancel() {
        this.new_criminal = false;
        this.edit_reqcriminal = false;
        this.displayManage = false;
    }
    reqcriminal_addItem(model: EmpCriminalModel) {
        const itemNew: EmpCriminalModel[] = [];
        for (let i = 0; i < this.reqCriminalList.length; i++) {
            if (
                this.reqCriminalList[i].empcriminal_id == model.empcriminal_id
            ) {
                //-- Notting
            } else {
                itemNew.push(this.reqCriminalList[i]);
            }
        }
        //-- 9999 for delete
        if (model.empcriminal_id != '9999') {
            itemNew.push(model);
        }
        this.reqCriminalList = [];
        this.reqCriminalList = itemNew;
        this.reqCriminalList.sort(function (a, b) {
            return parseInt(a.empcriminal_id) - parseInt(b.empcriminal_id);
        });
    }
    record_reqcriminal() {
        if (this.reqCriminalList.length == 0) {
            this.reqcriminal_delete();
        }
        this.reqdetailService
            .record_reqcriminal(
                this.selectedReqworker.worker_code,
                this.reqCriminalList
            )
            .then((res) => {
                let result = JSON.parse(res);
                if (result.success) {
                } else {
                }
            });
    }

    //suggest
    reqsuggestList: EmpSuggestModel[] = [];
    selectedReqSuggest: EmpSuggestModel = new EmpSuggestModel();
    doLoadReqSuggestList() {
        this.reqdetailService
            .getapplywork_suggest(this.initial_current.CompCode, this.req_code)
            .then(async (res) => {
                await res.forEach((element: EmpSuggestModel) => {
                    element.empsuggest_date = new Date(element.empsuggest_date)

                });
                this.reqsuggestList = await res;
                if (this.reqsuggestList.length > 0) {
                    this.selectedReqSuggest = this.reqsuggestList[0];
                }
            });
    }
    onRowSelectReqSuggest(event: Event) { }
    reqsuggest_summit() {
        this.reqsuggest_addItem(this.selectedReqSuggest);
        this.new_reqsuggest = false;
        this.edit_reqsuggest = false;
        this.displayManage = false;
    }
    reqsuggest_remove() {
        this.selectedReqSuggest.empsuggest_id = '9999';
        this.reqsuggest_addItem(this.selectedReqSuggest);
        this.new_reqsuggest = false;
        this.edit_reqsuggest = false;
    }
    reqsuggest_delete() {
        var tmp: EmpSuggestModel = new EmpSuggestModel();
        tmp.worker_code = this.selectedReqworker.worker_code
        this.reqdetailService.delete_reqsuggest(tmp).then((res) => {
            let result = JSON.parse(res);
        });
    }
    reqsuggest_cancel() {
        this.new_reqsuggest = false;
        this.edit_reqsuggest = false;
        this.displayManage = false;
    }
    reqsuggest_addItem(model: EmpSuggestModel) {
        const itemNew: EmpSuggestModel[] = [];
        for (let i = 0; i < this.reqsuggestList.length; i++) {
            if (
                this.reqsuggestList[i].empsuggest_id == model.empsuggest_id
            ) {
                //-- Notting
            } else {
                itemNew.push(this.reqsuggestList[i]);
            }
        }
        //-- 9999 for delete
        if (model.empsuggest_id != '9999') {
            itemNew.push(model);
        }
        this.reqsuggestList = [];
        this.reqsuggestList = itemNew;
        this.reqsuggestList.sort(function (a, b) {
            return parseInt(a.empsuggest_id) - parseInt(b.empsuggest_id);
        });
    }
    record_reqsuggest() {
        if (this.reqsuggestList.length == 0) {
            this.reqsuggest_delete();
        }
        this.reqdetailService
            .record_reqsuggest(
                this.selectedReqworker.worker_code,
                this.reqsuggestList
            )
            .then((res) => {
                let result = JSON.parse(res);
                if (result.success) {
                } else {
                }
            });
    }
    //Position
    reqPositionList: EmpPositionModel[] = [];
    selectedReqPosition: EmpPositionModel = new EmpPositionModel();
    doLoadReqPositionList() {
        this.reqdetailService
            .getapplywork_position(this.initial_current.CompCode, this.req_code)
            .then(async (res) => {
                this.reqPositionList = await res;
                if (this.reqPositionList.length > 0) {
                    this.selectedReqPosition = this.reqPositionList[0];
                }
            });
    }
    onRowSelectReqposition(event: Event) { }
    reqposition_summit() {
        this.reqposition_addItem(this.selectedReqPosition);
        this.new_position = false;
        this.edit_reqposition = false;
        this.displayManage = false;
    }
    reqposition_remove() {
        this.selectedReqPosition.empposition_id = '9999';
        this.reqposition_addItem(this.selectedReqPosition);
        this.new_position = false;
        this.edit_reqposition = false;
    }
    reqposition_delete() {
        var tmp: EmpPositionModel = new EmpPositionModel();
        tmp.worker_code = this.selectedReqworker.worker_code;
        tmp.empposition_id = "0";
        this.reqdetailService.delete_reqposition(tmp).then((res) => {
            let result = JSON.parse(res);
        });
    }
    reqposition_cancel() {
        this.new_position = false;
        this.edit_reqposition = false;
        this.displayManage = false;
    }
    reqposition_addItem(model: EmpPositionModel) {
        const itemNew: EmpPositionModel[] = [];
        for (let i = 0; i < this.reqPositionList.length; i++) {
            if (
                this.reqPositionList[i].empposition_id == model.empposition_id
            ) {
                //-- Notting
            } else {
                itemNew.push(this.reqPositionList[i]);
            }
        }
        //-- 9999 for delete
        if (model.empposition_id != '9999') {
            itemNew.push(model);
        }
        this.reqPositionList = [];
        this.reqPositionList = itemNew;
        this.reqPositionList.sort(function (a, b) {
            return parseInt(a.empposition_id) - parseInt(b.empposition_id);
        });
    }
    record_reqposition() {
        if (this.reqPositionList.length == 0) {
            this.reqposition_delete();
        }
        this.reqdetailService
            .record_reqposition(
                this.selectedReqworker.worker_code,
                this.reqPositionList
            )
            .then((res) => {
                let result = JSON.parse(res);
                if (result.success) {
                } else {
                }
            });
    }
    //Project
    reqProjectList: ReqProjectModel[] = [];
    selectedReqProject: ReqProjectModel = new ReqProjectModel();
    doLoadReqProjectList() {
        this.reqdetailService
            .getapplywork_project(this.initial_current.CompCode, this.req_code)
            .then(async (res) => {
                this.reqProjectList = await res;
                if (this.reqProjectList.length > 0) {
                    this.selectedReqProject = this.reqProjectList[0];
                }
            });
    }
    onRowSelectReqproject(event: Event) { }
    reqproject_summit() {
        this.reqproject_addItem(this.selectedReqProject);
        this.new_position = false;
        this.edit_reqposition = false;
        this.displayManage = false;
    }
    reqproject_remove() {
        this.selectedReqProject.empproject_id = '9999';
        this.reqproject_addItem(this.selectedReqProject);
        this.new_project = false;
        this.edit_reqproject = false;
    }
    reqproject_delete() {
        var tmp: ReqProjectModel = new ReqProjectModel();
        tmp.worker_code = this.selectedReqworker.worker_code;
        this.reqdetailService.delete_reqproject(tmp).then((res) => {
            let result = JSON.parse(res);
        });
    }
    reqproject_cancel() {
        this.new_project = false;
        this.edit_reqproject = false;
        this.displayManage = false;
    }
    reqproject_addItem(model: ReqProjectModel) {
        const itemNew: ReqProjectModel[] = [];
        for (let i = 0; i < this.reqProjectList.length; i++) {
            if (
                this.reqProjectList[i].empproject_id == model.empproject_id
            ) {
                //-- Notting
            } else {
                itemNew.push(this.reqProjectList[i]);
            }
        }
        //-- 9999 for delete
        if (model.empproject_id != '9999') {
            itemNew.push(model);
        }
        this.reqProjectList = [];
        this.reqProjectList = itemNew;
        this.reqProjectList.sort(function (a, b) {
            return parseInt(a.empproject_id) - parseInt(b.empproject_id);
        });
    }
    record_reqproject() {
        if (this.reqProjectList.length == 0) {
            this.reqproject_delete();
        }
        this.reqdetailService
            .record_reqproject(
                this.selectedReqworker.worker_code,
                this.reqProjectList
            )
            .then((res) => {
                let result = JSON.parse(res);
                if (result.success) {
                } else {
                }
            });
    }
    //Salary
    reqSalaryList: EmpSalaryModel[] = [];
    selectedReqSalary: EmpSalaryModel = new EmpSalaryModel();
    doLoadReqSalaryList() {
        this.reqdetailService
            .getapplywork_salary(this.initial_current.CompCode, this.req_code)
            .then(async (res) => {
                this.reqSalaryList = await res;
                if (this.reqSalaryList.length > 0) {
                    this.selectedReqSalary = this.reqSalaryList[0];
                }
            });
    }
    onRowSelectReqsalary(event: Event) { }
    reqsalary_summit() {
        this.reqsalary_addItem(this.selectedReqSalary);
        this.new_salary = false;
        this.edit_reqsalary = false;
        this.displayManage = false;
    }
    reqsalary_remove() {
        this.selectedReqSalary.empsalary_id = '9999';
        this.reqsalary_addItem(this.selectedReqSalary);
        this.new_salary = false;
        this.edit_reqsalary = false;
    }
    reqsalary_delete() {
        var tmp: EmpSalaryModel = new EmpSalaryModel();
        tmp.worker_code = this.selectedReqworker.worker_code
        this.reqdetailService.delete_reqsalary(tmp).then((res) => {
            let result = JSON.parse(res);
        });
    }
    reqsalary_cancel() {
        this.new_salary = false;
        this.edit_reqsalary = false;
        this.displayManage = false;
    }
    reqsalary_addItem(model: EmpSalaryModel) {
        const itemNew: EmpSalaryModel[] = [];
        for (let i = 0; i < this.reqSalaryList.length; i++) {
            if (
                this.reqSalaryList[i].empsalary_id == model.empsalary_id
            ) {
                //-- Notting
            } else {
                itemNew.push(this.reqSalaryList[i]);
            }
        }
        //-- 9999 for delete
        if (model.empsalary_id != '9999') {
            itemNew.push(model);
        }
        this.reqSalaryList = [];
        this.reqSalaryList = itemNew;
        this.reqSalaryList.sort(function (a, b) {
            return parseInt(a.empsalary_id) - parseInt(b.empsalary_id);
        });
    }
    record_reqsalary() {
        if (this.reqSalaryList.length == 0) {
            this.reqsalary_delete();
        }
        this.reqdetailService
            .record_reqsalary(
                this.selectedReqworker.worker_code,
                this.reqSalaryList
            )
            .then((res) => {
                let result = JSON.parse(res);
                if (result.success) {
                } else {
                }
            });
    }
    //Benefit
    reqBenefitList: EmpBenefitsModel[] = [];
    selectedReqBenefit: EmpBenefitsModel = new EmpBenefitsModel();
    doLoadReqBenefitList() {
        this.reqdetailService
            .getapplywork_benefit(this.initial_current.CompCode, this.req_code)
            .then(async (res) => {
                this.reqBenefitList = await res;
                if (this.reqBenefitList.length > 0) {
                    this.selectedReqBenefit = this.reqBenefitList[0];
                }
            });
    }
    onRowSelectReqbenefit(event: Event) { }
    reqbenefit_summit() {
        this.reqbenefit_addItem(this.selectedReqBenefit);
        this.new_benefit = false;
        this.edit_reqbenefit = false;
        this.displayManage = false;
    }
    reqbenefit_remove() {
        this.selectedReqBenefit.empbenefit_id = '9999';
        this.reqbenefit_addItem(this.selectedReqBenefit);
        this.new_benefit = false;
        this.edit_reqbenefit = false;
    }
    reqbenefit_delete() {
        var tmp: EmpBenefitsModel = new EmpBenefitsModel();
        tmp.worker_code = this.selectedReqworker.worker_code
        this.reqdetailService.delete_reqbenefit(tmp).then((res) => {
            let result = JSON.parse(res);
        });
    }
    reqbenefit_cancel() {
        this.new_salary = false;
        this.edit_reqsalary = false;
        this.displayManage = false;
    }
    reqbenefit_addItem(model: EmpBenefitsModel) {
        const itemNew: EmpBenefitsModel[] = [];
        for (let i = 0; i < this.reqBenefitList.length; i++) {
            if (
                this.reqBenefitList[i].empbenefit_id == model.empbenefit_id
            ) {
                //-- Notting
            } else {
                itemNew.push(this.reqBenefitList[i]);
            }
        }
        //-- 9999 for delete
        if (model.empbenefit_id != '9999') {
            itemNew.push(model);
        }
        this.reqBenefitList = [];
        this.reqBenefitList = itemNew;
        this.reqBenefitList.sort(function (a, b) {
            return parseInt(a.empbenefit_id) - parseInt(b.empbenefit_id);
        });
    }
    record_reqbenefit() {
        if (this.reqBenefitList.length == 0) {
            this.reqbenefit_delete();
        }
        this.reqdetailService
            .record_reqbenefit(
                this.selectedReqworker.worker_code,
                this.reqBenefitList
            )
            .then((res) => {
                let result = JSON.parse(res);
                if (result.success) {
                } else {
                }
            });
    }

    doRecordApplywork() {
        this.applyworkService
            .reqworker_record([this.selectedReqworker])
            .then((res) => {
                let result = JSON.parse(res);

                if (result.success) {
                    //-- Transaction

                    this.record_reqaddress();
                    this.record_reqcard();
                    this.record_reqforeigner();


                    this.record_reqeducation();
                    this.record_reqtraining();

                    this.record_reqassessment();
                    this.record_reqcriminal();

                    this.record_reqsuggest();

                    this.record_reqposition();
                    this.record_reqproject();
                    this.record_reqsalary();
                    this.record_reqbenefit();

                    //image
                    this.uploadImages();

                    //attach
                    this.record_fileApp();
                    this.record_fileID();
                    this.record_fileHos();
                    this.record_filePho();
                    this.record_filePDPA();
                    this.record_fileMCer();
                    this.record_fileOther();

                    this.messageService.add({
                        severity: 'success',
                        summary: 'Success',
                        detail: result.message,
                    });
                    this.router.navigateByUrl('recruitment/applylist');
                } else {
                    this.messageService.add({
                        severity: 'error',
                        summary: 'Error',
                        detail: result.message,
                    });
                }
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
                this.record_fileApp();
                this.messageService.add({ severity: 'warn', summary: 'Cancelled', detail: this.title_confirm_cancel });
            },
            key: "myDialog"
        });
    }

    close() {
        this.new_applywork = false;
        this.selectedApplywork = new ApplyworkModel();
    }

    fileToUpload: File | any = null;

    onselectFile(event: any) {
        const reader = new FileReader();
        reader.onload = (e: any) => {
            // Set image src
            this.base64Image = e.target.result;
        }
        reader.readAsDataURL(event.target.files[0])
        this.fileToUpload = event.target.files.item(0);

    }

    uploadImages() {

        const filename = "XXX";
        const filetype = "jpg";

        this.applyworkService.uploadReqImages(this.fileToUpload, this.initial_current.CompCode, this.selectedReqworker.worker_code).then((res) => {
            let resultJSON = JSON.parse(res);
            if (resultJSON.result == "1") {

                setTimeout(() => {
                    this.doLoadImage();
                }, 500);

            }
        });

    }


    clearManage() {
        this.new_reqsuggest = false; this.edit_reqsuggest = false;

        this.new_reqaddress = false; this.edit_reqaddress = false;
        this.new_card = false; this.edit_reqcard = false;

        this.new_foreigner = false; this.edit_reqforeigner = false;

        this.new_education = false; this.edit_reqeducation = false;
        this.new_training = false; this.edit_reqtraining = false;
        this.new_assessment = false; this.edit_reqassessment = false;
        this.new_criminal = false; this.edit_reqcriminal = false;
        this.new_position = false; this.edit_reqposition = false;
        this.new_project = false; this.edit_reqproject = false;
        this.new_salary = false; this.edit_reqsalary = false;
    }

    newDateTime = new Date();
    createReqID() {
        this.selectedReqworker.worker_code = "REQ" + this.datePipe.transform(this.newDateTime, 'yyyyMMddHHmm');
    }


    //Attach File Application
    UploadfileApp: boolean = false;
    fileDocToUploadApp: File | any = null;
    reqdocattApp: ApplyMTDocattModel[] = [];
    selecteddocattApp: ApplyMTDocattModel = new ApplyMTDocattModel();
    handleFileAppInputDoclist(file: FileList) {
        this.fileDocToUploadApp = file.item(0);
    }
    doGetFileApp() {
        var tmp = new ApplyMTDocattModel();
        tmp.company_code = this.initial_current.CompCode
        tmp.worker_code = this.selectedReqworker.worker_code
        tmp.job_type = "APPT"
        this.applyworkService.getreq_filelist(tmp).then((res) => {
            this.reqdocattApp = res;
        })
    }
    doUploadFileApp() {
        const filename = "REQ_APP" + this.datePipe.transform(new Date(), 'yyyyMMddHHmmss');
        const filetype = this.fileDocToUploadApp.name.split(".")[1];
        this.applyworkService.file_attach(this.fileDocToUploadApp, filename, filetype).then((res) => {
            this.reqdocattApp = [];
            if (res.success) {
                this.reqdocattApp = this.reqdocattApp.concat({
                    company_code: this.selectedReqworker.company_code || this.initial_current.CompCode,
                    worker_code: this.selectedReqworker.worker_code,
                    document_id: 0,
                    job_type: "APPT",
                    job_id: this.selectedReqworker.worker_id.toString(),
                    document_name: filename + "." + filetype,
                    document_type: this.fileDocToUploadApp.type,
                    document_path: res.message,
                    created_by: this.initial_current.Username,
                    created_date: new Date().toISOString()
                })
                this.UploadfileApp = false;
                this.messageService.add({ severity: 'success', summary: 'Success', detail: res.message });
            }
            else {
                this.messageService.add({ severity: 'error', summary: 'Error', detail: res.message });
            }
            this.fileDocToUploadApp = null;
        });
    }

    UploadfileAppdoc() {
        if (this.fileDocToUploadApp) {
            this.confirmationService.confirm({
                message: this.title_confirm + this.fileDocToUploadApp.name,
                header: this.title_import,
                icon: 'pi pi-exclamation-triangle',
                accept: () => {
                    this.fileUploader.nativeElement.value = null;
                    this.UploadfileApp = false;
                    this.doUploadFileApp();
                },
                reject: () => {
                    this.UploadfileApp = false;
                }
            });
        } else {
            this.messageService.add({ severity: 'warn', summary: 'File', detail: "Please choose a file." });
        }
    }
    DeleteFileApp(data: ApplyMTDocattModel) {
        this.confirmationService.confirm({
            message: this.title_confirm_delete + data.document_name,
            header: this.title_delete,
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                if (data.document_id) {
                    this.applyworkService.delete_file(data).then((res) => {
                        if (res.success) {
                            this.messageService.add({ severity: 'success', summary: 'Success', detail: res.message });
                        } else {
                            this.messageService.add({ severity: 'error', summary: 'Error', detail: res.message });
                        }
                    })
                } else {
                    this.selectedReqworker.reqdocatt_data = this.selectedReqworker.reqdocatt_data.filter((item) => {
                        return item !== data;
                    });
                }
                this.applyworkService.deletefilepath_file(data.document_path).then((res) => {
                    if (res.success) {
                        this.messageService.add({ severity: 'success', summary: 'Success', detail: res.message });
                        this.selectedReqworker.reqdocatt_data = this.selectedReqworker.reqdocatt_data.filter((item) => {
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
    async doGetReqAttfileApp(file_path: string, type: string) {
        this.applyworkService.get_file(file_path).then((res) => {
            var url = window.URL.createObjectURL(new Blob([new Uint8Array(res)], { type: type }));
            window.open(url);
            this.selecteddocattApp = new ApplyMTDocattModel();
        })
    }
    onRowSelectfileApp(event: Event) {
        // this.doGetReqAttfileApp(this.selecteddocattApp.document_path, this.selecteddocattApp.document_type)
    }
    record_fileApp() {
        if (this.reqdocattApp.length == 0) {
            return;
        }
        this.applyworkService.record_reqfile(this.selectedReqworker.worker_code, this.reqdocattApp,"APPT").then((res) => {
            let result = JSON.parse(res);
            if (result.success) {
            } else {
            }
        })
    }
    //end

    //Attach File ID Card
    UploadfileID: boolean = false;
    fileDocToUploadID: File | any = null;
    reqdocattID: ApplyMTDocattModel[] = [];
    selecteddocattID: ApplyMTDocattModel = new ApplyMTDocattModel();
    handleFileIDInputDoclist(file: FileList) {
        this.fileDocToUploadID = file.item(0);
    }
    doGetFileID() {
        var tmp = new ApplyMTDocattModel();
        tmp.company_code = this.initial_current.CompCode
        tmp.worker_code = this.selectedReqworker.worker_code
        tmp.job_type = "IDCARD"
        this.applyworkService.getreq_filelist(tmp).then((res) => {
            this.reqdocattID = res;
        })
    }
    doUploadFileID() {
        const filename = "REQ_ID" + this.datePipe.transform(new Date(), 'yyyyMMddHHmmss');
        const filetype = this.fileDocToUploadID.name.split(".")[1];
        this.applyworkService.file_attach(this.fileDocToUploadID, filename, filetype).then((res) => {
            this.reqdocattID = [];
            if (res.success) {
                this.reqdocattID = this.reqdocattID.concat({
                    company_code: this.selectedReqworker.company_code || this.initial_current.CompCode,
                    worker_code: this.selectedReqworker.worker_code,
                    document_id: 0,
                    job_type: "IDCARD",
                    job_id: this.selectedReqworker.worker_id.toString(),
                    document_name: filename + "." + filetype,
                    document_type: this.fileDocToUploadID.type,
                    document_path: res.message,
                    created_by: this.initial_current.Username,
                    created_date: new Date().toISOString()
                })
                this.UploadfileID = false;
                this.messageService.add({ severity: 'success', summary: 'Success', detail: res.message });
            }
            else {
                this.messageService.add({ severity: 'error', summary: 'Error', detail: res.message });
            }
            this.fileDocToUploadID = null;
        });
    }

    UploadfileIDdoc() {
        if (this.fileDocToUploadID) {
            this.confirmationService.confirm({
                message: this.title_confirm + this.fileDocToUploadID.name,
                header: this.title_import,
                icon: 'pi pi-exclamation-triangle',
                accept: () => {
                    this.fileUploader.nativeElement.value = null;
                    this.UploadfileID = false;
                    this.doUploadFileID();
                },
                reject: () => {
                    this.UploadfileID = false;
                }
            });
        } else {
            this.messageService.add({ severity: 'warn', summary: 'File', detail: "Please choose a file." });
        }
    }
    DeleteFileID(data: ApplyMTDocattModel) {
        this.confirmationService.confirm({
            message: this.title_confirm_delete + data.document_name,
            header: this.title_delete,
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                if (data.document_id) {
                    this.applyworkService.delete_file(data).then((res) => {
                        if (res.success) {
                            this.messageService.add({ severity: 'success', summary: 'Success', detail: res.message });
                        } else {
                            this.messageService.add({ severity: 'error', summary: 'Error', detail: res.message });
                        }
                    })
                } else {
                    this.reqdocattID = this.reqdocattID.filter((item) => {
                        return item !== data;
                    });
                }
                this.applyworkService.deletefilepath_file(data.document_path).then((res) => {
                    if (res.success) {
                        this.messageService.add({ severity: 'success', summary: 'Success', detail: res.message });
                        this.reqdocattID = this.reqdocattID.filter((item) => {
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
    async doGetReqAttfileID(file_path: string, type: string) {
        this.applyworkService.get_file(file_path).then((res) => {
            var url = window.URL.createObjectURL(new Blob([new Uint8Array(res)], { type: type }));
            window.open(url);
            this.selecteddocattID = new ApplyMTDocattModel();
        })
    }
    onRowSelectfileID(event: Event) {
        // this.doGetReqAttfileID(this.selecteddocattID.document_path, this.selecteddocattID.document_type)
    }
    record_fileID() {
        if (this.reqdocattID.length == 0) {
            return;
        }
        this.applyworkService.record_reqfile(this.selectedReqworker.worker_code, this.reqdocattID,"IDCARD").then((res) => {
            let result = JSON.parse(res);
            if (result.success) {
            } else {
            }
        })
    }
    //end

    //Attach House REGISTRATION
    UploadfileHos: boolean = false;
    fileDocToUploadHos: File | any = null;
    reqdocattHos: ApplyMTDocattModel[] = [];
    selecteddocattHos: ApplyMTDocattModel = new ApplyMTDocattModel();
    handleFileHosInputDoclist(file: FileList) {
        this.fileDocToUploadHos = file.item(0);
    }
    doGetFileHos() {
        var tmp = new ApplyMTDocattModel();
        tmp.company_code = this.initial_current.CompCode
        tmp.worker_code = this.selectedReqworker.worker_code
        tmp.job_type = "HOUSE"
        this.applyworkService.getreq_filelist(tmp).then((res) => {
            this.reqdocattHos = res;
        })
    }
    doUploadFileHos() {
        const filename = "REQ_HOUSE" + this.datePipe.transform(new Date(), 'yyyyMMddHHmmss');
        const filetype = this.fileDocToUploadHos.name.split(".")[1];
        this.applyworkService.file_attach(this.fileDocToUploadHos, filename, filetype).then((res) => {
            this.reqdocattHos = [];
            if (res.success) {
                this.reqdocattHos = this.reqdocattHos.concat({
                    company_code: this.selectedReqworker.company_code || this.initial_current.CompCode,
                    worker_code: this.selectedReqworker.worker_code,
                    document_id: 0,
                    job_type: "HOUSE",
                    job_id: this.selectedReqworker.worker_id.toString(),
                    document_name: filename + "." + filetype,
                    document_type: this.fileDocToUploadHos.type,
                    document_path: res.message,
                    created_by: this.initial_current.Username,
                    created_date: new Date().toISOString()
                })
                this.UploadfileHos = false;
                this.messageService.add({ severity: 'success', summary: 'Success', detail: res.message });
            }
            else {
                this.messageService.add({ severity: 'error', summary: 'Error', detail: res.message });
            }
            this.fileDocToUploadHos = null;
        });
    }

    UploadfileHosdoc() {
        if (this.fileDocToUploadHos) {
            this.confirmationService.confirm({
                message: this.title_confirm + this.fileDocToUploadHos.name,
                header: this.title_import,
                icon: 'pi pi-exclamation-triangle',
                accept: () => {
                    this.fileUploader.nativeElement.value = null;
                    this.UploadfileHos = false;
                    this.doUploadFileHos();
                },
                reject: () => {
                    this.UploadfileHos = false;
                }
            });
        } else {
            this.messageService.add({ severity: 'warn', summary: 'File', detail: "Please choose a file." });
        }
    }
    DeleteFileHos(data: ApplyMTDocattModel) {
        this.confirmationService.confirm({
            message: this.title_confirm_delete + data.document_name,
            header: this.title_delete,
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                if (data.document_id) {
                    this.applyworkService.delete_file(data).then((res) => {
                        if (res.success) {
                            this.messageService.add({ severity: 'success', summary: 'Success', detail: res.message });
                        } else {
                            this.messageService.add({ severity: 'error', summary: 'Error', detail: res.message });
                        }
                    })
                } else {
                    this.reqdocattHos = this.reqdocattHos.filter((item) => {
                        return item !== data;
                    });
                }
                this.applyworkService.deletefilepath_file(data.document_path).then((res) => {
                    if (res.success) {
                        this.messageService.add({ severity: 'success', summary: 'Success', detail: res.message });
                        this.reqdocattHos = this.reqdocattHos.filter((item) => {
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
    async doGetReqAttfileHos(file_path: string, type: string) {
        this.applyworkService.get_file(file_path).then((res) => {
            var url = window.URL.createObjectURL(new Blob([new Uint8Array(res)], { type: type }));
            window.open(url);
            this.selecteddocattHos = new ApplyMTDocattModel();
        })
    }
    onRowSelectfileHos(event: Event) {
        // this.doGetReqAttfileHos(this.selecteddocattHos.document_path, this.selecteddocattHos.document_type)
    }
    record_fileHos() {
        if (this.reqdocattHos.length == 0) {
            return;
        }
        this.applyworkService.record_reqfile(this.selectedReqworker.worker_code, this.reqdocattHos,"HOUSE").then((res) => {
            let result = JSON.parse(res);
            if (result.success) {
            } else {
            }
        })
    }
    //end

    //Attach File Photo
    UploadfilePho: boolean = false;
    fileDocToUploadPho: File | any = null;
    reqdocattPho: ApplyMTDocattModel[] = [];
    selecteddocattPho: ApplyMTDocattModel = new ApplyMTDocattModel();
    handleFilePhoInputDoclist(file: FileList) {
        this.fileDocToUploadPho = file.item(0);
    }
    doGetFilePho() {
        var tmp = new ApplyMTDocattModel();
        tmp.company_code = this.initial_current.CompCode
        tmp.worker_code = this.selectedReqworker.worker_code
        tmp.job_type = "PHOID"
        this.applyworkService.getreq_filelist(tmp).then((res) => {
            this.reqdocattPho = res;
        })
    }
    doUploadFilePho() {
        const filename = "REQ_PHO" + this.datePipe.transform(new Date(), 'yyyyMMddHHmmss');
        const filetype = this.fileDocToUploadPho.name.split(".")[1];
        this.applyworkService.file_attach(this.fileDocToUploadPho, filename, filetype).then((res) => {
            this.reqdocattPho = [];
            if (res.success) {
                this.reqdocattPho = this.reqdocattPho.concat({
                    company_code: this.selectedReqworker.company_code || this.initial_current.CompCode,
                    worker_code: this.selectedReqworker.worker_code,
                    document_id: 0,
                    job_type: "PHOID",
                    job_id: this.selectedReqworker.worker_id.toString(),
                    document_name: filename + "." + filetype,
                    document_type: this.fileDocToUploadPho.type,
                    document_path: res.message,
                    created_by: this.initial_current.Username,
                    created_date: new Date().toISOString()
                })
                this.UploadfilePho = false;
                this.messageService.add({ severity: 'success', summary: 'Success', detail: res.message });
            }
            else {
                this.messageService.add({ severity: 'error', summary: 'Error', detail: res.message });
            }
            this.fileDocToUploadPho = null;
        });
    }

    UploadfilePhodoc() {
        if (this.fileDocToUploadPho) {
            this.confirmationService.confirm({
                message: this.title_confirm + this.fileDocToUploadApp.name,
                header: this.title_import,
                icon: 'pi pi-exclamation-triangle',
                accept: () => {
                    this.fileUploader.nativeElement.value = null;
                    this.UploadfilePho = false;
                    this.doUploadFilePho();
                },
                reject: () => {
                    this.UploadfilePho = false;
                }
            });
        } else {
            this.messageService.add({ severity: 'warn', summary: 'File', detail: "Please choose a file." });
        }
    }
    DeleteFilePho(data: ApplyMTDocattModel) {
        this.confirmationService.confirm({
            message: this.title_confirm_delete + data.document_name,
            header: this.title_delete,
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                if (data.document_id) {
                    this.applyworkService.delete_file(data).then((res) => {
                        if (res.success) {
                            this.messageService.add({ severity: 'success', summary: 'Success', detail: res.message });
                        } else {
                            this.messageService.add({ severity: 'error', summary: 'Error', detail: res.message });
                        }
                    })
                } else {
                    this.reqdocattPho = this.reqdocattPho.filter((item) => {
                        return item !== data;
                    });
                }
                this.applyworkService.deletefilepath_file(data.document_path).then((res) => {
                    if (res.success) {
                        this.messageService.add({ severity: 'success', summary: 'Success', detail: res.message });
                        this.reqdocattPho = this.reqdocattPho.filter((item) => {
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
    async doGetReqAttfilePho(file_path: string, type: string) {
        this.applyworkService.get_file(file_path).then((res) => {
            var url = window.URL.createObjectURL(new Blob([new Uint8Array(res)], { type: type }));
            window.open(url);
            this.selecteddocattPho = new ApplyMTDocattModel();
        })
    }
    onRowSelectfilePho(event: Event) {
        // this.doGetReqAttfileApp(this.selecteddocattPho.document_path, this.selecteddocattPho.document_type)
    }
    record_filePho() {
        if (this.reqdocattPho.length == 0) {
            return;
        }
        this.applyworkService.record_reqfile(this.selectedReqworker.worker_code, this.reqdocattPho,"PHOID").then((res) => {
            let result = JSON.parse(res);
            if (result.success) {
            } else {
            }
        })
    }
    //end

    //Attach File PDPA
    UploadfilePDPA: boolean = false;
    fileDocToUploadPDPA: File | any = null;
    reqdocattPDPA: ApplyMTDocattModel[] = [];
    selecteddocattPDPA: ApplyMTDocattModel = new ApplyMTDocattModel();
    handleFilePDPAInputDoclist(file: FileList) {
        this.fileDocToUploadPDPA = file.item(0);
    }
    doGetFilePDPA() {
        var tmp = new ApplyMTDocattModel();
        tmp.company_code = this.initial_current.CompCode
        tmp.worker_code = this.selectedReqworker.worker_code
        tmp.job_type = "PDPA"
        this.applyworkService.getreq_filelist(tmp).then((res) => {
            this.reqdocattPDPA = res;
        })
    }
    doUploadFilePDPA() {
        const filename = "REQ_PDPA" + this.datePipe.transform(new Date(), 'yyyyMMddHHmmss');
        const filetype = this.fileDocToUploadPDPA.name.split(".")[1];
        this.applyworkService.file_attach(this.fileDocToUploadPDPA, filename, filetype).then((res) => {
            this.reqdocattPDPA = [];
            if (res.success) {
                this.reqdocattPDPA = this.reqdocattPDPA.concat({
                    company_code: this.selectedReqworker.company_code || this.initial_current.CompCode,
                    worker_code: this.selectedReqworker.worker_code,
                    document_id: 0,
                    job_type: "PDPA",
                    job_id: this.selectedReqworker.worker_id.toString(),
                    document_name: filename + "." + filetype,
                    document_type: this.fileDocToUploadPDPA.type,
                    document_path: res.message,
                    created_by: this.initial_current.Username,
                    created_date: new Date().toISOString()
                })
                this.UploadfilePDPA = false;
                this.messageService.add({ severity: 'success', summary: 'Success', detail: res.message });
            }
            else {
                this.messageService.add({ severity: 'error', summary: 'Error', detail: res.message });
            }
            this.fileDocToUploadPDPA = null;
        });
    }

    UploadfilePDPAdoc() {
        if (this.fileDocToUploadPDPA) {
            this.confirmationService.confirm({
                message: this.title_confirm + this.fileDocToUploadPDPA.name,
                header: this.title_import,
                icon: 'pi pi-exclamation-triangle',
                accept: () => {
                    this.fileUploader.nativeElement.value = null;
                    this.UploadfilePDPA = false;
                    this.doUploadFilePDPA();
                },
                reject: () => {
                    this.UploadfilePDPA = false;
                }
            });
        } else {
            this.messageService.add({ severity: 'warn', summary: 'File', detail: "Please choose a file." });
        }
    }
    DeleteFilePDPA(data: ApplyMTDocattModel) {
        this.confirmationService.confirm({
            message: this.title_confirm_delete + data.document_name,
            header: this.title_delete,
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                if (data.document_id) {
                    this.applyworkService.delete_file(data).then((res) => {
                        if (res.success) {
                            this.messageService.add({ severity: 'success', summary: 'Success', detail: res.message });
                        } else {
                            this.messageService.add({ severity: 'error', summary: 'Error', detail: res.message });
                        }
                    })
                } else {
                    this.reqdocattPDPA = this.reqdocattPDPA.filter((item) => {
                        return item !== data;
                    });
                }
                this.applyworkService.deletefilepath_file(data.document_path).then((res) => {
                    if (res.success) {
                        this.messageService.add({ severity: 'success', summary: 'Success', detail: res.message });
                        this.reqdocattPDPA = this.reqdocattPDPA.filter((item) => {
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
    async doGetReqAttfilePDPA(file_path: string, type: string) {
        this.applyworkService.get_file(file_path).then((res) => {
            var url = window.URL.createObjectURL(new Blob([new Uint8Array(res)], { type: type }));
            window.open(url);
            this.selecteddocattPDPA = new ApplyMTDocattModel();
        })
    }
    onRowSelectfilePDPA(event: Event) {
        // this.doGetReqAttfilePDPA(this.selecteddocattPDPA.document_path, this.selecteddocattPDPA.document_type)
    }
    record_filePDPA() {
        if (this.reqdocattPDPA.length == 0) {
            return;
        }
        this.applyworkService.record_reqfile(this.selectedReqworker.worker_code, this.reqdocattPDPA,"PDPA").then((res) => {
            let result = JSON.parse(res);
            if (result.success) {
            } else {
            }
        })
    }
    //end

    //Attach Medical Certificate
    UploadfileMCer: boolean = false;
    fileDocToUploadMCer: File | any = null;
    reqdocattMCer: ApplyMTDocattModel[] = [];
    selecteddocattMCer: ApplyMTDocattModel = new ApplyMTDocattModel();
    handleFileMCerInputDoclist(file: FileList) {
        this.fileDocToUploadMCer = file.item(0);
    }
    doGetFileMCer() {
        var tmp = new ApplyMTDocattModel();
        tmp.company_code = this.initial_current.CompCode
        tmp.worker_code = this.selectedReqworker.worker_code
        tmp.job_type = "MCER"
        this.applyworkService.getreq_filelist(tmp).then((res) => {
            this.reqdocattMCer = res;
        })
    }
    doUploadFileMCer() {
        const filename = "REQ_MCER" + this.datePipe.transform(new Date(), 'yyyyMMddHHmmss');
        const filetype = this.fileDocToUploadMCer.name.split(".")[1];
        this.applyworkService.file_attach(this.fileDocToUploadMCer, filename, filetype).then((res) => {
            this.reqdocattMCer = [];
            if (res.success) {
                this.reqdocattMCer = this.reqdocattMCer.concat({
                    company_code: this.selectedReqworker.company_code || this.initial_current.CompCode,
                    worker_code: this.selectedReqworker.worker_code,
                    document_id: 0,
                    job_type: "MCER",
                    job_id: this.selectedReqworker.worker_id.toString(),
                    document_name: filename + "." + filetype,
                    document_type: this.fileDocToUploadMCer.type,
                    document_path: res.message,
                    created_by: this.initial_current.Username,
                    created_date: new Date().toISOString()
                })
                this.UploadfileMCer = false;
                this.messageService.add({ severity: 'success', summary: 'Success', detail: res.message });
            }
            else {
                this.messageService.add({ severity: 'error', summary: 'Error', detail: res.message });
            }
            this.fileDocToUploadMCer = null;
        });
    }

    UploadfileMCerdoc() {
        if (this.fileDocToUploadMCer) {
            this.confirmationService.confirm({
                message: this.title_confirm + this.fileDocToUploadMCer.name,
                header: this.title_import,
                icon: 'pi pi-exclamation-triangle',
                accept: () => {
                    this.fileUploader.nativeElement.value = null;
                    this.UploadfileMCer = false;
                    this.doUploadFileMCer();
                },
                reject: () => {
                    this.UploadfileMCer = false;
                }
            });
        } else {
            this.messageService.add({ severity: 'warn', summary: 'File', detail: "Please choose a file." });
        }
    }
    DeleteFileMCer(data: ApplyMTDocattModel) {
        this.confirmationService.confirm({
            message: this.title_confirm_delete + data.document_name,
            header: this.title_delete,
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                if (data.document_id) {
                    this.applyworkService.delete_file(data).then((res) => {
                        if (res.success) {
                            this.messageService.add({ severity: 'success', summary: 'Success', detail: res.message });
                        } else {
                            this.messageService.add({ severity: 'error', summary: 'Error', detail: res.message });
                        }
                    })
                } else {
                    this.reqdocattMCer = this.reqdocattMCer.filter((item) => {
                        return item !== data;
                    });
                }
                this.applyworkService.deletefilepath_file(data.document_path).then((res) => {
                    if (res.success) {
                        this.messageService.add({ severity: 'success', summary: 'Success', detail: res.message });
                        this.reqdocattMCer = this.reqdocattMCer.filter((item) => {
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
    async doGetReqAttfileMCer(file_path: string, type: string) {
        this.applyworkService.get_file(file_path).then((res) => {
            var url = window.URL.createObjectURL(new Blob([new Uint8Array(res)], { type: type }));
            window.open(url);
            this.selecteddocattMCer = new ApplyMTDocattModel();
        })
    }
    onRowSelectfileMCer(event: Event) {
        // this.doGetReqAttfileMCer(this.selecteddocattMCer.document_path, this.selecteddocattMCer.document_type)
    }
    record_fileMCer() {
        if (this.reqdocattMCer.length == 0) {
            return;
        }
        this.applyworkService.record_reqfile(this.selectedReqworker.worker_code, this.reqdocattMCer,"MCER").then((res) => {
            let result = JSON.parse(res);
            if (result.success) {
            } else {
            }
        })
    }
    //end

    //Attach File Other
    UploadfileOther: boolean = false;
    fileDocToUploadOther: File | any = null;
    reqdocattOther: ApplyMTDocattModel[] = [];
    selecteddocattOther: ApplyMTDocattModel = new ApplyMTDocattModel();
    handleFileOtherInputDoclist(file: FileList) {
        this.fileDocToUploadOther = file.item(0);
    }
    doGetFileOther() {
        var tmp = new ApplyMTDocattModel();
        tmp.company_code = this.initial_current.CompCode
        tmp.worker_code = this.selectedReqworker.worker_code
        tmp.job_type = "OTHER"
        this.applyworkService.getreq_filelist(tmp).then((res) => {
            this.reqdocattOther = res;
        })
    }
    doUploadFileOther() {
        const filename = "REQ_OTHER" + this.datePipe.transform(new Date(), 'yyyyMMddHHmmss');
        const filetype = this.fileDocToUploadOther.name.split(".")[1];
        this.applyworkService.file_attach(this.fileDocToUploadOther, filename, filetype).then((res) => {
            this.reqdocattOther = [];
            if (res.success) {
                this.reqdocattOther = this.reqdocattOther.concat({
                    company_code: this.selectedReqworker.company_code || this.initial_current.CompCode,
                    worker_code: this.selectedReqworker.worker_code,
                    document_id: 0,
                    job_type: "OTHER",
                    job_id: this.selectedReqworker.worker_id.toString(),
                    document_name: filename + "." + filetype,
                    document_type: this.fileDocToUploadOther.type,
                    document_path: res.message,
                    created_by: this.initial_current.Username,
                    created_date: new Date().toISOString()
                })
                this.UploadfileOther = false;
                this.messageService.add({ severity: 'success', summary: 'Success', detail: res.message });
            }
            else {
                this.messageService.add({ severity: 'error', summary: 'Error', detail: res.message });
            }
            this.fileDocToUploadOther = null;
        });
    }

    UploadfileOtherdoc() {
        if (this.fileDocToUploadOther) {
            this.confirmationService.confirm({
                message: this.title_confirm + this.fileDocToUploadOther.name,
                header: this.title_import,
                icon: 'pi pi-exclamation-triangle',
                accept: () => {
                    this.fileUploader.nativeElement.value = null;
                    this.UploadfileOther = false;
                    this.doUploadFileOther();
                },
                reject: () => {
                    this.UploadfileOther = false;
                }
            });
        } else {
            this.messageService.add({ severity: 'warn', summary: 'File', detail: "Please choose a file." });
        }
    }
    DeleteFileOther(data: ApplyMTDocattModel) {
        this.confirmationService.confirm({
            message: this.title_confirm_delete + data.document_name,
            header: this.title_delete,
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                if (data.document_id) {
                    this.applyworkService.delete_file(data).then((res) => {
                        if (res.success) {
                            this.messageService.add({ severity: 'success', summary: 'Success', detail: res.message });
                        } else {
                            this.messageService.add({ severity: 'error', summary: 'Error', detail: res.message });
                        }
                    })
                } else {
                    this.reqdocattOther = this.reqdocattOther.filter((item) => {
                        return item !== data;
                    });
                }
                this.applyworkService.deletefilepath_file(data.document_path).then((res) => {
                    if (res.success) {
                        this.messageService.add({ severity: 'success', summary: 'Success', detail: res.message });
                        this.reqdocattOther = this.reqdocattOther.filter((item) => {
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
    async doGetReqAttfileOther(file_path: string, type: string) {
        this.applyworkService.get_file(file_path).then((res) => {
            var url = window.URL.createObjectURL(new Blob([new Uint8Array(res)], { type: type }));
            window.open(url);
            this.selecteddocattOther = new ApplyMTDocattModel();
        })
    }
    onRowSelectfileOther(event: Event) {
        // this.doGetReqAttfileOther(this.selecteddocattOther.document_path, this.selecteddocattOther.document_type)
    }
    record_fileOther() {
        if (this.reqdocattOther.length == 0) {
            return;
        }
        this.applyworkService.record_reqfile(this.selectedReqworker.worker_code, this.reqdocattOther,"OTHER").then((res) => {
            let result = JSON.parse(res);
            if (result.success) {
            } else {
            }
        })
    }

    viewAttfile(data: ApplyMTDocattModel) {
        this.doGetReqAttfileApp(data.document_path, data.document_type)
    }
    //end

    //get worker name
    doGetWorkerDetail(WorkerCode: string): any {
        for (let i = 0; i < this.suggest_List.length; i++) {
            if (this.suggest_List[i].worker_code == WorkerCode) {
                if (this.initial_current.Language == "TH") {
                    return this.suggest_List[i].worker_code + " - " + this.suggest_List[i].worker_fname_th + " " + this.suggest_List[i].worker_lname_th;
                }
                else {
                    return this.suggest_List[i].worker_code + " - " + this.suggest_List[i].worker_fname_en + " " + this.suggest_List[i].worker_lname_en;
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
    //get position name
    doGetPositionDetail(PositionCode: string): any {
        for (let i = 0; i < this.position_list.length; i++) {
            if (this.position_list[i].request_position == PositionCode) {
                if (this.initial_current.Language == "TH") {
                    return this.position_list[i].request_code + " - " + this.position_list[i].position_name_th;
                }
                else {
                    return this.position_list[i].request_code + " - " + this.position_list[i].position_name_en;
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

    //get procjet name
    doGetProjectDetail(ProjectCode: string): any {
        for (let i = 0; i < this.projectList.length; i++) {
            if (this.projectList[i].request_project == ProjectCode) {
                if (this.initial_current.Language == "TH") {
                    return this.position_list[i].request_code + " - " + this.projectList[i].project_name_th;
                }
                else {
                    return this.position_list[i].request_code + " - " + this.projectList[i].project_name_en;
                }
            }
        }
    }

    //get item name
    doGetitemDetail(itemCode: string): any {
        for (let i = 0; i < this.itemList.length; i++) {
            if (this.itemList[i].item_code == itemCode) {
                if (this.initial_current.Language == "TH") {
                    return this.itemList[i].item_name_th;
                }
                else {
                    return this.itemList[i].item_name_en;
                }
            }
        }
    }

    //age Calculate
    age: string = "";
    CalculateAge() {
        if (this.selectedReqworker.worker_birthdate) {
            let timeDiff = Math.abs(Date.now() - this.selectedReqworker.worker_birthdate.getTime());
            let agediff = Math.floor((timeDiff / (1000 * 3600 * 24)) / 365)
            if (this.initial_current.Language == 'TH') {
                this.age = agediff + " ปี"
            } else {
                this.age = agediff + " Year"
            }
        }
    }

    blacklist: string = "";
    history: string = "";
    getBlackList() {
        if (this.selectedReqworker.checkblacklist) {
            if (this.initial_current.Language == "TH") {
                this.blacklist = "มีประวัติเบล็คลิสต์"
            } else {
                this.blacklist = "Have Blacklist"
            }
        }
    }
    getHistoryList() {
        if (this.selectedReqworker.checkhistory) {
            if (this.initial_current.Language == "TH") {
                this.history = "มีประวัติเคยทำงาน"
            } else {
                this.history = "Have Work History"
            }
        }
    }

}
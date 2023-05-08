import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
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

@Component({
    selector: 'app-recruitment-apply',
    templateUrl: './recruitment-apply.component.html',
    styleUrls: ['./recruitment-apply.component.scss'],
})
export class RecruitmentApplyComponent implements OnInit {
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

    //menu emplocation
    menu_emplocation: MenuItem[] = [];
    edit_emplocation: boolean = false;
    new_emplocation: boolean = false;
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
        private empdetailService: EmpDetailService,

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

        private addresstypeService: AddresstypeService
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
    }

    ngOnInit(): void {
        this.route.queryParams.subscribe((params) => {
            this.req_code = params['applycode'];
            console.log(this.req_code);
        });

        this.doGetInitialCurrent();

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

        setTimeout(() => {
            this.doLoadMenu();
        }, 100);

        setTimeout(() => {
            if (this.req_code != '') {
                this.doLoadApplywork();
            }
        }, 400);
    }

    public initial_current: InitialCurrent = new InitialCurrent();
    doGetInitialCurrent() {
        this.initial_current = JSON.parse(
            localStorage.getItem(AppConfig.SESSIONInitial) || '{}'
        );
        if (!this.initial_current) {
            this.router.navigateByUrl('');
        }
    }

    title_page: string = 'Employee Management';
    title_new: string = 'New';
    title_edit: string = 'Edit';
    title_delete: string = 'Delete';
    title_import: string = 'Import';
    title_export: string = 'Export';
    title_save: string = 'Save';
    title_code: string = 'Code';

    title_summit: string = 'Summit';
    title_cancel: string = 'Cancel';

    title_genaral: string = 'Genaral';
    title_empid: string = 'Employee ID';
    title_cardid: string = 'Employee Card';
    title_fname_th: string = 'First Name (Thai)';
    title_lname_th: string = 'Last Name (Thai)';
    title_fname_en: string = 'First Name (Eng.)';
    title_lname_en: string = 'Last Name (Eng.)';
    title_initial: string = 'Initial';
    title_gender: string = 'Gender';
    male_gender: string = 'Male';
    female_gender: string = 'Female';
    title_emplocation: string = 'Location';
    title_empbranch: string = 'Branch';
    title_type: string = 'Employee Type';
    title_status: string = 'Employee Status';
    title_birthdate: string = 'Birth Date';
    title_startdate: string = 'Start Date';
    title_hrs: string = 'Hour/Day';
    title_probation: string = 'Probation';
    title_probationdate: string = 'Probation Date';
    title_probationenddate: string = 'Probation End';
    title_resignstatus: string = 'Resign Status';
    title_resigndate: string = 'Resign Date';
    title_resignreason: string = 'Resign Reason';

    title_personal: string = 'Personal';
    title_religion: string = 'Religion';
    title_blood: string = 'Blood';
    title_weight: string = 'Weight';
    title_height: string = 'Height';
    title_address: string = 'Address';
    title_card: string = 'Card';
    title_bank: string = 'Bank';
    title_family: string = 'Family';
    title_hospital: string = 'Hospital';
    title_foreigner: string = 'Foreigner';

    title_record: string = 'Record';
    title_department: string = 'Department';
    title_position: string = 'Position';
    title_training: string = 'Training';
    title_education: string = 'Education';
    title_assessment: string = 'Assessment';
    title_criminal: string = 'Criminal Record';

    title_finance: string = 'Finance';
    title_taxmethod: string = 'Tax Method';
    title_salary: string = 'Salary';
    title_benefit: string = 'Benefit';
    title_fund: string = 'Provident Fund';
    title_reduce: string = 'Reduces';
    title_accumulate: string = 'Accumalate';

    title_tranfer: string = 'Tranfer record';

    title_modified_by: string = 'Edit by';
    title_modified_date: string = 'Edit date';
    title_search: string = 'Search';
    title_upload: string = 'Upload';

    title_page_from: string = 'Showing';
    title_page_to: string = 'to';
    title_page_total: string = 'of';
    title_page_record: string = 'entries';

    title_confirm: string = 'Are you sure?';
    title_confirm_record: string = 'Confirm to record';
    title_confirm_delete: string = 'Confirm to delete';
    title_confirm_yes: string = 'Yes';
    title_confirm_no: string = 'No';

    title_confirm_cancel: string = 'You have cancelled';

    doLoadLanguage() {
        if (this.initial_current.Language == 'TH') {
            this.title_page = 'ข้อมูลสถานที่ปฎิบัติงาน';
            this.title_new = 'เพิ่ม';
            this.title_edit = 'แก้ไข';
            this.title_delete = 'ลบ';
            this.title_import = 'นำเข้า';
            this.title_export = 'โอนออก';
            this.title_save = 'บันทึก';

            this.title_summit = 'บันทึก';
            this.title_cancel = 'ยกเลิก';

            this.title_genaral = 'ข้อมูลทั่วไป';
            this.title_code = 'รหัสพนักงาน';
            this.title_cardid = 'รหัสบัตร';
            this.title_fname_th = 'ชื่อจริง (ไทย)';
            this.title_lname_th = 'นามสกุล (ไทย)';
            this.title_fname_en = 'ชื่อจริง (อังกฤษ)';
            this.title_lname_en = 'นามสกุล (อังกฤษ)';
            this.title_initial = 'คำนำหน้า';
            this.title_gender = 'เพศ';
            this.male_gender = 'ชาย';
            this.female_gender = 'หญิง';
            this.title_emplocation = 'สถานที่ปฏิบัติงาน';
            this.title_empbranch = 'สาขา';
            this.title_type = 'ประเภทพนักงาน';
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
            this.title_criminal = 'ประวัติการตรวจสอบอาชญากรรม';

            this.title_finance = 'การเงิน';
            this.title_taxmethod = 'การคำนวนภาษี';
            this.title_salary = 'เงินเดือน/ค่าจ้าง';
            this.title_benefit = 'สวัสดิการ';
            this.title_fund = 'กองทุนสำรองเลี้ยงชีพ';
            this.title_reduce = 'ค่าลดหย่อน';
            this.title_accumulate = 'รายได้สะสม/ภาษีสะสม';

            this.title_tranfer = 'ประวัติการโอนย้ายหน่วยงาน';

            this.title_modified_by = 'ผู้ทำรายการ';
            this.title_modified_date = 'วันที่ทำรายการ';
            this.title_search = 'ค้นหา';
            this.title_upload = 'อัพโหลด';

            this.title_page_from = 'แสดง';
            this.title_page_to = 'ถึง';
            this.title_page_total = 'จาก';
            this.title_page_record = 'รายการ';

            this.title_confirm = 'ยืนยันการทำรายการ';
            this.title_confirm_record = 'คุณต้องการบันทึกการทำรายการ';
            this.title_confirm_delete = 'คุณต้องการลบรายการ';

            this.title_confirm_yes = 'ใช่';
            this.title_confirm_no = 'ยกเลิก';
            this.title_confirm_cancel = 'คุณยกเลิกการทำรายการ';
        }
    }

    doLoadMenu() {
        //menumain
        this.toolbar_menu = [
            {
                label: 'Back',
                icon: 'pi-arrow-left',
                command: (event) => {
                    this.router.navigateByUrl('recruitment/applylist');
                },
            },
            {
                label: 'Save',
                icon: 'pi pi-fw pi-save',
                command: (event) => {
                    // console.log('Save')
                    this.confirmRecord();
                },
            },
        ];
        //menu location
        this.menu_emplocation = [
            {
                label: 'New',
                icon: 'pi pi-fw pi-plus',
                command: (event) => {
                    this.clearManage();
                    this.new_emplocation = true;
                    var ref = this.emplocationList.length + 100;
                    this.selectedEmpLocation = new EmpLocationModel();
                    this.selectedEmpLocation.emplocation_id = ref.toString();
                    this.showManage();
                },
            },
            {
                label: 'Edit',
                icon: 'pi pi-fw pi-pencil',
                command: (event) => {
                    this.clearManage();
                    if (this.selectedEmpLocation != null) {
                        this.edit_emplocation = true;
                        this.showManage();
                    }
                },
            },
            {
                label: 'Delete',
                icon: 'pi pi-fw pi-trash',
                command: (event) => {
                    if (this.selectedEmpLocation != null) {
                        this.emplocation_remove();
                    }
                },
            },
        ];
        //menu address
        this.menu_reqaddress = [
            {
                label: 'New',
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
                label: 'Edit',
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
                label: 'Delete',
                icon: 'pi pi-fw pi-trash',
                command: (event) => {
                    if (this.selectedReqAddress != null) {
                        this.reqaddress_remove();
                    }
                },
            },
            {
                label: 'Import',
                icon: 'pi pi-fw pi-file-import',
                command: (event) => {
                    console.log('IMPORT');
                },
            },
            {
                label: 'Export',
                icon: 'pi pi-fw pi-file-export',
                command: (event) => {},
            },
        ];
        //menu card
        this.menu_reqcard = [
            {
                label: 'New',
                icon: 'pi pi-fw pi-plus',
                command: (event) => {
                    this.clearManage();
                    this.new_card = true;
                    var ref = this.reqcardList.length + 100;
                    this.selectedReqcard = new ReqcardModel();
                    this.selectedReqcard.card_id = ref.toString();
                    this.showManage();
                },
            },
            {
                label: 'Edit',
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
                label: 'Delete',
                icon: 'pi pi-fw pi-trash',
                command: (event) => {
                    if (this.selectedReqcard != null) {
                        this.reqcard_remove();
                    }
                },
            },
            {
                label: 'Import',
                icon: 'pi pi-fw pi-file-import',
                command: (event) => {},
            },
            {
                label: 'Export',
                icon: 'pi pi-fw pi-file-export',
                command: (event) => {},
            },
        ];
        //menu education
        this.menu_reqeducation = [
            {
                label: 'New',
                icon: 'pi pi-fw pi-plus',
                command: (event) => {
                    console.log('NEW');
                    this.clearManage();
                    this.new_education = true;
                    var ref = this.reqeducationList.length + 100;
                    this.selectedReqeducation = new ReqEducationModel();
                    this.selectedReqeducation.reqeducation_no = ref.toString();
                    this.showManage();
                },
            },
            {
                label: 'Edit',
                icon: 'pi pi-fw pi-pencil',
                command: (event) => {
                    console.log('EDIT');
                    this.clearManage();
                    if (this.selectedReqeducation != null) {
                        this.edit_reqeducation = true;
                        this.showManage();
                    }
                },
            },
            {
                label: 'Delete',
                icon: 'pi pi-fw pi-trash',
                command: (event) => {
                    if (this.selectedReqeducation != null) {
                        this.reqeducation_remove();
                    }
                },
            },
            {
                label: 'Import',
                icon: 'pi pi-fw pi-file-import',
                command: (event) => {
                    console.log('IMPORT');
                },
            },
            {
                label: 'Export',
                icon: 'pi pi-fw pi-file-export',
                command: (event) => {
                    console.log('EXPORT');
                },
            },
        ];
        //menu training
        this.menu_reqtraining = [
            {
                label: 'New',
                icon: 'pi pi-fw pi-plus',
                command: (event) => {
                    console.log('NEW');
                    this.clearManage();
                    this.new_training = true;
                    var ref = this.reqtrainingList.length + 100;
                    this.selectedReqtraining = new ReqTrainingModel();
                    this.selectedReqtraining.reqtraining_no = ref.toString();
                    this.showManage();
                },
            },
            {
                label: 'Edit',
                icon: 'pi pi-fw pi-pencil',
                command: (event) => {
                    console.log('EDIT');
                    this.clearManage();
                    if (this.selectedReqtraining != null) {
                        this.edit_reqtraining = true;
                        this.showManage();
                    }
                },
            },
            {
                label: 'Delete',
                icon: 'pi pi-fw pi-trash',
                command: (event) => {
                    if (this.selectedReqtraining != null) {
                        this.reqtraining_remove();
                    }
                },
            },
            {
                label: 'Import',
                icon: 'pi pi-fw pi-file-import',
                command: (event) => {
                    console.log('IMPORT');
                },
            },
            {
                label: 'Export',
                icon: 'pi pi-fw pi-file-export',
                command: (event) => {
                    console.log('EXPORT');
                },
            },
        ];
    }

    tabChange(e: { index: any }) {
        var index = e.index;
        //
        this.edit_emplocation = false;
        this.new_emplocation = false;
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

        this.displayManage = false;
    }

    position: string = 'right';
    showManage() {
        this.displayManage = true;

        if (this.initial_current.Language == 'EN') {
            if (this.new_emplocation || this.edit_emplocation) {
                this.manage_title = 'Location';
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
            }
        } else {
            if (this.new_emplocation || this.edit_emplocation) {
                this.manage_title = 'สถานที่ปฏิบัติงาน';
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
            }
        }
    }

    doLoadApplywork() {
        var reqworker_list: EmployeeModel[] = [];
        this.applyworkService
            .reqworker_get(this.initial_current.CompCode, this.req_code)
            .then(async (res) => {
                await res.forEach((element: EmployeeModel) => {
                    element.worker_birthdate = new Date(
                        element.worker_birthdate
                    );
                    element.worker_hiredate = new Date(
                        element.worker_hiredate
                    );
                    
                });

                reqworker_list = await res;

                if (reqworker_list.length > 0) {
                    this.selectedReqworker = reqworker_list[0];

                    setTimeout(() => {
                        this.doLoadReqaddressList();
                        this.doLoadReqcardList();
                        
                        this.doLoadReqeducationList();
                        this.doLoadReqtrainingList();
                        
                    }, 300);
                }
            });
    }

    //get data dropdown
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
    // สถานศึกษา
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
    onRowSelectReqAddress(event: Event) {}
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
    reqaddress_delete() {}
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
            return;
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
    reqcardList: ReqcardModel[] = [];
    selectedReqcard: ReqcardModel = new ReqcardModel();
    doLoadReqcardList() {
        this.reqdetailService
            .getapplywork_card(this.initial_current.CompCode, this.req_code)
            .then(async (res) => {
                await res.forEach((element: ReqcardModel) => {
                    element.card_issue = new Date(element.card_issue);
                    element.card_expire = new Date(element.card_expire);
                });
                this.reqcardList = await res;

                if (this.reqcardList.length > 0) {
                    this.selectedReqcard = this.reqcardList[0];
                }
            });
    }
    onRowSelectReqCard(event: Event) {}
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
    reqcard_delete() {}
    reqcard_cancel() {
        this.new_card = false;
        this.edit_reqcard = false;
        this.displayManage = false;
    }
    reqcard_addItem(model: ReqcardModel) {
        const itemNew: ReqcardModel[] = [];
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
            return;
        }
        this.reqdetailService
            .record_reqcard(
                this.selectedApplywork.applywork_code,
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
    reqforeignerList: ReqForeignerModel[] = [];
    selectedReqforeigner: ReqForeignerModel = new ReqForeignerModel();
    doLoadReqForeigner() {
        this.reqdetailService
            .getapplywork_foreigner(
                this.initial_current.CompCode,
                this.req_code
            )
            .then(async (res) => {
                await res.forEach((element: ReqForeignerModel) => {
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
            this.selectedApplywork.applywork_code,
            this.selectedReqforeigner
        );
    }

    //education
    reqeducationList: ReqEducationModel[] = [];
    selectedReqeducation: ReqEducationModel = new ReqEducationModel();
    doLoadReqeducationList() {
        this.reqdetailService
            .getapply_education(this.initial_current.CompCode, this.req_code)
            .then(async (res) => {
                await res.forEach((element: ReqEducationModel) => {
                    element.reqeducation_start = new Date(
                        element.reqeducation_start
                    );
                    element.reqeducation_finish = new Date(
                        element.reqeducation_finish
                    );
                });
                this.reqeducationList = await res;
                if (this.reqeducationList.length > 0) {
                    this.selectedReqeducation = this.reqeducationList[0];
                }
            });
    }
    onRowSelectReqeducation(event: Event) {}
    reqeducation_summit() {
        this.reqeducation_addItem(this.selectedReqeducation);
        this.new_education = false;
        this.edit_reqeducation = false;
        this.displayManage = false;
    }
    reqeducation_remove() {
        this.selectedReqeducation.reqeducation_no = '9999';
        this.reqeducation_addItem(this.selectedReqeducation);
        this.new_education = false;
        this.edit_reqeducation = false;
    }
    reqeducation_delete() {}
    reqeducation_cancel() {
        this.new_education = false;
        this.edit_reqeducation = false;
        this.displayManage = false;
    }
    reqeducation_addItem(model: ReqEducationModel) {
        const itemNew: ReqEducationModel[] = [];
        for (let i = 0; i < this.reqeducationList.length; i++) {
            if (
                this.reqeducationList[i].reqeducation_no ==
                model.reqeducation_no
            ) {
                //-- Notting
            } else {
                itemNew.push(this.reqeducationList[i]);
            }
        }
        //-- 9999 for delete
        if (model.reqeducation_no != '9999') {
            itemNew.push(model);
        }
        this.reqeducationList = [];
        this.reqeducationList = itemNew;
        this.reqeducationList.sort(function (a, b) {
            return parseInt(a.reqeducation_no) - parseInt(b.reqeducation_no);
        });
    }
    record_reqeducation() {
        if (this.reqeducationList.length == 0) {
            return;
        }
        this.reqdetailService
            .record_reqeducation(
                // this.selectedEmployee.worker_code,
                this.selectedApplywork.applywork_code,
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
    reqtrainingList: ReqTrainingModel[] = [];
    selectedReqtraining: ReqTrainingModel = new ReqTrainingModel();
    doLoadReqtrainingList() {
        this.reqdetailService
            .getapplywork_training(this.initial_current.CompCode, this.req_code)
            .then(async (res) => {
                await res.forEach((element: ReqTrainingModel) => {
                    element.reqtraining_start = new Date(
                        element.reqtraining_start
                    );
                    element.reqtraining_finish = new Date(
                        element.reqtraining_finish
                    );
                });
                this.reqtrainingList = await res;
                if (this.reqtrainingList.length > 0) {
                    this.selectedReqtraining = this.reqtrainingList[0];
                }
            });
    }
    onRowSelectReqtraining(event: Event) {}
    reqtraining_summit() {
        this.reqtraining_addItem(this.selectedReqtraining);
        this.new_training = false;
        this.edit_reqtraining = false;
        this.displayManage = false;
    }
    reqtraining_remove() {
        this.selectedReqtraining.reqtraining_no = '9999';
        this.reqtraining_addItem(this.selectedReqtraining);
        this.new_education = false;
        this.edit_reqeducation = false;
    }
    reqtraining_delete() {}
    reqtraining_cancel() {
        this.new_training = false;
        this.edit_reqtraining = false;
        this.displayManage = false;
    }
    reqtraining_addItem(model: ReqTrainingModel) {
        const itemNew: ReqTrainingModel[] = [];
        for (let i = 0; i < this.reqtrainingList.length; i++) {
            if (
                this.reqtrainingList[i].reqtraining_no == model.reqtraining_no
            ) {
                //-- Notting
            } else {
                itemNew.push(this.reqtrainingList[i]);
            }
        }
        //-- 9999 for delete
        if (model.reqtraining_no != '9999') {
            itemNew.push(model);
        }
        this.reqtrainingList = [];
        this.reqtrainingList = itemNew;
        this.reqtrainingList.sort(function (a, b) {
            return parseInt(a.reqtraining_no) - parseInt(b.reqtraining_no);
        });
    }
    record_reqtraining() {
        if (this.reqtrainingList.length == 0) {
            return;
        }
        this.reqdetailService
            .record_reqtraining(
                this.selectedApplywork.applywork_code,
                this.reqtrainingList
            )
            .then((res) => {
                let result = JSON.parse(res);
                if (result.success) {
                } else {
                }
            });
    }


    //emp location
    emplocationList: EmpLocationModel[] = [];
    selectedEmpLocation: EmpLocationModel = new EmpLocationModel();
    doLoadEmplocationList() {
        this.empdetailService
            .getworker_location(this.initial_current.CompCode, this.req_code)
            .then(async (res) => {
                await res.forEach((element: EmpLocationModel) => {
                    element.emplocation_startdate = new Date(
                        element.emplocation_startdate
                    );
                    element.emplocation_enddate = new Date(
                        element.emplocation_enddate
                    );
                });
                this.emplocationList = await res;
                if (this.emplocationList.length > 0) {
                    this.selectedEmpLocation = this.emplocationList[0];
                }
            });
    }
    onRowSelectEmpLocation(event: Event) {}
    emplocation_summit() {
        this.emplocation_addItem(this.selectedEmpLocation);
        this.new_emplocation = false;
        this.edit_emplocation = false;
        this.displayManage = false;
    }
    emplocation_remove() {
        this.selectedEmpLocation.emplocation_id = '9999';
        this.emplocation_addItem(this.selectedEmpLocation);
        this.new_emplocation = false;
        this.edit_emplocation = false;
    }
    emplocation_delete() {}
    emplocation_cancel() {
        this.new_emplocation = false;
        this.edit_emplocation = false;
        this.displayManage = false;
    }
    emplocation_addItem(model: EmpLocationModel) {
        const itemNew: EmpLocationModel[] = [];
        for (let i = 0; i < this.emplocationList.length; i++) {
            if (
                this.emplocationList[i].emplocation_id == model.emplocation_id
            ) {
                //-- Notting
            } else {
                itemNew.push(this.emplocationList[i]);
            }
        }
        //-- 9999 for delete
        if (model.emplocation_id != '9999') {
            itemNew.push(model);
        }
        this.emplocationList = [];
        this.emplocationList = itemNew;
        this.emplocationList.sort(function (a, b) {
            return parseInt(a.emplocation_id) - parseInt(b.emplocation_id);
        });
    }
    record_emplocation() {
        if (this.emplocationList.length == 0) {
            return;
        }
        this.empdetailService
            .record_emplocation(
                this.selectedReqworker.worker_code,
                this.emplocationList
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
            .reqworker_record(this.selectedReqworker)
            .then((res) => {
                let result = JSON.parse(res);

                if (result.success) {
                    //-- Transaction
                    this.record_emplocation();
                
                    this.record_reqaddress();
                    this.record_reqcard();
                    this.record_reqforeigner();

                    
                    this.record_reqeducation();
                    this.record_reqtraining();

                    this.messageService.add({
                        severity: 'success',
                        summary: 'Success',
                        detail: result.message,
                    });
                    this.router.navigateByUrl('recruitment/applylist');
                    this.doLoadApplywork();
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
            this.messageService.add({ severity: 'warn', summary: 'Cancelled', detail: this.title_confirm_cancel });
          }
        });
      }

    close() {
        this.new_applywork = false;
        this.selectedApplywork = new ApplyworkModel();
    }

    clearManage() {
        this.new_emplocation = false;
        this.edit_emplocation = false;
        
        this.new_reqaddress = false;
        this.edit_reqaddress = false;
        this.new_card = false;
        this.edit_reqcard = false;
        
        this.new_foreigner = false;
        this.edit_reqforeigner = false;
        
        this.new_education = false;
        this.edit_reqeducation = false;
        this.new_training = false;
        this.edit_reqtraining = false;
    }
}

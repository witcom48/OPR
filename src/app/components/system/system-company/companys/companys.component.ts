import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
    ConfirmationService, MegaMenuItem, MenuItem, MessageService,
} from 'primeng/api';
import { AppConfig } from '../../../../config/config';
import { InitialCurrent } from '../../../../config/initial_current';
//import model
import { BankModel } from 'src/app/models/system/policy/bank';

import { CompanyModel } from 'src/app/models/system/company';
import { CompanyService } from 'src/app/services/system/company.service';
import { ComaddressModel } from 'src/app/models/system/comaddress';
import { ComcardModel } from 'src/app/models/system/comcard';
import { CombankModel } from 'src/app/models/system/combank';
import { CompanyDetailService } from 'src/app/services/system/company_detail.service';
import { BankService } from 'src/app/services/system/policy/bank.service';
import { CardtypeService } from 'src/app/services/system/policy/cardtype.service';
import { CardtypeModel } from 'src/app/models/system/policy/cardtype';
import { AddresstypeService } from 'src/app/services/system/policy/addresstype.service';
import { AddresstypeModel } from 'src/app/models/system/policy/addresstype';
import { ProvinceModel } from 'src/app/models/system/policy/province';
import { ProvinceService } from 'src/app/services/system/policy/province.service';
import { DomSanitizer } from '@angular/platform-browser';
import { AccessdataModel } from 'src/app/models/system/security/accessdata';

interface City {
    name: string;
    code: string;
}
@Component({
    selector: 'app-companys',
    templateUrl: './companys.component.html',
    styleUrls: ['./companys.component.scss'],
})
export class CompanysComponent implements OnInit {

    accountTypes = [
        { type: 'Savings Account', name: 'ออมทรัพย์', code: '1' },
        { type: 'Fixed Deposit Account', name: 'เงินฝากประจำ', code: '2' },
        { type: 'Current Account', name: 'บัญชีกระแสรายวัน', code: '3' },
        { type: 'Salary Account', name: 'บัญชีเงินเดือน', code: '4' },
        { type: 'Investment Account', name: 'บัญชีเงินลงทุน', code: '5' },
        { type: 'Share Trading Account', name: 'บัญชีหุ้น', code: '6' },
        { type: 'Micro Savings Account', name: 'บัญชีเงินออมเด็ดขาด', code: '7' },
        { type: 'Expired Account', name: 'บัญชีเงินที่หมดอายุ', code: '8' },
        { type: 'Insurance Account', name: 'บัญชีประกันตัว', code: '9' },
        { type: 'Online Banking Account', name: 'บัญชีธนาคารออนไลน์', code: '10' }

    ];



    company_code: string = '';
    comaddress_type: string = '';
    manage_title: string = '';


    toolbar_menu: MenuItem[] = [];
    items: MenuItem[] = [];
    items_tab: MenuItem[] = [];

    company_list: CompanyModel[] = [];
    selectedCompany: CompanyModel = new CompanyModel();

    edit_company: boolean = false;
    new_company: boolean = false;

    //menu Comaddress th
    menu_comaddress: MenuItem[] = [];
    edit_comaddress: boolean = false;
    new_comaddress: boolean = false;
    //menu Comaddress en
    menu_comaddresseen: MenuItem[] = [];
    edit_comaddresseen: boolean = false;
    new_comaddresseen: boolean = false;

    onBankTypeChange(event: any): void {
        // console.log('Selected bank type:', event.target.value);
        // You can perform additional actions here
    }

    //menu Comaddress en
    menu_comaddressen: MenuItem[] = [];
    edit_comaddressen: boolean = false;
    new_comaddressen: boolean = false;

    //menu comcard
    menu_comcard: MenuItem[] = [];
    edit_comcard: boolean = false;
    new_card: boolean = false;
    //menu Combank
    menu_combank: MenuItem[] = [];
    edit_combank: boolean = false;
    new_bank: boolean = false;

    displayManage: boolean = false;

    constructor(
        private companyService: CompanyService,
        private router: Router,
        private route: ActivatedRoute,
        private messageService: MessageService,
        private confirmationService: ConfirmationService,
        private datePipe: DatePipe,
        private companyDetailService: CompanyDetailService,
        private sanitizer: DomSanitizer,

        //service
        private bankService: BankService,
        private cardtypeService: CardtypeService,
        private addresstypeService: AddresstypeService,
        private provinceService: ProvinceService
    ) { }

    ngOnInit(): void {
        this.route.queryParams.subscribe((params) => {
            this.company_code = params['companycode'];
            // console.log(this.company_code);
        });

        this.doGetInitialCurrent();

        // Dropdown
        this.doLoadbankList();
        this.doLoadcardList();
        this.doLoadaddressList();
        this.doLoadprovinceList();
        this.doLoadLanguage();

        setTimeout(() => {
            this.doLoadMenu();

        }, 100);

        setTimeout(() => {
            if (this.company_code != '') {
                this.doLoadCompany();
            }
        }, 400);



    }
    initialData2: InitialCurrent = new InitialCurrent();
    accessData: AccessdataModel = new AccessdataModel();
    public initial_current: InitialCurrent = new InitialCurrent();
    doGetInitialCurrent() {
        this.initial_current = JSON.parse(
            localStorage.getItem(AppConfig.SESSIONInitial) || '{}'
        );
        if (!this.initial_current) {
            this.router.navigateByUrl('login');
        }
        this.accessData = this.initialData2.dotGetPolmenu('SYS');

    }

    title_page_Company: string = 'Company';
    title_new: string = 'New';
    title_edit: string = 'Edit';
    title_delete: string = 'Delete';
    title_import: string = 'Import';
    title_export: string = 'Export';
    title_save: string = 'Save';
    title_code: string = 'Code';
    title_back: string = 'ฺBack';
    title_codes: string = 'Code';
    title_initials: string = 'Initials';
    title_thai_name: string = 'Name (Thai)';
    title_english_name: string = 'Name (Eng)';
    title_map: string = 'Map';


    title_taxpayer_identification_no: string = 'Taxpayer Identification No';
    title_provident_fund_no = 'Provident Fund No'
    title_provident_fund = 'Provident Fund '
    title_juristic_id: string = 'Juristic Id';
    title_hours_perday: string = 'Hours Perday';
    title_min_age: string = 'Min Age';
    title_max_age: string = 'Max Age';
    title_sso_no: string = 'Social Security Number';
    title_social_security_branch: string = 'Social Security Branch';
    title_payout_rate: string = 'Payout Rate';
    title_sso_company: string = 'SSO Company';
    title_sso_employee: string = 'SSO Employee';
    title_wage_rate: string = 'Wage rate';
    title_min_wage: string = 'Min Wage';
    title_max_wage: string = 'Max Wage';

    title_summit: string = 'Summit';
    title_cancel: string = 'Cancel';

    title_genaral: string = 'Genaral';

    title_fname_th: string = 'First Name (Thai)';
    title_lname_th: string = 'Last Name (Thai)';
    title_fname_en: string = 'First Name (Eng.)';
    title_lname_en: string = 'Last Name (Eng.)';
    title_initial: string = 'Initial';

    title_birthdate: string = 'Birth Date';
    title_startdate: string = 'Start Date';
    title_hrs: string = 'Hour/Day';
    title_probation: string = 'Probation';
    title_probationdate: string = 'Probation Date';
    title_probationenddate: string = 'Probation End';
    title_resignstatus: string = 'Resign Status';
    title_resigndate: string = 'Resign Date';
    title_resignreason: string = 'Resign Reason';


    title_card_type: string = 'Card Type';
    title_card_code: string = 'Card Code';
    title_card_opening_date: string = 'Card Opening Date';
    title_expiration_date: string = 'Expiration Date';
    title_combank_branch: string = 'Branch';
    title_banks: string = 'Bank';
    title_number: string = 'Account Number';
    title_bankaccount: string = 'Account Number';
    title_bankname: string = 'Name';
    title_banktype: string = 'Type';

    title_personal: string = 'Other Details';
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
    title_tax: string = 'Tax  ';

    title_salary: string = 'Salary';
    title_benefit: string = 'Benefit';
    title_fund: string = 'Provident Fund';
    title_reduce: string = 'Reduces';
    title_accumulate: string = 'Accumalate';

    title_tranfer: string = 'Tranfer record';

    title_address_th = 'Address (Thai)';
    title_address_en = 'Address (Eng)';

    title_modified_by: string = 'Edit by';
    title_modified_date: string = 'Edit date';
    title_search: string = 'Search';
    title_upload: string = 'Upload';
    title_employee_age: string = 'Employee Age';

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
    title_sso: string = 'Social Security'

    title_address_type: string = 'Type';
    title_address_no: string = 'No';
    title_address_moo: string = 'Moo';
    title_address_road: string = 'Road';
    title_address_soi: string = 'Soi';
    title_address_tambon: string = 'Tambon';
    title_address_amphur: string = 'Amphur';
    title_address_province: string = 'Province';
    title_address_zipcode: string = 'Zipcode';
    title_address_tel: string = 'Tel';
    title_address_email: string = 'Email';
    title_address_note: string = 'Note';
    title_address_line: string = 'Line';
    title_address_facebook: string = 'Facebook';
    title_contack: string = 'Contack';
    title_fax: string = 'Fax';
    doLoadLanguage() {
        if (this.initial_current.Language == 'TH') {
            this.title_page_Company = 'ข้อมูลบริษัท';
            this.title_new = 'เพิ่ม';
            this.title_edit = 'แก้ไข';
            this.title_delete = 'ลบ';
            this.title_import = 'นำเข้า';
            this.title_export = 'โอนออก';
            this.title_save = 'บันทึก';
            this.title_back = 'กลับ';
            this.title_codes = 'รหัสบริษัท';
            this.title_initials = 'ชื่อย่อ';
            this.title_thai_name = 'ชื่อ (ไทย)';
            this.title_english_name = 'ชื่อ (อังกฤษ)';
            this.title_map = 'แผนที่';
            this.title_contack = 'ข้อมูลติดต่อ';
            this.title_fax = 'แฟกซ์';
            this.title_combank_branch = 'สาขาธนาคาร';
            this.title_taxpayer_identification_no = 'เลขประจำตัวผู้เสียภาษี'
            this.title_juristic_id = 'เลขทะเบียนนิติบุคคล'
            this.title_provident_fund_no = 'เลขกองทุนสำรองเลี้ยงชีพ'
            this.title_provident_fund = 'กองทุนสำรองเลี้ยงชีพ'
            this.title_hours_perday = 'ชั่วโมงการทำงาน'
            this.title_min_age = 'อายุพนักงานน้อยสุด'
            this.title_max_age = 'อายุพนักงานมากสุด'
            this.title_sso_no = 'เลขประกันสังคม'
            this.title_sso = 'ประกันสังคม'
            this.title_social_security_branch = 'สาขาประกันสังคม'
            this.title_payout_rate = 'อัตราการจ่าย %'
            this.title_sso_company = 'ประกันสังคมสมทบ %'
            this.title_sso_employee = 'ประกันสังคมสะสม %'
            this.title_wage_rate = 'อัตราค่าจ้าง'
            this.title_min_wage = 'ค่าจ้างตํ่าสุด'
            this.title_max_wage = 'ค่าจ้างสูงสุด'

            this.title_employee_age = 'อายุพนักงาน'
            this.title_card_type = 'ประเภทบัตร';
            this.title_card_code = 'รหัสบัตร';
            this.title_card_opening_date = 'วันที่เปิดบัตร';
            this.title_expiration_date = 'วันที่หมดอายุ';



            this.title_summit = 'บันทึก';
            this.title_cancel = 'ยกเลิก';

            this.title_genaral = 'ข้อมูลทั่วไป';
            this.title_code = 'รหัสพนักงาน';
            this.title_fname_th = 'ชื่อจริง (ไทย)';
            this.title_lname_th = 'นามสกุล (ไทย)';
            this.title_fname_en = 'ชื่อจริง (อังกฤษ)';
            this.title_lname_en = 'นามสกุล (อังกฤษ)';
            this.title_initial = 'คำนำหน้า';

            this.title_birthdate = 'วันเกิด';
            this.title_startdate = 'วันที่เริ่มงาน';
            this.title_hrs = 'ชั่วโมงทำงาน';
            this.title_probation = 'จำนวนวันทดลองงาน';
            this.title_probationdate = 'วันที่เริ่มทดลองงาน';
            this.title_probationenddate = 'วันที่สิ้นสุดทดลองงาน';
            this.title_resignstatus = 'ลาออก';
            this.title_resigndate = 'วันที่ลาออก';
            this.title_resignreason = 'เหตุผลการลาออก';

            this.title_personal = 'รายละเอียดอื่น ๆ';
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

            this.title_banks = 'ธนาคาร';
            this.title_number = 'เลขที่บัญชี';
            this.title_bankaccount = 'เลขที่บัญชี';
            this.title_bankname = 'ชื่อบัญชี';
            this.title_banktype = 'ประเภทบัญชี';

            this.title_record = 'ข้อมูลประวัติ';
            this.title_department = 'สังกัด';
            this.title_position = 'ตำแหน่ง';
            this.title_education = 'ประวัติการศึกษา';
            this.title_training = 'ประวัติการอบรม';
            this.title_assessment = 'ประวัติการประเมิน';
            this.title_criminal = 'ประวัติการตรวจสอบอาชญากรรม';

            this.title_finance = 'การเงิน';
            this.title_taxmethod = 'การคำนวนภาษี';
            this.title_tax = 'ภาษี';
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

            this.title_address_th = 'ที่อยู่(ไทย)';
            this.title_address_en = 'ที่อยู่(อังกฤษ)';



            this.title_address_type = 'ประเภท';
            this.title_address_no = 'เลขที่';
            this.title_address_moo = 'หมู่ที่';
            this.title_address_road = 'ถนน';
            this.title_address_soi = 'ซอย';
            this.title_address_tambon = 'ตำบล';
            this.title_address_amphur = 'อำเภอ';
            this.title_address_province = 'จังหวัด';
            this.title_address_zipcode = 'รหัสไปรษณีย์';
            this.title_address_tel = 'เบอร์โทรศัพท์';
            this.title_address_email = 'อีเมล์';
            this.title_address_note = 'note';
            this.title_address_line = 'ไลน์';
            this.title_address_facebook = 'เฟสบุ๊ค';
        }
    }

    doLoadMenu() {
        //menumain
        this.toolbar_menu = [
            {
                label: this.title_back,
                icon: 'pi-arrow-left',
                command: (event) => {
                    this.router.navigateByUrl('system/company');
                },
            },
            {
                label: this.title_save,
                icon: 'pi pi-fw pi-save',
                command: (event) => {
                    if (this.accessData.accessdata_new) {
                        // console.log('Save');
                        this.confirmRecord();
                    } else {
                        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Permission denied' });
                    }
                },
            },
        ];

        //menu card
        this.menu_comcard = [
            {
                label: this.title_new,
                icon: 'pi pi-fw pi-plus',
                command: (event) => {
                    this.clearManage();
                    this.new_card = true;
                    var ref = this.comcardList.length + 100;
                    this.selectedComcard = new ComcardModel();
                    this.selectedComcard.comcard_id = ref.toString();
                    this.showManage();
                },
            },
            {
                label: this.title_edit,
                icon: 'pi pi-fw pi-pencil',
                command: (event) => {
                    this.clearManage();
                    if (this.selectedComcard != null) {
                        this.edit_comcard = true;
                        this.showManage();
                    }
                },
            },
            {
                label: this.title_delete,
                icon: 'pi pi-fw pi-trash',
                command: (event) => {
                    if (this.selectedComcard != null) {
                        this.comcard_remove();
                    }
                },
            },
            {
                label: this.title_import,
                icon: 'pi pi-fw pi-file-import',
                command: (event) => { },
            },
            {
                label: this.title_export,
                icon: 'pi pi-fw pi-file-export',
                command: (event) => { },
            },
        ];
        //menu bank
        this.menu_combank = [
            {
                label: this.title_new,
                icon: 'pi pi-fw pi-plus',
                command: (event) => {
                    this.clearManage();
                    this.showManagebank();
                    this.new_bank = true;
                    var ref = this.combankList.length + 100;
                    this.selectedCombank = new CombankModel();
                    this.selectedCombank.combank_id = ref.toString();
                    this.showManage();
                },
            },
            {
                label: this.title_edit,
                icon: 'pi pi-fw pi-pencil',
                command: (event) => {
                    this.clearManage();
                    if (this.selectedCombank != null) {
                        this.edit_combank = true;
                        this.showManage();
                    }
                },
            },
            {
                label: this.title_delete,
                icon: 'pi pi-fw pi-trash',
                command: (event) => {
                    if (this.selectedCombank != null) {
                        this.combank_remove();
                    }
                },
            },
            // {
            //     label: this.title_import,
            //     icon: 'pi pi-fw pi-file-import',
            //     command: (event) => { },
            // },
            // {
            //     label: this.title_export,
            //     icon: 'pi pi-fw pi-file-export',
            //     command: (event) => { },
            // },
        ];
    }

    tabChange(e: { index: any }) {
        var index = e.index;

        this.edit_comaddress = false;
        this.new_comaddress = false;
        //
        this.edit_comaddresseen = false;
        this.new_comaddresseen = false;
        //
        this.edit_comaddressen = false;
        this.new_comaddressen = false;
        //
        this.edit_comcard = false;
        this.new_card = false;
        //
        this.edit_combank = false;
        this.new_bank = false;
        //

        this.displayManage = false;
    }

    position: string = 'right';
    showManage() {
        this.displayManage = true;

        if (this.initial_current.Language == 'EN') {
            if (this.new_comaddress || this.edit_comaddress) {
                this.manage_title = 'Address';
            } else if (this.new_comaddresseen || this.edit_comaddresseen) {
                this.manage_title = 'Addressen';
            } else if (this.new_comaddressen || this.edit_comaddressen) {
                this.manage_title = 'Addressen';
            } else if (this.new_card || this.edit_comcard) {
                this.manage_title = 'Card';
            } else if (this.new_bank || this.edit_combank) {
                this.manage_title = 'Bank';
            }
        } else {
            if (this.new_comaddress || this.edit_comaddress) {
                this.manage_title = 'ที่อยู่';
            } else if (this.new_comaddresseen || this.edit_comaddresseen) {
                this.manage_title = 'ที่อยู่ene';
            } else if (this.new_comaddress || this.edit_comaddress) {
                this.manage_title = 'ที่อยู่en';
            } else if (this.new_card || this.edit_comcard) {
                this.manage_title = 'ข้อมูลบัตร';
            } else if (this.new_bank || this.edit_combank) {
                this.manage_title = 'ข้อมูลธนาคาร';
            }
        }
    }
    selectedFileName: string | undefined;

    onSelectFilesmaps(event: Event): void {
        const inputElement = event.target as HTMLInputElement;
        if (inputElement.files && inputElement.files.length > 0) {
            this.selectedFileName = inputElement.files[0].name;
        } else {
            this.selectedFileName = undefined;
        }
    }





    base65Image: any = '../../../../assets/images/people.png'
    base64Image: any = '../../../../assets/images/people.png'
    transform() {
        return this.sanitizer.bypassSecurityTrustResourceUrl(this.base64Image);
        //   return this.sanitizer.bypassSecurityTrustResourceUrl(this.base65Image);
    }

    transforms() {
        return this.sanitizer.bypassSecurityTrustResourceUrl(this.base65Image);
    }

    doLoadImage() {
        this.companyService.doGetImages(this.selectedCompany.company_code).then((res) => {
            let resultJSON = JSON.parse(res);
            // console.log(resultJSON.data);
            if (resultJSON.result == "1") {
                this.base64Image = resultJSON.data;
            }
        });
    }

    doLoadImagemaps() {
        this.companyService.doGetImagesmaps(this.selectedCompany.company_code).then((res) => {
            let resultJSON = JSON.parse(res);

            if (resultJSON.result == "1") {
                this.base65Image = resultJSON.data;
            }
        });
    }





    doLoadCompany() {
        var Company_list: CompanyModel[] = [];
        this.companyService.company_get(this.company_code).then(async (res) => {
            await res.forEach((element: CompanyModel) => { });

            Company_list = await res;

            if (Company_list.length > 0) {
                this.selectedCompany = Company_list[0];
                this.doLoadImage();
                this.doLoadImagemaps();
                setTimeout(() => {
                    this.doLoadComaddressList();
                    // this.doLoadComaddressenList();
                    this.doLoadComcardList();
                    this.doLoadCombankList();

                    this.doLoadbankList();
                    this.doLoadcardList();
                    this.doLoadaddressList();
                    this.doLoadprovinceList();


                    // this.uploadImages();

                }, 300);
            }
        });
    }







    bankList: BankModel[] = [];
    doLoadbankList() {
        this.bankService.bank_get().then((res) => {
            this.bankList = res;
        });
    }
    cardList: CardtypeModel[] = [];
    doLoadcardList() {
        this.cardtypeService.cardtype_get().then((res) => {
            this.cardList = res;
        });
    }
    addressList: AddresstypeModel[] = [];
    doLoadaddressList() {
        this.addresstypeService.addresstype_get().then((res) => {
            this.addressList = res;
        });
    }
    provinceList: ProvinceModel[] = [];
    doLoadprovinceList() {
        this.provinceService.province_get().then((res) => {
            this.provinceList = res;
        });
    }

    //address
    comaddressList: ComaddressModel[] = [];
    selectedComaddress: ComaddressModel = new ComaddressModel();

    doLoadComaddressList() {

        this.companyDetailService
            .getcompany_address(this.selectedCompany.company_code, this.comaddress_type)
            .then((res) => {
                this.comaddressList = res;
                if (this.comaddressList.length > 0) {
                    this.selectedComaddress = this.comaddressList[0];
                }
            });
    }
    record_comaddress() {
        // this.selectedComaddress.comaddress_type = "1";
        this.selectedComaddress.company_code = this.selectedCompany.company_code;

        this.companyDetailService.record_comaddress(this.selectedComaddress.company_code, [this.selectedComaddress])
            .then((res) => {
                let result = JSON.parse(res);
                if (result.success) {
                } else {
                }
            });
    }

    //card
    comcardList: ComcardModel[] = [];
    selectedComcard: ComcardModel = new ComcardModel();
    doLoadComcardList() {
        this.companyDetailService
            .getcompany_card(this.company_code, '')
            .then(async (res) => {
                await res.forEach((element: ComcardModel) => {
                    element.comcard_issue = new Date(element.comcard_issue);
                    element.comcard_expire = new Date(element.comcard_expire);
                });
                this.comcardList = await res;

                if (this.comcardList.length > 0) {
                    this.selectedComcard = this.comcardList[0];
                }
            });
    }
    onRowSelectComcard(event: Event) { }
    comcard_summit() {
        this.comcard_addItem(this.selectedComcard);
        this.new_card = false;
        this.edit_comcard = false;
        this.displayManage = false;
    }
    comcard_remove() {
        this.selectedComcard.comcard_id = '9999';
        this.comcard_addItem(this.selectedComcard);
        this.new_card = false;
        this.edit_comcard = false;
    }
    comcard_delete() { }
    comcard_cancel() {
        this.new_card = false;
        this.edit_comcard = false;
        this.displayManage = false;
    }
    comcard_addItem(model: ComcardModel) {
        const itemNew: ComcardModel[] = [];
        for (let i = 0; i < this.comcardList.length; i++) {
            if (this.comcardList[i].comcard_id == model.comcard_id) {
                //-- Notting
            } else {
                itemNew.push(this.comcardList[i]);
            }
        }
        //-- 9999 for delete
        if (model.comcard_id != '9999') {
            itemNew.push(model);
        }
        this.comcardList = [];
        this.comcardList = itemNew;
        this.comcardList.sort(function (a, b) {
            return parseInt(a.comcard_id) - parseInt(b.comcard_id);
        });
    }
    record_comcard() {
        if (this.comcardList.length == 0) {
            return;
        }
        this.companyDetailService
            .record_comcard(this.selectedCompany.company_code, this.comcardList)
            .then((res) => {
                let result = JSON.parse(res);
                if (result.success) {
                } else {
                }
            });
    }

    //bank
    combankList: CombankModel[] = [];
    selectedCombank: CombankModel = new CombankModel();
    doLoadCombankList() {
        this.companyDetailService
            .getcompany_bank(this.selectedCompany.company_code, this.company_code)
            .then((res) => {
                this.combankList = res;
                if (this.combankList.length > 0) {
                    this.selectedCombank = this.combankList[0];
                }
            });
    }

    combank_delete() {
        var tmp: CombankModel = new CombankModel();
        tmp.combank_bankcode = this.selectedCombank.combank_bankcode
        this.companyDetailService.delete_combank(tmp).then((res) => {
            let result = JSON.parse(res);
        });
    }

    onRowSelectCombank(event: Event) { }
    combank_summit() {
        this.combank_addItem(this.selectedCombank);
        this.new_bank = false;
        this.edit_combank = false;
        this.displayManage = false;
        this.displayManagebank = false;


    }
    combank_remove() {
        this.selectedCombank.combank_id = '9999';
        this.combank_addItem(this.selectedCombank);
        this.new_bank = false;
        this.edit_combank = false;
    }
    //    combank_delete() {}
    combank_cancel() {
        this.new_bank = false;
        this.edit_combank = false;
        this.displayManage = false;
        this.displayManagebank = false;


    }
    displayManagebank: boolean = false;
    positionbank: string = "right";
    showManagebank() {
        this.displayManagebank = true
    }
    combank_addItem(model: CombankModel) {
        const itemNew: CombankModel[] = [];
        for (let i = 0; i < this.combankList.length; i++) {
            if (this.combankList[i].combank_id == model.combank_id) {
                //-- Notting
            } else {
                itemNew.push(this.combankList[i]);
            }
        }
        //-- 9999 for delete
        if (model.combank_id != '9999') {
            itemNew.push(model);
            // console.log("test66")
            // console.log(model.combank_id)
        }
        this.combankList = [];
        this.combankList = itemNew;
        this.combankList.sort(function (a, b) { return parseInt(a.combank_id) - parseInt(b.combank_id); })


    }

    record_combank() {
        if (this.combankList.length == 0) {
            this.combank_delete();
        }
        this.companyDetailService
            .record_combank(this.selectedCompany.company_code, this.combankList)
            .then((res) => {
                let result = JSON.parse(res);
                if (result.success) {
                } else {
                }
            });
    }

    confirmRecord() {
        this.confirmationService.confirm({
            message: this.title_confirm_record,
            header: this.title_confirm,
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.doRecordCompany();

            },
            reject: () => {
                this.messageService.add({
                    severity: 'warn',
                    summary: 'Cancelled',
                    detail: this.title_confirm_cancel,
                });
            },
            key: "myDialog"
        });
    }


    doRecordCompany() {
        this.companyService
            .company_recordall(this.selectedCompany)
            .then((res) => {
                // console.log(res);

                let result = JSON.parse(res);

                if (result.success) {
                    //-- Transaction
                    this.record_comaddress();
                    this.record_comcard();
                    this.record_combank();

                    //image
                    this.uploadImages();
                    this.uploadImagesmaps();

                    this.messageService.add({
                        severity: 'success',
                        summary: 'Success',
                        detail: result.message,
                    });
                    this.router.navigateByUrl('system/company');
                    this.doLoadCompany();
                } else {
                    this.messageService.add({
                        severity: 'error',
                        summary: 'Error',
                        detail: result.message,
                    });
                }
            });
    }

    close() {
        this.new_company = false;
        this.selectedCompany = new CompanyModel();
        this.selectedComaddress = new ComaddressModel();
    }


    fileToUpload: File | any = null;
    handleFileInput(files: FileList) {
        this.fileToUpload = files.item(0);
    }

    onselectFile(event: any) {
        const reader = new FileReader();
        reader.onload = (e: any) => {
            // Set image src
            this.base64Image = e.target.result;
        };

        if (event.target.files && event.target.files.length > 0) {
            reader.readAsDataURL(event.target.files[0]);
            this.fileToUpload = event.target.files.item(0);
        }
    }



    uploadImages() {

        const filename = "XXX";
        const filetype = "jpg";

        this.companyService.uploadImages(this.fileToUpload, this.selectedCompany.company_code).then((res) => {
            let resultJSON = JSON.parse(res);
            if (resultJSON.result == "1") {
                this.doLoadImage();

            }
        });


    }
    //////

    //////
    fileToUploadsmaps: File | any = null;

    handleFileInputsmaps(files: FileList) {
        this.fileToUploadsmaps = files.item(0);
    }

    onselectFilesmaps(event: any) {
        const reader = new FileReader();
        reader.onload = (e: any) => {
            // Set image src
            this.base65Image = e.target.result;
        };

        if (event.target.files && event.target.files.length > 0) {
            reader.readAsDataURL(event.target.files[0]);
            this.fileToUploadsmaps = event.target.files.item(0);
        }
    }

    uploadImagesmaps() {
        const filename = "XXX";
        const filetype = "jpg";

        this.companyService.uploadImagesmaps(this.fileToUploadsmaps, this.selectedCompany.company_code).then((res) => {
            let resultJSON = JSON.parse(res);
            if (resultJSON.result == "1") {
                this.doLoadImagemaps();
                //   setTimeout(() => {
                //     this.doLoadImagemaps();
                //   }, 500);
            }
        });
    }


    clearManage() {
        this.new_comaddress = false;
        this.edit_comaddress = false;

        this.new_comaddresseen = false;
        this.edit_comaddresseen = false;

        this.new_comaddressen = false;
        this.edit_comaddressen = false;

        this.new_card = false;
        this.edit_comcard = false;
        this.new_bank = false;
        this.edit_combank = false;
    }
}

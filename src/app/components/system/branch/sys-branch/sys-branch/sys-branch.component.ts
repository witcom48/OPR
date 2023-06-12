import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {ConfirmationService,MegaMenuItem,MenuItem,MessageService,} from 'primeng/api';
import { CombranchModel } from 'src/app/models/system/branch';
import { ComaddressModel } from 'src/app/models/system/comaddress';
import { ComcardModel } from 'src/app/models/system/comcard';
import { AddresstypeModel } from 'src/app/models/system/policy/addresstype';
import { CardtypeModel } from 'src/app/models/system/policy/cardtype';
import { ProvinceModel } from 'src/app/models/system/policy/province';
import { EmpDetailService } from 'src/app/services/emp/worker_detail.service';
import { CombranchDetailService } from 'src/app/services/system/combranch-detail.service';
import { CombranchService } from 'src/app/services/system/combranch.service';
import { AddresstypeService } from 'src/app/services/system/policy/addresstype.service';
import { CardtypeService } from 'src/app/services/system/policy/cardtype.service';
import { ProvinceService } from 'src/app/services/system/policy/province.service';
import { AppConfig } from '../../../../../config/config';
import { InitialCurrent } from '../../../../../config/initial_current';

interface Taxmethod {
    name_th: string;
    name_en: string;
    code: string;
}

@Component({
    selector: 'app-sys-branch',
    templateUrl: './sys-branch.component.html',
    styleUrls: ['./sys-branch.component.scss'],
})
export class SysBranchComponent implements OnInit {
    combranch_code: string = '';
    manage_title: string = '';

    toolbar_menu: MenuItem[] = [];
    items: MenuItem[] = [];
    items_tab: MenuItem[] = [];

    combranch_list: CombranchModel[] = [];
    selectedCombranch: CombranchModel = new CombranchModel();

    edit_combranch: boolean = false;
    new_combranch: boolean = false;

    //menu Comaddress
    menu_comaddress: MenuItem[] = [];
    edit_comaddress: boolean = false;
    new_comaddress: boolean = false;
     //menu Comaddress en
     menu_comaddresseen: MenuItem[] = [];
     edit_comaddresseen: boolean = false;
     new_comaddresseen: boolean = false;


    //menu comcard
    menu_comcard: MenuItem[] = [];
    edit_comcard: boolean = false;
    new_card: boolean = false;

    displayManage: boolean = false;

    constructor(
        private combranchService: CombranchService,
        private router: Router,
        private route: ActivatedRoute,
        private messageService: MessageService,
        private confirmationService: ConfirmationService,
        private datePipe: DatePipe,
        private empdetailService: EmpDetailService,
        private combranchDetailService: CombranchDetailService,

        //service
        private cardtypeService: CardtypeService,
        private addresstypeService: AddresstypeService,
        private provinceService: ProvinceService
    ) {}

    ngOnInit(): void {
        this.route.queryParams.subscribe((params) => {
            this.combranch_code = params['combranchcode'];
            console.log(this.combranch_code);
        });

        this.doGetInitialCurrent();

        // Dropdown
        this.doLoadcardList();
        this.doLoadaddressList();
        this.doLoadprovinceList();

        setTimeout(() => {
            this.doLoadMenu();
        }, 100);

        setTimeout(() => {
            if (this.combranch_code != '') {
                this.doLoadCombranch();
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
    title_codes: string = 'Code';
    title_social_security_branch: string = 'Social Security Branch';
    title_thai_name: string = 'Name (Thai)';
    title_english_name: string = 'Name (Eng)';

    title_card_type: string = 'Card Type';
    title_card_code: string = 'Card Code';
    title_card_opening_date: string = 'Card Opening Date';
    title_expiration_date: string = 'Expiration Date';

    Address_th: string = 'Address TH';
    Address_en: string = 'Address EN';

    title_page: string = 'combranch';
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

    title_personal: string = 'Personal';
    title_religion: string = 'Religion';
    title_blood: string = 'Blood';
    title_weight: string = 'Weight';
    title_height: string = 'Height';
    title_address: string = 'Address';
    title_card: string = 'Card';
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

    title_address_type: string = 'Type';
    title_address_no: string = 'No';
    title_address_moo: string = 'moo';
    title_address_road: string = 'road';
    title_address_soi: string = 'soi';
    title_address_tambon: string = 'tambon';
    title_address_amphur: string = 'amphur';
    title_address_province: string = 'province';
    title_address_zipcode: string = 'zipcode';
    title_address_tel: string = 'tel';
    title_address_email: string = 'email';
    title_address_note: string = 'note';
    title_address_line: string = 'line';
    title_address_facebook: string = 'facebook';
    doLoadLanguage() {
        if (this.initial_current.Language == 'TH') {

            this.title_codes ='รหัสสาขา';
            this.title_social_security_branch ='สาขาประกันสังคม'
            this.title_thai_name ='ชื่อไทย';
            this.title_english_name ='ชื่ออังกฤษ';

            this.title_card_type ='ประเภทบัตร';
            this.title_card_code ='รหัสบัตร';
            this.title_card_opening_date ='วันที่เปิดบัตร';
            this.title_expiration_date ='วันที่หมดอายุ';
            this.Address_th ='ที่อยู่ ไทย';
            this.Address_en ='ที่อยู่ อังกฤษ';

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

            this.title_personal = 'ข้อมูลส่วนตัว';
            this.title_religion = 'ศาสนา';
            this.title_blood = 'กรุ๊ปเลือด';
            this.title_weight = 'นํ้าหนัก';
            this.title_height = 'ส่วนสูง';
            this.title_address = 'ที่อยู่';
            this.title_card = 'ข้อมูลบัตร';
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

            this.title_address_type= 'ประเภท';
            this.title_address_no = 'เลขที่';
            this.title_address_moo= 'หมู่ที่';
            this.title_address_road= 'ถนน';
            this.title_address_soi= 'ซอย';
            this.title_address_tambon= 'ตำบล';
            this.title_address_amphur= 'อำเภอ';
            this.title_address_province= 'จังหวัด';
            this.title_address_zipcode= 'รหัสไปรษณีย์';
            this.title_address_tel= 'เบอร์โทรศัพท์';
            this.title_address_email= 'อีเมล์';
            this.title_address_note= 'note';
            this.title_address_line= 'ไลน์';
            this.title_address_facebook= 'เฟสบุ๊ค';
        }
    }

    doLoadMenu() {
        //menumain
        this.toolbar_menu = [
            {
                label: 'Back',
                icon: 'pi-arrow-left',
                command: (event) => {
                    this.router.navigateByUrl('system/Branch');
                },
            },
            {
                label: 'Save',
                icon: 'pi pi-fw pi-save',
                command: (event) => {
                    console.log('Save');
                    this.confirmRecord();
                },
            },
        ];


        //menu card
        this.menu_comcard = [
            {
                label: 'New',
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
                label: 'Edit',
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
                label: 'Delete',
                icon: 'pi pi-fw pi-trash',
                command: (event) => {
                    if (this.selectedComcard != null) {
                        this.comcard_remove();
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
    }

    tabChange(e: { index: any }) {
        var index = e.index;

        this.edit_comaddress = false;
        this.new_comaddress = false;
        //
        this.edit_comaddresseen = false;
        this.new_comaddresseen = false;
        //
        this.edit_comcard = false;
        this.new_card = false;
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
            } else if (this.new_card || this.edit_comcard) {
                this.manage_title = 'Card';
            }
        } else {
            if (this.new_comaddress || this.edit_comaddress) {
                this.manage_title = 'ที่อยู่';

            } else if (this.new_comaddresseen || this.edit_comaddresseen) {
                this.manage_title = 'ที่อยู่ene';
            } else if (this.new_card || this.edit_comcard) {
                this.manage_title = 'ข้อมูลบัตร';
            }
        }
    }

    doLoadCombranch() {
        var Combranch_list: CombranchModel[] = [];
        this.combranchService
            .combranch_get(this.combranch_code)
            .then(async (res) => {
                await res.forEach((element: CombranchModel) => {});

                Combranch_list = await res;
                console.log(res);

                if (Combranch_list.length > 0) {
                    this.selectedCombranch = Combranch_list[0];

                    setTimeout(() => {
                        this.doLoadComaddressList();
                        this.doLoadComcardList();
                    }, 300);
                }
            });
    }

    // get data dropdown

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
        this.combranchDetailService.getcombranch_address(this.initial_current.CompCode, this.combranch_code)
          .then((res: ComaddressModel[]) => {
            this.comaddressList = res;
            if (this.comaddressList.length > 0) {
              this.selectedComaddress = this.comaddressList[0];
            }
          });
      }
      
    
      record_comaddress() {
        this.selectedComaddress.comaddress_type = "1";
        this.selectedComaddress.combranch_code = this.selectedCombranch.combranch_code;
      
        this.combranchDetailService.record_comddress(this.selectedComaddress.combranch_code, [this.selectedComaddress])
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
        this.combranchDetailService
            .getcombranch_card(
                this.initial_current.CompCode,
                this.combranch_code
            )
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
    onRowSelectComcard(event: Event) {}
    comcard_summit() {
        this.comcard_addItem(this.selectedComcard);
        this.new_card = false;
        this.edit_comcard = false;
        this.displayManage = false;
    }
    comcard_remove() {
        this.selectedComcard.combranch_code = '9999';
        this.comcard_addItem(this.selectedComcard);
        this.new_card = false;
        this.edit_comcard = false;
    }
    comcard_delete() {}
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
        this.combranchDetailService
            .record_comcard(
                this.selectedCombranch.combranch_code,
                this.comcardList
            )
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
                this.doRecordCombranch();
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

    doRecordCombranch() {
        this.combranchService
            .combranch_record(this.selectedCombranch)
            .then((res) => {
                console.log(res);

                let result = JSON.parse(res);

                if (result.success) {
                    //-- Transaction
                    this.record_comaddress();
                    this.record_comcard();
                    this.doLoadCombranch();
                     this.messageService.add({
                        severity: 'success',
                        summary: 'Success',
                        detail: result.message,
                    });
                    this.router.navigateByUrl('system/Branch');

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
        this.new_combranch = false;
        this.selectedCombranch = new CombranchModel();
        this.selectedComaddress= new ComaddressModel();
    }

    clearManage() {
        this.new_comaddress = false;
        this.edit_comaddress = false;

        this.new_comaddresseen = false;
        this.edit_comaddresseen = false;

        this.new_card = false;
        this.edit_comcard = false;
    }
}

import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {ConfirmationService,MegaMenuItem,MenuItem,MessageService,} from 'primeng/api';
import { ComaddlocationModel } from 'src/app/models/system/comaddlocation';


import { ComlocationModel } from 'src/app/models/system/comlocation';
import { AddresstypeModel } from 'src/app/models/system/policy/addresstype';
import { CardtypeModel } from 'src/app/models/system/policy/cardtype';
import { ProvinceModel } from 'src/app/models/system/policy/province';
import { EmpDetailService } from 'src/app/services/emp/worker_detail.service';

import { ComlocationDetailService } from 'src/app/services/system/comlocation-detail.service';
import { ComlocationService } from 'src/app/services/system/comlocation.service';
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
  selector: 'app-comlocationlist',
  templateUrl: './comlocationlist.component.html',
  styleUrls: ['./comlocationlist.component.scss']
})
export class ComlocationlistComponent implements OnInit {
    comlocation_code: string = '';
    manage_title: string = '';

    toolbar_menu: MenuItem[] = [];
    items: MenuItem[] = [];
    items_tab: MenuItem[] = [];

    Comlocation_list: ComlocationModel[] = [];
    selectedComlocation: ComlocationModel = new ComlocationModel();

    edit_comlocation: boolean = false;
    new_comlocation: boolean = false;

    //menu Comaddlocation
    menu_comaddlocation: MenuItem[] = [];
    edit_comaddlocation: boolean = false;
    new_comaddlocation: boolean = false;
     //menu Comaddlocation en
     menu_comaddlocationeen: MenuItem[] = [];
     edit_comaddlocationeen: boolean = false;
     new_comaddlocationeen: boolean = false;


    //menu comcard
    menu_comcard: MenuItem[] = [];
    edit_comcard: boolean = false;
    new_card: boolean = false;

    displayManage: boolean = false;

    constructor(
        private comlocationService: ComlocationService,
        private router: Router,
        private route: ActivatedRoute,
        private messageService: MessageService,
        private confirmationService: ConfirmationService,
        private datePipe: DatePipe,
        private empdetailService: EmpDetailService,
        private comlocationDetailService: ComlocationDetailService,

        //service
        private cardtypeService: CardtypeService,
        private addresstypeService: AddresstypeService,
        private provinceService: ProvinceService
    ) {}

    ngOnInit(): void {
        this.route.queryParams.subscribe((params) => {
            this.comlocation_code = params['comlocationcode'];
            // console.log(this.comlocation_code);
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
            if (this.comlocation_code != '') {
                this.doLoadComlocation();
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

    title_page: string = 'comlocation';
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
        }
    }

    doLoadMenu() {
        //menumain
        this.toolbar_menu = [
            {
                label: 'Back',
                icon: 'pi-arrow-left',
                command: (event) => {
                    this.router.navigateByUrl('system/sys-comlocation');
                },
            },
            {
                label: 'Save',
                icon: 'pi pi-fw pi-save',
                command: (event) => {
                    // console.log('Save');
                    this.confirmRecord();
                },
            },
        ];
        //menu ComaddlocationModel
        this.menu_comaddlocation = [
            {
                label: 'New',
                icon: 'pi pi-fw pi-plus',
                command: (event) => {
                    this.clearManage();
                    this.new_comaddlocation = true;
                    var ref = this.comaddlocationList.length + 100;
                    this.selectedComaddlocation = new ComaddlocationModel();
                    this.selectedComaddlocation.comlocation_code = ref.toString();
                    this.showManage();
                },
            },
            {
                label: 'Edit',
                icon: 'pi pi-fw pi-pencil',
                command: (event) => {
                    this.clearManage();
                    if (this.selectedComaddlocation != null) {
                        this.edit_comaddlocation = true;
                        this.showManage();
                    }
                },
            },
            {
                label: 'Delete',
                icon: 'pi pi-fw pi-trash',
                command: (event) => {
                    if (this.selectedComaddlocation != null) {
                        this.comaddlocation_remove();
                    }
                },
            },
            {
                label: 'Import',
                icon: 'pi pi-fw pi-file-import',
                command: (event) => {
                    // console.log('IMPORT');
                },
            },
            {
                label: 'Export',
                icon: 'pi pi-fw pi-file-export',
                command: (event) => {},
            },
        ];
        //menu address en
        this.menu_comaddlocationeen = [
            {
                label: 'New',
                icon: 'pi pi-fw pi-plus',
                command: (event) => {
                    this.clearManage();
                    this.new_comaddlocationeen = true;
                    var ref = this.comaddlocationList.length + 100;
                    this.selectedComaddlocation = new ComaddlocationModel();
                    this.selectedComaddlocation.company_code = ref.toString();
                    this.showManage();
                },
            },
            {
                label: 'Edit',
                icon: 'pi pi-fw pi-pencil',
                command: (event) => {
                    this.clearManage();
                    if (this.selectedComaddlocation != null) {
                        this.edit_comaddlocationeen = true;
                        this.showManage();
                    }
                },
            },
            {
                label: 'Delete',
                icon: 'pi pi-fw pi-trash',
                command: (event) => {
                    if (this.selectedComaddlocation != null) {
                        this.comaddlocation_remove();
                    }
                },
            },
            {
                label: 'Import',
                icon: 'pi pi-fw pi-file-import',
                command: (event) => {
                    // console.log('IMPORT');
                },
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

        this.edit_comaddlocation = false;
        this.new_comaddlocation = false;
        //
        this.edit_comaddlocationeen = false;
        this.new_comaddlocationeen = false;
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
            if (this.new_comaddlocation || this.edit_comaddlocation) {
                this.manage_title = 'Address';
            } else if (this.new_comaddlocationeen || this.edit_comaddlocationeen) {
                this.manage_title = 'Addressen';
            } else if (this.new_card || this.edit_comcard) {
                this.manage_title = 'Card';
            }
        } else {
            if (this.new_comaddlocation || this.edit_comaddlocation) {
                this.manage_title = 'ที่อยู่';

            } else if (this.new_comaddlocationeen || this.edit_comaddlocationeen) {
                this.manage_title = 'ที่อยู่ene';
            } else if (this.new_card || this.edit_comcard) {
                this.manage_title = 'ข้อมูลบัตร';
            }
        }
    }

    doLoadComlocation() {
        var Comlocation_list: ComlocationModel[] = [];
        this.comlocationService
            .comlocation_get(this.comlocation_code)
            .then(async (res) => {
                await res.forEach((element: ComlocationModel) => {});

                Comlocation_list = await res;
                // console.log(res);

                if (Comlocation_list.length > 0) {
                    this.selectedComlocation = Comlocation_list[0];

                    setTimeout(() => {
                        this.doLoadComaddlocationList();
                    }, 300);
                }
            });
    }

    // get data dropdown

    cardList: CardtypeModel[] = [];
    doLoadcardList() {
        var tmp = new CardtypeModel();

        this.cardtypeService.cardtype_get( ).then((res) => {
            this.cardList = res;
        });
    }
    addressList: AddresstypeModel[] = [];
    doLoadaddressList() {
        var tmp = new AddresstypeModel();

        this.addresstypeService.addresstype_get( ).then((res) => {
            this.addressList = res;
        });
    }
    provinceList: ProvinceModel[] = [];
    doLoadprovinceList() {
        var tmp = new ProvinceModel();

        this.provinceService.province_get( ).then((res) => {
            this.provinceList = res;
        });
    }

    //address
    comaddlocationList: ComaddlocationModel[] = [];
    selectedComaddlocation: ComaddlocationModel = new ComaddlocationModel();
    doLoadComaddlocationList() {
        this.comlocationDetailService
            .getcomlocation_comaddlocation(
                this.initial_current.CompCode,
                this.comlocation_code
            )
            .then((res) => {
                this.comaddlocationList = res;
                if (this.comaddlocationList.length > 0) {
                    this.selectedComaddlocation = this.comaddlocationList[0];
                }
            });
    }
    onRowSelectComaddlocation(event: Event) {}
    comaddlocation_summit() {
        this.comaddlocation_addItem(this.selectedComaddlocation);
        this.new_comaddlocation = false;
        this.edit_comaddlocation = false;
        this.displayManage = false;

        this.new_comaddlocationeen = false;
        this.edit_comaddlocationeen = false;
    }
    comaddlocation_remove() {
        this.selectedComaddlocation.comlocation_code = '9999';
        this.comaddlocation_addItem(this.selectedComaddlocation);
        this.new_comaddlocation = false;
        this.edit_comaddlocation = false;

        this.new_comaddlocationeen = false;
        this.edit_comaddlocationeen = false;
    }
    comaddlocation_delete() {}
    comaddlocation_cancel() {
        this.new_comaddlocation = false;
        this.edit_comaddlocation = false;

        this.new_comaddlocationeen = false;
        this.edit_comaddlocationeen = false;

        this.displayManage = false;
    }
    comaddlocation_addItem(model: ComaddlocationModel) {
        const itemNew: ComaddlocationModel[] = [];
        for (let i = 0; i < this.comaddlocationList.length; i++) {
            if (this.comaddlocationList[i].comlocation_code == model.comlocation_code) {
                //-- Notting
            } else {
                itemNew.push(this.comaddlocationList[i]);
            }
        }
        //-- 9999 for delete
        if (model.comlocation_code != '9999') {
            itemNew.push(model);
        }
        this.comaddlocationList = [];
        this.comaddlocationList = itemNew;
        this.comaddlocationList.sort(function (a, b) {
            return parseInt(a.comaddlocationen_no) - parseInt(b.comaddlocationth_no);
        });
    }
    record_comaddlocationth() {
        if (this.comaddlocationList.length == 0) {
            return;
        }
        this.comlocationDetailService
            .record_comaddlocation(
                this.selectedComlocation.comlocation_code,
                this.comaddlocationList
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
                this.doRecordComlocation();
            },
            reject: () => {
                this.messageService.add({
                    severity: 'warn',
                    summary: 'Cancelled',
                    detail: this.title_confirm_cancel,
                });
            },
        });
    }

    doRecordComlocation() {
        this.comlocationService
            .comlocation_record(this.selectedComlocation)
            .then((res) => {
                // console.log(res);

                let result = JSON.parse(res);

                if (result.success) {
                    //-- Transaction
                    this.record_comaddlocationth();
                    this.doLoadComlocation();

                    this.messageService.add({
                        severity: 'success',
                        summary: 'Success',
                        detail: result.message,
                    });
                    this.router.navigateByUrl('system/sys-comlocation');

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
        this.new_comlocation = false;
        this.selectedComlocation = new ComlocationModel();
    }

    clearManage() {
        this.new_comaddlocation = false;
        this.edit_comaddlocation = false;

        this.new_comaddlocationeen = false;
        this.edit_comaddlocationeen = false;

        this.new_card = false;
        this.edit_comcard = false;
    }
}

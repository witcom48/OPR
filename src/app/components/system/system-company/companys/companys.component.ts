import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { NavigationExtras } from '@angular/router';
import { Table } from 'primeng/table';
import { MegaMenuItem, MenuItem } from 'primeng/api';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import {
    ConfirmationService,
    ConfirmEventType,
    MessageService,
} from 'primeng/api';
import * as XLSX from 'xlsx';
import { AppConfig } from '../../../../config/config';
import { InitialCurrent } from '../../../../config/initial_current';
import { ComaddressService } from 'src/app/services/system/comaddress.service';
import { ComaddressModel } from 'src/app/models/system/comaddress';
import { CompanyModel } from 'src/app/models/system/company';
import { CompanyService } from 'src/app/services/system/company.service';

import { CombankModel } from 'src/app/models/system/combank';
import { ComcardModel } from 'src/app/models/system/comcard';
import { CombankService } from 'src/app/services/system/combank.service';
import { ComcardService } from 'src/app/services/system/comcard.service';
// import { SystemBankaccountComponent } from '../system-bankaccount/system-bankaccount.component';

@Component({
    selector: 'app-companys',
    templateUrl: './companys.component.html',
    styleUrls: ['./companys.component.scss'],
})
export class CompanysComponent implements OnInit {
    items: MenuItem[] = [];
    menu: MenuItem[] = [];

    edit_data: boolean = false;
    new_data: boolean = false;
    // ------company------ //
    company_list: CompanyModel[] = [];
    selectedCompany: CompanyModel = new CompanyModel();
    // ------company------ //

    comaddress_list: ComaddressModel[] = [];
    selectedComaddress: ComaddressModel = new ComaddressModel();

    comcard_list: ComcardModel[] = [];
    selectedComcard: ComcardModel = new ComcardModel();

    combank_list: CombankModel[] = [];
    selectedCombank: CombankModel = new CombankModel();

    new_employee: any;

    constructor(
        private companyService: CompanyService,

        private router: Router,

        private messageService: MessageService,
        private confirmationService: ConfirmationService,
        private combankService: CombankService,
        private comaddressService: ComaddressService,
        private comcardService: ComcardService,

        // private systemBankaccountComponent: SystemBankaccountComponent,

        private datePipe: DatePipe
    ) {}

    ngOnInit(): void {
        this.doGetInitialCurrent();

        setTimeout(() => {
            this.doLoadLanguage();
            this.doLoadMenu();
            this.doLoadCompany();
            this.doLoadComaddress();
            this.doLoadComcard();
            this.doLoadCombank();
        }, 500);
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

    title_page: string = 'company';

    title_new: string = 'New';
    title_edit: string = 'Edit';
    title_delete: string = 'Delete';
    title_import: string = 'Import';
    title_export: string = 'Export';
    title_save: string = 'Save';
    title_code: string = 'Code';
    title_name_th: string = 'Name (Thai)';
    title_name_en: string = 'Name (Eng.)';
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

    title_basic: string = 'basic information';
    title_general: string = 'General Information';
    title_company_code: string = 'Company Code';

    title_company_initials: string = 'Initials';
    title_company_name_th: string = 'Detail (Thai)';
    title_company_name_en: string = 'Detail (Eng)';

    title_hrs_perday: string = 'Working Hours';
    title_sso_com_rate: string = 'Social Security Company';
    title_sso_emp_rate: string = 'Social Security';
    title_sso_min_wage: string = 'Minimum Wage';
    title_sso_max_wage: string = 'Highest Wage';
    title_sso_min_age: string = 'Employee age';
    title_sso_max_age: string = 'Employee age';
    title_comaddress: string = 'Comaddress';
    title_combank: string = 'Combank';
    title_comcard: string = 'Comcard';

    title_comaddress_code: string = 'Code';
    title_comaddress_no: string = 'Address NO';
    title_comaddress_moo: string = 'Moo';
    title_comaddress_soi: string = 'Soi';
    title_comaddress_road: string = 'Road';
    title_comaddress_tambon: string = 'Tombon';
    title_comaddress_amphur: string = 'Amphur';
    title_comaddress_province: string = 'Province';
    title_comaddress_zipcode: string = 'Zipcode';
    title_comaddress_tell: string = 'Telephone';
    title_comaddress_email: string = 'Email';
    title_comaddress_line: string = 'Line';
    title_comaddress_facebook: string = 'Facebook';

    title_comcard_code: string = 'Comcard Code';
    title_card_type: string = 'Card Type';
    title_comcard_issue: string = 'Comcard Issue';
    title_comcard_expire: string = 'Comcard Expire';

    title_combank_bankcode: string = 'Bankcode';
    title_combank_bankaccount: string = 'Bank Account';
    title_combank_nameaccount: string = 'Name Account';
    title_combank_bankpercent: string = 'Bank(%)';
    title_combank_cashpercent: string = 'Cash(%)';

    modified_by: string = 'Edit by';
    modified_date: string = 'Edit date';

    doLoadLanguage() {
        if (this.initial_current.Language == 'TH') {
            this.title_page = 'ข้อมูลธนาคาร';
            this.title_new = 'เพิ่ม';
            this.title_edit = 'แก้ไข';
            this.title_delete = 'ลบ';
            this.title_import = 'นำเข้า';
            this.title_export = 'โอนออก';
            this.title_save = 'บันทึก';
            this.title_code = 'รหัส';
            this.title_name_th = 'ชื่อไทย';
            this.title_name_en = 'ชื่ออังกฤษ';
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

            this.title_general = 'ข้อมูลทั่วไป';
            this.title_basic = 'ข้อมูลพื้นฐาน';

            this.title_company_code = 'รหัสบริษัท';

            this.title_company_initials = 'ชื่อย่อ';
            this.title_company_name_th = 'ชื่อ (ไทย)';
            this.title_company_name_en = 'ชื่อ (อังกฤษ)';

            this.title_hrs_perday = 'ชั่วโมงทำงาน';
            this.title_sso_com_rate = 'ประกันสังคมบริษัท';
            this.title_sso_emp_rate = 'ประกันสังคมส่วนพนักงาน';
            this.title_sso_min_wage = 'ค่าจ้างตํ่าสุด';
            this.title_sso_max_wage = 'ค่าจ้างสูงสุด ';
            this.title_sso_min_age = 'อายุพนักงานน้อยสุด';
            this.title_sso_max_age = 'อายุพนักงานมากสุด';
            this.title_comaddress = 'ที่อยู่';
            this.title_combank = 'ข้อมูลธนาคาร';
            this.title_comcard = 'ข้อมูลธนาคาร';
            this.modified_by = 'ผู้ทำรายการ';
            this.modified_date = 'วันที่ทำรายการ';

            this.title_comaddress_code = 'รหัส';
            this.title_comaddress_no = 'เลขที่';
            this.title_comaddress_moo = 'หมู่';
            this.title_comaddress_soi = 'ซอย';
            this.title_comaddress_road = 'ถนน';
            this.title_comaddress_tambon = 'ตำบล';
            this.title_comaddress_amphur = 'อำเภอ';
            this.title_comaddress_province = 'จังหวัด';
            this.title_comaddress_zipcode = 'รหัสไปรษณีย์';
            this.title_comaddress_tell = 'เบอร์โทรศัพท์';
            this.title_comaddress_email = 'อีเมล์';
            this.title_comaddress_line = 'ไลน์';
            this.title_comaddress_facebook = 'เฟสบุ๊ค';

            this.title_comcard_code = 'ประเภทบัตร';

            this.title_card_type = 'รหัสบัตร';
            this.title_comcard_issue = 'วันที่เปิดบัตร';
            this.title_comcard_expire = 'วันที่หมดอายุ';
            this.title_company_code = 'เลขที่';

            this.title_combank_bankcode = 'ธนาคาร';
            this.title_combank_bankaccount = 'เลขที่บัญชี';
            this.title_combank_nameaccount = 'ชื่อบัญชี';
            this.title_combank_bankpercent = 'ธนาคาร%';
            this.title_combank_cashpercent = 'เงินสด%';
        }
    }

    doLoadMenu() {
        this.menu = [
            {
                label: this.title_new,
                icon: 'pi pi-fw pi-plus',
                command: (event) => {
                    this.selectedComaddress = new ComaddressModel();
                    // this.selectedComcard = new ComcardModel();
                    // this.selectedCombank = new CombankModel();
                    // this.selectedCompany = new CompanyModel();
                    this.new_data = true;
                    this.edit_data = false;
                },
            },

            {
                label: this.title_edit,
                icon: 'pi pi-fw pi-pencil',
                command: (event) => {
                    this.doLoadCompany();
                    this.doLoadCombank();
                    this.doLoadComaddress();
                    this.doLoadComcard();
                    this.edit_data = true;
                    this.new_data = false;
                },
            },


            // {
            //     label: this.title_edit,
            //     icon: 'pi pi-fw pi-pencil',
            //     command: (event) => {
            //         this.doLoadComaddress();
            //         this.doLoadComcard();
            //         this.doLoadCombank();
            //         this.edit_data = true;
            //         this.new_data = false;
            //     },
            // },
            {
                label: this.title_delete,
                icon: 'pi pi-fw pi-trash',
                command: (event) => {
                    this.confirmDelete();
                },
            },
        ];

        this.items = [
            {
                label: 'Save',
                icon: 'pi pi-fw pi-save',
                command: (event) => {
                    this.confirmRecord();
                    // this.doRecordComaddress();
                    // this.selectedCompany = new CompanyModel();
                    // this.selectedCombank = new CombankModel();
                    // this.selectedComaddress = new ComaddressModel();
                    // this.selectedComcard = new ComcardModel();

                    // this.doLoadCombank();
                    // this.doLoadComcard();
                    // this.doLoadCompany();

                    //   this.new_data= true;
                    //   this.edit_data= false;
                },
            },
            {
                //   label:this.title_import,
                label: 'Export',
                icon: 'pi pi-fw pi-file-export',
                //   icon:'pi pi-fw pi-file-import',
                command: (event) => {
                    this.exportAsExcel();
                },
            },
            //   {
            //     label: this.title_new,
            //     icon: 'pi pi-fw pi-plus',
            //     command: (event) => {
            //         this.selectedCombank = new CombankModel();
            //         this.new_data = true;
            //         this.edit_data = false;
            //     },
            // },

            {
                //   label:this.title_export,
                label: 'Import',
                icon: 'pi pi-fw pi-file-import',
                command: (event) => {
                    this.showUpload();

                    // this.exportAsExcel()
                },
            },
        ];
    }

    //get data    combank_list: CombankModel[] = [];
    // ------company------ //

    CompanyList: CompanyModel[] = [];
    doLoadCompany() {
        this.companyService.company_get().then((res) => {
            this.company_list = res;
        });
    }
    // ------company------ //

    combanklist: CombankModel[] = [];
    doLoadCombank() {
        this.combankService.combank_get().then((res) => {
            this.combanklist = res;
        });
    }

    // combanklist: CombankModel[] = [];
    // doLoadCombank(){
    //   this.combankService.combank_get().then((res)=>{
    //     this.combanklist = res;
    //   })
    // }

    ComaddressList: ComaddressModel[] = [];
    doLoadComaddress() {
        this.comaddressService.comaddress_get().then((res) => {
            this.ComaddressList = res;
        });
    }

    ComcardList: ComcardModel[] = [];
    doLoadComcard() {
        this.comcardService.comcard_get().then((res) => {
            this.ComcardList = res;
        });
    }
    // doLoadCompany(){
    //   this.companyService.company_get().then((res) => {
    //    this.company_list = res;
    //   });
    //   console.log(this.companyService);
    // }
    confirmRecord() {
        this.confirmationService.confirm({
            message: this.title_confirm_record,
            header: this.title_confirm,
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.doRecordCompany();
                this.doRecordCompany();
                this.doRecordComaddress();
                this.doRecordComcard();
                this.doRecordCombank();
            },
            reject: () => {
                this.messageService.add({
                    severity: 'warn',
                    summary: 'Cancelled',
                    detail: this.title_confirm_cancel,
                });
            },
        });
        console.log(this.selectedCompany);
        console.log(this.selectedCombank);
        console.log(this.selectedComaddress);
        console.log(this.selectedComcard);
    }
    // confirmRecord() {
    //     this.confirmationService.confirm({
    //         message: this.title_confirm_record,
    //         header: this.title_confirm,
    //         icon: 'pi pi-exclamation-triangle',
    //         accept: () => {
    //             this.doRecordCompany();
    //             this.doRecordComaddress();
    //             this.doRecordComcard();
    //             this.doRecordCombank();
    //         },
    //         reject: () => {
    //             this.messageService.add({
    //                 severity: 'warn',
    //                 summary: 'Cancelled',
    //                 detail: this.title_confirm_cancel,
    //             });
    //         },
    //     });
    // }

    // confirmCombank() {
    //     this.confirmationService.confirm({
    //         message: this.title_confirm_record,
    //         header: this.title_confirm,
    //         icon: 'pi pi-exclamation-triangle',
    //         accept: () => {
    //             this.doRecordCombank();
    //         },
    //         reject: () => {
    //             this.messageService.add({
    //                 severity: 'warn',
    //                 summary: 'Cancelled',
    //                 detail: this.title_confirm_cancel,
    //             });
    //         },
    //     });
    // }
    // ------company------ //

    doRecordCompany() {
        this.companyService.company_record(this.selectedCompany).then((res) => {
            console.log(res);
            let result = JSON.parse(res);

            if (result.success) {
                this.messageService.add({
                    severity: 'success',
                    summary: 'Success',
                    detail: result.message,
                });
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
    // ------company------ //

    doRecordComaddress() {
        this.comaddressService
            .comaddress_record(this.selectedComaddress)
            .then((res) => {
                console.log(res);
                let result = JSON.parse(res);

                if (result.success) {
                    this.messageService.add({
                        severity: 'success',
                        summary: 'Success',
                        detail: result.message,
                    });
                    this.doLoadComaddress();
                } else {
                    this.messageService.add({
                        severity: 'error',
                        summary: 'Error',
                        detail: result.message,
                    });
                }
            });
    }
    doRecordCombank() {
        this.combankService.combank_record(this.selectedCombank).then((res) => {
            console.log(res);
            let result = JSON.parse(res);

            if (result.success) {
                this.messageService.add({
                    severity: 'success',
                    summary: 'Success',
                    detail: result.message,
                });
                this.doLoadCombank();
            } else {
                this.messageService.add({
                    severity: 'error',
                    summary: 'Error',
                    detail: result.message,
                });
            }
        });
    }
    doRecordComcard() {
        this.comcardService.comcard_record(this.selectedComcard).then((res) => {
            console.log(res);
            let result = JSON.parse(res);

            if (result.success) {
                this.messageService.add({
                    severity: 'success',
                    summary: 'Success',
                    detail: result.message,
                });
                this.doLoadComcard();
            } else {
                this.messageService.add({
                    severity: 'error',
                    summary: 'Error',
                    detail: result.message,
                });
            }
        });
    }

    confirmDelete() {
        this.confirmationService.confirm({
            message: this.title_confirm_delete,
            header: this.title_confirm,
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.doDeleteCompany();
                this.doDeleteComaddress();
                this.doDeleteComcard();
                this.doDeleteCombank();
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
    // ------company------ //

    doDeleteCompany() {
        this.companyService.company_delete(this.selectedCompany).then((res) => {
            console.log(res);
            let result = JSON.parse(res);

            if (result.success) {
                this.messageService.add({
                    severity: 'success',
                    summary: 'Success',
                    detail: result.message,
                });
                this.doLoadCompany();
                this.edit_data = false;
                this.new_data = false;
            } else {
                this.messageService.add({
                    severity: 'error',
                    summary: 'Error',
                    detail: result.message,
                });
            }
        });
    }
    // ------company------ //

    doDeleteComaddress() {
        this.comaddressService
            .comaddress_delete(this.selectedComaddress)
            .then((res) => {
                console.log(res);
                let result = JSON.parse(res);

                if (result.success) {
                    this.messageService.add({
                        severity: 'success',
                        summary: 'Success',
                        detail: result.message,
                    });
                    this.doLoadComaddress();
                    this.edit_data = false;
                    this.new_data = false;
                } else {
                    this.messageService.add({
                        severity: 'error',
                        summary: 'Error',
                        detail: result.message,
                    });
                }
            });
    }
    doDeleteCombank() {
        this.combankService.combank_delete(this.selectedCombank).then((res) => {
            console.log(res);
            let result = JSON.parse(res);

            if (result.success) {
                this.messageService.add({
                    severity: 'success',
                    summary: 'Success',
                    detail: result.message,
                });
                this.doLoadCombank();
                this.edit_data = false;
                this.new_data = false;
            } else {
                this.messageService.add({
                    severity: 'error',
                    summary: 'Error',
                    detail: result.message,
                });
            }
        });
    }

    doDeleteComcard() {
        this.comcardService.comcard_delete(this.selectedComcard).then((res) => {
            console.log(res);
            let result = JSON.parse(res);

            if (result.success) {
                this.messageService.add({
                    severity: 'success',
                    summary: 'Success',
                    detail: result.message,
                });
                this.doLoadComcard();
                this.edit_data = false;
                this.new_data = false;
            } else {
                this.messageService.add({
                    severity: 'error',
                    summary: 'Error',
                    detail: result.message,
                });
            }
        });
    }
    // ------company------ //

    onRowSelectCompany(event: Event) {
        this.edit_data = true;
        this.new_data = false;
    }
    // ------company------ //

    onRowSelectComaddress(event: Event) {
        this.edit_data = true;
        this.new_data = false;
    }
    onRowSelectCombank(event: Event) {
        this.edit_data = true;
        this.new_data = false;
    }
    onRowSelectComcard(event: Event) {
        this.edit_data = true;
        this.new_data = false;
    }

    fileToUpload: File | any = null;
    handleFileInput(file: FileList) {
        this.fileToUpload = file.item(0);
    }
    // ------company------ //

    doUploadCompany() {
        this.displayUpload = false;

        const filename =
            'company_' + this.datePipe.transform(new Date(), 'yyyyMMddHHmm');
        const filetype = 'xls';

        this.companyService
            .company_import(this.fileToUpload, filename, filetype)
            .then((res) => {
                console.log(res);
                let result = JSON.parse(res);

                if (result.success) {
                    this.messageService.add({
                        severity: 'success',
                        summary: 'Success',
                        detail: result.message,
                    });
                    this.doLoadCompany();
                    this.edit_data = false;
                    this.new_data = false;
                } else {
                    this.messageService.add({
                        severity: 'error',
                        summary: 'Error',
                        detail: result.message,
                    });
                }
            });
    }
    // ------company------ //

    doUploadComcard() {
        this.displayUpload = false;

        const filename =
            'Comcard_' + this.datePipe.transform(new Date(), 'yyyyMMddHHmm');
        const filetype = 'xls';

        this.comcardService
            .comcard_import(this.fileToUpload, filename, filetype)
            .then((res) => {
                console.log(res);
                let result = JSON.parse(res);

                if (result.success) {
                    this.messageService.add({
                        severity: 'success',
                        summary: 'Success',
                        detail: result.message,
                    });
                    this.doLoadComcard();
                    this.edit_data = false;
                    this.new_data = false;
                } else {
                    this.messageService.add({
                        severity: 'error',
                        summary: 'Error',
                        detail: result.message,
                    });
                }
            });
    }
    doUploadComaddress() {
        this.displayUpload = false;

        const filename =
            'Comaddress_' + this.datePipe.transform(new Date(), 'yyyyMMddHHmm');
        const filetype = 'xls';

        this.comaddressService
            .comaddress_import(this.fileToUpload, filename, filetype)
            .then((res) => {
                console.log(res);
                let result = JSON.parse(res);

                if (result.success) {
                    this.messageService.add({
                        severity: 'success',
                        summary: 'Success',
                        detail: result.message,
                    });
                    this.doLoadComaddress();
                    this.edit_data = false;
                    this.new_data = false;
                } else {
                    this.messageService.add({
                        severity: 'error',
                        summary: 'Error',
                        detail: result.message,
                    });
                }
            });
    }
    doUploadCombank() {
        this.displayUpload = false;

        const filename =
            'Combank_' + this.datePipe.transform(new Date(), 'yyyyMMddHHmm');
        const filetype = 'xls';

        this.combankService
            .combank_import(this.fileToUpload, filename, filetype)
            .then((res) => {
                console.log(res);
                let result = JSON.parse(res);

                if (result.success) {
                    this.messageService.add({
                        severity: 'success',
                        summary: 'Success',
                        detail: result.message,
                    });
                    this.doLoadCombank();
                    this.edit_data = false;
                    this.new_data = false;
                } else {
                    this.messageService.add({
                        severity: 'error',
                        summary: 'Error',
                        detail: result.message,
                    });
                }
            });
    }

    displayUpload: boolean = false;
    showUpload() {
        this.displayUpload = true;
    }

    @ViewChild('TABLE') table: ElementRef | any = null;

    exportAsExcel() {
        const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(
            this.table.nativeElement
        ); //converts a DOM TABLE element to a worksheet
        const wb: XLSX.WorkBook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

        XLSX.writeFile(wb, 'Export_company.xlsx');
    }



    
}

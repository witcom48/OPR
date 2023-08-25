import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import {  MenuItem } from 'primeng/api';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { ConfirmationService,MessageService,} from 'primeng/api';
import * as XLSX from 'xlsx';
import { InitialCurrent } from 'src/app/config/initial_current';
import { AppConfig } from 'src/app/config/config';
import { TaxrateModel } from 'src/app/models/payroll/taxrate';
import { TaxrateService } from 'src/app/services/payroll/taxrate.service';
import { AccessdataModel } from 'src/app/models/system/security/accessdata';

@Component({
    selector: 'app-taxrate',
    templateUrl: './taxrate.component.html',
    styleUrls: ['./taxrate.component.scss'],
})
export class TaxrateComponent implements OnInit {
    items: MenuItem[] = [];
    edit_data: boolean = false;
    new_data: boolean = false;
    home: any;
    itemslike: MenuItem[] = [];
    taxrate_list: TaxrateModel[] = [];
    selectedTaxrate: TaxrateModel = new TaxrateModel();

    constructor(
        private taxrateService: TaxrateService,

        private router: Router,
        private messageService: MessageService,
        private confirmationService: ConfirmationService,
        private datePipe: DatePipe
    ) { }

    ngOnInit(): void {
        this.doGetInitialCurrent();
        this.doLoadLanguage();
        this.doLoadMenu();
        this.doLoadTaxrate();
        this.itemslike = [{ label: this.title_system_payroll, routerLink: '/payroll/policy' },
        { label: this.title_page, styleClass: 'activelike' }];
        this.home = { icon: 'pi pi-home', routerLink: '/' };
    }

    public initial_current: InitialCurrent = new InitialCurrent();
    initialData2: InitialCurrent = new InitialCurrent();
    accessData: AccessdataModel = new AccessdataModel();
    doGetInitialCurrent() {
        this.initial_current = JSON.parse(
            localStorage.getItem(AppConfig.SESSIONInitial) || '{}'
        );
        if (!this.initial_current) {
            this.router.navigateByUrl('login');
        }
        this.accessData = this.initialData2.dotGetPolmenu('PAY');

    }
    title_file: { [key: string]: string } = { EN: "File ", TH: "ไฟล์" }

    title_payroll: string = 'Payroll';

    title_policy: string = 'Set Policy';
    title_page: string = 'Taxrate';
    title_new: string = 'New';
    title_type: string = 'Type';
    title_regular: string = 'Regular';
    title_income: string = 'Income';
    title_deduct: string = 'Deduct';

    title_Tax: string = '%';
    title_From: string = 'From';
    title_To: string = 'To';
    title_no: string = 'No';

    title_edit: string = 'Edit';
    title_delete: string = 'Delete';
    title_import: string = 'Import';
    title_export: string = 'Export';
    title_save: string = 'Save';
    title_code: string = 'Code';
    title_name_th: string = 'Name (Thai)';
    title_name_en: string = 'Name (Eng.)';
    title_detail_en: string = 'Description(Eng)';
    title_detail_th: string = 'Description(Thai)';
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
    title_system_payroll: string = 'Policy Payroll';

    doLoadLanguage() {
        if (this.initial_current.Language == 'TH') {
            this.title_system_payroll = 'นโยบาย';

            this.title_payroll = 'บัญชี';

            this.title_policy = 'กำหนดนโยบาย';
            this.title_page = 'อัตราภาษี';
            this.title_new = 'เพิ่ม';
            this.title_type = 'ประเภท';
            this.title_regular = 'รูปแบบ';
            this.title_income = 'เงินได้';
            this.title_deduct = 'เงินหัก';

            this.title_From = 'จาก';
            this.title_To = 'ถึง';
            this.title_Tax = '%';
            this.title_no = 'อันดับ';
            this.title_edit = 'แก้ไข';
            this.title_delete = 'ลบ';
            this.title_import = 'นำเข้า';
            this.title_export = 'โอนออก';
            this.title_save = 'บันทึก';
            this.title_code = 'รหัส';
            this.title_name_th = 'ชื่อไทย';
            this.title_name_en = 'ชื่ออังกฤษ';
            this.title_detail_en = 'รายละเอียด อังกฤษ';
            this.title_detail_th = 'รายละเอียด ไทย';
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
        this.items = [
            {
                label: this.title_new,
                icon: 'pi pi-fw pi-plus',
                command: (event) => {
                    if (this.accessData.accessdata_new) {
                        this.showManage()
                        this.selectedTaxrate = new TaxrateModel();
                        this.new_data = true;
                        this.edit_data = false;
                    } else {
                        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Permistion' });
                    }

                },
            },
            {

                label: "Template",
                icon: 'pi-download',
                command: (event) => {
                    window.open('assets/OPRFileImport/(OPR)Import Payroll/(OPR)Import Payroll Taxrate.xlsx', '_blank');
                }
            }
            ,
            {
                label: this.title_import,
                icon: 'pi pi-fw pi-file-import',
                command: (event) => {
                    this.showUpload();
                },
            },
            {
                label: this.title_export,
                icon: 'pi pi-fw pi-file-export',
                command: (event) => {
                    this.exportAsExcel();
                },
            },
        ];
    }
    reloadPage() {
        this.doLoadTaxrate()
    }
    doLoadTaxrate() {
        this.taxrateService.taxrate_get().then((res) => {
            this.taxrate_list = res;
        });
    }

    confirmRecord() {
        this.confirmationService.confirm({
            message: this.title_confirm_record,
            header: this.title_confirm,
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.doRecordTaxrate();
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

    doRecordTaxrate() {
        this.taxrateService.taxrate_record(this.selectedTaxrate).then((res) => {
            // console.log(res);
            let result = JSON.parse(res);

            if (result.success) {
                this.messageService.add({
                    severity: 'success',
                    summary: 'Success',
                    detail: result.message,
                });
                this.doLoadTaxrate();
                this.edit_data = false;
                this.new_data = false;
                this.displayManage = false
            } else {
                this.messageService.add({
                    severity: 'error',
                    summary: 'Error',
                    detail: result.message,
                });
            }
        });
    }
    //
    confirmDeletes(data: any) {
        this.confirmationService.confirm({
            message: this.title_confirm_delete,
            header: this.title_confirm,
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.doDeleteTaxrates(data);
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

    doDeleteTaxrates(data: any) {
        this.taxrateService.taxrate_delete(data).then((res) => {
            let result = JSON.parse(res);
            if (result.success) {
                this.messageService.add({
                    severity: 'success',
                    summary: 'Success',
                    detail: result.message,
                });
                this.doLoadTaxrate();
                this.edit_data = false;
                this.new_data = false;
                this.displayManage = false
            } else {
                this.messageService.add({
                    severity: 'error',
                    summary: 'Error',
                    detail: result.message,
                });
            }
        });
    }
    //
    confirmDelete() {
        this.confirmationService.confirm({
            message: this.title_confirm_delete,
            header: this.title_confirm,
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.doDeleteTaxrate();
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

    doDeleteTaxrate() {
        this.taxrateService.taxrate_delete(this.selectedTaxrate).then((res) => {
            // console.log(res);
            let result = JSON.parse(res);

            if (result.success) {
                this.messageService.add({
                    severity: 'success',
                    summary: 'Success',
                    detail: result.message,
                });
                this.doLoadTaxrate();
                this.edit_data = false;
                this.new_data = false;
                this.displayManage = false

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
        this.new_data = false;
        this.selectedTaxrate = new TaxrateModel();
    }
    onRowSelectTaxrate(event: any) {
        this.edit_data = true;
        this.new_data = true;
        this.displayManage = true;

    }

    fileToUpload: File | any = null;
    handleFileInput(file: FileList) {
        this.fileToUpload = file.item(0);
    }

    doUploadTaxrate() {
        if (this.fileToUpload) {
            this.confirmationService.confirm({
                message: 'Confirm Upload file : ' + this.fileToUpload.name,
                header: 'Import File',
                icon: 'pi pi-exclamation-triangle',
                accept: () => {
                    const filename =
                        'Taxrate_' +
                        this.datePipe.transform(new Date(), 'yyyyMMddHHmm');
                    const filetype = 'xls';

                    this.taxrateService
                        .taxrate_import(this.fileToUpload, filename, filetype)
                        .then((res) => {
                            // console.log(res);
                            let result = JSON.parse(res);

                            if (result.success) {
                                this.messageService.add({
                                    severity: 'success',
                                    summary: 'Success',
                                    detail: result.message,
                                });
                                this.doLoadTaxrate();
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
                    this.displayUpload = false;
                },
                key: "myDialog",
                reject: () => {
                    this.messageService.add({
                        severity: 'warn',
                        summary: 'Cancelled',
                        detail: 'Not Upload',
                    });
                    this.displayUpload = false;
                },
            });
        } else {
            this.messageService.add({
                severity: 'warn',
                summary: 'File',
                detail: 'Please choose a file.',
            });
        }
    }


    setFormatFrom(event: any) {
        event.target.value = parseFloat(event.target.value).toFixed(2);
        this.selectedTaxrate.taxrate_from = parseFloat(event.target.value);
    }

    setFormatTo(event: any) {
        event.target.value = parseFloat(event.target.value).toFixed(2);
        this.selectedTaxrate.taxrate_to = parseFloat(event.target.value);
    }

    setFormatTax(event: any) {
        event.target.value = parseFloat(event.target.value).toFixed(2);
        this.selectedTaxrate.taxrate_tax = parseFloat(event.target.value);
    }


    displayUpload: boolean = false;
    showUpload() {
        this.displayUpload = true;
    }
    displayManage: boolean = false;
    position: string = "right";
    showManage() {
        this.displayManage = true
    }
    @ViewChild('TABLE') table: ElementRef | any = null;

    exportAsExcel() {
        const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(
            this.table.nativeElement
        );
        const wb: XLSX.WorkBook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

        XLSX.writeFile(wb, 'Export_Ethnicity.xlsx');
    }
}

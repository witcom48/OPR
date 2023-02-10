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


import { CompanyModel } from 'src/app/models/system/company';
import { CompanyService } from 'src/app/services/system/company.service';
import { CombankModel } from 'src/app/models/system/combank';
import { CombankService } from 'src/app/services/system/combank.service';
@Component({
  selector: 'app-system-bankaccount',
  templateUrl: './system-bankaccount.component.html',
  styleUrls: ['./system-bankaccount.component.scss']
})
export class SystemBankaccountComponent implements OnInit {

    items: MenuItem[] = [];
    edit_data: boolean = false;
    new_data: boolean = false;

    combank_list: CombankModel[] = [];
    selectedCombank: CombankModel = new CombankModel();

    constructor(
        private combankService: CombankService,
        private router: Router,
        private messageService: MessageService,
        private confirmationService: ConfirmationService,
        private datePipe: DatePipe
    ) {}

    ngOnInit(): void {
        this.doGetInitialCurrent();

        setTimeout(() => {
            this.doLoadLanguage();
            this.doLoadMenu();
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

    title_page: string = 'Combank';
    title_new: string = 'New';
    title_edit: string = 'Edit';
    title_delete: string = 'Delete';
    title_import: string = 'Import';
    title_export: string = 'Export';
    title_save: string = 'Save';
    title_code: string = 'Code';
    title_name_th: string = 'Comaddress (Thai)';
    title_name_en: string = 'Comaddress (Eng.)';
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

    // title_combank_id: string = 'Code';
    title_company_code: string = 'Code';
    title_combank_bankcode: string = 'Bankcode';
    title_combank_bankaccount: string = 'Bank Account';
    title_combank_nameaccount: string = 'Name Account';
    title_combank_bankpercent: string = 'Bank(%)';
    title_combank_cashpercent: string = 'Cash(%)';



    modified_by: string = 'Edit by';
    modified_date: string = 'Edit date';

    doLoadLanguage() {
        if (this.initial_current.Language == 'TH') {
            this.title_page = 'ประเภทที่อยู่';
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

            // this.title_combank_id = 'รหัส';
            this.title_company_code = 'เลขที่';
            
            this.title_combank_bankcode = 'ธนาคาร';
            this.title_combank_bankaccount = 'เลขที่บัญชี';
            this.title_combank_nameaccount = 'ชื่อบัญชี';
            this.title_combank_bankpercent = 'ธนาคาร%';
            this.title_combank_cashpercent = 'เงินสด%';

            this.modified_by = 'ผู้ทำรายการ';
            this.modified_date = 'วันที่ทำรายการ';
        }
    }

    doLoadMenu() {
        this.items = [
            {
                label: this.title_new,
                icon: 'pi pi-fw pi-plus',
                command: (event) => {
                    this.selectedCombank = new CombankModel();
                    this.new_data = true;
                    this.edit_data = false;
                },
            },
            {
                label: this.title_edit,
                icon: 'pi pi-fw pi-pencil',
                command: (event) => {
                    this.doLoadCombank();
                    this.edit_data = true;
                    this.new_data = false;
                },
            },
            {
                label: this.title_delete,
                icon: 'pi pi-fw pi-trash',
                command: (event) => {
                    this.confirmDelete();
                },
            },
        ];
    }

    doLoadCombank() {
        this.combankService.combank_get().then((res) => {
            this.combank_list = res;
        });
    }

    confirmRecord() {
        this.confirmationService.confirm({
            message: this.title_confirm_record,
            header: this.title_confirm,
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
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
    }

    doRecordCombank() {
        this.combankService
            .combank_record(this.selectedCombank)
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

    doDeleteCombank() {
        this.combankService
            .combank_delete(this.selectedCombank)
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

    onRowSelectCombank(event: Event) {
        this.edit_data = true;
        this.new_data = false;
    }

    fileToUpload: File | any = null;
    handleFileInput(file: FileList) {
        this.fileToUpload = file.item(0);
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

        XLSX.writeFile(wb, 'Export_Combank.xlsx');
    }
}

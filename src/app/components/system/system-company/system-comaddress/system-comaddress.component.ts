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
@Component({
    selector: 'app-system-comaddress',
    templateUrl: './system-comaddress.component.html',
    styleUrls: ['./system-comaddress.component.scss'],
})
export class SystemComaddressComponent implements OnInit {
    items: MenuItem[] = [];
    edit_data: boolean = false;
    new_data: boolean = false;

    comaddress_list: ComaddressModel[] = [];
    selectedComaddress: ComaddressModel = new ComaddressModel();

    constructor(
        private comaddressService: ComaddressService,
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
            this.doLoadComaddress();
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

    title_page: string = 'Comaddress';
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

    // title_comaddress_id: string = '';
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

            // this.title_comaddress_id = 'ที่อยู่';
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
                    this.selectedComaddress = new ComaddressModel();
                    this.new_data = true;
                    this.edit_data = false;
                },
            },
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

    doLoadComaddress() {
        this.comaddressService.comaddress_get().then((res) => {
            this.comaddress_list = res;
        });
    }

    confirmRecord() {
        this.confirmationService.confirm({
            message: this.title_confirm_record,
            header: this.title_confirm,
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.doRecordComaddress();
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

    confirmDelete() {
        this.confirmationService.confirm({
            message: this.title_confirm_delete,
            header: this.title_confirm,
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.doDeleteComaddress();
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

    onRowSelectcomaddress(event: Event) {
        this.edit_data = true;
        this.new_data = false;
    }

    fileToUpload: File | any = null;
    handleFileInput(file: FileList) {
        this.fileToUpload = file.item(0);
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

        XLSX.writeFile(wb, 'Export_comaddress.xlsx');
    }
}

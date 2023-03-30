import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NavigationExtras } from '@angular/router';
import { Table } from 'primeng/table';
import {
    ConfirmationService,
    MegaMenuItem,
    MenuItem,
    MessageService,
} from 'primeng/api';
import { Router } from '@angular/router';
import * as XLSX from 'xlsx';

import { DatePipe } from '@angular/common';
import { InitialCurrent } from 'src/app/config/initial_current';
import { AppConfig } from 'src/app/config/config';
import { CombranchModel } from 'src/app/models/system/branch';
import { CombranchService } from 'src/app/services/system/combranch.service';

@Component({
    selector: 'app-branch',
    templateUrl: './branch.component.html',
    styleUrls: ['./branch.component.scss'],
})
export class BranchComponent implements OnInit {
    combranch_list: CombranchModel[] = [];
    selectedcombranch: CombranchModel = new CombranchModel();
    items: MenuItem[] = [];
    edit_combranch: boolean = false;
    new_combranch: boolean = false;

    constructor(
        private combranchService: CombranchService,
        private router: Router,
        private messageService: MessageService,
        private confirmationService: ConfirmationService,
        private datePipe: DatePipe,


    ) {}

    ngOnInit(): void {
        this.doGetInitialCurrent();



        setTimeout(() => {
            this.doLoadLanguage();
            this.doLoadMenu();
            this.doLoadCombranch();
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

    title_page: string = 'combranch';
    title_num_emp: string = 'combranch';
    title_new_emp: string = 'New';
    title_resign_emp: string = 'Resign';
    title_new: string = 'New';
    title_edit: string = 'Edit';
    title_delete: string = 'Delete';
    title_import: string = 'Import';
    title_export: string = 'Export';
    title_save: string = 'Save';
    title_code: string = 'Emp. Code';
    title_initial: string = 'Initial';
    title_emptype: string = 'Type';
    title_position: string = 'Position';
    title_Fname: string = 'Firstname';
    title_Lname: string = 'Surname';
    title_startdate: string = 'Start Date';
    title_status: string = 'Status';
    title_apprdate: string = 'Approve Date';
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
            this.title_page = 'ข้อมูลพนักงาน';
            this.title_num_emp = 'จำนวนพนักงาน';
            this.title_new_emp = 'พนักงานใหม่';
            this.title_resign_emp = 'พนักงานลาออก';
            this.title_new = 'เพิ่ม';
            this.title_edit = 'แก้ไข';
            this.title_delete = 'ลบ';
            this.title_import = 'นำเข้า';
            this.title_export = 'โอนออก';
            this.title_save = 'บันทึก';
            this.title_code = 'รหัสพนักงาน';
            this.title_initial = 'คำนำหน้า';
            this.title_emptype = 'ประเภทพนักงาน';
            this.title_position = 'ตำแหน่ง';
            this.title_Fname = 'ชื่อ';
            this.title_Fname = 'ชื่อนามสกุล';
            this.title_startdate = 'วันที่เริ่มงาน';
            this.title_status = 'สถานะ';
            this.title_apprdate = 'วันที่อนุมัติ';
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
                label: 'New',
                icon: 'pi pi-fw pi-plus',
                command: (event) => {
                    this.selectedcombranch = new CombranchModel();
                    this.selectComManage();
                },
            },
            {
                label: 'Import',
                icon: 'pi pi-fw pi-file-import',
                command: (event) => {
                    this.showUpload();
                },
            },
            {
                label: 'Export',
                icon: 'pi pi-fw pi-file-export',
                command: (event) => {
                    this.exportAsExcel();
                },
            },
        ];
    }
    doLoadCombranch() {
        this.combranchService.combranch_get('').then((res) => {
            this.combranch_list = res;
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
        });
        console.log(this.selectedcombranch);
    }

    doRecordCombranch() {
        this.combranchService
            .combranch_record(this.selectedcombranch)
            .then((res) => {
                console.log(res);
                let result = JSON.parse(res);

                if (result.success) {
                    this.messageService.add({
                        severity: 'success',
                        summary: 'Success',
                        detail: result.message,
                    });

                    this.doLoadCombranch();
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
                this.doDeleteCombranch();
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
    doDeleteCombranch() {
        console.log(this.selectedcombranch);

        this.combranchService
            .combranch_delete(this.selectedcombranch)
            .then((res) => {
                console.log(res);
                let result = JSON.parse(res);

                if (result.success) {
                    this.messageService.add({
                        severity: 'success',
                        summary: 'Success',
                        detail: result.message,
                    });
                    this.doLoadCombranch();
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
        this.selectedcombranch = new CombranchModel();
    }
    onRowSelectCombranch(event: Event) {
        this.edit_combranch = true;
        this.new_combranch = true;
    }

    fileToUpload: File | any = null;
    handleFileInput(file: FileList) {
        this.fileToUpload = file.item(0);
    }

    doUploadCombranch() {
        console.log('Upload');
        if (this.fileToUpload) {
            this.confirmationService.confirm({
                message: 'Confirm Upload file : ' + this.fileToUpload.name,
                header: 'Import File',
                icon: 'pi pi-exclamation-triangle',
                accept: () => {
                    const filename =
                        'Combranch_' +
                        this.datePipe.transform(new Date(), 'yyyyMMddHHmm');
                    const filetype = 'xls';

                    this.combranchService
                        .combranch_import(this.fileToUpload, filename, filetype)
                        .then((res) => {
                            console.log(res);
                            let result = JSON.parse(res);

                            if (result.success) {
                                this.messageService.add({
                                    severity: 'success',
                                    summary: 'Success',
                                    detail: result.message,
                                });
                                this.doLoadCombranch();
                                this.edit_combranch = false;
                                this.new_combranch = false;
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
    displayUpload: boolean = false;
    showUpload() {
        this.displayUpload = true;
    }

    @ViewChild('TABLE') table: ElementRef | any = null;

    exportAsExcel() {
        const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(
            this.table.nativeElement
        );
        const wb: XLSX.WorkBook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

        XLSX.writeFile(wb, 'Export_Combranchinfo.xlsx');
    }

    selectComManage() {
        console.log(this.selectedcombranch.combranch_code);

        let navigationExtras: NavigationExtras = {
            queryParams: {
                combranchcode: this.selectedcombranch.combranch_code,
            },
        };

        this.router.navigate(['system/sysbranch'], navigationExtras);
    }
}

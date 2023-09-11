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
import { AccessdataModel } from 'src/app/models/system/security/accessdata';

@Component({
    selector: 'app-branch',
    templateUrl: './branch.component.html',
    styleUrls: ['./branch.component.scss'],
})
export class BranchComponent implements OnInit {
    combranch_code: string = '';

    combranch_list: CombranchModel[] = [];
    selectedcombranch: CombranchModel = new CombranchModel();
    items: MenuItem[] = [];
    home: any;
    itemslike: MenuItem[] = [];
    edit_combranch: boolean = false;
    new_combranch: boolean = false;
    isHovered = false;
    constructor(
        private combranchService: CombranchService,
        private router: Router,
        private messageService: MessageService,
        private confirmationService: ConfirmationService,
        private datePipe: DatePipe,


    ) { }

    ngOnInit(): void {
        this.doGetInitialCurrent();
        this.doLoadLanguage();
        this.doLoadMenu();

        setTimeout(() => {


            this.doLoadCombranch();
        }, 500);
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
    title_file: { [key: string]: string } = { EN: "File ", TH: "ไฟล์" }

    title_codes: string = 'Branch Id';
    title_social_security_branch: string = 'Social Security Branch No.';
    title_name: string = 'Branch Name';
    title_english_name: string = 'Name (Eng)';
    title_system: string = "System";
    title_manage: string = 'Manage';

    title_page: string = 'Branch';
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
    title_genaral_system: string = 'Manage System';

    doLoadLanguage() {
        if (this.initial_current.Language == 'TH') {
            this.title_genaral_system = 'จัดการ';

            this.title_codes = 'รหัสสาขา';
            this.title_social_security_branch = 'สาขาประกันสังคม'
            this.title_name = 'ชื่อสาขา';
            this.title_english_name = 'ชื่ออังกฤษ';
            this.title_system = "ระบบ";
            this.title_manage = 'จัดการ';

            this.title_page = 'ข้อมูลสาขา';
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
        this.itemslike = [{ label: this.title_genaral_system, routerLink: '/system/sys-manage' },
        { label: this.title_page, styleClass: 'activelike' }];
        this.home = { icon: 'pi pi-home', routerLink: '/' };
        this.items = [
            {
                label: this.title_new,
                icon: 'pi pi-fw pi-plus',
                command: (event) => {
                    if (this.accessData.accessdata_new) {
                        this.selectedcombranch = new CombranchModel();
                        this.selectComManage();
                    } else {
                        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Permission denied' });
                    }
                },
            },
            {

                label: "Template",
                icon: 'pi-download',
                command: (event) => {
                    window.open('assets/OPRFileImport/(OPR)Import System/(OPR)Import System Combranch.xlsx', '_blank');
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
    doLoadCombranch() {
        this.combranchService.combranch_get(this.combranch_code).then((res) => {
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
            key: "myDialog"
        });
        // console.log(this.selectedcombranch);
    }

    doRecordCombranch() {
        this.combranchService
            .combranch_record(this.selectedcombranch)
            .then((res) => {
                // console.log(res);
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

    confirmDelete(data: any) {
        this.confirmationService.confirm({
            message: 'คุณต้องการลบข้อมูลบริษัทนี้ใช่หรือไม่?',
            header: 'ยืนยันการลบ',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.doDeleteCombranch(data);
            },
            reject: () => {
                this.messageService.add({
                    severity: 'warn',
                    summary: 'ยกเลิก',
                    detail: 'ยกเลิกการลบข้อมูล',
                });
            },
        });
    }

    doDeleteCombranch(data: any) {
        // console.log(data);

        this.combranchService.combranch_delete(data).then((res) => {
            // console.log(res);
            let result = JSON.parse(res);

            if (result.success) {
                this.messageService.add({
                    severity: 'success',
                    summary: 'สำเร็จ',
                    detail: result.message,
                });
                this.doLoadCombranch();
            } else {
                this.messageService.add({
                    severity: 'error',
                    summary: 'ผิดพลาด',
                    detail: result.message,
                });
            }
        });
    }

    // ฟังก์ชันที่ถูกเรียกเมื่อเมาส์อยู่บนปุ่ม
    onButtonHover() {
        this.isHovered = true;
    }

    // ฟังก์ชันที่ถูกเรียกเมื่อเมาส์ออกจากปุ่ม
    onButtonLeave() {
        this.isHovered = false;
    }
    close() {
        this.new_combranch = false;
        this.selectedcombranch = new CombranchModel();
    }
    onRowSelectCombranch(event: Event) {
        this.selectComManage()
        // this.edit_combranch = true;
        // this.new_combranch = true;
    }

    fileToUpload: File | any = null;
    handleFileInput(file: FileList) {
        this.fileToUpload = file.item(0);
    }

    doUploadCombranch() {
        // console.log('Upload');
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
                            // console.log(res);
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
        // console.log(this.selectedcombranch.combranch_code);

        let navigationExtras: NavigationExtras = {
            queryParams: {
                combranchcode: this.selectedcombranch.combranch_code,
            },
        };

        this.router.navigate(['system/sysbranch'], navigationExtras);
    }
}

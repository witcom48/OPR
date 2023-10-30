import { Component, Input, ElementRef, OnInit, ViewChild } from '@angular/core';
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
import { InitialModel } from '../../../models/employee/policy/initial';
import { EmptypeModel } from '../../../models/employee/policy/emptype';
import { EmpstatusModel } from '../../../models/employee/policy/empstatus';

import { InitialService } from '../../../services/emp/policy/initial.service';
import { EmptypeService } from '../../../services/emp/policy/emptype.service';
import { EmpstatusService } from '../../../services/emp/policy/empstatus.service';
import { CompanyModel } from 'src/app/models/system/company';
import { CompanyService } from 'src/app/services/system/company.service';
import { AccessdataModel } from 'src/app/models/system/security/accessdata';

@Component({
    selector: 'app-system-company',
    templateUrl: './system-company.component.html',
    styleUrls: ['./system-company.component.scss'],
})
export class SystemCompanyComponent implements OnInit {
    company_list: CompanyModel[] = [];
    selectedcompany: CompanyModel = new CompanyModel();
    items: MenuItem[] = [];
    home: any;
    itemslike: MenuItem[] = [];
    edit_company: boolean = false;
    new_company: boolean = false;
    isHovered = false;
    constructor(
        private companyService: CompanyService,
        private router: Router,
        private messageService: MessageService,
        private confirmationService: ConfirmationService,
        private datePipe: DatePipe,

        private initialService: InitialService,
        private emptypeService: EmptypeService,
        private empstatusService: EmpstatusService
    ) { }

    ngOnInit(): void {
        this.doGetInitialCurrent();
        this.doLoadLanguage();
        //   this.doLoadInitialList();
        //   this.doLoadEmptypeList();
        //   this.doLoadEmpstatusList();
        this.doLoadMenu();
        setTimeout(() => {


            this.doLoadCompany();
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
    title_dropfile: { [key: string]: string } = { EN: "Drop files here", TH: "วางไฟล์ที่นี่" };
    title_choose: { [key: string]: string } = { EN: "Choose File", TH: "เลือกไฟล์" };
    title_nofile: { [key: string]: string } = { EN: "No file chosen", TH: "ไม่มีไฟล์ที่เลือก" };
    title_or: { [key: string]: string } = { EN: "or", TH: "หรือ" };
    title_template: { [key: string]: string } = { EN: "Template", TH: "เทมเพลต" };
    title_codes: string = 'Code';
    title_name: string = 'Name';

    title_initials: string = 'Initials';
    title_thai_name: string = 'Name (Thai)';
    title_english_name: string = 'Name (Eng)';
    title_manage: string = 'Manage';

    title_system: string = "System";
    title_page: string = 'Company';
    title_num_emp: string = 'Company';
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

            this.title_manage = 'จัดการ';
            this.title_codes = 'รหัสบริษัท';
            this.title_name = 'ชื่อบริษัท';
            this.title_initials = 'ชื่อย่อ';
            this.title_thai_name = 'ชื่อไทย';
            this.title_english_name = 'ชื่ออังกฤษ';
            this.title_system = "ระบบ";
            this.title_page = 'ข้อมูลบริษัท';
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
            this.title_upload = 'อัปโหลด';

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
                        this.selectedcompany = new CompanyModel();
                        this.selectComManage();
                    } else {
                        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Permission denied' });
                    }
                },
            },
            {

                label:this.title_template[this.initial_current.Language],
                icon: 'pi-download',
                command: (event) => {
                    window.open('assets/OPRFileImport/(OPR)Import System/(OPR)Import System Company.xlsx', '_blank');
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

    doLoadCompany() {
        this.companyService.company_get(this.initial_current.CompCode).then((res) => {
            this.company_list = res;
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
            key: 'myDialog',
        });
        // console.log(this.selectedcompany);
    }

    doRecordCompany() {
        this.companyService
            .company_recordall(this.selectedcompany)
            .then((res) => {
                // console.log(res);
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

    confirmDelete(data: any) {
        this.confirmationService.confirm({
            message: this.title_confirm_delete,
            header: this.title_confirm,
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.deleteCompany(data);
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

    deleteCompany(data: any) {
        // console.log(data);

        this.companyService.company_delete(data).then((res) => {
            // console.log(res);
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

    // confirmDelete() {
    //     this.confirmationService.confirm({
    //         message: this.title_confirm_delete,
    //         header: this.title_confirm,
    //         icon: 'pi pi-exclamation-triangle',
    //         accept: () => {
    //             this.doDeleteCompany();
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
    // doDeleteCompany() {
    //     // console.log(this.selectedcompany);

    //     this.companyService.company_delete(this.selectedcompany).then((res) => {
    //         // console.log(res);
    //         let result = JSON.parse(res);

    //         if (result.success) {
    //             this.messageService.add({
    //                 severity: 'success',
    //                 summary: 'Success',
    //                 detail: result.message,
    //             });
    //             this.doLoadCompany();
    //         } else {
    //             this.messageService.add({
    //                 severity: 'error',
    //                 summary: 'Error',
    //                 detail: result.message,
    //             });
    //         }
    //     });
    // }
    close() {
        this.new_company = false;
        this.selectedcompany = new CompanyModel();
    }
    onRowSelectCompany(event: Event) {

        this.selectComManage();
        // this.edit_company = true;
        // this.new_company = true;
    }

    // fileToUpload: File | any = null;
    // handleFileInput(file: FileList) {
    //     this.fileToUpload = file.item(0);
    // }
    fileToUpload: File | any = null;
    selectedFileName: string = '';
    handleFileInput(file: FileList) {
      this.fileToUpload = file.item(0);
      if (this.fileToUpload) {
        this.selectedFileName = this.fileToUpload.name;
      } else {
        this.selectedFileName = this.title_nofile[this.initial_current.Language];
      }
    }

    // ฟังก์ชันที่ถูกเรียกเมื่อเมาส์อยู่บนปุ่ม
    onButtonHover() {
        this.isHovered = true;
    }

    // ฟังก์ชันที่ถูกเรียกเมื่อเมาส์ออกจากปุ่ม
    onButtonLeave() {
        this.isHovered = false;
    }
    doUploadCompany() {
        // console.log('Upload');
        if (this.fileToUpload) {
            this.confirmationService.confirm({
                message: 'Confirm Upload file : ' + this.fileToUpload.name,
                header: 'Import File',
                icon: 'pi pi-exclamation-triangle',
                accept: () => {
                    const filename =
                        'Company_' +
                        this.datePipe.transform(new Date(), 'yyyyMMddHHmm');
                    const filetype = 'xls';

                    this.companyService
                        .company_import(this.fileToUpload, filename, filetype)
                        .then((res) => {
                            // console.log(res);
                            let result = JSON.parse(res);

                            if (result.success) {
                                this.messageService.add({
                                    severity: 'success',
                                    summary: 'Success',
                                    detail: result.message,
                                });
                                this.doLoadCompany();
                                this.edit_company = false;
                                this.new_company = false;
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
        ); //converts a DOM TABLE element to a worksheet
        const wb: XLSX.WorkBook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

        XLSX.writeFile(wb, 'Export_Companyinfo.xlsx');
    }

    selectComManage() {
        // console.log(this.selectedcompany.company_code);

        let navigationExtras: NavigationExtras = {
            queryParams: {
                companycode: this.selectedcompany.company_code,
            },
        };

        this.router.navigate(['system/CompanysComponent'], navigationExtras);
    }
}

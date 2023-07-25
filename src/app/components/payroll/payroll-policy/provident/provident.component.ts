import { DatePipe } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, MenuItem, MessageService, PrimeNGConfig } from 'primeng/api';
import { AppConfig } from 'src/app/config/config';
import { InitialCurrent } from 'src/app/config/initial_current';
import { ProvidentModel } from 'src/app/models/payroll/provident';
import { ProvidentWorkageModel } from 'src/app/models/payroll/provident_workage';
import { ProvidentService } from 'src/app/services/payroll/provident.service';
import * as XLSX from 'xlsx';

@Component({
    selector: 'app-provident',
    templateUrl: './provident.component.html',
    styleUrls: ['./provident.component.scss'],
})
export class ProvidentComponent implements OnInit {
    constructor(
        private messageService: MessageService,
        private confirmationService: ConfirmationService,
        private datePipe: DatePipe,
        private providentService: ProvidentService,
        private router: Router,


    ) { }
    @ViewChild('TABLE') table: ElementRef | any = null;
    new_data: boolean = false;
    edit_data: boolean = false;

    fileToUpload: File | any = null;
    displayUpload: boolean = false;

    displayaddcondition: boolean = false;
    displayeditcondition: boolean = false;

    items: MenuItem[] = [];
    itemslate: MenuItem[] = [];

    provident_list: ProvidentModel[] = [];
    selectedProvident: ProvidentModel = new ProvidentModel();

    selectedProvidentWorka: ProvidentWorkageModel = new ProvidentWorkageModel();

    public initial_current: InitialCurrent = new InitialCurrent();
    doGetInitialCurrent() {
        this.initial_current = JSON.parse(
            localStorage.getItem(AppConfig.SESSIONInitial) || '{}'
        );
        if (!this.initial_current.Token) {
            this.router.navigateByUrl('login');
        }
    }

    title_payroll: string = 'Payroll';
    title_policy: string = 'Set Policy';
    title_page: string = 'Provident Fund';
    title_new: string = 'New';
    title_type: string = 'Type';
    title_regular: string = 'Regular';
    title_income: string = 'Income';
    title_deduct: string = 'Deduct';

    title_Workage: string = 'Workage';
    title_From: string = 'From';
    title_To: string = 'To';
    title_Rateemp: string = 'Emp. (%)';
    title_Ratecom: string = 'Com. (%)';
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

    doLoadLanguage() {
        if (this.initial_current.Language == 'TH') {
            this.title_payroll = 'บัญชี';
            this.title_policy = 'กำหนดนโยบาย';
            this.title_page = 'กองทุนสำรองเลี้ยงชีพ';
            this.title_new = 'เพิ่ม';
            this.title_type = 'ประเภท';
            this.title_regular = 'รูปแบบ';
            this.title_income = 'เงินได้';
            this.title_deduct = 'เงินหัก';

            this.title_Workage = 'อัตราตามอายุงาน';
            this.title_From = 'จาก';
            this.title_To = 'ถึง';
            this.title_Rateemp = 'พนักงาน (%)';
            this.title_Ratecom = 'สมทบ (%)';
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
    ngOnInit(): void {

        this.doGetInitialCurrent();
        this.doLoadLanguage();
        this.doLoadMenu();
        this.doLoadLate();
    }



    doLoadLate() {
        this.provident_list = [];
        var tmp = new ProvidentModel();
        this.providentService.provident_get(tmp).then(async (res) => {
            this.provident_list = await res;
        });
    }
    async doRecordLate(data: ProvidentModel) {
        await this.providentService.provident_record(data).then((res) => {
            // console.log(res);
            if (res.success) {
                this.messageService.add({
                    severity: 'success',
                    summary: 'Success',
                    detail: res.message,
                });
                this.doLoadLate();
            } else {
                this.messageService.add({
                    severity: 'error',
                    summary: 'Error',
                    detail: res.message,
                });
            }
        });
        this.new_data = false;
        this.edit_data = false;
        this.displayManage = false;
    }
    async doDeleteLate(data: ProvidentModel) {
        await this.providentService.provident_delete(data).then((res) => {
            // console.log(res);
            if (res.success) {
                this.messageService.add({
                    severity: 'success',
                    summary: 'Success',
                    detail: res.message,
                });
                this.doLoadLate();
            } else {
                this.messageService.add({
                    severity: 'error',
                    summary: 'Error',
                    detail: res.message,
                });
            }
        });
        this.new_data = false;
        this.edit_data = false;
        this.displayManage = false;

    }
    doUploadLate() {
        const filename =
            'LATE_' + this.datePipe.transform(new Date(), 'yyyyMMddHHmm');
        const filetype = 'xls';
        this.providentService
            .provident_import(this.fileToUpload, filename, filetype)
            .then((res) => {
                // console.log(res);
                if (res.success) {
                    this.messageService.add({
                        severity: 'success',
                        summary: 'Success',
                        detail: res.message,
                    });
                    this.doLoadLate();
                    this.edit_data = false;
                    this.new_data = false;
                } else {
                    this.messageService.add({
                        severity: 'error',
                        summary: 'Error',
                        detail: res.message,
                    });
                }
                this.fileToUpload = null;
            });
    }
    handleFileInput(file: FileList) {
        this.fileToUpload = file.item(0);
    }

    doLoadMenu() {
        this.items = [
            {
                label: this.title_new,
                icon: 'pi-plus',
                command: (event) => {
                    this.showManage()
                    this.selectedProvident = new ProvidentModel();
                    this.new_data = true;
                    this.edit_data = false;
                },
            },
            {
                label: this.title_import,
                icon: 'pi-file-import',
                command: (event) => {
                    this.showUpload();
                },
            },
            {
                label: this.title_export,
                icon: 'pi-file-export',
                command: (event) => {
                    this.exportAsExcel();
                },
            },
        ];
        this.itemslate = [
            {
                label: this.title_new,
                icon: 'pi-plus',
                command: (event) => {
                    this.selectedProvidentWorka = new ProvidentWorkageModel();
                    this.displayaddcondition = true;
                    this.displayeditcondition = false;
                },
            },
        ];
    }
    showUpload() {
        this.displayUpload = true;
    }
    Uploadfile() {
        if (this.fileToUpload) {
            this.confirmationService.confirm({
                message: 'Confirm Upload file : ' + this.fileToUpload.name,
                header: 'Import File',
                icon: 'pi pi-exclamation-triangle',
                accept: () => {
                    this.displayUpload = false;
                    this.doUploadLate();
                },
                key: "myDialog",
                reject: () => {
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
    close() {
        this.new_data = false;
        this.edit_data = false;
        this.selectedProvident = new ProvidentModel();
        this.displayaddcondition = false;
        this.displayeditcondition = false;
        this.selectedProvidentWorka = new ProvidentWorkageModel();
    }
    closedispaly() {
        this.displayaddcondition = false;
        this.displayeditcondition = false;
        this.selectedProvidentWorka = new ProvidentWorkageModel();
    }
    Save() {
        this.doRecordLate(this.selectedProvident);
    }
    Savelate() {
        if (!this.displayeditcondition) {
            this.selectedProvident.providentWorkage_data = this.selectedProvident.providentWorkage_data.concat({
                company_code: this.initial_current.CompCode,
                provident_code: this.selectedProvident.provident_code,
                workage_from: this.selectedProvidentWorka.workage_from,
                workage_to: this.selectedProvidentWorka.workage_to,
                rate_emp: this.selectedProvidentWorka.rate_emp,
                rate_com: this.selectedProvidentWorka.rate_com,
            });
        }
        this.displayaddcondition = false;
        this.displayeditcondition = false;
        this.selectedProvidentWorka = new ProvidentWorkageModel();
    }

    Delete() {
        this.doDeleteLate(this.selectedProvident);
    }
    Deletelate() {
        this.selectedProvident.providentWorkage_data = this.selectedProvident.providentWorkage_data.filter(
            (item) => {
                return item !== this.selectedProvidentWorka;
            }
        );
        this.displayaddcondition = false;
        this.displayeditcondition = false;
        this.selectedProvidentWorka = new ProvidentWorkageModel();
    }


    onRowSelectList(event: any) {
        this.displayaddcondition = true;
        this.displayeditcondition = true;
        this.displayManage = true;


        // console.log(this.selectedProvidentWorka);
    }
    onRowSelect(event: any) {
        this.new_data = true;
        this.edit_data = true;
        this.displayManage = true;

    }

    displayManage: boolean = false;
    position: string = "right";
    showManage() {
        this.displayManage = true
    }
    exportAsExcel() {
        const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(
            this.table.nativeElement
        );
        for (var i in ws) {
            if (i.startsWith('!') || i.charAt(1) !== '1') {
                continue;
            }
            var n = 0;
            for (var j in ws) {
                if (
                    j.startsWith(i.charAt(0)) &&
                    j.charAt(1) !== '1' &&
                    ws[i].v !== ''
                ) {
                    ws[j].v = ws[j].v.replace(ws[i].v, '');
                } else {
                    n += 1;
                }
            }
        }
        const wb: XLSX.WorkBook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

        XLSX.writeFile(wb, 'Export_Late.xlsx');
    }
}

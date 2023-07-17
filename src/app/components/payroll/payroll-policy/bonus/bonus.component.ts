import { DatePipe } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, MenuItem, MessageService } from 'primeng/api';
import { AppConfig } from 'src/app/config/config';
import { InitialCurrent } from 'src/app/config/initial_current';
import { BonusModel } from 'src/app/models/payroll/bonus';
import { BonusrateModel } from 'src/app/models/payroll/bonusrate';
import { ItemsModel } from 'src/app/models/payroll/items';
import { BonusService } from 'src/app/services/payroll/bonus.service';
import { ItemService } from 'src/app/services/payroll/item.service';
import * as XLSX from 'xlsx';

@Component({
    selector: 'app-bonus',
    templateUrl: './bonus.component.html',
    styleUrls: ['./bonus.component.scss'],
})
export class BonusComponent implements OnInit {
    item_list: never[] | undefined;
    constructor(
        private messageService: MessageService,
        private confirmationService: ConfirmationService,
        private datePipe: DatePipe,
        private bonusService: BonusService,
        private itemService: ItemService,

        private router: Router
    ) {}
    @ViewChild('TABLE') table: ElementRef | any = null;
    new_data: boolean = false;
    edit_data: boolean = false;

    fileToUpload: File | any = null;
    displayUpload: boolean = false;

    displayaddcondition: boolean = false;
    displayeditcondition: boolean = false;

    items: MenuItem[] = [];
    itemslate: MenuItem[] = [];

    bonus_list: BonusModel[] = [];
    selectedBonus: BonusModel = new BonusModel();

    conditions: BonusrateModel = new BonusrateModel();

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
    title_page: string = 'Bonus';
    title_new: string = 'New';
    title_type: string = 'Type';
    title_regular: string = 'Regular';
    title_income: string = 'Income';
    title_deduct: string = 'Deduct';
    title_Workage: string = 'Workage';

    title_Item: string = 'Income ID';
    title_Rate: string = 'Rate';
    title_From: string = 'From';
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
            this.title_payroll= 'บัญชีเงินเดือน';
            this.title_policy = 'กำหนดนโยบาย';
            this.title_page = 'โบนัท';
            this.title_new = 'เพิ่ม';
            this.title_type = 'ประเภท';
            this.title_regular = 'รูปแบบ';
            this.title_income = 'เงินได้';
            this.title_deduct = 'เงินหัก';

            this.title_Item = 'รหัสเงินได้';
            this.title_Workage = 'อัตราตามอายุงาน';
            this.title_Rate = 'อัตรา';
            this.title_From = 'จาก';
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
        this.doLoadLanguage();
        this.doLoadItemsList();

        this.doGetInitialCurrent();
        this.doLoadMenu();
        this.doLoadLate();
    }

    doLoadLate() {
        this.bonus_list = [];
        var tmp = new BonusModel();
        this.bonusService.bonus_get(tmp).then(async (res) => {
            this.bonus_list = await res;
        });
    }
    async doRecordLate(data: BonusModel) {
        await this.bonusService.bonus_record(data).then((res) => {
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
    }
    async doDeleteLate(data: BonusModel) {
        await this.bonusService.bonus_delete(data).then((res) => {
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
    }
    doUploadLate() {
        const filename =
            'LATE_' + this.datePipe.transform(new Date(), 'yyyyMMddHHmm');
        const filetype = 'xls';
        this.bonusService
            .bonus_import(this.fileToUpload, filename, filetype)
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
                    this.selectedBonus = new BonusModel();
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
                    this.conditions = new BonusrateModel();
                    this.displayaddcondition = true;
                    this.displayeditcondition = false;
                },
            },
        ];
    }

    // get data dropdown
    ItemsList: ItemsModel[] = [];
    doLoadItemsList() {
        var tmp = new ItemsModel();
        this.itemService.item_get(tmp).then((res) => {
            this.ItemsList = res;
        });
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
        this.selectedBonus = new BonusModel();
        this.displayaddcondition = false;
        this.displayeditcondition = false;
        this.conditions = new BonusrateModel();
    }
    closedispaly() {
        this.displayaddcondition = false;
        this.displayeditcondition = false;
        this.conditions = new BonusrateModel();
    }
    Save() {
        // console.log(this.selectedBonus);
        this.doRecordLate(this.selectedBonus);
    }
    Savelate() {
        if (!this.displayeditcondition) {
            this.selectedBonus.bonus_data =
                this.selectedBonus.bonus_data.concat({
                    company_code: this.initial_current.CompCode,
                    bonus_code: this.selectedBonus.bonus_code,
                    bonusrate_from: this.conditions.bonusrate_from,
                    bonusrate_to: this.conditions.bonusrate_to,
                    bonusrate_rate: this.conditions.bonusrate_rate,
                });
        }
        this.displayaddcondition = false;
        this.displayeditcondition = false;
        this.conditions = new BonusrateModel();
    }
    Delete() {
        this.doDeleteLate(this.selectedBonus);
    }
    Deletelate() {
        this.selectedBonus.bonus_data = this.selectedBonus.bonus_data.filter(
            (item) => {
                return item !== this.conditions;
            }
        );
        this.displayaddcondition = false;
        this.displayeditcondition = false;
        this.conditions = new BonusrateModel();
    }
    onRowSelectList(event: any) {
        this.displayaddcondition = true;
        this.displayeditcondition = true;
        // console.log(this.conditions);
    }
    onRowSelect(event: any) {
        this.new_data = true;
        this.edit_data = true;
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

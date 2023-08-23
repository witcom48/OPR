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
import { ComlocationModel } from 'src/app/models/system/comlocation';
import { ComlocationService } from 'src/app/services/system/comlocation.service';
import { RoundsModel } from 'src/app/models/system/manage/rounds';
import { RoundsService } from 'src/app/services/system/manage1/rounds.service';
import { MTPolroundsModel } from 'src/app/models/system/manage/polrounds';
import { MTRoundsModel } from 'src/app/models/system/manage/mt_rounds';
import { PolroundsService } from 'src/app/services/system/manage1/polrounds.service';
import { AccessdataModel } from 'src/app/models/system/security/accessdata';

@Component({
    selector: 'app-polrounds',
    templateUrl: './polrounds.component.html',
    styleUrls: ['./polrounds.component.scss'],
})
export class PolroundsComponent implements OnInit {
    comlocation_list: ComlocationModel[] = [];
    selectedcomlocation: ComlocationModel = new ComlocationModel();
    items: MenuItem[] = [];
    edit_comlocation: boolean = false;
    new_comlocation: boolean = false;
    itemslike: MenuItem[] = [];
    home: any;
    round_list: RoundsModel[] = [];
    round: RoundsModel = new RoundsModel();
    rounds_list: RoundsModel[] = [];
    rounds: RoundsModel = new RoundsModel();

    roundscurrencyList: MTRoundsModel[] | undefined;
    roundstimeList: MTRoundsModel[] | undefined;

    public selectedPF: string = '';
    public selectedSSO: string = '';
    public selectedTAX: string = '';
    public selectedWDAY: string = '';
    public selectedWSUM: string = '';
    public selectedOTDAY: string = '';
    public selectedOTSUM: string = '';
    public selectedAB: string = '';
    public selecteLT: string = '';
    public selecteLV: string = '';
    public selecteNP: string = '';
    public selecteTLT: string = '';
    public selecteTLV: string = '';
    public selecteTOT: string = '';
    public selecteTWK: string = '';
    public selecteloan: string = '';

    title_system: { [key: string]: string } = { EN: 'Manage System', TH: 'จัดการ' };
    title_tab_Manage: { [key: string]: string } = {
        EN: 'Manage System',
        TH: 'จัดการ',
    };
    title_tab_Pol: { [key: string]: string } = {
        EN: 'Selected Rounding',
        TH: 'กำหนดรูปแบบการปัดเศษ',
    };
    title_tab_Currency: { [key: string]: string } = {
        EN: 'Currency Rounding',
        TH: 'เลือกปัดเศษเงิน',
    };

    title_tab_PF: { [key: string]: string } = {
        EN: 'Provident Fund',
        TH: 'กองทุนสำรองเลี้ยงชีพ',
    };
    title_tab_OTDAY: { [key: string]: string } = {
        EN: 'OT Amount Rate',
        TH: 'ค่าแรงล่วงเวลาตามอัตรา',
    };
    title_tab_SSO: { [key: string]: string } = {
        EN: 'Sociall',
        TH: 'ประกันสังคม',
    };

    title_tab_OTSUM: { [key: string]: string } = {
        EN: 'OT Summary',
        TH: 'ค่าล่วงเวลาแบบสรุป',
    };
    title_tab_TAX: { [key: string]: string } = { EN: 'TAX', TH: 'ภาษี' };
    title_tab_WDAY: { [key: string]: string } = {
        EN: 'Wage/Day',
        TH: 'ค่าแรงแบบวัน',
    };

    title_tab_Loan: { [key: string]: string } = { EN: 'Loan', TH: 'สินเชื่อ' };
    title_tab_Loans: { [key: string]: string } = {
        EN: 'Loan',
        TH: 'สินเชื่อ',
    };


    title_tab_AB: { [key: string]: string } = { EN: 'Absent', TH: 'ค่าขาดงาน' };
    title_tab_WSUM: { [key: string]: string } = {
        EN: 'Wage/Salary',
        TH: 'ค่าแรงรายงวด',
    };
    title_tab_LV: { [key: string]: string } = { EN: 'Leave', TH: 'ค่าลางาน' };
    title_tab_NP: { [key: string]: string } = {
        EN: 'Net Income',
        TH: 'รายได้สุทธิ',
    };
    title_tab_LT: { [key: string]: string } = { EN: 'Late', TH: 'ค่าสาย' };
    title_tab_TitleTime: { [key: string]: string } = {
        EN: 'Time Rounding',
        TH: 'เลือกปัดเศษเวลา',
    };
    title_tab_TLT: { [key: string]: string } = { EN: 'Late', TH: 'การสาย' };
    title_tab_TOT: { [key: string]: string } = {
        EN: 'Over Time',
        TH: 'ค่าล่วงเวลา',
    };
    title_tab_TLV: { [key: string]: string } = { EN: 'Leave', TH: 'การลา' };
    title_tab_TWK: { [key: string]: string } = {
        EN: 'Hour Work',
        TH: 'ชัวโมงการทำงาน',
    };
    title_btn_save: { [key: string]: string } = { EN: 'Save', TH: 'บันทึก' };
    //
    title_confirm: { [key: string]: string } = {
        EN: 'Are you sure?',
        TH: 'ยืนยันการทำรายการ',
    };
    title_confirm_record: { [key: string]: string } = {
        EN: 'Confirm to record',
        TH: 'คุณต้องการบันทึกการทำรายการ',
    };
    title_confirm_delete: { [key: string]: string } = {
        EN: 'Confirm to delete',
        TH: 'คุณต้องการลบรายการ',
    };
    title_confirm_yes: { [key: string]: string } = { EN: 'Yes', TH: 'ใช่' };
    title_confirm_no: { [key: string]: string } = { EN: 'No', TH: 'ยกเลิก' };
    title_confirm_cancel: { [key: string]: string } = {
        EN: 'You have cancelled',
        TH: 'คุณยกเลิกการทำรายการ',
    };
    constructor(
        private comlocationService: ComlocationService,
        private router: Router,
        private messageService: MessageService,
        private confirmationService: ConfirmationService,
        private datePipe: DatePipe,
        private roundsService: RoundsService,
        private polroundsService: PolroundsService
    ) { }

    ngOnInit(): void {
        this.doGetInitialCurrent();
        this.doLoadMenu();
        // dropdown
        this.doLoadMTRoundscurrencyList();
        this.doLoadMTRoundstimeList();

        setTimeout(() => {
            this.doLoadPolrounds();
        }, 500);
    }
    doLoadMenu() {
        this.itemslike = [{ label: this.title_system[this.initial_current.Language], routerLink: '/system/sys-manage' }, {
            label: this.title_tab_Pol[this.initial_current.Language], styleClass: 'activelike'
        }];

        this.home = { icon: 'pi pi-home', routerLink: '/' };
    }
    initialData2: InitialCurrent = new InitialCurrent();
    accessData: AccessdataModel = new AccessdataModel();
    public initial_current: InitialCurrent = new InitialCurrent();
    doGetInitialCurrent() {
        this.initial_current = JSON.parse(
            localStorage.getItem(AppConfig.SESSIONInitial) || '{}'
        );
        if (!this.initial_current) {
            this.router.navigateByUrl('');
        }
        this.accessData = this.initialData2.dotGetPolmenu('SYS');

    }

    //get  data dropdown
    doLoadMTRoundscurrencyList() {
        this.round_list = [];
        var tmp = new RoundsModel();
        tmp.round_group = 'Currency';
        this.roundsService.rounds_get(tmp).then(async (res) => {
            this.round_list = await res;
            this.round_list.unshift(tmp)

        });
    }
    doLoadMTRoundstimeList() {
        this.rounds_list = [];
        var tmp = new RoundsModel();
        tmp.round_group = 'time';
        this.roundsService.rounds_get(tmp).then(async (res) => {
            this.rounds_list = await res;
            this.rounds_list.unshift(tmp)

        });
    }

    //แสดงข้อมูล
    polrounds_list: MTPolroundsModel[] = [];
    doLoadPolrounds() {
        this.polrounds_list = [];
        this.polroundsService
            .polround_get(this.initial_current.CompCode)
            .then(async (res) => {
                await res.forEach((element: MTPolroundsModel) => {
                    this.selectedPF = element.polround_pf;
                    this.selectedSSO = element.polround_sso;
                    this.selectedTAX = element.polround_tax;
                    this.selectedWDAY = element.polround_wage_day;
                    this.selectedWSUM = element.polround_wage_summary;
                    this.selectedOTDAY = element.polround_ot_day;
                    this.selectedOTSUM = element.polround_ot_summary;
                    this.selectedAB = element.polround_absent;
                    this.selecteLT = element.polround_late;
                    this.selecteloan = element.polround_loan;
                    this.selecteLV = element.polround_leave;
                    this.selecteNP = element.polround_netpay;
                    this.selecteTLT = element.polround_timelate;
                    this.selecteTLV = element.polround_timeleave;
                    this.selecteTOT = element.polround_timeot;
                    this.selecteTWK = element.polround_timeworking;


                });
                this.polrounds_list = await res;
            });
    }

    confirmRecord() {
        this.confirmationService.confirm({
            message: this.title_confirm_record[this.initial_current.Language],
            header: this.title_confirm[this.initial_current.Language],
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.doRecordComlocation();
            },
            reject: () => {
                this.messageService.add({ severity: 'warn', summary: 'Cancelled', detail: this.title_confirm_cancel[this.initial_current.Language] });

            },
            key: "myDialog"
        });
    }

    doRecordComlocation() {
        let polround = new MTPolroundsModel();
        polround.polround_pf = this.selectedPF;
        polround.polround_sso = this.selectedSSO;
        polround.polround_tax = this.selectedTAX;
        polround.polround_wage_day = this.selectedWDAY;
        polround.polround_wage_summary = this.selectedWSUM;
        polround.polround_ot_day = this.selectedOTDAY;
        polround.polround_ot_summary = this.selectedOTSUM;
        polround.polround_absent = this.selectedAB;
        polround.polround_late = this.selecteLT;
        polround.polround_loan = this.selecteloan;

        polround.polround_leave = this.selecteLV;
        polround.polround_netpay = this.selecteNP;
        polround.polround_timelate = this.selecteTLT;
        polround.polround_timeleave = this.selecteTLV;
        polround.polround_timeot = this.selecteTOT;
        polround.polround_timeworking = this.selecteTWK;

        this.polroundsService.polround_record(polround).then((res) => {
            // console.log(res);
            let result = JSON.parse(res);

            if (result.success) {
                this.messageService.add({ severity: 'success', summary: 'Success', detail: result.message, });
            } else {
                this.messageService.add({ severity: 'error', summary: 'Error', detail: result.message, });
            }
        });
    }

    close() {
        this.new_comlocation = false;
        this.selectedcomlocation = new ComlocationModel();
    }
    onRowSelectComlocation(event: Event) {
        this.edit_comlocation = true;
        this.new_comlocation = true;
    }

    fileToUpload: File | any = null;
    handleFileInput(file: FileList) {
        this.fileToUpload = file.item(0);
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

        XLSX.writeFile(wb, 'Export_Comlocationinfo.xlsx');
    }

    selectComManage() {
        // console.log(this.selectedcomlocation.comlocation_code);

        let navigationExtras: NavigationExtras = {
            queryParams: {
                comlocationcode: this.selectedcomlocation.comlocation_code,
            },
        };
    }
}

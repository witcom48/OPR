import { Component, OnInit } from '@angular/core';
import { AppConfig } from '../../../../config/config';
import { InitialCurrent } from '../../../../config/initial_current';
import { MenuItem } from 'primeng/api';
import { AccessdataModel } from 'src/app/models/system/security/accessdata';
interface Menu {
    title: string;
    link: string;
    accessCode: string;
}
@Component({
    selector: 'app-sys-manage',
    templateUrl: './sys-manage.component.html',
    styleUrls: ['./sys-manage.component.scss']
})
export class SysManageComponent implements OnInit {

    router: any;

    constructor() { }
    itemslike: MenuItem[] = [];
    home: any;
    ngOnInit(): void {
        this.doGetInitialCurrent();
        this.doLoadLanguage();
        this.setMenus();
        this.itemslike = [{ label: this.title_system_manage, routerLink: '/system/sys-manage', styleClass: 'activelike' }];

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
    }
    title_system_manage: string = 'Manage System';
    title_links: string = 'Links';
    title_manage: string = 'Manage';
    title_company: string = 'Company';
    title_branch: string = 'Branch';
    title_reason: string = 'Reason';
    title_structure_code: string = 'Structure Code';
    title_year_period: string = 'Year Period';
    title_rounding: string = 'Rounding';
    title_round_decimal: string = 'Rounds (Currency/Time)';
    title_round_time: string = 'Round Time';
    title_round_polrounds: string = 'Rounds Setting';
    manageMenuItems: Menu[] = [];
    roundingMenuItems: Menu[] = [];
    manageMenuList: Menu[] = [];
    roundingMenuList: Menu[] = [];
    doLoadLanguage() {
        if (this.initial_current.Language == 'TH') {
            this.title_system_manage = 'จัดการ';
            this.title_links = 'ลิงค์';
            this.title_manage = 'จัดการ';
            this.title_company = 'ข้อมูลบริษัท';
            this.title_branch = 'ข้อมูลสาขา';
            this.title_reason = 'เหตุผล';
            this.title_structure_code = 'โครงสร้างรหัสพนักงาน';
            this.title_year_period = 'งวดปี';
            this.title_rounding = 'การปัดเศษ';
            this.title_round_decimal = 'การปัดเศษ';
            this.title_round_time = 'เวลา';
            this.title_round_polrounds = 'กำหนดรูปแบบการปัดเศษ';
        }
        this.manageMenuList = [
            {
                title: this.title_company,
                link: 'company',
                accessCode: 'SYS001-001'
            },
            {
                title: this.title_branch,
                link: 'Branch',
                accessCode: 'SYS001-002'
            },
            {
                title: this.title_reason,
                link: 'system-reason',
                accessCode: 'SYS001-003'
            },
            {
                title: this.title_structure_code,
                link: 'emp-id',
                accessCode: 'SYS001-004'
            },
            {
                title: this.title_year_period,
                link: 'system-yearperiod',
                accessCode: 'SYS001-005'
            },

            // ... other setup menu items ...
        ];

        this.roundingMenuList = [
            {
                title: this.title_round_decimal,
                link: 'sys-roundComponent',
                accessCode: 'SYS001-006'
            },
            // {
            //     title: this.title_round_time,
            //     link: 'sys-addroun',
            //     accessCode: 'SYS001-007'
            // },
            {
                title: this.title_round_polrounds,
                link: 'system-polrounds',
                accessCode: 'SYS001-007'
            },

            // ... other setup menu items ...
        ];
    }

    setMenus() {
        this.accessData = this.initialData2.dotGetPolmenu('SYS');
        this.manageMenuItems = this.manageMenuList.filter(item => this.hasAccessMenu(item.accessCode));
        this.roundingMenuItems = this.roundingMenuList.filter(item => this.hasAccessMenu(item.accessCode));
    }

    private hasAccessMenu(accessCode: string): boolean {
        return this.accessData.accessmenu_data.some(item => item.accessmenu_code === accessCode);
    }
}

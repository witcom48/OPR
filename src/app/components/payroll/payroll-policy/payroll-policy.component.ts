import { Component, OnInit } from '@angular/core';
import { AppConfig } from '../../../config/config';
import { InitialCurrent } from '../../../config/initial_current';
import { MenuItem } from 'primeng/api';
import { AccessdataModel } from 'src/app/models/system/security/accessdata';
interface Menu {
    title: string;
    link: string;
    accessCode: string;
}
@Component({
    selector: 'app-payroll-policy',
    templateUrl: './payroll-policy.component.html',
    styleUrls: ['./payroll-policy.component.scss']
})
export class PayrollPolicyComponent implements OnInit {

    router: any;
    itemslike: MenuItem[] = [];
    home: any;
    public initial_current: InitialCurrent = new InitialCurrent();
    initialData2: InitialCurrent = new InitialCurrent();
    accessData: AccessdataModel = new AccessdataModel();
    doGetInitialCurrent() {
        this.initial_current = JSON.parse(
            localStorage.getItem(AppConfig.SESSIONInitial) || '{}'
        );
        if (!this.initial_current) {
            this.router.navigateByUrl('');
        }
    }
    title_system_payroll: string = 'Policy Payroll';
    title_system_Policy: string = 'Policy';


    title_Calculation: string = 'Calculation Period';
    title_Taxrate: string = 'Tax Rate';
    title_IncomeDeduct: string = 'Income / Deduct';
    title_Provident_Fund: string = 'Provident Fund';
    title_Bonus: string = 'Bonus';

    title_SetIncomeDeduct: string = 'Set Income / Deduct';
    title_SetBonus: string = 'Set Bonus';
    title_SetProvidentFund: string = 'Set Provident Fund';
    policyMenuItems: Menu[] = [];
    setpolicyMenuItems: Menu[] = [];
    policyMenuList: Menu[] = [];
    setpolicyMenuList: Menu[] = [];
    constructor() { }

    ngOnInit(): void {
        this.doGetInitialCurrent();
        this.doLoadLanguage();
        this.setMenus();
        this.itemslike = [{ label: this.title_system_payroll, routerLink: '/payroll/policy', styleClass: 'activelike' }];

        this.home = { icon: 'pi pi-home', routerLink: '/' };
        // setTimeout(() => {

        // }, 500);
    }

    doLoadLanguage() {
        if (this.initial_current.Language == 'TH') {
            this.title_system_payroll = 'นโยบาย';
            this.title_system_Policy = 'นโยบาย';

            this.title_Calculation = 'กำหนดงวด';
            this.title_Taxrate = 'อัตราภาษี';
            this.title_IncomeDeduct = 'ชนิดเงินได้ / เงินหัก';
            this.title_Provident_Fund = 'กองทุนสำรองเลี้ยงชีพ';
            this.title_Bonus = 'โบนัส';

            this.title_SetIncomeDeduct = 'กำหนดสิทธิเงินได้/เงินหัก';
            this.title_SetBonus = 'กำหนดนโยบายโบนัส';
            this.title_SetProvidentFund = 'กำหนดสิทธิกองทุนสำรองฯ';
        }

        this.policyMenuList = [
            {
                title: this.title_Calculation,
                link: 'calculationperiod',
                accessCode: 'PAY001-001'
            },
            {
                title: this.title_Taxrate,
                link: 'taxrate',
                accessCode: 'PAY001-002'
            },
            {
                title: this.title_IncomeDeduct,
                link: 'items',
                accessCode: 'PAY001-003'
            },
            {
                title: this.title_Provident_Fund,
                link: 'pay-provident',
                accessCode: 'PAY001-004'
            },
            {
                title: this.title_Bonus,
                link: 'pay-bonus',
                accessCode: 'PAY001-005'
            },
            // ... other setup menu items ...
        ];

        this.setpolicyMenuList = [
            {
                title: this.title_SetIncomeDeduct,
                link: 'setitems',
                accessCode: 'PAY001-006'
            },
            {
                title: this.title_SetBonus,
                link: 'setbonus',
                accessCode: 'PAY001-007'
            },
            {
                title: this.title_SetProvidentFund,
                link: 'setprovident',
                accessCode: 'PAY001-008'
            },
            // ... other setup menu items ...
        ];
    }


    setMenus() {
        this.accessData = this.initialData2.dotGetPolmenu('PAY');
        this.policyMenuItems = this.policyMenuList.filter(item => this.hasAccessMenu(item.accessCode));
        this.setpolicyMenuItems = this.setpolicyMenuList.filter(item => this.hasAccessMenu(item.accessCode));
    }

    private hasAccessMenu(accessCode: string): boolean {
        return this.accessData.accessmenu_data.some(item => item.accessmenu_code === accessCode);
    }
}

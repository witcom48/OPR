import { Component, OnInit } from '@angular/core';
import { AppConfig } from '../../../../config/config';
import { InitialCurrent } from '../../../../config/initial_current';
import { MenuItem } from 'primeng/api';

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

        this.itemslike = [{ label: this.title_system_manage, routerLink: '/system/sys-manage', styleClass: 'activelike' }];

        this.home = { icon: 'pi pi-home', routerLink: '/' };

    }

    public initial_current: InitialCurrent = new InitialCurrent();
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
    title_round_decimal: string = 'Round Decimal';
    title_round_time: string = 'Round Time';
    title_round_polrounds: string = 'Currency Rounding';
    doLoadLanguage() {
        if (this.initial_current.Language == 'TH') {
            this.title_system_manage = 'จัดการ';
            this.title_links = 'ลิงค์';
            this.title_manage = 'จัดการ';
            this.title_company = 'ข้อมูลบริษัท';
            this.title_branch = 'ข้อมูลสาขา';
            this.title_reason = 'เหตุผล';
            this.title_structure_code = 'โครงสร้างรหัสพนักงาน';
            this.title_year_period = 'ปี';
            this.title_rounding = 'การปัดเศษ';
            this.title_round_decimal = 'ทศนิยม';
            this.title_round_time = 'เวลา';
            this.title_round_polrounds = 'กำหนดรูปแบบการปัดเศษ';



        }
    }
}

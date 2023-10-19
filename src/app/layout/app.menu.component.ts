import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccountModuleServices } from '../services/self/accountmodule';
import { AppConfig } from '../config/config';
import { PolmenuServices } from '../services/system/security/polmenu.service';
import { PolmenuModel } from '../models/system/security/polmenu';
import { AccessdataModel } from '../models/system/security/accessdata';
import { AccessmenuModel } from '../models/system/security/accessmenu';
import { InitialCurrent } from '../config/initial_current';

// Define TypeScript enum for module codes
enum ModuleCode {
    APR = "APR",
    EMP = "EMP",
    UEMP = "Emp",
    GRP = "GRP",
    PRO = "PRO",
    REQ = "REQ",
    ATT = "ATT",
    PAY = "PAY",
    SYS = "SYS",
    SELF = "SELF",
    // Add more module codes here...
}
declare var menumain: any;
@Component({
    selector: 'app-menu',
    templateUrl: './app.menu.component.html'
})
export class AppMenuComponent implements OnInit {
    langs: any = menumain;
    menuItems: any[] = [{ label: '', items: [] }];
    selectlang: string = "EN";
    initialData: InitialCurrent = new InitialCurrent();
    constructor(
        private router: Router,
        private polmenuServices: PolmenuServices,
    ) { }

    ngOnInit() {
        this.initialData.loading = true;
        const initialSessionData = JSON.parse(localStorage.getItem(AppConfig.SESSIONInitial) || '{}');
        this.selectlang = initialSessionData.Language;
        if (!initialSessionData.Token) {
            // this.initialData.setLoading(false);
            this.initialData.loading = false;
            this.router.navigateByUrl('login');
            return;
        }

        this.generateMenuItems(initialSessionData);
    }

    private generateMenuItems(initialSessionData: any) {
        const moduleMenuConfig: any = {
            [ModuleCode.APR]: {
                label: 'Self Services',
                icon: 'pi-id-card',
                items: [
                    { label: this.langs.get('manager')[this.selectlang], routerLink: ['/self/approve'], accessCode: 'SELF002' },
                    { label: this.langs.get('report')[this.selectlang], routerLink: ['/self/reports'], accessCode: 'SELF003' },
                    // Add more menu items for the 'Self Services' module based on access codes...
                ]
            },


            [ModuleCode.UEMP]: {
                label: 'Self Services',
                icon: 'pi-id-card',
                items: [
                    { label: this.langs.get('employee')[this.selectlang], routerLink: ['/self/employee'], accessCode: 'SELF001' },
                ]
            },

            [ModuleCode.GRP]: {
                label: 'Self Services',
                icon: 'pi-id-card',
                items: [
                    { label: this.langs.get('employee')[this.selectlang], routerLink: ['/self/employee'], accessCode: 'SELF001' },
                ]
            },


            [ModuleCode.SELF]: {
                label: 'Self Services',
                icon: 'pi-id-card',
                items: [
                    { label: this.langs.get('employee')[this.selectlang], routerLink: ['/self/employee'], accessCode: 'SELF001' },
                    { label: this.langs.get('manager')[this.selectlang], routerLink: ['/self/approve'], accessCode: 'SELF002' },
                    { label: this.langs.get('report')[this.selectlang], routerLink: ['/self/reports'], accessCode: 'SELF003' },
                ]
            },
            [ModuleCode.PRO]: {
                label: 'Project',
                icon: 'pi-box',
                items: [
                    { label: 'Policy', routerLink: ['/project/policy'], accessCode: 'PRO001' },
                    { label: 'Project', routerLink: ['/project/list'], accessCode: 'PRO002' },
                    { label: 'Monitor', routerLink: ['/project/monitor'], accessCode: 'PRO003' },
                    { label: 'Timesheet', routerLink: ['/project/timesheet'], accessCode: 'PRO004' },
                    { label: 'Transfer record', routerLink: ['/project/transfer'], accessCode: 'PRO005' },
                    { label: 'Cost comparison', routerLink: ['/project/compare'], accessCode: 'PRO006' },
                    { label: 'Approval list', routerLink: ['/project/approve'], accessCode: 'PRO007' },
                    { label: this.langs.get('report')[this.selectlang], routerLink: ['/project/reports'], accessCode: 'PRO008' },
                ]
            },

            [ModuleCode.EMP]: {
                label: this.langs.get('employee')[this.selectlang],
                icon: 'pi-users',
                items: [
                    { label: 'Policy', routerLink: ['/employee/policy'], accessCode: 'EMP001' },
                    { label: 'Employee info', routerLink: ['/employee/list'], accessCode: 'EMP002' },
                    { label: 'Monitor', routerLink: ['/employee/monitor'], accessCode: 'EMP003' },
                    { label: this.langs.get('report')[this.selectlang], routerLink: ['/employee/reports'], accessCode: 'EMP004' },
                ]
            },

            [ModuleCode.REQ]: {
                label: this.langs.get('recruitment')[this.selectlang],
                icon: 'pi-user-plus',
                items: [
                    { label: 'Policy', routerLink: ['/recruitment/policy'], accessCode: 'REQ001' },
                    { label: this.langs.get('blacklist')[this.selectlang], routerLink: ['/recruitment/blacklist'], accessCode: 'REQ002' },
                    { label: this.langs.get('request')[this.selectlang], routerLink: ['/recruitment/request'], accessCode: 'REQ003' },
                    { label: this.langs.get('applywork')[this.selectlang], routerLink: ['/recruitment/applylist'], accessCode: 'REQ004' },
                    { label: this.langs.get('reqappr')[this.selectlang], routerLink: ['/recruitment/approve'], accessCode: 'REQ005' },
                    { label: this.langs.get('report')[this.selectlang], routerLink: ['/recruitment/reports'], accessCode: 'REQ006' },
                ]
            },

            [ModuleCode.ATT]: {
                label: 'Attendance',
                icon: 'pi-clock',
                items: [
                    { label: 'Policy', routerLink: ['/attendance/policy'], accessCode: 'ATT001' },
                    { label: 'Import Time', routerLink: ['/attendance/import'], accessCode: 'ATT002' },
                    { label: 'Processing Time', routerLink: ['/attendance/process'], accessCode: 'ATT003' },
                    { label: 'View Time', routerLink: ['/attendance/view'], accessCode: 'ATT004' },
                    { label: 'Calculate Time Cost', routerLink: ['/attendance/calculate'], accessCode: 'ATT005' },
                    { label: 'Summary', routerLink: ['/attendance/summary'], accessCode: 'ATT006' },
                    { label: this.langs.get('report')[this.selectlang], routerLink: ['/attendance/reports'], accessCode: 'ATT007' },
                ]
            },

            [ModuleCode.PAY]: {
                label: 'Payroll',
                icon: 'pi-wallet',
                items: [
                    { label: 'Policy', routerLink: ['/payroll/policy'], accessCode: 'PAY001' },
                    { label: 'Calculate', routerLink: ['/payroll/calculate'], accessCode: 'PAY002' },

                    { label: 'Calculate Bonus', routerLink: ['/payroll/calbonus'], accessCode: 'PAY009' },

                    { label: 'Income / Deduct', routerLink: ['/payroll/entry'], accessCode: 'PAY003' },
                    { label: 'Calculate Tax', routerLink: ['/payroll/caltax'], accessCode: 'PAY004' },
                    { label: 'View Calculate', routerLink: ['/payroll/view'], accessCode: 'PAY005' },
                    { label: 'Summary', routerLink: ['/payroll/summary'], accessCode: 'PAY006' },
                    { label: 'Transfer', routerLink: ['/payroll/transfer'], accessCode: 'PAY007' },
                    // { label: 'Approval list', routerLink: ['/payroll/approve'], accessCode: 'PAY008' },
                    { label: this.langs.get('report')[this.selectlang], routerLink: ['/payroll/reports'], accessCode: 'PAY009' },
                ]
            },

            [ModuleCode.SYS]: {
                label: 'System',
                icon: 'pi-cog',
                items: [
                    { label: 'Manage', routerLink: ['/system/sys-manage'], accessCode: 'SYS001' },
                    { label: 'General', routerLink: ['/system/general'], accessCode: 'SYS002' },
                    { label: 'Security', routerLink: ['/system/security'], accessCode: 'SYS003' },
                    { label: 'Notification', routerLink: ['/system/notification'], accessCode: 'SYS004' },
                    { label: this.langs.get('report')[this.selectlang], routerLink: ['/system/reports'], accessCode: 'SYS005' },
                ]
            },

            // Add more module menu configurations here...
        };

        if (moduleMenuConfig[initialSessionData.Usertype]) {
            this.menuItems[0].items = [moduleMenuConfig[initialSessionData.Usertype]];
            // this.initialData.setLoading(false);
            this.initialData.loading = false;
        }

        if (initialSessionData.PolMenu_Code) {
            var temp = new PolmenuModel();
            temp.polmenu_code = initialSessionData.PolMenu_Code;
            this.polmenuServices.polmenu_get(temp)
                .then((res) => {
                    initialSessionData.PolMenu = res;
                    localStorage.setItem(AppConfig.SESSIONInitial, JSON.stringify(initialSessionData));


                    Object.keys(moduleMenuConfig).forEach((moduleCode) => {
                        const moduleAccessData = this.getModuleAccessData(initialSessionData.PolMenu[0].accessdata_data, moduleCode);
                        if (moduleAccessData) {
                            const moduleMenuItems = this.generateSubMenuItems(moduleAccessData, moduleMenuConfig[moduleCode].items);
                            this.menuItems[0].items.push({
                                label: moduleMenuConfig[moduleCode].label,
                                icon: moduleMenuConfig[moduleCode].icon,
                                items: moduleMenuItems,
                            });
                        }
                    });
                    this.initialData.loading = false;
                    // this.initialData.setLoading(false);
                    // Generate menu items for other modules based on their access permissions...
                });
        }
        // if (initialSessionData.Usertype == "SADM") {
        //     Object.keys(moduleMenuConfig).forEach((moduleCode) => {
        //         console.log(moduleCode)
        //         let data = ["APR", "Emp", "GRP"]
        //         if (!data.includes(moduleCode)) {
        //             this.menuItems[0].items.push({
        //                 label: moduleMenuConfig[moduleCode].label,
        //                 icon: moduleMenuConfig[moduleCode].icon,
        //                 items: moduleMenuConfig[moduleCode].items,
        //             });
        //         }
        //         // const moduleAccessData = this.getModuleAccessData(initialSessionData.PolMenu[0].accessdata_data, moduleCode);
        //         // if (moduleAccessData) {
        //         //     const moduleMenuItems = this.generateSubMenuItems(moduleAccessData, moduleMenuConfig[moduleCode].items);
        //         //     this.menuItems[0].items.push({
        //         //         label: moduleMenuConfig[moduleCode].label,
        //         //         icon: moduleMenuConfig[moduleCode].icon,
        //         //         items: moduleMenuItems,
        //         //     });
        //         // }
        //     });
        // }
    }

    private getModuleAccessData(polMenuData: any[], moduleCode: string): AccessdataModel | undefined {
        return polMenuData.find((data: AccessdataModel) => data.accessdata_module === moduleCode && data.accessmenu_data.length > 0);
    }

    private hasAccessMenu(accessMenuData: AccessmenuModel[], accessCode: string): boolean {
        return accessMenuData.some((item: AccessmenuModel) => item.accessmenu_code.startsWith(accessCode));
    }

    private generateSubMenuItems(moduleAccessData: AccessdataModel, menuItems: any[]): any[] {
        const subMenuItems: any[] = [];
        menuItems.forEach((item) => {
            if (this.hasAccessMenu(moduleAccessData.accessmenu_data, item.accessCode)) {
                subMenuItems.push(item);
            }
        });
        return subMenuItems;
    }
}

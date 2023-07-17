import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccountModuleServices } from '../services/self/accountmodule';
import { AccountModuleModel } from '../models/self/accountmodule';
import { AppConfig } from '../config/config';

@Component({
    selector: 'app-menu',
    templateUrl: './app.menu.component.html'
})
export class AppMenuComponent implements OnInit {
    menuItems: any[] = [{ label: '', items: [] }]; // Array to store menu items

    constructor(
        private router: Router,
        private accountModuleService: AccountModuleServices
    ) { }

    ngOnInit() {
        // Retrieve initial session data from local storage
        const initialSessionData = JSON.parse(localStorage.getItem(AppConfig.SESSIONInitial) || '{}');

        // Check if a valid token exists
        if (!initialSessionData.Token) {
            // If not, navigate to the login page and return
            this.router.navigateByUrl('login');
            return;
        }

        // Generate menu items based on user's role (UserType)
        if (initialSessionData.UserType === "APR") {
            // User is a manager
            this.menuItems = [
                {
                    label: 'Self Services',
                    items: [
                        { label: 'Manager', routerLink: ['/self/approve'] },
                        { label: 'Reports', routerLink: ['/self/reports'] },
                    ]
                }
            ];
        }

        if (initialSessionData.UserType === "Emp" || initialSessionData.UserType === "GRP") {
            // User is an employee or a group member
            this.menuItems = [
                {
                    label: 'Self Services',
                    items: [
                        { label: 'Employee', routerLink: ['/self/employee'] },
                    ]
                }
            ];
        }

        // Retrieve available modules for the user
        this.accountModuleService.accountmodule_get(new AccountModuleModel())
            .then((res: AccountModuleModel[]) => {
                if (this.hasModule(res, 'SELF')) {
                    // User has access to the SELF module
                    this.menuItems[0].items.push({
                        label: 'Self Services',
                        items: [
                            { label: 'Employee', routerLink: ['/self/employee'] },
                            { label: 'Manager', routerLink: ['/self/approve'] },
                            { label: 'Reports', routerLink: ['/self/reports'] },
                        ]
                    });
                }

                if (this.hasModule(res, 'PRO')) {
                    // User has access to the PRO module
                    this.menuItems[0].items.push({
                        label: 'Project',
                        items: [
                            { label: 'Policy', routerLink: ['/project/policy'] },
                            { label: 'Project', routerLink: ['/project/list'] },
                            { label: 'Monitor', routerLink: ['/project/monitor'] },
                            { label: 'Timesheet', routerLink: ['/project/timesheet'] },
                            { label: 'Approval list', routerLink: ['/project/approve'] },
                            { label: 'Reports', routerLink: ['/project/reports'] },
                        ]
                    });
                }
                if (this.hasModule(res, 'EMP')) {
                    // User has access to the EMP module
                    this.menuItems[0].items.push({
                        label: 'Employee',
                        items: [
                            { label: 'Policy', routerLink: ['/employee/policy'] },
                            { label: 'Employee info', routerLink: ['/employee/list'] },
                            { label: 'Monitor', routerLink: ['/employee/monitor'] },
                            { label: 'Reports', routerLink: ['/employee/reports'] },
                        ]
                    });
                }

                if (this.hasModule(res, 'REQ')) {
                    // User has access to the REQ module
                    this.menuItems[0].items.push({
                        label: 'Recruitment',
                        items: [
                            { label: 'Policy', routerLink: ['/recruitment/policy'] },
                            { label: 'Request', routerLink: ['/recruitment/request'] },
                            // { label: 'Apply work', routerLink: ['/recruitment/apply'] },
                            { label: 'Apply work', routerLink: ['/recruitment/applylist'] },
                            { label: 'Approval list', routerLink: ['/recruitment/approve'] },
                            { label: 'Reports', routerLink: ['/recruitment/reports'] },
                        ]
                    });
                }

                if (this.hasModule(res, 'ATT')) {
                    // User has access to the ATT module
                    this.menuItems[0].items.push({
                        label: 'Attendance',
                        items: [
                            { label: 'Policy', routerLink: ['/attendance/policy'] },
                            { label: 'Manage', routerLink: ['/attendance/manage'] },
                            // { label: 'Self Services', routerLink: ['/attendance/self'] },
                            { label: 'Import Time', routerLink: ['/attendance/import'] },
                            { label: 'Processing Time', routerLink: ['/attendance/process'] },
                            { label: 'Calculate Time Cost', routerLink: ['/attendance/calculate'] },
                            { label: 'View Time', routerLink: ['/attendance/view'] },
                            // { label: 'Approval list', routerLink: ['/attendance/approve'] },
                            { label: 'Reports', routerLink: ['/attendance/reports'] },
                        ]
                    });
                }

                if (this.hasModule(res, 'PAY')) {
                    // User has access to the PAY module
                    this.menuItems[0].items.push(
                        {
                            label: 'Payroll',
                            items: [
                                { label: 'Policy', routerLink: ['/payroll/policy'] },
                                { label: 'Calculate', routerLink: ['/payroll/calculate'] },
                                { label: 'Income / Deduct', routerLink: ['/payroll/entry'] },
                                { label: 'Calculate Tax', routerLink: ['/payroll/caltax'] },
                                { label: 'View Calculate', routerLink: ['/payroll/view'] },
                                { label: 'Transfer', routerLink: ['/payroll/transfer'] },
                                { label: 'Approval list', routerLink: ['/payroll/approve'] },
                                { label: 'Reports', routerLink: ['/payroll/reports'] },
                            ]
                        }
                    );
                }

                if (this.hasModule(res, 'SYS')) {
                    // User has access to the SYS module
                    this.menuItems[0].items.push(
                        {
                            label: 'System',
                            items: [
                                { label: 'Manage', routerLink: ['/system/sys-manage'] },
                                { label: 'General', routerLink: ['/system/general'] },
                                { label: 'Security', routerLink: ['/system/security'] },
                                { label: 'Notification', routerLink: ['/system/notification'] },
                                { label: 'Reports', routerLink: ['/system/reports'] },
                            ]
                        }
                    );
                }

                // Add more module checks and menu items here...

            });
    }

    private hasModule(modules: AccountModuleModel[], moduleCode: string): boolean {
        // Check if a module with the given moduleCode exists in the modules array
        return modules.some((item: AccountModuleModel) => item.module_code === moduleCode);
    }
}

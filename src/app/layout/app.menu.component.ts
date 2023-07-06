import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { LayoutService } from './service/app.layout.service';
import { InitialCurrent } from '../config/initial_current';
import { AppConfig } from '../config/config';
import { Router } from '@angular/router';

@Component({
    selector: 'app-menu',
    templateUrl: './app.menu.component.html'
})
export class AppMenuComponent implements OnInit {

    model: any[] = [];
    constructor(
        public layoutService: LayoutService,
        private router: Router,
    ) { }
    public initial_current: InitialCurrent = new InitialCurrent();
    doGetInitialCurrent() {
        this.initial_current = JSON.parse(localStorage.getItem(AppConfig.SESSIONInitial) || '{}');
        if (!this.initial_current.Token) {
            this.router.navigateByUrl('login');
        }
    }
    ngOnInit() {
        this.doGetInitialCurrent();
        if (this.initial_current.Usertype == "ADM") {
            this.model = [
                // {
                //     label: 'Home',
                //     items: [
                //         { label: 'Dashboard', icon: 'pi pi-fw pi-home', routerLink: ['/'] }
                //     ]
                // }
                // ,
                {
                    label: 'Self Services',
                    items: [
                        //{ label: 'Policy', routerLink: ['/self/policy'] },
                        { label: 'Employee', routerLink: ['/self/employee'] },
                        { label: 'Manager', routerLink: ['/self/approve'] },
                        { label: 'Reports', routerLink: ['/self/reports'] },
                    ]
                }
                ,
                {
                    label: 'Project',
                    items: [
                        { label: 'Policy', routerLink: ['/project/policy'] },
                        { label: 'Project', routerLink: ['/project/list'] },
                        { label: 'Monitor', routerLink: ['/project/monitor'] },
                        { label: 'Timesheet', routerLink: ['/project/timesheet'] },
                        { label: 'Approval list', routerLink: ['/project/approve'] },

                        // { label: 'จัดการข้อมูลกองทุนฯ', routerLink: ['/project/pf'] },

                        { label: 'Reports', routerLink: ['/project/reports'] },
                    ]
                }
                ,
                {
                    label: 'Employee',
                    items: [
                        { label: 'Policy', routerLink: ['/employee/policy'] },
                        { label: 'Employee info', routerLink: ['/employee/list'] },
                        { label: 'Monitor', routerLink: ['/employee/monitor'] },
                        { label: 'Reports', routerLink: ['/employee/reports'] },

                        // { label: 'Select Emp', routerLink: ['/usercontrol/selectemp'] },

                    ]
                }
                ,
                {
                    label: 'Recruitment',
                    items: [
                        { label: 'Policy', routerLink: ['/recruitment/policy'] },
                        { label: 'Request', routerLink: ['/recruitment/request'] },
                        // { label: 'Apply work', routerLink: ['/recruitment/apply'] },
                        { label: 'Apply work', routerLink: ['/recruitment/applylist'] },
                        { label: 'Approval list', routerLink: ['/recruitment/approve'] },
                        { label: 'Reports', routerLink: ['/recruitment/reports'] },
                    ]
                }
                ,
                {
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
                }
                ,
                {
                    label: 'Payroll',
                    items: [
                        { label: 'Policy', routerLink: ['/payroll/policy'] },
                        { label: 'Calculate Money', routerLink: ['/payroll/calculate'] },
                        { label: 'Income / Deduct', routerLink: ['/payroll/entry'] },
                        { label: 'Calculate Tax', routerLink: ['/payroll/caltax'] },
                        { label: 'View Calculate', routerLink: ['/payroll/view'] },
                        { label: 'Transfer', routerLink: ['/payroll/transfer'] },
                        { label: 'Approval list', routerLink: ['/payroll/approve'] },
                        { label: 'Reports', routerLink: ['/payroll/reports'] },
                    ]
                }
                ,
                {
                    label: 'System',
                    items: [
                        { label: 'Manage', routerLink: ['/system/sys-manage'] },
                        { label: 'Genaral', routerLink: ['/system/genaral'] },
                       
                        // { label: 'Company', routerLink: ['/system/company'] },
                        // { label: 'Branch', routerLink: ['/system/Branch'] },
                        { label: 'Security', routerLink: ['/system/security'] },
                        { label: 'Notification', routerLink: ['/system/notification'] },
                        { label: 'Reports', routerLink: ['/system/reports'] },
                    ]
                }


            ];
        }
        if (this.initial_current.Usertype == "APR") {
            this.model = [
                {
                    label: 'Self Services',
                    items: [
                        //{ label: 'Policy', routerLink: ['/self/policy'] },
                        // { label: 'Employee', routerLink: ['/self/employee'] },
                        { label: 'Manager', routerLink: ['/self/approve'] },
                        { label: 'Reports', routerLink: ['/self/reports'] },
                    ]
                }
            ];
        }
        if (this.initial_current.Usertype == "Emp" ||this.initial_current.Usertype == "GRP" ) {
            this.model = [
                {
                    label: 'Self Services',
                    items: [
                        //{ label: 'Policy', routerLink: ['/self/policy'] },
                        { label: 'Employee', routerLink: ['/self/employee'] },
                        // { label: 'Manager', routerLink: ['/self/approve'] },
                        // { label: 'Reports', routerLink: ['/self/reports'] },
                    ]
                }
            ];
        }
    }
}

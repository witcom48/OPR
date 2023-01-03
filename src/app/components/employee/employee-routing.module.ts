import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { EmployeeListComponent } from './employee-list/employee-list.component';
import { EmployeeManageComponent } from './employee-manage/employee-manage.component';
import { EmployeePolicyComponent } from './employee-policy/employee-policy.component';
import { EmployeeMonitorComponent } from './employee-monitor/employee-monitor.component';

@NgModule({
    imports: [RouterModule.forChild([ 
        { path: 'manage', component: EmployeeManageComponent },
        { path: 'list', component: EmployeeListComponent },
        { path: 'policy', component: EmployeePolicyComponent },
        { path: 'monitor', component: EmployeeMonitorComponent },

        //{ path: 'setup', data: { breadcrumb: 'Form Layout' }, loadChildren: () => import('./project-setup/project-setup.module').then(m => m.ProjectSetupModule) },

        { path: '**', redirectTo: '/notfound' }
    ])],
    exports: [RouterModule]
})
export class EmployeeRoutingModule { }

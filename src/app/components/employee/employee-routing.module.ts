import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { EmployeeListComponent } from './employee-list/employee-list.component';
import { EmployeeManageComponent } from './employee-manage/employee-manage.component';
import { EmployeePolicyComponent } from './employee-policy/employee-policy.component';
import { EmployeeMonitorComponent } from './employee-monitor/employee-monitor.component';
import { PartComponent } from './employee-policy/genaral/part/part.component';
import { PositionComponent } from './employee-policy/genaral/position/position.component';
import { GroupComponent } from './employee-policy/genaral/group/group.component';
import { InitialComponent } from './employee-policy/genaral/initial/initial.component';
import { EmptypeComponent } from './employee-policy/genaral/emptype/emptype.component';
import { EmpstatusComponent } from './employee-policy/genaral/empstatus/empstatus.component';
import { EmployeeLocationComponent } from './employee-policy/genaral/employee-location/employee-location.component';

@NgModule({
    imports: [RouterModule.forChild([
        { path: 'manage', component: EmployeeManageComponent },
        { path: 'list', component: EmployeeListComponent },
        { path: 'policy', component: EmployeePolicyComponent },
        { path: 'monitor', component: EmployeeMonitorComponent },

        //policy/general
        { path: 'policy/location', component: EmployeeLocationComponent },
        { path: 'policy/part', component: PartComponent },
        { path: 'policy/position', component: PositionComponent },
        { path: 'policy/group', component: GroupComponent },
        { path: 'policy/initial', component: InitialComponent },
        { path: 'policy/emptype', component: EmptypeComponent },
        { path: 'policy/empstatus', component: EmpstatusComponent },
        //{ path: 'setup', data: { breadcrumb: 'Form Layout' }, loadChildren: () => import('./project-setup/project-setup.module').then(m => m.ProjectSetupModule) },

        { path: '**', redirectTo: '/notfound' }
    ])],
    exports: [RouterModule]
})
export class EmployeeRoutingModule { }

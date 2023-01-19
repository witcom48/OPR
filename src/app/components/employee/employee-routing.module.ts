import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { EmployeeListComponent } from './employee-list/employee-list.component';
import { EmployeeManageComponent } from './employee-manage/employee-manage.component';
import { EmployeePolicyComponent } from './employee-policy/employee-policy.component';
import { EmployeeMonitorComponent } from './employee-monitor/employee-monitor.component';
import { LocationComponent } from './location/location.component';
import { PartComponent } from './part/part.component';
import { PositionComponent } from './position/position.component';
import { GroupComponent } from './group/group.component';
import { InitialComponent } from './initial/initial.component';
import { EmptypeComponent } from './emptype/emptype.component';
import { EmpstatusComponent } from './empstatus/empstatus.component';

@NgModule({
    imports: [RouterModule.forChild([ 
        { path: 'manage', component: EmployeeManageComponent },
        { path: 'list', component: EmployeeListComponent },
        { path: 'policy', component: EmployeePolicyComponent },
        { path: 'monitor', component: EmployeeMonitorComponent },

        //policy/general
        { path: 'location', component: LocationComponent },
        { path: 'part', component: PartComponent },
        { path: 'position', component: PositionComponent },
        { path: 'group', component: GroupComponent },
        { path: 'initial', component: InitialComponent },
        { path: 'emptype', component: EmptypeComponent },
        { path: 'empstatus', component: EmpstatusComponent },
        //{ path: 'setup', data: { breadcrumb: 'Form Layout' }, loadChildren: () => import('./project-setup/project-setup.module').then(m => m.ProjectSetupModule) },

        { path: '**', redirectTo: '/notfound' }
    ])],
    exports: [RouterModule]
})
export class EmployeeRoutingModule { }

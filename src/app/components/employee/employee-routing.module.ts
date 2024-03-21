import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { EmployeeListComponent } from './employee-list/employee-list.component';
import { EmployeeManageComponent } from './employee-manage/employee-manage.component';
import { EmployeePolicyComponent } from './employee-policy/employee-policy.component';
import { EmployeeMonitorComponent } from './employee-monitor/employee-monitor.component';
import { InitialComponent } from './employee-policy/genaral/initial/initial.component';
import { EmptypeComponent } from './employee-policy/genaral/emptype/emptype.component';
import { EmpstatusComponent } from './employee-policy/genaral/empstatus/empstatus.component';
import { EmpsetpositionComponent } from './employee-policy/setup-batch/empsetposition/empsetposition.component';
import { EmpsetdepComponent } from './employee-policy/setup-batch/empsetdep/empsetdep.component';
import { EmployeeLocationComponent } from './employee-policy/genaral/employee-location/employee-location.component';
import { SystemModule } from '../system/system.module';
import { EmpsetsalaryComponent } from './employee-policy/setup-batch/empsetsalary/empsetsalary.component';
import { EmpsetgroupComponent } from './employee-policy/setup-batch/empsetgroup/empsetgroup.component';
import { EmpsetlocationComponent } from './employee-policy/setup-batch/empsetlocation/empsetlocation.component';
import { EmpsetprovidentComponent } from './employee-policy/setup-batch/empsetprovident/empsetprovident.component';
import { EmpsetbenefitsComponent } from './employee-policy/setup-batch/empsetbenefits/empsetbenefits.component';
import { EmployeePartComponent } from './employee-policy/genaral/employee-part/employee-part.component';
import { EmployeePositionComponent } from './employee-policy/genaral/employee-position/employee-position.component';
import { EmployeeGroupComponent } from './employee-policy/genaral/employee-group/employee-group.component';
import { EmpsettrainingComponent } from './employee-policy/setup-batch/empsettraining/empsettraining.component';
import { EmpsetassessmentComponent } from './employee-policy/setup-batch/empsetassessment/empsetassessment.component';
import { EmployeePaysuspendComponent } from './employee-paysuspend/employee-paysuspend.component';
import { EmployeeReportsComponent } from './employee-reports/employee-reports.component';

@NgModule({
    imports: [RouterModule.forChild([
        { path: 'manage', component: EmployeeManageComponent },
        { path: 'list', component: EmployeeListComponent },
        { path: 'policy', component: EmployeePolicyComponent },
        { path: 'monitor', component: EmployeeMonitorComponent },
        { path: 'paysuspend', component: EmployeePaysuspendComponent },

        //policy/general
        { path: 'policy/location', component: EmployeeLocationComponent },
        { path: 'policy/part', component: EmployeePartComponent },
        { path: 'policy/position', component: EmployeePositionComponent },
        { path: 'policy/group', component: EmployeeGroupComponent },
        { path: 'policy/initial', component: InitialComponent },
        { path: 'policy/emptype', component: EmptypeComponent },
        { path: 'policy/empstatus', component: EmpstatusComponent },

        //policy/batch
        { path: 'policy/batch/empposition',component:EmpsetpositionComponent},
        { path: 'policy/batch/empdep',component:EmpsetdepComponent},
        { path: 'policy/batch/emptraining',component:EmpsettrainingComponent},
        { path: 'policy/batch/empsalary', component:EmpsetsalaryComponent},
        { path: 'policy/batch/empgroup', component:EmpsetgroupComponent},
        { path: 'policy/batch/emplocation', component:EmpsetlocationComponent},
        { path: 'policy/batch/empprovident',component:EmpsetprovidentComponent},
        { path: 'policy/batch/empbenefits',component:EmpsetbenefitsComponent},
        { path: 'policy/batch/empassessment',component:EmpsetassessmentComponent},
        { path: 'policy/batch/empdetail',component:EmpsetdepComponent},


        //{ path: 'setup', data: { breadcrumb: 'Form Layout' }, loadChildren: () => import('./project-setup/project-setup.module').then(m => m.ProjectSetupModule) },

        //reports
        { path: 'reports', component: EmployeeReportsComponent },

        { path: '**', redirectTo: '/notfound' }
    ])],
    exports: [RouterModule]
})
export class EmployeeRoutingModule { }

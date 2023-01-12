import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AttendancePolicyComponent } from './attendance-policy/attendance-policy.component';
import { AttendanceSelfComponent } from './attendance-self/attendance-self.component';
import { AttendanceImportComponent } from './attendance-import/attendance-import.component';
import { AttendanceProcessComponent } from './attendance-process/attendance-process.component';
import { AttendanceCalculateComponent } from './attendance-calculate/attendance-calculate.component';
import { AttendanceViewComponent } from './attendance-view/attendance-view.component';
import { YearperiodComponent } from './attendance-policy/yearperiod/yearperiod.component';
import { AttendanceTimecardComponent } from './attendance-timecard/attendance-timecard.component';



@NgModule({
    imports: [RouterModule.forChild([ 
       
        { path: 'policy', component: AttendancePolicyComponent },
        { path: 'self', component: AttendanceSelfComponent },
        { path: 'import', component: AttendanceImportComponent },
        { path: 'process', component: AttendanceProcessComponent },
        { path: 'calculate', component: AttendanceCalculateComponent },
        { path: 'view', component: AttendanceViewComponent },
        { path: 'policy/yearperiod', component: YearperiodComponent },

        //{ path: 'setup', data: { breadcrumb: 'Form Layout' }, loadChildren: () => import('./project-setup/project-setup.module').then(m => m.ProjectSetupModule) },

        { path: '**', redirectTo: '/notfound' }
    ])],
    exports: [RouterModule]
})
export class AttendanceRoutingModule { }

import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SelfPolicyComponent } from './self-policy/self-policy.component';
import { SelfLeaveComponent } from './self-leave/self-leave.component';
import { SelfEmployeeComponent } from './self-employee/self-employee.component';
import { SelfOvertimeComponent } from './self-overtime/self-overtime.component';
import { SelfChangeshiftComponent } from './self-changeshift/self-changeshift.component';
import { SelfRecordtimeComponent } from './self-recordtime/self-recordtime.component';
import { SelfWorkflowComponent } from './self-workflow/self-workflow.component';
import { SelfAccountComponent } from './self-account/self-account.component';
import { SelfLineapproveComponent } from './self-lineapprove/self-lineapprove.component';
import { SelfAreaComponent } from './self-area/self-area.component';
import { SelfDaytypeComponent } from './self-daytype/self-daytype.component';
import { SelfCheckinComponent } from './self-checkin/self-checkin.component';
import { SelfTopicComponent } from './self-topic/self-topic.component';
import { SelfReqdocComponent } from './self-reqdoc/self-reqdoc.component';


@NgModule({
    imports: [RouterModule.forChild([

        { path: 'policy', component: SelfPolicyComponent },

        { path: 'workflow', component: SelfWorkflowComponent },
        { path: 'lineapprove', component: SelfLineapproveComponent },
        { path: 'account', component: SelfAccountComponent },
        { path: 'area', component: SelfAreaComponent },
        { path: 'topic', component: SelfTopicComponent },

        { path: 'employee', component: SelfEmployeeComponent },
        { path: 'req_leave', component: SelfLeaveComponent },
        { path: 'req_overtime', component: SelfOvertimeComponent },
        { path: 'req_shift', component: SelfChangeshiftComponent },
        { path: 'req_daytype', component: SelfDaytypeComponent },
        { path: 'req_record', component: SelfRecordtimeComponent },
        { path: 'req_checkin', component: SelfCheckinComponent },
        { path: 'req_reqdoc', component: SelfReqdocComponent },


        //{ path: 'setup', data: { breadcrumb: 'Form Layout' }, loadChildren: () => import('./project-setup/project-setup.module').then(m => m.ProjectSetupModule) },

        { path: '**', redirectTo: '/notfound' }
    ])],
    exports: [RouterModule]
})
export class SelfRoutingModule { }

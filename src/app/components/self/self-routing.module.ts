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
import { SelfApproveLeaveComponent } from './self-approve-leave/self-approve-leave.component';
import { SelfApproveShiftComponent } from './self-approve-shift/self-approve-shift.component';
import { SelfApproveOvertimeComponent } from './self-approve-overtime/self-approve-overtime.component';
import { SelfApproveRecordtimeComponent } from './self-approve-recordtime/self-approve-recordtime.component';
import { SelfApproveDaytypeComponent } from './self-approve-daytype/self-approve-daytype.component';
import { SelfApproveCheckinComponent } from './self-approve-checkin/self-approve-checkin.component';
import { SelfApproveReqdocComponent } from './self-approve-reqdoc/self-approve-reqdoc.component';
import { SelfApproveComponent } from './self-approve/self-approve.component';
import { SelfConsentComponent } from './self-consent/self-consent.component';
import { SelfEmpConsentComponent } from './self-emp-consent/self-emp-consent.component';
import { SeftAccountManageComponent } from './seft-account-manage/seft-account-manage.component';
import { SelfRequestComponent } from './self-request/self-request.component';
import { SelfTransferComponent } from './self-transfer/self-transfer.component';


@NgModule({
    imports: [RouterModule.forChild([

        { path: 'policy', component: SelfPolicyComponent },

        { path: 'workflow', component: SelfWorkflowComponent },
        { path: 'lineapprove', component: SelfLineapproveComponent },
        { path: 'account', component: SeftAccountManageComponent },
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

        { path: 'approve', component: SelfApproveComponent },
        { path: 'approve_leave', component: SelfApproveLeaveComponent },
        // { path: 'approve_shift', component: SelfApproveShiftComponent },
        { path: 'approve_overtime', component: SelfApproveOvertimeComponent },
        // { path: 'approve_daytype', component: SelfApproveDaytypeComponent },
        // { path: 'approve_record', component: SelfApproveRecordtimeComponent },
        // { path: 'approve_checkin', component: SelfApproveCheckinComponent },
        // { path: 'approve_reqdoc', component: SelfApproveReqdocComponent },

        { path: 'consent', component: SelfConsentComponent },
        { path: 'empconsent', component: SelfEmpConsentComponent },
        { path: 'request', component: SelfRequestComponent },
        { path: 'transfer', component: SelfTransferComponent },
        //{ path: 'setup', data: { breadcrumb: 'Form Layout' }, loadChildren: () => import('./project-setup/project-setup.module').then(m => m.ProjectSetupModule) },

        { path: '**', redirectTo: '/notfound' }
    ])],
    exports: [RouterModule]
})
export class SelfRoutingModule { }

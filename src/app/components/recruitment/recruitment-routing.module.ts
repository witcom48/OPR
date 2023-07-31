import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { RecruitmentRequestComponent } from './recruitment-request/recruitment-request.component';
import { RecruitmentApplyComponent } from './recruitment-apply/recruitment-apply.component';
import { RecruitmentPolicyComponent } from './recruitment-policy/recruitment-policy.component';

import { ApplyListComponent } from './recruitment-apply/apply/apply-list/apply-list.component';
import { RecruimentBlacklistComponent } from './recruiment-blacklist/recruiment-blacklist.component';
import { SetBlacklistComponent } from './recruiment-blacklist/set-blacklist/set-blacklist.component';

@NgModule({
    imports: [RouterModule.forChild([

        { path: 'request', component: RecruitmentRequestComponent },
        { path: 'apply', component: RecruitmentApplyComponent },
        { path: 'policy', component: RecruitmentPolicyComponent },
        { path: 'applylist', component: ApplyListComponent },
        { path: 'blacklist', component: RecruimentBlacklistComponent },
        { path: 'blacklist/setbatch', component: SetBlacklistComponent },



        //{ path: 'setup', data: { breadcrumb: 'Form Layout' }, loadChildren: () => import('./project-setup/project-setup.module').then(m => m.ProjectSetupModule) },

        { path: '**', redirectTo: '/notfound' }
    ])],
    exports: [RouterModule]
})
export class RecruitmentRoutingModule { }

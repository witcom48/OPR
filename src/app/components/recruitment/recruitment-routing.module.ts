import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { RecruitmentRequestComponent } from './recruitment-request/recruitment-request.component';
import { RecruitmentApplyComponent } from './recruitment-apply/recruitment-apply.component';
import { RecruitmentPolicyComponent } from './recruitment-policy/recruitment-policy.component';


@NgModule({
    imports: [RouterModule.forChild([ 
       
        { path: 'request', component: RecruitmentRequestComponent },
        { path: 'apply', component: RecruitmentApplyComponent },
        { path: 'policy', component: RecruitmentPolicyComponent },

        //{ path: 'setup', data: { breadcrumb: 'Form Layout' }, loadChildren: () => import('./project-setup/project-setup.module').then(m => m.ProjectSetupModule) },

        { path: '**', redirectTo: '/notfound' }
    ])],
    exports: [RouterModule]
})
export class RecruitmentRoutingModule { }

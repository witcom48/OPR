import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SelfPolicyComponent } from './self-policy/self-policy.component';


@NgModule({
    imports: [RouterModule.forChild([ 
       
        { path: 'policy', component: SelfPolicyComponent },
       

        //{ path: 'setup', data: { breadcrumb: 'Form Layout' }, loadChildren: () => import('./project-setup/project-setup.module').then(m => m.ProjectSetupModule) },

        { path: '**', redirectTo: '/notfound' }
    ])],
    exports: [RouterModule]
})
export class SelfRoutingModule { }

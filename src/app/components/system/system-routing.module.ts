import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SystemPolicyComponent } from './system-policy/system-policy.component';
import { SystemCompanyComponent } from './system-company/system-company.component';
import { SystemSecurityComponent } from './system-security/system-security.component';
import { SystemNotificationComponent } from './system-notification/system-notification.component';

import { BankComponent } from './bank/bank.component';

@NgModule({
    imports: [RouterModule.forChild([ 
       
        { path: 'genaral', component: SystemPolicyComponent },
        { path: 'company', component: SystemCompanyComponent },
        { path: 'security', component: SystemSecurityComponent },
        { path: 'notification', component: SystemNotificationComponent },

        { path: 'bank', component: BankComponent },

        //{ path: 'setup', data: { breadcrumb: 'Form Layout' }, loadChildren: () => import('./project-setup/project-setup.module').then(m => m.ProjectSetupModule) },

        { path: '**', redirectTo: '/notfound' }
    ])],
    exports: [RouterModule]
})
export class SystemRoutingModule { }

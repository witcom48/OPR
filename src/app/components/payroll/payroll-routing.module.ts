import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { PayrollPolicyComponent } from './payroll-policy/payroll-policy.component';
import { PayrollTransferComponent } from './payroll-transfer/payroll-transfer.component';
import { PayrollEntryComponent } from './payroll-entry/payroll-entry.component';
import { PayrollCalculateComponent } from './payroll-calculate/payroll-calculate.component';
import { PayrollCaltaxComponent } from './payroll-caltax/payroll-caltax.component';
import { PayrollViewComponent } from './payroll-view/payroll-view.component';

@NgModule({
    imports: [RouterModule.forChild([ 
       
        { path: 'policy', component: PayrollPolicyComponent },
        { path: 'transfer', component: PayrollTransferComponent },
        { path: 'entry', component: PayrollEntryComponent },
        { path: 'calculate', component: PayrollCalculateComponent },
        { path: 'caltax', component: PayrollCaltaxComponent },
        { path: 'view', component: PayrollViewComponent },
        //{ path: 'setup', data: { breadcrumb: 'Form Layout' }, loadChildren: () => import('./project-setup/project-setup.module').then(m => m.ProjectSetupModule) },

        { path: '**', redirectTo: '/notfound' }
    ])],
    exports: [RouterModule]
})
export class PayrollRoutingModule { }

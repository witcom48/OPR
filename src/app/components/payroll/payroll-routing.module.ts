import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { PayrollPolicyComponent } from './payroll-policy/payroll-policy.component';
import { PayrollTransferComponent } from './payroll-transfer/payroll-transfer.component';
import { PayrollEntryComponent } from './payroll-entry/payroll-entry.component';
import { PayrollCalculateComponent } from './payroll-calculate/payroll-calculate.component';
import { PayrollCaltaxComponent } from './payroll-caltax/payroll-caltax.component';
import { PayrollViewComponent } from './payroll-view/payroll-view.component';
import { ItemsComponent } from './payroll-policy/items/items.component';
import { ItemComponent } from './payroll-policy/items/item/item.component';
import { ProvidentComponent } from './payroll-policy/provident/provident.component';
import { BonusComponent } from './payroll-policy/bonus/bonus.component';

import { TaxrateComponent } from './payroll-policy/taxrate/taxrate.component';
@NgModule({
    imports: [RouterModule.forChild([

        { path: 'policy', component: PayrollPolicyComponent },
        { path: 'transfer', component: PayrollTransferComponent },
        { path: 'entry', component: PayrollEntryComponent },
        { path: 'calculate', component: PayrollCalculateComponent },
        { path: 'caltax', component: PayrollCaltaxComponent },
        { path: 'view', component: PayrollViewComponent },
        { path: 'taxrate', component: TaxrateComponent },
        { path: 'items', component: ItemsComponent },
        { path: 'item', component: ItemComponent },
        { path: 'pay-provident', component: ProvidentComponent },
        { path: 'pay-bonus', component: BonusComponent },


        



        //{ path: 'setup', data: { breadcrumb: 'Form Layout' }, loadChildren: () => import('./project-setup/project-setup.module').then(m => m.ProjectSetupModule) },

        { path: '**', redirectTo: '/notfound' }
    ])],
    exports: [RouterModule]
})
export class PayrollRoutingModule { }

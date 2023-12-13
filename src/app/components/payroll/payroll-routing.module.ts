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
import { CalculationperiodComponent } from './payroll-policy/calculationperiod/calculationperiod.component';

import { TaxrateComponent } from './payroll-policy/taxrate/taxrate.component';

import { TransferBankComponent } from './payroll-transfer/transfer-bank/transfer-bank.component';
import { TransferTaxComponent } from './payroll-transfer/transfer-tax/transfer-tax.component';
import { TransferSsoComponent } from './payroll-transfer/transfer-sso/transfer-sso.component';
import { TransferBonusComponent } from './payroll-transfer/transfer-bonus/transfer-bonus.component';
import { SetbonusComponent } from './payroll-policy/setbonus/setbonus.component';
import { SetitemsComponent } from './payroll-policy/setitems/setitems.component';
import { SetprovidentComponent } from './payroll-policy/setprovident/setprovident.component';
import { AppEntryComponent } from './payroll-entry/app-entry/app-entry.component';
import { AppEntrysComponent } from './payroll-entry/app-entry/app-entrys/app-entrys.component';

import { PayrollSummaryComponent } from './payroll-summary/payroll-summary.component';
import { SetpolComponent } from './payroll-policy/setpol/setpol.component';
import { PlanReduceComponent } from './payroll-policy/plan-reduce/plan-reduce.component';
import { ItemsPlanComponent } from './payroll-policy/items-plan/items-plan.component';
import { SetallpolicyComponent } from './payroll-policy/setallpolicy/setallpolicy.component';

import { PayrollCalbonusComponent } from './payroll-calbonus/payroll-calbonus.component';
import { TransferProvidentComponent } from './payroll-transfer/transfer-provident/transfer-provident.component';
import { ReferralComponent } from './payroll-policy/referral/referral.component';


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
        { path: 'calculationperiod', component: CalculationperiodComponent },

        { path: 'summary', component: PayrollSummaryComponent },

        { path: 'calbonus', component: PayrollCalbonusComponent },

        { path: 'transferprovident', component: TransferProvidentComponent },
        { path: 'transferbank', component: TransferBankComponent },
        { path: 'transfertax', component: TransferTaxComponent },
        { path: 'transfersso', component: TransferSsoComponent },
        { path: 'transferbonus', component: TransferBonusComponent },
        { path: 'setbonus', component: SetbonusComponent },

        { path: 'setitems', component: SetitemsComponent },
        { path: 'setprovident', component: SetprovidentComponent },
        { path: 'appentry ', component: AppEntryComponent },
        { path: 'appentrys ', component: AppEntrysComponent },
        { path: 'personalincometax', component: SetpolComponent },
        { path: 'planreduce', component: PlanReduceComponent },
        { path: 'itemsplan', component: ItemsPlanComponent },
        { path: 'setallpolicy', component: SetallpolicyComponent },

        { path: 'pay-refer', component: ReferralComponent },



        //{ path: 'setup', data: { breadcrumb: 'Form Layout' }, loadChildren: () => import('./project-setup/project-setup.module').then(m => m.ProjectSetupModule) },

        { path: '**', redirectTo: '/notfound' }
    ])],
    exports: [RouterModule]
})
export class PayrollRoutingModule { }

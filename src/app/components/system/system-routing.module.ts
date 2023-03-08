import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SystemPolicyComponent } from './system-policy/system-policy.component';
import { SystemCompanyComponent } from './system-company/system-company.component';
import { SystemSecurityComponent } from './system-security/system-security.component';
import { SystemNotificationComponent } from './system-notification/system-notification.component';

import { BankComponent } from './bank/bank.component';


import { EmpIDComponent } from  './system-policy/emp-id/emp-id.component';
import { SystemOrganizationLevelComponent } from  './system-policy/system-organization-level/system-organization-level.component';
import { SystemCardTypeComponent } from   './system-policy/system-card-type/system-card-type.component';
import { SystemFamilyTypeComponent } from  './system-policy/system-family-type/system-family-type.component';
import { SystemAddressTypeComponent } from './system-policy/system-address-type/system-address-type.component';
import { SystemProvinceComponent } from   './system-policy/system-province/system-province.component';
import { SystemReligionComponent } from  './system-policy/system-religion/system-religion.component';
import { SystemEthnicityComponent } from './system-policy/system-ethnicity/system-ethnicity.component';
import { SystemBloodtypeComponent } from './system-policy/system-bloodtype/system-bloodtype.component';
import { SystemHospitalComponent } from './system-policy/system-hospital/system-hospital.component';
import { SystemLocationComponent } from './system-policy/system-location/system-location.component';
import { SystemReduceComponent } from './system-policy/system-reduce/system-reduce.component';
import { SystemComaddressComponent } from './system-company/system-comaddress/comaddress.component';

import { SystemBankaccountComponent } from './system-company/system-bankaccount/system-bankaccount.component';
import { CompanysComponent } from './system-company/companys/companys.component';
import { SystemComcardComponent } from './system-company/system-comcard/system-comcard.component';
import { ReasonComponent } from './system-policy/reason/reason.component';
import { SystemYearperiodComponent } from './system-policy/system-yearperiod/system-yearperiod.component';
import { AddCodestructureComponent } from './system-policy/emp-id/add-codestructure/add-codestructure.component';
import { BranchComponent } from './branch/branch.component';
import { SysBranchComponent } from './branch/sys-branch/sys-branch/sys-branch.component';



@NgModule({
    imports: [RouterModule.forChild([

        { path: 'genaral', component: SystemPolicyComponent },
        { path: 'company', component: SystemCompanyComponent },
        { path: 'security', component: SystemSecurityComponent },
        { path: 'notification', component: SystemNotificationComponent },

        { path: 'bank', component: BankComponent },
        { path: 'reason', component: ReasonComponent },
        { path: 'emp-id', component: EmpIDComponent },
        { path: 'system-organization-level', component: SystemOrganizationLevelComponent },
        { path: 'system-card-type', component: SystemCardTypeComponent },
        { path: 'system-family-type', component: SystemFamilyTypeComponent },
        { path: 'system-address-type', component: SystemAddressTypeComponent },
        { path: 'system-province', component: SystemProvinceComponent },
        { path: 'system-religion', component: SystemReligionComponent },
        { path: 'system-ethnicity', component: SystemEthnicityComponent },
        { path: 'system-bloodtype', component: SystemBloodtypeComponent },
        { path: 'system-hospital', component: SystemHospitalComponent },
        { path: 'system-location', component: SystemLocationComponent },
        { path: 'system-reduce', component: SystemReduceComponent },
        { path: 'system-comaddress', component: SystemComaddressComponent },
        { path: 'system-bankaccount', component: SystemBankaccountComponent },
        { path: 'CompanysComponent', component: CompanysComponent },
        { path: 'system-comcard', component: SystemComcardComponent },
        { path: 'system-yearperiod', component: SystemYearperiodComponent },
        { path: 'system-AddCodestructure', component: AddCodestructureComponent },
        { path: 'Branch', component: BranchComponent },
        { path: 'sysbranch', component: SysBranchComponent },

        



        //{ path: 'setup', data: { breadcrumb: 'Form Layout' }, loadChildren: () => import('./project-setup/project-setup.module').then(m => m.ProjectSetupModule) },

        { path: '**', redirectTo: '/notfound' }
    ])],
    exports: [RouterModule]
})
export class SystemRoutingModule { }

import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SystemPolicyComponent } from './system-policy/system-policy.component';
import { SystemCompanyComponent } from './system-company/system-company.component';
import { SystemSecurityComponent } from './system-security/system-security.component';
import { SystemNotificationComponent } from './system-notification/system-notification.component';

import { BankComponent } from './bank/bank.component';
import { ReasonComponent } from './system-policy/reason/reason.component';
import { EmpIDComponent } from './system-policy/emp-id/emp-id.component';
import { SystemOrganizationLevelComponent } from './system-policy/system-organization-level/system-organization-level.component';
import { SystemCardTypeComponent } from './system-policy/system-card-type/system-card-type.component';
import { SystemFamilyTypeComponent } from './system-policy/system-family-type/system-family-type.component';
import { SystemAddressTypeComponent } from './system-policy/system-address-type/system-address-type.component';
import { SystemProvinceComponent } from './system-policy/system-province/system-province.component';
import { SystemReligionComponent } from './system-policy/system-religion/system-religion.component';
import { SystemEthnicityComponent } from './system-policy/system-ethnicity/system-ethnicity.component';
import { SystemBloodtypeComponent } from './system-policy/system-bloodtype/system-bloodtype.component';
import { SystemHospitalComponent } from './system-policy/system-hospital/system-hospital.component';
import { SystemLocationComponent } from './system-policy/system-location/system-location.component';
import { SystemReduceComponent } from './system-policy/system-reduce/system-reduce.component';
import { SystemComaddressComponent } from './system-company/system-comaddress/comaddress.component';
import { SystemBankaccountComponent } from './system-company/system-bankaccount/system-bankaccount.component';
import { CompanysComponent } from './system-company/companys/companys.component';
import { SystemComcardComponent } from './system-company/system-comcard/system-comcard.component';
import { SystemYearperiodComponent } from './system-policy/system-yearperiod/system-yearperiod.component';
import { AddCodestructureComponent } from './system-policy/emp-id/add-codestructure/add-codestructure.component';
import { BranchComponent } from './branch/branch.component';
import { SysBranchComponent } from './branch/sys-branch/sys-branch/sys-branch.component';
import { SystemReasonComponent } from './system-manage/system-reason/system-reason.component';
import { SystemCourseComponent } from './system-policy/system-course/system-course.component';
import { SystemInstituteComponent } from './system-policy/system-institute/system-institute.component';
import { SystemFacultyComponent } from './system-policy/system-faculty/system-faculty.component';
import { SystemMajorComponent } from './system-policy/system-major/system-major.component';
import { SystemQualificationComponent } from './system-policy/system-qualification/system-qualification.component';
import { SysManageComponent } from './system-manage/sys-manage/sys-manage.component';
import { SysComlocationComponent } from './system-manage/sys-comlocation/sys-comlocation.component';
import { ComlocationlistComponent } from './system-manage/sys-comlocation/comlocationlist/comlocationlist.component';
import { YearComponent } from './system-manage/year/year.component';

import { RoundComponent } from './system-manage/round/round.component';
import { AddRounComponent } from './system-manage/round/add-roun/add-roun.component';
import { CodestructureComponent } from './system-manage/codestructure/codestructure.component';
import { AddYearComponent } from './system-manage/year/add-year/add-year.component';
import { SystemSupplyComponent } from './system-policy/system-supply/system-supply.component';
import { SystemUniformComponent } from './system-policy/system-uniform/system-uniform.component';
import { PolroundsComponent } from './system-manage/polrounds/polrounds.component';


import { BloodtypeComponent } from './system-policy/bloodtype/bloodtype.component';

@NgModule({
    imports: [RouterModule.forChild([
        { path: 'bloodtype', component: BloodtypeComponent },


        { path: 'general', component: SystemPolicyComponent },
        { path: 'company', component: SystemCompanyComponent },
        { path: 'security', component: SystemSecurityComponent },
        { path: 'notification', component: SystemNotificationComponent },

        { path: 'bank', component: BankComponent },
        { path: 'system-reason', component: SystemReasonComponent },
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
        { path: 'system-supply', component: SystemSupplyComponent },
        { path: 'system-uniform', component: SystemUniformComponent },

        { path: 'course', component: SystemCourseComponent },
        { path: 'institute', component: SystemInstituteComponent },
        { path: 'faculty', component: SystemFacultyComponent },
        { path: 'major', component: SystemMajorComponent },
        { path: 'qualification', component: SystemQualificationComponent },
        { path: 'sys-manage', component: SysManageComponent },
        { path: 'sys-comlocation', component: SysComlocationComponent },
        { path: 'sys-comlocationlist', component: ComlocationlistComponent },
        { path: 'sys-roundComponent', component: RoundComponent },
        { path: 'sys-addroun', component: AddRounComponent },
        { path: 'sys-codestructure', component: CodestructureComponent },
        { path: 'year', component: YearComponent },
        { path: 'system-yearperiods', component: AddYearComponent },
        { path: 'system-polrounds', component: PolroundsComponent },

        








        //{ path: 'setup', data: { breadcrumb: 'Form Layout' }, loadChildren: () => import('./project-setup/project-setup.module').then(m => m.ProjectSetupModule) },

        { path: '**', redirectTo: '/notfound' }
    ])],
    exports: [RouterModule]
})
export class SystemRoutingModule { }

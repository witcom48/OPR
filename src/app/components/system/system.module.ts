import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { SystemRoutingModule } from './system-routing.module';

import { AutoCompleteModule } from "primeng/autocomplete";
import { CalendarModule } from "primeng/calendar";
import { ChipsModule } from "primeng/chips";
import { DropdownModule } from "primeng/dropdown";
import { InputMaskModule } from "primeng/inputmask";
import { InputNumberModule } from "primeng/inputnumber";
import { CascadeSelectModule } from "primeng/cascadeselect";
import { MultiSelectModule } from "primeng/multiselect";
import { InputTextareaModule } from "primeng/inputtextarea";
import { InputTextModule } from "primeng/inputtext";
import { TabViewModule } from 'primeng/tabview';
import { PanelModule } from 'primeng/panel';
import { MenuModule } from 'primeng/menu';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { PanelMenuModule } from 'primeng/panelmenu';
import { DividerModule } from 'primeng/divider';
import { AccordionModule } from 'primeng/accordion';
import { CardModule } from 'primeng/card';
import { InputSwitchModule } from 'primeng/inputswitch';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { ToolbarModule } from 'primeng/toolbar';
import { MenubarModule } from 'primeng/menubar';
import { MegaMenuModule } from 'primeng/megamenu';
import { TabMenuModule } from 'primeng/tabmenu';
import { SelectButtonModule } from 'primeng/selectbutton';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { ChipModule } from 'primeng/chip';
import { ChartModule } from 'primeng/chart';
import { ImageModule } from 'primeng/image';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogModule } from 'primeng/dialog';

import { SystemPolicyComponent } from './system-policy/system-policy.component';
import { SystemCompanyComponent } from './system-company/system-company.component';
import { SystemSecurityComponent } from './system-security/system-security.component';
import { SystemNotificationComponent } from './system-notification/system-notification.component';
import { BankComponent } from './bank/bank.component';
import { ReasonComponent } from './system-policy/reason/reason.component';
// import { EmpIDComponent } from './system-policy/emp-id/emp-id.component';
import { SystemOrganizationLevelComponent } from './system-policy/system-organization-level/system-organization-level.component';
import { SystemCardTypeComponent } from './system-policy/system-card-type/system-card-type.component';
import { SystemFamilyTypeComponent } from './system-policy/system-family-type/system-family-type.component';
import { SystemAddressTypeComponent } from './system-policy/system-address-type/system-address-type.component';
import { SystemProvinceComponent } from './system-policy/system-province/system-province.component';
import { SystemReligionComponent } from './system-policy/system-religion/system-religion.component';
import { SystemEthnicityComponent } from './system-policy/system-ethnicity/system-ethnicity.component';
import { BloodtypeComponent } from './system-policy/bloodtype/bloodtype.component';
import { SystemBloodtypeComponent } from './system-policy/system-bloodtype/system-bloodtype.component';
import { SystemHospitalComponent } from './system-policy/system-hospital/system-hospital.component';
import { SystemLocationComponent } from './system-policy/system-location/system-location.component';
import { SystemReduceComponent } from './system-policy/system-reduce/system-reduce.component';
import { SystemComaddressComponent } from './system-company/system-comaddress/comaddress.component';
import { CompanysComponent } from './system-company/companys/companys.component';
import { SystemComcardComponent } from './system-company/system-comcard/system-comcard.component';
import { SystemYearperiodComponent } from './system-policy/system-yearperiod/system-yearperiod.component';
// import { AddCodestructureComponent } from './system-policy/emp-id/add-codestructure/add-codestructure.component';
import { BranchComponent } from './branch/branch.component';
import { SystemBankaccountComponent } from './system-company/system-bankaccount/system-bankaccount.component';
import { SysBranchComponent } from './branch/sys-branch/sys-branch/sys-branch.component';


@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		SystemRoutingModule,
		AutoCompleteModule,
		CalendarModule,
		ChipsModule,
		DropdownModule,
		InputMaskModule,
		InputNumberModule,
		CascadeSelectModule,
		MultiSelectModule,
		InputTextareaModule,
		InputTextModule,
		TabViewModule,
		PanelModule,
		MenuModule,
		TableModule,
		TagModule,
		PanelMenuModule,
		DividerModule,
		AccordionModule,
		CardModule,
		InputSwitchModule,
		BreadcrumbModule,
		ToolbarModule,
		MenubarModule,
		MegaMenuModule,
		TabMenuModule,
		SelectButtonModule,
		ScrollPanelModule,
		ChipModule,
		ChartModule,
		ImageModule,
		ToastModule,
		ConfirmDialogModule,
		DialogModule,





	],
	declarations: [


           SystemPolicyComponent,
           SystemCompanyComponent,
           SystemSecurityComponent,
           SystemNotificationComponent,
           BankComponent,
           ReasonComponent,
        //    EmpIDComponent,
           SystemOrganizationLevelComponent,
           SystemCardTypeComponent,
           SystemFamilyTypeComponent,
           SystemAddressTypeComponent,
           SystemProvinceComponent,
           SystemReligionComponent,
           SystemEthnicityComponent,
           BloodtypeComponent,
           SystemBloodtypeComponent,
           SystemHospitalComponent,
           SystemLocationComponent,
           SystemReduceComponent,
           SystemComaddressComponent,
           SystemBankaccountComponent,
           CompanysComponent,
           SystemComcardComponent,
           SystemYearperiodComponent,
        //    AddCodestructureComponent,
           BranchComponent,
           SysBranchComponent,
  ]
})
export class SystemModule { }

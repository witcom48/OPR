import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { PayrollRoutingModule } from './payroll-routing.module';

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
import {ChartModule} from 'primeng/chart';
import {ImageModule} from 'primeng/image';
import {FileUploadModule} from 'primeng/fileupload';
import {PickListModule} from 'primeng/picklist';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogModule } from 'primeng/dialog';
import { PayrollPolicyComponent } from './payroll-policy/payroll-policy.component';
import { PayrollTransferComponent } from './payroll-transfer/payroll-transfer.component';
import { PayrollEntryComponent } from './payroll-entry/payroll-entry.component';
import { PayrollCalculateComponent } from './payroll-calculate/payroll-calculate.component';
import { PayrollCaltaxComponent } from './payroll-caltax/payroll-caltax.component';
import { PayrollViewComponent } from './payroll-view/payroll-view.component';
import { TaxrateComponent } from './payroll-policy/taxrate/taxrate.component';
import { ToastModule } from 'primeng/toast';
import { ItemsComponent } from './payroll-policy/items/items.component';
import { ItemComponent } from './payroll-policy/items/item/item.component';
import { ProvidentComponent } from './payroll-policy/provident/provident.component';
import { BonusComponent } from './payroll-policy/bonus/bonus.component';


@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		PayrollRoutingModule,
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
		FileUploadModule,
		PickListModule,
        ConfirmDialogModule,
        DialogModule,
        ToastModule,



	],
	declarations: [


    PayrollPolicyComponent,
           PayrollTransferComponent,
           PayrollEntryComponent,
           PayrollCalculateComponent,
           PayrollCaltaxComponent,
           PayrollViewComponent,
           TaxrateComponent,
           ItemsComponent,
           ItemComponent,
           ProvidentComponent,
           BonusComponent
  ]
})
export class PayrollModule { }

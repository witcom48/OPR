import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { RecruitmentRoutingModule } from './recruitment-routing.module';

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
import { RecruitmentRequestComponent } from './recruitment-request/recruitment-request.component';
import { RecruitmentApplyComponent } from './recruitment-apply/recruitment-apply.component';
import { RecruitmentPolicyComponent } from './recruitment-policy/recruitment-policy.component';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogModule } from 'primeng/dialog';
import { ApplyListComponent } from './recruitment-apply/apply/apply-list/apply-list.component';
import { RadioButtonModule } from 'primeng/radiobutton';
import { CheckboxModule } from 'primeng/checkbox';
import { RecruimentBlacklistComponent } from './recruiment-blacklist/recruiment-blacklist.component';
import { SetBlacklistComponent } from './recruiment-blacklist/set-blacklist/set-blacklist.component';
import { UsercontrolModule } from '../usercontrol/usercontrol.module';
import { ProgressBarModule } from 'primeng/progressbar';
import { FileUploadModule } from 'primeng/fileupload';

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		RecruitmentRoutingModule,
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
		RadioButtonModule,
		CheckboxModule,
		UsercontrolModule,
		ProgressBarModule,
		FileUploadModule,



	],
	declarations: [


    RecruitmentRequestComponent,
           RecruitmentApplyComponent,
           RecruitmentPolicyComponent,
           ApplyListComponent,
           RecruimentBlacklistComponent,
           SetBlacklistComponent
  ]
})
export class RecruitmentModule { }

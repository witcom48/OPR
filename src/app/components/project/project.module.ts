import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ProjectRoutingModule } from './project-routing.module';

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
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogModule } from 'primeng/dialog';
import { CheckboxModule } from 'primeng/checkbox';



import { ProjectPolicyComponent } from './project-policy/project-policy.component';
import { ProjectListComponent } from './project-list/project-list.component';
import { ProjectManageComponent } from './project-manage/project-manage.component';
import { ProjectWorkflowComponent } from './project-workflow/project-workflow.component';
import { ProjectMonitorComponent } from './project-monitor/project-monitor.component';
import { ProjectTimesheetComponent } from './project-timesheet/project-timesheet.component';
import { ProjectApproveComponent } from './project-approve/project-approve.component';
import { ProjectPackageComponent } from './project-package/project-package.component';
import { CostSetupComponent } from './policy/cost-setup/cost-setup.component';
import { ProGenaralComponent } from './policy/pro-genaral/pro-genaral.component';


import { UsercontrolModule } from '../usercontrol/usercontrol.module';

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		ProjectRoutingModule,
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
		ToastModule,
		ConfirmDialogModule,
		DialogModule,
		CheckboxModule,

		UsercontrolModule




		
	],
	declarations: [ProjectPolicyComponent, ProjectListComponent, ProjectManageComponent, ProjectWorkflowComponent, ProjectMonitorComponent, ProjectTimesheetComponent, ProjectApproveComponent, ProjectPackageComponent, CostSetupComponent, ProGenaralComponent]
})
export class ProjectModule { }

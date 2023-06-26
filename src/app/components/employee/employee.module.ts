import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { EmployeeRoutingModule } from './employee-routing.module';

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
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogModule } from 'primeng/dialog';
import {RadioButtonModule} from 'primeng/radiobutton';
import {CheckboxModule} from 'primeng/checkbox';
import { ProgressBarModule } from 'primeng/progressbar';
import { FileUploadModule } from 'primeng/fileupload';

import { EmployeeListComponent } from './employee-list/employee-list.component';
import { EmployeeManageComponent } from './employee-manage/employee-manage.component';
import { EmployeePolicyComponent } from './employee-policy/employee-policy.component';
import { EmployeeMonitorComponent } from './employee-monitor/employee-monitor.component';
import { PartComponent } from './employee-policy/genaral/part/part.component';
import { PositionComponent } from './employee-policy/genaral/position/position.component';
import { GroupComponent } from './employee-policy/genaral/group/group.component';
import { InitialComponent } from './employee-policy/genaral/initial/initial.component';
import { EmptypeComponent } from './employee-policy/genaral/emptype/emptype.component';
import { EmpstatusComponent } from './employee-policy/genaral/empstatus/empstatus.component';
import { EmpsetpositionComponent } from './employee-policy/setup-batch/empsetposition/empsetposition.component';
import { EmpsetdepComponent } from './employee-policy/setup-batch/empsetdep/empsetdep.component';
import { SystemModule } from '../system/system.module';
import { EmployeeLocationComponent } from './employee-policy/genaral/employee-location/employee-location.component';
import { UsercontrolModule } from '../usercontrol/usercontrol.module';
import { EmpsetsalaryComponent } from './employee-policy/setup-batch/empsetsalary/empsetsalary.component';
import { EmpsetgroupComponent } from './employee-policy/setup-batch/empsetgroup/empsetgroup.component';
import { EmpsetlocationComponent } from './employee-policy/setup-batch/empsetlocation/empsetlocation.component';
import { EmpsetprovidentComponent } from './employee-policy/setup-batch/empsetprovident/empsetprovident.component';
import { EmpsetbenefitsComponent } from './employee-policy/setup-batch/empsetbenefits/empsetbenefits.component';
import { EmployeePartComponent } from './employee-policy/genaral/employee-part/employee-part.component';
import { EmployeePositionComponent } from './employee-policy/genaral/employee-position/employee-position.component';
import { EmployeeGroupComponent } from './employee-policy/genaral/employee-group/employee-group.component';
import { EmpsettrainingComponent } from './employee-policy/setup-batch/empsettraining/empsettraining.component';
import { EmpsetassessmentComponent } from './employee-policy/setup-batch/empsetassessment/empsetassessment.component';


@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		EmployeeRoutingModule,
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
		SystemModule,
		UsercontrolModule,
		ProgressBarModule,
		FileUploadModule,



	],
	declarations: [
    EmployeeListComponent,
    EmployeeManageComponent,
    EmployeePolicyComponent,
    EmployeeMonitorComponent,
    PartComponent,
    PositionComponent,
    GroupComponent,
    InitialComponent,
    EmptypeComponent,
    EmpstatusComponent,
    EmpsetpositionComponent,
    EmpsetdepComponent,
    EmployeeLocationComponent,
    EmpsetsalaryComponent,
    EmpsetgroupComponent,
    EmpsetlocationComponent,
    EmpsetprovidentComponent,
    EmpsetbenefitsComponent,
    EmployeePartComponent,
    EmployeePositionComponent,
    EmployeeGroupComponent,
    EmpsettrainingComponent,
    EmpsetassessmentComponent
  ]
})
export class EmployeeModule { }

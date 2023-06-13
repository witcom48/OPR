import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { SelfRoutingModule } from './self-routing.module';

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
import { PasswordModule } from 'primeng/password';

import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogModule } from 'primeng/dialog';
import { RadioButtonModule } from 'primeng/radiobutton';
import { PickListModule } from 'primeng/picklist';
import { CheckboxModule } from 'primeng/checkbox';

import { SelfPolicyComponent } from './self-policy/self-policy.component';
import { SelfLeaveComponent } from './self-leave/self-leave.component';
import { SelfEmployeeComponent } from './self-employee/self-employee.component';
import { SelfOvertimeComponent } from './self-overtime/self-overtime.component';
import { SelfChangeshiftComponent } from './self-changeshift/self-changeshift.component';
import { SelfRecordtimeComponent } from './self-recordtime/self-recordtime.component';
import { SelfWorkflowComponent } from './self-workflow/self-workflow.component';
import { SelfAccountComponent } from './self-account/self-account.component';
import { SelfLineapproveComponent } from './self-lineapprove/self-lineapprove.component';
import { UsercontrolModule } from '../usercontrol/usercontrol.module';
import { SelfAreaComponent } from './self-area/self-area.component';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { SelfDaytypeComponent } from './self-daytype/self-daytype.component';
import { SelfCheckinComponent } from './self-checkin/self-checkin.component';
import { SelfTopicComponent } from './self-topic/self-topic.component';
import { SelfReqdocComponent } from './self-reqdoc/self-reqdoc.component';
import { SelfApproveLeaveComponent } from './self-approve-leave/self-approve-leave.component';
import { SelfApproveShiftComponent } from './self-approve-shift/self-approve-shift.component';
import { SelfApproveOvertimeComponent } from './self-approve-overtime/self-approve-overtime.component';
import { SelfApproveRecordtimeComponent } from './self-approve-recordtime/self-approve-recordtime.component';

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		SelfRoutingModule,
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
		PickListModule,
		CheckboxModule,
		PasswordModule,
		UsercontrolModule,
		LeafletModule




		
	],
	declarations: [
   
  
  
    SelfPolicyComponent,
              SelfLeaveComponent,
              SelfEmployeeComponent,
              SelfOvertimeComponent,
              SelfChangeshiftComponent,
              SelfRecordtimeComponent,
              SelfWorkflowComponent,
              SelfAccountComponent,
              SelfLineapproveComponent,
              SelfAreaComponent,
              SelfDaytypeComponent,
              SelfCheckinComponent,
              SelfTopicComponent,
              SelfReqdocComponent,
              SelfApproveLeaveComponent,
              SelfApproveShiftComponent,
              SelfApproveOvertimeComponent,
              SelfApproveRecordtimeComponent
  ]
})
export class SelfModule { }

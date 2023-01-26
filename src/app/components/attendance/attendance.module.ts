import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { AttendanceRoutingModule } from './attendance-routing.module';

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

import { AttendancePolicyComponent } from './attendance-policy/attendance-policy.component';
import { AttendanceSelfComponent } from './attendance-self/attendance-self.component';
import { AttendanceImportComponent } from './attendance-import/attendance-import.component';
import { AttendanceProcessComponent } from './attendance-process/attendance-process.component';
import { AttendanceCalculateComponent } from './attendance-calculate/attendance-calculate.component';
import { AttendanceViewComponent } from './attendance-view/attendance-view.component';
import { AttendanceTimecardComponent } from './attendance-timecard/attendance-timecard.component';
import { YearperiodComponent } from './attendance-policy/yearperiod/yearperiod.component';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogModule } from 'primeng/dialog';
import { ToastModule } from 'primeng/toast';
import { TimeperiodComponent } from './attendance-policy/timeperiod/timeperiod.component';
import { ReasonComponent } from './attendance-policy/reason/reason.component';
import { LocationComponent } from './attendance-policy/location/location.component';
import { HolidayComponent } from './attendance-policy/holiday/holiday.component';
import { ShiftComponent } from './attendance-policy/shift/shift.component';
import { DateMaskDirective } from './date-mask.directive';
import { ShiftPlanComponent } from './attendance-policy/shift-plan/shift-plan.component';
import { LeaveComponent } from './attendance-policy/leave/leave.component';
import { LeavePlanComponent } from './attendance-policy/leave-plan/leave-plan.component';
import { OvertimeComponent } from './attendance-policy/overtime/overtime.component';
import { DiligenceComponent } from './attendance-policy/diligence/diligence.component';
import { LateComponent } from './attendance-policy/late/late.component';
import { SetHolidayComponent } from './attendance-policy/set-holiday/set-holiday.component';


@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		AttendanceRoutingModule,
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
		ToastModule,
		ConfirmDialogModule,
		DialogModule


		
	],
	declarations: [
   
  
    AttendancePolicyComponent,
           AttendanceSelfComponent,
           AttendanceImportComponent,
           AttendanceProcessComponent,
           AttendanceCalculateComponent,
           AttendanceViewComponent,
           AttendanceTimecardComponent,
           YearperiodComponent,
           TimeperiodComponent,
           ReasonComponent,
           LocationComponent,
           HolidayComponent,
           ShiftComponent,
		   DateMaskDirective,
     ShiftPlanComponent,
     LeaveComponent,
     LeavePlanComponent,
     OvertimeComponent,
     DiligenceComponent,
     LateComponent,
     SetHolidayComponent
  ]
})
export class AttendanceModule { }

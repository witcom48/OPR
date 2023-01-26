import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AttendancePolicyComponent } from './attendance-policy/attendance-policy.component';
import { AttendanceSelfComponent } from './attendance-self/attendance-self.component';
import { AttendanceImportComponent } from './attendance-import/attendance-import.component';
import { AttendanceProcessComponent } from './attendance-process/attendance-process.component';
import { AttendanceCalculateComponent } from './attendance-calculate/attendance-calculate.component';
import { AttendanceViewComponent } from './attendance-view/attendance-view.component';
import { YearperiodComponent } from './attendance-policy/yearperiod/yearperiod.component';
import { TimeperiodComponent } from './attendance-policy/timeperiod/timeperiod.component';
import { ReasonComponent } from './attendance-policy/reason/reason.component';
import { LocationComponent } from './attendance-policy/location/location.component';
import { HolidayComponent } from './attendance-policy/holiday/holiday.component';
import { ShiftComponent } from './attendance-policy/shift/shift.component';
import { ShiftPlanComponent } from './attendance-policy/shift-plan/shift-plan.component';
import { LeaveComponent } from './attendance-policy/leave/leave.component';
import { LeavePlanComponent } from './attendance-policy/leave-plan/leave-plan.component';
import { OvertimeComponent } from './attendance-policy/overtime/overtime.component';
import { DiligenceComponent } from './attendance-policy/diligence/diligence.component';
import { LateComponent } from './attendance-policy/late/late.component';
import { SetHolidayComponent } from './attendance-policy/set-holiday/set-holiday.component';
import { SetShiftComponent } from './attendance-policy/set-shift/set-shift.component';
import { SetOvertimeComponent } from './attendance-policy/set-overtime/set-overtime.component';
import { SetDiligenceComponent } from './attendance-policy/set-diligence/set-diligence.component';
import { SetLateComponent } from './attendance-policy/set-late/set-late.component';
import { SetLeaveComponent } from './attendance-policy/set-leave/set-leave.component';
import { AttendanceManageComponent } from './attendance-manage/attendance-manage.component';



@NgModule({
    imports: [RouterModule.forChild([

        { path: 'policy', component: AttendancePolicyComponent },
        { path: 'manage', component: AttendanceManageComponent },
        { path: 'self', component: AttendanceSelfComponent },
        { path: 'import', component: AttendanceImportComponent },
        { path: 'process', component: AttendanceProcessComponent },
        { path: 'calculate', component: AttendanceCalculateComponent },
        { path: 'view', component: AttendanceViewComponent },
        { path: 'policy/yearperiod', component: YearperiodComponent },
        { path: 'policy/timeperiod', component: TimeperiodComponent },
        { path: 'policy/reason', component: ReasonComponent },
        { path: 'policy/location', component: LocationComponent },
        { path: 'policy/holiday', component: HolidayComponent },
        { path: 'policy/shift', component: ShiftComponent },
        { path: 'policy/shiftplan', component: ShiftPlanComponent },
        { path: 'policy/leave', component: LeaveComponent },
        { path: 'policy/leaveplan', component: LeavePlanComponent },
        { path: 'policy/overtime', component: OvertimeComponent },
        { path: 'policy/diligence', component: DiligenceComponent },
        { path: 'policy/late', component: LateComponent },
        { path: 'policy/setholiday', component: SetHolidayComponent },
        { path: 'policy/setshift', component: SetShiftComponent },
        { path: 'policy/setovertime', component: SetOvertimeComponent },
        { path: 'policy/setdiligence', component: SetDiligenceComponent },
        { path: 'policy/setlate', component: SetLateComponent },
        { path: 'policy/setleave', component: SetLeaveComponent },

        //{ path: 'setup', data: { breadcrumb: 'Form Layout' }, loadChildren: () => import('./project-setup/project-setup.module').then(m => m.ProjectSetupModule) },

        { path: '**', redirectTo: '/notfound' }
    ])],
    exports: [RouterModule]
})
export class AttendanceRoutingModule { }

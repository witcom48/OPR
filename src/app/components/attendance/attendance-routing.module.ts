import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AttendancePolicyComponent } from './attendance-policy/attendance-policy.component';
import { AttendanceSelfComponent } from './attendance-self/attendance-self.component';
import { AttendanceImportComponent } from './attendance-import/attendance-import.component';
import { AttendanceProcessComponent } from './attendance-process/attendance-process.component';
import { AttendanceCalculateComponent } from './attendance-calculate/attendance-calculate.component';
import { YearperiodComponent } from './attendance-policy/yearperiod/yearperiod.component';
import { TimeperiodComponent } from './attendance-policy/timeperiod/timeperiod.component';
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
import { ChangeshiftComponent } from './attendance-manage/changeshift/changeshift.component';
import { AttendanceReasonComponent } from './attendance-policy/attendance-reason/attendance-reason.component';
import { AttendanceLocationComponent } from './attendance-policy/attendance-location/attendance-location.component';
import { TimeallowanceComponent } from './attendance-policy/timeallowance/timeallowance.component';
import { SetTimeallowanceComponent } from './attendance-policy/set-timeallowance/set-timeallowance.component';

import { SetAttpayComponent } from './attendance-policy/set-attpay/set-attpay.component';
import { AttendanceSummaryComponent } from './attendance-summary/attendance-summary.component';
import { SetuppolicyComponent } from './attendance-policy/setuppolicy/setuppolicy.component';
import { AttendanceShiftComponent } from './attendance-policy/attendance-shift/attendance-shift.component';
import { AttendanceLostwagesComponent } from './attendance-lostwages/attendance-lostwages.component';
import { AttendanceApproveComponent } from './attendance-approve/attendance-approve.component';
import { AttendanceViewComponent } from './attendance-view/attendance-view.component';
import { DicRequestComponent } from './attendance-dicrequest/dic-request.component';
import { RequestOvertimeComponent } from './attendance-dicrequest/request-overtimes/request-overtime.component';


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
        { path: 'policy/reason', component: AttendanceReasonComponent },
        { path: 'policy/location', component: AttendanceLocationComponent },
        { path: 'policy/holiday', component: HolidayComponent },
        { path: 'policy/shift', component: AttendanceShiftComponent },
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
        { path: 'policy/timeallowance', component: TimeallowanceComponent },
        { path: 'policy/settimeallowance', component: SetTimeallowanceComponent },
        { path: 'manage/changeshift', component: ChangeshiftComponent },

        { path: 'policy/setattpay', component: SetAttpayComponent },
        { path: 'policy/setallpolicy', component: SetuppolicyComponent },

        { path: 'summary', component: AttendanceSummaryComponent },

        { path: 'lostwages', component: AttendanceLostwagesComponent },
        { path: 'att-approve', component: AttendanceApproveComponent },
        { path: 'dicrequest', component: DicRequestComponent },

        { path: 'dicrequest/requestot', component: RequestOvertimeComponent },
        //{ path: 'setup', data: { breadcrumb: 'Form Layout' }, loadChildren: () => import('./project-setup/project-setup.module').then(m => m.ProjectSetupModule) },

        { path: '**', redirectTo: '/notfound' }
    ])],
    exports: [RouterModule]
})
export class AttendanceRoutingModule { }

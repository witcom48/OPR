import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { AppLayoutComponent } from "./layout/app.layout.component";

import { VerifyComponent } from './components/authen/verify/verify.component';

@NgModule({
    imports: [
        RouterModule.forRoot([
            {
                path: '', component: AppLayoutComponent,
                children: [
                    { path: '', component: VerifyComponent },
                

                    { path: 'project', loadChildren: () => import('./components/project/project.module').then(m => m.ProjectModule) },
                    { path: 'employee', loadChildren: () => import('./components/employee/employee.module').then(m => m.EmployeeModule) },
                    { path: 'attendance', loadChildren: () => import('./components/attendance/attendance.module').then(m => m.AttendanceModule) },
                    { path: 'payroll', loadChildren: () => import('./components/payroll/payroll.module').then(m => m.PayrollModule) },
                    { path: 'recruitment', loadChildren: () => import('./components/recruitment/recruitment.module').then(m => m.RecruitmentModule) },
                    { path: 'system', loadChildren: () => import('./components/system/system.module').then(m => m.SystemModule) },
                    { path: 'self', loadChildren: () => import('./components/self/self.module').then(m => m.SelfModule) }
                    

                ]
            },
            
            // { path: 'notfound', component: NotfoundComponent },

            

            // { path: '**', redirectTo: '/notfound' },
        ], { scrollPositionRestoration: 'enabled', anchorScrolling: 'enabled', onSameUrlNavigation: 'reload' })
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {
}

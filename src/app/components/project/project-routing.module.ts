import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';


import { ProjectPolicyComponent } from './project-policy/project-policy.component';
import { ProjectListComponent } from './project-list/project-list.component';
import { ProjectManageComponent } from './project-manage/project-manage.component';
import { ProjectWorkflowComponent } from './project-workflow/project-workflow.component';
import { ProjectMonitorComponent } from './project-monitor/project-monitor.component';
import { ProjectTimesheetComponent } from './project-timesheet/project-timesheet.component';
import { ProjectApproveComponent } from './project-approve/project-approve.component';

import { ProjectPackageComponent } from './project-package/project-package.component';
import { CostSetupComponent } from './policy/cost-setup/cost-setup.component';


@NgModule({
    imports: [RouterModule.forChild([ 
        { path: 'manage', component: ProjectManageComponent },
        { path: 'list', component: ProjectListComponent },
        { path: 'policy', component: ProjectPolicyComponent },
        { path: 'workflow', component: ProjectWorkflowComponent },
        { path: 'monitor', component: ProjectMonitorComponent },
        { path: 'timesheet', component: ProjectTimesheetComponent },
        { path: 'approve', component: ProjectApproveComponent },
        { path: 'package', component: ProjectPackageComponent },
        { path: 'setup_cost', component: CostSetupComponent },

        //{ path: 'setup', data: { breadcrumb: 'Form Layout' }, loadChildren: () => import('./project-setup/project-setup.module').then(m => m.ProjectSetupModule) },

        { path: '**', redirectTo: '/notfound' }
    ])],
    exports: [RouterModule]
})
export class ProjectRoutingModule { }

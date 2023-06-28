import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppConfig } from 'src/app/config/config';
import { InitialCurrent } from 'src/app/config/initial_current';
import { LeaveModels } from 'src/app/models/attendance/leave';
import { LeaveplanModels } from 'src/app/models/attendance/leave_plan';
import { PlanleaveServices } from 'src/app/services/attendance/planleave.service';
@Component({
  selector: 'app-set-leave',
  templateUrl: './set-leave.component.html',
  styleUrls: ['./set-leave.component.scss']
})
export class SetLeaveComponent implements OnInit {
  policy: any = []
  check: boolean = false;
  constructor(
    private planleaveService: PlanleaveServices,
    private router: Router
  ) { }
  public initial_current: InitialCurrent = new InitialCurrent();
  doGetInitialCurrent() {
    this.initial_current = JSON.parse(localStorage.getItem(AppConfig.SESSIONInitial) || '{}');
    if (!this.initial_current) {
      this.router.navigateByUrl('login');
    }
  }
  ngOnInit(): void {
    this.doGetInitialCurrent();
    this.doLoadPlanleave()
  }

  doLoadPlanleave() {
    var tmp = new LeaveplanModels();
    this.planleaveService.planleave_get(tmp).then(async (res) => {
      res.forEach((element: LeaveplanModels) => {
        this.policy.push(
          {
            name: this.initial_current.Language == "EN" ? element.planleave_name_en : element.planleave_name_th,
            code: element.planleave_code
          }
        )
      });
      this.check = true;
    });
  }
}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppConfig } from 'src/app/config/config';
import { InitialCurrent } from 'src/app/config/initial_current';
import { HolidayModels } from 'src/app/models/attendance/holiday';
import { Holiday_listModels } from 'src/app/models/attendance/holiday_list';
import { PlanholidayServices } from 'src/app/services/attendance/planholiday.service';

@Component({
  selector: 'app-set-holiday',
  templateUrl: './set-holiday.component.html',
  styleUrls: ['./set-holiday.component.scss']
})
export class SetHolidayComponent implements OnInit {
  policy: any = []
  check: boolean = false;
  constructor(
    private planholidayService: PlanholidayServices,
    private router: Router
  ) { }
  public initial_current: InitialCurrent = new InitialCurrent();
  doGetInitialCurrent() {
    this.initial_current = JSON.parse(localStorage.getItem(AppConfig.SESSIONInitial) || '{}');
    if (!this.initial_current) {
      this.router.navigateByUrl('');
    }
  }
  ngOnInit(): void {
    this.doGetInitialCurrent();
    this.doLoadPlanholiday()
  }

  doLoadPlanholiday() {
    this.policy = [];
    var tmp = new HolidayModels();
    tmp.year_code = this.initial_current.PR_Year
    this.planholidayService.planholiday_get(tmp).then(async (res) => {
      await res.forEach((element: HolidayModels) => {
        this.policy.push(
          {
            name: this.initial_current.Language == "EN" ? element.planholiday_name_en : element.planholiday_name_th,
            code: element.planholiday_code
          }
        )
      });
      this.check = true;
      // this.holiday_lists = await res;
    });
  }

}
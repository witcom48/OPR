import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppConfig } from 'src/app/config/config';
import { InitialCurrent } from 'src/app/config/initial_current';
import { cls_MTPlantimeallw } from 'src/app/models/attendance/cls_MTPlantimeallw';
import { TimeAllowanceServices } from 'src/app/services/attendance/timeallowance.service';

@Component({
  selector: 'app-set-timeallowance',
  templateUrl: './set-timeallowance.component.html',
  styleUrls: ['./set-timeallowance.component.scss']
})
export class SetTimeallowanceComponent implements OnInit {
  policy: any = []
  check: boolean = false;

  constructor(
    private router: Router,
    private timeallow: TimeAllowanceServices,
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
    this.doLoadPlanAllowance();
  }
  doLoadPlanAllowance() {
    var tmp = new cls_MTPlantimeallw();
    this.timeallow.timeallow_get(tmp).then(async (res) => {
      await res.forEach((element: cls_MTPlantimeallw) => {
        this.policy.push(
          {
            name: this.initial_current.Language == "EN" ? element.plantimeallw_name_en : element.plantimeallw_name_th,
            code: element.plantimeallw_code
          }
        )
      });
      this.check = true;
    });
  }

}

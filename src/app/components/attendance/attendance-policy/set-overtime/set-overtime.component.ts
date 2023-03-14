import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppConfig } from 'src/app/config/config';
import { InitialCurrent } from 'src/app/config/initial_current';
import { OvertimeModels } from 'src/app/models/attendance/overtime';
import { OTServices } from 'src/app/services/attendance/rateot.service';

@Component({
  selector: 'app-set-overtime',
  templateUrl: './set-overtime.component.html',
  styleUrls: ['./set-overtime.component.scss']
})
export class SetOvertimeComponent implements OnInit {
  policy: any = []
  check: boolean = false;
  constructor(
    private OtService: OTServices,
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
    this.doLoadOt()
  }

  doLoadOt() {
    var tmp = new OvertimeModels();
    this.OtService.ot_get(tmp).then(async (res) => {
      await res.forEach((element: OvertimeModels) => {
        this.policy.push(
          {
            name: this.initial_current.Language == "EN" ? element.rateot_name_en : element.rateot_name_th,
            code: element.rateot_code
          }
        )
      });
      this.check = true;
    });
  }

}

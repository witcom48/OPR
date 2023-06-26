import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppConfig } from 'src/app/config/config';
import { InitialCurrent } from 'src/app/config/initial_current';
import { LateModels } from 'src/app/models/attendance/late';
import { LateServices } from 'src/app/services/attendance/late.service';

@Component({
  selector: 'app-set-late',
  templateUrl: './set-late.component.html',
  styleUrls: ['./set-late.component.scss']
})
export class SetLateComponent implements OnInit {
  policy: any = []
  check: boolean = false;
  constructor(
    private router: Router,
    private lateService: LateServices,
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
    this.doLoadLate();
  }
  doLoadLate() {
    var tmp = new LateModels();
    this.lateService.late_get(tmp).then(async (res) => {
      await res.forEach((element: LateModels) => {
        this.policy.push(
          {
            name: this.initial_current.Language == "EN" ? element.late_name_en : element.late_name_th,
            code: element.late_code
          }
        )
      });
      this.check = true;
    });
  }
}


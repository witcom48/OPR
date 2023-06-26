import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppConfig } from 'src/app/config/config';
import { InitialCurrent } from 'src/app/config/initial_current';
import { DiligenceModels } from 'src/app/models/attendance/diligence';
import { DiligenceServices } from 'src/app/services/attendance/diligence.service';

@Component({
  selector: 'app-set-diligence',
  templateUrl: './set-diligence.component.html',
  styleUrls: ['./set-diligence.component.scss']
})
export class SetDiligenceComponent implements OnInit {
  policy: any = []
  check: boolean = false;
  constructor(
    private diligenceServices: DiligenceServices,
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
    this.doLoadDiligence()
  }

  doLoadDiligence() {
    var tmp = new DiligenceModels();
    this.diligenceServices.diligence_get(tmp).then(async (res) => {
      await res.forEach((element: DiligenceModels) => {
        this.policy.push(
          {
            name: this.initial_current.Language == "EN" ? element.diligence_name_en : element.diligence_name_th,
            code: element.diligence_code
          }
        )
      });
      this.check = true;
    });
  }
}

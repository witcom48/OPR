import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { SelectEmpComponent } from 'src/app/components/usercontrol/select-emp/select-emp.component';
import { AppConfig } from 'src/app/config/config';
import { InitialCurrent } from 'src/app/config/initial_current';
import { SetShiftModels } from 'src/app/models/attendance/setshift';
import { ShiftplanModels } from 'src/app/models/attendance/shift_plan';
import { YearPeriodModels } from 'src/app/models/attendance/yearperiod';
import { PlanshiftServices } from 'src/app/services/attendance/planshift.service';
import { SetShiftServices } from 'src/app/services/attendance/setshift.service';
import { YearService } from 'src/app/services/system/policy/year.service';
interface Policy {
  name: string,
  code: string
}
interface Year {
  name: string,
  code: string
}
@Component({
  selector: 'app-set-shift',
  templateUrl: './set-shift.component.html',
  styleUrls: ['./set-shift.component.scss']
})
export class SetShiftComponent implements OnInit {
  constructor(
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private planshiftService: PlanshiftServices,
    private yearServices: YearService,
    private setshiftServices: SetShiftServices,
    private router: Router
  ) { }
  index: number = 0;
  @ViewChild(SelectEmpComponent) selectEmp: any;
  // timesheet_list: PrjectEmpdailyModel[] = [];
  // timesheet_dest: PrjectEmpdailyModel[] = [];
  result_list: any[] = [];
  // selectedDate: PrjectEmpdailyModel = new PrjectEmpdailyModel;
  policy_list: Policy[] = []
  policyselect!: Policy;
  yaer_list: Year[] = []
  yearselect!: Year;
  loading: boolean = false;
  new_data: boolean = false;
  @ViewChild('dt2') table: Table | undefined;

  public initial_current: InitialCurrent = new InitialCurrent();
  doGetInitialCurrent() {
    this.initial_current = JSON.parse(localStorage.getItem(AppConfig.SESSIONInitial) || '{}');
    if (!this.initial_current) {
      this.router.navigateByUrl('');
    }
  }
  ngOnInit(): void {
    this.doGetInitialCurrent();
    this.doLoadYear();
    this.doLoadPlanshift();
  }
  doLoadYear() {
    var tmp = new YearPeriodModels();
    tmp.year_group = "LEAVE"
    this.yearServices.year_get(tmp).then(async (res) => {
      await res.forEach((element: YearPeriodModels) => {
        this.yaer_list.push({ name: (this.initial_current.Language == "EN" ? element.year_name_en : element.year_name_th) + " " + element.year_code, code: element.year_code })
      });
      if (this.yaer_list.length > 0) {
        this.yearselect =
        {
          name: this.yaer_list[0]?.name,
          code: this.yaer_list[0]?.code
        }
      }
    });

  }
  doLoadPlanshift() {
    var tmp = new ShiftplanModels();
    this.planshiftService.planshift_get(tmp).then(async (res) => {
      await res.forEach(async (element: ShiftplanModels) => {
        this.policy_list.push(
          {
            name: this.initial_current.Language == "EN" ? element.planshift_name_en : element.planshift_name_th,
            code: element.planshift_code
          }
        )
      });
      if (this.policy_list.length > 0) {
        this.policyselect =
        {
          name: this.policy_list[0]?.name,
          code: this.policy_list[0]?.code
        }
      }
    });
  }
  process() {
    this.result_list = [];
    if (this.selectEmp.employee_dest.length > 0) {
      this.SetShift();
      // this.confirmationService.confirm({
      //   message: "SetUpPolicyAttence",
      //   header: "SetUp",
      //   icon: 'pi pi-exclamation-triangle',
      //   accept: () => {
      //     this.doRecordPlanholiday();
      //   },
      //   reject: () => {
      //   }
      // });
    }
  }
  async SetShift() {
    var data = new SetShiftModels();
    data.planshift_code = this.policyselect.code
    data.year_code = this.yearselect.code;
    data.company_code = this.initial_current.CompCode
    data.modified_by = this.initial_current.Username
    data.transaction_data = this.selectEmp.employee_dest;
    this.loading = true;
    await this.setshiftServices.SetShift_record(data).then((res) => {
      console.log(res)
      if (res.result == "1") {
        console.log(res.result_text)
        this.messageService.add({ severity: 'success', summary: 'Success', detail: res.result_text });
      }
      else {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: res.result_text });
      }
      this.loading = false;
    });
  }
  function(e: any) {
    var page = e.index;
    this.index = page;
    if (page == 1) {
      setTimeout(() => {
        this.new_data = true;
      }, 300);
    } else {
      this.new_data = false;
    }
  }

}

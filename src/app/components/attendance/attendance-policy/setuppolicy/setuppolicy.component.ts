import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, ConfirmEventType, MenuItem, MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { SelectEmpComponent } from 'src/app/components/usercontrol/select-emp/select-emp.component';
import { AppConfig } from 'src/app/config/config';
import { InitialCurrent } from 'src/app/config/initial_current';
import { cls_MTPlantimeallw } from 'src/app/models/attendance/cls_MTPlantimeallw';
import { DiligenceModels } from 'src/app/models/attendance/diligence';
import { HolidayModels } from 'src/app/models/attendance/holiday';
import { LateModels } from 'src/app/models/attendance/late';
import { LeaveplanModels } from 'src/app/models/attendance/leave_plan';
import { OvertimeModels } from 'src/app/models/attendance/overtime';
import { SetPolicyAttModels } from 'src/app/models/attendance/setpolicyatt';
import { SetShiftModels } from 'src/app/models/attendance/setshift';
import { ShiftplanModels } from 'src/app/models/attendance/shift_plan';
import { YearPeriodModels } from 'src/app/models/attendance/yearperiod';
import { DiligenceServices } from 'src/app/services/attendance/diligence.service';
import { LateServices } from 'src/app/services/attendance/late.service';
import { PlanholidayServices } from 'src/app/services/attendance/planholiday.service';
import { PlanleaveServices } from 'src/app/services/attendance/planleave.service';
import { PlanshiftServices } from 'src/app/services/attendance/planshift.service';
import { OTServices } from 'src/app/services/attendance/rateot.service';
import { SetShiftServices } from 'src/app/services/attendance/setshift.service';
import { SetPolicyAttServices } from 'src/app/services/attendance/setuppolicy.service';
import { TimeAllowanceServices } from 'src/app/services/attendance/timeallowance.service';
import { YearService } from 'src/app/services/system/policy/year.service';
interface Policy {
  name: string,
  code: string
}
interface Result {
  worker: string,
  policy: string,
  modied_by: string,
  modied_date: string,
}
interface Year {
  name: string,
  code: string
}
@Component({
  selector: 'app-setuppolicy',
  templateUrl: './setuppolicy.component.html',
  styleUrls: ['./setuppolicy.component.scss']
})
export class SetuppolicyComponent implements OnInit {
  mainMenuItems: MenuItem[] = [{ label: 'Attendance', routerLink: '/attendance/policy' }, { label: 'Set Polilcy', routerLink: '/attendance/policy/setallpolicy', styleClass: 'activelike' }];
  homeIcon: any = { icon: 'pi pi-home', routerLink: '/' };
  constructor(
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private setPolicyAttService: SetPolicyAttServices,
    private planholidayService: PlanholidayServices,
    private yearServices: YearService,
    private planshiftService: PlanshiftServices,
    private OtService: OTServices,
    private diligenceServices: DiligenceServices,
    private lateService: LateServices,
    private planleaveService: PlanleaveServices,
    private timeallow: TimeAllowanceServices,
    private setshiftServices: SetShiftServices,
    private router: Router
  ) { }
  @Input() policy_list: Policy[] = []
  @Input() title: string = "";
  @Input() pol_type: string = "";
  index: number = 0;

  @ViewChild(SelectEmpComponent) selectEmp: any;
  // timesheet_list: PrjectEmpdailyModel[] = [];
  // timesheet_dest: PrjectEmpdailyModel[] = [];
  result_list: Result[] = [];
  yaer_list: Year[] = []
  // selectedDate: PrjectEmpdailyModel = new PrjectEmpdailyModel;
  policyselect!: Policy;
  policyholiday: Policy[] = [];
  policyholidayselect!: Policy;
  policyshift: Policy[] = [];
  policyshiftselect!: Policy;
  policyOT: Policy[] = [];
  policyOTselect!: Policy;
  policydiligence: Policy[] = [];
  policydiligenceselect!: Policy;
  policylate: Policy[] = [];
  policylateselect!: Policy;
  policyleave: Policy[] = [];
  policyleaveselect!: Policy;
  policyallow: Policy[] = [];
  policyallowselect!: Policy;
  yearselect!: Year;
  policy_process: string[] = [];
  loading: boolean = false;
  new_data: boolean = false;
  @ViewChild('dt2') table: Table | undefined;

  public initial_current: InitialCurrent = new InitialCurrent();
  doGetInitialCurrent() {
    this.initial_current = JSON.parse(localStorage.getItem(AppConfig.SESSIONInitial) || '{}');
    if (!this.initial_current) {
      this.router.navigateByUrl('login');
    }
  }
  ngOnInit(): void {
    this.doGetInitialCurrent();
    this.doLoadYear();
    this.doLoadPlanshift();
    this.doLoadPlanholiday();
    this.doLoadOt();
    this.doLoadDiligence();
    this.doLoadLate();
    this.doLoadPlanleave();
    this.doLoadPlanAllowance();
  }
  doLoadPlanholiday() {
    this.policyholiday = [];
    var tmp = new HolidayModels();
    tmp.year_code = this.initial_current.PR_Year
    this.planholidayService.planholiday_get(tmp).then(async (res) => {
      await res.forEach((element: HolidayModels) => {
        this.policyholiday.push(
          {
            name: this.initial_current.Language == "EN" ? element.planholiday_name_en : element.planholiday_name_th,
            code: element.planholiday_code
          }
        )
      });
      // this.policyholidayselect = {
      //   name: this.policyholiday[0]?.name,
      //   code: this.policyholiday[0]?.code
      // }
    });
  }
  doLoadPlanshift() {
    var tmp = new ShiftplanModels();
    this.planshiftService.planshift_get(tmp).then(async (res) => {
      await res.forEach(async (element: ShiftplanModels) => {
        this.policyshift.push(
          {
            name: this.initial_current.Language == "EN" ? element.planshift_name_en : element.planshift_name_th,
            code: element.planshift_code
          }
        )
      });
      // if (this.policyshift.length > 0) {
      //   this.policyshiftselect =
      //   {
      //     name: this.policyshift[0]?.name,
      //     code: this.policyshift[0]?.code
      //   }
      // }
    });
  }
  doLoadOt() {
    var tmp = new OvertimeModels();
    this.OtService.ot_get(tmp).then(async (res) => {
      await res.forEach((element: OvertimeModels) => {
        this.policyOT.push(
          {
            name: this.initial_current.Language == "EN" ? element.rateot_name_en : element.rateot_name_th,
            code: element.rateot_code
          }
        )
      });
      // if (this.policyOT.length > 0) {
      //   this.policyOTselect =
      //   {
      //     name: this.policyOT[0]?.name,
      //     code: this.policyOT[0]?.code
      //   }
      // }
    });
  }
  doLoadDiligence() {
    var tmp = new DiligenceModels();
    this.diligenceServices.diligence_get(tmp).then(async (res) => {
      await res.forEach((element: DiligenceModels) => {
        this.policydiligence.push(
          {
            name: this.initial_current.Language == "EN" ? element.diligence_name_en : element.diligence_name_th,
            code: element.diligence_code
          }
        )
      });
      // if (this.policydiligence.length > 0) {
      //   this.policydiligenceselect =
      //   {
      //     name: this.policydiligence[0]?.name,
      //     code: this.policydiligence[0]?.code
      //   }
      // }
    });
  }

  doLoadLate() {
    var tmp = new LateModels();
    this.lateService.late_get(tmp).then(async (res) => {
      await res.forEach((element: LateModels) => {
        this.policylate.push(
          {
            name: this.initial_current.Language == "EN" ? element.late_name_en : element.late_name_th,
            code: element.late_code
          }
        )
      });
      // if (this.policylate.length > 0) {
      //   this.policylateselect =
      //   {
      //     name: this.policylate[0]?.name,
      //     code: this.policylate[0]?.code
      //   }
      // }
    });
  }

  doLoadPlanleave() {
    var tmp = new LeaveplanModels();
    this.planleaveService.planleave_get(tmp).then(async (res) => {
      res.forEach((element: LeaveplanModels) => {
        this.policyleave.push(
          {
            name: this.initial_current.Language == "EN" ? element.planleave_name_en : element.planleave_name_th,
            code: element.planleave_code
          }
        )
      });
      // if (this.policyleave.length > 0) {
      //   this.policyleaveselect =
      //   {
      //     name: this.policyleave[0]?.name,
      //     code: this.policyleave[0]?.code
      //   }
      // }
    });
  }

  doLoadPlanAllowance() {
    var tmp = new cls_MTPlantimeallw();
    this.timeallow.timeallow_get(tmp).then(async (res) => {
      await res.forEach((element: cls_MTPlantimeallw) => {
        this.policyallow.push(
          {
            name: this.initial_current.Language == "EN" ? element.plantimeallw_name_en : element.plantimeallw_name_th,
            code: element.plantimeallw_code
          }
        )
      });
      // if (this.policyallow.length > 0) {
      //   this.policyallowselect =
      //   {
      //     name: this.policyallow[0]?.name,
      //     code: this.policyallow[0]?.code
      //   }
      // }
    });
  }
  async process(pol_type: string) {
    this.result_list = [];
    if (this.selectEmp.employee_dest.length > 0) {
      // console.log("select", pol_type);
      if (this.policyholidayselect) {
        await this.SetPolicyAtt('HO', this.policyholidayselect.code);
        // console.log("setting policyholiday");
      }
      if (this.policyshiftselect && this.yearselect) {
        await this.SetShift();
        // console.log("setting shift");
      }
      if (this.policyOTselect) {
        await this.SetPolicyAtt('OT', this.policyOTselect.code);
        // console.log("setting policyOTselect");
      }
      if (this.policydiligenceselect) {
        await this.SetPolicyAtt('DG', this.policydiligenceselect.code);
        // console.log("setting policydiligenceselect");
      }
      if (this.policylateselect) {
        await this.SetPolicyAtt('LT', this.policylateselect.code);
        // console.log("setting policylateselect");
      }
      if (this.policyleaveselect) {
        await this.SetPolicyAtt('LV', this.policyleaveselect.code);
        // console.log("setting policyleaveselect");
      }
      if (this.policyallowselect) {
        await this.SetPolicyAtt('AW', this.policyallowselect.code);
        // console.log("setting policyallowselect");
      }
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

  doLoadYear() {
    var tmp = new YearPeriodModels();
    tmp.year_group = "LEAVE"
    this.yearServices.year_get(tmp).then(async (res) => {
      await res.forEach((element: YearPeriodModels) => {
        this.yaer_list.push({ name: (this.initial_current.Language == "EN" ? element.year_name_en : element.year_name_th) + " " + element.year_code, code: element.year_code })
      });
      // if (this.yaer_list.length > 0) {
      //   this.yearselect =
      //   {
      //     name: this.yaer_list[0]?.name,
      //     code: this.yaer_list[0]?.code
      //   }
      // }
    });

  }

  async SetPolicyAtt(pol_type: string, policy: string) {
    var data = new SetPolicyAttModels();
    data.pol_code = policy
    data.pol_type = pol_type;
    data.year_code = this.initial_current.PR_Year
    data.company_code = this.initial_current.CompCode
    data.modified_by = this.initial_current.Username
    data.emp_data = this.selectEmp.employee_dest;
    this.loading = true;
    await this.setPolicyAttService.SetPolicyAtt_record(data).then((res) => {
      // console.log(res)
      if (res.success) {
        // console.log(res.message)
        this.messageService.add({ severity: 'success', summary: 'Success', detail: pol_type + " : " + res.message });
      }
      else {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: pol_type + " : " + res.message });
      }
      this.loading = false;
    });
  }
  async SetShift() {
    var data = new SetShiftModels();
    data.planshift_code = this.policyshiftselect.code
    data.year_code = this.yearselect.code;
    data.company_code = this.initial_current.CompCode
    data.modified_by = this.initial_current.Username
    data.transaction_data = this.selectEmp.employee_dest;
    this.loading = true;
    // console.log(data);
    await this.setshiftServices.SetShift_record(data).then((res) => {
      // console.log(res)
      if (res.result == "1") {
        // console.log(res.result_text)
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Shift : ' + res.result_text });
      }
      else {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Shift : ' + res.result_text });
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

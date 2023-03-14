import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, ConfirmEventType, MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { SelectEmpComponent } from 'src/app/components/usercontrol/select-emp/select-emp.component';
import { AppConfig } from 'src/app/config/config';
import { InitialCurrent } from 'src/app/config/initial_current';
import { SetPolicyAttModels } from 'src/app/models/attendance/setpolicyatt';
import { SetPolicyAttServices } from 'src/app/services/attendance/setuppolicy.service';
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
@Component({
  selector: 'app-setuppolicy',
  templateUrl: './setuppolicy.component.html',
  styleUrls: ['./setuppolicy.component.scss']
})
export class SetuppolicyComponent implements OnInit {
  constructor(
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private setPolicyAttService: SetPolicyAttServices,
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
  // selectedDate: PrjectEmpdailyModel = new PrjectEmpdailyModel;
  policyselect!: Policy;
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
    this.policyselect =
    {
      name: this.policy_list[0]?.name,
      code: this.policy_list[0]?.code
    }
  }

  process() {
    this.result_list = [];
    if (this.selectEmp.employee_dest.length > 0) {
      if (this.pol_type == "HO") {
        this.doRecordPlanholiday();
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

  async doRecordPlanholiday() {
    var data = new SetPolicyAttModels();
    data.pol_code = this.policyselect.code
    data.pol_type = this.pol_type;
    data.company_code = this.initial_current.CompCode
    data.modified_by = this.initial_current.Username
    data.emp_data = this.selectEmp.employee_dest;
    await this.setPolicyAttService.SetPolicyAtt_record(data).then((res) => {
      console.log(res)
      if (res.success) {
        console.log(res.message)
        this.messageService.add({ severity: 'success', summary: 'Success', detail: res.message });
      }
      else {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: res.message });
      }

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

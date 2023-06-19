import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { SelectEmpComponent } from 'src/app/components/usercontrol/select-emp/select-emp.component';
import { TaskComponent } from 'src/app/components/usercontrol/task/task.component';
import { AppConfig } from 'src/app/config/config';
import { InitialCurrent } from 'src/app/config/initial_current';
import { EmpBenefitsModel } from 'src/app/models/employee/manage/benefits';
import { SetBenefitsModel } from 'src/app/models/employee/policy/batch/setbenefits';
import { SetEmpDetailService } from 'src/app/services/emp/policy/setemp_detail.service';
import { TaskService } from 'src/app/services/task.service';

interface Policy {
  name: string,
  code: string
}
interface Result {
  worker: string,
  policy: string,
  modified_by: string,
  modified_date: string,
}

@Component({
  selector: 'app-empsetbenefits',
  templateUrl: './empsetbenefits.component.html',
  styleUrls: ['./empsetbenefits.component.scss']
})
export class EmpsetbenefitsComponent implements OnInit {

  @ViewChild(SelectEmpComponent) selectEmp: any;
  @ViewChild(TaskComponent) taskView: any;
  
  title_confirm:string = "Are you sure?";
  title_confirm_record:string = "Confirm to process";
  title_confirm_delete:string = "Confirm to delete";
  title_confirm_yes:string = "Yes";
  title_confirm_no:string = "No";

  title_confirm_cancel:string = "You have cancelled";

  title_submit:string = "Submit";
  title_cancel:string = "Cancel";

  @Input() policy_list: Policy[] = []
  @Input() title: string = "";
  loading: boolean = false;
  index: number = 0;
  result_list: Result[] = [];
  
  constructor(
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private taskService: TaskService,
    private router:Router,
    private setempdetailService: SetEmpDetailService,
  ) { }

  new_data: boolean = false;

  ngOnInit(): void {
    this.doGetInitialCurrent();
  }
  public initial_current: InitialCurrent = new InitialCurrent();
  doGetInitialCurrent() {
    this.initial_current = JSON.parse(localStorage.getItem(AppConfig.SESSIONInitial) || '{}');
    if (!this.initial_current) {
      this.router.navigateByUrl('login');
    }
  }

  selectedEmpBenefits: EmpBenefitsModel = new EmpBenefitsModel();
  empbenefitsList: EmpBenefitsModel[] = [];

  process(){
    this.result_list = [];
    if (this.selectEmp.employee_dest.length > 0) {
      this.Setbatchbenefits();
    }
  }

  async Setbatchbenefits(){
    var data = new SetBenefitsModel();
    data.item_code = this.selectedEmpBenefits.item_code;
    data.empbenefit_amount = this.selectedEmpBenefits.empbenefit_amount;
    data.empbenefit_startdate = this.selectedEmpBenefits.empbenefit_startdate;
    data.empbenefit_enddate = this.selectedEmpBenefits.empbenefit_enddate;
    data.empbenefit_reason = this.selectedEmpBenefits.empbenefit_reason;
    data.empbenefit_paytype = this.selectedEmpBenefits.empbenefit_paytype;
    data.empbenefit_break = this.selectedEmpBenefits.empbenefit_break;
    data.empbenefit_breakreason = this.selectedEmpBenefits.empbenefit_breakreason;
    data.empbenefit_conditionpay = this.selectedEmpBenefits.empbenefit_conditionpay;
    data.empbenefit_payfirst = this.selectedEmpBenefits.empbenefit_payfirst;
    data.company_code = this.initial_current.CompCode
    data.modified_by = this.initial_current.Username
    data.emp_data = this.selectEmp.employee_dest;
    this.loading = true;
    console.log(data)
    await this.setempdetailService.SetBenefits_record(data).then((res) => {
      console.log(res)
      if (res.success) {
        console.log(res.message)
        this.messageService.add({ severity: 'success', summary: 'Success', detail: res.message });
      }
      else {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: res.message });
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

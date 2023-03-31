import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Console } from 'console';
import { ConfirmationService, MessageService } from 'primeng/api';
import { SelectEmpComponent } from 'src/app/components/usercontrol/select-emp/select-emp.component';
import { TaskComponent } from 'src/app/components/usercontrol/task/task.component';
import { AppConfig } from 'src/app/config/config';
import { InitialCurrent } from 'src/app/config/initial_current';
import { EmployeeModel } from 'src/app/models/employee/employee';
import { EmpPositionModel } from 'src/app/models/employee/manage/position';
import { SetPositionModel } from 'src/app/models/employee/policy/batch/setposition';
import { PositionModel } from 'src/app/models/employee/policy/position';
import { PositionService } from 'src/app/services/emp/policy/position.service';
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
  selector: 'app-empsetposition',
  templateUrl: './empsetposition.component.html',
  styleUrls: ['./empsetposition.component.scss']
})
export class EmpsetpositionComponent implements OnInit {

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
    private positionService: PositionService,
    private setempdetailService: SetEmpDetailService,
    ) { }


    new_data: boolean = false;

  ngOnInit(): void {

    this.doGetInitialCurrent();
    
    //dropdown
    this.doLoadPositionList();
  }

  public initial_current: InitialCurrent = new InitialCurrent();
  doGetInitialCurrent() {
    this.initial_current = JSON.parse(localStorage.getItem(AppConfig.SESSIONInitial) || '{}');
    if (!this.initial_current) {
      this.router.navigateByUrl('');
    }
  }

  //get position
  positionList : PositionModel[]=[];
  doLoadPositionList(){
    this.positionService.position_get().then((res) => {
      this.positionList = res;
    })
  }

  selectedEmpPosition: EmpPositionModel = new EmpPositionModel();
  emppositionList: EmpPositionModel[] = [];

  process(){
    this.result_list = [];
    if (this.selectEmp.employee_dest.length > 0) {
      this.Setbatchposition();
    }
  }

  async Setbatchposition(){
    var data = new SetPositionModel();
    data.empposition_date = this.selectedEmpPosition.empposition_date;
    data.empposition_position = this.selectedEmpPosition.empposition_position;
    data.empposition_reason = this.selectedEmpPosition.empposition_reason;
    data.company_code = this.initial_current.CompCode
    data.modified_by = this.initial_current.Username
    data.emp_data = this.selectEmp.employee_dest;
    this.loading = true;
    console.log(data)
    await this.setempdetailService.SetPosition_record(data).then((res) => {
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

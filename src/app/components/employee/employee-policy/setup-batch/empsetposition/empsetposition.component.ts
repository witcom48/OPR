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
import { AccessdataModel } from 'src/app/models/system/security/accessdata';
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

  //
  title_process: { [key: string]: string } = { EN: "Process", TH: "การทำงาน" }
  title_result: { [key: string]: string } = { EN: "Result", TH: "ผลลัพธ์" }
  title_btnprocess: { [key: string]: string } = { EN: "Process", TH: "ดำเนินการ" }
  title_date: { [key: string]: string } = { EN: "Date", TH: "วันที่มีผล" };
  title_position: { [key: string]: string } = { EN: "Position", TH: "ตำแหน่ง" };
  title_code: { [key: string]: string } = { EN: "Code", TH: "รหัส" };
  title_no: { [key: string]: string } = { EN: "No", TH: "เลขที่" };
  title_worker: { [key: string]: string } = { EN: "Worker", TH: "พนักงาน" };
  title_modified_by: { [key: string]: string } = { EN: "Edit by", TH: "ผู้ทำรายการ" };
  title_modified_date: { [key: string]: string } = { EN: "Edit date", TH: "วันที่ทำรายการ" };
  //
  title_confirm: { [key: string]: string } = { EN: "Are you sure?", TH: "ยืนยันการทำรายการ" };
  title_confirm_record: { [key: string]: string } = { EN: "Confirm to record", TH: "คุณต้องการบันทึกการทำรายการ" }
  title_confirm_delete: { [key: string]: string } = { EN: "Confirm to delete", TH: "คุณต้องการลบรายการ" }
  title_confirm_yes: { [key: string]: string } = { EN: "Yes", TH: "ใช่" }
  title_confirm_no: { [key: string]: string } = { EN: "No", TH: "ยกเลิก" }
  title_confirm_cancel: { [key: string]: string } = { EN: "You have cancelled", TH: "คุณยกเลิกการทำรายการ" }


  title_submit: string = "Submit";
  title_cancel: string = "Cancel";

  @Input() policy_list: Policy[] = []
  @Input() title: string = "";
  loading: boolean = false;
  index: number = 0;
  result_list: Result[] = [];
  edit_data: boolean = false;


  constructor(
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private taskService: TaskService,
    private router: Router,
    private positionService: PositionService,
    private setempdetailService: SetEmpDetailService,
  ) { }


  new_data: boolean = false;

  ngOnInit(): void {

    this.doGetInitialCurrent();

    //dropdown
    this.doLoadPositionList();
  }

  initialData2: InitialCurrent = new InitialCurrent();
  accessData: AccessdataModel = new AccessdataModel();
  public initial_current: InitialCurrent = new InitialCurrent();
  doGetInitialCurrent() {
    this.initial_current = JSON.parse(localStorage.getItem(AppConfig.SESSIONInitial) || '{}');
    if (!this.initial_current) {
      this.router.navigateByUrl('login');
    }
    this.accessData = this.initialData2.dotGetPolmenu('EMP');

  }

  //get position
  positionList: PositionModel[] = [];
  doLoadPositionList() {
    this.positionService.position_get().then((res) => {
      this.positionList = res;
    })
  }

  selectedEmpPosition: EmpPositionModel = new EmpPositionModel();
  emppositionList: EmpPositionModel[] = [];

  setpositionList: SetPositionModel[] = [];
  doLoadsetpositionList() {
    this.setpositionList = [];
    var tmp = new SetPositionModel();
    tmp.empposition_date = this.selectedEmpPosition.empposition_date
    tmp.empposition_position = this.selectedEmpPosition.empposition_position
    this.setempdetailService.SetPosition_get(tmp).then(async (res) => {
      this.setpositionList = await res;
    });
  }

  process() {
    this.result_list = [];
    if (this.selectEmp.employee_dest.length > 0) {
      this.Setbatchposition();
    }
  }

  async Setbatchposition() {
    var data = new SetPositionModel();
    data.empposition_date = this.selectedEmpPosition.empposition_date;
    data.empposition_position = this.selectedEmpPosition.empposition_position;
    data.empposition_reason = this.selectedEmpPosition.empposition_reason;
    data.company_code = this.initial_current.CompCode
    data.modified_by = this.initial_current.Username
    data.emp_data = this.selectEmp.employee_dest;
    this.loading = true;
    await this.setempdetailService.SetPosition_record(data).then((res) => {
      if (res.success) {
        // console.log(res.message)
        this.messageService.add({ severity: 'success', summary: 'Success', detail: res.message });
        this.doLoadsetpositionList();
        this.edit_data = false;
        this.new_data;
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

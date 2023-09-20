import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { SelectEmpComponent } from 'src/app/components/usercontrol/select-emp/select-emp.component';
import { TaskComponent } from 'src/app/components/usercontrol/task/task.component';
import { AppConfig } from 'src/app/config/config';
import { InitialCurrent } from 'src/app/config/initial_current';
import { EmpGroupModel } from 'src/app/models/employee/manage/empgroup';
import { SetGroupModel } from 'src/app/models/employee/policy/batch/setgroup';
import { GroupModel } from 'src/app/models/employee/policy/group';
import { AccessdataModel } from 'src/app/models/system/security/accessdata';
import { GroupService } from 'src/app/services/emp/policy/group.service';
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
  selector: 'app-empsetgroup',
  templateUrl: './empsetgroup.component.html',
  styleUrls: ['./empsetgroup.component.scss']
})
export class EmpsetgroupComponent implements OnInit {

  @ViewChild(SelectEmpComponent) selectEmp: any;
  @ViewChild(TaskComponent) taskView: any;

  //
  title_process: { [key: string]: string } = { EN: "Process", TH: "การทำงาน" };
  title_result: { [key: string]: string } = { EN: "Result", TH: "ผลลัพธ์" };
  title_btnprocess: { [key: string]: string } = { EN: "Process", TH: "ดำเนินการ" };
  title_select: { [key: string]: string } = { EN: "Please Select Employee", TH: "กรุณาเลือกพนักงาน" };
  title_date: { [key: string]: string } = { EN: "Date", TH: "วันที่มีผล" };
  title_group: { [key: string]: string } = { EN: "Group", TH: "กลุ่มพนักงาน" };
  title_reason: { [key: string]: string } = { EN: "Reason", TH: "เหตุผล" };
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
    private groupService: GroupService,
    private setempdetailService: SetEmpDetailService,
  ) { }

  new_data: boolean = false;

  ngOnInit(): void {

    this.doGetInitialCurrent();

    //dropdown
    this.doLoadGroupList();
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

  //get group
  groupList: GroupModel[] = [];
  doLoadGroupList() {
    this.groupService.group_get().then(async (res) => {
      this.groupList = await res;
    })
  }

  selectedEmpGroup: EmpGroupModel = new EmpGroupModel();
  empgroupList: EmpGroupModel[] = [];

  setgroupList: SetGroupModel[] = [];
  doLoadsetgroupList() {
    this.setgroupList = [];
    var tmp = new SetGroupModel();
    tmp.empgroup_code = this.selectedEmpGroup.empgroup_code
    tmp.empgroup_date = this.selectedEmpGroup.empgroup_date
    this.setempdetailService.SetGroup_get(tmp).then(async (res) => {
      this.setgroupList = await res;
    });
  }

  process() {
    this.result_list = [];
    if (this.selectEmp.employee_dest.length > 0) {
      this.Setbatchgroup();
    }else{
      this.messageService.add({ severity: 'error', summary: 'Error', detail: this.title_select[this.initial_current.Language] });
    }
  }

  async Setbatchgroup() {
    var data = new SetGroupModel();
    data.empgroup_date = this.selectedEmpGroup.empgroup_date;
    data.empgroup_code = this.selectedEmpGroup.empgroup_code;
    data.company_code = this.initial_current.CompCode
    data.modified_by = this.initial_current.Username
    data.emp_data = this.selectEmp.employee_dest;
    this.loading = true;
    await this.setempdetailService.SetGroup_record(data).then((res) => {
      // console.log(res)
      if (res.success) {
        // console.log(res.message)
        this.messageService.add({ severity: 'success', summary: 'Success', detail: res.message });
        this.doLoadsetgroupList();
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

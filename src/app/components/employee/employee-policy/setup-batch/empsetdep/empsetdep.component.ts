import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { SelectEmpComponent } from 'src/app/components/usercontrol/select-emp/select-emp.component';
import { TaskComponent } from 'src/app/components/usercontrol/task/task.component';
import { AppConfig } from 'src/app/config/config';
import { InitialCurrent } from 'src/app/config/initial_current';
import { EmpDepModel } from 'src/app/models/employee/manage/dep';
import { EmpGroupModel } from 'src/app/models/employee/manage/empgroup';
import { EmpPositionModel } from 'src/app/models/employee/manage/position';
import { SetDepModel } from 'src/app/models/employee/policy/batch/setdep';
import { SetGroupModel } from 'src/app/models/employee/policy/batch/setgroup';
import { SetPositionModel } from 'src/app/models/employee/policy/batch/setposition';
import { GroupModel } from 'src/app/models/employee/policy/group';
import { PartModel } from 'src/app/models/employee/policy/part';
import { PositionModel } from 'src/app/models/employee/policy/position';
import { LevelModel } from 'src/app/models/system/policy/level';
import { GroupService } from 'src/app/services/emp/policy/group.service';
import { PartService } from 'src/app/services/emp/policy/part.service';
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
  selector: 'app-empsetdep',
  templateUrl: './empsetdep.component.html',
  styleUrls: ['./empsetdep.component.scss']
})
export class EmpsetdepComponent implements OnInit {
  @ViewChild(SelectEmpComponent) selectEmp: any;
  @ViewChild(TaskComponent) taskView: any;

  //
  title_process: { [key: string]: string } = { EN: "Process", TH: "การทำงาน" };
  title_result: { [key: string]: string } = { EN: "Result", TH: "ผลลัพธ์" };
  title_btnprocess: { [key: string]: string } = { EN: "Process", TH: "ดำเนินการ" };
  title_select: { [key: string]: string } = { EN: "Please Select Employee", TH: "กรุณาเลือกพนักงาน" };
  title_success: { [key: string]: string } = { EN: "Successfully", TH: "เพิ่มข้อมูลสำเร็จ" };
  title_date: { [key: string]: string } = { EN: "Date", TH: "วันที่มีผล" };
  title_level01: { [key: string]: string } = { EN: "Level 01", TH: "ระดับ 1" };
  title_level02: { [key: string]: string } = { EN: "Level 02", TH: "ระดับ 2" };
  title_level03: { [key: string]: string } = { EN: "Level 03", TH: "ระดับ 3" };
  title_level04: { [key: string]: string } = { EN: "Level 04", TH: "ระดับ 4" };
  title_level05: { [key: string]: string } = { EN: "Level 05", TH: "ระดับ 5" };
  title_reason: { [key: string]: string } = { EN: "Reason", TH: "เหตุผล" };
  title_code: { [key: string]: string } = { EN: "Code", TH: "รหัส" };
  title_no: { [key: string]: string } = { EN: "No", TH: "เลขที่" };
  title_worker: { [key: string]: string } = { EN: "Worker", TH: "พนักงาน" };
  title_modified_by: { [key: string]: string } = { EN: "Edit by", TH: "ผู้ทำรายการ" };
  title_modified_date: { [key: string]: string } = { EN: "Edit date", TH: "วันที่ทำรายการ" };
  //group
  title_group: { [key: string]: string } = { EN: "Group", TH: "กลุ่มพนักงาน" };
  //position
  title_position: { [key: string]: string } = { EN: "Position", TH: "ตำแหน่ง" };
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
    private depService: PartService,
    private setempdetailService: SetEmpDetailService,
    private groupService: GroupService,
    private positionService: PositionService,
  ) { }

  new_data: boolean = false;


  ngOnInit(): void {

    this.doGetInitialCurrent();
    //dropdown
    this.doLoadDep1List();
    this.doLoadDep2List();
    this.doLoadDep3List();
    this.doLoadDep4List();
    this.doLoadDep5List();
    //drop group
    this.doLoadGroupList();
    //drop position
    this.doLoadPositionList();
  }

  public initial_current: InitialCurrent = new InitialCurrent();
  doGetInitialCurrent() {
    this.initial_current = JSON.parse(localStorage.getItem(AppConfig.SESSIONInitial) || '{}');
    if (!this.initial_current) {
      this.router.navigateByUrl('login');
    }
  }

  //get dep
  dep1List: PartModel[] = [];
  dep2List: PartModel[] = [];
  dep3List: PartModel[] = [];
  dep4List: PartModel[] = [];
  dep5List: PartModel[] = [];
  doLoadDep1List() {
    var tmp = new LevelModel();
    tmp.level_code = "01";
    this.depService.dep_get(tmp).then(async (res) => {
      this.dep1List = await res;
    })
  }

  doLoadDep2List() {
    var tmp = new LevelModel();
    tmp.level_code = "02";
    this.depService.dep_get(tmp).then(async (res) => {
      this.dep2List = await res;
    })
  }

  doLoadDep3List() {
    var tmp = new LevelModel();
    tmp.level_code = "03";
    this.depService.dep_get(tmp).then(async (res) => {
      this.dep3List = await res;
    })
  }

  doLoadDep4List() {
    var tmp = new LevelModel();
    tmp.level_code = "04";
    this.depService.dep_get(tmp).then(async (res) => {
      this.dep4List = await res;
    })
  }

  doLoadDep5List() {
    var tmp = new LevelModel();
    tmp.level_code = "05";
    this.depService.dep_get(tmp).then(async (res) => {
      this.dep5List = await res;
    })
  }

  //get group
  groupList: GroupModel[] = [];
  doLoadGroupList() {
    this.groupService.group_get().then(async (res) => {
      this.groupList = await res;
    })
  }

  //get position
  positionList: PositionModel[] = [];
  doLoadPositionList() {
    this.positionService.position_get().then((res) => {
      this.positionList = res;
    })
  }


  //dep
  selectedEmpDep: EmpDepModel = new EmpDepModel();
  empdepList: EmpDepModel[] = [];

  setdepList: SetDepModel[] = [];
  doLoadsetdepList() {
    this.setdepList = [];
    var tmp = new SetDepModel();
    tmp.empdep_level01 = this.selectedEmpDep.empdep_level01
    tmp.empdep_date = this.selectedEmpDep.empdep_date
    this.setempdetailService.SetDep_get(tmp).then(async (res) => {
      this.setdepList = await res;
    });
  }

  //group
  selectedgroupcode: string = "";
  empgroupList: EmpGroupModel[] = [];

  setgroupList: SetGroupModel[] = [];
  doLoadsetgroupList() {
    this.setgroupList = [];
    var tmp = new SetGroupModel();
    tmp.empgroup_code = this.selectedgroupcode
    tmp.empgroup_date = this.selectedEmpDep.empdep_date
    this.setempdetailService.SetGroup_get(tmp).then(async (res) => {
      this.setgroupList = await res;
    });
  }

  //position
  selectedempPosition: string = "";
  emppositionList: EmpPositionModel[] = [];

  setpositionList: SetPositionModel[] = [];
  doLoadsetpositionList() {
    this.setpositionList = [];
    var tmp = new SetPositionModel();
    tmp.empposition_date = this.selectedEmpDep.empdep_date
    tmp.empposition_position = this.selectedempPosition
    this.setempdetailService.SetPosition_get(tmp).then(async (res) => {
      this.setpositionList = await res;
    });
  }

  process() {
    this.result_list = [];
    if (this.selectEmp.employee_dest.length > 0) {
      // this.Setbatchdep();
      this.setupBatch();
    } else {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: this.title_select[this.initial_current.Language] });
    }
  }

  //Dep
  async Setbatchdep() {
    var data = new SetDepModel();
    data.empdep_date = this.selectedEmpDep.empdep_date;
    data.empdep_level01 = this.selectedEmpDep.empdep_level01;
    data.empdep_level02 = this.selectedEmpDep.empdep_level02;
    data.empdep_level03 = this.selectedEmpDep.empdep_level03;
    data.empdep_level04 = this.selectedEmpDep.empdep_level04;
    data.empdep_level05 = this.selectedEmpDep.empdep_level05;
    data.empdep_reason = this.selectedEmpDep.empdep_reason;
    data.company_code = this.initial_current.CompCode;
    data.modified_by = this.initial_current.Username;
    data.emp_data = this.selectEmp.employee_dest;
    await this.setempdetailService.SetDep_record(data).then((res) => {
      if (res.success) {
        // this.messageService.add({ severity: 'success', summary: 'Success', detail: res.message });
        this.doLoadsetdepList();
        this.new_data;
      }
      else {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: res.message });
      }
    });
  }

  //Grpup
  async Setbatchgroup() {
    var data = new SetGroupModel();
    data.empgroup_date = this.selectedEmpDep.empdep_date;
    data.empgroup_code = this.selectedgroupcode;
    data.company_code = this.initial_current.CompCode
    data.modified_by = this.initial_current.Username
    data.emp_data = this.selectEmp.employee_dest;
    await this.setempdetailService.SetGroup_record(data).then((res) => {
      console.log(res)
      if (res.success) {
        // console.log(res.message)
        // this.messageService.add({ severity: 'success', summary: 'Success', detail: res.message });
        this.doLoadsetgroupList();
        this.new_data;
      }
      else {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: res.message });
      }
    });
  }

  //Position
  async Setbatchposition() {
    var data = new SetPositionModel();
    data.empposition_date = this.selectedEmpDep.empdep_date;
    data.empposition_position = this.selectedempPosition;
    data.empposition_reason = this.selectedEmpDep.empdep_reason;
    data.company_code = this.initial_current.CompCode
    data.modified_by = this.initial_current.Username
    data.emp_data = this.selectEmp.employee_dest;
    await this.setempdetailService.SetPosition_record(data).then((res) => {
      if (res.success) {
        // console.log(res.message)
        // this.messageService.add({ severity: 'success', summary: 'Success', detail: res.message });
        this.doLoadsetpositionList();
        this.new_data;
      }
      else {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: res.message });
      }
    });
  }

  async setupBatch() {
    this.loading = true
    if (this.selectedEmpDep.empdep_level01) {
      await this.Setbatchdep();
      this.loading = false;
    }
    if (this.selectedempPosition) {
      await this.Setbatchposition();
      this.loading = false;
    }
    if (this.selectedgroupcode) {
      await this.Setbatchgroup();
      this.loading = false;
    }
    this.messageService.add({ severity: 'success', summary: 'Success', detail: this.title_success[this.initial_current.Language] });
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

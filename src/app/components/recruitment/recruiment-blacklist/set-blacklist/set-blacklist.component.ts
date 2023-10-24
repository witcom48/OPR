import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { SelectEmpComponent } from 'src/app/components/usercontrol/select-emp/select-emp.component';
import { TaskComponent } from 'src/app/components/usercontrol/task/task.component';
import { AppConfig } from 'src/app/config/config';
import { InitialCurrent } from 'src/app/config/initial_current';
import { BlacklistModel } from 'src/app/models/recruitment/blacklist';
import { ReasonsModel } from 'src/app/models/system/policy/reasons';
import { BlacklistService } from 'src/app/services/recruitment/blacklist.service';
import { ReasonsService } from 'src/app/services/system/policy/reasons.service';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-set-blacklist',
  templateUrl: './set-blacklist.component.html',
  styleUrls: ['./set-blacklist.component.scss']
})
export class SetBlacklistComponent implements OnInit {

  @ViewChild(SelectEmpComponent) selectEmp: any;
  @ViewChild(TaskComponent) taskView: any;

  //
  title_black: { [key: string]: string } = { EN: "Black List", TH: "เบล็คลิสต์" };
  title_batch: { [key: string]: string } = { EN: "Set Batch", TH: "กำหนดแบบกลุ่ม" };

  title_process: { [key: string]: string } = { EN: "Process", TH: "การทำงาน" };
  title_result: { [key: string]: string } = { EN: "Result", TH: "ผลลัพธ์" };
  title_btnprocess: { [key: string]: string } = { EN: "Process", TH: "ดำเนินการ" };
  title_reason: { [key: string]: string } = { EN: "Reason", TH: "เหตุผล" };
  title_note: { [key: string]: string } = { EN: "Note", TH: "หมายเหตุ" };
  //
  title_confirm: { [key: string]: string } = { EN: "Are you sure?", TH: "ยืนยันการทำรายการ" };
  title_confirm_record: { [key: string]: string } = { EN: "Confirm to record", TH: "คุณต้องการบันทึกการทำรายการ" }
  title_confirm_delete: { [key: string]: string } = { EN: "Confirm to delete", TH: "คุณต้องการลบรายการ" }
  title_confirm_yes: { [key: string]: string } = { EN: "Yes", TH: "ใช่" }
  title_confirm_no: { [key: string]: string } = { EN: "No", TH: "ยกเลิก" }
  title_confirm_cancel: { [key: string]: string } = { EN: "You have cancelled", TH: "คุณยกเลิกการทำรายการ" }

  loading: boolean = false;
  index: number = 0;
  edit_data: boolean = false;
  new_data: boolean = false;

  constructor(
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private taskService: TaskService,
    private router: Router,
    private blacklistService: BlacklistService,
    private reasonsService: ReasonsService,
  ) { }

  ngOnInit(): void {
    this.doGetInitialCurrent();

    //reason
    this.doLoadReason();
  }

  public initial_current: InitialCurrent = new InitialCurrent();
  doGetInitialCurrent() {
    this.initial_current = JSON.parse(localStorage.getItem(AppConfig.SESSIONInitial) || '{}');
    if (!this.initial_current) {
      this.router.navigateByUrl('login');
    }
  }

  reason_list: ReasonsModel[] = [];
  reasons: ReasonsModel = new ReasonsModel()
  doLoadReason() {
    this.reason_list = [];
    var tmp = new ReasonsModel();
    tmp.reason_group = 'BLACK';
    this.reasonsService.reason_get(tmp).then(async (res) => {
      this.reason_list = await res;
    });
  }


  selectedBlacklist: BlacklistModel = new BlacklistModel();
  blacklist_List: BlacklistModel[] = [];



  process() {
    if (this.selectEmp.employee_dest.length > 0) {
      this.Setbatchblacklist();
    }
  }

  async Setbatchblacklist() {
    var data = new BlacklistModel();
    data.reason_code = this.selectedBlacklist.reason_code;
    data.blacklist_note = this.selectedBlacklist.blacklist_note;
    data.company_code = this.initial_current.CompCode
    data.modified_by = this.initial_current.Username
    data.emp_data = this.selectEmp.employee_dest;
    this.loading = true;
    await this.blacklistService.SetBlacklist_record(data).then((res) => {
      // console.log(res)
      if (res.success) {
        // console.log(res.message)
        this.messageService.add({ severity: 'success', summary: 'Success', detail: res.message });
        this.edit_data = false;
        this.new_data;
        this.router.navigateByUrl('recruitment/blacklist');
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

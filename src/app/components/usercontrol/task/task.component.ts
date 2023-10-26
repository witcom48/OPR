import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppConfig } from '../../../config/config';
import { InitialCurrent } from '../../../config/initial_current';

import { TaskModel } from '../../../models/task';
import { TaskService } from 'src/app/services/task.service';
import { RadiovalueModel } from '../../../models/project/radio_value';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent implements OnInit {
  title_No: { [key: string]: string } = { EN: "No.", TH: "ลำดับ" };
  title_Task: { [key: string]: string } = { EN: "Task ID", TH: "รหัสงาน" };

  title_TaskType: { [key: string]: string } = { EN: "Task Type", TH: "ประเภทงาน" };
  title_Detail: { [key: string]: string } = { EN: "Detail", TH: "รายละเอียด" };
  title_Status: { [key: string]: string } = { EN: "Status", TH: "สถานะ" };
  title_Start: { [key: string]: string } = { EN: "Start", TH: "เริ่มต้น" };
  title_Finish: { [key: string]: string } = { EN: "Finish", TH: "สิ้นสุด" };
  title_modifiedby: { [key: string]: string } = { EN: "Modified By", TH: "ผู้ทำรายการ" };
  title_modifieddate: { [key: string]: string } = { EN: "Modified Date", TH: "วันที่ทำรายการ" };
  title_Search: { [key: string]: string } = { EN: "Search", TH: "ค้นหา" };
  title_showing: { [key: string]: string } = { EN: "  Showing ", TH: "แสดง" }

  title_to: { [key: string]: string } = { EN: "  to ", TH: "ถึง" }
  title_of: { [key: string]: string } = { EN: "  of ", TH: "จาก" }
  title_entries: { [key: string]: string } = { EN: "  entries ", TH: "รายการ" }





  title_modified_by: string = "Edit by";
  title_modified_date: string = "Edit date";
  title_search: string = "Search";
  title_upload: string = "Upload";

  title_page_from: string = "Showing";
  title_page_to: string = "to";
  title_page_total: string = "of";
  title_page_record: string = "entries";

  title_confirm: string = "Are you sure?";
  title_confirm_record: string = "Confirm to record";
  title_confirm_delete: string = "Confirm to delete";
  title_confirm_yes: string = "Yes";
  title_confirm_no: string = "No";

  title_confirm_cancel: string = "You have cancelled";

  constructor(private taskService: TaskService, private router: Router) { }

  public taskType: string = "";
  task_list: TaskModel[] = [];

  ngOnInit(): void {


    this.doGetInitialCurrent()
    this.doLoadStatus()
    setTimeout(() => {
      this.doLoadTask()
    }, 300);

  }

  public initial_current: InitialCurrent = new InitialCurrent();
  doGetInitialCurrent() {
    this.initial_current = JSON.parse(localStorage.getItem(AppConfig.SESSIONInitial) || '{}');
    if (!this.initial_current) {
      this.router.navigateByUrl('login');
    }
  }

  status_list: RadiovalueModel[] = [];
  selectedStatus: RadiovalueModel = new RadiovalueModel;
  doLoadStatus() {

    if (this.initial_current.Language == "EN") {

      var tmp = new RadiovalueModel();
      tmp.value = "W";
      tmp.text = "Wait";
      this.status_list.push(tmp);

      tmp = new RadiovalueModel();
      tmp.value = "F";
      tmp.text = "Finish";
      this.status_list.push(tmp);

      tmp = new RadiovalueModel();
      tmp.value = "C";
      tmp.text = "Cancel";
      this.status_list.push(tmp);

      tmp = new RadiovalueModel();
      tmp.value = "";
      tmp.text = "All";
      this.status_list.push(tmp);
    }
    else {

      var tmp = new RadiovalueModel();
      tmp.value = "W";
      tmp.text = "รอ";
      this.status_list.push(tmp);

      tmp = new RadiovalueModel();
      tmp.value = "F";
      tmp.text = "เสร็จ";
      this.status_list.push(tmp);

      tmp = new RadiovalueModel();
      tmp.value = "C";
      tmp.text = "ยกเลิก";
      this.status_list.push(tmp);

      tmp = new RadiovalueModel();
      tmp.value = "";
      tmp.text = "ทั้งหมด";
      this.status_list.push(tmp);
    }
  }


  onRowSelectTask(event: Event) {

  }

  onChange(event: Event) {
    //// console.log('event :' + event);
    this.doLoadTask()
  }

  selectedTask: TaskModel = new TaskModel;
  doLoadTask() {

    this.taskService.getList(this.initial_current.CompCode, this.taskType, this.selectedStatus.value).then((res) => {
      this.task_list = res;

    });
  }

}

import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { SelectEmpComponent } from 'src/app/components/usercontrol/select-emp/select-emp.component';
import { TaskComponent } from 'src/app/components/usercontrol/task/task.component';
import { AppConfig } from 'src/app/config/config';
import { InitialCurrent } from 'src/app/config/initial_current';
import { EmpTrainingModel } from 'src/app/models/employee/manage/training';
import { SetTrainingModel } from 'src/app/models/employee/policy/batch/settraining';
import { CourseModel } from 'src/app/models/system/policy/course';
import { InstituteModel } from 'src/app/models/system/policy/institute';
import { SetEmpDetailService } from 'src/app/services/emp/policy/setemp_detail.service';
import { CourseService } from 'src/app/services/system/policy/course.service';
import { InstituteService } from 'src/app/services/system/policy/institute.service';
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
  selector: 'app-empsettraining',
  templateUrl: './empsettraining.component.html',
  styleUrls: ['./empsettraining.component.scss']
})
export class EmpsettrainingComponent implements OnInit {

  @ViewChild(SelectEmpComponent) selectEmp: any;
  @ViewChild(TaskComponent) taskView: any;

  //
  title_process: { [key: string]: string } = { EN: "Process", TH: "การทำงาน" };
  title_result: { [key: string]: string } = { EN: "Result", TH: "ผลลัพธ์" };
  title_btnprocess: { [key: string]: string } = { EN: "Process", TH: "ดำเนินการ" };
  title_course: { [key: string]: string } = { EN: "Course", TH: "หลักสูตร" };
  title_coursestatus: { [key: string]: string } = { EN: "Status", TH: "สถานะ" };
  title_coursehour: { [key: string]: string } = { EN: "Hour", TH: "ชั่วโมง" };
  title_institute: { [key: string]: string } = { EN: "Institute", TH: "สถานบัน/สถานที่" };
  title_startdate: { [key: string]: string } = { EN: "Start Date", TH: "วันที่เริ่ม" };
  title_graduationdate: { [key: string]: string } = { EN: "Graduation Date", TH: "วันที่จบ" };
  title_pass: { [key: string]: string } = { EN: "Pass", TH: "ผ่าน" };
  title_notpass: { [key: string]: string } = { EN: "Not Pass", TH: "ไม่ผ่าน" };
  title_cost: { [key: string]: string } = { EN: "Cost", TH: "ค่าใช้จ่าย" };
  title_note: { [key: string]: string } = { EN: "Description", TH: "เพิ่มเติม" };
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
    private setempdetailService: SetEmpDetailService,

    private instituteService: InstituteService,
    private courseService: CourseService,
  ) { }

  new_data: boolean = false;

  ngOnInit(): void {
    this.doGetInitialCurrent();

    this.doLoadcourseList();
    this.doLoadinstituteList();
  }

  public initial_current: InitialCurrent = new InitialCurrent();
  doGetInitialCurrent() {
    this.initial_current = JSON.parse(localStorage.getItem(AppConfig.SESSIONInitial) || '{}');
    if (!this.initial_current) {
      this.router.navigateByUrl('');
    }
  }

  //dropdown
  //Institite
  instituteList: InstituteModel[] = [];
  doLoadinstituteList() {
    this.instituteService.institute_get().then((res) => {
      this.instituteList = res;
    });
  }
  // Course
  courseList: CourseModel[] = [];
  doLoadcourseList() {
    this.courseService.course_get().then((res) => {
      this.courseList = res;
    });
  }

  selectedEmptraining: EmpTrainingModel = new EmpTrainingModel();
  emptrainingList: EmpTrainingModel[] = [];

  settrainingList: SetTrainingModel[] = [];
  doLoadtrainingList() {
    this.settrainingList = [];
    var tmp = new SetTrainingModel();
    tmp.course_code = this.selectedEmptraining.course_code
    this.setempdetailService.SetTraining_get(tmp).then(async (res) => {
      this.settrainingList = await res;
    });
  }

  process() {
    this.result_list = [];
    if (this.selectEmp.employee_dest.length > 0) {
      this.Setbatchtraining();
    }
  }

  async Setbatchtraining() {
    var data = new SetTrainingModel();
    data.institute_code = this.selectedEmptraining.institute_code;
    data.institute_other = this.selectedEmptraining.institute_other;
    data.course_code = this.selectedEmptraining.course_code;
    data.course_other = this.selectedEmptraining.course_other;
    data.emptraining_start = this.selectedEmptraining.emptraining_start;
    data.emptraining_finish = this.selectedEmptraining.emptraining_finish;
    data.emptraining_status = this.selectedEmptraining.emptraining_status;
    data.emptraining_hours = this.selectedEmptraining.emptraining_hours;
    data.emptraining_cost = this.selectedEmptraining.emptraining_cost;
    data.emptraining_note = this.selectedEmptraining.emptraining_note;
    data.company_code = this.initial_current.CompCode
    data.modified_by = this.initial_current.Username
    data.emp_data = this.selectEmp.employee_dest;
    this.loading = true;
    await this.setempdetailService.SetTraining_record(data).then((res) => {
      console.log(res)
      if (res.success) {
        console.log(res.message)
        this.messageService.add({ severity: 'success', summary: 'Success', detail: res.message });
        this.doLoadtrainingList();
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

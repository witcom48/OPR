import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { SelectEmpComponent } from 'src/app/components/usercontrol/select-emp/select-emp.component';
import { TaskComponent } from 'src/app/components/usercontrol/task/task.component';
import { AppConfig } from 'src/app/config/config';
import { InitialCurrent } from 'src/app/config/initial_current';
import { EmpAssessmentModel } from 'src/app/models/employee/manage/assessment';
import { SetAssessmentModel } from 'src/app/models/employee/policy/batch/setassessment';
import { InstituteModel } from 'src/app/models/system/policy/institute';
import { AccessdataModel } from 'src/app/models/system/security/accessdata';
import { SetEmpDetailService } from 'src/app/services/emp/policy/setemp_detail.service';
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
  selector: 'app-empsetassessment',
  templateUrl: './empsetassessment.component.html',
  styleUrls: ['./empsetassessment.component.scss']
})
export class EmpsetassessmentComponent implements OnInit {

  @ViewChild(SelectEmpComponent) selectEmp: any;
  @ViewChild(TaskComponent) taskView: any;

  //
  title_process: { [key: string]: string } = { EN: "Process", TH: "การทำงาน" };
  title_result: { [key: string]: string } = { EN: "Result", TH: "ผลลัพธ์" };
  title_btnprocess: { [key: string]: string } = { EN: "Process", TH: "ดำเนินการ" };
  title_select: { [key: string]: string } = { EN: "Please Select Employee", TH: "กรุณาเลือกพนักงาน" };
  title_institute: { [key: string]: string } = { EN: "Institute", TH: "สถานบัน/สถานที่" };
  title_topic: { [key: string]: string } = { EN: "Topic", TH: "หัวข้อ" };
  title_fromdate: { [key: string]: string } = { EN: "From Date", TH: "จากวันที่" };
  title_todate: { [key: string]: string } = { EN: "To Date", TH: "ถึงวันที่" };
  title_count: { [key: string]: string } = { EN: "Count", TH: "ครั้งที่" };
  title_assessmentresult: { [key: string]: string } = { EN: "Result", TH: "ผลการประเมิน" };
  title_pass: { [key: string]: string } = { EN: "Pass", TH: "ผ่าน" };
  title_notpass: { [key: string]: string } = { EN: "Not Pass", TH: "ไม่ผ่าน" };
  //
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

  ) { }

  new_data: boolean = false;

  ngOnInit(): void {
    this.doGetInitialCurrent();

    this.doLoadinstituteList();
  }

  initialData2: InitialCurrent = new InitialCurrent();
  accessData: AccessdataModel = new AccessdataModel();
  public initial_current: InitialCurrent = new InitialCurrent();
  doGetInitialCurrent() {
    this.initial_current = JSON.parse(localStorage.getItem(AppConfig.SESSIONInitial) || '{}');
    if (!this.initial_current) {
      this.router.navigateByUrl('');
    }
    this.accessData = this.initialData2.dotGetPolmenu('EMP');

  }

  //dropdown
  //Institite
  instituteList: InstituteModel[] = [];
  doLoadinstituteList() {
    var tmp = new InstituteModel();

    this.instituteService.institute_get(tmp).then((res) => {
      this.instituteList = res;
    });
  }

  selectedEmpassessment: EmpAssessmentModel = new EmpAssessmentModel();
  emptrainingList: EmpAssessmentModel[] = [];

  setassessmentList: SetAssessmentModel[] = [];
  doLoadtrainingList() {
    this.setassessmentList = [];
    var tmp = new SetAssessmentModel();
    tmp.empassessment_location = this.selectedEmpassessment.empassessment_location
    tmp.empassessment_fromdate = this.selectedEmpassessment.empassessment_fromdate
    this.setempdetailService.SetAssessment_get(tmp).then(async (res) => {
      this.setassessmentList = await res;
    });
  }

  process() {
    this.result_list = [];
    if (this.selectEmp.employee_dest.length > 0) {
      this.Setbatchassessment();
    }else{
      this.messageService.add({ severity: 'error', summary: 'Error', detail: this.title_select[this.initial_current.Language] });
    }
  }

  async Setbatchassessment() {
    var data = new SetAssessmentModel();
    data.empassessment_location = this.selectedEmpassessment.empassessment_location;
    data.empassessment_topic = this.selectedEmpassessment.empassessment_topic;
    data.empassessment_fromdate = this.selectedEmpassessment.empassessment_fromdate;
    data.empassessment_todate = this.selectedEmpassessment.empassessment_todate;
    data.empassessment_count = this.selectedEmpassessment.empassessment_count;
    data.empassessment_result = this.selectedEmpassessment.empassessment_result;
    data.company_code = this.initial_current.CompCode
    data.modified_by = this.initial_current.Username
    data.emp_data = this.selectEmp.employee_dest;
    this.loading = true;
    await this.setempdetailService.SetAssessment_record(data).then((res) => {
      // console.log(res)
      if (res.success) {
        // console.log(res.message)
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

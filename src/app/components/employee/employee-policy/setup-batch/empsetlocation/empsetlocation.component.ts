import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, MenuItem, MessageService } from 'primeng/api';
import { SelectEmpComponent } from 'src/app/components/usercontrol/select-emp/select-emp.component';
import { TaskComponent } from 'src/app/components/usercontrol/task/task.component';
import { AppConfig } from 'src/app/config/config';
import { InitialCurrent } from 'src/app/config/initial_current';
import { EmpLocationModel } from 'src/app/models/employee/manage/emplocation';
import { SetLocationModel } from 'src/app/models/employee/policy/batch/setlocation';
import { SysLocationModel } from 'src/app/models/system/policy/location';
import { AccessdataModel } from 'src/app/models/system/security/accessdata';
import { SetEmpDetailService } from 'src/app/services/emp/policy/setemp_detail.service';
import { LocationService } from 'src/app/services/system/policy/location.service';
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
  selector: 'app-empsetlocation',
  templateUrl: './empsetlocation.component.html',
  styleUrls: ['./empsetlocation.component.scss']
})
export class EmpsetlocationComponent implements OnInit {
  home: any;
  itemslike: MenuItem[] = [];
  @ViewChild(SelectEmpComponent) selectEmp: any;
  @ViewChild(TaskComponent) taskView: any;

  //
  title_process: { [key: string]: string } = { EN: "Process", TH: "การทำงาน" };
  title_result: { [key: string]: string } = { EN: "Result", TH: "ผลลัพธ์" };
  title_btnprocess: { [key: string]: string } = { EN: "Process", TH: "ดำเนินการ" };
  title_select: { [key: string]: string } = { EN: "Please Select Employee", TH: "กรุณาเลือกพนักงาน" };
  title_location: { [key: string]: string } = { EN: "Location", TH: "สถาที่ปฎิบัติงาน" };
  title_fromdate: { [key: string]: string } = { EN: "From Date", TH: "วันที่เริ่ม" };
  title_todate: { [key: string]: string } = { EN: "To Date", TH: "วันที่สิ้นสุด" };
  title_note: { [key: string]: string } = { EN: "Description", TH: "หมายเหตุ" };
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

  
   title_policy: { [key: string]: string } = { EN: "Policy", TH: "กำหนด" }
  title_employee : { [key: string]: string } = { EN: " Employee ", TH: "พนักงาน" }
  title_search : { [key: string]: string } = { EN: "  Search keyword ", TH: "ค้นหา" }
  title_showing : { [key: string]: string } = { EN: "  Showing ", TH: "แสดง" }

  title_to : { [key: string]: string } = { EN: "  to ", TH: "ถึง" }
  title_of : { [key: string]: string } = { EN: "  of ", TH: "จาก" }
  title_entries : { [key: string]: string } = { EN: "  entries ", TH: "รายการ" }

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
    private locationService: LocationService
  ) { }

  new_data: boolean = false;

  ngOnInit(): void {

    this.doGetInitialCurrent();

    //dropdown
    this.doLoadLocationList();


    this.itemslike = [{ label: this.title_employee[this.initial_current.Language], routerLink: '/employee/policy' },
    { label: this.title_location[this.initial_current.Language], styleClass: 'activelike' }];
    this.home = { icon: 'pi pi-home', routerLink: '/' };
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

  locationList: SysLocationModel[] = [];
  doLoadLocationList() {
    var tmp = new SysLocationModel();
    this.locationService.location_get(tmp).then(async (res) => {
      this.locationList = await res;
    })
  }

  selectedEmpLocation: EmpLocationModel = new EmpLocationModel();
  emplocationList: EmpLocationModel[] = [];

  setlocationList: SetLocationModel[] = [];
  doLoadsetlocationList() {
    this.setlocationList = [];
    var tmp = new SetLocationModel();
    tmp.location_code = this.selectedEmpLocation.location_code
    tmp.emplocation_startdate = this.selectedEmpLocation.emplocation_startdate
    this.setempdetailService.SetLocation_get(tmp).then(async (res) => {
      this.setlocationList = await res;
    });
  }

  process() {
    this.result_list = [];
    if (this.selectEmp.employee_dest.length > 0) {
      this.Setbatchlocation()
    }else{
      this.messageService.add({ severity: 'error', summary: 'Error', detail: this.title_select[this.initial_current.Language] });

    }
  }

  async Setbatchlocation() {
    var data = new SetLocationModel();
    data.location_code = this.selectedEmpLocation.location_code;
    data.emplocation_startdate = this.selectedEmpLocation.emplocation_startdate;
    data.emplocation_enddate = this.selectedEmpLocation.emplocation_enddate;
    data.emplocation_note = this.selectedEmpLocation.emplocation_note;
    data.company_code = this.initial_current.CompCode;
    data.modified_by = this.initial_current.Username;
    data.emp_data = this.selectEmp.employee_dest;
    this.loading = true;
    await this.setempdetailService.SetLocation_record(data).then((res) => {
      if (res.success) {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: res.message });
        this.doLoadsetlocationList();
        this.edit_data = false;
        this.new_data;
      } else {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: res.message });
      }
    })
    this.loading = false;
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

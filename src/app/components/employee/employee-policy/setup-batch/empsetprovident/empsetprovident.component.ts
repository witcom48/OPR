import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, MenuItem, MessageService } from 'primeng/api';
import { SelectEmpComponent } from 'src/app/components/usercontrol/select-emp/select-emp.component';
import { TaskComponent } from 'src/app/components/usercontrol/task/task.component';
import { AppConfig } from 'src/app/config/config';
import { InitialCurrent } from 'src/app/config/initial_current';
import { EmpProvidentModel } from 'src/app/models/employee/manage/provident';
import { SetProvidentModel } from 'src/app/models/employee/policy/batch/setprovident';
import { ProvidentModel } from 'src/app/models/payroll/provident';
import { ProvidentWorkageModel } from 'src/app/models/payroll/provident_workage';
import { AccessdataModel } from 'src/app/models/system/security/accessdata';
import { SetEmpDetailService } from 'src/app/services/emp/policy/setemp_detail.service';
import { ProvidentService } from 'src/app/services/payroll/provident.service';
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
  selector: 'app-empsetprovident',
  templateUrl: './empsetprovident.component.html',
  styleUrls: ['./empsetprovident.component.scss']
})
export class EmpsetprovidentComponent implements OnInit {
  home: any;
  itemslike: MenuItem[] = [];
  @ViewChild(SelectEmpComponent) selectEmp: any;
  @ViewChild(TaskComponent) taskView: any;

  //
  title_process: { [key: string]: string } = { EN: "Process", TH: "การทำงาน" };
  title_result: { [key: string]: string } = { EN: "Result", TH: "ผลลัพธ์" };
  title_btnprocess: { [key: string]: string } = { EN: "Process", TH: "ดำเนินการ" };
  title_select: { [key: string]: string } = { EN: "Please Select Employee", TH: "กรุณาเลือกพนักงาน" };
  title_pfno: { [key: string]: string } = { EN: "Provident No.", TH: "รหัสกองทุนฯ" };
  title_pf: { [key: string]: string } = { EN: "PF Policy ", TH: "นโยบาย" };
  title_entry: { [key: string]: string } = { EN: "Entry Date", TH: "วันที่เข้ากองทุนฯ" };
  title_startdate: { [key: string]: string } = { EN: "Start Date", TH: "วันที่เริ่ม" };
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

  title_provident: { [key: string]: string } = { EN: "Provident", TH: "กองทุนฯ" }
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
    private providentService: ProvidentService,
  ) { }

  new_data: boolean = false;

  ngOnInit(): void {
    this.doGetInitialCurrent();

    //dropdown
    this.doLoadprovidentList();

    this.itemslike = [{ label: this.title_employee[this.initial_current.Language], routerLink: '/employee/policy' },
    { label: this.title_provident[this.initial_current.Language], styleClass: 'activelike' }];
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
  //dropdown
  providentList: ProvidentModel[] = [];
  doLoadprovidentList() {
    var tmp = new ProvidentModel();
    this.providentService.provident_get(tmp).then((res) => {
      this.providentList = res;
    })
  }

  selectedEmpProvident: EmpProvidentModel = new EmpProvidentModel();
  empprovidentList: EmpProvidentModel[] = [];

  setprovidentList: SetProvidentModel[] = [];
  doLoadsetprovidentList() {
    this.setprovidentList = [];
    var tmp = new SetProvidentModel();
    tmp.provident_code = this.selectedEmpProvident.provident_code;
    tmp.empprovident_start = this.selectedEmpProvident.empprovident_start;
    this.setempdetailService.SetProvident_get(tmp).then(async (res) => {
      this.setprovidentList = await res;
    });
  }

  process() {
    this.result_list = [];
    if (this.selectEmp.employee_dest.length > 0) {
      this.Setbatchprovident();
    } else {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: this.title_select[this.initial_current.Language] });
    }
  }

  async Setbatchprovident() {
    var data = new SetProvidentModel();
    data.provident_code = this.selectedEmpProvident.provident_code;
    data.empprovident_card = this.selectedEmpProvident.empprovident_card;
    data.empprovident_entry = this.selectedEmpProvident.empprovident_entry;
    data.empprovident_start = this.selectedEmpProvident.empprovident_start;
    data.empprovident_end = this.selectedEmpProvident.empprovident_end;
    data.empprovident_type = "A";
    data.rate_com = this.rate_com;
    data.rate_emp = this.rate_emp;
    // data.rate_com = this.getRate_com(this.selectedEmpProvident.provident_code);
    // data.rate_emp = this.getRate_emp(this.selectedEmpProvident.provident_code);
    data.company_code = this.initial_current.CompCode;
    data.modified_by = this.initial_current.Username;
    data.emp_data = this.selectEmp.employee_dest;
    this.loading = true;
 
    await this.setempdetailService.SetProvident_record(data).then((res) => {
      if (res.success) {
         this.messageService.add({ severity: 'success', summary: 'Success', detail: res.message });
        this.doLoadsetprovidentList();
        this.edit_data = false;
        this.new_data;
      }
      else {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: res.message });
      }
      this.loading = false;
    });
  }

  

  rate_com: number = 0;
  rate_emp: number = 0;
  getProvidentWorkage(Code: string) {
    for (let i = 0; i < this.providentList.length; i++) {
      if (this.providentList[i].provident_code == Code) {
        this.providentList[i].providentWorkage_data.forEach((ele: ProvidentWorkageModel) => {
          this.rate_com = ele.rate_com;
          this.rate_emp = ele.rate_emp;
        })
      }
    }
  }
  // getRate_com(code: string) {
  //   for (let i = 0; i < this.providentList.length; i++) {
  //     if (this.providentList[i].provident_code == code) {
  //       this.providentList[i].providentWorkage_data.forEach((ele: ProvidentWorkageModel) => {
  //         this.rate_com = ele.rate_com;
  //       })
  //     }
  //   }
  // }
  // getRate_emp(code: string): any {
  //   for (let i = 0; i < this.providentList.length; i++) {
  //     if (this.providentList[i].provident_code == code) {
  //       this.providentList[i].providentWorkage_data.forEach((ele: ProvidentWorkageModel) => {
  //         return ele.rate_emp;
  //       })
  //     }
  //   }
  // }

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

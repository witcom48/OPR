import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, MenuItem, MessageService } from 'primeng/api';
import { SelectEmpComponent } from 'src/app/components/usercontrol/select-emp/select-emp.component';
import { TaskComponent } from 'src/app/components/usercontrol/task/task.component';
import { AppConfig } from 'src/app/config/config';
import { InitialCurrent } from 'src/app/config/initial_current';
import { EmpBenefitsModel } from 'src/app/models/employee/manage/benefits';
import { SetBenefitsModel } from 'src/app/models/employee/policy/batch/setbenefits';
import { ItemsModel } from 'src/app/models/payroll/items';
import { AccessdataModel } from 'src/app/models/system/security/accessdata';
import { SetEmpDetailService } from 'src/app/services/emp/policy/setemp_detail.service';
import { ItemService } from 'src/app/services/payroll/item.service';
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
  selector: 'app-empsetbenefits',
  templateUrl: './empsetbenefits.component.html',
  styleUrls: ['./empsetbenefits.component.scss']
})
export class EmpsetbenefitsComponent implements OnInit {
  home: any;
  itemslike: MenuItem[] = [];
  @ViewChild(SelectEmpComponent) selectEmp: any;
  @ViewChild(TaskComponent) taskView: any;

  //
  title_process: { [key: string]: string } = { EN: "Process", TH: "การทำงาน" };
  title_result: { [key: string]: string } = { EN: "Result", TH: "ผลลัพธ์" };
  title_btnprocess: { [key: string]: string } = { EN: "Process", TH: "ดำเนินการ" };
  title_select: { [key: string]: string } = { EN: "Please Select Employee", TH: "กรุณาเลือกพนักงาน" };
  title_startdate: { [key: string]: string } = { EN: "Start Date", TH: "วันที่เริ่ม" };
  title_enddate: { [key: string]: string } = { EN: "End Date", TH: "วันที่สิ้นสุด" };
  title_incomededuct: { [key: string]: string } = { EN: "Income/Deduct", TH: "เงินได้/เงินหัก" };
  title_amount: { [key: string]: string } = { EN: "Amount", TH: "จำนวน" };
  title_type: { [key: string]: string } = { EN: "Type", TH: "ประเภท" };
  title_fullamount: { [key: string]: string } = { EN: "Amount", TH: "เต็มจำนวน" };
  title_byday: { [key: string]: string } = { EN: "Working Day", TH: "ตามวันที่ทำงาน" };
  title_reason: { [key: string]: string } = { EN: "Reason", TH: "เหตุผล" };
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

  title_benefits: { [key: string]: string } = { EN: "Benefits", TH: "สวัสดิการ" }
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

    private itemService: ItemService,
  ) { }

  new_data: boolean = false;

  ngOnInit(): void {
    this.doGetInitialCurrent();

    //dropdown
    this.doloaditemList();

    this.itemslike = [{ label: this.title_employee[this.initial_current.Language], routerLink: '/employee/policy' },
    { label: this.title_benefits[this.initial_current.Language], styleClass: 'activelike' }];
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
  itemList: ItemsModel[] = [];
  doloaditemList() {
    var tmp = new ItemsModel();
    this.itemService.item_get(tmp).then((res) => {
      this.itemList = res;
    })
  }

  selectedEmpBenefits: EmpBenefitsModel = new EmpBenefitsModel();
  empbenefitsList: EmpBenefitsModel[] = [];

  setbenefitList: SetBenefitsModel[] = [];
  doLoadsetbenefitList() {
    this.setbenefitList = [];
    var tmp = new SetBenefitsModel();
    tmp.item_code = this.selectedEmpBenefits.item_code
    tmp.empbenefit_amount = this.selectedEmpBenefits.empbenefit_amount
    this.setempdetailService.SetBenefit_get(tmp).then(async (res) => {
      this.setbenefitList = await res;
    });
  }

  process() {
    this.result_list = [];
    if (this.selectEmp.employee_dest.length > 0) {
      this.Setbatchbenefits();
    }else{
      this.messageService.add({ severity: 'error', summary: 'Error', detail: this.title_select[this.initial_current.Language] });
    }
  }

  async Setbatchbenefits() {
    var data = new SetBenefitsModel();
    data.item_code = this.selectedEmpBenefits.item_code;
    data.empbenefit_amount = this.selectedEmpBenefits.empbenefit_amount;
    data.empbenefit_startdate = this.selectedEmpBenefits.empbenefit_startdate;
    data.empbenefit_enddate = this.selectedEmpBenefits.empbenefit_enddate;
    data.empbenefit_reason = this.selectedEmpBenefits.empbenefit_reason;
    data.empbenefit_note = this.selectedEmpBenefits.empbenefit_note;
    data.empbenefit_paytype = this.selectedEmpBenefits.empbenefit_paytype;
    data.empbenefit_break = this.selectedEmpBenefits.empbenefit_break;
    data.empbenefit_breakreason = this.selectedEmpBenefits.empbenefit_breakreason;
    data.empbenefit_conditionpay = this.selectedEmpBenefits.empbenefit_conditionpay;
    data.empbenefit_payfirst = this.selectedEmpBenefits.empbenefit_payfirst;
    data.company_code = this.initial_current.CompCode
    data.modified_by = this.initial_current.Username
    data.emp_data = this.selectEmp.employee_dest;
    this.loading = true;
    // console.log(data)
    await this.setempdetailService.SetBenefits_record(data).then((res) => {
      // console.log(res)
      if (res.success) {
        // console.log(res.message)
        this.messageService.add({ severity: 'success', summary: 'Success', detail: res.message });
        this.doLoadsetbenefitList();
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

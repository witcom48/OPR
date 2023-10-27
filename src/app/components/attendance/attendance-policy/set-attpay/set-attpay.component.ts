import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, ConfirmEventType, MenuItem, MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { SelectEmpComponent } from 'src/app/components/usercontrol/select-emp/select-emp.component';
import { AppConfig } from 'src/app/config/config';
import { InitialCurrent } from 'src/app/config/initial_current';
import { EmpattitemModel } from 'src/app/models/attendance/empattitem';
import { EmpAttItemServices } from 'src/app/services/attendance/empattitem.service';

import { ItemsModel } from 'src/app/models/payroll/items';
import { ItemService } from 'src/app/services/payroll/item.service';

interface Policy {
  name: string,
  code: string
}
interface Result {
  worker: string,
  item_sa: string,
  item_ot: string,
  item_dg: string,
  item_aw: string,
  item_ab: string,
  item_lt: string,
  item_lv: string,

  modied_by: string,
  modied_date: string,
}

@Component({
  selector: 'app-set-attpay',
  templateUrl: './set-attpay.component.html',
  styleUrls: ['./set-attpay.component.scss']
})
export class SetAttpayComponent implements OnInit {
  itemslike: MenuItem[] = [];
  home: any;
  constructor(
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private empAttItemServices: EmpAttItemServices,
    private itemService: ItemService,
    private router: Router
  ) { }
  @Input() policy_list: Policy[] = []
  @Input() title: string = "Deduction Income code";
  @Input() pol_type: string = "";
  index: number = 0;

  @ViewChild(SelectEmpComponent) selectEmp: any;

  result_list: Result[] = [];

  selectedItem: EmpattitemModel = new EmpattitemModel();

  loading: boolean = false;
  new_data: boolean = false;
  @ViewChild('dt2') table: Table | undefined;

  title_confirm: { [key: string]: string } = { EN: "Are you sure?", TH: "ยืนยันการทำรายการ" }
  title_confirm_record: { [key: string]: string } = { EN: "Confirm to record", TH: "คุณต้องการบันทึกการทำรายการ" }
  title_confirm_delete: { [key: string]: string } = { EN: "Confirm to delete", TH: "คุณต้องการลบรายการ" }
  title_confirm_yes: { [key: string]: string } = { EN: "Yes", TH: "ใช่" }
  title_confirm_no: { [key: string]: string } = { EN: "No", TH: "ยกเลิก" }
  title_confirm_cancel: { [key: string]: string } = { EN: "You have cancelled", TH: "คุณยกเลิกการทำรายการ" }

  title_submit: { [key: string]: string } = { EN: "Submit", TH: "คุณยกเลิกการทำรายการ" }
  title_cancel: { [key: string]: string } = { EN: "Cancel", TH: "คุณยกเลิกการทำรายการ" }
  labSalary: { [key: string]: string } = { EN: "Salary", TH: "เงินเดือน" }
  labOvertime: { [key: string]: string } = { EN: "Overtime", TH: "ล่วงเวลา" }
  labDiligence: { [key: string]: string } = { EN: "Diligence", TH: "เบี้ยขยัน" }
  labAllowance: { [key: string]: string } = { EN: "Allowance", TH: "เงินค่าเวลา" }
  labLeave: { [key: string]: string } = { EN: "Leave", TH: "ลางาน" }
  labAbsent: { [key: string]: string } = { EN: "Absent", TH: "ขาดงาน" }
  labLate: { [key: string]: string } = { EN: "Late", TH: "สาย" }

  title_btn_save: { [key: string]: string } = { EN: "Save", TH: "บันทึก" }
  title_btn_cancel: { [key: string]: string } = { EN: "Cancel", TH: "ยกเลิก" }
  title_btn_close: { [key: string]: string } = { EN: "Close", TH: "ปิด" }
  title_modified_by: { [key: string]: string } = { EN: "Edit by", TH: "ผู้ทำรายการ" }
  title_modified_date: { [key: string]: string } = { EN: "Edit date", TH: "วันที่ทำรายการ" }

  title_dropfile: { [key: string]: string } = { EN: "Drop files here", TH: "วางไฟล์ที่นี่" };
  title_choose: { [key: string]: string } = { EN: "Choose File", TH: "เลือกไฟล์" };
  title_nofile: { [key: string]: string } = { EN: "No file chosen", TH: "ไม่มีไฟล์ที่เลือก" };
  title_or: { [key: string]: string } = { EN: "or", TH: "หรือ" };
  title_template: { [key: string]: string } = { EN: "Template", TH: "เทมเพลต" };
  title_attendance: { [key: string]: string } = { EN: "Attendance", TH: "กำหนดนโยบาย" };
  title_setdeductionincomecode: { [key: string]: string } = { EN: "Set Deduction Income code", TH: "กำหนดนโยบายเงินหัก" };
  title_process: { [key: string]: string } = { EN: "Process", TH: "การทำงาน" };
  title_proces: { [key: string]: string } = { EN: "Process", TH: "ดำเนินการ" };
  title_result: { [key: string]: string } = { EN: "Result", TH: "ผลลัพธ์" };
  title_no: { [key: string]: string } = { EN: "No", TH: "ลำดับ" };
  title_worker: { [key: string]: string } = { EN: "Worker", TH: "รหัสพนักงาน" };
  title_showing : { [key: string]: string } = { EN: "  Showing ", TH: "แสดง" }
  title_to : { [key: string]: string } = { EN: "  to ", TH: "ถึง" }
  title_of : { [key: string]: string } = { EN: "  of ", TH: "จาก" }
  title_entries : { [key: string]: string } = { EN: "  entries ", TH: "รายการ" }
  title_search : { [key: string]: string } = { EN: "  Search keyword ", TH: "ค้นหา" }

  
  
  
  public initial_current: InitialCurrent = new InitialCurrent();
  doGetInitialCurrent() {
    this.initial_current = JSON.parse(localStorage.getItem(AppConfig.SESSIONInitial) || '{}');
    if (!this.initial_current) {
      this.router.navigateByUrl('');
    }
    this.itemslike = [{ label: this.title_attendance[this.initial_current.Language], routerLink: '/attendance/policy' }, { label: this.title_setdeductionincomecode[this.initial_current.Language] , routerLink: '/attendance/policy/setattpay', styleClass: 'activelike' }];

    this.home = { icon: 'pi pi-home', routerLink: '/' };
  }
  ngOnInit(): void {
    this.initial_current.loading = true;
    this.doGetInitialCurrent();

    setTimeout(() => {
      this.doLoadItemsList()
      this.doLoadResult()
    }, 1500);
  }

  doLoadResult() {
    this.initial_current.loading = true;
    var tmp = new EmpattitemModel();
    this.empAttItemServices.EmpAttItem_get(tmp).then(async (res) => {
      await res.forEach((element: EmpattitemModel) => {
        this.result_list.push(
          {
            worker: element.worker_code,
            item_sa: element.item_sa,
            item_ot: element.item_ot,
            item_aw: element.item_aw,
            item_dg: element.item_dg,
            item_lv: element.item_lv,
            item_ab: element.item_ab,
            item_lt: element.item_lt,
            modied_by: element.modified_by,
            modied_date: element.modified_date,
          }
        )
      });
      this.initial_current.loading = false;
    });
  }

  itemssa_list: any[] = [];
  itemsot_list: any[] = [];
  itemsdg_list: any[] = [];
  itemsaw_list: any[] = [];

  itemsab_list: any[] = [];
  itemslt_list: any[] = [];
  itemslv_list: any[] = [];

  doLoadItemsList() {
    this.initial_current.loading = true;
    var tmp = new ItemsModel();
    this.itemService.item_get(tmp).then(async (res) => {
      await res.forEach((element: ItemsModel) => {

        if (element.item_type == "IN") {

          this.doAddOption(this.itemssa_list, element)
          this.doAddOption(this.itemsot_list, element)
          this.doAddOption(this.itemsdg_list, element)
          this.doAddOption(this.itemsaw_list, element)

        }
        else {

          this.doAddOption(this.itemsab_list, element)
          this.doAddOption(this.itemslt_list, element)
          this.doAddOption(this.itemslv_list, element)

        }


      });
      this.initial_current.loading = false;
    });

  }

  doAddOption(list: any[], element: ItemsModel) {
    list.push(
      {
        name: this.initial_current.Language == "EN" ? element.item_name_en : element.item_name_th,
        code: element.item_code
      }
    )
  }


  process() {
    this.result_list = [];
    if (this.selectEmp.employee_dest.length > 0) {

      this.confirmationService.confirm({
        message: "SetUpPolicyAttence",
        header: "SetUp",
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
          this.SetPolicyAtt();
        },
        reject: () => {
        }
      });
    }
  }

  async SetPolicyAtt() {
    this.initial_current.loading = true;
    var data = new EmpattitemModel();
    data.item_sa = this.selectedItem.item_sa
    data.item_ot = this.selectedItem.item_ot
    data.item_aw = this.selectedItem.item_aw
    data.item_dg = this.selectedItem.item_dg
    data.item_lv = this.selectedItem.item_lv
    data.item_ab = this.selectedItem.item_ab
    data.item_lt = this.selectedItem.item_lt

    data.company_code = this.initial_current.CompCode
    data.modified_by = this.initial_current.Username
    data.emp_data = this.selectEmp.employee_dest;
    this.loading = true;
    await this.empAttItemServices.EmpAttItem_record(data).then((res) => {
      // console.log(res)
      if (res.success) {
        // console.log(res.message)
        this.messageService.add({ severity: 'success', summary: 'Success', detail: res.message });

        setTimeout(() => {
          this.doLoadResult()
        }, 500);

      }
      else {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: res.message });
      }
      this.loading = false;
      this.initial_current.loading = false;
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

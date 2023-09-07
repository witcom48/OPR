import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, MenuItem, MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { SelectEmpComponent } from 'src/app/components/usercontrol/select-emp/select-emp.component';
import { AppConfig } from 'src/app/config/config';
import { InitialCurrent } from 'src/app/config/initial_current';

import { EmployeeModel } from 'src/app/models/employee/employee';
import { EmpReduceModel } from 'src/app/models/employee/manage/reduce';
import { SetBonusModel } from 'src/app/models/payroll/batch/setbonus';
import { SetItemModel } from 'src/app/models/payroll/batch/setitem';
import { SetProvidentModel } from 'src/app/models/payroll/batch/setprovident';
import { SetReduceModel } from 'src/app/models/payroll/batch/setreduce';
import { BonusModel } from 'src/app/models/payroll/bonus';
import { ItemsModel } from 'src/app/models/payroll/items';
import { PlanitemsModels } from 'src/app/models/payroll/planitems';
import { PlanreduceModels } from 'src/app/models/payroll/planreduce';
import { ProvidentModel } from 'src/app/models/payroll/provident';
import { ReducesModel } from 'src/app/models/system/policy/reduces';

import { EmployeeService } from 'src/app/services/emp/worker.service';
import { SetbonusService } from 'src/app/services/payroll/batch/setbonus.service';
import { SetitemsService } from 'src/app/services/payroll/batch/setitems.service';
import { SetprovidentService } from 'src/app/services/payroll/batch/setprovident.service';
import { SetreduceService } from 'src/app/services/payroll/batch/setreduce.service';
import { BonusService } from 'src/app/services/payroll/bonus.service';
import { PlanitemsService } from 'src/app/services/payroll/planitems.service';
import { PlanreduceService } from 'src/app/services/payroll/planreduce.service';
import { ProvidentService } from 'src/app/services/payroll/provident.service';
import { ReduceService } from 'src/app/services/system/policy/reduce.service';
interface Policy {
  name: string,
  code: string
}
interface Result {
  bonusData: any;
  itemData: any;
  providentData: any;
  reduceData: any;

  worker_code: string;
  worker_detail: string;
  paypolitem_code: string;
  paypolbonus_code: string;
  paypolprovident_code: string;
  paybatchreduce_code: string;
  modied_by: string;
  modified_date: string;
}
interface Year {
  name: string,
  code: string
}

@Component({
  selector: 'app-setallpolicy',
  templateUrl: './setallpolicy.component.html',
  styleUrls: ['./setallpolicy.component.scss']
})
export class SetallpolicyComponent implements OnInit {

  home: any;
  itemslike: MenuItem[] = [];
  edit_data = false;

  emp_code: string = "";
  paypolbonus_code: string = "";
  constructor(
    private messageService: MessageService,
    private confirmationService: ConfirmationService,


    ///Services
    private bonusService: BonusService,
    private providentService: ProvidentService,
    private planitemsService: PlanitemsService,
    private reduceService: ReduceService,

    ///SetServices
    private setbonusService: SetbonusService,
    private setitemsService: SetitemsService,
    private setprovidentService: SetprovidentService,
    private setreduceService: SetreduceService,
    private employeeService: EmployeeService,


    private router: Router
  ) { }
  @Input() policy_list: Policy[] = []
  @Input() title: string = "";
  @Input() pol_type: string = "";
  index: number = 0;

  @ViewChild(SelectEmpComponent) selectEmp: any;

  policyplanreduce: Policy[] = [];
  policyplanreduceselect!: Policy;

  // policyprovident: Policy[] = [];
  // policyprovidentselect!: Policy;

  policybonus: Policy[] = [];
  policybonusselect!: Policy;

  // policyplanitems: Policy[] = [];
  // policyplanitemsselect!: Policy;

  policyItems: Policy[] = [];
  policyItemsselect!: Policy;
  new_data: boolean = true;
  loading: boolean = false;
  @ViewChild('dt2') table: Table | undefined;

  public initial_current: InitialCurrent = new InitialCurrent();
  doGetInitialCurrent() {
    this.initial_current = JSON.parse(localStorage.getItem(AppConfig.SESSIONInitial) || '{}');
    if (!this.initial_current) {
      this.router.navigateByUrl('login');
    }
  }

  title_code: { [key: string]: string } = { EN: "Code ", TH: "รหัสพนักงาน" }
  title_detail: { [key: string]: string } = { EN: "Detail ", TH: "รายละเอียด" }
  title_SetBonus: { [key: string]: string } = { EN: "Set Bonus ", TH: "นโยบายโบนัส" }
  title_SetIncomeDeduct: { [key: string]: string } = { EN: "Set Income / Deduct ", TH: "นโยบายเงินได้/เงินหัก" }
  title_SetProvident: { [key: string]: string } = { EN: "Set Provident Fund", TH: "นโยบายกองทุนสำรองฯ" }
  title_Setreduce: { [key: string]: string } = { EN: "Set reduce ", TH: "นโยบายค่าลดหย่อน" }
  title_no: { [key: string]: string } = { EN: "No.", TH: "ลำดับ" }
  title_modified_by: { [key: string]: string } = { EN: "Edit by", TH: "ผู้ทำรายการ" }
  title_modified_date: { [key: string]: string } = { EN: "Edit date", TH: "วันที่ทำรายการ" }
  title_result: { [key: string]: string } = { EN: "Result", TH: "ผลลัพธ์" }
  title_process: { [key: string]: string } = { EN: "Process", TH: "กระบวนการ" }

  title_system_payroll: { [key: string]: string } = { EN: "Policy Payroll", TH: "นโยบาย" }
  title_name_policy: { [key: string]: string } = { EN: "Set Batch", TH: "กำหนดสิทธิ์" }
  //
  title_confirm: { [key: string]: string } = { EN: "Are you sure?", TH: "ยืนยันการทำรายการ" }
  title_confirm_record: { [key: string]: string } = { EN: "Confirm to record", TH: "คุณต้องการบันทึกการทำรายการ" }
  title_confirm_delete: { [key: string]: string } = { EN: "Confirm to delete", TH: "คุณต้องการลบรายการ" }
  title_confirm_yes: { [key: string]: string } = { EN: "Yes", TH: "ใช่" }
  title_confirm_no: { [key: string]: string } = { EN: "No", TH: "ยกเลิก" }
  title_confirm_cancel: { [key: string]: string } = { EN: "You have cancelled", TH: "คุณยกเลิกการทำรายการ" }
  title_confirm_successfullyl: { [key: string]: string } = { EN: "Retrieved data successfully", TH: "บันทึกข้อมูลสำเร็จ" }
  title_confirm_selected: { [key: string]: string } = { EN: "No employees selected", TH: "ไม่มีการเลือกพนักงาน" }

  //


  ngOnInit(): void {


    this.doGetInitialCurrent();
    this.doLoadPlanreduc();
    // this.doLoadTRpolProvidentList();
    this.doLoadTRBonusList();
    // this.doLoadPlanitems();
    ////
    this.doLoadSetBonusList();
    // this.doLoadItemList();
    // this.doLoadSetProvidentList();
    this.doLoadSetReduceList();
    this.loadAllData();

    this.itemslike = [{ label: this.title_system_payroll[this.initial_current.Language], routerLink: '/payroll/policy' },
    { label: this.title_name_policy[this.initial_current.Language], styleClass: 'activelike' }];
    this.home = { icon: 'pi pi-home', routerLink: '/' };
  }
  //ส่วนที่1
  ///ค่าลดหย่อน 
  doLoadPlanreduc() {
    var tmp = new ReducesModel();
    this.reduceService.reduce_get( ).then(async (res) => {
      await res.forEach(async (element: ReducesModel) => {
        this.policyplanreduce.push(
          {
            name: this.initial_current.Language == "EN" ? element.reduce_name_en : element.reduce_name_th,
            code: element.reduce_code
          }
        )
      });
    });
  }
  // doLoadPlanreduc() {
  //   var tmp = new PlanreduceModels();
  //   this.planreduceService.planreduce_get(tmp).then(async (res) => {
  //     await res.forEach(async (element: PlanreduceModels) => {
  //       this.policyplanreduce.push(
  //         {
  //           name: this.initial_current.Language == "EN" ? element.planreduce_name_en : element.planreduce_name_th,
  //           code: element.planreduce_code
  //         }
  //       )
  //     });
  //   });
  // }

  ////กองทุนสำรอง
  // doLoadTRpolProvidentList() {
  //   var tmp = new ProvidentModel();
  //   this.providentService.provident_get(tmp).then(async (res) => {
  //     await res.forEach((element: ProvidentModel) => {
  //       this.policyprovident.push(
  //         {
  //           name: this.initial_current.Language == "EN" ? element.provident_name_en : element.provident_name_th,
  //           code: element.provident_code
  //         }
  //       )
  //     });
  //   });
  // }
  ///เงินได้เงินหักset
  // doLoadPlanitems() {
  //   var tmp = new PlanitemsModels();
  //   this.planitemsService.planitems_get(tmp).then(async (res) => {
  //     res.forEach((element: PlanitemsModels) => {
  //       this.policyplanitems.push(
  //         {
  //           name: this.initial_current.Language == "EN" ? element.planitems_name_en : element.planitems_name_th,
  //           code: element.planitems_code
  //         }
  //       )
  //     });
  //   });
  // }

  ///โบนัส
  doLoadTRBonusList() {
    var tmp = new BonusModel();
    this.bonusService.bonus_get(tmp).then(async (res) => {
      await res.forEach((element: BonusModel) => {
        this.policybonus.push(
          {
            name: this.initial_current.Language == "EN" ? element.bonus_name_en : element.bonus_name_th,
            code: element.bonus_code
          }
        )
      });

    });
  }


  ////ส่วนที่สอง
  async process() {
    this.result_list = [];
    this.confirmationService.confirm({
      message: this.title_confirm_record[this.initial_current.Language],
      header: this.title_confirm[this.initial_current.Language],
      icon: 'pi pi-exclamation-triangle',
      accept: async () => {
        if (this.selectEmp.employee_dest.length > 0) {

          if (this.policyplanreduceselect) {
            await this.SetTRpolReduce();
          }
          // if (this.policyprovidentselect && this.policyprovident) {
          //   await this.SetTRpolProvident();
          // }
          if (this.policybonusselect) {
            await this.Setbatchbonus();
          }
          // if (this.policyplanitemsselect && this.policyplanitems) {
          //   await this.SetTRpolItem();
          // }
          await this.loadAllData();
          this.messageService.add({ severity: 'success', summary: 'Success', detail: this.title_confirm_successfullyl[this.initial_current.Language] });
        } else {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: this.title_confirm_selected[this.initial_current.Language] });
        }
      },
      reject: () => {
        this.messageService.add({ severity: 'warn', summary: 'Cancelled', detail: this.title_confirm_cancel[this.initial_current.Language] });
      }
    });
  }


  result_list: Result[] = [];
  selectedEmployeeData: any[] = [];
  onEmployeeSelect(employee: any) {
    this.selectedEmployeeData = [employee];
  }

  selectedEmployee: EmployeeModel = new EmployeeModel();
  worker_list: EmployeeModel[] = [];
  async loadAllData() {
    try {
      const tmp1 = new SetBonusModel();
      // const tmp2 = new SetItemModel();
      // const tmp3 = new SetProvidentModel();
      const tmp4 = new SetReduceModel();

      const promise1 = this.setbonusService.SetBonus_get("",tmp1);
      // const promise2 = this.setitemsService.SetItems_get(tmp2);
      // const promise3 = this.setprovidentService.SetProvident_get(tmp3);
      const promise4 = this.setreduceService.SetReduce_get(tmp4);

      const [res1, res4] = await Promise.all([promise1, promise4]);

      const maxLength = Math.max(res1.length, res4.length);

      await this.doLoadEmployee();

      const combinedData = [];

      for (let i = 0; i < maxLength; i++) {
        const combinedItem = {
          bonusData: res1[i] || {},
          // itemData: res2[i] || {},
          // providentData: res3[i] || {},
          reduceData: res4[i] || {},
          worker_code: this.worker_list[i]?.worker_code || '',
          worker_detail: `${this.worker_list[i]?.worker_fname_th || ''} ${this.worker_list[i]?.worker_fname_en || ''}`,
          modified_by: this.initial_current.Username,
          modified_date: new Date().toISOString()
        };
        combinedData.push(combinedItem);
      }
      this.selectedEmployeeData = combinedData;
    } catch {
    }
  }

  async doLoadEmployee() {
    try {
      const res = await this.employeeService.worker_get(this.initial_current.CompCode, this.emp_code);
      this.worker_list = res;
    } catch { }
  }


  ///bonus
  SetBonusList = [];
  SetBonus_List: SetBonusModel[] = [];
  doLoadSetBonusList() {
    var tmp = new SetBonusModel();
    tmp.worker_code = this.emp_code;
     this.setbonusService.SetBonus_get( '',tmp).then((res) => {
      this.SetBonus_List = res;
    });
  }
  // async doLoadSetBonusList() {
  //   try {
  //     const tmp = new SetBonusModel();
  //     const res = await this.setbonusService.SetBonus_get("",tmp);
  //   } catch { }
  // }
  async Setbatchbonus() {
    const data = new SetBonusModel();
    data.company_code = this.initial_current.CompCode;
    data.emp_data = this.selectEmp.employee_dest;
    data.paypolbonus_code = this.policybonusselect.code;
    data.modified_by = this.initial_current.Username;
    // data.bonus_data = this.selectEmp.employee_dest;
    this.loading = true;
    try {
      const res = await this.setbonusService.SetBonus_record('', data);
      if (res.success) {
        // this.messageService.add({ severity: 'success', summary: 'Success', detail: res.message, });
        this.doLoadSetBonusList();
        this.edit_data = false;
      } else {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: res.message, });
      }
    } finally {
      this.loading = false;
    }
  }
  ////
  // ค่าลดหย่อน
  empreduceList: EmpReduceModel[] = [];
  selectedEmpreduce: EmpReduceModel = new EmpReduceModel();

  Setreduce_List: SetReduceModel[] = [];
  selectedTRpolReduce: ReducesModel = new ReducesModel();

 
  doLoadSetReduceList() {
    var tmp = new SetReduceModel();
    tmp.worker_code = this.emp_code;
     this.setreduceService.SetReduce_get( tmp).then((res) => {
      this.Setreduce_List = res;
     });
  }

  async SetTRpolReduce() {
    const data = new SetReduceModel();
    data.company_code = this.initial_current.CompCode;
    data.emp_data = this.selectEmp.employee_dest;
    data.paybatchreduce_code = this.policyplanreduceselect.code;
    data.modified_by = this.initial_current.Username;

    this.loading = true;

    try {
      const res = await this.setreduceService.SetReduce_record(data);

      if (res.success) {
        // this.messageService.add({ severity: 'success', summary: 'Success', detail: res.message });

        const EmpReduce = new EmpReduceModel();
        EmpReduce.company_code = data.company_code;
        EmpReduce.worker_code = data.emp_data[0].worker_code;
        EmpReduce.reduce_type = data.paybatchreduce_code;
        EmpReduce.empreduce_amount = "0";
        EmpReduce.modified_by = data.modified_by;
        this.empreduceList.push(EmpReduce);

        this.doLoadSetReduceList();
        this.edit_data = false;
      } else {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: res.message });
      }
    } catch (error) {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'An error occurred while processing.' });
    } finally {
      this.loading = false;
    }
  }

  ///Item
  // SetItems_List: SetItemModel[] = [];
  // selectedTRItem: ItemsModel = new ItemsModel();
  // async doLoadItemList() {
  //   try {
  //     const tmp = new SetItemModel();
  //     const res = await this.setitemsService.SetItems_get(tmp);
  //   } catch { }
  // }

  // async SetTRpolItem() {
  //   const data = new SetItemModel();
  //   data.company_code = this.initial_current.CompCode;
  //   data.emp_data = this.selectEmp.employee_dest;
  //   data.paypolitem_code = this.policyplanitemsselect.code;
  //   data.modified_by = this.initial_current.Username;
  //   // data.items_data = this.selectEmp.employee_dest;
  //   this.loading = true;
  //   try {
  //     const res = await this.setitemsService.SetItems_record(data);
  //     if (res.success) {
  //       // this.messageService.add({ severity: 'success', summary: 'Success', detail: res.message, });
  //       this.doLoadItemList();
  //       this.edit_data = false;
  //     } else {
  //       this.messageService.add({ severity: 'error', summary: 'Error', detail: res.message, });
  //     }
  //   } finally {
  //     this.loading = false;
  //   }
  // }

  ///กองทุนสำรอง
  // SetProvident_List: SetProvidentModel[] = [];
  // selectedTRpolProvident: ProvidentModel = new ProvidentModel();
  // async doLoadSetProvidentList() {
  //   try {
  //     const tmp = new SetProvidentModel();
  //     const res = await this.setprovidentService.SetProvident_get(tmp);
  //   } catch {
  //   }
  // }

  // async SetTRpolProvident() {
  //   const data = new SetProvidentModel();
  //   data.company_code = this.initial_current.CompCode;
  //   data.emp_data = this.selectEmp.employee_dest;
  //   data.paypolprovident_code = this.policyprovidentselect.code;
  //   data.modified_by = this.initial_current.Username;
  //   // data.provident_data = this.selectEmp.employee_dest;
  //   this.loading = true;
  //   try {
  //     const res = await this.setprovidentService.SetProvident_record(data);
  //     if (res.success) {
  //       // this.messageService.add({ severity: 'success', summary: 'Success', detail: res.message, });
  //       this.doLoadSetProvidentList();
  //       this.edit_data = false;
  //     } else {
  //       this.messageService.add({ severity: 'error', summary: 'Error', detail: res.message, });
  //     }
  //   } finally {
  //     this.loading = false;
  //   }
  // }

  Deletbonus(data: SetBonusModel) {
    if (this.policybonusselect) {
      this.doDeletbonus(data);
    }
  }
  Deletreduce(data: SetReduceModel) {
    if (this.policyplanreduceselect) {
      this.doDeletreduce(data);
    }
  }

   


  async doDeletbonus(data: SetBonusModel) {
    this.loading = true;
    await this.setbonusService.SetBonus_delete(data).then((res) => {
      this.SetBonus_List = this.SetBonus_List.filter(
        (item) => item !== data
      );
      if (res.success) {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: res.message,
        });
        this.doLoadSetBonusList();
        this.edit_data = false;
        this.new_data;
      } else {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: res.message,
        });
      }
    });
  }


  async doDeletreduce(data: SetReduceModel) {
    this.loading = true;
    await this.setreduceService.SetReduce_delete(data).then((res) => {
      this.Setreduce_List = this.Setreduce_List.filter(
        (item) => item !== data
      );
      if (res.success) {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: res.message,
        });
        this.doLoadSetReduceList();
        this.edit_data = false;
        this.new_data;
      } else {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: res.message,
        });
      }
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

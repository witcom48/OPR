import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { AppConfig } from 'src/app/config/config';
import { InitialCurrent } from 'src/app/config/initial_current';
import { EmployeeModel } from 'src/app/models/employee/employee';
import { ItemsModel } from 'src/app/models/payroll/items';
import { PayitemModel } from 'src/app/models/payroll/payitem';
import { EmployeeService } from 'src/app/services/emp/worker.service';
import { ItemService } from 'src/app/services/payroll/item.service';
import { PayitemService } from 'src/app/services/payroll/payitem.service';

interface Type {
  name: string;
  code: string;
}
interface Result {
  worker: string;
  policy: string;
  modified_by: string;
  modified_date: string;
}
@Component({
  selector: 'app-payroll-view',
  templateUrl: './payroll-view.component.html',
  styleUrls: ['./payroll-view.component.scss']
})
export class PayrollViewComponent implements OnInit {


  title_payroll: { [key: string]: string } = { EN: "Payroll", TH: "Payroll" };
  title_page: { [key: string]: string } = { EN: "View Calculate", TH: "ตรวจสอบการคำนวน" };
  title_income: { [key: string]: string } = { EN: "Income", TH: "เงินได้" };
  title_incomelist: { [key: string]: string } = { EN: "Income List", TH: "รายการเงินได้" };
  title_deduct: { [key: string]: string } = { EN: "Deduct", TH: "เงินหัก" };
  title_deductlist: { [key: string]: string } = { EN: "Deduct List", TH: "รายการเงินหัก" };
  title_incomename: { [key: string]: string } = { EN: "Income Name", TH: "ชื่อเงินได้" };
  title_deductname: { [key: string]: string } = { EN: "Deduct Name", TH: "ชื่อเงินหัก" };
  title_amount: { [key: string]: string } = { EN: "Amount", TH: "จำนวนเงิน" };
  title_quantity: { [key: string]: string } = { EN: "Quantity", TH: "ปริมาณ" };

  title_ssolist: { [key: string]: string } = { EN: "Social", TH: "ประกันสังคม" };
  title_ssoemprate: { [key: string]: string } = { EN: "Employee rate", TH: "อัตราประกันสังคม (พนักงาน)" };
  title_ssoempamount: { [key: string]: string } = { EN: "Employee amount", TH: "ประกันสังคม (พนักงาน)" };
  title_ssocomrate: { [key: string]: string } = { EN: "Company rate", TH: "อัตราประกันสังคม (สมทบ)" };
  title_ssocomamount: { [key: string]: string } = { EN: "Company amount", TH: "ประกันสังคม (สมทบ)" };

  title_modified_by: { [key: string]: string } = { EN: "Edit by", TH: "ผู้ทำรายการ" };
  title_modified_date: { [key: string]: string } = { EN: "Edit date", TH: "วันที่ทำรายการ" };

  constructor(
    private employeeService: EmployeeService,
    private router: Router,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private datePipe: DatePipe,

    private payitemService: PayitemService,
    private itemService: ItemService,
  ) { }

  SetItems_List: PayitemModel[] = [];
  result_list: Result[] = [];
  item_list: PayitemModel[] = [];
  payitem_list: PayitemModel[] = [];

  payitems: PayitemModel = new PayitemModel();
  TypeList: Type[] = [];

  ngOnInit(): void {
    this.doGetInitialCurrent();

    console.log(this.initial_current.PR_PayDate)

    Promise.all([this.doLoadEmployee(), this.doLoadPayitem()])
      .then(() => {
        setTimeout(() => {
          this.worker_index = 0;
          this.doSetDetailWorker();
        }, 1500);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  public initial_current: InitialCurrent = new InitialCurrent();
  doGetInitialCurrent() {
    this.initial_current = JSON.parse(localStorage.getItem(AppConfig.SESSIONInitial) || '{}');
    if (!this.initial_current) {
      this.router.navigateByUrl('login');
    }
  }

  workerDetail: EmployeeModel = new EmployeeModel();
  worker_list: EmployeeModel[] = [];
  worker_index: number = 0;
  worker_code: string = '';
  worker_name: string = '';
  item: string = '';
  payitem: string = '';

  byitem_total: number = 0;
  byemp_income: number = 0;
  byemp_deduct: number = 0;
  byemp_netpay: number = 0;

  doLoadEmployee() {
    this.employeeService
      .worker_get(this.initial_current.CompCode, '')
      .then((res) => {
        this.worker_list = res;
      });
  }

  doNextWorker() {
    if (this.worker_index < this.worker_list.length - 1) {
      this.worker_index++;
      this.doSetDetailWorker();
    }
  }

  doBackWorker() {
    if (this.worker_index > 0) {
      this.worker_index--;
      this.doSetDetailWorker();
    }
  }
  doSetDetailWorker() {
    this.workerDetail = this.worker_list[this.worker_index];
    this.worker_code = this.workerDetail.worker_code;
    if (this.initial_current.Language == 'EN') {
      this.worker_name =
        this.workerDetail.worker_fname_en +
        ' ' +
        this.workerDetail.worker_lname_en;
    } else {
      this.worker_name =
        this.workerDetail.worker_fname_th +
        ' ' +
        this.workerDetail.worker_lname_th;
    }
    this.doLoadPayitem();
  }

  Items_List: ItemsModel[] = [];
  doLoadItemsList() {
    var tmp = new ItemsModel();
    this.itemService.item_get(tmp).then((res) => {
      this.Items_List = res;
    });
  }

  payitemINList:PayitemModel[] = [];
  payitemDEList:PayitemModel[] = [];
  payitemDetail:PayitemModel = new PayitemModel();
  async doLoadPayitem() {
    this.payitemINList = []; 
    this.payitemDEList = [];
    if(this.worker_code == ""){
      return;
    }

    this.payitemService.payitem_get(this.initial_current.CompCode,'',this.worker_code,'IN','').then((res)=>{
      this.payitemINList = res;
    })

    this.payitemService.payitem_get(this.initial_current.CompCode,'',this.worker_code,'DE','').then((res)=>{
      this.payitemDEList = res;
    })
    
  }


}

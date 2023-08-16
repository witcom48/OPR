import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, MenuItem, MessageService } from 'primeng/api';
import { AppConfig } from 'src/app/config/config';
import { InitialCurrent } from 'src/app/config/initial_current';
import { EmployeeModel } from 'src/app/models/employee/employee';
import { ItemsModel } from 'src/app/models/payroll/items';
import { PayitemModel } from 'src/app/models/payroll/payitem';
import { PayreduceModel } from 'src/app/models/payroll/payreduce';
import { PaytranModel } from 'src/app/models/payroll/paytran';
import { PaytranAccModel } from 'src/app/models/payroll/paytranacc';
import { EmployeeService } from 'src/app/services/emp/worker.service';
import { ItemService } from 'src/app/services/payroll/item.service';
import { PayitemService } from 'src/app/services/payroll/payitem.service';
import { PaytranService } from 'src/app/services/payroll/paytran.service';
import { PayReduceService } from 'src/app/services/payroll/payreduce.service'
import { AccessdataModel } from 'src/app/models/system/security/accessdata';
import { SearchEmpComponent } from '../../usercontrol/search-emp/search-emp.component';

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
  @ViewChild(SearchEmpComponent) searchEmp_popup: any;

  style_input_real: string = "[style]=\"{'width':'80px'}\\";
  dialog: any;
  dataSource: any;
  home: any;
  itemslike: MenuItem[] = [];
  title_btn_select: { [key: string]: string } = { EN: "Select", TH: "เลือก" }
  title_btn_close: { [key: string]: string } = { EN: "Close", TH: "ปิด" }
  title_payroll: { [key: string]: string } = { EN: "Payroll", TH: "Payroll" };
  title_page: { [key: string]: string } = { EN: "View Calculate", TH: "ตรวจสอบการคำนวน" };
  title_tax: { [key: string]: string } = { EN: "Tax", TH: "ภาษี" };
  title_income: { [key: string]: string } = { EN: "Income", TH: "เงินได้" };
  title_incomelist: { [key: string]: string } = { EN: "Income List", TH: "รายการเงินได้" };
  title_deduct: { [key: string]: string } = { EN: "Deduct", TH: "เงินหัก" };
  title_deductlist: { [key: string]: string } = { EN: "Deduct List", TH: "รายการเงินหัก" };
  title_incomename: { [key: string]: string } = { EN: "Income Name", TH: "ชื่อเงินได้" };
  title_deductname: { [key: string]: string } = { EN: "Deduct Name", TH: "ชื่อเงินหัก" };
  title_amount: { [key: string]: string } = { EN: "Amount", TH: "จำนวนเงิน" };
  title_quantity: { [key: string]: string } = { EN: "Quantity", TH: "ปริมาณ" };
  //
  title_ssolist: { [key: string]: string } = { EN: "Social", TH: "ประกันสังคม" };
  title_ssoemprate: { [key: string]: string } = { EN: "Employee rate", TH: "อัตราประกันสังคม (พนักงาน)" };
  title_ssoempamount: { [key: string]: string } = { EN: "Employee amount", TH: "ประกันสังคม (พนักงาน)" };
  title_ssocomrate: { [key: string]: string } = { EN: "Company rate", TH: "อัตราประกันสังคม (สมทบ)" };
  title_ssocomamount: { [key: string]: string } = { EN: "Company amount", TH: "ประกันสังคม (สมทบ)" };
  //
  title_pflist: { [key: string]: string } = { EN: "Provident Fund", TH: "กองทุนสำรองเลี้ยงชีพ" };
  title_pfemp: { [key: string]: string } = { EN: "Employee", TH: "กองทุนสำรองเลี้ยงชีพ (พนักงาน)" };
  title_pfcom: { [key: string]: string } = { EN: "Company", TH: "กองทุนสำรองเลี้ยงชีพ (สมทบ)" };
  //
  title_totallist: { [key: string]: string } = { EN: "Summary", TH: "ยอดรวม" };
  title_totaltax: { [key: string]: string } = { EN: "Tax", TH: "ภาษี" };
  title_totalincome: { [key: string]: string } = { EN: "Total income", TH: "รวมเงินได้" };
  title_totaldeduct: { [key: string]: string } = { EN: "Total deduct", TH: "รวมเงินหัก" };
  title_totalnetpay: { [key: string]: string } = { EN: "Netpay", TH: "ยอดสุทธิ" };
  //
  title_tranferlist: { [key: string]: string } = { EN: "Transfer", TH: "รูปแบบการจ่าย" };
  title_tranferC: { [key: string]: string } = { EN: "Cash", TH: "เงินสด" };
  title_tranferB: { [key: string]: string } = { EN: "Bank", TH: "โอนธนาคาร" };
  //
  title_sectionlist: { [key: string]: string } = { EN: "Income and Tax Under Section", TH: "เงินได้และภาษีแยกตามมาตรา" };
  title_section: { [key: string]: string } = { EN: "Section", TH: "มาตรา" };
  title_401: { [key: string]: string } = { EN: "Section 40 (1)", TH: "มาตรา 40 (1)" };
  title_4013: { [key: string]: string } = { EN: "Section 40 (1) withholding 3%", TH: "มาตรา 40 (1) หัก ณ ที่จ่าย 3%" };
  title_402: { [key: string]: string } = { EN: "Section 40 (2)", TH: "มาตรา (2)" };
  title_4012: { [key: string]: string } = { EN: "Section 40 (1)(2)", TH: "มาตรา 40 (1)(2)" };
  //
  title_reducelist: { [key: string]: string } = { EN: "Reduces", TH: "รายการค่าลดหย่อน" };
  title_reduceid: { [key: string]: string } = { EN: "Code", TH: "รหัส" };
  title_reducename: { [key: string]: string } = { EN: "Detail", TH: "รายละเอียด" };
  title_reduceamount: { [key: string]: string } = { EN: "Amount", TH: "จำนวนเงิน" };
  //
  title_accumulatelist: { [key: string]: string } = { EN: "Accumulate", TH: "รายการสะสม" };
  title_acclist: { [key: string]: string } = { EN: "List", TH: "รายการ" };
  title_accsalary: { [key: string]: string } = { EN: "Salary", TH: "เงินเดือนสะสม" };
  title_incometax: { [key: string]: string } = { EN: "Income Inc. Tax", TH: "เงินได้คำนวณภาษี" };
  title_incomenotax: { [key: string]: string } = { EN: "Income Not Inc. Tax", TH: "เงินได้ไม่คำนวณภาษี" };
  title_deducttax: { [key: string]: string } = { EN: "Deduct Inc. Tax", TH: "เงินหักคำนวณภาษี" };
  title_deductnotax: { [key: string]: string } = { EN: "Deduct Not Inc. Tax", TH: "เงินหักไม่คำนวณภาษี" };

  title_in401: { [key: string]: string } = { EN: "40 (1)", TH: "40 (1)" };
  title_in4013: { [key: string]: string } = { EN: "40 (1) withholding 3%", TH: "40 (1) หัก ณ ที่จ่าย 3%" };
  title_in402: { [key: string]: string } = { EN: "40 (2)", TH: "40 (2)" };
  title_in4012: { [key: string]: string } = { EN: "40 (1)(2)", TH: "40 (1)(2)" };

  title_tax401: { [key: string]: string } = { EN: "Tax 40 (1)", TH: "ภาษี 40 (1)" };
  title_tax4013: { [key: string]: string } = { EN: "Tax 40 (1) withholding 3%", TH: "ภาษี 40 (1) หัก ณ ที่จ่าย 3%" };
  title_tax402: { [key: string]: string } = { EN: "Tax 40 (2)", TH: "ภาษี 40 (2)" };
  title_tax4012: { [key: string]: string } = { EN: "Tax 40 (1)(2)", TH: "ภาษี 40 (1)(2)" };

  title_AccssoEmp: { [key: string]: string } = { EN: "Accumulate SSO(Emp.)", TH: "ประกันสังคมสะสม" };
  title_AccssoCom: { [key: string]: string } = { EN: "Accumulate SSO(Com.)", TH: "ประกันสังคมสมทบ" };
  title_AccpfEmp: { [key: string]: string } = { EN: "Accumulate PF(Emp.)", TH: "กองทุนฯสะสม" };
  title_AccpfCom: { [key: string]: string } = { EN: "Accumulate PF(Com.)", TH: "กองทุนฯสมทบ" };
  title_Accnetpay: { [key: string]: string } = { EN: "Neypay", TH: "รวมเงินได้สุทธิ" };
  title_Accbank: { [key: string]: string } = { EN: "Bank", TH: "โอนเข้าธนาคาร" };
  title_Acccash: { [key: string]: string } = { EN: "Cash", TH: "เงินสด" };
  //
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
    private paytranService: PaytranService,
    private payreduceService: PayReduceService,
  ) { }

  SetItems_List: PayitemModel[] = [];
  result_list: Result[] = [];
  item_list: PayitemModel[] = [];
  payitem_list: PayitemModel[] = [];

  payitems: PayitemModel = new PayitemModel();
  TypeList: Type[] = [];

  ngOnInit(): void {
    this.doGetInitialCurrent();
    this.itemslike = [{ label: this.title_page[this.initial_current.Language], styleClass: 'activelike' }];

    this.home = { icon: 'pi pi-home', routerLink: '/' };
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

  doReload() {
    this.doLoadPayitem();
    this.doLoadPaytran();
    this.doLoadPayreduce();
    this.doLoadPaytranAcc();
  }

  public initial_current: InitialCurrent = new InitialCurrent();
  initialData2: InitialCurrent = new InitialCurrent();
  accessData: AccessdataModel = new AccessdataModel();
  doGetInitialCurrent() {
    this.initial_current = JSON.parse(localStorage.getItem(AppConfig.SESSIONInitial) || '{}');
    if (!this.initial_current) {
      this.router.navigateByUrl('login');
    }
    this.accessData = this.initialData2.dotGetPolmenu('PAY');
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
    this.doReload();
  }

  Items_List: ItemsModel[] = [];
  doLoadItemsList() {
    var tmp = new ItemsModel();
    this.itemService.item_get(tmp).then((res) => {
      this.Items_List = res;
    });
  }

  payitemINList: PayitemModel[] = [];
  payitemDEList: PayitemModel[] = [];
  payitemDetail: PayitemModel = new PayitemModel();
  async doLoadPayitem() {
    this.payitemINList = [];
    this.payitemDEList = [];
    if (this.worker_code == "") {
      return;
    }

    this.payitemService.payitem_get(this.initial_current.CompCode, this.initial_current.PR_PayDate, this.worker_code, 'IN', '').then((res) => {
      this.payitemINList = res;
    })

    this.payitemService.payitem_get(this.initial_current.CompCode, this.initial_current.PR_PayDate, this.worker_code, 'DE', '').then((res) => {
      this.payitemDEList = res;
    })

  }

  // Paytran
  paytranList: PaytranModel[] = [];
  paytranDetail: PaytranModel = new PaytranModel();

  paytranAccList: PaytranAccModel[] = [];
  paytranDetailAcc: PaytranAccModel = new PaytranAccModel();

  public paytranTaxTotal: number = 0;

  doLoadPaytran() {

    this.paytranTaxTotal = 0;
    this.paytranDetail = new PaytranModel();

    if (this.worker_code == "") {
      return;
    }

    this.paytranList = [];
    this.paytranService.paytran_get(this.initial_current.CompCode, '', this.worker_code, this.initial_current.PR_PayDate, this.initial_current.PR_PayDate).then((res) => {

      this.paytranList = res;

      if (this.paytranList.length > 0) {
        this.paytranDetail = this.paytranList[0];


        this.paytranDetail.paytran_netpay = this.paytranDetail.paytran_netpay_b + this.paytranDetail.paytran_netpay_c;

        this.paytranTaxTotal = this.paytranDetail.paytran_tax_401 + this.paytranDetail.paytran_tax_4013 + this.paytranDetail.paytran_tax_402I + this.paytranDetail.paytran_tax_4012;
      }

    });
  }

  doLoadPaytranAcc() {
    this.paytranTaxTotal = 0;
    this.paytranDetailAcc = new PaytranAccModel();

    if (this.worker_code == "") {
      return;
    }

    this.paytranAccList = [];
    this.paytranService.paytranacc_get(this.initial_current.CompCode, this.worker_code, this.initial_current.PR_Year, this.initial_current.PR_PayDate).then((res) => {

      this.paytranAccList = res;

      console.log(res)

      if (this.paytranAccList.length > 0) {
        this.paytranDetailAcc = this.paytranAccList[0];

      }

      //console.log(response);      
    });
  }

  //-- Payreduce
  payreduceList: PayreduceModel[] = [];

  doLoadPayreduce() {
    this.payreduceList = [];
    if (this.worker_code == "") {
      return;
    }
    this.payreduceService.payreduce_get(this.initial_current.CompCode, '', this.worker_code, this.initial_current.PR_PayDate).then((res) => {
      this.payreduceList = res;
    });
  }

  
  hasAccessMenu(accessCode: string): boolean {
    return this.accessData.accessmenu_data.some(item => item.accessmenu_code === accessCode);
  }

  openSearchEmp(): void {
    const dialogRef = this.dialog.open(SearchEmpComponent, {
        width: '500px',
        height: '550px',
        data: {
            worker_code: ''
        }
    });
    dialogRef.afterClosed().subscribe((result: { worker_code: string; }) => {
        if (result.worker_code != "") {

            let select = result.worker_code;
            this.doGetIndexWorker(select);

        }
    });
}

  position: string = "right";
    searchEmp: boolean = false;
    open_searchemp() {
        console.log(this.searchEmp, 'test1')
        this.searchEmp = true
    }

    close_searchemp() {
        this.searchEmp = false
    }

    select_emp() {

        let select = this.searchEmp_popup.selectedEmployee.worker_code
        if (select != "") {
            this.doGetIndexWorker(select)
            this.searchEmp = false
            console.log( this.searchEmp)
        }

    }

    doGetIndexWorker(worker_code: string) {
        for (let i = 0; i < this.worker_list.length; i++) {
            if (this.worker_list[i].worker_code == worker_code) {
                this.worker_index = i;
                break;
            }
        }

        this.doSetDetailWorker();

    }


}
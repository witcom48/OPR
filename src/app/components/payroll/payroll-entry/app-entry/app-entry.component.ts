import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { ConfirmationService, MessageService, } from 'primeng/api';

import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

import { AppConfig } from '../../../../config/config';
import { InitialCurrent } from '../../../../config/initial_current';

import { EmployeeModel } from '../../../../models/employee/employee';
import { EmployeeService } from 'src/app/services/emp/worker.service';

import { DatePipe } from '@angular/common';
import { PayitemModel } from 'src/app/models/payroll/payitem';
import { PayitemService } from 'src/app/services/payroll/payitem.service';
import * as XLSX from 'xlsx';
import { ItemsModel } from 'src/app/models/payroll/items';
import { ItemService } from 'src/app/services/payroll/item.service';
import { SelectEmpComponent } from '../../../usercontrol/select-emp/select-emp.component';
import { SetitemsService } from 'src/app/services/payroll/batch/setitems.service';
import { AccessdataModel } from 'src/app/models/system/security/accessdata';
import { SearchItemComponent } from 'src/app/components/usercontrol/search-item/search-item.component';
declare var reason: any;
interface Type {
  name: string;
  code: string;
}
interface Policy {
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
  selector: 'app-app-entry',
  templateUrl: './app-entry.component.html',
  styleUrls: ['./app-entry.component.scss']
})
export class AppEntryComponent implements OnInit {

  @ViewChild(SearchItemComponent) searchitem_popup: any;

  dialog: any;
  dataSource: any;

  style_input_real: string = "[style]=\"{'width':'80px'}\\";

  constructor(
    private employeeService: EmployeeService,
    private router: Router,
    private route: ActivatedRoute,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private datePipe: DatePipe,

    //Service
    private payitemService: PayitemService,
    private itemService: ItemService,
    private setitemsService: SetitemsService
  ) { }
  @ViewChild(SelectEmpComponent) selectEmp: any;

  @ViewChild('TABLE') table: ElementRef | any = null;
  workerDetail: EmployeeModel = new EmployeeModel();
  worker_list: EmployeeModel[] = [];
  worker_index: number = 0;
  worker_code: string = '';
  worker_name: string = '';
  item: string = '';
  item_type: string = '';
  payitem: string = '';
  byitem_total: number = 0;
  byemp_income: number = 0;
  byemp_deduct: number = 0;
  byemp_netpay: number = 0;
  payitemDetail = new PayitemModel();
  item_index: number = 0;
  item_code: string = '';
  item_name_th: string = '';
  itemDetail: ItemsModel = new ItemsModel();
  Items_Lists: ItemsModel[] = [];
  new_data: boolean = false;
  edit_data: boolean = false;

  new_dataitem: boolean = false;
  edit_dataitem: boolean = false;

  loading: boolean = false;
  index: number = 0;

  menu_timecard: MenuItem[] = [];
  menu_Items: MenuItem[] = [];
  displayaddholiday: boolean = false;
  displayeditholiday: boolean = false;

  fileToUpload: File | any = null;
  displayUpload: boolean = false;

  SetItems_List: PayitemModel[] = [];

  result_list: Result[] = [];

  item_list: PayitemModel[] = [];
  payitem_list: PayitemModel[] = [];
  payitems: PayitemModel = new PayitemModel();
  TypeList: Type[] = [];
  selectedType: Type = { code: 'EMP', name: 'resignreq' };
  ngOnInit(): void {
    this.doGetInitialCurrent();

    this.doLoadLanguage();
    this.doLoadMenuItems();
    Promise.all([this.doGetItemList(), this.doLoaditem()])
      .then(() => {
        setTimeout(() => {
          this.item_index = 0;
          this.worker_index = 0;
          this.doSetDetailItem();

        }, 1500);
      })
      .catch((error) => {
        console.error(error);
      });

  }
  public initial_current: InitialCurrent = new InitialCurrent();
  initialData2: InitialCurrent = new InitialCurrent();
  accessData: AccessdataModel = new AccessdataModel();
  doGetInitialCurrent() {
    this.initial_current = JSON.parse(
      localStorage.getItem(AppConfig.SESSIONInitial) || '{}'
    );
    if (!this.initial_current) {
      this.router.navigateByUrl('login');
    }
    this.accessData = this.initialData2.dotGetPolmenu('PAY');

  }
  title_btn_select: { [key: string]: string } = { EN: "Select", TH: "เลือก" }
  title_btn_close: { [key: string]: string } = { EN: "Close", TH: "ปิด" }

  title_page: string = 'Geanral';
  title_new: string = 'New';
  title_edit: string = 'Edit';
  title_delete: string = 'Delete';
  title_import: string = 'Import';
  title_export: string = 'Export';
  title_save: string = 'Save';
  title_more: string = 'More';
  title_code: string = 'Code';
  title_codes: string = 'Code';
  title_codeitem: string = 'Code';
  title_name_th: string = 'Name (Thai)';
  title_name_en: string = 'Name (Eng.)';

  title_manage: string = 'ManageIncome/Deduct';
  title_payroll: string = 'Payroll';
  title_by_income: string = 'By Income';
  title_employee: string = 'Employee';
  title_details: string = 'Details';
  title_amount: string = 'Amount';
  title_bank_transfer_cash: string = 'Bank Transfer Cash';
  title_note: string = 'Note';
  title_quantity: string = 'Quantity';
  title_no: string = 'No.';
  title_date: string = 'Date';
  title_bank: string = 'Bank.';
  title_cash: string = 'Cash.';
  title_total: string = 'Total';
  title_income: string = 'Income';
  title_deduct: string = 'Deduct';
  title_net: string = 'Net Pay';
  title_dropfileshere: string = 'Drop files here';
  title_by_deduct: string = 'By Deduct';

  title_projectcode: string = 'Code';
  title_projectname: string = 'Name';
  title_protype: string = 'Type';
  title_probusiness: string = 'Business';
  title_fromdate: string = 'From';
  title_todate: string = 'To';
  title_manpower: string = 'Manpower';
  title_cost: string = 'Cost';
  title_status: string = 'Status';

  title_modified_by: string = 'Edit by';
  title_modified_date: string = 'Edit date';
  title_search: string = 'Search';
  title_upload: string = 'Upload';

  title_page_from: string = 'Showing';
  title_page_to: string = 'to';
  title_page_total: string = 'of';
  title_page_record: string = 'entries';

  title_confirm: string = 'Are you sure?';
  title_confirm_record: string = 'Confirm to record';
  title_confirm_delete: string = 'Confirm to delete';
  title_confirm_yes: string = 'Yes';
  title_confirm_no: string = 'No';

  title_confirm_cancel: string = 'You have cancelled';

  title_submit: string = 'Submit';
  title_cancel: string = 'Cancel';
  doLoadLanguage() {
    if (this.initial_current.Language == 'TH') {
      this.title_page = 'ข้อมูลทั่วไป';
      this.title_manage = 'บันทึกเงินได้/เงินหัก';
      this.title_payroll = 'บัญชี ';
      this.title_by_income = 'ตามรายได้ ';
      this.title_codeitem = 'รหัสเงินหัก ';
      this.title_employee = 'พนักงาน ';
      this.title_protype = 'ประเภท';
      this.title_date = 'วันที่จ่าย';
      this.title_codes = 'รหัสเงินได้';
      this.title_code = 'รหัส';
      this.title_details = 'รายละเอียด';
      this.title_amount = 'จำนวนเงิน';
      this.title_quantity = 'ปริมาณ';
      this.title_bank_transfer_cash = 'โอนธนาคาร/เงินสด';
      this.title_note = 'หมายเหตุ';
      this.title_no = 'ลำดับที่';
      this.title_bank = 'ธนาคาร';
      this.title_cash = 'เงินสด';
      this.title_total = 'ทั้งหมด';
      this.title_income = 'รายได้';
      this.title_deduct = 'หัก';
      this.title_net = 'จ่ายสุทธิ';
      this.title_dropfileshere = 'วางไฟล์ที่นี่';
      this.title_by_deduct = 'เงินหัก';

      this.title_new = 'เพิ่ม';
      this.title_edit = 'แก้ไข';
      this.title_delete = 'ลบ';
      this.title_import = 'นำเข้า';
      this.title_export = 'โอนออก';
      this.title_save = 'บันทึก';
      this.title_more = 'เพิ่มเติม';
      this.title_code = 'รหัส';
      this.title_name_th = 'ชื่อไทย';
      this.title_name_en = 'ชื่ออังกฤษ';
      this.title_modified_by = 'ผู้ทำรายการ';
      this.title_modified_date = 'วันที่ทำรายการ';
      this.title_search = 'ค้นหา';
      this.title_upload = 'อัพโหลด';

      this.title_page_from = 'แสดง';
      this.title_page_to = 'ถึง';
      this.title_page_total = 'จาก';
      this.title_page_record = 'รายการ';

      this.title_confirm = 'ยืนยันการทำรายการ';
      this.title_confirm_record = 'คุณต้องการบันทึกการทำรายการ';
      this.title_confirm_delete = 'คุณต้องการลบรายการ';

      this.title_confirm_yes = 'ใช่';
      this.title_confirm_no = 'ยกเลิก';
      this.title_confirm_cancel = 'คุณยกเลิกการทำรายการ';

      this.title_projectcode = 'โครงการ';
      this.title_projectname = 'ชื่อโครงการ';
      this.title_probusiness = 'ประเภทธุรกิจ';
      this.title_fromdate = 'จากวันที่';
      this.title_todate = 'ถึงวันที่';
      this.title_manpower = 'จำนวนพนักงาน';
      this.title_cost = 'ต้นทุน';
      this.title_status = 'สถานะ';
      this.title_submit = 'ตกลง';
      this.title_cancel = 'ปิด';
    }
  }

  displayManage: boolean = false;
  manage_title: string = 'ข้อมูลเวลา';
  showManage() {
    this.displayManage = true;
  }

  doUploadPayitem() {
    const filename =
      'PAYITEM_' + this.datePipe.transform(new Date(), 'yyyyMMddHHmm');
    const filetype = 'xls';
    this.payitemService
      .payitem_import(this.fileToUpload, filename, filetype)
      .then((res) => {
        if (res.success) {
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: res.message,
          });
          this.edit_data = false;
          this.new_data = false;
        } else {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: res.message,
          });
        }
        this.fileToUpload = null;
      });
  }

  // doGetItemList() {
  //     var tmp = new ItemsModel();
  //     this.itemService.item_get(tmp).then((res) => {
  //         this.Items_Lists = res;
  //         if (this.Items_Lists.length > 0) {
  //             this.doSetDetailItem();
  //         }
  //     });
  // }
  doGetItemList() {
    var tmp = new ItemsModel();
    this.itemService.item_get(tmp).then((res) => {
      this.Items_Lists = res.filter((item: { item_type: string }) => item.item_type === 'IN');

      if (this.Items_Lists.length > 0) {
        this.doSetDetailItem();
      }
    });
  }


  doNextItem() {
    if (this.item_index < this.Items_Lists.length - 1) {
      this.item_index++;
      this.doSetDetailItem();
    }
  }

  doBackItem() {
    if (this.item_index > 0) {
      this.item_index--;
      this.doSetDetailItem();
    }
  }
  async doLoaditem() {
    var tmp = new PayitemModel();
    tmp.item_code = this.item_code;
    tmp.worker_code = this.worker_code;

    try {
      const res = await this.payitemService.payitem_get(this.initial_current.CompCode, this.initial_current.PR_PayDate, tmp.worker_code, this.item_type, tmp.item_code);

      return res;
    } catch (error) { }
  }

  doSetDetailItem() {
    this.itemDetail = this.Items_Lists[this.item_index];
    this.item_code = this.itemDetail.item_code;


    if (this.initial_current.Language == 'EN') {
      this.item_name_th = this.itemDetail.item_name_en;
    } else {
      this.item_name_th = this.itemDetail.item_name_th;
    }

    this.doLoaditem().then((res) => {
      this.item_list = res;
      this.doSummaryByEmp();
    })
    // this.doSummaryByEmp();
  }
  reloadPage() {
    this.process()
}
  process() {
    this.result_list = [];
    if (this.selectEmp.employee_dest.length > 0) {
      this.SetTRpolItem();

    }
  }

  async SetTRpolItem() {
    var data = new PayitemModel();
    data.company_code = this.initial_current.CompCode;
    data.payitem_date = this.initial_current.PR_PayDate;

    data.emp_data = this.selectEmp.employee_dest;
    data.worker_code = this.workerDetail.worker_code;

    data.item_code = this.itemDetail.item_code;
    // data.payitem_date = this.payitems.payitem_date;
    data.payitem_amount = this.payitems.payitem_amount;
    data.payitem_quantity = this.payitems.payitem_quantity;
    data.payitem_paytype = this.payitems.payitem_paytype;
    data.payitem_note = this.payitems.payitem_note;
    data.item_detail = this.payitems.item_detail;
    data.item_type = this.payitems.item_type;
    data.modified_by = this.initial_current.Username;
    data.item_data = this.selectEmp.employee_dest;

    this.loading = true;
    await this.payitemService.setpayitems_record(this.initial_current.CompCode, data).then((res) => {
      if (res.success) {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: res.message,
        });
        this.doLoaditem();
        this.doSetDetailItem();

        this.edit_data = false;
      } else {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: res.message,
        });
      }
      this.loading = false;
    });
  }
  doSummaryByEmp() {
    this.byemp_income = 0;
    this.byemp_deduct = 0;
    this.byemp_netpay = 0;

    for (let i = 0; i < this.item_list.length; i++) {
      if (this.item_list[i].item_type === 'IN') {
        this.byemp_income += Number(this.item_list[i].payitem_amount);
      } else {
        this.byemp_deduct += Number(this.item_list[i].payitem_amount);
      }
    }

    this.byemp_netpay = Math.abs(this.byemp_income - this.byemp_deduct);
  }
  function(e: any) {
    var page = e.index;
    this.index = page;
    if (page == 1) {
      setTimeout(() => {
        this.new_dataitem = true;
      }, 300);
    } else {
      this.new_dataitem = false;
    }
  }
  closedispaly() {
    this.displayaddholiday = false;
    this.displayeditholiday = false;
  }

  doLoadMenuItems() {
    this.menu_Items = [
      {
        label: this.title_new,
        icon: 'pi-plus',
        command: (event) => {
          if (this.accessData.accessdata_new) {
            this.payitems = new PayitemModel();
            this.displayaddholiday = true;
            this.displayeditholiday = false;
            this.showManage();
          } else {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Permistion' });
          }
        },
      },
      {
        label: "Template",
        icon: 'pi-download',
        command: (event) => {
          window.open('assets/OPRFileImport/(OPR)Import Payroll/(OPR)Import Payroll Payitem.xlsx', '_blank');
        }



      },
      {
        label: this.title_edit,
        icon: 'pi pi-fw pi-pencil',
        command: (event) => {
          this.displayaddholiday = true;
          this.displayeditholiday = false;
          this.showManage();
          this.doLoaditem();
        },
      },
      {
        label: 'Add copy',
        icon: 'pi pi-fw pi-copy',
      },
      {
        label: this.title_delete,
        icon: 'pi pi-fw pi-trash',
        command: (event) => {
          this.Delete();
        },
      },
      {
        label: this.title_import,
        icon: 'pi-file-import',
        command: (event) => {
          this.showUpload();
        },
      },
      {
        label: this.title_export,
        icon: 'pi-file-export',
        command: (event) => {
          this.exportAsExcel();
        },
      },
    ];
  }

  Uploadfile() {
    if (this.fileToUpload) {
      this.confirmationService.confirm({
        message: 'Confirm Upload file : ' + this.fileToUpload.name,
        header: 'Import File',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
          this.displayUpload = false;
          this.doUploadPayitem();
        },
        reject: () => {
          this.displayUpload = false;
        },
      });
    } else {
      this.messageService.add({
        severity: 'warn',
        summary: 'File',
        detail: 'Please choose a file.',
      });
    }
  }
  close() {
    this.new_data = false;
    this.edit_data = false;
    this.payitems = new PayitemModel();
  }

  showUpload() {
    this.displayUpload = true;
  }

  handleFileInput(file: FileList) {
    this.fileToUpload = file.item(0);
  }
  Saveitem() {
    this.SetTRpolItem();
  }
  Delete() {
    this.doDeleteLate(this.payitems);
  }
  async doDeleteLate(data: PayitemModel) {
    try {
      this.loading = true;
      const res = await this.payitemService.payitem_delete(data);
      if (res.success) {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: res.message,
        });
        await this.doLoaditem();
        this.doSetDetailItem();
        this.edit_data = false;
        this.new_data = false;
      } else {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: res.message,
        });
      }
    } catch (error) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'An error occurred while deleting payitem.',
      });
    } finally {
      this.loading = false;
    }
  }

  selectType() {
    this.doLoaditem();
  }

  onRowSelect(event: any) {
    this.new_data = true;
    this.edit_data = true;
  }

  refreshPage() {
    location.reload();
  }

  openSearchItem(): void {
    const dialogRef = this.dialog.open(SearchItemComponent, {
      width: '1500px',
      height: '1550px',
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
  searchItem: boolean = false;
  open_searchItem() {
    this.searchItem = true
  }

  close_searchItem() {
    this.searchItem = false
  }


  select_item() {
    let select = this.searchitem_popup.selectedPayitem.item_code
    if (select != "") {
      this.doGetIndexWorker(select)
      this.searchItem = false
    }

  }

  doGetIndexWorker(item_code: string) {
    for (let i = 0; i < this.Items_Lists.length; i++) {
      if (this.Items_Lists[i].item_code == item_code) {
        this.item_index = i;
        break;
      }
    }

    this.doSetDetailItem();

  }
  exportAsExcel() {
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(this.table.nativeElement);//converts a DOM TABLE element to a worksheet
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    XLSX.writeFile(wb, 'Export_Reason.xlsx');

  }


}


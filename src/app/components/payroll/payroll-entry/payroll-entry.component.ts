import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {  MenuItem } from 'primeng/api';
import {ConfirmationService,MessageService,} from 'primeng/api';

import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

import { AppConfig } from '../../../config/config';
import { InitialCurrent } from '../../../config/initial_current';

import { EmployeeModel } from '../../../models/employee/employee';
import { EmployeeService } from 'src/app/services/emp/worker.service';

import { DatePipe } from '@angular/common';
import { PayitemModel } from 'src/app/models/payroll/payitem';
import { PayitemService } from 'src/app/services/payroll/payitem.service';
import * as XLSX from 'xlsx';
import { ItemsModel } from 'src/app/models/payroll/items';
import { ItemService } from 'src/app/services/payroll/item.service';
import { SelectEmpComponent } from '../../usercontrol/select-emp/select-emp.component';

import { SearchEmpComponent } from '../../usercontrol/search-emp/search-emp.component';

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
    selector: 'app-payroll-entry',
    templateUrl: './payroll-entry.component.html',
    styleUrls: ['./payroll-entry.component.scss'],
})
export class PayrollEntryComponent implements OnInit {


    @ViewChild(SearchEmpComponent) searchEmp_popup: any;

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
    ) {}
    @ViewChild(SelectEmpComponent) selectEmp: any;

    @ViewChild('TABLE') table: ElementRef | any = null;
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
        this.doLoadMenu();
        this.doLoadLanguage();
        // dropdown
        this.doLoadItemsList();

        Promise.all([this.doLoadEmployee(), this.doLoadPayitem()])
            .then(() => {
                setTimeout(() => {
                    this.worker_index = 0;
                    this.doSetDetailWorker();
                    
                }, 1000); 
            })
            .catch((error) => {
                console.error(error);
            });
    }
    public initial_current: InitialCurrent = new InitialCurrent();
    doGetInitialCurrent() {
        this.initial_current = JSON.parse(
            localStorage.getItem(AppConfig.SESSIONInitial) || '{}'
        );
        if (!this.initial_current) {
            this.router.navigateByUrl('login');
        }
    }

    title_btn_select: {[key: string]: string} = {  EN: "Select",  TH: "เลือก"}
    title_btn_close: {[key: string]: string} = {  EN: "Close",  TH: "ปิด"}

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

    title_manage : string = 'Manage Income/Deduct';
    title_payroll: string = 'Payroll';
    title_by_income: string = 'By Income';
    title_employee: string = 'Employee';
    title_details: string = 'Details';
    title_amount: string = 'Amount';
    title_bank_transfer_cash: string = 'Bank Transfer Cash';
    title_note: string = 'Note';
    title_quantity: string = 'Quantity';
    title_no: string = 'No.';
    title_date: string = 'Date.';
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
            this.title_manage  = 'บันทึกเงินได้/เงินหัก';
            this.title_payroll = 'บัญชีเงินเดือน ';
            this.title_by_income= 'ตามรายได้ ';
            this.title_codeitem= 'รหัสเงินหัก ';
            this.title_employee= 'พนักงาน ';
            this.title_protype = 'ประเภท';
            this.title_date = 'วันที่';
            this.title_codes = 'รหัสเงินได้';
            this.title_code = 'รหัส';
            this.title_details = 'รายละเอียด';
            this.title_amount= 'จำนวนเงิน';
            this.title_quantity= 'ปริมาณ';
            this.title_bank_transfer_cash = 'โอนธนาคาร/เงินสด';
            this.title_note= 'หมายเหตุ';
            this.title_no= 'ลำดับที่';
            this.title_bank= 'ธนาคาร';
            this.title_cash= 'เงินสด';
            this.title_total= 'ทั้งหมด';
            this.title_income= 'รายได้';
            this.title_deduct= 'หัก';
            this.title_net= 'จ่ายสุทธิ';
            this.title_dropfileshere= 'วางไฟล์ที่นี่';
            this.title_by_deduct= 'เงินหัก';




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
    doLoadMenu() {
        this.menu_timecard = [
            {
                label: this.title_new,
                icon: 'pi-plus',
                command: (event) => {
                    this.payitems = new PayitemModel();
                    this.new_data = true;
                    this.edit_data = false;
                    this.showManage();
                },
            },
            {
                label: this.title_edit,
                icon: 'pi pi-fw pi-pencil',
                command: (event) => {
                    this.new_data = true;
                    this.edit_data = false;
                    this.showManage();
                },
            },
            {
                label: this.title_delete,
                icon: 'pi pi-fw pi-trash',
                command: (event) => {
                    this.Delete();
                    this.doSetDetailWorker();
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

    displayManage: boolean = false;
    manage_title: string = 'ข้อมูลเวลา';
    showManage() {
        this.displayManage = true;
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

    //get  data dropdown
    Items_List: ItemsModel[] = [];
    doLoadItemsList() {
        var tmp = new ItemsModel();
        this.itemService.item_get(tmp).then((res) => {
            this.Items_List = res;
        });
    }

    async doLoadPayitem() {
        this.payitem_list = [];
        var tmp = new PayitemModel();
        tmp.worker_code = this.workerDetail.worker_code;

        try {
            const res = await this.payitemService.payitem_get(this.initial_current.CompCode, '', this.worker_code,'', this.item, this.initial_current.PR_PayDate);
            const inItems = res.filter((item: { item_type: string }) => item.item_type === 'IN');
            const deItems = res.filter((item: { item_type: string }) => item.item_type === 'DE');
            this.payitem_list = [...inItems, ...deItems];
        } catch (error) {
            console.log(error);
        }
        this.doSummaryByEmp();
    }
    async doRecordPayitem(data: PayitemModel) {
        data.worker_code = this.workerDetail.worker_code;

        try {
            const res = await this.payitemService.payitem_record(data);
            if (res.success) {
                this.messageService.add({
                    severity: 'success',
                    summary: 'Success',
                    detail: res.message,
                });
                await this.doLoadPayitem();
                this.doSetDetailWorker();
                console.log(this.payitem_list);
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
                detail: 'An error occurred while recording payitem.',
            });
        }

        this.new_data = false;
        this.edit_data = false;
    }

    doSummaryByEmp() {
        this.byemp_income = 0;
        this.byemp_deduct = 0;
        this.byemp_netpay = 0;

        for (let i = 0; i < this.payitem_list.length; i++) {
            if (this.payitem_list[i].item_type === 'IN') {
                this.byemp_income += Number(
                    this.payitem_list[i].payitem_amount
                );
            } else {
                this.byemp_deduct += Number(
                    this.payitem_list[i].payitem_amount
                );
            }
        }
        this.byemp_netpay = this.byemp_income - this.byemp_deduct;
        this.byemp_netpay = Math.abs(this.byemp_netpay);
    }
    async doDeletePayitem(data: PayitemModel) {
        try {
          const res = await this.payitemService.payitem_delete(data);
          console.log(res);
          if (res.success) {
            this.messageService.add({
              severity: 'success',
              summary: 'Success',
              detail: res.message,
            });
            await Promise.all([this.doLoadPayitem(), this.doSetDetailWorker()]);
            console.log(this.payitem_list);

            this.new_data = false;
            this.edit_data = false;
          } else {
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: res.message,
            });
          }
        } catch (error) {
          console.log('An error occurred while deleting payitem:', error);
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'An error occurred while deleting payitem',
          });
        }
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
                    this.doLoadPayitem();
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
    Save() {
        this.doRecordPayitem(this.payitems);
    }

    Delete() {
        this.doDeletePayitem(this.payitems);
    }

    selectType() {
        this.doLoadPayitem();

    }

    onRowSelect(event: any) {
        this.new_data = true;
        this.edit_data = true;
    }

    refreshPage() {
        location.reload();
    }

    exportAsExcel() {
        const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(
            this.table.nativeElement
        ); //converts a DOM TABLE element to a worksheet
        for (var i in ws) {
            if (i.startsWith('!') || i.charAt(1) !== '1') {
                continue;
            }
            var n = 0;
            for (var j in ws) {
                if (
                    j.startsWith(i.charAt(0)) &&
                    j.charAt(1) !== '1' &&
                    ws[i].v !== ''
                ) {
                    ws[j].v = ws[j].v.replace(ws[i].v, '');
                } else {
                    n += 1;
                }
            }
        }
        const wb: XLSX.WorkBook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

        XLSX.writeFile(wb, 'Export_Reason.xlsx');
    }


    position: string = "right";
    searchEmp: boolean = false;
    open_searchemp(){
        this.searchEmp = true
    }

    close_searchemp(){
        this.searchEmp = false
    }

    select_emp(){
        
        let select = this.searchEmp_popup.selectedEmployee.worker_code
        if(select != ""){
        this.doGetIndexWorker(select)
        this.searchEmp = false      
        }

    }

    doGetIndexWorker(worker_code:string){
        for (let i = 0; i < this.worker_list.length; i++) {
            if(this.worker_list[i].worker_code==worker_code ){
                this.worker_index = i;
                break;
            }
        }

        this.doSetDetailWorker();

    }

}

//   toolbar_menu: MenuItem[] = [];
//   items: MenuItem[] = [];
//   items_tab: MenuItem[] = [];

//   constructor() { }

//   ngOnInit(): void {

//     this.doLoadSimple()
//   }

//   doLoadSimple(){
//     this.toolbar_menu = [
//       {
//         label:'Save',
//         icon:'pi pi-fw pi-save',

//       },
//       {
//           label:'Export',
//           icon:'pi pi-fw pi-file-export',
//           command: (event) => {
//             console.log('Edit')
//         }
//       }
//       ,
//       {
//           label:'Import',
//           icon:'pi pi-fw pi-file-import',
//           command: (event) => {
//             console.log('Edit')
//         }
//       }
//     ];

// this.items = [

//   {
//     label:'New',
//     icon:'pi pi-fw pi-plus',

//   },
// {
//     label:'Edit',
//     icon:'pi pi-fw pi-pencil',
//     command: (event) => {
//       console.log('Edit')
//   }
// }
// ,
// {
//     label:'Add copy',
//     icon:'pi pi-fw pi-copy',
// }
// ,
// {
//     label:'Delete',
//     icon:'pi pi-fw pi-trash',
// }
// ,
//   {
//       label:'Import',
//       icon:'pi pi-fw pi-file-import',
//   }
//   ,
//   {
//       label:'Export',
//       icon:'pi pi-fw pi-file-export',
//   }

// ];

//   }

// }

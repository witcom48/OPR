import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { SelectEmpComponent } from 'src/app/components/usercontrol/select-emp/select-emp.component';
import { TaskComponent } from 'src/app/components/usercontrol/task/task.component';
import { AppConfig } from 'src/app/config/config';
import { InitialCurrent } from 'src/app/config/initial_current';
import { SetProvidentModel } from 'src/app/models/payroll/batch/setprovident';
import { ProvidentModel } from 'src/app/models/payroll/provident';
import { SetprovidentService } from 'src/app/services/payroll/batch/setprovident.service';
import { ProvidentService } from 'src/app/services/payroll/provident.service';
import { TaskService } from 'src/app/services/task.service';
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
    selector: 'app-setprovident',
    templateUrl: './setprovident.component.html',
    styleUrls: ['./setprovident.component.scss'],
})
export class SetprovidentComponent implements OnInit {
    @ViewChild(SelectEmpComponent) selectEmp: any;
    @ViewChild(TaskComponent) taskView: any;
    @Input() policy_list: Policy[] = [];
    @Input() title: string = '';
    loading: boolean = false;
    index: number = 0;
    result_list: Result[] = [];
    SetProvident_List: SetProvidentModel[] = [];
    edit_data: boolean = false;
    dt2: any;
    constructor(
        private messageService: MessageService,
        private confirmationService: ConfirmationService,
        private taskService: TaskService,
        private router: Router,
        private providentService: ProvidentService,
        private setprovidentService: SetprovidentService
    ) {}
    new_data: boolean = false;
    ngOnInit(): void {
        this.doGetInitialCurrent();
        this.doLoadLanguage();

        //dropdown
        this.doLoadTRpolProvidentList();
        this.doLoadSetProvidentList();
    }
    title_policy: string = 'Set Policy';
    title_page: string = 'Set Provident Fund';
    title_new: string = 'New';
    title_name_policy: string = 'Policy';
    title_payroll: string = 'Payroll';

    title_worker_code: string = 'Worker';
    title_type: string = 'Type';
    title_regular: string = 'Regular';
    title_income: string = 'Income';
    title_deduct: string = 'Deduct';
    title_Workage: string = 'Workage';
    
    title_Item: string = 'Income ID';
    title_Rate: string = 'Rate';
    title_From: string = 'From';
    title_no: string = 'No';

    title_edit: string = 'Edit';
    title_delete: string = 'Delete';
    title_import: string = 'Import';
    title_export: string = 'Export';
    title_save: string = 'Save';
    title_code: string = 'Code';
    title_name_th: string = 'Name (Thai)';
    title_name_en: string = 'Name (Eng.)';
    title_detail_en: string = 'Description(Eng)';
    title_detail_th: string = 'Description(Thai)';
    title_modified_by: string = 'Edit by';
    title_modified_date: string = 'Edit date';
    title_search: string = 'Search';
    title_upload: string = 'Upload';

    title_page_from: string = 'Showing';
    title_page_to: string = 'to';
    title_page_total: string = 'of';
    title_page_record: string = 'entries';

    title_confirm: string = 'Are you sure?';
    title_confirm_record: string = 'Confirm to process';
    title_confirm_delete: string = 'Confirm to delete';
    title_confirm_yes: string = 'Yes';
    title_confirm_no: string = 'No';
    title_confirm_cancel: string = 'You have cancelled';
    title_submit: string = 'Submit';
    title_cancel: string = 'Cancel';


    doLoadLanguage() {
        if (this.initial_current.Language == 'TH') {
                                    this.title_payroll= 'บัญชีเงินเดือน';

            this.title_policy = 'นโยบาย';
            this.title_page = 'กำหนดสิทธิกองทุนสำรองฯ';
            this.title_name_policy= 'นโยบาย';
            this.title_new = 'เพิ่ม';
            this.title_type = 'ประเภท';
            this.title_regular = 'รูปแบบ';
            this.title_worker_code = 'พนักงาน';
            this.title_Item = 'รหัสเงินได้';
            this.title_Workage = 'อัตราตามอายุงาน';
            this.title_Rate = 'อัตรา';
            this.title_From = 'จาก';
            this.title_no = 'อันดับ';

            this.title_edit = 'แก้ไข';
            this.title_delete = 'ลบ';
            this.title_import = 'นำเข้า';
            this.title_export = 'โอนออก';
            this.title_save = 'บันทึก';
            this.title_code = 'รหัส';

            this.title_detail_en = 'รายละเอียด อังกฤษ';
            this.title_detail_th = 'รายละเอียด ไทย';
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
        }
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

    //get  data dropdown
    TRpolProvidentList: ProvidentModel[] = [];
    doLoadTRpolProvidentList() {
        var tmp = new ProvidentModel();
        this.providentService.provident_get(tmp).then((res) => {
            this.TRpolProvidentList = res;
        });
    }

    //get  data SetProvident
    doLoadSetProvidentList() {
        this.SetProvident_List = [];
        var tmp = new SetProvidentModel();
        this.setprovidentService.SetProvident_get(tmp).then(async (res) => {
            this.SetProvident_List = await res;
        });
    }

    selectedTRpolProvident: ProvidentModel = new ProvidentModel();
    process() {
        this.result_list = [];
        if (this.selectEmp.employee_dest.length > 0) {
            this.SetTRpolProvident();
        }
    }

    async SetTRpolProvident() {
        var data = new SetProvidentModel();
        (data.company_code = this.initial_current.CompCode),
            (data.emp_data = this.selectEmp.employee_dest);
        data.paypolprovident_code =
            this.selectedTRpolProvident.paypolprovident_code;
        data.modified_by = this.initial_current.Username;
        data.provident_data = this.selectEmp.employee_dest;

        this.loading = true;
        console.log(data);
        await this.setprovidentService.SetProvident_record(data).then((res) => {
            console.log(res);
            if (res.success) {
                console.log(res.message);
                this.messageService.add({
                    severity: 'success',
                    summary: 'Success',
                    detail: res.message,
                });
                this.doLoadSetProvidentList();
                this.edit_data = false;
                this.new_data;
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

    Delete(data: SetProvidentModel) {
        if (this.selectedTRpolProvident) {
            this.doDeleteLate(data);
        }
    }

    async doDeleteLate(data: SetProvidentModel) {
        this.loading = true;
        console.log(data);
        await this.setprovidentService.SetProvident_delete(data).then((res) => {
            console.log(res);
            this.SetProvident_List = this.SetProvident_List.filter(
                (item) => item !== data
            );
            if (res.success) {
                this.messageService.add({
                    severity: 'success',
                    summary: 'Success',
                    detail: res.message,
                });
                this.doLoadSetProvidentList();
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

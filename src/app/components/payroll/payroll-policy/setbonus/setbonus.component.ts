import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { SelectEmpComponent } from 'src/app/components/usercontrol/select-emp/select-emp.component';
import { TaskComponent } from 'src/app/components/usercontrol/task/task.component';
import { AppConfig } from 'src/app/config/config';
import { InitialCurrent } from 'src/app/config/initial_current';
import { SetBonusModel } from 'src/app/models/payroll/batch/setbonus';
import { BonusModel } from 'src/app/models/payroll/bonus';
import { SetbonusService } from 'src/app/services/payroll/batch/setbonus.service';
import { BonusService } from 'src/app/services/payroll/bonus.service';
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
    selector: 'app-setbonus',
    templateUrl: './setbonus.component.html',
    styleUrls: ['./setbonus.component.scss'],
})
export class SetbonusComponent implements OnInit {
    @ViewChild(SelectEmpComponent) selectEmp: any;
    @ViewChild(TaskComponent) taskView: any;

    @Input() policy_list: Policy[] = [];
    @Input() title: string = '';
    loading: boolean = false;
    index: number = 0;
    result_list: Result[] = [];
    SetBonus_List: SetBonusModel[] = [];
    edit_data: boolean = false;
    dt2: any;

    constructor(
        private messageService: MessageService,
        private confirmationService: ConfirmationService,
        private taskService: TaskService,
        private router: Router,
        private bonusService: BonusService,
        private setbonusService: SetbonusService
    ) {}
    new_data: boolean = false;
    
    ngOnInit(): void {
        this.doGetInitialCurrent();
        this.doLoadSetBonusList();
        this.doLoadLanguage();
        //dropdown
        this.doLoadTRBonusList();
        
    }
    title_payroll: string = 'Payroll';

    title_policy: string = 'Set Policy';
    title_page: string = 'Set Bonus';
    title_new: string = 'New';
    title_name_policy: string = 'Policy';

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

    title_system_Policy: string = 'Policy';
    title_Process: string = 'Process';
    title_Result: string = 'Result';
 

    doLoadLanguage() {
        if (this.initial_current.Language == 'TH') {
            this.title_payroll= 'บัญชี';
            this.title_system_Policy= 'นโยบาย';
            this.title_Process= 'กระบวนการ';
            this.title_Result= 'ผลลัพธ์';
            
            this.title_policy = 'นโยบาย';
            this.title_page = 'กำหนดนโยบายโบนัส';
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
    trbonusList: BonusModel[] = [];
    doLoadTRBonusList() {
        var tmp = new BonusModel();
        this.bonusService.bonus_get(tmp).then((res) => {
            this.trbonusList = res;
        });
    }

    //get  data SetBonus
    doLoadSetBonusList() {
        this.SetBonus_List = [];
        var tmp = new SetBonusModel();
        this.setbonusService.SetBonus_get('', tmp).then(async (res) => {
            this.SetBonus_List = await res;
        });
    }

    selectedTRbonus: BonusModel = new BonusModel();
    process() {
        this.result_list = [];
        if (this.selectEmp.employee_dest.length > 0) {
            this.Setbatchbonus();
        }
    }

    async Setbatchbonus() {
        var data = new SetBonusModel();
        (data.company_code = this.initial_current.CompCode),
            (data.emp_data = this.selectEmp.employee_dest);
        data.paypolbonus_code = this.selectedTRbonus.paypolbonus_code;
        data.modified_by = this.initial_current.Username;
        data.bonus_data = this.selectEmp.employee_dest;

        this.loading = true;
        console.log(data);
        await this.setbonusService
            .SetBonus_record('', data)
            .then((res) => {
                console.log(res);
                if (res.success) {
                    console.log(res.message);
                    this.messageService.add({
                        severity: 'success',
                        summary: 'Success',
                        detail: res.message,
                    });
                    this.doLoadSetBonusList();
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
    close() {
        this.selectEmp = new SetBonusModel();
    }
    Delete(data: SetBonusModel) {
        if (this.selectedTRbonus) {
            this.doDeleteLate(data);
        }
    }

    async doDeleteLate(data: SetBonusModel) {
        this.loading = true;
        console.log(data);
        await this.setbonusService.SetBonus_delete(data).then((res) => {
            console.log(res);
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

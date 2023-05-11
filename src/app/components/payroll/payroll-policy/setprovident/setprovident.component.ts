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
    title_confirm: string = 'Are you sure?';
    title_confirm_record: string = 'Confirm to process';
    title_confirm_delete: string = 'Confirm to delete';
    title_confirm_yes: string = 'Yes';
    title_confirm_no: string = 'No';
    title_confirm_cancel: string = 'You have cancelled';
    title_submit: string = 'Submit';
    title_cancel: string = 'Cancel';

    @Input() policy_list: Policy[] = [];
    @Input() title: string = '';
    loading: boolean = false;
    index: number = 0;
    result_list: Result[] = [];

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
        //dropdown
        this.doLoadTRpolProvidentList();
        this.doLoadSetProvidentList();
    }

    public initial_current: InitialCurrent = new InitialCurrent();
    doGetInitialCurrent() {
        this.initial_current = JSON.parse(
            localStorage.getItem(AppConfig.SESSIONInitial) || '{}'
        );
        if (!this.initial_current) {
            this.router.navigateByUrl('');
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
      SetProvident_List: SetProvidentModel[] = [];
      doLoadSetProvidentList() {
          var tmp = new SetProvidentModel();
          this.setprovidentService.SetProvident_get(tmp).then((res) => {
              this.SetProvident_List = res;
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

        data.worker_detail = this.selectedTRpolProvident.worker_detail;

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

import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { SelectEmpComponent } from 'src/app/components/usercontrol/select-emp/select-emp.component';
import { TaskComponent } from 'src/app/components/usercontrol/task/task.component';
import { AppConfig } from 'src/app/config/config';
import { InitialCurrent } from 'src/app/config/initial_current';
import { SetItemModel } from 'src/app/models/payroll/batch/setitem';
import { ItemsModel } from 'src/app/models/payroll/items';
import { SetitemsService } from 'src/app/services/payroll/batch/setitems.service';
import { ItemService } from 'src/app/services/payroll/item.service';
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
  selector: 'app-setitems',
  templateUrl: './setitems.component.html',
  styleUrls: ['./setitems.component.scss']
})
export class SetitemsComponent implements OnInit {
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
        private itemService: ItemService,
        private setitemsService: SetitemsService
    ) {}
    new_data: boolean = false;
    ngOnInit(): void {
        this.doGetInitialCurrent();
        //dropdown
        this.doLoadItemsList();
        this.doLoadItemList();
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
    Items_List: ItemsModel[] = [];
    doLoadItemsList() {
        var tmp = new ItemsModel();
        this.itemService.item_get(tmp).then((res) => {
            this.Items_List = res;
        });
    }

      //get  data SetItem
      Item_List: SetItemModel[] = [];
      doLoadItemList() {
          var tmp = new SetItemModel();
          this.setitemsService.SetItems_get(tmp).then((res) => {
              this.Item_List = res;
          });
      }

    selectedTRItem: ItemsModel = new ItemsModel();
    process() {
        this.result_list = [];
        if (this.selectEmp.employee_dest.length > 0) {
            this.SetTRpolItem();
        }
    }

    async SetTRpolItem() {
        var data = new SetItemModel();
        data.company_code = this.initial_current.CompCode,
        data.emp_data = this.selectEmp.employee_dest;
        data.paypolitem_code =this.selectedTRItem.paypolitem_code;
        data.worker_detail = this.selectedTRItem.worker_detail;

        data.modified_by = this.initial_current.Username;
        data.items_data = this.selectEmp.employee_dest;

        this.loading = true;
        console.log(data);
        await this.setitemsService.SetItems_record(data).then((res) => {
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

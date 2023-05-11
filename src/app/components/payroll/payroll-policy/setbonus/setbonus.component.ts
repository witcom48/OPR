import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { SelectEmpComponent } from 'src/app/components/usercontrol/select-emp/select-emp.component';
import { TaskComponent } from 'src/app/components/usercontrol/task/task.component';
import { AppConfig } from 'src/app/config/config';
import { InitialCurrent } from 'src/app/config/initial_current';
import { SetBonusModel } from 'src/app/models/payroll/batch/setbonus';
import { BonusModel } from 'src/app/models/payroll/bonus';
import { BonusService } from 'src/app/services/payroll/bonus.service';
import { SetpayrollDetailService } from 'src/app/services/payroll/setpayroll-detail.service';
import { TaskService } from 'src/app/services/task.service';

interface Policy {
  name: string,
  code: string
}
interface Result {
  worker: string,
  policy: string,
  modified_by: string,
  modified_date: string,
}
@Component({
  selector: 'app-setbonus',
  templateUrl: './setbonus.component.html',
  styleUrls: ['./setbonus.component.scss']
})
export class SetbonusComponent implements OnInit {

    @ViewChild(SelectEmpComponent) selectEmp: any;
    @ViewChild(TaskComponent) taskView: any;
    title_confirm:string = "Are you sure?";
    title_confirm_record:string = "Confirm to process";
    title_confirm_delete:string = "Confirm to delete";
    title_confirm_yes:string = "Yes";
    title_confirm_no:string = "No";
    title_confirm_cancel:string = "You have cancelled";
    title_submit:string = "Submit";
    title_cancel:string = "Cancel";

    @Input() policy_list: Policy[] = []
    @Input() title: string = "";
    loading: boolean = false;
    index: number = 0;
    result_list: Result[] = [];

    constructor(
      private messageService: MessageService,
      private confirmationService: ConfirmationService,
      private taskService: TaskService,
      private router:Router,
      private bonusService: BonusService,
      private setpayrollDetailService: SetpayrollDetailService,
      ) { }
      new_data: boolean = false;
    ngOnInit(): void {
      this.doGetInitialCurrent();
      //dropdown
      this.doLoadTRBonusList();
      this.doLoadSetBonusList();
    }

    public initial_current: InitialCurrent = new InitialCurrent();
    doGetInitialCurrent() {
      this.initial_current = JSON.parse(localStorage.getItem(AppConfig.SESSIONInitial) || '{}');
      if (!this.initial_current) {
        this.router.navigateByUrl('');
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


         //get  data SetItem
         SetBonus_List: SetBonusModel[] = [];
         doLoadSetBonusList() {
             var tmp = new SetBonusModel();
             this.setpayrollDetailService.SetBonus_get('',tmp).then((res) => {
                 this.SetBonus_List = res;
             });
         }

    // TRbonussList: BonusModel[] = [];



    selectedTRbonus: BonusModel = new BonusModel();
    process(){
      this.result_list = [];
      if (this.selectEmp.employee_dest.length > 0) {
        this.Setbatchbonus();
      }
    }

    async Setbatchbonus(){
      var data = new SetBonusModel();
      data.company_code = this.initial_current.CompCode,
      data.emp_data = this.selectEmp.employee_dest;
      data.paypolbonus_code = this.selectedTRbonus.paypolbonus_code;
      data.worker_detail = this.selectedTRbonus.worker_detail;

      data.modified_by = this.initial_current.Username
      data.bonus_data = this.selectEmp.employee_dest;

      this.loading = true;
      console.log(data)
      await this.setpayrollDetailService.SetBonus_record("",data).then((res) => {
        console.log(res)
        if (res.success) {
          console.log(res.message)
          this.messageService.add({ severity: 'success', summary: 'Success', detail: res.message });
        }
        else {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: res.message });
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

import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { SelectEmpComponent } from 'src/app/components/usercontrol/select-emp/select-emp.component';
import { TaskComponent } from 'src/app/components/usercontrol/task/task.component';
import { AppConfig } from 'src/app/config/config';
import { InitialCurrent } from 'src/app/config/initial_current';
import { EmpDepModel } from 'src/app/models/employee/manage/dep';
import { PartModel } from 'src/app/models/employee/policy/part';
import { PartService } from 'src/app/services/emp/policy/part.service';
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
  selector: 'app-empsetdep',
  templateUrl: './empsetdep.component.html',
  styleUrls: ['./empsetdep.component.scss']
})
export class EmpsetdepComponent implements OnInit {
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
  index: number = 0;
  
  constructor(
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private taskService: TaskService,
    private router:Router,
    private depService: PartService,
    ) { }

  new_data: boolean = false;


  ngOnInit(): void {

    this.doGetInitialCurrent();

    this.doLoadDepList();
  }
  
  public initial_current: InitialCurrent = new InitialCurrent();
  doGetInitialCurrent() {
    this.initial_current = JSON.parse(localStorage.getItem(AppConfig.SESSIONInitial) || '{}');
    if (!this.initial_current) {
      this.router.navigateByUrl('');
    }
  }

  //get dep
  depList : PartModel[]=[];
  doLoadDepList(){
    this.depService.dep_get().then(async(res)=>{
      this.depList = await res;
    })
  }

  selectedEmpDep: EmpDepModel = new EmpDepModel();
  
  process(){

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

import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { SelectEmpComponent } from 'src/app/components/usercontrol/select-emp/select-emp.component';
import { TaskComponent } from 'src/app/components/usercontrol/task/task.component';
import { AppConfig } from 'src/app/config/config';
import { InitialCurrent } from 'src/app/config/initial_current';
import { EmpGroupModel } from 'src/app/models/employee/manage/empgroup';
import { GroupModel } from 'src/app/models/employee/policy/group';
import { GroupService } from 'src/app/services/emp/policy/group.service';

interface Policy {
  name: string,
  code: string
}

@Component({
  selector: 'app-empsetgroup',
  templateUrl: './empsetgroup.component.html',
  styleUrls: ['./empsetgroup.component.scss']
})
export class EmpsetgroupComponent implements OnInit {

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
    private router:Router,
    private groupService : GroupService,
  ) { }

  new_data: boolean = false;

  ngOnInit(): void {

    this.doGetInitialCurrent();

    //dropdown
    this.doLoadGroupList();
  }

public initial_current: InitialCurrent = new InitialCurrent();
  doGetInitialCurrent() {
    this.initial_current = JSON.parse(localStorage.getItem(AppConfig.SESSIONInitial) || '{}');
    if (!this.initial_current) {
      this.router.navigateByUrl('');
    }
  }
  
  groupList: GroupModel[]=[];
  doLoadGroupList(){
    this.groupService.group_get().then(async(res)=>{
      this.groupList = await res;
    })
  }

  selectedEmpGroup: EmpGroupModel = new EmpGroupModel();
  
  process(){}

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

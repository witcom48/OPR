import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { SelectEmpComponent } from 'src/app/components/usercontrol/select-emp/select-emp.component';
import { TaskComponent } from 'src/app/components/usercontrol/task/task.component';
import { AppConfig } from 'src/app/config/config';
import { InitialCurrent } from 'src/app/config/initial_current';
import { EmpLocationModel } from 'src/app/models/employee/manage/emplocation';
import { SetLocationModel } from 'src/app/models/employee/policy/batch/setlocation';
import { LocationModel } from 'src/app/models/system/policy/location';
import { SetEmpDetailService } from 'src/app/services/emp/policy/setemp_detail.service';
import { LocationService } from 'src/app/services/system/policy/location.service';
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
  selector: 'app-empsetlocation',
  templateUrl: './empsetlocation.component.html',
  styleUrls: ['./empsetlocation.component.scss']
})
export class EmpsetlocationComponent implements OnInit {

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
    private setempdetailService: SetEmpDetailService,
    private locationService : LocationService
  ) { }

  new_data: boolean = false;

  ngOnInit(): void {

    this.doGetInitialCurrent();

    //dropdown
    this.doLoadLocationList();
  }

  public initial_current: InitialCurrent = new InitialCurrent();
  doGetInitialCurrent() {
    this.initial_current = JSON.parse(localStorage.getItem(AppConfig.SESSIONInitial) || '{}');
    if (!this.initial_current) {
      this.router.navigateByUrl('');
    }
  }

  locationList: LocationModel[]=[];
  doLoadLocationList(){
    var tmp = new LocationModel();
    this.locationService.location_get(tmp).then(async(res)=>{
      this.locationList = await res;
    })
  }

  selectedEmpLocation: EmpLocationModel = new EmpLocationModel();
  emplocationList: EmpLocationModel[]=[];

  process(){
    this.result_list = [];
    if(this.selectEmp.employee_dest.length >0){
      this.Setbatchlocation()
    }
  }

  async Setbatchlocation(){
    var data = new SetLocationModel();
    data.location_code = this.selectedEmpLocation.location_code;
    data.emplocation_startdate = this.selectedEmpLocation.emplocation_startdate;
    data.emplocation_enddate = this.selectedEmpLocation.emplocation_enddate;
    data.emplocation_note = this.selectedEmpLocation.emplocation_note;
    data.company_code = this.initial_current.CompCode;
    data.modified_by = this.initial_current.Username;
    data.emp_data = this.selectEmp.employee_dest;
    this.loading = true;
    await this.setempdetailService.SetLocation_record(data).then((res)=>{
      if (res.success){
        this.messageService.add({ severity: 'success', summary: 'Success', detail: res.message });
      }else{
        this.messageService.add({ severity: 'error', summary: 'Error', detail: res.message });
      }
    })
    this.loading = false;
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

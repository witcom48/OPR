import { Component, OnInit } from '@angular/core';
import { PrjectEmpdailyModel } from '../../../models/project/project_empdaily';


@Component({
  selector: 'app-payroll-calculate',
  templateUrl: './payroll-calculate.component.html',
  styleUrls: ['./payroll-calculate.component.scss']
})
export class PayrollCalculateComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    this.doLoadEmp()
  }

  timesheet_list: PrjectEmpdailyModel[] = [];
  timesheet_dest: PrjectEmpdailyModel[] = [];
  selectedDate: PrjectEmpdailyModel = new PrjectEmpdailyModel;
  doLoadEmp(){
    var tmp = new PrjectEmpdailyModel();

    tmp.daily_id = "00001";
    tmp.ppos_code = "70001";
    tmp.ppos_name_th = "พนักงานทำความสะอาด";
    tmp.emp_code = "220108001";
    tmp.emp_name = "นายศรัณย์ ศรีห่วง";
    tmp.emp_position = "พนักงานประจำ";  
    this.timesheet_list.push(tmp);

    tmp = new PrjectEmpdailyModel();

    tmp.daily_id = "00001";
    tmp.ppos_code = "70001";
    tmp.ppos_name_th = "พนักงานทำความสะอาด";
    tmp.emp_code = "220108002";
    tmp.emp_name = "นายมานะ บากบัน";
    tmp.emp_position = "พนักงานประจำ";   
    this.timesheet_list.push(tmp);

    tmp = new PrjectEmpdailyModel();

    tmp.daily_id = "00001";
    tmp.ppos_code = "70001";
    tmp.ppos_name_th = "พนักงานทำความสะอาด";
    tmp.emp_code = "220108003";
    tmp.emp_name = "นายขยัน ทำงานจริง";
    tmp.emp_position = "พนักงานประจำ";  
    this.timesheet_list.push(tmp);

    
  }

}

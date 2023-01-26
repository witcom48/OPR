import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Table } from 'primeng/table';
import { PrjectEmpdailyModel } from '../../../models/project/project_empdaily';
interface Policy {
  name: string,
  code: string
}
interface Result {
  worker: string,
  policy: string,
  modied_by: string,
  modied_date: string,
}
@Component({
  selector: 'app-attendance-process',
  templateUrl: './attendance-process.component.html',
  styleUrls: ['./attendance-process.component.scss']
})

export class AttendanceProcessComponent implements OnInit {
  @Input() policy_list: Policy[] = []
  @Input() title: string = "";
  index: number = 0;
  constructor() { }
  timesheet_list: PrjectEmpdailyModel[] = [];
  timesheet_dest: PrjectEmpdailyModel[] = [];
  result_list: Result[] = [];
  selectedDate: PrjectEmpdailyModel = new PrjectEmpdailyModel;
  policyselect!: Policy;
  new_data: boolean = false;
  @ViewChild('dt2') table: Table | undefined;
  ngOnInit(): void {
    this.doLoadEmp()
    this.policyselect =
    {
      name: this.policy_list[0].name,
      code: this.policy_list[0].code
    }
    console.log(this.result_list)
  }


  doLoadEmp() {
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
    tmp = new PrjectEmpdailyModel();

    tmp.daily_id = "00001";
    tmp.ppos_code = "70001";
    tmp.ppos_name_th = "พนักงานทำความสะอาด";
    tmp.emp_code = "220108004";
    tmp.emp_name = "นายขยัน ทำงานจริง";
    tmp.emp_position = "พนักงานประจำ";
    this.timesheet_list.push(tmp);
    tmp = new PrjectEmpdailyModel();

    tmp.daily_id = "00001";
    tmp.ppos_code = "70001";
    tmp.ppos_name_th = "พนักงานทำความสะอาด";
    tmp.emp_code = "220108005";
    tmp.emp_name = "นายขยัน ทำงานจริง";
    tmp.emp_position = "พนักงานประจำ";
    this.timesheet_list.push(tmp);
    tmp = new PrjectEmpdailyModel();

    tmp.daily_id = "00001";
    tmp.ppos_code = "70001";
    tmp.ppos_name_th = "พนักงานทำความสะอาด";
    tmp.emp_code = "220108006";
    tmp.emp_name = "นายขยัน ทำงานจริง";
    tmp.emp_position = "พนักงานประจำ";
    this.timesheet_list.push(tmp);
    tmp = new PrjectEmpdailyModel();

    tmp.daily_id = "00001";
    tmp.ppos_code = "70001";
    tmp.ppos_name_th = "พนักงานทำความสะอาด";
    tmp.emp_code = "220108007";
    tmp.emp_name = "นายขยัน ทำงานจริง";
    tmp.emp_position = "พนักงานประจำ";
    this.timesheet_list.push(tmp);
    tmp = new PrjectEmpdailyModel();

    tmp.daily_id = "00001";
    tmp.ppos_code = "70001";
    tmp.ppos_name_th = "พนักงานทำความสะอาด";
    tmp.emp_code = "220108008";
    tmp.emp_name = "นายขยัน ทำงานจริง";
    tmp.emp_position = "พนักงานประจำ";
    this.timesheet_list.push(tmp);
    tmp.daily_id = "00001";
    tmp.ppos_code = "70001";
    tmp.ppos_name_th = "พนักงานทำความสะอาด";
    tmp.emp_code = "220108008";
    tmp.emp_name = "นายขยัน ทำงานจริง";
    tmp.emp_position = "พนักงานประจำ";
    this.timesheet_list.push(tmp);
    tmp.daily_id = "00001";
    tmp.ppos_code = "70001";
    tmp.ppos_name_th = "พนักงานทำความสะอาด";
    tmp.emp_code = "220108008";
    tmp.emp_name = "นายขยัน ทำงานจริง";
    tmp.emp_position = "พนักงานประจำ";
    this.timesheet_list.push(tmp);
    tmp.daily_id = "00001";
    tmp.ppos_code = "70001";
    tmp.ppos_name_th = "พนักงานทำความสะอาด";
    tmp.emp_code = "220108008";
    tmp.emp_name = "นายขยัน ทำงานจริง";
    tmp.emp_position = "พนักงานประจำ";
    this.timesheet_list.push(tmp);
    tmp.daily_id = "00001";
    tmp.ppos_code = "70001";
    tmp.ppos_name_th = "พนักงานทำความสะอาด";
    tmp.emp_code = "220108008";
    tmp.emp_name = "นายขยัน ทำงานจริง";
    tmp.emp_position = "พนักงานประจำ";
    this.timesheet_list.push(tmp);
    tmp.daily_id = "00001";
    tmp.ppos_code = "70001";
    tmp.ppos_name_th = "พนักงานทำความสะอาด";
    tmp.emp_code = "220108008";
    tmp.emp_name = "นายขยัน ทำงานจริง";
    tmp.emp_position = "พนักงานประจำ";
    this.timesheet_list.push(tmp);
    tmp.daily_id = "00001";
    tmp.ppos_code = "70001";
    tmp.ppos_name_th = "พนักงานทำความสะอาด";
    tmp.emp_code = "220108008";
    tmp.emp_name = "นายขยัน ทำงานจริง";
    tmp.emp_position = "พนักงานประจำ";
    this.timesheet_list.push(tmp);
    tmp.daily_id = "00001";
    tmp.ppos_code = "70001";
    tmp.ppos_name_th = "พนักงานทำความสะอาด";
    tmp.emp_code = "220108008";
    tmp.emp_name = "นายขยัน ทำงานจริง";
    tmp.emp_position = "พนักงานประจำ";
    this.timesheet_list.push(tmp);
    tmp.daily_id = "00001";
    tmp.ppos_code = "70001";
    tmp.ppos_name_th = "พนักงานทำความสะอาด";
    tmp.emp_code = "220108008";
    tmp.emp_name = "นายขยัน ทำงานจริง";
    tmp.emp_position = "พนักงานประจำ";
    this.timesheet_list.push(tmp);
    tmp.daily_id = "00001";
    tmp.ppos_code = "70001";
    tmp.ppos_name_th = "พนักงานทำความสะอาด";
    tmp.emp_code = "220108008";
    tmp.emp_name = "นายขยัน ทำงานจริง";
    tmp.emp_position = "พนักงานประจำ";
    this.timesheet_list.push(tmp);
  }
  process() {
    this.result_list = [];
    this.timesheet_dest.forEach(element => {
      this.result_list.push({ worker: element.emp_code, policy: this.policyselect.code, modied_by: "Admin", modied_date: "2023-02-20" })
    });
    console.log(this.result_list)
    this.index = 1;
    setTimeout(() => {
      this.new_data = true;
    }, 300);
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

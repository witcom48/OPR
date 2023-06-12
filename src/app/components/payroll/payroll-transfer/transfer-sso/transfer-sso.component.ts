import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, ConfirmEventType, MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { SelectEmpComponent } from 'src/app/components/usercontrol/select-emp/select-emp.component';
import { AppConfig } from 'src/app/config/config';
import { InitialCurrent } from 'src/app/config/initial_current';
import { SetPolicyAttModels } from 'src/app/models/attendance/setpolicyatt';
import { SetPolicyAttServices } from 'src/app/services/attendance/setuppolicy.service';

import * as xlsx from 'xlsx';

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
  selector: 'app-transfer-sso',
  templateUrl: './transfer-sso.component.html',
  styleUrls: ['./transfer-sso.component.scss']
})
export class TransferSsoComponent implements OnInit {
  constructor(
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private setPolicyAttService: SetPolicyAttServices,
    private router: Router
  ) { }
  @Input() policy_list: Policy[] = []
  @Input() title: string = "";
  @Input() pol_type: string = "";
  index: number = 0;

  @ViewChild(SelectEmpComponent) selectEmp: any;
  // timesheet_list: PrjectEmpdailyModel[] = [];
  // timesheet_dest: PrjectEmpdailyModel[] = [];
  result_list: Result[] = [];
  // selectedDate: PrjectEmpdailyModel = new PrjectEmpdailyModel;
  policyselect!: Policy;
  loading: boolean = false;
  new_data: boolean = false;
  @ViewChild('dt2') table: Table | undefined;

  public initial_current: InitialCurrent = new InitialCurrent();
  doGetInitialCurrent() {
    this.initial_current = JSON.parse(localStorage.getItem(AppConfig.SESSIONInitial) || '{}');
    if (!this.initial_current) {
      this.router.navigateByUrl('');
    }
  }
  ngOnInit(): void {
    this.doGetInitialCurrent();
    this.policyselect =
    {
      name: this.policy_list[0]?.name,
      code: this.policy_list[0]?.code
    }
  }

  process() {
    this.result_list = [];

    if (this.selectEmp.employee_dest.length > 0) {
      this.SetPolicyAtt().then((data) => {
        const workbook = xlsx.utils.book_new();
        const worksheet = xlsx.utils.json_to_sheet(data);
        xlsx.utils.book_append_sheet(workbook, worksheet, 'Data');
        const excelBuffer = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });

        this.saveExcelFile(excelBuffer, 'data.xlsx');
      }).catch((error) => {
        console.error(error);
      });
    }
  }

  async SetPolicyAtt() {
    const data = new SetPolicyAttModels();
    data.pol_code = this.policyselect.code;
    data.pol_type = this.pol_type;
    data.company_code = this.initial_current.CompCode;
    data.modified_by = this.initial_current.Username;
    data.emp_data = this.selectEmp.employee_dest;

    this.loading = true;

    try {
      const res = await this.setPolicyAttService.SetPolicyAtt_record(data);
      console.log(res);

      if (res.success) {
        console.log(res.message);
        this.messageService.add({ severity: 'success', summary: 'Success', detail: res.message });
        return res.data; // Return the data received from the response
      } else {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: res.message });
        throw new Error(res.message); // Throw an error with the error message
      }
    } catch (error) {
      console.error(error);
      throw error; // Throw the error object
    } finally {
      this.loading = false;
    }
  }

  saveExcelFile(buffer: any, filename: string) {
    const data: Blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    const url = window.URL.createObjectURL(data);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    link.click();
    setTimeout(() => {
      window.URL.revokeObjectURL(url);
      link.remove();
    }, 100);
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

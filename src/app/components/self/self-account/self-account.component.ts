
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, NavigationExtras } from '@angular/router';
import { Table } from 'primeng/table';
import { MegaMenuItem, MenuItem } from 'primeng/api';
import { Router } from '@angular/router';

import { DatePipe } from '@angular/common';
import { ConfirmationService, ConfirmEventType, MessageService } from 'primeng/api';
import * as XLSX from 'xlsx';

import { AppConfig } from '../../../config/config';
import { InitialCurrent } from '../../../config/initial_current';

import { ProgenaralService } from '../../../services/project/pro_genaral.service';

import { AccountModel } from '../../../models/self/account';
import { PositionModel } from '../../../models/employee/policy/position';
import { PositionService } from '../../../services/emp/policy/position.service';

import { LevelService } from 'src/app/services/system/policy/level.service';
import { PartService } from 'src/app/services/emp/policy/part.service';
import { PartModel } from 'src/app/models/employee/policy/part';
import { AccountServices } from 'src/app/services/self/account.service';
import { AccountPosModel } from 'src/app/models/self/accountpos';
import { AccountDepModel } from 'src/app/models/self/accountdep';
import { SelectEmpComponent } from '../../usercontrol/select-emp/select-emp.component';
import { EmployeeModel } from 'src/app/models/employee/employee';
import { EmployeeService } from 'src/app/services/emp/worker.service';
import { TRAccountModel } from 'src/app/models/self/traccount';
import { LevelModel } from 'src/app/models/system/policy/level';
declare var account: any;
@Component({
  selector: 'app-self-account',
  templateUrl: './self-account.component.html',
  styleUrls: ['./self-account.component.scss']
})
export class SelfAccountComponent implements OnInit {
  @ViewChild(SelectEmpComponent) selectEmp: any;
  langs: any = account;
  selectlang: string = "EN";
  constructor(private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private datePipe: DatePipe,
    private router: Router,
    private positionService: PositionService,
    private accountServie: AccountServices,
    private depService: PartService,
    private empService: EmployeeService,
  ) { }
  TypeList: any[] = []
  selectuserType: any = { name: "", code: "" }
  items_menu: MenuItem[] = [];
  edit_data: boolean = false;
  account_manage: boolean = false;
  displayManage: boolean = false;
  account_list: AccountModel[] = [];
  selectedAccount: AccountModel = new AccountModel();
  position_list: PositionModel[] = [];
  position_list_source: PositionModel[] = [];
  position_list_dest: PositionModel[] = [];
  dep_list: PartModel[] = [];
  dep_list_source: PartModel[] = [];
  dep_list_dest: PartModel[] = [];
  emp_list: EmployeeModel[] = [];
  emp_list_source: EmployeeModel[] = [];
  emp_list_dest: EmployeeModel[] = [];
  selectedPosition: PositionModel = new PositionModel();
  position: string = "right";
  public initial_current: InitialCurrent = new InitialCurrent();
  doGetInitialCurrent() {
    this.initial_current = JSON.parse(localStorage.getItem(AppConfig.SESSIONInitial) || '{}');
    if (!this.initial_current.Token) {
      this.router.navigateByUrl('login');
    }
    this.selectlang = this.initial_current.Language;
  }

  ngOnInit(): void {
    this.doGetInitialCurrent()
    this.doLoadMenu()
    this.doLoadAccount()
    this.doLoadPosition()
    this.doLoadDepartment()
    this.doLoadType()
    this.doLoadEmployee()
  }
  doLoadType() {
    this.TypeList = [{ name: this.langs.get('employee')[this.selectlang], code: "Emp" },
    { name: this.langs.get('approve')[this.selectlang], code: "APR" },
    { name: this.langs.get('group')[this.selectlang], code: "GRP" },
    { name: this.langs.get('admin')[this.selectlang], code: "ADM" },]
  }
  doLoadMenu() {

    this.items_menu = [
      {
        label: this.langs.get('new')[this.selectlang],
        icon: 'pi pi-fw pi-plus',
        command: (event) => {
          this.displayManage = true
          this.edit_data = false;
          this.selectuserType = this.TypeList[0]
          this.position_list_dest = []
          this.dep_list_dest = []
          this.emp_list_dest = []
          this.position_list_source = this.position_list;
          this.dep_list_source = this.dep_list;
          this.emp_list_source = this.emp_list;
          this.selectedAccount = new AccountModel();
        }
      }
      ,
      {
        label: this.langs.get('import')[this.selectlang],
        icon: 'pi pi-fw pi-file-import',
        command: (event) => {

        }
      }
      ,
      {
        label: this.langs.get('export')[this.selectlang],
        icon: 'pi pi-fw pi-file-export',
        command: (event) => {

        }
      }
    ];
  }
  selectType() {
    this.selectedAccount.account_type = this.selectuserType.code
    this.emp_list_dest = [];
    this.emp_list_source = []
    this.emp_list.forEach((obj: EmployeeModel) => {
      this.emp_list_source.push(obj)
    })
  }
  close() {
    this.displayManage = false
    this.selectedAccount = new AccountModel();
  }
  doLoadAccount() {
    var tmp = new AccountModel();
    this.accountServie.account_get(tmp).then(async (res) => {
      this.account_list = await res;
    });
  }
  doLoadPosition() {
    this.positionService.position_get().then(async (res) => {
      this.position_list = await res;
    });
  }
  doLoadDepartment() {
    var tmp = new LevelModel();
    this.depService.dep_get(tmp).then(async (res) => {
      this.dep_list = await res;
    });
  }
  doLoadEmployee() {
    this.empService.worker_get(this.initial_current.CompCode, "").then(async (res) => {
      this.emp_list = await res;
    });
  }
  async doRecordAccout(data: AccountModel) {
    data.account_type = this.selectuserType.code;
    await this.accountServie.account_record(data).then((res) => {
      if (res.success) {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: res.message });
        this.doLoadAccount()
      }
      else {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: res.message });
      }

    });
    this.displayManage = false;
    this.edit_data = false;
  }
  async doDeleteAccount(data: AccountModel) {
    await this.accountServie.account_delete(data).then((res) => {
      if (res.success) {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: res.message });
        this.doLoadAccount()
      }
      else {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: res.message });
      }

    });
    this.displayManage = false;
    this.edit_data = false;
  }
  teset(event: any) {
    this.emp_list_dest.forEach((obj: EmployeeModel) => {
      this.emp_list_source.push(obj)
      this.emp_list_dest = [];
    })
    this.emp_list_source = this.emp_list_source.filter((res: EmployeeModel) => {
      return res.worker_code !== event.items[0].worker_code
    })
    this.emp_list_dest.push(event.items[0])
    event.items = [];
  }
  teset2(event: any) {
    this.emp_list_dest.forEach((obj: EmployeeModel) => {
      this.emp_list_source.push(obj)
      this.emp_list_dest = [];
    })
    event.items = [];
  }
  teset3(event: any) {
    // console.log(event)
    // this.emp_list_dest = []
    // this.emp_list_source = []
    // var i = 0;
    // this.emp_list.forEach((obj: EmployeeModel) => {
    //   if(i==0){

    //   }else{

    //   }

    // })
    // this.emp_list_dest.push(this.emp_list_source[0])

    event.items = [];
  }
  teset4(event: any) {
    console.log(event)
    event.items = [];
  }
  onRowSelectAccount(event: Event) {
    this.position_list_dest = []
    this.dep_list_dest = []
    this.emp_list_dest = []
    this.position_list_source = []
    this.dep_list_source = []
    this.emp_list_source = []
    this.selectuserType = this.TypeList.find(({ code }) => code === this.selectedAccount.account_type);
    this.selectedAccount.position_data.filter((obj: AccountPosModel) => {
      this.position_list.filter((elm: PositionModel) => {
        if (obj.position_code === elm.position_code) {
          this.position_list_dest.push(elm)
        }
      })
    })
    this.position_list.filter((elm: PositionModel) => {
      if (!this.position_list_dest.includes(elm)) {
        this.position_list_source.push(elm)
      }
    })
    this.selectedAccount.dep_data.filter((obj: AccountDepModel) => {
      this.dep_list.filter((elm: PartModel) => {
        if (obj.dep_code === elm.dep_code && obj.level_code === elm.dep_level) {
          this.dep_list_dest.push(elm)
        }
      })
    })
    this.dep_list.filter((elm: PartModel) => {
      if (!this.dep_list_dest.includes(elm)) {
        this.dep_list_source.push(elm)
      }
    })
    this.selectedAccount.worker_data.filter((obj: TRAccountModel) => {
      this.emp_list.filter((elm: EmployeeModel) => {
        if (obj.worker_code === elm.worker_code) {
          console.log("emp", elm)
          this.emp_list_dest.push(elm)
        }
      })
    })
    this.emp_list.filter((elm: EmployeeModel) => {
      if (!this.emp_list_dest.includes(elm)) {
        this.emp_list_source.push(elm)
      }
    })
    this.displayManage = true
    this.edit_data = true
  }
  Save() {
    this.selectedAccount.position_data = [];
    this.selectedAccount.dep_data = [];
    this.selectedAccount.worker_data = []
    this.position_list_dest.forEach((obj: PositionModel) => {
      this.selectedAccount.position_data.push({
        company_code: this.initial_current.CompCode,
        account_user: this.selectedAccount.account_user,
        account_type: this.selectuserType.code,
        position_code: obj.position_code
      })
    })
    this.dep_list_dest.forEach((obj: PartModel) => {
      this.selectedAccount.dep_data.push({
        company_code: this.initial_current.CompCode,
        account_user: this.selectedAccount.account_user,
        account_type: this.selectuserType.code,
        level_code: obj.dep_level,
        dep_code: obj.dep_code

      })
    })
    this.emp_list_dest.forEach((obj: EmployeeModel) => {
      this.selectedAccount.worker_data.push({
        company_code: this.initial_current.CompCode,
        account_user: this.selectedAccount.account_user,
        account_type: this.selectuserType.code,
        worker_code: obj.worker_code,
        worker_detail_th: obj.worker_fname_en,
        worker_detail_en: obj.worker_fname_en
      })
    })
    this.doRecordAccout(this.selectedAccount)
  }
  Delete() {
    this.doDeleteAccount(this.selectedAccount)
  }
}

import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem, MessageService } from 'primeng/api';
import { AccountModel } from '../../../models/self/account';
import { PositionModel } from '../../../models/employee/policy/position';
import { PartModel } from '../../../models/employee/policy/part';
import { EmployeeModel } from '../../../models/employee/employee';
import { TRAccountModel } from '../../../models/self/traccount';
import { LevelModel } from '../../../models/system/policy/level';
import { AccountServices } from '../../../services/self/account.service';
import { PositionService } from '../../../services/emp/policy/position.service';
import { PartService } from '../../../services/emp/policy/part.service';
import { EmployeeService } from '../../../services/emp/worker.service';
import { AccountPosModel } from 'src/app/models/self/accountpos';
import { AccountDepModel } from 'src/app/models/self/accountdep';
import { SelectEmpComponent } from '../../usercontrol/select-emp/select-emp.component';
import { InitialCurrent } from 'src/app/config/initial_current';
import { AppConfig } from 'src/app/config/config';
declare var account: any;

@Component({
  selector: 'app-self-account',
  templateUrl: './self-account.component.html',
  styleUrls: ['./self-account.component.scss']
})
export class SelfAccountComponent implements OnInit {
  @ViewChild(SelectEmpComponent) selectEmp: any;

  accountLanguages: any = account;

  selectedLanguage: string = 'EN';
  accountTypes: any[] = [];
  selectedAccountType: any = { name: '', code: '' };
  menuItems: MenuItem[] = [];
  isEditing: boolean = false;
  isAccountManagement: boolean = false;
  isDisplayingManagement: boolean = false;
  accountList: AccountModel[] = [];
  selectedAccount: AccountModel = new AccountModel();
  positionList: PositionModel[] = [];
  availablePositions: PositionModel[] = [];
  selectedPositions: PositionModel[] = [];
  departmentList: PartModel[] = [];
  availableDepartments: PartModel[] = [];
  selectedDepartments: PartModel[] = [];
  employeeList: EmployeeModel[] = [];
  availableEmployees: EmployeeModel[] = [];
  selectedEmployees: EmployeeModel[] = [];
  selectedPosition: PositionModel = new PositionModel();
  positionAlignment: string = 'right';
  initialCurrent: InitialCurrent = new InitialCurrent();

  constructor(
    private messageService: MessageService,
    private router: Router,
    private positionService: PositionService,
    private accountService: AccountServices,
    private departmentService: PartService,
    private employeeService: EmployeeService
  ) { }

  ngOnInit(): void {
    this.loadInitialCurrent();
    this.loadMenu();
    this.loadAccounts();
    this.loadPositions();
    this.loadDepartments();
    this.loadAccountTypes();
    this.loadEmployees();
  }

  // Loads the initial current settings, checks for token presence, and sets the selected language
  loadInitialCurrent(): void {
    this.initialCurrent = JSON.parse(localStorage.getItem(AppConfig.SESSIONInitial) || '{}');
    if (!this.initialCurrent.Token) {
      this.router.navigateByUrl('login');
    }
    this.selectedLanguage = this.initialCurrent.Language;
  }

  // Loads the available account types
  loadAccountTypes(): void {
    this.accountTypes = [
      { name: this.accountLanguages.get('employee')[this.selectedLanguage], code: 'Emp' },
      { name: this.accountLanguages.get('approve')[this.selectedLanguage], code: 'APR' },
      { name: this.accountLanguages.get('group')[this.selectedLanguage], code: 'GRP' },
      { name: this.accountLanguages.get('admin')[this.selectedLanguage], code: 'ADM' }
    ];
  }

  // Loads the menu items for the Table
  loadMenu(): void {
    this.menuItems = [
      {
        label: this.accountLanguages.get('new')[this.selectedLanguage],
        icon: 'pi pi-fw pi-plus',
        command: () => {
          this.isDisplayingManagement = true;
          this.isEditing = false;
          this.selectedAccountType = this.accountTypes[0];
          this.selectedPositions = [];
          this.selectedDepartments = [];
          this.selectedEmployees = [];
          this.availablePositions = [...this.positionList];
          this.availableDepartments = [...this.departmentList];
          this.availableEmployees = [...this.employeeList];
          this.selectedAccount = new AccountModel();
        }
      },
      {
        label: this.accountLanguages.get('import')[this.selectedLanguage],
        icon: 'pi pi-fw pi-file-import',
        command: () => {
          // Handle import command
        }
      },
      {
        label: this.accountLanguages.get('export')[this.selectedLanguage],
        icon: 'pi pi-fw pi-file-export',
        command: () => {
          // Handle export command
        }
      }
    ];
  }

  // Handles the selection of an account type
  selectAccountType(): void {
    this.selectedAccount.account_type = this.selectedAccountType.code;
    this.selectedEmployees = [];
    this.availableEmployees = [...this.employeeList];
  }

  // Closes the account management section
  closeManagement(): void {
    this.isDisplayingManagement = false;
    this.selectedAccount = new AccountModel();
  }

  // Loads the list of accounts
  loadAccounts(): void {
    this.accountList = [];
    const tmp = new AccountModel();
    this.accountService.account_get(tmp).then(async (res) => {
      this.accountList = await res;
    });
  }

  // Loads the list of positions
  loadPositions(): void {
    this.positionService.position_get().then(async (res) => {
      this.positionList = await res;
    });
  }

  // Loads the list of departments
  loadDepartments(): void {
    const tmp = new LevelModel();
    this.departmentService.dep_get(tmp).then(async (res) => {
      this.departmentList = await res;
    });
  }

  // Loads the list of employees
  loadEmployees(): void {
    this.employeeService.worker_get(this.initialCurrent.CompCode, '').then(async (res) => {
      this.employeeList = await res;
    });
  }

  // Records an account
  async recordAccount(data: AccountModel): Promise<void> {
    data.account_type = this.selectedAccountType.code;
    const res = await this.accountService.account_record(data);
    if (res.success) {
      this.messageService.add({ severity: 'success', summary: 'Success', detail: res.message });
      this.loadAccounts();
    } else {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: res.message });
    }
    this.isDisplayingManagement = false;
    this.isEditing = false;
  }

  // Deletes an account
  async dodeleteAccount(data: AccountModel): Promise<void> {
    const res = await this.accountService.account_delete(data);
    if (res.success) {
      this.messageService.add({ severity: 'success', summary: 'Success', detail: res.message });
      this.loadAccounts();
    } else {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: res.message });
    }
    this.isDisplayingManagement = false;
    this.isEditing = false;
  }

  // Adds an employee to the selected employees list
  addEmployee(event: any): void {
    this.selectedEmployees.forEach((obj: EmployeeModel) => {
      this.availableEmployees.push(obj);
      this.selectedEmployees = [];
    });
    this.availableEmployees = this.availableEmployees.filter((res: EmployeeModel) => {
      return res.worker_code !== event.items[0].worker_code;
    });
    this.selectedEmployees.push(event.items[0]);
    event.items = [];
  }

  // Removes an employee from the selected employees list
  removeEmployee(event: any): void {
    this.selectedEmployees.forEach((obj: EmployeeModel) => {
      this.availableEmployees.push(obj);
      this.selectedEmployees = [];
    });
    event.items = [];
  }

  // Resets the selected employees list
  resetEmployee(event: any): void {
    event.items = [];
  }

  // Resets the selected positions or departments
  reset(event: any): void {
    event.items = [];
  }

  // Handles the selection of an account
  onAccountSelection(event: Event): void {
    this.selectedPositions = [];
    this.selectedDepartments = [];
    this.selectedEmployees = [];
    this.availablePositions = [];
    this.availableDepartments = [];
    this.availableEmployees = [];

    this.selectedAccountType = this.accountTypes.find(({ code }) => code === this.selectedAccount.account_type);

    this.selectedAccount.position_data.forEach((obj: AccountPosModel) => {
      const position = this.positionList.find((elm: PositionModel) => obj.position_code === elm.position_code);
      if (position) {
        this.selectedPositions.push(position);
      }
    });

    this.positionList.forEach((elm: PositionModel) => {
      if (!this.selectedPositions.includes(elm)) {
        this.availablePositions.push(elm);
      }
    });

    this.selectedAccount.dep_data.forEach((obj: AccountDepModel) => {
      const department = this.departmentList.find((elm: PartModel) =>
        obj.dep_code === elm.dep_code && obj.level_code === elm.dep_level
      );
      if (department) {
        this.selectedDepartments.push(department);
      }
    });

    this.departmentList.forEach((elm: PartModel) => {
      if (!this.selectedDepartments.includes(elm)) {
        this.availableDepartments.push(elm);
      }
    });

    this.selectedAccount.worker_data.forEach((obj: TRAccountModel) => {
      const employee = this.employeeList.find((elm: EmployeeModel) => obj.worker_code === elm.worker_code);
      if (employee) {
        this.selectedEmployees.push(employee);
      }
    });

    this.employeeList.forEach((elm: EmployeeModel) => {
      if (!this.selectedEmployees.includes(elm)) {
        this.availableEmployees.push(elm);
      }
    });

    this.isDisplayingManagement = true;
    this.isEditing = true;
  }

  // Saves the account changes
  saveAccount(): void {
    this.selectedAccount.position_data = this.selectedPositions.map((obj: PositionModel) => ({
      company_code: this.initialCurrent.CompCode,
      account_user: this.selectedAccount.account_user,
      account_type: this.selectedAccountType.code,
      position_code: obj.position_code
    }));

    this.selectedAccount.dep_data = this.selectedDepartments.map((obj: PartModel) => ({
      company_code: this.initialCurrent.CompCode,
      account_user: this.selectedAccount.account_user,
      account_type: this.selectedAccountType.code,
      level_code: obj.dep_level,
      dep_code: obj.dep_code
    }));

    this.selectedAccount.worker_data = this.selectedEmployees.map((obj: EmployeeModel) => ({
      company_code: this.initialCurrent.CompCode,
      account_user: this.selectedAccount.account_user,
      account_type: this.selectedAccountType.code,
      worker_code: obj.worker_code,
      worker_detail_th: obj.worker_fname_en,
      worker_detail_en: obj.worker_fname_en
    }));

    this.recordAccount(this.selectedAccount);
  }

  // Deletes the account
  deleteAccount(): void {
    this.dodeleteAccount(this.selectedAccount);
  }
}

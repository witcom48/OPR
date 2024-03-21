import { Component, OnInit, ViewChild } from '@angular/core';
import { SelectEmpComponent } from '../../usercontrol/select-emp/select-emp.component';
import { TaskComponent } from '../../usercontrol/task/task.component';
import { ConfirmationService, MenuItem, MessageService } from 'primeng/api';
import { AppConfig } from 'src/app/config/config';
import { InitialCurrent } from 'src/app/config/initial_current';
import { AccessdataModel } from 'src/app/models/system/security/accessdata';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { YearService } from 'src/app/services/system/policy/year.service';
import { PeriodsServices } from 'src/app/services/payroll/periods.service';
import { ReportjobService } from 'src/app/services/reportjob.service';
import { ReportjobModel } from 'src/app/models/reportjob';
import { YearPeriodModels } from 'src/app/models/attendance/yearperiod';
import { PeriodsModels } from 'src/app/models/payroll/periods';

interface Menu {
  title: string;
  link: string;
  accessCode: string;
}

interface RptType {
  name_th: string,
  name_en: string,
  code: string,
  type: string
}

@Component({
  selector: 'app-employee-reports',
  templateUrl: './employee-reports.component.html',
  styleUrls: ['./employee-reports.component.scss']
})
export class EmployeeReportsComponent implements OnInit {

  @ViewChild(SelectEmpComponent) selectEmp: any;
  @ViewChild(TaskComponent) taskView: any;
  
  itemslike: MenuItem[] = [];
  home: any;
  reportTaxMenuItems: Menu[] = [];
  reportTaxMenuList: Menu[] = [];

  start_date: Date = new Date();
  end_date: Date = new Date();
  index: number = 0;
  edit_data: boolean = false;
  new_data: boolean = false;
  
  selected_report : string ="";
  public config: AppConfig = new AppConfig();
  public initial_current: InitialCurrent = new InitialCurrent();
  initialData2: InitialCurrent = new InitialCurrent();
  accessData: AccessdataModel = new AccessdataModel();
  doGetInitialCurrent() {
    this.initial_current = JSON.parse(
      localStorage.getItem(AppConfig.SESSIONInitial) || '{}'
    );
    if (!this.initial_current) {
      this.router.navigateByUrl('');
    }
  }
  title_system_payroll: { [key: string]: string } = { EN: "Reports Employee", TH: "รายงานพนักงาน" }

  title_system_report: { [key: string]: string } = { EN: "Reports", TH: "รายงาน" }
  //
  title_process: { [key: string]: string } = { EN: "Process", TH: "การทำงาน" }
  title_report_type: { [key: string]: string } = { EN: "Report", TH: "รายงาน" }
  title_pay_year: { [key: string]: string } = { EN: "Year", TH: "ปี" }
  title_payment: { [key: string]: string } = { EN: "Payment", TH: "วันที่จ่าย" }

  title_process2: { [key: string]: string } = { EN: "Process", TH: "ดำเนินการ" }
  
  title_select: { [key: string]: string } = { EN: "Please Select Employee", TH: "กรุณาเลือกพนักงาน" };
  
  rptType : RptType[] = [];
  constructor(
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private datePipe: DatePipe,
    private router: Router,
    private yearService : YearService,
    private periodService : PeriodsServices,
    private reportjobService : ReportjobService,
  ) { }

  ngOnInit(): void {
    this.doGetInitialCurrent();
    this.doLoadMenu();
    this.setMenus();

    this.doGetYearList();
    this.doGetPeriodList();
  }

  doLoadMenu() {
    this.itemslike = [{ label: this.title_system_payroll[this.initial_current.Language], routerLink: '/employee/reports', styleClass: 'activelike' }];

    this.home = { icon: 'pi pi-home', routerLink: '/' };
  }

  reportjob: ReportjobModel = new ReportjobModel();
  reportjobList: ReportjobModel[] = [];
  process() {
    if (this.selectEmp.employee_dest.length === 0) {

      if (this.selectEmp.employee_dest.length > 0) {
      } else {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: this.title_select[this.initial_current.Language] });
      }
      return;
    }
  }

  doPreview(token:string){
    window.open(this.config.ApiReport + token, "_blank");
  }

  setMenus() {
    this.accessData = this.initialData2.dotGetPolmenu('EMP');
    this.reportTaxMenuItems = this.reportTaxMenuList.filter(item => this.hasAccessMenu(item.accessCode));
  }

  private hasAccessMenu(accessCode: string): boolean {
    return this.accessData.accessmenu_data.some(item => item.accessmenu_code === accessCode);
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

  //pay period
  selectedYear: string = "";
  yearList: YearPeriodModels[] = [];
  doGetYearList() {
    this.yearList = [];
    var tmp = new YearPeriodModels();
    tmp.company_code = this.initial_current.CompCode;
    tmp.year_group = "TAX"
    this.yearService.year_get(tmp).then(async (res) => {
      this.yearList = await res;
    });
  }

  selectedPeriodNo: string = "";
  periodList: PeriodsModels[] = [];
  periodSeleted: PeriodsModels = new PeriodsModels();
  doGetPeriodList() {
    this.periodList = [];
    if (!this.selectedYear) {
      const currentYear = this.initial_current.PR_Year;
      this.selectedYear = currentYear.toString();
    }
    var tmp = new PeriodsModels();
    tmp.company_code = this.initial_current.CompCode;
    tmp.period_type = "PAY";
    tmp.emptype_code = this.initial_current.EmpType;
    tmp.year_code = this.selectedYear;
    this.periodService.period_get(tmp).then(async (res) => {
      this.periodList = await res;
      this.doGetPaymentDate();
    });
  }

  doGetPaymentDate() {

    for (let i = 0; i < this.periodList.length; i++) {

      if (this.periodList[i].period_no == this.initial_current.PR_Period) {
        this.periodSeleted = this.periodList[i];
        break;
      }
    }

  }

}

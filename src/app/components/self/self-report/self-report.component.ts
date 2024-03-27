import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, MenuItem, MessageService } from 'primeng/api';
import { AppConfig } from 'src/app/config/config';
import { InitialCurrent } from 'src/app/config/initial_current';
import { AccountServices } from 'src/app/services/self/account.service';
import { ApproveServices } from 'src/app/services/self/approve.service';
import { SelectEmpComponent } from '../../usercontrol/select-emp/select-emp.component';
import { TaskComponent } from '../../usercontrol/task/task.component';
import { ReportjobModel } from 'src/app/models/self/reportjob';
import { ReportjobService } from 'src/app/services/self/reportjob.service';
import { YearPeriodModels } from 'src/app/models/attendance/yearperiod';
import { YearsSelfService } from 'src/app/services/self/yearself.service';
import { PeriodSelfService } from 'src/app/services/self/periodself.service';
import { PeriodsModels } from 'src/app/models/payroll/periods';
declare var reports: any;

interface RptType {
  name_th: string,
  name_en: string,
  code: string,
  type: string
}

@Component({
  selector: 'app-self-report',
  templateUrl: './self-report.component.html',
  styleUrls: ['./self-report.component.scss']
})
export class SelfReportComponent implements OnInit {

  @ViewChild(SelectEmpComponent) selectEmp: any;
  @ViewChild(TaskComponent) taskView: any;

  langs: any = reports;
  selectlang: string = "EN";
  mainMenuItems: MenuItem[] = [];
  homeIcon: any = { icon: 'pi pi-home', routerLink: '/' };
  start_date: Date = new Date();
  end_date: Date = new Date();
  index: number = 0;
  edit_data: boolean = false;
  new_data: boolean = false;
  
  selected_report : string ="";
  rptType : RptType[] = [
    //Leave
    {name_th : 'บันทึกเวลาการลา',name_en : 'Leave time record',code:'TA002',type:'Leave'},
    {name_th : 'สถิติการลาหยุดงาน',name_en : 'Leave statistics',code:'TA005',type:'Leave'},
    {name_th : 'รายงานการขอลางาน',name_en : 'Request Leave Report',code:'TA011',type:'Leave'},
    //OT
    {name_th : 'บันทึกการทำล่วงเวลา',name_en : 'Overtime record',code:'TA004',type:'OT'},
    {name_th : 'สรุปจำนวนชั่วโมงโอที',name_en : 'Summary Overtime',code:'TA007',type:'OT'},
    {name_th : 'รายงานการจ่ายค่าล่วงเวลาตามอัตรา',name_en : 'Over Time Record By Rate',code:'TA008',type:'OT'},
    {name_th : 'รายงานการขอทำล่วงเวลา',name_en : 'Over Time Requisition',code:'TA015',type:'OT'},
    //Check-In
    {name_th : 'บันทึกการมาปฎิบัติงาน',name_en : 'Attendance record',code:'TA001',type:'Check-in'},
    {name_th : 'การมาปฎิบัติงานสรุปแบบรายงวด',name_en : 'Attendance Summary By Period',code:'TA006',type:'Check-in'},
    {name_th : 'Time Attendance Record',name_en : 'Time Attendance Record',code:'TA2',type:'Check-in'},
    //
    {name_th : 'สลิปเงินเดือน(STD)',name_en : 'Payslip(STD)',code:'PR6',type:'Slip'},

  ];
  constructor(
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private datePipe: DatePipe,
    private router: Router,
    private accountServie: AccountServices,
    private approveservice: ApproveServices,
    private reportjobService:ReportjobService,
    private yearService : YearsSelfService,
    private periodService : PeriodSelfService
  ) { }

  ngOnInit(): void {
    this.doGetInitialCurrent()
    this.doLoadMenu();

    this.doGetYearList();
    this.doGetPeriodList();
  }
  public config: AppConfig = new AppConfig();
  public initial_current: InitialCurrent = new InitialCurrent();
  doGetInitialCurrent() {
    this.initial_current = JSON.parse(localStorage.getItem(AppConfig.SESSIONInitial) || '{}');
    if (!this.initial_current.Token) {
      this.router.navigateByUrl('login');
    }
    this.start_date = new Date(`${this.initial_current.PR_Year}-01-01`);
    this.end_date = new Date(`${this.initial_current.PR_Year}-12-31`);
    this.selectlang = this.initial_current.Language;
   
    if (this.initial_current.Usertype !== 'Emp') {
      this.rptType = this.rptType.filter(item => item.code !== 'PR6');
  }
  }

  dateFrom:Date = new Date();
  dateTo:Date = new Date();

  updateFromDate(event : any) {
    this.dateFrom = new Date(event);
  }
  updateToDate(event : any) {
    this.dateTo = new Date(event);
  }

  doLoadMenu() {
    this.mainMenuItems = [{ label: this.langs.get('reports')[this.selectlang], routerLink: '/self/reports' },]
  }

  public reportjob:ReportjobModel = new ReportjobModel();  
  process() {
    //-- Step 1 Task master
    if(this.selected_report == 'PR6'){
      this.reportjob.company_code = this.initial_current.CompCode;
      this.reportjob.reportjob_type = this.selected_report;
      this.reportjob.reportjob_status = "W";
      this.reportjob.reportjob_language = this.initial_current.Language;
      this.reportjob.reportjob_fromdate = this.periodSeleted.period_from;
      this.reportjob.reportjob_todate = this.periodSeleted.period_to;
      this.reportjob.reportjob_paydate = this.periodSeleted.period_payment;
      this.reportjob.reportjob_section = '';
    }else{
      this.reportjob.company_code = this.initial_current.CompCode;
      this.reportjob.reportjob_type = this.selected_report;
      this.reportjob.reportjob_status = "W";
      this.reportjob.reportjob_language = this.initial_current.Language;
      this.reportjob.reportjob_fromdate = this.dateFrom;
      this.reportjob.reportjob_todate = this.dateTo;
      this.reportjob.reportjob_paydate = this.initial_current.PR_PayDate;
      this.reportjob.reportjob_section = '';
    }
    //-- Step 2 Task detail
    if(this.selectEmp.employee_dest.length == 0){
      this.messageService.add({ severity: 'error', summary: 'Error', detail: this.langs.get('alertselect')[this.selectlang] });
      return;
    }
    //-- Check Close Period
    if(this.selected_report == 'PR6' && !this.periodSeleted.period_closepr){
      this.messageService.add({ severity: 'error', summary: 'Error', detail: this.langs.get('closepr')[this.selectlang] });
      return;
    }

    this.reportjobService.doManage(this.reportjob, this.selectEmp.employee_dest).then((res) =>{      
      if(res.result){
        //console.log('Success');
        //this.doPrintMessage("Success", "1");    
        this.doPreview(res.result_text);
      }
      else{
        this.messageService.add({ severity: 'error', summary: 'Error', detail: this.langs.get('alerterror')[this.selectlang] });
      }
      
    }); 
  }
  doPreview(token:string){
    window.open(this.config.WebReporting + token, "_blank");
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
    console.log(this.initial_current)
    this.yearList = [];
    this.yearService.getList(this.initial_current.CompCode, "TAX").subscribe((response) => {
      let resultJSON = JSON.parse(response);
      if (resultJSON.result == "1") {
        this.yearList = resultJSON.data;
      }
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
    this.periodService.getList(this.initial_current.CompCode, "PAY", this.initial_current.EmpType, this.selectedYear).subscribe((response) => {
      let resultJSON = JSON.parse(response);
      if (resultJSON.result == "1") {
        this.periodList = resultJSON.data;
        this.doGetPaymentDate()
      }
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

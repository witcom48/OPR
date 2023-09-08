import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MegaMenuItem, MenuItem } from 'primeng/api';
import { ActivatedRoute, NavigationExtras } from '@angular/router';
import { Router } from '@angular/router';

import { ConfirmationService, ConfirmEventType, MessageService } from 'primeng/api';
import * as XLSX from 'xlsx';
import { DatePipe } from '@angular/common';


import { AppConfig } from '../../../config/config';
import { InitialCurrent } from '../../../config/initial_current';
import { ProjectModel } from '../../../models/project/project';
import { ProaddressModel } from '../../../models/project/project_address';
import { ProcontactModel } from '../../../models/project/project_contact';
import { ProbusinessModel, ProtypeModel, ProslipModel, ProuniformModel } from '../../../models/project/policy/pro_genaral';

import { ProcostModel } from '../../../models/project/policy/procost';
import { ProcostService } from '../../../services/project/procost.service';
import { ProgenaralService } from '../../../services/project/pro_genaral.service';
import { ProjectService } from '../../../services/project/project.service';

import { ProjectDetailService } from '../../../services/project/project_detail.service';
import { ProcontractModel } from '../../../models/project/project_contract';
import { ProresponsibleModel } from '../../../models/project/project_responsible';
import { ProtimepolModel } from '../../../models/project/project_timepol';
import { ProjobmainModel } from '../../../models/project/project_jobmain';

import { ProjobshiftModel } from '../../../models/project/project_jobshift';

import { ProjobversionModel } from '../../../models/project/project_jobversion';

import { ProjobpolModel } from '../../../models/project/project_jobpol';

import { ProjobcontractModel } from '../../../models/project/project_jobcontract';
import { ProjobcostModel } from '../../../models/project/project_jobcost';
import { ProjobmachineModel } from '../../../models/project/project_jobmachine';
import { ProjobsubModel } from '../../../models/project/project_jobsub';

import { ProjobempModel } from '../../../models/project/project_jobemp';
import { ProjobworkingModel } from '../../../models/project/project_jobworking';

import { InitialModel } from '../../../models/employee/policy/initial';
import { InitialService } from 'src/app/services/emp/policy/initial.service';

import { EmployeeModel } from '../../../models/employee/employee';
import { EmployeeService } from 'src/app/services/emp/worker.service';

import { PositionModel } from '../../../models/employee/policy/position';
import { PositionService } from 'src/app/services/emp/policy/position.service';

import { EmpstatusModel } from '../../../models/employee/policy/empstatus';
import { EmpstatusService } from 'src/app/services/emp/policy/empstatus.service';

import { RadiovalueModel } from '../../../models/project/radio_value';

import { ShiftServices } from 'src/app/services/attendance/shift.service';
import { ShiftModels } from 'src/app/models/attendance/shift';

import { OvertimeModels } from 'src/app/models/attendance/overtime';
import { OTServices } from 'src/app/services/attendance/rateot.service';

import { cls_MTPlantimeallw } from 'src/app/models/attendance/cls_MTPlantimeallw';
import { TimeAllowanceServices } from 'src/app/services/attendance/timeallowance.service';

import { DiligenceModels } from 'src/app/models/attendance/diligence';
import { DiligenceServices } from 'src/app/services/attendance/diligence.service';

import { LeaveplanModels } from 'src/app/models/attendance/leave_plan';
import { PlanleaveServices } from 'src/app/services/attendance/planleave.service';

import { LateModels } from 'src/app/models/attendance/late';
import { LateServices } from 'src/app/services/attendance/late.service';

import { SearchEmpComponent } from '../../usercontrol/search-emp/search-emp.component';
import { ProareaModel } from 'src/app/models/project/project_proarea';
import { ProgroupModel } from 'src/app/models/project/project_group';
import { AccessdataModel } from 'src/app/models/system/security/accessdata';
import { RoundsModel } from 'src/app/models/system/manage/rounds';
import { RoundsService } from 'src/app/services/system/manage1/rounds.service';
import { YearPeriodModels } from 'src/app/models/attendance/yearperiod';
import { YearService } from 'src/app/services/system/policy/year.service';


@Component({
  selector: 'app-project-manage',
  templateUrl: './project-manage.component.html',
  styleUrls: ['./project-manage.component.scss']
})
export class ProjectManageComponent implements OnInit {

  @ViewChild(SearchEmpComponent) selectEmp: any;

  manage_title: string = ""
  toolbar_menu: MenuItem[] = [];

  days: string[] = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturay"];

  costs_title: string[] = ["", "", "", "", "", "", "", "", "", ""];

  project_code: string = "";
  //
  rounds_type: string = "";
  time_list: RoundsModel[] = [];
  currency_list: RoundsModel[] = [];

  yeargroup_list: YearPeriodModels[] = [];
  //
  probusiness_list: ProbusinessModel[] = [];
  selectedProbusiness: ProbusinessModel = new ProbusinessModel();
  protype_list: ProtypeModel[] = [];

  proarea_list: ProareaModel[] = [];

  progroup_list: ProgroupModel[] = [];

  //#region "My Menu"

  menu_procontact: MenuItem[] = [];
  edit_procontact: boolean = false;
  new_procontact: boolean = false;
  //
  menu_procontract: MenuItem[] = [];
  edit_procontract: boolean = false;
  new_procontract: boolean = false;
  //
  menu_proresponsible: MenuItem[] = [];
  edit_proresponsible: boolean = false;
  new_proresponsible: boolean = false;
  //
  menu_protimepol: MenuItem[] = [];
  edit_protimepol: boolean = false;
  new_protimepol: boolean = false;
  //
  menu_projobmain: MenuItem[] = [];
  edit_projobmain: boolean = false;
  new_projobmain: boolean = false;
  disable_projobmain: boolean = true;
  //
  menu_projobcontract: MenuItem[] = [];
  edit_projobcontract: boolean = false;
  new_projobcontract: boolean = false;
  //
  menu_projobcost: MenuItem[] = [];
  edit_projobcost: boolean = false;
  new_projobcost: boolean = false;
  //
  menu_projobmachine: MenuItem[] = [];
  edit_projobmachine: boolean = false;
  new_projobmachine: boolean = false;
  //
  menu_projobpol: MenuItem[] = [];
  edit_projobpol: boolean = false;
  new_projobpol: boolean = false;
  //
  menu_projobsub: MenuItem[] = [];
  edit_projobsub: boolean = false;
  new_projobsub: boolean = false;
  //
  menu_projobsubcontract: MenuItem[] = [];
  edit_projobsubcontract: boolean = false;
  new_projobsubcontract: boolean = false;
  //
  menu_projobsubcost: MenuItem[] = [];
  edit_projobsubcost: boolean = false;
  new_projobsubcost: boolean = false;
  //
  menu_projobemp: MenuItem[] = [];
  edit_projobemp: boolean = false;
  new_projobemp: boolean = false;
  //
  menu_projobshift: MenuItem[] = [];
  edit_projobshift: boolean = false;
  new_projobshift: boolean = false;
  //
  edit_projobversion: boolean = false;
  new_projobversion: boolean = false;
  //#endregion "My Menu"

  //#region "Language"
  title_tab_genaral: { [key: string]: string } = { EN: "Genaral", TH: "ข้อมูลทั่วไป" }
  title_tab_contract: { [key: string]: string } = { EN: "Contract", TH: "ข้อมูลสัญญา" }
  title_tab_policy: { [key: string]: string } = { EN: "Policy", TH: "นโยบาย" }
  title_tab_jobmain: { [key: string]: string } = { EN: "Job", TH: "งาน" }
  title_tab_jobclear: { [key: string]: string } = { EN: "Clear job", TH: "งานเคลีย์" }
  title_tab_staff: { [key: string]: string } = { EN: "Staff", TH: "พนักงานประจำหน่วยงาน" }
  //
  title_page: { [key: string]: string } = { EN: "Project Management", TH: "จัดการข้อมูลโครงการ" }
  title_new: { [key: string]: string } = { EN: "New", TH: "เพิ่ม" }
  title_edit: { [key: string]: string } = { EN: "Edit", TH: "แก้ไข" }
  title_delete: { [key: string]: string } = { EN: "Delete", TH: "ลบ" }
  title_btn_save: { [key: string]: string } = { EN: "Save", TH: "บันทึก" }
  title_btn_cancel: { [key: string]: string } = { EN: "Cancel", TH: "ยกเลิก" }
  title_btn_close: { [key: string]: string } = { EN: "Close", TH: "ปิด" }
  title_modified_by: { [key: string]: string } = { EN: "Edit by", TH: "ผู้ทำรายการ" }
  title_modified_date: { [key: string]: string } = { EN: "Edit date", TH: "วันที่ทำรายการ" }
  title_search: { [key: string]: string } = { EN: "Search", TH: "ค้นหา" }
  title_upload: { [key: string]: string } = { EN: "Upload", TH: "อัพโหลด" }
  title_btn_select: { [key: string]: string } = { EN: "Select", TH: "เลือก" }
  //
  title_page_from: { [key: string]: string } = { EN: "Showing", TH: "แสดง" }
  title_page_to: { [key: string]: string } = { EN: "to", TH: "ถึง" }
  title_page_total: { [key: string]: string } = { EN: "of", TH: "จาก" }
  title_page_record: { [key: string]: string } = { EN: "entries", TH: "รายการ" }
  //
  title_import: { [key: string]: string } = { EN: "Import", TH: "นำเข้า" }
  title_export: { [key: string]: string } = { EN: "Export", TH: "โอนออก" }
  title_save: { [key: string]: string } = { EN: "Save", TH: "บันทึก" }
  title_close: { [key: string]: string } = { EN: "Close", TH: "ปิด" }
  title_cancel: { [key: string]: string } = { EN: "Cancel", TH: "ยกเลิก" }
  title_more: { [key: string]: string } = { EN: "More", TH: "เพิ่มเติม" }
  title_code: { [key: string]: string } = { EN: "Code", TH: "รหัส" }
  title_name_th: { [key: string]: string } = { EN: "Name (Thai)", TH: "ชื่อไทย" }
  title_name_en: { [key: string]: string } = { EN: "Name (Eng.)", TH: "ชื่ออังกฤษ" }
  //
  title_shift: { [key: string]: string } = { EN: "Shift", TH: "กะการทำงาน" }
  title_shift_code: { [key: string]: string } = { EN: "Shift", TH: "รหัสกะ" }
  title_shift_name: { [key: string]: string } = { EN: "Description", TH: "รายละเอียด" }
  title_shift_day: { [key: string]: string } = { EN: "Working day", TH: "วันทำงาน" }
  title_shift_emp: { [key: string]: string } = { EN: "Manpower", TH: "จำนวนพนักงาน" }
  title_shift_working: { [key: string]: string } = { EN: "Number of work", TH: "จำนวนทำงาน" }
  title_shift_hrs: { [key: string]: string } = { EN: "Working hrs.", TH: "ชั่วโมงทำงาน" }
  title_shift_ot: { [key: string]: string } = { EN: "Overtime hrs.", TH: "ชั่วโมงโอที" }

  //
  title_confirm: { [key: string]: string } = { EN: "Are you sure?", TH: "ยืนยันการทำรายการ" }
  title_confirm_record: { [key: string]: string } = { EN: "Confirm to record", TH: "คุณต้องการบันทึกการทำรายการ" }
  title_confirm_delete: { [key: string]: string } = { EN: "Confirm to delete", TH: "คุณต้องการลบรายการ" }
  title_confirm_yes: { [key: string]: string } = { EN: "Yes", TH: "ใช่" }
  title_confirm_no: { [key: string]: string } = { EN: "No", TH: "ยกเลิก" }
  title_confirm_cancel: { [key: string]: string } = { EN: "You have cancelled", TH: "คุณยกเลิกการทำรายการ" }
  //
  title_project_code: { [key: string]: string } = { EN: "Code", TH: "รหัสหน่วยงาน" }
  title_project_name_th: { [key: string]: string } = { EN: "Description (TH)", TH: "ชื่อไทย" }
  title_project_name_en: { [key: string]: string } = { EN: "Description (EN)", TH: "ชื่ออังกฤษ" }
  title_project_codecentral: { [key: string]: string } = { EN: "Code central", TH: "รหัสหน่วยงานกลาง" }
  title_project_name_sub: { [key: string]: string } = { EN: "Name Sub", TH: "ชื่อย่อ" }
  title_project_probusiness: { [key: string]: string } = { EN: "Business", TH: "ประเภทธุรกิจ" }
  title_project_protype: { [key: string]: string } = { EN: "Type", TH: "ประเภทงาน" }
  title_project_roundtime: { [key: string]: string } = { EN: "Time rounding", TH: "รูปแบบปัดเศษเวลา" }
  title_project_roundmoney: { [key: string]: string } = { EN: "Amount rounding", TH: "รูปแบบปัดเศษเงิน" }
  title_project_holiday: { [key: string]: string } = { EN: "Holiday", TH: "วันหยุดประจำปี" }

  title_project_progarea: { [key: string]: string } = { EN: "Area ", TH: "พื้นที่" }
  title_project_progroup: { [key: string]: string } = { EN: "Group ", TH: "กลุ่ม" }
  //
  title_address: { [key: string]: string } = { EN: "Address", TH: "ที่อยู่" }
  title_address_no: { [key: string]: string } = { EN: "Address No", TH: "เลขที่" }
  title_address_moo: { [key: string]: string } = { EN: "Moo", TH: "หมู่" }
  title_address_road: { [key: string]: string } = { EN: "Road", TH: "ถนน" }
  title_address_soi: { [key: string]: string } = { EN: "Soi", TH: "ซอย" }
  title_address_tambon: { [key: string]: string } = { EN: "Tambon", TH: "ตำบล" }
  title_address_amphur: { [key: string]: string } = { EN: "Amphur", TH: "อำเภอ" }
  title_address_province: { [key: string]: string } = { EN: "Province", TH: "จังหวัด" }
  title_address_zipcode: { [key: string]: string } = { EN: "Zipcode", TH: "รหัสไปรษณีย์" }
  title_address_tel: { [key: string]: string } = { EN: "Tel.", TH: "เบอร์โทรศัพท์" }
  title_address_email: { [key: string]: string } = { EN: "Email", TH: "อีเมล์" }
  title_address_note: { [key: string]: string } = { EN: "Note", TH: "เพิ่มเติม" }
  //
  title_contact: { [key: string]: string } = { EN: "Contact", TH: "ผู้ติดต่อ" }
  title_contact_no: { [key: string]: string } = { EN: "No", TH: "ลำดับ" }
  title_contact_initial: { [key: string]: string } = { EN: "Initial", TH: "คำนำหน้า" }
  title_contact_firstname: { [key: string]: string } = { EN: "Firstname", TH: "ชื่อ" }
  title_contact_lastname: { [key: string]: string } = { EN: "Lastname", TH: "นามสกุล" }
  title_contact_position: { [key: string]: string } = { EN: "Position", TH: "ตำแหน่ง" }
  title_contact_tel: { [key: string]: string } = { EN: "Tel.", TH: "เบอร์โทรศัพท์" }
  title_contact_email: { [key: string]: string } = { EN: "Email", TH: "อีเมล์" }
  //
  title_contract: { [key: string]: string } = { EN: "Contract", TH: "ข้อมูลสัญญา" }
  title_contract_customer: { [key: string]: string } = { EN: "Customer", TH: "ชื่อลูกค้า" }
  title_contract_date: { [key: string]: string } = { EN: "Date", TH: "วันที่ทำสัญญา" }
  title_contract_ref: { [key: string]: string } = { EN: "Ref.", TH: "เลขที่สัญญา" }
  title_contract_amount: { [key: string]: string } = { EN: "Amount", TH: "ราคา" }
  title_contract_fromdate: { [key: string]: string } = { EN: "Fromdate", TH: "จากวันที่" }
  title_contract_todate: { [key: string]: string } = { EN: "Todate", TH: "ถึงวันที่" }
  title_contract_bidder: { [key: string]: string } = { EN: "Bidder", TH: "ผู้เสนอราคา" }
  title_contract_emp_total: { [key: string]: string } = { EN: "Total emp", TH: "จำนวนพนักงาน" }
  //
  title_responsible: { [key: string]: string } = { EN: "Responsible", TH: "ผู้รับผิดชอบ" }
  title_responsible_code: { [key: string]: string } = { EN: "Emp code", TH: "รหัสพนักงาน" }
  title_responsible_name: { [key: string]: string } = { EN: "Name", TH: "ชื่อ-นามสกุล" }
  title_responsible_position: { [key: string]: string } = { EN: "Position", TH: "ตำแหน่ง" }
  title_responsibl_area: { [key: string]: string } = { EN: "Area", TH: "เขต" }
  title_responsible_fromdate: { [key: string]: string } = { EN: "Fromdate", TH: "จากวันที่" }
  title_responsible_todate: { [key: string]: string } = { EN: "Todate", TH: "ถึงวันที่" }
  //
  title_timepol: { [key: string]: string } = { EN: "Attendance policy", TH: "รูปแบบนโยบายเวลา" }
  title_timepol_code: { [key: string]: string } = { EN: "Code", TH: "รหัส" }
  title_timepol_name: { [key: string]: string } = { EN: "Description", TH: "รายละเอียด" }
  title_timepol_ot: { [key: string]: string } = { EN: "Overtime", TH: "ล่วงเวลา" }
  title_timepol_allw: { [key: string]: string } = { EN: "Allowance", TH: "เงินค่าเวลา" }
  title_timepol_dg: { [key: string]: string } = { EN: "Diligence", TH: "เบี้ยขยัน" }
  title_timepol_lv: { [key: string]: string } = { EN: "Leave", TH: "การลา" }
  title_timepol_lt: { [key: string]: string } = { EN: "Late", TH: "การคิดสาย" }

  //
  title_jobmain: { [key: string]: string } = { EN: "Job", TH: "งานหลัก" }
  title_jobmain_detail: { [key: string]: string } = { EN: "Detail", TH: "รายละเอียด" }
  title_jobmain_code: { [key: string]: string } = { EN: "Code", TH: "รหัสงาน" }
  title_jobmain_name: { [key: string]: string } = { EN: "Description", TH: "รายละเอียด" }
  title_jobmain_type: { [key: string]: string } = { EN: "Job type", TH: "ประเภทงาน" }
  title_jobmain_emp_total: { [key: string]: string } = { EN: "Total emp", TH: "จำนวนพนักงาน" }
  title_jobmain_poltime: { [key: string]: string } = { EN: "Time policy", TH: "นโยบายเวลา" }
  title_jobmain_polslip: { [key: string]: string } = { EN: "Slip form", TH: "รูปแบบสลิป" }
  title_jobmain_poluniform: { [key: string]: string } = { EN: "Uniform", TH: "ชุดฟอร์ม" }
  title_jobmain_amount_emp: { [key: string]: string } = { EN: "Per/Emp", TH: "รวม/คน" }
  title_jobmain_amount_total: { [key: string]: string } = { EN: "Total", TH: "รวมทั้งหมด" }
  title_jobmain_used: { [key: string]: string } = { EN: "Used", TH: "ใช้ไป" }
  //
  title_cost: { [key: string]: string } = { EN: "Cost", TH: "ต้นทุน" }
  title_cost_code: { [key: string]: string } = { EN: "Code", TH: "รหัสต้นทุน" }
  title_cost_name: { [key: string]: string } = { EN: "Description", TH: "รายละเอียด" }
  title_cost_version: { [key: string]: string } = { EN: "Version", TH: "เวอร์ชั่น" }
  title_cost_type: { [key: string]: string } = { EN: "Type", TH: "รูปแบบ" }
  title_cost_amount: { [key: string]: string } = { EN: "Amount", TH: "จำนวนเงิน" }
  title_cost_allw: { [key: string]: string } = { EN: "Allw. code", TH: "รหัสเงินได้" }
  title_cost_auto: { [key: string]: string } = { EN: "Auto", TH: "อัตโนมัติ" }
  title_cost_fromdate: { [key: string]: string } = { EN: "Fromdate", TH: "จากวันที่" }
  title_cost_todate: { [key: string]: string } = { EN: "Todate", TH: "ถึงวันที่" }
  title_cost_status: { [key: string]: string } = { EN: "Status", TH: "สถานะ" }

  //
  title_machine: { [key: string]: string } = { EN: "Finger print", TH: "เครื่องลงเวลา" }
  title_machine_ip: { [key: string]: string } = { EN: "IP Address", TH: "IP Address" }
  title_machine_port: { [key: string]: string } = { EN: "Port", TH: "Port" }
  title_machine_enable: { [key: string]: string } = { EN: "Enable", TH: "ใช้งาน" }

  title_policy: { [key: string]: string } = { EN: "Policy", TH: "นโยบาย" }
  //
  title_working: { [key: string]: string } = { EN: "Working", TH: "การปฎิบัติงาน" }
  title_working_date: { [key: string]: string } = { EN: "Date", TH: "วันที่" }
  title_working_emp: { [key: string]: string } = { EN: "Emp code", TH: "รหัสพนักงาน" }
  title_working_empname: { [key: string]: string } = { EN: "Name", TH: "ชื่อ-นามสกุล" }
  title_working_in: { [key: string]: string } = { EN: "In", TH: "เวลาเข้า" }
  title_working_out: { [key: string]: string } = { EN: "Out", TH: "เวลาออก" }
  //
  title_staff: { [key: string]: string } = { EN: "Staff", TH: "ประจำหน่วยงาน" }
  title_staff_jobcode: { [key: string]: string } = { EN: "Job code", TH: "รหัสงาน" }
  title_staff_jobname: { [key: string]: string } = { EN: "Description", TH: "รายละเอียดงาน" }
  title_staff_empcode: { [key: string]: string } = { EN: "Emp code", TH: "รหัสพนักงาน" }
  title_staff_empname: { [key: string]: string } = { EN: "Emp name", TH: "ชื่อ-นามสกุล" }
  title_staff_empstatus: { [key: string]: string } = { EN: "Emp status", TH: "สถานะพนักงาน" }
  title_staff_fromadate: { [key: string]: string } = { EN: "Fromdate", TH: "วันที่โอนย้าย" }
  title_staff_todate: { [key: string]: string } = { EN: "Todate", TH: "วันที่ย้ายออก" }
  title_staff_status: { [key: string]: string } = { EN: "Status", TH: "สถานะ" }
  title_staff_apprdate: { [key: string]: string } = { EN: "Approve date", TH: "วันที่อนุมัติ" }
  //
  title_emp_total: { [key: string]: string } = { EN: "Total emp", TH: "จำนวนพนักงาน" }
  title_amount_total: { [key: string]: string } = { EN: "Total amount", TH: "ราคารวม" }

  title_regular: { [key: string]: string } = { EN: "Regular", TH: "ประจำ" }
  title_temporary: { [key: string]: string } = { EN: "Temporary", TH: "ชั่วคราว" }

  //#endregion "Language"


  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private projectService: ProjectService,
    private projectDetailService: ProjectDetailService,
    private genaralService: ProgenaralService,
    private procostService: ProcostService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private datePipe: DatePipe,
    private employeeService: EmployeeService,
    private shiftServices: ShiftServices,
    private initialService: InitialService,
    private positionService: PositionService,
    private empstatusService: EmpstatusService,
    private otservices: OTServices,
    private timeallwservices: TimeAllowanceServices,
    private diligenceServices: DiligenceServices,
    private planleaveService: PlanleaveServices,
    private lateServices: LateServices,
    private roundsService: RoundsService,
    private yearServices: YearService,

  ) {


  }

  ngOnInit(): void {

    this.route.queryParams.subscribe(params => {
      this.project_code = params['project'];
      // console.log(this.project_code);
    });

    this.doGetInitialCurrent()

    this.doLoadLanguage()
    this.doLoadMaster()


    setTimeout(() => {
      this.doLoadMenu()
    }, 100);

    setTimeout(() => {

      this.doLoadProject()
      this.doLoadEmployee()

    }, 400);

  }

  doLoadLanguage() {
    if (this.initial_current.Language == "TH") {


    }
  }

  public initial_current: InitialCurrent = new InitialCurrent();
  initialData2: InitialCurrent = new InitialCurrent();
  accessData: AccessdataModel = new AccessdataModel();
  doGetInitialCurrent() {
    this.initial_current = JSON.parse(localStorage.getItem(AppConfig.SESSIONInitial) || '{}');
    if (!this.initial_current) {
      this.router.navigateByUrl('login');
    }
    this.accessData = this.initialData2.dotGetPolmenu('PRO');
  }

  tabChange(e: { index: any; }) {
    var index = e.index;

    this.edit_procontact = false;
    this.new_procontact = false;
    //
    this.edit_procontract = false;
    this.new_procontract = false;
    //
    this.edit_proresponsible = false;
    this.new_proresponsible = false;
    //
    this.edit_protimepol = false;
    this.new_protimepol = false;
    //
    this.edit_projobmain = false;
    this.new_projobmain = false;
    //
    this.edit_projobcontract = false;
    this.new_projobcontract = false;
    //
    this.edit_projobcost = false;
    this.new_projobcost = false;
    //
    this.edit_projobmachine = false;
    this.new_projobmachine = false;
    //
    this.edit_projobsub = false;
    this.new_projobsub = false;
    //
    this.edit_projobsubcontract = false;
    this.new_projobsubcontract = false;
    //
    this.edit_projobsubcost = false;
    this.new_projobsubcost = false;
    //
    this.edit_projobemp = false;
    this.new_projobemp = false;

    this.displayManage = false

  }

  doLoadMenu() {

    this.toolbar_menu = [
      {
        label: 'Save',
        icon: 'pi pi-fw pi-save',
        command: (event) => {
          this.confirmRecord()
        }
      }
    ]

    this.menu_procontact = [
      {
        label: this.title_new[this.initial_current.Language],
        icon: 'pi pi-fw pi-plus',
        command: (event) => {
          if (this.accessData.accessdata_new) {
            this.clearManage()
            this.new_procontact = true
            var ref = this.procontact_list.length + 100
            this.selectedProcontact = new ProcontactModel()
            this.selectedProcontact.procontact_ref = ref.toString()
            this.showManage()
          } else {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Permission denied' });
          }
        }
      }
      ,
      {
        label: this.title_edit[this.initial_current.Language],
        icon: 'pi pi-fw pi-pencil',
        command: (event) => {
          this.clearManage()
          if (this.selectedProcontact != null) {
            this.edit_procontact = true
            this.showManage()
          }
        }
      }
      ,
      {
        label: this.title_import[this.initial_current.Language],
        icon: 'pi pi-fw pi-file-import',
      }
      ,
      {
        label: this.title_export[this.initial_current.Language],
        icon: 'pi pi-fw pi-file-export',
      }
      ,
      {
        label: this.title_edit[this.initial_current.Language],
        icon: 'pi pi-fw pi-pencil',
        command: (event) => {
          this.clearManage()
          if (this.selectedProcontact != null) {
            this.edit_procontact = true
            this.showManage()
          }
        }
      }
      ,
      {
        label: this.title_import[this.initial_current.Language],
        icon: 'pi pi-fw pi-file-import',
      }
      ,
      {
        label: this.title_export[this.initial_current.Language],
        icon: 'pi pi-fw pi-file-export',
      }
      ,
      //
      
      //
      {
        label: this.title_delete[this.initial_current.Language],
        icon: 'pi pi-fw pi-trash',
        command: (event) => {
          this.confirmationService.confirm({
            message: this.title_confirm_delete[this.initial_current.Language],
            header: this.title_confirm[this.initial_current.Language],
             icon: 'pi pi-exclamation-triangle',
            accept: () => {
              if (this.selectedProcontact != null) {
                this.procontact_remove()
              }
            },
            reject: () => {
              this.messageService.add({ severity: 'warn', summary: 'Cancelled', detail: this.title_confirm_cancel[this.initial_current.Language] });
            },
            key: "myDialog"
          });

        }
      },
    ];

    this.menu_procontract = [
      {
        label: this.title_new[this.initial_current.Language],
        icon: 'pi pi-fw pi-plus',
        command: (event) => {
          this.clearManage()
          this.new_procontract = true
          var ref = this.procontract_list.length + 100
          this.selectedProcontract = new ProcontractModel()
          this.selectedProcontract.procontract_id = ref.toString()
          this.showManage()
        }
      }
      ,
      {
        label: this.title_edit[this.initial_current.Language],
        icon: 'pi pi-fw pi-pencil',
        command: (event) => {
          this.clearManage()
          if (this.selectedProcontract != null) {
            this.edit_procontract = true
            this.showManage()
          }
        }
      }
      ,
      {
        label: this.title_import[this.initial_current.Language],
        icon: 'pi pi-fw pi-file-import',
      }
      ,
      {
        label: this.title_export[this.initial_current.Language],
        icon: 'pi pi-fw pi-file-export',
      }
      ,
      {
        label: this.title_delete[this.initial_current.Language],
        icon: 'pi pi-fw pi-trash',
        command: (event) => {
          this.confirmationService.confirm({
            message: this.title_confirm_delete[this.initial_current.Language],
            header: this.title_confirm[this.initial_current.Language],
             icon: 'pi pi-exclamation-triangle',
            accept: () => {
              if (this.selectedProcontract != null) {
                this.procontract_remove()
              }
            },
            reject: () => {
              this.messageService.add({ severity: 'warn', summary: 'Cancelled', detail: this.title_confirm_cancel[this.initial_current.Language] });
            },
            key: "myDialog"
          });

        }
      },

          
    ];

    this.menu_proresponsible = [
      {
        label: this.title_new[this.initial_current.Language],
        icon: 'pi pi-fw pi-plus',
        command: (event) => {
          this.clearManage()
          this.new_proresponsible = true
          var ref = this.proresponsible_list.length + 100
          this.selectedProresponsible = new ProresponsibleModel()
          this.selectedProresponsible.proresponsible_ref = ref.toString()
          this.showManage()
        }
      }
      ,
      {
        label: this.title_edit[this.initial_current.Language],
        icon: 'pi pi-fw pi-pencil',
        command: (event) => {
          this.clearManage()
          if (this.selectedProresponsible != null) {
            this.edit_proresponsible = true
            this.showManage()
          }
        }
      }
      ,
      {
        label: this.title_import[this.initial_current.Language],
        icon: 'pi pi-fw pi-file-import',
      }
      ,
      {
        label: this.title_export[this.initial_current.Language],
        icon: 'pi pi-fw pi-file-export',
      }
      ,
      {
        label: this.title_delete[this.initial_current.Language],
        icon: 'pi pi-fw pi-trash',
        command: (event) => {
          this.confirmationService.confirm({
            message: this.title_confirm_delete[this.initial_current.Language],
            header: this.title_confirm[this.initial_current.Language],
             icon: 'pi pi-exclamation-triangle',
            accept: () => {
              if (this.selectedProresponsible != null) {
                this.proresponsible_remove()
              }
            },
            reject: () => {
              this.messageService.add({ severity: 'warn', summary: 'Cancelled', detail: this.title_confirm_cancel[this.initial_current.Language] });
            },
            key: "myDialog"
          });

        }
      },

          
    ];

    this.menu_protimepol = [
      {
        label: this.title_new[this.initial_current.Language],
        icon: 'pi pi-fw pi-plus',
        command: (event) => {
          this.clearManage()
          this.new_protimepol = true
          this.selectedProtimepol = new ProtimepolModel()
          this.selectedProtimepol.protimepol_id = this.protimepol_list.length + 1
          this.showManage()
        }
      }
      ,
      {
        label: this.title_edit[this.initial_current.Language],
        icon: 'pi pi-fw pi-pencil',
        command: (event) => {
          this.clearManage()
          if (this.selectedProtimepol != null) {

            this.edit_protimepol = true
            this.showManage()
          }
        }
      }
      ,
      {
        label: this.title_import[this.initial_current.Language],
        icon: 'pi pi-fw pi-file-import',
      }
      ,
      {
        label: this.title_export[this.initial_current.Language],
        icon: 'pi pi-fw pi-file-export',
      }
      ,
      {
        label: this.title_delete[this.initial_current.Language],
        icon: 'pi pi-fw pi-trash',
        command: (event) => {
          this.confirmationService.confirm({
            message: this.title_confirm_delete[this.initial_current.Language],
            header: this.title_confirm[this.initial_current.Language],
             icon: 'pi pi-exclamation-triangle',
            accept: () => {
              if (this.selectedProtimepol != null) {
                this.protimepol_remove()
              }
            },
            reject: () => {
              this.messageService.add({ severity: 'warn', summary: 'Cancelled', detail: this.title_confirm_cancel[this.initial_current.Language] });
            },
            key: "myDialog"
          });

        }
      },

           
    ];

    this.menu_projobmain = [
      {
        label: this.title_new[this.initial_current.Language],
        icon: 'pi pi-fw pi-plus',
        command: (event) => {
          this.clearManage()
          this.new_projobmain = true
          var ref = this.projobmain_list.length + 100
          this.selectedProjobmain = new ProjobmainModel()
          this.selectedProjobmain.projobmain_id = ref.toString()

          this.projobcontract_list = []
          this.selectedProjobcontract = new ProjobcontractModel()
          this.projobcost_list = []
          this.selectedProjobcost = new ProjobcostModel()
          this.showManage()
        }
      }
      ,
      {
        label: this.title_edit[this.initial_current.Language],
        icon: 'pi pi-fw pi-pencil',
        command: (event) => {
          this.clearManage()
          if (this.selectedProjobmain != null) {
            this.edit_projobmain = true
            this.projobmain_loadtran()
            this.showManage()
          }
        }
        , disabled: this.disable_projobmain,
      }
      ,
      {
        label: 'Reload',
        icon: 'pi pi-fw pi-refresh',
        command: (event) => {
          this.doLoadProjobmain()
        }
      }
      ,
      {
        label: 'Save',
        icon: 'pi pi-fw pi-save',
        command: (event) => {
          this.confirmRecordJobmain()
        }
      }
      // ,
      // {
      //     label:this.title_import[this.initial_current.Language],
      //     icon:'pi pi-fw pi-file-import',
      // }
      // ,
      // {
      //     label:this.title_export[this.initial_current.Language],
      //     icon:'pi pi-fw pi-file-export',
      // }
      ,
      {
        label: this.title_delete[this.initial_current.Language],
        icon: 'pi pi-fw pi-trash',
        command: (event) => {
          this.confirmationService.confirm({
            message: this.title_confirm_delete[this.initial_current.Language],
            header: this.title_confirm[this.initial_current.Language],
             icon: 'pi pi-exclamation-triangle',
            accept: () => {
              if (this.selectedProjobmain != null) {
                this.projobmain_remove()
              }
            },
            reject: () => {
              this.messageService.add({ severity: 'warn', summary: 'Cancelled', detail: this.title_confirm_cancel[this.initial_current.Language] });
            },
            key: "myDialog"
          });

        }
      },
          
    ];

    this.menu_projobcontract = [
      {
        label: this.title_new[this.initial_current.Language],
        icon: 'pi pi-fw pi-plus',
        command: (event) => {
          this.clearManage()
          this.new_projobcontract = true
          var ref = this.projobcontract_list.length + 100
          this.selectedProjobcontract = new ProjobcontractModel()
          this.selectedProjobcontract.projobcontract_id = ref.toString()

          this.showManage()
        }
      }
      ,
      {
        label: this.title_edit[this.initial_current.Language],
        icon: 'pi pi-fw pi-pencil',
        command: (event) => {
          this.clearManage()
          if (this.selectedProjobcontract != null) {
            this.edit_projobcontract = true
            this.showManage()
          }
        }
      }
      ,
      {
        label: this.title_import[this.initial_current.Language],
        icon: 'pi pi-fw pi-file-import',
      }
      ,
      {
        label: this.title_export[this.initial_current.Language],
        icon: 'pi pi-fw pi-file-export',
      }
      ,
      {
        label: this.title_delete[this.initial_current.Language],
        icon: 'pi pi-fw pi-trash',
        command: (event) => {
          this.confirmationService.confirm({
            message: this.title_confirm_delete[this.initial_current.Language],
            header: this.title_confirm[this.initial_current.Language],
             icon: 'pi pi-exclamation-triangle',
            accept: () => {
              if (this.selectedProjobcontract != null) {
                this.projobcontract_remove()
              }
            },
            reject: () => {
              this.messageService.add({ severity: 'warn', summary: 'Cancelled', detail: this.title_confirm_cancel[this.initial_current.Language] });
            },
            key: "myDialog"
          });

        }
      },
           
    ];

    this.menu_projobcost = [
      {
        label: this.title_new[this.initial_current.Language],
        icon: 'pi pi-fw pi-plus',
        command: (event) => {
          this.clearManage()
          this.new_projobcost = true
          var ref = this.projobcost_list.length + 100
          this.selectedProjobcost = new ProjobcostModel()
          this.selectedProjobcost.projobcost_id = ref.toString()

          this.showManage()
        }
      }
      ,
      {
        label: this.title_edit[this.initial_current.Language],
        icon: 'pi pi-fw pi-pencil',
        command: (event) => {
          this.clearManage()
          if (this.selectedProjobcost != null) {
            this.edit_projobcost = true

            this.showManage()
          }
        }
      }
      ,
      {
        label: this.title_import[this.initial_current.Language],
        icon: 'pi pi-fw pi-file-import',
      }
      ,
      {
        label: this.title_export[this.initial_current.Language],
        icon: 'pi pi-fw pi-file-export',
      }
      ,
      {
        label: this.title_delete[this.initial_current.Language],
        icon: 'pi pi-fw pi-trash',
        command: (event) => {
          this.confirmationService.confirm({
            message: this.title_confirm_delete[this.initial_current.Language],
            header: this.title_confirm[this.initial_current.Language],
             icon: 'pi pi-exclamation-triangle',
            accept: () => {
              if (this.selectedProjobcost != null) {
                this.projobcost_remove()
              }
            },
            reject: () => {
              this.messageService.add({ severity: 'warn', summary: 'Cancelled', detail: this.title_confirm_cancel[this.initial_current.Language] });
            },
            key: "myDialog"
          });

        }
      },
      
    ];

    this.menu_projobmachine = [
      {
        label: this.title_new[this.initial_current.Language],
        icon: 'pi pi-fw pi-plus',
        command: (event) => {
          this.clearManage()
          this.new_projobmachine = true
          var ref = this.projobmachine_list.length + 100
          this.selectedProjobmachine = new ProjobmachineModel()
          this.selectedProjobmachine.projobmachine_id = ref.toString()

          this.showManage()
        }
      }
      ,
      {
        label: this.title_edit[this.initial_current.Language],
        icon: 'pi pi-fw pi-pencil',
        command: (event) => {
          this.clearManage()
          if (this.selectedProjobmachine != null) {
            this.edit_projobmachine = true

            this.showManage()
          }
        }
      }
      ,
      {
        label: this.title_import[this.initial_current.Language],
        icon: 'pi pi-fw pi-file-import',
      }
      ,
      {
        label: this.title_export[this.initial_current.Language],
        icon: 'pi pi-fw pi-file-export',
      }
      ,
      {
        label: this.title_delete[this.initial_current.Language],
        icon: 'pi pi-fw pi-trash',
        command: (event) => {
          this.confirmationService.confirm({
            message: this.title_confirm_delete[this.initial_current.Language],
            header: this.title_confirm[this.initial_current.Language],
             icon: 'pi pi-exclamation-triangle',
            accept: () => {
              if (this.selectedProjobmachine != null) {
                this.projobmachine_remove()
              }
            },
            reject: () => {
              this.messageService.add({ severity: 'warn', summary: 'Cancelled', detail: this.title_confirm_cancel[this.initial_current.Language] });
            },
            key: "myDialog"
          });

        }
      },
       
    ];

    this.menu_projobpol = [
      {
        label: this.title_new[this.initial_current.Language],
        icon: 'pi pi-fw pi-plus',
        command: (event) => {
          this.clearManage()
          this.new_projobpol = true
          var ref = this.projobpol_list.length + 100
          this.selectedProjobpol = new ProjobpolModel()
          this.selectedProjobpol.projobpol_id = ref.toString()

          this.showManage()
        }
      }
      ,
      {
        label: this.title_edit[this.initial_current.Language],
        icon: 'pi pi-fw pi-pencil',
        command: (event) => {
          this.clearManage()
          if (this.selectedProjobpol != null) {
            this.edit_projobpol = true

            this.showManage()
          }
        }
      }
      ,
      {
        label: this.title_import[this.initial_current.Language],
        icon: 'pi pi-fw pi-file-import',
      }
      ,
      {
        label: this.title_export[this.initial_current.Language],
        icon: 'pi pi-fw pi-file-export',
      }
      ,
      {
        label: this.title_delete[this.initial_current.Language],
        icon: 'pi pi-fw pi-trash',
        command: (event) => {
          this.confirmationService.confirm({
            message: this.title_confirm_delete[this.initial_current.Language],
            header: this.title_confirm[this.initial_current.Language],
             icon: 'pi pi-exclamation-triangle',
            accept: () => {
              if (this.selectedProjobpol != null) {
                this.projobpol_remove()
              }
            },
            reject: () => {
              this.messageService.add({ severity: 'warn', summary: 'Cancelled', detail: this.title_confirm_cancel[this.initial_current.Language] });
            },
            key: "myDialog"
          });

        }
      },
       
        
    ];

    this.menu_projobshift = [
      {
        label: this.title_new[this.initial_current.Language],
        icon: 'pi pi-fw pi-plus',
        command: (event) => {
          this.clearManage()
          this.new_projobshift = true
          var ref = this.projobshift_list.length + 100
          this.selectedProjobshift = new ProjobshiftModel()
          this.selectedProjobshift.projobshift_id = ref.toString()

          this.showManage()
        }
      }
      ,
      {
        label: this.title_edit[this.initial_current.Language],
        icon: 'pi pi-fw pi-pencil',
        command: (event) => {
          this.clearManage()
          if (this.selectedProjobshift != null) {
            this.edit_projobshift = true
            this.showManage()
          }
        }
      }
      ,
      {
        label: this.title_import[this.initial_current.Language],
        icon: 'pi pi-fw pi-file-import',
      }
      ,
      {
        label: this.title_export[this.initial_current.Language],
        icon: 'pi pi-fw pi-file-export',
      }
      ,
      {
        label: this.title_delete[this.initial_current.Language],
        icon: 'pi pi-fw pi-trash',
        command: (event) => {
          this.confirmationService.confirm({
            message: this.title_confirm_delete[this.initial_current.Language],
            header: this.title_confirm[this.initial_current.Language],
             icon: 'pi pi-exclamation-triangle',
            accept: () => {
              if (this.selectedProjobmachine != null) {
                this.projobshift_remove()
              }
            },
            reject: () => {
              this.messageService.add({ severity: 'warn', summary: 'Cancelled', detail: this.title_confirm_cancel[this.initial_current.Language] });
            },
            key: "myDialog"
          });

        }
      },
      
    ];

    this.menu_projobsub = [
      {
        label: this.title_new[this.initial_current.Language],
        icon: 'pi pi-fw pi-plus',
        command: (event) => {
          this.clearManage()
          this.new_projobsub = true
          var ref = this.projobsub_list.length + 100
          this.selectedProjobsub = new ProjobsubModel()
          this.selectedProjobsub.projobsub_id = ref.toString()
          this.showManage()
        }
      }
      ,
      {
        label: this.title_edit[this.initial_current.Language],
        icon: 'pi pi-fw pi-pencil',
        command: (event) => {
          this.clearManage()
          if (this.selectedProjobsub != null) {
            this.edit_projobsub = true
            this.showManage()
          }
        }
      }
      ,
      {
        label: 'Save',
        icon: 'pi pi-fw pi-save',
        command: (event) => {
          this.confirmRecordJobsub()
        }
      }
      ,
      {
        label: this.title_import[this.initial_current.Language],
        icon: 'pi pi-fw pi-file-import',
      }
      ,
      {
        label: this.title_export[this.initial_current.Language],
        icon: 'pi pi-fw pi-file-export',
      }
      ,
      {
        label: this.title_delete[this.initial_current.Language],
        icon: 'pi pi-fw pi-trash',
        command: (event) => {
          this.confirmationService.confirm({
            message: this.title_confirm_delete[this.initial_current.Language],
            header: this.title_confirm[this.initial_current.Language],
             icon: 'pi pi-exclamation-triangle',
            accept: () => {
              if (this.selectedProjobsub != null) {
                this.projobsub_remove()
              }
            },
            reject: () => {
              this.messageService.add({ severity: 'warn', summary: 'Cancelled', detail: this.title_confirm_cancel[this.initial_current.Language] });
            },
            key: "myDialog"
          });

        }
      },
       
    ];

    this.menu_projobsubcontract = [
      {
        label: this.title_new[this.initial_current.Language],
        icon: 'pi pi-fw pi-plus',
        command: (event) => {
          this.clearManage()
          this.new_projobsubcontract = true
          var ref = this.projobsubcontract_list.length + 100
          this.selectedProjobsubcontract = new ProjobcontractModel()
          this.selectedProjobsubcontract.projobcontract_id = ref.toString()

          this.showManage()
        }
      }
      ,
      {
        label: this.title_edit[this.initial_current.Language],
        icon: 'pi pi-fw pi-pencil',
        command: (event) => {
          this.clearManage()
          if (this.selectedProjobsubcontract != null) {
            this.edit_projobsubcontract = true
            this.showManage()
          }
        }
      }
      ,
      {
        label: this.title_import[this.initial_current.Language],
        icon: 'pi pi-fw pi-file-import',
      }
      ,
      {
        label: this.title_export[this.initial_current.Language],
        icon: 'pi pi-fw pi-file-export',
      }
      ,
      {
        label: this.title_delete[this.initial_current.Language],
        icon: 'pi pi-fw pi-trash',
        command: (event) => {
          this.confirmationService.confirm({
            message: this.title_confirm_delete[this.initial_current.Language],
            header: this.title_confirm[this.initial_current.Language],
             icon: 'pi pi-exclamation-triangle',
            accept: () => {
              if (this.selectedProjobsubcontract != null) {
                this.projobsubcontract_remove()
              }
            },
            reject: () => {
              this.messageService.add({ severity: 'warn', summary: 'Cancelled', detail: this.title_confirm_cancel[this.initial_current.Language] });
            },
            key: "myDialog"
          });

        }
      },
      
    ];

    this.menu_projobsubcost = [
      {
        label: this.title_new[this.initial_current.Language],
        icon: 'pi pi-fw pi-plus',
        command: (event) => {
          this.clearManage()
          this.new_projobsubcost = true
          var ref = this.projobsubcost_list.length + 100
          this.selectedProjobsubcost = new ProjobcostModel()
          this.selectedProjobsubcost.projobcost_id = ref.toString()

          this.showManage()
        }
      }
      ,
      {
        label: this.title_edit[this.initial_current.Language],
        icon: 'pi pi-fw pi-pencil',
        command: (event) => {
          this.clearManage()
          if (this.selectedProjobsubcost != null) {
            this.edit_projobsubcost = true

            this.showManage()
          }
        }
      }
      ,
      {
        label: this.title_import[this.initial_current.Language],
        icon: 'pi pi-fw pi-file-import',
      }
      ,
      {
        label: this.title_export[this.initial_current.Language],
        icon: 'pi pi-fw pi-file-export',
      }
      ,
      {
        label: this.title_delete[this.initial_current.Language],
        icon: 'pi pi-fw pi-trash',
        command: (event) => {
          this.confirmationService.confirm({
            message: this.title_confirm_delete[this.initial_current.Language],
            header: this.title_confirm[this.initial_current.Language],
             icon: 'pi pi-exclamation-triangle',
            accept: () => {
              if (this.selectedProjobsubcost != null) {
                this.projobsubcost_remove()
              }
            },
            reject: () => {
              this.messageService.add({ severity: 'warn', summary: 'Cancelled', detail: this.title_confirm_cancel[this.initial_current.Language] });
            },
            key: "myDialog"
          });

        }
      },
 
    ];

    this.menu_projobemp = [
      {
        label: this.title_new[this.initial_current.Language],
        icon: 'pi pi-fw pi-plus',
        command: (event) => {
          this.clearManage()
          this.new_projobemp = true
          var ref = this.projobemp_list.length + 100
          this.selectedProjobemp = new ProjobempModel()
          this.selectedProjobemp.projobemp_id = ref.toString()
          this.selectedProjobemp.projobemp_type = "R"

          this.showManage()
        }
      }
      ,
      {
        label: this.title_edit[this.initial_current.Language],
        icon: 'pi pi-fw pi-pencil',
        command: (event) => {
          this.clearManage()
          if (this.selectedProjobemp != null) {
            this.edit_projobemp = true

            this.showManage()
          }
        }
      }
      ,
      {
        label: this.title_import[this.initial_current.Language],
        icon: 'pi pi-fw pi-file-import',
      }
      ,
      {
        label: this.title_export[this.initial_current.Language],
        icon: 'pi pi-fw pi-file-export',
      }
      ,
      {
        label: this.title_delete[this.initial_current.Language],
        icon: 'pi pi-fw pi-trash',
        command: (event) => {
          this.confirmationService.confirm({
            message: this.title_confirm_delete[this.initial_current.Language],
            header: this.title_confirm[this.initial_current.Language],
             icon: 'pi pi-exclamation-triangle',
            accept: () => {
              if (this.selectedProjobemp != null) {
                this.projobemp_remove()
              }
            },
            reject: () => {
              this.messageService.add({ severity: 'warn', summary: 'Cancelled', detail: this.title_confirm_cancel[this.initial_current.Language] });
            },
            key: "myDialog"
          });

        }
      },
 
    ];



  }


  selectedProject: ProjectModel = new ProjectModel;
  doLoadProject() {
    var project_list: ProjectModel[] = [];

    this.projectService.project_get(this.initial_current.CompCode, this.project_code).then(async (res) => {
      project_list = await res;

      if (project_list.length > 0) {
        this.selectedProject = project_list[0]

        setTimeout(() => {
          this.doLoadProaddress()
          this.doLoadProcontact()
          this.doLoadProcontract()
          this.doLoadProresponsible()
          this.doLoadProtimepol()

          this.doLoadProjobversion()
          //this.doLoadProjobsub()

          this.doLoadProjobemp()
          this.doLoadProtimepol()

        }, 300);
      }

    });
  }

  
  doLoadMaster() {
    this.genaralService.probusiness_get().then((res) => {
      //// console.log(res)
      this.probusiness_list = res;
    });

    this.genaralService.protype_get().then((res) => {
      this.protype_list = res;
    });

    this.genaralService.proarea_get().then((res) => {
      this.proarea_list = res;
    });

    this.genaralService.progroup_get().then((res) => {
      this.progroup_list = res;
    });
    //
    var tmp = new RoundsModel();
    tmp.round_group = this.rounds_type = "Time";
    this.roundsService.rounds_get(tmp).then((res) => {
      this.time_list = res;
      console.log(res,'Time')
    });

    tmp.round_group = this.rounds_type = "Currency";
    this.roundsService.rounds_get(tmp).then((res) => {
      this.currency_list = res;
    });

    var tmps = new YearPeriodModels();
    tmps.year_group = "LEAVE"
    this.yearServices.year_get(tmps).then((res) => {
      this.yeargroup_list = res;
    });
    //


    this.doLoadInitial()
    this.doLoadPosition()
    this.doLoadEmpStatus()

    this.doLoadPolOT()
    this.doLoadPolAllw()
    this.doLoadPolDg()
    this.doLoadPolLv()
    this.doLoadPolLt()

    this.doLoadPoljobtype()
    this.doLoadPolShift()
    this.doLoadPolProtimepol()

    this.doLoadPolProslip()
    this.doLoadPolProuniform()
    this.doLoadPolCost()
    this.doLoadJobemptype()
    // this.doLoadRounds()

  }

  confirmRecord() {
    this.confirmationService.confirm({
      message: this.title_confirm_record[this.initial_current.Language],
      header: this.title_confirm[this.initial_current.Language],
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.selectedProject.company_code = this.initial_current.CompCode

        this.projectService.project_record(this.selectedProject).then((res) => {
          let result = JSON.parse(res);
          console.log(res,'rrr')
          if (result.success) {

            //-- Transaction
            this.proaddress_record()
            this.procontact_record()
            this.procontract_record()
            this.proresponsible_record()
            this.protimepol_record()

            //this.projobcontract_record()

            this.messageService.add({ severity: 'success', summary: 'Success', detail: result.message });
            this.doLoadProject()
          }
          else {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: result.message });
          }
        });
      },
      reject: () => {
        this.messageService.add({ severity: 'warn', summary: 'Cancelled', detail: this.title_confirm_cancel[this.initial_current.Language] });
      },
      key: "myDialog"
    });
  }

  confirmDelete() {
    this.confirmationService.confirm({
      message: this.title_confirm_delete[this.initial_current.Language],
      header: this.title_confirm[this.initial_current.Language],
      icon: 'pi pi-exclamation-triangle',
      accept: () => {

      },
      reject: () => {
        this.messageService.add({ severity: 'warn', summary: 'Cancelled', detail: this.title_confirm_cancel[this.initial_current.Language] });
      },
      key: "myDialog"
    });
  }

  confirmRecordJobmain() {
    this.confirmationService.confirm({
      message: this.title_confirm_record[this.initial_current.Language],
      header: this.title_confirm[this.initial_current.Language],
      icon: 'pi pi-exclamation-triangle',
      accept: () => {

        this.projectDetailService.projobmain_record(this.version_selected, this.selectedProject.project_code, this.projobmain_list).then((res) => {
          let result = JSON.parse(res);
          if (result.success) {

            //var jobcontract = this.projobcontract_record()
            var jobcost = this.projobcost_record()
            var jobmachine = this.projobmachine_record()

            var jobshift = this.projobshift_record()

            var jobpol = this.projobpol_record()

            this.messageService.add({ severity: 'success', summary: 'Success', detail: "Record Success.." });

            this.displayManage = false

            setTimeout(() => {

              this.projobmain_loadtran()

            }, 400);

          }
          else {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: "Record Not Success.." });
          }
        })
      },
      reject: () => {
        this.messageService.add({ severity: 'warn', summary: 'Cancelled', detail: this.title_confirm_cancel[this.initial_current.Language] });
      },
      key: "myDialog"
    });
  }

  confirmRecordJobsub() {
    this.confirmationService.confirm({
      message: this.title_confirm_record[this.initial_current.Language],
      header: this.title_confirm[this.initial_current.Language],
      icon: 'pi pi-exclamation-triangle',
      accept: () => {

        this.projectDetailService.projobsub_record(this.version_selected, this.selectedProject.project_code, this.projobsub_list).then((res) => {
          let result = JSON.parse(res);
          if (result.success) {

            this.messageService.add({ severity: 'success', summary: 'Success', detail: "Record Success.." });

            var jobcontract = this.projobsubcontract_record()
            var jobcost = this.projobsubcost_record()
            // var jobmachine = this.projobmachine_record()

            // this.displayManage = false

            setTimeout(() => {
              this.doLoadProjobsubcontract()
              this.doLoadProjobsubcost()
            }, 200);

          }
          else {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: "Record Not Success.." });
          }
        })
      },
      reject: () => {
        this.messageService.add({ severity: 'warn', summary: 'Cancelled', detail: this.title_confirm_cancel[this.initial_current.Language] });
      },
      key: "myDialog"
    });
  }

  displayUpload: boolean = false;
  showUpload() {
    this.displayUpload = true;
  }

  clearManage() {
    this.new_procontact = false; this.edit_procontact = false;
    this.new_proresponsible = false; this.edit_proresponsible = false;
    this.new_procontract = false; this.edit_procontract = false;
    this.new_projobcost = false; this.edit_projobcost = false;
    this.new_projobmachine = false; this.edit_projobmachine = false;

    this.edit_projobversion = false; this.new_projobversion = false;

  }

  displayManage: boolean = false;
  position: string = "right";
  showManage() {
    this.displayManage = true;

    if (this.initial_current.Language == "EN") {

      if (this.new_procontact || this.edit_procontact) {
        this.manage_title = "Contact"
      }
      else if (this.new_proresponsible || this.edit_proresponsible) {
        this.manage_title = "Responsible"
      }
      else if (this.new_projobcontract || this.edit_projobcontract) {
        this.manage_title = "Contract"
      }
      else if (this.new_projobcost || this.edit_projobcost) {
        this.manage_title = "Cost"
      }
      else if (this.new_projobmachine || this.edit_projobmachine) {
        this.manage_title = "Finger print"
      }
      else if (this.new_projobsub || this.edit_projobsub) {
        this.manage_title = "Job Clear"
      }
      else if (this.new_projobsubcontract || this.edit_projobsubcontract) {
        this.manage_title = "Contract"
      }
      else if (this.new_projobsubcost || this.edit_projobsubcost) {
        this.manage_title = "Cost"
      }

    }
    else {

      if (this.new_procontact || this.edit_procontact) {
        this.manage_title = "ผู้ติดต่อ"
      }
      else if (this.new_proresponsible || this.edit_proresponsible) {
        this.manage_title = "ผู้รับผิดชอบ"
      }
      else if (this.new_projobcontract || this.edit_projobcontract) {
        this.manage_title = "สัญญา"
      }
      else if (this.new_projobcost || this.edit_projobcost) {
        this.manage_title = "ต้นทุน"
      }
      else if (this.new_projobmachine || this.edit_projobmachine) {
        this.manage_title = "เครื่องบันทึกเวลา"
      }
      else if (this.new_projobsub || this.edit_projobsub) {
        this.manage_title = "งานเคลีย์"
      }
      else if (this.new_projobsubcontract || this.edit_projobsubcontract) {
        this.manage_title = "สัญญา"
      }
      else if (this.new_projobsubcost || this.edit_projobsubcost) {
        this.manage_title = "ต้นทุน"
      }

    }


  }

  fileToUpload: File | any = null;
  handleFileInput(file: FileList) {
    this.fileToUpload = file.item(0);
  }
  doUploadGenaral() {

    this.displayUpload = false;

    const filename = "Project_" + this.datePipe.transform(new Date(), 'yyyyMMddHHmm');
    const filetype = "xls";

    this.projectService.project_import(this.fileToUpload, filename, filetype).then((res) => {
      let result = JSON.parse(res);
      if (result.success) {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: result.message });
        this.doLoadProject()
      }
      else {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: result.message });
      }
    });

  }

  proaddress_list: ProaddressModel[] = [];
  selectedProaddress: ProaddressModel = new ProaddressModel();
  doLoadProaddress() {
    this.projectDetailService.proaddress_get(this.project_code).then((res) => {
      this.proaddress_list = res;
      if (this.proaddress_list.length > 0) {
        this.selectedProaddress = this.proaddress_list[0]
      }
    });
  }
  proaddress_record() {
    this.selectedProaddress.proaddress_type = "1"
    this.selectedProaddress.project_code = this.selectedProject.project_code
    this.projectDetailService.proaddress_record(this.selectedProaddress).then((res) => {
      let result = JSON.parse(res);
      if (result.success) {
      }
      else {
      }
    });
  }

  procontact_list: ProcontactModel[] = [];
  selectedProcontact: ProcontactModel = new ProcontactModel();
  doLoadProcontact() {
    this.projectDetailService.procontact_get(this.project_code).then((res) => {
      this.procontact_list = res;
      if (this.procontact_list.length > 0) {
        this.selectedProcontact = this.procontact_list[0]
      }
    });
  }
  onRowSelectProcontact(event: Event) {
    this.edit_procontact = true;

  }
  procontact_summit() {

    this.procontact_addItem(this.selectedProcontact)
    this.new_procontact = false
    this.edit_procontact = false
    this.displayManage = false
  }
  procontact_remove() {
    //this.procontact_list = [...this.procontact_list, this.selectedProcontact]
    this.selectedProcontact.procontact_ref = "9999";
    this.procontact_addItem(this.selectedProcontact)
    this.new_procontact = false
    this.edit_procontact = false
  }
  procontact_cancel() {
    this.edit_procontact = false
    this.new_procontact = false
    this.displayManage = false
  }
  procontact_addItem(model: ProcontactModel) {
    const itemNew: ProcontactModel[] = [];
    for (let i = 0; i < this.procontact_list.length; i++) {
      if (this.procontact_list[i].procontact_ref == model.procontact_ref) {
        //-- Notting
      }
      else {
        itemNew.push(this.procontact_list[i]);
      }
    }
    //-- 9999 for delete
    if (model.procontact_ref != "9999") {
      itemNew.push(model);
    }
    this.procontact_list = [];
    this.procontact_list = itemNew;
    this.procontact_list.sort(function (a, b) { return parseInt(a.procontact_ref) - parseInt(b.procontact_ref); })
  }
  procontact_record() {
    if (this.procontact_list.length == 0) {
      return
    }
    this.projectDetailService.procontact_record(this.selectedProject.project_code, this.procontact_list).then((res) => {
      let result = JSON.parse(res);
      if (result.success) {
      }
      else {
      }
    });
  }

  //-- Project contract
  procontract_list: ProcontractModel[] = [];
  selectedProcontract: ProcontractModel = new ProcontractModel();
  doLoadProcontract() {
    this.projectDetailService.procontract_get(this.project_code).then((res) => {
      this.procontract_list = res;
      if (this.procontract_list.length > 0) {
        this.selectedProcontract = this.procontract_list[0]
      }
    });
  }
  onRowSelectProcontract(event: Event) {
  }
  procontract_summit() {

    this.procontract_addItem(this.selectedProcontract)
    this.new_procontract = false
    this.edit_procontract = false
    this.displayManage = false
  }
  procontract_remove() {
    //this.procontact_list = [...this.procontact_list, this.selectedProcontact]
    this.selectedProcontract.procontract_ref = "9999";
    this.procontract_addItem(this.selectedProcontract)
    this.new_procontract = false
    this.edit_procontract = false
  }
  procontract_cancel() {
    this.edit_procontract = false
    this.new_procontract = false
    this.displayManage = false
  }
  procontract_addItem(model: ProcontractModel) {

    // console.log(model.procontract_ref)

    const itemNew: ProcontractModel[] = [];
    for (let i = 0; i < this.procontract_list.length; i++) {
      if (this.procontract_list[i].procontract_ref == model.procontract_ref) {
        //-- Notting
      }
      else {
        itemNew.push(this.procontract_list[i]);
      }
    }
    //-- 9999 for delete
    if (model.procontract_ref != "9999") {
      itemNew.push(model);
    }
    this.procontract_list = [];
    this.procontract_list = itemNew;
    this.procontract_list.sort(function (a, b) { return parseInt(a.procontract_ref) - parseInt(b.procontract_ref); })
  }
  procontract_record() {
    if (this.procontract_list.length == 0) {
      return
    }
    this.projectDetailService.procontract_record(this.selectedProject.project_code, this.procontract_list).then((res) => {
      let result = JSON.parse(res);
      if (result.success) {
      }
      else {
      }
    });
  }

  //-- Project responsible
  proresponsible_list: ProresponsibleModel[] = [];
  selectedProresponsible: ProresponsibleModel = new ProresponsibleModel();
  doLoadProresponsible() {
    this.projectDetailService.proresponsible_get(this.project_code).then((res) => {
      this.proresponsible_list = res;
      if (this.proresponsible_list.length > 0) {
        this.selectedProresponsible = this.proresponsible_list[0]
      }
    });
  }
  onRowSelectProresponsible(event: Event) {
  }
  proresponsible_summit() {

    this.proresponsible_addItem(this.selectedProresponsible)
    this.new_proresponsible = false
    this.edit_proresponsible = false
    this.displayManage = false
  }
  proresponsible_remove() {
    this.selectedProresponsible.proresponsible_ref = "9999";
    this.proresponsible_addItem(this.selectedProresponsible)
    this.new_proresponsible = false
    this.edit_proresponsible = false
  }
  proresponsible_cancel() {
    this.edit_proresponsible = false
    this.new_proresponsible = false
    this.displayManage = false
  }
  proresponsible_addItem(model: ProresponsibleModel) {
    const itemNew: ProresponsibleModel[] = [];
    for (let i = 0; i < this.proresponsible_list.length; i++) {
      if (this.proresponsible_list[i].proresponsible_ref == model.proresponsible_ref) {
        //-- Notting
      }
      else {
        itemNew.push(this.proresponsible_list[i]);
      }
    }
    //-- 9999 for delete
    if (model.proresponsible_ref != "9999") {
      itemNew.push(model);
    }
    this.proresponsible_list = [];
    this.proresponsible_list = itemNew;
    this.proresponsible_list.sort(function (a, b) { return parseInt(a.proresponsible_ref) - parseInt(b.proresponsible_ref); })
  }
  proresponsible_record() {
    if (this.proresponsible_list.length == 0) {
      return
    }
    this.projectDetailService.proresponsible_record(this.selectedProject.project_code, this.proresponsible_list).then((res) => {
      let result = JSON.parse(res);
      if (result.success) {
      }
      else {
      }
    });
  }

  //-- Project time policy
  polot_list: any[] = [];
  selectedProtimepol_ot: OvertimeModels = new OvertimeModels;
  doLoadPolOT() {
    var tmp = new OvertimeModels();
    this.otservices.ot_get(tmp).then(async (res) => {
      await res.forEach((element: OvertimeModels) => {
        this.polot_list.push(
          {
            name: this.initial_current.Language == "EN" ? element.rateot_name_en : element.rateot_name_th,
            code: element.rateot_code
          }
        )
      });
    });
  }


  polallw_list: any[] = [];
  doLoadPolAllw() {
    var tmp = new cls_MTPlantimeallw();
    this.timeallwservices.timeallow_get(tmp).then(async (res) => {
      await res.forEach((element: cls_MTPlantimeallw) => {
        this.polallw_list.push(
          {
            name: this.initial_current.Language == "EN" ? element.plantimeallw_name_en : element.plantimeallw_name_th,
            code: element.plantimeallw_code
          }
        )
      });
    });
  }

  poldg_list: any[] = [];
  doLoadPolDg() {
    var tmp = new DiligenceModels();
    this.diligenceServices.diligence_get(tmp).then(async (res) => {
      await res.forEach((element: DiligenceModels) => {
        this.poldg_list.push(
          {
            name: this.initial_current.Language == "EN" ? element.diligence_name_en : element.diligence_name_th,
            code: element.diligence_code
          }
        )
      });
    });
  }

  pollv_list: any[] = [];
  doLoadPolLv() {
    var tmp = new LeaveplanModels();
    this.planleaveService.planleave_get(tmp).then(async (res) => {
      res.forEach((element: LeaveplanModels) => {
        this.pollv_list.push(
          {
            name: this.initial_current.Language == "EN" ? element.planleave_name_en : element.planleave_name_th,
            code: element.planleave_code
          }
        )
      });
    });
  }


  pollt_list: any[] = [];
  doLoadPolLt() {
    var tmp = new LateModels();
    this.lateServices.late_get(tmp).then(async (res) => {
      await res.forEach((element: LateModels) => {
        this.pollt_list.push(
          {
            name: this.initial_current.Language == "EN" ? element.late_name_en : element.late_name_th,
            code: element.late_code
          }
        )
      });
    });
  }


  protimepol_list: ProtimepolModel[] = [];
  selectedProtimepol: ProtimepolModel = new ProtimepolModel();
  doLoadProtimepol() {
    this.projectDetailService.protimepol_get(this.project_code).then((res) => {
      this.protimepol_list = res;
      if (this.protimepol_list.length > 0) {
        this.selectedProtimepol = this.protimepol_list[0]
      }
    });
  }
  onRowSelectProtimepol(event: Event) {
  }
  protimepol_summit() {

    this.protimepol_addItem(this.selectedProtimepol)
    this.new_protimepol = false
    this.edit_protimepol = false
    this.displayManage = false
  }
  protimepol_remove() {
    this.selectedProtimepol.protimepol_id = 9999;
    this.protimepol_addItem(this.selectedProtimepol)
    this.new_protimepol = false
    this.edit_protimepol = false
  }
  protimepol_cancel() {
    this.edit_protimepol = false
    this.new_protimepol = false
    this.displayManage = false
  }
  protimepol_addItem(model: ProtimepolModel) {
    const itemNew: ProtimepolModel[] = [];
    for (let i = 0; i < this.protimepol_list.length; i++) {
      if (this.protimepol_list[i].protimepol_code == model.protimepol_code) {
        //-- Notting
      }
      else {
        itemNew.push(this.protimepol_list[i]);
      }
    }
    //-- 9999 for delete
    if (model.protimepol_id != 9999) {
      itemNew.push(model);
    }
    this.protimepol_list = [];
    this.protimepol_list = itemNew;
    this.protimepol_list.sort(function (a, b) { return a.protimepol_id - b.protimepol_id; })
  }
  protimepol_record() {
    if (this.protimepol_list.length == 0) {
      return
    }
    this.projectDetailService.protimepol_record(this.selectedProject.project_code, this.protimepol_list).then((res) => {
      let result = JSON.parse(res);
      if (result.success) {
      }
      else {
      }
    });
  }

  //-- Job version

  version_selected: string = "";
  version_fromdate: string | any = null;
  version_todate: string | any = null;

  version_transaction_id: string | any = null;
  version_custno: string | any = null;

  projobversion_list: ProjobversionModel[] = [];
  selectedProjobversion: ProjobversionModel = new ProjobversionModel();

  manageProjobversion: ProjobversionModel = new ProjobversionModel();

  doLoadProjobversion() {

    this.selectedProjobversion = new ProjobversionModel()

    this.projectDetailService.projobversion_get(this.project_code).then(async (res) => {

      this.projobversion_list = await res;

      if (this.projobversion_list.length > 0) {
        this.selectedProjobversion = this.projobversion_list[0]
        this.printVersion()
      }

    });


    setTimeout(() => {
      this.doLoadProjobmain()
    }, 1000);
  }

  onSelectProjobversion(event: any) {

    setTimeout(() => {
      this.printVersion()
    }, 500);
  }

  printVersion() {
    this.version_selected = this.selectedProjobversion.version
    this.version_fromdate = this.datePipe.transform(this.selectedProjobversion.fromdate, 'dd/MM/yyyy')
    this.version_todate = this.datePipe.transform(this.selectedProjobversion.todate, 'dd/MM/yyyy')
    this.version_transaction_id = this.selectedProjobversion.transaction_id
    this.version_custno = this.selectedProjobversion.custno

    this.doLoadProjobmain()
    this.doLoadProjobsub()

  }



  //-- Project jobmain
  projobmain_list: ProjobmainModel[] = [];
  selectedProjobmain: ProjobmainModel = new ProjobmainModel();
  doLoadProjobmain() {

    this.projectDetailService.projobmain_get(this.version_selected, this.project_code).then(async (res) => {
      this.projobmain_list = await res;
      setTimeout(() => {
        this.projobmain_summary()
        this.projobmain_loadtran()
      }, 2000);
    });
  }

  doGetProjobmainDetail(code: string): string {
    for (let i = 0; i < this.projobmain_list.length; i++) {
      if (this.projobmain_list[i].projobmain_code == code) {
        if (this.initial_current.Language == "TH") {
          return this.projobmain_list[i].projobmain_name_th;
        }
        else {
          return this.projobmain_list[i].projobmain_name_en;
        }
      }
    }
    return ""
  }

  onRowSelectProjobmain(event: Event) {

    if (this.selectedProjobmain == null) {

    }
    else {

      this.projobmain_loadtran()

      this.menu_projobmain[1] =
      {
        label: this.title_edit[this.initial_current.Language],
        icon: 'pi pi-fw pi-pencil',
        command: (event) => {
          if (this.selectedProjobmain != null) {
            this.edit_projobmain = true
            this.projobmain_loadtran()
          }
        }
      }

    }

  }
  projobmain_summit() {

    this.projobmain_addItem(this.selectedProjobmain)
    this.new_projobmain = false
    this.edit_projobmain = false

    this.displayManage = false
  }
  projobmain_remove() {
    this.selectedProjobmain.projobmain_id = "9999";
    this.projobmain_addItem(this.selectedProjobmain)
    this.new_projobmain = false
    this.edit_projobmain = false
  }
  projobmain_cancel() {
    this.edit_projobmain = false
    this.new_projobmain = false

    this.displayManage = false
  }
  projobmain_addItem(model: ProjobmainModel) {
    const itemNew: ProjobmainModel[] = [];
    for (let i = 0; i < this.projobmain_list.length; i++) {
      if (this.projobmain_list[i].projobmain_code == model.projobmain_code) {
        //-- Notting
      }
      else {
        itemNew.push(this.projobmain_list[i]);
      }
    }
    //-- 9999 for delete
    if (model.projobmain_id != "9999") {
      itemNew.push(model);
    }
    this.projobmain_list = [];
    this.projobmain_list = itemNew;
    this.projobmain_list.sort(function (a, b) { return parseInt(a.projobmain_id) - parseInt(b.projobmain_id); })
  }
  projobmain_record(): boolean {
    if (this.projobmain_list.length == 0) {
      //return
    }
    this.projectDetailService.projobmain_record(this.version_selected, this.selectedProject.project_code, this.projobmain_list).then((res) => {
      let result = JSON.parse(res);
      if (result.success) {
        return true
      }
      else {
        return false
      }
    })

    return false
  }


  projobmain_loadtran() {

    this.doLoadProjobshift()

    //this.doLoadProjobcontract()
    this.doLoadProjobcost()
    this.doLoadProjobmachine()
    this.doLoadProjobpol()

  }


  projobtype_list: RadiovalueModel[] = [];
  doLoadPoljobtype() {
    var tmp = new RadiovalueModel();
    tmp.value = "R";
    tmp.text_en = "Regular";
    tmp.text_th = "ประจำ";
    this.projobtype_list.push(tmp);
    tmp = new RadiovalueModel();
    tmp.value = "C";
    tmp.text_en = "Casual work";
    tmp.text_th = "งานจร";
    this.projobtype_list.push(tmp);
  }
  doGetPoljobtypeDetail(code: string): string {
    for (let i = 0; i < this.projobtype_list.length; i++) {
      if (this.projobtype_list[i].value == code) {
        if (this.initial_current.Language == "TH") {
          return this.projobtype_list[i].text_th;
        }
        else {
          return this.projobtype_list[i].text_en;
        }
      }
    }
    return ""
  }


  polshift_list: ShiftModels[] = [];
  selectedProjobmain_shift: ShiftModels = new ShiftModels;
  doLoadPolShift() {
    var tmp = new ShiftModels();
    tmp.company_code = this.initial_current.CompCode
    this.polshift_list = []
    this.shiftServices.shift_get(tmp).then(async (res) => {
      this.polshift_list = await res;
    });
  }
  doGetShiftDetail(code: string): string {
    for (let i = 0; i < this.polshift_list.length; i++) {
      if (this.polshift_list[i].shift_code == code) {
        if (this.initial_current.Language == "TH") {
          return this.polshift_list[i].shift_name_th;
        }
        else {
          return this.polshift_list[i].shift_name_en;
        }
      }
    }
    return ""
  }


  poltimepol_list: ProtimepolModel[] = [];
  doLoadPolProtimepol() {
    this.projectDetailService.protimepol_get(this.project_code).then(async (res) => {
      this.poltimepol_list = await res;
    });
  }
  doGetProtimepolDetail(code: string): string {
    for (let i = 0; i < this.poltimepol_list.length; i++) {
      if (this.poltimepol_list[i].protimepol_code == code) {
        if (this.initial_current.Language == "TH") {
          return this.poltimepol_list[i].protimepol_name_th;
        }
        else {
          return this.poltimepol_list[i].protimepol_name_en;
        }
      }
    }
    return ""
  }




  polslip_list: ProslipModel[] = [];
  doLoadPolProslip() {
    this.genaralService.proslip_get().then(async (res) => {
      this.polslip_list = await res;
    });
  }
  doGetSlipDetail(code: string): string {
    for (let i = 0; i < this.polslip_list.length; i++) {
      if (this.polslip_list[i].proslip_code == code) {
        if (this.initial_current.Language == "TH") {
          return this.polslip_list[i].proslip_name_th;
        }
        else {
          return this.polslip_list[i].proslip_name_en;
        }
      }
    }
    return ""
  }

  poluniform_list: ProuniformModel[] = [];
  doLoadPolProuniform() {
    this.genaralService.prouniform_get().then(async (res) => {
      this.poluniform_list = await res;
    });
  }
  doGetUniformDetail(code: string): string {
    for (let i = 0; i < this.poluniform_list.length; i++) {
      if (this.poluniform_list[i].prouniform_code == code) {
        if (this.initial_current.Language == "TH") {
          return this.poluniform_list[i].prouniform_name_th;
        }
        else {
          return this.poluniform_list[i].prouniform_name_en;
        }
      }
    }
    return ""
  }


  project_summary_emp: number = 0;
  project_summary_cost: number = 0;

  projobmain_summary() {

    return

    this.project_summary_emp = 0
    this.project_summary_cost = 0
    for (let i = 0; i < this.projobmain_list.length; i++) {
      this.project_summary_emp += this.projobmain_list[i].emp_total
      this.project_summary_cost += this.projobmain_list[i].allow_total
    }
  }


  polcost_list: ProcostModel[] = [];
  polcost_list_cbb: RadiovalueModel[] = [];
  selectedProjobcost_cost: RadiovalueModel = new RadiovalueModel;
  doLoadPolCost() {
    this.polcost_list_cbb = []
    this.procostService.procost_get(this.initial_current.CompCode).then((res) => {

      this.polcost_list = res;
      if (this.polcost_list.length > 0) {
        for (let i = 0; i < this.polcost_list.length; i++) {
          var tmp = new RadiovalueModel();
          tmp.value = this.polcost_list[i].procost_code;
          if (this.initial_current.Language == "EN") {
            tmp.text = this.polcost_list[i].procost_name_en
          }
          else {
            tmp.text = this.polcost_list[i].procost_name_th
          }

          this.costs_title[i] = tmp.text
          this.polcost_list_cbb.push(tmp)

        }
      }
    });
  }


  doGetProCostType(code: string): string {
    for (let i = 0; i < this.polcost_list.length; i++) {
      if (this.polcost_list[i].procost_code == code) {
        return this.polcost_list[i].procost_type
      }
    }
    return ""
  }

  doGetProCostName(code: string): string {
    for (let i = 0; i < this.polcost_list.length; i++) {
      if (this.polcost_list[i].procost_code == code) {
        return this.initial_current.Language == "TH" ? this.polcost_list[i].procost_name_th : this.polcost_list[i].procost_name_en
      }
    }
    return ""
  }

  doGetProCostAuto(code: string): boolean {
    for (let i = 0; i < this.polcost_list.length; i++) {
      if (this.polcost_list[i].procost_code == code) {
        return this.polcost_list[i].procost_auto
      }
    }
    return false
  }

  doGetProCostItem(code: string): string {
    for (let i = 0; i < this.polcost_list.length; i++) {
      if (this.polcost_list[i].procost_code == code) {
        return this.polcost_list[i].procost_itemcode
      }
    }
    return ""
  }




  //-- Project job contract
  projobcontract_list: ProjobcontractModel[] = [];
  selectedProjobcontract: ProjobcontractModel = new ProjobcontractModel();
  doLoadProjobcontract() {
    this.projectDetailService.projobcontract_get(this.version_selected, this.project_code, this.selectedProjobmain.projobmain_code).then((res) => {
      this.projobcontract_list = res;
      if (this.projobcontract_list.length > 0) {
        this.selectedProjobcontract = this.projobcontract_list[0]
      }
    });
  }
  onRowSelectProjobcontract(event: Event) {


  }
  projobcontract_summit() {

    this.projobcontract_addItem(this.selectedProjobcontract)
    this.new_projobcontract = false
    this.edit_projobcontract = false

    this.displayManage = false
  }
  projobcontract_remove() {
    this.selectedProjobcontract.projobcontract_id = "9999";
    this.projobcontract_addItem(this.selectedProjobcontract)
    this.new_projobcontract = false
    this.edit_projobcontract = false
  }
  projobcontract_cancel() {
    this.edit_projobcontract = false
    this.new_projobcontract = false
    this.displayManage = false
  }
  projobcontract_addItem(model: ProjobcontractModel) {
    const itemNew: ProjobcontractModel[] = [];
    for (let i = 0; i < this.projobcontract_list.length; i++) {
      if (this.projobcontract_list[i].projobcontract_ref == model.projobcontract_ref) {
        //-- Notting
      }
      else {
        itemNew.push(this.projobcontract_list[i]);
      }
    }
    //-- 9999 for delete
    if (model.projobcontract_id != "9999") {
      itemNew.push(model);
    }
    this.projobcontract_list = [];
    this.projobcontract_list = itemNew;
    this.projobcontract_list.sort(function (a, b) { return parseInt(a.projobcontract_id) - parseInt(b.projobcontract_id); })
  }
  projobcontract_record(): boolean {

    if (this.selectedProjobmain == null) {
      return false
    }

    if (this.projobcontract_list.length == 0) {
      //return false
    }

    this.projectDetailService.projobcontract_record(this.version_selected, this.selectedProject.project_code, this.selectedProjobmain.projobmain_code, this.projobcontract_list).then((res) => {
      let result = JSON.parse(res);
      if (result.success) {
        return true
      }
      else {
        return false
      }
    });

    return false
  }

  //-- Project job cost
  projobcost_list: ProjobcostModel[] = [];
  selectedProjobcost: ProjobcostModel = new ProjobcostModel();
  doLoadProjobcost() {
    this.projectDetailService.projobcost_get(this.version_selected, this.project_code, this.selectedProjobmain.projobmain_code).then((res) => {
      this.projobcost_list = res;
      if (this.projobcost_list.length > 0) {
        this.selectedProjobcost = this.projobcost_list[0]
      }
    });
  }
  onRowSelectProjobcost(event: Event) {


  }
  projobcost_summit() {

    this.projobcost_addItem(this.selectedProjobcost)
    this.new_projobcost = false
    this.edit_projobcost = false

    this.displayManage = false
  }
  projobcost_remove() {
    this.selectedProjobcost.projobcost_id = "9999";
    this.projobcost_addItem(this.selectedProjobcost)
    this.new_projobcost = false
    this.edit_projobcost = false
  }
  projobcost_cancel() {
    this.edit_projobcost = false
    this.new_projobcost = false
    this.displayManage = false
  }
  projobcost_addItem(model: ProjobcostModel) {
    const itemNew: ProjobcostModel[] = [];
    for (let i = 0; i < this.projobcost_list.length; i++) {
      if (this.projobcost_list[i].projobcost_id == model.projobcost_id) {
        //-- Notting
      }
      else {


        // var date_tmp = new Date(this.projobcost_list[i].projobcost_todate)
        // //// console.log(date_tmp)

        // if(this.projobcost_list[i].projobcost_code==model.projobcost_code && date_tmp.getTime() > model.projobcost_fromdate.getTime()){

        //   this.projobcost_list[i].projobcost_todate = new Date(model.projobcost_fromdate)
        //   this.projobcost_list[i].projobcost_todate.setDate( this.projobcost_list[i].projobcost_todate.getDate() - 1 );

        // }

        itemNew.push(this.projobcost_list[i]);
      }
    }
    //-- 9999 for delete
    if (model.projobcost_id != "9999") {
      itemNew.push(model);
    }
    this.projobcost_list = [];
    this.projobcost_list = itemNew;
    this.projobcost_list.sort(function (a, b) { return parseInt(a.projobcost_id) - parseInt(b.projobcost_id); })
  }
  projobcost_record(): boolean {

    if (this.selectedProjobmain == null) {
      return false
    }

    if (this.projobcost_list.length == 0) {
      //return false
    }
    this.projectDetailService.projobcost_record(this.version_selected, this.selectedProject.project_code, this.selectedProjobmain.projobmain_code, this.projobcost_list).then((res) => {
      let result = JSON.parse(res);
      if (result.success) {
        return true
      }
      else {
        return false
      }

    });

    return false
  }

  projobcost_summary() {
    for (let i = 0; i < this.projobcost_list.length; i++) {

    }
  }

  //-- Project job shift
  projobshift_list: ProjobshiftModel[] = [];
  selectedProjobshift: ProjobshiftModel = new ProjobshiftModel();
  doLoadProjobshift() {
    this.projectDetailService.projobshift_get(this.version_selected, this.project_code, this.selectedProjobmain.projobmain_code).then((res) => {
      this.projobshift_list = res;
      if (this.projobshift_list.length > 0) {
        this.selectedProjobshift = this.projobshift_list[0]
      }
    });
  }
  onRowSelectProjobshift(event: Event) {


  }
  projobshift_summit() {

    this.projobshift_addItem(this.selectedProjobshift)
    this.new_projobshift = false
    this.edit_projobshift = false

    this.displayManage = false
  }
  projobshift_remove() {
    this.selectedProjobshift.projobshift_id = "9999";
    this.projobshift_addItem(this.selectedProjobshift)
    this.new_projobshift = false
    this.edit_projobshift = false
  }
  projobshift_cancel() {
    this.edit_projobshift = false
    this.new_projobshift = false
    this.displayManage = false
  }
  projobshift_addItem(model: ProjobshiftModel) {
    const itemNew: ProjobshiftModel[] = [];
    for (let i = 0; i < this.projobshift_list.length; i++) {
      if (this.projobshift_list[i].projobshift_id == model.projobshift_id) {
        //-- Notting
      }
      else {

        itemNew.push(this.projobshift_list[i]);
      }
    }
    //-- 9999 for delete
    if (model.projobshift_id != "9999") {
      itemNew.push(model);
    }
    this.projobshift_list = [];
    this.projobshift_list = itemNew;
    this.projobshift_list.sort(function (a, b) { return parseInt(a.projobshift_id) - parseInt(b.projobshift_id); })
  }
  projobshift_record(): boolean {

    if (this.selectedProjobmain == null) {
      return false
    }

    if (this.projobshift_list.length == 0) {
      //return false
    }
    this.projectDetailService.projobshift_record(this.version_selected, this.selectedProject.project_code, this.selectedProjobmain.projobmain_code, this.projobshift_list).then((res) => {
      let result = JSON.parse(res);
      if (result.success) {
        return true
      }
      else {
        return false
      }

    });

    return false
  }

  //-- Project job machine
  projobmachine_list: ProjobmachineModel[] = [];
  selectedProjobmachine: ProjobmachineModel = new ProjobmachineModel();
  doLoadProjobmachine() {
    this.projectDetailService.projobmachine_get(this.project_code, this.selectedProjobmain.projobmain_code).then((res) => {
      this.projobmachine_list = res;
      if (this.projobmachine_list.length > 0) {
        this.selectedProjobmachine = this.projobmachine_list[0]
      }
    });
  }
  onRowSelectProjobmachine(event: Event) {


  }
  projobmachine_summit() {

    this.projobmachine_addItem(this.selectedProjobmachine)
    this.new_projobmachine = false
    this.edit_projobmachine = false

    this.displayManage = false
  }
  projobmachine_remove() {
    this.selectedProjobmachine.projobmachine_id = "9999";
    this.projobmachine_addItem(this.selectedProjobmachine)
    this.new_projobmachine = false
    this.edit_projobmachine = false
  }
  projobmachine_cancel() {
    this.edit_projobmachine = false
    this.new_projobmachine = false
    this.displayManage = false
  }
  projobmachine_addItem(model: ProjobmachineModel) {
    const itemNew: ProjobmachineModel[] = [];
    for (let i = 0; i < this.projobmachine_list.length; i++) {
      if (this.projobmachine_list[i].projobmachine_id == model.projobmachine_id) {
        //-- Notting
      }
      else {

        itemNew.push(this.projobmachine_list[i]);
      }
    }
    //-- 9999 for delete
    if (model.projobmachine_id != "9999") {
      itemNew.push(model);
    }
    this.projobmachine_list = [];
    this.projobmachine_list = itemNew;
    this.projobmachine_list.sort(function (a, b) { return parseInt(a.projobmachine_id) - parseInt(b.projobmachine_id); })
  }


  projobmachine_record(): boolean {

    if (this.selectedProjobmain == null) {
      return false
    }

    if (this.projobmachine_list.length == 0) {
      //return false
    }
    this.projectDetailService.projobmachine_record(this.selectedProject.project_code, this.selectedProjobmain.projobmain_code, this.projobmachine_list).then((res) => {
      let result = JSON.parse(res);
      if (result.success) {
        return true
      }
      else {
        return false
      }

    });

    return false
  }

  //-- Project job policy
  projobpol_list: ProjobpolModel[] = [];
  selectedProjobpol: ProjobpolModel = new ProjobpolModel();
  doLoadProjobpol() {
    this.projectDetailService.projobpol_get(this.project_code, this.selectedProjobmain.projobmain_code).then((res) => {
      this.projobpol_list = res;
      if (this.projobpol_list.length > 0) {
        this.selectedProjobpol = this.projobpol_list[0]
      }
    });
  }
  onRowSelectProjobpol(event: Event) {


  }
  projobpol_summit() {

    this.projobpol_addItem(this.selectedProjobpol)
    this.new_projobpol = false
    this.edit_projobpol = false

    this.displayManage = false
  }
  projobpol_remove() {
    this.selectedProjobpol.projobpol_id = "9999";
    this.projobpol_addItem(this.selectedProjobpol)
    this.new_projobpol = false
    this.edit_projobpol = false
  }
  projobpol_cancel() {
    this.edit_projobpol = false
    this.new_projobpol = false
    this.displayManage = false
  }
  projobpol_addItem(model: ProjobpolModel) {
    const itemNew: ProjobpolModel[] = [];
    for (let i = 0; i < this.projobpol_list.length; i++) {
      if (this.projobpol_list[i].projobpol_id == model.projobpol_id) {
        //-- Notting
      }
      else {

        itemNew.push(this.projobpol_list[i]);
      }
    }
    //-- 9999 for delete
    if (model.projobpol_id != "9999") {
      itemNew.push(model);
    }
    this.projobpol_list = [];
    this.projobpol_list = itemNew;
    this.projobpol_list.sort(function (a, b) { return parseInt(a.projobpol_id) - parseInt(b.projobpol_id); })
  }


  projobpol_record(): boolean {

    if (this.selectedProjobpol == null) {
      return false
    }

    if (this.projobpol_list.length == 0) {
      //return false
    }

    this.projectDetailService.projobpol_record(this.selectedProject.project_code, this.selectedProjobmain.projobmain_code, this.projobpol_list).then((res) => {
      let result = JSON.parse(res);
      if (result.success) {
        return true
      }
      else {
        return false
      }

    });

    return false
  }

  //-- Project job sub
  projobsub_list: ProjobsubModel[] = [];
  selectedProjobsub: ProjobsubModel = new ProjobsubModel();
  doLoadProjobsub() {
    this.projectDetailService.projobsub_get(this.version_selected, this.project_code).then((res) => {
      this.projobsub_list = res;
      if (this.projobsub_list.length > 0) {

        this.selectedProjobsub = this.projobsub_list[0]

        setTimeout(() => {
          this.projobsub_summary()
          this.doLoadProjobsubcontract()
          this.doLoadProjobsubcost()
          this.doLoadProjobworking()
        }, 500);


      }
    });
  }
  onRowSelectProjobsub(event: Event) {

    if (this.selectedProjobsub == null) {

    }
    else {
      this.doLoadProjobsubcontract()
      this.doLoadProjobsubcost()
      this.doLoadProjobworking()
    }

  }
  projobsub_summit() {

    this.projobsub_addItem(this.selectedProjobsub)
    this.new_projobsub = false
    this.edit_projobsub = false

    this.displayManage = false
  }
  projobsub_remove() {
    this.selectedProjobsub.projobsub_id = "9999";
    this.projobsub_addItem(this.selectedProjobsub)
    this.new_projobsub = false
    this.edit_projobsub = false
  }
  projobsub_cancel() {
    this.edit_projobsub = false
    this.new_projobsub = false
    this.displayManage = false
  }
  projobsub_addItem(model: ProjobsubModel) {
    const itemNew: ProjobsubModel[] = [];
    for (let i = 0; i < this.projobsub_list.length; i++) {
      if (this.projobsub_list[i].projobsub_id == model.projobsub_id) {
        //-- Notting
      }
      else {

        itemNew.push(this.projobsub_list[i]);
      }
    }
    //-- 9999 for delete
    if (model.projobsub_id != "9999") {
      itemNew.push(model);
    }
    this.projobsub_list = [];
    this.projobsub_list = itemNew;
    this.projobsub_list.sort(function (a, b) { return parseInt(a.projobsub_id) - parseInt(b.projobsub_id); })
  }
  projobsub_record(): boolean {

    if (this.projobsub_list.length == 0) {
      //return false
    }

    this.projectDetailService.projobsub_record(this.version_selected, this.selectedProject.project_code, this.projobsub_list).then((res) => {
      let result = JSON.parse(res);
      if (result.success) {
        return true
      }
      else {
        return false
      }

    });

    return false
  }


  project_summary_clear_cost: number = 0;

  projobsub_summary() {
    this.project_summary_clear_cost = 0
    for (let i = 0; i < this.projobsub_list.length; i++) {
      this.project_summary_clear_cost += this.projobsub_list[i].allow_total
    }
  }

  //-- Project jobsub contract
  projobsubcontract_list: ProjobcontractModel[] = [];
  selectedProjobsubcontract: ProjobcontractModel = new ProjobcontractModel();
  doLoadProjobsubcontract() {
    this.projectDetailService.projobcontract_get(this.version_selected, this.project_code, this.selectedProjobsub.projobsub_code).then((res) => {
      this.projobsubcontract_list = res;
    });
  }
  onRowSelectProjobsubcontract(event: Event) {

  }
  projobsubcontract_summit() {

    this.projobsubcontract_addItem(this.selectedProjobsubcontract)
    this.new_projobsubcontract = false
    this.edit_projobsubcontract = false

    this.displayManage = false
  }
  projobsubcontract_remove() {
    this.selectedProjobsubcontract.projobcontract_id = "9999";
    this.projobsubcontract_addItem(this.selectedProjobsubcontract)
    this.new_projobsubcontract = false
    this.edit_projobsubcontract = false
  }
  projobsubcontract_cancel() {
    this.edit_projobsubcontract = false
    this.new_projobsubcontract = false
    this.displayManage = false
  }
  projobsubcontract_addItem(model: ProjobcontractModel) {

    const itemNew: ProjobcontractModel[] = [];
    for (let i = 0; i < this.projobsubcontract_list.length; i++) {
      if (this.projobsubcontract_list[i].projobcontract_ref == model.projobcontract_ref) {
        //-- Notting
      }
      else {
        itemNew.push(this.projobsubcontract_list[i]);
      }
    }
    //-- 9999 for delete
    if (model.projobcontract_id != "9999") {
      itemNew.push(model);
    }
    this.projobsubcontract_list = [];
    this.projobsubcontract_list = itemNew;
    this.projobsubcontract_list.sort(function (a, b) { return parseInt(a.projobcontract_id) - parseInt(b.projobcontract_id); })
  }
  projobsubcontract_record(): boolean {

    if (this.selectedProjobsub == null) {
      return false
    }

    if (this.projobsubcontract_list.length == 0) {
      //return false
    }

    this.projectDetailService.projobcontract_record(this.version_selected, this.selectedProject.project_code, this.selectedProjobsub.projobsub_code, this.projobsubcontract_list).then((res) => {
      let result = JSON.parse(res);
      if (result.success) {
        return true
      }
      else {
        return false
      }
    });

    return false
  }

  //-- Project jobsub cost
  projobsubcost_list: ProjobcostModel[] = [];
  selectedProjobsubcost: ProjobcostModel = new ProjobcostModel();
  doLoadProjobsubcost() {
    this.projectDetailService.projobcost_get(this.version_selected, this.project_code, this.selectedProjobsub.projobsub_code).then((res) => {
      this.projobsubcost_list = res;
      if (this.projobsubcost_list.length > 0) {
        this.selectedProjobsubcost = this.projobsubcost_list[0]
      }
    });
  }
  onRowSelectProjobsubcost(event: Event) {


  }
  projobsubcost_summit() {

    this.projobsubcost_addItem(this.selectedProjobsubcost)
    this.new_projobsubcost = false
    this.edit_projobsubcost = false

    this.displayManage = false
  }
  projobsubcost_remove() {
    this.selectedProjobsubcost.projobcost_id = "9999";
    this.projobsubcost_addItem(this.selectedProjobsubcost)
    this.new_projobsubcost = false
    this.edit_projobsubcost = false
  }
  projobsubcost_cancel() {
    this.edit_projobsubcost = false
    this.new_projobsubcost = false
    this.displayManage = false
  }
  projobsubcost_addItem(model: ProjobcostModel) {
    const itemNew: ProjobcostModel[] = [];
    for (let i = 0; i < this.projobsubcost_list.length; i++) {
      if (this.projobsubcost_list[i].projobcost_id == model.projobcost_id) {
        //-- Notting
      }
      else {

        // var date_tmp = new Date(this.projobsubcost_list[i].projobcost_todate)

        // if(this.projobsubcost_list[i].projobcost_code==model.projobcost_code && date_tmp.getTime() > model.projobcost_fromdate.getTime()){

        //   this.projobsubcost_list[i].projobcost_todate = new Date(model.projobcost_fromdate)
        //   this.projobsubcost_list[i].projobcost_todate.setDate( this.projobsubcost_list[i].projobcost_todate.getDate() - 1 );

        // }

        itemNew.push(this.projobsubcost_list[i]);
      }
    }
    //-- 9999 for delete
    if (model.projobcost_id != "9999") {
      itemNew.push(model);
    }
    this.projobsubcost_list = [];
    this.projobsubcost_list = itemNew;
    this.projobsubcost_list.sort(function (a, b) { return parseInt(a.projobcost_id) - parseInt(b.projobcost_id); })
  }
  projobsubcost_record(): boolean {

    if (this.selectedProjobsub == null) {
      return false
    }

    if (this.projobsubcost_list.length == 0) {
      //return false
    }
    this.projectDetailService.projobcost_record(this.version_selected, this.selectedProject.project_code, this.selectedProjobsub.projobsub_code, this.projobsubcost_list).then((res) => {
      let result = JSON.parse(res);
      if (result.success) {
        return true
      }
      else {
        return false
      }

    });

    return false
  }

  //-- Project emp
  projobemp_list: ProjobempModel[] = [];
  selectedProjobemp: ProjobempModel = new ProjobempModel();

  selectedProjobemp_name: string = ""

  doLoadProjobemp() {
    this.projectDetailService.projobemp_get(this.project_code).then((res) => {
      this.projobemp_list = res;
      //if(this.projobemp_list.length > 0){
      //  this.selectedProjobemp = this.projobemp_list[0]
      //}
    });
  }
  onRowSelectProjobemp(event: Event) {
    this.selectedProjobemp_name = this.selectedProjobemp.projobemp_emp + " : " + this.doGetEmployeeDetail(this.selectedProjobemp.projobemp_emp)
  }
  projobemp_summit() {

    this.selectedProjobemp.project_code = this.project_code

    this.projobemp_addItem(this.selectedProjobemp)
    this.new_projobemp = false
    this.edit_projobemp = false

    this.displayManage = false
  }
  projobemp_remove() {
    //this.selectedProjobemp.projobemp_id = "9999";
    //this.projobemp_addItem(this.selectedProjobemp)
    //this.new_projobemp = false
    //this.edit_projobemp = false

    this.confirmationService.confirm({
      message: this.title_confirm_delete[this.initial_current.Language],
      header: this.title_confirm[this.initial_current.Language],
      icon: 'pi pi-exclamation-triangle',
      accept: () => {

        this.selectedProjobemp.project_code = this.project_code


        this.projectDetailService.projobemp_delete(this.selectedProjobemp).then((res) => {
          let result = JSON.parse(res);
          if (result.success) {

            this.messageService.add({ severity: 'success', summary: 'Success', detail: result.message });
            this.doLoadProjobemp()

            this.new_projobemp = false
            this.edit_projobemp = false
            this.displayManage = false
          }
          else {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: result.message });
          }
        });
      },
      reject: () => {
        this.messageService.add({ severity: 'warn', summary: 'Cancelled', detail: this.title_confirm_cancel[this.initial_current.Language] });
      },
      key: "myDialog"
    });


  }
  projobemp_cancel() {
    this.edit_projobemp = false
    this.new_projobemp = false
    this.displayManage = false
  }
  projobemp_addItem(model: ProjobempModel) {
    const itemNew: ProjobempModel[] = [];
    for (let i = 0; i < this.projobemp_list.length; i++) {
      if (this.projobemp_list[i].projobemp_id == model.projobemp_id) {
        //-- Notting
      }
      else {

        var date_tmp = new Date(this.projobemp_list[i].projobemp_fromdate)

        if (this.projobemp_list[i].projobemp_emp == model.projobemp_emp && date_tmp.getTime() == model.projobemp_fromdate.getTime()) {

        }
        else {
          itemNew.push(this.projobemp_list[i]);
        }
      }
    }
    //-- 9999 for delete
    if (model.projobemp_id != "9999") {
      itemNew.push(model);
    }
    this.projobemp_list = [];
    this.projobemp_list = itemNew;
    this.projobemp_list.sort(function (a, b) { return parseInt(a.projobemp_id) - parseInt(b.projobemp_id); })
  }
  projobemp_record() {

    this.confirmationService.confirm({
      message: this.title_confirm_record[this.initial_current.Language],
      header: this.title_confirm[this.initial_current.Language],
      icon: 'pi pi-exclamation-triangle',
      accept: () => {

        this.selectedProjobemp.project_code = this.project_code


        this.projectDetailService.projobemp_record(this.selectedProjobemp).then((res) => {
          let result = JSON.parse(res);
          if (result.success) {

            this.messageService.add({ severity: 'success', summary: 'Success', detail: result.message });
            this.doLoadProjobemp()

            this.new_projobemp = false
            this.edit_projobemp = false
            this.displayManage = false
          }
          else {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: result.message });
          }
        });
      },
      reject: () => {
        this.messageService.add({ severity: 'warn', summary: 'Cancelled', detail: this.title_confirm_cancel[this.initial_current.Language] });
      },
      key: "myDialog"
    });

  }

  projobemp_type: any[] = [];
  doLoadJobemptype() {
    this.projobemp_type.push(
      {
        name: this.initial_current.Language == "EN" ? "Regular" : "ประจำ",
        code: "R"
      }
    )
    this.projobemp_type.push(
      {
        name: this.initial_current.Language == "EN" ? "Temporary" : "ชั่วคราว",
        code: "T"
      }
    )
  }

  doGetJobemptypeDetail(code: string): string {

    let result = ""
    for (let i = 0; i < this.projobemp_type.length; i++) {
      if (this.projobemp_type[i].code == code) {
        result = this.projobemp_type[i].name
        break
      }
    }
    return result
  }

  searchEmp: boolean = false;
  open_searchemp() {
    this.searchEmp = true
  }

  close_searchemp() {
    this.searchEmp = false
  }

  select_emp() {

    let select = this.selectEmp.selectedEmployee.worker_code
    if (select != "") {

      this.selectedProjobemp.projobemp_emp = select
      this.selectedProjobemp_name = this.selectedProjobemp.projobemp_emp + " : " + this.doGetEmployeeDetail(this.selectedProjobemp.projobemp_emp)
      this.searchEmp = false
    }

  }




  //-- Project working
  projobworking_list: ProjobworkingModel[] = [];
  selectedProjobworking: ProjobworkingModel = new ProjobworkingModel();
  doLoadProjobworking() {
    this.projectDetailService.projobworking_get(this.project_code, this.selectedProjobsub.projobsub_code).then((res) => {
      this.projobworking_list = res;
      if (this.projobworking_list.length > 0) {
        this.selectedProjobworking = this.projobworking_list[0]
      }
    });
  }
  onRowSelectProjobworking(event: Event) {

  }

  employee_list: EmployeeModel[] = [];
  doLoadEmployee() {
    this.employeeService.worker_get(this.initial_current.CompCode, "").then(async (res) => {
      this.employee_list = await res;
    });
  }

  doGetEmployeeDetail(code: string): string {
    for (let i = 0; i < this.employee_list.length; i++) {
      if (this.employee_list[i].worker_code == code) {
        if (this.initial_current.Language == "TH") {
          return this.employee_list[i].worker_fname_th + ' ' + this.employee_list[i].worker_lname_th;
        }
        else {
          return this.employee_list[i].worker_fname_en + ' ' + this.employee_list[i].worker_lname_en;
        }
      }
    }
    return ""
  }

  doGetEmployeeStatus(code: string): string {
    for (let i = 0; i < this.employee_list.length; i++) {
      if (this.employee_list[i].worker_code == code) {
        return this.doGetEmpstatusDetail(this.employee_list[i].worker_status)
      }
    }
    return ""
  }

  initial_list: InitialModel[] = [];
  doLoadInitial() {
    this.initial_list = []
    this.initialService.initial_get().then(async (res) => {
      this.initial_list = await res;
    });
  }
  doGetInitialDetail(code: string): string {
    for (let i = 0; i < this.initial_list.length; i++) {
      if (this.initial_list[i].initial_code == code) {
        return this.initial_current.Language == "TH" ? this.initial_list[i].initial_name_th : this.initial_list[i].initial_name_en
      }
    }
    return ""
  }

  position_list: PositionModel[] = [];
  doLoadPosition() {
    this.position_list = []
    this.positionService.position_get().then(async (res) => {
      this.position_list = await res;
    });
  }
  doGetPositionDetail(code: string): string {
    for (let i = 0; i < this.position_list.length; i++) {
      if (this.position_list[i].position_code == code) {
        return this.initial_current.Language == "TH" ? this.position_list[i].position_name_th : this.position_list[i].position_name_en
      }
    }
    return ""
  }

  empstatus_list: EmpstatusModel[] = [];
  doLoadEmpStatus() {
    this.empstatus_list = []
    this.empstatusService.status_get().then(async (res) => {
      this.empstatus_list = await res;
    });
  }
  doGetEmpstatusDetail(code: string): string {
    for (let i = 0; i < this.empstatus_list.length; i++) {
      if (this.empstatus_list[i].status_code == code) {
        return this.initial_current.Language == "TH" ? this.empstatus_list[i].status_name_th : this.empstatus_list[i].status_name_en
      }
    }
    return ""
  }


  //-- 10/05/2023

  addVersion() {
    this.new_projobversion = true
    this.showManage()
  }

  projobversion_cancel() {
    this.new_projobversion = false
    this.edit_projobversion = false
    this.displayManage = false
  }

  recordJobversion() {
    this.confirmRecordJobversion()

  }

  confirmRecordJobversion() {
    this.confirmationService.confirm({
      message: this.title_confirm_record[this.initial_current.Language] + " Version",
      header: this.title_confirm[this.initial_current.Language],
      icon: 'pi pi-exclamation-triangle',
      accept: () => {

        this.manageProjobversion.project_code = this.project_code

        this.projectDetailService.projobversion_record(this.manageProjobversion).then((res) => {
          let result = JSON.parse(res);
          if (result.success) {
            this.doLoadProjobversion()
            this.projobversion_cancel()

            this.messageService.add({ severity: 'success', summary: 'Success', detail: "Record Success.." });
          }
          else {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: result.message });
          }

        });

      },
      reject: () => {
        this.messageService.add({ severity: 'warn', summary: 'Cancelled', detail: this.title_confirm_cancel[this.initial_current.Language] });
      },
      key: "myDialog"
    });
  }




}

interface Combobox {
  name: string,
  code: string
}

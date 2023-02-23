import { Component, OnInit } from '@angular/core';
import { MegaMenuItem,MenuItem } from 'primeng/api';

import { ActivatedRoute, NavigationExtras } from '@angular/router';
import { Router } from '@angular/router';

import { AppConfig } from '../../../config/config';
import { InitialCurrent } from '../../../config/initial_current';

import { RadiovalueModel } from '../../../models/project/radio_value';
import { EmployeeModel } from '../../../models/employee/employee';
import { EmployeeService } from 'src/app/services/emp/worker.service';

import { TimecardsModel } from '../../../models/attendance/timecards';
import { TimecardService } from 'src/app/services/attendance/timecards.service';


@Component({
  selector: 'app-attendance-view',
  templateUrl: './attendance-view.component.html',
  styleUrls: ['./attendance-view.component.scss']
})
export class AttendanceViewComponent implements OnInit {

  title_page:string = "Geanral";
  title_new:string = "New";
  title_edit:string = "Edit";
  title_delete:string = "Delete";
  title_import:string = "Import";
  title_export:string = "Export";
  title_save:string = "Save";
  title_more:string = "More";
  title_code:string = "Code";
  title_name_th:string = "Name (Thai)";
  title_name_en:string = "Name (Eng.)";

  title_projectcode:string = "Code";
  title_projectname:string = "Name";
  title_protype:string = "Type";
  title_probusiness:string = "Business";
  title_fromdate:string = "From";
  title_todate:string = "To";
  title_manpower:string = "Manpower";
  title_cost:string = "Cost";
  title_status:string = "Status";
  
  title_modified_by:string = "Edit by";
  title_modified_date:string = "Edit date";
  title_search:string = "Search";
  title_upload:string = "Upload";

  title_page_from:string = "Showing";
  title_page_to:string = "to";
  title_page_total:string = "of";
  title_page_record:string = "entries";

  title_confirm:string = "Are you sure?";
  title_confirm_record:string = "Confirm to record";
  title_confirm_delete:string = "Confirm to delete";
  title_confirm_yes:string = "Yes";
  title_confirm_no:string = "No";

  title_confirm_cancel:string = "You have cancelled";

  title_submit:string = "Submit";
  title_cancel:string = "Cancel";

  menu_timecard: MenuItem[] = [];

  constructor(private employeeService: EmployeeService,
    private timecardService: TimecardService,
    private router:Router, 
    private route: ActivatedRoute
    ) { }

  ngOnInit(): void {

    this.doGetInitialCurrent()
    this.doLoadMenu()
    this.doLoadLanguage()

    setTimeout(() => {
      this.doLoadEmployee()
      this.doLoadDaytype()
      this.doLoadPolShift()
    }, 200);

    setTimeout(() => {
      
      this.worker_index = 0;
      this.doSetDetailWorker();

    }, 500);

  }

  public initial_current:InitialCurrent = new InitialCurrent();  
  doGetInitialCurrent(){    
    this.initial_current = JSON.parse(localStorage.getItem(AppConfig.SESSIONInitial) || '{}');
    if (!this.initial_current) {
      this.router.navigateByUrl('');
    }       
  }

  doLoadLanguage(){
    if(this.initial_current.Language == "TH"){
      this.title_page = "ข้อมูลทั่วไป";
      this.title_new = "เพิ่ม";
      this.title_edit = "แก้ไข";
      this.title_delete = "ลบ";
      this.title_import = "นำเข้า";
      this.title_export = "โอนออก";
      this.title_save = "บันทึก";
      this.title_more = "เพิ่มเติม";
      this.title_code = "รหัส";
      this.title_name_th = "ชื่อไทย";
      this.title_name_en = "ชื่ออังกฤษ";
      this.title_modified_by = "ผู้ทำรายการ";
      this.title_modified_date = "วันที่ทำรายการ";
      this.title_search = "ค้นหา";
      this.title_upload = "อัพโหลด";

      this.title_page_from = "แสดง";
      this.title_page_to = "ถึง";
      this.title_page_total = "จาก";
      this.title_page_record = "รายการ";

      this.title_confirm = "ยืนยันการทำรายการ";
      this.title_confirm_record = "คุณต้องการบันทึกการทำรายการ";
      this.title_confirm_delete = "คุณต้องการลบรายการ";

      this.title_confirm_yes = "ใช่";
      this.title_confirm_no = "ยกเลิก";
      this.title_confirm_cancel = "คุณยกเลิกการทำรายการ";

      this.title_projectcode = "โครงการ";
      this.title_projectname = "ชื่อโครงการ";
      this.title_probusiness = "ประเภทธุรกิจ";
      this.title_protype = "ประเภทงาน";
      this.title_fromdate = "จากวันที่";
      this.title_todate = "ถึงวันที่";
      this.title_manpower = "จำนวนพนักงาน";
      this.title_cost = "ต้นทุน";
      this.title_status = "สถานะ";
      
      this.title_submit = "ตกลง";
      this.title_cancel = "ปิด";      
    }
  }

  doLoadMenu(){
    this.menu_timecard = [   
      {
          label:'Edit',
          icon:'pi pi-fw pi-pencil',
          command: (event) => {
            // this.clearManage()
            // if(this.selectedProcontact != null){
            //   this.edit_procontact = true
            //   this.showManage()  
            // }      
            this.showManage()       
        }        
      } 
      ,
      {
          label:this.title_import,
          icon:'pi pi-fw pi-file-import',          
      }
      ,    
      {
          label:this.title_export,
          icon:'pi pi-fw pi-file-export',          
      }
      
    ];
  }

  displayManage: boolean = false;
  position: string = "right";
  manage_title: string = "ข้อมูลเวลา"
  showManage() {    
    this.displayManage = true;

  }

  workerDetail:EmployeeModel = new EmployeeModel();
  worker_list: EmployeeModel[] = [];
  worker_index:number = 0;
  worker_code:string = "";
  worker_name:string = "";
  doLoadEmployee(){
    this.employeeService.worker_get().then((res) =>{
      this.worker_list = res;   
    });
  }

  doNextWorker(){
    if(this.worker_index < this.worker_list.length - 1){
      this.worker_index++;
      this.doSetDetailWorker();
    }
  }

  doBackWorker(){
    if(this.worker_index > 0){
      this.worker_index--;
      this.doSetDetailWorker();
    }
  }

  doSetDetailWorker(){
    this.workerDetail = this.worker_list[this.worker_index];
    this.worker_code = this.workerDetail.worker_code;
    if(this.initial_current.Language == "EN"){
      this.worker_name = this.workerDetail.worker_fname_en + " " + this.workerDetail.worker_lname_en;
    }
    else{
      this.worker_name = this.workerDetail.worker_fname_th + " " + this.workerDetail.worker_lname_th;
    }

    setTimeout(() => {            
      this.doLoadTimecard();
    }, 200);
  }

  timecard_list: TimecardsModel[] = [];
  selectedTimecard: TimecardsModel = new TimecardsModel();
  edit_timecard: boolean = false;
  doLoadTimecard(){

    let dateString = '2023-01-01T00:00:00'
    var FromDate = new Date(dateString);

    dateString = '2023-01-31T00:00:00'
    var ToDate = new Date(dateString);

    this.timecardService.timecard_get("XXX", "PRO001", this.worker_code, FromDate, ToDate).then((res) =>{
      this.timecard_list = res;   
    });
  }

  date_work = new Date();
  date_ch1 = new Date();
  date_ch2 = new Date();
  date_ch3 = new Date();
  date_ch4 = new Date();
  date_ch5 = new Date();
  date_ch6 = new Date();
  date_ch7 = new Date();
  date_ch8 = new Date();
  date_ch9 = new Date();
  date_ch10 = new Date();

  before : string = "00:00";
  before_app : string = "00:00";
  work1 : string = "00:00";
  work1_app : string = "00:00";
  work2 : string = "00:00";
  work2_app : string = "00:00";
  break : string = "00:00";
  break_app : string = "00:00";
  after : string = "00:00";
  after_app : string = "00:00";

  late : string = "00:00";
  late_app : string = "00:00";

  leave : string = "00:00";
  leave_app : string = "00:00";

  onRowSelectTimecard(event: Event) {
    this.edit_timecard = true
    this.date_work = new Date(this.selectedTimecard.timecard_workdate)
    this.date_ch1 = new Date(this.selectedTimecard.timecard_ch1)
    this.date_ch2 = new Date(this.selectedTimecard.timecard_ch2)
    this.date_ch3 = new Date(this.selectedTimecard.timecard_ch3)
    this.date_ch4 = new Date(this.selectedTimecard.timecard_ch4)
    this.date_ch5 = new Date(this.selectedTimecard.timecard_ch5)
    this.date_ch6 = new Date(this.selectedTimecard.timecard_ch6)
    this.date_ch7 = new Date(this.selectedTimecard.timecard_ch7)
    this.date_ch8 = new Date(this.selectedTimecard.timecard_ch8)
    this.date_ch9 = new Date(this.selectedTimecard.timecard_ch9)
    this.date_ch10 = new Date(this.selectedTimecard.timecard_ch10)      

    this.before = this.doConvertHHMM(this.selectedTimecard.timecard_before_min)
    this.before_app = this.doConvertHHMM(this.selectedTimecard.timecard_before_min_app)

    this.work1 = this.doConvertHHMM(this.selectedTimecard.timecard_work1_min)
    this.work1_app = this.doConvertHHMM(this.selectedTimecard.timecard_work1_min_app)

    this.work2 = this.doConvertHHMM(this.selectedTimecard.timecard_work2_min)
    this.work2_app = this.doConvertHHMM(this.selectedTimecard.timecard_work2_min_app)

    this.break = this.doConvertHHMM(this.selectedTimecard.timecard_break_min)
    this.break_app = this.doConvertHHMM(this.selectedTimecard.timecard_break_min_app)
    
    this.after = this.doConvertHHMM(this.selectedTimecard.timecard_after_min)
    this.after_app = this.doConvertHHMM(this.selectedTimecard.timecard_after_min_app)
  }

  pad(num:number, size:number): string {
    let s = num+"";
    while (s.length < size) s = "0" + s;
    return s;
  }

  doConvertHHMM(time_min:number) : string {    
    var hrs = Math.floor(time_min / 60);
    var min = time_min - (hrs * 60);
    return this.pad(hrs, 2) + ":" + this.pad(min, 2);
  }

  doGetMinute(HHmm:string) : number {    
    var result = Number(HHmm.substr(0, 2)) * 60;
    result += Number(HHmm.substr(2, 0));        
    return result;
  }


  timecard_summit(){

  }

  timecard_cancel(){
    
  }

  daytype_list: RadiovalueModel[] = [];
  selectedDaytype: RadiovalueModel = new RadiovalueModel;
  doLoadDaytype(){   
    if(this.initial_current.Language == "EN"){
      var tmp = new RadiovalueModel();  
      tmp.value = "N";
      tmp.text = "Normal day";       
      this.daytype_list.push(tmp);
      tmp = new RadiovalueModel();  
      tmp.value = "O";
      tmp.text = "Off day";       
      this.daytype_list.push(tmp);
      tmp = new RadiovalueModel();  
      tmp.value = "H";
      tmp.text = "Holiday";       
      this.daytype_list.push(tmp);
      tmp = new RadiovalueModel();  
      tmp.value = "C";
      tmp.text = "Company day";       
      this.daytype_list.push(tmp);
      tmp = new RadiovalueModel();  
      tmp.value = "L";
      tmp.text = "Leave day";       
      this.daytype_list.push(tmp);
      tmp = new RadiovalueModel();  
      tmp.value = "A";
      tmp.text = "Absent day";       
      this.daytype_list.push(tmp);
    }
    else{
      var tmp = new RadiovalueModel();  
      tmp.value = "N";
      tmp.text = "วันทำงาน";       
      this.daytype_list.push(tmp);
      tmp = new RadiovalueModel();  
      tmp.value = "O";
      tmp.text = "วันหยุด";       
      this.daytype_list.push(tmp);
      tmp = new RadiovalueModel();  
      tmp.value = "H";
      tmp.text = "วันหยุดประเพณี";       
      this.daytype_list.push(tmp);
      tmp = new RadiovalueModel();  
      tmp.value = "C";
      tmp.text = "วันหยุดบริษัท";       
      this.daytype_list.push(tmp);
      tmp = new RadiovalueModel();  
      tmp.value = "L";
      tmp.text = "วันลา";       
      this.daytype_list.push(tmp);
      tmp = new RadiovalueModel();  
      tmp.value = "A";
      tmp.text = "ขาดงาน";       
      this.daytype_list.push(tmp);
    }
  }
  doLoadSelectedDaytype(value:string){
    for (let i = 0; i < this.daytype_list.length; i++) {   
      if(this.daytype_list[i].value==value ){
        this.selectedDaytype = this.daytype_list[i];
        break;         
      }                      
    }
  }

  shift_list: RadiovalueModel[] = [];
  selectedShift: RadiovalueModel = new RadiovalueModel;
  doLoadPolShift(){   
    if(this.initial_current.Language == "EN"){
      var tmp = new RadiovalueModel();  
      tmp.value = "SHT001";
      tmp.text = "Shift Day";       
      this.shift_list.push(tmp);
    }
    else{
      var tmp = new RadiovalueModel();  
      tmp.value = "SHT001";
      tmp.text = "กะเช้า";        
      this.shift_list.push(tmp);
    }
  }
  doLoadSelectedProjobmain_shift(value:string){
    for (let i = 0; i < this.shift_list.length; i++) {   
      if(this.shift_list[i].value==value ){
        this.selectedShift = this.shift_list[i];
        break;         
      }                      
    }
  }

}

import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService, MegaMenuItem, MenuItem, MessageService } from 'primeng/api';
import { EmployeeModel } from 'src/app/models/employee/employee';
import { EmpaddressModel } from 'src/app/models/employee/manage/address';
import { EmpcardModel } from 'src/app/models/employee/manage/card';
import { EmpstatusModel } from 'src/app/models/employee/policy/empstatus';
import { EmptypeModel } from 'src/app/models/employee/policy/emptype';
import { PositionModel } from 'src/app/models/employee/policy/position';
import { InitialModel } from 'src/app/models/system/initial';
import { EmpstatusService } from 'src/app/services/emp/policy/empstatus.service';
import { EmptypeService } from 'src/app/services/emp/policy/emptype.service';
import { PositionService } from 'src/app/services/emp/policy/position.service';
import { EmployeeService } from 'src/app/services/emp/worker.service';
import { EmpDetailService } from 'src/app/services/emp/worker_detail.service';
import { InitialService } from 'src/app/services/system/initial.service';
import { AppConfig } from '../../../../../config/config';
import { InitialCurrent } from '../../../../../config/initial_current';

interface Taxmethod {
  name_th: string,
  name_en: string,
  code: string
}

@Component({
  selector: 'app-sys-branch',
  templateUrl: './sys-branch.component.html',
  styleUrls: ['./sys-branch.component.scss']
})
export class SysBranchComponent implements OnInit {

  emp_code: string = "";
  manage_title: string = ""
  gender: any;
  toolbar_menu: MenuItem[] = [];
  items: MenuItem[] = [];
  items_tab: MenuItem[] = [];

  employee_list: EmployeeModel[] = [];
  selectedEmployee: EmployeeModel = new EmployeeModel();

  edit_employee: boolean = false;
  new_employee: boolean = false;

  resign_emp: boolean = false;

  taxM: Taxmethod[] = [];

  //menu empaddress
  menu_empaddress: MenuItem[] = [];
  edit_empaddress: boolean = false;
  new_empaddress: boolean = false;
  //menu empcard
  menu_empcard: MenuItem[] = [];
  edit_empcard: boolean = false;
  new_card: boolean = false;
  
  displayManage: boolean = false;

  constructor(
    private employeeService: EmployeeService,
    private router: Router,
    private route: ActivatedRoute,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private datePipe: DatePipe,
    private empdetailService:EmpDetailService ,

    //service
    private initialService: InitialService,
    private emptypeService: EmptypeService,
    private empstatusService: EmpstatusService,
    private positionService : PositionService,
  ) {
    this.taxM = [
      { name_th: 'พนักงานจ่ายเอง', name_en: 'Employee Pay', code: '1' },
      { name_th: 'บริษัทออกให้ครั้งเดียว', name_en: 'Company Pay Once', code: '2' },
      { name_th: 'บริษัทออกให้ตลอด', name_en: 'Company Pay Every', code: '3' },
    ];
  }

  ngOnInit(): void {

    this.route.queryParams.subscribe(params => {
      this.emp_code = params['empcode'];
      console.log(this.emp_code);
    });

    this.doGetInitialCurrent();

    // Dropdown
    this.doLoadInitialList();
    this.doLoadEmptypeList();
    this.doLoadEmpstatusList();
    this.doLoadPositionList();


    setTimeout(() => {
      this.doLoadMenu();
    }, 100);

    setTimeout(() => {
      if (this.emp_code != "") {
        this.doLoadEmployee()
      }

    }, 400);

  }

  public initial_current: InitialCurrent = new InitialCurrent();
  doGetInitialCurrent() {
    this.initial_current = JSON.parse(localStorage.getItem(AppConfig.SESSIONInitial) || '{}');
    if (!this.initial_current) {
      this.router.navigateByUrl('');
    }
  }

  title_page: string = "Employee Management";
  title_new: string = "New";
  title_edit: string = "Edit";
  title_delete: string = "Delete";
  title_import: string = "Import";
  title_export: string = "Export";
  title_save: string = "Save";
  title_code: string = "Code";

  title_summit: string = "Summit";
  title_cancel: string = "Cancel";

  title_genaral: string = "Genaral";
  title_empid: string = "Employee ID";
  title_cardid: string = "Employee Card";
  title_fname_th: string = "First Name (Thai)";
  title_lname_th: string = "Last Name (Thai)";
  title_fname_en: string = "First Name (Eng.)";
  title_lname_en: string = "Last Name (Eng.)";
  title_initial: string = "Initial";
  title_gender: string = "Gender";
  male_gender: string = "Male";
  female_gender: string = "Female";
  title_type: string = "Employee Type";
  title_status: string = "Employee Status";
  title_birthdate: string = "Birth Date";
  title_startdate: string = "Start Date";
  title_hrs: string = "Hour/Day";
  title_probation: string = "Probation";
  title_probationdate: string = "Probation Date";
  title_probationenddate: string = "Probation End";
  title_resignstatus: string = "Resign Status";
  title_resigndate: string = "Resign Date";
  title_resignreason: string = "Resign Reason";

  title_personal: string = "Personal";
  title_religion: string = "Religion";
  title_blood: string = "Blood";
  title_weight: string = "Weight";
  title_height: string = "Height";
  title_address: string = "Address";
  title_card: string = "Card";
  title_bank: string = "Bank";
  title_family: string = "Family";
  title_hospital: string = "Hospital";
  title_foreigner: string = "Foreigner";

  title_record: string = "Record";
  title_department: string = "Department";
  title_position: string = "Position";
  title_training: string = "Training";
  title_education: string = "Education";
  title_assessment: string = "Assessment";
  title_criminal: string = "Criminal Record";

  title_finance: string = "Finance";
  title_taxmethod: string = "Tax Method";
  title_salary: string = "Salary";
  title_benefit: string = "Benefit";
  title_fund: string = "Provident Fund";
  title_reduce: string = "Reduces";
  title_accumulate: string = "Accumalate";

  title_tranfer: string = "Tranfer record";

  title_modified_by: string = "Edit by";
  title_modified_date: string = "Edit date";
  title_search: string = "Search";
  title_upload: string = "Upload";

  title_page_from: string = "Showing";
  title_page_to: string = "to";
  title_page_total: string = "of";
  title_page_record: string = "entries";

  title_confirm: string = "Are you sure?";
  title_confirm_record: string = "Confirm to record";
  title_confirm_delete: string = "Confirm to delete";
  title_confirm_yes: string = "Yes";
  title_confirm_no: string = "No";

  title_confirm_cancel: string = "You have cancelled";

  doLoadLanguage() {
    if (this.initial_current.Language == "TH") {
      this.title_page = "ข้อมูลสถานที่ปฎิบัติงาน";
      this.title_new = "เพิ่ม";
      this.title_edit = "แก้ไข";
      this.title_delete = "ลบ";
      this.title_import = "นำเข้า";
      this.title_export = "โอนออก";
      this.title_save = "บันทึก";

      this.title_summit = "บันทึก";
      this.title_cancel = "ยกเลิก";

      this.title_genaral = 'ข้อมูลทั่วไป';
      this.title_code = "รหัสพนักงาน";
      this.title_cardid = "รหัสบัตร";
      this.title_fname_th = "ชื่อจริง (ไทย)";
      this.title_lname_th = "นามสกุล (ไทย)";
      this.title_fname_en = "ชื่อจริง (อังกฤษ)";
      this.title_lname_en = "นามสกุล (อังกฤษ)";
      this.title_initial = "คำนำหน้า";
      this.title_gender = "เพศ";
      this.male_gender = "ชาย";
      this.female_gender = "หญิง";
      this.title_type = "ประเภทพนักงาน";
      this.title_status = 'สถานะ';
      this.title_birthdate = 'วันเกิด';
      this.title_startdate = 'วันที่เริ่มงาน';
      this.title_hrs = 'ชั่วโมงทำงาน';
      this.title_probation = 'จำนวนวันทดลองงาน';
      this.title_probationdate = 'วันที่เริ่มทดลองงาน';
      this.title_probationenddate = 'วันที่สิ้นสุดทดลองงาน';
      this.title_resignstatus = 'ลาออก';
      this.title_resigndate = 'วันที่ลาออก';
      this.title_resignreason = 'เหตุผลการลาออก';

      this.title_personal = 'ข้อมูลส่วนตัว';
      this.title_religion = 'ศาสนา';
      this.title_blood = 'กรุ๊ปเลือด';
      this.title_weight = 'นํ้าหนัก';
      this.title_height = 'ส่วนสูง';
      this.title_address = 'ที่อยู่';
      this.title_card = 'ข้อมูลบัตร';
      this.title_bank = 'ข้อมูลธนาคาร';
      this.title_family = 'ข้อมูลครอบครัว';
      this.title_hospital = 'ข้อมูลโรงพยาบาล';
      this.title_foreigner = 'ข้อมูลพนักงานต่างด้าว';

      this.title_record = 'ข้อมูลประวัติ';
      this.title_department = 'สังกัด';
      this.title_position = 'ตำแหน่ง';
      this.title_education = 'ประวัติการศึกษา';
      this.title_training = 'ประวัติการอบรม';
      this.title_assessment = 'ประวัติการประเมิน';
      this.title_criminal = 'ประวัติการตรวจสอบอาชญากรรม'

      this.title_finance = 'การเงิน';
      this.title_taxmethod = 'การคำนวนภาษี';
      this.title_salary = 'เงินเดือน/ค่าจ้าง';
      this.title_benefit = 'สวัสดิการ';
      this.title_fund = 'กองทุนสำรองเลี้ยงชีพ';
      this.title_reduce = 'ค่าลดหย่อน';
      this.title_accumulate = 'รายได้สะสม/ภาษีสะสม';

      this.title_tranfer = 'ประวัติการโอนย้ายหน่วยงาน';

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

    }
  }


  doLoadMenu() {
    //menumain
    this.toolbar_menu = [
      {
        label: 'Back',
        icon: 'pi-arrow-left',
        command: (event) => {
          this.router.navigateByUrl('employee/list');
        }
      },
      {
        label: 'Save',
        icon: 'pi pi-fw pi-save',
        command: (event) => {
          // console.log('Save')
          this.confirmRecord()
        }

      },];
    //menu address
    this.menu_empaddress = [
      {
        label: 'New',
        icon: 'pi pi-fw pi-plus',
        command: (event) => {
          this.clearManage()
          this.new_empaddress = true
          var ref = this.empaddressList.length + 100
          this.selectedEmpAddress = new EmpaddressModel()
          this.selectedEmpAddress.address_id = ref.toString()
          this.showManage()
        }
      },
      {
        label: 'Edit',
        icon: 'pi pi-fw pi-pencil',
        command: (event) => {
          this.clearManage()
          if (this.selectedEmpAddress != null) {
            this.edit_empaddress = true
            this.showManage()
          }
        }
      },
      {
        label: 'Delete',
        icon: 'pi pi-fw pi-trash',
        command: (event) => {
          if(this.selectedEmpAddress != null){
            this.empaddress_remove()
          }
        }
      },
      {
        label: 'Import',
        icon: 'pi pi-fw pi-file-import',
        command: (event) => {
          console.log("IMPORT");
        }
      },
      {
        label: 'Export',
        icon: 'pi pi-fw pi-file-export',
        command: (event) => {

        }
      }];
    //menu card
    this.menu_empcard = [
      {
        label: 'New',
        icon: 'pi pi-fw pi-plus',
        command: (event) => {
          this.clearManage()
          this.new_card = true
          var ref = this.empcardList.length + 100
          this.selectedEmpcard = new EmpcardModel()
          this.selectedEmpcard.card_id = ref.toString()
          this.showManage()
        }
      },
      {
        label: 'Edit',
        icon: 'pi pi-fw pi-pencil',
        command: (event) => {
          this.clearManage()
          if (this.selectedEmpcard != null) {
            this.edit_empcard = true
            this.showManage()
          }
        }
      },
      {
        label: 'Delete',
        icon: 'pi pi-fw pi-trash',
        command: (event) => {
          if(this.selectedEmpcard != null){
            this.empcard_remove()
          }
        }
      },
      {
        label: 'Import',
        icon: 'pi pi-fw pi-file-import',
        command: (event) => {
        }
      },
      {
        label: 'Export',
        icon: 'pi pi-fw pi-file-export',
        command: (event) => {
        }
      }];
  }

  tabChange(e: { index: any; }) {
    var index = e.index;

    this.edit_empaddress = false;
    this.new_empaddress = false;
    //
    this.edit_empcard = false;
    this.new_card = false;
    //
    

    this.displayManage = false

  }

  position: string = "right";
  showManage() {
    this.displayManage = true;

    if (this.initial_current.Language == "EN") {
      if (this.new_empaddress || this.edit_empaddress) {
        this.manage_title = "Address"
      }
      else if (this.new_card || this.edit_empcard) {
        this.manage_title = "Card"
      }
      

    } else {
      if (this.new_empaddress || this.edit_empaddress) {
        this.manage_title = "ที่อยู่"
      }
      else if (this.new_card || this.edit_empcard) {
        this.manage_title = "ข้อมูลบัตร"
      }
      

    }
  }


  confirmRecord() {
    this.confirmationService.confirm({
      message: this.title_confirm_record,
      header: this.title_confirm,
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.doRecordEmployee()
      },
      reject: () => {
        this.messageService.add({ severity: 'warn', summary: 'Cancelled', detail: this.title_confirm_cancel });
      }
    });
  }

  doLoadEmployee() {
    var employee_list: EmployeeModel[] = [];
    this.employeeService.worker_get(this.initial_current.CompCode, this.emp_code).then(async(res) => {
      await res.forEach((element: EmployeeModel)=>{
        // element.worker_birthdate = new Date(element.worker_birthdate)
        // element.worker_hiredate = new Date(element.worker_hiredate)
        // element.worker_resigndate = new Date(element.worker_resigndate)
        // element.worker_probationdate = new Date(element.worker_probationdate)
        // element.worker_probationenddate = new Date(element.worker_probationenddate)
      })

      employee_list = await res;

      if (employee_list.length > 0) {
        this.selectedEmployee = employee_list[0]

        setTimeout(() => {
          this.doLoadEmpaddressList();
          this.doLoadEmpcardList();

        }, 300);

      }

    });
  }

  //get data dropdown
  initialList: InitialModel[] = [];
  doLoadInitialList() {
    this.initialService.initial_get().then((res) => {
      this.initialList = res;
    })
  }
  emptypeList: EmptypeModel[] = [];
  doLoadEmptypeList() {
    this.emptypeService.type_get().then((res) => {
      this.emptypeList = res;
    })
  }
  statusList: EmpstatusModel[] = [];
  doLoadEmpstatusList() {
    this.empstatusService.status_get().then((res) => {
      this.statusList = res;
    })
  }
  positionList: PositionModel[]=[];
  doLoadPositionList() {
    this.positionService.position_get().then((res) => {
      this.positionList = res;
    })
  }

  //address
  empaddressList: EmpaddressModel[] = [];
  selectedEmpAddress: EmpaddressModel = new EmpaddressModel();
  doLoadEmpaddressList() {
    this.empdetailService.getworker_address(this.initial_current.CompCode, this.emp_code).then((res) => {
      this.empaddressList = res;
      if (this.empaddressList.length > 0) {
        this.selectedEmpAddress = this.empaddressList[0];
      }
    })
  }
  onRowSelectEmpAddress(event: Event) { }
  empaddress_summit() {
    this.empaddress_addItem(this.selectedEmpAddress)
    this.new_empaddress = false
    this.edit_empaddress = false
    this.displayManage = false
  }
  empaddress_remove() {
    this.selectedEmpAddress.address_id = "9999";
    this.empaddress_addItem(this.selectedEmpAddress)
    this.new_empaddress = false
    this.edit_empaddress = false
  }
  empaddress_delete() { }
  empaddress_cancel() {
    this.new_empaddress = false
    this.edit_empaddress = false
    this.displayManage = false
  }
  empaddress_addItem(model:EmpaddressModel){
    const itemNew:EmpaddressModel[] = [];
    for (let i = 0; i < this.empaddressList.length; i++) {
      if(this.empaddressList[i].address_id==model.address_id ){
        //-- Notting
      }
      else{
        itemNew.push(this.empaddressList[i]);
      }
    }
    //-- 9999 for delete
    if(model.address_id != "9999"){
      itemNew.push(model);
    }
    this.empaddressList = [];
    this.empaddressList = itemNew;
    this.empaddressList.sort(function(a, b) { return parseInt(a.address_no) - parseInt(b.address_no); })
  }
  record_empaddress(){
    if(this.empaddressList.length == 0){
      return
    }
    this.empdetailService.record_empaddress(this.selectedEmployee.worker_code, this.empaddressList).then((res) => {
      let result = JSON.parse(res);
      if(result.success){
      }
      else{
      }
    });
  }

  //card
  empcardList: EmpcardModel[] = [];
  selectedEmpcard: EmpcardModel = new EmpcardModel();
  doLoadEmpcardList() {
    this.empdetailService.getworker_card(this.initial_current.CompCode, this.emp_code).then(async(res) => {
      await res.forEach((element: EmpcardModel)=>{

      })
      this.empcardList = await res;

      if (this.empcardList.length > 0) {
        this.selectedEmpcard = this.empcardList[0];
      }
    })
  }
  onRowSelectEmpCard(event: Event) { }
  empcard_summit() {
    this.empcard_addItem(this.selectedEmpcard)
    this.new_card = false
    this.edit_empcard = false
    this.displayManage = false
  }
  empcard_remove() {
    this.selectedEmpcard.card_id = "9999";
    this.empcard_addItem(this.selectedEmpcard)
    this.new_card = false
    this.edit_empcard = false
  }
  empcard_delete() { }
  empcard_cancel() {
    this.new_card = false
    this.edit_empcard = false
    this.displayManage = false
  }
  empcard_addItem(model:EmpcardModel){
    const itemNew:EmpcardModel[] = [];
    for (let i = 0; i < this.empcardList.length; i++) {
      if(this.empcardList[i].card_id==model.card_id ){
        //-- Notting
      }
      else{
        itemNew.push(this.empcardList[i]);
      }
    }
    //-- 9999 for delete
    if(model.card_id != "9999"){
      itemNew.push(model);
    }
    this.empcardList = [];
    this.empcardList = itemNew;
    this.empcardList.sort(function(a, b) { return parseInt(a.card_id) - parseInt(b.card_id); })
  }
  record_empcard(){
    if(this.empcardList.length == 0){
      return
    }
    this.empdetailService.record_empcard(this.selectedEmployee.worker_code, this.empcardList).then((res) => {
      let result = JSON.parse(res);
      if(result.success){
      }
      else{
      }
    });
  }



  doRecordEmployee() {

    this.employeeService.worker_recordall(this.selectedEmployee).then((res) => {
      let result = JSON.parse(res);

      if (result.success) {

         //-- Transaction
         this.record_empaddress();
         this.record_empcard();


        this.messageService.add({ severity: 'success', summary: 'Success', detail: result.message });
        this.router.navigateByUrl('employee/list');
      }
      else {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: result.message });
      }

    });
  }

  close() {
    this.new_employee = false;
    this.selectedEmployee = new EmployeeModel();
  }



  clearManage() {
    this.new_empaddress = false; this.edit_empaddress = false;
    this.new_card = false; this.edit_empcard = false;

  }

}

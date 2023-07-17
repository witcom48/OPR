import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService, MegaMenuItem, MenuItem, MessageService } from 'primeng/api';
import { AppConfig } from '../../../../config/config';
import { InitialCurrent } from '../../../../config/initial_current';
//import model
import { InitialModel } from '../../../../models/employee/policy/initial';
import { EmptypeModel } from '../../../../models/employee/policy/emptype';
import { EmpstatusModel } from '../../../../models/employee/policy/empstatus';
import { PositionModel } from '../../../../models/employee/policy/position';
//import service
import { InitialService } from '../../../../services/emp/policy/initial.service';
import { EmptypeService } from '../../../../services/emp/policy/emptype.service';
import { EmpstatusService } from '../../../../services/emp/policy/empstatus.service';
import { EmpDetailService } from 'src/app/services/emp/worker_detail.service';
import { PositionService } from 'src/app/services/emp/policy/position.service';
import { CompanyModel } from 'src/app/models/system/company';
import { CompanyService } from 'src/app/services/system/company.service';
import { ComaddressModel } from 'src/app/models/system/comaddress';
import { ComcardModel } from 'src/app/models/system/comcard';
import { CombankModel } from 'src/app/models/system/combank';
import { CompanyDetailService } from 'src/app/services/system/company_detail.service';
@Component({
    selector: 'app-system-comaddress',
    templateUrl: './system-comaddress.component.html',
    styleUrls: ['./system-comaddress.component.scss'],
})
export class SystemComaddressComponent implements OnInit {

  company_code: string = "";
  manage_title: string = ""

  toolbar_menu: MenuItem[] = [];
  items: MenuItem[] = [];
  items_tab: MenuItem[] = [];

  company_list: CompanyModel[] = [];
  selectedCompany: CompanyModel = new CompanyModel();

  edit_company: boolean = false;
  new_company: boolean = false;

  //menu Comaddress
  menu_comaddress: MenuItem[] = [];
  edit_comaddress: boolean = false;
  new_comaddress: boolean = false;
  //menu comcard
  menu_comcard: MenuItem[] = [];
  edit_comcard: boolean = false;
  new_card: boolean = false;
  //menu Combank
  menu_combank: MenuItem[] = [];
  edit_combank: boolean = false;
  new_bank: boolean = false;





  displayManage: boolean = false;

  constructor(
    private companyService: CompanyService,
    private router: Router,
    private route: ActivatedRoute,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private datePipe: DatePipe,
    private empdetailService:EmpDetailService ,
    private companyDetailService:CompanyDetailService ,


    //service
    private initialService: InitialService,
    private emptypeService: EmptypeService,
    private empstatusService: EmpstatusService,
    private positionService : PositionService,
  ) {
  }

  ngOnInit(): void {

    this.route.queryParams.subscribe(params => {
      this.company_code = params['companycode'];
      // console.log(this.company_code);
    });

    this.doGetInitialCurrent();

    // Dropdown
    // this.doLoadInitialList();
    // this.doLoadEmptypeList();
    // this.doLoadEmpstatusList();
    // this.doLoadPositionList();


    setTimeout(() => {
      this.doLoadMenu();
    }, 100);

    setTimeout(() => {
      if (this.company_code != "") {
        this.doLoadCompany()
      }

    }, 400);

  }

  public initial_current: InitialCurrent = new InitialCurrent();
  doGetInitialCurrent() {
    this.initial_current = JSON.parse(localStorage.getItem(AppConfig.SESSIONInitial) || '{}');
    if (!this.initial_current) {
      this.router.navigateByUrl('login');
    }
  }

  title_page: string = "company";
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

  title_fname_th: string = "First Name (Thai)";
  title_lname_th: string = "Last Name (Thai)";
  title_fname_en: string = "First Name (Eng.)";
  title_lname_en: string = "Last Name (Eng.)";
  title_initial: string = "Initial";


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
      this.title_fname_th = "ชื่อจริง (ไทย)";
      this.title_lname_th = "นามสกุล (ไทย)";
      this.title_fname_en = "ชื่อจริง (อังกฤษ)";
      this.title_lname_en = "นามสกุล (อังกฤษ)";
      this.title_initial = "คำนำหน้า";


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
        label: 'Backs',
        icon: 'pi-arrow-left',
        command: (event) => {
          this.router.navigateByUrl('system/company');
        }
      },
      {
        label: 'Save',
        icon: 'pi pi-fw pi-save',
        command: (event) => {
          // // console.log('Save')
          this.confirmRecord()
        }

      },];
    //menu address
    this.menu_comaddress = [
      {
        label: 'New',
        icon: 'pi pi-fw pi-plus',
        command: (event) => {
          this.clearManage()
          this.new_comaddress = true
          var ref = this.comaddressList.length + 100
          this.selectedComaddress = new ComaddressModel()
          this.selectedComaddress.comaddres_type = ref.toString()
          this.showManage()
        }
      },
      {
        label: 'Edit',
        icon: 'pi pi-fw pi-pencil',
        command: (event) => {
          this.clearManage()
          if (this.selectedComaddress != null) {
            this.edit_comaddress = true
            this.showManage()
          }
        }
      },
      {
        label: 'Delete',
        icon: 'pi pi-fw pi-trash',
        command: (event) => {
          if(this.selectedComaddress != null){
            this.comaddresss_remove()
          }
        }
      },
      {
        label: 'Import',
        icon: 'pi pi-fw pi-file-import',
        command: (event) => {
          // console.log("IMPORT");
        }
      },
      {
        label: 'Export',
        icon: 'pi pi-fw pi-file-export',
        command: (event) => {

        }
      }];
    //menu card
    this.menu_comcard = [
      {
        label: 'New',
        icon: 'pi pi-fw pi-plus',
        command: (event) => {
          this.clearManage()
          this.new_card = true
          var ref = this.comcardList.length + 100
          this.selectedComcard = new ComcardModel()
          this.selectedComcard.comcard_id = ref.toString()
          this.showManage()
        }
      },
      {
        label: 'Edit',
        icon: 'pi pi-fw pi-pencil',
        command: (event) => {
          this.clearManage()
          if (this.selectedComcard != null) {
            this.edit_comcard = true
            this.showManage()
          }
        }
      },
      {
        label: 'Delete',
        icon: 'pi pi-fw pi-trash',
        command: (event) => {
          if(this.selectedComcard != null){
            this.comcard_remove()
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
    //menu bank
    this.menu_combank = [
      {
        label: 'New',
        icon: 'pi pi-fw pi-plus',
        command: (event) => {
          this.clearManage()
          this.new_bank = true
          var ref = this.combankList.length + 100
          this.selectedCombank = new CombankModel()
          this.selectedCombank.combank_id = ref.toString()
          this.showManage()
        }
      },
      {
        label: 'Edit',
        icon: 'pi pi-fw pi-pencil',
        command: (event) => {
          this.clearManage()
          if (this.selectedCombank != null) {
            this.edit_combank = true
            this.showManage()
          }
        }
      },
      {
        label: 'Delete',
        icon: 'pi pi-fw pi-trash',
        command: (event) => {
          if(this.selectedCombank != null){
            this.combank_remove()
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

    this.edit_comaddress = false;
    this.new_comaddress = false;
    //
    this.edit_comcard = false;
    this.new_card = false;
    //
    this.edit_combank = false;
    this.new_bank = false;
    //


    this.displayManage = false

  }

  position: string = "right";
  showManage() {
    this.displayManage = true;

    if (this.initial_current.Language == "EN") {
      if (this.new_comaddress || this.edit_comaddress) {
        this.manage_title = "Address"
      }
      else if (this.new_card || this.edit_comcard) {
        this.manage_title = "Card"
      }
      else if (this.new_bank || this.edit_combank) {
        this.manage_title = "Bank"
      }

    } else {
      if (this.new_comaddress || this.edit_comaddress) {
        this.manage_title = "ที่อยู่"
      }
      else if (this.new_card || this.edit_comcard) {
        this.manage_title = "ข้อมูลบัตร"
      }
      else if (this.new_bank || this.edit_combank) {
        this.manage_title = "ข้อมูลธนาคาร"
      }

    }
  }

  doLoadCompany() {
    var Company_list: CompanyModel[] = [];
    this.companyService.company_get(this.company_code).then(async(res) => {
      await res.forEach((element: CompanyModel)=>{

      })

      Company_list = await res;

      if (Company_list.length > 0) {
        this.selectedCompany = Company_list[0]

        setTimeout(() => {
          this.doLoadComaddressList();
          this.doLoadComcardList();
          this.doLoadCombankList();

        }, 300);

      }

    });
  }

  //get data dropdown
//   initialList: InitialModel[] = [];
//   doLoadInitialList() {
//     this.initialService.initial_get().then((res) => {
//       this.initialList = res;
//     })
//   }
//   emptypeList: EmptypeModel[] = [];
//   doLoadEmptypeList() {
//     this.emptypeService.type_get().then((res) => {
//       this.emptypeList = res;
//     })
//   }
//   statusList: EmpstatusModel[] = [];
//   doLoadEmpstatusList() {
//     this.empstatusService.status_get().then((res) => {
//       this.statusList = res;
//     })
//   }
//   positionList: PositionModel[]=[];
//   doLoadPositionList() {
//     this.positionService.position_get().then((res) => {
//       this.positionList = res;
//     })
//   }

  //address
  comaddressList: ComaddressModel[] = [];
  selectedComaddress: ComaddressModel = new ComaddressModel();
  doLoadComaddressList() {
    this.companyDetailService.getcompany_address(this.company_code, '').then((res) => {
      this.comaddressList = res;
      if (this.comaddressList.length > 0) {
        this.selectedComaddress = this.comaddressList[0];
      }
    })
  }
  onRowSelectComaddress(event: Event) { }
  comaddress_summit() {
    this.comaddress_addItem(this.selectedComaddress)
    this.new_comaddress = false
    this.edit_comaddress = false
    this.displayManage = false
  }
  comaddresss_remove() {
    this.selectedComaddress.comaddres_type = "9999";
    this.comaddress_addItem(this.selectedComaddress)
    this.new_comaddress = false
    this.edit_comaddress= false
  }
  comaddress_delete() { }
  comaddress_cancel() {
    this.new_comaddress = false
    this.edit_comaddress = false
    this.displayManage = false
  }
  comaddress_addItem(model:ComaddressModel){
    const itemNew:ComaddressModel[] = [];
    for (let i = 0; i < this.comaddressList.length; i++) {
      if(this.comaddressList[i].comaddres_type==model.comaddres_type ){
        //-- Notting
      }
      else{
        itemNew.push(this.comaddressList[i]);
      }
    }
    //-- 9999 for delete
    if(model.comaddres_type != "9999"){
      itemNew.push(model);
    }
    this.comaddressList = [];
    this.comaddressList = itemNew;
    this.comaddressList.sort(function(a, b) { return parseInt(a.comaddres_noen) - parseInt(b.comaddres_noth); })
  }
  record_comaddress(){
    if(this.comaddressList.length == 0){
      return
    }
    this.companyDetailService.record_comaddress(this.selectedCompany.company_code, this.comaddressList).then((res) => {
      let result = JSON.parse(res);
      if(result.success){
      }
      else{
      }
    });
  }

  //card
  comcardList: ComcardModel[] = [];
  selectedComcard: ComcardModel = new ComcardModel();
  doLoadComcardList() {
    this.companyDetailService.getcompany_card(this.initial_current.CompCode, this.company_code).then(async(res) => {
      await res.forEach((element: ComcardModel)=>{
        element.comcard_issue = new Date(element.comcard_issue)
        element.comcard_expire = new Date(element.comcard_expire)

      })
      this.comcardList = await res;

      if (this.comcardList.length > 0) {
        this.selectedComcard = this.comcardList[0];
      }
    })
  }
  onRowSelectComcard(event: Event) { }
  comcard_summit() {
    this.comcard_addItem(this.selectedComcard)
    this.new_card = false
    this.edit_comcard = false
    this.displayManage = false
  }
  comcard_remove() {
    this.selectedComcard.comcard_id = "9999";
    this.comcard_addItem(this.selectedComcard)
    this.new_card = false
    this.edit_comcard = false
  }
  comcard_delete() { }
  comcard_cancel() {
    this.new_card = false
    this.edit_comcard = false
    this.displayManage = false
  }
  comcard_addItem(model:ComcardModel){
    const itemNew:ComcardModel[] = [];
    for (let i = 0; i < this.comcardList.length; i++) {
      if(this.comcardList[i].comcard_id==model.comcard_id ){
        //-- Notting
      }
      else{
        itemNew.push(this.comcardList[i]);
      }
    }
    //-- 9999 for delete
    if(model.comcard_id != "9999"){
      itemNew.push(model);
    }
    this.comcardList = [];
    this.comcardList = itemNew;
    this.comcardList.sort(function(a, b) { return parseInt(a.comcard_id) - parseInt(b.comcard_id); })
  }
  record_comcard(){
    if(this.comcardList.length == 0){
      return
    }
    this.companyDetailService.record_comcard(this.selectedCompany.company_code, this.comcardList).then((res) => {
      let result = JSON.parse(res);
      if(result.success){
      }
      else{
      }
    });
  }

  //bank
  combankList: CombankModel[] = [];
  selectedCombank: CombankModel = new CombankModel();
  doLoadCombankList() {
    this.companyDetailService.getcompany_bank(this.initial_current.CompCode, this.company_code).then((res) => {

      this.combankList = res;
      if (this.combankList.length > 0) {
        this.selectedCombank = this.combankList[0];
      }
    })
  }
  onRowSelectCombank(event: Event) { }
  combank_summit() {
    this.combank_addItem(this.selectedCombank)
    this.new_bank = false
    this.edit_combank = false
    this.displayManage = false
  }
  combank_remove() {
    this.selectedCombank.combank_id = "9999";
    this.combank_addItem(this.selectedCombank)
    this.new_bank = false
    this.edit_combank = false
  }
  combank_delete() { }
  combank_cancel() {
    this.new_bank = false
    this.edit_combank = false
    this.displayManage = false
  }
  combank_addItem(model:CombankModel){
    const itemNew:CombankModel[] = [];
    for (let i = 0; i < this.combankList.length; i++) {
      if(this.combankList[i].combank_id==model.combank_id ){
        //-- Notting
      }
      else{
        itemNew.push(this.combankList[i]);
      }
    }
    //-- 9999 for delete
    if(model.combank_id != "9999"){
      itemNew.push(model);
    }
    this.combankList = [];
    this.combankList = itemNew;
    this.combankList.sort(function(a, b) { return parseInt(a.combank_id) - parseInt(b.combank_id); })
  }
  record_combank(){
    if(this.combankList.length == 0){
      return
    }
    this.companyDetailService.record_combank(this.selectedCompany.company_code, this.combankList).then((res) => {
      let result = JSON.parse(res);
      if(result.success){
      }
      else{
      }
    });
  }
  confirmRecord() {
    this.confirmationService.confirm({
      message: this.title_confirm_record,
      header: this.title_confirm,
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.doRecordCompany()
      },
      reject: () => {
        this.messageService.add({ severity: 'warn', summary: 'Cancelled', detail: this.title_confirm_cancel });
      }
    });
  }

  doRecordCompany() {

    this.companyService.company_recordall(this.selectedCompany).then((res) => {
      let result = JSON.parse(res);

      if (result.success) {

         //-- Transaction
         this.record_comaddress();
         this.record_comcard();
         this.record_combank();


        this.messageService.add({ severity: 'success', summary: 'Success', detail: result.message });
        this.router.navigateByUrl('company/list');
      }
      else {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: result.message });
      }

    });
  }

  close() {
    this.new_company = false;
    this.selectedCompany = new CompanyModel();
  }



  clearManage() {
    this.new_comaddress = false; this.edit_comaddress = false;
    this.new_card = false; this.edit_comcard = false;
    this.new_bank = false; this.edit_combank = false;

  }

}

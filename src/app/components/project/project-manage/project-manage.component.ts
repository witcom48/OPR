import { Component, OnInit } from '@angular/core';
import { MegaMenuItem,MenuItem } from 'primeng/api';
import { ActivatedRoute, NavigationExtras } from '@angular/router';
import { Router } from '@angular/router';

import {ConfirmationService, ConfirmEventType, MessageService} from 'primeng/api';
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

import { ProjobcontractModel } from '../../../models/project/project_jobcontract';
import { ProjobcostModel } from '../../../models/project/project_jobcost';
import { ProjobmachineModel } from '../../../models/project/project_jobmachine';
import { ProjobsubModel } from '../../../models/project/project_jobsub';

import { ProjobempModel } from '../../../models/project/project_jobemp';
import { ProjobworkingModel } from '../../../models/project/project_jobworking';

import { EmployeeModel } from '../../../models/employee/employee';
import { EmployeeService } from 'src/app/services/emp/worker.service';

import { RadiovalueModel } from '../../../models/project/radio_value';



@Component({
  selector: 'app-project-manage',
  templateUrl: './project-manage.component.html',
  styleUrls: ['./project-manage.component.scss']
})
export class ProjectManageComponent implements OnInit {

  manage_title: string = ""
  toolbar_menu: MenuItem[] = []; 

  days: string[] =["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturay"];

  costs_title: string[] =["","","","","","","","","",""];
  
  project_code:string = "";
  probusiness_list: ProbusinessModel[] = [];
  selectedProbusiness: ProbusinessModel = new ProbusinessModel();
  protype_list: ProtypeModel[] = [];
  selectedProtype: ProtypeModel = new ProtypeModel();

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


  title_project_code:string = "Code";
  title_project_name_th:string = "Description (TH)";
  title_project_name_en:string = "Description (EN)";
  title_project_codecentral:string = "Code central";
  title_project_name_sub:string = "Name Sub";
  title_project_probusiness:string = "Business";
  title_project_protype:string = "Type";
  title_project_roundtime:string = "Time rounding";
  title_project_roundmoney:string = "Amount rounding";

  title_address:string = "Address";
  title_address_no:string = "Address No";
  title_address_moo:string = "Moo";
  title_address_road:string = "Road";
  title_address_soi:string = "Soi";
  title_address_tambon:string = "Tambon";
  title_address_amphur:string = "Amphur";
  title_address_province:string = "Province";
  title_address_zipcode:string = "Zipcode";
  title_address_tel:string = "Tel.";
  title_address_email:string = "Email";
  title_address_note:string = "Note";

  title_contact:string = "Contact";
  title_contact_no:string = "No";
  title_contact_initial:string = "Initial";
  title_contact_firstname:string = "Firstname";
  title_contact_lastname:string = "Lastname";
  title_contact_position:string = "Position";
  title_contact_tel:string = "Tel.";
  title_contact_email:string = "Email"; 

  constructor(
    private router:Router, 
    private route: ActivatedRoute,
    private projectService: ProjectService, 
    private projectDetailService:ProjectDetailService,
    private genaralService: ProgenaralService,    
    private procostService:ProcostService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private datePipe: DatePipe,
    private employeeService: EmployeeService

  ) {

    
   }

  ngOnInit(): void {

    this.route.queryParams.subscribe(params => {
      this.project_code = params['project'];    
      console.log(this.project_code);
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

      this.title_project_code = "รหัสหน่วยงาน";
      this.title_project_name_th = "ชื่อไทย";
      this.title_project_name_en = "ชื่ออังกฤษ";
      this.title_project_codecentral = "รหัสหน่วยงานกลาง";
      this.title_project_name_sub = "ชื่อย่อ";
      this.title_project_probusiness = "ประเภทธุรกิจ";
      this.title_project_protype = "ประเภทงาน";
      this.title_project_roundtime = "รูปแบบปัดเศษเวลา";
      this.title_project_roundmoney = "รูปแบบปัดเศษเงิน";

      this.title_submit = "ตกลง";
      this.title_cancel = "ปิด";

      this.title_address = "ที่อยู่";
      this.title_address_no = "เลขที่";
      this.title_address_moo = "หมู่";
      this.title_address_road = "ถนน";
      this.title_address_soi = "ซอย";
      this.title_address_tambon = "ตำบล";
      this.title_address_amphur = "อำเภอ";
      this.title_address_province = "จังหวัด";
      this.title_address_zipcode = "รหัสไปรษณีย์";
      this.title_address_tel = "เบอร์โทรศัพท์";
      this.title_address_email = "อีเมล์";
      this.title_address_note = "เพิ่มเติม";

      this.title_contact = "ผู้ติดต่อ";
      this.title_contact_initial = "คำนำหน้า";
      this.title_contact_no = "ลำดับ";
      this.title_contact_firstname = "ชื่อ";
      this.title_contact_lastname = "นามสกุล";
      this.title_contact_position = "ตำแหน่ง";
      this.title_contact_tel = "เบอร์โทรศัพท์";
      this.title_contact_email = "อีเมล์"; 
      
    }
  }

  public initial_current:InitialCurrent = new InitialCurrent();  
  doGetInitialCurrent(){    
    this.initial_current = JSON.parse(localStorage.getItem(AppConfig.SESSIONInitial) || '{}');
    if (!this.initial_current) {
      this.router.navigateByUrl('');
    }       
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

  doLoadMenu(){

    this.toolbar_menu = [   
      {
        label:'Save',
        icon:'pi pi-fw pi-save',
        command: (event) => {
          this.confirmRecord()
        }           
      }
    ]

    this.menu_procontact = [   
      {
        label:this.title_new,
        icon:'pi pi-fw pi-plus',
        command: (event) => {
          this.clearManage()
          this.new_procontact = true
          var ref = this.procontact_list.length + 100          
          this.selectedProcontact = new ProcontactModel()
          this.selectedProcontact.procontact_ref = ref.toString()
          this.showManage()
        }  
      } 
      ,
      {
          label:'Edit',
          icon:'pi pi-fw pi-pencil',
          command: (event) => {
            this.clearManage()
            if(this.selectedProcontact != null){
              this.edit_procontact = true
              this.showManage()  
            }            
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
      ,
      {
        label:this.title_delete,
        icon:'pi pi-fw pi-trash',  
        command: (event) => {
          if(this.selectedProcontact != null){
            this.procontact_remove()  
          }          
        }  
      } 
    ];

    this.menu_procontract = [   
      {
        label:this.title_new,
        icon:'pi pi-fw pi-plus',
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
          label:'Edit',
          icon:'pi pi-fw pi-pencil',
          command: (event) => {
            this.clearManage()
            if(this.selectedProcontract != null){
              this.edit_procontract = true
              this.showManage()  
            }            
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
      ,
      {
        label:this.title_delete,
        icon:'pi pi-fw pi-trash',  
        command: (event) => {
          if(this.selectedProcontract != null){
            this.procontract_remove()  
          }          
        }  
      } 
    ];

    this.menu_proresponsible = [   
      {
        label:this.title_new,
        icon:'pi pi-fw pi-plus',
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
          label:'Edit',
          icon:'pi pi-fw pi-pencil',
          command: (event) => {
            this.clearManage()
            if(this.selectedProresponsible != null){
              this.edit_proresponsible = true
              this.showManage()  
            }            
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
      ,
      {
        label:this.title_delete,
        icon:'pi pi-fw pi-trash',  
        command: (event) => {
          if(this.selectedProresponsible != null){
            this.proresponsible_remove()  
          }          
        }  
      } 
    ];

    this.menu_protimepol = [   
      {
        label:this.title_new,
        icon:'pi pi-fw pi-plus',
        command: (event) => {
          this.clearManage()
          this.new_protimepol = true         
          this.selectedProtimepol = new ProtimepolModel()          
          this.selectedProtimepol.protimepol_id = this.protimepol_list.length + 1   
          
        }  
      } 
      ,
      {
          label:'Edit',
          icon:'pi pi-fw pi-pencil',
          command: (event) => {
            this.clearManage()
            if(this.selectedProtimepol != null){

              this.doLoadSelectedProtimepol_ot(this.selectedProtimepol.protimepol_ot)
              this.doLoadSelectedProtimepol_allw(this.selectedProtimepol.protimepol_allw)
              this.doLoadSelectedProtimepol_dg(this.selectedProtimepol.protimepol_dg)
              this.doLoadSelectedProtimepol_lv(this.selectedProtimepol.protimepol_lv)
              this.doLoadSelectedProtimepol_lt(this.selectedProtimepol.protimepol_lt)

              this.edit_protimepol = true
              
            }            
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
      ,
      {
        label:this.title_delete,
        icon:'pi pi-fw pi-trash',  
        command: (event) => {
          if(this.selectedProtimepol != null){
            this.protimepol_remove()  
          }          
        }  
      } 
    ];

    this.menu_projobmain = [   
      {
        label:this.title_new,
        icon:'pi pi-fw pi-plus',
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
        }  
      } 
      ,
      {
          label:'Edit',
          icon:'pi pi-fw pi-pencil',
          command: (event) => {
            this.clearManage()
            if(this.selectedProjobmain != null){
              this.edit_projobmain = true
              this.projobmain_loadtran()
            }            
        }
        ,disabled: this.disable_projobmain,        
      } 
      ,
      {
        label:'Save',
        icon:'pi pi-fw pi-save',
        command: (event) => {
          this.confirmRecordJobmain()
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
      ,
      {
        label:this.title_delete,
        icon:'pi pi-fw pi-trash',  
        command: (event) => {
          if(this.selectedProjobmain != null){
            this.projobmain_remove()  
          }          
        }  
      } 
    ];

    this.menu_projobcontract = [   
      {
        label:this.title_new,
        icon:'pi pi-fw pi-plus',
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
          label:'Edit',
          icon:'pi pi-fw pi-pencil',
          command: (event) => {
            this.clearManage()
            if(this.selectedProjobcontract != null){
              this.edit_projobcontract = true
              this.showManage() 
            }            
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
      ,
      {
        label:this.title_delete,
        icon:'pi pi-fw pi-trash',  
        command: (event) => {
          if(this.selectedProjobcontract != null){
            this.projobcontract_remove()  
          }          
        }  
      } 
    ];

    this.menu_projobcost = [   
      {
        label:this.title_new,
        icon:'pi pi-fw pi-plus',
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
          label:'Edit',
          icon:'pi pi-fw pi-pencil',
          command: (event) => {
            this.clearManage()
            if(this.selectedProjobcost != null){
              this.edit_projobcost = true

              this.showManage() 
            }            
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
      ,
      {
        label:this.title_delete,
        icon:'pi pi-fw pi-trash',  
        command: (event) => {
          if(this.selectedProjobcost != null){
            this.projobcost_remove()  
          }          
        }  
      } 
    ];

    this.menu_projobmachine = [   
      {
        label:this.title_new,
        icon:'pi pi-fw pi-plus',
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
          label:'Edit',
          icon:'pi pi-fw pi-pencil',
          command: (event) => {
            this.clearManage()
            if(this.selectedProjobmachine != null){
              this.edit_projobmachine = true

              this.showManage() 
            }            
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
      ,
      {
        label:this.title_delete,
        icon:'pi pi-fw pi-trash',  
        command: (event) => {
          if(this.selectedProjobmachine != null){
            this.projobmachine_remove()  
          }          
        }  
      } 
    ];

    this.menu_projobsub = [   
      {
        label:this.title_new,
        icon:'pi pi-fw pi-plus',
        command: (event) => {
          this.clearManage()
          this.new_projobsub = true
          var ref = this.projobsub_list.length + 100          
          this.selectedProjobsub = new ProjobsubModel()
          this.selectedProjobsub.projobsub_id = ref.toString()   
         
        }  
      } 
      ,
      {
          label:'Edit',
          icon:'pi pi-fw pi-pencil',
          command: (event) => {
            this.clearManage()
            if(this.selectedProjobsub != null){
              this.edit_projobsub = true
            }            
        }        
      } 
      ,
      {
        label:'Save',
        icon:'pi pi-fw pi-save',
        command: (event) => {
          this.confirmRecordJobsub()
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
      ,
      {
        label:this.title_delete,
        icon:'pi pi-fw pi-trash',  
        command: (event) => {
          if(this.selectedProjobsub != null){
            this.projobsub_remove()  
          }          
        }  
      } 
    ];

    this.menu_projobsubcontract = [   
      {
        label:this.title_new,
        icon:'pi pi-fw pi-plus',
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
          label:'Edit',
          icon:'pi pi-fw pi-pencil',
          command: (event) => {
            this.clearManage()
            if(this.selectedProjobsubcontract != null){
              this.edit_projobsubcontract = true
              this.showManage() 
            }            
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
      ,
      {
        label:this.title_delete,
        icon:'pi pi-fw pi-trash',  
        command: (event) => {
          if(this.selectedProjobsubcontract != null){
            this.projobsubcontract_remove()  
          }          
        }  
      } 
    ];

    this.menu_projobsubcost = [   
      {
        label:this.title_new,
        icon:'pi pi-fw pi-plus',
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
          label:'Edit',
          icon:'pi pi-fw pi-pencil',
          command: (event) => {
            this.clearManage()
            if(this.selectedProjobsubcost != null){
              this.edit_projobsubcost = true

              this.showManage() 
            }            
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
      ,
      {
        label:this.title_delete,
        icon:'pi pi-fw pi-trash',  
        command: (event) => {
          if(this.selectedProjobsubcost != null){
            this.projobsubcost_remove()  
          }          
        }  
      } 
    ];

    this.menu_projobemp = [   
      {
        label:this.title_new,
        icon:'pi pi-fw pi-plus',
        command: (event) => {
          this.clearManage()
          this.new_projobemp = true
          var ref = this.projobemp_list.length + 100          
          this.selectedProjobemp = new ProjobempModel()
          this.selectedProjobemp.projobemp_id = ref.toString()   
          
          this.showManage() 
        }  
      } 
      ,
      {
          label:'Edit',
          icon:'pi pi-fw pi-pencil',
          command: (event) => {
            this.clearManage()
            if(this.selectedProjobemp != null){
              this.edit_projobemp = true

              this.showManage() 
            }            
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
      ,
      {
        label:this.title_delete,
        icon:'pi pi-fw pi-trash',  
        command: (event) => {
          if(this.selectedProjobemp != null){
            this.projobemp_remove()  
          }          
        }  
      } 
    ];

    

  }

  
  selectedProject: ProjectModel = new ProjectModel;
  doLoadProject(){
    var project_list: ProjectModel[] = [];
    this.projectService.project_get(this.initial_current.CompCode, this.project_code).then((res) => {
      
      project_list = res;    
      
      if(project_list.length > 0){
        this.selectedProject = project_list[0]

        //this.doLoadSelectedProbusiness(this.selectedProject.project_probusiness);
        //this.doLoadSelectedProtype(this.selectedProject.project_protype);

        setTimeout(() => {
          this.doLoadProaddress()
          this.doLoadProcontact()
          this.doLoadProcontract()
          this.doLoadProresponsible()
          this.doLoadProtimepol()

          this.doLoadProjobmain()  
          this.doLoadProjobsub()     
          
          this.doLoadProjobemp()     
          

        }, 300);

      }      

    });
  }
  doLoadSelectedProbusiness(value:string){
    for (let i = 0; i < this.probusiness_list.length; i++) {   
      if(this.probusiness_list[i].probusiness_code==value ){
        this.selectedProbusiness = this.probusiness_list[i];
        break;         
      }                      
    }
  }
  doLoadSelectedProtype(value:string){
    for (let i = 0; i < this.protype_list.length; i++) {   
      if(this.protype_list[i].protype_code==value ){
        this.selectedProtype = this.protype_list[i];
        break;         
      }                      
    }
  }
  doLoadMaster(){
    this.genaralService.probusiness_get().then((res) => {
      //console.log(res)
      this.probusiness_list = res;     
    });

    this.genaralService.protype_get().then((res) => {
      this.protype_list = res;     
    });

    this.doLoadInitial()
    this.doLoadPosition()

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

  }

  initial_list_cbb: RadiovalueModel[] = [];  
  selectedProcontact_initial: RadiovalueModel = new RadiovalueModel;
  doLoadInitial(){

    if(this.initial_current.Language == "EN"){
      var tmp = new RadiovalueModel();  
      tmp.value = "001";
      tmp.text = "Mr.";       
      this.initial_list_cbb.push(tmp);

      tmp = new RadiovalueModel();  
      tmp.value = "002";      
      tmp.text = "Mrs.";          
      this.initial_list_cbb.push(tmp);
    }
    else{
      var tmp = new RadiovalueModel();  
      tmp.value = "001";
      tmp.text = "นาย";
        
      this.initial_list_cbb.push(tmp);

      tmp = new RadiovalueModel();  
      tmp.value = "002";
      tmp.text = "นาง";           
      this.initial_list_cbb.push(tmp);
    }    
  }
  doLoadSelectedProcontact_initial(value:string){
    for (let i = 0; i < this.initial_list_cbb.length; i++) {   
      if(this.initial_list_cbb[i].value==value ){
        this.selectedProcontact_initial = this.initial_list_cbb[i];
        break;         
      }                      
    }
  }

  position_list_cbb: RadiovalueModel[] = [];
  selectedProcontact_position: RadiovalueModel = new RadiovalueModel;
  doLoadPosition(){   
    if(this.initial_current.Language == "EN"){
      var tmp = new RadiovalueModel();  
      tmp.value = "001";
      tmp.text = "Services";       
      this.position_list_cbb.push(tmp);

      tmp = new RadiovalueModel();  
      tmp.value = "002";      
      tmp.text = "Manager";          
      this.position_list_cbb.push(tmp);
    }
    else{
      var tmp = new RadiovalueModel();  
      tmp.value = "001";
      tmp.text = "พนักงานทำความสะอาด";
        
      this.position_list_cbb.push(tmp);

      tmp = new RadiovalueModel();  
      tmp.value = "002";
      tmp.text = "หัวหน้างาน";           
      this.position_list_cbb.push(tmp);
    }
  }
  doLoadSelectedProcontact_position(value:string){
    for (let i = 0; i < this.position_list_cbb.length; i++) {   
      if(this.position_list_cbb[i].value==value ){
        this.selectedProcontact_initial = this.position_list_cbb[i];
        break;         
      }                      
    }
  }
    
  confirmRecord() {
    this.confirmationService.confirm({
        message: this.title_confirm_record,
        header: this.title_confirm,
        icon: 'pi pi-exclamation-triangle',
        accept: () => {

          this.selectedProject.project_probusiness = this.selectedProbusiness.probusiness_code;
          this.selectedProject.project_protype = this.selectedProtype.protype_code;

          this.projectService.project_record(this.selectedProject).then((res) => {       
            let result = JSON.parse(res);  
            if(result.success){

              //-- Transaction
              this.proaddress_record()
              this.procontact_record()
              this.procontract_record()
              this.proresponsible_record()
              this.protimepol_record()
              
              //this.projobcontract_record()
              
              this.messageService.add({severity:'success', summary: 'Success', detail: result.message});
              this.doLoadProject()
            }
            else{
              this.messageService.add({severity:'error', summary: 'Error', detail: result.message});
            }  
          });
        },
        reject: () => {
          this.messageService.add({severity:'warn', summary:'Cancelled', detail:this.title_confirm_cancel});
        }
    });
  }
      
  confirmDelete() {
    this.confirmationService.confirm({
        message: this.title_confirm_delete,
        header: this.title_confirm,
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
          
        },
        reject: () => {
          this.messageService.add({severity:'warn', summary:'Cancelled', detail:this.title_confirm_cancel});
        }
    });
  }

  confirmRecordJobmain() {
    this.confirmationService.confirm({
        message: this.title_confirm_record,
        header: this.title_confirm,
        icon: 'pi pi-exclamation-triangle',
        accept: () => {

          this.projectDetailService.projobmain_record(this.selectedProject.project_code, this.projobmain_list).then((res) => {       
            let result = JSON.parse(res);  
            if(result.success){     
              
              var jobcontract = this.projobcontract_record()
              var jobcost = this.projobcost_record()
              var jobmachine = this.projobmachine_record()

              this.messageService.add({severity:'success', summary: 'Success', detail: "Record Success.."});

              this.displayManage = false

              setTimeout(() => {
                      
                this.doLoadProjobcontract() 
                this.doLoadProjobcost()          
      
              }, 200);

            }
            else{  
              this.messageService.add({severity:'error', summary: 'Error', detail: "Record Not Success.."});   
            }  
          })
        },
        reject: () => {
          this.messageService.add({severity:'warn', summary:'Cancelled', detail:this.title_confirm_cancel});
        }
    });
  }

  confirmRecordJobsub() {
    this.confirmationService.confirm({
        message: this.title_confirm_record,
        header: this.title_confirm,
        icon: 'pi pi-exclamation-triangle',
        accept: () => {

          this.projectDetailService.projobsub_record(this.selectedProject.project_code, this.projobsub_list).then((res) => {       
            let result = JSON.parse(res);  
            if(result.success){  
              
              this.messageService.add({severity:'success', summary: 'Success', detail: "Record Success.."});
              
              var jobcontract = this.projobsubcontract_record()
              var jobcost = this.projobsubcost_record()
              // var jobmachine = this.projobmachine_record()

              // this.displayManage = false

              setTimeout(() => {                      
                this.doLoadProjobsubcontract() 
                this.doLoadProjobsubcost()
              }, 200);

            }
            else{  
              this.messageService.add({severity:'error', summary: 'Error', detail: "Record Not Success.."});   
            }  
          })
        },
        reject: () => {
          this.messageService.add({severity:'warn', summary:'Cancelled', detail:this.title_confirm_cancel});
        }
    });
  }

  displayUpload: boolean = false;
  showUpload() {
    this.displayUpload = true;
  }

  clearManage(){
    this.new_procontact = false; this.edit_procontact = false;
    this.new_proresponsible = false; this.edit_proresponsible = false;
    this.new_procontract = false; this.edit_procontract = false;
    this.new_projobcost = false; this.edit_projobcost = false;
    this.new_projobmachine = false; this.edit_projobmachine = false;
  }

  displayManage: boolean = false;
  position: string = "right";
  showManage() {    
    this.displayManage = true;

    if(this.initial_current.Language == "EN"){

      if(this.new_procontact || this.edit_procontact){
        this.manage_title = "Contact"
      }
      else if(this.new_proresponsible || this.edit_proresponsible){
        this.manage_title = "Responsible"
      }
      else if(this.new_projobcontract || this.edit_projobcontract){
        this.manage_title = "Contract"
      }
      else if(this.new_projobcost || this.edit_projobcost){
        this.manage_title = "Cost"
      }
      else if(this.new_projobmachine || this.edit_projobmachine){
        this.manage_title = "Finger print"
      }
      else if(this.new_projobsub || this.edit_projobsub){
        this.manage_title = "Job Clear"
      }
      else if(this.new_projobsubcontract || this.edit_projobsubcontract){
        this.manage_title = "Contract"
      }
      else if(this.new_projobsubcost || this.edit_projobsubcost){
        this.manage_title = "Cost"
      }

    }
    else{

      if(this.new_procontact || this.edit_procontact){
        this.manage_title = "ผู้ติดต่อ"
      }
      else if(this.new_proresponsible || this.edit_proresponsible){
        this.manage_title = "ผู้รับผิดชอบ"
      }
      else if(this.new_projobcontract || this.edit_projobcontract){
        this.manage_title = "สัญญา"
      }
      else if(this.new_projobcost || this.edit_projobcost){
        this.manage_title = "ต้นทุน"
      }
      else if(this.new_projobmachine || this.edit_projobmachine){
        this.manage_title = "เครื่องบันทึกเวลา"
      }
      else if(this.new_projobsub || this.edit_projobsub){
        this.manage_title = "งานเคลีย์"
      }
      else if(this.new_projobsubcontract || this.edit_projobsubcontract){
        this.manage_title = "สัญญา"
      }
      else if(this.new_projobsubcost || this.edit_projobsubcost){
        this.manage_title = "ต้นทุน"
      }

    }


  }

  fileToUpload: File | any = null;  
  handleFileInput(file: FileList) {
    this.fileToUpload=file.item(0);
  }
  doUploadGenaral(){
  
    this.displayUpload = false;

    const filename = "Project_" + this.datePipe.transform(new Date(), 'yyyyMMddHHmm');
    const filetype = "xls";  

    this.projectService.project_import(this.fileToUpload, filename, filetype).then((res) => {      
      let result = JSON.parse(res);  
      if(result.success){
        this.messageService.add({severity:'success', summary: 'Success', detail: result.message});
        this.doLoadProject()    
      }
      else{
      this.messageService.add({severity:'error', summary: 'Error', detail: result.message});
      }  
    });
       
  }

  proaddress_list: ProaddressModel[] = [];
  selectedProaddress: ProaddressModel = new ProaddressModel();
  doLoadProaddress(){
    this.projectDetailService.proaddress_get(this.project_code).then((res) => {      
      this.proaddress_list = res;          
      if(this.proaddress_list.length > 0){
        this.selectedProaddress = this.proaddress_list[0]
      }
    });
  }
  proaddress_record() {    
    this.selectedProaddress.proaddress_type = "1"   
    this.selectedProaddress.project_code = this.selectedProject.project_code   
    this.projectDetailService.proaddress_record(this.selectedProaddress).then((res) => {       
      let result = JSON.parse(res);  
      if(result.success){        
      }
      else{        
      }  
    });
  }

  procontact_list: ProcontactModel[] = [];
  selectedProcontact: ProcontactModel = new ProcontactModel();
  doLoadProcontact(){
    this.projectDetailService.procontact_get(this.project_code).then((res) => {      
      this.procontact_list = res;          
      if(this.procontact_list.length > 0){
        this.selectedProcontact = this.procontact_list[0]
      }
    });
  }
  onRowSelectProcontact(event: Event) {
    this.edit_procontact= true;    

    this.doLoadSelectedProcontact_initial(this.selectedProcontact.initial_code)
    this.doLoadSelectedProcontact_position(this.selectedProcontact.position_code)
    
  }
  procontact_summit() {           
    
    this.selectedProcontact.initial_code = this.selectedProcontact_initial.value
    this.selectedProcontact.position_code = this.selectedProcontact_position.value

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
    this.edit_procontact= false
    this.new_procontact= false
    this.displayManage = false
  }
  procontact_addItem(model:ProcontactModel){
    const itemNew:ProcontactModel[] = [];
    for (let i = 0; i < this.procontact_list.length; i++) {     
      if(this.procontact_list[i].procontact_ref==model.procontact_ref ){
        //-- Notting
      }   
      else{
        itemNew.push(this.procontact_list[i]);      
      }     
    }  
    //-- 9999 for delete
    if(model.procontact_ref != "9999"){
      itemNew.push(model);
    }          
    this.procontact_list = [];
    this.procontact_list = itemNew;
    this.procontact_list.sort(function(a, b) { return parseInt(a.procontact_ref) - parseInt(b.procontact_ref); })
  }
  procontact_record() {        
    if(this.procontact_list.length == 0){
      return
    }
    this.projectDetailService.procontact_record(this.selectedProject.project_code, this.procontact_list).then((res) => {       
      let result = JSON.parse(res);  
      if(result.success){        
      }
      else{        
      }  
    });
  }

  //-- Project contract
  procontract_list: ProcontractModel[] = [];
  selectedProcontract: ProcontractModel = new ProcontractModel();
  doLoadProcontract(){
    this.projectDetailService.procontract_get(this.project_code).then((res) => {      
      this.procontract_list = res;          
      if(this.procontract_list.length > 0){
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
    this.edit_procontract= false
    this.new_procontract= false
    this.displayManage = false
  }
  procontract_addItem(model:ProcontractModel){

    console.log(model.procontract_ref)

    const itemNew:ProcontractModel[] = [];
    for (let i = 0; i < this.procontract_list.length; i++) {     
      if(this.procontract_list[i].procontract_ref==model.procontract_ref ){
        //-- Notting
      }   
      else{
        itemNew.push(this.procontract_list[i]);      
      }     
    }  
    //-- 9999 for delete
    if(model.procontract_ref != "9999"){
      itemNew.push(model);
    }          
    this.procontract_list = [];
    this.procontract_list = itemNew;
    this.procontract_list.sort(function(a, b) { return parseInt(a.procontract_ref) - parseInt(b.procontract_ref); })
  }
  procontract_record() {        
    if(this.procontract_list.length == 0){
      return
    }
    this.projectDetailService.procontract_record(this.selectedProject.project_code, this.procontract_list).then((res) => {       
      let result = JSON.parse(res);  
      if(result.success){        
      }
      else{        
      }  
    });
  }

  //-- Project responsible
  proresponsible_list: ProresponsibleModel[] = [];
  selectedProresponsible: ProresponsibleModel = new ProresponsibleModel();
  doLoadProresponsible(){
    this.projectDetailService.proresponsible_get(this.project_code).then((res) => {      
      this.proresponsible_list = res;          
      if(this.proresponsible_list.length > 0){
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
    this.edit_proresponsible= false
    this.new_proresponsible= false
    this.displayManage = false
  }
  proresponsible_addItem(model:ProresponsibleModel){
    const itemNew:ProresponsibleModel[] = [];
    for (let i = 0; i < this.proresponsible_list.length; i++) {     
      if(this.proresponsible_list[i].proresponsible_ref==model.proresponsible_ref ){
        //-- Notting
      }   
      else{
        itemNew.push(this.proresponsible_list[i]);      
      }     
    }  
    //-- 9999 for delete
    if(model.proresponsible_ref != "9999"){
      itemNew.push(model);
    }          
    this.proresponsible_list = [];
    this.proresponsible_list = itemNew;
    this.proresponsible_list.sort(function(a, b) { return parseInt(a.proresponsible_ref) - parseInt(b.proresponsible_ref); })
  }
  proresponsible_record() {        
    if(this.proresponsible_list.length == 0){
      return
    }
    this.projectDetailService.proresponsible_record(this.selectedProject.project_code, this.proresponsible_list).then((res) => {       
      let result = JSON.parse(res);  
      if(result.success){        
      }
      else{        
      }  
    });
  }

  //-- Project time policy

  polot_list_cbb: RadiovalueModel[] = [];
  selectedProtimepol_ot: RadiovalueModel = new RadiovalueModel;
  doLoadPolOT(){   
    if(this.initial_current.Language == "EN"){
      var tmp = new RadiovalueModel();  
      tmp.value = "OT";
      tmp.text = "Overtime";       
      this.polot_list_cbb.push(tmp);
    }
    else{
      var tmp = new RadiovalueModel();  
      tmp.value = "OT";
      tmp.text = "ล่วงเวลา";        
      this.polot_list_cbb.push(tmp);
    }
  }
  doLoadSelectedProtimepol_ot(value:string){
    for (let i = 0; i < this.polot_list_cbb.length; i++) {   
      if(this.polot_list_cbb[i].value==value ){
        this.selectedProtimepol_ot = this.polot_list_cbb[i];
        break;         
      }                      
    }
  }

  polallw_list_cbb: RadiovalueModel[] = [];
  selectedProtimepol_allw: RadiovalueModel = new RadiovalueModel;
  doLoadPolAllw(){   
    if(this.initial_current.Language == "EN"){
      var tmp = new RadiovalueModel();  
      tmp.value = "M001";
      tmp.text = "Monthly Allw";       
      this.polallw_list_cbb.push(tmp);
    }
    else{
      var tmp = new RadiovalueModel();  
      tmp.value = "M001";
      tmp.text = "รายเดือน";        
      this.polallw_list_cbb.push(tmp);
    }
  }
  doLoadSelectedProtimepol_allw(value:string){
    for (let i = 0; i < this.polallw_list_cbb.length; i++) {   
      if(this.polallw_list_cbb[i].value==value ){
        this.selectedProtimepol_allw = this.polallw_list_cbb[i];
        break;         
      }                      
    }
  }

  poldg_list_cbb: RadiovalueModel[] = [];
  selectedProtimepol_dg: RadiovalueModel = new RadiovalueModel;
  doLoadPolDg(){   
    if(this.initial_current.Language == "EN"){
      var tmp = new RadiovalueModel();  
      tmp.value = "DG001";
      tmp.text = "Monthly DG";       
      this.poldg_list_cbb.push(tmp);
    }
    else{
      var tmp = new RadiovalueModel();  
      tmp.value = "DG001";
      tmp.text = "รายเดือน";        
      this.poldg_list_cbb.push(tmp);
    }
  }
  doLoadSelectedProtimepol_dg(value:string){
    for (let i = 0; i < this.poldg_list_cbb.length; i++) {   
      if(this.poldg_list_cbb[i].value==value ){
        this.selectedProtimepol_dg = this.poldg_list_cbb[i];
        break;         
      }                      
    }
  }

  pollv_list_cbb: RadiovalueModel[] = [];
  selectedProtimepol_lv: RadiovalueModel = new RadiovalueModel;
  doLoadPolLv(){   
    if(this.initial_current.Language == "EN"){
      var tmp = new RadiovalueModel();  
      tmp.value = "LV001";
      tmp.text = "Monthly Leave";       
      this.pollv_list_cbb.push(tmp);
    }
    else{
      var tmp = new RadiovalueModel();  
      tmp.value = "LV001";
      tmp.text = "รายเดือน";        
      this.pollv_list_cbb.push(tmp);
    }
  }
  doLoadSelectedProtimepol_lv(value:string){
    for (let i = 0; i < this.pollv_list_cbb.length; i++) {   
      if(this.pollv_list_cbb[i].value==value ){
        this.selectedProtimepol_lv = this.pollv_list_cbb[i];
        break;         
      }                      
    }
  }

  pollt_list_cbb: RadiovalueModel[] = [];
  selectedProtimepol_lt: RadiovalueModel = new RadiovalueModel;
  doLoadPolLt(){   
    if(this.initial_current.Language == "EN"){
      var tmp = new RadiovalueModel();  
      tmp.value = "LT001";
      tmp.text = "Monthly Late";       
      this.pollt_list_cbb.push(tmp);
    }
    else{
      var tmp = new RadiovalueModel();  
      tmp.value = "LT001";
      tmp.text = "รายเดือน";        
      this.pollt_list_cbb.push(tmp);
    }
  }
  doLoadSelectedProtimepol_lt(value:string){
    for (let i = 0; i < this.pollt_list_cbb.length; i++) {   
      if(this.pollt_list_cbb[i].value==value ){
        this.selectedProtimepol_lt = this.pollt_list_cbb[i];
        break;         
      }                      
    }
  }

  protimepol_list: ProtimepolModel[] = [];
  selectedProtimepol: ProtimepolModel = new ProtimepolModel();
  doLoadProtimepol(){
    this.projectDetailService.protimepol_get(this.project_code).then((res) => {      
      this.protimepol_list = res;          
      if(this.protimepol_list.length > 0){
        this.selectedProtimepol = this.protimepol_list[0]
      }
    });
  }
  onRowSelectProtimepol(event: Event) {        
  }
  protimepol_summit() {             
    
    this.selectedProtimepol.protimepol_ot = this.selectedProtimepol_ot.value
    this.selectedProtimepol.protimepol_allw = this.selectedProtimepol_allw.value
    this.selectedProtimepol.protimepol_dg = this.selectedProtimepol_dg.value
    this.selectedProtimepol.protimepol_lv = this.selectedProtimepol_lv.value
    this.selectedProtimepol.protimepol_lt = this.selectedProtimepol_lt.value
        
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
    this.edit_protimepol= false
    this.new_protimepol= false
    this.displayManage = false
  }
  protimepol_addItem(model:ProtimepolModel){
    const itemNew:ProtimepolModel[] = [];
    for (let i = 0; i < this.protimepol_list.length; i++) {     
      if(this.protimepol_list[i].protimepol_code==model.protimepol_code ){
        //-- Notting
      }   
      else{
        itemNew.push(this.protimepol_list[i]);      
      }     
    }  
    //-- 9999 for delete
    if(model.protimepol_id != 9999){
      itemNew.push(model);
    }          
    this.protimepol_list = [];
    this.protimepol_list = itemNew;
    this.protimepol_list.sort(function(a, b) { return a.protimepol_id - b.protimepol_id; })
  }
  protimepol_record() {        
    if(this.protimepol_list.length == 0){
      return
    }
    this.projectDetailService.protimepol_record(this.selectedProject.project_code, this.protimepol_list).then((res) => {       
      let result = JSON.parse(res);  
      if(result.success){        
      }
      else{        
      }  
    });
  }

  //-- Project jobmain
  projobmain_list_cbb: RadiovalueModel[] = [];
  selectedProjobmain_cbb: RadiovalueModel = new RadiovalueModel;

  projobmain_list: ProjobmainModel[] = [];
  selectedProjobmain: ProjobmainModel = new ProjobmainModel();
  doLoadProjobmain(){
    this.projectDetailService.projobmain_get(this.project_code).then((res) => {      
      this.projobmain_list = res;          
      if(this.projobmain_list.length > 0){
        //this.selectedProjobmain = this.projobmain_list[0]

        this.projobmain_list_cbb = []
        for (let i = 0; i < this.projobmain_list.length; i++) {  
          var tmp = new RadiovalueModel();  
          tmp.value = this.projobmain_list[i].projobmain_code;      
          if(this.initial_current.Language == "EN"){        
            tmp.text = this.projobmain_list[i].projobmain_name_en;        
          }
          else{
            tmp.text = this.projobmain_list[i].projobmain_name_th;      
          }
          this.projobmain_list_cbb.push(tmp);                         
        }  


      }
    });

    setTimeout(() => {
      this.projobmain_summary()
    }, 1000);
  }
  onRowSelectProjobmain(event: Event) {

    if(this.selectedProjobmain == null){
     
    }
    else{
      this.doLoadProjobcontract() 
      this.doLoadProjobcost() 
      this.doLoadProjobmachine()  

      this.menu_projobmain[1] =
      {        
          label:'Edit',
          icon:'pi pi-fw pi-pencil',
          command: (event) => {
            if(this.selectedProjobmain != null){
              this.edit_projobmain = true
              this.projobmain_loadtran()
            }            
        }              
      } 

    }
       
  }
  projobmain_summit() {           

    this.selectedProjobmain.projobmain_type = this.selectedProjobmain_type.value
    this.selectedProjobmain.projobmain_shift = this.selectedProjobmain_shift.value
    this.selectedProjobmain.projobmain_timepol = this.selectedProjobmain_timepol.value
    this.selectedProjobmain.projobmain_slip = this.selectedProjobmain_slip.value
    this.selectedProjobmain.projobmain_uniform = this.selectedProjobmain_uniform.value     
        
    this.projobmain_addItem(this.selectedProjobmain)
    this.new_projobmain = false
    this.edit_projobmain = false    
  }
  projobmain_remove() {            
    this.selectedProjobmain.projobmain_id = "9999";
    this.projobmain_addItem(this.selectedProjobmain)
    this.new_projobmain = false
    this.edit_projobmain = false
  }
  projobmain_cancel() {  
    this.edit_projobmain= false
    this.new_projobmain= false    
  }
  projobmain_addItem(model:ProjobmainModel){
    const itemNew:ProjobmainModel[] = [];
    for (let i = 0; i < this.projobmain_list.length; i++) {     
      if(this.projobmain_list[i].projobmain_code==model.projobmain_code ){
        //-- Notting
      }   
      else{
        itemNew.push(this.projobmain_list[i]);      
      }     
    }  
    //-- 9999 for delete
    if(model.projobmain_id != "9999"){
      itemNew.push(model);
    }          
    this.projobmain_list = [];
    this.projobmain_list = itemNew;
    this.projobmain_list.sort(function(a, b) { return parseInt(a.projobmain_id) - parseInt(b.projobmain_id); })
  }
  projobmain_record():boolean {        
    if(this.projobmain_list.length == 0){
      //return
    }
    this.projectDetailService.projobmain_record(this.selectedProject.project_code, this.projobmain_list).then((res) => {       
      let result = JSON.parse(res);  
      if(result.success){     
        return true   
      }
      else{  
        return false      
      }  
    })
    
    return false
  }

  doGetJobmainName(code:string) : string {    
    for (let i = 0; i < this.projobmain_list_cbb.length; i++) {   
      if(this.projobmain_list_cbb[i].value==code ){
        return this.projobmain_list_cbb[i].text       
      }                      
    }
    return ""
  }

  projobmain_loadtran(){
    
    this.doLoadSelectedProjobmain_type(this.selectedProjobmain.projobmain_type)
    this.doLoadSelectedProjobmain_shift(this.selectedProjobmain.projobmain_shift)
    this.doLoadSelectedProjobmain_timepol(this.selectedProjobmain.projobmain_timepol)
    this.doLoadSelectedProjobmain_slip(this.selectedProjobmain.projobmain_slip)
    this.doLoadSelectedProjobmain_uniform(this.selectedProjobmain.projobmain_uniform)   

    this.doLoadProjobcontract()
    this.doLoadProjobcost()
    this.doLoadProjobmachine()
    
  }


  projobtype_list: RadiovalueModel[] = [];
  selectedProjobmain_type: RadiovalueModel = new RadiovalueModel;
  doLoadPoljobtype(){   
    if(this.initial_current.Language == "EN"){
      var tmp = new RadiovalueModel();  
      tmp.value = "R";
      tmp.text = "Regular";       
      this.projobtype_list.push(tmp);
      tmp = new RadiovalueModel();  
      tmp.value = "C";
      tmp.text = "Casual work";       
      this.projobtype_list.push(tmp);
    }
    else{
      var tmp = new RadiovalueModel();  
      tmp.value = "R";
      tmp.text = "ประจำ";        
      this.projobtype_list.push(tmp);
      tmp = new RadiovalueModel();  
      tmp.value = "C";
      tmp.text = "งานจร";       
      this.projobtype_list.push(tmp);
    }
  }
  doLoadSelectedProjobmain_type(value:string){
    for (let i = 0; i < this.projobtype_list.length; i++) {   
      if(this.projobtype_list[i].value==value ){
        this.selectedProjobmain_type = this.projobtype_list[i];
        break;         
      }                      
    }
  }

  polshift_list: RadiovalueModel[] = [];
  selectedProjobmain_shift: RadiovalueModel = new RadiovalueModel;
  doLoadPolShift(){   
    if(this.initial_current.Language == "EN"){
      var tmp = new RadiovalueModel();  
      tmp.value = "SHT001";
      tmp.text = "Shift Day";       
      this.polshift_list.push(tmp);
    }
    else{
      var tmp = new RadiovalueModel();  
      tmp.value = "SHT001";
      tmp.text = "กะเช้า";        
      this.polshift_list.push(tmp);
    }
  }
  doLoadSelectedProjobmain_shift(value:string){
    for (let i = 0; i < this.polshift_list.length; i++) {   
      if(this.polshift_list[i].value==value ){
        this.selectedProjobmain_shift = this.polshift_list[i];
        break;         
      }                      
    }
  }

  poltimepol_list_cbb: RadiovalueModel[] = [];
  selectedProjobmain_timepol: RadiovalueModel = new RadiovalueModel;
  doLoadPolProtimepol(){   
    this.poltimepol_list_cbb = []   
    this.projectDetailService.protimepol_get(this.project_code).then((res) => {          
      var list: ProtimepolModel[] = [];     
      list = res;          
      if(list.length > 0){
        for (let i = 0; i < list.length; i++) {  
          var tmp = new RadiovalueModel();  
          tmp.value = list[i].protimepol_code;      
          if(this.initial_current.Language == "EN"){        
            tmp.text = list[i].protimepol_name_en;        
          }
          else{
            tmp.text = list[i].protimepol_name_th;      
          }
          this.poltimepol_list_cbb.push(tmp);                         
        }      
      }
    });
  }
  doLoadSelectedProjobmain_timepol(value:string){
    for (let i = 0; i < this.poltimepol_list_cbb.length; i++) {   
      if(this.poltimepol_list_cbb[i].value==value ){
        this.selectedProjobmain_timepol = this.poltimepol_list_cbb[i];
        break;         
      }                      
    }
  }

  polslip_list_cbb: RadiovalueModel[] = [];
  selectedProjobmain_slip: RadiovalueModel = new RadiovalueModel;
  doLoadPolProslip(){   
    this.polslip_list_cbb = []   
    this.genaralService.proslip_get().then((res) => {          
      var list: ProslipModel[] = [];     
      list = res;          
      if(list.length > 0){
        for (let i = 0; i < list.length; i++) {  
          var tmp = new RadiovalueModel();  
          tmp.value = list[i].proslip_code;      
          if(this.initial_current.Language == "EN"){        
            tmp.text = list[i].proslip_name_en;        
          }
          else{
            tmp.text = list[i].proslip_name_th;      
          }
          this.polslip_list_cbb.push(tmp);                         
        }      
      }
    });
  }
  doLoadSelectedProjobmain_slip(value:string){
    for (let i = 0; i < this.polslip_list_cbb.length; i++) {   
      if(this.polslip_list_cbb[i].value==value ){
        this.selectedProjobmain_slip = this.polslip_list_cbb[i];
        break;         
      }                      
    }
  }

  poluniform_list_cbb: RadiovalueModel[] = [];
  selectedProjobmain_uniform: RadiovalueModel = new RadiovalueModel;
  doLoadPolProuniform(){   
    this.poluniform_list_cbb = []   
    this.genaralService.prouniform_get().then((res) => {          
      var list: ProuniformModel[] = [];     
      list = res;          
      if(list.length > 0){
        for (let i = 0; i < list.length; i++) {  
          var tmp = new RadiovalueModel();  
          tmp.value = list[i].prouniform_code;      
          if(this.initial_current.Language == "EN"){        
            tmp.text = list[i].prouniform_name_en;        
          }
          else{
            tmp.text = list[i].prouniform_name_th;      
          }
          this.poluniform_list_cbb.push(tmp);                         
        }      
      }
    });
  }
  doLoadSelectedProjobmain_uniform(value:string){
    for (let i = 0; i < this.poluniform_list_cbb.length; i++) {   
      if(this.poluniform_list_cbb[i].value==value ){
        this.selectedProjobmain_uniform = this.poluniform_list_cbb[i];
        break;         
      }                      
    }
  }

  project_summary_emp: number = 0;
  project_summary_cost: number = 0;

  projobmain_summary(){
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
  doLoadPolCost(){   
    this.polcost_list_cbb = []   
    this.procostService.procost_get(this.initial_current.CompCode).then((res) => {   
      
      this.polcost_list = res;          
      if(this.polcost_list.length > 0){
        for (let i = 0; i < this.polcost_list.length; i++) {  
          var tmp = new RadiovalueModel();  
          tmp.value = this.polcost_list[i].procost_code;      
          if(this.initial_current.Language == "EN"){        
            tmp.text = this.polcost_list[i].procost_name_en               
          }
          else{
            tmp.text = this.polcost_list[i].procost_name_th      
          }

          this.costs_title[i]= tmp.text     
          this.polcost_list_cbb.push(tmp)  
          
        }      
      }
    });
  }
  doLoadSelectedProjobcost_cost(value:string){
    for (let i = 0; i < this.polcost_list_cbb.length; i++) {   
      if(this.polcost_list_cbb[i].value==value ){
        this.selectedProjobcost_cost = this.polcost_list_cbb[i];
        break;         
      }                      
    }
  }

  doGetProCostType(code:string) : string {    
    for (let i = 0; i < this.polcost_list.length; i++) {   
      if(this.polcost_list[i].procost_code==code ){
        return this.polcost_list[i].procost_type            
      }                      
    }
    return ""
  }

  doGetProCostName(code:string) : string {    
    for (let i = 0; i < this.polcost_list.length; i++) {   
      if(this.polcost_list[i].procost_code==code ){

        if(this.initial_current.Language == "TH"){
          return this.polcost_list[i].procost_name_th    
        }
        else{
          return this.polcost_list[i].procost_name_en    
        }  
      }                      
    }
    return ""
  }

  doGetProCostAuto(code:string) : boolean {    
    for (let i = 0; i < this.polcost_list.length; i++) {   
      if(this.polcost_list[i].procost_code==code ){
        return this.polcost_list[i].procost_auto 
      }                      
    }
    return false
  }

  doGetProCostItem(code:string) : string {    
    for (let i = 0; i < this.polcost_list.length; i++) {   
      if(this.polcost_list[i].procost_code==code ){
        return this.polcost_list[i].procost_itemcode 
      }                      
    }
    return ""
  }




  //-- Project job contract
  projobcontract_list: ProjobcontractModel[] = [];
  selectedProjobcontract: ProjobcontractModel = new ProjobcontractModel();
  doLoadProjobcontract(){
    this.projectDetailService.projobcontract_get(this.project_code, this.selectedProjobmain.projobmain_code).then((res) => {   
      this.projobcontract_list = res;          
      if(this.projobcontract_list.length > 0){
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
    this.edit_projobcontract= false
    this.new_projobcontract= false    
    this.displayManage = false
  }
  projobcontract_addItem(model:ProjobcontractModel){
    const itemNew:ProjobcontractModel[] = [];
    for (let i = 0; i < this.projobcontract_list.length; i++) {     
      if(this.projobcontract_list[i].projobcontract_ref==model.projobcontract_ref ){
        //-- Notting
      }   
      else{
        itemNew.push(this.projobcontract_list[i]);      
      }     
    }  
    //-- 9999 for delete
    if(model.projobcontract_id != "9999"){
      itemNew.push(model);
    }          
    this.projobcontract_list = [];
    this.projobcontract_list = itemNew;
    this.projobcontract_list.sort(function(a, b) { return parseInt(a.projobcontract_id) - parseInt(b.projobcontract_id); })
  }
  projobcontract_record():boolean {      
    
    if(this.selectedProjobmain == null){
      return false
    }
    
    if(this.projobcontract_list.length == 0){
      //return false
    }

    this.projectDetailService.projobcontract_record(this.selectedProject.project_code, this.selectedProjobmain.projobmain_code, this.projobcontract_list).then((res) => {       
      let result = JSON.parse(res);  
      if(result.success){    
        return true    
      }   
      else{
        return false
      }   
    });

    return false
  }

  //-- Project job cost
  projobcost_list: ProjobcostModel[] = [];
  selectedProjobcost: ProjobcostModel = new ProjobcostModel();
  doLoadProjobcost(){
    this.projectDetailService.projobcost_get(this.project_code, this.selectedProjobmain.projobmain_code).then((res) => {   
      this.projobcost_list = res;          
      if(this.projobcost_list.length > 0){
        this.selectedProjobcost = this.projobcost_list[0]
      }
    });
  }
  onRowSelectProjobcost(event: Event) {
     

  }
  projobcost_summit() {       
    
    console.log(this.selectedProjobcost.projobcost_id)

    this.selectedProjobcost.projobcost_code =  this.selectedProjobcost_cost.value
            
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
    this.edit_projobcost= false
    this.new_projobcost= false    
    this.displayManage = false
  }
  projobcost_addItem(model:ProjobcostModel){
    const itemNew:ProjobcostModel[] = [];
    for (let i = 0; i < this.projobcost_list.length; i++) {     
      if(this.projobcost_list[i].projobcost_id==model.projobcost_id ){
        //-- Notting
      }   
      else{

        //console.log(model.projobcost_fromdate.getTime())

        var date_tmp = new Date(this.projobcost_list[i].projobcost_todate)
        //console.log(date_tmp)

        if(this.projobcost_list[i].projobcost_code==model.projobcost_code && date_tmp.getTime() > model.projobcost_fromdate.getTime()){

          this.projobcost_list[i].projobcost_todate = new Date(model.projobcost_fromdate)
          this.projobcost_list[i].projobcost_todate.setDate( this.projobcost_list[i].projobcost_todate.getDate() - 1 );

        }

        itemNew.push(this.projobcost_list[i]);      
      }     
    }  
    //-- 9999 for delete
    if(model.projobcost_id != "9999"){
      itemNew.push(model);
    }          
    this.projobcost_list = [];
    this.projobcost_list = itemNew;
    this.projobcost_list.sort(function(a, b) { return parseInt(a.projobcost_id) - parseInt(b.projobcost_id); })
  }
  projobcost_record():boolean {     
    
    if(this.selectedProjobmain == null){
      return false
    }
          
    if(this.projobcost_list.length == 0){
      //return false
    }
    this.projectDetailService.projobcost_record(this.selectedProject.project_code, this.selectedProjobmain.projobmain_code, this.projobcost_list).then((res) => {       
      let result = JSON.parse(res);  
      if(result.success){             
        return true
      }
      else{
        return false
      }  
      
    });

    return false
  }

  projobcost_summary(){
    for (let i = 0; i < this.projobcost_list.length; i++) {

    }
  }

  //-- Project job machine
  projobmachine_list: ProjobmachineModel[] = [];
  selectedProjobmachine: ProjobmachineModel = new ProjobmachineModel();
  doLoadProjobmachine(){
    this.projectDetailService.projobmachine_get(this.project_code, this.selectedProjobmain.projobmain_code).then((res) => {   
      this.projobmachine_list = res;          
      if(this.projobmachine_list.length > 0){
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
    this.edit_projobmachine= false
    this.new_projobmachine= false    
    this.displayManage = false
  }
  projobmachine_addItem(model:ProjobmachineModel){
    const itemNew:ProjobmachineModel[] = [];
    for (let i = 0; i < this.projobmachine_list.length; i++) {     
      if(this.projobmachine_list[i].projobmachine_id==model.projobmachine_id ){
        //-- Notting
      }   
      else{

        itemNew.push(this.projobmachine_list[i]);      
      }     
    }  
    //-- 9999 for delete
    if(model.projobmachine_id != "9999"){
      itemNew.push(model);
    }          
    this.projobmachine_list = [];
    this.projobmachine_list = itemNew;
    this.projobmachine_list.sort(function(a, b) { return parseInt(a.projobmachine_id) - parseInt(b.projobmachine_id); })
  }
  projobmachine_record():boolean {     
    
    if(this.selectedProjobmain == null){
      return false
    }
          
    if(this.projobmachine_list.length == 0){
      //return false
    }
    this.projectDetailService.projobmachine_record(this.selectedProject.project_code, this.selectedProjobmain.projobmain_code, this.projobmachine_list).then((res) => {       
      let result = JSON.parse(res);  
      if(result.success){             
        return true
      }
      else{
        return false
      }  
      
    });

    return false
  }

  //-- Project job sub
  projobsub_list: ProjobsubModel[] = [];
  selectedProjobsub: ProjobsubModel = new ProjobsubModel();
  doLoadProjobsub(){
    this.projectDetailService.projobsub_get(this.project_code).then((res) => {   
      this.projobsub_list = res;   
      if(this.projobsub_list.length > 0){

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
     
    if(this.selectedProjobsub == null){
     
    }
    else{
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
    this.edit_projobsub= false
    this.new_projobsub= false    
    this.displayManage = false
  }
  projobsub_addItem(model:ProjobsubModel){
    const itemNew:ProjobsubModel[] = [];
    for (let i = 0; i < this.projobsub_list.length; i++) {     
      if(this.projobsub_list[i].projobsub_id==model.projobsub_id ){
        //-- Notting
      }   
      else{

        itemNew.push(this.projobsub_list[i]);      
      }     
    }  
    //-- 9999 for delete
    if(model.projobsub_id != "9999"){
      itemNew.push(model);
    }          
    this.projobsub_list = [];
    this.projobsub_list = itemNew;
    this.projobsub_list.sort(function(a, b) { return parseInt(a.projobsub_id) - parseInt(b.projobsub_id); })
  }
  projobsub_record():boolean {     
         
    if(this.projobsub_list.length == 0){
      //return false
    }

    this.projectDetailService.projobsub_record(this.selectedProject.project_code, this.projobsub_list).then((res) => {       
      let result = JSON.parse(res);  
      if(result.success){             
        return true
      }
      else{
        return false
      }  
      
    });

    return false
  }

  
  project_summary_clear_cost: number = 0;

  projobsub_summary(){    
    this.project_summary_clear_cost = 0
    for (let i = 0; i < this.projobsub_list.length; i++) {      
      this.project_summary_clear_cost += this.projobsub_list[i].allow_total
    }
  }

  //-- Project jobsub contract
  projobsubcontract_list: ProjobcontractModel[] = [];
  selectedProjobsubcontract: ProjobcontractModel = new ProjobcontractModel();
  doLoadProjobsubcontract(){
    this.projectDetailService.projobcontract_get(this.project_code, this.selectedProjobsub.projobsub_code).then((res) => {   
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
    this.edit_projobsubcontract= false
    this.new_projobsubcontract= false    
    this.displayManage = false
  }
  projobsubcontract_addItem(model:ProjobcontractModel){

    const itemNew:ProjobcontractModel[] = [];
    for (let i = 0; i < this.projobsubcontract_list.length; i++) {     
      if(this.projobsubcontract_list[i].projobcontract_ref==model.projobcontract_ref ){
        //-- Notting
      }   
      else{
        itemNew.push(this.projobsubcontract_list[i]);      
      }     
    }  
    //-- 9999 for delete
    if(model.projobcontract_id != "9999"){
      itemNew.push(model);
    }          
    this.projobsubcontract_list = [];
    this.projobsubcontract_list = itemNew;
    this.projobsubcontract_list.sort(function(a, b) { return parseInt(a.projobcontract_id) - parseInt(b.projobcontract_id); })
  }
  projobsubcontract_record():boolean {      
    
    if(this.selectedProjobsub == null){
      return false
    }
    
    if(this.projobsubcontract_list.length == 0){
      //return false
    }

    this.projectDetailService.projobcontract_record(this.selectedProject.project_code, this.selectedProjobsub.projobsub_code, this.projobsubcontract_list).then((res) => {       
      let result = JSON.parse(res);  
      if(result.success){    
        return true    
      }   
      else{
        return false
      }   
    });

    return false
  }

  //-- Project jobsub cost
  projobsubcost_list: ProjobcostModel[] = [];
  selectedProjobsubcost: ProjobcostModel = new ProjobcostModel();
  doLoadProjobsubcost(){
    this.projectDetailService.projobcost_get(this.project_code, this.selectedProjobsub.projobsub_code).then((res) => {   
      this.projobsubcost_list = res;          
      if(this.projobsubcost_list.length > 0){
        this.selectedProjobsubcost = this.projobsubcost_list[0]
      }
    });
  }
  onRowSelectProjobsubcost(event: Event) {
     

  }
  projobsubcost_summit() {       
    
    this.selectedProjobsubcost.projobcost_code =  this.selectedProjobcost_cost.value
            
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
    this.edit_projobsubcost= false
    this.new_projobsubcost= false    
    this.displayManage = false
  }
  projobsubcost_addItem(model:ProjobcostModel){
    const itemNew:ProjobcostModel[] = [];
    for (let i = 0; i < this.projobsubcost_list.length; i++) {     
      if(this.projobsubcost_list[i].projobcost_id==model.projobcost_id ){
        //-- Notting
      }   
      else{

        var date_tmp = new Date(this.projobsubcost_list[i].projobcost_todate)
       
        if(this.projobsubcost_list[i].projobcost_code==model.projobcost_code && date_tmp.getTime() > model.projobcost_fromdate.getTime()){

          this.projobsubcost_list[i].projobcost_todate = new Date(model.projobcost_fromdate)
          this.projobsubcost_list[i].projobcost_todate.setDate( this.projobsubcost_list[i].projobcost_todate.getDate() - 1 );

        }

        itemNew.push(this.projobsubcost_list[i]);      
      }     
    }  
    //-- 9999 for delete
    if(model.projobcost_id != "9999"){
      itemNew.push(model);
    }          
    this.projobsubcost_list = [];
    this.projobsubcost_list = itemNew;
    this.projobsubcost_list.sort(function(a, b) { return parseInt(a.projobcost_id) - parseInt(b.projobcost_id); })
  }
  projobsubcost_record():boolean {     
    
    if(this.selectedProjobsub == null){
      return false
    }
          
    if(this.projobsubcost_list.length == 0){
      //return false
    }
    this.projectDetailService.projobcost_record(this.selectedProject.project_code, this.selectedProjobsub.projobsub_code, this.projobsubcost_list).then((res) => {       
      let result = JSON.parse(res);  
      if(result.success){             
        return true
      }
      else{
        return false
      }  
      
    });

    return false
  }

  //-- Project emp
  projobemp_list: ProjobempModel[] = [];
  selectedProjobemp: ProjobempModel = new ProjobempModel();
  doLoadProjobemp(){
    this.projectDetailService.projobemp_get(this.project_code).then((res) => {   
      this.projobemp_list = res;          
      //if(this.projobemp_list.length > 0){
      //  this.selectedProjobemp = this.projobemp_list[0]
      //}
    });
  }
  onRowSelectProjobemp(event: Event) {     

  }
  projobemp_summit() {       
    
    //this.selectedProjobemp.projobemp_emp =  this.selectedProjobmain_cbb.value
    this.selectedProjobemp.project_code = this.project_code
    this.selectedProjobemp.projob_code = this.selectedProjobmain_cbb.value
            
    this.projobemp_addItem(this.selectedProjobemp)
    this.new_projobemp = false
    this.edit_projobemp= false    

    this.displayManage = false
  }
  projobemp_remove() {            
    this.selectedProjobemp.projobemp_id = "9999";
    this.projobemp_addItem(this.selectedProjobemp)
    this.new_projobemp = false
    this.edit_projobemp = false
  }
  projobemp_cancel() {  
    this.edit_projobemp= false
    this.new_projobemp= false    
    this.displayManage = false
  }
  projobemp_addItem(model:ProjobempModel){
    const itemNew:ProjobempModel[] = [];
    for (let i = 0; i < this.projobemp_list.length; i++) {     
      if(this.projobemp_list[i].projobemp_id==model.projobemp_id ){
        //-- Notting
      }   
      else{

        var date_tmp = new Date(this.projobemp_list[i].projobemp_fromdate)
       
        if(this.projobemp_list[i].projobemp_emp==model.projobemp_emp && date_tmp.getTime() == model.projobemp_fromdate.getTime()){
         
        }
        else{
          itemNew.push(this.projobemp_list[i]); 
        }             
      }     
    }  
    //-- 9999 for delete
    if(model.projobemp_id != "9999"){
      itemNew.push(model);
    }          
    this.projobemp_list = [];
    this.projobemp_list = itemNew;
    this.projobemp_list.sort(function(a, b) { return parseInt(a.projobemp_id) - parseInt(b.projobemp_id); })
  }
  projobemp_record() {  
    
    this.confirmationService.confirm({
      message: this.title_confirm_record,
      header: this.title_confirm,
      icon: 'pi pi-exclamation-triangle',
      accept: () => {

        this.selectedProjobemp.project_code = this.project_code
        this.selectedProjobemp.projob_code = this.selectedProjobmain_cbb.value
        this.selectedProjobemp.projobemp_emp = this.selectedEmployee_cbb.value
       
        this.projectDetailService.projobemp_record(this.selectedProjobemp).then((res) => {       
          let result = JSON.parse(res);  
          if(result.success){
            
            this.messageService.add({severity:'success', summary: 'Success', detail: result.message});
            this.doLoadProjobemp()

            this.new_projobemp = false
            this.edit_projobemp= false    
            this.displayManage = false
          }
          else{
            this.messageService.add({severity:'error', summary: 'Error', detail: result.message});
          }  
        });
      },
      reject: () => {
        this.messageService.add({severity:'warn', summary:'Cancelled', detail:this.title_confirm_cancel});
      }
    });
   
          
    
  }

  //-- Project working
  projobworking_list: ProjobworkingModel[] = [];
  selectedProjobworking: ProjobworkingModel = new ProjobworkingModel();
  doLoadProjobworking(){
    this.projectDetailService.projobworking_get(this.project_code, this.selectedProjobsub.projobsub_code).then((res) => {   
      this.projobworking_list = res;          
      if(this.projobworking_list.length > 0){
        this.selectedProjobworking = this.projobworking_list[0]
      }
    });
  }
  onRowSelectProjobworking(event: Event) {     

  }

  employee_list: EmployeeModel[] = [];
  doLoadEmployee(){
    this.employeeService.worker_get(this.initial_current.CompCode,"").then((res) =>{
      this.employee_list = res;
      
      if(this.employee_list.length > 0){

        this.employee_list_cbb = []

        for (let i = 0; i < this.employee_list.length; i++) {

          var tmp = new RadiovalueModel();  
          tmp.value = this.employee_list[i].worker_code;      
          if(this.initial_current.Language == "EN"){        
            tmp.text = this.employee_list[i].worker_code + ' : ' + this.employee_list[i].worker_fname_th + ' ' + this.employee_list[i].worker_lname_th               
          }
          else{
            tmp.text = this.employee_list[i].worker_code + ' : ' + this.employee_list[i].worker_fname_en + ' ' + this.employee_list[i].worker_lname_en 
          }

          this.employee_list_cbb.push(tmp)  

        }
      }

    });
  }

  employee_list_cbb: RadiovalueModel[] = [];  
  selectedEmployee_cbb: RadiovalueModel = new RadiovalueModel;

}

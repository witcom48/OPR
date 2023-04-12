import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {ConfirmationService,MegaMenuItem,MenuItem,MessageService,} from 'primeng/api';
import { CombranchModel } from 'src/app/models/system/branch';
import { ComaddressModel } from 'src/app/models/system/comaddress';
import { ComcardModel } from 'src/app/models/system/comcard';
import { AddresstypeModel } from 'src/app/models/system/policy/addresstype';
import { CardtypeModel } from 'src/app/models/system/policy/cardtype';
import { ProvinceModel } from 'src/app/models/system/policy/province';
import { EmpDetailService } from 'src/app/services/emp/worker_detail.service';
import { CombranchDetailService } from 'src/app/services/system/combranch-detail.service';
import { CombranchService } from 'src/app/services/system/combranch.service';
import { AddresstypeService } from 'src/app/services/system/policy/addresstype.service';
import { CardtypeService } from 'src/app/services/system/policy/cardtype.service';
import { ProvinceService } from 'src/app/services/system/policy/province.service';
import { AppConfig } from '../../../../config/config';
import { InitialCurrent } from '../../../../config/initial_current';
import { MTPolcodeModel } from 'src/app/models/system/mt_polcode';
import { TRPolcodeModel } from 'src/app/models/system/policy/tr_polcode';
import { PolcodeService } from 'src/app/services/system/policy/polcode.service';

interface Taxmethod {
    name_th: string;
    name_en: string;
    code: string;
}
@Component({
  selector: 'app-emp-id',
  templateUrl: './emp-id.component.html',
  styleUrls: ['./emp-id.component.scss']
})
export class EmpIDComponent implements OnInit {
    combranch_code: string = '';

    company_code: string = '';
    manage_title: string = '';


    new_data: boolean = false;


    toolbar_menu: MenuItem[] = [];
    items: MenuItem[] = [];
    items_tab: MenuItem[] = [];
//
    Combranch_list: CombranchModel[] = [];
    selectedCombranch: CombranchModel = new CombranchModel();

    edit_combranch: boolean = false;
    new_combranch: boolean = false;
//


    mtPolcode_list: MTPolcodeModel[] = [];
    selectedmtPolcode: MTPolcodeModel = new MTPolcodeModel();
    edit_mtPolcode: boolean = false;
    new_mtPolcode: boolean = false;

    //menu TRPolcode
    menu_TRPolcode: MenuItem[] = [];
    edit_TRPolcode: boolean = false;
    new_TRPolcode: boolean = false;

    displayManage: boolean = false;

    constructor(
        private combranchService: CombranchService,
        private polcodeService: PolcodeService,



        private router: Router,
        private route: ActivatedRoute,
        private messageService: MessageService,
        private confirmationService: ConfirmationService,
        private datePipe: DatePipe,
        private empdetailService: EmpDetailService,
        private combranchDetailService: CombranchDetailService,

        //service
        private cardtypeService: CardtypeService,
        private addresstypeService: AddresstypeService,
        private provinceService: ProvinceService
    ) {}

    ngOnInit(): void {
        this.route.queryParams.subscribe((params) => {
            this.combranch_code = params['combranchcode'];
            console.log(this.combranch_code);
        });

        this.doGetInitialCurrent();

        // Dropdown
        this.doLoadcardList();
        this.doLoadaddressList();
        this.doLoadprovinceList();

        setTimeout(() => {
            this.doLoadMenu();
        }, 100);

        setTimeout(() => {
            if (this.combranch_code != '') {
                this.doLoadCombranch();
            }
        }, 400);
    }

    public initial_current: InitialCurrent = new InitialCurrent();
    doGetInitialCurrent() {
        this.initial_current = JSON.parse(
            localStorage.getItem(AppConfig.SESSIONInitial) || '{}'
        );
        if (!this.initial_current) {
            this.router.navigateByUrl('');
        }
    }

    title_page: string = 'combranch';
    title_new: string = 'New';
    title_edit: string = 'Edit';
    title_delete: string = 'Delete';
    title_import: string = 'Import';
    title_export: string = 'Export';
    title_save: string = 'Save';
    title_code: string = 'Code';

    title_summit: string = 'Summit';
    title_cancel: string = 'Cancel';

    title_genaral: string = 'Genaral';

    title_fname_th: string = 'First Name (Thai)';
    title_lname_th: string = 'Last Name (Thai)';
    title_fname_en: string = 'First Name (Eng.)';
    title_lname_en: string = 'Last Name (Eng.)';
    title_initial: string = 'Initial';

    title_birthdate: string = 'Birth Date';
    title_startdate: string = 'Start Date';
    title_hrs: string = 'Hour/Day';
    title_probation: string = 'Probation';
    title_probationdate: string = 'Probation Date';
    title_probationenddate: string = 'Probation End';
    title_resignstatus: string = 'Resign Status';
    title_resigndate: string = 'Resign Date';
    title_resignreason: string = 'Resign Reason';

    title_personal: string = 'Personal';
    title_religion: string = 'Religion';
    title_blood: string = 'Blood';
    title_weight: string = 'Weight';
    title_height: string = 'Height';
    title_address: string = 'Address';
    title_card: string = 'Card';
    title_family: string = 'Family';
    title_hospital: string = 'Hospital';
    title_foreigner: string = 'Foreigner';

    title_record: string = 'Record';
    title_department: string = 'Department';
    title_position: string = 'Position';
    title_training: string = 'Training';
    title_education: string = 'Education';
    title_assessment: string = 'Assessment';
    title_criminal: string = 'Criminal Record';

    title_finance: string = 'Finance';
    title_taxmethod: string = 'Tax Method';
    title_salary: string = 'Salary';
    title_benefit: string = 'Benefit';
    title_fund: string = 'Provident Fund';
    title_reduce: string = 'Reduces';
    title_accumulate: string = 'Accumalate';

    title_tranfer: string = 'Tranfer record';

    title_modified_by: string = 'Edit by';
    title_modified_date: string = 'Edit date';
    title_search: string = 'Search';
    title_upload: string = 'Upload';

    title_page_from: string = 'Showing';
    title_page_to: string = 'to';
    title_page_total: string = 'of';
    title_page_record: string = 'entries';

    title_confirm: string = 'Are you sure?';
    title_confirm_record: string = 'Confirm to record';
    title_confirm_delete: string = 'Confirm to delete';
    title_confirm_yes: string = 'Yes';
    title_confirm_no: string = 'No';

    title_confirm_cancel: string = 'You have cancelled';

    doLoadLanguage() {
        if (this.initial_current.Language == 'TH') {
            this.title_page = 'ข้อมูลสถานที่ปฎิบัติงาน';
            this.title_new = 'เพิ่ม';
            this.title_edit = 'แก้ไข';
            this.title_delete = 'ลบ';
            this.title_import = 'นำเข้า';
            this.title_export = 'โอนออก';
            this.title_save = 'บันทึก';

            this.title_summit = 'บันทึก';
            this.title_cancel = 'ยกเลิก';

            this.title_genaral = 'ข้อมูลทั่วไป';
            this.title_code = 'รหัสพนักงาน';
            this.title_fname_th = 'ชื่อจริง (ไทย)';
            this.title_lname_th = 'นามสกุล (ไทย)';
            this.title_fname_en = 'ชื่อจริง (อังกฤษ)';
            this.title_lname_en = 'นามสกุล (อังกฤษ)';
            this.title_initial = 'คำนำหน้า';

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
            this.title_family = 'ข้อมูลครอบครัว';
            this.title_hospital = 'ข้อมูลโรงพยาบาล';
            this.title_foreigner = 'ข้อมูลพนักงานต่างด้าว';

            this.title_record = 'ข้อมูลประวัติ';
            this.title_department = 'สังกัด';
            this.title_position = 'ตำแหน่ง';
            this.title_education = 'ประวัติการศึกษา';
            this.title_training = 'ประวัติการอบรม';
            this.title_assessment = 'ประวัติการประเมิน';
            this.title_criminal = 'ประวัติการตรวจสอบอาชญากรรม';

            this.title_finance = 'การเงิน';
            this.title_taxmethod = 'การคำนวนภาษี';
            this.title_salary = 'เงินเดือน/ค่าจ้าง';
            this.title_benefit = 'สวัสดิการ';
            this.title_fund = 'กองทุนสำรองเลี้ยงชีพ';
            this.title_reduce = 'ค่าลดหย่อน';
            this.title_accumulate = 'รายได้สะสม/ภาษีสะสม';

            this.title_tranfer = 'ประวัติการโอนย้ายหน่วยงาน';

            this.title_modified_by = 'ผู้ทำรายการ';
            this.title_modified_date = 'วันที่ทำรายการ';
            this.title_search = 'ค้นหา';
            this.title_upload = 'อัพโหลด';

            this.title_page_from = 'แสดง';
            this.title_page_to = 'ถึง';
            this.title_page_total = 'จาก';
            this.title_page_record = 'รายการ';

            this.title_confirm = 'ยืนยันการทำรายการ';
            this.title_confirm_record = 'คุณต้องการบันทึกการทำรายการ';
            this.title_confirm_delete = 'คุณต้องการลบรายการ';

            this.title_confirm_yes = 'ใช่';
            this.title_confirm_no = 'ยกเลิก';
            this.title_confirm_cancel = 'คุณยกเลิกการทำรายการ';
        }
    }

    doLoadMenu() {
        //menumain
        this.toolbar_menu = [
            {
                label: 'Back',
                icon: 'pi-arrow-left',
                command: (event) => {
                    // this.router.navigateByUrl('system/Branch');
                },
            },
            {
                label: 'Save',
                icon: 'pi pi-fw pi-save',
                command: (event) => {
                    console.log('Save');
                    this.confirmRecord();
                },
            },
        ];

        //menu polcode
        this.menu_TRPolcode = [
            {
                label: 'New',
                icon: 'pi pi-fw pi-plus',
                command: (event) => {
                    this.clearManage();
                    this.new_TRPolcode = true;
                    var ref = this.TRPolcodeList.length + 100;
                    this.selectedTRPolcode = new TRPolcodeModel();
                    this.selectedTRPolcode.polcode_id = ref.toString();
                    this.showManage();
                },
            },
            {
                label: 'Edit',
                icon: 'pi pi-fw pi-pencil',
                command: (event) => {
                    this.clearManage();
                    if (this.selectedTRPolcode != null) {
                        this.edit_TRPolcode = true;
                        this.showManage();
                    }
                },
            },
            {
                label: 'Delete',
                icon: 'pi pi-fw pi-trash',
                command: (event) => {
                    if (this.selectedTRPolcode != null) {
                        this.TRPolcode_remove();
                    }
                },
            },
            {
                label: 'Import',
                icon: 'pi pi-fw pi-file-import',
                command: (event) => {},
            },
            {
                label: 'Export',
                icon: 'pi pi-fw pi-file-export',
                command: (event) => {},
            },
        ];
    }

    tabChange(e: { index: any }) {
        var index = e.index;


        this.edit_TRPolcode = false;
        this.new_TRPolcode = false;
        //

        this.displayManage = false;
    }

    position: string = 'right';
    showManage() {
        this.displayManage = true;

        if (this.initial_current.Language == 'EN') {
            if (this.new_TRPolcode || this.edit_TRPolcode) {
                this.manage_title = 'new_TRPolcode';

            }
        } else {
            if (this.new_TRPolcode || this.edit_TRPolcode) {
                this.manage_title = 'รหัส';


            }
        }
    }

    doLoadCombranch() {
        var mtPolcode_list: MTPolcodeModel[] = [];
        this.combranchService
            .combranch_get(this.combranch_code)
            .then(async (res) => {
                await res.forEach((element: MTPolcodeModel) => {});

                mtPolcode_list = await res;
                console.log(res);

                if (mtPolcode_list.length > 0) {
                    this.selectedmtPolcode = mtPolcode_list[0];

                    setTimeout(() => {
                        this.doLoadTRPolcodeList();
                    }, 300);
                }
            });
    }

    // get data dropdown

    cardList: CardtypeModel[] = [];
    doLoadcardList() {
        this.cardtypeService.cardtype_get().then((res) => {
            this.cardList = res;
        });
    }
    addressList: AddresstypeModel[] = [];
    doLoadaddressList() {
        this.addresstypeService.addresstype_get().then((res) => {
            this.addressList = res;
        });
    }
    provinceList: ProvinceModel[] = [];
    doLoadprovinceList() {
        this.provinceService.province_get().then((res) => {
            this.provinceList = res;
        });
    }



    //TRPolcode
    TRPolcodeList: TRPolcodeModel[] = [];
    selectedTRPolcode: TRPolcodeModel = new TRPolcodeModel();
    doLoadTRPolcodeList() {
        this.polcodeService
            // .polcode_get(
            //     this.initial_current.CompCode,
            //     this.company_code
            // )
            // .then(async (res) => {
            //     await res.forEach((element: TRPolcodeModel) => {});
            //     this.TRPolcodeList = await res;

            //     if (this.TRPolcodeList.length > 0) {
            //         this.selectedTRPolcode = this.TRPolcodeList[0];
            //     }
            // });
    }
    onRowSelectTRPolcode(event: Event) {}
    TRPolcode_summit() {
        this.TRPolcode_addItem(this.selectedTRPolcode);
        this.new_TRPolcode = false;
        this.edit_TRPolcode = false;
        this.displayManage = false;
    }
    TRPolcode_remove() {
        this.selectedTRPolcode.codestructure_code = '9999';
        this.TRPolcode_addItem(this.selectedTRPolcode);
        this.new_TRPolcode = false;
        this.edit_TRPolcode = false;
    }
    TRPolcode_delete() {}
    TRPolcode_cancel() {
        this.new_TRPolcode = false;
        this.edit_TRPolcode = false;
        this.displayManage = false;
    }
    TRPolcode_addItem(model: TRPolcodeModel) {
        const itemNew: TRPolcodeModel[] = [];
        for (let i = 0; i < this.TRPolcodeList.length; i++) {
            if (this.TRPolcodeList[i].polcode_id == model.polcode_id) {
                //-- Notting
            } else {
                itemNew.push(this.TRPolcodeList[i]);
            }
        }
        //-- 9999 for delete
        if (model.polcode_id != '9999') {
            itemNew.push(model);
        }
        this.TRPolcodeList = [];
        this.TRPolcodeList = itemNew;
        this.TRPolcodeList.sort(function (a, b) {
            return parseInt(a.polcode_id) - parseInt(b.polcode_id);
        });
    }
    record_TRPolcode() {
        if (this.TRPolcodeList.length == 0) {
            return;
        }
        this.polcodeService
            // .polcode_record(
            //     this.selectedmtPolcode.company_code,
            //     this.TRPolcodeList
            // )
            // .then((res) => {
            //     let result = JSON.parse(res);
            //     if (result.success) {
            //     } else {
            //     }
            // });
    }

    confirmRecord() {
        this.confirmationService.confirm({
            message: this.title_confirm_record,
            header: this.title_confirm,
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.doRecordCombranch();
            },
            reject: () => {
                this.messageService.add({
                    severity: 'warn',
                    summary: 'Cancelled',
                    detail: this.title_confirm_cancel,
                });
            },
        });
    }

    doRecordCombranch() {
        // this.combranchService
        this.polcodeService
            // .polcode_record(this.selectedmtPolcode)
            // .polcode_record(this.selectedTRPolcode)

            // .then((res) => {
            //     console.log(res);

            //     let result = JSON.parse(res);

            //     if (result.success) {
            //         //-- Transaction
            //         this.record_TRPolcode();
            //         this.doLoadCombranch();

            //         this.messageService.add({
            //             severity: 'success',
            //             summary: 'Success',
            //             detail: result.message,
            //         });
            //         this.router.navigateByUrl('system/Branch');

            //     } else {
            //         this.messageService.add({
            //             severity: 'error',
            //             summary: 'Error',
            //             detail: result.message,
            //         });
            //     }
            // });
    }

    close() {
        this.new_mtPolcode = false;
        this.selectedmtPolcode = new MTPolcodeModel();
    }

    clearManage() {


        this.new_TRPolcode = false;
        this.edit_TRPolcode = false;
    }
}

//     items: MenuItem[] = [];
//     edit_data: boolean = false;
//     new_data: boolean = false;
//     polcode_list : TRPolcodeModel[] = [];
//     selectedPolcode : TRPolcodeModel = new TRPolcodeModel();
//   //-- Label
//   public labTitle!: string;
//   public labCode!: string;
//   public labDetail!: string;
//   public labLenght!: string;
//   public labText!: string;
//   public labOrder!: string;
//   public labExample!: string;
//   public labModyfiedBy!: string;
//   public labModyfiedDate!: string;

//   public labNew!: string;
//   public labBack!: string;
//   public labLink!: string;
//   public labExport!: string;
//   public labSave!: string;

//   panelOpenState = false;

//   constructor(private polcodeService:PolcodeService
//     , private dialog: ActivatedRoute
//     , private router: Router,
//     private messageService: MessageService,
//      private confirmationService: ConfirmationService,

//     ) {
//       this.strucList = [];
//   }


//   private subs = new Subscription();

// //   public initial:Initial = new Initial();
//   public polList: MTPolcodeModel[] = [];
//   public polDetail:MTPolcodeModel = new MTPolcodeModel();

//   public initial_current:InitialCurrent = new InitialCurrent();
//   doGetInitialCurrent(){
//     this.initial_current = JSON.parse(localStorage.getItem(AppConfig.SESSIONInitial) || '{}');
//     // this.initial_current = JSON.parse(localStorage.getItem(Initial.SESSIONInitial));
//     if (this.initial_current) {
//         this.initial_current = JSON.parse(localStorage.getItem(AppConfig.SESSIONInitial) || '{}');
//     //   this.initial_current = JSON.parse(localStorage.getItem(Initial.SESSIONInitial));
//     }
//     else{
//       this.router.navigateByUrl('login');
//     }
//   }

//   getLanguage() : string {
//     return this.initial_current.Language;
//   }

//    doCheckLanguage(){
//     if(this.getLanguage() == "EN"){

//       this.labTitle = "Structure";
//       this.labCode = "Code";
//       this.labDetail = "Detail";
//       this.labLenght = "Lenght";
//       this.labText = "Text";
//       this.labOrder = "Order";
//       this.labExample = "Example";
//       this.labModyfiedBy = "Modyfied by";
//       this.labModyfiedDate = "Modyfied date";

//       this.labNew = "New";
//       this.labBack = "Back";
//       this.labLink = "Link";
//       this.labExport = "Export";
//       this.labSave = "Save";
//     }
//     else{
//       this.labTitle = "รูปแบบรหัส";
//       this.labCode = "รหัส";
//       this.labDetail = "รายละเอียด";
//       this.labLenght = "ความยาว";
//       this.labText = "ข้อความคงที่";
//       this.labOrder = "อันดับ";
//       this.labExample = "ตัวอย่าง";
//       this.labModyfiedBy = "ผู้ทำรายการ";
//       this.labModyfiedDate = "วันที่ทำรายการ";

//       this.labNew = "เพิ่ม";
//       this.labBack = "ย้อนกลับ";
//       this.labLink = "เมนู";
//       this.labExport = "โอนออก";
//       this.labSave = "บันทึก";
//     }
//    }
//    doLoadMenu(){

//     this.items = [
//       {
//         label:"เพิ่ม",
//         icon:'pi pi-fw pi-plus',
//         command: (event) => {
//         //   this.selectedMajor= new MajorModel();
//           this.new_data= true;
//           this.edit_data= false;
//         }
//       }
//       ,
//       {
//           label:"import",
//           icon:'pi pi-fw pi-file-import',
//           command: (event) => {
//             // this.showUpload()

//           }
//       }
//       ,
//       {
//           label:"export",
//           icon:'pi pi-fw pi-file-export',
//           command: (event) => {
//             // this.exportAsExcel()

//           }
//       }
//     ];
//   }
//   ngOnInit(): void {
//     this.doGetInitialCurrent();
//     this.doCheckLanguage();

//     this.polDetail = new MTPolcodeModel();
//     this.codeStrucList = [];
//     this.doLoadMenu()

//     this.doGetStrucList();
//     this.doLoadMTPolcode();
//   }

// //   ngAfterViewInit() {

// //   }

//   doPrintMessage() {
//     this.confirmationService.confirm({

//       icon: 'pi pi-exclamation-triangle',
//       accept: () => {
//         // this.doRecordCombranch()
//       },
//       reject: () => {
//         // this.messageService.add({ severity: 'warn', summary: 'Cancelled' });
//       }
//     });
//   }

//   doLoadMTPolcode(){

//     this.polList = [];

//     this.polcodeService.getMTPolcodeList(this.initial_current.CompCode, "EMP").then((response) =>{

//       let resultJSON = JSON.parse(response);

//       if(resultJSON.result == "1"){
//         this.polList = resultJSON.data;
//       }

//     });

//     setTimeout(() => {
//       if(this.polList.length > 0){
//         this.polDetail = this.polList[0];

//         this.strucList = [];
//         this.polcodeService.getTRPolcodeList(this.polDetail.polcode_id.toString()).then((response) => {

//         // this.polcodeService.getTRPolcodeList(this.polDetail.polcode_id.toString()).subscribe((response) =>{

//           let resultJSON = JSON.parse(response);

//           this.strucList = resultJSON.data;

//         });
//       }
//     }, 500);


//   }

//   public codeStrucList: CodestructureModel[] = [];

//   doGetStrucList(){

//     this.codeStrucList = [];
//     this.polcodeService.getStructureList().then((response) =>{

//       let resultJSON = JSON.parse(response);
//       if(resultJSON.result == "1"){
//         this.codeStrucList = resultJSON.data;
//       }

//     });

//   }


// //   doGetStrucDetail(strucCode:string) : string {
// //     for (let i = 0; i < this.codeStrucList.length; i++) {
// //       if(this.codeStrucList[i].codestructure_code==strucCode ){
// //         if(this.getLanguage()=="TH"){
// //           return this.codeStrucList[i].codestructure_name_th;
// //         }
// //         else{
// //           return this.codeStrucList[i].codestructure_name_en;
// //         }
// //       }
// //     }
// //   }

//   doDelete(pol_id: string) {

//     let dialogRef =this.messageService.add({ severity: 'warn', summary: 'Cancelled' });


//     ((result: any) => {
//       if(result) {

//         if(this.polDetail != null){

//           this.polcodeService.doDelete(this.polDetail).then((response) =>{
//             let resultJSON = JSON.parse(response);
//             if(resultJSON.result=="1"){
//               console.log('Success');
//               this.doLoadMTPolcode();
//             }
//             else{
//               this.doPrintMessage()
//             }
//           });

//         }
//       }

//     //   dialogRef = null;
//     });
//   }

//   doSubmit() {

//     let dialogRef =this.messageService.add({ severity: 'warn', summary: 'Cancelled' });


//     // dialogRef.afterClosed().subscribe
//     ((result: any) => {
//       if(result) {
//         this.polDetail.company_code = this.initial_current.CompCode;
//         this.polDetail.polcode_type = "EMP";

//         this.polcodeService.doManage(this.polDetail, this.strucList).then((response) =>{

//           let resultJSON = JSON.parse(response);

//           if(resultJSON.result=="1"){
//             console.log('Success');
//             this.doLoadMTPolcode();
//           }
//           else{
//             // this.doPrintMessage(resultJSON.result_text, "2")
//           }

//         });
// 	    }

//     //    dialogRef = null;
//     });
//   }



//   //-- Add structure

//   public strucList:TRPolcodeModel[];
//   public strucAdd:TRPolcodeModel = new TRPolcodeModel();

//   openAddStructure(): void {
//     this.router.navigate(["system/system-AddCodestructure"]);

//     // const dialogRef = this.dialog.open(AddCodestructureComponent, {
//     //     width: '400px',
//     //     data: {codestructure_code: this.strucAdd.codestructure_code, polcode_lenght: this.strucAdd.polcode_lenght, polcode_text: this.strucAdd.polcode_text, polcode_order: this.strucAdd.polcode_order}
//     //   });

//     // let dialogRef =this.messageService.add({ severity: 'warn', summary: 'Cancelled' });


//     // dialogRef.afterClosed().subscribe
//     ((result: any) => {

//       if(result.codestructure_code != ""){

//         this.strucAdd.index = this.strucList.length + 1;

//         this.strucAdd.codestructure_code = result.codestructure_code;
//         this.strucAdd.polcode_lenght = result.polcode_lenght;
//         this.strucAdd.polcode_text = result.polcode_text;
//         this.strucAdd.polcode_order = result.polcode_order;

//         this.doAddStructure(this.strucAdd);
//       }

//     });
//   }
//   onRowSelectAddresstype(event: any) {
//     this.edit_data= true;
//     this.new_data= true;
//   }
// //   close(){
// //     this.new_data=false
// //     this.selectedAddresstype = new AddresstypeModel()
// //   }


//   doAddStructure(strucAdd:TRPolcodeModel){

//     const strucNew:TRPolcodeModel[] = [];
//     for (let i = 0; i < this.strucList.length; i++) {

//       if(this.strucList[i].codestructure_code!=strucAdd.codestructure_code){
//         strucNew.push(this.strucList[i]);
//       }

//     }

//     //-- 9999 for delete
//     if(strucAdd.polcode_id != "9999"){
//       strucNew.push(strucAdd);
//     }

//     this.strucList = [];
//     this.strucList = strucNew;
//     this.strucList.sort(function(a, b) { return parseInt(a.polcode_id) - parseInt(b.polcode_id); })

//     // this.strucList.sort(function(a, b) { return a.polcode_id - b.polcode_id; })
//   }

//   doNewStructure(){
//     this.strucAdd = new TRPolcodeModel();

//     this.openAddStructure();
//   }

//   doEditStructure(index:number) {

//     // this.strucAdd = null;
//     this.doGetDataEditStructure(index);

//     if(this.strucAdd != null){
//       this.openAddStructure();
//     }

//   }

//   doGetDataEditStructure(index:number) {
//     this.strucAdd = new TRPolcodeModel();
//     for (let i = 0; i < this.strucList.length; i++) {
//       if(this.strucList[i].index==index ){
//         this.strucAdd = this.strucList[i];
//         break;
//       }
//     }
//   }

//   doDeleteStructure(index:number) {

//     let dialogRef =this.messageService.add({ severity: 'warn', summary: 'Cancelled' });

//     // dialogRef.afterClosed().subscribe
//     ((result: any) => {
//       if(result) {
//         this.doGetDataEditStructure(index);

//         if(this.strucAdd != null){

//           //-- 9999 for delete
//           this.strucAdd.polcode_id = "9999";

//           this.doAddStructure(this.strucAdd);
//         }
// 	    }

//     //    dialogRef = null;
//     });
//   }


// }


import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MegaMenuItem, MenuItem } from 'primeng/api';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { ConfirmationService, MessageService } from 'primeng/api';
import * as XLSX from 'xlsx';
import { AppConfig } from '../../../../config/config';
import { InitialCurrent } from '../../../../config/initial_current';
import { TRPolcodeModel } from 'src/app/models/system/policy/tr_polcode';
import { CodePolcodeService } from 'src/app/services/system/manage1/code-polcode.service';
import { CodestructureModel } from 'src/app/models/system/policy/codestructure';
import { CodestructureService } from 'src/app/services/system/manage1/codestructure.service';
import { AddCodestructureComponent } from './add-codestructure/add-codestructure.component';
import { Subscription } from 'rxjs';
import { AccessdataModel } from 'src/app/models/system/security/accessdata';

@Component({
  selector: 'app-emp-id',
  templateUrl: './emp-id.component.html',
  styleUrls: ['./emp-id.component.scss'],
})
export class EmpIDComponent implements OnInit {
  items: MenuItem[] = [];
  edit_data: boolean = false;
  new_data: boolean = false;
  home: any;
  itemslike: MenuItem[] = [];
  TRPolcode_list: TRPolcodeModel[] = [];
  selectedTRPolcode: TRPolcodeModel = new TRPolcodeModel();
  
  dialog: any;
  // strucAdd: any;
  strucList: any;
  codestructure_code!: string;
  worker_list: any;
  worker_index!: number;
  data: any;
  workerDetail: any;
  examplecode: string = "";
  getLanguage(): string {
    return this.initial_current.Language;
  }

  constructor(
    private codePolcodeService: CodePolcodeService,
    private codestructureService: CodestructureService,

    private router: Router,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private datePipe: DatePipe

  ) { }

  ngOnInit(): void {
    this.doGetInitialCurrent()
    this.doLoadLanguage()
    this.doLoadMenu()
    this.doLoadTRPolcode()
     this.doGetNewCode();

    
    setTimeout(() => {


      // Dropdown
      this.doLoadCodestructureList();
    }, 500);

    setTimeout(() => {
      if (this.codestructure_code != '') {
      } else {
        this.NewStructure(this.data);
      }
    }, 400);
  }
  initialData2: InitialCurrent = new InitialCurrent();
  accessData: AccessdataModel = new AccessdataModel();
  public initial_current: InitialCurrent = new InitialCurrent();
  doGetInitialCurrent() {
    this.initial_current = JSON.parse(localStorage.getItem(AppConfig.SESSIONInitial) || '{}');
    if (!this.initial_current) {
      this.router.navigateByUrl('login');
    }
    this.accessData = this.initialData2.dotGetPolmenu('SYS');

  }
    title_file: { [key: string]: string } = { EN: "File ", TH: "ไฟล์" }
    title_dropfile: { [key: string]: string } = { EN: "Drop files here", TH: "วางไฟล์ที่นี่" };
    title_choose: { [key: string]: string } = { EN: "Choose File", TH: "เลือกไฟล์" };
    title_nofile: { [key: string]: string } = { EN: "No file chosen", TH: "ไม่มีไฟล์ที่เลือก" };
    title_or: { [key: string]: string } = { EN: "or", TH: "หรือ" };
    title_template: { [key: string]: string } = { EN: "Template", TH: "เทมเพลต" };
  title_system: string = "System";
  title_examplecode: string = "Example code employees";
  title_manage: string = "Manage";
  title_page: string = "Structure code";
  title_new: string = "New";
  title_edit: string = "Edit";
  title_delete: string = "Delete";
  title_import: string = "Import";
  title_export: string = "Export";
  title_save: string = "Save";
  title_code: string = "Code";
  title_lenght: string = "Lenght";
  title_text: string = "Text";
  title_order: string = "Priority";



  title_name_th: string = "Description(Thai)";
  title_name_en: string = "Description(Eng)";
  title_detail: string = "Detail";
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
  title_genaral_system: string = 'Manage System';
  title_no: string = 'No';

  doLoadLanguage() {
    if (this.initial_current.Language == "TH") {
      this.title_genaral_system = 'จัดการ';
      this.title_no = 'อันดับ';

      this.title_system = "ระบบ";
      this.title_examplecode  = "ตัวอย่างรหัสพนักงาน";
      this.title_manage = "จัดการ";
      this.title_page = "รูปแบบรหัส";
      this.title_new = "เพิ่ม";
      this.title_edit = "แก้ไข";
      this.title_delete = "ลบ";
      this.title_import = "นำเข้า";
      this.title_export = "โอนออก";
      this.title_save = "บันทึก";
      this.title_code = "รหัส";
      this.title_lenght = "ความยาว";
      this.title_text = "ข้อความคงที่";
      this.title_order = "อันดับ";

      this.title_name_th = "รายละเอียด(ไทย)";
      this.title_name_en = "รายละเอียด(อังกฤษ)";
      this.title_detail = "รายละเอียด";
      this.title_modified_by = "ผู้ทำรายการ";
      this.title_modified_date = "วันที่ทำรายการ";
      this.title_search = "ค้นหา";
      this.title_upload = "อัปโหลด";

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
    this.itemslike = [{ label: this.title_genaral_system, routerLink: '/system/sys-manage' },
    { label: this.title_page, styleClass: 'activelike' }];
    this.home = { icon: 'pi pi-home', routerLink: '/' };
    this.items = [
      {
        label: this.title_new,
        icon: 'pi pi-fw pi-plus',
        command: (event) => {
           if (this.accessData.accessdata_new) {
          this.showManage()
          this.selectedTRPolcode = new TRPolcodeModel();
          this.selectedTRPolcode.codestructure_code = this.codestructureList[0].codestructure_code
          this.selectedTRPolcode.polcode_order = this.TRPolcode_list.length+1;
          this.new_data = true;
          this.edit_data = false;
         } else {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Permission denied' });
          }
        }
      }
      ,
      {

        label:this.title_template[this.initial_current.Language],
        icon: 'pi-download', 
        command: (event) => {
          window.open('assets/OPRFileImport/(OPR)Import System/(OPR)Import System Structure code.xlsx', '_blank');
        }
      }
      ,
      {
        label: this.title_import,
        icon: 'pi pi-fw pi-file-import',
        command: (event) => {
          this.showUpload()

        }
      }
      ,
      {
        label: this.title_export,
        icon: 'pi pi-fw pi-file-export',
        command: (event) => {
          this.exportAsExcel()

        }
      }
    ];
  }
  // get data dropdown
  codestructureList: CodestructureModel[] = [];
  doLoadCodestructureList() {
    this.codestructureService.codestructure_get().then((res) => {
      this.codestructureList = res;
    });
  }
  reloadPage() {
    this.doLoadTRPolcode()
  }

  doLoadTRPolcode() {
    var tmp = new TRPolcodeModel();

    this.codePolcodeService.TRPolcode_get(tmp).then((res) => {
      this.TRPolcode_list = res;
      this.examplecode = '';
      res.forEach((item:TRPolcodeModel)=>{
        if(item.codestructure_code == '1CHA'){
          this.examplecode += item.polcode_text;
        }
        if(item.codestructure_code == '2COM'){
          this.examplecode += this.initial_current.CompCode;
        }
        if(item.codestructure_code == '3BRA'){
          this.examplecode += this.initial_current.CompCode;
        }
        if(item.codestructure_code == '4EMT'){
          this.examplecode += this.initial_current.EmpType;
        }
        if(item.codestructure_code == '5YEA'){
          this.examplecode += new Date().getFullYear().toString().slice(2);
        }
        if(item.codestructure_code == '6MON'){
          this.examplecode += ("0" + (new Date().getMonth() + 1)).slice(-2)
        }
        if(item.codestructure_code == 'MAUT'){
          this.examplecode += "0".repeat(item.polcode_lenght-1)+1
        }
      })
    });
  }

  

  selectstruccode(event: any): void {
    console.log(this.selectedTRPolcode.codestructure_code)
    if(this.selectedTRPolcode.codestructure_code == '4EMT'){
      this.selectedTRPolcode.polcode_text = 'M/D';
      this.selectedTRPolcode.polcode_lenght = 1;
    }
    if(this.selectedTRPolcode.codestructure_code == '5YEA' || this.selectedTRPolcode.codestructure_code == '6MON'){
      this.selectedTRPolcode.polcode_lenght = 2;
    }
  }

  confirmRecord() {
    this.confirmationService.confirm({
      message: this.title_confirm_record,
      header: this.title_confirm,
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.doRecordTRPolcode();
        this.edit_data = false;
        this.new_data = false;
        this.displayManage = false;
      },
      reject: () => {
        this.messageService.add({ severity: 'warn', summary: 'Cancelled', detail: this.title_confirm_cancel });
      },
      key: "myDialog"
    });
  }

  onNoClick(): void {
    this.dialog.close({ codestructure_code: '' });
  }

  public codeStrucList!: CodestructureModel[];
  doGetStrucList() {
    this.codeStrucList = [];
  }

  setFormatLenght($event: { target: { value: string; }; }) {
    $event.target.value = parseFloat($event.target.value).toFixed(0);
    this.data.polcode_lenght = $event.target.value;
  }

  setFormatOrder($event: { target: { value: string; }; }) {
    $event.target.value = parseFloat($event.target.value).toFixed(0);
    this.data.polcode_order = $event.target.value;
  }

  doRecordTRPolcode() {
    this.codePolcodeService.TRPolcode_record(this.selectedTRPolcode).then((res) => {
      let result = JSON.parse(res);

      if (result.success) {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: result.message });
        this.doLoadTRPolcode();
        this.dialog.close({
          codestructure_code: this.data.codestructure_code,
          polcode_lenght: this.data.polcode_lenght,
          polcode_text: this.data.polcode_text,
          polcode_order: this.data.polcode_order
        });
        this.edit_data = false;
        this.new_data = false;
        this.displayManage = false;
      } else {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: result.message });
      }
    });
  }

  //
  confirmDeletes(data: any) {
    this.confirmationService.confirm({
      message: this.title_confirm_delete,
      header: this.title_confirm,
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.doDeleteTRPolcodes(data);
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

  doDeleteTRPolcodes(data: any) {
    this.codePolcodeService.TRPolcode_delete(data).then((res) => {
      let result = JSON.parse(res);
      if (result.success) {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: result.message,
        });
        this.doLoadTRPolcode();
        this.edit_data = false;
        this.new_data = false;
        this.displayManage = false
      } else {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: result.message,
        });
      }
    });
  }
  //
  confirmDelete() {
    this.confirmationService.confirm({
      message: this.title_confirm_delete,
      header: this.title_confirm,
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.doDeleteTRPolcode()
      },
      reject: () => {
        this.messageService.add({ severity: 'warn', summary: 'Cancelled', detail: this.title_confirm_cancel });
      }
    });
  }

  doDeleteTRPolcode() {
    this.codePolcodeService.TRPolcode_delete(this.selectedTRPolcode).then((res) => {
      // console.log(res)
      let result = JSON.parse(res);

      if (result.success) {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: result.message });
        this.doLoadTRPolcode();
        this.edit_data = false;
        this.new_data = false;
        this.displayManage = false;

      }
      else {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: result.message });
      }

    });
  }

  getStructureDetail(strucCode: string): string {
    const foundStructure = this.codestructureList.find(item => item.codestructure_code === strucCode);
    if (foundStructure) {
      return this.getLanguage() === 'TH' ? foundStructure.codestructure_name_th : foundStructure.codestructure_name_en;
    }
    return '';
  }

  close() {
    this.new_data = false
    this.selectedTRPolcode = new TRPolcodeModel()
  }
  onRowSelectTRPolcode(event: any) {
    this.edit_data = true;
    this.new_data = true;
    this.displayManage = true;
  }

  // fileToUpload: File | any = null;
  // handleFileInput(file: FileList) {
  //   this.fileToUpload = file.item(0);
  // }
  fileToUpload: File | any = null;
  selectedFileName: string = '';
  handleFileInput(file: FileList) {
    this.fileToUpload = file.item(0);
    if (this.fileToUpload) {
      this.selectedFileName = this.fileToUpload.name;
    } else {
      this.selectedFileName = this.title_nofile[this.initial_current.Language];
    }
  }

  doUploadTRPolcode() {

    if (this.fileToUpload) {
      this.confirmationService.confirm({
        message: "Confirm Upload file : " + this.fileToUpload.name,
        header: "Import File",
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
          const filename = "TRPolcode_" + this.datePipe.transform(new Date(), 'yyyyMMddHHmm');
          const filetype = "xls";

          this.codePolcodeService.TRPolcode_import(this.fileToUpload, filename, filetype).then((res) => {
            // console.log(res)
            let result = JSON.parse(res);

            if (result.success) {
              this.messageService.add({ severity: 'success', summary: 'Success', detail: result.message });
              this.doLoadTRPolcode();
              this.edit_data = false;
              this.new_data = false;
            }
            else {
              this.messageService.add({ severity: 'error', summary: 'Error', detail: result.message });
            }
          });
          this.displayUpload = false;
        },
        reject: () => {
          this.messageService.add({ severity: 'warn', summary: 'Cancelled', detail: "Not Upload" });
          this.displayUpload = false;
        }
      });
    } else {
      this.messageService.add({ severity: 'warn', summary: 'File', detail: "Please choose a file." });
    }
  }

  title_generated_code: string = "Generated Code";
  displayUpload: boolean = false;
  showUpload() {
    this.displayUpload = true;
  }
  displayManage: boolean = false;
  position: string = "right";
  showManage() {
    this.displayManage = true
  }

  @ViewChild('TABLE') table: ElementRef | any = null;

  exportAsExcel() {
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(this.table.nativeElement);//converts a DOM TABLE element to a worksheet
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    XLSX.writeFile(wb, 'Export_TRPolcode.xlsx');

  }
  @ViewChild(AddCodestructureComponent) searchEmp_popup: any;

  positionid: string = "right";
  Structure: boolean = false;
  newDateTime = new Date();
  generatedCode: string = '';
  
  doGetIndexWorker(worker_code: string) {
    for (let i = 0; i < this.worker_list.length; i++) {
      if (this.worker_list[i].worker_code == worker_code) {
        this.worker_index = i;
        break;
      }
    }
  }

  async doGetNewCode() {
    try {
      const response = await this.codePolcodeService.getNewCode(this.initial_current.CompCode, '','');
      const resultJSON = JSON.parse(response);
  
      if (resultJSON.result === "1") {
        const newCode = this.NewStructure(resultJSON.data);
        this.generatedCode = newCode;
       } else {
         this.generatedCode = "Cannot generate code";
      }
    } catch (error) {
      this.generatedCode = "ข้อมูลผิดพลาด";
    }
  }

  NewStructure(data: any): string {
    return data.codestructure_code + data.polcode_lenght + data.polcode_text + data.polcode_order;
  }
  

  strucAdd: TRPolcodeModel | null = null;
  
  doAddStructure(strucAdd: TRPolcodeModel) {
    const strucNew: TRPolcodeModel[] = this.strucList.filter((item: { codestructure_code: string; }) => item.codestructure_code !== strucAdd.codestructure_code);
    this.strucList = strucNew;
    this.strucList.sort((a: { polcode_id: number; }, b: { polcode_id: number; }) => a.polcode_id - b.polcode_id);
    this.messageService.add({
      severity: 'info',
      summary: 'Code Generated',
      detail: `Generated code: ${strucAdd.codestructure_code}`,
      key: 'genCode'
    });
  }
  
  doNewStructure() {
    this.strucAdd = new TRPolcodeModel();
    this.generatedCode = this.NewStructure(this.strucAdd);
  }
  
  doEditStructure(index: number) {
    this.strucAdd = null;
    this.doGetDataEditStructure(index);
  
    if (this.strucAdd) {
      this.generatedCode = this.NewStructure(this.strucAdd);
      
    }
  }
  
  doGetDataEditStructure(index: number) {
    this.strucAdd = this.strucList.find((item: { index: number; }) => item.index === index) || new TRPolcodeModel();
  }
  
  // Load TRPolcode data
  async doLoadTRPolcodeid() {
    try {
      var tmp = new TRPolcodeModel();

      const response = await this.codePolcodeService.TRPolcode_get(tmp);
      if (typeof response === 'string') {
        this.TRPolcode_list = JSON.parse(response);
        console.log(this.TRPolcode_list); 
      }
    } catch (error) {
      console.error("Error loading TRPolcode data:", error);
    }
  }
}

   
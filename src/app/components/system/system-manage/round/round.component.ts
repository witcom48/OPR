
import { DatePipe } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, MenuItem, MessageService, PrimeNGConfig } from 'primeng/api';
import { AppConfig } from 'src/app/config/config';
import { InitialCurrent } from 'src/app/config/initial_current';
import { RoundsModel } from 'src/app/models/system/manage/rounds';
import { TRRoundsModel } from 'src/app/models/system/manage/tr_rounds';
import { AccessdataModel } from 'src/app/models/system/security/accessdata';
import { RoundsService } from 'src/app/services/system/manage1/rounds.service';
import * as XLSX from 'xlsx';
declare var rounddecimal: any;
declare var langcalendarth: any;
declare var langcalendaren: any;

declare var reason: any;
interface Type { name: string, code: string }

@Component({
  selector: 'app-round',
  templateUrl: './round.component.html',
  styleUrls: ['./round.component.scss']
})
export class RoundComponent implements OnInit {
  langs: any = rounddecimal;
  selectlang: string = "EN";
  itemslike: MenuItem[] = [];
  home: any;
  item_list: never[] | undefined;
  constructor(
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private datePipe: DatePipe,


    private roundsService: RoundsService,
    private config: PrimeNGConfig,
    private router: Router
  ) { }
  @ViewChild('TABLE') table: ElementRef | any = null;
  new_data: boolean = false;
  edit_data: boolean = false;

  fileToUpload: File | any = null;
  displayUpload: boolean = false;

  displayaddcondition: boolean = false;
  displayeditcondition: boolean = false;

  items: MenuItem[] = [];
  itemslates: MenuItem[] = [];

  rounds_list: RoundsModel[] = [];
  rounds: RoundsModel = new RoundsModel()
  rounds_type: string = "Currency"

  conditions: TRRoundsModel = new TRRoundsModel();

  public initial_current: InitialCurrent = new InitialCurrent();
  initialData2: InitialCurrent = new InitialCurrent();
  accessData: AccessdataModel = new AccessdataModel();
  doGetInitialCurrent() {
    this.initial_current = JSON.parse(
      localStorage.getItem(AppConfig.SESSIONInitial) || '{}'
    );
    if (!this.initial_current.Token) {
      this.router.navigateByUrl('login');
    }

    this.selectlang = this.initial_current.Language;
    if (this.initial_current.Language == "TH") {
      this.config.setTranslation(langcalendarth)
    } else {
      this.config.setTranslation(langcalendaren)
    }
    this.accessData = this.initialData2.dotGetPolmenu('SYS');

  }
    title_file: { [key: string]: string } = { EN: "File ", TH: "ไฟล์" }
    title_dropfile: { [key: string]: string } = { EN: "Drop files here", TH: "วางไฟล์ที่นี่" };
    title_choose: { [key: string]: string } = { EN: "Choose File", TH: "เลือกไฟล์" };
    title_nofile: { [key: string]: string } = { EN: "No file chosen", TH: "ไม่มีไฟล์ที่เลือก" };
    title_or: { [key: string]: string } = { EN: "or", TH: "หรือ" };
    title_template: { [key: string]: string } = { EN: "Template", TH: "เทมเพลต" };
  title_payroll: string = 'Payroll';
  title_policy: string = 'Set Policy';
  title_page: string = 'Bonus';
  title_new: string = 'New';
  title_type: string = 'Type';
  title_regular: string = 'Regular';
  title_income: string = 'Income';
  title_deduct: string = 'Deduct';
  title_Workage: string = 'Workage';

  title_Item: string = 'Income ID';
  title_Rate: string = 'Rate';
  title_From: string = 'From';
  title_no: string = 'No';
  title_round: string = 'Round';
  title_edit: string = 'Edit';
  title_delete: string = 'Delete';
  title_import: string = 'Import';
  title_export: string = 'Export';
  title_save: string = 'Save';
  title_code: string = 'Code';
  title_name_th: string = 'Name (Thai)';
  title_name_en: string = 'Name (Eng.)';
  title_detail_en: string = 'Description(Eng)';
  title_detail_th: string = 'Description(Thai)';
  title_modified_by: string = 'Edit by';
  title_modified_date: string = 'Edit date';
  title_search: string = 'Search';
  title_upload: string = 'Upload';
  title_page_items: string = 'Items';
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
      this.title_payroll = 'บัญชี';
      this.title_policy = 'กำหนดนโยบาย';
      this.title_page = 'โบนัท';
      this.title_new = 'เพิ่ม';
      this.title_type = 'ประเภท';
      this.title_regular = 'รูปแบบ';
      this.title_income = 'เงินได้';
      this.title_deduct = 'เงินหัก';

      this.title_Item = 'รหัสเงินได้';
      this.title_Workage = 'อัตราตามอายุงาน';
      this.title_Rate = 'อัตรา';
      this.title_From = 'จาก';
      this.title_no = 'อันดับ';
      this.title_round = 'ปัดเศษ';
      this.title_edit = 'แก้ไข';
      this.title_delete = 'ลบ';
      this.title_import = 'นำเข้า';
      this.title_export = 'โอนออก';
      this.title_save = 'บันทึก';
      this.title_code = 'รหัส';
      this.title_name_th = 'ชื่อไทย';
      this.title_name_en = 'ชื่ออังกฤษ';
      this.title_detail_en = 'รายละเอียด อังกฤษ';
      this.title_detail_th = 'รายละเอียด ไทย';
      this.title_modified_by = 'ผู้ทำรายการ';
      this.title_modified_date = 'วันที่ทำรายการ';
      this.title_search = 'ค้นหา';
      this.title_upload = 'อัปโหลด';
      this.title_page_items = 'รายการ';
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

  ngOnInit(): void {

    this.doGetInitialCurrent();
    this.doLoadLanguage();

    this.doLoadMenu();
    this.doLoadRounds();
  }
  reloadPage() {
    this.doLoadRounds()
  }
  doLoadRounds() {
    this.rounds_list = [];
    var tmp = new RoundsModel();
    tmp.round_group = this.rounds_type;
    this.roundsService.rounds_get(tmp).then(async (res) => {
      this.rounds_list = await res;
      await res.forEach((element: RoundsModel) => {
        this.rounds.round_group = element.round_group = this.rounds_type;
      })
      this.rounds_list = await res;
    });
  }


  async doRecordRounds(data: RoundsModel) {
    await this.roundsService.rounds_record(data).then((res) => {
      // console.log(res)
      if (res.success) {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: res.message });
        this.doLoadRounds()
        this.edit_data = false;
        this.new_data = false;
        this.displayManage = false
      }
      else {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: res.message });
      }

    });
    // this.new_data = false;
    // this.edit_data = false;
    // this.displayManage = false

  }
  async doDeleteRounds(data: RoundsModel) {
    await this.roundsService.rounds_delete(data).then((res) => {
      // console.log(res)
      if (res.success) {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: res.message });
        this.doLoadRounds()
        this.edit_data = false;
        this.new_data = false;
        this.displayManage = false;
      }
      else {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: res.message });
      }

    });
    this.new_data = false;
    this.edit_data = false;
  }
  Uploadfile() {
    if (this.fileToUpload) {
      this.confirmationService.confirm({
        message: this.langs.get('confirm_upload')[this.selectlang] + this.fileToUpload.name,
        header: this.langs.get('import')[this.selectlang],
        icon: 'pi pi-exclamation-triangle',
        accept: async () => {
          await this.doUploadRounds();
        },
        reject: () => {
          this.displayUpload = false;
        }
      });
    } else {
      this.displayMessage('warn', 'File', 'Please choose a file.');
    }
  }

  async doUploadRounds() {
    const file_name = "Rounds_" + this.datePipe.transform(new Date(), 'yyyyMMddHHmm');
    const file_type = "xls";

    try {
      const result = await this.roundsService.rounds_import(this.fileToUpload, file_name, file_type);
      if (result.success) {
        this.displayMessage('success', 'Success', result.message);
        this.doLoadRounds();
        this.Savelate();
        this.conditions = new TRRoundsModel();

        this.new_data = false;
        this.edit_data = false;
      } else {
        this.displayMessage('error', 'Error', result.message);
      }
    } catch (error) {
      this.displayMessage('error', 'Error', 'Not Upload');
    } finally {
      this.displayUpload = false;
    }
  }

  displayMessage(severity: string, summary: string, detail: string) {
    this.messageService.add({ severity, summary, detail });
  }




  // handleFileInput(file: FileList) {
  //   this.fileToUpload = file.item(0);
  // }
  // fileToUpload: File | any = null;
  selectedFileName: string = '';
  handleFileInput(file: FileList) {
    this.fileToUpload = file.item(0);
    if (this.fileToUpload) {
      this.selectedFileName = this.fileToUpload.name;
    } else {
      this.selectedFileName = this.title_nofile[this.initial_current.Language];
    }
  }

  doLoadMenu() {
    this.itemslike = [{ label: this.langs.get('system')[this.selectlang], routerLink: '/system/sys-manage' }, {
      label: this.langs.get('rounds')[this.selectlang], styleClass: 'activelike'
    }];

    this.home = { icon: 'pi pi-home', routerLink: '/' };
    this.items = [
      {
        label: this.title_new,
        icon: 'pi-plus',
        command: (event) => {
          if (this.accessData.accessdata_new) {
            this.showManage()
            this.rounds = new RoundsModel();
            this.new_data = true;
            this.edit_data = false;
          } else {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Permistion' });
          }

        },
      },
      {

        label:this.title_template[this.initial_current.Language],
        icon: 'pi-download', 
        command: (event) => {
          window.open('assets/OPRFileImport/(OPR)Import System/(OPR)Import System Rounds.xlsx', '_blank');
        }
      }
      ,
      {
        label: this.title_import,
        icon: 'pi-file-import',
        command: (event) => {
          this.showUpload();
        },
      },
      {
        label: this.title_export,
        icon: 'pi-file-export',
        command: (event) => {
          this.exportAsExcel();
        },
      },
    ];
    this.itemslates = [
      {
        label: this.title_new,
        icon: 'pi-plus',
        command: (event) => {
          this.conditions = new TRRoundsModel();
          this.displayaddcondition = true;
          this.displayeditcondition = false;
        },
      },
    ];
  }


  showUpload() {
    this.displayUpload = true;
  }




  close() {
    this.new_data = false;
    this.edit_data = false;
    this.rounds = new RoundsModel();
    this.displayaddcondition = false;
    this.displayeditcondition = false;
    this.conditions = new TRRoundsModel();
  }
  closedispaly() {
    this.displayaddcondition = false;
    this.displayeditcondition = false;
    this.conditions = new TRRoundsModel();
  }
  changeParentCount(val: string) {
    // console.log(val)
  }

  Save() {
    this.doRecordRounds(this.rounds);
  }
  Savelate() {
    if (this.displayaddcondition) {
      this.rounds.round_data =
        this.rounds.round_data.concat({
          round_id: this.rounds.round_id,
          round_from: this.conditions.round_from,
          round_to: this.conditions.round_to,
          round_result: this.conditions.round_result,
        });
    }
    this.displayaddcondition = false;
    this.displayeditcondition = false;
    this.conditions = new TRRoundsModel();
  }
  Delete() {
    this.doDeleteRounds(this.rounds);
  }
  Deletelate() {
    this.rounds.round_data = this.rounds.round_data.filter((item) => {
      return item !== this.conditions;
    });

    this.displayaddcondition = false;
    this.displayeditcondition = false;
    this.conditions = new TRRoundsModel();
  }

  onRowSelectList(event: any) {
    this.displayaddcondition = true;
    this.displayeditcondition = true;
    // console.log(this.conditions);
  }
  onRowSelect(event: any) {
    this.new_data = true;
    this.edit_data = true;
    this.displayManage = true;

  }
  displayManage: boolean = false;
  position: string = "right";
  showManage() {
    this.displayManage = true
  }


  selectRoundstype() {
    this.doLoadRounds();
  }

  exportAsExcel() {
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(this.table.nativeElement);//converts a DOM TABLE element to a worksheet
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    XLSX.writeFile(wb, 'Export_Addresstype.xlsx');

  }


}

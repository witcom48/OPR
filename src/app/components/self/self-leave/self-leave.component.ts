import { DatePipe } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { timeStamp } from 'console';
import { ConfirmationService, MegaMenuItem, MenuItem, MessageService, TreeNode } from 'primeng/api';
import { AppConfig } from 'src/app/config/config';
import { InitialCurrent } from 'src/app/config/initial_current';
import { cls_TRleave } from 'src/app/models/attendance/cls_TRleave';
import { AccountModel } from 'src/app/models/self/account';
import { cls_MTReqdocumentModel } from 'src/app/models/self/cls_MTReqdocument';
import { cls_TRTimeleaveModel } from 'src/app/models/self/cls_TRTimeleave';
import { TRAccountModel } from 'src/app/models/self/traccount';
import { ReasonsModel } from 'src/app/models/system/policy/reasons';
import { TRLeaveaccServices } from 'src/app/services/attendance/trleaveacc.service';
import { AccountServices } from 'src/app/services/self/account.service';
import { ApproveServices } from 'src/app/services/self/approve.service';
import { TimeleaveServices } from 'src/app/services/self/timeleave.service';
import { ReasonsService } from 'src/app/services/system/policy/reasons.service';
import * as XLSX from 'xlsx';
declare var reqleave: any;
interface Status { name: string, code: number }
@Component({
  selector: 'app-self-leave',
  templateUrl: './self-leave.component.html',
  styleUrls: ['./self-leave.component.scss']
})
export class SelfLeaveComponent implements OnInit {
  @ViewChild('fileUploader') fileUploader: ElementRef | any = null;
  langs: any = reqleave;
  selectlang: string = "EN";
  leavetypedis: string = "leave_name_en"
  reasonedis: string = "reason_name_en"
  namedis: string = "worker_detail_en"
  day: number = 0;
  hour: number = 0;
  time_half: string = "00:00"
  leavetype: string = "F";
  constructor(private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private datePipe: DatePipe,
    private trleaveaccService: TRLeaveaccServices,
    private timeleaveService: TimeleaveServices,
    private reasonService: ReasonsService,
    private accountServie: AccountServices,
    private approveservice: ApproveServices,
    private router: Router,
  ) { }
  dayleave: string = "1 2 3 ";
  itemsapprove: MenuItem[] = [];
  mainMenuItems: MenuItem[] = [];
  homeIcon: any = { icon: 'pi pi-home', routerLink: '/' };
  edit_data: boolean = false
  displayManage: boolean = false;
  Uploadfile: boolean = false;
  fileToUpload: File | any = null;
  position: string = "right";
  items: MenuItem[] = [];
  items_attfile: MenuItem[] = [];
  items_accumalate: MenuItem[] = [];
  selectedleave_type: cls_TRleave = new cls_TRleave();
  leaveacc_list: cls_TRleave[] = [];
  selectedLeaveacc: cls_TRleave = new cls_TRleave();
  reason_list: ReasonsModel[] = [];
  reasonselected: ReasonsModel = new ReasonsModel();
  trtimeleave_list: cls_TRTimeleaveModel[] = [];
  selectedtrtimeleave: cls_TRTimeleaveModel = new cls_TRTimeleaveModel();
  selectedreqdoc: cls_MTReqdocumentModel = new cls_MTReqdocumentModel();
  account_list: TRAccountModel[] = [];
  selectedAccount: TRAccountModel = new TRAccountModel();
  start_date: Date = new Date();
  end_date: Date = new Date();
  status_list: Status[] = [{ name: this.langs.get('wait')[this.selectlang], code: 0 }, { name: this.langs.get('finish')[this.selectlang], code: 3 }, { name: this.langs.get('reject')[this.selectlang], code: 4 }];
  status_select: Status = { name: this.langs.get('wait')[this.selectlang], code: 0 }
  public initial_current: InitialCurrent = new InitialCurrent();
  doGetInitialCurrent() {
    this.initial_current = JSON.parse(localStorage.getItem(AppConfig.SESSIONInitial) || '{}');
    if (!this.initial_current.Token) {
      this.router.navigateByUrl('login');
    }
    this.start_date = new Date(`${this.initial_current.PR_Year}-01-01`);
    this.end_date = new Date(`${this.initial_current.PR_Year}-12-31`);
    this.selectlang = this.initial_current.Language;
    if (this.initial_current.Language == "TH") {
      this.leavetypedis = "leave_name_th"
      this.reasonedis = "reason_name_th"
      this.namedis = "worker_detail_th"
    }
    if (this.initial_current.Usertype == "GRP") {
      this.doLoadAccount();
    } else {
      this.doLoadTimeleave();
      this.doLoadLeaveacc();
    }
    this.status_list = [{ name: this.langs.get('wait')[this.selectlang], code: 0 }, { name: this.langs.get('finish')[this.selectlang], code: 3 }, { name: this.langs.get('reject')[this.selectlang], code: 4 }, { name: this.selectlang == "EN" ? "All" : "ทั้งหมด", code: 1 }];
  }
  ngOnInit(): void {
    // console.log(this.datePipe.transform(new Date(0, 0, 0, 3, 0), 'HH:mm'))
    this.doGetInitialCurrent()
    this.doLoadMenu();
    this.doLoadReason();
  }
  doLoadStatusApprove(doc: string) {
    // this.itemsapprove = [];
    let datas: { label: any; styleClass?: string; }[] = [];
    this.approveservice.getDocApproveStatus("", this.initial_current.Username, 'LEA', doc).then(async (res) => {
      for (let i = 0; i < res.data.length; i++) {
        console.log(res.data[i].name_th)
        if (res.doccount >= i + 1) {
          datas.push(
            {
              label: this.selectlang == "TH" ? res.data[i].name_th : res.data[i].name_en,
              styleClass: 'activelike'
            },
          )
        } else {
          datas.push(
            {
              label: this.selectlang == "TH" ? res.data[i].name_th : res.data[i].name_en,
            },
          )
        }
      }
      this.itemsapprove = datas;
    });
  }
  Search() {
    this.doLoadTimeleave();
    if (this.initial_current.Usertype == "GRP") {
      this.doLoadLeaveacc();
    }
  }
  doLoadAccount() {
    var tmp = new AccountModel();
    tmp.account_user = this.initial_current.Username;
    tmp.account_type = this.initial_current.Usertype;
    this.accountServie.account_get(tmp).then(async (res) => {
      res[0].worker_data.forEach((obj: TRAccountModel) => {
        obj.worker_detail_en = obj.worker_code + " : " + obj.worker_detail_en;
        obj.worker_detail_th = obj.worker_code + " : " + obj.worker_detail_th;
      });
      this.account_list = await res[0].worker_data;
      this.selectedAccount = res[0].worker_data[0];
      this.doLoadTimeleave();
      this.doLoadLeaveacc();
    });
  }
  doLoadTimeleave() {
    this.trtimeleave_list = [];
    var tmp = new cls_TRTimeleaveModel();
    tmp.timeleave_fromdate = this.start_date;
    tmp.timeleave_todate = this.end_date;
    tmp.company_code = this.initial_current.CompCode;
    tmp.worker_code = this.selectedAccount.worker_code || this.initial_current.Username;
    tmp.status = this.status_select.code;
    this.timeleaveService.timeleave_get(tmp).then(async (res) => {
      if (res) {
        res.forEach((elm: any) => {
          elm.timeleave_fromdate = new Date(elm.timeleave_fromdate)
          elm.timeleave_todate = new Date(elm.timeleave_todate)
          elm.timeleave_fromdate_show = this.datePipe.transform(elm.timeleave_fromdate, 'dd/MM/yyyy')
          elm.timeleave_todate_show = this.datePipe.transform(elm.timeleave_todate, 'dd/MM/yyyy')
          elm.reson_show = this.selectlang == 'TH' ? elm.reason_th : elm.reason_en;
          elm.timeleave_type_show = this.getFulltyupeLeave(elm.timeleave_type)
          elm.timeleave_status_show = this.getFullStatus(elm.status)
          elm.worker_detail_show = this.selectlang == 'TH' ? elm.leave_detail_th : elm.leave_detail_en;
          elm.modified_date_show = this.datePipe.transform(elm.modified_date, 'dd/MM/yyyy')
        });
      }
      console.log(res)
      this.trtimeleave_list = await res
    });

  }
  doLoadLeaveacc() {
    this.leaveacc_list = [];
    var tmp = new cls_TRleave();
    tmp.worker_code = this.selectedAccount.worker_code || this.initial_current.Username;
    this.trleaveaccService.leaveacc_get(tmp).then(async (res) => {
      this.leaveacc_list = await res
    });
  }
  doLoadLeaveactualday() {
    if (this.selectedtrtimeleave.timeleave_fromdate > this.selectedtrtimeleave.timeleave_todate) {
      this.selectedtrtimeleave.timeleave_todate = this.selectedtrtimeleave.timeleave_fromdate;
    }
    if (this.leavetype == "H") {
      this.selectedtrtimeleave.timeleave_todate = this.selectedtrtimeleave.timeleave_fromdate;
    }
    let data = new cls_TRTimeleaveModel()
    data.worker_code = this.selectedtrtimeleave.worker_code;
    data.timeleave_fromdate = this.selectedtrtimeleave.timeleave_fromdate
    data.timeleave_todate = this.selectedtrtimeleave.timeleave_todate
    this.timeleaveService.timeleaveactualday_get(data).then(async (res) => {
      this.selectedtrtimeleave.timeleave_actualday = await res.data;
      this.dayleave = res.dayall;
    });
  }
  doLoadReason() {
    this.reason_list = [];
    let data = new ReasonsModel()
    data.reason_group = "LEAVE"
    this.reasonService.reason_get(data).then(async (res) => {
      // console.log(res)
      this.reason_list = await res;
    });
  }
  async doRecordTimeleave(data: cls_TRTimeleaveModel[]) {
    console.log(data);
    await this.timeleaveService.timeleave_record(data).then((res) => {
      if (res.success) {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: res.message });
        this.doLoadTimeleave();
        this.doLoadLeaveacc();
      }
      else {
        if (res.result == "3") {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: this.selectlang == 'TH' ? 'มีวันลาซ้ำที่เคยขอไปแล้ว' : 'There are repeat days of leave that have already been requested.' });
        } else {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: res.message });
        }
      }

    });
    this.leavetype = "F"
    this.closeManage()
  }
  async doDeleteTimeleave(data: cls_TRTimeleaveModel) {
    await this.timeleaveService.timeleave_delete(data).then((res) => {
      if (res.success) {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: res.message });
        this.doLoadTimeleave();
        this.doLoadLeaveacc();
      }
      else {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: res.message });
      }

    });
    this.closeManage()
  }
  doUploadFile() {
    const filename = "LEAVE_DOC" + this.datePipe.transform(new Date(), 'yyyyMMddHHmmss');
    const filetype = this.fileToUpload.name.split(".")[1];
    this.timeleaveService.file_import(this.fileToUpload, filename, filetype).then((res) => {
      // console.log(res)
      if (res.success) {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: res.message });
        this.selectedtrtimeleave.reqdoc_data = this.selectedtrtimeleave.reqdoc_data.concat({
          company_code: this.selectedtrtimeleave.company_code || this.initial_current.CompCode,
          document_id: 0,
          job_id: this.selectedtrtimeleave.timeleave_id.toString(),
          job_type: 'LEA',
          document_name: filename + "." + filetype,
          document_type: this.fileToUpload.type,
          document_path: res.message,
          created_by: this.initial_current.Username,
          created_date: new Date().toISOString()
        })
        this.Uploadfile = false;
      }
      else {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: res.message });
      }
      this.fileToUpload = null;
    });
  }
  async doGetfileTimeleave(file_path: string, type: string) {
    this.timeleaveService.get_file(file_path).then((res) => {
      var url = window.URL.createObjectURL(new Blob([new Uint8Array(res)], { type: type }));
      window.open(url);
      this.selectedreqdoc = new cls_MTReqdocumentModel();
    })
  }
  doLoadMenu() {
    this.mainMenuItems = [{ label: this.langs.get('employee')[this.selectlang], routerLink: '/self/employee' },
    { label: this.langs.get('title_leave')[this.selectlang], routerLink: '/self/req_leave', styleClass: 'activelike' }]
    this.items = [

      {
        label: this.langs.get('new')[this.selectlang],
        icon: 'pi pi-fw pi-plus',
        command: (event) => {
          this.doLoadStatusApprove("");
          this.leavetype = "F"
          this.selectedtrtimeleave = new cls_TRTimeleaveModel();
          this.selectedleave_type = this.leaveacc_list[0]
          this.reasonselected = this.reason_list[0]
          this.selectedtrtimeleave.leave_code = this.leaveacc_list[0].leave_code
          this.selectedtrtimeleave.reason_code = this.reason_list[0].reason_code
          this.time_half = "00:00"
          this.selectLeaveType();
          this.doLoadLeaveactualday();
          this.showManage();
          if (this.initial_current.Usertype == "GRP") {
            this.selectedtrtimeleave.worker_code = this.selectedAccount.worker_code;
          }
        }

      },
      // {
      //   label: 'Edit',
      //   icon: 'pi pi-fw pi-pencil',
      //   command: (event) => {
      //     // console.log('Edit')
      //   }
      // },
      // {
      //   label: 'Delete',
      //   icon: 'pi pi-fw pi-trash',
      // },
      // {
      //   label: this.langs.get('import')[this.selectlang],
      //   icon: 'pi pi-fw pi-file-import',
      // }
      // ,
      {
        label: this.langs.get('export')[this.selectlang],
        icon: 'pi pi-fw pi-file-export',
        command: (event) => {
          this.exportAsExcelMain();
        }
      }

    ];

    this.items_attfile = [

      {
        label: this.langs.get('new')[this.selectlang],
        icon: 'pi pi-fw pi-plus',
        command: (event) => {
          this.Uploadfile = true;
        }
      },
      // {
      //   label: 'เพิ่มไฟล์แนบ',
      //   icon: 'pi pi-fw pi-plus',
      //   command: (event) => {
      //     // console.log('Edit')
      //   }
      // },
      // {
      //   label: 'ลบ',
      //   icon: 'pi pi-fw pi-trash',
      // }


    ];

    this.items_accumalate = [

      {
        label: this.langs.get('export')[this.selectlang],
        icon: 'pi pi-fw pi-file-export',
        command: (event) => {
          this.exportAsExcel();
        }
      },


    ];

  }
  DeleteFile(data: cls_MTReqdocumentModel) {
    this.confirmationService.confirm({
      message: this.langs.get('confirm_delete')[this.selectlang] + data.document_name,
      header: this.langs.get('delete')[this.selectlang],
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        // console.log(data)
        if (data.document_id) {
          this.timeleaveService.delete_file(data).then((res) => {
            if (res.success) {
              this.messageService.add({ severity: 'success', summary: 'Success', detail: res.message });
            } else {
              this.messageService.add({ severity: 'error', summary: 'Error', detail: res.message });
            }
          })
        } else {
          this.selectedtrtimeleave.reqdoc_data = this.selectedtrtimeleave.reqdoc_data.filter((item) => {
            return item !== data;
          });
        }
        this.timeleaveService.deletefilepath_file(data.document_path).then((res) => {
          if (res.success) {
            this.messageService.add({ severity: 'success', summary: 'Success', detail: res.message });
            this.selectedtrtimeleave.reqdoc_data = this.selectedtrtimeleave.reqdoc_data.filter((item) => {
              return item !== data;
            });
          } else {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: res.message });
          }
        })
      },
      reject: () => {

      }
    });
  }
  Uploadfiledoc() {
    if (this.fileToUpload) {
      this.confirmationService.confirm({
        message: this.langs.get('confirm_upload')[this.selectlang] + this.fileToUpload.name,
        header: this.langs.get('import')[this.selectlang],
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
          this.fileUploader.nativeElement.value = null;
          this.Uploadfile = false;
          this.doUploadFile();
        },
        reject: () => {
          this.Uploadfile = false;
        }
      });
    } else {
      this.messageService.add({ severity: 'warn', summary: 'File', detail: "Please choose a file." });
    }
  }
  handleFileInputholidaylist(file: FileList) {
    this.fileToUpload = file.item(0);
  }
  showManage() {
    this.displayManage = true
    this.edit_data = false;

  }
  ChangeType() {
    if (this.leavetype === "H") {
      this.selectedtrtimeleave.timeleave_type = "H1"
    } else {
      this.selectedtrtimeleave.timeleave_type = "F"
    }
  }
  closeManage() {
    this.selectedtrtimeleave = new cls_TRTimeleaveModel();
    this.displayManage = false
    this.edit_data = false;
  }

  selectLeavereason() {
    this.selectedtrtimeleave.reason_code = this.reasonselected.reason_code;
  }
  selectLeaveType() {
    this.selectedtrtimeleave.leave_code = this.selectedleave_type.leave_code;
    this.selectedtrtimeleave.timeleave_deduct = this.selectedleave_type.leave_deduct;
    this.selectedtrtimeleave.timeleave_incholiday = this.selectedleave_type.leave_incholiday;
    this.day = Math.floor(this.selectedleave_type.empleaveacc_remain)
    this.hour = (this.selectedleave_type.empleaveacc_remain - Math.floor(this.selectedleave_type.empleaveacc_remain)) * 8
  }
  onRowSelect(event: Event) {
    this.doLoadStatusApprove(this.selectedtrtimeleave.timeleave_doc)
    this.time_half = this.datePipe.transform(new Date(0, 0, 0, Math.floor(this.selectedtrtimeleave.timeleave_min / 60), Math.floor(this.selectedtrtimeleave.timeleave_min % 60)), 'HH:mm') || "00:00"
    this.leaveacc_list.forEach((obj: cls_TRleave) => {
      if (obj.leave_code == this.selectedtrtimeleave.leave_code) {
        this.selectedleave_type = obj;
      }
    })
    this.reason_list.forEach((obj: ReasonsModel) => {
      if (obj.reason_code == this.selectedtrtimeleave.reason_code) {
        this.reasonselected = obj;
      }
    })
    if (this.selectedtrtimeleave.timeleave_type === "F") {
      this.leavetype = "F"
    } else {
      this.leavetype = "H"
    }
    this.selectLeaveType()
    this.displayManage = true;
    this.edit_data = true;
  }
  onRowSelectfile(event: Event) {
    this.doGetfileTimeleave(this.selectedreqdoc.document_path, this.selectedreqdoc.document_type)
  }
  getDay(data: any) {
    return Math.floor(data) + " " + this.langs.get('day')[this.selectlang] + " " + (data - Math.floor(data)) * 8 + " " + this.langs.get('hour')[this.selectlang]
  }
  getFulltyupeLeave(code: string) {
    let day = ""
    switch (code) {
      case "F":
        day = this.langs.get('full_day')[this.selectlang]
        break;
      case "H1":
        day = `${this.langs.get('full_day')[this.selectlang]} (${this.langs.get('morning')[this.selectlang]})`
        break;
      case "H2":
        day = `${this.langs.get('full_day')[this.selectlang]} (${this.langs.get('afternoon')[this.selectlang]})`
    }
    return day;
  }
  getFullStatus(code: number) {
    let status = ""
    switch (code) {
      case 0:
        status = this.langs.get('wait')[this.selectlang];
        break;
      case 3:
        status = this.langs.get('finish')[this.selectlang];
        break;
      case 4:
        status = this.langs.get('reject')[this.selectlang];
    }
    return status;
  }
  Save() {
    this.confirmationService.confirm({
      message: this.langs.get('confirm_doc')[this.selectlang],
      header: this.langs.get('title_leave')[this.selectlang],
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        if (this.selectedtrtimeleave.timeleave_doc === "") {
          this.selectedtrtimeleave.timeleave_doc = "LEAVE_" + this.datePipe.transform(new Date(), 'yyyyMMddHHmmss');
        }
        if (this.selectedtrtimeleave.timeleave_type != "F") {
          this.selectedtrtimeleave.timeleave_todate = this.selectedtrtimeleave.timeleave_fromdate;
          var date1 = new Date(0, 0, 0, Number(this.time_half.split(":")[0]), Number(this.time_half.split(":")[1]), 0)
          var hours_minutes = date1.getHours() * 60 + date1.getMinutes();
          this.selectedtrtimeleave.timeleave_min = hours_minutes;
          // console.log(hours_minutes)
          // console.log(this.time_half)
        } else {
          this.selectedtrtimeleave.timeleave_min = (this.selectedtrtimeleave.timeleave_actualday * 480)
        }
        this.selectedtrtimeleave.timeleave_deduct = this.selectedleave_type.leave_deduct;
        this.selectedtrtimeleave.timeleave_incholiday = this.selectedleave_type.leave_incholiday;
        this.doRecordTimeleave([this.selectedtrtimeleave])
      },
      reject: () => {
      }
    });
  }
  Delete() {
    this.confirmationService.confirm({
      message: this.langs.get('confirm_delete_doc')[this.selectlang] + this.selectedtrtimeleave.timeleave_doc,
      header: this.langs.get('title_leave')[this.selectlang],
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.doDeleteTimeleave(this.selectedtrtimeleave)
      },
      reject: () => {
      }
    });
  }

  @ViewChild('TABLE') table: ElementRef | any = null;
  @ViewChild('TABLEMAIN') tablemain: ElementRef | any = null;

  exportAsExcelMain() {
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(this.tablemain.nativeElement);//converts a DOM TABLE element to a worksheet
    for (var i in ws) {
      if (i.startsWith("!") || i.charAt(1) !== "1") {
        continue;
      }
      var n = 0;
      for (var j in ws) {
        if (j.startsWith(i.charAt(0)) && j.charAt(1) !== "1" && ws[i].v !== "") {
          ws[j].v = ws[j].v.replace(ws[i].v, "")
        } else {
          n += 1;
        }

      }
    }
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    XLSX.writeFile(wb, 'Leave_' + this.initial_current.Username + '.xlsx');

  }

  exportAsExcel() {
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(this.table.nativeElement);//converts a DOM TABLE element to a worksheet
    for (var i in ws) {
      if (i.startsWith("!") || i.charAt(1) !== "1") {
        continue;
      }
      var n = 0;
      for (var j in ws) {
        if (j.startsWith(i.charAt(0)) && j.charAt(1) !== "1" && ws[i].v !== "") {
          ws[j].v = ws[j].v.replace(ws[i].v, "")
        } else {
          n += 1;
        }

      }
    }
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    XLSX.writeFile(wb, 'Leave_Acc_' + this.initial_current.Username + '.xlsx');

  }


}

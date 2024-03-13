import { DatePipe } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, MegaMenuItem, MenuItem, MessageService, PrimeNGConfig } from 'primeng/api';
import { AppConfig } from 'src/app/config/config';
import { InitialCurrent } from 'src/app/config/initial_current';
import { ApproveModel } from 'src/app/models/self/approve';
import { ApproveTotalModel } from 'src/app/models/self/approveTotal';
import { cls_MTReqdocumentModel } from 'src/app/models/self/cls_MTReqdocument';
import { cls_TRTimeotModel } from 'src/app/models/self/cls_TRTimeot';
import { SysLocationModel } from 'src/app/models/system/policy/location';
import { ReasonsModel } from 'src/app/models/system/policy/reasons';
import { ApproveServices } from 'src/app/services/self/approve.service';
import { TimeotServices } from 'src/app/services/self/timeot.service';
import { LocationService } from 'src/app/services/system/policy/location.service';
import { ReasonsService } from 'src/app/services/system/policy/reasons.service';
import * as XLSX from 'xlsx';
declare var reqot: any;
declare var langcalendarth: any;
declare var langcalendaren: any;
interface Status { name: string, code: number }
@Component({
  selector: 'app-self-approve-overtime',
  templateUrl: './self-approve-overtime.component.html',
  styleUrls: ['./self-approve-overtime.component.scss']
})
export class SelfApproveOvertimeComponent implements OnInit {
  @ViewChild('fileUploader') fileUploader: ElementRef | any = null;
  langs: any = reqot;
  selectlang: string = "EN";
  reasonedis: string = "reason_name_en"
  locatiodis: string = "location_name_en"
  displayManage: boolean = false;
  edit_data: boolean = false;
  position: string = "right";
  manage_title: string = "Manage"
  items: MenuItem[] = [];
  items_attfile: MenuItem[] = [];

  constructor(
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private datePipe: DatePipe,
    private timeotService: TimeotServices,
    private reasonService: ReasonsService,
    private approveService: ApproveServices,
    private locationService: LocationService,
    private router: Router,
    private config: PrimeNGConfig,
  ) { }
  displayrejecttype: boolean = false;
  reject_note: string = '';
  mainMenuItems: MenuItem[] = [];
  homeIcon: any = { icon: 'pi pi-home', routerLink: '/' };
  fileToUpload: File | any = null;
  Uploadfile: boolean = false;
  reason_list: ReasonsModel[] = [];
  reasonselected: ReasonsModel = new ReasonsModel();
  location_list: SysLocationModel[] = [];
  locationselected: SysLocationModel = new SysLocationModel();
  trtimeot_list: cls_TRTimeotModel[] = [];
  selectedtrtimeot: cls_TRTimeotModel = new cls_TRTimeotModel();
  selectedtrtimeotall: cls_TRTimeotModel[] = [];
  selectedreqdoc: cls_MTReqdocumentModel = new cls_MTReqdocumentModel();
  approveTotal: ApproveTotalModel[] = [];
  start_date: Date = new Date();
  end_date: Date = new Date();
  status_list: Status[] = [{ name: this.langs.get('wait')[this.selectlang], code: 0 }, { name: this.langs.get('finish')[this.selectlang], code: 3 }, { name: this.langs.get('reject')[this.selectlang], code: 4 }];
  status_select: Status = { name: this.langs.get('wait')[this.selectlang], code: 0 }
  status_doc: boolean = false
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
      this.reasonedis = "reason_name_th";
      this.locatiodis = "location_name_th"
      this.config.setTranslation(langcalendarth)

    } else {
      this.config.setTranslation(langcalendaren)
    }
    this.status_list = [{ name: this.langs.get('wait')[this.selectlang], code: 0 }, { name: this.langs.get('finish')[this.selectlang], code: 3 }, { name: this.langs.get('reject')[this.selectlang], code: 4 }, { name: this.selectlang == "EN" ? "All" : "ทั้งหมด", code: 1 }];
  }
  ngOnInit(): void {
    this.doGetInitialCurrent();
    this.doLoadMenu();
    this.doLoadTimeot();
    this.doLoadReason();
    this.doLoadLocation();
  }
  Search() {
    if (this.status_select.code) {
      this.status_doc = true;
    } else {
      this.status_doc = false;
    }
    this.doLoadTimeot();
  }
  doLoadTimeot() {
    this.trtimeot_list = [];
    let statuss = [4, 3, 0]
    if (this.status_select.code == 1) {
      statuss.forEach(async (e: number) => {
        var tmp = new ApproveModel();
        tmp.job_type = "OT"
        tmp.fromdate = this.start_date;
        tmp.todate = this.end_date;
        tmp.status = e;
        await this.approveService.approve_get(tmp).then(async (res) => {
          await res.data.forEach((elm: any) => {
            elm.timeleave_fromdate = new Date(elm.timeleave_fromdate)
            elm.timeleave_todate = new Date(elm.timeleave_todate)
            elm.worker_detail_show = this.selectlang == "TH" ? elm.worker_detail_th : elm.worker_detail_en;
            elm.timeot_workdate_show = this.datePipe.transform(elm.timeot_workdate, 'dd/MM/yyyy')
            elm.reason_name_show = this.selectlang == "TH" ? elm.reason_name_th : elm.reason_name_en;
            elm.modified_date_show = this.datePipe.transform(elm.modified_date, 'dd/MM/yyyy')
            elm.status_show = this.getFullStatus(elm.status_job)
            this.trtimeot_list.push(elm)
          });
          console.log(res.data)
          this.approveTotal = await res.total;
        });
      })
    } else {
      var tmp = new ApproveModel();
      tmp.job_type = "OT"
      tmp.fromdate = this.start_date;
      tmp.todate = this.end_date;
      tmp.status = this.status_select.code;
      this.approveService.approve_get(tmp).then(async (res) => {
        res.data.forEach((elm: any) => {
          elm.timeleave_fromdate = new Date(elm.timeleave_fromdate)
          elm.timeleave_todate = new Date(elm.timeleave_todate)
          elm.worker_detail_show = this.selectlang == "TH" ? elm.worker_detail_th : elm.worker_detail_en;
          elm.timeot_workdate_show = this.datePipe.transform(elm.timeot_workdate, 'dd/MM/yyyy')
          elm.reason_name_show = this.selectlang == "TH" ? elm.reason_name_th : elm.reason_name_en;
          elm.modified_date_show = this.datePipe.transform(elm.modified_date, 'dd/MM/yyyy')
          elm.status_show = this.getFullStatus(elm.status_job)
        });
        this.trtimeot_list = await res.data;
        this.approveTotal = await res.total;
      });
    }
  }
  getFullStatus(code: string) {
    let status = ""
    switch (code) {
      case "W":
        status = this.langs.get('wait')[this.selectlang];
        break;
      case "F":
        status = this.langs.get('finish')[this.selectlang];
        break;
      case "C":
        status = this.langs.get('reject')[this.selectlang];
    }
    return status;
  }
  doLoadReason() {
    this.reason_list = [];
    let data = new ReasonsModel()
    data.reason_group = "OT"
    this.reasonService.reason_get(data).then(async (res) => {
      this.reason_list = await res;
    });
  }
  doLoadLocation() {
    this.location_list = [];
    let data = new SysLocationModel()
    this.locationService.location_get(data).then(async (res) => {
      this.location_list = await res;
      this.initial_current.loading = false;
    });
  }
  async doRecordTimeot(data: cls_TRTimeotModel[]) {
    await this.timeotService.timeot_record(data).then((res) => {
      if (res.success) {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: res.message });
        this.doLoadTimeot();
      }
      else {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: res.message });
      }

    });
    this.closeManage()
  }
  async doDeleteTimeot(data: cls_TRTimeotModel) {
    await this.timeotService.timeot_delete(data).then((res) => {
      if (res.success) {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: res.message });
        this.doLoadTimeot();
      }
      else {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: res.message });
      }

    });
    this.closeManage()
  }
  async doGetfileTimeot(file_path: string, type: string) {
    this.timeotService.get_file(file_path).then((res) => {
      var url = window.URL.createObjectURL(new Blob([new Uint8Array(res)], { type: type }));
      window.open(url);
      this.selectedreqdoc = new cls_MTReqdocumentModel();
    })
  }
  doUploadFile() {
    const filename = "OT_DOC" + this.datePipe.transform(new Date(), 'yyyyMMddHHmmss');
    const filetype = this.fileToUpload.name.split(".")[1];
    this.timeotService.file_import(this.fileToUpload, filename, filetype).then((res) => {
      // console.log(res)
      if (res.success) {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: res.message });
        this.selectedtrtimeot.reqdoc_data = this.selectedtrtimeot.reqdoc_data.concat({
          company_code: this.selectedtrtimeot.company_code || this.initial_current.CompCode,
          document_id: 0,
          job_id: this.selectedtrtimeot.timeot_id.toString(),
          job_type: 'OT',
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
  async doApproveJob(data: ApproveModel) {
    this.initial_current.loading = true;
    data.job_type = "OT";
    data.lang = this.selectlang;
    data.reject_note = this.reject_note;
    await this.approveService.approveJob(data).then((res) => {
      if (res.result) {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: res.message });
        this.doLoadTimeot();
      }
      else {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: res.message });
      }
      this.initial_current.loading = false;
    });
    this.closeManage()
  }
  doLoadMenu() {
    this.mainMenuItems = [{ label: this.langs.get('approve')[this.selectlang], routerLink: '/self/approve' },
    { label: this.langs.get('title_ot')[this.selectlang], routerLink: '/self/approve_overtime', styleClass: 'activelike' }]
    this.items = [

      {
        label: this.langs.get('new')[this.selectlang],
        icon: 'pi pi-fw pi-plus',
        command: (event) => {
          this.selectedtrtimeot = new cls_TRTimeotModel();
          this.reasonselected = this.reason_list[0]
          this.locationselected = this.location_list[0]
          this.selectedtrtimeot.reason_code = this.reason_list[0].reason_code
          this.selectedtrtimeot.location_code = this.location_list[0].location_code
          this.showManage()
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
      // }

      // ,
      {
        label: this.langs.get('import')[this.selectlang],
        icon: 'pi pi-fw pi-file-import',
      }
      ,
      {
        label: this.langs.get('export')[this.selectlang],
        icon: 'pi pi-fw pi-file-export',
      }

    ];

    this.items_attfile = [

      {
        label: this.langs.get('export')[this.selectlang],
        icon: 'pi pi-fw pi-file-export',
        command: (event) => {
          this.exportAsExcelMain();
        }
      }
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

  }
  Uploadfiledoc() {
    if (this.fileToUpload) {
      this.confirmationService.confirm({
        message: this.langs.get('confirm_upload')[this.selectlang] + this.fileToUpload.name,
        header: this.langs.get('import')[this.selectlang],
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
          this.Uploadfile = false;
          this.doUploadFile();
          this.fileUploader.nativeElement.value = null;
        },
        reject: () => {
          this.Uploadfile = false;
        }
      });
    } else {
      this.messageService.add({ severity: 'warn', summary: 'File', detail: "Please choose a file." });
    }
  }
  DeleteFile(data: cls_MTReqdocumentModel) {
    this.confirmationService.confirm({
      message: this.langs.get('confirm_delete')[this.selectlang] + data.document_name,
      header: this.langs.get('delete')[this.selectlang],
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        if (data.document_id) {
          this.timeotService.delete_file(data).then((res) => {
            if (res.success) {
              this.messageService.add({ severity: 'success', summary: 'Success', detail: res.message });
            } else {
              this.messageService.add({ severity: 'error', summary: 'Error', detail: res.message });
            }
          })
        } else {
          this.selectedtrtimeot.reqdoc_data = this.selectedtrtimeot.reqdoc_data.filter((item) => {
            return item !== data;
          });
        }
        this.timeotService.deletefilepath_file(data.document_path).then((res) => {
          if (res.success) {
            this.messageService.add({ severity: 'success', summary: 'Success', detail: res.message });
            this.selectedtrtimeot.reqdoc_data = this.selectedtrtimeot.reqdoc_data.filter((item) => {
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
  handleFileInputholidaylist(file: FileList) {
    this.fileToUpload = file.item(0);
  }
  onRowSelectfile(event: Event) {
    this.doGetfileTimeot(this.selectedreqdoc.document_path, this.selectedreqdoc.document_type)
  }
  onRowSelect(event: Event) {
    // this.location_list.forEach((obj: LocationModel) => {
    //   if (obj.location_code == this.selectedtrtimeot.location_code) {
    //     this.locationselected = obj;
    //   }
    // })
    // this.reason_list.forEach((obj: ReasonsModel) => {
    //   if (obj.reason_code == this.selectedtrtimeot.reason_code) {
    //     this.reasonselected = obj;
    //   }
    // })
    // this.edit_data = true;
    // this.displayManage = true
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

    XLSX.writeFile(wb, 'ApproveOT_' + this.initial_current.Username + '.xlsx');

  }
  showManage() {
    this.displayManage = true
    this.edit_data = false;

  }
  selectotlocation() {
    this.selectedtrtimeot.location_code = this.locationselected.location_code;
  }
  selectotreason() {
    this.selectedtrtimeot.reason_code = this.reasonselected.reason_code;
  }

  closeManage() {
    this.selectedtrtimeot = new cls_TRTimeotModel();
    this.displayManage = false

  }

  date_from = new Date();
  date_to = new Date();

  date_half = new Date();
  time_half: string = "00:00"

  onchangeType() {

  }
  getMin(time: string) {
    if (time) {
      var date1 = new Date(0, 0, 0, Number(time.split(":")[0]), Number(time.split(":")[1]), 0)
      var hours_minutes = date1.getHours() * 60 + date1.getMinutes();
      return hours_minutes;
    } else {
      return 0
    }
  }

  Save(data: cls_TRTimeotModel) {
    if (!this.selectedtrtimeotall.length && !this.status_doc) {
      this.confirmationService.confirm({
        message: this.langs.get('conapprove')[this.selectlang],
        header: this.langs.get('condoc')[this.selectlang],
        icon: 'pi pi-check',
        accept: () => {
          let tmp = new ApproveModel();
          tmp.job_id = [data.jobtable_id];
          tmp.approve_status = "A";
          tmp.company_code = data.company_code;
          this.doApproveJob(tmp)
        },
        reject: () => {

        }
      });
    }

  }
  closedispaly() {
    this.displayrejecttype = false;
  }
  submitreject() {
    this.displayrejecttype = false;
    console.log(!this.selectedtrtimeotall.length)
    this.confirmationService.confirm({
      message: this.langs.get('connotapprove')[this.selectlang],
      header: this.langs.get('connotdoc')[this.selectlang],
      icon: 'pi pi-times',
      accept: () => {
        let tmp = new ApproveModel();
        tmp.approve_status = "C";
        if (this.selectedtrtimeotall.length > 0) {
          this.selectedtrtimeotall.forEach((data: cls_TRTimeotModel) => {
            tmp.job_id.push(data.jobtable_id)
            tmp.company_code = data.company_code;
          })
        } else {
          tmp.job_id = [this.datareject.jobtable_id];
          tmp.company_code = this.datareject.company_code;
        }
        console.log('dddddddd')
        console.log(tmp);
        this.doApproveJob(tmp)
      },
      reject: () => {

      }
    });
  }
  datareject: cls_TRTimeotModel = new cls_TRTimeotModel();
  Delete(data: cls_TRTimeotModel) {
    this.reject_note = '';
    this.datareject = new cls_TRTimeotModel;
    this.datareject = data;
    this.displayrejecttype = true;
    // if (!this.selectedtrtimeotall.length && !this.status_doc) {
    //   this.confirmationService.confirm({
    //     message: this.langs.get('connotapprove')[this.selectlang],
    //     header: this.langs.get('connotdoc')[this.selectlang],
    //     icon: 'pi pi-times',
    //     accept: () => {
    //       let tmp = new ApproveModel();
    //       tmp.job_id = [data.jobtable_id];
    //       tmp.approve_status = "C";
    //       tmp.company_code = data.company_code;
    //       this.doApproveJob(tmp)
    //     },
    //     reject: () => {

    //     }
    //   });
    // }
  }
  Saveall() {
    if (this.selectedtrtimeotall.length && !this.status_doc) {
      this.confirmationService.confirm({
        message: this.langs.get('conapprove')[this.selectlang],
        header: this.langs.get('condoc')[this.selectlang],
        icon: 'pi pi-check',
        accept: () => {
          let tmp = new ApproveModel();
          this.selectedtrtimeotall.forEach((data: cls_TRTimeotModel) => {
            tmp.job_id.push(data.jobtable_id)
            tmp.approve_status = "A";
            tmp.company_code = data.company_code;
          })
          // console.log(tmp)
          this.doApproveJob(tmp)
        },
        reject: () => {

        }
      });
    }
  }
  Deleteall() {
    this.reject_note = '';
    this.displayrejecttype = true;
    // if (this.selectedtrtimeotall.length && !this.status_doc) {
    //   this.confirmationService.confirm({
    //     message: this.langs.get('connotapprove')[this.selectlang],
    //     header: this.langs.get('connotdoc')[this.selectlang],
    //     icon: 'pi pi-times',
    //     accept: () => {
    //       let tmp = new ApproveModel();
    //       this.selectedtrtimeotall.forEach((data: cls_TRTimeotModel) => {
    //         tmp.job_id.push(data.jobtable_id)
    //         tmp.approve_status = "C";
    //         tmp.company_code = data.company_code;
    //       })
    //       // console.log(tmp)
    //       this.doApproveJob(tmp)
    //     },
    //     reject: () => {

    //     }
    //   });
    // }
  }
  viwe(data: cls_TRTimeotModel) {
    this.selectedtrtimeot = data;
    this.location_list.forEach((obj: SysLocationModel) => {
      if (obj.location_code == data.location_code) {
        this.locationselected = obj;
      }
    })
    this.reason_list.forEach((obj: ReasonsModel) => {
      if (obj.reason_code == data.reason_code) {
        this.reasonselected = obj;
      }
    })
    this.edit_data = true;
    this.displayManage = true
  }
}

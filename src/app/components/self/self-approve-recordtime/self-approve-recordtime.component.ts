import { DatePipe } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, MegaMenuItem, MenuItem, MessageService } from 'primeng/api';
import { AppConfig } from 'src/app/config/config';
import { InitialCurrent } from 'src/app/config/initial_current';
import { ApproveModel } from 'src/app/models/self/approve';
import { ApproveTotalModel } from 'src/app/models/self/approveTotal';
import { cls_MTReqdocumentModel } from 'src/app/models/self/cls_MTReqdocument';
import { cls_TRTimeonsiteModel } from 'src/app/models/self/cls_TRTimeonsite';
import { SysLocationModel } from 'src/app/models/system/policy/location';
import { ReasonsModel } from 'src/app/models/system/policy/reasons';
import { ApproveServices } from 'src/app/services/self/approve.service';
import { TimeonsiteServices } from 'src/app/services/self/timeonsite';
import { LocationService } from 'src/app/services/system/policy/location.service';
import { ReasonsService } from 'src/app/services/system/policy/reasons.service';
declare var reqonsite: any;
interface Status { name: string, code: number }
@Component({
  selector: 'app-self-approve-recordtime',
  templateUrl: './self-approve-recordtime.component.html',
  styleUrls: ['./self-approve-recordtime.component.scss']
})
export class SelfApproveRecordtimeComponent implements OnInit {
  @ViewChild('fileUploader') fileUploader: ElementRef | any = null;
  langs: any = reqonsite;
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
    private timeonsiteService: TimeonsiteServices,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private reasonService: ReasonsService,
    private locationService: LocationService,
    private approveService: ApproveServices,
    private datePipe: DatePipe,
    private router: Router,
  ) { }
  mainMenuItems: MenuItem[] = [];
  homeIcon: any = { icon: 'pi pi-home', routerLink: '/' };
  fileToUpload: File | any = null;
  Uploadfile: boolean = false;
  reason_list: ReasonsModel[] = [];
  reasonselected: ReasonsModel = new ReasonsModel();
  location_list: SysLocationModel[] = [];
  locationselected: SysLocationModel = new SysLocationModel();
  trtimonsite_list: cls_TRTimeonsiteModel[] = [];
  selectedtrtimeonsite: cls_TRTimeonsiteModel = new cls_TRTimeonsiteModel();
  selectedtrtimeonsiteall: cls_TRTimeonsiteModel[] = [];
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

    }
    this.status_list = [{ name: this.langs.get('wait')[this.selectlang], code: 0 }, { name: this.langs.get('finish')[this.selectlang], code: 3 }, { name: this.langs.get('reject')[this.selectlang], code: 4 }, { name: this.selectlang == "EN" ? "All" : "ทั้งหมด", code: 1 }];
  }
  ngOnInit(): void {
    this.doGetInitialCurrent();
    this.doLoadMenu();
    this.doLoadReason();
    this.doLoadLocation()
    this.doLoadTimeonsite();
  }
  doLoadReason() {
    this.reason_list = [];
    let data = new ReasonsModel()
    data.reason_group = "ONS"
    this.reasonService.reason_get(data).then(async (res) => {
      this.reason_list = await res;
    });
  }
  Search() {
    if (this.status_select.code) {
      this.status_doc = true;
    } else {
      this.status_doc = false;
    }
    this.doLoadTimeonsite();
  }
  doLoadLocation() {
    this.location_list = [];
    let data = new SysLocationModel()
    this.locationService.location_get(data).then(async (res) => {
      this.location_list = await res;
    });
  }
  doLoadTimeonsite() {
    this.trtimonsite_list = [];
    this.selectedtrtimeonsiteall = [];
    let statuss = [4, 3, 0]
    if (this.status_select.code == 1) {
      statuss.forEach(async (e: number) => {
        var tmp = new ApproveModel();
        tmp.job_type = "ONS"
        tmp.fromdate = this.start_date;
        tmp.todate = this.end_date;
        tmp.status = e;
        await this.approveService.approve_get(tmp).then(async (res) => {
          await res.data.forEach((elm: any) => {
            elm.timeleave_fromdate = new Date(elm.timeleave_fromdate)
            elm.timeleave_todate = new Date(elm.timeleave_todate)
            this.trtimonsite_list.push(elm)
          });
          this.approveTotal = await res.total;
          this.initial_current.loading = false
        });
      })
    } else {
      var tmp = new ApproveModel();
      tmp.job_type = "ONS"
      tmp.fromdate = this.start_date;
      tmp.todate = this.end_date;
      tmp.status = this.status_select.code;
      this.approveService.approve_get(tmp).then(async (res) => {
        res.data.forEach((elm: any) => {
          elm.timeleave_fromdate = new Date(elm.timeleave_fromdate)
          elm.timeleave_todate = new Date(elm.timeleave_todate)
        });
        this.trtimonsite_list = await res.data;
        this.approveTotal = await res.total;
        this.initial_current.loading = false
      });
    }
  }

  async doGetfileTimeonsite(file_path: string, type: string) {
    this.timeonsiteService.get_file(file_path).then((res) => {
      var url = window.URL.createObjectURL(new Blob([new Uint8Array(res)], { type: type }));
      window.open(url);
      this.selectedreqdoc = new cls_MTReqdocumentModel();
    })
  }
  async doApproveJob(data: ApproveModel) {
    this.initial_current.loading = true;
    data.job_type = "ONS";
    data.lang = this.selectlang;
    await this.approveService.approveJob(data).then((res) => {
      if (res.result) {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: res.message });
        this.doLoadTimeonsite();
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
    { label: this.langs.get('title_onsite')[this.selectlang], routerLink: '/self/approve_record', styleClass: 'activelike' }]
    this.items = [

      {
        label: this.langs.get('new')[this.selectlang],
        icon: 'pi pi-fw pi-plus',
        command: (event) => {
          this.selectedtrtimeonsite = new cls_TRTimeonsiteModel();
          this.reasonselected = this.reason_list[0]
          this.locationselected = this.location_list[0]
          this.selectedtrtimeonsite.reason_code = this.reason_list[0].reason_code
          this.selectedtrtimeonsite.location_code = this.location_list[0].location_code
          this.showManage()
        }

      },
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
        label: this.langs.get('new')[this.selectlang],
        icon: 'pi pi-fw pi-plus',
        command: (event) => {
          this.Uploadfile = true;
        }
      },
    ];

  }
  onRowSelectfile(event: Event) {
    this.doGetfileTimeonsite(this.selectedreqdoc.document_path, this.selectedreqdoc.document_type)
  }
  onRowSelect(event: Event) {
  }
  showManage() {
    this.displayManage = true
    this.edit_data = false;
  }
  closeManage() {
    this.selectedtrtimeonsite = new cls_TRTimeonsiteModel();
    this.displayManage = false

  }
  selectotlocation() {
    this.selectedtrtimeonsite.location_code = this.locationselected.location_code;
  }
  selectotreason() {
    this.selectedtrtimeonsite.reason_code = this.reasonselected.reason_code;
  }
  Save(data: cls_TRTimeonsiteModel) {
    if (!this.selectedtrtimeonsiteall.length && !this.status_doc) {
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
  Delete(data: cls_TRTimeonsiteModel) {
    if (!this.selectedtrtimeonsiteall.length && !this.status_doc) {
      this.confirmationService.confirm({
        message: this.langs.get('connotapprove')[this.selectlang],
        header: this.langs.get('connotdoc')[this.selectlang],
        icon: 'pi pi-times',
        accept: () => {
          let tmp = new ApproveModel();
          tmp.job_id = [data.jobtable_id];
          tmp.approve_status = "C";
          tmp.company_code = data.company_code;
          this.doApproveJob(tmp)
        },
        reject: () => {

        }
      });
    }
  }
  Saveall() {
    if (this.selectedtrtimeonsiteall.length && !this.status_doc) {
      this.confirmationService.confirm({
        message: this.langs.get('conapprove')[this.selectlang],
        header: this.langs.get('condoc')[this.selectlang],
        icon: 'pi pi-check',
        accept: () => {
          let tmp = new ApproveModel();
          this.selectedtrtimeonsiteall.forEach((data: cls_TRTimeonsiteModel) => {
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
    if (this.selectedtrtimeonsiteall.length && !this.status_doc) {
      this.confirmationService.confirm({
        message: this.langs.get('connotapprove')[this.selectlang],
        header: this.langs.get('connotdoc')[this.selectlang],
        icon: 'pi pi-times',
        accept: () => {
          let tmp = new ApproveModel();
          this.selectedtrtimeonsiteall.forEach((data: cls_TRTimeonsiteModel) => {
            tmp.job_id.push(data.jobtable_id)
            tmp.approve_status = "C";
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
  viwe(data: cls_TRTimeonsiteModel) {
    this.selectedtrtimeonsite = data;
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
}

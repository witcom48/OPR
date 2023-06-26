import { DatePipe } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, MegaMenuItem, MenuItem, MessageService } from 'primeng/api';
import { AppConfig } from 'src/app/config/config';
import { InitialCurrent } from 'src/app/config/initial_current';
import { ApproveModel } from 'src/app/models/self/approve';
import { cls_MTReqdocumentModel } from 'src/app/models/self/cls_MTReqdocument';
import { cls_TRTimeotModel } from 'src/app/models/self/cls_TRTimeot';
import { LocationModel } from 'src/app/models/system/policy/location';
import { ReasonsModel } from 'src/app/models/system/policy/reasons';
import { ApproveServices } from 'src/app/services/self/approve.service';
import { TimeotServices } from 'src/app/services/self/timeot.service';
import { LocationService } from 'src/app/services/system/policy/location.service';
import { ReasonsService } from 'src/app/services/system/policy/reasons.service';
declare var reqot: any;

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
  ) { }
  fileToUpload: File | any = null;
  Uploadfile: boolean = false;
  reason_list: ReasonsModel[] = [];
  reasonselected: ReasonsModel = new ReasonsModel();
  location_list: LocationModel[] = [];
  locationselected: LocationModel = new LocationModel();
  trtimeot_list: cls_TRTimeotModel[] = [];
  selectedtrtimeot: cls_TRTimeotModel = new cls_TRTimeotModel();
  selectedtrtimeotall: cls_TRTimeotModel[] = [];
  selectedreqdoc: cls_MTReqdocumentModel = new cls_MTReqdocumentModel();
  public initial_current: InitialCurrent = new InitialCurrent();
  doGetInitialCurrent() {
    this.initial_current = JSON.parse(localStorage.getItem(AppConfig.SESSIONInitial) || '{}');
    if (!this.initial_current.Token) {
      this.router.navigateByUrl('login');
    }
    this.selectlang = this.initial_current.Language;
    if (this.initial_current.Language == "TH") {
      this.reasonedis = "reason_name_th";
      this.locatiodis = "location_name_th"

    }
  }
  ngOnInit(): void {
    this.doGetInitialCurrent();
    this.doLoadMenu();
    this.doLoadTimeot();
    this.doLoadReason();
    this.doLoadLocation();
  }
  doLoadTimeot() {
    this.trtimeot_list = [];
    var tmp = new ApproveModel();
    tmp.job_type = "OT"
    this.approveService.approve_get(tmp).then(async (res) => {
      res.forEach((elm: any) => {
        elm.timeot_workdate = new Date(elm.timeot_workdate)
      });
      this.trtimeot_list = await res
    });
    // var tmp = new cls_TRTimeotModel();
    // tmp.timeot_workdate = new Date(`${this.initial_current.PR_Year}-01-01`)
    // tmp.timeot_todate = new Date(`${this.initial_current.PR_Year}-12-31`)
    // this.timeotService.timeot_get(tmp).then(async (res) => {
    //   res.forEach((elm: any) => {
    //     elm.timeot_workdate = new Date(elm.timeot_workdate)
    //   });
    //   this.trtimeot_list = await res
    // });
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
    let data = new LocationModel()
    this.locationService.location_get(data).then(async (res) => {
      this.location_list = await res;
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
      console.log(res)
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
    data.job_type = "OT";
    data.lang = this.selectlang;
    await this.approveService.approveJob(data).then((res) => {
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
  doLoadMenu() {

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
      //     console.log('Edit')
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
      //     console.log('Edit')
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
    if (!this.selectedtrtimeotall.length) {
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
  Delete(data: cls_TRTimeotModel) {
    if (!this.selectedtrtimeotall.length) {
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
    if (this.selectedtrtimeotall.length) {
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
          console.log(tmp)
          this.doApproveJob(tmp)
        },
        reject: () => {

        }
      });
    }
  }
  Deleteall() {
    if (this.selectedtrtimeotall.length) {
      this.confirmationService.confirm({
        message: this.langs.get('connotapprove')[this.selectlang],
        header: this.langs.get('connotdoc')[this.selectlang],
        icon: 'pi pi-times',
        accept: () => {
          let tmp = new ApproveModel();
          this.selectedtrtimeotall.forEach((data: cls_TRTimeotModel) => {
            tmp.job_id.push(data.jobtable_id)
            tmp.approve_status = "C";
            tmp.company_code = data.company_code;
          })
          console.log(tmp)
          this.doApproveJob(tmp)
        },
        reject: () => {

        }
      });
    }
  }
  viwe(data: cls_TRTimeotModel) {
    this.selectedtrtimeot = data;
    this.location_list.forEach((obj: LocationModel) => {
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

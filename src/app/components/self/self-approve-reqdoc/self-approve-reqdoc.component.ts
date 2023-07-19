import { DatePipe } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, MenuItem, MessageService } from 'primeng/api';
import { AppConfig } from 'src/app/config/config';
import { InitialCurrent } from 'src/app/config/initial_current';
import { ApproveModel } from 'src/app/models/self/approve';
import { ApproveTotalModel } from 'src/app/models/self/approveTotal';
import { cls_MTTopicModel } from 'src/app/models/self/cls_MTTopic';
import { cls_TRReqdocModel } from 'src/app/models/self/cls_TRReqdoc';
import { cls_TRReqdocattModel } from 'src/app/models/self/cls_TRReqdocatt';
import { cls_TRReqempinfoModel } from 'src/app/models/self/cls_TRReqempinfo';
import { ApproveServices } from 'src/app/services/self/approve.service';
import { ReqdocServices } from 'src/app/services/self/reqdoc.service';
import { TopicServices } from 'src/app/services/self/topic.service';
declare var reqdoc: any;
interface Status { name: string, code: number }
@Component({
  selector: 'app-self-approve-reqdoc',
  templateUrl: './self-approve-reqdoc.component.html',
  styleUrls: ['./self-approve-reqdoc.component.scss']
})
export class SelfApproveReqdocComponent implements OnInit {
  @ViewChild('fileUploader') fileUploader: ElementRef | any = null;
  langs: any = reqdoc;
  selectlang: string = "EN";
  topicdis: string = "topic_name_en"
  position: string = "right";
  displayManage: boolean = false;
  edit_data: boolean = false;
  Uploadinfo: boolean = false;
  Uploadinfoedit: boolean = false;
  constructor(
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private router: Router,
    private reqdocService: ReqdocServices,
    private topicService: TopicServices,
    private approveService: ApproveServices,
    private datePipe: DatePipe,
  ) { }
  fileToUpload: File | any = null;
  Uploadfile: boolean = false;
  items: MenuItem[] = [];
  items_attfile: MenuItem[] = [];
  items_attinfo: MenuItem[] = [];
  topic_list: cls_MTTopicModel[] = [];
  selectedtopic: cls_MTTopicModel = new cls_MTTopicModel();
  reqdoc_list: cls_TRReqdocModel[] = [];
  selectedreqdoc: cls_TRReqdocModel = new cls_TRReqdocModel();
  selectedreqdocall: cls_TRReqdocModel[] = [];
  selectedreqdocinfo: cls_TRReqempinfoModel = new cls_TRReqempinfoModel();
  selectedreqdocfile: cls_TRReqdocattModel = new cls_TRReqdocattModel();
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
      this.topicdis = "topic_name_th";

    }
  }
  ngOnInit(): void {
    this.doGetInitialCurrent();
    this.doLoadMenu();
    this.doLoadReqdoc();
    this.doLoadTopic();
  }
  Search() {
    if (this.status_select.code) {
      this.status_doc = true;
    } else {
      this.status_doc = false;
    }
    this.doLoadReqdoc();
  }
  doLoadReqdoc() {
    this.selectedreqdocall = [];
    this.reqdoc_list = [];
    var tmp = new ApproveModel();
    tmp.job_type = "REQ"
    tmp.fromdate = this.start_date;
    tmp.todate = this.end_date;
    tmp.status = this.status_select.code;
    this.approveService.approve_get(tmp).then(async (res) => {
      res.data.forEach((element: any) => {
        element.reqdoc_date = new Date(element.reqdoc_date)
      });
      // console.log(res)
      this.reqdoc_list = await res.data
      this.approveTotal = await res.total;
    });
  }
  doLoadTopic() {
    this.topic_list = [];
    let data = new cls_MTTopicModel()
    this.topicService.topic_get(data).then(async (res) => {
      this.topic_list = await res;
    });
  }
  async doGetfileTimereqdoc(file_path: string, type: string) {
    this.reqdocService.get_file(file_path).then((res) => {
      var url = window.URL.createObjectURL(new Blob([new Uint8Array(res)], { type: type }));
      window.open(url);
      this.selectedreqdocfile = new cls_TRReqdocattModel();
    })
  }
  async doApproveJob(data: ApproveModel) {
    data.job_type = "REQ";
    data.lang = this.selectlang;
    await this.approveService.approveJob(data).then((res) => {
      if (res.success) {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: res.message });
        this.doLoadReqdoc();
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
          this.selectedreqdoc = new cls_TRReqdocModel();
          this.selectedtopic = this.topic_list[0]
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
    this.items_attinfo = [
      {
        label: this.langs.get('new')[this.selectlang],
        icon: 'pi pi-fw pi-plus',
        command: (event) => {
          this.selectedreqdocinfo = new cls_TRReqempinfoModel();
          this.selectedreqdocinfo.topic_code = this.topic_list[0].topic_code;
          this.Uploadinfo = true;
          this.Uploadinfoedit = false;
        }
      },
    ];
  }
  selecttopic() {
    this.selectedreqdocinfo.topic_code = this.selectedtopic.topic_code;
  }
  closeManageinfo() {
    this.selectedreqdocinfo = new cls_TRReqempinfoModel();
    this.Uploadinfo = false
    this.Uploadinfoedit = false;
  }
  handleFileInput(file: FileList) {
    this.fileToUpload = file.item(0);
  }
  DeleteFile(data: cls_TRReqdocattModel) {
    this.confirmationService.confirm({
      message: this.langs.get('confirm_delete')[this.selectlang] + data.reqdoc_att_file_name,
      header: this.langs.get('delete')[this.selectlang],
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        if (data.reqdoc_att_no) {
          this.reqdocService.delete_file(data).then((res) => {
            if (res.success) {
              this.messageService.add({ severity: 'success', summary: 'Success', detail: res.message });
            } else {
              this.messageService.add({ severity: 'error', summary: 'Error', detail: res.message });
            }
          })
        } else {
          this.selectedreqdoc.reqdocatt_data = this.selectedreqdoc.reqdocatt_data.filter((item) => {
            return item !== data;
          });
        }
        this.reqdocService.deletefilepath_file(data.reqdoc_att_path).then((res) => {
          if (res.success) {
            this.messageService.add({ severity: 'success', summary: 'Success', detail: res.message });
            this.selectedreqdoc.reqdocatt_data = this.selectedreqdoc.reqdocatt_data.filter((item) => {
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
  closeManage() {
    this.selectedreqdoc = new cls_TRReqdocModel();
    this.displayManage = false

  }
  showManage() {
    this.displayManage = true
    this.edit_data = false;
  }
  onRowSelectfile(event: Event) {
    this.doGetfileTimereqdoc(this.selectedreqdocfile.reqdoc_att_path, this.selectedreqdocfile.reqdoc_att_file_type)
  }
  onRowSelecttopic(event: Event) {
    this.Uploadinfoedit = true;
    this.Uploadinfo = true;
  }
  onRowSelect(event: Event) {

  }
  Saveinfo() {
    if (!this.Uploadinfoedit) {
      this.selectedreqdoc.reqempinfo_data = this.selectedreqdoc.reqempinfo_data.concat({
        reqdoc_id: this.selectedreqdoc.reqdoc_id,
        reqdocempinfo_no: this.selectedreqdocinfo.reqdocempinfo_no,
        topic_code: this.selectedreqdocinfo.topic_code,
        reqempinfo_detail: this.selectedreqdocinfo.reqempinfo_detail
      })
    }
    this.Uploadinfo = false;
    this.Uploadinfoedit = false;
    this.selectedreqdocinfo = new cls_TRReqempinfoModel();
  }
  Deleteinfo() {
    this.selectedreqdoc.reqempinfo_data = this.selectedreqdoc.reqempinfo_data.filter((item) => {
      return item !== this.selectedreqdocinfo;
    });
    this.Uploadinfo = false;
    this.Uploadinfoedit = false;
    this.selectedreqdocinfo = new cls_TRReqempinfoModel();
  }
  Save(data: cls_TRReqdocModel) {
    if (!this.selectedreqdocall.length && !this.status_doc) {
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
  Delete(data: cls_TRReqdocModel) {
    if (!this.selectedreqdocall.length && !this.status_doc) {
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
    if (this.selectedreqdocall.length && !this.status_doc) {
      this.confirmationService.confirm({
        message: this.langs.get('conapprove')[this.selectlang],
        header: this.langs.get('condoc')[this.selectlang],
        icon: 'pi pi-check',
        accept: () => {
          let tmp = new ApproveModel();
          this.selectedreqdocall.forEach((data: cls_TRReqdocModel) => {
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
    if (this.selectedreqdocall.length && !this.status_doc) {
      this.confirmationService.confirm({
        message: this.langs.get('connotapprove')[this.selectlang],
        header: this.langs.get('connotdoc')[this.selectlang],
        icon: 'pi pi-times',
        accept: () => {
          let tmp = new ApproveModel();
          this.selectedreqdocall.forEach((data: cls_TRReqdocModel) => {
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
  viwe(data: cls_TRReqdocModel) {
    this.selectedreqdoc = data;
    this.edit_data = true;
    this.displayManage = true
  }
  getTopicname(codes: string) {
    if (this.selectlang == "TH") {
      return this.topic_list.find(({ topic_code }) => topic_code === codes)?.topic_name_th
    } else {
      return this.topic_list.find(({ topic_code }) => topic_code === codes)?.topic_name_en
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
}

import { DatePipe } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, MenuItem, MessageService } from 'primeng/api';
import { AppConfig } from 'src/app/config/config';
import { InitialCurrent } from 'src/app/config/initial_current';
import { cls_MTTopicModel } from 'src/app/models/self/cls_MTTopic';
import { cls_TRReqdocModel } from 'src/app/models/self/cls_TRReqdoc';
import { cls_TRReqdocattModel } from 'src/app/models/self/cls_TRReqdocatt';
import { cls_TRReqempinfoModel } from 'src/app/models/self/cls_TRReqempinfo';
import { ReqdocServices } from 'src/app/services/self/reqdoc.service';
import { TopicServices } from 'src/app/services/self/topic.service';
declare var reqdoc: any;
@Component({
  selector: 'app-self-reqdoc',
  templateUrl: './self-reqdoc.component.html',
  styleUrls: ['./self-reqdoc.component.scss']
})
export class SelfReqdocComponent implements OnInit {
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
  selectedreqdocinfo: cls_TRReqempinfoModel = new cls_TRReqempinfoModel();
  selectedreqdocfile: cls_TRReqdocattModel = new cls_TRReqdocattModel();
  public initial_current: InitialCurrent = new InitialCurrent();
  doGetInitialCurrent() {
    this.initial_current = JSON.parse(localStorage.getItem(AppConfig.SESSIONInitial) || '{}');
    if (!this.initial_current.Token) {
      this.router.navigateByUrl('login');
    }
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
  doLoadReqdoc() {
    this.reqdoc_list = [];
    let data = new cls_TRReqdocModel()
    data.reqdoc_date = new Date(`${this.initial_current.PR_Year}-01-01`)
    data.reqdoc_date_to = new Date(`${this.initial_current.PR_Year}-12-31`)
    data.worker_code = this.initial_current.Username;
    this.reqdocService.reqdoc_get(data).then(async (res) => {
      res.forEach((element: cls_TRReqdocModel) => {
        element.reqdoc_date = new Date(element.reqdoc_date)
      });
      this.reqdoc_list = await res;
    });
  }
  doLoadTopic() {
    this.topic_list = [];
    let data = new cls_MTTopicModel()
    this.topicService.topic_get(data).then(async (res) => {
      this.topic_list = await res;
    });
  }
  async doRecordReqdoc(data: cls_TRReqdocModel) {
    await this.reqdocService.reqdoc_record(data).then((res) => {
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
  async doDeleteReqdoc(data: cls_TRReqdocModel) {
    await this.reqdocService.reqdoc_delete(data).then((res) => {
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
  async doGetfileTimereqdoc(file_path: string, type: string) {
    this.reqdocService.get_file(file_path).then((res) => {
      var url = window.URL.createObjectURL(new Blob([new Uint8Array(res)], { type: type }));
      window.open(url);
      this.selectedreqdocfile = new cls_TRReqdocattModel();
    })
  }
  doUploadFile() {
    const filename = "REQDOC_DOC" + this.datePipe.transform(new Date(), 'yyyyMMddHHmmss');
    const filetype = this.fileToUpload.name.split(".")[1];
    this.reqdocService.file_import(this.fileToUpload, filename, filetype).then((res) => {
      console.log(res)
      if (res.success) {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: res.message });
        this.selectedreqdoc.reqdocatt_data = this.selectedreqdoc.reqdocatt_data.concat({
          reqdoc_id: this.selectedreqdoc.reqdoc_id,
          reqdoc_att_no: this.selectedreqdocfile.reqdoc_att_no,
          reqdoc_att_file_name: filename + "." + filetype,
          reqdoc_att_file_type: this.fileToUpload.type,
          reqdoc_att_path: res.message,
          created_by: this.initial_current.Username,
          created_date: ""
        })
        this.Uploadfile = false;
      }
      else {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: res.message });
      }
      this.fileToUpload = null;
    });
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
    // this.location_list.forEach((obj: LocationModel) => {
    //   if (obj.location_code == this.selectedtimecheckin.location_code) {
    //     this.locationselected = obj;
    //   }
    // })
    // this.type_list.forEach((obj: Type) => {
    //   if (obj.code == this.selectedtimecheckin.timecheckin_type) {
    //     this.typeselected = obj;
    //   }
    // })
    this.edit_data = true;
    this.displayManage = true
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
  async Save() {
    if (this.selectedreqdoc.reqdoc_doc === "") {
      this.selectedreqdoc.reqdoc_doc = "REQDOC_" + this.datePipe.transform(new Date(), 'yyyyMMddHHmmss');
    }
    // console.log(this.selectedreqdoc)
    this.doRecordReqdoc(this.selectedreqdoc)
  }
  Delete() {
    this.doDeleteReqdoc(this.selectedreqdoc)
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

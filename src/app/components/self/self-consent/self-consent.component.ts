import { DatePipe } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, MenuItem, MessageService } from 'primeng/api';
import { AppConfig } from 'src/app/config/config';
import { InitialCurrent } from 'src/app/config/initial_current';
import { cls_MTPdpafileModel } from 'src/app/models/self/cls_MTPdpafile';
import { cls_TRPdpaModel } from 'src/app/models/self/cls_TRPdpa';
import { PdpaServices } from 'src/app/services/self/pdpa';
import { PdpaFileServices } from 'src/app/services/self/pdpafile';
declare var consent: any;
@Component({
  selector: 'app-self-consent',
  templateUrl: './self-consent.component.html',
  styleUrls: ['./self-consent.component.scss']
})
export class SelfConsentComponent implements OnInit {
  @ViewChild('fileUploader') fileUploader: ElementRef | any = null;
  langs: any = consent;
  selectlang: string = "EN";
  src: string = '';
  displayManage: boolean = false;
  Uploadfile: boolean = false;
  constructor(
    private pdpafileServices: PdpaFileServices,
    private pdpaServices: PdpaServices,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private datePipe: DatePipe,
    private router: Router,
  ) { }
  fileToUpload: File | any = null;
  items_attfile: MenuItem[] = [];
  pdpafile_list: cls_MTPdpafileModel[] = [];
  pdpa_list: cls_TRPdpaModel[] = [];
  pdpafile_select: cls_MTPdpafileModel = new cls_MTPdpafileModel();
  public initial_current: InitialCurrent = new InitialCurrent();
  doGetInitialCurrent() {
    this.initial_current = JSON.parse(localStorage.getItem(AppConfig.SESSIONInitial) || '{}');
    if (!this.initial_current.Token) {
      this.router.navigateByUrl('login');
    }

    this.selectlang = this.initial_current.Language;
  }
  ngOnInit(): void {
    this.doGetInitialCurrent();
    this.doLoadMenu();
    this.doLoadPdpa();
    this.doLoadPdpafile();
  }
  doLoadMenu() {
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
  doLoadPdpa() {
    var tmp = new cls_TRPdpaModel();
    this.pdpaServices.pdpa_get(tmp).then(async (res) => {
      // console.log(res)
      this.pdpa_list = await res;
    });
  }

  doLoadPdpafile() {
    var tmp = new cls_MTPdpafileModel();
    this.pdpafileServices.pdpafile_get(tmp).then(async (res) => {
      this.pdpafile_list = await res;
      // this.pdpafileServices.get_file(res[0].document_path).then((res) => {
      //   var url = window.URL.createObjectURL(new Blob([new Uint8Array(res)], { type: res[0].document_type }));
      //   this.src = url;
      //   this.displayManage = true;
      // })
    });
  }
  doUploadFile() {
    const filename = "PDPA_DOC" + this.datePipe.transform(new Date(), 'yyyyMMddHHmmss');
    const filetype = this.fileToUpload.name.split(".")[1];
    this.pdpafileServices.file_import(this.fileToUpload, filename, filetype).then((res) => {
      // console.log(res)
      if (res.success) {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: res.message });
        var tem = new cls_MTPdpafileModel();
        tem.document_name = filename + "." + filetype;
        tem.document_path = res.message;
        tem.document_type = this.fileToUpload.type;
        this.pdpafileServices.pdpafile_record(tem).then((res) => {
          this.Uploadfile = false;
          this.doLoadPdpafile();
        })
      }
      else {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: res.message });
      }
      this.fileToUpload = null;
    });
  }
  async doGetfileTimeleave(file_path: string, type: string) {
    this.pdpafileServices.get_file(file_path).then((res) => {
      var url = window.URL.createObjectURL(new Blob([new Uint8Array(res)], { type: type }));
      window.open(url);
      this.pdpafile_select = new cls_MTPdpafileModel();
    })
  }
  handleFileInputholidaylist(file: FileList) {
    this.fileToUpload = file.item(0);
  }
  onRowSelectfile(event: Event) {
    this.doGetfileTimeleave(this.pdpafile_select.document_path, this.pdpafile_select.document_type)
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
}

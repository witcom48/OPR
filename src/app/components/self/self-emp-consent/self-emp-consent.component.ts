import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { AppConfig } from 'src/app/config/config';
import { InitialCurrent } from 'src/app/config/initial_current';
import { cls_MTPdpafileModel } from 'src/app/models/self/cls_MTPdpafile';
import { cls_TRPdpaModel } from 'src/app/models/self/cls_TRPdpa';
import { PdpaServices } from 'src/app/services/self/pdpa';
import { PdpaFileServices } from 'src/app/services/self/pdpafile';
declare var consent: any;
@Component({
  selector: 'app-self-emp-consent',
  templateUrl: './self-emp-consent.component.html',
  styleUrls: ['./self-emp-consent.component.scss']
})
export class SelfEmpConsentComponent implements OnInit {
  langs: any = consent;
  selectlang: string = "EN";
  src: string = '';
  displayManage: boolean = false;
  constructor(
    private pdpafileServices: PdpaFileServices,
    private pdpaServices: PdpaServices,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private datePipe: DatePipe,
    private router: Router,) { }
  pdpa_list: cls_TRPdpaModel[] = [];
  pdpa_select: cls_TRPdpaModel = new cls_TRPdpaModel();
  public initial_current: InitialCurrent = new InitialCurrent();
  doGetInitialCurrent() {
    this.initial_current = JSON.parse(localStorage.getItem(AppConfig.SESSIONInitial) || '{}');
    if (!this.initial_current.Token) {
      this.router.navigateByUrl('login');
    }

    this.selectlang = this.initial_current.Language;
    this.doLoadPdpa();
  }
  ngOnInit(): void {
    this.doGetInitialCurrent();
  }
  doLoadPdpa() {
    var tmp = new cls_TRPdpaModel();
    tmp.worker_code = this.initial_current.Username;
    this.pdpaServices.pdpa_get(tmp).then(async (res) => {
      console.log(res)
      this.pdpa_list = await res;
    });
  }
  onRowSelectfile(event: Event) {
    this.doLoadPdpafile();
  }
  doLoadPdpafile() {
    var tmp = new cls_MTPdpafileModel();
    this.pdpafileServices.pdpafile_get(tmp).then(async (res) => {
      this.pdpafileServices.get_file(res[0].document_path).then((res) => {
        var url = window.URL.createObjectURL(new Blob([new Uint8Array(res)], { type: res[0].document_type }));
        this.src = url;
        this.displayManage = true;
        this.pdpa_select = new cls_TRPdpaModel();
      })
    });
  }
  recodePDPA(status: boolean) {
    var tem = new cls_TRPdpaModel();
    tem.worker_code = this.initial_current.Username
    tem.status = status;
    this.pdpaServices.pdpa_record(tem).then((res) => {
      this.displayManage = false;
      this.doLoadPdpa();
    })
  }
}

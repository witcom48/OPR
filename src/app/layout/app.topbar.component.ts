import { Component, ElementRef, ViewChild } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { LayoutService } from "./service/app.layout.service";
import { Router } from '@angular/router';
import { InitialCurrent } from '../config/initial_current';
import { AppConfig } from '../config/config';
import { AuthenService } from '../services/authen/authen.service';
import { PdpaServices } from '../services/self/pdpa';
import { cls_TRPdpaModel } from '../models/self/cls_TRPdpa';
import { cls_MTPdpafileModel } from '../models/self/cls_MTPdpafile';
import { PdpaFileServices } from '../services/self/pdpafile';
declare var consent: any;
interface Lang {
    name: string,
    code: string
}
@Component({
    selector: 'app-topbar',
    templateUrl: './app.topbar.component.html'
})
export class AppTopBarComponent {
    langs: any = consent;
    selectlang: string = "EN";
    src: string = '';
    displayManage: boolean = false;
    items!: MenuItem[];
    lang_list: Lang[] = [{ name: "EN", code: "EN" }, { name: "TH", code: "TH" }]
    langselect: any;
    @ViewChild('menubutton') menuButton!: ElementRef;

    @ViewChild('topbarmenubutton') topbarMenuButton!: ElementRef;

    @ViewChild('topbarmenu') menu!: ElementRef;

    constructor(
        public layoutService: LayoutService,
        private router: Router,
        private authenService: AuthenService,
        private pdpaServices: PdpaServices,
        private pdpafileServices: PdpaFileServices
    ) { }
    public initial_current: InitialCurrent = new InitialCurrent();
    doGetInitialCurrent() {
        this.initial_current = JSON.parse(localStorage.getItem(AppConfig.SESSIONInitial) || '{}');
        this.selectlang = this.initial_current.Language;
        if (!this.initial_current.Token) {
            this.router.navigateByUrl('login');
        }
        if (this.initial_current.Language == "TH") {
            this.langselect = { name: "TH", code: "TH" }
        } else {
            this.langselect = { name: "EN", code: "EN" }
        }

        if (this.initial_current.Usertype == "Emp") {
            this.checkPDPA();
        }
    }
    checkToken() {
        this.authenService.checkToken().then((res) => {
            if (!res.success) {
                this.router.navigateByUrl('login')
            }
        })
    }
    checkPDPA() {
        var tem = new cls_TRPdpaModel();
        tem.worker_code = this.initial_current.Username
        this.pdpaServices.pdpa_get(tem).then((res) => {
            if (!res.length) {
                this.doLoadPdpafile();
            }
        })
    }
    recodePDPA(status: boolean) {
        var tem = new cls_TRPdpaModel();
        tem.worker_code = this.initial_current.Username
        tem.status = status;
        console.log(tem)
        this.pdpaServices.pdpa_record(tem).then((res) => {
            this.displayManage = false;
        })
    }
    doLoadPdpafile() {
        var tmp = new cls_MTPdpafileModel();
        this.pdpafileServices.pdpafile_get(tmp).then(async (res) => {
            this.pdpafileServices.get_file(res[0].document_path).then((res) => {
                var url = window.URL.createObjectURL(new Blob([new Uint8Array(res)], { type: res[0].document_type }));
                this.src = url;
                this.displayManage = true;
            })
        });
    }
    ngOnInit() {
        this.doGetInitialCurrent();
        this.checkToken();
    }
    logout() {
        localStorage.clear();
        this.router.navigateByUrl('login')
    }
    SelectLang() {
        this.initial_current.Language = this.langselect.code;
        localStorage.setItem(AppConfig.SESSIONInitial, JSON.stringify(this.initial_current));
        window.location.reload();
    }
}

import { Component, ElementRef, ViewChild, OnInit } from '@angular/core';
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
import { PolmenuServices } from '../services/system/security/polmenu.service';
import { PolmenuModel } from '../models/system/security/polmenu';
declare var consent: any;
interface Language {
    name: string;
    code: string;
}

@Component({
    selector: 'app-topbar',
    templateUrl: './app.topbar.component.html'
})
export class AppTopBarComponent implements OnInit {
    consentLanguages: any = consent;
    selectedLanguageCode: string = "EN";
    pdpaFileSrc: string = '';
    isManageDisplayed = false;
    menuItems: MenuItem[] = [];
    supportedLanguages: Language[] = [
        { name: "English", code: "EN" },
        { name: "Thai", code: "TH" }
    ];
    selectedLanguage: any;

    @ViewChild('menubutton') menuButton!: ElementRef;
    @ViewChild('topbarmenubutton') topbarMenuButton!: ElementRef;
    @ViewChild('topbarmenu') menu!: ElementRef;

    initialData: InitialCurrent = new InitialCurrent();

    constructor(
        public layoutService: LayoutService,
        private router: Router,
        private authService: AuthenService,
        private pdpaService: PdpaServices,
        private pdpaFileService: PdpaFileServices,
        private polmenuServices: PolmenuServices,
    ) { }

    ngOnInit() {
        // Fetch initial data and check token validity on component initialization
        this.fetchInitialData();
        this.checkTokenValidity();
    }

    // Fetches initial data and handles the language selection
    fetchInitialData() {
        this.initialData = JSON.parse(localStorage.getItem(AppConfig.SESSIONInitial) || '{}');
        this.selectedLanguageCode = this.initialData.Language;
        if (!this.initialData.Token) {
            this.router.navigateByUrl('login');
        }
        this.selectedLanguage = this.supportedLanguages.find(lang => lang.code === this.selectedLanguageCode);

        if (this.initialData.Usertype == "Emp") {
            this.checkPDPA();
        }
    }

    // Checks the validity of the authentication token
    checkTokenValidity() {
        this.authService.checkToken().then((res) => {
            if (!res.success) {
                this.router.navigateByUrl('login');
            }
        });
    }

    // Checks if the user has agreed to PDPA
    checkPDPA() {
        const pdpaModel = new cls_TRPdpaModel();
        pdpaModel.worker_code = this.initialData.Username;
        this.pdpaService.pdpa_get(pdpaModel).then((res) => {
            if (!res.length) {
                this.loadPdpaFile();
            }
        });
    }

    // Records the user's PDPA status
    recordPDPAStatus(status: boolean) {
        const pdpaModel = new cls_TRPdpaModel();
        pdpaModel.worker_code = this.initialData.Username;
        pdpaModel.status = status;
        this.pdpaService.pdpa_record(pdpaModel).then(() => {
            this.isManageDisplayed = false;
        });
    }

    // Loads the PDPA file
    loadPdpaFile() {
        const pdpaFileModel = new cls_MTPdpafileModel();
        this.pdpaFileService.pdpafile_get(pdpaFileModel).then(async (res) => {
            this.pdpaFileService.get_file(res[0].document_path).then((res) => {
                const url = window.URL.createObjectURL(new Blob([new Uint8Array(res)], { type: res[0].document_type }));
                this.pdpaFileSrc = url;
                this.isManageDisplayed = true;
            });
        });
    }

    // Logs out the user
    logout() {
        localStorage.clear();
        this.router.navigateByUrl('login');
    }

    // Selects a language and updates the page
    selectLanguage(langCode: string) {
        // localStorage.setItem(AppConfig.SESSIONInitial, JSON.stringify(this.initialData));
        var temp = new PolmenuModel();
        temp.polmenu_code = this.initialData.PolMenu_Code;
        this.polmenuServices.polmenu_get(temp)
            .then((res) => {
                this.initialData.PolMenu = res;
                this.initialData.Language = langCode;
                localStorage.setItem(AppConfig.SESSIONInitial, JSON.stringify(this.initialData));
                window.location.reload();
            });
    }
}

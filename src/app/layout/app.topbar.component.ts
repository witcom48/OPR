import { Component, ElementRef, ViewChild } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { LayoutService } from "./service/app.layout.service";
import { Router } from '@angular/router';
import { InitialCurrent } from '../config/initial_current';
import { AppConfig } from '../config/config';
import { AuthenService } from '../services/authen/authen.service';

interface Lang {
    name: string,
    code: string
}
@Component({
    selector: 'app-topbar',
    templateUrl: './app.topbar.component.html'
})
export class AppTopBarComponent {

    items!: MenuItem[];
    lang_list: Lang[] = [{ name: "EN", code: "EN" }, { name: "TH", code: "TH" }]
    langselect: any;
    @ViewChild('menubutton') menuButton!: ElementRef;

    @ViewChild('topbarmenubutton') topbarMenuButton!: ElementRef;

    @ViewChild('topbarmenu') menu!: ElementRef;

    constructor(
        public layoutService: LayoutService,
        private router: Router,
        private authenService: AuthenService,) { }
    public initial_current: InitialCurrent = new InitialCurrent();
    doGetInitialCurrent() {
        this.initial_current = JSON.parse(localStorage.getItem(AppConfig.SESSIONInitial) || '{}');

        if (!this.initial_current.Token) {
            this.router.navigateByUrl('login');
        }
        if (this.initial_current.Language == "TH") {
            this.langselect = { name: "TH", code: "TH" }
        } else {
            this.langselect = { name: "EN", code: "EN" }
        }
    }
    checkToken() {
        this.authenService.checkToken().then((res) => {
            if (!res.success) {
                this.router.navigateByUrl('login')
            }
        })
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

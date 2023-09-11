import { Component, OnInit } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';
import { InitialCurrent } from './config/initial_current';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {

    constructor(private primengConfig: PrimeNGConfig) { }
    initialData: InitialCurrent = new InitialCurrent();
    ngOnInit() {
        this.primengConfig.ripple = true;
    }
}

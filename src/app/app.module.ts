import { NgModule } from '@angular/core';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AppLayoutModule } from './layout/app.layout.module';

import { DatePipe } from '@angular/common';

import { HttpClientModule } from '@angular/common/http';
import { MessageService } from 'primeng/api';
import {ConfirmationService} from 'primeng/api';



@NgModule({
    declarations: [
        AppComponent, 
    ],
    imports: [
        AppRoutingModule,
        AppLayoutModule,
        HttpClientModule
    ],
    providers: [
        { provide: LocationStrategy, useClass: HashLocationStrategy },
        MessageService, DatePipe,ConfirmationService
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }

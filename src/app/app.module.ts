import { NgModule } from '@angular/core';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AppLayoutModule } from './layout/app.layout.module';

import { DatePipe } from '@angular/common';

import { HttpClientModule } from '@angular/common/http';
import { MessageService } from 'primeng/api';
import {ConfirmationService} from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';



@NgModule({
    declarations: [
        AppComponent, 
    ],
    imports: [
        AppRoutingModule,
        AppLayoutModule,
        HttpClientModule,
        ConfirmDialogModule,
        ToastModule,
        LeafletModule
    ],
    providers: [
        { provide: LocationStrategy, useClass: HashLocationStrategy },
        MessageService, DatePipe,ConfirmationService
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }

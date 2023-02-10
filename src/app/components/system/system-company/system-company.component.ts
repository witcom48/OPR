import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { NavigationExtras } from '@angular/router';

import { Table } from 'primeng/table';
import { MegaMenuItem, MenuItem } from 'primeng/api';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import {ConfirmationService,ConfirmEventType,MessageService} from 'primeng/api';
import * as XLSX from 'xlsx';
import { AppConfig } from '../../../config/config';
import { InitialCurrent } from '../../../config/initial_current';

import { ComaddressService } from 'src/app/services/system/comaddress.service';
import { ComaddressModel } from 'src/app/models/system/comaddress';
import { CompanyModel } from 'src/app/models/system/company';
import { CompanyService } from 'src/app/services/system/company.service';
import { CombankModel } from 'src/app/models/system/combank';
import { ComcardModel } from 'src/app/models/system/comcard';
import { CombankService } from 'src/app/services/system/combank.service';
import { ComcardService } from 'src/app/services/system/comcard.service';

@Component({
  selector: 'app-system-company',
  templateUrl: './system-company.component.html',
  styleUrls: ['./system-company.component.scss']
})
export class SystemCompanyComponent implements OnInit {

    constructor() { }

    ngOnInit(): void {
    }
  
  }
  
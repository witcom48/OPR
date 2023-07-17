import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, NavigationExtras } from '@angular/router';
import { Table } from 'primeng/table';
import { MegaMenuItem,MenuItem } from 'primeng/api';
import { Router } from '@angular/router';

import { DatePipe } from '@angular/common';
import {ConfirmationService, ConfirmEventType, MessageService} from 'primeng/api';
import * as XLSX from 'xlsx';

import { AppConfig } from '../../../config/config';
import { InitialCurrent } from '../../../config/initial_current';

import { ProgenaralService } from '../../../services/project/pro_genaral.service';

import { AccountModel } from '../../../models/self/account';


@Component({
  selector: 'app-polapprove',
  templateUrl: './polapprove.component.html',
  styleUrls: ['./polapprove.component.scss']
})
export class PolapproveComponent implements OnInit {

  constructor() { }

  account_source: AccountModel[] = [];
  account_dest: AccountModel[] = [];

  ngOnInit(): void {
  }

}

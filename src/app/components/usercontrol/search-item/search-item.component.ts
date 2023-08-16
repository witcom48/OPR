import { Component, OnInit } from '@angular/core';
import { MegaMenuItem,MenuItem } from 'primeng/api';
import {ConfirmationService, ConfirmEventType, MessageService} from 'primeng/api';

import { ActivatedRoute, NavigationExtras } from '@angular/router';
import { Router } from '@angular/router';

import { AppConfig } from '../../../config/config';
import { InitialCurrent } from '../../../config/initial_current';

import { RadiovalueModel } from '../../../models/project/radio_value';
 import { EmployeeService } from 'src/app/services/emp/worker.service';
import { PayitemModel } from 'src/app/models/payroll/payitem';
import { PayitemService } from 'src/app/services/payroll/payitem.service';
import { ItemsModel } from 'src/app/models/payroll/items';

@Component({
  selector: 'app-search-item',
  templateUrl: './search-item.component.html',
  styleUrls: ['./search-item.component.scss']
})
export class SearchItemComponent implements OnInit {


  title_page_from: {[key: string]: string} = {  EN: "Showing",  TH: "แสดง1"}
  title_page_to: {[key: string]: string} = {  EN: "to",  TH: "ถึง1"}
  title_page_total: {[key: string]: string} = {  EN: "of",  TH: "จาก1"}
  title_page_record: {[key: string]: string} = {  EN: "entries",  TH: "รายการ1"}

  title_search: {[key: string]: string} = {  EN: "Search",  TH: "ค้นหา1"}

  title_id: {[key: string]: string} = {  EN: "ID",  TH: "รหัสพนักงาน1"}
  title_firstname: {[key: string]: string} = {  EN: "Firstname",  TH: "ชื่อ1"}
  title_lastname: {[key: string]: string} = {  EN: "Lastname",  TH: "นามสกุล1"}
  title_position: {[key: string]: string} = {  EN: "Position",  TH: "ตำแหน่งงาน1"}
  title_emptype: {[key: string]: string} = {  EN: "Emptype",  TH: "ประเภทพนักงาน1"}

  constructor( 
    private payitemService: PayitemService,   

    private router:Router, 
    private route: ActivatedRoute,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,   
    
    ) { }

  ngOnInit(): void {

    this.doGetInitialCurrent()   
    this.doLoadLanguage()

    setTimeout(() => {
      this.doLoaditem()
    }, 200);

  }

  public initial_current:InitialCurrent = new InitialCurrent();  
  doGetInitialCurrent(){    
    this.initial_current = JSON.parse(localStorage.getItem(AppConfig.SESSIONInitial) || '{}');
    if (!this.initial_current) {
      this.router.navigateByUrl('login');
    }       
  }

  doLoadLanguage(){
    if(this.initial_current.Language == "TH"){
    }
  }
  item_code: string = '';
  worker_code: string = '';
  item_type: string = '';
  selectedPayitem:ItemsModel = new ItemsModel();
  worker_list: PayitemModel[] = []; 
  async doLoaditem() {
    var tmp = new PayitemModel();
    tmp.item_code = this.item_code;
    tmp.worker_code = this.worker_code;

    try {
      const res = await this.payitemService.payitem_get(
        this.initial_current.CompCode,
        this.initial_current.PR_PayDate,
        tmp.worker_code,
        this.item_type,
        tmp.item_code
      );

      this.worker_list = res;
      return res;
    } catch (error) {
      console.error(error);
      throw error;
    }
   


 
  }
  onRowSelectEmployee(event: Event) {
    
  }
    
 

}

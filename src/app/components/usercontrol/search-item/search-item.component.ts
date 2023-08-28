import { Component, OnInit } from '@angular/core';
import { MegaMenuItem, MenuItem } from 'primeng/api';
import { ConfirmationService, ConfirmEventType, MessageService } from 'primeng/api';

import { ActivatedRoute, NavigationExtras } from '@angular/router';
import { Router } from '@angular/router';

import { AppConfig } from '../../../config/config';
import { InitialCurrent } from '../../../config/initial_current';

import { RadiovalueModel } from '../../../models/project/radio_value';
import { EmployeeService } from 'src/app/services/emp/worker.service';
import { PayitemModel } from 'src/app/models/payroll/payitem';
import { PayitemService } from 'src/app/services/payroll/payitem.service';
import { ItemsModel } from 'src/app/models/payroll/items';
import { ItemService } from 'src/app/services/payroll/item.service';

@Component({
  selector: 'app-search-item',
  templateUrl: './search-item.component.html',
  styleUrls: ['./search-item.component.scss']
})
export class SearchItemComponent implements OnInit {


  title_page_from: { [key: string]: string } = { EN: "Showing", TH: "แสดง" }
  title_page_to: { [key: string]: string } = { EN: "to", TH: "ถึง" }
  title_page_total: { [key: string]: string } = { EN: "of", TH: "จาก" }
  title_page_record: { [key: string]: string } = { EN: "entries", TH: "รายการ" }

  title_search: { [key: string]: string } = { EN: "Search", TH: "ค้นหา" }

  title_code: { [key: string]: string } = { EN: "Code", TH: "รหัส" }
  title_details: { [key: string]: string } = { EN: "Details", TH: "รายละเอียด" }
  title_name_th: {[key: string]: string} = {  EN: "Name (Thai)",  TH: "ชื่อไทย"}
  title_name_en: {[key: string]: string} = {  EN: "Name (Eng.)",  TH: "ชื่ออังกฤษ"}


  constructor(
    private payitemService: PayitemService,
    private itemService: ItemService,

    private router: Router,
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

  public initial_current: InitialCurrent = new InitialCurrent();
  doGetInitialCurrent() {
    this.initial_current = JSON.parse(localStorage.getItem(AppConfig.SESSIONInitial) || '{}');
    if (!this.initial_current) {
      this.router.navigateByUrl('login');
    }
  }

  doLoadLanguage() {
    if (this.initial_current.Language == "TH") {
    }
  }
  item_code: string = '';
  worker_code: string = '';
  item_type: string = '';
  worker_list: PayitemModel[] = [];

  selectedPayitem: ItemsModel = new ItemsModel();
  Items_List: ItemsModel[] = [];
  doLoaditem() {
    var tmp = new ItemsModel();
  
    this.itemService.item_get(tmp).then((res) => {
      this.Items_List = res.filter((item: { item_type: string; }) => item.item_type === "IN");
    });
  }
  
 

  onRowSelectItems(event: Event) {
  }
}

import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, MenuItem, MessageService } from 'primeng/api';
import { SelectEmpComponent } from 'src/app/components/usercontrol/select-emp/select-emp.component';
import { TaskComponent } from 'src/app/components/usercontrol/task/task.component';
import { AppConfig } from 'src/app/config/config';
import { InitialCurrent } from 'src/app/config/initial_current';
import { SetItemModel } from 'src/app/models/payroll/batch/setitem';
import { ItemsModel } from 'src/app/models/payroll/items';
import { AccessdataModel } from 'src/app/models/system/security/accessdata';
import { SetitemsService } from 'src/app/services/payroll/batch/setitems.service';
import { ItemService } from 'src/app/services/payroll/item.service';
import { TaskService } from 'src/app/services/task.service';
interface Policy {
    name: string;
    code: string;
}
interface Result {
    worker: string;
    policy: string;
    modified_by: string;
    modified_date: string;
}

@Component({
  selector: 'app-setpol',
  templateUrl: './setpol.component.html',
  styleUrls: ['./setpol.component.scss']
})
export class SetpolComponent implements OnInit {
  home: any;
  itemslike: MenuItem[] = [];
  router: any;
  constructor() { }
  public initial_current: InitialCurrent = new InitialCurrent();
    initialData2: InitialCurrent = new InitialCurrent();
    accessData: AccessdataModel = new AccessdataModel();
    doGetInitialCurrent() {
        this.initial_current = JSON.parse(
            localStorage.getItem(AppConfig.SESSIONInitial) || '{}'
        );
        if (!this.initial_current) {
            this.router.navigateByUrl('login');
        }
        this.accessData = this.initialData2.dotGetPolmenu('PAY');

    }
    
  title_system_payroll: { [key: string]: string } = { EN: "Policy Payroll ", TH: "นโยบาย" }
  title_page: { [key: string]: string } = { EN: "กำหนดภาษีเงินได้บุคคลธรรมดา ", TH: "กำหนดภาษีเงินได้บุคคลธรรมดา" }

  ngOnInit(): void {
    this.itemslike = [{ label: this.title_system_payroll[this.initial_current.Language], routerLink: '/payroll/policy' },
        { label: this.title_page[this.initial_current.Language], styleClass: 'activelike' }];
        this.home = { icon: 'pi pi-home', routerLink: '/' };
    }
  }

  

 

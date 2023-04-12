import { Component, OnInit } from '@angular/core';
import { MegaMenuItem,MenuItem } from 'primeng/api';
import {ConfirmationService, ConfirmEventType, MessageService} from 'primeng/api';

import { ActivatedRoute, NavigationExtras } from '@angular/router';
import { Router } from '@angular/router';

import { AppConfig } from '../../../config/config';
import { InitialCurrent } from '../../../config/initial_current';

import { RadiovalueModel } from '../../../models/project/radio_value';
import { EmployeeModel } from '../../../models/employee/employee';
import { EmployeeService } from 'src/app/services/emp/worker.service';

@Component({
  selector: 'app-search-emp',
  templateUrl: './search-emp.component.html',
  styleUrls: ['./search-emp.component.scss']
})
export class SearchEmpComponent implements OnInit {

  title_page_from:string = "Showing";
  title_page_to:string = "to";
  title_page_total:string = "of";
  title_page_record:string = "entries";

  constructor(private employeeService: EmployeeService,
   
    private router:Router, 
    private route: ActivatedRoute,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,   

    ) { }

  ngOnInit(): void {

    this.doGetInitialCurrent()   
    this.doLoadLanguage()

    setTimeout(() => {
      this.doLoadEmployee()
    }, 200);

  }

  public initial_current:InitialCurrent = new InitialCurrent();  
  doGetInitialCurrent(){    
    this.initial_current = JSON.parse(localStorage.getItem(AppConfig.SESSIONInitial) || '{}');
    if (!this.initial_current) {
      this.router.navigateByUrl('');
    }       
  }

  doLoadLanguage(){
    if(this.initial_current.Language == "TH"){
    }
  }

  selectedEmployee:EmployeeModel = new EmployeeModel();
  worker_list: EmployeeModel[] = []; 
  doLoadEmployee(){
    this.employeeService.worker_get(this.initial_current.CompCode, "").then((res) =>{
      this.worker_list = res;   
    });
  }

  onRowSelectEmployee(event: Event) {
    
  }

}

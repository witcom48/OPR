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

  title_page_from: {[key: string]: string} = {  EN: "Showing",  TH: "แสดง"}
  title_page_to: {[key: string]: string} = {  EN: "to",  TH: "ถึง"}
  title_page_total: {[key: string]: string} = {  EN: "of",  TH: "จาก"}
  title_page_record: {[key: string]: string} = {  EN: "entries",  TH: "รายการ"}

  title_search: {[key: string]: string} = {  EN: "Search",  TH: "ค้นหา"}

  title_id: {[key: string]: string} = {  EN: "ID",  TH: "รหัสพนักงาน"}
  title_firstname: {[key: string]: string} = {  EN: "Firstname",  TH: "ชื่อ"}
  title_lastname: {[key: string]: string} = {  EN: "Lastname",  TH: "นามสกุล"}
  title_position: {[key: string]: string} = {  EN: "Position",  TH: "ตำแหน่งงาน"}
  title_emptype: {[key: string]: string} = {  EN: "Emptype",  TH: "ประเภทพนักงาน"}

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
      this.router.navigateByUrl('login');
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

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppConfig } from '../../../config/config';
import { InitialCurrent } from '../../../config/initial_current';

import { EmployeeModel } from '../../../models/employee/employee';
import { EmployeeService } from 'src/app/services/emp/worker.service';

@Component({
  
  selector: 'app-select-emp',
  templateUrl: './select-emp.component.html',
  styleUrls: ['./select-emp.component.scss']
})
export class SelectEmpComponent implements OnInit {


  employee_source: EmployeeModel[] = [];
  employee_dest: EmployeeModel[] = [];

  constructor(private employeeService: EmployeeService, private router:Router) { }

  ngOnInit(): void {
    this.doGetInitialCurrent()

    setTimeout(() => {
      this.doLoadEmployee()
    }, 300);

  }

  public initial_current:InitialCurrent = new InitialCurrent();  
  doGetInitialCurrent(){    
    this.initial_current = JSON.parse(localStorage.getItem(AppConfig.SESSIONInitial) || '{}');
    if (!this.initial_current) {
      this.router.navigateByUrl('');
    }       
  }

  doLoadEmployee(){
    this.employeeService.worker_get(this.initial_current.CompCode,"").then((res) =>{
      this.employee_source = res;
      
      if(this.employee_source.length > 0){
        
      }

    });
  }

}

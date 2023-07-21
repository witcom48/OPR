import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-self-employee',
  templateUrl: './self-employee.component.html',
  styleUrls: ['./self-employee.component.scss']
})
export class SelfEmployeeComponent implements OnInit {
  itemslike: MenuItem[] = [{ label: 'Employee', routerLink: '/self/employee', styleClass: 'activelike' }];
  home: any = { icon: 'pi pi-home', routerLink: '/' }
  constructor() { }

  ngOnInit(): void {
  }

}

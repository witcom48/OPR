import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-attendance-policy',
  templateUrl: './attendance-policy.component.html',
  styleUrls: ['./attendance-policy.component.scss']
})
export class AttendancePolicyComponent implements OnInit {

  constructor() { }
  public ttt: string = "TH";
  itemslike: MenuItem[] = [];
  home: any;
  ngOnInit(): void {
    this.itemslike = [{ label: 'Attendance', routerLink: '/attendance/policy', styleClass: 'activelike' }];

    this.home = { icon: 'pi pi-home', routerLink: '/' };
  }

}

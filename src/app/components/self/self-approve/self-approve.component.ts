import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-self-approve',
  templateUrl: './self-approve.component.html',
  styleUrls: ['./self-approve.component.scss']
})
export class SelfApproveComponent implements OnInit {
  itemslike: MenuItem[] = [{ label: 'Self Services', routerLink: '/self/approve', styleClass: 'activelike' }];
  home: any = { icon: 'pi pi-home', routerLink: '/' }
  constructor() { }

  ngOnInit(): void {
  }

}

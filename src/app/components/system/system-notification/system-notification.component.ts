import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-system-notification',
  templateUrl: './system-notification.component.html',
  styleUrls: ['./system-notification.component.scss']
})
export class SystemNotificationComponent implements OnInit {
  itemslike: MenuItem[] = [{ label: 'Notification System', routerLink: '/system/security', styleClass: 'activelike' }];
  home: any = { icon: 'pi pi-home', routerLink: '/' }

  constructor() { }

  ngOnInit(): void {
  }

}

import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-system-security',
  templateUrl: './system-security.component.html',
  styleUrls: ['./system-security.component.scss']
})
export class SystemSecurityComponent implements OnInit {
  itemslike: MenuItem[] = [{ label: 'Security system', routerLink: '/system/security', styleClass: 'activelike' }];
  home: any = { icon: 'pi pi-home', routerLink: '/' }
  constructor() { }

  ngOnInit(): void {
  }

}
